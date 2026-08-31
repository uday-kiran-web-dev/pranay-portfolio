import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, FastForward, Smartphone, Monitor } from 'lucide-react';
import { Badge } from './ui/Badge';

export function ShowreelModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(138); // 2:18
  const [playbackRate, setPlaybackRate] = useState(1);
  const [aspectMode, setAspectMode] = useState('16:9'); // '16:9' or '9:16'
  const [activeChapter, setActiveChapter] = useState(0);

  const videoRef = useRef(null);

  const chapters = [
    { title: 'Commercial Cuts', time: 0, tag: '00:00' },
    { title: 'Cyberpunk VFX', time: 32, tag: '00:32' },
    { title: 'Narrative A24 Arc', time: 68, tag: '01:08' },
    { title: 'Music Video Kinetic', time: 104, tag: '01:44' },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && isOpen) {
        e.preventDefault();
        togglePlay();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || duration;
      setCurrentTime(cur);
      setProgress((cur / dur) * 100);

      // detect chapter
      const curChap = [...chapters].reverse().find((c) => cur >= c.time);
      if (curChap) {
        setActiveChapter(chapters.findIndex((c) => c.title === curChap.title));
      }
    }
  };

  const handleSeek = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    const newTime = (newProgress / 100) * (videoRef.current?.duration || duration);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const jumpToChapter = (time, index) => {
    setActiveChapter(index);
    setCurrentTime(time);
    setProgress((time / duration) * 100);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const formatTimecode = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    const f = Math.floor((secs % 1) * 24);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(f).padStart(2, '0')}`;
  };

  const cycleSpeed = () => {
    const speeds = [0.5, 1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackRate(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-reel-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200"
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-5xl bg-kage-ink rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-kage-ink2">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-kage-vermilion animate-pulse" />
            <h3 id="modal-reel-title" className="text-sm sm:text-base font-display font-bold text-white tracking-wide">
              PRANAY // 2025 SHOWREEL MASTER
            </h3>
            <Badge variant="rose" size="sm" className="hidden sm:inline-flex">
              PRORES 4444 XQ
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {/* Aspect mode switcher */}
            <div className="hidden sm:flex items-center bg-cinematic-800 rounded-lg p-0.5 border border-white/10">
              <button
                onClick={() => setAspectMode('16:9')}
                className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md transition-all ${
                  aspectMode === '16:9' ? 'bg-amber-500 text-cinematic-950 font-bold' : 'text-cinematic-300 hover:text-white'
                }`}
                title="16:9 Widescreen Master"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>16:9</span>
              </button>
              <button
                onClick={() => setAspectMode('9:16')}
                className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md transition-all ${
                  aspectMode === '9:16' ? 'bg-amber-500 text-cinematic-950 font-bold' : 'text-cinematic-300 hover:text-white'
                }`}
                title="9:16 Vertical Cut"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>9:16</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-cinematic-300 hover:text-white transition-all"
              aria-label="Close Showreel modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas Container */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[320px] sm:min-h-[460px]">
          <div
            className={`transition-all duration-300 relative w-full flex items-center justify-center ${
              aspectMode === '9:16' ? 'max-w-[290px] aspect-[9/16] my-4' : 'aspect-video'
            }`}
          >
            <video
              ref={videoRef}
              src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-flying-cars-at-night-42861-large.mp4"
              poster="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80"
              autoPlay
              playsInline
              loop
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => {
                if (videoRef.current) setDuration(videoRef.current.duration);
              }}
              className="w-full h-full object-cover rounded-lg shadow-2xl cursor-pointer"
              onClick={togglePlay}
            />

            {/* Subtle Film Grain CRT overlay */}
            <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-lg" />
          </div>
        </div>

        {/* Chapters Strip */}
        <div className="px-4 py-2 bg-cinematic-950/80 border-t border-white/5 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-mono text-cinematic-400 shrink-0 uppercase">Chapters:</span>
          {chapters.map((chap, idx) => (
            <button
              key={chap.title}
              onClick={() => jumpToChapter(chap.time, idx)}
              className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-medium font-mono transition-all flex items-center gap-1.5 ${
                activeChapter === idx
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                  : 'bg-cinematic-900 border border-white/5 text-cinematic-400 hover:text-white'
              }`}
            >
              <span className="text-amber-400/70">{chap.tag}</span>
              <span>{chap.title}</span>
            </button>
          ))}
        </div>

        {/* Bottom Playback Control Bar */}
        <div className="p-4 bg-cinematic-900 border-t border-white/10 flex flex-col gap-3">
          {/* Scrubber Range */}
          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1.5 bg-cinematic-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
              aria-label="Video scrubber"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* Left controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-cinematic-950 font-bold transition-all"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    setProgress(0);
                    setCurrentTime(0);
                  }
                }}
                className="p-2 rounded-lg bg-cinematic-800 hover:bg-cinematic-700 text-cinematic-300 hover:text-white transition-all"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-lg bg-cinematic-800 hover:bg-cinematic-700 text-cinematic-300 hover:text-white"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setVolume(val);
                    setIsMuted(val === 0);
                    if (videoRef.current) videoRef.current.volume = val;
                  }}
                  className="w-16 sm:w-20 h-1 bg-cinematic-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  aria-label="Volume slider"
                />
              </div>

              {/* Timecode */}
              <div className="font-mono text-xs text-cinematic-200">
                <span className="text-amber-400 font-semibold">{formatTimecode(currentTime)}</span>
                <span className="text-cinematic-500 mx-1">/</span>
                <span>{formatTimecode(duration)}</span>
              </div>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={cycleSpeed}
                className="px-2.5 py-1 rounded bg-cinematic-800 hover:bg-cinematic-700 text-xs font-mono text-amber-400 border border-white/10"
                title="Playback Speed"
              >
                {playbackRate}x
              </button>
              
              <button
                onClick={() => {
                  if (videoRef.current?.requestFullscreen) {
                    videoRef.current.requestFullscreen();
                  }
                }}
                className="p-2 rounded-lg bg-cinematic-800 hover:bg-cinematic-700 text-cinematic-300 hover:text-white hidden sm:inline-flex"
                title="Fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

