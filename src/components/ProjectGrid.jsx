import React, { useState, useMemo } from 'react';
import { Search, Film } from 'lucide-react';
import { PROJECTS, CATEGORIES } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { CaseStudyModal } from './CaseStudyModal';
import { Badge } from './ui/Badge';

export function ProjectGrid({ selectedProject: extSelectedProject, onSelectProject: extOnSelectProject }) {
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

  return (
    <section id="projects" className="py-24 relative bg-kage-ink/90 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="rose" size="sm">
                SELECTED WORKS
              </Badge>
              <span className="text-xs font-mono text-kage-muted">
                40+ BRAND COLLABORATIONS & SHORT FILMS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Featured Filmography & Cuts
            </h2>
            <p className="text-kage-boneDim text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
              Explore Pranay's latest editorial cuts: commercial brand campaigns, kinetic motion ads, viral vertical reels, and dramatic short films. Click any card to launch the full case study.
            </p>
          </div>

          <div className="text-xs font-mono text-kage-muted self-start md:self-end">
            SHOWING <span className="text-white font-bold">{filteredProjects.length}</span> OF {PROJECTS.length} CUTS
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 p-2 rounded-2xl bg-kage-ink2/80 border border-white/10 backdrop-blur-xl">
          
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium font-mono whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-kage-vermilion text-white font-bold shadow-glow-vermilion'
                    : 'text-kage-boneDim hover:text-white hover:bg-white/5'
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
              className="w-full bg-kage-ink border border-white/10 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-kage-muted focus:outline-none focus:border-kage-vermilion/60 transition-colors"
            />
          </div>

        </div>

        {/* Projects Bento Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl origin-card flex flex-col items-center justify-center gap-3">
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
              className="mt-2 text-xs font-mono text-kage-vermilion hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

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
