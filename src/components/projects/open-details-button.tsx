"use client";

import type { ReactNode } from "react";

/** The id of a project's detail window (rendered once, in "Selected work"). */
export function detailsId(slug: string): string {
  return `details-${slug}`;
}

/**
 * A button that opens a project's detail window. It can sit anywhere on the page
 * ("Recent work" cards, "Selected work" rows): the window is found by its id.
 */
export function OpenDetailsButton({
  slug,
  className = "",
  children,
}: {
  slug: string;
  className?: string;
  children: ReactNode;
}) {
  const open = () => document.querySelector<HTMLDialogElement>(`#${detailsId(slug)}`)?.showModal();

  return (
    <button type="button" aria-haspopup="dialog" onClick={open} className={className}>
      {children}
    </button>
  );
}
