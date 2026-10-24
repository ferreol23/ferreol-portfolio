import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/*
  Page titles, descriptions and social previews (Open Graph = Facebook,
  LinkedIn, WhatsApp…; Twitter card = X).

  Next.js does NOT merge the openGraph part between the layout and a page:
  a page that sets its own title would otherwise share the home page's
  preview title. So every page builds its metadata with pageMetadata().
  The preview image itself is drawn by src/app/opengraph-image.tsx.
*/

/** The shared preview image (one image for the whole site). */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name}, full-stack developer: ${siteConfig.tagline}`,
};

type PageInfo = {
  /** Short page title, e.g. "Contact". Leave out for the home page. */
  title?: string;
  description: string;
  /** The page address, e.g. "/contact". */
  path: string;
};

const homeTitle = `${siteConfig.name} | ${siteConfig.tagline}`;

export function pageMetadata({ title, description, path }: PageInfo): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : homeTitle;
  // The home page gets the image from opengraph-image.tsx directly; other pages
  // lose it once they set their own openGraph, so they point to it here.
  const images = title ? { images: [OG_IMAGE] } : {};

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      ...images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...images,
    },
  };
}

/** Shared defaults for every page, used by the root layout. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: homeTitle,
    template: `%s | ${siteConfig.name}`,
  },
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  ...pageMetadata({ description: siteConfig.description, path: "/" }),
};
