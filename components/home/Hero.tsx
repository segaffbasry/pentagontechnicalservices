"use client";

import { useEffect, useRef } from "react";
import Marquee from "@/components/home/Marquee";
import { Button, reducedMotion } from "@/components/ui";
import { contact, hero, offices } from "@/lib/content";
import { gsap } from "@/lib/gsap";

/* Hero, after siteassist.com: full-bleed film under a tinted overlay, an uppercase condensed headline led by a
   small square, a hairline rule, then the lead on the left and a coordinate readout with a blinking dot on the
   right. The client-logo strip becomes a ticker of the offices listed in the live footer.
   The film is the live banner.mp4 with the live site's own overlay, rgba(7,64,89,.45). */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current!;
    if (reducedMotion()) return;
    const words = el.querySelectorAll(".hero__title .wi");
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(el.querySelector(".hero__media"), { scale: 1.12 }, { scale: 1, duration: 2, ease: "power3.out" }, 0)
      .fromTo(words, { yPercent: 110, y: 0 }, { yPercent: 0, duration: 1.1, ease: "power3.out", stagger: .06 }, .1)
      .fromTo(el.querySelector(".hero__rule"), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.inOut" }, .3)
      .to(el.querySelectorAll("[data-intro]"), { opacity: 1, y: 0, duration: .8, ease: "pts", stagger: .08 }, .6);
    const play = () => tl.play();
    if (document.documentElement.classList.contains("is-loading")) document.addEventListener("intro:done", play, { once: true });
    else play();
    return () => { document.removeEventListener("intro:done", play); tl.kill(); };
  }, []);

  const words = hero.title.split(" ");

  return (
    <section ref={ref} className="hero" data-tone="dark" data-hero data-parallax data-parallax-start="0" data-parallax-end="20" data-parallax-scroll-start="top top">
      <div className="hero__media" data-parallax-target>
        <video src="/media/hero.mp4" poster="/media/hero-poster.webp" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content wrap">
        <h1 className="hero__title">
          <span className="hero__square" aria-hidden="true" />
          {words.map((w, i) => (
            <span key={i}><span className="wm"><span className="wi">{w}</span></span>{i < words.length - 1 ? " " : ""}</span>
          ))}
        </h1>
        <div className="hero__rule" aria-hidden="true" />
        <div className="hero__row">
          <p className="hero__lead" data-intro>{hero.lead}</p>
          <div className="hero__side" data-intro>
            <p className="hero__coords">
              <span className="hero__dot" aria-hidden="true"><i /></span>
              <span><span className="sr-only">Head office, Beaconsfield: </span>51.61°N 0.64°W</span>
            </p>
            <div className="hero__ctas">
              <Button href={hero.cta.href} variant="light">{hero.cta.label}</Button>
              <Button href={contact.contactPage} variant="glass">Contact us</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__ticker" data-intro>
        <Marquee label="Offices" items={offices.map((o) => o.city)} />
      </div>
    </section>
  );
}
