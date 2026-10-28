"use client";

/*
  FooterWordmark — the giant name at the bottom of every page.
  - Its letters rise one after another the first time it scrolls into view.
  - Mouse: the letters near the cursor lift and lean, like a wave following it.
  - Touch: the letter under the finger hops (tap or slide along the name).
  Only transform is animated (GSAP quickTo on y / rotation, pivot at the bottom).
  Decoration only: hidden from screen readers. Without JavaScript or with
  reduced motion, it's simply there.
*/

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/animations/setup";
import { DURATION, EASE } from "@/config/motion";

// How high a letter lifts, as a share of its height.
const LIFT = 0.2;
// Biggest lean, in degrees, for letters at the edge of the wave.
const LEAN = 25;

export function FooterWordmark({ name }: { name: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      const row = root?.querySelector<HTMLElement>("[data-row]");
      if (!root || !row || prefersReducedMotion()) return;
      const chars = gsap.utils.toArray<HTMLElement>("[data-char]", root);
      const letters = gsap.utils.toArray<HTMLElement>("[data-letter]", root);

      // Entrance: each letter rises from below the edge.
      gsap.from(chars, {
        yPercent: 130,
        duration: DURATION.enterSlow,
        ease: EASE.out,
        stagger: 0.05,
        scrollTrigger: { trigger: row, start: "top 95%", once: true },
      });

      const yTo = letters.map((letter) => gsap.quickTo(letter, "y", { duration: 0.6, ease: EASE.out }));
      const rotateTo = letters.map((letter) => gsap.quickTo(letter, "rotation", { duration: 0.6, ease: EASE.out }));
      const lift = () => letters[0].offsetHeight * LIFT;
      // Measured on the (never rotated) wrappers, so leaning letters don't skew the maths.
      const centers = () =>
        chars.map((char) => {
          const box = char.getBoundingClientRect();
          return box.left + box.width / 2;
        });

      // Mouse: smooth bump centered on the cursor, fading out over a fifth of the name's width.
      const wave = (clientX: number) => {
        const reach = row.offsetWidth / 5;
        const height = lift();
        centers().forEach((center, index) => {
          const distance = clientX - center;
          const t = Math.max(0, 1 - Math.abs(distance) / reach);
          const bump = t * t * (3 - 2 * t); // smoothstep: soft at the edges
          yTo[index](-bump * height);
          rotateTo[index]((-distance / reach) * t * LEAN);
        });
      };
      const rest = () => letters.forEach((_, index) => (yTo[index](0), rotateTo[index](0)));

      // Touch: the letter under the finger hops once, then lands.
      let lastHop = -1;
      const hop = (index: number) => {
        yTo[index](-lift() * 1.15);
        rotateTo[index](gsap.utils.random(-12, 12));
        gsap.delayedCall(0.16, () => (yTo[index](0), rotateTo[index](0)));
      };
      const touchAt = (clientX: number) => {
        const index = chars.findIndex((char) => {
          const box = char.getBoundingClientRect();
          return clientX >= box.left && clientX <= box.right;
        });
        if (index !== -1 && index !== lastHop) hop(index);
        lastHop = index;
      };

      const onMove = (event: PointerEvent) =>
        event.pointerType === "mouse" ? wave(event.clientX) : touchAt(event.clientX);
      const onDown = (event: PointerEvent) => {
        if (event.pointerType === "mouse") return;
        lastHop = -1;
        touchAt(event.clientX);
      };
      const onLeave = (event: PointerEvent) => {
        lastHop = -1;
        if (event.pointerType === "mouse") rest();
      };

      row.addEventListener("pointermove", onMove);
      row.addEventListener("pointerdown", onDown);
      row.addEventListener("pointerleave", onLeave);
      return () => {
        row.removeEventListener("pointermove", onMove);
        row.removeEventListener("pointerdown", onDown);
        row.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope },
  );

  // One wrapper per letter (rises on entrance) around the letter itself (lifts and leans).
  const letters = [...name.split("").map((char) => ({ char, accent: false })), { char: ".", accent: true }];

  return (
    <div ref={scope} className="shell" aria-hidden="true">
      {/* Top padding = room for the letters to lift; overflow-hidden hides them below before the entrance. */}
      <p
        data-row
        className="display flex w-fit touch-pan-y select-none overflow-hidden whitespace-nowrap pt-[0.3em] text-[clamp(4.5rem,21vw,19rem)] leading-[0.78] text-wordmark"
      >
        {letters.map(({ char, accent }, index) => (
          <span key={`${char}-${index}`} data-char className="inline-block">
            <span
              data-letter
              className={`inline-block origin-bottom will-change-transform ${accent ? "text-accent" : ""}`}
            >
              {char}
            </span>
          </span>
        ))}
      </p>
    </div>
  );
}
