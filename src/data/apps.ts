import type { MobileApp } from "@/lib/types";

// MAND/VCARD uses a raw device screenshot; OPIC's is cropped from its App Store listing,
// with the listing's drawn notch painted out so the mockup's island takes its place
// (swap in a raw device screenshot when available).
export const apps: MobileApp[] = [
  {
    slug: "mand-vcard",
    name: "MAND/VCARD",
    emoji: "📇",
    icon: "/screens/apps/icons/mand-vcard.jpg",
    category: "Business · Digital card",
    description:
      "Built the Next.js website and connected it with the application's backend, authentication, database, APIs, profiles, subscriptions, and other product functionality.",
    color: "#e0303a",
    color2: "#8f141b",
    screenshot: "/screens/apps/mand-vcard-home.jpg",
    screenshotHasStatusBar: true,
    highlight: "Built & published to App Store and Google Play",
    platforms: "iOS · Android · Web",
    tech: ["React Native", "Expo", "Next.js", "Supabase", "Alibaba Cloud", "Ubuntu"],
    appStore: "https://apps.apple.com/us/app/mand-vcard-digital-e-profile/id6755426020",
    playStore: "https://play.google.com/store/apps/details?id=com.mand.vcard",
    website: "https://mandvcard.com",
  },
  {
    slug: "opic",
    name: "OPIC",
    emoji: "🌙",
    icon: "/screens/apps/icons/opic.jpg",
    category: "Nightlife · Events",
    description:
      "Production nightlife platform with a React Native mobile app. I work on the mobile UI, business features, venue/event functionality, integrations, debugging, testing, and ongoing product development.",
    color: "#e64bd6",
    color2: "#7c3aed",
    screenshot: "/screens/apps/opic-home.jpg",
    screenshotHasStatusBar: true,
    platforms: "iOS",
    tech: ["React Native", "Expo", "Maps", "Auth"],
    appStore: "https://apps.apple.com/us/app/opic-nightlife-app/id6755415069",
    website: "https://opic-app.com",
  },
];
