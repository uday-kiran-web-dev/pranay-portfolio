import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Search, Film, Sparkles, Filter, ArrowUpRight } from 'lucide-react';
import { PROJECTS, CATEGORIES } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { Badge } from './ui/Badge';
import { Footer } from './Footer';

export function AllProjectsPage({ onBackToHome, onSelectProject, onOpenContact }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top upon opening the all projects page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

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
    <div className="min-h-screen bg-kage-ink text-kage-bone pt-28 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-panel-interactive text-xs font-mono text-cyan-300 hover:text-white transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>← Back to Home Portfolio</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-kage-muted">
            <span>ARCHIVE</span>
            <span>/</span>
            <span className="text-cyan-400 font-bold">{PROJECTS.length} TOTAL CUTS</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="cyan" size="sm">
                FULL FILMOGRAPHY & BRAND ARCHIVE
              </Badge>
              <span className="text-xs font-mono text-kage-muted">
                COMMERCIAL • MOTION • SHORT FILMS
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight">
              All Client Projects & Cuts
            </h1>
            <p className="text-kage-boneDim text-sm sm:text-base max-w-3xl mt-3 leading-relaxed">
              Explore every commercial campaign, kinetic motion graphics spot, corporate film, episodic entertainment show, and narrative short film edited by <strong className="text-white">Pranay Kumar</strong>. Click any card to launch the comprehensive case study.
            </p>
          </div>

          <div className="text-xs font-mono text-kage-muted self-start md:self-end backdrop-blur-xl px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            DISPLAYING <span className="text-cyan-400 font-bold">{filteredProjects.length}</span> OF {PROJECTS.length} CLIENTS
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 p-2.5 rounded-2xl glass-panel shadow-2xl">
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
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-kage-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search client, brand, role, style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-input rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-kage-muted focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Full 12-Card Bento Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => onSelectProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="p-16 text-center rounded-3xl glass-panel flex flex-col items-center justify-center gap-3">
            <Film className="w-10 h-10 text-cyan-400/60" />
            <h3 className="text-lg font-semibold text-white">No projects found</h3>
            <p className="text-xs text-kage-muted max-w-sm">
              No matching projects for "{searchQuery}". Try selecting "All" or searching by client name (e.g. Flipkart, KUKU FM, Paynexa).
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-xs font-mono text-cyan-300 hover:bg-blue-600/30 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Navigation CTA */}
        <div className="mt-16 p-8 rounded-3xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-white">
              Ready to start your next cut?
            </h3>
            <p className="text-xs sm:text-sm text-kage-boneDim mt-1">
              Collaborate directly with Pranay Kumar on your commercial, film, or social campaign.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-5 py-2.5 rounded-xl glass-pill text-xs font-mono text-kage-boneDim hover:text-white transition-all cursor-pointer"
            >
              ← Back to Main Portfolio
            </button>
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-[0_4px_15px_rgba(0,102,255,0.4)] cursor-pointer"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-20">
        <Footer onOpenContact={onOpenContact} />
      </div>
    </div>
  );
}
