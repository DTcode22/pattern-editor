'use client';

import React from 'react';
import SliderControl from './SliderControl';
import { CombinedPatternParams } from '../../lib/patterns/types';

interface GeneralControlsProps {
  params: CombinedPatternParams;
  onChange: (key: keyof CombinedPatternParams, value: number) => void;
}

const GeneralControls: React.FC<GeneralControlsProps> = ({
  params,
  onChange,
}) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">General</h3>
      <p className="text-xs text-gray-500 mb-2">
        Tip: Click and drag on the canvas to move the pattern position
      </p>
      <SliderControl
        label="Speed"
        paramKey="speed"
        min={0}
        max={3}
        step={0.1}
        isDecimal={true}
        value={params.speed}
        onChange={onChange}
      />
      <SliderControl
        label="Scale"
        paramKey="scale"
        min={0.1}
        max={3}
        step={0.1}
        isDecimal={true}
        value={params.scale}
        onChange={onChange}
      />
      <SliderControl
        label="Intensity"
        paramKey="intensity"
        min={0}
        max={3}
        step={0.1}
        isDecimal={true}
        value={params.intensity}
        onChange={onChange}
      />
      <SliderControl
        label="Distortion"
        paramKey="distortion"
        min={0}
        max={20}
        step={0.1}
        isDecimal={true}
        value={params.distortion}
        onChange={onChange}
      />
      <SliderControl
        label="Dot Size"
        paramKey="dotSize"
        min={0.1}
        max={2}
        step={0.1}
        isDecimal={true}
        value={params.dotSize}
        onChange={onChange}
      />
    </div>
  );
};

export default GeneralControls;
