import { cn } from "@/lib/utils";

/** Glass tab bar pinned to the bottom of a placeholder app screen. */
export function TabBar({ active = 0 }: { active?: number }) {
  return (
    <div className="mt-auto flex h-[3.4em] items-center justify-around rounded-[1.4em] bg-white/8 backdrop-blur-[10px]">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={cn("size-[1.1em] rounded-[.35em]", i === active ? "bg-(--c)" : "bg-white/25")}
        />
      ))}
    </div>
  );
}
