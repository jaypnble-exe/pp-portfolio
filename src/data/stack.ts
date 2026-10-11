import type { StackGroup } from "@/lib/types";

export const stack: StackGroup[] = [
  {
    title: "Frontend",
    color: "#5b8cff",
    items: [
      { name: "React", short: "Re", color: "#61dafb" },
      { name: "Next.js", short: "N", color: "#ffffff" },
      { name: "TypeScript", short: "TS", color: "#3178c6" },
      { name: "Tailwind", short: "Tw", color: "#38bdf8" },
    ],
  },
  {
    title: "Mobile",
    color: "#b56bff",
    items: [
      { name: "React Native", short: "RN", color: "#61dafb" },
      { name: "Expo", short: "Ex", color: "#e5e5ea" },
      { name: "Reanimated", short: "Ra", color: "#b56bff" },
    ],
  },
  {
    title: "Backend",
    color: "#30d158",
    items: [
      { name: "Node.js", short: "No", color: "#5fa04e" },
      { name: "PostgreSQL", short: "Pg", color: "#4f8fd6" },
      { name: "MongoDB", short: "Mg", color: "#47a248" },
      { name: "Firebase", short: "Fb", color: "#ffca28" },
    ],
  },
  {
    title: "DevOps",
    color: "#ff9f0a",
    items: [
      { name: "Docker", short: "Dk", color: "#2496ed" },
      { name: "AWS", short: "Aw", color: "#ff9900" },
      { name: "Vercel", short: "▲", color: "#ffffff" },
      { name: "Git", short: "Gt", color: "#f05032" },
    ],
  },
];
