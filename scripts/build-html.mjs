import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderSite } from "../src/site/templates.mjs";

const rootDir = process.cwd();
const pages = renderSite();

for (const page of pages) {
  const outputPath = path.join(rootDir, page.path);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, page.html, "utf8");
}

console.log(`Generated ${pages.length} HTML pages.`);
