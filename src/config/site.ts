/**
 * Basic information about you and the site.
 * Replace every value in [BRACKETS] with your real details.
 */
export const siteConfig = {
  name: "Ferreol",
  tagline: "[YOUR TAGLINE]",
  email: "[EMAIL]",
  description:
    "[SHORT DESCRIPTION] Freelance web & app developer building business websites, web apps and mobile apps.",
  // [PLACEHOLDER] Your live website address, used for sitemap and social previews.
  // Must be a full URL starting with https:// (no trailing slash).
  url: "https://example.com",

  // Shown in the "About me" section.
  location: "[YOUR CITY, COUNTRY]",

  // Your photo: put the file in the /public folder (e.g. public/me.jpg)
  // and write its path here, e.g. "/me.jpg". Leave "" to show a placeholder.
  // [BEFORE LAUNCH] This one is AI-generated: replace it with a real photo of you.
  photo: "/images/ferreol.webp",

  // true shows "Available for new projects" under the hero buttons. Set to false when you're fully booked.
  available: true,

  // Shown in the "About me" section.
  languages: "[LANGUAGES YOU SPEAK, e.g. English, French]",
  responseTime: "[e.g. Within 24 hours]",

  // Tools you really use, shown in the "About me" section. Replace with your own list.
  stack: ["[TECH 1]", "[TECH 2]", "[TECH 3]", "[TECH 4]", "[TECH 5]", "[TECH 6]"],
} as const;
