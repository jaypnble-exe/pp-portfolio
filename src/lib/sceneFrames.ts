import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

/** Frames in public/scenes/<name>. Counted per render so `pnpm dev` notices new ones. */
export function countSceneFrames(name: string): number {
  const dir = path.join(process.cwd(), "public", "scenes", name);
  if (!existsSync(dir)) return 0;
  return readdirSync(dir).filter((f) => /^\d{4}\.webp$/.test(f)).length;
}

/** Whether public/scenes/<name>/hd holds the same frames at desktop resolution (AI-upscaled). */
export function hasHdFrames(name: string, count: number): boolean {
  return countSceneFrames(`${name}/hd`) === count;
}
