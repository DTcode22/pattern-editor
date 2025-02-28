import { useRef, useEffect } from 'react';
import {
  PatternType,
  CombinedPatternParams,
  ParameterAnimation,
} from '../lib/patterns/types';
import { defaultEmergenceAnimations } from '../lib/patterns/defaultParams';

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
  const animatedParamsRef = useRef<CombinedPatternParams>({ ...params });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Update animated params reference when params change
    animatedParamsRef.current = { ...params };

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const startTime = Date.now();

    // Function to apply parameter animations
    const applyParameterAnimations = (
      baseParams: CombinedPatternParams,
      animations: ParameterAnimation[],
      time: number
    ): CombinedPatternParams => {
      const result = { ...baseParams };

      animations.forEach((animation) => {
        const { parameter, startValue, endValue, duration, easing } = animation;
        const cyclePosition = (time % duration) / duration;
        let factor;

        // Apply easing function
        switch (easing) {
          case 'sinusoidal':
            factor =
              (Math.sin(cyclePosition * Math.PI * 2 - Math.PI / 2) + 1) / 2;
            break;
          case 'quadratic':
            factor =
              cyclePosition < 0.5
                ? 2 * cyclePosition * cyclePosition
                : 1 - Math.pow(-2 * cyclePosition + 2, 2) / 2;
            break;
          case 'exponential':
            factor =
              cyclePosition < 0.5
                ? Math.pow(2, 10 * cyclePosition - 10) / 2
                : (2 - Math.pow(2, -10 * cyclePosition + 10)) / 2;
            break;
          case 'cubic':
            factor =
              cyclePosition < 0.5
                ? 4 * cyclePosition * cyclePosition * cyclePosition
                : 1 - Math.pow(-2 * cyclePosition + 2, 3) / 2;
            break;
          default:
            factor = cyclePosition;
        }

        // Apply the animated value to the parameter
        if (parameter in result) {
          result[parameter as keyof CombinedPatternParams] = (startValue +
            (endValue - startValue) * factor) as never;
        }
      });

      return result;
    };

    // Get custom animations from localStorage if available
    const getCustomAnimations = (): ParameterAnimation[] => {
      try {
        const storedAnimations = localStorage.getItem('emergenceAnimations');
        if (storedAnimations) {
          const parsedAnimations = JSON.parse(storedAnimations);
          if (Array.isArray(parsedAnimations) && parsedAnimations.length > 0) {
            console.log('Using custom animations from localStorage');
            return parsedAnimations;
          }
        }
      } catch (error) {
        console.error('Error reading animations from localStorage:', error);
      }
      return defaultEmergenceAnimations;
    };

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
      // Calculate cycle time for pattern repetition
      const cycleTime = time % (params.cyclePeriod || 30);
      const cycleProgress = cycleTime / (params.cyclePeriod || 30); // 0 to 1 progress through cycle

      // Get animations (custom or default)
      const animations =
        patternType === 'emergence'
          ? getCustomAnimations()
          : defaultEmergenceAnimations;

      // Apply parameter animations for emergence pattern
      const animatedParams =
        patternType === 'emergence'
          ? applyParameterAnimations(params, animations, time)
          : params;

      // Calculate oscillating parameters based on time
      const breathingFactor =
        Math.sin(time / (animatedParams.breathPeriod || 8)) *
          (animatedParams.breathAmplitude || 0.15) +
        (animatedParams.breathBase || 1);
      const rotationFactor =
        Math.sin(time / (animatedParams.rotationPeriod || 15)) *
          (animatedParams.rotationAmplitude || 0.8) +
        (animatedParams.rotationBase || 0.2);
      const waveFactor =
        Math.sin(time / (animatedParams.wavePeriod || 10)) *
          (animatedParams.waveAmplitude || 12) +
        (animatedParams.waveBase || 8);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = animatedParams.backgroundColor || 'rgb(5, 5, 15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Performance optimization: Calculate total points before rendering
      let totalPoints = 0;
      const maxPoints = 10000; // Limit total points to prevent browser crashes
      const rMin = animatedParams.rMin || 5;
      const rMax = animatedParams.rMax || 80;
      const rStep = animatedParams.rStep || 3;
      const densityFactor = animatedParams.densityFactor || 0.6;

      // Calculate total points
      for (let r = rMin; r <= rMax; r += rStep) {
        totalPoints += Math.floor(r * densityFactor);
      }

      // Calculate density scaling factor if needed
      const scaleFactor = totalPoints > maxPoints ? maxPoints / totalPoints : 1;

      // Draw the pattern
      for (let r = rMin; r <= rMax; r += rStep) {
        // Calculate points around a circle with density scaling
        const pointCount = Math.floor(r * densityFactor * scaleFactor);

        // Skip if no points to draw
        if (pointCount <= 0) continue;

        for (let i = 0; i < pointCount; i++) {
          try {
            // Base angle with cycle progression for rotation over time
            const angle =
              (i / pointCount) * Math.PI * 2 +
              cycleProgress * Math.PI * 2 * 0.1;

            // Calculate modifiers based on radius and angle
            const radiusModifier =
              1 +
              Math.sin(
                r / (animatedParams.radiusDivisor || 10) +
                  time * (animatedParams.radiusTimeFactor || 0.5)
              ) *
                (animatedParams.radiusAmplitude || 0.2);
            const angleModifier =
              Math.sin(
                angle * (animatedParams.angleFrequency || 3) +
                  time * (animatedParams.angleTimeFactor || 0.3)
              ) * (animatedParams.angleAmplitude || 0.4);

            // Modified radius and angle with cycle influence
            const modifiedRadius =
              r *
              radiusModifier *
              breathingFactor *
              (1 + Math.sin(cycleProgress * Math.PI * 2) * 0.05);
            const modifiedAngle =
              angle + angleModifier + (r / rMax) * rotationFactor;

            // Calculate coordinates
            const x = Math.cos(modifiedAngle) * modifiedRadius;
            const y = Math.sin(modifiedAngle) * modifiedRadius;

            // Add wave distortion with cycle influence
            const waveDistortion =
              Math.sin(
                angle * (animatedParams.waveFrequency || 4) +
                  time * (animatedParams.waveTimeFactor || 0.5) +
                  cycleProgress * Math.PI * 2
              ) *
              waveFactor *
              (r / rMax);
            const finalX = x + waveDistortion * Math.cos(angle + Math.PI / 2);
            const finalY = y + waveDistortion * Math.sin(angle + Math.PI / 2);

            // Scale and offset
            const px =
              finalX * (animatedParams.scale || 1.6) +
              (animatedParams.xOffset || 200);
            const py =
              finalY * (animatedParams.scale || 1.6) +
              (animatedParams.yOffset || 200);

            // Color based on position and time with cycle influence
            const hue =
              ((angle / (Math.PI * 2)) * (animatedParams.hueRange || 60) +
                time * (animatedParams.hueSpeed || 10) +
                cycleProgress * 30) % // Add cycle-based hue shift
              360;
            const saturation =
              (animatedParams.baseSaturation || 80) -
              (r / rMax) * (animatedParams.saturationRange || 30);
            const lightness =
              (animatedParams.baseLightness || 50) +
              (r / rMax) * (animatedParams.lightnessRange || 20) +
              Math.sin(angle * 3 + time + cycleProgress * Math.PI) *
                (animatedParams.lightnessPulse || 10);

            ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

            // Size variation based on radius with cycle influence
            const dotSizeVariation =
              (animatedParams.dotSize || 1.5) *
              (1 -
                (r / rMax) * (animatedParams.dotSizeVariationFactor || 0.5)) *
              (1 + Math.sin(cycleProgress * Math.PI * 4) * 0.1); // Subtle size pulsing based on cycle

            ctx.beginPath();
            ctx.arc(
              (px * canvas.width) / 400,
              (py * canvas.height) / 400,
              Math.max(0.5, dotSizeVariation),
              0,
              Math.PI * 2
            );
            ctx.fill();
          } catch (error) {
            // Silently catch any rendering errors to prevent crashes
            console.error('Error rendering emergence pattern:', error);
          }
        }
      }
    };

    const animate = () => {
      const time = (Date.now() - startTime) * 0.001 * params.speed;

      // Clear canvas with proper alpha compositing for better performance
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply transformations
      ctx.save();
      ctx.scale(zoom, zoom);

      // Render the appropriate pattern
      try {
        if (patternType === 'vortex') {
          renderVortexPattern(ctx, canvas, params, time);
        } else if (patternType === 'spiral') {
          renderSpiralPattern(ctx, canvas, params, time);
        } else if (patternType === 'emergence') {
          renderEmergencePattern(ctx, canvas, params, time);
        }
      } catch (error) {
        console.error('Error rendering pattern:', error);
      }

      // Restore canvas state
      ctx.restore();

      // Request next frame
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
