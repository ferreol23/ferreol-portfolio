"use client";

/*
  WorkShrink — "shrink on scroll" transition into "Selected work".
  -----------------------------------------------------------------
  Inspired by fuzeshop.fr: a full-width banner that, as you scroll past it,
  pulls its sides in and rounds its corners (it becomes a card), while the
  background zooms out (1.3 → 1) and the text slides inward so it stays inside
  the card (wrap it in data-shrink-left / data-shrink-right).

  - Large screens only (768px+), like the original. On phones the banner
    simply stays full width.
  - Animates clip-path (paint only, no layout) + transform. clip-path is an
    approved exception to the "transform/opacity only" rule (see CLAUDE.md).
  - Without JavaScript or with reduced motion: a plain, readable banner.

  Second big effect of the home page next to ProcessStory: an exception to the
  "one signature effect per page" rule, chosen by Ferreol (see CLAUDE.md).
*/

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/animations/setup";

// Same values as the original: 3rem side inset, 4rem corners, 1.3 starting zoom.
const INSET_REM = 3;
const RADIUS_REM = 4;
const ZOOM_FROM = 1.3;

type Props = {
  /** Background layer (zooms out). Decorative. */
  media: ReactNode;
  /** Text over the background. Wrap left-side text in [data-shrink-left], right-side text in [data-shrink-right]. */
  children: ReactNode;
};

export function WorkShrink({ media, children }: Props) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panel = scope.current;
      const layer = panel?.querySelector<HTMLElement>("[data-shrink-media]");
      if (!panel || !layer || prefersReducedMotion()) return;
      const left = panel.querySelectorAll<HTMLElement>("[data-shrink-left]");
      const right = panel.querySelectorAll<HTMLElement>("[data-shrink-right]");

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const inset = INSET_REM * rem;
        const radius = RADIUS_REM * rem;
        // Like the original: a banner shorter than the screen finishes when its bottom reaches 30% of the screen.
        const end = panel.offsetHeight < window.innerHeight ? "bottom 30%" : "bottom top";

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: panel, start: "top bottom", end, scrub: true },
        });

        timeline
          .fromTo(
            panel,
            { clipPath: "inset(0px 0px 0px 0px round 0px)" },
            { clipPath: `inset(0px ${inset}px 0px ${inset}px round ${radius}px)` },
            0,
          )
          .fromTo(layer, { scale: ZOOM_FROM }, { scale: 1 }, 0)
          .fromTo(left, { x: 0 }, { x: inset }, 0)
          .fromTo(right, { x: 0 }, { x: -inset }, 0);
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className="relative isolate overflow-hidden bg-surface">
      <div data-shrink-media aria-hidden="true" className="absolute inset-0 -z-10 will-change-transform">
        {media}
      </div>
      {children}
    </div>
  );
}
