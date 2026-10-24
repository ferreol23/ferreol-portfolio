import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { OG_IMAGE } from "@/lib/metadata";

/*
  The preview image shown when someone shares a link to the site
  (WhatsApp, LinkedIn, Facebook, X…). Generated once at build time.
  Colors match the dark theme in globals.css.
*/

export const alt = OG_IMAGE.alt;
export const size = { width: OG_IMAGE.width, height: OG_IMAGE.height };
export const contentType = "image/png";

const ACCENT = "#ff6b1a";
const BG = "#0b0b0c";
const TEXT = "#f5f3f0";
const MUTED = "#a39e97";

const heading = siteConfig.name.toUpperCase();
const subline = "Full-stack developer · Websites, web apps & mobile apps";

/**
 * Downloads only the letters we need from one of the site's fonts.
 * "use cache" keeps the result, so the image is drawn once at build time
 * instead of on every visit. If Google Fonts can't be reached, the image
 * still works with the built-in font.
 */
async function loadFont(family: string, text: string): Promise<ArrayBuffer | null> {
  "use cache";
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const fontUrl = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!fontUrl) return null;
    const response = await fetch(fontUrl);
    return response.ok ? await response.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function Image() {
  // Same look as the site: condensed Bricolage for the name, Atkinson for the text.
  const [display, body] = await Promise.all([
    loadFont("Bricolage+Grotesque:opsz,wdth,wght@96,75,800", `${heading}.F`),
    loadFont("Atkinson+Hyperlegible+Next:wght@400", `${siteConfig.tagline}${subline}`),
  ]);
  const fonts = [
    ...(display ? [{ name: "Display", data: display, style: "normal" as const, weight: 800 as const }] : []),
    ...(body ? [{ name: "Body", data: body, style: "normal" as const, weight: 400 as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: BG,
          backgroundImage: `radial-gradient(circle at 92% 8%, ${ACCENT}66 0%, ${BG}00 45%)`,
          color: TEXT,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 18,
            background: ACCENT,
            color: BG,
            fontSize: 52,
            fontFamily: "Display",
            fontWeight: 800,
          }}
        >
          F
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 200,
              lineHeight: 0.9,
              letterSpacing: -2,
              fontFamily: "Display",
              fontWeight: 800,
            }}
          >
            {heading}
            <span style={{ color: ACCENT }}>.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 44, color: TEXT, fontFamily: "Body" }}>{siteConfig.tagline}</div>
          <div style={{ marginTop: 16, fontSize: 30, color: MUTED, fontFamily: "Body" }}>{subline}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    },
  );
}
