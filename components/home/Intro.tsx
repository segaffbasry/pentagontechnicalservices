"use client";

import { useEffect, useRef } from "react";
import { Button, Label, reducedMotion } from "@/components/ui";
import { intro } from "@/lib/content";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* siteassist.com "What we do": a small square label, then one large sans statement. The live site's 300+ MW
   figure sits beside it as the single stat, counting up once when it enters. */
export default function Intro() {
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = num.current!;
    if (reducedMotion()) return;
    const counter = { v: 0 };
    el.textContent = "0";
    const st = ScrollTrigger.create({
      trigger: el, start: "top 90%", once: true,
      onEnter: () => gsap.to(counter, { v: intro.stat.value, duration: 1.6, ease: "power3.out", onUpdate: () => { el.textContent = String(Math.round(counter.v)); } }),
    });
    return () => { st.kill(); el.textContent = String(intro.stat.value); };
  }, []);

  return (
    <section className="intro wrap" id="about" tabIndex={-1} aria-labelledby="intro-title">
      <Label>{intro.label}</Label>
      <h2 id="intro-title" className="statement intro__statement" data-reveal="text">{intro.statement}</h2>
      <div className="intro__grid">
        <div className="intro__stat" data-reveal="card">
          <p className="intro__figure" aria-hidden="true"><span ref={num}>{intro.stat.value}</span>{intro.stat.suffix}<small>{intro.stat.unit}</small></p>
          <p className="intro__stat-text">{intro.stat.text}</p>
        </div>
        <div className="intro__body">
          <p className="body intro__lede" data-reveal="card">{intro.body}</p>
          <div data-reveal="label"><Button href={intro.cta.href} variant="quiet">{intro.cta.label}</Button></div>
        </div>
      </div>
    </section>
  );
}
