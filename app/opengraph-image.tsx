import { ImageResponse } from "next/og"

export const alt = "Hyunwoo Park - Seoul National University"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, marginBottom: 24 }}>
          Hyunwoo Park
        </div>
        <div style={{ fontSize: 34, color: "#cbd5e1", marginBottom: 12 }}>
          Associate Professor, Graduate School of Data Science
        </div>
        <div style={{ fontSize: 34, color: "#cbd5e1" }}>
          Seoul National University
        </div>
        <div style={{ fontSize: 26, color: "#64748b", marginTop: 48 }}>
          hyunwoopark.com
        </div>
      </div>
    ),
    { ...size }
  )
}
