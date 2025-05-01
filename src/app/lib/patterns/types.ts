export interface PatternParams {
  speed: number;
  scale: number;
  intensity: number;
  distortion: number;
  xOffset: number;
  yOffset: number;
  dotSize: number;
  xMax: number;
  yMax: number;
  step: number;
  xDivisor: number;
  xSubtractor: number;
  yDivisor: number;
  ySubtractor: number;
  oBase: number;
  oDivisor: number;
  sinDivisor: number;
  cosMultiplier: number;
  xKMultiplier: number;
  xScale: number;
  koMultiplier: number;
  yDivFactor: number;
  yScale: number;
  eoMultiplier: number;
}

export interface SpiralPatternParams {
  xMax: number;
  yMax: number;
  xDivisor: number;
  xSubtractor: number;
  yDivisor: number;
  ySubtractor: number;
  oDivisor: number;
  yDivFactor: number;
  cosMultiplier: number;
  koMultiplier: number;
  xScale: number;
  step: number;
  xOffset: number;
  yOffset: number;
  eoMultiplier: number;
}

export type CombinedPatternParams = PatternParams &
  Partial<SpiralPatternParams>;

export interface VideoExportOptions {
  duration: number;
  fps: number;
  bitrate: number;
  quality: 'low' | 'medium' | 'high';
}

export type PatternType = 'vortex' | 'spiral';
