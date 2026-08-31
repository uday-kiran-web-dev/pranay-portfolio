import React from 'react';
import clsx from 'clsx';

export function Badge({ children, variant = 'default', size = 'md', className = '', ...props }) {
  const variants = {
    default: 'bg-cinematic-800/80 text-cinematic-200 border-white/10',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]',
    crimson: 'bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.15)]',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30 shadow-[0_0_12px_rgba(139,92,246,0.15)]',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]',
    outline: 'bg-transparent text-cinematic-300 border-white/15',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-wide',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full border backdrop-blur-sm transition-all duration-200',
        variants[variant] || variants.default,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

