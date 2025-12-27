import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import me from '../../assets/me.webp';
import FloatingParticles from '../ui/FloatingParticles';

const SKILLS = [
    "Adobe Suite", "Canva", "Figma", "Clo3D", "Generative AI", "Jira", "Agile/Scrum", "HTML/CSS/JS", "React", "Front end"
];

export default function Home() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        // CAMBIO 1: Gradiente más oscuro y elegante (Taupe/Dark Coffee) para contraste premium
        <div className="relative min-h-screen flex flex-col md:flex-row overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#5e5348] via-[#4a4036] to-[#2e2620]">

            {/* Floating Particles - Behind portrait */}
            <FloatingParticles count={isMobile ? 12 : 30} />

            {/* Subtle Background Glow - Luz ambiental detrás */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

            {/* IMAGE - Bottom on Mobile, LEFT on Desktop */}
            <div className="relative z-10 w-full md:w-1/2 flex items-end justify-center order-2 md:order-1 min-h-[50vh] md:min-h-screen">
                <motion.img
                    src={me}
                    alt="Daniel Diaz Portrait"
                    className="w-auto h-[60vh] md:h-[85vh] object-contain object-bottom drop-shadow-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                />
            </div>

            {/* TEXT CONTENT - Top on Mobile, RIGHT on Desktop */}
            <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12 md:py-0 order-1 md:order-2">
                <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">

                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="block text-[#EFECE5]/60 tracking-[0.4em] uppercase text-xs md:text-sm font-bold mb-4"
                    >
                        Portfolio 2025
                    </motion.span>

                    {/* CAMBIO 2: Efecto GLASS TEXT (Transparencia + Borde) */}
                    <motion.h1
                        className="text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white"
                        style={{
                            filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0)) drop-shadow(0 8px 7px rgba(0, 0, 0, 0.1))',
                            lineHeight: 0.85
                        }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Daniel<br />Diaz
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center justify-center md:justify-start gap-4 text-[#EFECE5]/80 mb-8"
                    >
                        <span className="h-[1px] w-8 md:w-12 bg-[#EFECE5]/30"></span>
                        <span className="text-sm md:text-xl font-light italic tracking-wide">Senior Textile Designer & Project Manager</span>
                        <span className="h-[1px] w-8 md:w-12 bg-[#EFECE5]/30"></span>
                    </motion.div>

                    {/* CAMBIO 3: Bio con palabras clave resaltadas en blanco (strong) */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-white/70 text-sm md:text-base leading-relaxed mb-8 max-w-[60ch] mx-auto md:mx-0 font-light"
                    >
                        I bridge the gap between abstract concepts and tangible (and scalable) products. As a <strong className="text-white font-semibold">Textile Designer</strong> and Master's Candidate in Project Management, I don't just design prints; I oversee the entire product lifecycle by integrating <strong className="text-white font-semibold">Agile (Scrum)</strong> methodologies and cutting-edge <strong className="text-white font-semibold">AI</strong> into the creative process.
                        <br /><br />
                        My superpower? Versatility. I can validate international manufacturing in the morning, optimize workflows with AI tools by noon, and build functional <strong className="text-white font-semibold">Front-end</strong> interfaces by afternoon. I thrive on transforming technical complexity into high-quality, deadline-driven deliverables.
                    </motion.p>

                    {/* Skills Grid - Centrado en Mobile */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 px-2 md:px-0">
                        {SKILLS.map((skill, i) => (
                            <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 + (i * 0.05) }}
                                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/70 text-[10px] md:text-sm uppercase tracking-wider hover:border-white/40 hover:bg-white/10 hover:text-white transition-colors cursor-default select-none"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-white/30 z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ArrowDown className="w-5 h-5 md:w-6 md:h-6" />
            </motion.div>

        </div>
    );
}