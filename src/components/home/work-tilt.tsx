"use client";

/*
  WorkTilt — 3D transition into "Selected work".
  ----------------------------------------------
  The top of the section (title + first project) arrives lying back in
  perspective, like a sheet tilted away from you, and straightens up to face
  you as you scroll. Inspired by product pages from large brands.

  Second big effect of the home page next to ProcessStory: an exception to the
  "one signature effect per page" rule, chosen by Ferreol (see CLAUDE.md).

  - Only transform + opacity are animated, scrubbed with the scroll.
  - Without JavaScript or with reduced motion: nothing moves, the section is flat
    and fully readable.
*/

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/animations/setup";

export function WorkTilt({ children }: { children: ReactNode }) {
  // Outer box never moves: ScrollTrigger measures it, the inner one tilts.
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      const plane = root?.querySelector<HTMLElement>("[data-tilt-plane]");
      if (!root || !plane || prefersReducedMotion()) return;

      const mm = gsap.matchMedia();
      // Stronger tilt on large screens, gentler on phones.
      mm.add({ large: "(min-width: 768px)", small: "(max-width: 767px)" }, (context) => {
        const large = Boolean(context.conditions?.large);

        gsap.fromTo(
          plane,
          {
            rotationX: large ? 40 : 25,
            scale: large ? 0.88 : 0.94,
            opacity: 0.3,
            // Turns around its middle: the top leans away, the bottom comes closer.
            transformOrigin: "50% 50%",
            transformPerspective: large ? 1200 : 900,
          },
          {
            rotationX: 0,
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: large ? "top 15%" : "top 30%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope },
  );

  return (
    <div ref={scope}>
      <div data-tilt-plane className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
