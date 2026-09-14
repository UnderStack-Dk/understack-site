import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import App, { schemaFor } from "./App";
import { allPages, findPage, languageTags, pageAlternates, pagePath, SITE_URL, SOCIAL_IMAGE_URL, type Language } from "./seoContent";

const IMAGE_URL = SOCIAL_IMAGE_URL;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function absolute(path: string) {
  return new URL(path, SITE_URL).toString();
}

function headFor(pathname: string) {
  if (pathname === "/privacy" || pathname === "/life/privacy") {
    const isLife = pathname === "/life/privacy";
    const title = isLife ? "Privacy Policy — Life" : "Privacy Policy — UnderStack AI Pocket";
    const description = isLife
      ? "Privacy Policy for Life, UnderStack’s local-first personal organization app."
      : "Privacy Policy for UnderStack AI Pocket, a local-first Android AI assistant.";
    const canonical = absolute(pathname);
    return {
      lang: "en",
      head: [
        `<title>${title}</title>`,
        `<meta name="description" content="${description}" />`,
        `<link rel="canonical" href="${canonical}" />`,
        `<meta property="og:title" content="${title}" />`,
        `<meta property="og:description" content="${description}" />`,
        `<meta property="og:url" content="${canonical}" />`,
        `<meta property="og:image" content="${IMAGE_URL}" />`,
        `<meta property="og:image:secure_url" content="${IMAGE_URL}" />`,
        `<meta name="twitter:title" content="${title}" />`,
        `<meta name="twitter:description" content="${description}" />`,
        `<meta name="twitter:image" content="${IMAGE_URL}" />`,
      ].join("\n    "),
    };
  }
  const parts = pathname.replace(/^\//, "").split("/");
  const lang: Language = parts[0] === "en" ? "en" : parts[0] === "se" ? "se" : parts[0] === "de" ? "de" : "dk";
  const slug = parts.slice(1).join("/").replace(/\/$/, "");
  const page = findPage(lang, slug) ?? findPage(lang, "")!;
  const canonical = absolute(pagePath(page));
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const alternates = pageAlternates(page).map((alternate) => [alternate.hrefLang, absolute(alternate.href)]);

  return {
    lang: languageTags[lang],
    head: [
      `<title>${title}</title>`,
      `<meta name="description" content="${description}" />`,
      `<link rel="canonical" href="${canonical}" />`,
      ...alternates.map(([hrefLang, href]) => `<link rel="alternate" hreflang="${hrefLang}" href="${href}" />`),
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:description" content="${description}" />`,
      `<meta property="og:url" content="${canonical}" />`,
      `<meta property="og:image" content="${IMAGE_URL}" />`,
      `<meta property="og:image:secure_url" content="${IMAGE_URL}" />`,
      `<meta name="twitter:title" content="${title}" />`,
      `<meta name="twitter:description" content="${description}" />`,
      `<meta name="twitter:image" content="${IMAGE_URL}" />`,
      `<meta name="twitter:url" content="${canonical}" />`,
      `<script type="application/ld+json" data-understack-schema="true">${JSON.stringify(schemaFor(page)).replaceAll("<", "\\u003c")}</script>`,
    ].join("\n    "),
  };
}

export function render(pathname: string) {
  const metadata = headFor(pathname);
  return {
    html: renderToString(
      <MemoryRouter initialEntries={[pathname]}>
        <App />
      </MemoryRouter>,
    ),
    ...metadata,
  };
}

export const routes = ["/privacy", "/life/privacy", ...allPages.map(pagePath)];
export const sitemapEntries = [
  { path: "/privacy", alternates: [] as { hrefLang: string; href: string }[] },
  { path: "/life/privacy", alternates: [] as { hrefLang: string; href: string }[] },
  ...allPages.map((page) => ({ path: pagePath(page), alternates: pageAlternates(page) })),
];
