import {
  PatternParams,
  VideoExportOptions,
  SpiralPatternParams,
} from './types';

export const defaultVortexParams: PatternParams = {
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

export const defaultSpiralParams: SpiralPatternParams = {
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

export const defaultVideoOptions: VideoExportOptions = {
  duration: 10,
  fps: 30,
  bitrate: 4000000,
  quality: 'medium',
};
