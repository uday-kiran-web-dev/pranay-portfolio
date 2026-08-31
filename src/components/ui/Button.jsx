import React from 'react';
import clsx from 'clsx';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg select-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const variants = {
    primary: 'bg-amber-500 hover:bg-amber-400 text-cinematic-950 font-semibold shadow-glow-amber hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] border border-amber-400/40',
    cyan: 'bg-cyan-500 hover:bg-cyan-400 text-cinematic-950 font-semibold shadow-glow-cyan hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] border border-cyan-400/40',
    secondary: 'bg-cinematic-850 hover:bg-cinematic-800 text-cinematic-100 border border-white/10 hover:border-white/20 shadow-glass-card',
    outline: 'bg-transparent hover:bg-white/5 text-cinematic-200 hover:text-white border border-white/15 hover:border-white/30',
    ghost: 'bg-transparent hover:bg-white/5 text-cinematic-300 hover:text-white',
    danger: 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-glow-crimson',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}

