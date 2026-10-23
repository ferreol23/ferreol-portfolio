"use client";

import { CircleAlert, CircleCheck } from "lucide-react";
import { useRef, type Ref } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/animations/setup";
import { DURATION, EASE } from "@/config/motion";

/**
 * Message shown above a form's button after sending. It receives focus, so
 * screen-reader and keyboard users hear/see the result right away.
 * Motion: a success message rises in gently; an error gives a short shake.
 */
export function FormStatus({ kind, message, ref }: { kind: "success" | "error"; message: string; ref?: Ref<HTMLDivElement> }) {
  const success = kind === "success";
  const box = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = box.current;
      if (!el || prefersReducedMotion()) return;
      if (success) {
        gsap.from(el, { opacity: 0, y: 12, scale: 0.98, duration: DURATION.enterFast, ease: EASE.out });
      } else {
        gsap.fromTo(el, { x: 0 }, { keyframes: { x: [-8, 8, -5, 5, 0] }, duration: DURATION.microSlow, ease: "none" });
      }
    },
    { scope: box, dependencies: [kind, message] },
  );

  return (
    <div ref={box}>
      <div
        ref={ref}
        tabIndex={-1}
        role={success ? "status" : "alert"}
        className={`flex items-start gap-3 rounded-2xl border p-4 font-semibold focus:outline-none ${
          success ? "border-accent-strong text-text" : "border-danger text-text"
        }`}
      >
        {success ? (
          <CircleCheck className="mt-0.5 size-5 shrink-0 text-accent-strong" aria-hidden="true" />
        ) : (
          <CircleAlert className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden="true" />
        )}
        {message}
      </div>
    </div>
  );
}
