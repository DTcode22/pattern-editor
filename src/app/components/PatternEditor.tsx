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

  // Extract pattern type from pathname or default to 'vortex'
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

  // Create a reference to the canvas for video export
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Update route when pattern changes
  useEffect(() => {
    if (selectedPattern === 'vortex') {
      router.push('/');
    } else {
      router.push(`/${selectedPattern}`);
    }
  }, [selectedPattern, router]);

  // Handle pattern selection
  const handlePatternSelect = (pattern: PatternType) => {
    if (pattern === selectedPattern) return;

    setSelectedPattern(pattern);

    // Reset parameters to defaults for selected pattern
    if (pattern === 'vortex') {
      setParams(defaultVortexParams);
    } else if (pattern === 'spiral') {
      setParams({
        ...defaultVortexParams,
        ...defaultSpiralParams,
      });
    }
  };

  // Handle parameter changes
  const handleParamChange = (
    key: keyof CombinedPatternParams,
    value: number
  ) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  // Handle reset to defaults
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

  // Handle config import
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
        {/* Left Sidebar: All Parameters */}
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

        {/* Main Content */}
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="vertical">
            {/* Canvas Area */}
            <ResizablePanel defaultSize={80}>
              <PatternCanvas
                ref={canvasRef}
                params={params}
                patternType={selectedPattern}
                onParamChange={handleParamChange}
              />
            </ResizablePanel>

            {/* Bottom Sidebar: Pattern Navigation */}
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
