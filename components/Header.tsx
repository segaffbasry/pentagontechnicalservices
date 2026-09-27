"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { Arrow } from "@/components/ui";
import { contact, LIVE, nav, sister } from "@/lib/content";
import { getLenis } from "@/lib/scroll";

/* siteassist.com's floating navbar: a 1120px glass pill (8px radius, blur 17px, 1px border, 0 1px 4px shadow)
   that sits over the hero. Over dark sections it turns to smoked glass with white type. Under 1100px the links
   move into a full-screen menu. */
export default function Header() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add("menu-open");
    getLenis()?.stop();
    const panel = menu.current!;
    const items = () => Array.from(panel.querySelectorAll<HTMLElement>("a[href]"));
    items()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        const list = [toggle.current!, ...items()];
        const i = list.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); list[list.length - 1].focus(); }
        else if (!e.shiftKey && i === list.length - 1) { e.preventDefault(); list[0].focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.classList.remove("menu-open");
      getLenis()?.start();
      toggle.current?.focus();
    };
  }, [open]);

  return (
    <header className="header">
      <div className="header__pill">
        <a className="header__logo" href={`${LIVE}/`} aria-label="Pentagon Technical Services home">
          <Logo className="header__logo-colour" />
          <Logo tone="white" className="header__logo-white" />
        </a>
        <nav className="header__nav" aria-label="Main">
          <ul>
            {nav.filter((n) => n.label !== "Partners").map((n) => (
              <li key={n.label}><a href={n.href}>{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="header__actions">
          <a className="btn btn--quiet btn--sm header__phone" href={contact.phoneHref}>{contact.phone}</a>
          <a className="btn btn--sm header__cta" href={contact.contactPage}><span>Contact us</span><Arrow /></a>
          <button ref={toggle} className="header__toggle" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((v) => !v)}>
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="header__burger" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </div>

      <div id="menu" ref={menu} className="menu" data-open={open || undefined} hidden={!open} data-lenis-prevent>
        <nav aria-label="Menu">
          <ul className="menu__list">
            {nav.map((n, i) => (
              <li key={n.label} style={{ "--i": i } as React.CSSProperties}>
                <a href={n.href}><span className="menu__num">{String(i + 1).padStart(2, "0")}</span>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu__foot">
          <a href={contact.phoneHref}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={sister.href}>{sister.label}</a>
        </div>
      </div>
    </header>
  );
}
