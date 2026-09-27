"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "@/lib/ease";

/* Plugins and the site curve are registered once, at import, so every component can use ease "pts"
   regardless of which effect runs first. */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("pts", EASE);
}

export { gsap, ScrollTrigger };
