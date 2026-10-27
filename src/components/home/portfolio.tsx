import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BrandIcon } from "@/components/brand-icon";
import { ProjectPreview } from "@/components/project-preview";
import { WHATSAPP_URL, isPlaceholder, whatsappLink } from "@/config/links";
import { projects, type Project } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { en, fill } from "@/content/en";
import { WorkShrink } from "./work-shrink";

/**
 * "Selected work": a full-width banner that shrinks into a card while scrolling
 * (WorkShrink), then the projects as large alternating rows (image / text),
 * filled from src/config/projects.ts.
 */
export function Portfolio() {
  return (
    <section id="work" aria-labelledby="work-heading" className="pb-24 sm:pb-32">
      <WorkShrink media={<BannerBackground />}>
        <div className="shell flex min-h-[80svh] flex-col justify-end gap-6 py-16 sm:py-24 lg:flex-row lg:items-end lg:justify-between">
          <div data-shrink-left>
            <h2 id="work-heading" data-split className="display text-[clamp(3.5rem,12vw,11rem)]">
              {en.portfolio.heading}
              <span className="text-accent-strong">.</span>
            </h2>
          </div>
          <div data-shrink-right>
            <p data-reveal className="max-w-sm text-lg text-muted lg:pb-4 lg:text-right">
              {en.portfolio.intro}
            </p>
          </div>
        </div>
      </WorkShrink>

      <ul className="shell mt-20 space-y-20 lg:mt-28 lg:space-y-28">
        {projects.map((project, index) => (
          <ProjectRow key={`${project.title}-${index}`} project={project} index={index} />
        ))}
      </ul>
    </section>
  );
}

/** Orange glows on a faint grid, behind the banner text (it zooms out while scrolling). */
function BannerBackground() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 75% at 85% 15%, var(--glow), transparent 65%), radial-gradient(45% 60% at 0% 100%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage: "radial-gradient(ellipse at 60% 40%, black 20%, transparent 75%)",
        }}
      />
    </>
  );
}

/** One project row; even rows show the image on the left, odd rows on the right. */
function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  // Mini case study: only the lines that are filled in.
  const caseStudy = [
    { label: en.portfolio.problem, text: project.problem },
    { label: en.portfolio.built, text: project.built },
    { label: en.portfolio.result, text: project.result },
  ].filter((line) => line.text);

  return (
    <li id={`project-${index + 1}`} className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div data-reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <ProjectPreview
          project={project}
          sizes="(min-width: 1024px) 45rem, 100vw"
          className="transition-transform duration-500 group-hover:-translate-y-1.5"
        />
      </div>

      <div data-reveal className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <h3 className="display text-[clamp(2.25rem,4vw,3.5rem)]">{project.title}</h3>
        <p className="mt-4 text-lg text-muted">{project.description}</p>
        {caseStudy.length > 0 && (
          <dl className="mt-6 space-y-3 border-l-2 border-accent-strong pl-4">
            {caseStudy.map((line) => (
              <div key={line.label}>
                <dt className="text-sm font-semibold text-text">{line.label}</dt>
                <dd className="text-muted">{line.text}</dd>
              </div>
            ))}
          </dl>
        )}
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (
            <li key={`${tag}-${tagIndex}`} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 border-b-2 border-accent-strong font-semibold text-accent-strong transition-colors hover:text-text"
            >
              {en.portfolio.viewProject}
              <ArrowUpRight className="size-5" aria-hidden="true" />
              <span className="sr-only">
                : {project.title} {en.common.opensInNewTab}
              </span>
            </a>
          )}
          <Link
            href={`/contact?project=${encodeURIComponent(project.title)}`}
            className="group/similar inline-flex min-h-11 items-center gap-2 font-semibold transition-colors hover:text-accent-strong"
          >
            {en.portfolio.similar}
            <ArrowRight
              className="size-5 transition-transform duration-300 group-hover/similar:translate-x-1"
              aria-hidden="true"
            />
            <span className="sr-only">: {project.title}</span>
          </Link>
          {/* Hidden until your WhatsApp number is filled in (src/config/links.ts). */}
          {!isPlaceholder(WHATSAPP_URL) && (
            <a
              href={whatsappLink(
                fill(en.contactPage.similarMessage, { name: siteConfig.name, project: project.title }),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-muted transition-colors hover:text-accent-strong"
            >
              <BrandIcon name="whatsapp" className="size-5" />
              {en.whatsapp.ask}
              <span className="sr-only">
                : {project.title} {en.common.opensInNewTab}
              </span>
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
