import { ArrowUpRight, Asterisk, ImageIcon, MapPin, UserRound } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/button-link";
import { SocialLinks } from "@/components/social-links";
import { FIVERR_URL } from "@/config/links";
import { projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { en, fill } from "@/content/en";

/** Stagger helper for the page-load animation. */
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const name = siteConfig.name;
  const featured = projects[0];
  // The headline's final period is drawn in the accent color.
  const headline = en.hero.headline.replace(/\.$/, "");
  const endsWithPeriod = headline !== en.hero.headline;
  // Each word slides up on its own, 60ms after the previous one.
  const words = headline.split(" ");

  return (
    <section aria-labelledby="hero-heading" className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-12">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Text side */}
        <div className="lg:col-span-7">
          {siteConfig.available && (
            <p
              className="rise inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-muted"
              style={delay(0)}
            >
              <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
              {en.hero.available}
            </p>
          )}

          <p className="rise mt-6 text-lg text-muted" style={delay(80)}>
            {fill(en.hero.intro, { name })}
          </p>

          <h1 id="hero-heading" className="display mt-3 text-[clamp(2.75rem,7.5vw,5.5rem)] uppercase">
            {words.map((word, index) => (
              <span key={`${word}-${index}`}>
                <span className="word">
                  <span style={delay(160 + index * 60)}>
                    {word}
                    {endsWithPeriod && index === words.length - 1 && <span className="text-accent-strong">.</span>}
                  </span>
                </span>
                {index < words.length - 1 && " "}
              </span>
            ))}
          </h1>

          <p className="rise mt-6 max-w-xl text-lg text-muted" style={delay(500)}>
            {en.hero.subtitle}
          </p>

          <div className="rise mt-8 flex flex-wrap gap-3" style={delay(580)}>
            <ButtonLink href={FIVERR_URL}>
              {en.hero.hireOnFiverr}
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              {en.hero.contactMe}
            </ButtonLink>
          </div>

          <SocialLinks className="rise mt-8 [--delay:660ms]" />
        </div>

        {/* Portrait side: photo with an orange rim light */}
        <div className="rise relative mx-auto w-full max-w-md lg:col-span-5" style={delay(200)}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-surface">
            {/* Orange light that slowly drifts behind the photo */}
            <div
              aria-hidden="true"
              className="glow-drift absolute -inset-[20%]"
              style={{
                background:
                  "radial-gradient(120% 80% at 100% 20%, var(--glow), transparent 60%), radial-gradient(80% 60% at 0% 100%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 70%)",
              }}
            />
            {siteConfig.photo ? (
              <Image
                src={siteConfig.photo}
                alt={fill(en.hero.photoAlt, { name })}
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover mix-blend-luminosity"
              />
            ) : (
              <div className="relative grid h-full place-items-center text-muted">
                <div className="flex flex-col items-center gap-3">
                  <UserRound className="size-24 opacity-60" strokeWidth={1} aria-hidden="true" />
                  <span className="text-sm">{en.hero.photoPlaceholder}</span>
                </div>
              </div>
            )}
          </div>

          {/* Rotating round badge on the photo's corner (decoration only) */}
          <div
            aria-hidden="true"
            className="absolute -bottom-8 -left-1 grid size-28 sm:-left-10 sm:size-32 place-items-center rounded-full border border-line bg-bg text-text sm:-left-10"
          >
            <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 size-full">
              <defs>
                <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
              </defs>
              <text className="font-display" fontSize="9" fontWeight="700" fill="currentColor">
                <textPath href="#badge-circle" textLength="230" lengthAdjust="spacing">
                  {en.hero.badge.toUpperCase()}
                </textPath>
              </text>
            </svg>
            <span className="grid size-12 place-items-center rounded-full bg-accent text-on-accent">
              <Asterisk className="size-6" />
            </span>
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        <div className="reveal lift rounded-3xl border border-line bg-surface p-6 hover:border-accent-strong">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <MapPin className="size-5 text-accent-strong" aria-hidden="true" />
            {en.hero.basedIn}
          </h2>
          <div
            aria-hidden="true"
            className="relative mt-4 h-20 overflow-hidden rounded-2xl border border-line bg-surface-2"
            style={{
              backgroundImage: "radial-gradient(var(--line) 1.2px, transparent 1.2px)",
              backgroundSize: "12px 12px",
            }}
          >
            <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_8px_var(--glow)]" />
          </div>
          <p className="mt-4 font-semibold">{siteConfig.location}</p>
          <p className="text-sm text-muted">{en.hero.basedInNote}</p>
        </div>

        <div className="reveal lift rounded-3xl border border-line bg-surface p-6 hover:border-accent-strong">
          <h2 className="text-lg font-bold">{en.hero.stackTitle}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {siteConfig.stack.map((tool, index) => (
              <li key={`${tool}-${index}`} className="rounded-full border border-line bg-surface-2 px-3 py-1 text-sm">
                {tool}
              </li>
            ))}
          </ul>
        </div>

        {featured && (
          <div className="reveal lift rounded-3xl border border-line bg-surface p-6 hover:border-accent-strong">
            <h2 className="text-lg font-bold">{en.hero.featuredTitle}</h2>
            <div className="mt-4 flex gap-4">
              <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl border border-line bg-surface-2">
                {featured.image ? (
                  <Image src={featured.image} alt="" fill sizes="7rem" className="object-cover" />
                ) : (
                  <ImageIcon className="absolute inset-0 m-auto size-6 text-muted" aria-hidden="true" />
                )}
              </div>
              <div className="min-w-0">
                <p className="font-semibold">{featured.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{featured.description}</p>
              </div>
            </div>
            {featured.link && (
              <a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 font-semibold text-accent-strong hover:underline"
              >
                {en.hero.viewProject}
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">
                  : {featured.title} {en.common.opensInNewTab}
                </span>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
