/* One easing family for the whole site. The CSS twin is --ease in app/globals.css. */

// siteassist.com `.button` transition: 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) (computed style). Used for every
// hover and, via CustomEase "pts", for the scroll reveals.
export const EASE = "0.215,0.61,0.355,1";

// siteassist.com tab system (inline script `initTabSystem`): timeline defaults { duration: 0.3, ease: "power3" },
// progress bar { ease: "power1.inOut" }, autoplay 5000ms.
export const TABS = { duration: 0.3, ease: "power3", bar: "power1.inOut", autoplay: 5 };

// siteassist.com Lenis init (inline script): new Lenis({ autoRaf: true, lerp: 0.6, wheelMultiplier: 1 }).
export const LENIS = { lerp: 0.6, wheelMultiplier: 1 };

// siteassist.com marquee: data-marquee-speed="30", data-marquee-scroll-speed="2", duplicate 2, direction left.
export const MARQUEE = { speed: 30, scrollSpeed: 2, duplicate: 2 };

export const timing = {
  label: 0.6,
  text: 0.9,
  card: 0.8,
  image: 1.2,
};
