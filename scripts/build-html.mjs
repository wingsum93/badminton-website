import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderSite } from "../src/site/templates.mjs";

const rootDir = process.cwd();
const canonicalOrigin = "https://badminton.fatboytech.org";
const pages = renderSite();

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function sitemapUrl(pagePath) {
  const pathname = pagePath === "index.html" ? "/" : `/${pagePath}`;
  return new URL(pathname, canonicalOrigin).href;
}

function renderSitemapXml(sitePages) {
  const urls = sitePages
    .map((page) => `  <url>
    <loc>${escapeXml(sitemapUrl(page.path))}</loc>
  </url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

for (const page of pages) {
  const outputPath = path.join(rootDir, page.path);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, page.html, "utf8");
}

await writeFile(path.join(rootDir, "sitemap.xml"), renderSitemapXml(pages), "utf8");

console.log(`Generated ${pages.length} HTML pages and sitemap.xml.`);
