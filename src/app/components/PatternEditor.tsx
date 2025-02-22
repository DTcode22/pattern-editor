'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const PatternEditor = () => {
  const [selectedPattern, setSelectedPattern] = useState('vortex');
  const [params, setParams] = useState({
    speed: 1,
    scale: 1,
    intensity: 1,
  });

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

    let startTime = Date.now();

    const animate = () => {
      const time = (Date.now() - startTime) * 0.001 * params.speed;

      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render pattern
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';

      const scale = params.scale;
      const intensity = params.intensity;

      for (let y = 0; y <= 200; y += 2) {
        for (let x = 0; x <= 200; x += 2) {
          const k = (x / 8 - 12) * scale;
          const e = (y / 8 - 12) * scale;
          const mag = Math.sqrt(k * k + e * e);
          const o = 2 - mag / 3;
          const d =
            -5 * Math.abs(Math.sin(k / 2) * Math.cos(e * 0.8)) * intensity;
          const px =
            (x - d * k * 4 + d * k * Math.sin(d + time)) * 0.7 +
            k * o * 2 +
            130;
          const py =
            (y -
              (d * y) / 5 +
              d * e * Math.cos(d + time + o) * Math.sin(time + d)) *
              0.7 +
            e * o +
            70;
          ctx.fillRect(
            (px * canvas.width) / 400,
            (py * canvas.height) / 400,
            1,
            1
          );
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [params]);

  return (
    <div className="h-screen w-screen">
      <ResizablePanelGroup direction="horizontal">
        {/* Left Sidebar */}
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className="h-full bg-gray-500 dark:bg-gray-900">
            <ScrollArea className="h-full p-4">
              <h2 className="text-lg font-bold mb-4">Patterns</h2>
              <div className="space-y-2">
                <Button
                  variant={selectedPattern === 'vortex' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedPattern('vortex')}
                >
                  Vortex
                </Button>
                {/* Add more pattern buttons here */}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        {/* Main Content */}
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            {/* Canvas Area */}
            <ResizablePanel defaultSize={80}>
              <div className="h-full w-full bg-black">
                <canvas ref={canvasRef} className="h-full w-full" />
              </div>
            </ResizablePanel>

            {/* Bottom Controls */}
            <ResizablePanel defaultSize={20}>
              <div className=" p-4 bg-gray-500 dark:bg-gray-900">
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium">Speed</label>
                    <Slider
                      value={[params.speed]}
                      onValueChange={([value]) =>
                        setParams((prev) => ({ ...prev, speed: value }))
                      }
                      min={0}
                      max={2}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Scale</label>
                    <Slider
                      value={[params.scale]}
                      onValueChange={([value]) =>
                        setParams((prev) => ({ ...prev, scale: value }))
                      }
                      min={0.5}
                      max={2}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Intensity</label>
                    <Slider
                      value={[params.intensity]}
                      onValueChange={([value]) =>
                        setParams((prev) => ({ ...prev, intensity: value }))
                      }
                      min={0}
                      max={2}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default PatternEditor;
