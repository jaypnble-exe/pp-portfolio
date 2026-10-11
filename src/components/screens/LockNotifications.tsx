"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import type { LockNotification } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LockNotificationsProps {
  items: LockNotification[];
}

/** Notifications that stagger in (700ms apart) once the lock screen is in view. */
export function LockNotifications({ items }: LockNotificationsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className="mt-auto grid w-full gap-[.5em] pb-[8%] text-left">
      {items.map((n, i) => (
        <div
          key={n.app}
          className={cn(
            "flex items-start gap-[.6em] rounded-[1.2em] bg-white/14 p-[.8em] backdrop-blur-[16px] transition duration-600 ease-brand",
            inView ? "opacity-100" : "translate-y-5 scale-96 opacity-0",
          )}
          style={{ "--c": n.color, transitionDelay: `${400 + i * 700}ms` }}
        >
          <span className="grid size-[2.2em] flex-none place-items-center rounded-[.6em] bg-(--c)">
            {n.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <b className="flex justify-between text-[.8em]">
              {n.app}
              <small className="font-medium opacity-60">{n.time}</small>
            </b>
            <p className="mt-[.15em] text-[.75em] leading-[1.3] opacity-85">{n.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
