/**
 * Your external profile links.
 * Replace each [PLACEHOLDER] part with your real username / number.
 */
export const FIVERR_URL = "https://www.fiverr.com/[YOUR-FIVERR-USERNAME]";
export const GITHUB_URL = "https://github.com/ferreol23";
export const LINKEDIN_URL = "https://www.linkedin.com/in/ferreol-code-a190083b3/";
export const INSTAGRAM_URL = "https://www.instagram.com/ferreol_code/";
// WhatsApp: your number in international format, digits only (e.g. 33612345678).
export const WHATSAPP_URL = "https://wa.me/[YOUR-PHONE-NUMBER]";

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
  { name: "whatsapp", label: "WhatsApp", href: WHATSAPP_URL },
];

export const socialLinks = allSocialLinks.filter((link) => !isPlaceholder(link.href));

/** True while a value still contains a [PLACEHOLDER] that hasn't been filled in. */
export function isPlaceholder(value: string): boolean {
  return value.includes("[");
}
