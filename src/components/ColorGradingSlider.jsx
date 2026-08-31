import React, { useState, useRef, useCallback } from 'react';
import { Sliders, Eye, RefreshCw, Cpu, Layers, Sparkles, MoveHorizontal, Check, Zap } from 'lucide-react';
import { COLOR_GRADE_PRESETS } from '../data/colorGradePresets';
import { ScopesVisualizer } from './ScopesVisualizer';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { ScanGridButton } from './originkit/ScanGridButton';
import { NeonBorder } from './originkit/NeonBorder';

export function ColorGradingSlider() {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isBypassed, setIsBypassed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);

  const preset = COLOR_GRADE_PRESETS[activePresetIndex];

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section id="color-grading" className="py-24 relative bg-kage-ink border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Kage Chapter III Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="rose" size="sm">
                COLOR ALCHEMY
              </Badge>
              <span className="text-xs font-mono text-kage-muted">
                DAVINCI RESOLVE STUDIO & ACES 1.3
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Color Grading & Film Emulation
            </h2>
            <p className="text-kage-boneDim text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
              Drag the interactive split-screen slider to inspect raw uncompressed camera sensors versus calibrated final film print emulations and bespoke looks.
            </p>
          </div>

          {/* Bypass Toggle using OriginKit ScanGridButton */}
          <div className="flex items-center gap-3 shrink-0">
            <ScanGridButton
              variant={isBypassed ? 'crimson' : 'amber'}
              size="sm"
              icon={Zap}
              onClick={() => setIsBypassed(!isBypassed)}
            >
              {isBypassed ? 'BYPASS ACTIVE (RAW LOG)' : 'GRADED COLOR PASS'}
            </ScanGridButton>
          </div>
        </div>

        {/* Preset Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {COLOR_GRADE_PRESETS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActivePresetIndex(idx)}
              className={`p-3.5 rounded-xl text-left transition-all border flex flex-col justify-between ${
                activePresetIndex === idx
                  ? 'bg-kage-ink2 border-kage-vermilion/60 shadow-glow-vermilion text-white'
                  : 'bg-kage-ink2/60 border-white/10 hover:border-white/20 text-kage-muted hover:text-kage-bone'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-kage-ember font-semibold block mb-1">
                  {p.category}
                </span>
                <h4 className="text-sm font-semibold text-white tracking-wide">{p.name}</h4>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-kage-muted">
                <span>{p.colorTemp}</span>
                <span className="text-kage-ember">{p.gamma.split(' ')[0]}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Main Split-Screen Comparison Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Comparison Viewport */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black select-none cursor-ew-resize group"
            >
              {/* Graded Image */}
              <img
                src={preset.afterImg}
                alt={`${preset.name} Master Graded`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  isBypassed ? 'opacity-0' : 'opacity-100'
                }`}
              />

              {/* RAW Log Image */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: isBypassed ? '100%' : `${sliderPos}%` }}
              >
                <img
                  src={preset.beforeImg}
                  alt={`${preset.name} Flat RAW Log`}
                  className="absolute inset-y-0 left-0 h-full w-full object-cover max-w-none filter contrast-75 brightness-110 saturate-50"
                  style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
                />

                {/* Left Side Label */}
                <div className="absolute top-4 left-4 z-20">
                  <Badge variant="default" size="sm" className="bg-black/70 backdrop-blur-md border-white/20 text-white font-mono">
                    RAW LOG CAMERA FLAT
                  </Badge>
                </div>
              </div>

              {/* Right Side Label */}
              {!isBypassed && (
                <div className="absolute top-4 right-4 z-20">
                  <Badge variant="rose" size="sm" className="bg-black/70 backdrop-blur-md font-mono">
                    {preset.name.toUpperCase()} (ACES MASTER)
                  </Badge>
                </div>
              )}

              {/* Draggable Divider Line & Knob */}
              {!isBypassed && (
                <div
                  className="absolute inset-y-0 z-30 flex items-center justify-center pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="h-full w-[2px] bg-kage-vermilion shadow-[0_0_12px_rgba(224,35,28,0.8)]" />
                  <div className="absolute w-9 h-9 rounded-full bg-kage-vermilion text-white flex items-center justify-center shadow-lg border-2 border-white pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                    <MoveHorizontal className="w-4 h-4 font-bold" />
                  </div>
                </div>
              )}

              {/* Bottom HUD bar */}
              <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-xs font-mono bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-kage-boneDim pointer-events-none">
                <span>SENSOR: ARRI ALEXA LF 3:2 OPEN GATE</span>
                <span className="text-kage-ember font-semibold">{isBypassed ? 'LOG C3' : preset.gamma}</span>
              </div>
            </div>

            {/* DaVinci Resolve Node Graph */}
            <NeonBorder
              color="#e0231c"
              secondaryColor="#ff5a3c"
              borderRadius="0.75rem"
              className="w-full"
            >
              <div className="p-4 flex flex-col gap-3 bg-kage-ink">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-kage-boneDim">
                    <Layers className="w-4 h-4 text-kage-vermilion" />
                    <span className="font-bold text-white uppercase">Pranay's DaVinci Node Tree</span>
                    <span>(Serial & Parallel Processing)</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400">4 ACTIVE NODES</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {preset.nodes.map((node, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-kage-ink2 border border-kage-vermilion/20 flex flex-col justify-between group hover:border-kage-vermilion/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-kage-ember font-bold">Node 0{i + 1}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                      </div>
                      <div className="text-xs font-semibold text-white leading-snug">{node.name}</div>
                      <div className="text-[10px] font-mono text-kage-muted mt-1">{node.tool}</div>
                    </div>
                  ))}
                </div>
              </div>
            </NeonBorder>
          </div>

          {/* Scopes & Preset Specifications */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <ScopesVisualizer scopesData={preset.scopes} activePresetName={preset.name} />

            <div className="origin-card rounded-xl p-4 flex flex-col gap-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
                Color Grade Telemetry
              </h4>

              <p className="text-xs text-kage-boneDim leading-relaxed">
                {preset.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-white/5">
                <div className="p-2 rounded bg-kage-ink border border-white/5">
                  <div className="text-kage-muted text-[10px]">COLOR TEMP</div>
                  <div className="text-kage-ember font-bold">{preset.colorTemp}</div>
                </div>
                <div className="p-2 rounded bg-kage-ink border border-white/5">
                  <div className="text-kage-muted text-[10px]">TINT OFFSET</div>
                  <div className="text-cyan-400 font-bold">{preset.tint}</div>
                </div>
                <div className="p-2 rounded bg-kage-ink border border-white/5">
                  <div className="text-kage-muted text-[10px]">CONTRAST RATIO</div>
                  <div className="text-emerald-400 font-bold">{preset.contrastRatio}</div>
                </div>
                <div className="p-2 rounded bg-kage-ink border border-white/5">
                  <div className="text-kage-muted text-[10px]">TARGET ODT</div>
                  <div className="text-kage-vermilion font-bold">Rec.709 D65</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
