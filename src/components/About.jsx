import React from 'react';
import { ArrowUpRight, FileText, Sparkles, User, Award, ShieldCheck } from 'lucide-react';
import { profile } from '../data/profile';
import { experiences } from '../data/experience';
import { Badge } from './ui/Badge';

export function About({ onOpenContact }) {
  return (
    <section id="about" className="py-24 relative bg-kage-ink border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="cyan" size="sm">
              ABOUT & BACKGROUND
            </Badge>
            <span className="text-xs font-mono text-kage-muted">
              KARIMNAGAR, TELANGANA • REMOTE WORLDWIDE
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            A Visual Storyteller at Heart
          </h2>
          <div className="mt-3 w-16 h-1 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(0,102,255,0.6)]" />
        </div>

        {/* 3-Column Glass Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ================= LEFT: Authentic Portrait Card ================= */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="glass-panel-interactive w-full max-w-[360px] rounded-3xl overflow-hidden p-3 shadow-2xl">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black/60 border border-white/10">
                <img
                  src="/images/pranay-artwork.png"
                  onError={(e) => {
                    e.currentTarget.src = '/pranay-hero.jpg';
                  }}
                  alt="Pranay Kumar — Portrait Artwork"
                  className="w-full h-full object-cover object-[center_15%] scale-[1.15] hover:scale-[1.22] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 border border-white/15 text-[10px] font-mono text-white backdrop-blur-md">
                    PRANAY KUMAR.
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-blue-600/90 text-white text-[10px] font-mono font-bold backdrop-blur-md">
                    2+ YRS POST
                  </span>
                </div>
              </div>

              {/* Graphic Stamp tags */}
              <div className="pt-4 pb-2 text-center border-t border-white/10 mt-3">
                <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-kage-boneDim font-semibold">
                  FILMS • BRANDS • PEOPLE • IDEAS • CULTURE
                </div>
              </div>
            </div>
          </div>

          {/* ================= CENTER: About Biography ================= */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-5">
              <div>
                <div className="text-[11px] font-mono tracking-[0.2em] text-cyan-400 uppercase mb-1 font-bold">
                  CREATIVE PHILOSOPHY
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-snug tracking-tight">
                  TURNING RAW RUSHES INTO MEMORABLE MOMENTS.
                </h3>
              </div>

              <p className="text-sm text-kage-boneDim leading-relaxed">
                {profile.aboutBio}
              </p>

              <p className="text-xs text-kage-muted leading-relaxed">
                Expertise across Adobe Premiere Pro, After Effects, and Photoshop. Dedicated to precision timing, sound design, audience retention, and visual storytelling that resonates across audiences.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-[0_4px_15px_rgba(0,102,255,0.4)] cursor-pointer"
                >
                  <span>Get In Touch</span>
                  <ArrowUpRight size={13} />
                </button>

                <a
                  href={profile.resumePath}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl glass-pill text-white hover:border-white/40 font-semibold text-xs transition-all cursor-pointer"
                >
                  <FileText size={13} className="text-cyan-400" />
                  <span>Download Résumé</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: Verified Experience Timeline ================= */}
          <div id="experience" className="lg:col-span-4 space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-6">
              <div>
                <div className="text-[11px] font-mono tracking-[0.2em] text-cyan-400 uppercase mb-1 font-bold">
                  EXPERIENCE
                </div>
                <h3 className="text-lg font-display font-bold text-white tracking-wide">
                  Verified Post-Production Roles
                </h3>
              </div>

              <div className="space-y-7 relative border-l-2 border-white/10 pl-5 ml-1 pt-1">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline glowing blue node */}
                    <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(0,102,255,0.9)] ring-4 ring-kage-ink" />

                    <div className="inline-block bg-blue-600/15 text-cyan-300 border border-blue-500/30 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full tracking-wider mb-1.5">
                      {exp.duration.toUpperCase()}
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h4>

                    <div className="text-xs text-kage-bone font-medium mt-0.5">
                      {exp.company}
                    </div>

                    <div className="text-[11px] text-cyan-400 font-mono mt-0.5">
                      {exp.type}
                    </div>

                    <p className="text-xs text-kage-muted mt-2 leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
