export type ExperienceEntry = {
  company: string;
  role: { zh: string; en: string };
  period: { zh: string; en: string };
  summary: { zh: string[]; en: string[] };
};

export const experiences: ExperienceEntry[] = [
  {
    company: "ThoughtWorks",
    role: { zh: "软件开发工程师", en: "Software Developer" },
    period: { zh: "2022.12 – 至今", en: "Dec 2022 – Present" },
    summary: {
      zh: [
        "工作覆盖 React / TypeScript 购买流程、BFF、Java / Spring Boot 服务与 Kafka 事件链路，也以 feature owner 身份负责过从技术方案、埋点到生产部署的完整交付。",
        "为多个 TypeScript 仓库搭建项目级 AI Code Review 平台，在每个 PR 上运行，并发现了 ESLint 和 AI 生成测试都漏掉的运行时崩溃。",
        "构建 Agent 配置评估引擎与人工反馈改进循环，并在两个交付团队中试用。",
        "把多市场 rollout 经验编码成可复用的 coding-agent 工作流，将配置时间从约一周缩短到半天。",
      ],
      en: [
        "Work spans React and TypeScript purchase flows, BFFs, Java and Spring Boot services, and Kafka event pipelines. I have also owned features from technical design and analytics through production deployment.",
        "Built a project-wide AI code review platform that runs on every pull request across multiple TypeScript repositories. It caught a runtime crash missed by ESLint and AI-generated tests.",
        "Built an agent-configuration evaluation engine and human-feedback improvement loop, then piloted it with two delivery teams.",
        "Encoded multi-market rollout knowledge into a reusable coding-agent workflow, reducing setup from roughly one week to half a day.",
      ],
    },
  },
];
