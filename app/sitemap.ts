import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yukiuix.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          zh: "https://yukiuix.com",
          en: "https://yukiuix.com/en",
        },
      },
    },
  ];
}
