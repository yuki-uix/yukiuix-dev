"use client";

import { useTranslations, useLocale } from "next-intl";
import { projects } from "@/data/projects";

export default function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale() as "zh" | "en";

  return (
    <section
      id="projects"
      className="relative border-t border-structure mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8"
      aria-labelledby="projects-heading"
    >
      <h2
        id="projects-heading"
        className="border-l-[3px] border-primary pl-2.5 font-mono text-xs tracking-[0.14em] text-primary"
      >
        {t("heading")}
      </h2>
      <p className="mt-2 text-base font-semibold text-ink">{t("subtitle")}</p>

      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <li key={p.title} className="group">
            <article
              className="flex h-full cursor-pointer flex-col border border-hairline bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
              onClick={() => window.open(p.demoUrl, "_blank", "noopener,noreferrer")}
            >
              <h3 className="text-lg font-semibold text-ink transition-colors group-hover:text-primary">
                {p.title}
              </h3>
              <p className="mt-2 font-mono text-[11px] tracking-wide text-muted transition-colors group-hover:text-primary">
                {p.tag}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                {p.description[locale]}
              </p>
              <div className="mt-6 flex justify-end">
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="border border-hairline px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  GitHub →
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
