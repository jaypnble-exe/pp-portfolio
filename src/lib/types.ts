export type AppScreen = "fitness" | "ride" | "food" | "chat";
export type WebScreen = "shop" | "dash" | "book";

export interface MobileApp {
  slug: string;
  name: string;
  emoji: string; // app icon glyph
  category: string; // "Health & Fitness"
  color: string; // primary accent
  color2: string; // secondary accent
  screen: AppScreen; // placeholder UI if no screenshot
  screenshot?: string; // /screens/apps/xxx.png overrides placeholder
  rating: string; // "4.8★"
  downloads: string; // "10k+"
  platforms: string; // "iOS · Android"
  tech: string[];
  appStore?: string;
  playStore?: string;
}

export interface WebProject {
  slug: string;
  name: string;
  url: string; // display domain
  color: string;
  color2: string;
  screen: WebScreen;
  screenshot?: string; // /screens/web/xxx.png
  tech: string[];
  kpis: [value: string, label: string][];
  live?: string;
  repo?: string;
}

export interface StackItem {
  name: string;
  short: string;
  color: string;
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

export interface HeroChip {
  short: string;
  title: string;
  subtitle: string;
  color: string;
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
}
