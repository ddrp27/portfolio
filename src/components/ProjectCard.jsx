import { motion, AnimatePresence, useMotionValue, useMotionTemplate, useSpring, useScroll, useTransform } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';

const ToolIcon = ({ type }) => {
    const icons = {
        photoshop: { path: "M0 0v24h24V0H0zm6.65 15.688h1.493v2.335h-.023c-.312.443-.915.753-1.636.753-1.425 0-2.316-1.11-2.316-2.455 0-1.42.997-2.463 2.376-2.463.633 0 1.155.21 1.48.514l-.696 1.05c-.218-.188-.488-.316-.803-.316-.675 0-1.07.548-1.07 1.208 0 .66.41 1.223 1.103 1.223.368 0 .645-.165.81-.405v-.743H6.65v-.701zm5.275 2.872h-1.358v-4.52h1.358v4.52zm0-5.18h-1.358v-1.193h1.358v1.193z", color: "#31A8FF" },
        illustrator: { path: "M0 0v24h24V0H0zm6.185 16.96l-.56 1.6h-1.5l2.25-6.04h1.61l2.25 6.04h-1.53l-.56-1.6h-1.96zm.32-1h1.33l-.66-1.91-.67 1.91zm5.42 2.6h-1.35v-4.52h1.35v4.52zm0-5.18h-1.35v-1.2h1.35v1.2z", color: "#FF9A00" },
        gemini: { path: "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", color: "#8E75FF" }
    };
    const icon = icons[type];
    return (
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center group hover:bg-white/10 transition-all duration-300">
            <svg viewBox="0 0 24 24" className="w-6 h-6 transition-transform group-hover:scale-110" fill={icon.color}><path d={icon.path} /></svg>
        </div>
    );
};

const ProjectCard = ({ project }) => {
    const { title, date, pattern, mockup, supportImages } = project;
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const containerRef = useRef(null);

    // Parallax Effect
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const yParallax = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const maskSize = useSpring(250, { stiffness: 70, damping: 20 });

    useEffect(() => {
        maskSize.set(isExpanded ? 3000 : 250);
    }, [isExpanded, maskSize]);

    const handleMouseMove = (e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const maskImage = useMotionTemplate`radial-gradient(${maskSize}px circle at ${mouseX}px ${mouseY}px, transparent ${maskSize}px, black ${maskSize}px)`;

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full h-full overflow-hidden bg-neutral-950 ${isExpanded ? 'cursor-default' : 'cursor-none'}`}
            onMouseMove={handleMouseMove}
            onClick={() => !selectedImage && setIsExpanded(!isExpanded)}
        >
            {/* 1. BACKGROUND LAYER (Mockup) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.img
                    src={mockup}
                    className="w-full h-[120%] object-cover opacity-60 flex-shrink-0"
                    alt=""
                    style={{ y: yParallax }}
                    animate={{ scale: isExpanded ? 1.05 : 1, filter: isExpanded ? 'blur(10px) brightness(0.5)' : 'blur(0px) brightness(1)' }}
                    transition={{ duration: 1 }}
                />
            </div>

            {/* 2. PATTERN MASK LAYER */}
            <motion.div
                className="absolute inset-0 z-10 w-full h-full pointer-events-none overflow-hidden"
                style={{ maskImage, WebkitMaskImage: maskImage }}
            >
                <img src={pattern} alt="" className="w-full h-full object-cover" />
            </motion.div>

            {/* 3. CENTER TITLE (Glass Effect) */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                animate={{
                    y: isExpanded ? -200 : 0,
                    opacity: isExpanded ? 0.3 : 1,
                    scale: isExpanded ? 0.8 : 1
                }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                <h1 className="font-['Gilroy',_sans-serif] text-7xl md:text-9xl lg:text-[11rem] font-extrabold uppercase tracking-tighter leading-none text-center px-10 select-none drop-shadow-2xl"
                    style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
                        mixBlendMode: 'overlay'
                    }}
                >
                    {title}
                </h1>
            </motion.div>

            {/* 4. REDESIGNED DETAILS GRID (Expanded State) */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="absolute inset-0 z-40 flex items-center justify-center p-6 md:p-12 lg:p-20 overflow-y-auto custom-scrollbar"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 pointer-events-auto mt-20">

                            {/* Left Column: Heading & Date */}
                            <motion.div
                                className="md:col-span-12 mb-4"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <p className="font-['Gilroy',_sans-serif] text-[12px] text-emerald-400 tracking-[0.8em] uppercase font-black mb-4">Project Case Study</p>
                                <h2 className="font-['Gilroy',_sans-serif] text-6xl md:text-8xl font-extrabold uppercase tracking-tighter leading-[0.85] text-white mb-2">{title}</h2>
                                <div className="h-[2px] w-32 bg-white/20 mb-4" />
                                <p className="font-['Gilroy',_sans-serif] text-sm text-white/50 tracking-[0.3em] uppercase font-black">{date}</p>
                            </motion.div>

                            {/* Bento Grid Starts */}

                            {/* Box 1: Concept */}
                            <motion.div
                                className="md:col-span-8 bg-white/5 backdrop-blur-3xl p-10 border border-white/10 rounded-[40px] flex flex-col justify-between"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div>
                                    <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase font-bold mb-6">01. The Concept</p>
                                    <p className="text-2xl md:text-3xl text-white font-medium leading-tight">
                                        Fusionando la herencia textil mediterránea con abstracciones digitales para crear una narrativa visual escalable en múltiples soportes.
                                    </p>
                                </div>
                                <div className="mt-10 flex gap-4">
                                    <ToolIcon type="photoshop" />
                                    <ToolIcon type="illustrator" />
                                    <ToolIcon type="gemini" />
                                </div>
                            </motion.div>

                            {/* Box 2: Metrics */}
                            <motion.div
                                className="md:col-span-4 bg-emerald-500 p-10 rounded-[40px] flex flex-col justify-between text-black"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <p className="text-[10px] tracking-[0.4em] uppercase font-bold mb-6">02. PERFORMANCE</p>
                                <div>
                                    <h3 className="text-6xl font-black tracking-tighter mb-2">+45%</h3>
                                    <p className="text-sm font-bold uppercase tracking-widest leading-none">Print Success Rate</p>
                                </div>
                                <p className="text-xs mt-6 leading-relaxed font-medium">Optimización de pantones y repetición para eficiencia en producción industrial masiva.</p>
                            </motion.div>

                            {/* Box 3: Image Gallery */}
                            <motion.div
                                className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-6"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                {[pattern, mockup, pattern, mockup].map((img, i) => (
                                    <div
                                        key={i}
                                        className="aspect-square rounded-3xl overflow-hidden border border-white/10 cursor-pointer group"
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" alt="" />
                                    </div>
                                ))}
                            </motion.div>

                            {/* Close Button */}
                            <motion.div
                                className="md:col-span-12 flex justify-center py-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                                    className="px-12 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.5em] rounded-full hover:scale-105 transition-transform"
                                >
                                    BACK TO PREVIEW
                                </button>
                            </motion.div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 5. LIGHTBOX */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-10 bg-black/95 backdrop-blur-2xl cursor-pointer" onClick={() => setSelectedImage(null)}>
                        <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={selectedImage} className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CURSOR */}
            {!isExpanded && <motion.div className="absolute z-50 w-6 h-6 rounded-full border-2 border-white mix-blend-difference pointer-events-none" style={{ x: mouseX, y: mouseY, left: -12, top: -12 }} />}
        </motion.div>
    );
};

export default ProjectCard;