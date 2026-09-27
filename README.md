# Pentagon Technical Services

A private prospect demo: the pentagontechnicalservices.com **homepage only**, rebuilt as a single Next.js page. It keeps Pentagon's own logo, fonts, copy, film and photography and gives them a new skin. Look, layout and motion follow siteassist.com. Every link that leaves the homepage goes to the real page on the live site. The site is `noindex, nofollow` and carries the Regen PostHog snippet, with no visible additions.

## Run locally

Run `npm install`, then `npm run dev` (http://127.0.0.1:3023). `npm run build` then `npm start` serves production, and `npm run typecheck` checks TypeScript.

`npm run logo` rebuilds the vector logo (it needs `fonttools`). `npm run media` rebuilds `public/media` from `_scrape/` (it needs Pillow and ffmpeg). `_scrape/` is gitignored and holds the raw downloads from the live site.

## Recon

### Live homepage (WordPress, custom theme), in order

1. **Hero.** `banner.mp4` (850×480, 13.4s) over `banner1.jpg` with an `rgba(7,64,89,.45)` overlay. The line "Global construction consultancy delivering…", plus a box with "Project & Construction Management" copy and "Explore more projects".
2. **Intro.** The H1 "Global Critical Infrastructure Specialists", the 300+ MW sentence, two paragraphs and "More about us".
3. **Four landing cards.** Project & Construction Management, Cost & Commercial Management, Commissioning & Validation Management and Technical Fit Out. Technical Fit Out has an empty `href` on the live site.
4. **"Your Critical Infrastructure is in Safe Hands"** over `safe-hands.jpg`.
5. **Projects.** Three featured projects (Frankfurt 6, Zurich 1, Berlin 4), a line of copy and "Explore more projects".
6. **Accreditations & Certifications.** One composite image and the ISO scope note.
7. **Sustainability statement** with 7 points, on a cyan band.
8. **News.** The lead story ("PTS Expands into the USA") and four more.
9. **Footer.** Phone, email, socials, 15 office addresses, Modern Slavery, Privacy Policy and the copyright line.

### Links

Yoast sitemaps exist, and unknown paths return a real 404, so status codes can be trusted. All 49 outbound links on this page were checked and return 200. `/contact-us/` exists and is not in the live menu; it is used for "Contact us". `/technical-fit-out/` is a 404.

### Brand

- **Logo.** The site only serves rasters: `pentagontechnicalservices.png` (168×144) and `icon.png` (136×129). `scripts/logo.py` rebuilds both parts as vectors:
  - **Mark.** Five triangles in an aperture. It is a regular pentagon; triangle *k* runs from V*k* to V*k+1* to I*k*, where I*k* sits on an inner pentagon of 0.194R at (−130 + 72*k*)°. These values were measured on a 6× upscale of `icon.png`, and I*k+1* falls on edge V*k+1*→I*k*, which makes the pinwheel. Facet colours were sampled from the header PNG: `#074059`, `#58585A`, `#A7A9AC`, `#8CD1E9` and `#1AB1C8`.
  - **Wordmark.** "PENTAGON" is set in Jost 400 and "TECHNICAL SERVICES" in Jost 300, both tracked to the lockup width measured on the PNG. The fill is `#0A2B4A`.
  - **Outputs.** `lib/logo.ts` holds one path per facet and per letter, for the preloader. The script also writes `public/brand/logo.svg`, `logo-white.svg` (the facets become white at stepped opacities) and `mark.svg`, plus `app/icon.svg`.
- **Fonts** (from computed styles): Jost and Roboto Condensed, both open source, loaded through `next/font` (self-hosted at build).
- **Film:** the live `banner.mp4`, used as-is. Poster frame taken at 4s.

### Palette

| Token | Hex | Source |
| --- | --- | --- |
| Navy | `#074059` | The live site's most-used colour, rgb(7,64,89); the logo's top facet |
| Ink | `#0A2B4A` | The logo wordmark. Body text, and the only text colour used on cyan (4.9:1) |
| Cyan | `#04A3D5` | The live primary colour, rgb(4,163,213). Used for accents, fills and hover states. It never carries white text, which would be 2.9:1 |
| White | `#FFFFFF` | Page background |
| Mist / Mist 2 / Line | `#EEF2F4` / `#E2E8EB` / `#D5DDE2` | siteassist's neutrals (`#EFF2EF`, `#E3E7E2`, `#D9DFD9`), shifted from green-grey to navy-grey |

The logo's greys and light blue appear only inside the logo.

### Reference: siteassist.com (Webflow, GSAP 3.15 and Lenis 1.2.3)

- **Look and layout.**
  - A floating 1120px glass navbar: 8px radius, white at 50%, `blur(17px)`, a 1px `#EFF2EF` border and a `0 1px 4px rgba(0,0,0,.08)` shadow.
  - A 100vh film hero with a 62.4px uppercase Geist Mono headline, a hairline rule, a coordinate readout with a blinking dot, and a client-logo strip.
  - A square-bullet section label (7×7px), then 50px/55px Geist statements.
  - A dark 8px-radius tab panel, a numbered "Solutions⁹" list, a square photo grid, a grey testimonial slider with square arrow buttons, and an inset `#E3E7E2` footer panel ("Let's talk").
- **Controls.** Buttons are Geist Mono 14px with .56px tracking, 7×10.5px padding and a 3.5px radius. They transition over `0.2s cubic-bezier(.215,.61,.355,1)`.
- **Motion** (from its inline scripts):
  - Lenis `{ lerp: 0.6, wheelMultiplier: 1 }`.
  - Global parallax: `yPercent` from start to end, `scrub: true`, `clamp()` start and end.
  - A marquee (speed 30, scroll speed 2, duplicate 2) that reverses direction with the scroll.
  - The tab system, below.

## Copied interaction: the siteassist tab panel

`components/home/Pillars.tsx` ports siteassist's `initTabSystem` line for line:

- It starts once, when the panel reaches `top 80%`. The timeline defaults are `{ duration: .3, ease: "power3" }`.
- **Outgoing tab.** The bar goes to `scaleX 0` from the right, the visual goes to `autoAlpha 0` and `xPercent 3`, and the details collapse to `height 0`.
- **Incoming tab.** The visual moves from `xPercent 3` to 0 and fades in, the details open to `height: auto`, and the bar resets.
- **Autoplay.** Once a switch completes, the bar fills over 5s on `power1.inOut` and moves to the next tab. Clicks during a switch are ignored.

Additions: the tabs are real buttons with `aria-selected`, the arrow keys move between them, and autoplay is off under reduced motion. The constants live in `lib/ease.ts` (`TABS`).

## Motion system (`components/motion.tsx`)

| Move | Applied with | What it does |
| --- | --- | --- |
| label | `data-reveal="label"` | 10px rise and fade, 0.6s |
| text | `data-reveal="text"` | Each word slides up out of its own mask, 0.9s, small stagger |
| card | `data-reveal="card"` | Batched 24px rise and fade, 0.8s, 0.07s stagger |
| image | `data-reveal="image"` | The frame opens from an 18% top inset while the photo settles from 1.12 scale, 1.2s |
| parallax | `data-parallax` (+ `data-parallax-target`, `-start`, `-end`, `-scroll-start`) | siteassist's global parallax |

All moves play once, on the `pts` curve (siteassist's button curve, registered in `lib/gsap.ts`). The hero is excluded because its own timeline runs after the preloader.

- **Preloader** (`components/Preloader.tsx`, about 2.2s). The five facets close in like an aperture: each turns 72° about the pentagon's centre as it grows. The letters rise, a cyan bar fills, and then the white panel lifts. It dispatches `intro:done`, which the hero timeline and Lenis wait for.
- **Header tone.** Any `[data-tone="dark"]` section under the header switches it to smoked glass with the white logo.
- **Also:** the 300+ counter, the hero office ticker (siteassist's marquee), and a cursor-follow preview on the services list (pointer devices only).

## Accessibility and fallbacks

- The boot script adds `js` and `is-loading` before first paint unless reduced motion is requested. Without them, nothing starts hidden.
- **No JS.** Every section renders in place: all seven "Why Pentagon" points are listed, and the `<noscript>` style removes the preloader.
- **Reduced motion.** There is no preloader, no smooth scroll, no reveals, no parallax and no ticker animation.
- **Keyboard and screen readers.**
  - A skip link, and `:focus-visible` rings in cyan (white on dark sections).
  - The mobile menu traps focus, closes on Escape and returns focus to the toggle.
  - The pillar tabs follow the ARIA tab pattern, and the slider count is `aria-live`.
- **Contrast.** Body text is ink on white (14.4:1); muted text is `#4D6475` (6.2:1 on white, 5:1 on Mist 2). White text only sits on navy or on photography under a navy overlay.
- Checked at 390, 768 and 1440px with no horizontal scroll.

## Decisions

- **Homepage only**, as briefed. Nav, footer, cards and news all link out to the live site.
- **Section order.** Intro, then pillars, then a services list (from the live Services menu), then the safe-hands band, projects, "Why Pentagon", accreditations and news. The live hero box repeats the first landing card, so it was merged into it.
- **Technical Fit Out** has no page (the live `href` is empty), so it links to `/services/`.
- **Header.** "Partners" appears in the menu overlay and the footer but not in the desktop bar, which has no room for it. "Contact us" goes to `/contact-us/`.
- **Socials.** The live footer's Facebook and Twitter icons point to the bare `facebook.com` and `twitter.com` home pages, so only LinkedIn is kept.
- **Offices.** Three footer entries have no address (Pentagon Technical Services LLC, SPA and SAS) and are left out. The other 15 are verbatim. The `city` field is only a short label for the ticker and the office index.
- **Coordinates.** The hero readout is the Beaconsfield head office (HP9 2FY), rounded to 51.61°N 0.64°W.
- **Labels added** for structure: "What we do", "Featured work", "All projects", "Why Pentagon", "Assurance" and "Let's talk". These are UI labels, not claims.
- **Hero film.** The only film is 850×480, so it sits under the navy overlay, where the softness reads as depth.
- **Lenis lerp 0.6** is siteassist's measured value. It feels close to native scrolling.
- The service-list preview images reuse the live homepage photography. The live site has no per-service images.

## Structure

```
app/            layout (fonts, noindex, PostHog, boot script), page (section order), icon.svg
components/     Preloader, Header, Footer, Logo, motion (reveal system + Lenis), ui (Button, Label, icons)
components/home Hero, Marquee, Intro, Pillars (copied tabs), Services, SafeHands, Projects, Values, Accreditations, News
lib/            content.ts (all copy + links), logo.ts (generated), ease.ts (measured values), gsap.ts, posthog.ts, scroll.ts, split.ts
styles/         chrome.css (preloader, header, menu, footer), home.css (sections)
scripts/        logo.py, media.py
```

## Deployment

The domain will be `{slug}.regendigital.co` on Vercel. It is still pending: it needs the prospect slug and a logged-in Vercel CLI.
