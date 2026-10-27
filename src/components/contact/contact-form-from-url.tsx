"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm, type ContactPrefill } from "@/components/contact/contact-form";
import { projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { en, fill } from "@/content/en";
import { projectChoiceSchema } from "@/lib/validation";

/**
 * The contact form, pre-filled from the link that led here:
 *   /contact?type=mobile          → "Mobile app" already selected (from the Services list)
 *   /contact?project=<title>      → "I'd like something similar to <title>." (from a project)
 * Only known values are used, so a crafted link can't put random text in the form.
 * Render inside <Suspense fallback={<ContactForm />}> so the page stays static.
 */
export function ContactFormFromUrl() {
  const params = useSearchParams();

  const type = projectChoiceSchema.shape.projectType.safeParse(params.get("type") ?? undefined);
  const project = projects.find((item) => item.title === params.get("project"));

  const prefill: ContactPrefill = {
    projectType: type.success ? type.data : undefined,
    message: project
      ? fill(en.contactPage.similarMessage, { name: siteConfig.name, project: project.title })
      : undefined,
  };

  return <ContactForm prefill={prefill} />;
}
