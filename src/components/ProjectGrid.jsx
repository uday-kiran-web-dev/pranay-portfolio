import React, { useState, useMemo } from 'react';
import { Search, Film, ArrowRight, Grid, ArrowUpRight } from 'lucide-react';
import { PROJECTS, CATEGORIES } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { CaseStudyModal } from './CaseStudyModal';
import { Badge } from './ui/Badge';

export function ProjectGrid({
  selectedProject: extSelectedProject,
  onSelectProject: extOnSelectProject,
  onViewAllProjects,
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [internalSelectedProject, setInternalSelectedProject] = useState(null);

  const selectedProject = extSelectedProject !== undefined ? extSelectedProject : internalSelectedProject;
  const setSelectedProject = extOnSelectProject || setInternalSelectedProject;

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
      const matchesSearch =
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.roles.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase())) ||
        proj.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Front page displays top 6 client cards only
  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, 6);
  }, [filteredProjects]);

  return (
    <section id="work" className="py-24 relative bg-kage-ink/90 border-t border-white/5 scroll-mt-20">
      <span id="projects" className="absolute -top-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="cyan" size="sm">
                SELECTED WORK
              </Badge>
              <span className="text-xs font-mono text-kage-muted">
                FEATURED CLIENT COLLABORATIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Featured Filmography & Cuts
            </h2>
            <p className="text-kage-boneDim text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
              Explore Pranay Kumar's latest editorial cuts: commercial brand campaigns, kinetic motion ads, viral vertical reels, and dramatic short films. Click any card to launch the full case study.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={onViewAllProjects}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 hover:bg-blue-600/35 border border-blue-500/40 text-xs font-mono text-cyan-300 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,102,255,0.2)]"
            >
              <span>View All 12 Clients</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="text-xs font-mono text-kage-muted backdrop-blur-xl px-3 py-2 rounded-full bg-white/[0.03] border border-white/10 hidden sm:block">
              SHOWING <span className="text-cyan-400 font-bold">{displayedProjects.length}</span> OF {PROJECTS.length}
            </div>
          </div>
        </div>

        {/* Frosted Glass Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 p-2 rounded-2xl glass-panel">
          
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium font-mono whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'glass-pill-active text-white font-bold'
                    : 'text-kage-boneDim hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-kage-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search client, style, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-input rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-kage-muted focus:outline-none transition-colors"
            />
          </div>

        </div>

        {/* Front Page: 6 Bento Cards Grid */}
        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl glass-panel flex flex-col items-center justify-center gap-3">
            <Film className="w-8 h-8 text-kage-muted" />
            <h4 className="text-base font-semibold text-white">No projects found</h4>
            <p className="text-xs text-kage-muted max-w-sm">
              No matching projects for "{searchQuery}". Try selecting "All" or clearing the search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Prominent "View All Projects" Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl glass-panel border border-blue-500/25 shadow-[0_0_30px_rgba(0,102,255,0.15)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-[11px] font-mono text-cyan-400 font-semibold mb-2">
              <Grid className="w-3.5 h-3.5" />
              <span>EXPANDED ARCHIVE AVAILABLE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
              Looking for more client cuts and short films?
            </h3>
            <p className="text-xs sm:text-sm text-kage-boneDim mt-1">
              Explore the full archive featuring all 12 commercial ads, episodic entertainment, fintech videos, and wedding cinema.
            </p>
          </div>

          <button
            onClick={onViewAllProjects}
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wider transition-all shadow-[0_4px_20px_rgba(0,102,255,0.45)] hover:shadow-[0_6px_25px_rgba(0,102,255,0.6)] cursor-pointer whitespace-nowrap"
          >
            <span>View All 12 Client Cuts</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

      {/* Internal fallback if not provided via props */}
      {extSelectedProject === undefined && (
        <CaseStudyModal
          project={internalSelectedProject}
          onClose={() => setInternalSelectedProject(null)}
        />
      )}
    </section>
  );
}

