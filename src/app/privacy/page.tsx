import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { RevealScope } from "@/components/reveal-scope";
import { siteConfig } from "@/config/site";
import { en, fill } from "@/content/en";
import { pageMetadata } from "@/lib/metadata";

const t = en.privacyPage;
const name = { name: siteConfig.name };

export const metadata: Metadata = pageMetadata({
  title: t.metaTitle,
  description: fill(t.metaDescription, name),
  path: "/privacy",
});

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** Privacy policy (GDPR): what the site collects, where it goes, and the visitor's rights. Text lives in en.ts. */
export default function PrivacyPage() {
  return (
    <RevealScope>
      <section className="shell pb-12 pt-14 sm:pt-20">
        <h1 className="display rise text-[clamp(3.25rem,10vw,8.5rem)]">
          {t.heading}
          <span className="text-accent-strong">.</span>
        </h1>
        <p className="rise mt-6 max-w-2xl text-lg text-muted" style={delay(120)}>
          {t.intro}
        </p>
        <p className="rise mt-3 text-sm text-muted" style={delay(180)}>
          {t.updated}
        </p>
      </section>

      <div className="shell pb-28">
        <div className="max-w-3xl space-y-12">
          {t.sections.map((section) => (
            <section key={section.title} data-reveal>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">{section.title}</h2>
              {section.items && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted marker:text-accent-strong">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-muted">
                  {fill(paragraph, name)}
                </p>
              ))}
            </section>
          ))}

          <p data-reveal className="rounded-[1.5rem] border border-line bg-surface p-6 text-lg">
            {t.contactPrefix}{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold text-accent-strong underline-offset-4 hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </div>
    </RevealScope>
  );
}
