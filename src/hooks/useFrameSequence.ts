"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import { sceneFrameSrc } from "@/lib/scenes";

const LANES = 6;

/** Decoded frames by index; gaps are frames still loading. */
export type Frames = (HTMLImageElement | undefined)[];

/** Frame 0, then every 16th, 8th, 4th… frame: an even spread first, gaps filled in later. */
function loadOrder(count: number) {
  const order = new Set<number>();
  for (let step = 16; step >= 1; step /= 2) {
    for (let i = 0; i < count; i += step) order.add(i);
  }
  return [...order];
}

/**
 * Preloads a scene's frames coarse-to-fine, so scrubbing works before every frame arrives.
 * `folder` is the scene name, or "<name>/hd" for its desktop-resolution set.
 */
export function useFrameSequence(
  folder: string,
  count: number,
  enabled: boolean,
  onFrame: (frames: Frames) => void,
) {
  const frames = useRef<Frames>([]);
  const handleFrame = useEffectEvent(onFrame);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const list: Frames = new Array(count);
    frames.current = list;
    const order = loadOrder(count);
    let next = 0;

    // A few parallel lanes keep the connection busy without flooding it.
    const lane = async () => {
      while (!cancelled && next < order.length) {
        const i = order[next++];
        const img = new Image();
        img.src = sceneFrameSrc(folder, i);
        try {
          await img.decode();
        } catch {
          continue;
        }
        if (cancelled) return;
        list[i] = img;
        handleFrame(list);
      }
    };
    for (let k = 0; k < LANES; k++) void lane();

    return () => {
      cancelled = true;
    };
  }, [folder, count, enabled]);

  return frames;
}
