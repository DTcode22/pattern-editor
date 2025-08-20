// src/app/lib/patterns/vortex.ts
import { RenderPattern, VortexPatternParams } from './types';

export const defaultParams: VortexPatternParams = {
  speed: 1,
  scale: 1,
  intensity: 1,
  distortion: 5,
  xOffset: 130,
  yOffset: 70,
  dotSize: 1,
  xMax: 200,
  yMax: 200,
  step: 2,
  xDivisor: 10,
  xSubtractor: 10,
  yDivisor: 8,
  ySubtractor: 12,
  oBase: 2,
  oDivisor: 3,
  sinDivisor: 2,
  cosMultiplier: 0.8,
  xKMultiplier: 4,
  xScale: 0.7,
  koMultiplier: 2,
  yDivFactor: 5,
  yScale: 0.7,
  eoMultiplier: 1,
};

export const render: RenderPattern<VortexPatternParams> = (
  ctx,
  canvas,
  params,
  time
) => {
  for (let y = 0; y <= params.yMax; y += params.step) {
    for (let x = 0; x <= params.xMax; x += params.step) {
      const k = (x / params.xDivisor - params.xSubtractor) * params.scale;
      const e = (y / params.yDivisor - params.ySubtractor) * params.scale;
      const mag = Math.sqrt(k * k + e * e);
      const o = params.oBase - mag / params.oDivisor;

      const d =
        -params.distortion *
        Math.abs(
          Math.sin(k / params.sinDivisor) * Math.cos(e * params.cosMultiplier)
        ) *
        params.intensity;

      const px =
        (x - d * k * params.xKMultiplier + d * k * Math.sin(d + time)) *
          params.xScale +
        k * o * params.koMultiplier +
        params.xOffset;
      const py =
        (y -
          (d * y) / params.yDivFactor +
          d * e * Math.cos(d + time + o) * Math.sin(time + d)) *
          params.yScale +
        e * o * params.eoMultiplier +
        params.yOffset;

      ctx.fillRect(
        (px * canvas.width) / 400,
        (py * canvas.height) / 400,
        params.dotSize,
        params.dotSize
      );
    }
  }
};
