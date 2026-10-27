import { ArrowUp, Mail } from "lucide-react";
import Link from "next/link";
import { whatsappLink } from "@/config/links";
import { siteConfig } from "@/config/site";
import { en, fill } from "@/content/en";
import { BrandIcon } from "./brand-icon";
import { ConsentSettingsButton } from "./consent/consent-banner";
import { CurrentYear } from "./current-year";
import { FooterWordmark } from "./footer-wordmark";
import { SocialLinks } from "./social-links";

const footerLinks = [
  { href: "/", label: en.nav.home },
  { href: "/#work", label: en.nav.work },
  { href: "/#services", label: en.nav.services },
  { href: "/#process", label: en.nav.process },
  { href: "/reviews", label: en.nav.reviews },
  { href: "/contact", label: en.nav.contact },
];

/** Bottom of every page: links, email, WhatsApp, socials, a giant wordmark and the copyright. */
export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-line">
      <div className="shell grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="max-w-xs text-lg text-muted">{siteConfig.tagline}</p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label={en.footer.navLabel} className="md:col-span-3">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-1">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-block py-1.5 text-muted transition-colors hover:text-text">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-6 md:col-span-4">
          <div>
            <p className="text-sm text-muted">{en.footer.emailLabel}</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-1 inline-flex items-center gap-2 text-lg font-semibold transition-colors hover:text-accent-strong"
            >
              <Mail className="size-5" aria-hidden="true" />
              {siteConfig.email}
            </a>
          </div>
          <div>
            <p className="text-sm text-muted">{en.footer.whatsappLabel}</p>
            <a
              href={whatsappLink(fill(en.whatsapp.hello, { name: siteConfig.name }))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 text-lg font-semibold transition-colors hover:text-accent-strong"
            >
              <BrandIcon name="whatsapp" className="size-5" />
              {siteConfig.whatsapp}
              <span className="sr-only">{en.common.opensInNewTab}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Giant name across the bottom (decoration: the name is already in the header) */}
      <FooterWordmark name={siteConfig.name} />

      <div className="border-t border-line">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-6 text-sm text-muted">
          <p>
            © <CurrentYear /> {siteConfig.name}. {en.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6">
            <ConsentSettingsButton className="inline-flex min-h-11 items-center transition-colors hover:text-text" />
            <a href="#content" className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-text">
              {en.footer.backToTop}
              <ArrowUp className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
