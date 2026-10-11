import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-lg border border-line bg-white/6 px-2.5 py-1.5 font-mono text-[11px] text-[#c9ccd6]">
      {children}
    </span>
  );
}
