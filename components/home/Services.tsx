"use client";

import { useEffect, useRef } from "react";
import { Arrow, Button, reducedMotion } from "@/components/ui";
import { services } from "@/lib/content";
import { gsap } from "@/lib/gsap";

/* siteassist.com "Solutions⁹": a big sans heading with the item count as a superscript and a button on the left,
   numbered uppercase rows on the right. Its [data-follower] preview is rebuilt here: on pointer devices a
   small photo follows the cursor over the list and swaps to the hovered row's image. */
export default function Services() {
  const list = useRef<HTMLUListElement>(null);
  const follower = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ul = list.current!;
    const box = follower.current!;
    if (reducedMotion() || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const imgs = box.querySelectorAll<HTMLImageElement>("img");
    const x = gsap.quickTo(box, "x", { duration: .5, ease: "power3" });
    const y = gsap.quickTo(box, "y", { duration: .5, ease: "power3" });
    gsap.set(box, { yPercent: -50, scale: .6, autoAlpha: 0, transformOrigin: "left center" });

    // The preview trails 40px right of the cursor (never over the row text), clamped inside the list.
    const move = (e: PointerEvent) => {
      const r = ul.getBoundingClientRect();
      x(Math.min(e.clientX - r.left + 40, r.width - box.offsetWidth));
      y(e.clientY - r.top);
    };
    const show = (i: number) => {
      imgs.forEach((img, k) => gsap.to(img, { autoAlpha: k === i ? 1 : 0, duration: .25, ease: "pts" }));
      gsap.to(box, { autoAlpha: 1, scale: 1, duration: .4, ease: "pts" });
    };
    const hide = () => gsap.to(box, { autoAlpha: 0, scale: .6, duration: .3, ease: "pts" });
    const rows = Array.from(ul.querySelectorAll<HTMLElement>("li"));
    const enters = rows.map((row, i) => { const f = () => show(i); row.addEventListener("pointerenter", f); return f; });
    ul.addEventListener("pointermove", move);
    ul.addEventListener("pointerleave", hide);
    return () => {
      rows.forEach((row, i) => row.removeEventListener("pointerenter", enters[i]));
      ul.removeEventListener("pointermove", move);
      ul.removeEventListener("pointerleave", hide);
    };
  }, []);

  return (
    <section className="services wrap" id="services" aria-labelledby="services-title">
      <div className="services__intro">
        <h2 id="services-title" className="display" data-reveal="label">
          {services.title}<sup>{services.items.length}</sup>
        </h2>
        <div data-reveal="label"><Button href={services.cta.href}>{services.cta.label}</Button></div>
      </div>

      <div className="services__list-wrap">
        <ul ref={list} className="services__list">
          {services.items.map((s, i) => (
            <li key={s.label} data-reveal="card">
              <a href={s.href}>
                <span className="services__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="services__name">{s.label}</span>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
        <div ref={follower} className="services__follower" aria-hidden="true">
          {services.items.map((s) => <img key={s.label} src={s.image} alt="" loading="lazy" />)}
        </div>
      </div>
    </section>
  );
}
