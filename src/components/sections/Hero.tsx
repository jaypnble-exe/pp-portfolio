import { heroBeats } from "@/data/hero";
import { introScene } from "@/data/scenes";
import { countSceneFrames, hasHdFrames } from "@/lib/sceneFrames";
import { SceneLayer } from "@/components/scene/SceneLayer";
import { ScrubScene } from "@/components/scene/ScrubScene";
import { HeroBeatCard } from "./HeroBeatCard";
import { HeroIntro } from "./HeroIntro";
import { HeroPortrait } from "./HeroPortrait";

export function Hero() {
  const frames = countSceneFrames(introScene.name);
  const still = (
    <section id="top" className="grid min-h-screen items-center pt-[120px] pb-[60px]">
      <div className="site-wrap grid items-center gap-10 desk:grid-cols-[1.1fr_1fr]">
        <HeroIntro />
        <HeroPortrait />
      </div>
    </section>
  );

  if (frames < 2) return still;
  // The intro clip shows the stats as cards over it instead of under the headline.
  return (
    <ScrubScene
      id="top"
      scene={introScene}
      frameCount={frames}
      hd={hasHdFrames(introScene.name, frames)}
      first
      offsetVw={20}
      fallback={still}
    >
      <SceneLayer
        at={[0, 0.05]}
        className="inset-0 site-wrap flex items-end pb-28 desk:items-center desk:pb-0"
      >
        <div className="desk:max-w-[620px]">
          <HeroIntro showStats={false} />
        </div>
      </SceneLayer>
      {heroBeats.map((beat) => (
        <HeroBeatCard key={beat.label} beat={beat} />
      ))}
    </ScrubScene>
  );
}
