import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SITE_URL, absoluteUrl, feedAlternates } from "@/lib/site";
import "../globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
});

const META = {
  zh: {
    title: "Kunyu Xu · AI 全栈开发工程师 · 电商 SaaS",
    description:
      "Thoughtworks 软件开发工程师。React / TypeScript 前端架构与 BFF，Java / Spring Boot 服务与 Kafka 事件驱动链路；持续投入 AI Engineering——Agent Evaluation、RAG、MCP 与 AI Code Review 的生产落地。",
    url: absoluteUrl("zh"),
  },
  en: {
    title: "Kunyu Xu — AI Full-Stack Engineer · E-commerce SaaS",
    description:
      "Software developer at Thoughtworks — React/TypeScript frontend architecture and BFF, Java/Spring Boot services and Kafka event pipelines, plus three years of AI engineering: agent evaluation, RAG, MCP, and AI code review in production.",
    url: absoluteUrl("en"),
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
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      url: m.url,
      siteName: "yukiuix.com",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: m.url,
      languages: {
        zh: META.zh.url,
        en: META.en.url,
      },
      types: feedAlternates(locale),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kunyu Xu",
  alternateName: "Yuki Xu",
  url: SITE_URL,
  jobTitle: "AI Full-Stack Engineer",
  description:
    "Software developer at Thoughtworks — React/TypeScript frontend architecture and BFF, Java/Spring Boot services and Kafka event pipelines, with AI engineering work spanning agent evaluation, RAG, MCP, and AI code review in production.",
  worksFor: {
    "@type": "Organization",
    name: "Thoughtworks",
    url: "https://www.thoughtworks.com/",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Hunan University",
  },
  award: [
    "AI/works Hackathon APAC Top 3 — Thoughtworks (2026)",
    "AI Agent Hackathon Remix Winners, Global Prize — MiniMax (2025)",
    "Uxcel + UX Pilot AI Contest Top 3 — Uxcel (2025)",
  ],
  sameAs: [
    "https://www.linkedin.com/in/kunyu-xu/",
    "https://github.com/yuki-uix",
    "https://juejin.cn/user/3582625834347100",
    "https://dev.to/yuki-uix",
  ],
  knowsAbout: [
    "AI Engineering",
    "Agent Evaluation",
    "Retrieval-Augmented Generation",
    "Model Context Protocol",
    "Prompt Engineering",
    "AI Code Review",
    "React",
    "TypeScript",
    "Next.js",
    "Backend for Frontend",
    "GraphQL",
    "Java",
    "Spring Boot",
    "Kafka",
    "PostgreSQL",
    "Redis",
    "Kubernetes",
    "E-commerce SaaS",
    "CI/CD",
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as "zh" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${dmMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="grid-background" aria-hidden />
          <div className="relative z-[1] min-h-screen">{children}</div>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
