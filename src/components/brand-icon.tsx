import { siFacebook, siFiverr, siInstagram, siTiktok, siWhatsapp, siYoutube } from "simple-icons";
import type { SocialName } from "@/config/links";

// Official brand shapes from the simple-icons library (free to use, CC0).
// LinkedIn is not in that library, so its simple mark is drawn here.
const LINKEDIN_PATH =
  "M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm2.5 7.5V18H9v-7.5H6.5ZM7.75 6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8ZM11 10.5V18h2.5v-4c0-1.1.6-1.8 1.5-1.8s1.4.6 1.4 1.8v4H19v-4.6c0-2.2-1.2-3.1-2.8-3.1-1.2 0-2 .6-2.4 1.2v-1H11Z";

const paths: Record<SocialName, string> = {
  fiverr: siFiverr.path,
  instagram: siInstagram.path,
  tiktok: siTiktok.path,
  youtube: siYoutube.path,
  facebook: siFacebook.path,
  whatsapp: siWhatsapp.path,
  linkedin: LINKEDIN_PATH,
};

export function BrandIcon({ name, className = "size-5" }: { name: SocialName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d={paths[name]} fillRule="evenodd" />
    </svg>
  );
}
