import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh", "en"],
  defaultLocale: "zh",
  // 中文是主语言，不带前缀：`/writing` 而不是 `/zh/writing`。
  // 旧的 `/zh/...` 链接由 next-intl 自动重定向到无前缀地址，不会 404。
  // 改这一行必须同时改 `lib/site.ts` 的 localePath——canonical 要指向最终地址。
  localePrefix: "as-needed",
});
