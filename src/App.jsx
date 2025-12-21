import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HomeProfile from './components/HomeProfile';
import ProjectCard from './components/ProjectCard';
import ContactSection from './components/ContactSection';
import ProjectPagination from './components/ProjectPagination';
import ProjectModal from './components/ProjectModal';
import pattern1 from './assets/pattern1.jpg';
import mockup1 from './assets/mockup1.png';
// import supportA1' from './ assets / support1 - a.jpg';
// import supportB1' from './ assets / support1 - b.jpg';
// ============================================================================
// REPLACE PLACEHOLDER IMAGES WITH YOUR ACTUAL PROJECT IMAGES
// ============================================================================
// 
// STEP 1: Add your images to the src/assets/ folder with these names:
//   - pattern1.png, mockup1.png (for Textural Flow)
//   - pattern2.png, mockup2.png (for Kinetic Warp)
//   - pattern3.png, mockup3.png (for Velvet Digital)
//   - pattern4.png, mockup4.png (for Prism Weave)
//   - pattern5.png, mockup5.png (for Aether Silk)
//   - pattern6.png, mockup6.png (for Carbon Thread)
//
// STEP 2: Uncomment the import lines below (remove the //)
// STEP 3: Replace the placeholder URLs in each project with the imported variables
//        Example: pattern: pattern1, mockup: mockup1
// ============================================================================

// Temporarily commented out - add your actual images to src/assets/
// import pattern1 from './assets/pattern1.jpg';
// import mockup1 from './assets/mockup1.png';
import pattern2 from './assets/pattern2.jpg';
import mockup2 from './assets/mockup2.png';
import pattern3 from './ASSETS/pattern3.JPG';
import mockup3 from './ASSETS/mockup3.PNG';
// import pattern4 from './assets/pattern4.png';
// import mockup4 from './assets/mockup4.png';
// import pattern5 from './assets/pattern5.png';
// import mockup5 from './assets/mockup5.png';
// import pattern6 from './assets/pattern6.png';
// import mockup6 from './assets/mockup6.png';

const projects = [
  {
    id: 1,
    title: 'Mediterranean Dreams',
    date: 'Azzorti 2025',
    // CORRECCIÓN AQUÍ: Quité las comillas '' para usar las variables importadas
    pattern: pattern1,
    mockup: mockup1,
  },
  {
    id: 2,
    title: 'Bohemian Breeze',
    date: 'Azzorti 2025',
    // TODO: Replace these placeholder URLs with: pattern: pattern2, mockup: mockup2
    pattern: pattern2,
    mockup: mockup2
  },
  {
    id: 3,
    title: 'Classic Contrast',
    date: 'Azzorti 2024',
    // TODO: Replace these placeholder URLs with: pattern: pattern3, mockup: mockup3
    pattern: pattern3,
    mockup: mockup3
  },
  {
    id: 4,
    title: 'Prism Weave',
    date: 'Winter 2024',
    // TODO: Replace these placeholder URLs with: pattern: pattern4, mockup: mockup4
    pattern: 'https://via.placeholder.com/1920x1080/1a1a1a/666666?text=Pattern+4',
    mockup: 'https://via.placeholder.com/1920x1080/2a2a2a/888888?text=Mockup+4'
  },
  {
    id: 5,
    title: 'Aether Silk',
    date: 'Spring 2025',
    // TODO: Replace these placeholder URLs with: pattern: pattern5, mockup: mockup5
    pattern: 'https://via.placeholder.com/1920x1080/1a1a1a/666666?text=Pattern+5',
    mockup: 'https://via.placeholder.com/1920x1080/2a2a2a/888888?text=Mockup+5'
  },
  {
    id: 6,
    title: 'Carbon Thread',
    date: 'Summer 2025',
    // TODO: Replace these placeholder URLs with: pattern: pattern6, mockup: mockup6
    pattern: 'https://via.placeholder.com/1920x1080/1a1a1a/666666?text=Pattern+6',
    mockup: 'https://via.placeholder.com/1920x1080/2a2a2a/888888?text=Mockup+6'
  },
  /* 
    {
      id: 7,
      title: 'Mediterranean Dreams',
      date: 'Spring 2025',
      pattern: pattern1,
      mockup: mockup1,
      // AGREGAMOS ESTO:
      supportImages: [supportA1, supportB1]
    },
    */
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const mainRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    // Initialize Lenis on the main container specifically
    const lenis = new Lenis({
      wrapper: mainElement, // The scrollable element
      content: mainElement.querySelector('div'), // The inner content wrapper
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.5,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Scroll Listener for Pagination
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
    } else if (mainRef.current) {
      mainRef.current.scrollTo({ top: index * window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <>
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <main
        ref={mainRef}
        className="relative bg-neutral-900 w-full h-screen overflow-y-auto overflow-x-hidden selection:bg-white selection:text-black snap-y snap-proximity"
      >
        <Navbar />
        <ProjectPagination
          projects={projects}
          activeIndex={activeIndex}
          onPageClick={handlePageClick}
        />

        {/* Vertical Container */}
        <div className="flex flex-col w-full">

          {/* Section 1: Landing Dashboard */}
          <section id="home" className="w-full h-screen snap-start">
            <HomeProfile />
          </section>

          {/* Section 2: Work Section */}
          <div id="work" className="flex flex-col">
            {projects.map((project) => (
              <section key={project.id} className="w-full h-screen snap-start">
                <ProjectCard
                  project={project}
                  openModal={(p) => setSelectedProject(p)}
                />
              </section>
            ))}
          </div>

          {/* Section 3: Footer / Contact */}
          <section id="contact" className="w-full h-screen snap-start">
            <ContactSection />
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
