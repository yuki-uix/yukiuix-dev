import { useTranslations } from "next-intl";

const stack = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "GraphQL",
  "Claude API",
  "Vertex AI",
  "ECharts",
  "MicroFrontend",
  "Mixpanel",
  "Azure",
];

export default function About() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="relative border-t border-structure mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="about-heading"
    >
      <h2
        id="about-heading"
        className="border-l-[3px] border-primary pl-2.5 font-mono text-xs tracking-[0.14em] text-primary"
      >
        {t("heading")}
      </h2>
      <p className="mt-2 text-base font-semibold text-ink">{t("subtitle")}</p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-14">
        <div>
          <h3 className="text-sm font-medium text-ink">{t("currentWork")}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {t("currentWorkDesc")}
          </p>
          <p className="mt-8 text-sm font-medium text-ink">{t("techStack")}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {stack.map((item) => (
              <li key={item}>
                <span className="inline-block border-[0.5px] border-muted bg-white px-3 py-1 font-mono text-[11px] text-muted">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-muted">
          <p>{t("bio1")}</p>
          <p>{t("bio2")}</p>
          <p>{t("bio3")}</p>
          <p>{t("bio4")}</p>
        </div>
      </div>

      <div className="mt-12 border-t border-hairline pt-10">
        <p className="text-sm font-medium text-ink">{t("directions")}</p>
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <li className="border border-hairline border-l-[3px] border-l-primary bg-white p-4 shadow-sm">
            <span className="text-sm font-semibold text-ink">{t("dir1Title")}</span>
            <span className="mt-1.5 block text-sm leading-relaxed text-muted">{t("dir1Desc")}</span>
          </li>
          <li className="border border-hairline border-l-[3px] border-l-primary bg-white p-4 shadow-sm">
            <span className="text-sm font-semibold text-ink">{t("dir2Title")}</span>
            <span className="mt-1.5 block text-sm leading-relaxed text-muted">{t("dir2Desc")}</span>
          </li>
          <li className="border border-hairline border-l-[3px] border-l-primary bg-white p-4 shadow-sm">
            <span className="text-sm font-semibold text-ink">{t("dir3Title")}</span>
            <span className="mt-1.5 block text-sm leading-relaxed text-muted">{t("dir3Desc")}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
