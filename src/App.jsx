import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectGrid } from './components/ProjectGrid';
import { Statistics } from './components/Statistics';
import { About } from './components/About';
import { Services } from './components/Services';
import { Footer } from './components/Footer';
import { ShowreelModal } from './components/ShowreelModal';
import { ContactModal } from './components/ContactModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ToastProvider } from './components/ui/Toast';
import { KageBackground } from './components/kage/KageBackground';
import { KageProgressRail } from './components/kage/KageProgressRail';
import { useAmbientSuiteAudio } from './utils/ambientAudio';

function PortfolioApp() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [estimatorSpecs, setEstimatorSpecs] = useState(null);

  const { isPlaying: ambientAudio, toggle: toggleAmbientAudio } = useAmbientSuiteAudio();

  const handleOpenGeneralContact = () => {
    setEstimatorSpecs(null);
    setContactOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-kage-ink text-kage-bone overflow-hidden selection:bg-kage-vermilion selection:text-white">
      {/* Kage Ambient Background & Depth Overlays */}
      <KageBackground />
      <div className="kage-vignette" />
      <div className="kage-grain" />

      {/* Kage Side Chapter Navigation Rail */}
      <KageProgressRail />

      {/* 01 Navigation */}
      <Navbar
        onOpenShowreel={() => setShowreelOpen(true)}
        onOpenContact={handleOpenGeneralContact}
        ambientAudio={ambientAudio}
        toggleAmbientAudio={toggleAmbientAudio}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 01: Hero Gate */}
        <HeroSection
          onOpenShowreel={() => setShowreelOpen(true)}
          onOpenContact={handleOpenGeneralContact}
        />

        {/* 02: Selected Work */}
        <ProjectGrid
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
        />

        {/* 03: Verified Statistics Strip */}
        <Statistics />

        {/* 04: About Me & Experience */}
        <About onOpenContact={handleOpenGeneralContact} />

        {/* 05: Services & Capabilities */}
        <Services />
      </main>

      {/* 06: Dark Creative Contact Footer */}
      <Footer onOpenContact={handleOpenGeneralContact} />

      {/* Root-Level Modals */}
      <ShowreelModal isOpen={showreelOpen} onClose={() => setShowreelOpen(false)} />
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
