"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { webProjects } from "@/data/web";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { MacBook } from "@/components/device/MacBook";
import { WebProjectScreen } from "@/components/screens/WebProjectScreen";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { WebTab } from "./WebTab";

const ROTATE_MS = 4500;
const TICK_MS = 250;

export function WebShowcase() {
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section, { amount: 0.3 });
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false); // user clicked a tab → stop auto-rotating
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduce = useReducedMotion();

  // WCAG 2.2.2: pause while the user is pointing at or tabbing through it.
  const rotating = inView && !pinned && !hovered && !focused && !reduce;

  useEffect(() => {
    if (!rotating) return;
    // Count only time the section is actually uncovered. While the laptop scene still covers
    // it, hold the first project so the scene's MacBook mockup lands on the same screen.
    let shown = 0;
    const id = setInterval(() => {
      if (document.querySelector("[data-scene-covering]")) {
        shown = 0;
        setActive(0);
        return;
      }
      shown += TICK_MS;
      if (shown < ROTATE_MS) return;
      shown = 0;
      setActive((i) => (i + 1) % webProjects.length);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [rotating]);

  return (
    <section id="web" ref={section} className="pt-[100px] xs:pt-[130px]">
      <div className="site-wrap">
        <SectionHead label="Web · Next.js" title="On the big screen" muted="too." />
        <div
          className="grid items-center gap-[50px] desk:grid-cols-[1fr_1.6fr]"
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
          }}
        >
          <Reveal className="flex flex-col gap-2.5">
            {webProjects.map((project, i) => (
              <WebTab
                key={project.slug}
                project={project}
                active={i === active}
                onSelect={() => {
                  setActive(i);
                  setPinned(true);
                }}
              />
            ))}
          </Reveal>
          <Reveal index={1}>
            {/* data-handoff: the laptop scene's MacBook mockup lands exactly on this box */}
            <div data-handoff="web">
              <MacBook
                url={webProjects[active].url}
                label={`${webProjects[active].name} website on a MacBook`}
              >
                {webProjects.map((project, i) => (
                  <div
                    key={project.slug}
                    aria-hidden={i !== active}
                    className={cn(
                      "absolute inset-0 transition duration-600 ease-brand",
                      i === active ? "opacity-100" : "scale-[1.03] opacity-0",
                    )}
                  >
                    <WebProjectScreen project={project} />
                  </div>
                ))}
              </MacBook>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
