'use client';

import React, { useRef } from 'react';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import PatternCanvas from './patterns/PatternCanvas';
import PatternControlsPanel from './controls/PatternControlsPanel';
import PatternNavigation from './navigation/PatternNavigation';
import { useAudioAnalyzer } from '../hooks/useAudioAnalyzer';

const PatternEditor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const analyzer = useAudioAnalyzer();

  return (
    <div className="h-screen w-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25} minSize={20}>
          <PatternControlsPanel
            canvasRef={canvasRef}
            audioElementRef={audioElementRef}
            analyzer={analyzer}
          />
        </ResizablePanel>

        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={80}>
              <PatternCanvas ref={canvasRef} audioData={analyzer.audioData} />
            </ResizablePanel>
            <ResizablePanel defaultSize={20}>
              <PatternNavigation />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
      <audio ref={audioElementRef} crossOrigin="anonymous" />
    </div>
  );
};

export default PatternEditor;
