/*
  The visitor's choice about visit counting, remembered in localStorage
  ("consent"). No cookies are used.

    "granted" → pages visited are counted (see components/consent/visit-tracker.tsx)
    "denied"  → nothing is ever sent
    null      → no choice yet: the banner is shown
*/

export type Consent = "granted" | "denied";

const KEY = "consent";
const EVENT = "consent-change";

// Used when storage is blocked (private mode etc.): the choice lasts until the page is closed.
let memory: Consent | null = null;

export function getConsent(): Consent | null {
  try {
    const saved = localStorage.getItem(KEY);
    return saved === "granted" || saved === "denied" ? saved : null;
  } catch {
    return memory;
  }
}

/** Saves a choice, or forgets it (null) so the banner shows again. */
export function setConsent(value: Consent | null) {
  memory = value;
  try {
    if (value) localStorage.setItem(KEY, value);
    else localStorage.removeItem(KEY);
  } catch {
    // Storage blocked: `memory` keeps the choice for now.
  }
  window.dispatchEvent(new Event(EVENT));
}

/** For useSyncExternalStore: runs onChange when the choice changes (in this tab or another). */
export function subscribeConsent(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === KEY) onChange();
  };
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
