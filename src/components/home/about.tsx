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
    <section id="about" aria-labelledby="about-heading" className="shell scroll-mt-24 py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-12">
        <h2 id="about-heading" data-reveal className="display text-[clamp(2.75rem,6.5vw,5.5rem)] lg:col-span-4">
          {en.about.heading}
        </h2>

        <div className="lg:col-span-8">
          <p data-reveal className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.15]">
            {fill(en.about.lead, { name: siteConfig.name })}
          </p>
          <p data-reveal className="mt-6 max-w-2xl text-lg text-muted">
            {en.about.body}
          </p>

          <dl className="mt-14 grid gap-x-8 sm:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} data-reveal className="border-t border-line py-5">
                <dt className="flex items-center gap-2 text-sm text-muted">
                  <Icon className="size-4 text-accent-strong" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-2 text-lg font-semibold">{value}</dd>
              </div>
            ))}
          </dl>

          <div data-reveal className="mt-8 border-t border-line pt-5">
            <h3 className="text-sm font-normal text-muted">{en.about.stackTitle}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {siteConfig.stack.map((tool, index) => (
                <li
                  key={`${tool}-${index}`}
                  className="rounded-full border border-line px-4 py-1.5 transition-colors duration-300 hover:border-accent-strong hover:text-accent-strong"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
