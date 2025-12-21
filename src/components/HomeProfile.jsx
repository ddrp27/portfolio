import { motion } from 'framer-motion';
import portraitImage from '../assets/daniel-portrait.png';

const HomeProfile = () => {
    const techStack = {
        design: ['Adobe Suite', 'Canva', 'Figma'],
        tech3D: ['Clo3D', 'Generative AI'],
        management: ['Jira', 'Agile/Scrum']
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
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
            workSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
        }
    };

    return (
        <section
            id="home"
            className="relative w-[100vw] h-[100vh] flex-shrink-0 bg-[#958771] snap-center overflow-hidden"
        >
            {/* =========================================
               CAPA 1: IMAGEN DE FONDO (LIMPIA)
               ========================================= */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="w-full h-full"
                >
                    <img
                        src={portraitImage}
                        alt="Daniel Diaz"
                        // Sin filtros, sin degradados. La foto pura.
                        className="w-full h-full object-cover object-[center_top]"
                    />
                </motion.div>
            </div>

            {/* =========================================
               CAPA 2: CONTENIDO (PANEL DE CRISTAL)
               ========================================= */}
            <div className="relative z-10 w-full h-full flex flex-col lg:flex-row justify-end">

                {/* Espacio vacío a la izquierda para ver la foto */}
                <div className="hidden lg:block lg:w-[45%]"></div>

                {/* PANEL DERECHO: EFECTO CRISTAL */}
                {/* backdrop-blur-xl: Desenfoca la foto DETRÁS del texto */}
                {/* bg-black/20: Un tinte negro muy suave para contraste */}
                <div className="flex-1 h-full overflow-y-auto px-8 md:px-12 lg:px-20 py-20 flex flex-col justify-center backdrop-blur-xl bg-black/30 border-l border-white/10 shadow-2xl">

                    <motion.div
                        className="max-w-2xl mx-auto lg:mr-auto lg:ml-0"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >

                        {/* 1. TÍTULO */}
                        <motion.div variants={itemVariants} className="mb-8 border-b border-white/20 pb-8">
                            <h1 className="font-['Gilroy',_sans-serif] font-extrabold tracking-tighter leading-[0.85] mb-4 drop-shadow-lg">
                                <span className="block text-7xl md:text-8xl lg:text-[8rem] xl:text-[9rem] text-white">
                                    DANIEL
                                </span>
                                <span className="block text-7xl md:text-8xl lg:text-[8rem] xl:text-[9rem] text-[#e3eaf2]">
                                    DIAZ
                                </span>
                            </h1>
                            <p className="text-white/90 text-sm tracking-[0.3em] uppercase pl-2 mt-4 font-medium drop-shadow-md">
                                Graphic & Textile Designer
                            </p>
                        </motion.div>

                        {/* 2. BIO */}
                        <motion.div variants={itemVariants} className="mb-8">
                            <p className="font-['Gilroy',_sans-serif] text-white text-lg md:text-xl font-light leading-relaxed drop-shadow-md">
                                I’m based in Envigado, Colombia, breaking the stereotype of the "chaotic creative." My work exists at the intersection of <span className="font-bold border-b border-white/40 pb-0.5">visual aesthetics</span> and <span className="font-bold border-b border-white/40 pb-0.5">functional strategy</span>.
                            </p>
                        </motion.div>

                        {/* 3. PLUSVALÍA */}
                        <motion.div
                            variants={itemVariants}
                            // Fondo suave dentro del cristal para resaltar la cita
                            className="mb-8 pl-6 border-l-2 border-[#e3eaf2] italic text-white/90 bg-black/10 p-4 rounded-r-lg"
                        >
                            <p className="font-['Gilroy',_sans-serif] text-base leading-relaxed">
                                "I don't just design; I optimize. My value lies in bridging the gap between creative chaos and production reality."
                            </p>
                        </motion.div>

                        {/* 4. TECH STACK */}
                        <motion.div variants={itemVariants} className="mb-12">
                            <div className="flex flex-wrap gap-x-12 gap-y-6">
                                <div>
                                    <span className="text-[#e3eaf2] text-[10px] uppercase tracking-widest block mb-2 font-bold opacity-70">Design</span>
                                    <div className="flex gap-2 text-white text-sm font-['Gilroy',_sans-serif]">
                                        {techStack.design.join(' / ')}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[#e3eaf2] text-[10px] uppercase tracking-widest block mb-2 font-bold opacity-70">3D & Tech</span>
                                    <div className="flex gap-2 text-white text-sm font-['Gilroy',_sans-serif]">
                                        {techStack.tech3D.join(' / ')}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[#e3eaf2] text-[10px] uppercase tracking-widest block mb-2 font-bold opacity-70">Management</span>
                                    <div className="flex gap-2 text-white text-sm font-['Gilroy',_sans-serif]">
                                        {techStack.management.join(' / ')}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 5. CTA SCROLL */}
                        <motion.div variants={itemVariants}>
                            <button
                                onClick={handleScrollToWork}
                                className="group flex items-center gap-4 text-white uppercase tracking-[0.2em] text-xs font-bold hover:text-[#e3eaf2] transition-colors bg-white/10 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/20"
                            >
                                Explore Work
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    &rarr;
                                </motion.span>
                            </button>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HomeProfile;