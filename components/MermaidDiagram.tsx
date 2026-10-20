"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type RefObject } from "react";
import { createPortal } from "react-dom";
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
  height?: number;
};

function useDiagram(source: string, id: string) {
  const [result, setResult] = useState<DiagramResult | null>(null);

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
        const viewBox = element.getAttribute("viewBox")?.split(/[\s,]+/).map(Number);
        const width = viewBox?.[2];
        const height = viewBox?.[3];
        setResult({
          source,
          svg,
          width: width && Number.isFinite(width) && width > 0 ? width : undefined,
          height: height && Number.isFinite(height) && height > 0 ? height : undefined,
        });
        // Do not call bindFunctions: diagrams are static, without click handlers.
      } catch {
        if (!cancelled) setResult({ source, svg: null });
      }
    }

    void renderDiagram();
    return () => { cancelled = true; };
  }, [id, source]);

  return result?.source === source ? result : null;
}

function DiagramViewer({ source, id, english, triggerRef, onClose }: {
  source: string;
  id: string;
  english: boolean;
  triggerRef: RefObject<HTMLButtonElement>;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const backdropPointerDown = useRef(false);
  const [mode, setMode] = useState<"fit" | "original">("fit");
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  // Render only after opening, with a different ID from the article SVG.
  // Copying its markup would duplicate marker IDs and accessible title IDs.
  const current = useDiagram(source, `${id}-viewer`);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const trigger = triggerRef.current;
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const bodyPadding = parseFloat(getComputedStyle(document.body).paddingRight) || 0;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${bodyPadding + scrollbarWidth}px`;
    dialog.showModal();

    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [triggerRef]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(([entry]) => {
      setBounds({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const fittedWidth = current?.width && current.height && bounds.width && bounds.height
    ? Math.max(1, Math.min(current.width, bounds.width - 32, (bounds.height - 32) * current.width / current.height))
    : current?.width;
  const width = mode === "fit" ? fittedWidth : current?.width;

  return (
    <dialog
      ref={dialogRef}
      className="mermaid-viewer"
      aria-labelledby={`${id}-viewer-title`}
      aria-describedby={`${id}-viewer-help`}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>("button:not(:disabled), [tabindex='0']");
        const first = controls[0];
        const last = controls[controls.length - 1];
        // Keep the cycle in the viewer instead of visiting browser chrome/body.
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClose={(event) => {
        // A Strict Mode cleanup can queue a close event before showModal runs again.
        if (!event.currentTarget.open) onClose();
      }}
      onPointerDown={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        backdropPointerDown.current = event.target === event.currentTarget && (
          event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom
        );
      }}
      onClick={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        if (backdropPointerDown.current && event.target === event.currentTarget && (
          event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom
        )) onClose();
        backdropPointerDown.current = false;
      }}
    >
      <div className="mermaid-viewer-header">
        <h2 id={`${id}-viewer-title`}>{english ? "Diagram preview" : "图表预览"}</h2>
        <button type="button" className="mermaid-control" onClick={onClose} autoFocus>
          {english ? "Close" : "关闭"}
        </button>
      </div>
      <div className="mermaid-viewer-toolbar">
        <div className="mermaid-viewer-modes" role="group" aria-label={english ? "Diagram size" : "图表大小"}>
          <button type="button" className="mermaid-control" aria-pressed={mode === "fit"} onClick={() => setMode("fit")}>
            {english ? "Fit to window" : "适应窗口"}
          </button>
          <button type="button" className="mermaid-control" aria-pressed={mode === "original"} onClick={() => setMode("original")}>
            {english ? "Original size" : "原始大小"}
          </button>
        </div>
        <p id={`${id}-viewer-help`}>{english ? "Choose original size and scroll to read details." : "切换原始大小，可滚动查看细节。"}</p>
      </div>
      <div ref={viewportRef} className="mermaid-viewer-viewport" tabIndex={0} role="region" aria-label={english ? "Enlarged diagram" : "放大图表"}>
        {current?.svg ? (
          <div
            className="mermaid-viewer-canvas"
            style={{ "--mermaid-width": width ? `${width}px` : "100%" } as CSSProperties}
            dangerouslySetInnerHTML={{ __html: current.svg }}
          />
        ) : (
          <div className="mermaid-viewer-fallback">
            <p className="mermaid-status" role="status">
              {current
                ? english ? "The diagram could not be displayed. Its source is available below." : "图表暂时无法显示，可阅读下面的源码。"
                : english ? "Loading diagram…" : "图表加载中…"}
            </p>
            {current && <pre><code>{source}</code></pre>}
          </div>
        )}
      </div>
    </dialog>
  );
}

export default function MermaidDiagram({ source }: { source: string }) {
  const locale = useLocale();
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [expandedSource, setExpandedSource] = useState<string | null>(null);
  const current = useDiagram(source, id);
  const english = locale === "en";

  useEffect(() => {
    setExpandedSource(null);
  }, [source]);

  return (
    <figure className="mermaid-diagram">
      {current?.svg ? (
        <>
          <div
            className="mermaid-preview"
            style={{ "--mermaid-width": current.width ? `${current.width}px` : "100%" } as CSSProperties}
            dangerouslySetInnerHTML={{ __html: current.svg }}
          />
          <div className="mermaid-actions">
            <button ref={triggerRef} type="button" className="mermaid-control mermaid-expand-button" aria-haspopup="dialog" onClick={() => setExpandedSource(source)}>
              {english ? "Enlarge diagram" : "放大查看"}
            </button>
          </div>
        </>
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
      {current?.svg && expandedSource === source && createPortal(
        <DiagramViewer source={source} id={id} english={english} triggerRef={triggerRef} onClose={() => setExpandedSource(null)} />,
        document.body,
      )}
    </figure>
  );
}
