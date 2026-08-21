import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const serverDir = path.join(distDir, "server");

const files = [
  "index.html",
  "pages/backhand-power.html",
  "pages/basics.html",
  "pages/defense.html",
  "pages/footwork.html",
  "pages/forehand-power.html",
  "pages/serve.html",
  "pages/strokes.html",
  "pages/tactics.html",
  "pages/training.html",
  "pages/wipe-power.html",
  "assets/css/styles.css",
  "assets/js/main.js",
];

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

const assets = Object.fromEntries(
  await Promise.all(
    files.map(async (file) => {
      const body = await readFile(path.join(rootDir, file), "utf8");
      return [
        `/${file}`,
        {
          body,
          contentType: contentTypes[path.extname(file)] ?? "application/octet-stream",
        },
      ];
    }),
  ),
);

assets["/"] = assets["/index.html"];

const workerSource = `const assets = ${JSON.stringify(assets)};

function normalizePath(pathname) {
  if (pathname === "") return "/";
  if (pathname.endsWith("/") && pathname !== "/") {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = normalizePath(decodeURIComponent(url.pathname));
    const asset = assets[pathname] ?? assets[\`\${pathname}.html\`];

    if (!asset) {
      return new Response("Not found", {
        status: 404,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "x-content-type-options": "nosniff",
        },
      });
    }

    return new Response(asset.body, {
      headers: {
        "content-type": asset.contentType,
        "x-content-type-options": "nosniff",
      },
    });
  },
};
`;

await rm(distDir, { recursive: true, force: true });
await mkdir(serverDir, { recursive: true });
await writeFile(path.join(serverDir, "index.js"), workerSource, "utf8");

console.log(`Generated Sites bundle with ${files.length} static files.`);
