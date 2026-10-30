import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Written once at build time as a plain file (the site is a static export for GitHub Pages).
export const dynamic = "force-static";

/*
  The list of pages for search engines (served at /sitemap.xml).
  Add a line here when you create a new page.
  The addresses use `url` from src/config/site.ts, so set your real domain there.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/reviews`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${siteConfig.url}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
