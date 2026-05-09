import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${dmSans.variable} ${dmMono.variable} font-sans antialiased`}
      >
        <div className="grid-background" aria-hidden />
        <div className="relative z-[1] min-h-screen">{children}</div>
      </body>
    </html>
  );
}
