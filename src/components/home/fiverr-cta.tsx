import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { FIVERR_URL } from "@/config/links";
import { en } from "@/content/en";

/** Full-width orange band inviting visitors to order on Fiverr. */
export function FiverrCta() {
  return (
    // Focus rings are dark here, since the usual orange ring would vanish on orange.
    <section aria-labelledby="cta-heading" className="bg-accent text-on-accent [&_:focus-visible]:outline-on-accent">
      <div className="shell py-24 sm:py-32">
        <h2 id="cta-heading" data-reveal className="display max-w-5xl text-[clamp(3.5rem,11vw,10rem)] leading-[0.85]">
          {en.cta.heading}
        </h2>
        <div data-reveal className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-md text-lg font-medium">{en.cta.body}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink href={FIVERR_URL} variant="dark">
              {en.cta.hireOnFiverr}
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </ButtonLink>
            <Link href="/contact" className="inline-flex min-h-11 items-center font-semibold underline decoration-2 underline-offset-4">
              {en.cta.sendMessage}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
