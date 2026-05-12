import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Kunyu Xu — Design Engineer · AI · E-commerce SaaS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BLUE  = "#2b6cb0";
const INK   = "#1a202c";
const MUTED = "#718096";
const BG    = "#faf8f3";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: BG,
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left accent bar */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 7, height: "100%", background: BLUE, display: "flex" }} />

        {/* Hairlines */}
        <div style={{ position: "absolute", top: 210, left: 0, width: "100%", height: 1, background: "rgba(0,0,0,0.05)", display: "flex" }} />
        <div style={{ position: "absolute", top: 420, left: 0, width: "100%", height: 1, background: "rgba(0,0,0,0.05)", display: "flex" }} />

        {/* Decorative X */}
        <div style={{ position: "absolute", right: -60, top: 0, bottom: 0, display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: 560, fontWeight: 700, color: "rgba(43,108,176,0.06)", lineHeight: 1 }}>
            X
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 4, background: BLUE, display: "flex" }} />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 88px", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 44 }}>
            <div style={{ width: 28, height: 2, background: BLUE, display: "flex" }} />
            <span style={{ fontSize: 24, fontWeight: 600, color: BLUE, letterSpacing: "0.06em" }}>
              yukiuix.com
            </span>
          </div>

          <div style={{ fontSize: 96, fontWeight: 700, color: INK, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 32 }}>
            Kunyu Xu
          </div>

          <div style={{ fontSize: 30, fontWeight: 600, color: BLUE, letterSpacing: "0.01em", marginBottom: 14 }}>
            Design Engineer
          </div>

          <div style={{ fontSize: 22, fontWeight: 400, color: MUTED, letterSpacing: "0.02em" }}>
            AI · E-commerce SaaS
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
