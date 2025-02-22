'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Download, Video, Save } from 'lucide-react';

// Define interface for parameters
interface PatternParams {
  speed: number;
  scale: number;
  intensity: number;
  distortion: number;
  xOffset: number;
  yOffset: number;
  dotSize: number;
  xMax: number;
  yMax: number;
  step: number;
  xDivisor: number;
  xSubtractor: number;
  yDivisor: number;
  ySubtractor: number;
  oBase: number;
  oDivisor: number;
  sinDivisor: number;
  cosMultiplier: number;
  xKMultiplier: number;
  xScale: number;
  koMultiplier: number;
  yDivFactor: number;
  yScale: number;
  eoMultiplier: number;
}

// Define type for pattern names
type PatternType = 'vortex' | 'other'; // Add other patterns as needed

// Add interface for video export options
interface VideoExportOptions {
  duration: number;
  fps: number;
}

const defaultVideoOptions: VideoExportOptions = {
  duration: 10,
  fps: 120,
};

// All parameters are defined here with their default values.
const defaultParams: PatternParams = {
  // General
  speed: 1,
  scale: 1,
  intensity: 1,
  distortion: 5,
  xOffset: 130,
  yOffset: 70,
  dotSize: 1,
  // Loop settings
  xMax: 200,
  yMax: 200,
  step: 2,
  // k / e calculation
  xDivisor: 10,
  xSubtractor: 10,
  yDivisor: 8,
  ySubtractor: 12,
  // o calculation
  oBase: 2,
  oDivisor: 3,
  // Distortion sine/cosine factors
  sinDivisor: 2,
  cosMultiplier: 0.8,
  // px calculation factors
  xKMultiplier: 4,
  xScale: 0.7,
  koMultiplier: 2,
  // py calculation factors
  yDivFactor: 5,
  yScale: 0.7,
  eoMultiplier: 1,
};

// Interface for slider props
interface SliderProps {
  label: string;
  paramKey: keyof PatternParams;
  min: number;
  max: number;
  step: number;
  isDecimal?: boolean;
}

