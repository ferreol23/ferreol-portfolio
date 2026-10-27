/**
 * Projects shown in the Portfolio section of the home page.
 * The FIRST project is also shown as "Featured project" in the hero.
 * Replace these placeholders with real work only. Add or remove items freely.
 */
export type Project = {
  title: string;
  description: string;
  tags: string[];
  /**
   * Mini case study, one short sentence each. Leave "" to hide a line.
   * problem: what wasn't working for the client · built: what you made · result: what changed (real facts only).
   */
  problem: string;
  built: string;
  result: string;
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
    problem: "[PLACEHOLDER] What wasn't working for the client.",
    built: "[PLACEHOLDER] What you made to fix it.",
    result: "[PLACEHOLDER] What changed afterwards (real facts only).",
    link: "",
    image: "",
  },
  {
    title: "[PROJECT 2 TITLE]",
    description: "[PLACEHOLDER] One or two sentences: what it is, who it's for, what you built.",
    tags: ["[TECH]", "[TECH]"],
    problem: "[PLACEHOLDER] What wasn't working for the client.",
    built: "[PLACEHOLDER] What you made to fix it.",
    result: "[PLACEHOLDER] What changed afterwards (real facts only).",
    link: "",
    image: "",
  },
  {
    title: "[PROJECT 3 TITLE]",
    description: "[PLACEHOLDER] One or two sentences: what it is, who it's for, what you built.",
    tags: ["[TECH]", "[TECH]", "[TECH]"],
    problem: "[PLACEHOLDER] What wasn't working for the client.",
    built: "[PLACEHOLDER] What you made to fix it.",
    result: "[PLACEHOLDER] What changed afterwards (real facts only).",
    link: "",
    image: "",
  },
];
