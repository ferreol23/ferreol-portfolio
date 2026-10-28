import { ArrowDown } from "lucide-react";
import { ProjectPreview } from "@/components/project-preview";
import { OpenDetailsButton } from "@/components/projects/open-details-button";
import { projects } from "@/config/projects";
import { en } from "@/content/en";

// Slight fan on larger screens: each card leans a little; it straightens and lifts on hover.
const tilts = ["md:-rotate-2", "md:rotate-1 md:translate-y-6", "md:-rotate-1"];

/**
 * "Recent work", right under the hero: the first three projects as small browser windows,
 * so visitors see real work early. Each card opens the project's detail window.
 * Pure CSS (no scroll effect): readable without JavaScript. On phones, the cards scroll sideways
 * (the next card peeks in, so no scrollbar is needed).
 */
export function FeaturedWork() {
  const featured = projects.slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section aria-labelledby="featured-heading" className="pb-20 pt-4 sm:pb-24">
      <div className="shell flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <p data-reveal className="flex items-center gap-2 text-sm text-muted">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            {en.featured.label}
          </p>
          <h2 id="featured-heading" data-split className="display mt-3 text-[clamp(2.25rem,5vw,4rem)]">
            {en.featured.heading}
            <span className="text-accent-strong">.</span>
          </h2>
        </div>
        <a
          href="#work"
          className="group inline-flex min-h-11 items-center gap-2 border-b-2 border-accent-strong font-semibold text-accent-strong transition-colors hover:text-text"
        >
          {en.featured.seeAll}
          <ArrowDown
            className="size-5 transition-transform duration-300 group-hover:translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </div>

      <ul className="shell mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8 [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-6">
        {featured.map((project, index) => (
          <li key={project.slug} data-reveal className="group relative w-[82%] shrink-0 snap-center md:w-auto">
            <ProjectPreview
              project={project}
              compact
              sizes="(min-width: 768px) 30vw, 82vw"
              className={`transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-0 group-has-focus-visible:-translate-y-2 group-has-focus-visible:rotate-0 ${tilts[index] ?? ""}`}
            />
            <p className={`mt-5 flex items-baseline gap-3 ${index === 1 ? "md:mt-11" : ""}`}>
              <span className="text-sm font-semibold text-accent-strong">{String(index + 1).padStart(2, "0")}</span>
              <span className="font-display text-xl font-bold transition-colors group-hover:text-accent-strong">
                {project.title}
              </span>
            </p>
            <p className="mt-1 pl-8 text-sm text-muted">{project.category}</p>
            {/* Covers the whole card: a click anywhere opens the project's details */}
            <OpenDetailsButton
              slug={project.slug}
              className="absolute inset-0 rounded-2xl focus-visible:outline-offset-4"
            >
              <span className="sr-only">
                {en.portfolio.viewDetails}: {project.title}
              </span>
            </OpenDetailsButton>
          </li>
        ))}
      </ul>
    </section>
  );
}
