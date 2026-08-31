import React, { useState, useEffect } from 'react';

const CHAPTERS = [
  { id: 'gate', num: '01', label: 'THE GATE', href: '#' },
  { id: 'projects', num: '02', label: 'SELECTED WORKS', href: '#projects' },
  { id: 'color-grading', num: '03', label: 'COLOR GRADING', href: '#color-grading' },
  { id: 'nle-timeline', num: '04', label: 'TIMELINE', href: '#nle-timeline' },
  { id: 'sound-mixer', num: '05', label: 'SOUND DESK', href: '#sound-mixer' },
  { id: 'pricing', num: '06', label: 'RATES & INQUIRY', href: '#pricing' },
];

export function KageProgressRail() {
  const [activeChapter, setActiveChapter] = useState('gate');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;

      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const ch = CHAPTERS[i];
        if (ch.id === 'gate') {
          if (scrollPos < 600) {
            setActiveChapter('gate');
            break;
          }
        } else {
          const el = document.getElementById(ch.id);
          if (el && el.offsetTop <= scrollPos) {
            setActiveChapter(ch.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
                    ? 'text-kage-vermilion font-bold translate-x-0'
                    : 'text-kage-boneDim opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
                }`}
              >
                {ch.num} · {ch.label}
              </span>

              {/* Number Badge */}
              <span
                className={`text-[10px] font-mono font-semibold transition-colors ${
                  isActive ? 'text-kage-vermilion' : 'text-kage-muted group-hover:text-kage-bone'
                }`}
              >
                {ch.num}
              </span>

              {/* Rail Line Indicator */}
              <div
                className={`h-[2px] transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-7 bg-kage-vermilion shadow-glow-vermilion'
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
