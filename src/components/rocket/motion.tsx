import { useEffect } from "react";

/**
 * Lenis smooth scroll + liquid-glass light tracking + gentle reveal offsets.
 * Everything runs client-side inside effects (SSR safe) and is skipped for
 * reduced-motion users.
 */
export function RocketMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Refraction only where backdrop-filter accepts SVG filters (Chromium) and the device is strong enough.
    const strong = (navigator.hardwareConcurrency ?? 8) > 4 && window.innerWidth > 860;
    if (strong && typeof CSS !== "undefined" && CSS.supports("backdrop-filter", "url(#rk-liquid)") && !/Safari/.test(navigator.userAgent.replace(/Chrome|Chromium|Edg/g, "x"))) {
      root.classList.add("rk-refract");
    }

    // Specular highlight follows the pointer over any glass surface.
    let lightFrame = 0;
    let lastEvent: PointerEvent | null = null;
    const paintLight = () => {
      lightFrame = 0;
      const event = lastEvent;
      if (!event) return;
      const target = (event.target as Element | null)?.closest?.(".rk-glass") as HTMLElement | null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
      target.style.setProperty("--my", `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
    };
    const onPointer = (event: PointerEvent) => {
      lastEvent = event;
      if (!lightFrame) lightFrame = window.requestAnimationFrame(paintLight);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    if (reduced) {
      return () => {
        window.removeEventListener("pointermove", onPointer);
        window.cancelAnimationFrame(lightFrame);
        root.classList.remove("rk-refract");
      };
    }

    // Reveal: elements below the fold start 28px low and settle as they enter (transform only).
    const revealed = Array.from(document.querySelectorAll<HTMLElement>("[data-rk-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.setProperty("--rk-ry", "0px");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of revealed) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.style.setProperty("--rk-ry", "28px");
        io.observe(el);
      }
    }

    // Lenis smooth scroll, loaded lazily so the server bundle never touches it.
    let destroyed = false;
    let lenis: import("lenis").default | null = null;
    let rafId = 0;
    const onAnchor = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link || !lenis) return;
      const id = link.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -12, duration: 1.6, easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)) });
    };
    void import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true, syncTouch: false });
      const loop = (time: number) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(loop);
      };
      rafId = window.requestAnimationFrame(loop);
      document.addEventListener("click", onAnchor);
    });

    return () => {
      destroyed = true;
      window.removeEventListener("pointermove", onPointer);
      window.cancelAnimationFrame(lightFrame);
      window.cancelAnimationFrame(rafId);
      document.removeEventListener("click", onAnchor);
      io.disconnect();
      lenis?.destroy();
      root.classList.remove("rk-refract");
    };
  }, []);

  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
      <filter id="rk-liquid" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="22" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
