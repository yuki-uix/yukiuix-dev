import { MetadataRoute } from "next";

import type { Locale } from "@/data/articles";
import { absoluteUrl } from "@/lib/site";
import { availableBodyLocales, selfHostedArticles } from "@/lib/writing";

type Entry = MetadataRoute.Sitemap[number];

const STATIC_ROUTES: {
  path: string;
  changeFrequency: Entry["changeFrequency"];
  priority: number;
}[] = [
  { path: "",            changeFrequency: "monthly", priority: 1.0 },
  { path: "/writing",    changeFrequency: "weekly",  priority: 0.9 },
  { path: "/playground", changeFrequency: "monthly", priority: 0.8 },
];

function bothLocales(path: string): Entry["alternates"] {
  return {
    languages: {
      zh: absoluteUrl("zh", path),
      en: absoluteUrl("en", path),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: Entry[] = STATIC_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: absoluteUrl("zh", path),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: bothLocales(path),
    }),
  );

  // 本站有正文的文章要单独进 sitemap——只列 /writing 的话，爬虫得靠列表页
  // 的链接发现才能找到它们，而 canonical 声明就落在这些页上。
  const articleEntries: Entry[] = selfHostedArticles().map((a) => {
    // 用磁盘上真实存在的语言，不用 data 里的声明：sitemap 只能列
    // 自称原文的地址，否则等于推荐一个 canonical 指向别处的页面。
    const locales = availableBodyLocales(a.slug);
    const primary: Locale = locales.includes("zh") ? "zh" : locales[0];
    const path = `/writing/${a.slug}`;

    return {
      url: absoluteUrl(primary, path),
      lastModified: new Date(a.publishedAt),
      changeFrequency: "yearly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, absoluteUrl(l, path)]),
        ),
      },
    };
  });

  return [...staticEntries, ...articleEntries];
}
