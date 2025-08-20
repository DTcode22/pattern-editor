'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export interface AudioData {
  bass: number;
  mids: number;
  treble: number;
  overall: number;
}

// Export this for use as an initial value elsewhere
export const initialAudioData: AudioData = {
  bass: 0,
  mids: 0,
  treble: 0,
  overall: 0,
};

export const useAudioAnalyzer = () => {
  const [audioData, setAudioData] = useState<AudioData>(initialAudioData);
  const [status, setStatus] = useState<'inactive' | 'playing' | 'listening'>(
    'inactive'
  );
  const [fileName, setFileName] = useState('');

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<AudioNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (sourceNodeRef.current) {
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    analyserRef.current = null;
    audioContextRef.current = null;
    setAudioData(initialAudioData);
    setStatus('inactive');
    setFileName('');
  }, [setAudioData, setStatus, setFileName]); // FIX: Add stable state setters to dependency array

  const analyze = useCallback(() => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    const bassEnd = Math.floor(bufferLength * (250 / 22050));
    const midsEnd = Math.floor(bufferLength * (2000 / 22050));
    const trebleEnd = Math.floor(bufferLength * (14000 / 22050));

    const bass =
      dataArray.slice(0, bassEnd).reduce((a, b) => a + b, 0) / bassEnd / 255;
    const mids =
      dataArray.slice(bassEnd, midsEnd).reduce((a, b) => a + b, 0) /
      (midsEnd - bassEnd) /
      255;
    const treble =
      dataArray.slice(midsEnd, trebleEnd).reduce((a, b) => a + b, 0) /
      (trebleEnd - midsEnd) /
      255;
    const overall = dataArray.reduce((a, b) => a + b, 0) / bufferLength / 255;

    setAudioData({
      bass: isNaN(bass) ? 0 : bass,
      mids: isNaN(mids) ? 0 : mids,
      treble: isNaN(treble) ? 0 : treble,
      overall: isNaN(overall) ? 0 : overall,
    });

    animationFrameRef.current = requestAnimationFrame(analyze);
  }, [setAudioData]); // FIX: Add stable state setter to dependency array

  const setup = useCallback(
    (sourceNode: AudioNode) => {
      const context = sourceNode.context as AudioContext;
      const analyser = context.createAnalyser();
      analyser.fftSize = 256;
      sourceNode.connect(analyser);
      analyser.connect(context.destination);

      analyserRef.current = analyser;
      sourceNodeRef.current = sourceNode;
      audioContextRef.current = context;

      analyze();
    },
    [analyze]
  );

  const startFromFile = useCallback(
    (audioElement: HTMLAudioElement) => {
      cleanup();
      const context = new AudioContext();
      const source = context.createMediaElementSource(audioElement);
      setup(source);
      audioElement.play();
      setStatus('playing');
    },
    [cleanup, setup, setStatus] // FIX: Add dependencies
  );

  const startFromMic = useCallback(async () => {
    cleanup();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const context = new AudioContext();
      const source = context.createMediaStreamSource(stream);
      setup(source);
      setStatus('listening');
    } catch (err) {
      console.error('Microphone access denied:', err);
      cleanup();
    }
  }, [cleanup, setup, setStatus]); // FIX: Add dependencies

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return {
    audioData,
    status,
    fileName,
    setFileName,
    startFromFile,
    startFromMic,
    stop: cleanup,
  };
};
