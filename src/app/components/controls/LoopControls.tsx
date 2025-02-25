'use client';

import React from 'react';
import SliderControl from './SliderControl';
import { CombinedPatternParams } from '../../lib/patterns/types';

interface LoopControlsProps {
  params: CombinedPatternParams;
  onChange: (key: keyof CombinedPatternParams, value: number) => void;
}

const LoopControls: React.FC<LoopControlsProps> = ({ params, onChange }) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Loop Settings</h3>
      <SliderControl
        label="X Max"
        paramKey="xMax"
        min={50}
        max={400}
        step={1}
        value={params.xMax}
        onChange={onChange}
      />
      <SliderControl
        label="Y Max"
        paramKey="yMax"
        min={50}
        max={400}
        step={1}
        value={params.yMax}
        onChange={onChange}
      />
      <SliderControl
        label="Step"
        paramKey="step"
        min={1}
        max={10}
        step={1}
        value={params.step}
        onChange={onChange}
      />
    </div>
  );
};

export default LoopControls;
