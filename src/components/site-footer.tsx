import { Mail } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { en } from "@/content/en";
import { CurrentYear } from "./current-year";
import { SocialLinks } from "./social-links";

/** Bottom of every page: socials, email, links and copyright. */
export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold">
            {siteConfig.name}
            <span className="text-accent-strong" aria-hidden="true">
              .
            </span>
          </p>
          <p className="mt-2 max-w-xs text-muted">{siteConfig.tagline}</p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label={en.footer.navLabel}>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="text-muted transition-colors hover:text-text">
                {en.nav.home}
              </Link>
            </li>
            <li>
              <Link href="/#work" className="text-muted transition-colors hover:text-text">
                {en.nav.work}
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="text-muted transition-colors hover:text-text">
                {en.nav.reviews}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted transition-colors hover:text-text">
                {en.nav.contact}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-sm text-muted">{en.footer.emailLabel}</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-1 inline-flex items-center gap-2 font-semibold transition-colors hover:text-accent-strong"
          >
            <Mail className="size-4" aria-hidden="true" />
            {siteConfig.email}
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted sm:px-6">
          © <CurrentYear /> {siteConfig.name}. {en.footer.rights}
        </p>
      </div>
    </footer>
  );
}
