'use client';

import React, { forwardRef, useState, useCallback } from 'react';
import usePatternRenderer from '../../hooks/usePatternRenderer';
import { CombinedPatternParams, PatternType } from '../../lib/patterns/types';

interface PatternCanvasProps {
  params: CombinedPatternParams;
  patternType: PatternType;
  onParamChange?: (key: keyof CombinedPatternParams, value: number) => void;
}

const PatternCanvas = forwardRef<HTMLCanvasElement, PatternCanvasProps>(
  ({ params, patternType, onParamChange }, ref) => {
    const [zoom, setZoom] = useState(1);
    const canvasRef = usePatternRenderer(params, patternType, zoom);

    React.useImperativeHandle(
      ref,
      () => canvasRef.current as HTMLCanvasElement
    );

    const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
      e.preventDefault();
      setZoom((prevZoom) => {
        const delta = e.deltaY < 0 ? 0.1 : -0.1;
        const newZoom = Math.min(5, Math.max(0.1, prevZoom + delta));
        return newZoom;
      });
    }, []);

    const handleZoomIn = useCallback(() => {
      setZoom((prevZoom) => Math.min(5, prevZoom + 0.1));
    }, []);

    const handleZoomOut = useCallback(() => {
      setZoom((prevZoom) => Math.max(0.1, prevZoom - 0.1));
    }, []);

    return (
      <div className="h-full w-full bg-black relative" onWheel={handleWheel}>
        <canvas ref={canvasRef} className="h-full w-full" />
        <div className="absolute top-2 left-2 text-white text-s bg-black/50 px-2 py-1 rounded">
          Position: ( {params.xOffset.toFixed(1)}, {params.yOffset.toFixed(1)} )
          | Zoom: {zoom.toFixed(1)}
        </div>
        <div className="absolute bottom-2 right-2 space-x-2">
          <button
            onClick={handleZoomOut}
            className="bg-white text-black px-5 py-2 rounded"
          >
            -
          </button>
          <button
            onClick={handleZoomIn}
            className="bg-white text-black px-4 py-2 rounded"
          >
            +
          </button>
        </div>
      </div>
    );
  }
);

PatternCanvas.displayName = 'PatternCanvas';

export default PatternCanvas;
