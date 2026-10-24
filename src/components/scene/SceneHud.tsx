"use client";

import { motion, useTransform } from "motion/react";
import { useScene } from "@/lib/scenes";

/** Decorative HUD over a scene: a progress line and a frame counter. */
export function SceneHud({ label }: { label: string }) {
  const { progress, frameCount } = useScene();
  const seq = useTransform(progress, (p) => {
    const n = Math.round(Math.min(Math.max(p, 0), 1) * (frameCount - 1)) + 1;
    return `SEQ ${String(n).padStart(3, "0")} / ${frameCount}`;
  });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-x-4 bottom-5 desk:inset-x-10 desk:bottom-7">
        <div className="h-px bg-white/10">
          <motion.div
            className="h-full origin-left bg-[image:var(--brand-gradient)]"
            style={{ scaleX: progress }}
          />
        </div>
        <div className="mt-3 flex justify-between label text-muted">
          <motion.span>{seq}</motion.span>
          <span className="max-desk:hidden">{label}</span>
          <span>Scroll ↓</span>
        </div>
      </div>
    </div>
  );
}
