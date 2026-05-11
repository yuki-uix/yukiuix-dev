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
        "作为项目前端主力成员，深度参与了微前端购买流程重构（Module Federation）与 SPA 购买体验优化，技术上做过性能调优、新国家 rollout 的 config 配置、微前端跳转重定位这些前端专项工作。一直在探索怎么把 AI 真正用进交付节奏里——AI 辅助 UI 需求快速变更上线、Figma API 驱动的 i18n 自动化方案、Figma MCP 生成 UI 组件框架，一步一步把「AI 加速开发」从概念变成团队可复用的实践。",
        "业务侧有机会以 feature owner 身份完整主导过几个用户体验向的小功能，从技术方案到埋点设计、再到生产部署全程跟完。团队层面在推动生产 support 流程的梳理与 AI 辅助排障的落地，也参与了跨团队 AI Playbook 的探索和撰写——交付功能是基线，也想让团队整体的工作方式变得更好一点。",
      ],
      en: [
        "As a core frontend engineer, I've been hands-on across a micro-frontend purchase flow rebuild (Module Federation) and SPA purchase experience optimisation — plus performance tuning, config design for new-country rollouts, and micro-frontend redirect handling. A running thread through all of it: figuring out how to genuinely bring AI into the delivery rhythm. That's meant AI-assisted UI changes that ship faster, a Figma API-driven i18n automation pipeline, and introducing Figma MCP for UI component scaffolding — turning \"AI speeds things up\" from a talking point into something the team can actually reuse.",
        "On the business side, I've had the chance to own a few UX-focused features end-to-end — from technical design and tracking through to production deployment. At the team level, I've been pushing to rethink how we handle production support with AI-assisted debugging, and I've been part of exploring and writing a cross-team AI Playbook. Shipping features is the baseline; I'm also interested in making how we work a bit better along the way.",
      ],
    },
  },
];
