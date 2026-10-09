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
        videoRef.current.play().catch(() => {});
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
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200"
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-5xl glass-panel rounded-3xl overflow-hidden flex flex-col max-h-[92vh] shadow-2xl">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
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
            <div className="hidden sm:flex items-center bg-white/[0.04] rounded-xl p-0.5 border border-white/10">
              <button
                onClick={() => setAspectMode('16:9')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg transition-all cursor-pointer ${
                  aspectMode === '16:9' ? 'bg-kage-vermilion text-white font-bold shadow-glow-vermilion' : 'text-kage-boneDim hover:text-white'
                }`}
                title="16:9 Widescreen Master"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>16:9</span>
              </button>
              <button
                onClick={() => setAspectMode('9:16')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg transition-all cursor-pointer ${
                  aspectMode === '9:16' ? 'bg-kage-vermilion text-white font-bold shadow-glow-vermilion' : 'text-kage-boneDim hover:text-white'
                }`}
                title="9:16 Vertical Cut"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>9:16</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-kage-boneDim hover:text-white transition-all cursor-pointer"
              aria-label="Close Showreel modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas Container */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[440px]">
          <div
            className={`transition-all duration-300 w-full h-full flex items-center justify-center ${
              aspectMode === '9:16' ? 'max-w-[280px] sm:max-w-[340px] aspect-[9/16]' : 'w-full aspect-video'
            }`}
          >
            <video
              ref={videoRef}
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              poster="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=85"
              autoPlay
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>

          {/* Quick Play/Pause Center Indicator */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-kage-vermilion text-white flex items-center justify-center shadow-[0_0_30px_rgba(224,35,28,0.8)]">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Showreel Controls & Chapter Strip */}
        <div className="p-4 sm:p-5 bg-white/[0.02] border-t border-white/10 flex flex-col gap-3">
          
          {/* Chapter Markers Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {chapters.map((ch, idx) => (
              <button
                key={ch.title}
                onClick={() => jumpToChapter(ch.time, idx)}
                className={`px-3 py-1.5 rounded-xl text-left border text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                  activeChapter === idx
                    ? 'bg-white/[0.08] border-kage-vermilion text-white shadow-glow-vermilion'
                    : 'bg-white/[0.02] border-white/10 text-kage-muted hover:text-white'
                }`}
              >
                <span className="truncate">{ch.title}</span>
                <span className="text-[10px] text-kage-ember font-bold shrink-0 ml-1">{ch.tag}</span>
              </button>
            ))}
          </div>

          {/* Scrubber Progress Bar */}
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={handleSeek}
              className="w-full accent-kage-vermilion bg-white/10 rounded-lg h-2 cursor-pointer"
            />
          </div>

          {/* Bottom Transport Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-xl bg-kage-vermilion hover:bg-kage-ember text-white transition-all shadow-[0_0_15px_rgba(224,35,28,0.4)] cursor-pointer"
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              {/* Restart */}
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    setProgress(0);
                    setCurrentTime(0);
                  }
                }}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/10 text-kage-boneDim hover:text-white transition-all cursor-pointer border border-white/10"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/10 text-kage-boneDim hover:text-white cursor-pointer border border-white/10"
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
                  className="w-16 sm:w-20 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-kage-vermilion"
                  aria-label="Volume slider"
                />
              </div>

              {/* Timecode */}
              <div className="font-mono text-xs text-kage-boneDim">
                <span className="text-kage-ember font-semibold">{formatTimecode(currentTime)}</span>
                <span className="text-white/30 mx-1">/</span>
                <span>{formatTimecode(duration)}</span>
              </div>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={cycleSpeed}
                className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/10 text-xs font-mono text-kage-ember border border-white/10 cursor-pointer"
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
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/10 text-kage-boneDim hover:text-white hidden sm:inline-flex border border-white/10 cursor-pointer"
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
