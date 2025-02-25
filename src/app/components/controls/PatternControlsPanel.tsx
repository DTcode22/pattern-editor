'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import GeneralControls from './GeneralControls';
import LoopControls from './LoopControls';
import VortexSpecificControls from './VortexSpecificControls';
import SpiralSpecificControls from './SpiralSpecificControls';
import ConfigControls from '../shared/ConfigControls';
import VideoExportDialog from '../shared/VideoExportDialog';
import { CombinedPatternParams, PatternType } from '../../lib/patterns/types';
import { defaultVortexParams } from '../../lib/patterns/defaultParams';

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
    <div className="h-full bg-gray-500 dark:bg-gray-900">
      <ScrollArea className="h-full p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Parameters</h2>
          <div className="flex gap-2">
            {/* Import/Export Config Controls */}
            <ConfigControls
              params={params}
              patternType={patternType}
              onImport={onImport}
            />

            {/* Video Export Dialog */}
            <VideoExportDialog
              canvasRef={canvasRef}
              patternType={patternType}
            />
          </div>
        </div>

        {/* Parameters sections */}
        <div className="space-y-5">
          {/* General Settings (shared across patterns) */}
          <GeneralControls params={params} onChange={onParamChange} />

          {/* Loop Settings (shared across patterns) */}
          <LoopControls params={params} onChange={onParamChange} />

          {/* Pattern-specific controls */}
          {patternType === 'vortex' && (
            <VortexSpecificControls params={params} onChange={onParamChange} />
          )}

          {patternType === 'spiral' && (
            <SpiralSpecificControls params={params} onChange={onParamChange} />
          )}

          <Button
            variant="destructive"
            onClick={onReset}
            className="mt-4 w-full"
          >
            Reset to Default
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PatternControlsPanel;
