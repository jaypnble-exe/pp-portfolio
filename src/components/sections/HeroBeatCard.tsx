import type { HeroBeat } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SceneLayer } from "@/components/scene/SceneLayer";
import { Tag } from "@/components/ui/Tag";

/** Glass stat card that rises in and out over the intro clip during `beat.at`. */
export function HeroBeatCard({ beat }: { beat: HeroBeat }) {
  return (
    <SceneLayer
      at={beat.at}
      className={cn(
        // Phones: under the face. Desktop: beside the figure, on the clip's empty side.
        "inset-x-0 bottom-28 site-wrap flex justify-center",
        "desk:inset-y-0 desk:items-center",
        beat.side === "left" ? "desk:justify-start" : "desk:justify-end",
      )}
    >
      <div className="w-full max-w-[340px] rounded-3xl border border-line-hi bg-panel/60 p-6 backdrop-blur-xl">
        <span className="label text-muted">{beat.label}</span>
        <p className="mt-3 flex items-baseline gap-2.5">
          <b className="text-[56px] leading-none font-extrabold tracking-display">{beat.value}</b>
          <span className="text-[15px] font-semibold text-muted">{beat.unit}</span>
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {beat.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </SceneLayer>
  );
}
