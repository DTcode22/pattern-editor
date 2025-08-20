'use client';

import React from 'react';
import SliderControl from './SliderControl';
import {
  SpiralPatternParams,
  AllPatternParamKeys,
  AudioMappingConfig,
} from '../../lib/patterns/types';

interface SpiralSpecificControlsProps {
  params: SpiralPatternParams;
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

const SpiralSpecificControls: React.FC<SpiralSpecificControlsProps> = ({
  params,
  mappings,
  onChange,
  onMappingChange,
  onMappingUpdate,
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
          min={0}
          max={20}
          step={0.5}
          isDecimal={true}
          value={params.xDivisor}
          onChange={onChange}
          currentMapping={mappings['xDivisor']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['xSubtractor']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['yDivisor']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['ySubtractor']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
        />
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold text-white text-center">o Calculation</h3>
        <SliderControl
          label="O Divisor"
          paramKey="oDivisor"
          min={1}
          max={20}
          step={0.5}
          isDecimal={true}
          value={params.oDivisor}
          onChange={onChange}
          currentMapping={mappings['oDivisor']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
        />
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold text-white text-center">
          Phase & Distortion
        </h3>
        <SliderControl
          label="Y Div Factor"
          paramKey="yDivFactor"
          min={1}
          max={50}
          step={1}
          value={params.yDivFactor}
          onChange={onChange}
          currentMapping={mappings['yDivFactor']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['cosMultiplier']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['koMultiplier']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['eoMultiplier']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
        />
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold text-white text-center">Scale</h3>
        <SliderControl
          label="X Scale"
          paramKey="xScale"
          min={0.1}
          max={5}
          step={0.1}
          isDecimal={true}
          value={params.xScale}
          onChange={onChange}
          currentMapping={mappings['xScale']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
        />
      </div>
    </div>
  );
};

export default SpiralSpecificControls;
