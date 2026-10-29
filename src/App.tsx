import { useState } from "react";
import { ScrollScrub } from "./components/scroll-scrub/scroll-scrub";
import { EnquiryForm } from "./components/rocket/enquiry-form";
import { ServiceIcon } from "./components/rocket/icons";
import { RocketMotion } from "./components/rocket/motion";
import {
  branches,
  franchisePerks,
  launchSequence,
  mapsLink,
  reviews,
  services,
  treatments,
} from "./components/rocket/data";
import "./components/rocket/rocket.css";
import { scrollScrubScenes, scrollScrubTheme } from "./scroll-scrub-scenes";

const journey = scrollScrubScenes.map((scene, index, all) =>
  index === all.length - 1
    ? {
        ...scene,
        actions: (
          <a className="rk-chapter-cta" href="#book">
            Book a wash <span aria-hidden="true">&rarr;</span>
          </a>
        ),
      }
    : scene,
);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="rk" id="top">
      <RocketMotion />

      {/* Mobile navigation drawer */}
      <nav
        className={`rk-mobile-nav${menuOpen ? " rk-mobile-nav--open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <a href="#services" onClick={closeMenu}>Services</a>
        <a href="#treatments" onClick={closeMenu}>Treatments</a>
        <a href="#branches" onClick={closeMenu}>Branches</a>
        <a href="#franchise" onClick={closeMenu}>Franchise</a>
        <a className="rk-mobile-nav__cta" href="#book" onClick={closeMenu}>Book a wash</a>
      </nav>

      <header className="rk-header">
        <div className="rk-header__bar rk-glass rk-glass--refract">
          <a className="rk-header__logo" href="#top" aria-label="Rocket Car Wash home">
            <img src="/assets/rocket/logo.png" alt="Rocket Car Wash, landing in luxury" width={274} height={123} />
          </a>
          <nav aria-label="Main">
            <ul className="rk-header__nav">
              <li><a href="#services">Services</a></li>
              <li><a href="#treatments">Treatments</a></li>
              <li><a href="#branches">Branches</a></li>
              <li><a href="#franchise">Franchise</a></li>
            </ul>
          </nav>
          <a className="rk-header__cta" href="#book">Book a wash</a>
          <button
            className="rk-menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="rk-mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
            type="button"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      <main>
        <ScrollScrub scenes={journey} theme={scrollScrubTheme} />

        <section className="rk-section" id="services" aria-labelledby="services-title">
          <div className="rk-lines" aria-hidden="true" />
          <div className="rk-services__head">
            <div>
              <p className="rk-eyebrow">Services</p>
              <h2 className="rk-h2" id="services-title">Everything your car needs, under one roof.</h2>
            </div>
            <p className="rk-lede">From a quick foam wash to coating and paint protection, every Rocket branch offers the full menu.</p>
          </div>
          <div className="rk-services__grid">
            {services.map((s, i) => (
              <article className="rk-service" key={s.name} data-rk-reveal="">
                <span className="rk-service__no">{String(i + 1).padStart(2, "0")}</span>
                <ServiceIcon name={s.icon} />
                <h3>{s.name}</h3>
                <p>{s.line}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rk-section rk-sequence" aria-labelledby="sequence-title">
          <span className="rk-sequence__ghost" aria-hidden="true">T-0</span>
          <p className="rk-eyebrow">How a Rocket wash runs</p>
          <h2 className="rk-h2" id="sequence-title">The launch sequence.</h2>
          <p className="rk-lede">Five steps, the same at every branch, so the finish never depends on luck.</p>
          <ol className="rk-sequence__track">
            {launchSequence.map((step) => (
              <li className="rk-step" key={step.t} data-rk-reveal="">
                <span className="rk-step__t">{step.t}</span>
                <h3>{step.name}</h3>
                <p>{step.line}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rk-section" id="treatments" aria-labelledby="treatments-title">
          <p className="rk-eyebrow">Treatments</p>
          <h2 className="rk-h2" id="treatments-title">Go deeper than the wash.</h2>
          <p className="rk-lede">Add a treatment to your visit. Swipe or scroll the row to see them all.</p>
          <div className="rk-treat__rail" data-lenis-prevent="">
            {treatments.map((t) => (
              <figure className="rk-treat" key={t.name}>
                <img src={t.img} alt={t.name} width={896} height={1152} loading="lazy" decoding="async" />
                <figcaption className="rk-glass">
                  <b>{t.name}</b>
                  <span>{t.line}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="rk-section rk-proof" aria-labelledby="proof-title">
          <div>
            <p className="rk-eyebrow">Why drivers come back</p>
            <h2 className="rk-h2" id="proof-title">Trusted bay after bay.</h2>
            <dl className="rk-stats">
              <div className="rk-stat"><dd>5</dd><dt>Branches</dt></div>
              <div className="rk-stat"><dd>100+</dd><dt>Cars washed daily</dt></div>
              <div className="rk-stat"><dd>2</dd><dt>States</dt></div>
            </dl>
            <div className="rk-reviews" style={{ marginTop: "2rem" }}>
              {reviews.map((r) => (
                <figure className="rk-review rk-glass" key={r.name} data-rk-reveal="">
                  <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
                  <figcaption>
                    <span className="rk-stars" aria-hidden="true">★★★★★</span>
                    <b>{r.name}</b>
                    <span>{r.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="rk-proof__media" data-rk-reveal="">
            <img src="/assets/rocket/bay.webp" alt="Inside a Rocket Car Wash bay with its red light stripe" width={1800} height={1201} loading="lazy" decoding="async" />
          </div>
        </section>

        <section className="rk-section" id="branches" aria-labelledby="branches-title">
          <div className="rk-lines" aria-hidden="true" />
          <p className="rk-eyebrow">Branches</p>
          <h2 className="rk-h2" id="branches-title">Find your nearest Rocket.</h2>
          <div className="rk-branches__grid">
            {branches.map((b) => (
              <article className="rk-branch" key={b.name} data-rk-reveal="">
                <div>
                  <span className="rk-branch__area">{b.area}</span>
                  <h3>{b.name}</h3>
                  <address>{b.address}</address>
                </div>
                <div className="rk-branch__links">
                  <a className="rk-dir" href={mapsLink(b.address)} target="_blank" rel="noreferrer">Directions ↗</a>
                  {b.phone ? <a href={`tel:${b.phone.replace(/\s/g, "")}`}>{b.phone}</a> : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rk-section rk-franchise" id="franchise" aria-labelledby="franchise-title">
          <div className="rk-franchise__media">
            <img src="/assets/rocket/branch.webp" alt="A Rocket Car Wash branch frontage" width={1800} height={1201} loading="lazy" decoding="async" />
            <p className="rk-glass">Every Rocket branch opens with the same bay design, equipment and crew training.</p>
          </div>
          <div>
            <p className="rk-eyebrow">Franchise</p>
            <h2 className="rk-h2" id="franchise-title">Own a Rocket bay.</h2>
            <p className="rk-lede">Join a proven car care model with the brand, the equipment and the team behind you from day one.</p>
            <ul className="rk-perks">
              {franchisePerks.map((p) => (
                <li key={p.name}>
                  <b>{p.name}</b>
                  <span>{p.line}</span>
                </li>
              ))}
            </ul>
            <div className="rk-leaders">
              <div className="rk-leader">
                <img src="/assets/rocket/john.webp" alt="Mr. John" width={803} height={1200} loading="lazy" decoding="async" />
                <div><b>Mr. John</b><span>Managing Director, a business analyst and car lover who leads day-to-day quality.</span></div>
              </div>
              <div className="rk-leader">
                <img src="/assets/rocket/clayton.webp" alt="Mr. Clayton" width={622} height={792} loading="lazy" decoding="async" />
                <div><b>Mr. Clayton</b><span>Managing Director, Pro Rocket Car Wash Pvt Ltd, with ventures across detailing and car care equipment.</span></div>
              </div>
            </div>
            <a className="rk-chapter-cta" href="#book" style={{ marginTop: "2.4rem" }}>Enquire about a franchise <span aria-hidden="true">&rarr;</span></a>
          </div>
        </section>

        <section className="rk-section rk-book" id="book" aria-labelledby="book-title">
          <div className="rk-book__bg" aria-hidden="true">
            <img src="/assets/rocket/gantry.webp" alt="" width={1800} height={1201} loading="lazy" decoding="async" />
          </div>
          <div>
            <p className="rk-eyebrow">Book</p>
            <h2 className="rk-h2" id="book-title">Your bay is ready.</h2>
            <p className="rk-lede">Send a request and your branch will call to confirm the slot. Prefer to talk? Call a branch directly.</p>
            <div className="rk-book__contact">
              {branches.filter((b) => b.phone).map((b) => (
                <span key={b.name}>{b.name}: <b>{b.phone}</b></span>
              ))}
            </div>
          </div>
          <EnquiryForm />
        </section>
      </main>

      <footer className="rk-footer">
        <div>
          <img src="/assets/rocket/logo.png" alt="Rocket Car Wash" width={274} height={123} loading="lazy" />
          <p>Pro Rocket Car Wash Pvt Ltd. Branches in Coimbatore, Namakkal, Chennai and Andhra Pradesh. Website concept by Magdio.</p>
        </div>
        <div className="rk-footer__social">
          <a className="rk-glass" href="https://www.instagram.com/rocketcarwashvilankurichi/" target="_blank" rel="noreferrer">Instagram</a>
          <a className="rk-glass" href="https://www.facebook.com/profile.php?id=61561567861212" target="_blank" rel="noreferrer">Facebook</a>
        </div>
      </footer>
    </div>
  );
}
