import { useState, useEffect } from 'react';
import type { Project } from './types';
import { PROJECTS } from './data/projects';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/About';
import { ServicesSection } from './components/Services';
import { ProjectsSection } from './components/Projects';
import { RoiCalculator } from './components/RoiCalculator';
import { SkillsSection } from './components/Skills';
import { ProcessSection } from './components/Process';
import { ContactSection } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#121010] text-zinc-100' : 'bg-slate-50 text-slate-900'} font-mono relative selection:bg-cyan-500/30 selection:text-white`}>
      {/* Fixed Navigation */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content Sections */}
      <main className="bg-[#121010]">
        <Hero onOpenProjectModal={(proj) => setSelectedProject(proj)} />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection projects={PROJECTS} onOpenDetails={(proj) => setSelectedProject(proj)} />
        <RoiCalculator />
        <SkillsSection />
        <ProcessSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
