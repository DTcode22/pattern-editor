'use client';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Save, Upload, Video } from 'lucide-react';
import React from 'react';
import {
  usePatternState,
  usePatternDispatch,
} from '../../context/PatternContext';
import {
  savePatternConfig,
  loadPatternConfig,
} from '../../lib/patterns/fileUtils';
import VideoExportDialog from '../shared/VideoExportDialog';
import GeneralControls from './GeneralControls';
import LoopControls from './LoopControls';
import SpiralSpecificControls from './SpiralSpecificControls';
import VortexSpecificControls from './VortexSpecificControls';
interface PatternControlsPanelProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}
const PatternControlsPanel: React.FC<PatternControlsPanelProps> = ({
  canvasRef,
}) => {
  const { patternConfig } = usePatternState();
  const dispatch = usePatternDispatch();
  const handleParamChange = (key: string, value: number) => {
    dispatch({ type: 'UPDATE_PARAM', payload: { key, value } });
  };
  const handleReset = () => dispatch({ type: 'RESET_PATTERN' });
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const { config } = await loadPatternConfig(file);
      dispatch({ type: 'LOAD_CONFIG', payload: { config } });
    } catch (error) {
      console.error('Error importing configuration:', error);
    }
    event.target.value = '';
  };
  return (
    <div className="h-full bg-zinc-800">
      <ScrollArea className="h-full p-4">
        <div className="bg-white/10 backdrop-blur-xs rounded-lg p-4 mb-4">
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center p-4 h-auto"
              onClick={() => savePatternConfig(patternConfig)}
            >
              <Save className="h-6 w-6 mb-2" />
              <span className="text-xs">Save as JSON</span>
            </Button>
            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
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
                <VideoExportDialog
                  canvasRef={canvasRef}
                  patternType={patternConfig.type}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-white">Parameters</h2>
        </div>
        <div className="space-y-5">
          <div className="bg-white/10 backdrop-blur-xs rounded-lg p-4">
            <GeneralControls
              params={patternConfig.params}
              onChange={handleParamChange}
            />
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-lg p-4">
            <LoopControls
              params={patternConfig.params}
              onChange={handleParamChange}
            />
          </div>

          {patternConfig.type === 'vortex' && (
            <div className="bg-white/10 backdrop-blur-xs rounded-lg p-4">
              <VortexSpecificControls
                params={patternConfig.params}
                onChange={handleParamChange}
              />
            </div>
          )}

          {patternConfig.type === 'spiral' && (
            <div className="bg-white/10 backdrop-blur-xs rounded-lg p-4">
              <SpiralSpecificControls
                params={patternConfig.params}
                onChange={handleParamChange}
              />
            </div>
          )}
          <div className="bg-white/10 backdrop-blur-xs rounded-lg p-4">
            <Button
              variant="destructive"
              onClick={handleReset}
              className="w-full"
            >
              Reset to Default
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
export default PatternControlsPanel;
