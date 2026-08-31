import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectGrid } from './components/ProjectGrid';
import { ColorGradingSlider } from './components/ColorGradingSlider';
import { NleTimeline } from './components/NleTimeline';
import { StemsAudioMixer } from './components/StemsAudioMixer';
import { GearArsenal } from './components/GearArsenal';
import { Testimonials } from './components/Testimonials';
import { ProjectEstimator } from './components/ProjectEstimator';
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

  const handleOpenContactWithSpecs = (specs) => {
    setEstimatorSpecs(specs);
    setContactOpen(true);
  };

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

      {/* Top Navigation */}
      <Navbar
        onOpenShowreel={() => setShowreelOpen(true)}
        onOpenContact={handleOpenGeneralContact}
        ambientAudio={ambientAudio}
        toggleAmbientAudio={toggleAmbientAudio}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Chapter I: The Gate */}
        <HeroSection
          onOpenShowreel={() => setShowreelOpen(true)}
          onOpenContact={handleOpenGeneralContact}
        />

        {/* Chapter II: Selected Works & 3D Vault */}
        <ProjectGrid
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
        />

        {/* Chapter III: Color Grading & ACES Scopes */}
        <ColorGradingSlider />

        {/* Chapter IV: NLE Multi-Track Timeline */}
        <NleTimeline />

        {/* Chapter V: 5.1 Sound Design & Foley Mixer */}
        <StemsAudioMixer />

        {/* Studio Arsenal & Hardware */}
        <GearArsenal />

        {/* Industry Collaborations & Testimonials */}
        <Testimonials />

        {/* Chapter VI: Scope Estimator & Rates */}
        <ProjectEstimator onOpenContactWithSpecs={handleOpenContactWithSpecs} />
      </main>

      {/* Footer */}
      <Footer />

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
