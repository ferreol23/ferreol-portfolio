import { en } from "@/content/en";
import { ProcessStory } from "./process-story";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "How I work": the 4 steps of a project.
 * On large screens a big step number stays pinned on the left while the steps
 * scroll by on the right (the scroll story is added in process-story.tsx).
 */
export function Process() {
  const steps = en.process.steps;

  return (
    <section id="process" aria-labelledby="process-heading" className="border-y border-line bg-surface">
      <div className="shell py-24 sm:py-32">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="process-heading" data-split className="display text-[clamp(2.75rem,6.5vw,5.5rem)] lg:col-span-7">
            {en.process.heading}
          </h2>
          <p data-reveal className="max-w-md text-lg text-muted lg:col-span-5 lg:justify-self-end">
            {en.process.intro}
          </p>
        </div>

        <ProcessStory className="mt-16 grid gap-12 lg:grid-cols-12">
          {/* Pinned big number + progress bar (large screens only, decoration) */}
          <div className="hidden lg:col-span-5 lg:block" aria-hidden="true">
            <div className="sticky top-32">
              <div className="relative h-[clamp(11rem,17vw,16rem)] overflow-hidden">
                {steps.map((step, index) => (
                  <span
                    key={step.title}
                    data-step-number
                    className={`display outline-text absolute inset-0 text-[clamp(11rem,17vw,16rem)] ${index === 0 ? "" : "opacity-0"}`}
                  >
                    {pad(index + 1)}
                  </span>
                ))}
              </div>
              <div className="mt-8 h-1 w-full max-w-xs overflow-hidden rounded-full bg-line">
                <div data-process-progress className="h-full w-full origin-left rounded-full bg-accent" />
              </div>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {steps.map((step, index) => (
              <li
                key={step.title}
                data-step
                className="border-t border-line py-10 lg:flex lg:min-h-[52vh] lg:flex-col lg:justify-center lg:py-16"
              >
                <p className="font-display text-sm font-bold text-accent-strong">
                  {en.process.stepLabel} {pad(index + 1)}
                </p>
                <h3 className="mt-3 font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-tight">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-md text-lg text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </ProcessStory>
      </div>
    </section>
  );
}
