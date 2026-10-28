"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type NavLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string };

/**
 * A menu link. "/#work"-style links become plain "#work" on the home page itself:
 * on GitHub Pages the home address ends with a slash ("/ferreol-portfolio/") but
 * "/#work" points to "/ferreol-portfolio#work", so Lenis didn't see it as the
 * same page and the click did nothing. "#work" always matches, and Lenis scrolls there.
 */
export function NavLink({ href, ...props }: NavLinkProps) {
  const pathname = usePathname();
  if (pathname === "/" && href.startsWith("/#")) return <a href={href.slice(1)} {...props} />;
  return <Link href={href} {...props} />;
}
