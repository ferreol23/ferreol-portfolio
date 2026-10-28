/*
  The site lives in a sub-folder on GitHub Pages: https://ferreol23.github.io/ferreol-portfolio/
  Next.js adds that folder to <Link> addresses by itself, but not to plain file paths
  (images, scripts in /public). Wrap those with withBasePath().
  The value comes from next.config.ts; it is "" while you run `npm run dev`.
*/

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** "/projects/a.webp" → "/ferreol-portfolio/projects/a.webp" on the live site. */
export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
