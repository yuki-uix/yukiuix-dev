import { useTranslations } from "next-intl";

const items = [
  ["rolloutValue", "rolloutLabel"],
  ["bundleValue", "bundleLabel"],
  ["testsValue", "testsLabel"],
  ["awardValue", "awardLabel"],
] as const;

export default function Impact() {
  const t = useTranslations("impact");

  return (
    <section
      className="relative border-t border-structure mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8"
      aria-labelledby="impact-heading"
    >
      <h2
        id="impact-heading"
        className="border-l-[3px] border-primary pl-2.5 font-mono text-xs tracking-[0.14em] text-primary"
      >
        {t("heading")}
      </h2>
      <p className="mt-2 text-base font-semibold text-ink">{t("subtitle")}</p>

      <dl className="mt-8 grid grid-cols-1 border-l border-t border-hairline sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([value, label]) => (
          <div
            key={value}
            className="border-b border-r border-hairline bg-white p-5"
          >
            <dt className="text-sm leading-relaxed text-muted">{t(label)}</dt>
            <dd className="mt-2 font-mono text-xl font-medium tracking-tight text-ink">
              {t(value)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
