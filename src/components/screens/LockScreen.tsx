import { LiveClock } from "@/components/ui/LiveClock";
import { profile } from "@/data/profile";
import type { LockNotification } from "@/lib/types";
import { AppFrame } from "./AppFrame";
import { LockNotifications } from "./LockNotifications";

const firstName = profile.name.split(" ")[0];

const NOTIFICATIONS: LockNotification[] = [
  {
    app: "Mail",
    emoji: "✉️",
    color: "#5b8cff",
    time: "now",
    text: "New project request — “Can you build our app?”",
  },
  {
    app: "WhatsApp",
    emoji: "💬",
    color: "#30d158",
    time: "1m",
    text: `${firstName}: Sure! Let's schedule a quick call 🚀`,
  },
  {
    app: "App Store",
    emoji: "🏪",
    color: "#ff9f0a",
    time: "2m",
    text: "Your app is now live on the App Store.",
  },
];

/** Lock screen with live KSA date/time. Pair with <IPhone showTime={false}>. */
export function LockScreen() {
  return (
    <AppFrame className="items-center gap-[.2em] bg-[radial-gradient(120%_70%_at_50%_0%,#4a3aa8,#171233_50%,#07060d)] pt-[17%]">
      <LiveClock format="date" className="text-[.9em] font-semibold opacity-80" />
      <LiveClock format="time" className="text-[4.4em] leading-none font-bold tracking-[-0.04em]" />
      <LockNotifications items={NOTIFICATIONS} />
    </AppFrame>
  );
}
