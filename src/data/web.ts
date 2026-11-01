import type { WebProject } from "@/lib/types";

// Screenshots are 1440×900 captures of each live site's first screen.
export const webProjects = [
  {
    slug: "mand-vcard",
    name: "MAND/VCARD",
    url: "mandvcard.com",
    description:
      "Built the Next.js website and connected it with the application's backend, authentication, database, APIs, profiles, subscriptions, and other product functionality.",
    color: "#e0303a",
    color2: "#8f141b",
    screenshot: "/screens/web/mand-vcard.jpg",
    screenshotAlt: "MAND/VCARD homepage introducing digital business cards",
    tech: ["Next.js", "Supabase", "Auth", "Subscriptions"],
    live: "https://mandvcard.com",
  },
  {
    slug: "mand-sa",
    name: "MAND.SA",
    url: "mand.sa",
    description:
      "Built the bilingual (English/Arabic) Next.js storefront for MAND's Saudi lifestyle brand, with the product catalog, search, customer accounts and cart running on Supabase.",
    color: "#b3202e",
    color2: "#8a5a3c",
    screenshot: "/screens/web/mand-sa.jpg",
    screenshotAlt: "MAND.SA storefront hero with patterned phone cases and bottles",
    tech: ["Next.js", "Supabase", "E-commerce", "Arabic / RTL"],
    live: "https://mand.sa",
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
    screenshotAlt: "OPIC website promoting the nightlife app",
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
    screenshotAlt: "Mainway Fitness homepage",
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
    screenshotAlt: "Revel Tours homepage with rugby, football and netball tour cards",
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
    screenshotAlt: "A public MAND/VCARD digital profile page",
    tech: ["Next.js", "Supabase", "QR / NFC"],
    live: "https://mandvcard.com/jay",
  },
] satisfies WebProject[];

// Types can't catch empty strings, so fail the build naming the project and field.
for (const p of webProjects as WebProject[]) {
  const required = { name: p.name, url: p.url, description: p.description, ...(p.screenshot ? { screenshotAlt: p.screenshotAlt } : {}) };
  for (const [field, value] of Object.entries(required)) {
    if (!value?.trim()) throw new Error(`web.ts: "${p.slug}" is missing ${field}`);
  }
}
