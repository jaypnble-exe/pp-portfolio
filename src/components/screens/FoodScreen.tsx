import type { AccentProps } from "@/lib/types";
import { AppFrame } from "./AppFrame";
import { TabBar } from "./TabBar";

const DISH_IMG =
  "radial-gradient(circle at 40% 45%, var(--c2) 0 22%, transparent 23%), radial-gradient(circle at 62% 55%, var(--c) 0 18%, transparent 19%), linear-gradient(135deg, #3a2516, #1b120c)";

const DISHES = [
  { name: "Smash Burger", price: "SAR 32", hue: 0 },
  { name: "Pepperoni Pizza", price: "SAR 45", hue: 40 },
];

export function FoodScreen({ color, color2 }: AccentProps) {
  return (
    <AppFrame color={color} color2={color2} className="bg-[#0e0b09]">
      <p className="text-[.8em] text-white/55">Deliver to · Home ▾</p>
      <p className="text-[1.6em] font-extrabold tracking-[-0.03em]">Hungry?</p>
      <div className="rounded-[1em] bg-white/7 px-[1em] py-[.75em] text-[.8em] text-white/45">
        🔍 Search food…
      </div>
      <div className="flex gap-[.4em]">
        {["Burgers", "Pizza", "Sushi"].map((pill, i) => (
          <span
            key={pill}
            className={
              i === 0
                ? "rounded-full bg-(--c) px-[.8em] py-[.45em] text-[.72em] font-bold text-black"
                : "rounded-full bg-white/7 px-[.8em] py-[.45em] text-[.72em]"
            }
          >
            {pill}
          </span>
        ))}
      </div>
      {DISHES.map((dish) => (
        <div key={dish.name} className="overflow-hidden rounded-[1.1em] bg-white/6">
          <div
            className="h-[5.6em]"
            style={{
              background: DISH_IMG,
              filter: dish.hue ? `hue-rotate(${dish.hue}deg)` : undefined,
            }}
          />
          <div className="flex justify-between px-[.8em] py-[.6em] text-[.85em] font-bold">
            {dish.name}
            <span className="text-(--c)">{dish.price}</span>
          </div>
        </div>
      ))}
      <TabBar />
    </AppFrame>
  );
}
