import type { SceneConfig } from "@/lib/types";

// Scroll-scrubbed clips of Pejay that link the sections. Each ends with the site's own
// device mockup taking over from the filmed phone / laptop and gliding into the next section.
// Handoff keys were measured on the 1280×720 clips; re-measure if a clip is replaced.

export const introScene: SceneConfig = {
  name: "intro",
  alt: "Pejay turns to the camera, adjusts his glasses, then holds up an iPhone",
  aspect: 16 / 9,
  vh: [520, 600],
  mobileKeep: 0.45,
  hud: "PP // Intro",
  caption: { label: "Up next", text: "Mobile apps", at: [0.6, 0.84] },
  handoff: {
    device: "iphone",
    target: "apps",
    rotate: [11, 4], // AppShowcase's phone tilt at its first app
    appear: 0.8,
    glide: 0.86,
    keys: [
      [0.779, 40.31, 21.11, 15.47, 57.08],
      [1, 37.58, 11.11, 21.09, 78.89],
    ],
  },
};

export const laptopScene: SceneConfig = {
  name: "laptop",
  alt: "Pejay puts his phone away, opens a laptop and turns it to the camera",
  aspect: 16 / 9,
  vh: [260, 300],
  mobileKeep: 0.75,
  hud: "PP // Web",
  caption: { label: "Up next", text: "Web apps", at: [0.12, 0.7] },
  handoff: {
    device: "macbook",
    target: "web",
    rotate: [0, 0],
    appear: 0.7,
    glide: 0.8,
    keys: [
      [0.622, 33.2, 53.75, 27.81, 29.72],
      [0.647, 35.08, 53.61, 27.81, 29.31],
      [0.664, 35.08, 53.06, 27.89, 29.58],
      [0.706, 34.69, 53.06, 28.2, 29.86],
      [0.748, 34.22, 51.11, 29.3, 30.97],
      [0.79, 33.28, 49.03, 31.72, 33.47],
      [0.832, 30.7, 44.17, 36.48, 38.47],
      [0.874, 27.58, 37.36, 42.58, 44.86],
      [0.916, 24.69, 31.94, 48.05, 50.56],
      [0.958, 22.5, 27.5, 52.34, 55],
      [1, 21.09, 24.31, 55.16, 58.19],
    ],
  },
};
