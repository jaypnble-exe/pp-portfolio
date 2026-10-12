import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { StatusBar } from "./StatusBar";

interface IPhoneProps {
  /** Any CSS length, e.g. "290px" or "min(46vw, 210px)". Everything scales from it. */
  width: string;
  /** Accessible name; the screen contents are decorative and hidden. */
  label: string;
  children: ReactNode;
  showTime?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** CSS-only iPhone. Children render inside the screen, under the status bar. */
export function IPhone({ width, label, children, showTime = true, className, style }: IPhoneProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn("iphone", className)}
      style={{ "--w": width, ...style }}
    >
      <div className="iphone-screen" aria-hidden="true">
        <div
          aria-hidden="true"
          className="absolute top-[2.2%] left-1/2 z-20 h-[3.6%] w-[32%] -translate-x-1/2 rounded-full bg-black"
        />
        <StatusBar showTime={showTime} />
        {children}
        <div
          aria-hidden="true"
          className="absolute bottom-[1.4%] left-1/2 z-20 h-1 w-[36%] -translate-x-1/2 rounded-full bg-white/70"
        />
      </div>
    </div>
  );
}
