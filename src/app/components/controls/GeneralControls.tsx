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
      <SliderControl
        label="Speed"
        paramKey="speed"
        min={0}
        max={2}
        step={0.1}
        isDecimal={true}
        value={params.speed}
        onChange={onChange}
      />
      <SliderControl
        label="Scale"
        paramKey="scale"
        min={0.5}
        max={2}
        step={0.1}
        isDecimal={true}
        value={params.scale}
        onChange={onChange}
      />
      <SliderControl
        label="Intensity"
        paramKey="intensity"
        min={0}
        max={2}
        step={0.1}
        isDecimal={true}
        value={params.intensity}
        onChange={onChange}
      />
      <SliderControl
        label="Distortion"
        paramKey="distortion"
        min={1}
        max={10}
        step={0.1}
        isDecimal={true}
        value={params.distortion}
        onChange={onChange}
      />
      <SliderControl
        label="X Offset"
        paramKey="xOffset"
        min={0}
        max={300}
        step={1}
        value={params.xOffset}
        onChange={onChange}
      />
      <SliderControl
        label="Y Offset"
        paramKey="yOffset"
        min={0}
        max={300}
        step={1}
        value={params.yOffset}
        onChange={onChange}
      />
      <SliderControl
        label="Dot Size"
        paramKey="dotSize"
        min={1}
        max={5}
        step={1}
        value={params.dotSize}
        onChange={onChange}
      />
    </div>
  );
};

export default GeneralControls;
