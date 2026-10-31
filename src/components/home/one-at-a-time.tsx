"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A list of videos where starting one pauses the others.
 * "play" doesn't bubble, so one listener in the capture phase catches every video in the list.
 * It also shows each hidden "New" badge whose `data-new-until` time hasn't passed yet.
 */
export function OneAtATime({ className, children }: { className?: string; children: ReactNode }) {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const now = Date.now();
    el.querySelectorAll<HTMLElement>("[data-new-until]").forEach((badge) => {
      badge.hidden = now >= Number(badge.dataset.newUntil);
    });
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
