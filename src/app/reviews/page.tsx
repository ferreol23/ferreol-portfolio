import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Suspense } from "react";
import { RevealScope } from "@/components/reveal-scope";
import { ReviewForm } from "@/components/reviews/review-form";
import { ReviewsList, ReviewsSkeleton } from "@/components/reviews/reviews-list";
import { siteConfig } from "@/config/site";
import { en, fill } from "@/content/en";

const t = en.reviewsPage;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: fill(t.metaDescription, { name: siteConfig.name }),
};

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export default function ReviewsPage() {
  return (
    <RevealScope>
      <section className="shell pb-16 pt-14 sm:pt-20">
        <h1 className="display rise text-[clamp(3.25rem,10vw,8.5rem)]">
          {t.heading}
          <span className="text-accent-strong">.</span>
        </h1>
        <p className="rise mt-6 max-w-2xl text-lg text-muted" style={delay(120)}>
          {t.intro}
        </p>
      </section>

      <div className="shell grid gap-16 pb-28 lg:grid-cols-12">
        <section aria-labelledby="reviews-list-heading" className="lg:col-span-7">
          <h2 id="reviews-list-heading" className="mb-2 text-sm font-normal text-muted">
            {t.listHeading}
          </h2>
          <Suspense fallback={<ReviewsSkeleton />}>
            <ReviewsList />
          </Suspense>
        </section>

        <section aria-labelledby="review-form-heading" className="lg:col-span-5">
          <div data-reveal className="rounded-[2rem] border border-line bg-surface p-6 sm:p-8 lg:sticky lg:top-28">
            <h2 id="review-form-heading" className="display text-[clamp(2.25rem,4vw,3.25rem)]">
              {t.formHeading}
            </h2>
            <p className="mb-8 mt-3 text-muted">{t.formIntro}</p>
            <ReviewForm />
          </div>
        </section>
      </div>
    </RevealScope>
  );
}
