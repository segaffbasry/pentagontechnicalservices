"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow, Label, reducedMotion } from "@/components/ui";
import { values } from "@/lib/content";
import { gsap } from "@/lib/gsap";

/* siteassist.com's testimonial slider (grey panel, photo left, uppercase condensed quote right, square arrow
   buttons top-right) carrying the live homepage's seven reasons. Each step fades the outgoing point up and out
   and brings the next one in from below. All seven are in the DOM for screen readers and no-JS visitors. */
export default function Values() {
  const [index, setIndex] = useState(0);
  const track = useRef<HTMLOListElement>(null);
  const first = useRef(true);
  const n = values.points.length;

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const items = track.current!.querySelectorAll<HTMLElement>("li");
    if (reducedMotion()) return;
    gsap.fromTo(items[index], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .6, ease: "pts" });
  }, [index]);

  const go = (d: number) => setIndex((i) => (i + d + n) % n);

  return (
    <section className="values wrap" aria-labelledby="values-title">
      <div className="values__top">
        <Label>Why Pentagon</Label>
        <div className="values__nav">
          <span className="values__count" aria-live="polite">
            <span className="sr-only">Point </span>{String(index + 1).padStart(2, "0")}<span aria-hidden="true"> / </span><span className="sr-only"> of </span>{String(n).padStart(2, "0")}
          </span>
          <button className="values__arrow" onClick={() => go(-1)} aria-label="Previous point"><Arrow dir="left" /></button>
          <button className="values__arrow" onClick={() => go(1)} aria-label="Next point"><Arrow /></button>
        </div>
      </div>

      <div className="values__panel" data-reveal="card">
        <div className="values__media" data-reveal="image">
          <img src="/media/canopy.webp" alt="City skyline at sunset framed by a concrete canopy" loading="lazy" />
        </div>
        <div className="values__copy">
          <h2 id="values-title" className="values__statement">{values.statement}</h2>
          <ol ref={track} className="values__points">
            {values.points.map((p, i) => (
              <li key={i} data-current={i === index || undefined} aria-hidden={i !== index || undefined}>
                <span className="values__quote" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                {p}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
