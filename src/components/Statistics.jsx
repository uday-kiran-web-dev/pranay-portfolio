import React from 'react';
import { profile } from '../data/profile';

export function Statistics() {
  const statsList = [
    { value: profile.stats.brands, label: profile.stats.brandsLabel },
    { value: profile.stats.shortFilms, label: profile.stats.shortFilmsLabel },
    { value: profile.stats.experience, label: profile.stats.experienceLabel },
    { value: profile.stats.passion, label: profile.stats.passionLabel, accent: true },
  ];

  return (
    <section id="stats" className="py-12 sm:py-16 relative bg-kage-ink/80 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          
          {/* Numbers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full lg:w-3/4">
            {statsList.map((stat, idx) => (
              <div
                key={idx}
                className={`text-center sm:text-left ${
                  idx !== 0 ? 'sm:border-l sm:border-white/10 sm:pl-6' : ''
                }`}
              >
                <div
                  className={`text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold leading-none mb-2 ${
                    stat.accent ? 'text-cyan-400 drop-shadow-[0_0_20px_rgba(0,229,255,0.6)]' : 'text-white'
                  }`}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-kage-boneDim font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Right handwritten caption with blue/cyan glow */}
          <div className="font-serif italic text-2xl sm:text-3xl text-kage-bone -rotate-6 select-none shrink-0 lg:text-right text-center opacity-90 drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            More Stories<br />
            <span className="text-cyan-400 font-semibold">to Create...</span>
          </div>

        </div>
      </div>
    </section>
  );
}
