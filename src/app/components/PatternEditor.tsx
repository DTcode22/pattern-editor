'use client';
import React, { useRef } from 'react';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import PatternCanvas from './patterns/PatternCanvas';
import PatternControlsPanel from './controls/PatternControlsPanel';
import PatternNavigation from './navigation/PatternNavigation';
const PatternEditor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <div className="h-screen w-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25} minSize={20}>
          <PatternControlsPanel canvasRef={canvasRef} />
        </ResizablePanel>
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={80}>
              <PatternCanvas ref={canvasRef} />
            </ResizablePanel>
            <ResizablePanel defaultSize={20}>
              <PatternNavigation />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
export default PatternEditor;
