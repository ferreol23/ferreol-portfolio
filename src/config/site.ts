/**
 * Basic information about you and the site.
 * Replace every value in [BRACKETS] with your real details.
 */
export const siteConfig = {
  name: "Ferreol",
  tagline: "Fast sites. Smart apps. Zero headaches.",
  email: "cacaderyan32@gmail.com",
  description:
    "Ferreol is a full-stack developer building fast websites, web apps and mobile apps for businesses and entrepreneurs worldwide. Clear communication, fixed prices, support after delivery.",
  // [PLACEHOLDER] Your live website address, used for sitemap and social previews.
  // Must be a full URL starting with https:// (no trailing slash).
  url: "https://example.com",

  // Shown in the "About me" section.
  location: "California, United States",

  // Your photo: put the file in the /public folder (e.g. public/me.jpg)
  // and write its path here, e.g. "/me.jpg". Leave "" to show a placeholder.
  // [BEFORE LAUNCH] This one is AI-generated: replace it with a real photo of you.
  photo: "/images/ferreol.webp",

  // true shows "Available for new projects" under the hero buttons. Set to false when you're fully booked.
  available: true,

  // Shown in the "About me" section.
  languages: "French (native), English (fluent)",
  responseTime: "Usually within 1–2 hours",

  // Tools you really use, shown in the "About me" section. Replace with your own list.
  stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Firebase", "Stripe", "VS Code", "Claude (AI assistant)"],
} as const;
