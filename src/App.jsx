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
import img4 from './assets/s-image4.png';
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
    description: "This collection was engineered to capture the transitional essence of the 2025 season by blending timeless Mediterranean aesthetics with data-driven retail trends. The project required a meticulous balance between high-impact visual design and manufacturing feasibility, ensuring a cohesive story across multiple product categories.",
    metricValue: "+45%",
    metricLabel: "Growth Yield",
    supportImages: [img1, img2, img3, img4], // Aquí pones las fotos únicas de este proyecto
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
      // Activamos el snap si las secciones tienen el atributo data-lenis-snap
      lerp: 0.1,
    });

    lenisRef.current = lenis;

    // Truco para simular el SNAP:
    // Escuchamos cuando el usuario deja de scrollear y lo llevamos a la sección más cercana
    lenis.on('scroll', () => {
      // Aquí podrías añadir lógica personalizada, pero Lenis 
      // por sí solo no tiene un "snap-proximity" nativo de un click.
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
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
          {projects.map((project) => (
            <section key={project.id} className="h-screen w-full">
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
