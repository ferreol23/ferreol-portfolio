import { en } from "@/content/en";

/** "How I work": 4 numbered steps (a real sequence, so numbers make sense here). */
export function Process() {
  return (
    <section aria-labelledby="process-heading" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <h2 id="process-heading" className="display reveal text-[clamp(2.5rem,6vw,4.5rem)] uppercase">
            {en.process.heading}
          </h2>
          <p className="reveal mt-4 text-lg text-muted">{en.process.intro}</p>
        </div>

        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {en.process.steps.map((step, index) => (
            <li key={step.title} className="reveal group lg:border-l lg:border-line lg:px-6 lg:first:border-l-0 lg:first:pl-0">
              <span
                aria-hidden="true"
                className="display block text-7xl text-transparent transition-colors duration-300 [-webkit-text-stroke:1.5px_var(--accent-strong)] group-hover:text-accent-strong"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
