import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AppFrameProps {
  children: ReactNode;
  color?: string;
  color2?: string;
  className?: string;
  style?: CSSProperties;
}

/** Fills the phone screen. Content uses em units scaled from the phone width (--w). */
export function AppFrame({ children, color, color2, className, style }: AppFrameProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col gap-[.8em] px-[6.5%] pt-[15%] pb-[6%] text-[calc(var(--w,300px)*.042)] leading-[normal]",
        className,
      )}
      style={{ "--c": color, "--c2": color2, ...style }}
    >
      {children}
    </div>
  );
}
