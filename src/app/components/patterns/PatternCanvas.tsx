'use client';

import React, { forwardRef } from 'react';
import usePatternRenderer from '../../hooks/usePatternRenderer';
import { CombinedPatternParams, PatternType } from '../../lib/patterns/types';

interface PatternCanvasProps {
  params: CombinedPatternParams;
  patternType: PatternType;
}

const PatternCanvas = forwardRef<HTMLCanvasElement, PatternCanvasProps>(
  ({ params, patternType }, ref) => {
    const canvasRef = usePatternRenderer(params, patternType);

    // Pass the internal ref to the forwarded ref
    React.useImperativeHandle(
      ref,
      () => canvasRef.current as HTMLCanvasElement
    );

    return (
      <div className="h-full w-full bg-black">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    );
  }
);

PatternCanvas.displayName = 'PatternCanvas';

export default PatternCanvas;
