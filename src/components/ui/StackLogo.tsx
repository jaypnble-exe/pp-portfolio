import type { StackItem } from "@/lib/types";
import { STACK_ICONS } from "@/lib/stackIcons";

/** Brand logo tinted with the item's color, or its short code when no logo exists. */
export function StackLogo({ item }: { item: StackItem }) {
  const icon = item.icon && STACK_ICONS[item.icon];
  if (!icon) return <span aria-hidden="true">{item.short}</span>;

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6 xs:size-7">
      <path d={icon.path} />
    </svg>
  );
}
