const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Claude API",
  "Vertex AI",
  "Mixpanel",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-structure mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="about-heading"
    >
      <h2
        id="about-heading"
        className="border-l-[3px] border-primary pl-2.5 font-mono text-[11px] tracking-[0.14em] text-primary"
      >
        关于
      </h2>
      <p className="mt-2 text-sm font-medium text-ink">背景与现在在做什么</p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-14">
        <div>
          <h3 className="text-sm font-medium text-ink">现在在做</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            电商 SaaS 产品里的体验与工程落地，用数据与 AI
            辅助决策，把复杂流程收束成可交付的界面与流程。
          </p>
          <p className="mt-8 text-sm font-medium text-ink">技术栈</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {stack.map((item) => (
              <li key={item}>
                <span className="inline-block border-[0.5px] border-hairline bg-canvas px-3 py-1 font-mono text-[11px] text-muted">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-muted">
          <p>建筑学本科，自学 UX，入行前端。</p>
          <p>
            三个背景的交叉给了我一个不太常见的视角：把用户在产品里的行为路径，理解成一种空间动线问题。
          </p>
          <p>
            现在写电商 SaaS 全链路的技术分析，做配套 demo，探索 AI
            在每一层的真实介入价值。
          </p>
          <p>
            不谈市场规模，不谈技术趋势，只问：AI
            在这里能做什么，不能做什么。
          </p>
        </div>
      </div>
    </section>
  );
}
