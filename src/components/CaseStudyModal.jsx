import React, { useEffect, useRef } from 'react';
import { X, Play, Clock, Film, Award, UserCheck, Layers, Sparkles, Sliders, CheckCircle } from 'lucide-react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

export function CaseStudyModal({ project, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200 overflow-y-auto"
    >
      {/* Background backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-5xl bg-kage-ink rounded-2xl border border-white/15 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-kage-ink2">
          <div className="flex items-center gap-3">
            <Badge variant="rose" size="sm">
              CASE STUDY
            </Badge>
            <h3 id="case-study-title" className="text-base sm:text-lg font-display font-bold text-white tracking-wide">
              {project.title} — {project.client}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-kage-boneDim hover:text-white transition-all cursor-pointer"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex flex-col gap-8">
          
          {/* Main Video Hero */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10">
            <video
              ref={videoRef}
              src={project.videoFull}
              poster={project.thumbnail}
              controls
              className="w-full h-full object-cover"
            />
          </div>

          {/* Core Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-kage-ink2 border border-white/5 font-mono text-xs">
            <div>
              <span className="text-kage-muted block text-[10px]">CLIENT</span>
              <span className="text-white font-semibold">{project.client}</span>
            </div>
            <div>
              <span className="text-kage-muted block text-[10px]">ROLES</span>
              <span className="text-kage-ember font-semibold">{project.roles.join(', ')}</span>
            </div>
            <div>
              <span className="text-kage-muted block text-[10px]">SOFTWARE</span>
              <span className="text-white font-semibold">{project.software.join(', ')}</span>
            </div>
            <div>
              <span className="text-kage-muted block text-[10px]">DELIVERY</span>
              <span className="text-cyan-400 font-semibold">{project.resolution}</span>
            </div>
          </div>

          {/* Narrative Strategy & Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-mono font-bold text-kage-vermilion uppercase tracking-wider">
                Editorial Vision & Narrative Strategy
              </h4>
              <p className="text-sm text-kage-boneDim leading-relaxed">
                {project.summary}
              </p>
              <p className="text-xs text-kage-muted leading-relaxed">
                {project.tagline}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-mono font-bold text-kage-ember uppercase tracking-wider">
                Multi-Track Timeline Architecture
              </h4>
              <div className="flex flex-col gap-2">
                {project.timelineBreakdown.map((item, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-kage-ink2 border border-white/5 text-xs font-mono">
                    <span className="text-kage-ember font-semibold block">{item.track}</span>
                    <span className="text-kage-boneDim text-[11px]">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Director Quote */}
          {project.directorQuote && (
            <div className="p-4 rounded-xl bg-kage-vermilion/10 border border-kage-vermilion/30 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-kage-vermilion shrink-0 mt-0.5" />
              <div>
                <p className="text-xs italic text-kage-bone font-serif leading-relaxed">
                  "{project.directorQuote}"
                </p>
                <span className="text-[10px] font-mono text-kage-ember block mt-1">
                  — {project.director} ({project.client})
                </span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
