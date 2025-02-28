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
          const k = x / params.xDivisor - params.xSubtractor;
          const e = y / params.yDivisor - params.ySubtractor;
          const o = params.oBase + (k * k + e * e) / params.oDivisor;
          const sine = Math.sin(o / params.sinDivisor + time);
          const cosine = Math.cos(o * params.cosMultiplier + time);
          const px =
            x +
            params.distortion * k * sine * params.xKMultiplier +
            params.xOffset;
          const py =
            y +
            params.distortion * e * cosine * params.eoMultiplier +
            params.yOffset;

          const scaledPx = px * params.scale * (canvas.width / 400);
          const scaledPy = py * params.scale * (canvas.height / 400);

          ctx.fillRect(scaledPx, scaledPy, params.dotSize, params.dotSize);
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
          const e = y / params.yDivisor - params.ySubtractor;
          const o = (k * k + e * e) / params.oDivisor;
          const px =
            k * Math.cos(o * params.cosMultiplier + time) * params.xScale;
          const py = (e * Math.sin(o + time)) / params.yDivFactor;

          const scaledPx = (px + params.xOffset) * (canvas.width / 400);
          const scaledPy = (py + params.yOffset) * (canvas.height / 400);

          ctx.fillRect(scaledPx, scaledPy, params.dotSize, params.dotSize);
        }
      }
    };

    const renderMedusaPattern: RenderPattern = (ctx, canvas, params, time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';

      for (let y = 0; y <= params.yMax; y += params.step) {
        for (let x = 0; x <= params.xMax; x += params.step) {
          const k = x / params.xDivisor! - params.xSubtractor!;
          const e = y / params.yDivisor! - params.ySubtractor!;
          const mag = Math.sqrt(k * k + e * e);
          const o = (mag * mag) / params.magDivisor!;
          const d = params.dBase! + params.dMultiplier! * Math.cos(o);

          const px =
            x +
            d * k * Math.sin(d * params.sinDMultiplier! + o + time) +
            e * Math.cos(e + time) +
            params.pxOffset!;
          const py =
            o * params.oScale! -
            y / params.yScale! -
            d *
              6 *
              Math.cos(
                d * params.cosDMultiplier! + o * params.oMultiplierInCos! + time
              ) +
            params.pyOffset!;

          const scaledPx =
            (px * params.scale + params.xOffset) * (canvas.width / 400);
          const scaledPy =
            (py * params.scale + params.yOffset) * (canvas.height / 400);

          ctx.fillRect(scaledPx, scaledPy, params.dotSize, params.dotSize);
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
      } else if (patternType === 'medusa') {
        renderMedusaPattern(ctx, canvas, params, time);
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
