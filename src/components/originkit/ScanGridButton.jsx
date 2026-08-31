import React, { useState } from 'react';
import clsx from 'clsx';

/**
 * ScanGridButton Component (OriginKit Preset)
 * High-tech button with microgrid background & scanning laser sweep.
 */
export function ScanGridButton({
  children,
  onClick,
  icon: Icon,
  className = '',
  variant = 'amber', // 'amber' | 'cyan' | 'crimson'
  size = 'md',
  disabled = false,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    amber: {
      border: 'border-amber-500/40 hover:border-amber-400',
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.25)]',
      text: 'text-amber-300 group-hover:text-amber-100',
      scanLine: 'bg-gradient-to-r from-transparent via-amber-400 to-transparent',
      gridColor: 'rgba(245, 158, 11, 0.08)',
      corner: 'bg-amber-400',
    },
    cyan: {
      border: 'border-cyan-500/40 hover:border-cyan-400',
      glow: 'shadow-[0_0_20px_rgba(6,182,212,0.25)]',
      text: 'text-cyan-300 group-hover:text-cyan-100',
      scanLine: 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent',
      gridColor: 'rgba(6, 182, 212, 0.08)',
      corner: 'bg-cyan-400',
    },
    crimson: {
      border: 'border-rose-500/40 hover:border-rose-400',
      glow: 'shadow-[0_0_20px_rgba(244,63,94,0.25)]',
      text: 'text-rose-300 group-hover:text-rose-100',
      scanLine: 'bg-gradient-to-r from-transparent via-rose-400 to-transparent',
      gridColor: 'rgba(244, 63, 94, 0.08)',
      corner: 'bg-rose-400',
    },
  };

  const scheme = colors[variant] || colors.amber;

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-xs sm:text-sm',
    lg: 'px-7 py-3.5 text-sm sm:text-base font-semibold',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        'group relative inline-flex items-center justify-center font-mono uppercase tracking-wider rounded-lg overflow-hidden transition-all duration-300 backdrop-blur-md bg-cinematic-950/80 border select-none disabled:opacity-50 disabled:cursor-not-allowed',
        scheme.border,
        scheme.glow,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${scheme.gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${scheme.gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '8px 8px',
        }}
      />

      {/* Sweeping Laser Scanline */}
      <div
        className={clsx(
          'absolute left-0 right-0 h-[1.5px] pointer-events-none transition-all duration-700',
          scheme.scanLine,
          isHovered ? 'top-full opacity-100' : '-top-1 opacity-0'
        )}
      />

      {/* Cybernetic Corner Notches */}
      <span className={clsx('absolute top-0 left-0 w-1.5 h-1.5', scheme.corner, 'opacity-70')} />
      <span className={clsx('absolute top-0 right-0 w-1.5 h-1.5', scheme.corner, 'opacity-70')} />
      <span className={clsx('absolute bottom-0 left-0 w-1.5 h-1.5', scheme.corner, 'opacity-70')} />
      <span className={clsx('absolute bottom-0 right-0 w-1.5 h-1.5', scheme.corner, 'opacity-70')} />

      {/* Content */}
      <span className={clsx('relative z-10 flex items-center gap-2 font-bold transition-colors', scheme.text)}>
        {Icon && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />}
        {children}
      </span>
    </button>
  );
}

