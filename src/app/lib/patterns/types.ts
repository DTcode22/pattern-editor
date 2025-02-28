// Define interface for base parameters
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

// Spiral pattern specific parameters (overrides base parameters)
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

// Custom pattern specific parameters
export interface MedusaPatternParams {
  magDivisor: number;
  dBase: number;
  dMultiplier: number;
  timeMultiplier: number;
  sinDMultiplier: number;
  cosDMultiplier: number;
  oMultiplierInCos: number;
  pxOffset: number;
  pyOffset: number;
  oScale: number;
  yScale: number;
}

// Combined pattern parameters, including optional spiral and medusa parameters
export type CombinedPatternParams = PatternParams & {
  // Optional spiral-specific parameters
  xMax?: number;
  yMax?: number;
  xDivisor?: number;
  xSubtractor?: number;
  yDivisor?: number;
  ySubtractor?: number;
  oDivisor?: number;
  yDivFactor?: number;
  cosMultiplier?: number;
  koMultiplier?: number;
  xScale?: number;
  step?: number;
  xOffset?: number;
  yOffset?: number;
  eoMultiplier?: number;
  // Optional medusa-specific parameters
  magDivisor?: number;
  dBase?: number;
  dMultiplier?: number;
  timeMultiplier?: number;
  sinDMultiplier?: number;
  cosDMultiplier?: number;
  oMultiplierInCos?: number;
  pxOffset?: number;
  pyOffset?: number;
  oScale?: number;
  yScale?: number;
};

// Video export options interface
export interface VideoExportOptions {
  duration: number;
  fps: number;
  bitrate: number;
  quality: 'low' | 'medium' | 'high';
}

// Pattern types
export type PatternType = 'vortex' | 'spiral' | 'medusa';
