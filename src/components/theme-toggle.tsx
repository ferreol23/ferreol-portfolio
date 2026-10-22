"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { en } from "@/content/en";

/*
  Light / dark switch. The current theme is stored on <html data-theme="...">
  and remembered in localStorage ("theme"). public/theme-init.js re-applies it
  on the next visit before the page appears.
*/

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function getServerTheme(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage blocked: the theme still changes for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? en.theme.toLight : en.theme.toDark}
      className="grid size-11 place-items-center rounded-full border border-line text-text transition-colors duration-200 hover:border-accent-strong hover:text-accent-strong"
    >
      {theme === "dark" ? <Sun className="size-5" aria-hidden="true" /> : <Moon className="size-5" aria-hidden="true" />}
    </button>
  );
}
