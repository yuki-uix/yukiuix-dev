"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { projects, type ProjectStatus } from "@/data/projects";

const statusConfig: Record<
  ProjectStatus,
  { label: string; textClass: string; bgClass: string }
> = {
  live:       { label: "● LIVE",                  textClass: "text-emerald-500", bgClass: "bg-emerald-500" },
  experiment: { label: "◇ EXPERIMENT",            textClass: "text-blue-500",    bgClass: "bg-blue-500" },
  hackathon:  { label: "◆ HACKATHON",             textClass: "text-amber-500",   bgClass: "bg-amber-500" },
  design:     { label: "◈ DESIGN",                textClass: "text-primary",     bgClass: "bg-primary" },
  award:      { label: "◆ HACKATHON  ★ TOP 10",  textClass: "text-amber-500",   bgClass: "bg-amber-500" },
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

      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const status = p.status ? statusConfig[p.status] : null;

          // Primary CTA: demo > submission > video
          const primaryUrl = p.demoUrl ?? p.submissionUrl ?? p.videoUrl;
          const primaryLabel = p.demoUrl
            ? t("liveDemo")
            : p.submissionUrl
            ? t("viewSubmission")
            : t("watchVideo");

          // Secondary links — plain text, low visual weight
          const secondaryLinks = [
            p.githubUrl  && { href: p.githubUrl,  label: "GitHub →" },
            p.gitlabUrl  && { href: p.gitlabUrl,  label: "GitLab →" },
            p.videoUrl   && !p.demoUrl && !p.submissionUrl
              ? null
              : p.videoUrl && { href: p.videoUrl, label: t("watchVideo") },
          ].filter(Boolean) as { href: string; label: string }[];

          return (
            <li key={p.title} className="relative">
              {/*
                Color strip anchored to the li (fixed left edge).
                The article slides right on hover, revealing more of this strip.
                Gap between original left edge and card is always filled by the color.
              */}
              {status && (
                <div className={`absolute inset-y-0 left-0 w-8 ${status.bgClass}`} />
              )}

              <article
                className={`relative flex h-full flex-col border border-hairline bg-white shadow-sm transition-transform duration-200 ease-out group ${
                  status ? "ml-1 hover:translate-x-3" : ""
                }`}
              >
                {/* Cover image */}
                {p.coverImage && (
                  <div className="relative w-full overflow-hidden border-b border-hairline" style={{ aspectRatio: "2/1" }}>
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex-1">
                    {status && (
                      <p className={`font-mono text-[11px] font-semibold tracking-[0.12em] ${status.textClass}`}>
                        {status.label}
                      </p>
                    )}
                    <p className={`font-mono text-[11px] tracking-wide text-muted ${status ? "mt-0.5" : ""}`}>
                      {p.tag}
                    </p>

                    <h2 className="mt-2 text-base font-semibold text-ink transition-colors group-hover:text-primary">
                      {p.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {p.description[locale]}
                    </p>
                  </div>

                  {/* Action row */}
                  <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {secondaryLinks.map(({ href, label }) => (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] text-muted transition-colors hover:text-primary"
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
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
