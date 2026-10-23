"use client";

/*
  FooterWordmark — the giant name at the bottom of every page.
  Its letters rise one after another the first time it scrolls into view
  (GSAP SplitText). Decoration only: hidden from screen readers.
  Without JavaScript or with reduced motion, it's simply there.
*/

import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/animations/setup";
import { DURATION, EASE } from "@/config/motion";

export function FooterWordmark({ name }: { name: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      const text = root?.querySelector<HTMLElement>("p");
      if (!root || !text || prefersReducedMotion()) return;

      SplitText.create(text, {
        type: "lines,chars",
        mask: "lines",
        aria: "none",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.chars, {
            yPercent: 110,
            duration: DURATION.enterSlow,
            ease: EASE.out,
            stagger: 0.06,
            scrollTrigger: { trigger: root, start: "top 95%", once: true },
          }),
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className="shell" aria-hidden="true">
      <p className="display select-none whitespace-nowrap text-[clamp(4.5rem,21vw,19rem)] leading-[0.78] text-surface-2">
        {name}
        <span className="text-accent">.</span>
      </p>
    </div>
  );
}
