import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

import { articles, articleMonthLabel, type Article } from "@/data/articles";

const JUEJIN_PROFILE = "https://juejin.cn/user/3582625834347100";

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

  const platformLabel: Record<NonNullable<Article["platform"]>, string> = {
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
        {featuredArticles.map((a, index) => (
          <li key={a.title} className="py-6 sm:py-8">
            {a.url ? (
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-hairline bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md sm:p-6"
              >
                <FeaturedBody
                  article={a}
                  imagePriority={index === 0}
                  platformLabel={platformLabel}
                  readFullLabel={t("readFull")}
                  coverAltFallback={t("coverAlt")}
                  locale={locale}
                />
              </a>
            ) : (
              <div className="border border-hairline bg-white p-5 shadow-sm sm:p-6">
                <FeaturedBody
                  article={a}
                  imagePriority={index === 0}
                  platformLabel={platformLabel}
                  readFullLabel={t("readFull")}
                  coverAltFallback={t("coverAlt")}
                  locale={locale}
                />
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right">
        <a
          href={JUEJIN_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-muted transition-colors hover:text-primary"
        >
          {t("viewAll")}
        </a>
      </div>
    </section>
  );
}

function FeaturedBody({
  article: a,
  imagePriority,
  platformLabel,
  readFullLabel,
  coverAltFallback,
  locale,
}: {
  article: Article;
  imagePriority: boolean;
  platformLabel: Record<NonNullable<Article["platform"]>, string>;
  readFullLabel: string;
  coverAltFallback: string;
  locale: string;
}) {
  const displayTitle = locale === "en" && a.titleEn ? a.titleEn : a.title;
  const displayBlurb = locale === "en" && a.blurbEn ? a.blurbEn : a.blurb;
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
          {a.platform ? (
            <span className="font-mono text-xs text-muted">
              {platformLabel[a.platform]}
            </span>
          ) : null}
          {a.url ? (
            <span className="font-mono text-xs text-primary transition-colors group-hover:text-ink">
              {readFullLabel}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
