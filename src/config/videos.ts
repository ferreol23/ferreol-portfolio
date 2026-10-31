/**
 * The short videos shown in the "Watch before you hire" section of the home page.
 * Files live in /public/video/reels/<slug>.mp4 (720 x 1280) with a cover image <slug>.webp.
 * Newest first. To add one: export it at 720 x 1280, drop both files there and add a line here
 * with today's date and time in `addedAt`.
 */
export type Reel = {
  slug: string;
  title: string;
  /** Length shown on the card, e.g. "0:24". */
  length: string;
  /** When the video went on the site (ISO 8601, UTC). The card shows a "New" badge for 48 hours after it. */
  addedAt?: string;
};

/** How long a new video keeps its "New" badge. */
export const NEW_BADGE_MS = 48 * 60 * 60 * 1000;

/** The moment the badge goes away (ms since 1970), or null for a video without a date. */
export function newUntil(reel: Reel): number | null {
  return reel.addedAt ? Date.parse(reel.addedAt) + NEW_BADGE_MS : null;
}

export const reels: Reel[] = [
  { slug: "same-bakery-two-websites", title: "Same bakery. Two websites. Which one gets the call?", length: "0:18", addedAt: "2026-10-31T18:29:13Z" },
  { slug: "you-have-3-seconds", title: "Your website has 3 seconds", length: "0:16", addedAt: "2026-10-31T16:33:39Z" },
  { slug: "online-shop-on-a-phone", title: "I built this online shop. Watch it on a phone", length: "0:17", addedAt: "2026-10-31T01:21:03Z" },
  { slug: "4-steps", title: "Hiring a web developer? Here's exactly what happens", length: "0:24" },
  { slug: "3-website-myths", title: "3 website myths costing you customers", length: "0:23" },
  { slug: "does-ai-know-your-business", title: "Does AI know your business? A 10-second test", length: "0:22" },
  { slug: "3-signs", title: "3 signs your website is costing you customers", length: "0:20" },
  { slug: "is-this-your-website", title: "Is this your website?", length: "0:15" },
  { slug: "presentation", title: "Websites that work as hard as you do", length: "0:31" },
];
