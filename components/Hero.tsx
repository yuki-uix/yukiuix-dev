import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-8 pt-14 sm:px-6 sm:pb-10 sm:pt-20 lg:px-8 lg:pb-12 lg:pt-24">
      <div className="mb-10 flex items-center gap-3 font-mono text-xs font-medium tracking-wide text-primary">
        <span
          className="inline-block h-[1px] w-6 shrink-0 bg-current sm:w-[24px]"
          aria-hidden
        />
        <span>Design Engineer · AI · E-commerce</span>
      </div>

      <h1 className="max-w-4xl font-sans text-3xl font-semibold leading-snug tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-snug">
        深入工程，在电商 SaaS 探索{" "}
        <span className="text-primary">AI</span> 与交付的边界
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        在电商 SaaS 全链路做工程与体验的交付，用 AI 放大判断力，用数据校验直觉。
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Link
          href="#projects"
          className="inline-flex h-11 items-center justify-center border-[0.5px] border-primary bg-primary px-6 text-sm font-medium text-white transition-colors hover:border-primary-hover hover:bg-primary-hover"
        >
          查看项目
        </Link>
        <a
          href="mailto:yuki.uix@gmail.com"
          className="inline-flex h-11 items-center justify-center border border-structure bg-transparent px-6 text-sm font-medium text-ink transition-colors hover:-translate-y-0.5 hover:border-primary"
        >
          联系我
        </a>
      </div>
    </section>
  );
}
