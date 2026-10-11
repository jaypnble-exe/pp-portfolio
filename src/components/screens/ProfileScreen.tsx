import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { apps } from "@/data/apps";
import { profile } from "@/data/profile";
import { webProjects } from "@/data/web";
import { AppFrame } from "./AppFrame";

// Server-only: fall back to initials until public/profile.jpg is added.
const hasPhoto = existsSync(path.join(process.cwd(), "public", profile.photo));

const STATS = [
  [profile.stats.projects, "Projects"],
  [profile.stats.apps, "Apps"],
  [profile.stats.years, "Exp"],
];

const TILES = [...apps, ...webProjects].slice(0, 6);

export function ProfileScreen() {
  return (
    <AppFrame className="items-center bg-[linear-gradient(180deg,#1a1f3a,#07080d_60%)] pt-[22%] text-center">
      <div className="relative aspect-square w-[42%] rounded-full bg-[conic-gradient(#5b8cff,#b56bff,#ff6b9d,#5b8cff)] p-[3px]">
        <div className="relative grid size-full place-items-center overflow-hidden rounded-full bg-[#151826] text-[2.2em] font-extrabold">
          {hasPhoto ? (
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              sizes="140px"
              preload
              className="object-cover"
            />
          ) : (
            profile.initials
          )}
        </div>
        {profile.available && (
          <span className="absolute right-[6%] bottom-[6%] size-[18%] rounded-full border-3 border-[#07080d] bg-green" />
        )}
      </div>
      <div>
        <p className="mt-[.3em] text-[1.45em] font-extrabold tracking-[-0.02em]">{profile.name}</p>
        <p className="text-[.8em] text-white/55">{profile.role}</p>
      </div>
      <div className="flex w-full justify-around border-y border-white/8 py-[.8em]">
        {STATS.map(([value, label]) => (
          <div key={label}>
            <b className="block text-[1.2em]">{value}</b>
            <span className="text-[.7em] text-white/50">{label}</span>
          </div>
        ))}
      </div>
      <div className="flex w-full gap-[.5em] text-[.85em] font-bold" aria-hidden="true">
        <span className="flex-1 rounded-[.9em] bg-white py-[.75em] text-black">Hire</span>
        <span className="flex-1 rounded-[.9em] bg-white/10 py-[.75em]">Message</span>
      </div>
      <div className="grid w-full grid-cols-3 gap-[.35em]" aria-hidden="true">
        {TILES.map((tile) => (
          <span
            key={tile.slug}
            className="aspect-square rounded-[.6em]"
            style={{ background: `linear-gradient(135deg, ${tile.color}, ${tile.color2})` }}
          />
        ))}
      </div>
    </AppFrame>
  );
}
