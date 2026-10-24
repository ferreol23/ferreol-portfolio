"use client";

import { useSyncExternalStore } from "react";
import { en } from "@/content/en";
import { getConsent, setConsent, subscribeConsent } from "@/lib/consent";

/*
  Small box at the bottom of the screen asking if visits may be counted.
  - Shown only until the visitor answers ("Privacy settings" in the footer brings it back).
  - "No thanks" is as easy to click as "Yes": nothing is counted until "Yes".
  - Rendered only in the browser, so the page itself never depends on it.
*/

const button =
  "inline-flex min-h-11 flex-1 items-center justify-center rounded-full px-5 font-semibold transition-[background-color,border-color,color] duration-200";

// On the server (and before the page is interactive) the choice is unknown: show nothing.
const unknown = () => undefined;

// Set by the footer link, so keyboard users land in the banner it brings back.
let focusWhenShown = false;

function focusFirstButton(section: HTMLElement | null) {
  if (!section || !focusWhenShown) return;
  focusWhenShown = false;
  section.querySelector("button")?.focus();
}

export function ConsentBanner() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, unknown);
  if (consent !== null) return null;

  const t = en.consent;

  return (
    <section
      ref={focusFirstButton}
      aria-labelledby="consent-title"
      className="rise fixed inset-x-4 bottom-4 z-50 rounded-[1.5rem] border border-line bg-surface p-5 shadow-2xl shadow-black/40 sm:left-6 sm:right-auto sm:max-w-md sm:p-6"
    >
      <h2 id="consent-title" className="font-display text-xl font-bold">
        {t.title}
      </h2>
      <p className="mt-2 text-sm text-muted">{t.body}</p>
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => setConsent("denied")}
          className={`${button} border border-line text-text hover:border-accent-strong hover:text-accent-strong`}
        >
          {t.decline}
        </button>
        <button
          type="button"
          onClick={() => setConsent("granted")}
          className={`${button} bg-accent text-on-accent hover:bg-[color-mix(in_oklab,var(--accent),white_12%)]`}
        >
          {t.accept}
        </button>
      </div>
    </section>
  );
}

/** Footer link that forgets the choice, shows the banner again and moves focus into it. */
export function ConsentSettingsButton({ className = "" }: { className?: string }) {
  function reopen() {
    focusWhenShown = true;
    setConsent(null);
  }

  return (
    <button type="button" onClick={reopen} className={className}>
      {en.consent.settings}
    </button>
  );
}
