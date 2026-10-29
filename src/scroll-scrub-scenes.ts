/**
 * Rocket Car Wash journey: one continuous film built from the branch's own
 * photography (arrive, entrance, bay, wash gantry), cut into four consecutive
 * clips so each chapter owns its stretch of scroll. Posters are the exact first
 * frame of each encoded clip.
 */
import type {
  ScrollScrubScene,
  ScrollScrubTheme,
} from "./components/scroll-scrub/scroll-scrub";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#FF2A33",
  background: "#08090B",
  ink: "#F3F2EF",
  muted: "#C9CCD1",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    id: "arrive",
    label: "Arrive",
    kicker: "Coimbatore / Namakkal / Chennai / Andhra Pradesh",
    title: "Landing in luxury.",
    body: "Premium car wash and detailing, built like a launch bay. Scroll in and follow your car through a Rocket branch.",
    clip: "/assets/world/scene-01.mp4",
    mobileClip: "/assets/world/scene-01-mobile.mp4",
    poster: "/assets/world/scene-01-poster.png",
    mobilePoster: "/assets/world/scene-01-mobile-poster.png",
    scroll: 1.2,
  },
  {
    id: "enter",
    label: "Enter",
    kicker: "Drive in",
    title: "Pull up. Hand over the keys.",
    body: "Our crew checks your car in and talks you through the right wash for it, from a quick foam wash to a full coating.",
    align: "right",
    clip: "/assets/world/scene-02.mp4",
    mobileClip: "/assets/world/scene-02-mobile.mp4",
    poster: "/assets/world/scene-02-poster.png",
    mobilePoster: "/assets/world/scene-02-mobile-poster.png",
    scroll: 1.2,
  },
  {
    id: "bay",
    label: "The bay",
    kicker: "Inside the bay",
    title: "Lit like a launchpad.",
    body: "Foam, wash, rinse and dry under the red light. Every branch runs the same Rocket process.",
    tags: ["Snow foam wash", "Interior clean", "Coating"],
    clip: "/assets/world/scene-03.mp4",
    mobileClip: "/assets/world/scene-03-mobile.mp4",
    poster: "/assets/world/scene-03-poster.png",
    mobilePoster: "/assets/world/scene-03-mobile-poster.png",
    scroll: 1.4,
  },
  {
    id: "shine",
    label: "Lift-off",
    kicker: "The wash line",
    title: "Roll out shining.",
    body: "Book a slot at your nearest branch and we will have the bay ready when you arrive.",
    align: "right",
    clip: "/assets/world/scene-04.mp4",
    mobileClip: "/assets/world/scene-04-mobile.mp4",
    poster: "/assets/world/scene-04-poster.png",
    mobilePoster: "/assets/world/scene-04-mobile-poster.png",
    scroll: 1.4,
  },
];
