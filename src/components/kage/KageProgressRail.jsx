import React, { useState, useEffect } from 'react';

const CHAPTERS = [
  { id: 'gate', num: '01', label: 'THE GATE', href: '#' },
  { id: 'work', num: '02', label: 'SELECTED WORK', href: '#work' },
  { id: 'about', num: '03', label: 'ABOUT', href: '#about' },
  { id: 'experience', num: '04', label: 'EXPERIENCE', href: '#experience' },
  { id: 'services', num: '05', label: 'SERVICES', href: '#services' },
  { id: 'contact', num: '06', label: 'CONTACT', href: '#contact' },
];

export function KageProgressRail() {
  const [activeChapter, setActiveChapter] = useState('gate');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollCheckPos = scrollPos + viewportHeight * 0.35;

      // If scrolled near page bottom, highlight contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150) {
        setActiveChapter('contact');
        return;
      }

      // If at the top of the page, highlight gate
      if (scrollPos < 300) {
        setActiveChapter('gate');
        return;
      }

      // Compute absolute top positions for all chapters
      const sectionPositions = CHAPTERS.map((ch) => {
        if (ch.id === 'gate') {
          return { id: 'gate', top: 0 };
        }
        const el = document.getElementById(ch.id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          id: ch.id,
          top: rect.top + window.scrollY,
        };
      }).filter(Boolean);

      sectionPositions.sort((a, b) => a.top - b.top);

      let currentId = 'gate';
      for (let i = 0; i < sectionPositions.length; i++) {
        if (scrollCheckPos >= sectionPositions[i].top) {
          currentId = sectionPositions[i].id;
        }
      }

      setActiveChapter(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3 pointer-events-auto"
      aria-label="Chapter Navigation Rail"
    >
      <div className="flex flex-col gap-2.5 items-end">
        {CHAPTERS.map((ch) => {
          const isActive = activeChapter === ch.id;
          return (
            <a
              key={ch.id}
              href={ch.href}
              className={`group flex items-center gap-2.5 py-1 transition-all ${
                isActive ? 'opacity-100' : 'opacity-40 hover:opacity-80'
              }`}
              title={`${ch.num} · ${ch.label}`}
            >
              {/* Tooltip on hover */}
              <span
                className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? 'text-cyan-400 font-bold translate-x-0'
                    : 'text-kage-boneDim opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
                }`}
              >
                {ch.num} · {ch.label}
              </span>

              {/* Number Badge */}
              <span
                className={`text-[10px] font-mono font-semibold transition-colors ${
                  isActive ? 'text-cyan-400' : 'text-kage-muted group-hover:text-kage-bone'
                }`}
              >
                {ch.num}
              </span>

              {/* Rail Line Indicator */}
              <div
                className={`h-[2px] transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-7 bg-blue-500 shadow-[0_0_12px_rgba(0,102,255,0.8)]'
                    : 'w-3 bg-white/20 group-hover:w-5 group-hover:bg-white/40'
                }`}
              />
            </a>
          );
        })}
      </div>
    </aside>
  );
}
