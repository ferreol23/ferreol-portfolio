// Serves the built site (the `out` folder) like GitHub Pages does, at
// http://localhost:3005/ferreol-portfolio/ — to check it before publishing.
// Usage: npm run build, then npm run preview
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const PORT = Number(process.env.PORT ?? 3005);
const BASE = "/ferreol-portfolio";
const ROOT = join(import.meta.dirname, "..", "out");

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

// Like GitHub Pages: /contact → contact.html, /folder/ → folder/index.html.
async function resolve(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, "");
  const base = join(ROOT, clean);
  if (!base.startsWith(ROOT)) return null;
  for (const candidate of [base, `${base}.html`, join(base, "index.html")]) {
    if (await isFile(candidate)) return candidate;
  }
  return null;
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  if (url.pathname === "/" || url.pathname === BASE) {
    res.writeHead(302, { Location: `${BASE}/` });
    return res.end();
  }
  if (!url.pathname.startsWith(`${BASE}/`)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("Not found (the site is under /ferreol-portfolio/)");
  }
  const file = await resolve(url.pathname.slice(BASE.length));
  const target = file ?? join(ROOT, "404.html");
  res.writeHead(file ? 200 : 404, { "Content-Type": types[extname(target)] ?? "application/octet-stream" });
  res.end(await readFile(target));
}).listen(PORT, () => console.log(`Built site: http://localhost:${PORT}${BASE}/`));
