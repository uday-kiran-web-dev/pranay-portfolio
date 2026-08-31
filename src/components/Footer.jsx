import React, { useState } from 'react';
import { Film, Copy, Check, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = 'pranayswaero111@gmail.com';
  const phone = '+91 6301939938';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText('6301939938');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-cinematic-950 border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Summary */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                <Film className="w-5 h-5 text-rose-400" />
              </div>
              <span className="font-display font-extrabold text-white text-lg tracking-wider">
                PRANAY
              </span>
            </div>

            <p className="text-cinematic-300 text-sm max-w-md leading-relaxed">
              Video Editor & Motion Designer specializing in Adobe Premiere Pro, After Effects, and Photoshop. Collaborated with 40+ brands including Flipkart, Kuku FM, and Tamada Media.
            </p>

            {/* Direct Contact Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cinematic-900 border border-white/10 text-xs font-mono text-white">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{email}</span>
                <button
                  onClick={copyEmail}
                  className="ml-1 p-1 hover:text-amber-300 text-cinematic-400 transition-colors"
                  title="Copy email"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cinematic-900 border border-white/10 text-xs font-mono text-white">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{phone}</span>
                <button
                  onClick={copyPhone}
                  className="ml-1 p-1 hover:text-cyan-300 text-cinematic-400 transition-colors"
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
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Navigation
            </h4>
            <div className="flex flex-col gap-2 text-xs font-medium text-cinematic-300">
              <a href="#projects" className="hover:text-white transition-colors">Selected Cuts</a>
              <a href="#color-grading" className="hover:text-white transition-colors">Color Grading & Scopes</a>
              <a href="#nle-timeline" className="hover:text-white transition-colors">Premiere NLE Timeline</a>
              <a href="#sound-mixer" className="hover:text-white transition-colors">Sound Design Desk</a>
              <a href="#gear" className="hover:text-white transition-colors">Software & Tools</a>
              <a href="#pricing" className="hover:text-white transition-colors">Rates & Inquiry</a>
            </div>
          </div>

          {/* Location & Reach */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Location & Reach
            </h4>
            <div className="text-xs text-cinematic-300 flex flex-col gap-1.5 font-mono">
              <div className="flex items-center gap-1.5 text-white">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Karimnagar, Telangana, India</span>
              </div>
              <div>⚡ 40+ Brands Delivered</div>
              <div>🎬 5+ Narrative Short Films</div>
              <div>💼 1.2 Yrs Tamada Media (FilmyFocus)</div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <a
                href={`mailto:${email}`}
                className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300 hover:bg-amber-500/20 transition-all"
              >
                Direct Email
              </a>
              <a
                href={`tel:${phone}`}
                className="px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 hover:bg-cyan-500/20 transition-all"
              >
                Direct Call
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-cinematic-400">
          <div>
            © {new Date().getFullYear()} PRANAY. All rights reserved. Video Editor & Motion Designer.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-cinematic-300 hover:text-amber-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
