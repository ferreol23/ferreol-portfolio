import { socialLinks } from "@/config/links";
import { en } from "@/content/en";
import { BrandIcon } from "./brand-icon";

/** Row of round social icons (used in the hero and the footer). */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul aria-label={en.common.socialLabel} className={`flex flex-wrap gap-2 ${className}`}>
      {socialLinks.map((link) => (
        <li key={link.name}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-accent-strong hover:text-accent-strong"
          >
            <BrandIcon name={link.name} />
            <span className="sr-only">
              {link.label} {en.common.opensInNewTab}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
