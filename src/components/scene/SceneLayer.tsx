"use client";

import type { ReactNode } from "react";
import { motion, useTransform } from "motion/react";
import { useScene } from "@/lib/scenes";
import { cn } from "@/lib/utils";

const FADE = 0.03; // share of the scroll a layer takes to fade in or out

interface SceneLayerProps {
  /** Visible while the scene's progress is inside this range; 0 / 1 mean "from start" / "to end". */
  at: [start: number, end: number];
  className?: string;
  children: ReactNode;
}

/** Absolutely positioned overlay that rises in and out over a scene's clip. */
export function SceneLayer({ at: [start, end], className, children }: SceneLayerProps) {
  const { progress } = useScene();
  const range = [start - FADE, start, end, end + FADE];
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [28, 0, 0, -28]);
  const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? "auto" : "none"));

  return (
    <motion.div style={{ opacity, y, pointerEvents }} className={cn("absolute", className)}>
      {children}
    </motion.div>
  );
}
