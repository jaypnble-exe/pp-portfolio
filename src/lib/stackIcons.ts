import {
  siAlibabacloud,
  siDocker,
  siExpo,
  siFirebase,
  siGit,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siUbuntu,
  siVercel,
} from "simple-icons";

/**
 * Brand logos (simple-icons, CC0) referenced by `StackItem.icon`.
 * Not every brand is available — e.g. AWS and Reanimated — those fall back to `short`.
 */
export const STACK_ICONS = {
  react: siReact,
  nextjs: siNextdotjs,
  typescript: siTypescript,
  tailwind: siTailwindcss,
  expo: siExpo,
  nodejs: siNodedotjs,
  postgresql: siPostgresql,
  firebase: siFirebase,
  supabase: siSupabase,
  docker: siDocker,
  vercel: siVercel,
  git: siGit,
  alibabacloud: siAlibabacloud,
  ubuntu: siUbuntu,
} as const;

export type StackIconKey = keyof typeof STACK_ICONS;
