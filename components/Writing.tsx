import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

import {
  articleBlurb,
  articleLink,
  articleMonthLabel,
  articleTitle,
  articles,
  type Article,
  type ArticleLink,
  type Platform,
} from "@/data/articles";


/** `publishedAt` ISO 日期，新在前；同一时刻按标题稳定排序 */
function compareArticlesByPublishedDesc(a: Article, b: Article) {
  const at = new Date(a.publishedAt).getTime();
  const bt = new Date(b.publishedAt).getTime();
  if (bt !== at) return bt - at;
  return a.title.localeCompare(b.title, "zh-CN");
}

export default function Writing() {
  const t = useTranslations("writing");
  const locale = useLocale();

  const featuredArticles = [...articles]
    .filter((a) => a.featured)
    .sort(compareArticlesByPublishedDesc);

  const platformLabel: Record<Platform, string> = {
    juejin: t("platforms.juejin"),
    wechat: t("platforms.wechat"),
    devto: t("platforms.devto"),
  };

  return (
    <section
      id="writing"
      className="relative border-t border-structure mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="writing-heading"
    >
      <h2
        id="writing-heading"
        className="border-l-[3px] border-primary pl-2.5 font-mono text-xs tracking-[0.14em] text-primary"
      >
        {t("heading")}
      </h2>
      <p className="mt-2 text-base font-semibold text-ink">{t("subtitle")}</p>

      <ul className="mt-8 divide-y-[0.5px] divide-hairline border-y border-structure">
        {featuredArticles.map((a, index) => {
          const link = articleLink(a, locale);
          const body = (
            <FeaturedBody
              article={a}
              link={link}
              imagePriority={index === 0}
              platformLabel={platformLabel}
              readLabel={link?.external ? t("readFull") : t("readOnSite")}
              onSiteLabel={t("originalHere")}
              coverAltFallback={t("coverAlt")}
              locale={locale}
            />
          );
          const cardClass =
            "group block border border-hairline bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md sm:p-6";

          return (
            <li key={a.slug} className="py-6 sm:py-8">
              {!link ? (
                <div className="border border-hairline bg-white p-5 shadow-sm sm:p-6">{body}</div>
              ) : link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {body}
                </a>
              ) : (
                <Link href={link.href} className={cardClass}>
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-6 text-right">
        <Link
          href="/writing"
          className="font-mono text-xs text-muted transition-colors hover:text-primary"
        >
          {t("viewAll")}
        </Link>
      </div>
    </section>
  );
}

function FeaturedBody({
  article: a,
  link,
  imagePriority,
  platformLabel,
  readLabel,
  onSiteLabel,
  coverAltFallback,
  locale,
}: {
  article: Article;
  link: ArticleLink | null;
  imagePriority: boolean;
  platformLabel: Record<Platform, string>;
  readLabel: string;
  onSiteLabel: string;
  coverAltFallback: string;
  locale: string;
}) {
  const displayTitle = articleTitle(a, locale);
  const displayBlurb = articleBlurb(a, locale);
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
      {a.coverImage ? (
        <div className="relative h-44 w-full overflow-hidden border-[0.5px] border-hairline sm:h-[120px] sm:w-40 sm:shrink-0">
          <Image
            src={a.coverImage}
            alt={a.coverAlt ?? coverAltFallback}
            fill
            sizes="(max-width: 640px) 100vw, 160px"
            className="object-cover object-center"
            priority={imagePriority}
          />
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold leading-snug text-ink transition-colors group-hover:text-primary sm:text-lg">
          {displayTitle}
        </h3>
        {displayBlurb ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">{displayBlurb}</p>
        ) : null}
        <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <time
            dateTime={a.publishedAt}
            className="font-mono text-xs text-muted tabular-nums"
          >
            {articleMonthLabel(a.publishedAt)}
          </time>
          {/* 本站有正文时标出出处，其余显示落地的平台 */}
          {link && !link.external ? (
            <span className="font-mono text-xs text-primary">{onSiteLabel}</span>
          ) : link ? (
            <span className="font-mono text-xs text-muted">
              {platformLabel[link.platform]}
            </span>
          ) : null}
          {link ? (
            <span className="font-mono text-xs text-primary transition-colors group-hover:text-ink">
              {readLabel}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
