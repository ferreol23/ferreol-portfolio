/**
 * The short videos shown in the "Watch before you hire" section of the home page.
 * Files live in /public/video/reels/<slug>.mp4 (720 x 1280) with a cover image <slug>.webp.
 * Newest first. To add one: export it at 720 x 1280, drop both files there and add a line here.
 */
export type Reel = {
  slug: string;
  title: string;
  /** Length shown on the card, e.g. "0:24". */
  length: string;
  /** Shows a small "New" badge. */
  isNew?: boolean;
};

export const reels: Reel[] = [
  { slug: "you-have-3-seconds", title: "Your website has 3 seconds", length: "0:16", isNew: true },
  { slug: "online-shop-on-a-phone", title: "I built this online shop. Watch it on a phone", length: "0:17", isNew: true },
  { slug: "4-steps", title: "Hiring a web developer? Here's exactly what happens", length: "0:24" },
  { slug: "3-website-myths", title: "3 website myths costing you customers", length: "0:23" },
  { slug: "does-ai-know-your-business", title: "Does AI know your business? A 10-second test", length: "0:22" },
  { slug: "3-signs", title: "3 signs your website is costing you customers", length: "0:20" },
  { slug: "is-this-your-website", title: "Is this your website?", length: "0:15" },
  { slug: "presentation", title: "Websites that work as hard as you do", length: "0:31" },
];
