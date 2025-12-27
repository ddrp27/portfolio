import { motion } from 'framer-motion';
import ParallaxWrapper from '../ui/ParallaxWrapper';
import { ArrowDown } from 'lucide-react';

const SKILLS = [
    "Adobe Suite", "Canva", "Figma", "Clo3D", "Generative AI", "Jira", "Agile/Scrum"
];

export default function Home() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">

            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#958771]/5 rounded-full blur-[120px] pointer-events-none" />

            <ParallaxWrapper offset={-50} className="relative z-10 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="block text-[#958771] tracking-[0.4em] uppercase text-sm md:text-base font-bold mb-4"
                >
                    Portfolio 2025
                </motion.span>

                <motion.h1
                    className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-6"
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
                    className="flex items-center justify-center gap-4 text-white/60"
                >
                    <span className="h-[1px] w-12 bg-[#958771]"></span>
                    <span className="text-lg md:text-2xl font-light italic">Senior Textile Designer</span>
                    <span className="h-[1px] w-12 bg-[#958771]"></span>
                </motion.div>
            </ParallaxWrapper>

            {/* Skills Grid */}
            <ParallaxWrapper offset={30} className="relative z-10 mt-16 md:mt-24 w-full max-w-4xl">
                <div className="flex flex-wrap justify-center gap-3">
                    {SKILLS.map((skill, i) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + (i * 0.05) }}
                            className="px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm text-white/70 text-sm uppercase tracking-wider hover:border-[#958771]/50 hover:text-white transition-colors cursor-default"
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </ParallaxWrapper>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ArrowDown className="w-6 h-6" />
            </motion.div>

        </div>
    );
}
