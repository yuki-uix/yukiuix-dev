"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const otherLocale = locale === "zh" ? "en" : "zh";
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#projects", label: t("projects") },
    { href: "#writing", label: t("writing") },
    { href: "#about", label: t("about") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-2 border-structure bg-canvas">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-mono text-[15px] font-medium tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          yuki<span className="text-primary">.uix</span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-8">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
          <Link
            href="/"
            locale={otherLocale}
            className="border border-hairline px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-primary hover:text-primary"
          >
            {t("switchLang")}
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/"
            locale={otherLocale}
            className="border border-hairline px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-primary hover:text-primary"
          >
            {t("switchLang")}
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border-[0.5px] border-hairline"
            aria-expanded={open}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-[0.5px] w-5 bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[0.5px] w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-[0.5px] w-5 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-b-2 border-structure bg-canvas px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block text-sm text-muted transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
