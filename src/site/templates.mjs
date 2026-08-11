import path from "node:path";
import { categories, legacyPages, site } from "./content.mjs";
import { instagramPostsByCategory } from "./instagram-posts.mjs";

const homePath = "index.html";
const instagramPostPattern =
  /^https:\/\/(?:www\.)?instagram\.com\/(?:p|reel|tv)\/[A-Za-z0-9_-]+\/?(?:[?#].*)?$/;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function relativeHref(fromPath, toPath) {
  const fromDir = path.posix.dirname(fromPath);
  const href = path.posix.relative(fromDir, toPath);
  return href || path.posix.basename(toPath);
}

function assetHref(pagePath, assetPath) {
  return relativeHref(pagePath, assetPath);
}

function validateInstagramPosts() {
  const categoryIds = new Set(categories.map((category) => category.id));

  for (const categoryId of Object.keys(instagramPostsByCategory)) {
    if (!categoryIds.has(categoryId)) {
      throw new Error(`Unknown Instagram category: ${categoryId}`);
    }

    const posts = instagramPostsByCategory[categoryId];

    if (!Array.isArray(posts)) {
      throw new Error(`Instagram posts for ${categoryId} must be an array.`);
    }

    for (const [index, url] of posts.entries()) {
      if (typeof url !== "string" || url.trim() === "") {
        throw new Error(`Instagram post ${categoryId}[${index}] must be a non-empty URL.`);
      }

      if (!instagramPostPattern.test(url.trim())) {
        throw new Error(
          `Instagram post ${categoryId}[${index}] must be a post, reel, or tv URL from instagram.com.`,
        );
      }
    }
  }
}

function instagramPostsForCategory(categoryId) {
  return instagramPostsByCategory[categoryId] ?? [];
}

function categoryById(id) {
  const category = categories.find((item) => item.id === id);

  if (!category) {
    throw new Error(`Missing category: ${id}`);
  }

  return category;
}

function withAnchor(href, anchor) {
  return anchor ? `${href}#${anchor}` : href;
}

function renderHeader(pagePath, activeId) {
  const homeCurrent = activeId === "home" ? ' aria-current="page"' : "";
  const homeHref = relativeHref(pagePath, homePath);
  const categoryLinks = categories
    .map((category) => {
      const href = relativeHref(pagePath, category.path);
      const current = activeId === category.id ? ' aria-current="page"' : "";
      return `<a class="nav-link" href="${href}"${current}>${escapeHtml(
        category.label,
      )}</a>`;
    })
    .join("\n            ");

  return `<header class="site-header">
        <div class="header-inner">
          <a class="brand-link" href="${homeHref}">${escapeHtml(site.title)}</a>
          <nav class="site-nav" aria-label="主要導覽">
            <a class="nav-link" href="${homeHref}"${homeCurrent}>首頁</a>
            ${categoryLinks}
          </nav>
        </div>
      </header>`;
}

function renderFooter() {
  return `<footer class="site-footer">
        <div class="footer-inner">${escapeHtml(site.footer)}</div>
      </footer>`;
}

function renderShell({
  pagePath,
  activeId,
  title,
  description,
  main,
  hasInstagramEmbeds = false,
}) {
  const cssHref = assetHref(pagePath, "assets/css/styles.css");
  const scriptHref = assetHref(pagePath, "assets/js/main.js");
  const instagramScript = hasInstagramEmbeds
    ? '    <script async src="https://www.instagram.com/embed.js"></script>\n'
    : "";

  return `<!doctype html>
<html lang="zh-Hant-HK">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeHtml(description)}" />
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="${cssHref}" />
  </head>
  <body>
    <div class="site-shell">
      ${renderHeader(pagePath, activeId)}

      <main class="main-wrap">
${main}
      </main>

      ${renderFooter()}
    </div>
${instagramScript}    <script defer src="${scriptHref}"></script>
  </body>
</html>
`;
}

function renderCueList(cues) {
  return `<div class="cue-list" aria-label="重點提示">
${cues.map((cue) => `              <p class="cue">${escapeHtml(cue)}</p>`).join("\n")}
            </div>`;
}

function renderTopicLinks(pagePath, category) {
  if (category.groups) {
    return category.groups
      .map((group) => {
        const groupHref = withAnchor(relativeHref(pagePath, category.path), group.id);
        const topicLinks = group.topics
          .map((topic) => {
            const topicHref = withAnchor(
              relativeHref(pagePath, category.path),
              topic.id,
            );
            return `<li><a href="${topicHref}">${escapeHtml(topic.label)}</a></li>`;
          })
          .join("");

        return `<li>
                    <a href="${groupHref}">${escapeHtml(group.label)}</a>
                    <ul class="topic-nested-list">${topicLinks}</ul>
                  </li>`;
      })
      .join("");
  }

  return category.topics
    .map((topic) => {
      const topicHref = withAnchor(relativeHref(pagePath, category.path), topic.id);
      return `<li><a href="${topicHref}">${escapeHtml(topic.label)}</a></li>`;
    })
    .join("");
}

function renderHomeMain() {
  const cards = categories
    .map((category) => {
      const href = relativeHref(homePath, category.path);
      return `<article class="topic-card architecture-card">
              <h3 class="topic-card-title">${escapeHtml(category.label)}</h3>
              <p class="topic-card-copy">${escapeHtml(category.description)}</p>
              <ul class="architecture-list">
                ${renderTopicLinks(homePath, category)}
              </ul>
              <a class="topic-card-link" href="${href}">睇${escapeHtml(
                category.label,
              )}教學</a>
            </article>`;
    })
    .join("\n");

  return `        <section class="hero">
          <div>
            <p class="eyebrow">廣東話羽毛球教學</p>
            <h1 class="page-title">由基礎、步法到戰術訓練，逐步建立完整羽毛球能力。</h1>
            <p class="page-intro">
              呢個網站整理常用訓練重點，方便學員課前預習、課後重溫，同埋配合教練示範內容練習。
            </p>
          </div>
          <aside class="hero-panel" aria-label="訓練重點">
            <h2 class="topic-card-title">今日訓練方向</h2>
            <p class="topic-card-copy">
              先由準備姿勢同回位開始，確保每一下出腳之後都可以回復平衡，再加入發球、擊球同實戰選擇。
            </p>
            ${renderCueList(["腳先到，拍先準備", "放鬆握拍，擊球一刻先收緊", "每球打完即刻回中"])}
          </aside>
        </section>

        <section class="section-band" aria-labelledby="architecture-title">
          <h2 id="architecture-title" class="section-title">教學架構</h2>
          <p class="section-copy">
            七個部分由基本功到比賽應用，適合初學至中階學員按主題逐步練習。
          </p>
          <div class="topic-grid architecture-grid">
${cards}
          </div>
        </section>`;
}

function renderTopicItem(topic) {
  return `<article class="lesson-item" id="${escapeHtml(topic.id)}">
              <h3 class="lesson-title">${escapeHtml(topic.label)}</h3>
              <p class="lesson-body">${escapeHtml(topic.description)}</p>
            </article>`;
}

function renderGroup(group) {
  const topics = group.topics.map(renderTopicItem).join("\n");
  return `<section class="lesson-group" id="${escapeHtml(group.id)}">
            <div class="lesson-group-header">
              <h3 class="lesson-group-title">${escapeHtml(group.label)}</h3>
              <p class="lesson-body">${escapeHtml(group.description)}</p>
            </div>
            <div class="lesson-list">
${topics}
            </div>
          </section>`;
}

function renderInstagramEmbeds(category, posts) {
  if (posts.length === 0) {
    return "";
  }

  const embeds = posts
    .map((url, index) => {
      const permalink = escapeHtml(url.trim());
      const label = `${category.label} Instagram 示範 ${index + 1}`;

      return `<article class="embed-shell">
              <h3 class="embed-title">${escapeHtml(label)}</h3>
              <blockquote class="instagram-media category-embed" data-instgrm-permalink="${permalink}" data-instgrm-version="14">
                <a class="embed-link" href="${permalink}">在 Instagram 查看示範</a>
              </blockquote>
            </article>`;
    })
    .join("\n");

  return `

        <section class="section-band" aria-labelledby="${escapeHtml(category.id)}-instagram-title">
          <h2 id="${escapeHtml(category.id)}-instagram-title" class="section-title">Instagram 示範</h2>
          <p class="section-copy">由中央設定加入相關示範連結，重新 build 後會自動嵌入到呢個分類頁。</p>
          <div class="embed-grid">
${embeds}
          </div>
        </section>`;
}

function renderCategoryMain(category, instagramPosts) {
  const lessons = category.groups
    ? `<div class="lesson-group-list">
${category.groups.map(renderGroup).join("\n")}
          </div>`
    : `<div class="lesson-list">
${category.topics.map(renderTopicItem).join("\n")}
          </div>`;

  return `        <section class="hero">
          <div>
            <p class="eyebrow">${escapeHtml(category.eyebrow)}</p>
            <h1 class="page-title">${escapeHtml(category.title)}</h1>
            <p class="page-intro">${escapeHtml(category.intro)}</p>
          </div>
          <aside class="hero-panel" aria-label="${escapeHtml(category.label)}重點">
            <h2 class="topic-card-title">練習重點</h2>
            ${renderCueList(category.cues)}
          </aside>
        </section>

        <section class="section-band" aria-labelledby="${escapeHtml(category.id)}-list-title">
          <h2 id="${escapeHtml(category.id)}-list-title" class="section-title">${escapeHtml(
            category.label,
          )}列表</h2>
          <p class="section-copy">${escapeHtml(category.description)}</p>
          ${lessons}
        </section>${renderInstagramEmbeds(category, instagramPosts)}`;
}

function renderLegacyMain(page) {
  const category = categoryById(page.targetCategoryId);
  const targetHref = withAnchor(relativeHref(page.path, category.path), page.targetAnchor);

  return `        <section class="hero">
          <div>
            <p class="eyebrow">${escapeHtml(page.label)}</p>
            <h1 class="page-title">${escapeHtml(page.title)}</h1>
            <p class="page-intro">${escapeHtml(page.intro)}</p>
            <a class="topic-card-link" href="${targetHref}">前往${escapeHtml(
              category.label,
            )}</a>
          </div>
          <aside class="hero-panel" aria-label="頁面更新">
            <h2 class="topic-card-title">頁面已更新</h2>
            <p class="topic-card-copy">
              呢個網址會繼續保留，方便舊連結可以正常開到，再帶你去新嘅教學分類。
            </p>
          </aside>
        </section>`;
}

function renderHomePage() {
  return {
    path: homePath,
    html: renderShell({
      pagePath: homePath,
      activeId: "home",
      title: site.title,
      description: site.description,
      main: renderHomeMain(),
    }),
  };
}

function renderCategoryPage(category) {
  const instagramPosts = instagramPostsForCategory(category.id);

  return {
    path: category.path,
    html: renderShell({
      pagePath: category.path,
      activeId: category.id,
      title: `${category.label} | ${site.title}`,
      description: `廣東話羽毛球${category.label}教學。${category.description}`,
      main: renderCategoryMain(category, instagramPosts),
      hasInstagramEmbeds: instagramPosts.length > 0,
    }),
  };
}

function renderLegacyPage(page) {
  return {
    path: page.path,
    html: renderShell({
      pagePath: page.path,
      activeId: page.targetCategoryId,
      title: `${page.label} | ${site.title}`,
      description: page.intro,
      main: renderLegacyMain(page),
    }),
  };
}

export function renderSite() {
  validateInstagramPosts();

  return [
    renderHomePage(),
    ...categories.map(renderCategoryPage),
    ...legacyPages.map(renderLegacyPage),
  ];
}
