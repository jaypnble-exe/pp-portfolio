import { stack } from "@/data/stack";
import type { StackItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { StackLogo } from "@/components/ui/StackLogo";
import { Tag } from "@/components/ui/Tag";

// Two rows scrolling in opposite directions: Frontend + Mobile, then Backend + DevOps.
const ROWS: StackItem[][] = [
  stack.slice(0, 2).flatMap((g) => g.items),
  stack.slice(2).flatMap((g) => g.items),
];

// Soft fade at both edges so pills slide in and out instead of being cut off.
const EDGE_FADE =
  "[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]";

/** Tech stack: CSS-only marquee rows (pause on hover) + category cards. */
export function StackDock() {
  return (
    <section id="stack" className="pt-[100px] xs:pt-[130px]">
      <div className="site-wrap">
        <SectionHead label="Tech stack" title="My stack." muted="Daily tools." />
      </div>

      {/* Decorative: the category cards below list every tool for screen readers. */}
      <Reveal className={cn("grid gap-3.5 overflow-hidden", EDGE_FADE)}>
        {ROWS.map((items, i) => (
          <MarqueeRow key={i} items={items} reverse={i % 2 === 1} />
        ))}
      </Reveal>

      <div className="site-wrap mt-[46px] grid gap-3.5 xs:grid-cols-2 desk:grid-cols-4">
        {stack.map((group, i) => (
          <Reveal
            key={group.title}
            index={i}
            className="rounded-3xl border border-line bg-panel p-[22px]"
          >
            <h3
              className="mb-3.5 flex items-center gap-2.5 text-lg font-extrabold"
              style={{ "--c": group.color }}
            >
              <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-(--c)" />
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Tag key={item.name}>{item.name}</Tag>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function MarqueeRow({ items, reverse }: { items: StackItem[]; reverse: boolean }) {
  // Repeat so one half is always wider than the screen, then render that half twice.
  const half = [...items, ...items];

  return (
    <div aria-hidden="true" className="flex">
      <ul
        className={cn(
          "flex w-max animate-marquee gap-3.5 pr-3.5 hover:[animation-play-state:paused] motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {[...half, ...half].map((item, i) => (
          <li
            key={i}
            className="flex flex-none items-center gap-3 rounded-2xl border border-line-hi bg-white/4 py-2.5 pr-5 pl-2.5 backdrop-blur-[20px]"
            style={{ "--c": item.color }}
          >
            <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-[linear-gradient(160deg,color-mix(in_srgb,var(--c)_30%,#1c1f28),#12141a)] font-mono text-sm font-semibold text-(--c)">
              <StackLogo item={item} />
            </span>
            <span className="text-[15px] font-bold whitespace-nowrap">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
