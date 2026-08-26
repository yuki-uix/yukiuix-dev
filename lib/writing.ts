import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { articles, type Article, type Locale } from "@/data/articles";

const CONTENT_DIR = path.join(process.cwd(), "content", "writing");

export type ArticleBody = {
  /** MDX 正文（已剥掉 frontmatter） */
  content: string;
  /** 覆盖 data/articles.ts 里的摘要，只在这篇正文需要另写导语时填 */
  description?: string;
  readingMinutes: number;
};

function bodyPath(slug: string, locale: Locale): string {
  return path.join(CONTENT_DIR, `${slug}.${locale}.mdx`);
}

/**
 * 中英混排的估算：中文按字数，英文按词数，再相加。
 * 只用于「X 分钟阅读」，不需要精确。
 */
function estimateReadingMinutes(text: string): number {
  const cjkCount = (text.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const wordCount = text
    .replace(/[\u4e00-\u9fff]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(cjkCount / 350 + wordCount / 220));
}

function readArticleBody(slug: string, locale: Locale): ArticleBody | null {
  const file = bodyPath(slug, locale);
  if (!fs.existsSync(file)) return null;

  const { content, data } = matter(fs.readFileSync(file, "utf8"));
  return {
    content,
    description: typeof data.description === "string" ? data.description : undefined,
    readingMinutes: estimateReadingMinutes(content),
  };
}

/**
 * 磁盘上真实存在的正文语言。
 * `data/articles.ts` 里的 `bodyLocales` 是声明，这个是事实——
 * 两者不一致时以磁盘为准，避免声明了却 404。
 */
export function availableBodyLocales(slug: string): Locale[] {
  return (["zh", "en"] as const).filter((locale) =>
    fs.existsSync(bodyPath(slug, locale)),
  );
}

/** 本站有正文的文章，按发布时间倒序 */
export function selfHostedArticles(): Article[] {
  return articles
    .filter((a) => a.source === "self" && availableBodyLocales(a.slug).length > 0)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function findArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/**
 * 当前语言没有正文时回落到另一种语言，并告诉调用方读者实际读到的是哪一版，
 * 好在页面上说明「这篇还没有英文版，下面是中文原文」。
 */
export function resolveArticleBody(
  slug: string,
  locale: Locale,
): { body: ArticleBody; bodyLocale: Locale } | null {
  const exact = readArticleBody(slug, locale);
  if (exact) return { body: exact, bodyLocale: locale };

  const fallbackLocale: Locale = locale === "zh" ? "en" : "zh";
  const fallback = readArticleBody(slug, fallbackLocale);
  return fallback ? { body: fallback, bodyLocale: fallbackLocale } : null;
}
