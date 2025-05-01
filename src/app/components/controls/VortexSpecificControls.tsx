'use client';

import React from 'react';
import SliderControl from './SliderControl';
import { CombinedPatternParams } from '../../lib/patterns/types';

interface VortexSpecificControlsProps {
  params: CombinedPatternParams;
  onChange: (key: keyof CombinedPatternParams, value: number) => void;
}

const VortexSpecificControls: React.FC<VortexSpecificControlsProps> = ({
  params,
  onChange,
}) => {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h3 className="font-semibold text-white text-center">
          k / e Calculation
        </h3>
        <SliderControl
          label="x Divisor"
          paramKey="xDivisor"
          min={1}
          max={20}
          step={0.1}
          isDecimal={true}
          value={params.xDivisor}
          onChange={onChange}
        />
        <SliderControl
          label="x Subtractor"
          paramKey="xSubtractor"
          min={0}
          max={20}
          step={0.1}
          isDecimal={true}
          value={params.xSubtractor}
          onChange={onChange}
        />
        <SliderControl
          label="y Divisor"
          paramKey="yDivisor"
          min={1}
          max={20}
          step={0.1}
          isDecimal={true}
          value={params.yDivisor}
          onChange={onChange}
        />
        <SliderControl
          label="y Subtractor"
          paramKey="ySubtractor"
          min={0}
          max={20}
          step={0.1}
          isDecimal={true}
          value={params.ySubtractor}
          onChange={onChange}
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-white text-center">o Calculation</h3>
        <SliderControl
          label="o Base"
          paramKey="oBase"
          min={0}
          max={5}
          step={0.1}
          isDecimal={true}
          value={params.oBase}
          onChange={onChange}
        />
        <SliderControl
          label="o Divisor"
          paramKey="oDivisor"
          min={1}
          max={10}
          step={0.1}
          isDecimal={true}
          value={params.oDivisor}
          onChange={onChange}
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-white text-center">
          Distortion Factors
        </h3>
        <SliderControl
          label="Sin Divisor"
          paramKey="sinDivisor"
          min={0.1}
          max={10}
          step={0.1}
          isDecimal={true}
          value={params.sinDivisor}
          onChange={onChange}
        />
        <SliderControl
          label="Cos Multiplier"
          paramKey="cosMultiplier"
          min={0.1}
          max={5}
          step={0.1}
          isDecimal={true}
          value={params.cosMultiplier}
          onChange={onChange}
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-white text-center">px Calculation</h3>
        <SliderControl
          label="xK Multiplier"
          paramKey="xKMultiplier"
          min={0}
          max={10}
          step={0.1}
          isDecimal={true}
          value={params.xKMultiplier}
          onChange={onChange}
        />
        <SliderControl
          label="x Scale"
          paramKey="xScale"
          min={0.1}
          max={2}
          step={0.1}
          isDecimal={true}
          value={params.xScale}
          onChange={onChange}
        />
        <SliderControl
          label="ko Multiplier"
          paramKey="koMultiplier"
          min={0}
          max={5}
          step={0.1}
          isDecimal={true}
          value={params.koMultiplier}
          onChange={onChange}
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-white text-center">py Calculation</h3>
        <SliderControl
          label="y Div Factor"
          paramKey="yDivFactor"
          min={0}
          max={10}
          step={0.1}
          isDecimal={true}
          value={params.yDivFactor}
          onChange={onChange}
        />
        <SliderControl
          label="y Scale"
          paramKey="yScale"
          min={0.1}
          max={2}
          step={0.1}
          isDecimal={true}
          value={params.yScale}
          onChange={onChange}
        />
        <SliderControl
          label="eo Multiplier"
          paramKey="eoMultiplier"
          min={0}
          max={5}
          step={0.1}
          isDecimal={true}
          value={params.eoMultiplier}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default VortexSpecificControls;
