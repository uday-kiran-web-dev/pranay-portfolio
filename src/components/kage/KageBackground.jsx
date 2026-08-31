import React, { useEffect, useRef } from 'react';

export function KageBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Generate Kage drifting embers (vermilion, ember, gold)
    const emberCount = Math.min(Math.floor((width * height) / 22000), 55);
    const colors = [
      'rgba(224, 35, 28, ',   // Vermilion
      'rgba(255, 90, 60, ',   // Ember
      'rgba(201, 162, 74, ',  // Gold
      'rgba(245, 158, 11, ',  // Amber
    ];

    const embers = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -(Math.random() * 0.6 + 0.2), // Rising slowly upward
      opacity: Math.random() * 0.7 + 0.2,
      fadeSpeed: Math.random() * 0.008 + 0.003,
      color: colors[Math.floor(Math.random() * colors.length)],
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.005,
    }));

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Render Subtle Vermilion Celestial Ambient Glow in Top Right
      const moonX = width * 0.75;
      const moonY = height * 0.22;
      const moonGrad = ctx.createRadialGradient(moonX, moonY, 10, moonX, moonY, Math.max(width * 0.35, 300));
      moonGrad.addColorStop(0, 'rgba(224, 35, 28, 0.06)');
      moonGrad.addColorStop(0.5, 'rgba(255, 90, 60, 0.025)');
      moonGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = moonGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Embers
      embers.forEach((ember) => {
        ember.y += ember.speedY;
        ember.sway += ember.swaySpeed;
        ember.x += ember.speedX + Math.sin(ember.sway) * 0.4;

        // Subtle mouse drift reactivity
        const dx = mouseX - ember.x;
        const dy = mouseY - ember.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ember.x -= (dx / dist) * 0.6;
          ember.y -= (dy / dist) * 0.6;
        }

        // Fade in and out
        ember.opacity += ember.fadeSpeed;
        if (ember.opacity > 0.85 || ember.opacity < 0.15) {
          ember.fadeSpeed = -ember.fadeSpeed;
        }

        // Recycle offscreen embers
        if (ember.y < -10) {
          ember.y = height + 10;
          ember.x = Math.random() * width;
        }
        if (ember.x < -10) ember.x = width + 10;
        if (ember.x > width + 10) ember.x = -10;

        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
        ctx.fillStyle = `${ember.color}${Math.max(0, Math.min(1, ember.opacity))})`;
        ctx.shadowColor = ember.color.replace('rgba', 'rgb').replace(', ', ')');
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      // Reset shadow for performance
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  );
}

