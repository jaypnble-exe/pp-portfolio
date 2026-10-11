import type { WebScreenProps } from "@/lib/types";

const HERO_BG = "linear-gradient(120deg, color-mix(in srgb, var(--c) 30%, #111), #111)";
const PRODUCT_BG =
  "radial-gradient(circle at 50% 55%, var(--c2) 0 28%, transparent 29%), radial-gradient(circle at 50% 55%, rgba(255,255,255,.08) 0 40%, transparent 41%)";

export function WebShop({ name, color, color2 }: WebScreenProps) {
  return (
    <div
      className="grid h-full grid-rows-[auto_1fr_auto] gap-[1em] p-[1.4em]"
      style={{ "--c": color, "--c2": color2 }}
    >
      <div className="flex items-center justify-between">
        <b className="text-[1.3em] font-extrabold">{name}</b>
        <span className="flex gap-[1em]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[.7em] w-[3em] rounded-[3px] bg-[#2a2d36]" />
          ))}
        </span>
      </div>
      <div
        className="grid grid-cols-2 overflow-hidden rounded-[1em]"
        style={{ background: HERO_BG }}
      >
        <div className="grid content-center gap-[.6em] p-[1.6em]">
          <span className="h-[1.4em] rounded bg-white" />
          <span className="h-[1.4em] w-4/5 rounded bg-white" />
          <span className="h-[.7em] w-3/5 rounded bg-white/40" />
          <span className="mt-[.4em] h-[2.2em] w-[7em] rounded-[.6em] bg-(--c)" />
        </div>
        <div style={{ background: PRODUCT_BG }} />
      </div>
      <div className="grid grid-cols-4 gap-[.8em]">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-[5em] rounded-[.8em] border border-line bg-[#16181f]" />
        ))}
      </div>
    </div>
  );
}
