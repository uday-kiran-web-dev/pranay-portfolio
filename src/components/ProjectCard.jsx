import React, { useState } from 'react';
import { Play, Award, Clock, Film, Eye, Sparkles, ArrowUpRight } from 'lucide-react';
import { Badge } from './ui/Badge';

export function ProjectCard({ project, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => onSelect(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="origin-card rounded-2xl overflow-hidden group cursor-pointer flex flex-col justify-between transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
      data-testid={`project-card-${project.id}`}
    >
      {/* Media Thumbnail with Video Preview on Hover */}
      <div className="relative aspect-video w-full overflow-hidden bg-cinematic-950">
        <img
          src={project.thumbnail}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            isHovered ? 'brightness-75' : 'brightness-90'
          }`}
        />

        {/* Video Preview stream simulation */}
        {isHovered && project.videoPreview && (
          <video
            src={project.videoPreview}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-300"
          />
        )}

        {/* Gradient dark scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinematic-950 via-cinematic-950/20 to-transparent pointer-events-none" />

        {/* Category & Badge Top Overlays */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <Badge variant="default" size="sm" className="bg-black/70 backdrop-blur-md border-white/10 font-mono text-[10px]">
            {project.category}
          </Badge>
          
          {project.badge && (
            <Badge variant="amber" size="sm" className="bg-amber-950/70 backdrop-blur-md font-mono text-[10px]">
              <Award className="w-3 h-3 mr-1" />
              {project.badge.split(' ')[0]} {project.badge.split(' ')[1]}
            </Badge>
          )}
        </div>

        {/* Hover Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-14 h-14 rounded-full bg-amber-500 text-cinematic-950 flex items-center justify-center shadow-glow-amber transition-all duration-300 ${
              isHovered ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
            }`}
          >
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>
        </div>

        {/* Bottom Specs HUD */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-cinematic-300 pointer-events-none z-10">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{project.runtime}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-cinematic-500">VIEWS:</span>
            <span className="text-amber-400 font-semibold">{project.views}</span>
          </div>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[11px] font-mono text-amber-400/90 uppercase tracking-wider block">
                {project.client}
              </span>
              <h3 className="text-lg font-display font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors mt-0.5">
                {project.title}
              </h3>
            </div>
            <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-amber-500/20 flex items-center justify-center transition-all shrink-0">
              <ArrowUpRight className="w-4 h-4 text-cinematic-400 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          <p className="text-xs text-cinematic-300 mt-2 line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Roles & Software Badges */}
        <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
          {project.roles.map((role) => (
            <span
              key={role}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-cinematic-900 border border-white/10 text-cinematic-300"
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

