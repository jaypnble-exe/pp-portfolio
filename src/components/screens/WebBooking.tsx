import type { WebScreenProps } from "@/lib/types";
import { cn } from "@/lib/utils";

const SELECTED_DAY = 17;
const BOOKED_DAYS = [4, 9, 12, 22, 26];
const SELECTED_SLOT = 1;

export function WebBooking({ color, color2 }: WebScreenProps) {
  return (
    <div
      className="grid h-full grid-cols-[1fr_1.4fr] gap-[1em] p-[1.4em]"
      style={{ "--c": color, "--c2": color2 }}
    >
      <div className="grid grid-cols-7 content-start gap-[.35em] rounded-[1em] border border-line bg-[#13151b] p-[1em]">
        {Array.from({ length: 35 }, (_, i) => (
          <span
            key={i}
            className={cn(
              "aspect-square rounded-[.4em]",
              i === SELECTED_DAY
                ? "bg-(--c)"
                : BOOKED_DAYS.includes(i)
                  ? "bg-[color-mix(in_srgb,var(--c)_30%,#1b1e26)]"
                  : "bg-[#1b1e26]",
            )}
          />
        ))}
      </div>
      <div className="grid content-start gap-[.6em]">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "flex h-[3em] items-center gap-[.8em] rounded-[.7em] border bg-[#13151b] px-[1em]",
              i === SELECTED_SLOT ? "border-(--c)" : "border-line",
            )}
          >
            <span
              className={cn(
                "size-[2em] rounded-full",
                i === SELECTED_SLOT ? "bg-(--c)" : "bg-[#262a34]",
              )}
            />
            <span className="h-[.7em] w-2/5 rounded-[3px] bg-[#2a2d36]" />
          </div>
        ))}
      </div>
    </div>
  );
}
