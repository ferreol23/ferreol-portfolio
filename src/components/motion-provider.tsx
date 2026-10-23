"use client";

/*
  MotionProvider — the client entry point for the animation base.
  ---------------------------------------------------------------
  Mounted once in the root layout. It boots the shared setup (Lenis +
  ScrollTrigger sync) on mount and tears it down on unmount. It renders nothing
  and wraps nothing, so the page stays fully readable without JavaScript.

  No effects are defined here. Per-component animations belong in their own
  components using `useGSAP(() => { ... }, { scope: ref })`.
*/

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initMotion } from "@/animations/setup";

export function MotionProvider() {
  useEffect(() => {
    const cleanup = initMotion();

    // Images change layout as they load; recompute ScrollTrigger positions
    // once everything is in. (No-op when reduced motion kept scroll native.)
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      cleanup();
    };
  }, []);

  return null;
}
