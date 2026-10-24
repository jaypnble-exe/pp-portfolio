import { laptopScene } from "@/data/scenes";
import { countSceneFrames, hasHdFrames } from "@/lib/sceneFrames";
import { ScrubScene } from "@/components/scene/ScrubScene";

/** Bridge from the app showcase to the web showcase: Pejay opens a laptop. */
export function LaptopScene() {
  const frames = countSceneFrames(laptopScene.name);
  if (frames < 2) return null;
  return (
    <ScrubScene
      scene={laptopScene}
      frameCount={frames}
      hd={hasHdFrames(laptopScene.name, frames)}
    />
  );
}
