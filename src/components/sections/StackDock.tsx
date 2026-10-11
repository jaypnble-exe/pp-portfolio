"use client";

import { Fragment, useRef, type PointerEvent } from "react";
import { stack } from "@/data/stack";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Tag } from "@/components/ui/Tag";

const MAGNIFY_QUERY = "(hover: hover) and (min-width: 1001px)";

export function StackDock() {
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const reduce = useReducedMotion();

  function onMove(e: PointerEvent<HTMLUListElement>) {
    if (reduce || e.pointerType !== "mouse" || !matchMedia(MAGNIFY_QUERY).matches) return;
    for (const el of items.current) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      el.style.transform = `scale(${1 + Math.max(0, 1 - d / 150) * 0.55})`;
    }
  }

  function onLeave() {
    for (const el of items.current) if (el) el.style.transform = "";
  }

  let n = 0;
  return (
    <section id="stack" className="pt-[100px] xs:pt-[130px]">
      <div className="site-wrap">
        <SectionHead label="Tech stack" title="My dock." muted="Daily tools." />
        <Reveal className="grid place-items-center">
          <ul
            aria-label="Tools I use"
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            className="flex max-w-full flex-wrap items-end justify-center gap-2.5 rounded-[26px] border border-line-hi bg-white/5 p-3 backdrop-blur-[20px] desk:h-[92px] desk:flex-nowrap"
          >
            {stack.map((group, gi) => (
              <Fragment key={group.title}>
                {group.items.map((item) => {
                  const idx = n++;
                  return (
                    <li
                      key={item.name}
                      ref={(el) => {
                        items.current[idx] = el;
                      }}
                      className="group relative grid size-[50px] flex-none origin-bottom place-items-center rounded-[13px] border border-white/10 bg-[linear-gradient(160deg,color-mix(in_srgb,var(--c)_30%,#1c1f28),#12141a)] font-mono text-[13px] font-semibold text-(--c) transition-transform duration-150 ease-out xs:size-[62px] xs:rounded-2xl xs:text-[15px]"
                      style={{ "--c": item.color }}
                    >
                      <span aria-hidden="true">{item.short}</span>
                      <span className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 rounded-lg bg-[rgba(30,32,40,.95)] px-2.5 py-[5px] font-sans text-xs font-semibold whitespace-nowrap text-text opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        {item.name}
                      </span>
                    </li>
                  );
                })}
                {gi < stack.length - 1 && (
                  <li
                    aria-hidden="true"
                    className="hidden h-[54px] w-px flex-none self-center bg-line-hi desk:block"
                  />
                )}
              </Fragment>
            ))}
          </ul>
        </Reveal>
        <div className="mt-[46px] grid gap-3.5 xs:grid-cols-2 desk:grid-cols-4">
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
      </div>
    </section>
  );
}
