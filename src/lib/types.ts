import type { StackIconKey } from "./stackIcons";

export type AppScreen = "fitness" | "ride" | "food" | "chat";
export type WebScreen = "shop" | "dash" | "book";

export interface MobileApp {
  slug: string;
  name: string;
  emoji: string; // fallback icon glyph when there is no `icon` image
  icon?: string; // /screens/apps/icons/xxx.jpg (square app icon)
  category: string; // "Business"
  description?: string; // what you built / your role, shown under the name
  highlight?: string; // short proof point shown as a pill, e.g. "Published to App Store & Google Play"
  color: string; // primary accent
  color2: string; // secondary accent
  screen?: AppScreen; // placeholder UI when there is no screenshot
  screenshot?: string; // /screens/apps/xxx.jpg, cropped to the phone screen (≈ 0.4435 w/h)
  screenshotHasStatusBar?: boolean; // screenshot shows its own status bar → hide the mockup's
  rating?: string; // "4.8★" (omit until the app has enough ratings)
  downloads?: string; // "10k+"
  platforms: string; // "iOS · Android"
  tech: string[];
  appStore?: string;
  playStore?: string;
  website?: string;
}

export interface WebProject {
  slug: string;
  name: string;
  url: string; // display domain
  description?: string; // what you built / your role
  color: string;
  color2: string;
  screen?: WebScreen; // placeholder UI when there is no screenshot
  screenshot?: string; // /screens/web/xxx.jpg (16:10, e.g. 1440×900)
  tech: string[];
  kpis?: [value: string, label: string][];
  live?: string;
  repo?: string;
}

export interface StackItem {
  name: string;
  short: string; // text fallback when there is no logo
  color: string;
  icon?: StackIconKey; // brand logo, see lib/stackIcons.ts
}

export interface StackGroup {
  title: string;
  color: string;
  items: StackItem[];
}

/** Accent colors passed to placeholder screens (exposed as --c / --c2). */
export interface AccentProps {
  color: string;
  color2: string;
}

export interface WebScreenProps extends AccentProps {
  name: string;
}

export type ClockFormat = "time" | "date";

export interface LockNotification {
  app: string;
  emoji: string;
  color: string;
  time: string;
  text: string;
}

export interface ContactLink {
  label: string;
  hint: string;
  href: string;
  emoji: string;
  color: string;
  external?: boolean;
}

export interface Service {
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  /** Bento size: "hero" = 2×2 feature tile, "wide" = 2×1; default is a 1×1 tile. */
  size?: "hero" | "wide";
  /** Detail tags, shown on hero/wide tiles only. */
  points?: string[];
}
