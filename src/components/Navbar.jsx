import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [activeSection, setActiveSection] = useState('work');

    useEffect(() => {
        const sections = ['work', 'about', 'contact'];
        const observers = [];

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observerOptions = {
            root: null, // Use the viewport
            threshold: 0.5, // Trigger when 50% visible. For wide horizontal sections, this might need tuning.
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="fixed bottom-0 left-0 w-full z-[100] px-8 py-8 flex justify-between items-end mix-blend-difference text-white pointer-events-none">
            <div className="font-serif text-2xl tracking-tighter pointer-events-auto cursor-pointer flex flex-col">
                <span className="leading-none">DANIEL</span>
                <span className="leading-none italic text-neutral-400">DIAZ</span>
            </div>

            <div className="flex gap-12 font-sans text-[10px] tracking-[0.4em] uppercase pointer-events-auto">
                {[
                    { label: 'Work', href: '#work', id: 'work' },
                    { label: 'About', href: '#about', id: 'about' },
                    { label: 'Contact', href: '#contact', id: 'contact' }
                ].map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className={`relative transition-colors duration-300 ${activeSection === item.id ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                        onClick={() => setActiveSection(item.id)} // Instant update on click
                    >
                        {item.label}
                        {activeSection === item.id && (
                            <motion.span
                                layoutId="active-nav"
                                className="absolute -bottom-2 left-0 w-full h-[1px] bg-white"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;

