import { LOGO } from "@/lib/logo";

type Props = { variant?: "stacked" | "inline"; tone?: "colour" | "white"; className?: string; title?: string };

const [mx, my, mw, mh] = LOGO.markBox;
// Word block: "PENTAGON" cap top is row 102 of the 168x144 lockup, the subline baseline row 143.4.
const WORD_BOX = "0 101 168 43";

/* The mark's five facets. Each <g> is its own transform target for the preloader, so GSAP never overwrites
   the polygon geometry. A hairline stroke in the facet colour closes the anti-aliasing seam between facets. */
export function Mark({ tone = "colour" }: { tone?: Props["tone"] }) {
  const mono = tone === "white";
  return (
    <>
      {!mono && <polygon data-hole points={LOGO.hole.points} fill={LOGO.hole.fill} />}
      {LOGO.facets.map((f, i) => {
        const fill = mono ? "#FFFFFF" : f.fill;
        const opacity = mono ? LOGO.mono[i] : 1;
        return (
          <g key={f.name} data-facet={i}>
            <polygon points={f.points} fill={fill} stroke={fill} strokeWidth=".4" strokeLinejoin="round" fillOpacity={opacity} strokeOpacity={opacity} />
          </g>
        );
      })}
    </>
  );
}

export function Word({ fill }: { fill: string }) {
  return (
    <g fill={fill}>
      <g data-word="top">{LOGO.top.map((g, i) => <path key={i} data-letter d={g.d} />)}</g>
      <g data-word="sub">{LOGO.sub.map((g, i) => <path key={i} data-letter d={g.d} />)}</g>
    </g>
  );
}

export default function Logo({ variant = "inline", tone = "colour", className, title = "Pentagon Technical Services" }: Props) {
  const fill = tone === "white" ? "#FFFFFF" : LOGO.word;
  if (variant === "stacked") {
    return (
      <svg className={className} viewBox={LOGO.viewBox} role="img" aria-label={title}>
        <Mark tone={tone} />
        <Word fill={fill} />
      </svg>
    );
  }
  // Inline lockup for the header: the mark beside the two-line wordmark, built from the same parts.
  return (
    <span className={`logo-inline ${className ?? ""}`} role="img" aria-label={title}>
      <svg viewBox={`${mx} ${my} ${mw} ${mh}`} aria-hidden="true" className="logo-inline__mark"><Mark tone={tone} /></svg>
      <svg viewBox={WORD_BOX} aria-hidden="true" className="logo-inline__word"><Word fill={fill} /></svg>
    </span>
  );
}
