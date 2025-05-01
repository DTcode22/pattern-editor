'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { CombinedPatternParams, PatternType } from '../../lib/patterns/types';
import VideoExportDialog from '../shared/VideoExportDialog';
import GeneralControls from './GeneralControls';
import LoopControls from './LoopControls';
import SpiralSpecificControls from './SpiralSpecificControls';
import VortexSpecificControls from './VortexSpecificControls';
import { Save, Upload, Video } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
        {/* Action Buttons */}
        <div className="bg-white/10 backdrop-blur-xs rounded-lg p-4 mb-4">
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center p-4 h-auto"
              onClick={() => {
                const config = {
                  params,
                  pattern: patternType,
                  timestamp: new Date().toISOString(),
                };
                const blob = new Blob([JSON.stringify(config, null, 2)], {
                  type: 'application/json',
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `pattern-config-${patternType}-${new Date().getTime()}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
            >
              <Save className="h-6 w-6 mb-2" />
              <span className="text-xs">Save as JSON</span>
            </Button>

            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onload = (e) => {
                    try {
                      const config = JSON.parse(e.target?.result as string);
                      onImport(config.params, config.pattern);
                    } catch (error) {
                      console.error('Error importing configuration:', error);
                    }
                  };
                  reader.readAsText(file);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button
                variant="outline"
                className="flex flex-col items-center justify-center p-4 h-auto w-full"
              >
                <Upload className="h-6 w-6 mb-2" />
                <span className="text-xs">Upload JSON</span>
              </Button>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center p-4 h-auto"
                >
                  <Video className="h-6 w-6 mb-2" />
                  <span className="text-xs">Record Video</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Export Video</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <VideoExportDialog
                    canvasRef={canvasRef}
                    patternType={patternType}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-white">Parameters</h2>
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
