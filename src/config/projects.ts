/**
 * Projects shown in the Portfolio section of the home page.
 * The FIRST project is also shown as "Featured project" in the hero.
 * Replace these placeholders with real work only. Add or remove items freely.
 */
export type Project = {
  title: string;
  description: string;
  tags: string[];
  /** Live site or repository. Leave as an empty string to hide the link. */
  link: string;
  /** Screenshot in the /public folder, e.g. "/projects/shop.jpg" (ideally 1600×1000). Leave "" for a placeholder. */
  image: string;
};

export const projects: Project[] = [
  {
    title: "[PROJECT 1 TITLE]",
    description: "[PLACEHOLDER] One or two sentences: what it is, who it's for, what you built.",
    tags: ["[TECH]", "[TECH]", "[TECH]"],
    link: "",
    image: "",
  },
  {
    title: "[PROJECT 2 TITLE]",
    description: "[PLACEHOLDER] One or two sentences: what it is, who it's for, what you built.",
    tags: ["[TECH]", "[TECH]"],
    link: "",
    image: "",
  },
  {
    title: "[PROJECT 3 TITLE]",
    description: "[PLACEHOLDER] One or two sentences: what it is, who it's for, what you built.",
    tags: ["[TECH]", "[TECH]", "[TECH]"],
    link: "",
    image: "",
  },
];
