import { getTranslations } from "next-intl/server";

import {
  articleBlurb,
  articleLink,
  articleTitle,
  articles,
  type Article,
  type Locale,
} from "@/data/articles";
import { AUTHOR_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

const XML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => XML_ESCAPES[c]);
}

/** RSS 2.0 要求 RFC 822 日期 */
function rfc822(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toUTCString();
}

/**
 * 条目指向「这篇现在最该读的地方」——本站有正文就进本站，否则进平台。
 * 复用列表页同一个 `articleLink`，feed 与站内展示不会各说各话。
 */
function itemUrl(a: Article, locale: Locale): string {
  const link = articleLink(a, locale);
  if (!link) return absoluteUrl(locale, "/writing");
  return link.external ? link.href : absoluteUrl(locale, link.href);
}

export async function buildFeed(locale: Locale): Promise<string> {
  const t = await getTranslations({ locale, namespace: "feed" });

  const sorted = [...articles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  const selfUrl = `${absoluteUrl(locale, "/feed.xml")}`;
  const channelLink = absoluteUrl(locale, "/writing");
  const lastBuild = sorted.length ? rfc822(sorted[0].publishedAt) : new Date().toUTCString();

  const items = sorted
    .map((a) => {
      const categories = (a.topics ?? [])
        .map((topic) => `      <category>${escapeXml(topic)}</category>`)
        .join("\n");
      const description = articleBlurb(a, locale);
      return [
        "    <item>",
        `      <title>${escapeXml(articleTitle(a, locale))}</title>`,
        `      <link>${escapeXml(itemUrl(a, locale))}</link>`,
        // guid 用 slug 而不是 URL：文章从平台回迁到本站时地址会变，
        // 用 URL 当 guid 会让订阅者第二次收到同一篇。
        `      <guid isPermaLink="false">yukiuix.com:article:${escapeXml(a.slug)}</guid>`,
        `      <pubDate>${rfc822(a.publishedAt)}</pubDate>`,
        `      <dc:creator>${escapeXml(AUTHOR_NAME)}</dc:creator>`,
        description ? `      <description>${escapeXml(description)}</description>` : null,
        categories || null,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(t("title"))}</title>
    <link>${channelLink}</link>
    <description>${escapeXml(t("description"))}</description>
    <language>${locale === "zh" ? "zh-CN" : "en"}</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <managingEditor>yuki.uix@gmail.com (${escapeXml(AUTHOR_NAME)})</managingEditor>
    <atom:link href="${selfUrl}" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/images/web-site-preview.png</url>
      <title>${escapeXml(t("title"))}</title>
      <link>${channelLink}</link>
    </image>
${items}
  </channel>
</rss>
`;
}
