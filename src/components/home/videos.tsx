import { SocialLinks } from "@/components/social-links";
import { newUntil, reels } from "@/config/videos";
import { en, fill } from "@/content/en";
import { withBasePath } from "@/lib/base-path";
import { OneAtATime } from "./one-at-a-time";

/*
  "Watch before you hire": the short videos, as a row of phone-shaped cards.
  Plain <video controls> with a cover image: nothing loads until a visitor presses play,
  and it all works without JavaScript. The only script pauses the other videos when one starts.
*/
export function Videos() {
  return (
    <section id="videos" aria-labelledby="videos-heading" className="border-t border-line">
      <div className="shell py-24 sm:py-32">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p data-reveal className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-strong">
              {en.videos.eyebrow}
            </p>
            <h2 id="videos-heading" data-split className="display mt-4 text-[clamp(2.5rem,6vw,5rem)]">
              {en.videos.heading}
              <span className="text-accent-strong">.</span>
            </h2>
          </div>
          <p data-reveal className="text-lg text-muted lg:col-span-5">
            {en.videos.intro}
          </p>
        </div>

        <OneAtATime className="-mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:scroll-px-8 sm:px-8">
          {reels.map((reel) => (
            <li key={reel.slug} data-reveal className="w-[min(68vw,260px)] shrink-0 snap-start">
              <div className="relative overflow-hidden rounded-3xl border border-line bg-black">
                <video
                  className="block aspect-[9/16] w-full bg-black object-cover"
                  controls
                  playsInline
                  preload="none"
                  poster={withBasePath(`/video/reels/${reel.slug}.webp`)}
                  aria-label={fill(en.videos.label, { title: reel.title })}
                >
                  <source src={withBasePath(`/video/reels/${reel.slug}.mp4`)} type="video/mp4" />
                </video>
                {/* The site is prebuilt, so the badge ships hidden and OneAtATime shows it
                    only while it is still within 48 hours of addedAt. */}
                {newUntil(reel) !== null && (
                  <span
                    hidden
                    data-new-until={newUntil(reel)}
                    className="pointer-events-none absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0b0b0c]"
                  >
                    {en.videos.newBadge}
                  </span>
                )}
              </div>
              <p className="mt-4 font-display text-lg font-bold leading-snug">{reel.title}</p>
              <p className="mt-1 text-sm text-muted">{reel.length}</p>
            </li>
          ))}
        </OneAtATime>
        <p className="mt-2 text-sm text-muted sm:hidden" aria-hidden="true">
          {en.videos.scrollHint} →
        </p>

        <div data-reveal className="mt-12 flex flex-wrap items-center gap-4">
          <p className="font-semibold">{en.videos.follow}</p>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
