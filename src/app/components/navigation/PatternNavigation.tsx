'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { PatternType, CombinedPatternParams } from '../../lib/patterns/types';
import vortexPattern1 from '../../examples/pattern-config-vortex-1740528249215.json';
import vortexPattern2 from '../../examples/pattern-config-vortex-1740267570338.json';
import spiralPattern1 from '../../examples/pattern-config-spiral-1741317776900.json';
import spiralPattern2 from '../../examples/pattern-config-spiral-1740763241465.json';

interface PatternNavigationProps {
  selectedPattern: PatternType;
  onSelectPattern: (pattern: PatternType) => void;
  onSelectCustomPattern: (
    params: CombinedPatternParams,
    patternType: PatternType,
    zoom?: number
  ) => void;
}

const PatternNavigation: React.FC<PatternNavigationProps> = ({
  selectedPattern,
  onSelectPattern,
  onSelectCustomPattern,
}) => {
  return (
    <div className="h-full bg-zinc-800 p-4">
      <div className="grid grid-cols-2 grid-rows-3 h-full gap-2">
        {/* First Column - Spiral Patterns */}
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
              spiralPattern1.params as CombinedPatternParams,
              'spiral',
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
            onSelectCustomPattern(
              vortexPattern1.params as CombinedPatternParams,
              'vortex'
            )
          }
        >
          Vortex 1
        </Button>

        <Button
          className="w-full h-full rounded-md justify-start text-xs bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
          variant="ghost"
          onClick={() =>
            onSelectCustomPattern(
              spiralPattern2.params as CombinedPatternParams,
              'spiral',
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
            onSelectCustomPattern(
              vortexPattern2.params as CombinedPatternParams,
              'vortex'
            )
          }
        >
          Vortex 2
        </Button>
      </div>
    </div>
  );
};

export default PatternNavigation;
