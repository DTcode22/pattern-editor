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
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render background
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';

      // Loop through defined iterations using tweakable parameters.
      for (let y = 0; y <= params.yMax; y += params.step) {
        for (let x = 0; x <= params.xMax; x += params.step) {
          // k and e calculation with tweakable divisors and subtractors.
          const k = (x / params.xDivisor - params.xSubtractor) * params.scale;
          const e = (y / params.yDivisor - params.ySubtractor) * params.scale;
          const mag = Math.sqrt(k * k + e * e);
          const o = params.oBase - mag / params.oDivisor;
          // d is calculated using distortion, intensity and tweakable sine/cosine factors.
          const d =
            -params.distortion *
            Math.abs(
              Math.sin(k / params.sinDivisor) *
                Math.cos(e * params.cosMultiplier)
            ) *
            params.intensity;
          // Calculate px and py with additional multipliers and scales.
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
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render background
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';

      // Loop through defined iterations using tweakable parameters
      // We'll use a similar approach to the user's code but maintain our looping structure
      // const pointsPerIteration = (params.xMax * params.yMax) / params.step;
      // const maxPoints = Math.min(20000, pointsPerIteration); // Cap at 20000 points for performance

      for (let y = 0; y <= params.yMax; y += params.step) {
        for (let x = 0; x <= params.xMax; x += params.step) {
          // Calculate k and e using the provided parameters
          const k = x / params.xDivisor - params.xSubtractor;
          const e = y / params.yDivisor + params.ySubtractor;

          // Skip division by zero
          if (Math.abs(k) < 0.001) continue;

          // Calculate magnitude and o
          const mag = Math.sqrt(k * k + e * e);
          const o = mag / params.oDivisor;

          // Calculate c (phase term)
          const c = (o * e) / params.yDivFactor - time / 8;

          // Calculate q (intermediate x-coordinate)
          const q =
            x +
            99 +
            Math.tan(1 / k) +
            o *
              k *
              (Math.cos(e * params.cosMultiplier) / 2 +
                Math.cos(y / params.yDivisor) / 0.7) *
              Math.sin(o * params.koMultiplier - time * 2);

          // Final coordinates
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

    const renderEmergencePattern: RenderPattern = (
      ctx,
      canvas,
      params,
      time
    ) => {
      const cycleTime = time % (params.cyclePeriod || 30);

      // Calculate oscillating parameters based on time
      const breathingFactor =
        Math.sin(time / (params.breathPeriod || 8)) *
          (params.breathAmplitude || 0.15) +
        (params.breathBase || 1);
      const rotationFactor =
        Math.sin(time / (params.rotationPeriod || 15)) *
          (params.rotationAmplitude || 0.8) +
        (params.rotationBase || 0.2);
      const waveFactor =
        Math.sin(time / (params.wavePeriod || 10)) *
          (params.waveAmplitude || 12) +
        (params.waveBase || 8);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = params.backgroundColor || 'rgb(5, 5, 15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the pattern
      for (
        let r = params.rMin || 5;
        r <= (params.rMax || 120);
        r += params.rStep || 2
      ) {
        // Calculate points around a circle
        const pointCount = Math.floor(r * (params.densityFactor || 0.8));

        for (let i = 0; i < pointCount; i++) {
          // Base angle
          const angle = (i / pointCount) * Math.PI * 2;

          // Calculate modifiers based on radius and angle
          const radiusModifier =
            1 +
            Math.sin(
              r / (params.radiusDivisor || 10) +
                time * (params.radiusTimeFactor || 0.5)
            ) *
              (params.radiusAmplitude || 0.2);
          const angleModifier =
            Math.sin(
              angle * (params.angleFrequency || 3) +
                time * (params.angleTimeFactor || 0.3)
            ) * (params.angleAmplitude || 0.4);

          // Modified radius and angle
          const modifiedRadius = r * radiusModifier * breathingFactor;
          const modifiedAngle =
            angle + angleModifier + (r / (params.rMax || 120)) * rotationFactor;

          // Calculate coordinates
          const x = Math.cos(modifiedAngle) * modifiedRadius;
          const y = Math.sin(modifiedAngle) * modifiedRadius;

          // Add wave distortion
          const waveDistortion =
            Math.sin(
              angle * (params.waveFrequency || 4) +
                time * (params.waveTimeFactor || 0.5)
            ) *
            waveFactor *
            (r / (params.rMax || 120));
          const finalX = x + waveDistortion * Math.cos(angle + Math.PI / 2);
          const finalY = y + waveDistortion * Math.sin(angle + Math.PI / 2);

          // Scale and offset
          const px = finalX * (params.scale || 1.6) + (params.xOffset || 200);
          const py = finalY * (params.scale || 1.6) + (params.yOffset || 200);

          // Color based on position and time
          const hue =
            ((angle / (Math.PI * 2)) * (params.hueRange || 60) +
              time * (params.hueSpeed || 10)) %
            360;
          const saturation =
            (params.baseSaturation || 80) -
            (r / (params.rMax || 120)) * (params.saturationRange || 30);
          const lightness =
            (params.baseLightness || 50) +
            (r / (params.rMax || 120)) * (params.lightnessRange || 20) +
            Math.sin(angle * 3 + time) * (params.lightnessPulse || 10);

          ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

          // Size variation based on radius
          const dotSizeVariation =
            (params.dotSize || 1.5) *
            (1 -
              (r / (params.rMax || 120)) *
                (params.dotSizeVariationFactor || 0.5));

          ctx.beginPath();
          ctx.arc(
            (px * canvas.width) / 400,
            (py * canvas.height) / 400,
            Math.max(0.5, dotSizeVariation),
            0,
            Math.PI * 2
          );
          ctx.fill();
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
      } else if (patternType === 'emergence') {
        renderEmergencePattern(ctx, canvas, params, time);
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
