"use client";

import { useEffect } from "react";

export const DEFAULT_GLOW = "#c9566f";

/** Tints the ambient light by setting --glow on <html>. `null` restores the default. */
export function useGlow(color: string | null) {
  useEffect(() => {
    document.documentElement.style.setProperty("--glow", color ?? DEFAULT_GLOW);
  }, [color]);

  useEffect(() => () => document.documentElement.style.setProperty("--glow", DEFAULT_GLOW), []);
}