const PatternEditor: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<PatternType>('vortex');
  const [params, setParams] = useState<PatternParams>(defaultParams);
  const [videoOptions, setVideoOptions] =
    useState<VideoExportOptions>(defaultVideoOptions);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

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
      const time = (Date.now() - startTime) * 0.001 * params.speed;

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

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [params]);

  // Function to export configuration as JSON
  const exportConfiguration = () => {
    const config = {
      params,
      pattern: selectedPattern,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pattern-config-${selectedPattern}-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  // Function to import configuration from JSON
  const importConfiguration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string);
        setParams(config.params);
        setSelectedPattern(config.pattern);
      } catch (error) {
        console.error('Error importing configuration:', error);
      }
    };
    reader.readAsText(file);
  };

  // Function to export video
  const exportVideo = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsExporting(true);
    setExportProgress(0);

    const stream = canvas.captureStream(videoOptions.fps);
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
    });
    mediaRecorderRef.current = mediaRecorder;

    const chunks: BlobPart[] = [];
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pattern-${selectedPattern}-${new Date().getTime()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsExporting(false);
      setExportProgress(0);
    };

    mediaRecorder.start();

    // Stop recording after specified duration
    const duration = videoOptions.duration * 1000; // Convert to milliseconds
    const updateInterval = 100; // Update progress every 100ms
    let elapsed = 0;

    const progressInterval = setInterval(() => {
      elapsed += updateInterval;
      setExportProgress((elapsed / duration) * 100);

      if (elapsed >= duration) {
        clearInterval(progressInterval);
        mediaRecorder.stop();
      }
    }, updateInterval);
  };

  // Helper to render a slider for a given parameter.
  const renderSlider = ({
    label,
    paramKey,
    min,
    max,
    step,
    isDecimal = false,
  }: SliderProps) => (
    <div key={paramKey}>
      <label className="text-sm font-medium">
        {label}: {isDecimal ? params[paramKey].toFixed(1) : params[paramKey]}
      </label>
      <Slider
        value={[params[paramKey]]}
        onValueChange={([value]) =>
          setParams((prev) => ({ ...prev, [paramKey]: value }))
        }
        min={min}
        max={max}
        step={step}
        className="mt-2"
      />
    </div>
  );

  return (
    <div className="h-screen w-screen">
      <ResizablePanelGroup direction="horizontal">
        {/* Left Sidebar: All Parameters */}
        <ResizablePanel defaultSize={25} minSize={20}>
          <div className="h-full bg-gray-500 dark:bg-gray-900">
            <ScrollArea className="h-full p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Parameters</h2>
                <div className="flex gap-2">
                  {/* Export Config Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportConfiguration}
                    title="Export Configuration"
                  >
                    <Save className="h-4 w-4" />
                  </Button>

                  {/* Import Config Button */}
                  <div className="relative">
                    <input
                      type="file"
                      accept=".json"
                      onChange={importConfiguration}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      title="Import Configuration"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Video Export Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isExporting}
                        title="Export Video"
                      >
                        <Video className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Export Video</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Duration (seconds)</Label>
                          <Input
                            type="number"
                            min="1"
                            max="60"
                            value={videoOptions.duration}
                            onChange={(e) =>
                              setVideoOptions((prev) => ({
                                ...prev,
                                duration: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Frame Rate (FPS)</Label>
                          <Input
                            type="number"
                            min="15"
                            max="180"
                            value={videoOptions.fps}
                            onChange={(e) =>
                              setVideoOptions((prev) => ({
                                ...prev,
                                fps: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                        <Button
                          onClick={exportVideo}
                          disabled={isExporting}
                          className="w-full"
                        >
                          {isExporting
                            ? `Exporting... ${Math.round(exportProgress)}%`
                            : 'Start Export'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Parameters sections */}
              <div className="space-y-5">
                {/* General Settings */}
                <h3 className="font-semibold">General</h3>
                {renderSlider({
                  label: 'Speed',
                  paramKey: 'speed',
                  min: 0,
                  max: 2,
                  step: 0.1,
                  isDecimal: true,
                })}
                {renderSlider({
                  label: 'Scale',
                  paramKey: 'scale',
                  min: 0.5,
                  max: 2,
                  step: 0.1,
                  isDecimal: true,
                })}
                {renderSlider({
                  label: 'Intensity',
                  paramKey: 'intensity',
                  min: 0,
                  max: 2,
                  step: 0.1,
                  isDecimal: true,
                })}
                {renderSlider({
                  label: 'Distortion',
                  paramKey: 'distortion',
                  min: 1,
                  max: 10,
                  step: 0.1,
                  isDecimal: true,
                })}
                {renderSlider({
                  label: 'X Offset',
                  paramKey: 'xOffset',
                  min: 0,
                  max: 300,
                  step: 1,
                })}
                {renderSlider({
                  label: 'Y Offset',
                  paramKey: 'yOffset',
                  min: 0,
                  max: 300,
                  step: 1,
                })}
                {renderSlider({
                  label: 'Dot Size',
                  paramKey: 'dotSize',
                  min: 1,
                  max: 5,
                  step: 1,
                })}

                {/* Loop Settings */}
                <h3 className="font-semibold">Loop Settings</h3>
                {renderSlider({
                  label: 'X Max',
                  paramKey: 'xMax',
                  min: 50,
                  max: 400,
                  step: 1,
                })}
                {renderSlider({
                  label: 'Y Max',
                  paramKey: 'yMax',
                  min: 50,
                  max: 400,
                  step: 1,
                })}
                {renderSlider({
                  label: 'Step',
                  paramKey: 'step',
                  min: 1,
                  max: 10,
                  step: 1,
                })}

                {/* k / e Calculation */}
                <h3 className="font-semibold">k / e Calculation</h3>
                {renderSlider({
                  label: 'x Divisor',
                  paramKey: 'xDivisor',
                  min: 1,
                  max: 20,
                  step: 0.1,
                  isDecimal: true,
                })}
                {renderSlider({
                  label: 'x Subtractor',
                  paramKey: 'xSubtractor',
                  min: 0,
                  max: 20,
                  step: 0.1,
                  isDecimal: true,
                })}
                {renderSlider({
                  label: 'y Divisor',
                  paramKey: 'yDivisor',
                  min: 1,
                  max: 20,
                  step: 0.1,
                  isDecimal: true,
                })}
                {renderSlider({
                  label: 'y Subtractor',
                  paramKey: 'ySubtractor',
                  min: 0,
                  max: 20,
                  step: 0.1,
                  isDecimal: true,
                })}

                {/* o Calculation */}
                <h3 className="font-semibold">o Calculation</h3>
                {renderSlider({
                  label: 'o Base',
                  paramKey: 'oBase',
                  min: 0,
                  max: 5,
                  step: 0.1,
                  isDecimal: true,
                })}
                {renderSlider({
                  label: 'o Divisor',
                  paramKey: 'oDivisor',
                  min: 1,
                  max: 10,
                  step: 0.1,
                  isDecimal: true,
                })}

                {/* Distortion Factors */}
                <h3 className="font-semibold">Distortion Factors</h3>
                {renderSlider({
                  label: 'Sin Divisor',
                  paramKey: 'sinDivisor',
                  min: 0.1,
                  max: 10,
                  step: 0.1,
                  isDecimal: true,
                })}
                {renderSlider({
                  label: 'Cos Multiplier',
                  paramKey: 'cosMultiplier',
                  min: 0.1,
                  max: 5,
                  step: 0.1,
                  isDecimal: true,
                })}

                {/* px Calculation */}
                <h3 className="font-semibold">px Calculation</h3>
                {renderSlider({
                  label: 'xK Multiplier',
                  paramKey: 'xKMultiplier',
                  min: 0,
                  max: 10,
                  step: 0.1,
                  isDecimal: true,
                })}
                {renderSlider({
                  label: 'x Scale',
                  paramKey: 'xScale',
                  min: 0.1,
                  max: 2,
                  step: 0.1,
                  isDecimal: true,
                })}
                {renderSlider({
                  label: 'ko Multiplier',
                  paramKey: 'koMultiplier',
                  min: 0,
                  max: 5,
                  step: 0.1,
                  isDecimal: true,
                })}

                {/* py Calculation */}
                <h3 className="font-semibold">py Calculation</h3>
                {renderSlider({
                  label: 'y Div Factor',
                  paramKey: 'yDivFactor',
                  min: 0,
                  max: 10,
                  step: 0.1,
                  isDecimal: true,
                })}
                {renderSlider({
                  label: 'y Scale',
                  paramKey: 'yScale',
                  min: 0.1,
                  max: 2,
                  step: 0.1,
                  isDecimal: true,
                })}
                {renderSlider({
                  label: 'eo Multiplier',
                  paramKey: 'eoMultiplier',
                  min: 0,
                  max: 5,
                  step: 0.1,
                  isDecimal: true,
                })}

                <Button
                  variant="destructive"
                  onClick={() => setParams(defaultParams)}
                  className="mt-4 w-full"
                >
                  Reset to Default
                </Button>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        {/* Main Content */}
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="vertical">
            {/* Canvas Area */}
            <ResizablePanel defaultSize={80}>
              <div className="h-full w-full bg-black">
                <canvas ref={canvasRef} className="h-full w-full" />
              </div>
            </ResizablePanel>

            {/* Bottom Sidebar: Pattern Navigation */}
            <ResizablePanel defaultSize={20}>
              <div className="h-full bg-gray-500 dark:bg-gray-900">
                <ScrollArea className="h-full p-4">
                  <h2 className="text-lg font-bold mb-4">Patterns</h2>
                  <div className="space-y-2">
                    <Button
                      variant={
                        selectedPattern === 'vortex' ? 'default' : 'ghost'
                      }
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
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default PatternEditor;
