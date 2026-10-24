import { ImageResponse } from "next/og";

/*
  Icon used when someone adds the site to their iPhone home screen.
  Same "F" as icon.svg, drawn bigger (iOS rounds the corners itself).
*/

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// The "F" from icon.svg, on its 32 × 32 grid.
const bars = [
  { x: 10, y: 7, w: 5, h: 18 },
  { x: 10, y: 7, w: 13, h: 5 },
  { x: 10, y: 15, w: 12, h: 4.5 },
];
const scale = size.width / 32;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#ff6b1a" }}>
        {bars.map((bar, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: bar.x * scale,
              top: bar.y * scale,
              width: bar.w * scale,
              height: bar.h * scale,
              background: "#0b0b0c",
            }}
          />
        ))}
      </div>
    ),
    size,
  );
}
