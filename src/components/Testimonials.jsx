import React from 'react';
import { Star, Quote, Award, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';
import { Badge } from './ui/Badge';

export function Testimonials() {
  return (
    <section className="py-24 relative bg-cinematic-950 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <Badge variant="amber" size="sm" className="mb-3">
            DIRECTOR & PRODUCER ENDORSEMENTS
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Trusted by World-Class Storytellers
          </h2>
          <p className="text-cinematic-300 text-sm sm:text-base mt-3 leading-relaxed">
            Collaborating seamlessly with directors and production companies to deliver high-stakes campaigns under tight deadlines.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="origin-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between group hover:border-amber-500/30 transition-all duration-300 relative overflow-hidden"
            >
              <Quote className="w-16 h-16 text-white/5 absolute -top-2 -right-2 pointer-events-none group-hover:text-amber-500/10 transition-colors" />

              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-cinematic-100 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-amber-500/30"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-white tracking-wide">{t.name}</h4>
                    <div className="text-xs text-cinematic-400 font-mono">
                      {t.role} • {t.company}
                    </div>
                  </div>
                </div>

                <Badge variant="outline" size="sm" className="hidden sm:inline-flex text-[10px] font-mono">
                  {t.project.split(' ')[0]}
                </Badge>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

