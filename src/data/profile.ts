import type { ContactLink, HeroChip } from "@/lib/types";

export const profile = {
  name: "Pejay Paronable",
  initials: "PP",
  role: "Full Stack Developer",
  tagline: "React Native apps & Next.js web",
  email: "pjparonable@gmail.com",
  phone: "+966544773176",
  phoneDisplay: "+966 54 477 3176",
  whatsapp: "https://wa.me/966544773176",
  timezone: "Asia/Riyadh",
  available: true,
  photo: "/profile.jpg", // TODO: add public/profile.jpg
  cv: "/cv.pdf", // TODO: add public/cv.pdf
  stats: { apps: "12", projects: "40+", years: "5+", rating: "4.8★" },
  socials: { github: "", linkedin: "", x: "" }, // TODO: fill in
};

/** Floating glass chips orbiting the hero phone. */
export const heroChips: HeroChip[] = [
  { short: "RN", title: "React Native", subtitle: "iOS + Android", color: "#61dafb" },
  { short: "N", title: "Next.js", subtitle: "Web apps", color: "#ffffff" },
  { short: "✓", title: "Shipped to stores", subtitle: "App Store · Play", color: "#30d158" },
];

export const contacts: ContactLink[] = [
  {
    label: profile.email,
    hint: "Email",
    href: `mailto:${profile.email}`,
    emoji: "✉️",
    color: "#5b8cff",
  },
  {
    label: "WhatsApp",
    hint: profile.phoneDisplay,
    href: profile.whatsapp,
    emoji: "💬",
    color: "#30d158",
    external: true,
  },
  {
    label: "Call me",
    hint: profile.phoneDisplay,
    href: `tel:${profile.phone}`,
    emoji: "📞",
    color: "#ff9f0a",
  },
];
