import path from "node:path";
import type { NextConfig } from "next";

/*
  SECURITY HEADERS
  ----------------
  Sent with every page. They tell the browser to block common attacks:
  loading scripts from other sites, showing the site inside another site's
  frame (clickjacking), guessing file types, leaking full URLs to other sites…

  If you add a service that loads files from another domain (analytics,
  a video embed, images from a CDN), add that domain to the matching line of
  the Content-Security-Policy below, or the browser will block it.
*/
const isDev = process.env.NODE_ENV === "development";

// Forms, reviews and visits talk to your Supabase project.
const supabaseOrigin = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin
  : "https://*.supabase.co";

const contentSecurityPolicy = [
  "default-src 'self'",
  // 'unsafe-inline': Next.js puts small inline scripts in static pages. 'unsafe-eval' is only for dev tools.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  `connect-src 'self' ${supabaseOrigin}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // Only ever load this site over HTTPS (ignored on http://localhost).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Don't advertise "X-Powered-By: Next.js".
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  turbopack: {
    // This folder is the project root (ignores stray package-lock.json files higher up).
    root: path.join(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
