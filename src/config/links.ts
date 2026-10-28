import { siteConfig } from "@/config/site";
import { en, fill } from "@/content/en";

/**
 * Your external profile links.
 * Replace each [PLACEHOLDER] part with your real username / number.
 */
export const FIVERR_URL = "https://www.fiverr.com/s/L33ZXWa";
export const GITHUB_URL = "https://github.com/ferreol23";
export const LINKEDIN_URL = "https://www.linkedin.com/in/ferreol-code-a190083b3/";
export const INSTAGRAM_URL = "https://www.instagram.com/ferreol_code/";
// WhatsApp: built from the number in src/config/site.ts (wa.me needs digits only).
export const WHATSAPP_URL = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`;

/** A WhatsApp link that opens the chat with a message already written (the visitor can still edit it). */
export function whatsappLink(text: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

export type SocialName = "fiverr" | "github" | "linkedin" | "instagram" | "whatsapp";

/**
 * The social icons row (hero, footer, contact page). Remove a line to hide that icon.
 * Links still containing a [PLACEHOLDER] are hidden automatically until you fill them in.
 */
const allSocialLinks: { name: SocialName; label: string; href: string }[] = [
  { name: "fiverr", label: "Fiverr", href: FIVERR_URL },
  { name: "github", label: "GitHub", href: GITHUB_URL },
  { name: "linkedin", label: "LinkedIn", href: LINKEDIN_URL },
  { name: "instagram", label: "Instagram", href: INSTAGRAM_URL },
  { name: "whatsapp", label: "WhatsApp", href: whatsappLink(fill(en.whatsapp.hello, { name: siteConfig.name })) },
];

export const socialLinks = allSocialLinks.filter((link) => !isPlaceholder(link.href));

/** True while a value still contains a [PLACEHOLDER] that hasn't been filled in. */
export function isPlaceholder(value: string): boolean {
  return value.includes("[");
}
