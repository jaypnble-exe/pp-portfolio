"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { apps } from "@/data/apps";
import { useGlow } from "@/hooks/useGlow";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { IPhone } from "@/components/device/IPhone";
import { MobileAppScreen } from "@/components/screens/MobileAppScreen";
import { AppInfo } from "./AppInfo";
import { AppList } from "./AppList";

const COUNT = apps.length;
const toFrame = (p: number) => Math.min(Math.max(p, 0), 0.9999) * COUNT;

/** Signature section: a sticky phone whose screen changes as you scroll. */
export function AppShowcase() {
  const wrapper = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);

  const { scrollYProgress } = useScroll({ target: wrapper, offset: ["start start", "end end"] });
  const local = useTransform(scrollYProgress, (p) => toFrame(p) % 1);
  const rotateY = useTransform(local, (l) => (reduce ? 0 : (0.5 - l) * 22));
  const rotateX = useTransform(local, (l) => (reduce ? 0 : 4 - l * 4));

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.floor(toFrame(p)));
    setStarted(p > 0);
  });

  useGlow(started ? apps[active].color : null);

  function scrollToApp(i: number) {
    const el = wrapper.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.offsetTop + ((i + 0.3) / COUNT) * total;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <section
      id="apps"
      ref={wrapper}
      className="relative"
      style={{ height: `${COUNT * 90 + 40}vh` }}
    >
      <div className="sticky top-0 site-wrap grid h-screen content-center gap-3.5 pt-[70px] [--sc-w:min(46vw,210px)] desk:grid-cols-[1fr_auto_1fr] desk:items-center desk:gap-[50px] desk:pt-[180px] desk:pb-5 desk:[--sc-w:clamp(220px,min(22vw,(100vh-220px)/2.17),300px)]">
        <div className="text-center desk:absolute desk:inset-x-0 desk:top-24">
          <span className="label text-muted">Mobile apps · scroll</span>
          <h2 className="text-2xl font-extrabold tracking-[-0.04em] desk:text-[clamp(28px,3.4vw,42px)]">
            Built with React Native
          </h2>
        </div>

        <AppInfo apps={apps} active={active} />

        {/* data-handoff: the intro scene's phone mockup lands exactly on this box */}
        <div data-handoff="apps" className="justify-self-center max-desk:order-2">
          <motion.div
            style={{ rotateY, rotateX, transformPerspective: 1600, transformStyle: "preserve-3d" }}
          >
            <IPhone width="var(--sc-w)" label={`${apps[active].name} app on an iPhone`}>
              {apps.map((app, i) => (
                <div
                  key={app.slug}
                  aria-hidden={i !== active}
                  className={cn(
                    "absolute inset-0",
                    // Screenshots with their own status bar cover the mockup's (z-15) but stay under its island (z-20).
                    app.screenshot && app.screenshotHasStatusBar && "z-16",
                    !reduce && "transition-transform duration-700 ease-brand",
                  )}
                  style={{ transform: `translateX(${(i - active) * 105}%)` }}
                >
                  <MobileAppScreen app={app} preload={i === 0} />
                </div>
              ))}
            </IPhone>
          </motion.div>
        </div>

        <AppList apps={apps} active={active} progress={scrollYProgress} onSelect={scrollToApp} />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-5 flex justify-center gap-1.5 desk:hidden"
        >
          {apps.map((app, i) => (
            <span
              key={app.slug}
              className={cn(
                "h-1.5 rounded-md transition-all duration-300",
                i === active ? "w-[22px] bg-text" : "w-1.5 bg-white/25",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
