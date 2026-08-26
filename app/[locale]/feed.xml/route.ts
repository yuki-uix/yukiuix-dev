import { buildFeed } from "@/lib/feed";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/data/articles";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: { locale: string } },
) {
  const locale: Locale = params.locale === "en" ? "en" : "zh";
  return new Response(await buildFeed(locale), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
