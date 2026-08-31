import React, { useState } from 'react';
import clsx from 'clsx';

/**
 * LiquidCarveButton Component (OriginKit Preset)
 * Refractive carved glass / liquid metallic button with tactile depth.
 */
export function LiquidCarveButton({
  children,
  onClick,
  icon: Icon,
  className = '',
  variant = 'amber', // 'amber' | 'glass' | 'cyan'
  size = 'md',
  disabled = false,
  ...props
}) {
  const [isPressed, setIsPressed] = useState(false);

  const variants = {
    amber: {
      bg: 'bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600',
      text: 'text-cinematic-950 font-bold',
      shadow: 'shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.3),0_8px_20px_-4px_rgba(245,158,11,0.5)]',
      border: 'border border-amber-300/60',
      highlight: 'from-white/40 to-transparent',
    },
    glass: {
      bg: 'bg-gradient-to-b from-white/15 via-white/5 to-black/30 backdrop-blur-xl',
      text: 'text-white font-medium',
      shadow: 'shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),inset_0_-2px_4px_rgba(0,0,0,0.5),0_8px_25px_-5px_rgba(0,0,0,0.6)]',
      border: 'border border-white/20 hover:border-white/40',
      highlight: 'from-white/30 to-transparent',
    },
    cyan: {
      bg: 'bg-gradient-to-b from-cyan-400 via-cyan-500 to-cyan-600',
      text: 'text-cinematic-950 font-bold',
      shadow: 'shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.3),0_8px_20px_-4px_rgba(6,182,212,0.5)]',
      border: 'border border-cyan-300/60',
      highlight: 'from-white/40 to-transparent',
    },
  };

  const scheme = variants[variant] || variants.amber;

  const sizes = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5 font-bold',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={clsx(
        'group relative inline-flex items-center justify-center rounded-xl select-none transition-all duration-200 active:scale-[0.97] overflow-hidden',
        scheme.bg,
        scheme.text,
        scheme.shadow,
        scheme.border,
        sizes[size] || sizes.md,
        isPressed ? 'translate-y-0.5 shadow-none' : '',
        className
      )}
      {...props}
    >
      {/* Top Liquid Carve Specular Highlight */}
      <span
        className={clsx(
          'absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b rounded-t-xl pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity',
          scheme.highlight
        )}
      />

      {/* Fluid Sheen Wave on Hover */}
      <span className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />}
        {children}
      </span>
    </button>
  );
}

