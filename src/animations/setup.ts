/*
  ANIMATION BASE — the single setup file for the whole site.
  ----------------------------------------------------------
  Responsibilities (and nothing else — NO effects live here):
    1. Register the GSAP plugins used across the app (ScrollTrigger, SplitText, useGSAP).
    2. Start Lenis smooth scrolling and sync it with ScrollTrigger.
    3. Respect prefers-reduced-motion: if "reduce", Lenis never starts and the
       native scroll is used instead.

  `initMotion()` is called once, from the client MotionProvider mounted in the
  root layout. It returns a cleanup function (used on unmount).

  GSAP's default easing/duration are set here from the shared motion tokens so
  every tween inherits the project's house style unless it opts out.
*/

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { DURATION, EASE, LENIS_OPTIONS } from "@/config/motion";

// Register once. useGSAP is itself a GSAP plugin and must be registered too.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Project-wide tween defaults (power3.out, ~micro duration) — see CLAUDE.md.
gsap.defaults({ ease: EASE.out, duration: DURATION.micro });

/** True when the visitor asked the OS to reduce motion. SSR-safe. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Boot the animation base. Safe to no-op on the server and when reduced motion
 * is requested. Returns a cleanup function that tears everything back down.
 */
export function initMotion(): () => void {
  if (typeof window === "undefined") return () => {};

  // Reduced motion: keep native scrolling, start nothing. The CSS safety net in
  // globals.css flattens durations; here we simply don't run Lenis.
  if (prefersReducedMotion()) return () => {};

  const lenis = new Lenis(LENIS_OPTIONS);

  // Keep ScrollTrigger in step with Lenis's virtual scroll position.
  lenis.on("scroll", ScrollTrigger.update);

  // Drive Lenis from GSAP's ticker (autoRaf is off), in milliseconds.
  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);

  // No artificial catch-up after a slow frame — keeps scroll animations exact.
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(raf);
    lenis.off("scroll", ScrollTrigger.update);
    lenis.destroy();
  };
}
