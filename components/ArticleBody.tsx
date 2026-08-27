import type { ReactNode } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import { headingId } from "@/lib/headings";

/** 从 heading 的 children 里递归取纯文本，用来生成锚点 id */
function headingText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(headingText).join("");
  if (typeof node === "object" && "props" in node) {
    return headingText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

/**
 * 标题本身带上可点的锚点。
 *
 * 原先 id 生成了却没有任何入口——22 个锚点，鼠标和触摸用户一个都用不上。
 * `#` 平时透明，hover 或键盘聚焦时才显形，不打扰正文。
 */
function Anchored({
  as: Tag,
  children,
}: {
  as: "h2" | "h3";
  children?: ReactNode;
}) {
  const id = headingId(headingText(children));
  return (
    <Tag id={id} className="heading-anchored">
      {children}
      <a href={`#${id}`} className="heading-anchor" aria-label="链接到这一节">
        #
      </a>
    </Tag>
  );
}

const components = {
  h2: ({ children }: { children?: ReactNode }) => (
    <Anchored as="h2">{children}</Anchored>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <Anchored as="h3">{children}</Anchored>
  ),
  // 宽表格自己横向滚动，页面本身永远不横向滚
  table: ({ children }: { children?: ReactNode }) => (
    <div className="table-scroll">
      <table>{children}</table>
    </div>
  ),
  a: ({ href, children }: { href?: string; children?: ReactNode }) => {
    const isExternal = !!href && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  // 正文里的图片尺寸由作者在 MDX 里写死不现实，用原生 img 交给 CSS 处理
  // eslint-disable-next-line @next/next/no-img-element
  img: (props: { src?: string; alt?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={props.src} alt={props.alt ?? ""} loading="lazy" />
  ),
};

export default async function ArticleBody({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        // 高亮只上类名，配色写在 globals.css 里——和正文一样手写，
        // 才能配得上暖米白那套配色。`detect: false` 是刻意的：
        // 没标语言的块（正文里那段样例输出）保持纯文本，别被猜成代码。
        rehypePlugins: [[rehypeHighlight, { detect: false, ignoreMissing: true }]],
      },
    },
  });

  return <div className="prose-article">{content}</div>;
}
