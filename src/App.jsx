import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import Home from './components/sections/Home';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import ProjectModal from './components/ui/ProjectModal';
import viteLogo from '/vite.svg'

// Assets
import pattern1 from './assets/pattern1.webp';
import mockup1 from './assets/mockup1.webp';
import img1 from './assets/s-image1.webp';
import img2 from './assets/s-image2.webp';
import img3 from './assets/s-image3.webp';

import pattern2 from './assets/pattern2.webp';
import mockup2 from './assets/mockup2.webp';
import pattern3 from './assets/pattern3.webp';
import mockup3 from './assets/mockup3.webp';

const projects = [
  {
    id: 1,
    title: 'Mediterranean Dreams',
    date: 'Azzorti 2025',
    pattern: pattern1,
    mockup: mockup1,
    description: "Mediterranean Dreams is a commercially focused textile collection developed to deliver a fresh, timeless visual identity aligned with warm-climate consumer behavior and everyday wear. The collection is anchored in botanical print design, reinterpreted through a clean, contemporary lens to ensure retail relevance and long-term usability.The color strategy is built around high-contrast neutrals and Mediterranean blues, enabling strong visual impact while maintaining versatility across multiple product categories.",
    metricValue: "6052",
    metricLabel: "Sales Units",
    supportImages: [img1, img2, img3],
    tools: ['photoshop', 'illustrator', 'gemini']
  },
  {
    id: 2,
    title: 'Bohemian Breeze',
    date: 'Azzorti 2025',
    pattern: pattern2,
    mockup: mockup2,
    description: "A free-spirited collection featuring intricate paisley patterns and relaxed silhouettes. Designed for the modern bohemian, this collection emphasizes comfort without compromising on style. The palette utilizes warm earth tones mixed with vibrant accents to create a dynamic visual experience.",
    metricValue: "4120",
    metricLabel: "Sales Units",
    supportImages: [pattern2, mockup2, pattern2, mockup2],
    tools: ['illustrator', 'photoshop']
  },
  {
    id: 3,
    title: 'Classic Contrast',
    date: 'Azzorti 2024',
    pattern: pattern3,
    mockup: mockup3,
    description: "Reimagining classic motifs with a high-contrast black and white approach. This collection focuses on geometric precision and bold statements suitable for formal and semi-formal wear. It bridges the gap between traditional elegance and modern minimalism.",
    metricValue: "3890",
    metricLabel: "Sales Units",
    supportImages: [pattern3, mockup3, pattern3, mockup3],
    tools: ['photoshop']
  }
];

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <div className="bg-neutral-900 min-h-screen text-white selection:bg-[#958771] selection:text-white font-sans">

      <main className="relative w-full">
        {/* Sections */}
        <section id="home">
          <Home />
        </section>

        <section id="work" className="relative z-10">
          <Projects
            projects={projects}
            onProjectClick={setSelectedProject}
          />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Modal - Rendered at root level for accessibility and z-index handling */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
}

export default App;
