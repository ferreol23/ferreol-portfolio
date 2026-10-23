"use client";

/*
  Orange strip with services scrolling sideways forever (GSAP).
  - Speeds up while the page is scrolled fast, and leans slightly in the scroll
    direction, then eases back to its calm pace.
  - Pauses while hovered.
  - The list is drawn twice so the loop is seamless; the copy is hidden from screen readers.
  - Without JavaScript or with reduced motion it simply stays still.
*/

import { Asterisk } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/animations/setup";
import { DURATION, EASE } from "@/config/motion";
import { en } from "@/content/en";

const LOOP_SECONDS = 40; // time for one full loop at calm speed

export function Marquee() {
  const scope = useRef<HTMLDivElement>(null);
  const items = en.marquee;

  useGSAP(
    (_context, contextSafe) => {
      const root = scope.current;
      if (!root || !contextSafe || prefersReducedMotion()) return;
      const band = root.querySelector<HTMLElement>("[data-marquee-band]");
      const track = root.querySelector<HTMLElement>("[data-marquee-track]");
      if (!band || !track) return;

      const loop = gsap.to(track, { xPercent: -50, duration: LOOP_SECONDS, ease: "none", repeat: -1 });
      const skewTo = gsap.quickTo(band, "skewX", { duration: DURATION.microSlow, ease: EASE.out });
      let settle: gsap.core.Tween | undefined;

      const onScroll = contextSafe((self: ScrollTrigger) => {
        const velocity = self.getVelocity(); // pixels per second
        gsap.to(loop, { timeScale: gsap.utils.clamp(1, 6, 1 + Math.abs(velocity) / 300), duration: 0.2, overwrite: true });
        skewTo(gsap.utils.clamp(-6, 6, -velocity / 200));
        settle?.kill();
        settle = gsap.delayedCall(0.2, () => {
          gsap.to(loop, { timeScale: 1, duration: DURATION.enterSlow, ease: EASE.out, overwrite: true });
          skewTo(0);
        });
      });

      ScrollTrigger.create({ trigger: root, start: "top bottom", end: "bottom top", onUpdate: onScroll });

      const pause = contextSafe(() => gsap.to(loop, { timeScale: 0, duration: DURATION.microSlow, overwrite: true }));
      const resume = contextSafe(() => gsap.to(loop, { timeScale: 1, duration: DURATION.microSlow, overwrite: true }));
      band.addEventListener("pointerenter", pause);
      band.addEventListener("pointerleave", resume);
      return () => {
        band.removeEventListener("pointerenter", pause);
        band.removeEventListener("pointerleave", resume);
      };
    },
    { scope },
  );

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="display px-6 text-3xl uppercase sm:text-4xl">{item}</span>
          <Asterisk className="size-7 shrink-0" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    // The outer box clips the slanted strip so it never causes sideways scrolling.
    <div ref={scope} className="overflow-x-clip py-6">
      <div data-marquee-band className="-mx-10 -rotate-1 overflow-hidden bg-accent py-5 text-on-accent">
        <div data-marquee-track className="flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
