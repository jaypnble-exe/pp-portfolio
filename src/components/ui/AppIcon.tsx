import Image from "next/image";
import type { MobileApp } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AppIconProps {
  app: MobileApp;
  /** Size, radius and emoji font size come from here, e.g. "size-9 rounded-[10px] text-[17px]". */
  className: string;
  /** Largest rendered width in px, for the image `sizes` hint. */
  px: number;
  /** Gradient tile behind the emoji fallback; false gives a flat tile (inactive list rows). */
  gradient?: boolean;
}

/** Real app icon if `app.icon` is set, otherwise the emoji on an accent tile. */
export function AppIcon({ app, className, px, gradient = true }: AppIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative grid flex-none place-items-center overflow-hidden",
        !app.icon && (gradient ? "bg-linear-135 from-(--c) to-(--c2)" : "bg-white/5"),
        className,
      )}
    >
      {app.icon ? (
        <Image src={app.icon} alt="" fill sizes={`${px}px`} className="object-cover" />
      ) : (
        app.emoji
      )}
    </span>
  );
}
