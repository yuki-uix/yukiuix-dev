"use client";

import { useTranslations, useLocale } from "next-intl";
import { projects, type ProjectStatus } from "@/data/projects";

const statusBadge: Record<ProjectStatus, { label: string; class: string }> = {
  live:       { label: "LIVE",       class: "text-emerald-600 border-emerald-200" },
  experiment: { label: "EXPERIMENT", class: "text-blue-500 border-blue-200" },
  hackathon:  { label: "HACKATHON",  class: "text-amber-600 border-amber-200" },
};

export default function Playground() {
  const t = useTranslations("playground");
  const locale = useLocale() as "zh" | "en";

  return (
    <section className="relative mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8">
      <h1 className="border-l-[3px] border-primary pl-2.5 font-mono text-xs tracking-[0.14em] text-primary">
        {t("heading")}
      </h1>
      <p className="mt-2 text-base font-semibold text-ink">{t("subtitle")}</p>

      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {projects.map((p) => {
          const badge = p.status ? statusBadge[p.status] : null;

          // Primary CTA: demo > submission > video
          const primaryUrl = p.demoUrl ?? p.submissionUrl ?? p.videoUrl;
          const primaryLabel = p.demoUrl
            ? t("liveDemo")
            : p.submissionUrl
            ? t("viewSubmission")
            : t("watchVideo");

          // Secondary links
          const secondaryLinks = [
            p.githubUrl  && { href: p.githubUrl,  label: "GitHub →" },
            p.gitlabUrl  && { href: p.gitlabUrl,  label: "GitLab →" },
            p.videoUrl   && !p.demoUrl && !p.submissionUrl
              ? null
              : p.videoUrl && { href: p.videoUrl, label: t("watchVideo") },
          ].filter(Boolean) as { href: string; label: string }[];

          return (
            <li key={p.title}>
              <article className="group flex h-full flex-col border border-hairline bg-white p-6 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-primary hover:shadow-md">
                <div className="flex-1">
                  {/* Tag + status badge */}
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-[11px] tracking-wide text-muted transition-colors group-hover:text-primary">
                      {p.tag}
                    </p>
                    {badge && (
                      <span className={`shrink-0 border px-1.5 py-px font-mono text-[10px] leading-tight ${badge.class}`}>
                        {badge.label}
                      </span>
                    )}
                  </div>

                  <h2 className="mt-2 text-lg font-semibold text-ink transition-colors group-hover:text-primary">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {p.description[locale]}
                  </p>
                </div>

                {/* Adaptive action row */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {secondaryLinks.map(({ href, label }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-hairline px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-primary hover:text-primary"
                    >
                      {label}
                    </a>
                  ))}
                  {primaryUrl && (
                    <a
                      href={primaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto border border-primary bg-primary px-3 py-1.5 font-mono text-xs text-white transition-colors hover:bg-primary-hover"
                    >
                      {primaryLabel}
                    </a>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
