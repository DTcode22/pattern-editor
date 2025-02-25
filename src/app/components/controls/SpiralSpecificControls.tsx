'use client';

import React from 'react';
import SliderControl from './SliderControl';
import { CombinedPatternParams } from '../../lib/patterns/types';

interface SpiralSpecificControlsProps {
  params: CombinedPatternParams;
  onChange: (key: keyof CombinedPatternParams, value: number) => void;
}

const SpiralSpecificControls: React.FC<SpiralSpecificControlsProps> = ({
  params,
  onChange,
}) => {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h3 className="font-semibold">Spiral Settings</h3>
        <SliderControl
          label="Y Subtractor"
          paramKey="ySubtractor"
          min={1}
          max={20}
          step={0.5}
          isDecimal={true}
          value={params.ySubtractor}
          onChange={onChange}
        />
        <SliderControl
          label="Y Div Factor"
          paramKey="yDivFactor"
          min={1}
          max={30}
          step={0.5}
          isDecimal={true}
          value={params.yDivFactor}
          onChange={onChange}
        />
        <SliderControl
          label="Cosine Phase Multiplier"
          paramKey="eoMultiplier"
          min={0.1}
          max={10}
          step={0.1}
          isDecimal={true}
          value={params.eoMultiplier}
          onChange={onChange}
        />
        <SliderControl
          label="X Scale"
          paramKey="xScale"
          min={0.1}
          max={5}
          step={0.1}
          isDecimal={true}
          value={params.xScale}
          onChange={onChange}
        />
        <SliderControl
          label="X Offset"
          paramKey="xOffset"
          min={0}
          max={400}
          step={5}
          value={params.xOffset}
          onChange={onChange}
        />
        <SliderControl
          label="Y Offset"
          paramKey="yOffset"
          min={0}
          max={400}
          step={5}
          value={params.yOffset}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SpiralSpecificControls;
