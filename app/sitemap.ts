import { MetadataRoute } from "next";

const BASE = "https://yukiuix.com";

type RouteConfig = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const routes: RouteConfig[] = [
  { path: "",          changeFrequency: "monthly", priority: 1.0 },
  { path: "/writing",  changeFrequency: "weekly",  priority: 0.9 },
  { path: "/playground", changeFrequency: "monthly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        zh: `${BASE}${path}`,
        en: `${BASE}/en${path}`,
      },
    },
  }));
}
