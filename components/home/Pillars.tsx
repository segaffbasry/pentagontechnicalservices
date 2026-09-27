"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow, reducedMotion } from "@/components/ui";
import { pillars } from "@/lib/content";
import { TABS } from "@/lib/ease";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* THE COPIED INTERACTION: siteassist.com's autoplaying tab panel (inline script `initTabSystem`, used on its
   "What we do" panel). Ported line for line:
   - starts once, when the wrapper reaches "top 80%"
   - timeline defaults { duration: .3, ease: "power3" }
   - outgoing: progress bar scaleX -> 0 (origin right), visual autoAlpha -> 0 and xPercent -> 3, details height -> 0
   - incoming: visual autoAlpha 0 -> 1 from xPercent 3, details height 0 -> auto, bar reset to scaleX 0
   - on complete, the incoming bar fills scaleX 0 -> 1 over the autoplay time (5s, "power1.inOut"), then the next tab
   - clicks jump straight to a tab; clicks during a switch are ignored (isAnimating)
   Additions: tabs are real buttons with aria-selected, arrow keys move between them, and autoplay is off for
   reduced motion. The big title and 01-04 counter follow the active tab. */
export default function Pillars() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const api = useRef<{ go: (i: number) => void } | null>(null);

  useEffect(() => {
    const wrapper = ref.current!;
    const contentItems = wrapper.querySelectorAll<HTMLElement>("[data-tabs='content-item']");
    const visualItems = wrapper.querySelectorAll<HTMLElement>("[data-tabs='visual-item']");
    const autoplay = !reducedMotion();
    let activeIndex = -1;
    let isAnimating = false;
    let progressBarTween: gsap.core.Tween | null = null;
    const bar = (i: number) => contentItems[i]?.querySelector<HTMLElement>("[data-tabs='item-progress']") ?? null;
    const details = (i: number) => contentItems[i]?.querySelector<HTMLElement>("[data-tabs='item-details']") ?? null;

    gsap.set(visualItems, { autoAlpha: 0 });
    contentItems.forEach((_, i) => gsap.set(details(i), { height: 0 }));

    function startProgressBar(index: number) {
      progressBarTween?.kill();
      const b = bar(index);
      if (!b) return;
      gsap.set(b, { scaleX: 0, transformOrigin: "left center" });
      progressBarTween = gsap.to(b, {
        scaleX: 1, duration: TABS.autoplay, ease: TABS.bar,
        onComplete: () => { if (!isAnimating) switchTab((index + 1) % contentItems.length); },
      });
    }

    function switchTab(index: number) {
      if (isAnimating || index === activeIndex) return;
      isAnimating = true;
      progressBarTween?.kill();
      const out = activeIndex;
      setActive(index);
      const tl = gsap.timeline({
        defaults: { duration: TABS.duration, ease: TABS.ease },
        onComplete: () => { activeIndex = index; isAnimating = false; if (autoplay) startProgressBar(index); },
      });
      if (out >= 0) {
        tl.set(bar(out), { transformOrigin: "right center" })
          .to(bar(out), { scaleX: 0, duration: .3 }, 0)
          .to(visualItems[out], { autoAlpha: 0, xPercent: 3 }, 0)
          .to(details(out), { height: 0 }, 0);
      }
      tl.fromTo(visualItems[index], { autoAlpha: 0, xPercent: 3 }, { autoAlpha: 1, xPercent: 0 }, 0)
        .fromTo(details(index), { height: 0 }, { height: "auto" }, 0)
        .set(bar(index), { scaleX: autoplay ? 0 : 1, transformOrigin: "left center" }, 0);
    }

    api.current = { go: switchTab };
    const st = ScrollTrigger.create({ trigger: wrapper, start: "top 80%", once: true, onEnter: () => switchTab(0) });
    return () => { st.kill(); progressBarTween?.kill(); api.current = null; };
  }, []);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = pillars.length;
    const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : -1;
    if (next < 0) return;
    e.preventDefault();
    api.current?.go(next);
    ref.current?.querySelectorAll<HTMLButtonElement>("[role='tab']")[next]?.focus();
  };

  return (
    <section ref={ref} className="pillars wrap" aria-label="What we deliver">
      <div className="pillars__panel" data-tone="dark" data-reveal="card">
        <div className="pillars__visuals" aria-hidden="true">
          {pillars.map((p) => (
            <div key={p.title} className="pillars__visual" data-tabs="visual-item">
              <img src={p.image} alt="" loading="lazy" />
            </div>
          ))}
          <div className="pillars__shade" />
        </div>

        <div className="pillars__head">
          <p className="pillars__title" aria-live="polite">{pillars[active].title}</p>
          <p className="pillars__count" aria-hidden="true">{String(active + 1).padStart(2, "0")}</p>
        </div>

        <div className="pillars__tabs" role="tablist" aria-label="Services">
          {pillars.map((p, i) => (
            <div key={p.title} className="pillars__item" data-tabs="content-item" data-active={i === active || undefined}>
              <button
                role="tab" id={`pillar-tab-${i}`} aria-selected={i === active} aria-controls={`pillar-panel-${i}`}
                tabIndex={i === active ? 0 : -1} className="pillars__tab"
                onClick={() => api.current?.go(i)} onKeyDown={(e) => onKey(e, i)}
              >
                {p.title}
              </button>
              <div className="pillars__details" data-tabs="item-details" id={`pillar-panel-${i}`} role="tabpanel" aria-labelledby={`pillar-tab-${i}`}>
                <p>{p.body}</p>
                <a href={p.href} className="pillars__more" tabIndex={i === active ? 0 : -1}>Find out more <Arrow /></a>
              </div>
              <div className="pillars__line" aria-hidden="true"><span data-tabs="item-progress" /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
