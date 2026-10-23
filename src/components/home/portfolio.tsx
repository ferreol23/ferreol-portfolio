import { ArrowUpRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import { projects } from "@/config/projects";
import { en } from "@/content/en";

/** Projects as large alternating rows (image / text), filled from src/config/projects.ts. */
export function Portfolio() {
  return (
    <section id="work" aria-labelledby="work-heading" className="shell scroll-mt-24 py-24 sm:py-32">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <h2 id="work-heading" data-reveal className="display text-[clamp(2.75rem,6.5vw,5.5rem)] lg:col-span-7">
          {en.portfolio.heading}
        </h2>
        <p data-reveal className="max-w-md text-lg text-muted lg:col-span-5 lg:justify-self-end">
          {en.portfolio.intro}
        </p>
      </div>

      <ul className="mt-16 space-y-20 lg:space-y-28">
        {projects.map((project, index) => {
          const flip = index % 2 === 1;
          return (
            <li key={`${project.title}-${index}`} className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div data-reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-line bg-surface">
                  {/* Taller than its frame so it can drift slightly while scrolling */}
                  <div data-parallax className="absolute inset-x-0 -inset-y-[8%]">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 45rem, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 grid place-items-center text-muted"
                        style={{ background: "radial-gradient(70% 90% at 100% 0%, var(--glow), transparent 60%)" }}
                      >
                        <span className="flex flex-col items-center gap-2 text-sm">
                          <ImageIcon className="size-8" aria-hidden="true" />
                          {en.portfolio.screenshotPlaceholder}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div data-reveal className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                <h3 className="display text-[clamp(2.25rem,4vw,3.5rem)]">{project.title}</h3>
                <p className="mt-4 text-lg text-muted">{project.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <li key={`${tag}-${tagIndex}`} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                      {tag}
                    </li>
                  ))}
                </ul>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex min-h-11 items-center gap-2 border-b-2 border-accent-strong font-semibold text-accent-strong transition-colors hover:text-text"
                  >
                    {en.portfolio.viewProject}
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                    <span className="sr-only">
                      : {project.title} {en.common.opensInNewTab}
                    </span>
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
