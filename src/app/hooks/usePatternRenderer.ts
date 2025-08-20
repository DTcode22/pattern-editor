import { useRef, useEffect } from 'react';
import { usePatternState } from '../context/PatternContext';
import { patternRegistry } from '../lib/patterns/registry';
import { AudioData } from '../lib/patterns/types';
import { initialAudioData } from './useAudioAnalyzer';

const usePatternRenderer = ({ audioData }: { audioData: AudioData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const { patternConfig, zoom, mappings } = usePatternState();
  const audioDataRef = useRef<AudioData>(initialAudioData);

  useEffect(() => {
    audioDataRef.current = audioData;
  }, [audioData]);

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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.scale(zoom, zoom);

      const currentAudioData = audioDataRef.current;

      const applyMappings = (baseParams: any) => {
        const liveParams = { ...baseParams };
        for (const [param, config] of Object.entries(mappings)) {
          if (config && param in liveParams) {
            const key = param as keyof typeof liveParams;
            const baseValue = liveParams[key];
            const audioValue = currentAudioData[config.feature];

            if (config.mode === 'multiplicative') {
              liveParams[key] =
                baseValue * (1 + audioValue * config.sensitivity);
            } else {
              // additive
              liveParams[key] = baseValue + audioValue * config.sensitivity;
            }
          }
        }
        return liveParams;
      };

      if (patternConfig.type === 'vortex') {
        const liveParams = applyMappings(patternConfig.params);
        const time = (Date.now() - startTime) * 0.001 * liveParams.speed;
        patternRegistry.vortex.render(ctx, canvas, liveParams, time);
      } else if (patternConfig.type === 'spiral') {
        const liveParams = applyMappings(patternConfig.params);
        const time = (Date.now() - startTime) * 0.001 * liveParams.speed;
        patternRegistry.spiral.render(ctx, canvas, liveParams, time);
      }

      ctx.restore();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [patternConfig, zoom, mappings]);

  return canvasRef;
};

export default usePatternRenderer;
