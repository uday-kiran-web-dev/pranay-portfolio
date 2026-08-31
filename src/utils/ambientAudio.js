import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Web Audio API based ambient room-tone synthesizer (subtle pink/brown noise and warm drone)
 */
export function useAmbientSuiteAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscNodeRef = useRef(null);

  const startAudio = useCallback(() => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 2); // Soft ambient volume
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Warm low drone oscillator
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, ctx.currentTime); // A1 note 55Hz warm hum

      const oscFilter = ctx.createBiquadFilter();
      oscFilter.type = 'lowpass';
      oscFilter.frequency.setValueAtTime(120, ctx.currentTime);

      osc.connect(oscFilter);
      oscFilter.connect(masterGain);
      osc.start();
      oscNodeRef.current = osc;

      setIsPlaying(true);
    } catch (e) {
      console.warn('AudioContext not supported or allowed', e);
    }
  }, []);

  const stopAudio = useCallback(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
      setTimeout(() => {
        if (oscNodeRef.current) {
          try {
            oscNodeRef.current.stop();
          } catch (_) {}
        }
        if (audioCtxRef.current) {
          try {
            audioCtxRef.current.close();
          } catch (_) {}
        }
        setIsPlaying(false);
      }, 550);
    } else {
      setIsPlaying(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  }, [isPlaying, startAudio, stopAudio]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (_) {}
      }
    };
  }, []);

  return { isPlaying, toggle, startAudio, stopAudio };
}

