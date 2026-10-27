import { ArrowUpRight, Mail } from "lucide-react";
import type { Metadata } from "next";
import { Suspense, type CSSProperties, type ReactNode } from "react";
import { BrandIcon } from "@/components/brand-icon";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactFormFromUrl } from "@/components/contact/contact-form-from-url";
import { RevealScope } from "@/components/reveal-scope";
import { socialLinks } from "@/config/links";
import { siteConfig } from "@/config/site";
import { en, fill } from "@/content/en";
import { pageMetadata } from "@/lib/metadata";

const t = en.contactPage;

export const metadata: Metadata = pageMetadata({
  title: t.metaTitle,
  description: fill(t.metaDescription, { name: siteConfig.name }),
  path: "/contact",
});

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

type Channel = { key: string; label: string; detail?: string; href: string; icon: ReactNode; external: boolean };

export default function ContactPage() {
  const channels: Channel[] = [
    {
      key: "email",
      label: t.emailLabel,
      detail: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      icon: <Mail className="size-6" aria-hidden="true" />,
      external: false,
    },
    ...socialLinks.map((link) => ({
      key: link.name,
      label: link.label,
      detail: link.name === "whatsapp" ? en.footer.whatsappLink : undefined,
      href: link.href,
      icon: <BrandIcon name={link.name} className="size-6" />,
      external: true,
    })),
  ];

  return (
    <RevealScope>
      <section className="shell pb-16 pt-14 sm:pt-20">
        <h1 className="display rise text-[clamp(3.25rem,10vw,8.5rem)]">
          {t.heading}
          <span className="text-accent-strong">.</span>
        </h1>
        <p className="rise mt-6 max-w-2xl text-lg text-muted" style={delay(120)}>
          {t.intro}
        </p>
      </section>

      <div className="shell grid gap-16 pb-28 lg:grid-cols-12">
        <section aria-labelledby="direct-heading" className="lg:col-span-5">
          <h2 id="direct-heading" className="mb-2 text-sm font-normal text-muted">
            {t.directHeading}
          </h2>
          <ul>
            {channels.map((channel) => (
              <li key={channel.key} data-reveal className="border-t border-line last:border-b">
                <a
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex min-h-16 items-center gap-4 py-4 transition-colors hover:text-accent-strong"
                >
                  <span className="text-accent-strong">{channel.icon}</span>
                  <span className="flex-1">
                    <span className="block font-display text-2xl font-bold">{channel.label}</span>
                    {channel.detail && <span className="block text-sm text-muted">{channel.detail}</span>}
                  </span>
                  <ArrowUpRight
                    className="size-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                  {channel.external && <span className="sr-only">{en.common.opensInNewTab}</span>}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="contact-form-heading" className="lg:col-span-7">
          <div data-reveal className="rounded-[2rem] border border-line bg-surface p-6 sm:p-10">
            <h2 id="contact-form-heading" className="display mb-8 text-[clamp(2.25rem,4vw,3.25rem)]">
              {t.formHeading}
            </h2>
            {/* The plain form is in the page HTML; once loaded, it is swapped for the one pre-filled from the link. */}
            <Suspense fallback={<ContactForm />}>
              <ContactFormFromUrl />
            </Suspense>
          </div>
        </section>
      </div>
    </RevealScope>
  );
}
