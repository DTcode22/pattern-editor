'use client';

import React from 'react';
import SliderControl from './SliderControl';
import {
  AnyPatternParams,
  AllPatternParamKeys,
  AudioMappingConfig,
} from '../../lib/patterns/types';

interface LoopControlsProps {
  params: AnyPatternParams;
  mappings: Partial<Record<AllPatternParamKeys, AudioMappingConfig>>;
  onChange: (key: string, value: number) => void;
  onMappingChange: (
    param: AllPatternParamKeys,
    config: AudioMappingConfig | null
  ) => void;
  onMappingUpdate: (
    param: AllPatternParamKeys,
    config: Partial<AudioMappingConfig>
  ) => void;
}

const LoopControls: React.FC<LoopControlsProps> = ({
  params,
  mappings,
  onChange,
  onMappingChange,
  onMappingUpdate,
}) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-white text-center">Loop Settings</h3>
      <SliderControl
        label="X Max"
        paramKey="xMax"
        min={10}
        max={800}
        step={5}
        value={params.xMax}
        onChange={onChange}
        currentMapping={mappings['xMax']}
        onMappingChange={onMappingChange}
        onMappingUpdate={onMappingUpdate}
      />
      <SliderControl
        label="Y Max"
        paramKey="yMax"
        min={10}
        max={800}
        step={5}
        value={params.yMax}
        onChange={onChange}
        currentMapping={mappings['yMax']}
        onMappingChange={onMappingChange}
        onMappingUpdate={onMappingUpdate}
      />
      <SliderControl
        label="Step"
        paramKey="step"
        min={0.5}
        max={3}
        step={0.1}
        value={params.step}
        onChange={onChange}
        currentMapping={mappings['step']}
        onMappingChange={onMappingChange}
        onMappingUpdate={onMappingUpdate}
      />
    </div>
  );
};

export default LoopControls;
