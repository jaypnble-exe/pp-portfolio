import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { profile } from "@/data/profile";

// Fades the photo's black backdrop into the page. `closest-side` makes the mask fully
// transparent before every edge of the frame, so no straight crop line shows anywhere.
const FADE = "radial-gradient(closest-side at 52% 42%, #000 70%, transparent)";

/** Hero visual: borderless portrait whose black backdrop fades into the page. */
export function HeroPortrait() {
  // Checked per render so `pnpm dev` notices a newly added photo.
  const hasPhoto = existsSync(path.join(process.cwd(), "public", profile.photo));

  return (
    <div className="relative grid h-[600px] place-items-center xs:h-[680px] desk:h-[clamp(560px,calc(100vh-180px),820px)]">
      <div className="relative aspect-[768/1365] h-full max-w-full">
        {hasPhoto ? (
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            fill
            sizes="(min-width: 1000px) 460px, 382px"
            preload
            className="object-cover"
            style={{ maskImage: FADE, WebkitMaskImage: FADE }}
          />
        ) : (
          <div className="grid size-full place-items-center text-7xl font-extrabold text-white/10">
            {profile.initials}
          </div>
        )}
      </div>
    </div>
  );
}
