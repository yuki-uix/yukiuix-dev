import Image from "next/image";

import { articles, articleMonthLabel, type Article } from "@/data/articles";

function isFeatured(a: Article) {
  return Boolean(a.coverImage || a.blurb);
}

/** `publishedAt` ISO 日期，新在前；同一时刻按标题稳定排序 */
function compareArticlesByPublishedDesc(a: Article, b: Article) {
  const at = new Date(a.publishedAt).getTime();
  const bt = new Date(b.publishedAt).getTime();
  if (bt !== at) return bt - at;
  return a.title.localeCompare(b.title, "zh-CN");
}

export default function Writing() {
  const sortedArticles = [...articles].sort(compareArticlesByPublishedDesc);

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
        文章
      </h2>
      <p className="mt-2 text-base font-semibold text-ink">文章与笔记</p>

      <ul className="mt-8 divide-y-[0.5px] divide-hairline border-y border-structure">
        {sortedArticles.map((a, index) =>
          isFeatured(a) ? (
            <li key={a.title} className="py-6 sm:py-8">
              {a.url ? (
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border border-hairline bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md sm:p-6"
                >
                  <FeaturedBody article={a} imagePriority={index === 0} />
                </a>
              ) : (
                <div className="border border-hairline bg-white p-5 shadow-sm sm:p-6">
                  <FeaturedBody article={a} imagePriority={index === 0} />
                </div>
              )}
            </li>
          ) : (
            <li key={a.title}>
              <div className="group flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:py-2">
                {a.url ? (
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-sm font-medium leading-snug text-ink transition-colors group-hover:text-primary sm:text-[15px]"
                  >
                    {a.title}
                  </a>
                ) : (
                  <p className="flex-1 text-sm font-medium leading-snug text-ink transition-colors group-hover:text-primary sm:text-[15px]">
                    {a.title}
                  </p>
                )}
                <time
                  dateTime={a.publishedAt}
                  className="shrink-0 font-mono text-xs text-muted tabular-nums transition-colors group-hover:text-primary sm:text-right sm:text-[13px]"
                >
                  {articleMonthLabel(a.publishedAt)}
                </time>
              </div>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}

function FeaturedBody({
  article: a,
  imagePriority,
}: {
  article: Article;
  imagePriority: boolean;
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
      {a.coverImage ? (
        <div className="relative mx-auto h-56 w-44 shrink-0 overflow-hidden border-[0.5px] border-hairline sm:mx-0 sm:w-48">
          <Image
            src={a.coverImage}
            alt={a.coverAlt ?? "文章封面插图"}
            fill
            sizes="(max-width: 640px) 176px, 192px"
            className="object-cover object-center"
            priority={imagePriority}
          />
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold leading-snug text-ink transition-colors group-hover:text-primary sm:text-lg">
          {a.title}
        </h3>
        {a.blurb ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">{a.blurb}</p>
        ) : null}
        <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <time
            dateTime={a.publishedAt}
            className="font-mono text-xs text-muted tabular-nums"
          >
            {articleMonthLabel(a.publishedAt)}
          </time>
          {a.url ? (
            <span className="font-mono text-xs text-primary transition-colors group-hover:text-ink">
              阅读全文 →
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
