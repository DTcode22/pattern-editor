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
      a.download = `pattern-${patternType}-${new Date().getTime()}.webm`;
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
  );
};

export default VideoExportDialog;
