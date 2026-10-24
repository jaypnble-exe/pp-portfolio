"use client";

import { useCallback, useEffect, useEffectEvent, useRef } from "react";
import Image from "next/image";
import { useMotionValueEvent } from "motion/react";
import { useFrameSequence, type Frames } from "@/hooks/useFrameSequence";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DESK, sceneFrameSrc, useScene } from "@/lib/scenes";
import type { SceneConfig } from "@/lib/types";
import { drawScene } from "./drawScene";

/** Nearest frame to `i` that has finished loading. */
function nearest(list: Frames, i: number) {
  for (let d = 0; d < list.length; d++) {
    const img = list[i - d] ?? list[i + d];
    if (img) return img;
  }
}

interface SceneCanvasProps {
  scene: SceneConfig;
  enabled: boolean; // start loading frames
  poster?: boolean; // server-render frame 1 (above-the-fold scenes)
  hd?: boolean; // an HD set exists; used on desktop only, phones keep the lighter frames
}

/** Full-screen canvas that shows the frame matching the scene's scroll progress. */
export function SceneCanvas({ scene, enabled, poster, hd }: SceneCanvasProps) {
  const { progress, frameCount } = useScene();
  const canvas = useRef<HTMLCanvasElement>(null);
  const desk = useMediaQuery(`(min-width: ${DESK}px)`);
  const folder = hd && desk ? `${scene.name}/hd` : scene.name;

  const paint = useCallback(
    (list: Frames, p: number) => {
      const el = canvas.current;
      const ctx = el?.getContext("2d");
      const img = nearest(list, Math.round(Math.min(Math.max(p, 0), 1) * (frameCount - 1)));
      if (!el || !ctx || !img) return;
      drawScene(ctx, img, el.clientWidth < DESK ? scene.mobileKeep : null);
      el.parentElement?.setAttribute("data-painted", "");
    },
    [frameCount, scene.mobileKeep],
  );

  // Each newly decoded frame may be closer to the current scroll position than the one shown.
  const frames = useFrameSequence(folder, frameCount, enabled, (list) =>
    paint(list, progress.get()),
  );
  const draw = (p: number) => paint(frames.current, p);
  const redraw = useEffectEvent(() => draw(progress.get()));

  useMotionValueEvent(progress, "change", draw);

  // Keep the canvas backing store at device resolution (capped at 2x) and redraw on resize.
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      el.width = Math.round(el.clientWidth * dpr);
      el.height = Math.round(el.clientHeight * dpr);
      redraw();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="group absolute inset-0">
      {poster && (
        <Image
          src={sceneFrameSrc(scene.name, 0)}
          alt=""
          fill
          sizes="100vw"
          preload
          className="object-cover group-data-[painted]:invisible max-desk:hidden"
        />
      )}
      <canvas
        ref={canvas}
        role="img"
        aria-label={scene.alt}
        className="absolute inset-0 size-full"
      />
    </div>
  );
}
