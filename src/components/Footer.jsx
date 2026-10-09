import React, { useState } from 'react';
import { Film, Copy, Check, ArrowUp, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile';

export function Footer({ onOpenContact }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = profile.email;
  const phone = profile.phone;

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-kage-ink border-t border-white/10 pt-20 pb-12 relative overflow-hidden">
      {/* Background ambient blue glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Creative Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-16 border-b border-white/10">
          
          {/* Left: Handwritten Quote */}
          <div className="lg:col-span-4">
            <div className="font-serif italic text-3xl sm:text-4xl text-white/90 -rotate-6 select-none drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Let's Create<br />
              Something<br />
              <span className="text-cyan-400 font-bold drop-shadow-[0_0_15px_rgba(0,229,255,0.6)]">Amazing.</span>
            </div>
          </div>

          {/* Center: Main Headline */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-[11px] font-mono tracking-[0.2em] text-cyan-400 uppercase font-bold">
              GET IN TOUCH
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-none tracking-tight">
              LET'S WORK
              <br />
              TOGETHER<span className="text-blue-500">.</span>
            </h2>
            <p className="text-xs sm:text-sm text-kage-boneDim max-w-md leading-relaxed">
              Have a commercial, digital campaign, short film, or social content in mind? I'm always open to collaborating with directors, brands, and agencies.
            </p>
          </div>

          {/* Right: Direct Action Buttons */}
          <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider transition-all shadow-[0_4px_20px_rgba(0,102,255,0.5)] cursor-pointer"
            >
              <span>Get In Touch</span>
              <ArrowUpRight size={14} />
            </button>

            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl glass-pill text-white hover:border-cyan-400/40 font-semibold text-xs tracking-wider transition-all cursor-pointer"
            >
              <Mail size={13} className="text-cyan-400" />
              <span>Email Me Direct</span>
            </a>
          </div>

        </div>

        {/* Contact info grid & direct reach */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12 border-b border-white/10">
          
          {/* Brand & Summary */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <Film className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="font-display font-extrabold text-white text-lg tracking-wider">
                PRANAY KUMAR<span className="text-blue-500">.</span>
              </span>
            </div>

            <p className="text-kage-boneDim text-sm max-w-md leading-relaxed">
              Professional Video Editor & Motion Designer specializing in Adobe Premiere Pro, After Effects, and Photoshop. Collaborated with 40+ brands including Flipkart, Kuku FM, Paynexa, and Tamada Media.
            </p>

            {/* Direct Contact Pills with 1-click clipboard copy */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-panel text-xs font-mono text-white">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{email}</span>
                <button
                  onClick={copyEmail}
                  className="ml-1 p-1 hover:text-white text-kage-muted transition-colors cursor-pointer"
                  title="Copy email"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-panel text-xs font-mono text-white">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{phone}</span>
                <button
                  onClick={copyPhone}
                  className="ml-1 p-1 hover:text-white text-kage-muted transition-colors cursor-pointer"
                  title="Copy phone"
                  aria-label="Copy phone"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Navigation
            </h4>
            <div className="flex flex-col gap-2 text-xs font-medium text-kage-boneDim">
              <a href="#work" className="hover:text-white transition-colors">Work / Selected Cuts</a>
              <a href="#about" className="hover:text-white transition-colors">About Me</a>
              <a href="#experience" className="hover:text-white transition-colors">Experience & Roles</a>
              <a href="#services" className="hover:text-white transition-colors">Services & Expertise</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact / Inquire</a>
            </div>
          </div>

          {/* Location & Reach */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Location & Verified Stats
            </h4>
            <div className="text-xs text-kage-boneDim flex flex-col gap-1.5 font-mono">
              <div className="flex items-center gap-1.5 text-white">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profile.location}</span>
              </div>
              <div>⚡ 40+ Brands Delivered</div>
              <div>🎬 5+ Narrative Short Films</div>
              <div>💼 1.2 Yrs Tamada Media (FilmyFocus | Lopply)</div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <a
                href={`mailto:${email}`}
                className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-cyan-300 hover:bg-white/10 transition-all"
              >
                Direct Email
              </a>
              <a
                href={`tel:${phone}`}
                className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-cyan-400 hover:bg-white/10 transition-all"
              >
                Direct Call
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-kage-muted">
          <div className="flex items-center space-x-3">
            <span className="font-display font-bold text-white">PRANAY KUMAR.</span>
            <span>•</span>
            <span className="hidden sm:inline">EDIT • MOTION • CREATE • REPEAT</span>
            <span>•</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-kage-boneDim hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
