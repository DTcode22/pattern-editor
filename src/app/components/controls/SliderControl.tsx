'use client';
import React from 'react';
import { Slider } from '@/components/ui/slider';
interface SliderControlProps {
  label: string;
  paramKey: string;
  min: number;
  max: number;
  step: number;
  isDecimal?: boolean;
  value: number;
  onChange: (key: string, value: number) => void;
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
