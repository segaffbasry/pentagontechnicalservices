export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Arrow({ dir = "right" }: { dir?: "right" | "left" | "up-right" }) {
  const rotate = dir === "left" ? 180 : dir === "up-right" ? -45 : 0;
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}>
      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
    </svg>
  );
}

/* Links on this demo always leave for the live site, in the same tab, like the live menu. */
export function Button({ href, children, variant, size }: { href: string; children: React.ReactNode; variant?: "quiet" | "light" | "glass"; size?: "sm" }) {
  const cls = ["btn", variant && `btn--${variant}`, size && `btn--${size}`].filter(Boolean).join(" ");
  return (
    <a className={cls} href={href}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

export function Label({ children, reveal = true }: { children: React.ReactNode; reveal?: boolean }) {
  return <p className="label" data-reveal={reveal ? "label" : undefined}>{children}</p>;
}

export function LinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
