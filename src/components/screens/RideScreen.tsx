import type { AccentProps } from "@/lib/types";
import { AppFrame } from "./AppFrame";

// Street grid: vertical roads every 34%, horizontal every 22%.
const MAP_BG = [
  "linear-gradient(90deg, transparent 47%, #232838 47%, #232838 53%, transparent 53%) 0 0 / 34% 100%",
  "linear-gradient(0deg, transparent 47%, #232838 47%, #232838 53%, transparent 53%) 0 0 / 100% 22%",
  "#161a24",
].join(", ");

export function RideScreen({ color, color2 }: AccentProps) {
  return (
    <AppFrame color={color} color2={color2} className="bg-[#11141c] p-0">
      <div className="absolute inset-0" style={{ background: MAP_BG }} aria-hidden="true">
        <svg
          viewBox="0 0 100 200"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
        >
          <path
            d="M20 40 L20 90 L66 90 L66 140"
            className="animate-dash fill-none stroke-(--c)"
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray="10 8"
          />
          <circle cx="20" cy="40" r="4" fill="#fff" />
          <circle cx="66" cy="140" r="5" className="fill-(--c)" />
        </svg>
      </div>
      <div className="absolute inset-x-[4%] bottom-[3.5%] z-2 grid gap-[.7em] rounded-[1.6em] bg-[#1c2030] p-[1em]">
        <span className="h-[.3em] w-[2.6em] justify-self-center rounded-full bg-white/20" />
        <div className="flex items-center gap-[.7em]">
          <span className="size-[2.6em] rounded-full bg-linear-135 from-(--c) to-(--c2)" />
          <div>
            <b className="text-[.95em]">Ahmed · Camry</b>
            <span className="block text-[.72em] text-white/55">3 min away · 4.9★</span>
          </div>
          <span className="ml-auto font-extrabold">SAR 24</span>
        </div>
        <div className="rounded-[1em] bg-(--c) p-[.85em] text-center text-[.9em] font-extrabold text-black">
          Confirm ride
        </div>
      </div>
    </AppFrame>
  );
}
