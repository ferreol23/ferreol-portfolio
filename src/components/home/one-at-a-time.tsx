"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A list of videos where starting one pauses the others.
 * "play" doesn't bubble, so one listener in the capture phase catches every video in the list.
 */
export function OneAtATime({ className, children }: { className?: string; children: ReactNode }) {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const onPlay = (event: Event) => {
      el.querySelectorAll("video").forEach((video) => {
        if (video !== event.target && !video.paused) video.pause();
      });
    };
    el.addEventListener("play", onPlay, true);
    return () => el.removeEventListener("play", onPlay, true);
  }, []);

  return (
    <ul ref={list} className={className}>
      {children}
    </ul>
  );
}
