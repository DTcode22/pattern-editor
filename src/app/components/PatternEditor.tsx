'use client';

import React, { useState, useRef } from 'react';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import PatternCanvas from './patterns/PatternCanvas';
import PatternControlsPanel from './controls/PatternControlsPanel';
import PatternNavigation from './navigation/PatternNavigation';
import { PatternType, CombinedPatternParams } from '../lib/patterns/types';
import {
  defaultVortexParams,
  defaultSpiralParams,
} from '../lib/patterns/defaultParams';

const PatternEditor: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<PatternType>('spiral');
  const [params, setParams] = useState<CombinedPatternParams>({
    ...defaultVortexParams,
    ...defaultSpiralParams,
  });
  const [zoom, setZoom] = useState<number>(1);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handlePatternSelect = (pattern: PatternType) => {
    // Always update the parameters even if the pattern type is the same
    // This ensures we can switch back to default patterns
    setSelectedPattern(pattern);
    setZoom(1); // Reset zoom to default when selecting a default pattern

    if (pattern === 'vortex') {
      setParams(defaultVortexParams);
    } else if (pattern === 'spiral') {
      setParams({
        ...defaultVortexParams,
        ...defaultSpiralParams,
      });
    }
  };

  const handleParamChange = (
    key: keyof CombinedPatternParams,
    value: number
  ) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    if (selectedPattern === 'vortex') {
      setParams(defaultVortexParams);
    } else if (selectedPattern === 'spiral') {
      setParams({
        ...defaultVortexParams,
        ...defaultSpiralParams,
      });
    }
  };

  const handleImport = (
    importedParams: CombinedPatternParams,
    patternType: PatternType,
    newZoom?: number
  ) => {
    setParams(importedParams);
    setSelectedPattern(patternType);
    if (newZoom) {
      setZoom(newZoom);
    } else {
      setZoom(1); // Reset zoom to default if not specified
    }
  };

  return (
    <div className="h-screen w-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25} minSize={20}>
          <PatternControlsPanel
            params={params}
            patternType={selectedPattern}
            canvasRef={canvasRef}
            onParamChange={handleParamChange}
            onReset={handleReset}
            onImport={handleImport}
          />
        </ResizablePanel>

        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={80}>
              <PatternCanvas
                ref={canvasRef}
                params={params}
                patternType={selectedPattern}
                onParamChange={handleParamChange}
                initialZoom={zoom}
              />
            </ResizablePanel>

            <ResizablePanel defaultSize={20}>
              <PatternNavigation
                selectedPattern={selectedPattern}
                onSelectPattern={handlePatternSelect}
                onSelectCustomPattern={handleImport}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default PatternEditor;
