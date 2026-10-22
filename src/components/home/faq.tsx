import { Plus } from "lucide-react";
import Link from "next/link";
import { en } from "@/content/en";

/** Frequently asked questions. Uses the built-in <details> element, so it works with keyboard and screen readers. */
export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="faq-heading" className="display reveal text-[clamp(2.5rem,6vw,4.5rem)] uppercase">
            {en.faq.heading}
          </h2>
          <p className="reveal mt-4 text-lg text-muted">{en.faq.intro}</p>
          <Link
            href="/contact"
            className="reveal mt-6 inline-flex font-semibold text-accent-strong underline decoration-2 underline-offset-4"
          >
            {en.faq.contactLink}
          </Link>
        </div>

        <div className="lg:col-span-7">
          {en.faq.items.map((item) => (
            <details key={item.question} className="faq-item reveal group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold transition-colors hover:text-accent-strong [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="faq-chevron grid size-10 shrink-0 place-items-center rounded-full border border-line group-open:border-accent-strong group-open:text-accent-strong">
                  <Plus className="size-5" aria-hidden="true" />
                </span>
              </summary>
              <p className="pb-6 pr-12 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
