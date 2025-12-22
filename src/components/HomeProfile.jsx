import { motion } from 'framer-motion';
import portraitImage from '../assets/daniel-portrait.png';

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
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
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
            className="relative w-full h-screen bg-[#958771] snap-start overflow-hidden"
        >
            {/* CAPA 1: PORTRAIT */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    className="w-full h-full"
                >
                    <img
                        src={portraitImage}
                        alt="Daniel Diaz Portrait"
                        className="w-full h-full object-cover object-[center_top]"
                    />
                </motion.div>
            </div>

            {/* CAPA 2: GLASS PANEL CONTENT */}
            <div className="relative z-10 w-full h-full flex flex-col lg:flex-row justify-end">

                <div className="hidden lg:block lg:w-[40%]"></div>

                <div className="flex-1 h-full overflow-y-auto px-8 md:px-16 lg:px-20 py-24 flex flex-col justify-center backdrop-blur-2xl bg-black/40 border-l border-white/10 shadow-2xl">

                    <motion.div
                        className="max-w-2xl mx-auto lg:ml-0"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* 1. TÍTULO */}
                        <motion.div variants={itemVariants} className="mb-10 border-b border-white/10 pb-10">
                            <h1 className="font-['Gilroy',_sans-serif] font-extrabold tracking-tighter leading-[0.85] mb-6">
                                <span className="block text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] text-white">
                                    DANIEL
                                </span>
                                <span className="block text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] text-[#e3eaf2]">
                                    DIAZ
                                </span>
                            </h1>
                            <p className="text-white-400 text-xs tracking-[0.4em] uppercase font-black">
                                Textile Designer & Project Manager
                            </p>
                        </motion.div>

                        {/* 2. NUEVA DESCRIPCIÓN (BLOQUE 1) */}
                        <motion.div variants={itemVariants} className="mb-6">
                            <p className="font-['Gilroy',_sans-serif] text-white text-lg md:text-xl font-light leading-relaxed">
                                I bridge the gap between <span className="text-white font-bold italic">abstract concepts</span> and <span className="text-white font-bold">tangible (and scalable) products</span>. As a Textile Designer and Master’s Candidate in Project Management, I don’t just design prints; I oversee the entire product lifecycle by integrating <span className="underline decoration-white-500/50 underline-offset-4">Agile (Scrum) methodologies</span> and cutting-edge AI into the creative process.
                            </p>
                        </motion.div>

                        {/* 3. NUEVA DESCRIPCIÓN (BLOQUE 2) */}
                        <motion.div variants={itemVariants} className="mb-12">
                            <p className="font-['Gilroy',_sans-serif] text-white text-lg md:text-xl font-light leading-relaxed">
                                My superpower? <span className="text-white font-medium">Versatility</span>. I can validate international manufacturing in the morning, optimize workflows with AI tools by noon, and build functional Front-end interfaces by afternoon. I thrive on transforming technical complexity into <span className="italic">high-quality, deadline-driven deliverables</span>.
                            </p>
                        </motion.div>

                        {/* 4. TECH STACK ACTUALIZADO */}
                        <motion.div variants={itemVariants} className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <span className="text-white-400 text-xs tracking-[0.4em] uppercase font-black">Design</span>
                                <div className="text-white text-s font-['Gilroy',_sans-serif] leading-loose opacity-80">
                                    {techStack.design.join(' / ')}
                                </div>
                            </div>
                            <div>
                                <span className="text-white-400 text-xs tracking-[0.4em] uppercase font-black">3D & Tech</span>
                                <div className="text-white text-s font-['Gilroy',_sans-serif] leading-loose opacity-80">
                                    {techStack.tech3D.join(' / ')}
                                </div>
                            </div>
                            <div>
                                <span className="text-white-400 text-xs tracking-[0.4em] uppercase font-black">Management</span>
                                <div className="text-white text-s font-['Gilroy',_sans-serif] leading-loose opacity-80">
                                    {techStack.management.join(' / ')}
                                </div>
                            </div>
                        </motion.div>

                        {/* 5. CTA */}
                        <motion.div variants={itemVariants}>
                            <button
                                onClick={handleScrollToWork}
                                className="group flex items-center gap-6 text-white uppercase tracking-[0.3em] text-[10px] font-black hover:text-white-400 transition-all bg-white/5 px-10 py-5 rounded-full backdrop-blur-md border border-white/10 hover:border-white-500/50"
                            >
                                Explore My Work
                                <span className="group-hover:translate-x-2 transition-transform duration-300">
                                    &rarr;
                                </span>
                            </button>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HomeProfile;
