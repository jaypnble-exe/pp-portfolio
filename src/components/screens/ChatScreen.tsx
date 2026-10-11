import type { AccentProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AppFrame } from "./AppFrame";

const MESSAGES: [me: boolean, text: string][] = [
  [false, "Is the new build ready? 👀"],
  [true, "Yes! Pushed to TestFlight 🚀"],
  [false, "Animations look so smooth"],
  [true, "Reanimated 3 ✨"],
];

export function ChatScreen({ color, color2 }: AccentProps) {
  return (
    <AppFrame color={color} color2={color2} className="bg-[#0a0d12]">
      <div className="flex items-center gap-[.6em] border-b border-white/7 pb-[.7em]">
        <span className="size-[2.2em] rounded-full bg-linear-135 from-(--c) to-(--c2)" />
        <div>
          <b className="text-[.95em]">Design Team</b>
          <span className="block text-[.7em] text-green">● 4 online</span>
        </div>
      </div>
      <div className="flex flex-col gap-[.45em]">
        {MESSAGES.map(([me, text]) => (
          <p
            key={text}
            className={cn(
              "max-w-[78%] rounded-[1.1em] px-[.85em] py-[.6em] text-[.78em] leading-[1.35]",
              me
                ? "self-end rounded-br-[.3em] bg-(--c) font-semibold text-black"
                : "rounded-bl-[.3em] bg-white/8",
            )}
          >
            {text}
          </p>
        ))}
        <div className="flex w-fit gap-[.25em] rounded-[1.1em] bg-white/8 px-[.9em] py-[.7em]">
          {[0, 0.2, 0.4].map((delay) => (
            <span
              key={delay}
              className="size-[.4em] animate-typing rounded-full bg-white opacity-50"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>
      <div className="mt-auto flex gap-[.5em]">
        <span className="flex-1 rounded-full bg-white/7 px-[1em] py-[.8em] text-[.75em] text-white/40">
          Message…
        </span>
        <span className="size-[2.4em] rounded-full bg-(--c)" />
      </div>
    </AppFrame>
  );
}
