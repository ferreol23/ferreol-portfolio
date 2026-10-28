import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Written once at build time as a plain file (the site is a static export for GitHub Pages).
export const dynamic = "force-static";

/* Tells search engines they may visit every page, and where the sitemap is (served at /robots.txt). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
