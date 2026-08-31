import React from 'react';
import { Palette, Video, Film, Sliders, Tv, Radio, Cpu, HardDrive, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { GEAR_CATEGORIES } from '../data/gear';
import { Badge } from './ui/Badge';

export function GearArsenal() {
  const iconMap = {
    Palette,
    Video,
    Film,
    Sliders,
    Tv,
    Radio,
    Cpu,
    HardDrive,
  };

  return (
    <section id="gear" className="py-24 relative bg-cinematic-950/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="cyan" size="sm">
                HARDWARE & SOFTWARE ARSENAL
              </Badge>
              <span className="text-xs font-mono text-cinematic-400">CALIBRATED POST-PRODUCTION SUITE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              The Post Suite & Tech Stack
            </h2>
            <p className="text-cinematic-300 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
              Every cut and color pass is evaluated on reference-grade Flanders Scientific QD-OLEDs and powered by multi-GPU workstation clusters to handle 8K RAW rushes in real-time.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cinematic-900 border border-white/10 flex items-center gap-3 shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-mono font-bold text-white uppercase">CalMAN Certified</div>
              <div className="text-[11px] text-cinematic-400">100% Rec.709 & DCI-P3 Accuracy</div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-12">
          {GEAR_CATEGORIES.map((cat, catIdx) => (
            <div key={catIdx} className="flex flex-col gap-6">
              <h3 className="text-lg font-display font-bold text-white tracking-wide flex items-center gap-2 border-b border-white/5 pb-3">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {cat.category}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cat.items.map((item, i) => {
                  const Icon = iconMap[item.icon] || Cpu;
                  return (
                    <div
                      key={i}
                      className="origin-card rounded-2xl p-5 flex flex-col justify-between group hover:border-amber-500/40 transition-all duration-300"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-cinematic-900 border border-white/10 flex items-center justify-center mb-4 group-hover:border-amber-400/40 group-hover:bg-amber-500/10 transition-all">
                          <Icon className="w-5 h-5 text-amber-400" />
                        </div>

                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/80 font-bold block mb-1">
                          {item.tag}
                        </span>

                        <h4 className="text-base font-semibold text-white tracking-wide">
                          {item.name}
                        </h4>
                      </div>

                      <p className="text-xs text-cinematic-300 mt-4 pt-3 border-t border-white/5 leading-relaxed font-mono">
                        {item.specs}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

