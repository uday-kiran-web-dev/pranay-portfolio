import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectGrid } from './components/ProjectGrid';
import { Statistics } from './components/Statistics';
import { About } from './components/About';
import { Services } from './components/Services';
import { Footer } from './components/Footer';
import { AllProjectsPage } from './components/AllProjectsPage';
import { ContactModal } from './components/ContactModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ToastProvider } from './components/ui/Toast';
import { KageBackground } from './components/kage/KageBackground';
import { KageProgressRail } from './components/kage/KageProgressRail';
import { useAmbientSuiteAudio } from './utils/ambientAudio';

function PortfolioApp() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'all-projects'
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [estimatorSpecs, setEstimatorSpecs] = useState(null);

  const { isPlaying: ambientAudio, toggle: toggleAmbientAudio } = useAmbientSuiteAudio();

  // Hash listener for direct navigation (e.g. #all-projects)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#all-projects') {
        setCurrentView('all-projects');
      } else if (currentView === 'all-projects' && hash !== '#all-projects') {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  const handleOpenGeneralContact = () => {
    setEstimatorSpecs(null);
    setContactOpen(true);
  };

  const handleOpenAllProjects = () => {
    window.location.hash = 'all-projects';
    setCurrentView('all-projects');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateHome = (targetHash = '#work') => {
    setCurrentView('home');
    if (window.location.hash === '#all-projects') {
      history.pushState(null, '', targetHash || '#');
    }
    setTimeout(() => {
      if (targetHash && targetHash !== '#') {
        const el = document.querySelector(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="relative min-h-screen bg-kage-ink text-kage-bone overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Kage Ambient Background & Depth Overlays */}
      <KageBackground />
      <div className="kage-vignette" />
      <div className="kage-grain" />

      {/* Chapter Rail only on Home view */}
      {currentView === 'home' && <KageProgressRail />}

      {/* 01 Navigation */}
      <Navbar
        onOpenContact={handleOpenGeneralContact}
        ambientAudio={ambientAudio}
        toggleAmbientAudio={toggleAmbientAudio}
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
      />

      {/* View Switcher: Home View vs All Projects View */}
      {currentView === 'home' ? (
        <main className="relative z-10">
          {/* 01: Hero Gate */}
          <HeroSection onOpenContact={handleOpenGeneralContact} />

          {/* 02: Selected Work (Top 6 Featured Cards + View All CTA) */}
          <ProjectGrid
            selectedProject={selectedProject}
            onSelectProject={setSelectedProject}
            onViewAllProjects={handleOpenAllProjects}
          />

          {/* 03: Verified Statistics Strip */}
          <Statistics />

          {/* 04: About Me & Experience */}
          <About onOpenContact={handleOpenGeneralContact} />

          {/* 05: Services & Capabilities */}
          <Services />

          {/* 06: Dark Creative Contact Footer */}
          <Footer onOpenContact={handleOpenGeneralContact} />
        </main>
      ) : (
        <AllProjectsPage
          onBackToHome={() => handleNavigateHome('#work')}
          onSelectProject={setSelectedProject}
          onOpenContact={handleOpenGeneralContact}
        />
      )}

      {/* Root-Level Modals */}
      <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        initialSpecs={estimatorSpecs}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <PortfolioApp />
    </ToastProvider>
  );
}

