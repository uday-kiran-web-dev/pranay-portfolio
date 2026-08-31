import React, { useState } from 'react';
import { Play, Sparkles, Eye, Flame, Film, MapPin } from 'lucide-react';
import { Badge } from './ui/Badge';
import { GlitterWrap } from './originkit/GlitterWrap';
import { StarGate } from './originkit/StarGate';
import { ScanGridButton } from './originkit/ScanGridButton';
import { NeonBorder } from './originkit/NeonBorder';
import { LiquidCarveButton } from './originkit/LiquidCarveButton';

export function HeroSection({ onOpenShowreel, onOpenContact }) {
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  return (
    <GlitterWrap
      particleCount={45}
      color="#e0231c"
      speed={0.9}
      className="min-h-[92vh] flex items-center justify-center pt-28 pb-16 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-kage-ink2/90 border border-kage-vermilion/30 backdrop-blur-xl mb-6 shadow-glow-vermilion group hover:border-kage-vermilion/60 transition-all cursor-default">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kage-vermilion opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-kage-vermilion"></span>
            </span>
            <span className="text-xs font-mono font-medium text-kage-bone">
              PORTFOLIO // PRANAY • VIDEO EDITOR & MOTION DESIGNER
            </span>
            <Sparkles className="w-3.5 h-3.5 text-kage-ember" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            Sculpting Kinetic Energy &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kage-bone via-kage-ember to-kage-vermilion drop-shadow-[0_0_35px_rgba(224,35,28,0.5)]">
              Visual Rhythm
            </span>
          </h1>

          {/* Personal Bio */}
          <p className="text-base sm:text-xl text-kage-boneDim font-normal max-w-2xl mx-auto mb-8 leading-relaxed">
            Hi, I’m <strong className="text-white font-semibold">Pranay</strong>. Turning raw camera rushes into high-retention commercials, kinetic motion ads, and episodic entertainment for <strong className="text-kage-ember">40+ brands</strong> and <strong className="text-kage-vermilion">Tamada Media</strong>.
          </p>

          {/* Interactive Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <LiquidCarveButton
              variant="amber"
              size="lg"
              icon={Play}
              onClick={onOpenShowreel}
              className="text-sm sm:text-base"
            >
              Watch 2025 Showreel
            </LiquidCarveButton>
            
            <ScanGridButton
              variant="crimson"
              size="lg"
              onClick={onOpenContact}
            >
              Hire Pranay Direct
            </ScanGridButton>
          </div>

          {/* Master Showreel Spotlight with Poster Artwork */}
          <div className="w-full max-w-4xl relative group">
            
            <StarGate
              color="#e0231c"
              glowColor="rgba(224, 35, 28, 0.25)"
              className="w-full py-2"
            >
              <NeonBorder
                color="#e0231c"
                secondaryColor="#ff5a3c"
                borderRadius="1.25rem"
                className="w-full shadow-2xl"
              >
                <div 
                  className="relative aspect-video sm:aspect-[21/9] w-full cursor-pointer overflow-hidden rounded-[calc(1.25rem-1.5px)] bg-kage-ink flex"
                  onClick={onOpenShowreel}
                  onMouseEnter={() => setIsPlayingPreview(true)}
                  onMouseLeave={() => setIsPlayingPreview(false)}
                >
                  {/* Left Side: Pranay Poster Artwork */}
                  <div className="w-1/3 sm:w-1/4 h-full relative overflow-hidden hidden sm:block border-r border-white/10 shrink-0">
                    <img
                      src="/pranay-hero.jpg"
                      alt="Pranay Art Poster"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2 right-2 text-center">
                      <span className="text-[10px] font-mono font-bold text-kage-vermilion uppercase tracking-wider">
                        Pranay Edits
                      </span>
                    </div>
                  </div>

                  {/* Main Showreel Canvas */}
                  <div className="relative flex-1 h-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=85"
                      alt="Pranay 2025 Showreel"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                    />

                    {/* Gradient Dark Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-kage-ink via-kage-ink/20 to-black/40 pointer-events-none" />

                    {/* Center Play Beacon */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-kage-vermilion text-white flex items-center justify-center shadow-[0_0_40px_rgba(224,35,28,0.8)] group-hover:scale-110 group-hover:bg-kage-ember transition-all duration-300">
                        <Play className="w-7 sm:w-8 h-7 sm:h-8 fill-current ml-1" />
                      </div>
                      <span className="mt-3 text-xs sm:text-sm font-mono tracking-widest text-white font-semibold uppercase backdrop-blur-md px-3 py-1 rounded bg-black/60 border border-white/10">
                        Play Master Reel (02:18)
                      </span>
                    </div>

                    {/* Bottom HUD Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex items-center justify-between pointer-events-none bg-gradient-to-t from-black/90 to-transparent">
                      <div className="flex items-center gap-3">
                        <Badge variant="rose" size="sm">
                          PREMIERE & AFTER EFFECTS
                        </Badge>
                        <span className="text-xs font-mono text-kage-boneDim hidden sm:inline-block">
                          FLIPKART // KUKU FM // TAMADA MEDIA
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs text-kage-ember">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>00:02:18:00</span>
                      </div>
                    </div>
                  </div>

                </div>
              </NeonBorder>
            </StarGate>
          </div>

          {/* Metrics Grid */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl">
            <div className="p-4 rounded-xl origin-card text-left">
              <div className="flex items-center gap-2 text-kage-ember mb-1">
                <Eye className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Brands</span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">40+</div>
              <div className="text-xs text-kage-muted mt-0.5">Flipkart, Kuku FM, KIMS</div>
            </div>

            <div className="p-4 rounded-xl origin-card text-left">
              <div className="flex items-center gap-2 text-kage-gold mb-1">
                <Film className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Films</span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">5+</div>
              <div className="text-xs text-kage-muted mt-0.5">Short Films Delivered</div>
            </div>

            <div className="p-4 rounded-xl origin-card text-left">
              <div className="flex items-center gap-2 text-kage-vermilion mb-1">
                <Flame className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Experience</span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">2+ Yrs</div>
              <div className="text-xs text-kage-muted mt-0.5">Tamada Media & Freelance</div>
            </div>

            <div className="p-4 rounded-xl origin-card text-left">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Location</span>
              </div>
              <div className="text-lg sm:text-xl font-display font-extrabold text-white truncate">Karimnagar</div>
              <div className="text-xs text-kage-muted mt-0.5">Telangana • Remote</div>
            </div>
          </div>

        </div>
      </div>
    </GlitterWrap>
  );
}
