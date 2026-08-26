import { useTranslations, useLocale } from "next-intl";

import type { Locale } from "@/data/articles";
import { feedPath } from "@/lib/site";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const social = [
    { label: "GitHub", href: "https://github.com/yuki-uix" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kunyu-xu/" },
    { label: t("juejin"), href: "https://juejin.cn/user/3582625834347100" },
    { label: "dev.to", href: "https://dev.to/yuki-uix" },
    // 只在 <head> 里给自动发现是不够的——大部分人是在页脚找 RSS 的
    { label: "RSS", href: feedPath(locale as Locale) },
    { label: "yuki.uix@gmail.com", href: "mailto:yuki.uix@gmail.com" },
  ];

  return (
    <footer className="relative border-t-2 border-structure bg-canvas">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="font-mono text-sm font-medium text-muted">{t("copy")}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {social.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  s.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="text-sm font-medium text-muted transition-colors hover:text-primary"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
