import React from 'react';

/**
 * StarGate Component (OriginKit Preset)
 * Cinematic concentric portal rings with glowing aperture flares.
 * Ultra-lightweight GPU SVG rendering with 0 CPU overhead.
 */
export function StarGate({
  className = '',
  color = '#f59e0b',
  glowColor = 'rgba(245, 158, 11, 0.25)',
  children,
}) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background StarGate Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        
        {/* Core radiant glow */}
        <div
          className="absolute w-80 h-80 rounded-full blur-[90px] opacity-40 animate-pulse-slow"
          style={{ background: glowColor }}
        />

        {/* Outer Ring 1 - Counter Clockwise */}
        <svg
          viewBox="0 0 500 500"
          className="absolute w-[440px] sm:w-[580px] h-[440px] sm:h-[580px] opacity-25 animate-[spin_40s_linear_infinite]"
          style={{ animationDirection: 'reverse' }}
        >
          <circle
            cx="250"
            cy="250"
            r="230"
            fill="none"
            stroke={color}
            strokeWidth="1"
            strokeDasharray="4 16 1 8"
          />
          <circle
            cx="250"
            cy="250"
            r="215"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.5"
            strokeDasharray="2 12"
          />
        </svg>

        {/* Middle Ring 2 - Clockwise with Chevron glyphs */}
        <svg
          viewBox="0 0 400 400"
          className="absolute w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] opacity-35 animate-[spin_25s_linear_infinite]"
        >
          <circle
            cx="200"
            cy="200"
            r="185"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray="30 8 10 8"
          />
          <circle
            cx="200"
            cy="200"
            r="165"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="0.75"
            strokeDasharray="6 24"
          />
        </svg>

        {/* Inner Aperture Gate - Fast spin */}
        <svg
          viewBox="0 0 300 300"
          className="absolute w-[240px] sm:w-[340px] h-[240px] sm:h-[340px] opacity-40 animate-[spin_15s_linear_infinite]"
          style={{ animationDirection: 'reverse' }}
        >
          <circle
            cx="150"
            cy="150"
            r="135"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="16 4"
          />
          <circle
            cx="150"
            cy="150"
            r="115"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            strokeDasharray="40 10 5 10"
          />
        </svg>

      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

