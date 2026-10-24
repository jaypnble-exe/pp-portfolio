import { createContext, useContext } from "react";
import type { MotionValue } from "motion/react";

/** px; matches the `desk` breakpoint. */
export const DESK = 1000;

/** Frame `i` (0-based) of a scene written by `pnpm frames <video> <name>`. */
export const sceneFrameSrc = (name: string, i: number) =>
  `/scenes/${name}/${String(i + 1).padStart(4, "0")}.webp`;

export interface SceneState {
  progress: MotionValue<number>; // smoothed 0–1 through the pinned scroll, for the clip
  raw: MotionValue<number>; // exact 0–1, for anything that must line up with the page
  frameCount: number;
}

export const SceneContext = createContext<SceneState | null>(null);

export function useScene(): SceneState {
  const scene = useContext(SceneContext);
  if (!scene) throw new Error("useScene must be used inside <ScrubScene>");
  return scene;
}
