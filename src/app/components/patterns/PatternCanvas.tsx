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

    return (
      <div
        className="h-full w-full bg-black cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    );
  }
);

PatternCanvas.displayName = 'PatternCanvas';

export default PatternCanvas;
