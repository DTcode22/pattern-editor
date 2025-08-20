export type PatternType = 'vortex' | 'spiral';

export type AudioFeature = 'bass' | 'mids' | 'treble' | 'overall';

export interface AudioData {
  bass: number;
  mids: number;
  treble: number;
  overall: number;
}

export interface AudioMappingConfig {
  feature: AudioFeature;
  sensitivity: number;
  mode: 'additive' | 'multiplicative';
}

export interface BasePatternParams {
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
}

export interface VortexPatternParams extends BasePatternParams {
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

export interface SpiralPatternParams extends BasePatternParams {
  xDivisor: number;
  xSubtractor: number;
  yDivisor: number;
  ySubtractor: number;
  oDivisor: number;
  yDivFactor: number;
  cosMultiplier: number;
  koMultiplier: number;
  xScale: number;
  eoMultiplier: number;
}

export type AllPatternParamKeys =
  | keyof VortexPatternParams
  | keyof SpiralPatternParams;

export type PatternConfig =
  | {
      type: 'vortex';
      params: VortexPatternParams;
    }
  | {
      type: 'spiral';
      params: SpiralPatternParams;
    };

export type AnyPatternParams = VortexPatternParams | SpiralPatternParams;

export interface RenderPattern<T extends AnyPatternParams> {
  (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    params: T,
    time: number
  ): void;
}

export interface VideoExportOptions {
  duration: number;
  fps: number;
  bitrate: number;
  quality: 'low' | 'medium' | 'high';
}

export interface PatternConfigFile {
  pattern: PatternType;
  params: AnyPatternParams;
  timestamp: string;
}
