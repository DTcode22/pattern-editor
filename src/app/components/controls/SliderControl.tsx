'use client';

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { CombinedPatternParams } from '../../lib/patterns/types';

interface SliderControlProps {
  label: string;
  paramKey: keyof CombinedPatternParams;
  min: number;
  max: number;
  step: number;
  isDecimal?: boolean;
  value: number;
  onChange: (key: keyof CombinedPatternParams, value: number) => void;
}

const SliderControl: React.FC<SliderControlProps> = ({
  label,
  paramKey,
  min,
  max,
  step,
  isDecimal = false,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="text-sm font-medium text-white">
        {label}: {isDecimal ? value.toFixed(1) : value}
      </label>
      <Slider
        value={[value]}
        onValueChange={([newValue]) => onChange(paramKey, newValue)}
        min={min}
        max={max}
        step={step}
        className="mt-2"
      />
    </div>
  );
};

export default SliderControl;
