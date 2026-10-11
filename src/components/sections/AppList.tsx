"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import type { MobileApp } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AppListProps {
  apps: MobileApp[];
  active: number;
  progress: MotionValue<number>;
  onSelect: (index: number) => void;
}

/** Desktop list of apps; the bar under each row fills as you scroll its segment. */
export function AppList({ apps, active, progress, onSelect }: AppListProps) {
  return (
    <ul className="hidden w-full max-w-[280px] flex-col gap-1.5 justify-self-end desk:flex">
      {apps.map((app, i) => (
        <li key={app.slug}>
          <button
            type="button"
            onClick={() => onSelect(i)}
            aria-current={i === active}
            className={cn(
              "relative grid w-full grid-cols-[auto_1fr] items-center gap-3 overflow-hidden rounded-2xl px-4 py-3.5 text-left transition-colors duration-300",
              i === active ? "bg-white/6 text-text" : "text-muted hover:text-text",
            )}
            style={{ "--c": app.color, "--c2": app.color2 }}
          >
            <span
              className={cn(
                "grid size-9 place-items-center rounded-[10px] text-[17px]",
                i === active ? "bg-linear-135 from-(--c) to-(--c2)" : "bg-white/5",
              )}
            >
              {app.emoji}
            </span>
            <span>
              <b className="block text-[15px]">{app.name}</b>
              <small className="text-xs">{app.category}</small>
            </span>
            <RowProgress progress={progress} index={i} count={apps.length} />
          </button>
        </li>
      ))}
    </ul>
  );
}

interface RowProgressProps {
  progress: MotionValue<number>;
  index: number;
  count: number;
}

function RowProgress({ progress, index, count }: RowProgressProps) {
  // 0 before this row's segment, 0→1 inside it, 1 after it.
  const fill = useTransform(progress, (p) =>
    Math.min(1, Math.max(0, Math.min(p, 0.9999) * count - index)),
  );
  return (
    <motion.span
      aria-hidden="true"
      className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-(--c)"
      style={{ scaleX: fill }}
    />
  );
}
