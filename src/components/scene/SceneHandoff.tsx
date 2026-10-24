"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";
import { apps } from "@/data/apps";
import { webProjects } from "@/data/web";
import { DESK, useScene } from "@/lib/scenes";
import type { SceneConfig, SceneHandoff as Handoff } from "@/lib/types";
import { cn } from "@/lib/utils";
import { IPhone } from "@/components/device/IPhone";
import { MacBook } from "@/components/device/MacBook";
import { MobileAppScreen } from "@/components/screens/MobileAppScreen";
import { WebProjectScreen } from "@/components/screens/WebProjectScreen";
import { frameBox } from "./drawScene";

const LAND = 0.98; // scene progress where the mockup reaches its target
const FADE_AWAY = 0.9; // scene progress where a mockup with no visible target starts fading
const IPHONE_SCREEN = 0.93; // screen width / device width (3.5% bezel each side)
const IPHONE_ASPECT = 19.5 / 9;
const MAC_SIDE = 0.055; // MacBook side padding, share of its width
const MAC_LID = 12; // px of lid around the MacBook display

type Rect = { x: number; y: number; w: number; h: number };

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

/** Filmed screen rect (% of frame) at progress `p`, held at the first / last key outside them. */
function filmedRect(keys: Handoff["keys"], p: number) {
  if (p <= keys[0][0]) return keys[0].slice(1);
  for (let i = 1; i < keys.length; i++) {
    const [t1, ...b] = keys[i];
    if (p > t1) continue;
    const [t0, ...a] = keys[i - 1];
    return a.map((v, j) => v + (b[j] - v) * ((p - t0) / (t1 - t0)));
  }
  return keys[keys.length - 1].slice(1);
}

/** Mockup position and width that put its display over the filmed screen `s`. */
function overFilmed(device: Handoff["device"], s: Rect) {
  if (device === "iphone") {
    const w = s.w / IPHONE_SCREEN;
    return { x: s.x - (w - s.w) / 2, y: s.y + s.h / 2 - (w * IPHONE_ASPECT) / 2, w };
  }
  const w = (s.w + 2 * MAC_LID) / (1 - 2 * MAC_SIDE);
  return { x: s.x - w * MAC_SIDE - MAC_LID, y: s.y - MAC_LID, w };
}

/** Where the target device sits once its section has scrolled to the top of the viewport. */
function targetRect(target: string) {
  const el = document.querySelector(`[data-handoff="${target}"]`);
  const section = el?.closest("section");
  if (!el || !section) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.top - section.getBoundingClientRect().top, w: r.width, h: r.height };
}

/** The site's device mockup: takes over from the filmed device, then glides onto the next section's. */
export function SceneHandoff({ scene, handoff }: { scene: SceneConfig; handoff: Handoff }) {
  const { raw } = useScene();
  const box = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const w = useMotionValue(0);
  const width = useTransform(w, (v) => `${v}px`);
  const opacity = useMotionValue(0);
  const glide = useTransform(raw, (p) =>
    easeInOut(clamp01((p - handoff.glide) / (LAND - handoff.glide))),
  );
  const rotateY = useTransform(glide, [0, 1], [0, handoff.rotate[0]]);
  const rotateX = useTransform(glide, [0, 1], [0, handoff.rotate[1]]);

  const place = (p: number) => {
    const stage = box.current?.parentElement;
    if (!stage) return;
    const f = frameBox(
      stage.clientWidth,
      stage.clientHeight,
      scene.aspect,
      stage.clientWidth < DESK ? scene.mobileKeep : null,
    );
    const [kx, ky, kw, kh] = filmedRect(handoff.keys, p);
    const from = overFilmed(handoff.device, {
      x: f.x + (kx / 100) * f.w,
      y: f.y + (ky / 100) * f.h,
      w: (kw / 100) * f.w,
      h: (kh / 100) * f.h,
    });
    // A target below the fold (stacked phone layouts) can't be landed on: center the
    // mockup instead and fade it out before the stage gives way.
    const target = targetRect(handoff.target);
    const away = !target || target.y + target.h > stage.clientHeight;
    const to = away ? { x: (stage.clientWidth - from.w) / 2, y: from.y, w: from.w } : target;
    const g = glide.get();
    x.set(from.x + (to.x - from.x) * g);
    y.set(from.y + (to.y - from.y) * g);
    w.set(from.w + (to.w - from.w) * g);
    const shown = clamp01((p - handoff.appear) / 0.03);
    opacity.set(away ? shown * (1 - clamp01((p - FADE_AWAY) / (LAND - FADE_AWAY))) : shown);
  };

  useMotionValueEvent(raw, "change", place);
  const replace = useEffectEvent(() => place(raw.get()));
  useEffect(() => {
    replace();
    window.addEventListener("resize", replace);
    return () => window.removeEventListener("resize", replace);
  }, []);

  return (
    <motion.div
      ref={box}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0"
      style={{ x, y, width, opacity, rotateY, rotateX, transformPerspective: 1600, "--hw": width }}
    >
      {handoff.device === "iphone" ? (
        <IPhone width="var(--hw)" label="" style={{ transformStyle: "preserve-3d" }}>
          <div className={cn("absolute inset-0", apps[0].screenshotHasStatusBar && "z-16")}>
            <MobileAppScreen app={apps[0]} />
          </div>
        </IPhone>
      ) : (
        <MacBook url={webProjects[0].url} label="">
          <WebProjectScreen project={webProjects[0]} />
        </MacBook>
      )}
    </motion.div>
  );
}
