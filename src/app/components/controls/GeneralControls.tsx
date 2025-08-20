'use client';

import React from 'react';
import SliderControl from './SliderControl';
import {
  AnyPatternParams,
  AllPatternParamKeys,
  AudioMappingConfig,
} from '../../lib/patterns/types';

interface GeneralControlsProps {
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

const GeneralControls: React.FC<GeneralControlsProps> = ({
  params,
  mappings,
  onChange,
  onMappingChange,
  onMappingUpdate,
}) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-white text-center">General</h3>
      <p className="text-xs text-gray-300 mb-2 text-center">
        Tip: Click and drag on the canvas to move the pattern position
      </p>
      <p className="text-xs text-gray-300 mb-2 text-center">
        Scroll up/down for zoom
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
        currentMapping={mappings['speed']}
        onMappingChange={onMappingChange}
        onMappingUpdate={onMappingUpdate}
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
        currentMapping={mappings['scale']}
        onMappingChange={onMappingChange}
        onMappingUpdate={onMappingUpdate}
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
        currentMapping={mappings['intensity']}
        onMappingChange={onMappingChange}
        onMappingUpdate={onMappingUpdate}
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
        currentMapping={mappings['distortion']}
        onMappingChange={onMappingChange}
        onMappingUpdate={onMappingUpdate}
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
        currentMapping={mappings['dotSize']}
        onMappingChange={onMappingChange}
        onMappingUpdate={onMappingUpdate}
      />
    </div>
  );
};

export default GeneralControls;
