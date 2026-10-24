import type { HeroBeat } from "@/lib/types";
import { profile } from "./profile";

// Cards over the intro clip, timed to its first half: the turn, the glasses + HUD, the smile.
// Ranges must be in order and not overlap.
export const heroBeats: HeroBeat[] = [
  {
    label: "01 · Mobile",
    value: profile.stats.apps,
    unit: "apps shipped",
    tags: ["React Native", "iOS", "Android"],
    side: "left",
    at: [0.08, 0.17],
  },
  {
    label: "02 · Web",
    value: profile.stats.projects,
    unit: "projects delivered",
    tags: ["Next.js", "TypeScript"],
    side: "right",
    at: [0.21, 0.31],
  },
  {
    label: "03 · Track record",
    value: profile.stats.years,
    unit: "years building",
    tags: [`${profile.stats.rating} avg rating`],
    side: "left",
    at: [0.35, 0.45],
  },
];
