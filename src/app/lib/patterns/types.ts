// Define interface for parameters
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

// Spiral pattern specific parameters
export interface SpiralPatternParams {
  // These parameters override the base ones in PatternParams
  ySubtractor: number;
  yDivFactor: number;
  eoMultiplier: number;
  xScale: number;
  yOffset: number;
  xOffset: number;
}

// Combined pattern parameters
export type CombinedPatternParams = PatternParams &
  Partial<SpiralPatternParams>;

// Video export options interface
export interface VideoExportOptions {
  duration: number;
  fps: number;
}

// Pattern types
export type PatternType = 'vortex' | 'spiral'; // Add other patterns as needed
