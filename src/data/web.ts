import type { WebProject } from "@/lib/types";

export const webProjects: WebProject[] = [
  // TODO: replace with real project
  {
    slug: "shopflow",
    name: "ShopFlow",
    url: "shopflow.com",
    color: "#b56bff",
    color2: "#ff6b9d",
    screen: "shop",
    tech: ["Next.js", "Stripe", "Prisma", "Tailwind"],
    kpis: [
      ["98", "Lighthouse"],
      ["2.1k", "Users"],
    ],
    live: "#",
  },
  // TODO: replace with real project
  {
    slug: "pulse-analytics",
    name: "Pulse Analytics",
    url: "pulse.app",
    color: "#5b8cff",
    color2: "#00e0ff",
    screen: "dash",
    tech: ["Next.js", "tRPC", "PostgreSQL", "Charts"],
    kpis: [
      ["50ms", "API avg"],
      ["99.9%", "Uptime"],
    ],
    live: "#",
  },
  // TODO: replace with real project
  {
    slug: "clinicbook",
    name: "ClinicBook",
    url: "clinicbook.io",
    color: "#30d158",
    color2: "#5b8cff",
    screen: "book",
    tech: ["Next.js", "Node.js", "MongoDB", "Auth"],
    kpis: [
      ["1.2k", "Bookings/mo"],
      ["3", "Clinics"],
    ],
    live: "#",
  },
];
