'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  usePatternState,
  usePatternDispatch,
} from '../../context/PatternContext';
import {
  PatternType,
  PatternConfig,
  SpiralPatternParams,
  VortexPatternParams,
} from '../../lib/patterns/types';

import vortexPattern1 from '../../examples/pattern-config-vortex-1740528249215.json';
import vortexPattern2 from '../../examples/pattern-config-vortex-1740267570338.json';
import spiralPattern1 from '../../examples/pattern-config-spiral-1741317776900.json';
import spiralPattern2 from '../../examples/pattern-config-spiral-1740763241465.json';

const PatternNavigation: React.FC = () => {
  const { patternConfig } = usePatternState();
  const dispatch = usePatternDispatch();
  const selectedPattern = patternConfig.type;

  const onSelectPattern = (pattern: PatternType) => {
    dispatch({ type: 'SET_PATTERN_TYPE', payload: pattern });
  };

  const onSelectCustomPattern = (config: PatternConfig, zoom?: number) => {
    dispatch({ type: 'LOAD_CONFIG', payload: { config, zoom } });
  };

  return (
    <div className="h-full bg-zinc-800 p-4">
      <div className="grid grid-cols-2 grid-rows-3 h-full gap-2">
        <Button
          className={`w-full h-full rounded-md justify-start text-xs ${
            selectedPattern === 'spiral'
              ? 'bg-zinc-600 shadow-md text-zinc-100'
              : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-200'
          }`}
          variant="ghost"
          onClick={() => onSelectPattern('spiral')}
        >
          Spiral
        </Button>
        <Button
          className={`w-full h-full rounded-md justify-start text-xs ${
            selectedPattern === 'vortex'
              ? 'bg-zinc-600 shadow-md text-zinc-100'
              : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-200'
          }`}
          variant="ghost"
          onClick={() => onSelectPattern('vortex')}
        >
          Vortex
        </Button>

        <Button
          className="w-full h-full rounded-md justify-start text-xs bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
          variant="ghost"
          onClick={() =>
            onSelectCustomPattern(
              {
                type: 'spiral',
                params: spiralPattern1.params as SpiralPatternParams,
              },
              0.5
            )
          }
        >
          Spiral 1
        </Button>
        <Button
          className="w-full h-full rounded-md justify-start text-xs bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
          variant="ghost"
          onClick={() =>
            onSelectCustomPattern({
              type: 'vortex',
              params: vortexPattern1.params as VortexPatternParams,
            })
          }
        >
          Vortex 1
        </Button>

        <Button
          className="w-full h-full rounded-md justify-start text-xs bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
          variant="ghost"
          onClick={() =>
            onSelectCustomPattern(
              {
                type: 'spiral',
                params: spiralPattern2.params as SpiralPatternParams,
              },
              0.5
            )
          }
        >
          Spiral 2
        </Button>
        <Button
          className="w-full h-full rounded-md justify-start text-xs bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
          variant="ghost"
          onClick={() =>
            onSelectCustomPattern({
              type: 'vortex',
              params: vortexPattern2.params as VortexPatternParams,
            })
          }
        >
          Vortex 2
        </Button>
      </div>
    </div>
  );
};

export default PatternNavigation;
