import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HomeProfile from './components/HomeProfile';
import ProjectCard from './components/ProjectCard';
import ContactSection from './components/ContactSection';
import ProjectPagination from './components/ProjectPagination';

// Imports de activos (Verifica que existan en src/assets/)
import pattern1 from './assets/pattern1.jpg';
import mockup1 from './assets/mockup1.png';
import pattern2 from './assets/pattern2.jpg';
import mockup2 from './assets/mockup2.png';
// Ojo: Si la carpeta es 'assets', úsala siempre en minúsculas para evitar líos en Vercel
import pattern3 from './assets/pattern3.jpg';
import mockup3 from './assets/mockup3.png';

const projects = [
  {
    id: 1,
    title: 'Mediterranean Dreams',
    date: 'Azzorti 2025',
    pattern: pattern1,
    mockup: mockup1,
    // Agregamos imágenes de apoyo reales aquí
    supportImages: [pattern1, mockup1, pattern1, mockup1]
  },
  {
    id: 2,
    title: 'Bohemian Breeze',
    date: 'Azzorti 2025',
    pattern: pattern2,
    mockup: mockup2,
    supportImages: [pattern2, mockup2, pattern2, mockup2]
  },
  {
    id: 3,
    title: 'Classic Contrast',
    date: 'Azzorti 2024',
    pattern: pattern3,
    mockup: mockup3,
    supportImages: [pattern3, mockup3, pattern3, mockup3]
  }
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    const lenis = new Lenis({
      wrapper: mainElement,
      content: mainElement.querySelector('.scroll-content'),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      const scrollTop = mainElement.scrollTop;
      const height = window.innerHeight;
      const index = Math.round(scrollTop / height);
      setActiveIndex(index);
    };

    mainElement.addEventListener('scroll', handleScroll);
    return () => {
      lenis.destroy();
      mainElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePageClick = (index) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(index * window.innerHeight);
    }
  };

  return (
    <div className="bg-neutral-900 text-white selection:bg-white selection:text-black">
      <Navbar />
      <ProjectPagination
        projects={projects}
        activeIndex={activeIndex}
        onPageClick={handlePageClick}
      />

      <main
        ref={mainRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory"
      >
        <div className="scroll-content flex flex-col w-full">
          <section id="home" className="h-screen snap-start">
            <HomeProfile />
          </section>

          {projects.map((project) => (
            <section key={project.id} className="h-screen snap-start">
              <ProjectCard project={project} />
            </section>
          ))}

          <section id="contact" className="h-screen snap-start">
            <ContactSection />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
