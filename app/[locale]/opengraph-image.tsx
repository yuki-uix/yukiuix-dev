import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kunyu Xu — Design Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const META = {
  zh: { title: "Kunyu Xu", subtitle: "Design Engineer · AI · 电商 SaaS", site: "yukiuix.com" },
  en: { title: "Kunyu Xu", subtitle: "Design Engineer · AI · E-commerce", site: "yukiuix.com" },
} as const;

export default async function Image({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale === "en" ? "en" : "zh") as "zh" | "en";
  const m = META[locale];

  return new ImageResponse(
    (
      <div
        style={{
          background: "#faf9f7",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent line */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 32, height: 2, background: "#2563eb" }} />
          <span style={{ fontSize: 18, color: "#2563eb", letterSpacing: "0.1em", fontWeight: 500 }}>
            {m.site}
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#111",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {m.title}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#666",
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            {m.subtitle}
          </div>
        </div>

        {/* Bottom border */}
        <div style={{ width: "100%", height: 3, background: "#2563eb", borderRadius: 2 }} />
      </div>
    ),
    { ...size }
  );
}
