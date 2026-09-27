"use client";

import { useEffect, useRef } from "react";
import { Mark, Word } from "@/components/Logo";
import { reducedMotion } from "@/components/ui";
import { gsap } from "@/lib/gsap";
import { LOGO } from "@/lib/logo";

const [mx, , mw] = LOGO.markBox;
// Circumcentre of the mark (a regular pentagon): the aperture turns about this point.
const CX = mx + mw / 2;
const CY = mw / (2 * Math.sin((72 * Math.PI) / 180));

/* The opening moment, about 2.2s. The five facets close in like a camera aperture (each turns 72deg about the
   pentagon's centre while it grows), the wordmark rises letter by letter, then the white panel lifts off the hero
   and hands over by dispatching "intro:done" (Hero listens for it; Lenis starts on it). */
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current!;
    const done = () => {
      root.classList.remove("is-loading");
      document.dispatchEvent(new Event("intro:done"));
    };
    if (reducedMotion()) { el.remove(); done(); return; }

    const facets = el.querySelectorAll<SVGGElement>("[data-facet]");
    const hole = el.querySelector("[data-hole]");
    const top = el.querySelectorAll('[data-word="top"] [data-letter]');
    const sub = el.querySelectorAll('[data-word="sub"] [data-letter]');

    const tl = gsap.timeline({ delay: .15 });
    tl.set(el.querySelector("svg"), { opacity: 1 })
      .from(facets, { rotation: -72, scale: .2, opacity: 0, svgOrigin: `${CX} ${CY}`, duration: 1, ease: "power3.out", stagger: .07 })
      .from(hole, { opacity: 0, duration: .4 }, .5)
      .from(top, { y: 14, opacity: 0, duration: .6, ease: "pts", stagger: .035 }, .45)
      .from(sub, { y: 8, opacity: 0, duration: .5, ease: "pts", stagger: .015 }, .7)
      .to(el.querySelector(".preloader__bar span"), { scaleX: 1, duration: 1.5, ease: "power1.inOut" }, 0)
      .addLabel("out", "+=.15")
      .to(el.querySelector(".preloader__inner"), { y: -40, opacity: 0, duration: .5, ease: "power2.in" }, "out")
      .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: .9, ease: "power3.inOut" }, "out+=.2")
      .call(done, [], "out+=.45")
      .call(() => el.remove());
    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="preloader" aria-hidden="true">
      <div className="preloader__inner">
        <svg viewBox={LOGO.viewBox} style={{ opacity: 0 }}>
          <Mark />
          <Word fill={LOGO.word} />
        </svg>
        <div className="preloader__bar"><span /></div>
      </div>
    </div>
  );
}
