/** Where a frame of `aspect` sits on a w×h canvas; `keep` is the phone crop (null = cover). */
export function frameBox(w: number, h: number, aspect: number, keep: number | null) {
  const bw = keep ? w / keep : Math.max(w, h * aspect);
  const bh = bw / aspect;
  return { x: (w - bw) / 2, y: (h - bh) * (keep ? 0.3 : 0.5), w: bw, h: bh };
}

/** Feathers the edges of the drawn frame so its black backdrop melts into the page. */
function feather(ctx: CanvasRenderingContext2D, box: ReturnType<typeof frameBox>) {
  const { width: w, height: h } = ctx.canvas;
  ctx.globalCompositeOperation = "destination-in";
  for (const [x0, y0, x1, y1, edge] of [
    [0, box.y, 0, box.y + box.h, 0.12],
    [box.x, 0, box.x + box.w, 0, 0.08],
  ]) {
    const fade = ctx.createLinearGradient(x0, y0, x1, y1);
    fade.addColorStop(0, "transparent");
    fade.addColorStop(edge, "#000");
    fade.addColorStop(1 - edge, "#000");
    fade.addColorStop(1, "transparent");
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, w, h);
  }
  ctx.globalCompositeOperation = "source-over";
}

/** Desktop: cover the canvas. Phones: keep the middle `keep` of the frame width, a little above center. */
export function drawScene(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  keep: number | null,
) {
  const { width: w, height: h } = ctx.canvas;
  const box = frameBox(w, h, img.naturalWidth / img.naturalHeight, keep);
  ctx.clearRect(0, 0, w, h);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, box.x, box.y, box.w, box.h);
  feather(ctx, box);
}
