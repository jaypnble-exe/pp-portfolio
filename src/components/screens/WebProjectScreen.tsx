import type { ComponentType } from "react";
import Image from "next/image";
import type { WebProject, WebScreen, WebScreenProps } from "@/lib/types";
import { WebBooking } from "./WebBooking";
import { WebDashboard } from "./WebDashboard";
import { WebShop } from "./WebShop";

const PLACEHOLDERS: Record<WebScreen, ComponentType<WebScreenProps>> = {
  shop: WebShop,
  dash: WebDashboard,
  book: WebBooking,
};

interface WebProjectScreenProps {
  project: WebProject;
}

/** Real screenshot if provided, otherwise the placeholder UI for `project.screen`. */
export function WebProjectScreen({ project }: WebProjectScreenProps) {
  if (project.screenshot) {
    return (
      <Image
        src={project.screenshot}
        alt={`${project.name} website`}
        fill
        sizes="(min-width: 1000px) 720px, 100vw"
        className="object-cover object-top"
      />
    );
  }

  if (!project.screen) return null;
  const Placeholder = PLACEHOLDERS[project.screen];
  return <Placeholder name={project.name} color={project.color} color2={project.color2} />;
}
