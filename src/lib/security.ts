/*
  CONTENT SECURITY POLICY
  -----------------------
  Tells the browser where the site may load things from, which blocks common
  attacks (scripts injected from other sites…). GitHub Pages can't send custom
  headers, so it is added as a <meta> tag at the top of every page (root layout).

  If you add a service that loads files from another domain (analytics,
  a video embed, images from a CDN), add that domain to the matching line below,
  or the browser will block it.
*/

// Forms, reviews and visits talk to your Supabase project.
const supabaseOrigin = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin
  : "https://*.supabase.co";

const isDev = process.env.NODE_ENV === "development";

export const contentSecurityPolicy = [
  "default-src 'self'",
  // 'unsafe-inline': Next.js puts small inline scripts in static pages. 'unsafe-eval' is only for dev tools.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  `connect-src 'self' ${supabaseOrigin}${isDev ? " ws:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");
