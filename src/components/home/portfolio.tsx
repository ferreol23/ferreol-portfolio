import { ArrowUpRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import { projects } from "@/config/projects";
import { en } from "@/content/en";

/** Project grid, filled from src/config/projects.ts. */
export function Portfolio() {
  return (
    <section id="work" aria-labelledby="work-heading" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <h2 id="work-heading" className="display reveal text-[clamp(2.5rem,6vw,4.5rem)] uppercase">
          {en.portfolio.heading}
        </h2>
        <p className="reveal mt-4 text-lg text-muted">{en.portfolio.intro}</p>
      </div>

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <li key={`${project.title}-${index}`} className="group reveal lift flex flex-col overflow-hidden rounded-3xl border border-line bg-surface hover:border-accent-strong">
            <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
              {project.image ? (
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 22rem, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className="absolute inset-0 grid place-items-center text-muted"
                  style={{ background: "radial-gradient(90% 90% at 100% 0%, var(--glow), transparent 55%)" }}
                >
                  <span className="flex flex-col items-center gap-2 text-sm">
                    <ImageIcon className="size-8" aria-hidden="true" />
                    {en.portfolio.screenshotPlaceholder}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="mt-2 text-muted">{project.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <li key={`${tag}-${tagIndex}`} className="rounded-full border border-line px-3 py-0.5 text-sm text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1 pt-6 font-semibold text-accent-strong hover:underline"
                >
                  {en.portfolio.viewProject}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only">
                    : {project.title} {en.common.opensInNewTab}
                  </span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
