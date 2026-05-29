import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
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
    title: "Kunyu Xu · Design Engineer · AI · 电商 SaaS",
    description:
      "在 ThoughtWorks 做电商 SaaS 全链路工程，探索 AI 与前端交付的边界。写浏览器原理、渲染管线、AI 工程化。",
    url: "https://yukiuix.com",
  },
  en: {
    title: "Kunyu Xu — Design Engineer · AI · E-commerce",
    description:
      "Design Engineer at ThoughtWorks — building at the intersection of frontend engineering, AI tooling, and e-commerce SaaS. Writing about browser internals, rendering, and product thinking.",
    url: "https://yukiuix.com/en",
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
      locale: locale === "zh" ? "zh_CN" : "en_US",
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kunyu Xu",
  alternateName: "Yuki Xu",
  url: "https://yukiuix.com",
  jobTitle: "Software Developer",
  description:
    "Design Engineer at ThoughtWorks — building at the intersection of frontend engineering, AI tooling, and e-commerce SaaS.",
  sameAs: [
    "https://www.linkedin.com/in/kunyu-xu/",
    "https://github.com/yuki-uix",
    "https://juejin.cn/user/3582625834347100",
    "https://dev.to/yuki-uix",
  ],
  knowsAbout: [
    "Frontend Engineering",
    "React",
    "TypeScript",
    "Next.js",
    "Micro-Frontend Architecture",
    "AI Agent Engineering",
    "E-commerce SaaS",
    "Design Engineering",
    "Browser Rendering",
    "Performance Optimization",
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
