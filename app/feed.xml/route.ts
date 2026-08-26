import { buildFeed } from "@/lib/feed";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/data/articles";

/**
 * `https://yukiuix.com/feed.xml`——大多数人和阅读器会先猜这个地址。
 * middleware 的 matcher 排除了带点的路径，所以它不会被 locale 中间件
 * 重写到 `/zh/feed.xml`，这里直接给出默认语言的 feed。
 */
export const dynamic = "force-static";

export async function GET() {
  return new Response(await buildFeed(routing.defaultLocale as Locale), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
