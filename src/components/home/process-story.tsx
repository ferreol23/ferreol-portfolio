"use client";

/*
  ProcessStory — the page's signature effect (one per page, see CLAUDE.md).
  -----------------------------------------------------------------------
  On large screens, as each step of "How I work" reaches the middle of the
  screen: the big pinned number switches to that step, the step lights up while
  the others dim, and the progress bar fills with the scroll.

  Without JavaScript, on small screens or with reduced motion: nothing moves and
  every step stays fully readable.
*/

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/animations/setup";
import { DURATION } from "@/config/motion";

const DIMMED = 0.25;

export function ProcessStory({ className, children }: { className?: string; children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
        const numbers = Array.from(root.querySelectorAll<HTMLElement>("[data-step-number]"));
        const progress = root.querySelector<HTMLElement>("[data-process-progress]");
        const list = root.querySelector<HTMLElement>("ol");
        if (!steps.length || !list) return;

        gsap.set(numbers, { opacity: (i: number) => (i === 0 ? 1 : 0), yPercent: (i: number) => (i === 0 ? 0 : 25) });
        gsap.set(steps, { opacity: (i: number) => (i === 0 ? 1 : DIMMED) });

        const show = (active: number) => {
          gsap.to(numbers, {
            opacity: (i: number) => (i === active ? 1 : 0),
            yPercent: (i: number) => (i === active ? 0 : i < active ? -25 : 25),
            duration: DURATION.microSlow,
            overwrite: true,
          });
          gsap.to(steps, {
            opacity: (i: number) => (i === active ? 1 : DIMMED),
            duration: DURATION.micro,
            overwrite: true,
          });
        };

        steps.forEach((step, index) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) show(index);
            },
          });
        });

        if (progress) {
          gsap.fromTo(
            progress,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: { trigger: list, start: "top center", end: "bottom center", scrub: true },
            },
          );
        }
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
