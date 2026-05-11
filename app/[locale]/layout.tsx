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

export const metadata: Metadata = {
  title: "yuki.uix · yukiuix.com",
  description: "Design Engineer · AI · E-commerce — yukiuix.com",
};

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
