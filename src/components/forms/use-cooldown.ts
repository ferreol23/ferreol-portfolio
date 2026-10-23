"use client";

import { useEffect, useState } from "react";

/**
 * 30-second pause between two sends of the same form (anti-spam).
 * The end time is also saved in localStorage, so reloading the page doesn't skip it.
 *
 * - `check()`  → call when the visitor submits: returns the seconds left (0 = allowed).
 * - `start()`  → call after a successful send.
 * - `remaining` → seconds left, for the button label.
 */
export function useCooldown(storageKey: string, durationMs = 30_000) {
  const [until, setUntil] = useState(0);
  const [now, setNow] = useState(0);

  // Tick once a second while a cooldown is running.
  useEffect(() => {
    if (!until) return;
    const timer = setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (current >= until) {
        clearInterval(timer);
        setUntil(0);
      }
    }, 250);
    return () => clearInterval(timer);
  }, [until]);

  const remaining = until ? Math.max(0, Math.ceil((until - now) / 1000)) : 0;

  function check(): number {
    let saved = 0;
    try {
      saved = Number(localStorage.getItem(storageKey)) || 0;
    } catch {
      // Storage blocked: rely on the in-memory value only.
    }
    const end = Math.max(saved, until);
    const current = Date.now();
    if (end > current) {
      setUntil(end);
      setNow(current);
      return Math.ceil((end - current) / 1000);
    }
    return 0;
  }

  function start() {
    const current = Date.now();
    const end = current + durationMs;
    setUntil(end);
    setNow(current);
    try {
      localStorage.setItem(storageKey, String(end));
    } catch {
      // Storage blocked: the cooldown still applies until the page is reloaded.
    }
  }

  return { remaining, check, start };
}
