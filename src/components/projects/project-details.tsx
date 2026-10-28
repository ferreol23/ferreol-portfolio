"use client";

/*
  ProjectDetails — the window that opens when a project is clicked.
  - Big screenshot with previous / next buttons (or ← → keys) and thumbnails below.
  - The full description, what's inside, the tools, an honest note, and the actions
    (live site, "I want something similar", WhatsApp).
  Built on the native <dialog>: focus stays inside, Esc closes, focus returns to the
  button that opened it. A click outside the panel closes it too.
  `data-lenis-prevent` lets the window scroll natively instead of the page behind it.
*/

import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Info, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { BrandIcon } from "@/components/brand-icon";
import { ButtonLink } from "@/components/button-link";
import { WHATSAPP_URL, isPlaceholder, whatsappLink } from "@/config/links";
import type { Project } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { en, fill } from "@/content/en";
import { withBasePath } from "@/lib/base-path";
import { detailsId } from "./open-details-button";

const t = en.portfolio;

const roundButton =
  "grid size-11 place-items-center rounded-full border border-line bg-bg/85 text-text backdrop-blur transition-colors hover:border-accent-strong hover:text-accent-strong";

export function ProjectDetails({ project }: { project: Project }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState(0);
  const id = detailsId(project.slug);
  const images = project.images;
  const total = images.length;
  const image = images[current];

  const go = (step: number) => setCurrent((index) => (index + step + total) % total);
  const close = () => dialog.current?.close();

  // A click on the dark area around the panel (the <dialog> itself) closes the window.
  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };
  const onViewerKey = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") go(-1);
    if (event.key === "ArrowRight") go(1);
  };

  return (
    <dialog
      ref={dialog}
      id={id}
      aria-labelledby={`${id}-title`}
      data-lenis-prevent
      onClick={onClick}
      onClose={() => setCurrent(0)}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto border-0 overscroll-contain bg-transparent p-3 text-text backdrop:bg-black/75 backdrop:backdrop-blur-sm sm:p-6 lg:p-10"
    >
      <div className="relative mx-auto max-w-6xl rounded-[2rem] border border-line bg-bg shadow-2xl shadow-black/40 transition-[opacity,translate] duration-300 ease-out starting:translate-y-6 starting:opacity-0">
        {/* Close button: stays at the top while the window scrolls */}
        <div className="sticky top-0 z-10 flex h-0 justify-end p-3 sm:p-4">
          <button type="button" onClick={close} className={roundButton}>
            <X className="size-5" aria-hidden="true" />
            <span className="sr-only">{t.close}</span>
          </button>
        </div>

        <div className="grid gap-8 p-5 pt-16 sm:p-8 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:p-10 lg:pt-16">
          {/* Screenshots */}
          <section
            aria-label={t.screenshots}
            className="min-w-0 lg:sticky lg:top-16 lg:col-span-7 lg:self-start"
            onKeyDown={onViewerKey}
          >
            {image && (
              <figure>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface">
                  <Image
                    key={image.src}
                    src={withBasePath(image.src)}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1152px) 40rem, (min-width: 1024px) 55vw, 100vw"
                    className={image.mobile ? "object-contain p-3" : "object-cover object-top"}
                  />
                  {total > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => go(-1)}
                        className={`${roundButton} absolute left-3 top-1/2 -translate-y-1/2`}
                      >
                        <ChevronLeft className="size-5" aria-hidden="true" />
                        <span className="sr-only">{t.previous}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => go(1)}
                        className={`${roundButton} absolute right-3 top-1/2 -translate-y-1/2`}
                      >
                        <ChevronRight className="size-5" aria-hidden="true" />
                        <span className="sr-only">{t.next}</span>
                      </button>
                      <span
                        aria-hidden="true"
                        className="absolute bottom-3 right-3 rounded-full bg-bg/85 px-3 py-1 text-xs font-semibold backdrop-blur"
                      >
                        {current + 1} / {total}
                      </span>
                    </>
                  )}
                </div>
                <figcaption aria-hidden="true" className="mt-3 min-h-10 text-sm text-muted">
                  {image.alt}
                </figcaption>
                {/* Tells screen readers which screenshot is shown after a change */}
                <p className="sr-only" aria-live="polite">
                  {fill(t.screenshotOf, { current: String(current + 1), total: String(total) })}
                </p>
              </figure>
            )}

            {total > 1 && (
              <ul className="mt-3 grid grid-cols-6 gap-2">
                {images.map((thumb, index) => (
                  <li key={thumb.src}>
                    <button
                      type="button"
                      onClick={() => setCurrent(index)}
                      aria-current={index === current ? "true" : undefined}
                      className={`relative block aspect-[16/10] w-full overflow-hidden rounded-lg border bg-surface transition-[border-color,opacity] ${
                        index === current
                          ? "border-accent-strong opacity-100"
                          : "border-line opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={withBasePath(thumb.src)}
                        alt=""
                        fill
                        sizes="8rem"
                        className={thumb.mobile ? "object-contain p-0.5" : "object-cover object-top"}
                      />
                      <span className="sr-only">
                        {fill(t.screenshotOf, { current: String(index + 1), total: String(total) })}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Description */}
          <div className="min-w-0 lg:col-span-5">
            <p className="text-sm font-semibold text-accent-strong">{project.category}</p>
            <h2 id={`${id}-title`} className="display mt-2 text-[clamp(2.25rem,4vw,3.5rem)]">
              {project.title}
            </h2>

            <div className="mt-5 space-y-4 text-muted">
              {project.details.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "text-lg text-text" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>

            {project.features.length > 0 && (
              <>
                <h3 className="mt-8 font-semibold">{t.features}</h3>
                <ul className="mt-3 space-y-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-muted">
                      <Check className="mt-1 size-4 shrink-0 text-accent-strong" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h3 className="mt-8 font-semibold">{t.builtWith}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                  {tag}
                </li>
              ))}
            </ul>

            {project.note && (
              <p className="mt-8 flex gap-3 rounded-2xl border border-line bg-surface p-4 text-sm text-muted">
                <Info className="mt-0.5 size-4 shrink-0 text-accent-strong" aria-hidden="true" />
                {project.note}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {project.link && (
                <ButtonLink href={project.link}>
                  {t.liveSite}
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </ButtonLink>
              )}
              <Link
                href={`/contact?project=${encodeURIComponent(project.title)}`}
                className="group/similar inline-flex min-h-11 items-center gap-2 font-semibold transition-colors hover:text-accent-strong"
              >
                {t.similar}
                <ArrowRight
                  className="size-5 transition-transform duration-300 group-hover/similar:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
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
                  <span className="sr-only">{en.common.opensInNewTab}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
