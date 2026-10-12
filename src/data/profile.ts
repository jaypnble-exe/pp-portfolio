import type { ContactLink } from "@/lib/types";

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
  cv: "/cv.pdf",
  cvFileName: "Pejay-Paronable-CV.pdf",
  stats: { apps: "12", projects: "40+", years: "5+", rating: "4.8★" },
  socials: { github: "", linkedin: "", x: "" }, // TODO: fill in
};

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
