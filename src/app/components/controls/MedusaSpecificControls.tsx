'use client';

import React from 'react';
import SliderControl from './SliderControl';
import { CombinedPatternParams } from '../../lib/patterns/types';

interface MedusaSpecificControlsProps {
  params: CombinedPatternParams;
  onChange: (key: keyof CombinedPatternParams, value: number) => void;
}

const MedusaSpecificControls: React.FC<MedusaSpecificControlsProps> = ({
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
          label="X Divisor"
          paramKey="xDivisor"
          min={1}
          max={20}
          step={0.1}
          isDecimal={true}
          value={params.xDivisor ?? 8}
          onChange={onChange}
        />
        <SliderControl
          label="X Subtractor"
          paramKey="xSubtractor"
          min={0}
          max={20}
          step={0.1}
          isDecimal={true}
          value={params.xSubtractor ?? 12.5}
          onChange={onChange}
        />
        <SliderControl
          label="Y Divisor"
          paramKey="yDivisor"
          min={1}
          max={20}
          step={0.1}
          isDecimal={true}
          value={params.yDivisor ?? 8}
          onChange={onChange}
        />
        <SliderControl
          label="Y Subtractor"
          paramKey="ySubtractor"
          min={0}
          max={20}
          step={0.1}
          isDecimal={true}
          value={params.ySubtractor ?? 12.5}
          onChange={onChange}
        />
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold text-white text-center">o Calculation</h3>
        <SliderControl
          label="Mag Divisor"
          paramKey="magDivisor"
          min={1}
          max={200}
          step={1}
          value={params.magDivisor ?? 169}
          onChange={onChange}
        />
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold text-white text-center">d Calculation</h3>
        <SliderControl
          label="d Base"
          paramKey="dBase"
          min={0}
          max={1}
          step={0.1}
          isDecimal={true}
          value={params.dBase ?? 0.5}
          onChange={onChange}
        />
        <SliderControl
          label="d Multiplier"
          paramKey="dMultiplier"
          min={0}
          max={10}
          step={0.1}
          isDecimal={true}
          value={params.dMultiplier ?? 5}
          onChange={onChange}
        />
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold text-white text-center">
          Time Multiplier
        </h3>
        <SliderControl
          label="Time Multiplier"
          paramKey="timeMultiplier"
          min={1}
          max={10}
          step={0.1}
          isDecimal={true}
          value={params.timeMultiplier ?? 4}
          onChange={onChange}
        />
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold text-white text-center">
          Sine/Cosine Multipliers
        </h3>
        <SliderControl
          label="Sin d Multiplier"
          paramKey="sinDMultiplier"
          min={1}
          max={5}
          step={0.1}
          isDecimal={true}
          value={params.sinDMultiplier ?? 2}
          onChange={onChange}
        />
        <SliderControl
          label="Cos d Multiplier"
          paramKey="cosDMultiplier"
          min={1}
          max={5}
          step={0.1}
          isDecimal={true}
          value={params.cosDMultiplier ?? 3}
          onChange={onChange}
        />
        <SliderControl
          label="o Multiplier in Cos"
          paramKey="oMultiplierInCos"
          min={1}
          max={10}
          step={0.1}
          isDecimal={true}
          value={params.oMultiplierInCos ?? 9}
          onChange={onChange}
        />
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold text-white text-center">
          Offsets and Scales
        </h3>
        <SliderControl
          label="px Offset"
          paramKey="pxOffset"
          min={0}
          max={200}
          step={1}
          value={params.pxOffset ?? 100}
          onChange={onChange}
        />
        <SliderControl
          label="py Offset"
          paramKey="pyOffset"
          min={0}
          max={200}
          step={1}
          value={params.pyOffset ?? 125}
          onChange={onChange}
        />
        <SliderControl
          label="o Scale"
          paramKey="oScale"
          min={1}
          max={200}
          step={1}
          value={params.oScale ?? 135}
          onChange={onChange}
        />
        <SliderControl
          label="y Scale"
          paramKey="yScale"
          min={1}
          max={10}
          step={0.1}
          isDecimal={true}
          value={params.yScale ?? 4}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default MedusaSpecificControls;
