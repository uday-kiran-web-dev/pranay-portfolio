import React from 'react';
import { Film, Sparkles, PlaySquare, Volume2, Layers } from 'lucide-react';
import { services } from '../data/services';
import { Badge } from './ui/Badge';

export function Services() {
  const getIcon = (id) => {
    switch (id) {
      case '01':
        return <Film className="w-6 h-6 text-kage-ember stroke-[1.8]" />;
      case '02':
        return <Sparkles className="w-6 h-6 text-kage-gold stroke-[1.8]" />;
      case '03':
        return <PlaySquare className="w-6 h-6 text-cyan-400 stroke-[1.8]" />;
      case '04':
        return <Volume2 className="w-6 h-6 text-emerald-400 stroke-[1.8]" />;
      case '05':
        return <Layers className="w-6 h-6 text-rose-400 stroke-[1.8]" />;
      default:
        return <Film className="w-6 h-6 text-kage-ember stroke-[1.8]" />;
    }
  };

  return (
    <section id="services" className="py-24 relative bg-kage-ink border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="rose" size="sm">
              WHAT I DO
            </Badge>
            <span className="text-xs font-mono text-kage-muted">
              POST-PRODUCTION CAPABILITIES
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Specialized Services
          </h2>
          <div className="mt-3 w-16 h-1 bg-kage-vermilion rounded-full shadow-glow-vermilion" />
        </div>

        {/* 5 Horizontally Aligned Glass Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {services.map((item) => (
            <div
              key={item.id}
              className="glass-panel-interactive rounded-3xl p-6 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Clean glass icon container */}
                <div className="mb-6 p-3 w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-kage-vermilion/40 group-hover:bg-kage-vermilion/10 group-hover:scale-105 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  {getIcon(item.id)}
                </div>

                <div className="text-[10px] font-mono text-kage-ember font-bold uppercase tracking-wider mb-1">
                  {item.tag}
                </div>

                <h3 className="text-sm sm:text-base font-display font-bold tracking-wide text-white mb-2 leading-snug group-hover:text-kage-bone transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-kage-boneDim leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-[10px] font-mono text-kage-muted tracking-wider flex items-center justify-between">
                <span>0{item.id}</span>
                <span>// EXPERTISE</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
