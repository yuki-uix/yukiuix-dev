/**
 * 标题锚点的唯一来源。
 *
 * 正文里的 id 由 `ArticleBody` 渲染时生成，目录里的链接由这里从 MDX 源码
 * 抽取——两处必须给出同一个字符串，否则目录点了跳不动，而且不会报错，
 * 只会静悄悄地失效。所以规则只写这一份，两边都 import。
 */

export type Heading = {
  /** 2 = `##`，3 = `###` */
  depth: 2 | 3;
  /** 已剥掉行内 markdown 的纯文本 */
  text: string;
  /** 与正文 `<h2 id>` / `<h3 id>` 完全一致 */
  id: string;
};

/** 中文标题保留原字，靠 URL 编码传递——比音译成拼音可读得多 */
export function headingId(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[\s]+/g, "-")
    .replace(/[^\w\u4e00-\u9fff-]/g, "");
}

/** 标题里的行内 markdown 不进 id，也不进目录 */
function stripInlineMarkdown(raw: string): string {
  return raw
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // [文字](链接)
    .replace(/[*_~`]/g, "")
    .trim();
}

/**
 * 从 MDX 源码里抽 `##` / `###`。
 *
 * 必须跳过围栏代码块：这篇正文的 python 块里就有 `# server.py` 这类注释，
 * 不跳的话会被当成标题混进目录。`#` 单层本来就不收（正文没有 h1，
 * 页面标题另外渲染），但围栏状态还是得老实跟踪。
 */
export function extractHeadings(mdx: string): Heading[] {
  const out: Heading[] = [];
  let fence: string | null = null;

  for (const line of mdx.split("\n")) {
    const fenceMatch = line.match(/^\s*(```+|~~~+)/);
    if (fenceMatch) {
      const marker = fenceMatch[1][0].repeat(3);
      if (fence === null) fence = marker;
      else if (fence === marker) fence = null;
      continue;
    }
    if (fence !== null) continue;

    const m = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;

    const text = stripInlineMarkdown(m[2]);
    if (!text) continue;

    out.push({ depth: m[1].length as 2 | 3, text, id: headingId(text) });
  }

  return out;
}
