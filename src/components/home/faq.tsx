import { Plus } from "lucide-react";
import Link from "next/link";
import { en } from "@/content/en";

/** Frequently asked questions. Uses the built-in <details> element, so it works with keyboard and screen readers. */
export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="border-t border-line">
      <div className="shell grid gap-12 py-24 sm:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 id="faq-heading" data-reveal className="display text-[clamp(2.5rem,5vw,4.25rem)]">
              {en.faq.heading}
            </h2>
            <p data-reveal className="mt-5 text-lg text-muted">
              {en.faq.intro}
            </p>
            <Link
              href="/contact"
              data-reveal
              className="mt-6 inline-flex min-h-11 items-center border-b-2 border-accent-strong font-semibold text-accent-strong transition-colors hover:text-text"
            >
              {en.faq.contactLink}
            </Link>
          </div>
        </div>

        <div className="lg:col-span-8">
          {en.faq.items.map((item) => (
            <details key={item.question} data-reveal className="faq-item group border-b border-line first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-xl font-bold transition-colors hover:text-accent-strong [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="faq-chevron grid size-11 shrink-0 place-items-center rounded-full border border-line group-open:border-accent-strong group-open:text-accent-strong">
                  <Plus className="size-5" aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 pr-14 text-lg text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
