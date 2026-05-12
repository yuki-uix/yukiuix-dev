"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { projects, type ProjectStatus } from "@/data/projects";

const statusLabel: Record<ProjectStatus, { text: string; colorClass: string }> = {
  live:       { text: "● LIVE",                colorClass: "text-emerald-500" },
  experiment: { text: "◇ EXPERIMENT",          colorClass: "text-blue-500" },
  hackathon:  { text: "◆ HACKATHON",           colorClass: "text-amber-500" },
  design:     { text: "◈ DESIGN",              colorClass: "text-primary" },
  award:      { text: "◆ HACKATHON  ★ TOP 10", colorClass: "text-amber-500" },
};

const CARD_W = 300;
const GAP    = 16;
const STEP   = CARD_W + GAP;
const CLONE  = 3;   // clones on each side (>= visible card count)
const AUTO_MS = 3500;

export default function Projects() {
  const t      = useTranslations("projects");
  const locale = useLocale() as "zh" | "en";
  const featured = projects.filter((p) => p.featuredOnHome !== false);
  const N = featured.length;

  // slides = [last CLONE items] + [all items] + [first CLONE items]
  const slides     = [...featured.slice(-CLONE), ...featured, ...featured.slice(0, CLONE)];
  const REAL_START = CLONE;
  const REAL_END   = CLONE + N - 1;

  const [pos, setPos]         = useState(REAL_START);
  const [animated, setAnimated] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef   = useRef(false);

  const stopAuto = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    intervalRef.current = setInterval(() => {
      if (!pausedRef.current) setPos((p) => p + 1);
    }, AUTO_MS);
  }, [stopAuto]);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  // After transition ends, silently jump to the real copy if we landed on a clone
  const handleTransitionEnd = useCallback(() => {
    if (pos > REAL_END) {
      setAnimated(false);
      setPos(REAL_START + (pos - REAL_END - 1));
    } else if (pos < REAL_START) {
      setAnimated(false);
      setPos(REAL_END - (REAL_START - pos - 1));
    }
  }, [pos, REAL_START, REAL_END]);

  // Re-enable animation one frame after the silent jump
  useEffect(() => {
    if (!animated) {
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimated(true))
      );
      return () => cancelAnimationFrame(raf);
    }
  }, [animated]);

  const goNext = useCallback(() => {
    setAnimated(true);
    setPos((p) => p + 1);
    startAuto();
  }, [startAuto]);

  const goPrev = useCallback(() => {
    setAnimated(true);
    setPos((p) => p - 1);
    startAuto();
  }, [startAuto]);

  return (
    <section
      id="projects"
      className="relative border-t border-structure mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8"
      aria-labelledby="projects-heading"
    >
      {/* Header row + arrows */}
      <div className="flex items-end justify-between">
        <div>
          <h2
            id="projects-heading"
            className="border-l-[3px] border-primary pl-2.5 font-mono text-xs tracking-[0.14em] text-primary"
          >
            {t("heading")}
          </h2>
          <p className="mt-2 text-base font-semibold text-ink">{t("subtitle")}</p>
        </div>

        <div className="flex gap-2 pb-0.5">
          <button
            onClick={goPrev}
            aria-label="Previous project"
            className="flex h-8 w-8 items-center justify-center border border-hairline font-mono text-sm text-muted transition-colors hover:border-primary hover:text-primary"
          >
            ←
          </button>
          <button
            onClick={goNext}
            aria-label="Next project"
            className="flex h-8 w-8 items-center justify-center border border-hairline font-mono text-sm text-muted transition-colors hover:border-primary hover:text-primary"
          >
            →
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="mt-8 overflow-hidden"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div
          className="flex"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(${-pos * STEP}px)`,
            transition: animated ? "transform 0.5s ease" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((p, i) => {
            const status     = p.status ? statusLabel[p.status] : null;
            const primaryUrl = p.demoUrl ?? p.submissionUrl;
            const primaryLabel = p.demoUrl ? t("liveDemo") : t("viewSubmission");

            return (
              <div key={`${p.title}-${i}`} style={{ width: CARD_W, flexShrink: 0 }}>
                <article className="group flex h-full flex-col border border-hairline bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                  {p.coverImage && (
                    <div
                      className="relative w-full overflow-hidden border-b border-hairline"
                      style={{ aspectRatio: "16/9" }}
                    >
                      <Image
                        src={p.coverImage}
                        alt={p.title}
                        fill
                        sizes={`${CARD_W}px`}
                        className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex-1">
                      {status && (
                        <p className={`font-mono text-[11px] font-semibold tracking-[0.12em] ${status.colorClass}`}>
                          {status.text}
                        </p>
                      )}
                      <p className={`font-mono text-[11px] tracking-wide text-muted ${status ? "mt-0.5" : ""}`}>
                        {p.tag}
                      </p>
                      <h3 className="mt-2 text-sm font-semibold text-ink transition-colors group-hover:text-primary">
                        {p.title}
                      </h3>
                      <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-muted">
                        {p.description[locale]}
                      </p>
                    </div>

                    {primaryUrl && (
                      <a
                        href={primaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 block border border-primary bg-primary px-3 py-1.5 text-center font-mono text-xs text-white transition-colors hover:bg-primary-hover"
                      >
                        {primaryLabel}
                      </a>
                    )}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 text-right">
        <Link
          href="/playground"
          className="font-mono text-xs text-muted transition-colors hover:text-primary"
        >
          {t("viewAll")}
        </Link>
      </div>
    </section>
  );
}
