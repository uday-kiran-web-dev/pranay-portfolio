import React, { useState, useEffect } from 'react';
import { Film, Play, Menu, X, Volume2, VolumeX, Mail } from 'lucide-react';
import { Button } from './ui/Button';
import { LiquidCarveButton } from './originkit/LiquidCarveButton';

export function Navbar({ onOpenShowreel, onOpenContact, ambientAudio, toggleAmbientAudio }) {
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
    { label: 'Works', href: '#projects' },
    { label: 'Color Grade', href: '#color-grading' },
    { label: 'Timeline', href: '#nle-timeline' },
    { label: 'Sound Desk', href: '#sound-mixer' },
    { label: 'Stack', href: '#gear' },
    { label: 'Rates', href: '#pricing' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-cinematic-950/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Signature */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-amber-500/10 border border-rose-500/30 flex items-center justify-center group-hover:border-rose-400/60 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all">
            <Film className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-white text-base tracking-wider group-hover:text-rose-300 transition-colors">
                PRANAY
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-500/15 border border-rose-500/30 text-[10px] font-mono text-rose-400 font-bold tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-rec" />
                REC
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-cinematic-400 font-mono">
              <span className="text-amber-400/80">TC</span>
              <span>{timecode}</span>
              <span className="text-cinematic-600">•</span>
              <span className="text-cinematic-400">24 FPS</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-cinematic-900/60 border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-cinematic-300 hover:text-white rounded-full hover:bg-white/5 transition-all"
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
            className="p-2.5 rounded-lg bg-cinematic-900/80 border border-white/10 text-cinematic-300 hover:text-amber-400 hover:border-amber-500/30 transition-all"
            aria-label="Toggle ambient studio soundscape"
          >
            {ambientAudio ? <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <Button
            variant="secondary"
            size="sm"
            icon={Play}
            onClick={onOpenShowreel}
            className="hidden md:inline-flex text-xs font-semibold"
          >
            Reel '25
          </Button>

          <LiquidCarveButton
            variant="amber"
            size="sm"
            icon={Mail}
            onClick={onOpenContact}
            className="text-xs"
          >
            Hire Pranay
          </LiquidCarveButton>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 sm:hidden">
          <LiquidCarveButton
            variant="amber"
            size="sm"
            onClick={onOpenContact}
            className="text-xs py-1.5 px-3"
          >
            Hire
          </LiquidCarveButton>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-cinematic-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-cinematic-950/95 border-b border-white/10 px-4 py-4 backdrop-blur-2xl flex flex-col gap-3">
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-xs font-mono text-amber-400">{timecode} (24 FPS)</span>
            <button
              onClick={toggleAmbientAudio}
              className="flex items-center gap-2 text-xs text-cinematic-300"
            >
              {ambientAudio ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
              <span>Room Tone</span>
            </button>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-cinematic-200 hover:text-amber-400 py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="md"
              icon={Play}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenShowreel();
              }}
              className="w-full text-xs justify-center"
            >
              Watch Showreel
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
