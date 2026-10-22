import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { FIVERR_URL } from "@/config/links";
import { en } from "@/content/en";

/** Big orange banner inviting visitors to order on Fiverr. */
export function FiverrCta() {
  return (
    <section aria-labelledby="cta-heading" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      {/* Focus rings are dark here, since the usual orange ring would vanish on orange. */}
      <div className="reveal rounded-[2rem] bg-accent px-6 py-14 text-on-accent sm:px-12 sm:py-16 [&_:focus-visible]:outline-on-accent">
        <h2 id="cta-heading" className="display max-w-3xl text-[clamp(2.5rem,7vw,5rem)] uppercase">
          {en.cta.heading}
        </h2>
        <p className="mt-4 max-w-xl text-lg font-medium">{en.cta.body}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <ButtonLink href={FIVERR_URL} variant="dark">
            {en.cta.hireOnFiverr}
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </ButtonLink>
          <Link
            href="/contact"
            className="font-semibold underline decoration-2 underline-offset-4"
          >
            {en.cta.sendMessage}
          </Link>
        </div>
      </div>
    </section>
  );
}
