"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IPhone } from "@/components/device/IPhone";

const BASE = "rotateY(-16deg) rotateX(6deg)";

/** Hero stage: floating, cursor-tilting phone (hover devices only). */
export function HeroPhone({ children, chips }: { children: ReactNode; chips: ReactNode }) {
  const phone = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse" || !phone.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    phone.current.style.transform = `rotateY(${-16 + x * 24}deg) rotateX(${6 - y * 14}deg)`;
  }

  function onLeave() {
    if (phone.current) phone.current.style.transform = BASE;
  }

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative grid h-[560px] place-items-center [--hero-w:240px] perspective-[1400px] xs:[--hero-w:290px] desk:h-[640px]"
    >
      <div
        ref={phone}
        className="transition-transform duration-300 ease-out"
        style={{ transform: BASE, transformStyle: "preserve-3d" }}
      >
        <IPhone width="var(--hero-w)" className="animate-float">
          {children}
        </IPhone>
      </div>
      {chips}
    </div>
  );
}
