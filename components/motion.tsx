"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { reducedMotion } from "@/components/ui";
import { LENIS, timing } from "@/lib/ease";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";
import { splitWords } from "@/lib/split";

/* The whole motion vocabulary. Four reveal moves, applied by attribute and nothing else (table in README):
   label  – labels, buttons, small meta: 10px rise and fade
   text   – statements and headings: each word slides up out of its own mask
   card   – cards, rows, list items: batched 24px rise and fade, 0.07s stagger
   image  – [data-reveal="image"] frames: the photo settles from 1.12 scale while the frame opens from the bottom
   Plus one scroll effect, [data-parallax] (siteassist.com's global parallax: yPercent start -> end, scrub).
   Everything plays once, on the "pts" curve. Hero elements ([data-hero]) are skipped here; the preloader plays them. */
export function usePageMotion() {
  useEffect(() => {
    const reduced = reducedMotion();
    const root = document.documentElement;

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    if (!reduced) {
      lenis = new Lenis({ lerp: LENIS.lerp, wheelMultiplier: LENIS.wheelMultiplier });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      if (root.classList.contains("is-loading")) lenis.stop();
    }
    const start = () => lenis?.start();
    document.addEventListener("intro:done", start);

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href^='#']");
      if (!link || !lenis) return;
      const hash = link.getAttribute("href")!;
      const target = hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
      if (target === null) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: target === 0 ? 0 : -96, duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
      if (target !== 0) target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    const splits: { revert: () => void }[] = [];
    const ctx = gsap.context(() => {
      const all = (kind: string) => gsap.utils.toArray<HTMLElement>(`[data-reveal="${kind}"]:not([data-hero] [data-reveal])`);
      if (reduced) return;

      all("label").forEach((el) => {
        gsap.set(el, { opacity: 0, y: 10 });
        ScrollTrigger.create({ trigger: el, start: "top 94%", once: true, onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: timing.label, ease: "pts", clearProps: "transform" }) });
      });

      all("text").forEach((el) => {
        const split = splitWords(el);
        splits.push(split);
        gsap.set(split.inner, { yPercent: 110 });
        gsap.set(el, { visibility: "visible" });
        ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to(split.inner, { yPercent: 0, duration: timing.text, ease: "pts", stagger: Math.min(.02, .5 / split.inner.length) }) });
      });

      const cards = all("card");
      gsap.set(cards, { opacity: 0, y: 24 });
      ScrollTrigger.batch(cards, { start: "top 94%", once: true, onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: timing.card, ease: "pts", stagger: .07, clearProps: "transform" }) });

      all("image").forEach((el) => {
        const media = el.querySelector("img, video");
        gsap.set(el, { clipPath: "inset(18% 0% 0% 0%)" });
        if (media) gsap.set(media, { scale: 1.12 });
        ScrollTrigger.create({
          trigger: el, start: "top 90%", once: true,
          onEnter: () => {
            gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: timing.image, ease: "pts", clearProps: "clipPath" });
            if (media) gsap.to(media, { scale: 1, duration: timing.image * 1.2, ease: "pts", clearProps: "transform" });
          },
        });
      });

      // siteassist.com initGlobalParallax: fromTo yPercent start -> end, ease none, scrub true, clamp(start) / clamp(end).
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((trigger) => {
        const target = trigger.querySelector<HTMLElement>("[data-parallax-target]") ?? trigger;
        const from = Number(trigger.dataset.parallaxStart ?? 20);
        const to = Number(trigger.dataset.parallaxEnd ?? -20);
        const scrollStart = trigger.dataset.parallaxScrollStart ?? "top bottom";
        gsap.fromTo(target, { yPercent: from }, { yPercent: to, ease: "none", scrollTrigger: { trigger, start: `clamp(${scrollStart})`, end: "clamp(bottom top)", scrub: true } });
      });
    });
    document.querySelectorAll("[data-reveal]").forEach((el) => el.setAttribute("data-shown", ""));

    /* The header takes its colour from the section under it: [data-tone="dark"] flips it to the glass/white state. */
    let frame = 0;
    const update = () => {
      frame = 0;
      const probe = 36;
      const dark = Array.from(document.querySelectorAll<HTMLElement>("[data-tone='dark']")).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= probe && r.bottom >= probe;
      });
      root.dataset.header = dark ? "dark" : "light";
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    update();

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      document.removeEventListener("intro:done", start);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      window.removeEventListener("load", refresh);
      cancelAnimationFrame(frame);
      ctx.revert();
      splits.forEach((s) => s.revert());
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);
}

export function Motion() {
  usePageMotion();
  return null;
}
