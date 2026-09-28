"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "@/components/ui";
import { MARQUEE } from "@/lib/ease";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* siteassist.com initMarqueeScrollDirection, ported: the row loops at a speed scaled to its width, reverses
   direction with the scroll direction, and the whole strip drifts ±scrollSpeed vw as it crosses the viewport. */
/* `items` are the loop keys; `render` draws each one (text by default); `names` is what screen readers get. */
type Props = { items: string[]; label: string; names?: string[]; render?: (item: string) => React.ReactNode; className?: string };

export default function Marquee({ items, label, names = items, render, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const marquee = ref.current!;
    const scroll = marquee.querySelector<HTMLElement>("[data-marquee-scroll]")!;
    const ctx = gsap.context(() => {
      const collections = marquee.querySelectorAll<HTMLElement>("[data-marquee-collection]");
      const w = window.innerWidth;
      const multiplier = w < 479 ? .25 : w < 991 ? .5 : 1;
      const duration = MARQUEE.speed * (collections[0].offsetWidth / w) * multiplier;
      scroll.style.marginLeft = `${MARQUEE.scrollSpeed * -1}%`;
      scroll.style.width = `${MARQUEE.scrollSpeed * 2 + 100}%`;

      const loop = gsap.to(collections, { xPercent: -100, repeat: -1, duration, ease: "linear" }).totalProgress(.5);

      ScrollTrigger.create({
        trigger: marquee, start: "top bottom", end: "bottom top",
        onUpdate: (self) => loop.timeScale(self.direction === 1 ? 1 : -1),
      });
      gsap.fromTo(scroll, { x: `${MARQUEE.scrollSpeed}vw` }, { x: `${-MARQUEE.scrollSpeed}vw`, ease: "none", scrollTrigger: { trigger: marquee, start: "0% 100%", end: "100% 0%", scrub: 0 } });
    }, marquee);
    return () => ctx.revert();
  }, []);

  const row = (hidden: boolean, key: number) => (
    <ul key={key} className="marquee__row" data-marquee-collection aria-hidden={hidden || undefined}>
      {items.map((item) => <li key={item}>{render ? render(item) : item}</li>)}
    </ul>
  );

  return (
    <div ref={ref} className={`marquee ${className ?? ""}`}>
      <p className="sr-only">{label}: {names.join(", ")}</p>
      <div className="marquee__scroll" data-marquee-scroll aria-hidden="true">
        {Array.from({ length: MARQUEE.duplicate + 1 }, (_, i) => row(true, i))}
      </div>
    </div>
  );
}
