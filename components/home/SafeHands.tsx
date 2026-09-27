import { safeHands } from "@/lib/content";

/* The live homepage's "Your Critical / Infrastructure is in Safe / Hands" band, set as a full-bleed statement
   over its own photograph. The photo drifts with siteassist.com's parallax (yPercent -12 -> 12, scrubbed). */
export default function SafeHands() {
  return (
    <section className="safe" data-tone="dark" aria-label="Your critical infrastructure is in safe hands">
      <div className="safe__media" data-parallax data-parallax-start="-12" data-parallax-end="12">
        <img data-parallax-target src="/media/safe-hands.webp" alt="" loading="lazy" />
      </div>
      <div className="safe__shade" />
      <p className="safe__text wrap" data-reveal="text">
        {safeHands.map((line, i) => <span key={i} className="safe__line">{line}{" "}</span>)}
      </p>
    </section>
  );
}
