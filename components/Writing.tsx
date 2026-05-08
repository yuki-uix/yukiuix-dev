import { articles } from "@/data/articles";

export default function Writing() {
  return (
    <section
      id="writing"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="writing-heading"
    >
      <h2
        id="writing-heading"
        className="font-mono text-[11px] tracking-[0.14em] text-primary-hover"
      >
        文章
      </h2>
      <p className="mt-2 text-sm text-muted">文章与笔记</p>

      <ul className="mt-8 divide-y-[0.5px] divide-hairline border-y-[0.5px] border-hairline">
        {articles.map((a) => (
          <li key={a.title}>
            <div className="group flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:py-2">
              <p className="flex-1 text-sm leading-snug text-ink transition-colors group-hover:text-primary-hover sm:text-[15px]">
                {a.title}
              </p>
              <p className="shrink-0 font-mono text-xs text-muted tabular-nums transition-colors group-hover:text-primary-hover sm:text-right sm:text-[13px]">
                {a.date}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
