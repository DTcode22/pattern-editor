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
  // We're reusing many of the vortex params but adding specific ones for spiral
  ySubtractor: 5, // Changed from negative value in vortex to positive
  yDivFactor: 12,
  eoMultiplier: 3, // Phase multiplier for cosine term
  xScale: 1.5,
  yOffset: 150,
  xOffset: 200,
};

// Default video export options
export const defaultVideoOptions: VideoExportOptions = {
  duration: 10,
  fps: 120,
};
