"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

import {
  articleBlurb,
  articleCoverAlt,
  articleLink,
  articleMonthLabel,
  articleTitle,
  articles,
  type Article,
  type ArticleLink,
  type Platform,
  type Topic,
} from "@/data/articles";

const SECTIONS: { key: Topic; anchorId: string }[] = [
  { key: "frontend", anchorId: "frontend" },
  { key: "ai", anchorId: "ai" },
  { key: "ecommerce", anchorId: "ecommerce" },
];

function sortByDate(a: Article, b: Article) {
  const at = new Date(a.publishedAt).getTime();
  const bt = new Date(b.publishedAt).getTime();
  if (bt !== at) return bt - at;
  return a.title.localeCompare(b.title, "zh-CN");
}

/** 本站原文和首页精选都进大卡片，其余走标题行 */
function isFeaturedCard(a: Article) {
  return (a.source === "self" || !!a.featured) && !!a.coverImage;
}

export default function WritingArchive() {
  const t = useTranslations("writing");
  const locale = useLocale();

  const sorted = [...articles].sort(sortByDate);

  const grouped: Record<Topic, { featured: Article[]; secondary: Article[] }> = {
    frontend: { featured: [], secondary: [] },
    ai: { featured: [], secondary: [] },
    ecommerce: { featured: [], secondary: [] },
  };

  for (const article of sorted) {
    const topics = article.topics ?? [];
    if (isFeaturedCard(article)) {
      const primary = topics[0];
      if (primary && primary in grouped) grouped[primary].featured.push(article);
      for (const topic of topics.slice(1)) {
        if (topic in grouped) grouped[topic].secondary.push(article);
      }
    } else {
      for (const topic of topics) {
        if (topic in grouped) grouped[topic].secondary.push(article);
      }
    }
  }

  const platformLabel: Record<Platform, string> = {
    juejin: t("platforms.juejin"),
    wechat: t("platforms.wechat"),
    devto: t("platforms.devto"),
  };

  const topicLabel: Record<Topic, string> = {
    frontend: t("topics.frontend"),
    ai: t("topics.ai"),
    ecommerce: t("topics.ecommerce"),
  };

  /** 出处标签：本站原文标成蓝色，站外显示落地平台 */
  function sourceLabel(link: ArticleLink | null) {
    if (!link) return null;
    return link.external ? platformLabel[link.platform] : t("originalHere");
  }

  /** 卡片与标题行都要在「内部路由 / 站外新窗 / 无链接」之间切，抽出来复用 */
  function Wrap({
    link,
    className,
    children,
  }: {
    link: ArticleLink | null;
    className?: string;
    children: React.ReactNode;
  }) {
    if (!link) return <>{children}</>;
    if (link.external) {
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className ?? "block"}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={link.href} className={className ?? "block"}>
        {children}
      </Link>
    );
  }

  return (
    <section className="relative mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8">
      <h1 className="border-l-[3px] border-primary pl-2.5 font-mono text-xs tracking-[0.14em] text-primary">
        {t("heading")}
      </h1>

      {/* Page title + section jump buttons */}
      <div className="mt-2 flex items-center justify-between gap-4">
        <p className="text-base font-semibold text-ink">{t("archiveSubtitle")}</p>
        <nav aria-label="Jump to section" className="flex shrink-0 gap-2">
          {SECTIONS.map(({ key, anchorId }) => (
            <a
              key={key}
              href={`#${anchorId}`}
              className="border border-hairline px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-primary hover:text-primary"
            >
              {topicLabel[key]}
            </a>
          ))}
        </nav>
      </div>

      {/* Topic sections */}
      <div className="mt-12 space-y-14">
        {SECTIONS.map(({ key, anchorId }) => {
          const { featured, secondary } = grouped[key];
          if (!featured.length && !secondary.length) return null;

          return (
            <div key={key} id={anchorId} className="scroll-mt-24">

              {/* Section label */}
              <h2 className="border-l-[3px] border-primary pl-3 text-lg font-semibold text-ink">
                {topicLabel[key]}
              </h2>

              {/* Frosted glass content area — grid bleeds through, blurred */}
              <div className="mt-3 border border-hairline bg-[#faf8f3]/80 px-5 py-5 backdrop-blur-sm">

                {/* Featured cards — solid white, float above frosted surface */}
                {featured.length > 0 && (
                  <div className="space-y-3">
                    {featured.map((a) => {
                      const link = articleLink(a, locale);
                      const displayBlurb = articleBlurb(a, locale);
                      return (
                        <Wrap key={a.slug} link={link}>
                          <div className="group flex gap-5 border border-hairline bg-white p-5 shadow-sm transition-shadow duration-150 hover:shadow-md">
                            <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden sm:h-[84px] sm:w-[84px]">
                              <Image
                                src={a.coverImage!}
                                alt={articleCoverAlt(a, locale) ?? t("coverAlt")}
                                fill
                                sizes="84px"
                                className="object-cover object-center"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold leading-snug text-ink transition-colors group-hover:text-primary sm:text-base">
                                {articleTitle(a, locale)}
                              </p>
                              {displayBlurb && (
                                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted sm:text-sm">
                                  {displayBlurb}
                                </p>
                              )}
                              <p className="mt-3 font-mono text-xs text-muted">
                                {articleMonthLabel(a.publishedAt)}
                                {link && (
                                  <>
                                    {" · "}
                                    <span className={link.external ? "" : "text-primary"}>
                                      {sourceLabel(link)}
                                    </span>
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                        </Wrap>
                      );
                    })}
                  </div>
                )}

                {/* Secondary title rows — sit on frosted surface */}
                {secondary.length > 0 && (
                  <div className={`divide-y divide-hairline ${featured.length > 0 ? "mt-5 border-t border-hairline pt-1" : ""}`}>
                    {secondary.map((a) => {
                      const link = articleLink(a, locale);
                      return (
                        <Wrap key={a.slug} link={link}>
                          <div className="group flex items-baseline justify-between gap-4 py-3 transition-transform duration-150 hover:translate-x-1">
                            <span className="line-clamp-1 text-sm text-muted transition-colors group-hover:text-ink">
                              {articleTitle(a, locale)}
                            </span>
                            <div className="flex shrink-0 items-baseline gap-2.5 font-mono text-xs text-muted">
                              <span>{articleMonthLabel(a.publishedAt)}</span>
                              {link && (
                                <span className={link.external ? "" : "text-primary"}>
                                  {sourceLabel(link)}
                                </span>
                              )}
                              {link && (
                                <span className="inline-block text-primary transition-transform duration-150 group-hover:translate-x-0.5">
                                  {link.external ? "↗" : "→"}
                                </span>
                              )}
                            </div>
                          </div>
                        </Wrap>
                      );
                    })}
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
