import {
  PatternParams,
  VideoExportOptions,
  SpiralPatternParams,
} from './types';

// Default vortex pattern parameters
export const defaultVortexParams: PatternParams = {
  // General
  speed: 1,
  scale: 1,
  intensity: 1,
  distortion: 5,
  xOffset: 130,
  yOffset: 70,
  dotSize: 1,
  // Loop settings
  xMax: 200,
  yMax: 200,
  step: 2,
  // k / e calculation
  xDivisor: 10,
  xSubtractor: 10,
  yDivisor: 8,
  ySubtractor: 12,
  // o calculation
  oBase: 2,
  oDivisor: 3,
  // Distortion sine/cosine factors
  sinDivisor: 2,
  cosMultiplier: 0.8,
  // px calculation factors
  xKMultiplier: 4,
  xScale: 0.7,
  koMultiplier: 2,
  // py calculation factors
  yDivFactor: 5,
  yScale: 0.7,
  eoMultiplier: 1,
};

// Default spiral pattern parameters
export const defaultSpiralParams: SpiralPatternParams = {
  // Specific parameters for the spiral pattern
  xMax: 100,
  yMax: 100,
  xDivisor: 4,
  xSubtractor: 12.5,
  yDivisor: 9,
  ySubtractor: 9, // Positive value instead of negative as in vortex
  oDivisor: 9,
  yDivFactor: 30,
  cosMultiplier: 9,
  koMultiplier: 4,
  xScale: 0.7,
  xOffset: 200,
  yOffset: 200,
  eoMultiplier: 4,
};

// Default video export options
export const defaultVideoOptions: VideoExportOptions = {
  duration: 10,
  fps: 120,
};
