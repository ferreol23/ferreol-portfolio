// Runs after `next build` (see "build" in package.json).
//
// Next.js 16.4 writes the small "prefetch" files of each page in sub-folders,
//   out/contact/__next.contact/__PAGE__.txt
// but the browser asks for them with dots instead of slashes:
//   out/contact/__next.contact.__PAGE__.txt
// Without this, each link prefetch shows a 404 in the console (the pages still work).
// This copies every such file to the name the browser expects.
import { copyFile, readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const OUT = join(import.meta.dirname, "..", "out");

async function filesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => (entry.isDirectory() ? filesIn(join(dir, entry.name)) : [join(dir, entry.name)])),
  );
  return nested.flat();
}

let copied = 0;
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const file of await filesIn(path)) {
        const flat = `${entry.name}.${relative(path, file).split(sep).join(".")}`;
        await copyFile(file, join(dir, flat));
        copied++;
      }
    } else if (entry.name !== "_next") {
      await walk(path);
    }
  }
}

await walk(OUT);
console.log(`Prefetch files: ${copied} copied to their expected names.`);
