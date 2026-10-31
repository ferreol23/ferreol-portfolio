import { ArrowUpRight, Asterisk } from "lucide-react";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/button-link";
import { HeroVideo } from "@/components/home/hero-video";
import { Magnetic } from "@/components/magnetic";
import { SocialLinks } from "@/components/social-links";
import { FIVERR_URL } from "@/config/links";
import { siteConfig } from "@/config/site";
import { en, fill } from "@/content/en";

/** Stagger helper for the page-load animation (pure CSS, so it works before JavaScript loads). */
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/**
 * First screen: one focal point. Big headline on the left, presentation video on the right.
 */
export function Hero() {
  const name = siteConfig.name;
  // The headline's final period is drawn in the accent color.
  const headline = en.hero.headline.replace(/\.$/, "");
  const endsWithPeriod = headline !== en.hero.headline;
  // Each word slides up on its own, 60ms after the previous one.
  const words = headline.split(" ");

  return (
    // overflow-x-clip: the video's glow spills past the screen edge without causing a sideways scroll.
    <section aria-labelledby="hero-heading" className="relative overflow-x-clip">
      <div className="shell grid items-center gap-12 pb-20 pt-10 sm:pt-14 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12 lg:gap-10 lg:py-12">
        {/* Text side */}
        <div className="lg:col-span-7">
          <h1 id="hero-heading" className="display text-[clamp(3.1rem,8.6vw,7.25rem)]">
            {words.map((word, index) => (
              <span key={`${word}-${index}`}>
                <span className="word">
                  <span style={delay(80 + index * 60)}>
                    {word}
                    {endsWithPeriod && index === words.length - 1 && <span className="text-accent-strong">.</span>}
                  </span>
                </span>
                {index < words.length - 1 && " "}
              </span>
            ))}
          </h1>

          <div className="rise mt-8 max-w-xl" style={delay(520)}>
            <p className="text-xl font-semibold text-text">{fill(en.hero.intro, { name })}</p>
            <p className="mt-3 text-lg text-muted">{en.hero.subtitle}</p>
          </div>

          <div className="rise mt-9 flex flex-wrap gap-3" style={delay(600)}>
            <Magnetic>
              <ButtonLink href={FIVERR_URL}>
                {en.hero.hireOnFiverr}
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="/contact" variant="secondary">
                {en.hero.contactMe}
              </ButtonLink>
            </Magnetic>
          </div>

          <div className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={delay(680)}>
            <SocialLinks />
            {siteConfig.available && (
              <p className="flex items-center gap-2.5 text-sm text-muted">
                <span className="relative flex size-2.5" aria-hidden="true">
                  <span className="absolute inset-0 rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
                  <span className="relative size-2.5 rounded-full bg-accent" />
                </span>
                {en.hero.available}
              </p>
            )}
          </div>
        </div>

        {/* The 60-second Fiverr video (vertical), with a soft orange light behind it */}
        <div className="rise relative mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:col-span-5 lg:max-w-[380px]" style={delay(240)}>
          <div
            aria-hidden="true"
            className="glow-drift pointer-events-none absolute -inset-[15%] -z-10 opacity-60 blur-3xl"
            style={{ background: "radial-gradient(50% 50% at 60% 55%, var(--glow), transparent 70%)" }}
          />
          <figure className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] border border-line bg-[#0b0b0c] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]">
            <HeroVideo />
          </figure>

          {/* Rotating round badge on the video's corner (decoration only).
              overflow-hidden: the spinning square SVG's corners would otherwise stick out
              past the circle (and past the screen edge, causing a sideways scroll). */}
          <div
            aria-hidden="true"
            className="absolute -right-1 -top-8 grid size-28 place-items-center overflow-hidden rounded-full border border-line bg-bg text-text sm:-right-8 sm:size-32"
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
    </section>
  );
}
