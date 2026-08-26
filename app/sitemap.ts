import { MetadataRoute } from "next";

import { selfHostedArticles } from "@/lib/writing";

const BASE = "https://yukiuix.com";

type RouteConfig = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified?: Date;
};

const routes: RouteConfig[] = [
  { path: "",          changeFrequency: "monthly", priority: 1.0 },
  { path: "/writing",  changeFrequency: "weekly",  priority: 0.9 },
  { path: "/playground", changeFrequency: "monthly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // 本站有正文的文章要单独进 sitemap——只列 /writing 的话，爬虫得靠列表页
  // 的链接发现才能找到它们，而 canonical 声明就落在这些页上。
  const articleRoutes: RouteConfig[] = selfHostedArticles().map((a) => ({
    path: `/writing/${a.slug}`,
    changeFrequency: "yearly",
    priority: 0.7,
    lastModified: new Date(a.publishedAt),
  }));

  return [...routes, ...articleRoutes].map(
    ({ path, changeFrequency, priority, lastModified }) => ({
      url: `${BASE}${path}`,
      lastModified: lastModified ?? new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          zh: `${BASE}${path}`,
          en: `${BASE}/en${path}`,
        },
      },
    }),
  );
}
