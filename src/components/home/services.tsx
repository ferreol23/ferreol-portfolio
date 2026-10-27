import { AppWindow, ArrowUpRight, Globe, Smartphone, Wrench } from "lucide-react";
import Link from "next/link";
import { en } from "@/content/en";
import type { ProjectType } from "@/lib/validation";

// One icon per service, in the same order as en.services.items.
const icons = [Globe, AppWindow, Smartphone, Wrench];
// The project type pre-selected on the contact page for each service (same order).
const types: ProjectType[] = ["website", "webapp", "mobile", "fix"];

/**
 * Services as a full-width editorial list. Each row links to the contact page with
 * that service already selected; an orange band sweeps across it on hover or keyboard focus.
 */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 py-24 sm:py-32">
      <div className="shell grid gap-6 lg:grid-cols-12 lg:items-end">
        <h2 id="services-heading" data-split className="display text-[clamp(2.75rem,6.5vw,5.5rem)] lg:col-span-7">
          {en.services.heading}
        </h2>
        <p data-reveal className="max-w-md text-lg text-muted lg:col-span-5 lg:justify-self-end">
          {en.services.intro}
        </p>
      </div>

      <ul className="mt-14 border-t border-line">
        {en.services.items.map((service, index) => {
          const Icon = icons[index] ?? Globe;
          return (
            <li key={service.title} data-reveal className="border-b border-line">
              <Link
                href={types[index] ? `/contact?type=${types[index]}` : "/contact"}
                className="sweep group block transition-colors duration-300 hover:text-on-accent focus-visible:text-on-accent focus-visible:outline-on-accent focus-visible:-outline-offset-4"
              >
                <span className="sr-only">{en.services.ask} </span>
                <div className="shell grid items-center gap-x-6 gap-y-3 py-8 sm:py-10 md:grid-cols-12">
                  <Icon
                    className="size-8 text-accent-strong transition-colors duration-300 group-hover:text-on-accent group-focus-visible:text-on-accent md:col-span-1"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="display text-[clamp(2rem,4.4vw,3.5rem)] md:col-span-5">{service.title}</h3>
                  <p className="max-w-md text-muted transition-colors duration-300 group-hover:text-on-accent group-focus-visible:text-on-accent md:col-span-5">
                    {service.body}
                  </p>
                  <ArrowUpRight
                    className="hidden size-9 justify-self-end transition-transform duration-300 group-hover:rotate-45 md:col-span-1 md:block"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
