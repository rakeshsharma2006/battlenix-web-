import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#0B0B0D",
          color: "#f5f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 20,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#d4d4d8",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 52,
              height: 52,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              background: "#E5484D",
              fontSize: 28,
              fontWeight: 900,
            }}
          >
            B
          </div>
          BattleNix
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            PLAY. COMPETE. WIN.
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#a1a1aa",
              maxWidth: 780,
            }}
          >
            BGMI and Free Fire tournaments, live match tracking, and team-based competition.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 18,
            fontSize: 22,
            color: "#f5f5f7",
          }}
        >
          <div
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.07)",
            }}
          >
            BGMI
          </div>
          <div
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.07)",
            }}
          >
            Free Fire
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
