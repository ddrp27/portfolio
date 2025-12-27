import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import HomeProfile from './components/HomeProfile';
import ProjectCard from './components/ProjectCard';
import ContactSection from './components/ContactSection';
import ProjectPagination from './components/ProjectPagination';

// Assets
import pattern1 from './assets/pattern1.jpg';
import mockup1 from './assets/mockup1.png';
import img1 from './assets/s-image1.png';
import img2 from './assets/s-image2.png';
import img3 from './assets/s-image3.png';

import pattern2 from './assets/pattern2.jpg';
import mockup2 from './assets/mockup2.png';
import pattern3 from './assets/pattern3.jpg';
import mockup3 from './assets/mockup3.png';

const projects = [
  {
    id: 1,
    title: 'Mediterranean Dreams',
    date: 'Azzorti 2025',
    pattern: pattern1,
    mockup: mockup1,
    // NUEVOS CAMPOS DINÁMICOS:
    description: "Mediterranean Dreams is a commercially focused textile collection developed to deliver a fresh, timeless visual identity aligned with warm-climate consumer behavior and everyday wear. The collection is anchored in botanical print design, reinterpreted through a clean, contemporary lens to ensure retail relevance and long-term usability.The color strategy is built around high-contrast neutrals and Mediterranean blues, enabling strong visual impact while maintaining versatility across multiple product categories, including dresses, tops, knitwear, and coordinated separates. The print was engineered for cross-category scalability, ensuring consistency in both flat presentation and on-body application.",
    metricValue: "6052",
    metricLabel: "Sales Units",
    supportImages: [img1, img2, img3,], // Aquí pones las fotos únicas de este proyecto
    tools: ['photoshop', 'illustrator', 'gemini']
  },
  // Repite la estructura para el Proyecto 2, 3, etc.

  { id: 2, title: 'Bohemian Breeze', date: 'Azzorti 2025', pattern: pattern2, mockup: mockup2, supportImages: [pattern2, mockup2, pattern2, mockup2] },
  { id: 3, title: 'Classic Contrast', date: 'Azzorti 2024', pattern: pattern3, mockup: mockup3, supportImages: [pattern3, mockup3, pattern3, mockup3] }
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
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

    // Track active index based on scroll position
    lenis.on('scroll', ({ scroll }) => {
      const vh = window.innerHeight;
      const index = Math.round(scroll / vh);
      setActiveIndex(index);
    });

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

  const handlePageClick = (index) => {
    lenisRef.current?.scrollTo(index * window.innerHeight);
  };

  return (
    <div className="bg-neutral-900 text-white selection:bg-white selection:text-black">
      <Navbar />
      <ProjectPagination projects={projects} activeIndex={activeIndex} onPageClick={handlePageClick} />

      <main className="relative w-full">
        <section id="home" className="h-screen w-full">
          <HomeProfile />
        </section>

        <div id="work">
          {projects.map((project, index) => (
            <section key={project.id} id={`project-${project.id}`} className="h-screen w-full">
              <ProjectCard project={project} />
            </section>
          ))}
        </div>

        <section id="contact" className="h-screen w-full">
          <ContactSection />
        </section>
      </main>
    </div>
  );
}

export default App;