"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();
const getServerYear = () => null;

/**
 * The current year for the copyright line. It is read in the visitor's browser
 * (not when the page is pre-built), so it never goes out of date.
 */
export function CurrentYear() {
  return <>{useSyncExternalStore(subscribe, getYear, getServerYear)}</>;
}
