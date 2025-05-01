import { useRef, useEffect } from 'react';
import { PatternType, CombinedPatternParams } from '../lib/patterns/types';

interface RenderPattern {
  (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    params: CombinedPatternParams,
    time: number
  ): void;
}

const usePatternRenderer = (
  params: CombinedPatternParams,
  patternType: PatternType,
  zoom: number
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const startTime = Date.now();

    const renderVortexPattern: RenderPattern = (ctx, canvas, params, time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';

      for (let y = 0; y <= params.yMax; y += params.step) {
        for (let x = 0; x <= params.xMax; x += params.step) {
          const k = (x / params.xDivisor - params.xSubtractor) * params.scale;
          const e = (y / params.yDivisor - params.ySubtractor) * params.scale;
          const mag = Math.sqrt(k * k + e * e);
          const o = params.oBase - mag / params.oDivisor;

          const d =
            -params.distortion *
            Math.abs(
              Math.sin(k / params.sinDivisor) *
                Math.cos(e * params.cosMultiplier)
            ) *
            params.intensity;

          const px =
            (x - d * k * params.xKMultiplier + d * k * Math.sin(d + time)) *
              params.xScale +
            k * o * params.koMultiplier +
            params.xOffset;
          const py =
            (y -
              (d * y) / params.yDivFactor +
              d * e * Math.cos(d + time + o) * Math.sin(time + d)) *
              params.yScale +
            e * o * params.eoMultiplier +
            params.yOffset;

          ctx.fillRect(
            (px * canvas.width) / 400,
            (py * canvas.height) / 400,
            params.dotSize,
            params.dotSize
          );
        }
      }
    };

    const renderSpiralPattern: RenderPattern = (ctx, canvas, params, time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';

      for (let y = 0; y <= params.yMax; y += params.step) {
        for (let x = 0; x <= params.xMax; x += params.step) {
          const k = x / params.xDivisor - params.xSubtractor;
          const e = y / params.yDivisor + params.ySubtractor;

          if (Math.abs(k) < 0.001) continue;

          const mag = Math.sqrt(k * k + e * e);
          const o = mag / params.oDivisor;

          const c = (o * e) / params.yDivFactor - time / 8;

          const q =
            x +
            99 +
            Math.tan(1 / k) +
            o *
              k *
              (Math.cos(e * params.cosMultiplier) / 2 +
                Math.cos(y / params.yDivisor) / 0.7) *
              Math.sin(o * params.koMultiplier - time * 2);

          const px = q * params.xScale * Math.sin(c) + params.xOffset;
          const py =
            params.yOffset +
            y * Math.cos(c * params.eoMultiplier - o) -
            (q / 2) * Math.cos(c);

          ctx.fillRect(
            (px * canvas.width) / 400,
            (py * canvas.height) / 400,
            params.dotSize,
            params.dotSize
          );
        }
      }
    };

    const animate = () => {
      const time = (Date.now() - startTime) * 0.001 * params.speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(zoom, zoom);
      if (patternType === 'vortex') {
        renderVortexPattern(ctx, canvas, params, time);
      } else if (patternType === 'spiral') {
        renderSpiralPattern(ctx, canvas, params, time);
      }
      ctx.restore();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [params, patternType, zoom]);

  return canvasRef;
};

export default usePatternRenderer;
