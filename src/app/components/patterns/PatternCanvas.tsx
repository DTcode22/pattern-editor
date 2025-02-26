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
    const canvasRef = usePatternRenderer(params, patternType);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    // Pass the internal ref to the forwarded ref
    React.useImperativeHandle(
      ref,
      () => canvasRef.current as HTMLCanvasElement
    );

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }, []);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent) => {
        if (!isDragging || !onParamChange) return;

        // Calculate the distance moved
        const dx = (e.clientX - dragStart.x) / 3;
        const dy = (e.clientY - dragStart.y) / 3;

        // Update the drag start position for the next move
        setDragStart({ x: e.clientX, y: e.clientY });

        // Update offset parameters (moving in the opposite direction of drag)
        // Scale the movement by 1 for a more reasonable ratio
        onParamChange('xOffset', params.xOffset + dx);
        onParamChange('yOffset', params.yOffset + dy);
      },
      [isDragging, dragStart, params.xOffset, params.yOffset, onParamChange]
    );

    const handleMouseUp = useCallback(() => {
      setIsDragging(false);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsDragging(false);
    }, []);

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
      <div
        className="h-full w-full bg-black cursor-move relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
      >
        <canvas
          ref={canvasRef}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
          }}
          className="h-full w-full"
        />
        <div className="absolute top-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
          Position: ( {params.xOffset.toFixed(1)}, {params.yOffset.toFixed(1)} )
          | Zoom: {zoom.toFixed(1)}
        </div>
        <div className="absolute bottom-2 right-2 space-x-1">
          <button
            onClick={handleZoomOut}
            className="bg-white text-black px-2 py-1 rounded"
          >
            -
          </button>
          <button
            onClick={handleZoomIn}
            className="bg-white text-black px-2 py-1 rounded"
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
