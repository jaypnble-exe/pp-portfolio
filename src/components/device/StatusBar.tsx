import { LiveClock } from "@/components/ui/LiveClock";

interface StatusBarProps {
  showTime?: boolean;
}

export function StatusBar({ showTime = true }: StatusBarProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 z-15 flex h-[7%] items-center justify-between px-[9%] text-[calc(var(--w,300px)*.045)] leading-none font-bold"
    >
      <span>{showTime && <LiveClock format="time" />}</span>
      <span className="flex items-center gap-1">
        <span className="text-[.7em] tracking-tight">●●●</span>
        <span className="iphone-battery" />
      </span>
    </div>
  );
}
