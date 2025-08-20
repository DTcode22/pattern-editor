// src/app/lib/patterns/spiral.ts
import { RenderPattern, SpiralPatternParams } from './types';

export const defaultParams: SpiralPatternParams = {
  speed: 1,
  scale: 1,
  intensity: 1,
  distortion: 5,
  dotSize: 1,
  xMax: 90,
  yMax: 90,
  xDivisor: 4,
  xSubtractor: 12,
  yDivisor: 9,
  ySubtractor: 9,
  oDivisor: 9,
  yDivFactor: 30,
  cosMultiplier: 9,
  koMultiplier: 4,
  xScale: 0.7,
  step: 1,
  xOffset: 200,
  yOffset: 200,
  eoMultiplier: 4,
};

export const render: RenderPattern<SpiralPatternParams> = (
  ctx,
  canvas,
  params,
  time
) => {
  for (let y = 0; y <= params.yMax; y += params.step) {
    for (let x = 0; x <= params.xMax; x += params.step) {
      const k = x / params.xDivisor - params.xSubtractor;
      const e = y / params.yDivisor + params.ySubtractor;

      if (Math.abs(k) < 0.001) continue;

      const mag = Math.sqrt(k * k + e * e);
      const o = mag / params.oDivisor;

      const c = (o * e) / params.yDivFactor - time / 8;

      const q =
        x +
        99 +
        Math.tan(1 / k) +
        o *
          k *
          (Math.cos(e * params.cosMultiplier) / 2 +
            Math.cos(y / params.yDivisor) / 0.7) *
          Math.sin(o * params.koMultiplier - time * 2);

      const px = q * params.xScale * Math.sin(c) + params.xOffset;
      const py =
        params.yOffset +
        y * Math.cos(c * params.eoMultiplier - o) -
        (q / 2) * Math.cos(c);

      ctx.fillRect(
        (px * canvas.width) / 400,
        (py * canvas.height) / 400,
        params.dotSize,
        params.dotSize
      );
    }
  }
};
