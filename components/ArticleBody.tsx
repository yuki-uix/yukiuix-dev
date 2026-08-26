import type { ReactNode } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

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

/** 中文标题保留原字，靠 URL 编码传递——比音译成拼音可读得多 */
function headingId(node: ReactNode): string {
  return headingText(node)
    .trim()
    .toLowerCase()
    .replace(/[\s]+/g, "-")
    .replace(/[^\w\u4e00-\u9fff-]/g, "");
}

const components = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 id={headingId(children)}>{children}</h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 id={headingId(children)}>{children}</h3>
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
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
  });

  return <div className="prose-article">{content}</div>;
}
