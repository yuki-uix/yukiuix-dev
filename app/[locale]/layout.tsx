import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
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
    title: "Kunyu Xu · AI 工程师 · Agent 评估与开发者工具",
    description:
      "Thoughtworks 软件开发工程师，构建 AI Agent、评估系统与开发者工具，用可检查的证据支持交付判断。工作覆盖 TypeScript、React、Node.js、Python 与 Java / Spring Boot。",
    url: absoluteUrl("zh"),
  },
  en: {
    title: "Kunyu Xu · AI Engineer · Agent Evals & Developer Tools",
    description:
      "Software Engineer at Thoughtworks building AI agents, evaluation systems, and developer tools with measurable evidence for delivery decisions. TypeScript, React, Node.js, Python, and Java/Spring Boot.",
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
  jobTitle: "Software Engineer",
  description:
    "Software Engineer at Thoughtworks building AI agents, evaluation systems, and developer tools with measurable evidence for delivery decisions.",
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
  const t = await getTranslations({ locale, namespace: "nav" });

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
          <a href="#main-content" className="skip-link">
            {t("skipToContent")}
          </a>
          <div className="grid-background" aria-hidden />
          <div className="relative z-[1] min-h-screen">{children}</div>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
