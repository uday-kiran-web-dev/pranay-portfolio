import React, { useState } from 'react';
import { Activity, Radio, BarChart3, Sliders } from 'lucide-react';

export function ScopesVisualizer({ scopesData, activePresetName }) {
  const [scopeMode, setScopeMode] = useState('waveform'); // 'waveform' | 'vectorscope' | 'rgbParade'

  const waveformPoints = scopesData?.waveform || [30, 45, 60, 85, 90, 75, 60, 45, 30];
  const rgb = scopesData?.rgbParade || { r: [40, 60, 80, 95], g: [35, 55, 70, 85], b: [45, 65, 85, 75] };
  const vectorAngle = scopesData?.vectorscopeAngle || 45;

  return (
    <div className="bg-cinematic-950/95 border border-white/10 rounded-xl p-4 flex flex-col gap-3 shadow-inner">
      {/* Top Scopes Bar */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Live DaVinci Scopes
          </span>
          <span className="text-[10px] font-mono text-cinematic-400">({activePresetName})</span>
        </div>

        {/* Scope Selector Tabs */}
        <div className="flex items-center gap-1 bg-cinematic-900 rounded-lg p-0.5 border border-white/10">
          <button
            onClick={() => setScopeMode('waveform')}
            className={`px-2 py-1 text-[11px] font-mono rounded transition-all ${
              scopeMode === 'waveform' ? 'bg-amber-500 text-cinematic-950 font-bold' : 'text-cinematic-400 hover:text-white'
            }`}
          >
            Waveform
          </button>
          <button
            onClick={() => setScopeMode('rgbParade')}
            className={`px-2 py-1 text-[11px] font-mono rounded transition-all ${
              scopeMode === 'rgbParade' ? 'bg-amber-500 text-cinematic-950 font-bold' : 'text-cinematic-400 hover:text-white'
            }`}
          >
            RGB Parade
          </button>
          <button
            onClick={() => setScopeMode('vectorscope')}
            className={`px-2 py-1 text-[11px] font-mono rounded transition-all ${
              scopeMode === 'vectorscope' ? 'bg-amber-500 text-cinematic-950 font-bold' : 'text-cinematic-400 hover:text-white'
            }`}
          >
            Vectorscope
          </button>
        </div>
      </div>

      {/* Scopes Canvas Area */}
      <div className="relative h-40 w-full bg-black/80 rounded-lg border border-white/5 overflow-hidden flex items-center justify-center p-2">
        {/* Grid lines / IRE marks */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-2 opacity-25">
          <div className="border-b border-dashed border-white/40 flex justify-between text-[9px] font-mono text-cinematic-400">
            <span>100 IRE (Peak)</span>
          </div>
          <div className="border-b border-dashed border-amber-400/40 flex justify-between text-[9px] font-mono text-amber-400">
            <span>70 IRE (Skin Tone)</span>
          </div>
          <div className="border-b border-dashed border-white/40 flex justify-between text-[9px] font-mono text-cinematic-400">
            <span>18 IRE (Middle Gray)</span>
          </div>
          <div className="border-b border-dashed border-white/40 flex justify-between text-[9px] font-mono text-cinematic-400">
            <span>0 IRE (Black Clip)</span>
          </div>
        </div>

        {/* 1. WAVEFORM MONITOR */}
        {scopeMode === 'waveform' && (
          <div className="relative w-full h-full flex items-end justify-between px-4 z-10">
            {waveformPoints.map((val, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1 w-full max-w-[28px] h-full justify-end">
                <div
                  className="w-full bg-gradient-to-t from-emerald-500/30 via-emerald-400/80 to-amber-300 rounded-t-sm shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-500"
                  style={{ height: `${Math.min(val, 100)}%` }}
                />
              </div>
            ))}
          </div>
        )}

        {/* 2. RGB PARADE */}
        {scopeMode === 'rgbParade' && (
          <div className="relative w-full h-full grid grid-cols-3 gap-2 px-2 z-10">
            {/* RED Channel */}
            <div className="h-full flex items-end justify-around border-r border-white/10 pr-1">
              {rgb.r.map((v, i) => (
                <div
                  key={i}
                  className="w-3 bg-gradient-to-t from-rose-600/40 to-rose-400 rounded-t-sm shadow-[0_0_8px_rgba(244,63,94,0.6)] transition-all duration-500"
                  style={{ height: `${v}%` }}
                />
              ))}
            </div>

            {/* GREEN Channel */}
            <div className="h-full flex items-end justify-around border-r border-white/10 px-1">
              {rgb.g.map((v, i) => (
                <div
                  key={i}
                  className="w-3 bg-gradient-to-t from-emerald-600/40 to-emerald-400 rounded-t-sm shadow-[0_0_8px_rgba(16,185,129,0.6)] transition-all duration-500"
                  style={{ height: `${v}%` }}
                />
              ))}
            </div>

            {/* BLUE Channel */}
            <div className="h-full flex items-end justify-around pl-1">
              {rgb.b.map((v, i) => (
                <div
                  key={i}
                  className="w-3 bg-gradient-to-t from-cyan-600/40 to-cyan-400 rounded-t-sm shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-all duration-500"
                  style={{ height: `${v}%` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* 3. VECTORSCOPE */}
        {scopeMode === 'vectorscope' && (
          <div className="relative w-36 h-36 rounded-full border border-white/20 flex items-center justify-center z-10">
            {/* Crosshairs */}
            <div className="absolute w-full h-[1px] bg-white/20" />
            <div className="absolute h-full w-[1px] bg-white/20" />
            {/* Skin tone line (I-bar at ~135 deg / 57 deg) */}
            <div className="absolute w-full h-[1px] bg-amber-400/50 rotate-[57deg] shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
            
            {/* Target Color Boxes (R, Mg, B, Cy, G, Yl) */}
            <span className="absolute top-2 right-6 text-[8px] font-mono text-rose-400 font-bold">R</span>
            <span className="absolute top-2 left-6 text-[8px] font-mono text-purple-400 font-bold">Mg</span>
            <span className="absolute bottom-2 left-6 text-[8px] font-mono text-cyan-400 font-bold">Cy</span>
            <span className="absolute bottom-2 right-6 text-[8px] font-mono text-emerald-400 font-bold">G</span>
            <span className="absolute right-1 text-[8px] font-mono text-amber-400 font-bold">Yl</span>
            <span className="absolute left-1 text-[8px] font-mono text-blue-400 font-bold">B</span>

            {/* Simulated Color Trace Blob */}
            <div
              className="w-16 h-10 rounded-full bg-cyan-400/30 blur-[6px] border border-amber-400/60 transition-transform duration-700"
              style={{ transform: `rotate(${vectorAngle}deg)` }}
            />
          </div>
        )}
      </div>

      {/* Bottom Scopes Metadata */}
      <div className="flex items-center justify-between text-[11px] font-mono text-cinematic-400 pt-1">
        <div className="flex items-center gap-2">
          <span className="text-amber-400">ODT:</span>
          <span>ACEScc Rec.709 100 nits</span>
        </div>
        <div>
          <span className="text-emerald-400">GAMUT:</span> Wide Intermediate
        </div>
      </div>
    </div>
  );
}

