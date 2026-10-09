import React, { useState, useEffect } from 'react';
import { Film, Menu, X, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';

export function Navbar({ onOpenContact, ambientAudio, toggleAmbientAudio }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timecode, setTimecode] = useState('00:00:00:00');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real-time 24fps Timecode Clock
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const f = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(2, '0');
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 41.67);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass-header py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Signature: PRANAY KUMAR. */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 via-white/5 to-transparent border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] flex items-center justify-center group-hover:border-cyan-400/60 group-hover:shadow-[0_0_20px_rgba(0,102,255,0.35)] transition-all">
            <Film className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-white text-base tracking-wider group-hover:text-cyan-300 transition-colors drop-shadow-sm">
                PRANAY KUMAR<span className="text-blue-500">.</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-[10px] font-mono text-cyan-400 font-bold tracking-widest shadow-[0_0_12px_rgba(0,102,255,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                REC
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-kage-boneDim font-mono">
              <span className="text-cyan-400 font-bold">TC</span>
              <span>{timecode}</span>
              <span className="text-white/30">•</span>
              <span className="text-kage-boneDim">24 FPS</span>
            </div>
          </div>
        </a>

        {/* Desktop Frosted Glass Navigation Pill */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_8px_20px_rgba(0,0,0,0.4)]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-1.5 text-xs font-medium text-kage-boneDim hover:text-white rounded-full hover:bg-white/10 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Ambient Soundscape Toggle */}
          <button
            onClick={toggleAmbientAudio}
            title={ambientAudio ? 'Mute Studio Ambience' : 'Play Studio Ambience'}
            className="p-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-kage-boneDim hover:text-cyan-400 hover:border-cyan-500/40 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition-all cursor-pointer"
            aria-label="Toggle ambient studio soundscape"
          >
            {ambientAudio ? <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Let's Work CTA button with blue gradient */}
          <a
            href="#contact"
            className="inline-flex items-center space-x-1 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-[0_4px_15px_rgba(0,102,255,0.4)] hover:shadow-[0_6px_20px_rgba(0,102,255,0.6)] cursor-pointer"
          >
            <span>Let's Work</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#contact"
            className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-blue-600 text-white font-semibold text-xs"
          >
            <span>Hire</span>
            <ArrowUpRight size={12} />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-kage-boneDim hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer with frosted glass */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-header px-4 py-4 backdrop-blur-3xl flex flex-col gap-3 border-t border-white/10 mt-3">
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-xs font-mono text-cyan-400">{timecode} (24 FPS)</span>
            <button
              onClick={toggleAmbientAudio}
              className="flex items-center gap-2 text-xs text-kage-boneDim"
            >
              {ambientAudio ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
              <span>Room Tone</span>
            </button>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-kage-boneDim hover:text-white py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center space-x-1 w-full py-2.5 rounded-full bg-blue-600 text-white font-semibold text-xs"
            >
              <span>Let's Work</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
