import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Next, Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";
import { ConsentBanner } from "@/components/consent/consent-banner";
import { VisitTracker } from "@/components/consent/visit-tracker";
import { MotionProvider } from "@/components/motion-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { en } from "@/content/en";
import { rootMetadata } from "@/lib/metadata";
import "./globals.css";

// Headlines: characterful grotesque (its width axis gives the condensed poster look).
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth", "opsz"],
});

// Body text: built for readability.
const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin", "latin-ext"],
  // Next.js has no size data for this font, so fall back to the system font while it loads.
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: theme-init.js may switch data-theme before React loads.
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${bricolage.variable} ${atkinson.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <MotionProvider />
        <a
          href="#content"
          className="sr-only z-50 rounded-full bg-accent font-semibold text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:px-5 focus:py-3"
        >
          {en.nav.skipToContent}
        </a>
        <SiteHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ConsentBanner />
        <VisitTracker />
      </body>
    </html>
  );
}
