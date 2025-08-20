import { useRef, useEffect } from 'react';
import { usePatternState } from '../context/PatternContext';
import { patternRegistry } from '../lib/patterns/registry';

const usePatternRenderer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const { patternConfig, zoom } = usePatternState();

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

    const animate = () => {
      // Use patternConfig directly to ensure the link between type and params is maintained
      const time =
        (Date.now() - startTime) * 0.001 * patternConfig.params.speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.scale(zoom, zoom);

      if (patternConfig.type === 'vortex') {
        patternRegistry.vortex.render(ctx, canvas, patternConfig.params, time);
      } else if (patternConfig.type === 'spiral') {
        patternRegistry.spiral.render(ctx, canvas, patternConfig.params, time);
      }

      ctx.restore();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [patternConfig, zoom]);

  return canvasRef;
};

export default usePatternRenderer;
