"use client";

/*
  FooterWordmark — the giant name at the bottom of every page.
  Its letters rise one after another the first time it scrolls into view
  (GSAP SplitText). Decoration only: hidden from screen readers.
  Without JavaScript or with reduced motion, it's simply there.

  On hover, a small orange bubble ("Designed & built with care by …") appears.
  With a mouse it follows the cursor (GSAP quickTo, transform only); otherwise
  it simply shows above the end of the name.
*/

import { Heart } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/animations/setup";
import { DURATION, EASE } from "@/config/motion";
import { en, fill } from "@/content/en";

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

      // The bubble follows the cursor, only with a real mouse.
      const area = root.querySelector<HTMLElement>("[data-tip-area]");
      const tip = root.querySelector<HTMLElement>("[data-tip]");
      if (!area || !tip || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      // Anchor the bubble's bottom-center just above the cursor.
      gsap.set(tip, { left: 0, top: 0, right: "auto", bottom: "auto", xPercent: -50, yPercent: -140 });
      const xTo = gsap.quickTo(tip, "x", { duration: 0.35, ease: EASE.out });
      const yTo = gsap.quickTo(tip, "y", { duration: 0.35, ease: EASE.out });

      const move = (event: PointerEvent, jump = false) => {
        const box = area.getBoundingClientRect();
        // Keep the whole bubble over the name, so it's never cut off at the screen edge.
        const half = tip.offsetWidth / 2;
        const x = gsap.utils.clamp(half, Math.max(half, box.width - half), event.clientX - box.left);
        const y = event.clientY - box.top;
        // On entry, start right at the cursor instead of sliding in from the last spot.
        xTo(x, jump ? x : undefined);
        yTo(y, jump ? y : undefined);
      };
      const enter = (event: PointerEvent) => move(event, true);

      area.addEventListener("pointerenter", enter);
      area.addEventListener("pointermove", move);
      return () => {
        area.removeEventListener("pointerenter", enter);
        area.removeEventListener("pointermove", move);
      };
    },
    { scope },
  );

  return (
    <div ref={scope} className="shell" aria-hidden="true">
      <div data-tip-area className="group relative inline-block cursor-default">
        <p className="display select-none whitespace-nowrap text-[clamp(4.5rem,21vw,19rem)] leading-[0.78] text-surface-2">
          {name}
          <span className="text-accent">.</span>
        </p>
        <span
          data-tip
          className="pointer-events-none absolute bottom-full right-0 mb-3 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent opacity-0 shadow-lg shadow-black/20 transition-opacity duration-200 group-hover:opacity-100"
        >
          <Heart className="size-4 fill-current" />
          {fill(en.footer.wordmarkTip, { name })}
        </span>
      </div>
    </div>
  );
}
