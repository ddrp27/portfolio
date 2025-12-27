import { motion } from 'framer-motion';
import portraitImage from '../assets/me.png';

const HomeProfile = () => {
    const techStack = {
        design: ['Adobe Suite', 'Figma', 'UI Development'],
        tech3D: ['Clo3D', 'Generative AI', 'Vercel'],
        management: ['Jira', 'Agile/Scrum', 'Product Lifecycle']
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const handleScrollToWork = () => {
        const workSection = document.getElementById('work');
        if (workSection) {
            workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section
            id="home"
            className="relative w-full h-[100dvh] bg-[#958671] snap-start overflow-hidden"
        >
            {/* CAPA 1: PORTRAIT */}
            <div className="absolute inset-y-0 left-0 w-full lg:w-[48%] z-0 h-[50vh] lg:h-full">
                <motion.div
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="w-full h-full"
                >
                    <img
                        src={portraitImage}
                        alt="Daniel Diaz Portrait"
                        className="w-full h-full object-cover object-top"
                    />
                </motion.div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#958671] to-transparent lg:hidden"></div>
            </div>
            {/* CAPA 2: GLASS PANEL CONTENT */}
            <div className="relative z-10 w-full h-full flex flex-col lg:flex-row">

                {/* Mobile Spacer */}
                <div className="h-[45vh] w-full lg:hidden shrink-0"></div>

                <div className="hidden lg:block lg:w-[40%]"></div>

                {/* CAMBIO: Quitamos justify-center en móvil para que el scroll empiece desde arriba */}
                <div className="flex-1 w-full h-auto min-h-[55vh] lg:h-full lg:min-h-0 overflow-y-auto px-6 md:px-16 lg:px-20 py-12 lg:flex lg:flex-col lg:justify-center glass-card border-t lg:border-t-0 lg:border-l border-white/10 shadow-2xl relative">

                    <div className="absolute inset-0 bg-black/40 lg:bg-black/30 pointer-events-none"></div>

                    <motion.div
                        className="max-w-2xl mx-auto lg:ml-0 relative z-10"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* 1. TÍTULO CON CLAMP (Letra elástica) */}
                        <motion.div variants={itemVariants} className="mb-8 border-b border-white/10 pb-10">
                            <h1 className="font-sans font-black tracking-tighter leading-[0.8] mb-6">
                                <motion.span
                                    // 'clamp' ajusta el tamaño entre 3rem y 8rem según el ancho de pantalla
                                    className="block text-[clamp(3rem,12vw,8rem)] text-white"
                                    whileHover={{ x: 10 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    DANIEL
                                </motion.span>
                                <motion.span
                                    className="block text-[clamp(3rem,12vw,8rem)] text-[#e3eaf2]"
                                    whileHover={{ x: 10 }}
                                    transition={{ type: 'spring', stiffness: 300, delay: 0.05 }}
                                >
                                    DIAZ
                                </motion.span>
                            </h1>
                            <p className="text-white/60 text-[10px] tracking-[0.4em] uppercase font-black">
                                Textile Designer & Project Manager
                            </p>
                        </motion.div>

                        {/* 2. DESCRIPCIONES (Reducimos márgenes para ganar aire) */}
                        <motion.div variants={itemVariants} className="mb-6">
                            <p className="font-sans text-white/90 text-base md:text-xl font-light leading-relaxed">
                                I bridge the gap between abstract concepts and tangible (and scalable) products. As a Textile Designer and Master's Candidate in Project Management, I don't just design prints; I oversee the entire product lifecycle by integrating Agile (Scrum) methodologies and cutting-edge AI into the creative process.

                                <br></br>My superpower? Versatility. I can validate international manufacturing in the morning, optimize workflows with AI tools by noon, and build functional Front-end interfaces by afternoon. I thrive on transforming technical complexity into high-quality, deadline-driven deliverables.
                            </p>
                        </motion.div>

                        {/* 4. TECH STACK (Grid que colapsa mejor) */}
                        <motion.div variants={itemVariants} className="mb-10 grid grid-cols-2 md:grid-cols-3 gap-6">
                            {/* ... tus divs de techStack igual, pero con mb-10 ... */}
                            <div>
                                <span className="text-white/40 text-[9px] tracking-[0.4em] uppercase font-black mb-2 block">Design</span>
                                <div className="text-white/70 text-xs font-sans">
                                    {techStack.design.join(' / ')}
                                </div>
                            </div>
                            {/* Repite para los otros 2 bloques del stack */}
                        </motion.div>

                        {/* 5. CTA */}
                        <motion.div variants={itemVariants}>
                            <motion.button
                                onClick={handleScrollToWork}
                                className="group flex items-center gap-6 text-white uppercase tracking-[0.3em] text-[10px] font-black bg-white/5 px-10 py-5 rounded-full backdrop-blur-md border border-white/10 shadow-lg"
                            >
                                Explore My Work &rarr;
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HomeProfile;