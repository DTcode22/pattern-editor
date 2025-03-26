'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { CombinedPatternParams, PatternType } from '../../lib/patterns/types';
import ConfigControls from '../shared/ConfigControls';
import VideoExportDialog from '../shared/VideoExportDialog';
import GeneralControls from './GeneralControls';
import LoopControls from './LoopControls';
import SpiralSpecificControls from './SpiralSpecificControls';
import VortexSpecificControls from './VortexSpecificControls';

interface PatternControlsPanelProps {
  params: CombinedPatternParams;
  patternType: PatternType;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onParamChange: (key: keyof CombinedPatternParams, value: number) => void;
  onReset: () => void;
  onImport: (params: CombinedPatternParams, patternType: PatternType) => void;
}

const PatternControlsPanel: React.FC<PatternControlsPanelProps> = ({
  params,
  patternType,
  canvasRef,
  onParamChange,
  onReset,
  onImport,
}) => {
  return (
    <div className="h-full bg-zinc-800">
      <ScrollArea className="h-full p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">Parameters</h2>
          <div className="flex gap-2">
            <ConfigControls
              params={params}
              patternType={patternType}
              onImport={onImport}
            />
            <VideoExportDialog
              canvasRef={canvasRef}
              patternType={patternType}
            />
          </div>
        </div>
        <div className="space-y-5">
          <div className="bg-white/10 backdrop-blur-xs rounded-lg p-4">
            <GeneralControls params={params} onChange={onParamChange} />
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-lg p-4">
            <LoopControls params={params} onChange={onParamChange} />
          </div>
          {patternType === 'vortex' && (
            <div className="bg-white/10 backdrop-blur-xs rounded-lg p-4">
              <VortexSpecificControls
                params={params}
                onChange={onParamChange}
              />
            </div>
          )}
          {patternType === 'spiral' && (
            <div className="bg-white/10 backdrop-blur-xs rounded-lg p-4">
              <SpiralSpecificControls
                params={params}
                onChange={onParamChange}
              />
            </div>
          )}
          <div className="bg-white/10 backdrop-blur-xs rounded-lg p-4">
            <Button variant="destructive" onClick={onReset} className="w-full">
              Reset to Default
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PatternControlsPanel;
