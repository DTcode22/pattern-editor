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
      {/* k / e Calculation */}
      <div className="space-y-3">
        <h3 className="font-semibold">k / e Calculation</h3>
        <SliderControl
          label="X Divisor"
          paramKey="xDivisor"
          min={0}
          max={20}
          step={0.5}
          isDecimal={true}
          value={params.xDivisor}
          onChange={onChange}
        />
        <SliderControl
          label="X Subtractor"
          paramKey="xSubtractor"
          min={0}
          max={20}
          step={0.5}
          isDecimal={true}
          value={params.xSubtractor}
          onChange={onChange}
        />
        <SliderControl
          label="Y Divisor"
          paramKey="yDivisor"
          min={0}
          max={30}
          step={0.5}
          isDecimal={true}
          value={params.yDivisor}
          onChange={onChange}
        />
        <SliderControl
          label="Y Subtractor"
          paramKey="ySubtractor"
          min={0}
          max={20}
          step={0.5}
          isDecimal={true}
          value={params.ySubtractor}
          onChange={onChange}
        />
      </div>

      {/* o Calculation */}
      <div className="space-y-3">
        <h3 className="font-semibold">o Calculation</h3>
        <SliderControl
          label="O Divisor"
          paramKey="oDivisor"
          min={1}
          max={20}
          step={0.5}
          isDecimal={true}
          value={params.oDivisor}
          onChange={onChange}
        />
      </div>

      {/* Phase and Distortion */}
      <div className="space-y-3">
        <h3 className="font-semibold">Phase & Distortion</h3>
        <SliderControl
          label="Y Div Factor"
          paramKey="yDivFactor"
          min={1}
          max={50}
          step={1}
          value={params.yDivFactor}
          onChange={onChange}
        />
        <SliderControl
          label="Cos Multiplier"
          paramKey="cosMultiplier"
          min={0.1}
          max={20}
          step={0.5}
          isDecimal={true}
          value={params.cosMultiplier}
          onChange={onChange}
        />
        <SliderControl
          label="KO Multiplier"
          paramKey="koMultiplier"
          min={0.1}
          max={10}
          step={0.1}
          isDecimal={true}
          value={params.koMultiplier}
          onChange={onChange}
        />
        <SliderControl
          label="EO Multiplier (Phase)"
          paramKey="eoMultiplier"
          min={0.1}
          max={10}
          step={0.1}
          isDecimal={true}
          value={params.eoMultiplier}
          onChange={onChange}
        />
      </div>

      {/* Position & Scale */}
      <div className="space-y-3">
        <h3 className="font-semibold">Scale</h3>
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
        {/* X and Y offsets are now controlled by dragging on the canvas */}
      </div>
    </div>
  );
};

export default SpiralSpecificControls;
