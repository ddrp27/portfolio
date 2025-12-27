import { motion } from 'framer-motion';

const Navbar = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            if (window.lenis) {
                window.lenis.scrollTo(element);
            } else {
                element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
            }
        }
    };

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="fixed top-4 right-4 md:top-10 md:right-10 z-50 pointer-events-none"
        >
            <div className="bg-black/20 backdrop-blur-md border border-white/10 px-6 md:px-8 py-3 md:py-4 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] pointer-events-auto overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <ul className="flex gap-4 md:gap-8 relative z-10">
                    <li>
                        <button
                            onClick={() => scrollToSection('home')}
                            className="text-white text-[9px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase hover:text-neutral-400 transition-colors"
                        >
                            About
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => scrollToSection('work')}
                            className="text-white text-[9px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase hover:text-neutral-400 transition-colors"
                        >
                            Work
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="text-white text-[9px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase hover:text-neutral-400 transition-colors"
                        >
                            Contact
                        </button>
                    </li>
                </ul>
            </div>
        </motion.nav>
    );
};

export default Navbar;