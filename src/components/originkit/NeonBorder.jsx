import React from 'react';
import clsx from 'clsx';

/**
 * NeonBorder Component (OriginKit Preset)
 * Continuous animated neon beam tracing the perimeter of any card.
 * GPU-accelerated rotating gradient mask with zero performance impact.
 */
export function NeonBorder({
  children,
  className = '',
  color = '#f59e0b',
  glowColor = 'rgba(245, 158, 11, 0.4)',
  secondaryColor = '#06b6d4',
  borderWidth = 1.5,
  borderRadius = '1rem',
  duration = '5s',
}) {
  return (
    <div
      className={clsx('relative p-[1.5px] overflow-hidden group', className)}
      style={{ borderRadius }}
    >
      {/* Animated Rotating Conic Neon Stream */}
      <div
        className="absolute -inset-[100%] animate-[spin_6s_linear_infinite] pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${color} 60deg, ${secondaryColor} 120deg, transparent 180deg, transparent 360deg)`,
        }}
      />

      {/* Ambient Outer Glow */}
      <div
        className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-40 transition-opacity blur-md pointer-events-none"
        style={{ background: glowColor }}
      />

      {/* Inner Card Container */}
      <div
        className="relative z-10 w-full h-full bg-cinematic-950 rounded-[calc(1rem-1.5px)]"
        style={{ borderRadius: `calc(${borderRadius} - ${borderWidth}px)` }}
      >
        {children}
      </div>
    </div>
  );
}

