import path from "node:path";
import type { NextConfig } from "next";

/*
  PUBLISHING ON GITHUB PAGES
  --------------------------
  GitHub Pages only serves files: `next build` writes the whole site as plain
  HTML/CSS/JS into the `out` folder (static export), and the GitHub Action in
  .github/workflows/deploy.yml publishes that folder on every push to main.

  - The site lives at https://ferreol23.github.io/ferreol-portfolio/, so every
    address starts with BASE_PATH (not while you run `npm run dev`).
  - No image server on GitHub Pages: images are served as they are (they're
    already small WebP files).
  - Security rules can't be sent as headers there: see src/lib/security.ts.
*/
const isDev = process.env.NODE_ENV === "development";

// The repository name on GitHub. Change both if you rename the repository.
const BASE_PATH = isDev ? "" : "/ferreol-portfolio";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  // Lets the code add the folder to plain file paths (src/lib/base-path.ts).
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
  images: { unoptimized: true },
  // No Cache Components / partial prefetching: they need a server, and a static
  // export is already 100% prebuilt files.
  turbopack: {
    // This folder is the project root (ignores stray package-lock.json files higher up).
    root: path.join(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
