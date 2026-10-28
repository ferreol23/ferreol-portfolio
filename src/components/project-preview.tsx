import { ImageIcon } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/config/projects";
import { en } from "@/content/en";
import { withBasePath } from "@/lib/base-path";

/**
 * A project's screenshot inside a simple browser window (three dots + the site's address),
 * like a real visit. The screenshot is shown whole (16:10, from the top), never cropped on the sides.
 * Used by the big "Selected work" rows and the small "Recent work" cards near the top.
 * Decorative (alt=""): the project title is always written next to it.
 * Put it in a container with `min-w-0` when it sits in a grid: a long address must not widen the page.
 */
export function ProjectPreview({
  project,
  sizes,
  compact = false,
  className = "",
}: {
  project: Project;
  /** next/image `sizes`: how wide the preview is on screen. */
  sizes: string;
  /** Smaller corners, bar and placeholder, for the small cards. */
  compact?: boolean;
  className?: string;
}) {
  const cover = project.images[0];

  return (
    <div
      className={`overflow-hidden border border-line bg-surface shadow-2xl shadow-black/20 ${compact ? "rounded-2xl" : "rounded-[1.5rem]"} ${className}`}
    >
      <div
        aria-hidden="true"
        className={`flex items-center border-b border-line ${compact ? "gap-2 px-3 py-2" : "gap-3 px-4 py-3"}`}
      >
        <span className={`flex shrink-0 gap-1.5 ${compact ? "w-9" : "w-12"}`}>
          <span className={`rounded-full bg-accent ${compact ? "size-2" : "size-2.5"}`} />
          <span className={`rounded-full bg-muted/40 ${compact ? "size-2" : "size-2.5"}`} />
          <span className={`rounded-full bg-muted/40 ${compact ? "size-2" : "size-2.5"}`} />
        </span>
        <span
          className={`min-w-0 flex-1 truncate rounded-full bg-bg px-3 text-center text-muted ${compact ? "py-0.5 text-[0.7rem]" : "py-1 text-xs"}`}
        >
          {displayAddress(project.link)}
        </span>
        <span className={`shrink-0 ${compact ? "w-9" : "w-12"}`} />
      </div>
      <div className="relative aspect-[16/10]">
        {cover ? (
          <Image src={withBasePath(cover.src)} alt="" fill sizes={sizes} className="object-cover object-top" />
        ) : (
          <div
            className="absolute inset-0 grid place-items-center text-muted"
            style={{ background: "radial-gradient(70% 90% at 100% 0%, var(--glow), transparent 60%)" }}
          >
            <span className={`flex flex-col items-center gap-2 ${compact ? "text-xs" : "text-sm"}`}>
              <ImageIcon className={compact ? "size-6" : "size-8"} aria-hidden="true" />
              {en.portfolio.screenshotPlaceholder}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/** "https://www.shop.com/en" → "shop.com/en". Empty while the project has no link yet. */
function displayAddress(link: string): string {
  if (!link) return "";
  try {
    const url = new URL(link);
    return (url.hostname.replace(/^www\./, "") + url.pathname).replace(/\/$/, "");
  } catch {
    return "";
  }
}
