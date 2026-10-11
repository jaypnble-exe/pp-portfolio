import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MacBookProps {
  /** Display domain shown in the browser bar. */
  url: string;
  children: ReactNode;
  className?: string;
}

/** CSS-only laptop: lid + 16:10 display with a browser bar, base with notch. */
export function MacBook({ url, children, className }: MacBookProps) {
  return (
    // Side padding absorbs the base, which overhangs the lid by 6% on each side.
    <div className={cn("relative px-[5.5%]", className)}>
      <div className="rounded-t-[18px] bg-linear-to-b from-[#2c2e35] to-[#1a1b20] px-3 pt-3 shadow-[0_0_0_1.5px_#3c3f48_inset,0_40px_90px_-30px_var(--glow)]">
        <div className="relative flex aspect-16/10 flex-col overflow-hidden rounded-t-lg bg-[#0b0c10] text-[clamp(7px,1vw,12px)]">
          <div
            aria-hidden="true"
            className="flex h-[2.6em] flex-none items-center gap-[.5em] border-b border-line bg-[#15171d] px-[1em]"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-[.8em] rounded-full bg-[#2d3039]" />
            ))}
            <span className="mx-auto grid h-[1.4em] w-[32%] place-items-center rounded-[.5em] bg-[#0f1015] text-[.85em] text-muted">
              {url}
            </span>
          </div>
          <div className="relative flex-1">{children}</div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="relative -mx-[6%] h-4 rounded-b-2xl bg-linear-to-b from-[#3a3d45] to-[#1c1d22] after:absolute after:top-0 after:left-1/2 after:h-1.5 after:w-[16%] after:-translate-x-1/2 after:rounded-b-lg after:bg-[#15161a]"
      />
    </div>
  );
}
