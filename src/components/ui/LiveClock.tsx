"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/data/profile";
import type { ClockFormat } from "@/lib/types";

const FORMATTERS: Record<ClockFormat, Intl.DateTimeFormat> = {
  time: new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: profile.timezone,
  }),
  date: new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: profile.timezone,
  }),
};

// Rendered on the server and during hydration, so markup always matches.
const PLACEHOLDER: Record<ClockFormat, string> = { time: "9:41", date: " " };

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 10_000);
  return () => clearInterval(id);
}

interface LiveClockProps {
  format?: ClockFormat;
  className?: string;
}

/** Current time/date in KSA, refreshed every 10s. */
export function LiveClock({ format = "time", className }: LiveClockProps) {
  const value = useSyncExternalStore(
    subscribe,
    () => FORMATTERS[format].format(Date.now()),
    () => PLACEHOLDER[format],
  );

  return <span className={className}>{value}</span>;
}
