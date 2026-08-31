import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Award, Sparkles, Move3d } from 'lucide-react';
import { Badge } from '../ui/Badge';

/**
 * SphereGallery3D Component (OriginKit Preset)
 * Interactive 3D spherical gallery projecting film projects & accolades.
 * Built with lightweight 3D math & CSS translate3d for 60fps without heavy WebGL.
 */
export function SphereGallery3D({ items, onSelectItem, radius = 220 }) {
  const containerRef = useRef(null);
  const isVisibleRef = useRef(true);
  const [rotation, setRotation] = useState({ x: 0.2, y: 0 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0.003, y: 0.005 }); // initial subtle spin

  // Spherical coordinates distribution (Fibonacci sphere algorithm)
  const sphereNodes = React.useMemo(() => {
    const total = items.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle in radians

    return items.map((item, i) => {
      const y = 1 - (i / (total - 1)) * 2; // y goes from 1 to -1
      const r = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      return {
        item,
        origX: x * radius,
        origY: y * radius,
        origZ: z * radius,
      };
    });
  }, [items, radius]);

  // Main 3D Animation & Inertia Loop
  useEffect(() => {
    let animId;

    const animate = () => {
      if (isVisibleRef.current) {
        if (!isDraggingRef.current) {
          // Apply velocity and slow friction
          setRotation((prev) => ({
            x: prev.x + velocityRef.current.x,
            y: prev.y + velocityRef.current.y,
          }));

          // Maintain gentle idle drift
          velocityRef.current.x = velocityRef.current.x * 0.96 + 0.0005;
          velocityRef.current.y = velocityRef.current.y * 0.96 + 0.0015;
        }
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Auto-pause when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  // Mouse & Touch Drag Handlers
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;

    velocityRef.current = {
      x: -dy * 0.004,
      y: dx * 0.004,
    };

    setRotation((prev) => ({
      x: prev.x - dy * 0.004,
      y: prev.y + dx * 0.004,
    }));

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e) => {
    if (e.touches.length > 0) {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || e.touches.length === 0) return;
    const dx = e.touches[0].clientX - lastMousePosRef.current.x;
    const dy = e.touches[0].clientY - lastMousePosRef.current.y;

    velocityRef.current = {
      x: -dy * 0.005,
      y: dx * 0.005,
    };

    setRotation((prev) => ({
      x: prev.x - dy * 0.005,
      y: prev.y + dx * 0.005,
    }));

    lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      className="relative w-full h-[460px] sm:h-[540px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden"
    >
      {/* Center 3D Ambient Halo */}
      <div className="absolute w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute w-44 h-44 rounded-full border border-white/10 opacity-30 pointer-events-none animate-pulse-slow" />

      {/* Orbit Helper Tag */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-cinematic-900/80 border border-white/10 text-[11px] font-mono text-cinematic-400 backdrop-blur-md pointer-events-none">
        <Move3d className="w-3.5 h-3.5 text-amber-400" />
        <span>DRAG TO ORBIT 3D REELS</span>
      </div>

      {/* 3D Nodes */}
      {sphereNodes.map((node, idx) => {
        // Apply 3D rotation matrix around X and Y axes
        const cosX = Math.cos(rotation.x);
        const sinX = Math.sin(rotation.x);
        const cosY = Math.cos(rotation.y);
        const sinY = Math.sin(rotation.y);

        // Y-axis rotation
        let x1 = node.origX * cosY - node.origZ * sinY;
        let z1 = node.origZ * cosY + node.origX * sinY;
        let y1 = node.origY;

        // X-axis rotation
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = z1 * cosX + y1 * sinX;
        let x2 = x1;

        // Perspective projection factor
        const fov = 450;
        const scale = fov / (fov + z2);
        const alpha = Math.max(Math.min((z2 + radius) / (2 * radius) * 0.85 + 0.15, 1), 0.15);
        const zIndex = Math.round((z2 + radius) * 10);

        return (
          <div
            key={idx}
            onClick={() => onSelectItem && onSelectItem(node.item)}
            className="absolute transition-transform duration-75 group/card cursor-pointer"
            style={{
              transform: `translate3d(${x2}px, ${y2}px, 0) scale(${scale})`,
              zIndex,
              opacity: alpha,
            }}
          >
            <div className="w-36 sm:w-44 origin-card rounded-xl overflow-hidden border border-white/15 group-hover/card:border-amber-400 group-hover/card:shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all bg-cinematic-950 p-2">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black mb-1.5">
                <img
                  src={node.item.thumbnail}
                  alt={node.item.title}
                  className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-cinematic-950 flex items-center justify-center">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="truncate text-[11px] font-bold text-white group-hover/card:text-amber-300 font-display">
                  {node.item.title}
                </div>
                <span className="text-[9px] font-mono text-amber-400 shrink-0">
                  {node.item.runtime}
                </span>
              </div>
              <div className="text-[9px] font-mono text-cinematic-400 truncate">
                {node.item.client}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

