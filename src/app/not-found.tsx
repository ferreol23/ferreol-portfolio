import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/button-link";
import { en } from "@/content/en";

const t = en.notFound;

export const metadata: Metadata = {
  title: t.metaTitle,
};

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** Shown for any address that doesn't match a page (Next.js adds "noindex" automatically). */
export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center py-20">
      <p aria-hidden="true" className="display outline-text rise text-[clamp(6rem,24vw,18rem)]">
        {t.code}
      </p>
      <h1 className="display rise mt-4 text-[clamp(2.5rem,7vw,5.5rem)]" style={delay(120)}>
        {t.heading}
        <span className="text-accent-strong">.</span>
      </h1>
      <p className="rise mt-6 max-w-xl text-lg text-muted" style={delay(240)}>
        {t.body}
      </p>
      <div className="rise mt-10 flex flex-wrap gap-4" style={delay(360)}>
        <ButtonLink href="/">{t.home}</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          {t.contact}
        </ButtonLink>
      </div>
    </section>
  );
}
