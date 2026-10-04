import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#E5484D",
          borderRadius: 44,
          color: "white",
          fontSize: 96,
          fontWeight: 900,
          fontFamily: "sans-serif",
        }}
      >
        B
      </div>
    ),
    {
      width: 180,
      height: 180,
    },
  );
}
