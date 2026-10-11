import { cn } from "@/lib/utils";

const ICONS = {
  apple:
    "M16.4 12.6c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.4-.9-2.4-3.6zM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.3z",
  google:
    "M3.6 1.8 13.8 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1zm11.3 11.3 2.4 2.4-11 6.3 8.6-8.7zm3.6-3.6 2.8 1.6c.8.5.8 1.3 0 1.8l-2.8 1.6-2.6-2.5 2.6-2.5zM6.3 2.2l11 6.3-2.4 2.4-8.6-8.7z",
};

interface StoreBadgeProps {
  store: "apple" | "google";
  href: string;
  appName: string;
}

/** App Store badge is white; Google Play badge is dark glass. */
export function StoreBadge({ store, href, appName }: StoreBadgeProps) {
  const label = store === "apple" ? "App Store" : "Google Play";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${appName} on ${label}`}
      className={cn(
        "inline-flex h-[42px] items-center gap-2 rounded-xl px-3.5 text-xs font-bold transition hover:-translate-y-0.5",
        store === "apple" ? "bg-white text-black" : "border border-line-hi bg-white/8 text-white",
      )}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d={ICONS[store]} />
      </svg>
      {label}
    </a>
  );
}
