import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

// 1200×630 share card (WhatsApp, LinkedIn, X), built from profile data at build time.
export const alt = `${profile.name}, ${profile.role}: ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GRADIENT = "linear-gradient(100deg, #5b8cff, #b56bff 50%, #ff6b9d)";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 78% 30%, rgba(181,107,255,0.35), rgba(5,6,10,0) 55%), #05060a",
          color: "#f4f5f8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#8b90a0" }}>
          <div style={{ width: 14, height: 14, borderRadius: 99, background: "#30d158" }} />
          {profile.available ? "Taking new projects" : profile.role}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1 }}>{profile.name}</div>
          <div style={{ fontSize: 44, fontWeight: 700, marginTop: 18, color: "#c9ccd6" }}>{profile.role}</div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              marginTop: 10,
              backgroundImage: GRADIENT,
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.tagline}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8b90a0" }}>
          <span>{profile.site.replace(/^https?:\/\//, "")}</span>
          <span>{`${profile.stats.apps} apps · ${profile.stats.projects} projects · ${profile.stats.years} years`}</span>
        </div>
      </div>
    ),
    size,
  );
}
