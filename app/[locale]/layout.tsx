import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
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
      <body
        className={`${dmSans.variable} ${dmMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="grid-background" aria-hidden />
          <div className="relative z-[1] min-h-screen">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
