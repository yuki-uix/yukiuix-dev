import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import ArticleBody from "@/components/ArticleBody";
import ArticleToc from "@/components/ArticleToc";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ReadingProgress from "@/components/ReadingProgress";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  articleBlurb,
  articleCoverAlt,
  articleMonthLabel,
  articleTitle,
  type Article,
  type Locale,
  type Platform,
} from "@/data/articles";
import {
  availableBodyLocales,
  findArticle,
  resolveArticleBody,
  selfHostedArticles,
} from "@/lib/writing";
import { extractHeadings } from "@/lib/headings";
import { SITE_URL, absoluteUrl, feedAlternates } from "@/lib/site";

function normalizeLocale(raw: string): Locale {
  return raw === "en" ? "en" : "zh";
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    selfHostedArticles().map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale = normalizeLocale(params.locale);
  const article = findArticle(params.slug);
  const resolved = resolveArticleBody(params.slug, locale);
  if (!article || article.source !== "self" || !resolved) return {};

  const { body, bodyLocale } = resolved;
  const title = articleTitle(article, locale);
  const description = body.description ?? articleBlurb(article, locale) ?? "";
  const path = `/writing/${article.slug}`;

  // 这一语言没有正文时页面回落到另一语言，正文与 canonical 版本重复——
  // canonical 指回真正有这版正文的地址，避免被判成重复内容。
  const canonical = absoluteUrl(bodyLocale === locale ? locale : bodyLocale, path);

  const bodyLocales = availableBodyLocales(article.slug);
  const languages = Object.fromEntries(
    bodyLocales.map((l) => [l, absoluteUrl(l, path)]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: `${title} · Kunyu Xu`,
    description,
    alternates: { canonical, languages, types: feedAlternates(locale) },
    openGraph: {
      type: "article",
      title,
      description,
      url: absoluteUrl(locale, path),
      siteName: "yukiuix.com",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      publishedTime: article.publishedAt,
      authors: ["Kunyu Xu"],
      ...(article.coverImage ? { images: [`${SITE_URL}${article.coverImage}`] } : {}),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = normalizeLocale(params.locale);
  const article = findArticle(params.slug);
  const resolved = resolveArticleBody(params.slug, locale);
  if (!article || article.source !== "self" || !resolved) notFound();

  const { body, bodyLocale } = resolved;
  const t = await getTranslations({ locale, namespace: "writing" });

  const title = articleTitle(article, locale);
  const lede = body.description ?? articleBlurb(article, locale);
  const variants = article.variants ?? [];

  const platformLabel: Record<Platform, string> = {
    juejin: t("platforms.juejin"),
    wechat: t("platforms.wechat"),
    devto: t("platforms.devto"),
  };
  const topicLabel = {
    frontend: t("topics.frontend"),
    ai: t("topics.ai"),
    ecommerce: t("topics.ecommerce"),
  } as const;

  // 目录来自正文那一份源码，不是另抄一份——两份迟早会对不上
  const headings = extractHeadings(body.content);

  const ordered = selfHostedArticles();
  const index = ordered.findIndex((a) => a.slug === article.slug);
  const newer = index > 0 ? ordered[index - 1] : undefined;
  const older = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: lede,
    datePublished: article.publishedAt,
    inLanguage: bodyLocale === "zh" ? "zh-CN" : "en",
    author: { "@type": "Person", name: "Kunyu Xu", url: SITE_URL },
    mainEntityOfPage: {
      // 和 <link rel="canonical"> 保持同一个地址：这一语言没有正文时，
      // 两处都要指向真正承载正文的那一版，否则等于自己给出两个不同的原文声明。
      "@type": "WebPage",
      "@id": absoluteUrl(bodyLocale, `/writing/${article.slug}`),
    },
    ...(article.coverImage ? { image: `${SITE_URL}${article.coverImage}` } : {}),
    ...(variants.length
      ? { sameAs: variants.map((v) => v.url) }
      : {}),
  };

  return (
    <>
      <Nav />
      <ReadingProgress targetId="article-body" />
      <main id="main-content">
        <article className="article-surface relative mx-auto max-w-3xl px-4 pb-16 pt-10 sm:px-6 sm:pt-12">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          <Link
            href="/writing"
            className="font-mono text-xs text-muted transition-colors hover:text-primary"
          >
            {t("backToArchive")}
          </Link>

          <header className="mt-6 border-b border-structure pb-8">
            {article.topics?.length ? (
              <div className="flex flex-wrap gap-2">
                {article.topics.map((topic) => (
                  <span
                    key={topic}
                    className="border-[0.5px] border-hairline px-2 py-0.5 font-mono text-[11px] tracking-[0.08em] text-muted"
                  >
                    {topicLabel[topic]}
                  </span>
                ))}
              </div>
            ) : null}

            <h1 className="mt-4 text-2xl font-semibold leading-snug text-ink sm:text-3xl">
              {title}
            </h1>

            {lede ? (
              <p className="mt-4 text-base leading-relaxed text-muted">{lede}</p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 font-mono text-xs text-muted">
              <time dateTime={article.publishedAt} className="tabular-nums">
                {articleMonthLabel(article.publishedAt)}
              </time>
              <span>{t("readingMinutes", { minutes: body.readingMinutes })}</span>
              <span className="text-primary">{t("originalHere")}</span>
            </div>
          </header>

          {bodyLocale !== locale ? (
            <p className="mt-8 border-l-[3px] border-primary bg-white/60 px-4 py-3 text-sm text-muted">
              {t("bodyLocaleFallback", {
                language: t(bodyLocale === "zh" ? "languages.zh" : "languages.en"),
              })}
            </p>
          ) : null}

          {article.coverImage ? (
            <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden border-[0.5px] border-hairline">
              <Image
                src={article.coverImage}
                alt={articleCoverAlt(article, locale) ?? t("coverAlt")}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover object-center"
                priority
              />
            </div>
          ) : null}

          <ArticleToc headings={headings} label={t("tableOfContents")} />

          <div id="article-body" className="mt-10">
            <ArticleBody source={body.content} />
          </div>

          {variants.length ? (
            <section
              className="mt-16 border-t border-structure pt-8"
              aria-labelledby="also-published"
            >
              <h2
                id="also-published"
                className="border-l-[3px] border-primary pl-2.5 font-mono text-xs tracking-[0.14em] text-primary"
              >
                {t("alsoPublished")}
              </h2>
              <p className="mt-2 text-sm text-muted">{t("alsoPublishedNote")}</p>
              <ul className="mt-5 divide-y-[0.5px] divide-hairline border-y-[0.5px] border-hairline">
                {variants.map((v) => (
                  <li key={v.url}>
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between gap-4 py-3 transition-transform duration-150 hover:translate-x-1"
                    >
                      <span className="min-w-0 text-sm text-muted transition-colors group-hover:text-ink">
                        {v.title ?? title}
                      </span>
                      <span className="flex shrink-0 items-baseline gap-2.5 font-mono text-xs text-muted">
                        {platformLabel[v.platform]}
                        <span className="text-primary transition-transform duration-150 group-hover:translate-x-0.5">
                          ↗
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {newer || older ? (
            <nav
              className="mt-12 grid gap-4 border-t-[0.5px] border-hairline pt-8 sm:grid-cols-2"
              aria-label={t("moreArticles")}
            >
              <AdjacentLink article={newer} locale={locale} label={t("newerPost")} />
              <AdjacentLink
                article={older}
                locale={locale}
                label={t("olderPost")}
                align="right"
              />
            </nav>
          ) : null}
        </article>
      </main>
      <Footer />
    </>
  );
}

function AdjacentLink({
  article,
  locale,
  label,
  align = "left",
}: {
  article?: Article;
  locale: Locale;
  label: string;
  align?: "left" | "right";
}) {
  if (!article) return <div aria-hidden />;
  return (
    <Link
      href={`/writing/${article.slug}`}
      className={`group block border-[0.5px] border-hairline p-4 transition-colors hover:border-primary ${
        align === "right" ? "sm:text-right" : ""
      }`}
    >
      <span className="font-mono text-xs text-muted">{label}</span>
      <span className="mt-1.5 block text-sm leading-snug text-ink transition-colors group-hover:text-primary">
        {articleTitle(article, locale)}
      </span>
    </Link>
  );
}
