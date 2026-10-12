import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href: string;
  children: ReactNode;
  /** `accent` (brand gradient) is reserved for the single most important action: the CV. */
  variant?: "primary" | "secondary" | "accent";
  size?: "md" | "lg";
  /** Download the target instead of navigating; the value is the saved file name. */
  download?: string;
  className?: string;
}

const VARIANTS = {
  primary: "bg-text text-black",
  secondary: "border border-line-hi bg-white/6",
  accent:
    "bg-[image:var(--brand-gradient)] text-white shadow-[0_12px_32px_-10px_var(--violet)] hover:shadow-[0_16px_40px_-10px_var(--violet)]",
};

/** Link styled as a button (all CTAs on the page navigate or download). */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  download,
  className,
}: ButtonProps) {
  return (
    <a
      href={href}
      download={download}
      className={cn(
        "inline-flex items-center gap-2 font-bold transition duration-200 hover:-translate-y-0.5",
        size === "md"
          ? "h-[42px] rounded-[13px] px-5 text-sm"
          : "h-[52px] rounded-2xl px-[26px] text-[15px]",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}
