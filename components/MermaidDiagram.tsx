"use client";

import { useEffect, useId, useState, type CSSProperties } from "react";
import { useLocale } from "next-intl";
import type { Mermaid } from "mermaid";

let mermaidPromise: Promise<Mermaid> | undefined;
let renderSequence = 0;

function loadMermaid() {
  // Only article pages with a Mermaid fence request this separate chunk.
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid")
      .then(({ default: mermaid }) => {
        const styles = getComputedStyle(document.documentElement);
        const color = (name: string) => styles.getPropertyValue(name).trim();
        const background = color("--color-bg");
        const surface = color("--color-surface-read");
        const text = color("--color-text");
        const blue = color("--color-primary");
        const border = color("--color-border");
        const fontFamily = getComputedStyle(document.body).fontFamily;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          htmlLabels: false,
          suppressErrorRendering: true,
          // Diagram frontmatter/directives cannot relax the site's policy.
          secure: [
            "secure", "securityLevel", "startOnLoad", "maxTextSize",
            "suppressErrorRendering", "maxEdges", "htmlLabels",
          ],
          theme: "base",
          fontFamily,
          themeVariables: {
            fontFamily,
            fontSize: "16px",
            primaryColor: background,
            primaryTextColor: text,
            primaryBorderColor: blue,
            secondaryColor: surface,
            secondaryTextColor: text,
            tertiaryColor: background,
            tertiaryTextColor: text,
            lineColor: blue,
            textColor: text,
            edgeLabelBackground: surface,
            clusterBkg: surface,
            clusterBorder: border,
            actorBkg: background,
            actorBorder: blue,
            actorTextColor: text,
            actorLineColor: border,
            signalColor: blue,
            signalTextColor: text,
            labelBoxBkgColor: surface,
            labelBoxBorderColor: border,
            labelTextColor: text,
            activationBkgColor: background,
            activationBorderColor: blue,
            noteBkgColor: surface,
            noteBorderColor: border,
            noteTextColor: text,
          },
        });
        return mermaid;
      })
      .catch((error: unknown) => {
        mermaidPromise = undefined;
        throw error;
      });
  }
  return mermaidPromise;
}

type DiagramResult = {
  source: string;
  svg: string | null;
  width?: number;
};

export default function MermaidDiagram({ source }: { source: string }) {
  const locale = useLocale();
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [result, setResult] = useState<DiagramResult | null>(null);
  const current = result?.source === source ? result : null;
  const english = locale === "en";

  useEffect(() => {
    let cancelled = false;
    // Each effect gets its own ID, including React Strict Mode re-runs.
    const renderId = `mermaid-${id}-${++renderSequence}`;

    async function renderDiagram() {
      try {
        const mermaid = await loadMermaid();
        await document.fonts.ready;
        if (cancelled) return;

        const { svg } = await mermaid.render(renderId, source);
        if (cancelled) return;

        const element = new DOMParser().parseFromString(svg, "image/svg+xml").documentElement;
        const width = Number(element.getAttribute("viewBox")?.split(/[\s,]+/)[2]);
        setResult({ source, svg, width: Number.isFinite(width) && width > 0 ? width : undefined });
        // Do not call bindFunctions: diagrams are static, without click handlers.
      } catch {
        if (!cancelled) setResult({ source, svg: null });
      }
    }

    void renderDiagram();
    return () => { cancelled = true; };
  }, [id, source]);

  return (
    <figure className="mermaid-diagram">
      {current?.svg ? (
        <div
          className="mermaid-scroll"
          role="region"
          aria-label={english ? "Diagram; scroll horizontally if needed" : "图表，可横向滚动"}
          tabIndex={0}
          style={{ "--mermaid-width": current.width ? `${current.width}px` : "100%" } as CSSProperties}
          dangerouslySetInnerHTML={{ __html: current.svg }}
        />
      ) : (
        <p className="mermaid-status" role="status">
          {current
            ? english ? "The diagram could not be displayed. Its source is available below." : "图表暂时无法显示，可阅读下面的源码。"
            : english ? "Loading diagram. Its source is available below." : "图表加载中，可先阅读下面的源码。"}
        </p>
      )}
      <details className="mermaid-source" open={!current?.svg}>
        <summary>{english ? "Diagram source" : "图表源码"}</summary>
        <pre><code className="language-mermaid">{source}</code></pre>
      </details>
    </figure>
  );
}
