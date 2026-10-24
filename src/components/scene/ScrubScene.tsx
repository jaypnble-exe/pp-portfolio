"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SceneContext } from "@/lib/scenes";
import type { SceneConfig } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SceneCanvas } from "./SceneCanvas";
import { SceneHandoff } from "./SceneHandoff";
import { SceneHud } from "./SceneHud";
import { SceneLayer } from "./SceneLayer";

const HIDE = 0.996; // raw progress where the stage hands over to the next section

/** Progress from which the next section (pulled up 100vh) slides in under the stage. */
const coverFrom = (vh: number) => 1 - 100 / (vh - 100);

interface ScrubSceneProps {
  scene: SceneConfig;
  frameCount: number;
  /** An AI-upscaled set exists in public/scenes/<name>/hd (served to desktops). */
  hd?: boolean;
  id?: string;
  /** First thing on the page: render frame 1 on the server and fade nothing in. */
  first?: boolean;
  /** Desktop only: start the clip this many vw right of center, easing to center as the scene begins. */
  offsetVw?: number;
  /** Shown instead when the visitor prefers reduced motion. */
  fallback?: ReactNode;
  children?: ReactNode;
}

/**
 * Pinned full-screen scene whose clip scrubs with scroll. With a `handoff`, the next section
 * is pulled up under its last screen of scroll, so the device mockup can land exactly on the
 * next section's device at the moment the stage gives way to it.
 */
export function ScrubScene(props: ScrubSceneProps) {
  const { scene, frameCount, hd, id, first, offsetVw = 0, fallback, children } = props;
  const { handoff } = scene;
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desk = useMediaQuery("(min-width: 1000px)");
  const [near, setNear] = useState(Boolean(first));

  // Load frames once the scene is within a screen and a half of the viewport.
  useEffect(() => {
    const el = section.current;
    if (!el || near) return;
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setNear(true), {
      rootMargin: "150% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  const { scrollYProgress: raw } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  // A light spring gives the scrub the weight of a smooth-scroll library without hijacking page scroll.
  const progress = useSpring(raw, { stiffness: 220, damping: 36, mass: 0.35 });

  const out = handoff ? [handoff.glide, handoff.glide + 0.08] : [0.96, 1];
  const clipOpacity = useTransform(
    progress,
    first ? out : [0, 0.05, ...out],
    first ? [1, 0] : [0, 1, 1, 0],
  );
  const deskX = useTransform(progress, [0, 0.07], [`${offsetVw}vw`, "0vw"]);
  const noX = useMotionValue("0vw");

  // Handoff: an opaque backdrop hides the next section sliding in underneath, then the whole
  // stage steps aside the moment that section pins in its place.
  const cover = coverFrom(scene.vh[desk ? 1 : 0]);
  const backdrop = useTransform(raw, (p) => (handoff ? clamp((p - cover + 0.02) / 0.02) : 0));
  const stageOpacity = useTransform(raw, (p) => (handoff && p >= HIDE ? 0 : 1));
  const stagePointer = useTransform(stageOpacity, (o) => (o ? "auto" : "none"));
  // Lets the next section hold back autoplay while it is still covered.
  useMotionValueEvent(raw, "change", (p) =>
    stage.current?.toggleAttribute(
      "data-scene-covering",
      Boolean(handoff) && p > cover && p < HIDE,
    ),
  );

  if (reduce) return fallback ?? null;

  return (
    <section
      id={id}
      ref={section}
      className={cn(
        "pointer-events-none relative h-(--scene-h) desk:h-(--scene-h-desk)",
        handoff && "z-10 -mb-[100dvh]",
      )}
      style={{ "--scene-h": `${scene.vh[0]}vh`, "--scene-h-desk": `${scene.vh[1]}vh` }}
    >
      <motion.div
        ref={stage}
        className="sticky top-0 h-dvh overflow-hidden"
        style={{ opacity: stageOpacity, pointerEvents: stagePointer }}
      >
        <SceneContext value={{ progress, raw, frameCount }}>
          <motion.div className="absolute inset-0 bg-bg" style={{ opacity: backdrop }} />
          <motion.div
            className="absolute inset-0"
            style={{ opacity: clipOpacity, x: desk ? deskX : noX }}
          >
            <SceneCanvas scene={scene} enabled={near} poster={first} hd={hd} />
          </motion.div>
          <SceneHud label={scene.hud} />
          {children}
          {scene.caption && (
            <SceneLayer
              at={scene.caption.at}
              className="inset-x-0 bottom-28 flex flex-col items-center gap-2 px-4 text-center"
            >
              <span className="label text-muted">{scene.caption.label}</span>
              <p className="text-[clamp(32px,4.4vw,56px)] leading-[.95] font-extrabold tracking-display">
                {scene.caption.text} <span aria-hidden="true">↓</span>
              </p>
            </SceneLayer>
          )}
          {handoff && <SceneHandoff scene={scene} handoff={handoff} />}
        </SceneContext>
      </motion.div>
    </section>
  );
}

const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
