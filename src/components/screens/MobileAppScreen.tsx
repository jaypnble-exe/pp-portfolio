import type { ComponentType } from "react";
import Image from "next/image";
import type { AccentProps, AppScreen, MobileApp } from "@/lib/types";
import { ChatScreen } from "./ChatScreen";
import { FitnessScreen } from "./FitnessScreen";
import { FoodScreen } from "./FoodScreen";
import { RideScreen } from "./RideScreen";

const PLACEHOLDERS: Record<AppScreen, ComponentType<AccentProps>> = {
  fitness: FitnessScreen,
  ride: RideScreen,
  food: FoodScreen,
  chat: ChatScreen,
};

interface MobileAppScreenProps {
  app: MobileApp;
  preload?: boolean;
}

/** Real screenshot if provided, otherwise the placeholder UI for `app.screen`. */
export function MobileAppScreen({ app, preload = false }: MobileAppScreenProps) {
  if (app.screenshot) {
    return (
      <Image
        src={app.screenshot}
        alt={`${app.name} app screen`}
        fill
        sizes="300px"
        preload={preload}
        className="object-cover"
      />
    );
  }

  const Placeholder = PLACEHOLDERS[app.screen];
  return <Placeholder color={app.color} color2={app.color2} />;
}
