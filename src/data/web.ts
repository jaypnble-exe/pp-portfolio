import type { WebProject } from "@/lib/types";

// Screenshots are 1440×900 captures of each live site's first screen.
export const webProjects: WebProject[] = [
  {
    slug: "mand-vcard",
    name: "MAND/VCARD",
    url: "mandvcard.com",
    description:
      "Built the Next.js website and connected it with the application's backend, authentication, database, APIs, profiles, subscriptions, and other product functionality.",
    color: "#e0303a",
    color2: "#8f141b",
    screenshot: "/screens/web/mand-vcard.jpg",
    tech: ["Next.js", "Supabase", "Auth", "Subscriptions"],
    live: "https://mandvcard.com",
  },
  {
    slug: "opic",
    name: "OPIC",
    url: "opic-app.com",
    description:
      "Production nightlife platform with a React Native mobile app. I work on the mobile UI, business features, venue/event functionality, integrations, debugging, testing, and ongoing product development.",
    color: "#e64bd6",
    color2: "#7c3aed",
    screenshot: "/screens/web/opic.jpg",
    tech: ["React Native", "Expo", "APIs", "Integrations"],
    live: "https://opic-app.com",
  },
  {
    slug: "mainway-fitness",
    name: "Mainway Fitness",
    url: "mainwayfitness.com",
    description:
      "SaaS platform built with Next.js and Supabase/PostgreSQL. Worked on authentication, permissions, database workflows, APIs, multi-client architecture, and business functionality.",
    color: "#ffd60a",
    color2: "#ff9f0a",
    screenshot: "/screens/web/mainway-fitness.jpg",
    tech: ["Next.js", "Supabase", "PostgreSQL", "Multi-client"],
    live: "https://mainwayfitness.com",
  },
  {
    slug: "revel-tours",
    name: "Revel Tours",
    url: "reveltours.com",
    description:
      "Built and maintained Next.js/Supabase functionality including database-driven features, authentication, APIs, and business workflows.",
    color: "#ff4d2e",
    color2: "#ffb020",
    screenshot: "/screens/web/revel-tours.jpg",
    tech: ["Next.js", "Supabase", "Auth", "APIs"],
    live: "https://reveltours.com",
  },
  {
    slug: "mand-vcard-profiles",
    name: "MAND/VCARD Profiles",
    url: "mandvcard.com/jay",
    description:
      "Worked on the public profile experience and the systems connecting digital profiles, user data, QR/NFC sharing, and backend services.",
    color: "#5b8cff",
    color2: "#e0303a",
    screenshot: "/screens/web/mand-vcard-profile-jay.jpg",
    tech: ["Next.js", "Supabase", "QR / NFC"],
    live: "https://mandvcard.com/jay",
  },
];
