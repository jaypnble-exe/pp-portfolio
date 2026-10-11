import type { AccentProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AppFrame } from "./AppFrame";
import { TabBar } from "./TabBar";

// [radius, color, dashoffset] — Move / Exercise / Stand rings
const RINGS: [number, string, number][] = [
  [50, "255,55,95", 70],
  [38, "48,209,88", 40],
  [26, "10,132,255", 50],
];
const WEEK = [40, 65, 50, 90, 70, 30, 55];
const TODAY = 3;

export function FitnessScreen({ color, color2 }: AccentProps) {
  return (
    <AppFrame color={color} color2={color2} className="bg-black">
      <p className="text-[.8em] text-white/55">Today</p>
      <p className="text-[1.6em] font-extrabold tracking-[-0.03em]">Activity</p>
      <div className="grid place-items-center py-[.4em]">
        <svg viewBox="0 0 120 120" className="w-[62%]" aria-hidden="true">
          {RINGS.map(([r, rgb, offset]) => {
            const circumference = Math.round(2 * Math.PI * r);
            return (
              <g key={r} fill="none" strokeWidth={9} strokeLinecap="round">
                <circle cx="60" cy="60" r={r} stroke={`rgba(${rgb},.2)`} />
                <circle
                  cx="60"
                  cy="60"
                  r={r}
                  stroke={`rgb(${rgb})`}
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  transform="rotate(-90 60 60)"
                />
              </g>
            );
          })}
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-[.6em]">
        {[
          ["8,240", "Steps"],
          ["540", "kcal"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-[1em] bg-white/7 p-[.9em]">
            <b className="block text-[1.35em] tracking-[-0.02em]">{value}</b>
            <span className="text-[.72em] text-white/55">{label}</span>
          </div>
        ))}
      </div>
      <div className="rounded-[1em] bg-white/7 p-[.9em]">
        <p className="mb-[.5em] text-[.8em] text-white/55">This week</p>
        <div className="flex h-[3.6em] items-end gap-[.35em]">
          {WEEK.map((h, i) => (
            <span
              key={i}
              className={cn("flex-1 rounded-[.3em] bg-(--c)", i !== TODAY && "opacity-35")}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <TabBar />
    </AppFrame>
  );
}
