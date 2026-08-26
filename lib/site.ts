import { routing } from "@/i18n/routing";
import type { Locale } from "@/data/articles";

export const SITE_URL = "https://yukiuix.com";
export const SITE_NAME = "yukiuix.com";
export const AUTHOR_NAME = "Kunyu Xu";

/**
 * 站内路径 → 带 locale 前缀的路径。
 *
 * next-intl 用的是 `localePrefix: "as-needed"`：默认语言（zh）不带前缀，
 * 其余语言带。canonical 与 hreflang 必须指向重定向后的最终地址，否则等于
 * 让爬虫自己猜哪个是原文——所以站内所有绝对地址都从这里生成，
 * 前缀策略只写在这一个函数里。
 */
export function localePath(locale: Locale, path = ""): string {
  return locale === routing.defaultLocale ? path : `/${locale}${path}`;
}

export function absoluteUrl(locale: Locale, path = ""): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

/** 页脚等站内链接用的相对地址 */
export function feedPath(locale: Locale): string {
  return localePath(locale, "/feed.xml") || "/feed.xml";
}

const FEED_TITLE: Record<Locale, string> = {
  zh: "Kunyu Xu · 文章",
  en: "Kunyu Xu · Writing",
};

/**
 * 阅读器靠 `<link rel="alternate" type="application/rss+xml">` 自动发现 feed。
 *
 * Next 的 metadata 在 `alternates` 这一层是整块替换而不是合并——页面自己写了
 * `alternates`，layout 那份就没了。所以每个定义了 alternates 的页面都要把这个
 * 摊进去，而不是只在 layout 写一次。
 */
export function feedAlternates(locale: Locale) {
  return {
    "application/rss+xml": [
      { url: absoluteUrl(locale, "/feed.xml"), title: FEED_TITLE[locale] },
    ],
  };
}
