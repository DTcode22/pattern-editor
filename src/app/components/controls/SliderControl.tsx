'use client';

import React from 'react';
import { Slider } from '@/components/ui/slider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Link, Link2Off } from 'lucide-react';
import {
  AllPatternParamKeys,
  AudioFeature,
  AudioMappingConfig,
} from '../../lib/patterns/types';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

interface SliderControlProps {
  label: string;
  paramKey: AllPatternParamKeys;
  min: number;
  max: number;
  step: number;
  isDecimal?: boolean;
  value: number;
  onChange: (key: string, value: number) => void;
  currentMapping?: AudioMappingConfig;
  onMappingChange: (
    param: AllPatternParamKeys,
    config: AudioMappingConfig | null
  ) => void;
  onMappingUpdate: (
    param: AllPatternParamKeys,
    config: Partial<AudioMappingConfig>
  ) => void;
}

const audioFeatures: AudioFeature[] = ['bass', 'mids', 'treble', 'overall'];
const DEFAULT_SENSITIVITY = { additive: 20, multiplicative: 1 };

const SliderControl: React.FC<SliderControlProps> = ({
  label,
  paramKey,
  min,
  max,
  step,
  isDecimal = false,
  value,
  onChange,
  currentMapping,
  onMappingChange,
  onMappingUpdate,
}) => {
  const handleLink = (feature: AudioFeature) => {
    const isMult =
      paramKey === 'scale' || paramKey === 'speed' || paramKey === 'dotSize';
    const mode = isMult ? 'multiplicative' : 'additive';
    onMappingChange(paramKey, {
      feature,
      mode,
      sensitivity: DEFAULT_SENSITIVITY[mode],
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <Label className="text-sm font-medium text-white">
          {label}: {isDecimal ? value.toFixed(1) : value}
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'h-6 w-6',
                currentMapping && 'text-blue-400 hover:text-blue-300'
              )}
            >
              <Link className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 bg-zinc-800 border-zinc-700 p-2">
            <div className="grid gap-2">
              <h4 className="font-medium leading-none text-white">
                Link to Audio
              </h4>
              <div className="flex flex-col space-y-1">
                {audioFeatures.map((feature) => (
                  <Button
                    key={feature}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'justify-start text-zinc-300 hover:bg-zinc-700 hover:text-white',
                      currentMapping?.feature === feature &&
                        'bg-zinc-700 text-white'
                    )}
                    onClick={() => handleLink(feature)}
                  >
                    {feature.charAt(0).toUpperCase() + feature.slice(1)}
                  </Button>
                ))}
                <Button
                  variant="destructive"
                  size="sm"
                  className="justify-start mt-2"
                  onClick={() => onMappingChange(paramKey, null)}
                >
                  <Link2Off className="mr-2 h-4 w-4" /> Unlink
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Slider
        value={[value]}
        onValueChange={([newValue]) => onChange(paramKey, newValue)}
        min={min}
        max={max}
        step={step}
        disabled={!!currentMapping}
      />

      {currentMapping && (
        <div className="mt-3 space-y-3 p-3 bg-zinc-900/50 rounded-md">
          <div>
            <Label className="text-xs text-zinc-400">
              Reactivity: {currentMapping.sensitivity.toFixed(1)}
            </Label>
            <Slider
              value={[currentMapping.sensitivity]}
              onValueChange={([s]) =>
                onMappingUpdate(paramKey, { sensitivity: s })
              }
              min={0}
              max={currentMapping.mode === 'multiplicative' ? 5 : 100}
              step={currentMapping.mode === 'multiplicative' ? 0.1 : 1}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={
                currentMapping.mode === 'additive' ? 'secondary' : 'ghost'
              }
              className="text-xs flex-1"
              onClick={() => onMappingUpdate(paramKey, { mode: 'additive' })}
            >
              Additive
            </Button>
            <Button
              size="sm"
              variant={
                currentMapping.mode === 'multiplicative' ? 'secondary' : 'ghost'
              }
              className="text-xs flex-1"
              onClick={() =>
                onMappingUpdate(paramKey, { mode: 'multiplicative' })
              }
            >
              Multiplicative
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderControl;
