'use client';

import React from 'react';
import SliderControl from './SliderControl';
import {
  VortexPatternParams,
  AllPatternParamKeys,
  AudioMappingConfig,
} from '../../lib/patterns/types';

interface VortexSpecificControlsProps {
  params: VortexPatternParams;
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

const VortexSpecificControls: React.FC<VortexSpecificControlsProps> = ({
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
          label="x Divisor"
          paramKey="xDivisor"
          min={1}
          max={20}
          step={0.1}
          isDecimal={true}
          value={params.xDivisor}
          onChange={onChange}
          currentMapping={mappings['xDivisor']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['xSubtractor']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['yDivisor']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['ySubtractor']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['oBase']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['oDivisor']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['sinDivisor']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['cosMultiplier']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['xKMultiplier']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['xScale']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['koMultiplier']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['yDivFactor']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['yScale']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
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
          currentMapping={mappings['eoMultiplier']}
          onMappingChange={onMappingChange}
          onMappingUpdate={onMappingUpdate}
        />
      </div>
    </div>
  );
};

export default VortexSpecificControls;
