import { existsSync, readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const htmlFiles = [
  "index.html",
  ...(await readdir(path.join(rootDir, "pages")))
    .filter((file) => file.endsWith(".html"))
    .map((file) => path.posix.join("pages", file))
    .sort(),
];

const failures = [];

function isExternalLink(value) {
  return (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("//") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:")
  );
}

function stripQuery(value) {
  return value.split("?")[0];
}

function idsIn(html) {
  const ids = new Set();
  const idPattern = /\sid="([^"]+)"/g;
  let match;

  while ((match = idPattern.exec(html))) {
    ids.add(match[1]);
  }

  return ids;
}

for (const htmlFile of htmlFiles) {
  const sourcePath = path.join(rootDir, htmlFile);
  const html = readFileSync(sourcePath, "utf8");
  const attrPattern = /\s(?:href|src)="([^"]+)"/g;
  let match;

  while ((match = attrPattern.exec(html))) {
    const value = match[1];

    if (!value || value === "#" || isExternalLink(value)) {
      continue;
    }

    const [targetWithoutHash, hash] = value.split("#");
    const targetPath = stripQuery(targetWithoutHash) || htmlFile;
    const absoluteTarget = path.resolve(path.dirname(sourcePath), targetPath);

    const relativeTarget = path.relative(rootDir, absoluteTarget);

    if (relativeTarget.startsWith("..") || path.isAbsolute(relativeTarget)) {
      failures.push(`${htmlFile}: ${value} escapes project root`);
      continue;
    }

    if (!existsSync(absoluteTarget)) {
      failures.push(`${htmlFile}: missing target ${value}`);
      continue;
    }

    if (hash && absoluteTarget.endsWith(".html")) {
      const targetHtml = readFileSync(absoluteTarget, "utf8");
      const targetIds = idsIn(targetHtml);

      if (!targetIds.has(hash)) {
        failures.push(`${htmlFile}: missing fragment #${hash} in ${value}`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error("Link check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML pages.`);
