import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WritingArchive from "@/components/WritingArchive";

const META = {
  zh: {
    title: "文章 · Kunyu Xu",
    description:
      "前端工程、AI 工程化、电商 SaaS 的文章与笔记——浏览器原理、渲染管线、AI 落地实践。",
    url: "https://yukiuix.com/writing",
  },
  en: {
    title: "Writing · Kunyu Xu",
    description:
      "Articles and notes on frontend engineering, AI tooling, and e-commerce SaaS — browser internals, rendering pipelines, and AI in practice.",
    url: "https://yukiuix.com/en/writing",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale === "en" ? "en" : "zh") as "zh" | "en";
  const m = META[locale];
  return {
    metadataBase: new URL("https://yukiuix.com"),
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      url: m.url,
      siteName: "yukiuix.com",
      type: "website",
    },
    alternates: {
      canonical: m.url,
      languages: {
        zh: META.zh.url,
        en: META.en.url,
      },
    },
  };
}

export default function WritingPage() {
  return (
    <>
      <Nav />
      <main>
        <WritingArchive />
      </main>
      <Footer />
    </>
  );
}
