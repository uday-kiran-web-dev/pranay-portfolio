import React, { useState } from 'react';
import { Volume2, VolumeX, Mic, Music, Waves, Flame, Sparkles, Sliders, Play, Pause } from 'lucide-react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

export function StemsAudioMixer() {
  const [stems, setStems] = useState([
    { id: 'dialogue', name: 'Dialogue & ADR', icon: Mic, color: 'text-amber-400', volume: 85, muted: false, solo: false },
    { id: 'foley', name: 'Foley & Tactical SFX', icon: Flame, color: 'text-rose-400', volume: 75, muted: false, solo: false },
    { id: 'ambience', name: 'Environment & Room Tone', icon: Waves, color: 'text-cyan-400', volume: 60, muted: false, solo: false },
    { id: 'score', name: 'Cinematic Score & Bass', icon: Music, color: 'text-emerald-400', volume: 70, muted: false, solo: false },
  ]);

  const [isPlayingMix, setIsPlayingMix] = useState(true);

  const toggleMute = (id) => {
    setStems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, muted: !s.muted } : s))
    );
  };

  const toggleSolo = (id) => {
    setStems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, solo: !s.solo } : s))
    );
  };

  const handleVolumeChange = (id, newVol) => {
    setStems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, volume: Number(newVol) } : s))
    );
  };

  const isAnySolo = stems.some((s) => s.solo);

  return (
    <section id="sound-mixer" className="py-24 relative bg-kage-ink/95 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Kage Chapter V Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="rose" size="sm">
                SOUND DESIGN DESK
              </Badge>
              <span className="text-xs font-mono text-kage-muted">
                5.1 SURROUND & SPATIAL AUDIO STEMS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Sound Design & Foley Mixer
            </h2>
            <p className="text-kage-boneDim text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
              Experience the multi-stem sound architecture behind my edits. Solo the tactical foley, balance dialogue clarity, or mute the musical score to hear spatial environmental textures.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-kage-ink2 p-2 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => setIsPlayingMix(!isPlayingMix)}
              className="px-4 py-2 rounded-lg bg-kage-vermilion text-white font-mono text-xs font-bold flex items-center gap-2 shadow-glow-vermilion hover:bg-kage-ember transition-all"
            >
              {isPlayingMix ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlayingMix ? 'STOP BUS' : 'PLAY 4-STEM BUS'}</span>
            </button>
          </div>
        </div>

        {/* 4-Stem Audio Mixing Board Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stems.map((stem) => {
            const Icon = stem.icon;
            const isAudible = isAnySolo ? stem.solo : !stem.muted;

            return (
              <div
                key={stem.id}
                className={`origin-card rounded-2xl p-6 flex flex-col justify-between transition-all border ${
                  isAudible
                    ? 'border-white/15 shadow-xl'
                    : 'border-white/5 opacity-50 bg-black/40'
                }`}
              >
                {/* Stem Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl bg-kage-ink border border-white/10 ${stem.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white tracking-wide">{stem.name}</h4>
                        <span className="text-[10px] font-mono text-kage-muted uppercase">24-bit 96kHz LPCM</span>
                      </div>
                    </div>
                  </div>

                  {/* Frequency Visualizer Bars */}
                  <div className="h-16 flex items-end gap-1.5 p-2 rounded-xl bg-kage-ink border border-white/5 mb-6 overflow-hidden">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const barHeight = isAudible && isPlayingMix
                        ? Math.max(12, Math.sin((i + Date.now() / 200) * 0.8) * 45 + (stem.volume / 2.5))
                        : 6;

                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-t-sm transition-all duration-75 ${
                            isAudible
                              ? i > 9
                                ? 'bg-kage-vermilion'
                                : i > 6
                                ? 'bg-kage-ember'
                                : 'bg-kage-boneDim'
                              : 'bg-white/10'
                          }`}
                          style={{ height: `${barHeight}%` }}
                        />
                      );
                    })}
                  </div>

                  {/* Volume Slider */}
                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex justify-between text-xs font-mono text-kage-muted">
                      <span>FADER LEVEL</span>
                      <span className="text-white font-bold">{stem.volume}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stem.volume}
                      onChange={(e) => handleVolumeChange(stem.id, e.target.value)}
                      className="w-full accent-kage-vermilion bg-kage-ink rounded-lg h-2 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Solo / Mute Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10">
                  <button
                    onClick={() => toggleSolo(stem.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all ${
                      stem.solo
                        ? 'bg-kage-vermilion text-white shadow-glow-vermilion'
                        : 'bg-kage-ink border border-white/10 text-kage-muted hover:text-white'
                    }`}
                    aria-label={`Solo ${stem.name}`}
                  >
                    {stem.solo ? 'SOLO ON' : 'SOLO'}
                  </button>

                  <button
                    onClick={() => toggleMute(stem.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all ${
                      stem.muted
                        ? 'bg-rose-600 text-white'
                        : 'bg-kage-ink border border-white/10 text-kage-muted hover:text-white'
                    }`}
                    aria-label={`Mute ${stem.name}`}
                  >
                    {stem.muted ? 'MUTED' : 'MUTE'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
