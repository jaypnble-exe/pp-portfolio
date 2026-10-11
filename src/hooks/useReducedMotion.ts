"use client";

import { useReducedMotion as useMotionReducedMotion } from "motion/react";

/** True when the user prefers reduced motion (false during SSR). */
export function useReducedMotion(): boolean {
  return useMotionReducedMotion() ?? false;
}
