import type { WebScreenProps } from "@/lib/types";
import { cn } from "@/lib/utils";

const KPIS = [
  ["$48.2k", "▲ 12%"],
  ["3,921", "▲ 8%"],
  ["98.4%", "▲ 2%"],
];
const CHART = [40, 55, 48, 70, 62, 85, 74, 92, 80, 96, 88, 100];

export function WebDashboard({ color, color2 }: WebScreenProps) {
  return (
    <div className="grid h-full grid-cols-[9em_1fr]" style={{ "--c": color, "--c2": color2 }}>
      <div className="grid content-start gap-[.8em] border-r border-line bg-[#0f1116] p-[1.2em]">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={cn(
              "rounded-[3px]",
              i === 0 ? "h-[1.4em] w-[70%] bg-(--c)" : "h-[.8em] bg-[#22252e]",
            )}
          />
        ))}
      </div>
      <div className="grid grid-rows-[auto_1fr] gap-[1em] p-[1.2em]">
        <div className="grid grid-cols-3 gap-[.8em]">
          {KPIS.map(([value, delta]) => (
            <div key={value} className="rounded-[.8em] border border-line bg-[#13151b] p-[.9em]">
              <b className="block text-[1.5em] font-extrabold">{value}</b>
              <span className="text-[.8em] text-green">{delta}</span>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-[.6em] rounded-[.8em] border border-line bg-[#13151b] p-[1em]">
          {CHART.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-[.3em] bg-linear-to-b from-(--c) to-[color-mix(in_srgb,var(--c)_20%,transparent)]"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
