'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Mic, XCircle, Wand2 } from 'lucide-react';
import { useAudioAnalyzer } from '../../hooks/useAudioAnalyzer';
import {
  AllPatternParamKeys,
  AudioFeature,
  AudioMappingConfig,
} from '@/app/lib/patterns/types';
import {
  usePatternDispatch,
  usePatternState,
} from '@/app/context/PatternContext';

interface AudioControlsProps {
  audioElementRef: React.RefObject<HTMLAudioElement | null>;
  analyzer: ReturnType<typeof useAudioAnalyzer>;
}

const PARAMS_TO_RANDOMIZE: AllPatternParamKeys[] = [
  'distortion',
  'scale',
  'intensity',
  'dotSize',
  'speed',
  'koMultiplier',
  'eoMultiplier',
  'cosMultiplier',
  'oBase',
];
const AUDIO_FEATURES: AudioFeature[] = ['bass', 'mids', 'treble', 'overall'];

const AudioControls: React.FC<AudioControlsProps> = ({
  audioElementRef,
  analyzer,
}) => {
  const { status, fileName, setFileName, startFromFile, startFromMic, stop } =
    analyzer;
  const dispatch = usePatternDispatch();
  const { patternConfig } = usePatternState();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && audioElementRef.current) {
      const url = URL.createObjectURL(file);
      audioElementRef.current.src = url;
      setFileName(file.name);
      startFromFile(audioElementRef.current);
    }
  };

  const randomizeMappings = () => {
    const newMappings: Partial<
      Record<AllPatternParamKeys, AudioMappingConfig>
    > = {};
    const availableParams = PARAMS_TO_RANDOMIZE.filter(
      (p) => p in patternConfig.params
    );
    const shuffledParams = [...availableParams].sort(() => 0.5 - Math.random());

    // Select 3-5 parameters to map
    const paramsToMap = shuffledParams.slice(
      0,
      Math.floor(Math.random() * 3) + 3
    );

    paramsToMap.forEach((param) => {
      const feature =
        AUDIO_FEATURES[Math.floor(Math.random() * AUDIO_FEATURES.length)];
      const mode =
        param === 'scale' || param === 'speed' || param === 'dotSize'
          ? 'multiplicative'
          : 'additive';
      const sensitivity =
        mode === 'multiplicative'
          ? parseFloat((Math.random() * 1.5 + 0.5).toFixed(2)) // 0.5 to 2.0
          : parseFloat((Math.random() * 25 + 5).toFixed(2)); // 5 to 30

      newMappings[param] = { feature, mode, sensitivity };
    });

    dispatch({ type: 'REPLACE_MAPPINGS', payload: newMappings });
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-white text-center">Audio Reactivity</h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={status !== 'inactive'}
          />
          <Button
            variant="outline"
            className="w-full"
            disabled={status !== 'inactive'}
          >
            <Upload className="mr-2" /> Load
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={startFromMic}
          disabled={status !== 'inactive'}
        >
          <Mic className="mr-2" /> Mic
        </Button>
      </div>
      {status !== 'inactive' ? (
        <>
          <p className="text-xs text-center text-gray-300 truncate">
            {status === 'playing' && `Playing: ${fileName}`}
            {status === 'listening' && 'Listening to microphone...'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={randomizeMappings}>
              <Wand2 className="mr-2" /> Randomize
            </Button>
            <Button variant="destructive" onClick={stop}>
              <XCircle className="mr-2" /> Stop
            </Button>
          </div>
        </>
      ) : (
        <Button
          variant="outline"
          className="w-full"
          onClick={randomizeMappings}
        >
          <Wand2 className="mr-2" /> Randomize Mappings
        </Button>
      )}
    </div>
  );
};

export default AudioControls;
