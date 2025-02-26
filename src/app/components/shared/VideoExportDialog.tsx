'use client';

import { useState, useRef } from 'react';
import { VideoExportOptions } from '../../lib/patterns/types';
import { defaultVideoOptions } from '../../lib/patterns/defaultParams';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';

interface VideoExportDialogProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  patternType: string;
}

const VideoExportDialog: React.FC<VideoExportDialogProps> = ({
  canvasRef,
  patternType,
}) => {
  const [videoOptions, setVideoOptions] =
    useState<VideoExportOptions>(defaultVideoOptions);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const exportVideo = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsExporting(true);
    setExportProgress(0);

    // We need to capture the original canvas stream directly
    // instead of making a static copy, to record the animation
    const stream = canvas.captureStream(videoOptions.fps);

    // Try different MIME types in order of preference for better compatibility
    const mimeTypes = [
      'video/webm;codecs=vp9',
      'video/webm;codecs=vp8',
      'video/webm',
    ];

    let selectedMimeType = '';
    for (const mimeType of mimeTypes) {
      if (MediaRecorder.isTypeSupported(mimeType)) {
        selectedMimeType = mimeType;
        break;
      }
    }

    if (!selectedMimeType) {
      console.error('No supported MIME types found');
      setIsExporting(false);
      return;
    }

    // Use the best codec available and the selected bitrate
    const options: MediaRecorderOptions = {
      mimeType: selectedMimeType,
      videoBitsPerSecond: videoOptions.bitrate,
    };

    try {
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];

      // Request more frequent data chunks for better quality
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        try {
          const blob = new Blob(chunks, { type: selectedMimeType });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `pattern-${patternType}-${
            videoOptions.quality
          }-${new Date().getTime()}.webm`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Error saving video:', error);
        } finally {
          setIsExporting(false);
          setExportProgress(0);
        }
      };

      // Start recording with frequent data collection (smaller time slices = higher quality)
      mediaRecorder.start(20); // Collect data every 20ms for smoother output

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
    } catch (error) {
      console.error('Error setting up media recorder:', error);
      setIsExporting(false);
    }
  };

  const handleFpsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVideoOptions({ ...videoOptions, fps: Number(e.target.value) });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoOptions({ ...videoOptions, duration: Number(e.target.value) });
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const quality = e.target.value as 'low' | 'medium' | 'high';
    // Set appropriate bitrate based on quality
    let bitrate = 4000000; // default for medium

    switch (quality) {
      case 'low':
        bitrate = 1000000; // 1 Mbps
        break;
      case 'medium':
        bitrate = 4000000; // 4 Mbps
        break;
      case 'high':
        bitrate = 8000000; // 8 Mbps
        break;
    }

    setVideoOptions({ ...videoOptions, quality, bitrate });
  };

  return (
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
              onChange={handleDurationChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Frame Rate (FPS)</Label>
            <select
              value={videoOptions.fps}
              onChange={handleFpsChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="15">15 FPS</option>
              <option value="30">30 FPS</option>
              <option value="60">60 FPS</option>
              <option value="120">120 FPS</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Quality</Label>
            <select
              value={videoOptions.quality}
              onChange={handleQualityChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="low">Low (1 Mbps)</option>
              <option value="medium">Medium (4 Mbps)</option>
              <option value="high">High (8 Mbps)</option>
            </select>
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
  );
};

export default VideoExportDialog;
