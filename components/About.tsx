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
        关于
      </h2>
      <p className="mt-2 text-base font-semibold text-ink">背景与方向</p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-14">
        <div>
          <h3 className="text-sm font-medium text-ink">现在在做</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            在 ThoughtWorks 做电商 SaaS 全链路工程，现参与跨团队 AI Playbook 编撰。
          </p>
          <p className="mt-8 text-sm font-medium text-ink">技术栈</p>
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
          <p>
            习惯主动识别问题。发现跨境上线后筛选逻辑缺陷——课程全量返回，用户进入详情才发现无法订阅，推动立项并主导技术方案；把
            Figma MCP 引入客户私有环境，将 UI
            构建拆分为结构层与事件层，沉淀为团队 skill；构建 sub-agent
            并行查询 Azure App Insight，自动汇总错误报告，替代人工逐层排查。有建筑学
            + UX 背景，但更在意能交付什么。
          </p>
          <p>
            这个视角来自动线思维——理解用户在哪里卡住，比理解他们「想要什么」更接近问题的根。
          </p>
          <p>
            做过的一些事：Module Federation 重构购买流程（跨子团队登录态共享）；Chrome
            Performance 定位 filter 切换阻塞，从逻辑层与渲染层双向优化；设计 Figma
            API 驱动的 i18n 自动化方案，内置多国一致性校验；MiniMax AI Hackathon
            全球获奖，现参与跨团队 AI Playbook 编撰。
          </p>
          <p>
            现在把这些拆成文章和 demo，系统验证 AI 在电商 SaaS
            每一层的真实介入价值。
          </p>
        </div>
      </div>

      <div className="mt-12 border-t border-hairline pt-10">
        <p className="text-sm font-medium text-ink">探索方向</p>
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <li className="border border-hairline border-l-[3px] border-l-primary bg-white p-4 shadow-sm">
            <span className="text-sm font-semibold text-ink">电商 SaaS 全链路</span>
            <span className="mt-1.5 block text-sm leading-relaxed text-muted">从 Discovery 到 Checkout 逐层拆解与实验</span>
          </li>
          <li className="border border-hairline border-l-[3px] border-l-primary bg-white p-4 shadow-sm">
            <span className="text-sm font-semibold text-ink">AI agent 工程化</span>
            <span className="mt-1.5 block text-sm leading-relaxed text-muted">Claude API / tool calling 真实落地</span>
          </li>
          <li className="border border-hairline border-l-[3px] border-l-primary bg-white p-4 shadow-sm">
            <span className="text-sm font-semibold text-ink">Design Engineering</span>
            <span className="mt-1.5 block text-sm leading-relaxed text-muted">在工程与体验的交叉点做交付</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
