import { MessagesSquare, ShieldCheck, Smartphone, Zap } from "lucide-react";
import { en } from "@/content/en";

// One icon per benefit, in the same order as en.benefits.items.
const icons = [MessagesSquare, Smartphone, Zap, ShieldCheck];

/** "What you get": the heading stays pinned on the left while the cards scroll by (on large screens). */
export function Benefits() {
  return (
    <section aria-labelledby="benefits-heading" className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 id="benefits-heading" className="display reveal text-[clamp(2.5rem,6vw,4.5rem)] uppercase">
              {en.benefits.heading}
            </h2>
            <p className="reveal mt-4 text-lg text-muted">{en.benefits.intro}</p>
          </div>
        </div>

        <ul className="grid gap-4 lg:col-span-7">
          {en.benefits.items.map((item, index) => {
            const Icon = icons[index] ?? Zap;
            return (
              <li
                key={item.title}
                className="reveal lift flex gap-5 rounded-3xl border border-line bg-bg p-6 hover:border-accent-strong sm:p-8"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line text-accent-strong">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-muted">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
