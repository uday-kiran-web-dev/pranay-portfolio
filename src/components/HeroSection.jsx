import React from 'react';
import { ArrowDown, Sparkles, Eye, Flame, Film, MapPin, ArrowUpRight } from 'lucide-react';
import { Badge } from './ui/Badge';
import { GlitterWrap } from './originkit/GlitterWrap';
import { StarGate } from './originkit/StarGate';
import { ScanGridButton } from './originkit/ScanGridButton';
import { NeonBorder } from './originkit/NeonBorder';
import { LiquidCarveButton } from './originkit/LiquidCarveButton';

export function HeroSection({ onOpenContact }) {
  return (
    <section id="gate" className="relative scroll-mt-20">
      <GlitterWrap
        particleCount={45}
        color="#0066FF"
        speed={0.9}
        className="min-h-[92vh] flex items-center justify-center pt-28 pb-16 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Frosted Glass Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-2xl mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_20px_rgba(0,0,0,0.4)] group hover:border-blue-500/50 transition-all cursor-default">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-mono font-medium text-kage-bone tracking-wide">
              PORTFOLIO // PRANAY KUMAR • VIDEO EDITOR & MOTION DESIGNER
            </span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08] mb-6 drop-shadow-md">
            Sculpting Kinetic Energy &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-400 to-blue-500 drop-shadow-[0_0_35px_rgba(0,102,255,0.5)]">
              Visual Rhythm
            </span>
          </h1>

          {/* Personal Bio */}
          <p className="text-base sm:text-xl text-kage-boneDim font-normal max-w-2xl mx-auto mb-8 leading-relaxed">
            Hi, I’m <strong className="text-white font-semibold">Pranay Kumar</strong>. Turning raw camera rushes into high-impact commercials, kinetic motion ads, and episodic entertainment for <strong className="text-cyan-400">40+ brands</strong> and <strong className="text-blue-400">Tamada Media</strong>.
          </p>

          {/* Action CTAs in Blue/Cyan */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a href="#work">
              <LiquidCarveButton
                variant="cyan"
                size="lg"
                icon={ArrowDown}
                className="text-sm sm:text-base shadow-[0_10px_30px_rgba(0,102,255,0.35)] cursor-pointer"
              >
                Explore Selected Work
              </LiquidCarveButton>
            </a>
            
            <ScanGridButton
              variant="cyan"
              size="lg"
              onClick={onOpenContact}
            >
              Let's Work Together
            </ScanGridButton>
          </div>

          {/* Featured Visual Artwork Showcase */}
          <div className="w-full max-w-4xl relative group">
            <StarGate
              color="#0066FF"
              glowColor="rgba(0, 102, 255, 0.3)"
              className="w-full py-2"
            >
              <NeonBorder
                color="#0066FF"
                secondaryColor="#00E5FF"
                borderRadius="1.25rem"
                className="w-full shadow-2xl"
              >
                <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-[calc(1.25rem-1.5px)] bg-kage-ink flex glass-panel items-center justify-center">
                  
                  {/* Background Artwork Banner */}
                  <img
                    src="/images/pranay-artwork.png"
                    alt="Pranay Kumar Artwork"
                    className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />

                  {/* Gradient Dark Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-kage-ink via-transparent to-black/40 pointer-events-none" />

                  {/* Bottom Frosted HUD Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex items-center justify-between pointer-events-none bg-gradient-to-t from-black/90 via-black/60 to-transparent backdrop-blur-[2px]">
                    <div className="flex items-center gap-3">
                      <Badge variant="cyan" size="sm">
                        PREMIERE PRO • AFTER EFFECTS • PHOTOSHOP
                      </Badge>
                      <span className="text-xs font-mono text-kage-boneDim hidden sm:inline-block">
                        FLIPKART // KUKU FM // PAYNEXA // TAMADA MEDIA
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span>POST-PRODUCTION READY</span>
                    </div>
                  </div>

                </div>
              </NeonBorder>
            </StarGate>
          </div>

          {/* Frosted Glass Metrics Grid */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl">
            <div className="p-4 rounded-2xl glass-panel-interactive text-left">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Eye className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Brands</span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">40+</div>
              <div className="text-xs text-kage-muted mt-0.5">Flipkart, Kuku FM, Paynexa</div>
            </div>

            <div className="p-4 rounded-2xl glass-panel-interactive text-left">
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <Film className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Films</span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">5+</div>
              <div className="text-xs text-kage-muted mt-0.5">Short Films Delivered</div>
            </div>

            <div className="p-4 rounded-2xl glass-panel-interactive text-left">
              <div className="flex items-center gap-2 text-sky-400 mb-1">
                <Flame className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Experience</span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">2+ Yrs</div>
              <div className="text-xs text-kage-muted mt-0.5">Tamada Media & Freelance</div>
            </div>

            <div className="p-4 rounded-2xl glass-panel-interactive text-left">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
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
    </section>
  );
}
