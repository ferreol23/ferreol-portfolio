"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { getConsent, subscribeConsent } from "@/lib/consent";
import { getSupabase } from "@/lib/supabase";
import { visitSchema } from "@/lib/validation";

/*
  Counts one visit per page opened, in Supabase (table "visits"), ONLY after the
  visitor clicked "Yes" in the consent banner. Stored: the page address
  (e.g. "/contact") and the time. Nothing that identifies the visitor.
  Visits from your own computer (localhost) are never sent.
  Renders nothing.
*/

const isLocal = (host: string) => host === "localhost" || host === "127.0.0.1" || host === "[::1]";

export function VisitTracker() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => null);
  // Last page counted, so the same page isn't counted twice in a row.
  const lastCounted = useRef<string | null>(null);

  useEffect(() => {
    if (consent !== "granted" || lastCounted.current === pathname) return;
    lastCounted.current = pathname;

    const parsed = visitSchema.safeParse({ page: pathname });
    if (!parsed.success) return;

    if (isLocal(window.location.hostname)) {
      if (process.env.NODE_ENV === "development") console.info("[visits] not sent from localhost:", parsed.data.page);
      return;
    }

    // Never chain .select() here: visitors can't read visits back.
    // A failed count is not worth bothering the visitor about, so errors are ignored.
    try {
      void getSupabase()
        .from("visits")
        .insert(parsed.data)
        .then(
          () => undefined,
          () => undefined,
        );
    } catch {
      // Supabase not configured: count nothing.
    }
  }, [consent, pathname]);

  return null;
}
