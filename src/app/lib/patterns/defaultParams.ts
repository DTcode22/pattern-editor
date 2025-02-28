import {
  PatternParams,
  VideoExportOptions,
  SpiralPatternParams,
  EmergencePatternParams,
  ParameterAnimation,
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
  xMax: 90,
  yMax: 90,
  xDivisor: 4,
  xSubtractor: 12,
  yDivisor: 9,
  ySubtractor: 9, // Positive value instead of negative as in vortex
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

// Default emergence pattern parameters
export const defaultEmergenceParams: EmergencePatternParams = {
  // Basic settings
  speed: 0.8,
  scale: 1.6,
  xOffset: 200,
  yOffset: 200,
  dotSize: 1.5,
  backgroundColor: 'rgb(5, 5, 15)',

  // Radius settings - reduced range and increased step for better performance
  rMin: 5,
  rMax: 80, // Reduced from 120
  rStep: 3, // Increased from 2
  densityFactor: 0.6, // Reduced from 0.8

  // Radius modifiers
  radiusDivisor: 10,
  radiusTimeFactor: 0.5,
  radiusAmplitude: 0.2,

  // Angle modifiers
  angleFrequency: 3,
  angleTimeFactor: 0.3,
  angleAmplitude: 0.4,

  // Breathing effect
  breathPeriod: 8,
  breathAmplitude: 0.15,
  breathBase: 1,

  // Rotation effect
  rotationPeriod: 15,
  rotationAmplitude: 0.8,
  rotationBase: 0.2,

  // Wave distortion
  wavePeriod: 10,
  waveAmplitude: 12,
  waveBase: 8,
  waveFrequency: 4,
  waveTimeFactor: 0.5,

  // Color settings
  hueRange: 60,
  hueSpeed: 10,
  baseSaturation: 80,
  saturationRange: 30,
  baseLightness: 50,
  lightnessRange: 20,
  lightnessPulse: 10,

  // Dot size variation
  dotSizeVariationFactor: 0.5,

  // Cycle period for repeating patterns
  cyclePeriod: 30,
};

// Default parameter animations for emergence pattern
export const defaultEmergenceAnimations: ParameterAnimation[] = [
  {
    parameter: 'waveAmplitude',
    startValue: 2,
    endValue: 18,
    duration: 12,
    easing: 'sinusoidal',
  },
  {
    parameter: 'rotationAmplitude',
    startValue: 0.2,
    endValue: 1.2,
    duration: 15,
    easing: 'quadratic',
  },
  {
    parameter: 'angleFrequency',
    startValue: 2,
    endValue: 5,
    duration: 20,
    easing: 'exponential',
  },
  {
    parameter: 'densityFactor',
    startValue: 0.5,
    endValue: 1.2,
    duration: 25,
    easing: 'cubic',
  },
];

// Default video export options
export const defaultVideoOptions: VideoExportOptions = {
  duration: 10,
  fps: 30,
  bitrate: 4000000, // 4 Mbps bitrate for medium quality
  quality: 'medium',
};
