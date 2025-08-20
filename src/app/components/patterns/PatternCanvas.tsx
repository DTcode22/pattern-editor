'use client';
import React, { forwardRef, useState, useCallback } from 'react';
import usePatternRenderer from '../../hooks/usePatternRenderer';
import {
  usePatternState,
  usePatternDispatch,
} from '../../context/PatternContext';
const PatternCanvas = forwardRef<HTMLCanvasElement>((props, ref) => {
  const { patternConfig, zoom } = usePatternState();
  const dispatch = usePatternDispatch();
  const canvasRef = usePatternRenderer();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  React.useImperativeHandle(ref, () => canvasRef.current as HTMLCanvasElement);
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const dx = (e.clientX - dragStart.x) / 3;
      const dy = (e.clientY - dragStart.y) / 3;

      setDragStart({ x: e.clientX, y: e.clientY });

      dispatch({
        type: 'UPDATE_PARAM',
        payload: {
          key: 'xOffset',
          value: patternConfig.params.xOffset + dx,
        },
      });
      dispatch({
        type: 'UPDATE_PARAM',
        payload: {
          key: 'yOffset',
          value: patternConfig.params.yOffset + dy,
        },
      });
    },
    [isDragging, dragStart, patternConfig.params, dispatch]
  );
  const handleMouseUpOrLeave = useCallback(() => {
    setIsDragging(false);
  }, []);
  const handleZoom = useCallback(
    (delta: number) => {
      const newZoom = Math.min(5, Math.max(0.1, zoom + delta));
      dispatch({ type: 'SET_ZOOM', payload: newZoom });
    },
    [zoom, dispatch]
  );
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      e.preventDefault();
      handleZoom(e.deltaY < 0 ? 0.1 : -0.1);
    },
    [handleZoom]
  );
  return (
    <div
      className="h-full w-full bg-black cursor-grab active:cursor-grabbing relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onWheel={handleWheel}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="absolute top-2 left-2 text-white text-s bg-black/50 px-2 py-1 rounded">
        Position: ({patternConfig.params.xOffset.toFixed(1)},{' '}
        {patternConfig.params.yOffset.toFixed(1)}) | Zoom: {zoom.toFixed(1)}
      </div>
      <div className="absolute bottom-2 right-2 space-x-2">
        <button
          onClick={() => handleZoom(-0.1)}
          className="bg-white text-black px-5 py-2 rounded"
        >
          -
        </button>
        <button
          onClick={() => handleZoom(0.1)}
          className="bg-white text-black px-4 py-2 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
});
PatternCanvas.displayName = 'PatternCanvas';
export default PatternCanvas;
