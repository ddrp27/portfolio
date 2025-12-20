import { motion } from 'framer-motion';

const AboutSection = () => {
    return (
        <section id="about" className="relative w-[100vw] h-[100vh] flex-shrink-0 bg-neutral-900 flex items-center justify-center px-12 md:px-24 snap-center">
            <div className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row gap-12 items-start"
                >
                    <div className="flex-1">
                        <h2 className="font-serif text-5xl md:text-7xl text-white mb-8 tracking-tighter">
                            CRAFTING <span className="italic text-neutral-500">DIGITAL</span> TEXTURES
                        </h2>
                        <p className="font-sans text-neutral-400 text-lg md:text-xl leading-relaxed">
                            I am Daniel Diaz, a creative developer focused on building immersive interfaces that bridge the gap between physical sensation and digital experience. My work explores the intersection of high-end fashion aesthetics and cutting-edge technology.
                        </p>
                    </div>

                    <div className="flex-1 border-l border-white/10 pl-8 space-y-8">
                        <div>
                            <h3 className="text-white text-xs tracking-widest uppercase mb-4 opacity-50">Specialization</h3>
                            <ul className="text-white font-serif text-2xl space-y-2">
                                <li>Interaction Design</li>
                                <li>Motion Archetecture</li>
                                <li>Creative Coding</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white text-xs tracking-widest uppercase mb-4 opacity-50">Tools</h3>
                            <p className="text-neutral-400 font-sans text-sm tracking-wide">
                                React / Framer Motion / Three.js / GSAP / Tailwind CSS
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
        </section>
    );
};

export default AboutSection;
