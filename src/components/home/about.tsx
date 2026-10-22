import { Clock, Languages, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { en, fill } from "@/content/en";

export function About() {
  const facts = [
    { icon: MapPin, label: en.about.facts.basedIn, value: siteConfig.location },
    { icon: Languages, label: en.about.facts.languages, value: siteConfig.languages },
    { icon: Clock, label: en.about.facts.responseTime, value: siteConfig.responseTime },
  ];

  return (
    <section aria-labelledby="about-heading" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-12">
        <h2 id="about-heading" className="display reveal text-[clamp(2.5rem,6vw,4.5rem)] uppercase lg:col-span-4">
          {en.about.heading}
        </h2>

        <div className="lg:col-span-8">
          <p className="reveal font-display text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-tight">
            {fill(en.about.lead, { name: siteConfig.name })}
          </p>
          <p className="reveal mt-6 max-w-2xl text-lg text-muted">{en.about.body}</p>

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="reveal lift rounded-3xl border border-line bg-surface p-5 hover:border-accent-strong">
                <dt className="flex items-center gap-2 text-sm text-muted">
                  <Icon className="size-4 text-accent-strong" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-2 font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
