/*
  MOTION TOKENS — single source of truth for timing and easing (JS side).
  ----------------------------------------------------------------------
  Mirror of the CSS custom properties in globals.css (--dur-*, --ease-*).
  Keep the two in sync: change a value here, change it there.

  Rules (see CLAUDE.md):
  - Micro-interactions: 0.2–0.4s   (hover, toggles, small feedback)
  - Appearances:        0.6–1s     (entrances, reveals)
  - Default easing:     power3.out
*/

/** Durations in SECONDS (GSAP / motion use seconds). */
export const DURATION = {
  microFast: 0.2,
  micro: 0.3,
  microSlow: 0.4,
  enterFast: 0.6,
  enter: 0.8,
  enterSlow: 1,
} as const;

/** GSAP easing names. power3.out is the project default. */
export const EASE = {
  out: "power3.out", // default — fast start, gentle stop
  inOut: "power3.inOut",
  in: "power3.in",
} as const;

/**
 * Cubic-bezier equivalents, for `motion` (motion/react) and raw CSS where a
 * named GSAP ease is not available. `out` approximates power3.out.
 */
export const EASE_BEZIER = {
  out: [0.215, 0.61, 0.355, 1],
  inOut: [0.645, 0.045, 0.355, 1],
  in: [0.55, 0.055, 0.675, 0.19],
} as const;

/** Options for the Lenis smooth-scroll instance (see animations/setup.ts). */
export const LENIS_OPTIONS = {
  // Let GSAP's ticker drive the loop (we add lenis.raf to gsap.ticker).
  autoRaf: false,
  duration: 1.1,
  smoothWheel: true,
  // Smoothly scroll to "#work"-style links. Lenis already stops below the sticky header
  // by reading `scroll-padding-top` on <html> (globals.css), so no extra offset here.
  anchors: true,
} as const;

export type Duration = keyof typeof DURATION;
export type Ease = keyof typeof EASE;
