import Link from "next/link";
import { siteConfig } from "@/config/site";
import { SiteNav } from "./site-nav";

/** Top bar shown on every page. Stays visible while scrolling. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/85 backdrop-blur-md">
      <div className="relative mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          {siteConfig.name}
          <span className="text-accent-strong" aria-hidden="true">
            .
          </span>
        </Link>
        <SiteNav />
      </div>
      {/* Reading progress: fills from left to right as you scroll */}
      <div aria-hidden="true" className="scroll-progress absolute inset-x-0 -bottom-px h-0.5 bg-accent" />
    </header>
  );
}
