import type { StackGroup } from "@/lib/types";

export const stack: StackGroup[] = [
  {
    title: "Frontend",
    color: "#5b8cff",
    items: [
      { name: "React", short: "Re", color: "#61dafb", icon: "react" },
      { name: "Next.js", short: "N", color: "#ffffff", icon: "nextjs" },
      { name: "TypeScript", short: "TS", color: "#3178c6", icon: "typescript" },
      { name: "Tailwind", short: "Tw", color: "#38bdf8", icon: "tailwind" },
    ],
  },
  {
    title: "Mobile",
    color: "#b56bff",
    items: [
      { name: "React Native", short: "RN", color: "#61dafb", icon: "react" },
      { name: "Expo", short: "Ex", color: "#e5e5ea", icon: "expo" },
      { name: "Reanimated", short: "Ra", color: "#b56bff" },
    ],
  },
  {
    title: "Backend",
    color: "#30d158",
    items: [
      { name: "Node.js", short: "No", color: "#5fa04e", icon: "nodejs" },
      { name: "Supabase", short: "Sb", color: "#3fcf8e", icon: "supabase" },
      { name: "PostgreSQL", short: "Pg", color: "#4f8fd6", icon: "postgresql" },
      { name: "Firebase", short: "Fb", color: "#ffca28", icon: "firebase" },
    ],
  },
  {
    title: "DevOps",
    color: "#ff9f0a",
    items: [
      { name: "Docker", short: "Dk", color: "#2496ed", icon: "docker" },
      { name: "Alibaba Cloud", short: "Ac", color: "#ff6a00", icon: "alibabacloud" },
      { name: "Ubuntu", short: "Ub", color: "#e95420", icon: "ubuntu" },
      { name: "Vercel", short: "▲", color: "#ffffff", icon: "vercel" },
      { name: "Git", short: "Gt", color: "#f05032", icon: "git" },
    ],
  },
];
