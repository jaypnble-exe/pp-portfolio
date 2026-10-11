import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  className?: string;
}

/** Link styled as a button (all CTAs on the page navigate). */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: ButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-2 font-bold transition duration-200 hover:-translate-y-0.5",
        size === "md"
          ? "h-[42px] rounded-[13px] px-5 text-sm"
          : "h-[52px] rounded-2xl px-[26px] text-[15px]",
        variant === "primary" ? "bg-text text-black" : "border border-line-hi bg-white/6",
        className,
      )}
    >
      {children}
    </a>
  );
}
