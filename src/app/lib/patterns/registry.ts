import {
  RenderPattern,
  VortexPatternParams,
  SpiralPatternParams,
} from './types';
import * as vortex from './vortex';
import * as spiral from './spiral';

interface VortexDefinition {
  label: string;
  defaultParams: VortexPatternParams;
  render: RenderPattern<VortexPatternParams>;
}

interface SpiralDefinition {
  label: string;
  defaultParams: SpiralPatternParams;
  render: RenderPattern<SpiralPatternParams>;
}

export const patternRegistry: {
  vortex: VortexDefinition;
  spiral: SpiralDefinition;
} = {
  vortex: {
    label: 'Vortex',
    defaultParams: vortex.defaultParams,
    render: vortex.render,
  },
  spiral: {
    label: 'Spiral',
    defaultParams: spiral.defaultParams,
    render: spiral.render,
  },
};
