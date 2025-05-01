'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { useRouter, usePathname } from 'next/navigation';
import PatternCanvas from './patterns/PatternCanvas';
import PatternControlsPanel from './controls/PatternControlsPanel';
import PatternNavigation from './navigation/PatternNavigation';
import { PatternType, CombinedPatternParams } from '../lib/patterns/types';
import {
  defaultVortexParams,
  defaultSpiralParams,
} from '../lib/patterns/defaultParams';

const PatternEditor: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const getPatternTypeFromPath = (): PatternType => {
    if (pathname.includes('/spiral')) return 'spiral';
    return 'vortex';
  };

  const [selectedPattern, setSelectedPattern] = useState<PatternType>(
    getPatternTypeFromPath()
  );
  const [params, setParams] = useState<CombinedPatternParams>(
    selectedPattern === 'vortex'
      ? defaultVortexParams
      : { ...defaultVortexParams, ...defaultSpiralParams }
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (selectedPattern === 'vortex') {
      router.push('/');
    } else {
      router.push(`/${selectedPattern}`);
    }
  }, [selectedPattern, router]);

  const handlePatternSelect = (pattern: PatternType) => {
    if (pattern === selectedPattern) return;

    setSelectedPattern(pattern);

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
    patternType: PatternType
  ) => {
    setParams(importedParams);
    setSelectedPattern(patternType);
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
              />
            </ResizablePanel>

            <ResizablePanel defaultSize={20}>
              <PatternNavigation
                selectedPattern={selectedPattern}
                onSelectPattern={handlePatternSelect}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default PatternEditor;
