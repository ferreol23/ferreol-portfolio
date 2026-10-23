"use client";

/*
  RevealScope — fades elements marked `data-reveal` up into view as they scroll in.
  -------------------------------------------------------------------------------
  - The page is fully visible without JavaScript; GSAP only hides an element right
    before animating it in.
  - Only opacity + transform are animated (never visibility), so keyboard users can
    still Tab to content that hasn't appeared yet.
  - Does nothing when the visitor asked for reduced motion.
*/

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/animations/setup";
import { DURATION, EASE } from "@/config/motion";

export function RevealScope({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
      gsap.set(items, { opacity: 0, y: 40 });

      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: DURATION.enter,
            ease: EASE.out,
            stagger: 0.08,
            overwrite: true,
          }),
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
