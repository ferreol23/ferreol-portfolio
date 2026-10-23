"use client";

/*
  Magnetic — a button gently follows the mouse while it hovers, then settles back.
  Mouse/trackpad only (never on touch screens) and off with reduced motion.
  GSAP moves this wrapper; the button inside keeps its own CSS hover styles.
*/

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/animations/setup";
import { DURATION, EASE } from "@/config/motion";

export function Magnetic({
  children,
  strength = 0.3,
  className = "inline-block",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const el = ref.current;
      if (!el || !contextSafe || prefersReducedMotion()) return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      const xTo = gsap.quickTo(el, "x", { duration: DURATION.microSlow, ease: EASE.out });
      const yTo = gsap.quickTo(el, "y", { duration: DURATION.microSlow, ease: EASE.out });

      const move = contextSafe((event: PointerEvent) => {
        const box = el.getBoundingClientRect();
        xTo((event.clientX - (box.left + box.width / 2)) * strength);
        yTo((event.clientY - (box.top + box.height / 2)) * strength);
      });
      const leave = contextSafe(() => {
        xTo(0);
        yTo(0);
      });

      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
