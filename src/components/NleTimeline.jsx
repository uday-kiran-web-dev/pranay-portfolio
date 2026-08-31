import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, ZoomIn, ZoomOut, Scissors, Sparkles, Layers, Clock, Film } from 'lucide-react';
import { TIMELINE_TRACKS, MARKERS } from '../data/timelineData';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

export function NleTimeline() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadPos, setPlayheadPos] = useState(15); // percentage 0-100
  const [activeClip, setActiveClip] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [timecodeStr, setTimecodeStr] = useState('00:00:15:08');

  const animationFrameRef = useRef(null);
  const containerRef = useRef(null);

  // Playhead animation loop
  useEffect(() => {
    if (isPlaying) {
      const step = () => {
        setPlayheadPos((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.15;
        });
        animationFrameRef.current = requestAnimationFrame(step);
      };
      animationFrameRef.current = requestAnimationFrame(step);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  // Update timecode string based on playhead percentage
  useEffect(() => {
    const totalFrames = Math.floor((playheadPos / 100) * 2400); // 100s sequence @ 24fps
    const s = Math.floor(totalFrames / 24);
    const f = totalFrames % 24;
    const m = Math.floor(s / 60);
    const sec = s % 60;

    const pad = (n) => String(n).padStart(2, '0');
    setTimecodeStr(`00:${pad(m)}:${pad(sec)}:${pad(f)}`);
  }, [playheadPos]);

  const handleTimelineClick = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.min(Math.max((clickX / rect.width) * 100, 0), 100);
    setPlayheadPos(percentage);
  };

  const formatSecToTc = (sec) => {
    const s = Math.floor(sec);
    const f = Math.floor((sec - s) * 24);
    return `00:${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}:${String(f).padStart(2, '0')}`;
  };

  return (
    <section id="nle-timeline" className="py-24 relative bg-kage-ink border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Kage Chapter IV Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="rose" size="sm">
                NLE TIMELINE BLUEPRINT
              </Badge>
              <span className="text-xs font-mono text-kage-muted">
                ADOBE PREMIERE PRO MULTI-TRACK ENGINE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Interactive Premiere NLE Sequence
            </h2>
            <p className="text-kage-boneDim text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
              Step inside Pranay's editing timeline. Scrub the playhead, inspect pacing markers, and analyze multi-track video and sound layers.
            </p>
          </div>

          {/* Transport Controls */}
          <div className="flex items-center gap-3 bg-kage-ink2 p-2 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => {
                setPlayheadPos(0);
                setIsPlaying(false);
              }}
              className="p-2 rounded-lg text-kage-boneDim hover:text-white hover:bg-white/5 transition-colors"
              title="Return to Start"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-lg bg-kage-vermilion text-white font-mono text-xs font-bold flex items-center gap-2 shadow-glow-vermilion hover:bg-kage-ember transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>

            {/* Timecode display */}
            <div className="px-3 py-1.5 rounded-lg bg-kage-ink border border-white/10 font-mono text-xs text-kage-ember font-bold">
              {timecodeStr}
            </div>
          </div>
        </div>

        {/* Timeline Sandbox Frame */}
        <div className="origin-card rounded-2xl border border-white/15 overflow-hidden shadow-2xl">
          
          {/* Timeline Toolbar Header */}
          <div className="px-4 py-3 bg-kage-ink2 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs font-mono text-kage-boneDim">
              <span className="flex items-center gap-1.5 text-white font-semibold">
                <Film className="w-3.5 h-3.5 text-kage-vermilion" />
                SEQUENCE: 01_MASTER_ROUGHCUT_ACES
              </span>
              <span className="hidden sm:inline-block text-kage-muted">|</span>
              <span className="hidden sm:inline-block">24.000 FPS</span>
              <span className="hidden sm:inline-block text-kage-muted">|</span>
              <span className="hidden sm:inline-block">DCI 4K (4096x2160)</span>
            </div>

            {/* Zoom Sliders */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
                className="p-1 rounded text-kage-boneDim hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-kage-muted">{Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
                className="p-1 rounded text-kage-boneDim hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Timeline Viewport */}
          <div
            ref={containerRef}
            onClick={handleTimelineClick}
            className="relative bg-kage-ink p-4 min-h-[360px] overflow-x-auto select-none cursor-pointer"
          >
            {/* Time Ruler */}
            <div className="flex justify-between border-b border-white/10 pb-2 mb-3 font-mono text-[10px] text-kage-muted">
              <span>00:00:00:00</span>
              <span>00:00:15:00</span>
              <span>00:00:30:00</span>
              <span>00:00:45:00</span>
              <span>00:01:00:00</span>
            </div>

            {/* Draggable Playhead Red Line */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none transition-all duration-75 flex flex-col items-center"
              style={{ left: `${playheadPos}%` }}
            >
              <div className="w-3 h-3 bg-kage-vermilion rounded-b-sm -mt-0.5 shadow-glow-vermilion" />
              <div className="w-[1.5px] h-full bg-kage-vermilion shadow-[0_0_10px_rgba(224,35,28,0.9)]" />
            </div>

            {/* Tracks Stack */}
            <div className="flex flex-col gap-2 relative z-10" style={{ transform: `scaleX(${zoomLevel})`, transformOrigin: 'left' }}>
              {TIMELINE_TRACKS.map((track) => (
                <div key={track.id} className="flex items-center gap-2 group">
                  {/* Track Label */}
                  <div className="w-14 sm:w-20 shrink-0 text-[11px] font-mono font-bold text-kage-boneDim uppercase">
                    {track.name}
                  </div>

                  {/* Track Lane */}
                  <div className="flex-1 h-10 rounded-lg bg-kage-ink2/90 border border-white/5 relative overflow-hidden flex items-center">
                    {track.clips.map((clip) => {
                      const widthPct = (clip.duration / 60) * 100;
                      const leftPct = (clip.start / 60) * 100;

                      return (
                        <div
                          key={clip.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveClip(clip);
                          }}
                          className={`absolute h-8 rounded px-2.5 flex items-center justify-between text-xs font-mono font-semibold transition-all border shadow-sm cursor-pointer ${
                            clip.color
                          } ${activeClip?.id === clip.id ? 'ring-2 ring-white border-white scale-[1.02] z-20' : 'hover:brightness-110'}`}
                          style={{
                            left: `${leftPct}%`,
                            width: `${Math.max(widthPct, 6)}%`,
                          }}
                        >
                          <span className="truncate">{clip.title}</span>
                          <span className="text-[10px] opacity-80 hidden sm:inline-block ml-1">
                            {clip.duration}s
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Clip Inspector Drawer */}
          {activeClip && (
            <div className="p-4 bg-kage-ink2 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-kage-vermilion animate-pulse" />
                <div>
                  <div className="text-xs font-mono font-bold text-white uppercase">
                    Selected Clip: {activeClip.title}
                  </div>
                  <div className="text-[11px] text-kage-muted font-mono mt-0.5">
                    Duration: {activeClip.duration}s • Format: ProRes 4444 XQ • Shot on Alexa LF 4.5K
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveClip(null)}
                className="text-xs font-mono text-kage-muted hover:text-white px-3 py-1 rounded bg-white/5"
              >
                Close Inspector
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
