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

// Emergence pattern specific parameters
export interface EmergencePatternParams {
  // These parameters override the base ones in PatternParams
  speed: number;
  scale: number;
  xOffset: number;
  yOffset: number;
  dotSize: number;
  backgroundColor: string;
  rMin: number;
  rMax: number;
  rStep: number;
  densityFactor: number;
  radiusDivisor: number;
  radiusTimeFactor: number;
  radiusAmplitude: number;
  angleFrequency: number;
  angleTimeFactor: number;
  angleAmplitude: number;
  breathPeriod: number;
  breathAmplitude: number;
  breathBase: number;
  rotationPeriod: number;
  rotationAmplitude: number;
  rotationBase: number;
  wavePeriod: number;
  waveAmplitude: number;
  waveBase: number;
  waveFrequency: number;
  waveTimeFactor: number;
  hueRange: number;
  hueSpeed: number;
  baseSaturation: number;
  saturationRange: number;
  baseLightness: number;
  lightnessRange: number;
  lightnessPulse: number;
  dotSizeVariationFactor: number;
  cyclePeriod: number;
}

// Combined pattern parameters
export type CombinedPatternParams = PatternParams &
  Partial<SpiralPatternParams> &
  Partial<EmergencePatternParams>;

// Video export options interface
export interface VideoExportOptions {
  duration: number;
  fps: number;
  bitrate: number;
  quality: 'low' | 'medium' | 'high';
}

// Pattern types
export type PatternType = 'vortex' | 'spiral' | 'emergence'; // Add other patterns as needed

// Parameter animation interface
export interface ParameterAnimation {
  parameter: string;
  startValue: number;
  endValue: number;
  duration: number;
  easing: 'sinusoidal' | 'quadratic' | 'exponential' | 'cubic' | 'linear';
}
