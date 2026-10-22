import { AppWindow, Globe, Smartphone, Wrench } from "lucide-react";
import { en } from "@/content/en";

// One icon per service, in the same order as en.services.items.
const icons = [Globe, AppWindow, Smartphone, Wrench];

export function Services() {
  return (
    <section aria-labelledby="services-heading" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <h2 id="services-heading" className="display reveal text-[clamp(2.5rem,6vw,4.5rem)] uppercase">
          {en.services.heading}
        </h2>
        <p className="reveal mt-4 text-lg text-muted">{en.services.intro}</p>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {en.services.items.map((service, index) => {
          const Icon = icons[index] ?? Globe;
          return (
            <li
              key={service.title}
              className="group reveal lift rounded-3xl border border-line bg-surface p-6 hover:border-accent-strong"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-accent text-on-accent transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-xl font-bold">{service.title}</h3>
              <p className="mt-2 text-muted">{service.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
