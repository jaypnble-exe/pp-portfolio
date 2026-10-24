// Turns a video into a scroll-scrubbed scene: public/scenes/<name>/0001.webp, 0002.webp…
// Usage: pnpm frames <video> <name> [fps=12] [width=1280]   (needs ffmpeg on PATH)
import { spawnSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync } from "node:fs";

const [video, name, fps = "12", width = "1280"] = process.argv.slice(2);
if (!video || !name) {
  console.error("Usage: pnpm frames <video> <name> [fps=12] [width=1280]");
  process.exit(1);
}

const out = `public/scenes/${name}`;
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const { status, error } = spawnSync(
  "ffmpeg",
  [
    ...["-loglevel", "error", "-i", video, "-an"],
    ...["-vf", `fps=${fps},scale=${width}:-2`],
    ...["-c:v", "libwebp", "-quality", "80", "-compression_level", "6"],
    `${out}/%04d.webp`,
  ],
  { stdio: "inherit" },
);

if (error) {
  console.error("ffmpeg not found. Install it (e.g. `scoop install ffmpeg`) and retry.");
  process.exit(1);
}
if (status !== 0) process.exit(status ?? 1);

console.log(`${readdirSync(out).length} frames → ${out}`);
