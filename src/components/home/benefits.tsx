import { CalendarCheck, LifeBuoy, Lightbulb, MessagesSquare } from "lucide-react";
import { en } from "@/content/en";

// One icon per benefit, in the same order as en.benefits.items.
const icons = [Lightbulb, MessagesSquare, CalendarCheck, LifeBuoy];

/** "What you get": open two-column grid separated by thin lines (no boxes). */
export function Benefits() {
  return (
    <section aria-labelledby="benefits-heading" className="border-t border-line">
      <div className="shell grid gap-12 py-24 sm:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 id="benefits-heading" data-split className="display text-[clamp(2.5rem,5vw,4.25rem)]">
              {en.benefits.heading}
            </h2>
            <p data-reveal className="mt-5 text-lg text-muted">
              {en.benefits.intro}
            </p>
          </div>
        </div>

        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
          {en.benefits.items.map((item, index) => {
            const Icon = icons[index] ?? Lightbulb;
            return (
              <li key={item.title} data-reveal className="border-t border-line pb-12 pt-8">
                <Icon className="size-8 text-accent-strong" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-6 font-display text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 text-muted">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
