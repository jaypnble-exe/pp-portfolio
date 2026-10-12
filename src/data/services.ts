import type { Service } from "@/lib/types";

// Bento order matters: on desktop (4 columns) this fills a 4×3 grid exactly —
// hero (2×2) + four 1×1 tiles, then two 1×1 tiles + one wide (2×1).
export const services: Service[] = [
  {
    title: "AI-assisted development",
    subtitle: "I ship faster with AI in the loop, from exploring a codebase to features and fixes.",
    emoji: "🤖",
    color: "#b56bff",
    size: "hero",
    points: ["Claude Code", "Codex", "Automation workflows", "Debugging", "Refactors"],
  },
  {
    title: "Mobile apps",
    subtitle: "React Native · Expo · App flow",
    emoji: "📱",
    color: "#5b8cff",
  },
  { title: "Web apps", subtitle: "Next.js · SaaS · Dashboards", emoji: "🖥️", color: "#00b4d8" },
  {
    title: "APIs & integrations",
    subtitle: "REST · Auth · Third-party",
    emoji: "🔌",
    color: "#30d158",
  },
  { title: "Payments", subtitle: "Gateways · Subscriptions", emoji: "💳", color: "#ffd60a" },
  { title: "Notifications", subtitle: "Push · In-app · Email", emoji: "🔔", color: "#ff6b9d" },
  { title: "Media handling", subtitle: "Upload · Storage · Images", emoji: "🖼️", color: "#ff9f0a" },
  {
    title: "Store releases",
    subtitle: "Production builds, published end to end.",
    emoji: "🚀",
    color: "#ff453a",
    size: "wide",
    points: ["App Store", "Google Play"],
  },
];
