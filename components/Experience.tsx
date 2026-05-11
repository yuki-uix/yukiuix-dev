"use client";

import { useTranslations, useLocale } from "next-intl";
import { experiences } from "@/data/experience";

export default function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale() as "zh" | "en";

  return (
    <section
      id="experience"
      className="relative border-t border-structure mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8"
      aria-labelledby="experience-heading"
    >
      <h2
        id="experience-heading"
        className="border-l-[3px] border-primary pl-2.5 font-mono text-xs tracking-[0.14em] text-primary"
      >
        {t("heading")}
      </h2>
      <p className="mt-2 text-base font-semibold text-ink">{t("subtitle")}</p>

      <div className="mt-8 space-y-10">
        {experiences.map((entry) => (
          <div key={entry.company}>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-base font-semibold text-ink">
                {entry.company}
              </h3>
              <span className="font-mono text-xs text-muted">
                {entry.period[locale]}
              </span>
            </div>
            <p className="mt-0.5 font-mono text-xs text-muted">
              {entry.role[locale]}
            </p>
            <div className="mt-4 space-y-3">
              {entry.summary[locale].map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted">
                  {para}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
