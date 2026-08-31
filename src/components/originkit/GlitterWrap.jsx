import React, { useRef, useEffect, useState } from 'react';

/**
 * GlitterWrap Component (OriginKit Preset)
 * High-performance 2D Canvas starfield / glitter warp tunnel effect.
 * GPU-optimized with IntersectionObserver auto-pause for 60fps.
 */
export function GlitterWrap({
  children,
  className = '',
  particleCount = 65,
  color = '#f59e0b',
  speed = 1.2,
  interactive = true,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    // Particles data
    const particles = [];
    const cx = width / 2;
    const cy = height / 2;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width,
        y: (Math.random() - 0.5) * height,
        z: Math.random() * width,
        size: Math.random() * 1.5 + 0.5,
        colorVal: Math.random() > 0.3 ? color : '#ffffff',
        twinkle: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - cx) * 0.05;
      mouseY = (e.clientY - rect.top - cy) * 0.05;
    };

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    if (interactive) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Auto-pause with IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const render = () => {
      if (isVisibleRef.current) {
        ctx.clearRect(0, 0, width, height);

        const currentCx = width / 2 + mouseX;
        const currentCy = height / 2 + mouseY;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.z -= speed * 1.8;
          p.twinkle += 0.04;

          if (p.z <= 0) {
            p.z = width;
            p.x = (Math.random() - 0.5) * width * 1.2;
            p.y = (Math.random() - 0.5) * height * 1.2;
          }

          const k = 220 / p.z;
          const px = p.x * k + currentCx;
          const py = p.y * k + currentCy;

          if (px >= 0 && px <= width && py >= 0 && py <= height) {
            const alpha = Math.min(Math.max((1 - p.z / width) * (0.6 + Math.sin(p.twinkle) * 0.4), 0), 1);
            const radius = Math.max(p.size * k * 0.7, 0.4);

            ctx.beginPath();
            ctx.arc(px, py, radius, 0, Math.PI * 2);
            ctx.fillStyle = p.colorVal;
            ctx.globalAlpha = alpha;
            ctx.shadowBlur = radius > 1.2 ? 6 : 0;
            ctx.shadowColor = color;
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      observer.disconnect();
    };
  }, [particleCount, color, speed, interactive]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-70"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

