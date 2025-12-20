import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import ProjectPagination from './components/ProjectPagination';

import pattern1 from './assets/pattern1.png';
import mockup1 from './assets/mockup1.png';

const projects = [
  {
    id: 1,
    title: 'Textural Flow',
    date: 'Spring 2024',
    pattern: pattern1,
    mockup: mockup1
  },
  {
    id: 2,
    title: 'Kinetic Warp',
    date: 'Summer 2024',
    pattern: pattern1,
    mockup: mockup1
  },
  {
    id: 3,
    title: 'Velvet Digital',
    date: 'Fall 2024',
    pattern: pattern1,
    mockup: mockup1
  },
  {
    id: 4,
    title: 'Prism Weave',
    date: 'Winter 2024',
    pattern: pattern1,
    mockup: mockup1
  },
  {
    id: 5,
    title: 'Aether Silk',
    date: 'Spring 2025',
    pattern: pattern1,
    mockup: mockup1
  },
  {
    id: 6,
    title: 'Carbon Thread',
    date: 'Summer 2025',
    pattern: pattern1,
    mockup: mockup1
  },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    // Initialize Lenis on the main container specifically
    const lenis = new Lenis({
      wrapper: mainElement, // The scrollable element
      content: mainElement.querySelector('div'), // The inner content wrapper
      orientation: 'horizontal',
      gestureOrientation: 'both',
      smoothWheel: true,
      wheelMultiplier: 3,
      touchMultiplier: 3,
      infinite: false,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with the horizontal scroll
    // Since document.documentElement doesn't naturally have a horizontal scroll height,
    // we need to make sure the body/html can actually "scroll" or Lenis won't fire.
    // However, the cleanest way in horizontal mode is to let Lenis handle the window's scrollLeft.

    // Scroll Listener for Pagination
    const handleScroll = () => {
      const scrollLeft = mainElement.scrollLeft;
      const width = window.innerWidth;
      const index = Math.round(scrollLeft / width);
      // Only update if index correlates to a project (not about/contact)
      if (index < projects.length) {
        setActiveIndex(index);
      } else {
        setActiveIndex(-1); // Or keep last project active, but -1 indicates 'off projects'
      }
    };

    mainElement.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      mainElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePageClick = (index) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(index * window.innerWidth);
    } else if (mainRef.current) {
      mainRef.current.scrollTo({ left: index * window.innerWidth, behavior: 'smooth' });
    }
  };

  return (
    <main
      ref={mainRef}
      className="relative bg-neutral-900 w-full h-screen overflow-x-auto overflow-y-hidden selection:bg-white selection:text-black snap-x snap-mandatory"
    >
      <Navbar />
      <ProjectPagination
        projects={projects}
        activeIndex={activeIndex}
        onPageClick={handlePageClick}
      />

      {/* Horizontal Container */}
      <div className="flex w-max h-full">

        {/* Work Section */}
        <div id="work" className="flex">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* About Section */}
        <AboutSection />

        {/* Contact Section */}
        <ContactSection />
      </div>
    </main>
  );
}

export default App;

