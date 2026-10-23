"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FIVERR_URL } from "@/config/links";
import { en } from "@/content/en";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/", label: en.nav.home },
  { href: "/#work", label: en.nav.work },
  { href: "/#services", label: en.nav.services },
  { href: "/#process", label: en.nav.process },
  { href: "/reviews", label: en.nav.reviews },
  { href: "/contact", label: en.nav.contact },
];

/** Navigation links, "Hire me" button, theme switch, and the mobile menu. */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) => {
    const active = href === pathname;
    return `relative py-2 transition-colors duration-200 hover:text-text ${
      active ? "text-text after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent" : "text-muted"
    }`;
  };

  return (
    <>
      <nav aria-label={en.nav.mainLabel} className="hidden lg:block">
        <ul className="flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} aria-current={link.href === pathname ? "page" : undefined} className={linkClass(link.href)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        <a
          href={FIVERR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-11 items-center gap-1.5 rounded-full bg-accent px-5 font-semibold text-on-accent transition-colors duration-200 hover:bg-[color-mix(in_oklab,var(--accent),white_12%)] sm:inline-flex"
        >
          {en.nav.hireMe}
          <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only"> {en.common.opensInNewTab}</span>
        </a>
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? en.nav.closeMenu : en.nav.openMenu}
          className="grid size-11 place-items-center rounded-full border border-line lg:hidden"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label={en.nav.mobileLabel}
          className="absolute inset-x-0 top-full border-b border-line bg-bg px-4 pb-6 pt-2 lg:hidden"
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
        >
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={link.href === pathname ? "page" : undefined}
                  className="block border-b border-line py-4 font-display text-2xl font-bold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={FIVERR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent font-semibold text-on-accent"
          >
            {en.hero.hireOnFiverr}
            <ArrowUpRight className="size-4" aria-hidden="true" />
            <span className="sr-only"> {en.common.opensInNewTab}</span>
          </a>
        </nav>
      )}
    </>
  );
}
