import { motion, AnimatePresence, useMotionValue, useMotionTemplate, useSpring, useScroll, useTransform } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';

const ToolIcon = ({ type }) => {
    const icons = {
        photoshop: {
            path: "M0 0v24h24V0H0zm10.5 15.3c-.5 0-.9-.1-1.2-.4-.3-.3-.4-.7-.4-1.2h1.4c0 .3.1.5.2.6.1.1.3.2.6.2.3 0 .5-.1.6-.3.1-.2.2-.4.2-.7 0-.3-.1-.6-.3-.7-.2-.1-.4-.2-.7-.2-.3 0-.6.1-.8.2l-.3-1h2.2v-1.1H8.3l.4 2.3c.3-.2.6-.3.9-.3.3 0 .6.1.7.2.2.1.3.4.3.7 0 .4-.1.7-.3.9-.3.3-.7.4-1.2.4zm5.2 0h-1.3v-4h-.1l-1.1.4-.2-1 1.6-.7h1.1v5.3z",
            color: "#31A8FF"
        },
        illustrator: {
            path: "M0 0v24h24V0H0zm9.4 15.5l-.6-1.8h-2l-.6 1.8H4.7L8 8.5h1.2l3.3 8h-3.1zm-.3-2.9L8.6 11h-.1l-.5 1.6h1.1zm6.4 2.9h-1.2v-4.5h1.2v4.5zm0-5.4h-1.2V8.9h1.2v1.2z",
            color: "#FF9A00"
        },
        gemini: {
            path: "M12 1L9 9l-8 3 8 3 3 8 3-8 8-3-8-3-3-8z",
            color: "#8E75FF"
        }
    };
    const icon = icons[type];
    if (!icon) return null;

    return (
        <motion.div
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center group transition-all duration-300"
        >
            <svg viewBox="0 0 24 24" className="w-6 h-6 transition-transform group-hover:scale-110" fill={icon.color}>
                <path d={icon.path} />
            </svg>
        </motion.div>
    );
};

const ProjectCard = ({ project }) => {
    const { id, title, date, pattern, mockup, supportImages, description, metricValue, metricLabel, tools } = project;

    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const containerRef = useRef(null);

    // Neutral accent color to reflect the original earthy aesthetic
    const accentColor = '#958771';

    // Resetear estados al cambiar de proyecto
    useEffect(() => {
        setIsExpanded(false);
        setSelectedImage(null);
    }, [id]);

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const maskSize = useSpring(230, { stiffness: 100, damping: 30 });

    useEffect(() => {
        maskSize.set(isExpanded ? 0 : 230);
        document.body.style.overflow = isExpanded ? 'hidden' : 'unset';
    }, [isExpanded, maskSize]);

    const handleMouseMove = (e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const handleTouchMove = (e) => {
        const touch = e.touches[0];
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(touch.clientX - left);
        mouseY.set(touch.clientY - top);
    };

    const maskImage = useMotionTemplate`radial-gradient(${maskSize}px circle at ${mouseX}px ${mouseY}px, transparent ${maskSize}px, black ${maskSize}px)`;

    return (
        <div
            key={id}
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden bg-neutral-950 ${isExpanded ? 'cursor-default' : 'cursor-none'} touch-none`}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchMove}
            onClick={() => !selectedImage && !isExpanded && setIsExpanded(true)}
        >
            {/* Capa 0: Mockup Fondo */}
            <div className="absolute inset-0 z-0">
                <motion.img
                    src={mockup}
                    className="w-full h-[115%] object-cover"
                    style={{ y: yParallax }}
                    animate={{
                        opacity: isExpanded ? 0.1 : 0.4,
                        filter: isExpanded ? 'blur(40px) grayscale(1)' : 'blur(0px) grayscale(0.5)'
                    }}
                />
            </div>

            {/* Capa 1: Pattern con Máscara */}
            <motion.div className="absolute inset-0 z-10 w-full h-full pointer-events-none" style={{ maskImage, WebkitMaskImage: maskImage }} animate={{ opacity: isExpanded ? 0 : 1 }}>
                <img src={pattern} alt="" className="w-full h-full object-cover opacity-80" />
            </motion.div>

            {/* Capa 2: Título Principal */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                animate={{ opacity: isExpanded ? 0 : 1, scale: isExpanded ? 0.8 : 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <h1
                    className="text-5xl md:text-8xl lg:text-[11rem] font-black uppercase tracking-tighter leading-none text-center px-6 select-none mix-blend-overlay"
                    style={{
                        fontFamily: "Inter, sans-serif",
                        color: 'rgba(255, 255, 255, 0.9)',
                        WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)',
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
                    }}
                >
                    {title}
                </h1>
            </motion.div>

            {/* View Details Button */}
            <AnimatePresence>
                {!isExpanded && (
                    <motion.div
                        className="absolute bottom-16 left-1/2 z-30 pointer-events-auto"
                        initial={{ opacity: 0, y: 20, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 10, x: "-50%" }}
                        transition={{ delay: 0.8 }}
                    >
                        <motion.button
                            onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-8 md:px-10 py-4 rounded-full flex items-center justify-center overflow-hidden"
                        >
                            <div className="absolute inset-0 glass-card rounded-full group-hover:bg-white/10 transition-all" />
                            <span className="relative z-10 text-white font-sans text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] pr-[0.4em] whitespace-nowrap">
                                View Details
                            </span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PANEL BENTO GRID (EXPANDIDO) */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        data-lenis-prevent
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12 overflow-y-auto bg-black/60 backdrop-blur-3xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Decorative glow behind bento grid */}
                        <div className="absolute w-[60%] h-[60%] bg-[#958771]/10 rounded-full blur-[150px] pointer-events-none"></div>

                        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-4 pointer-events-auto my-auto py-20 relative z-10">

                            <motion.div
                                className="md:col-span-12 mb-8 text-center md:text-left"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h2 className="text-4xl md:text-7xl lg:text-8xl font-sans font-black uppercase tracking-tighter text-white leading-[0.9] text-balance">
                                    {title}
                                </h2>
                                <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
                                    <div className="h-[1px] w-12 bg-[#958771]/30"></div>
                                    <p className="text-[#958771] text-[10px] tracking-[0.5em] uppercase font-black">{date}</p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="md:col-span-8 glass-card border-white/10 rounded-[40px] p-10 flex flex-col justify-between group hover:border-white/20 transition-colors"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light italic">
                                    {description || "No description provided."}
                                </p>
                                <div className="mt-10 flex gap-4">
                                    {tools?.map(tool => <ToolIcon key={tool} type={tool} />)}
                                </div>
                            </motion.div>

                            <motion.div
                                className="md:col-span-4 bg-[#958771]/5 border border-[#958771]/20 backdrop-blur-xl rounded-[40px] p-10 flex flex-col justify-center text-center group hover:bg-[#958771]/10 transition-all"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h3 className="text-6xl font-black tracking-tighter text-[#958771] leading-none group-hover:scale-110 transition-transform">
                                    {metricValue || "0"}
                                </h3>
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-4">
                                    {metricLabel || "Sales Units"}
                                </p>
                            </motion.div>

                            <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                                {(supportImages || []).slice(0, 3).map((img, i) => (
                                    <motion.div
                                        key={`${id}-img-${i}`}
                                        className="aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden glass-card border-white/5 cursor-pointer group relative"
                                        onClick={() => setSelectedImage(img)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + (i * 0.1) }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <img src={img} className="w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" alt="" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                                            <span className="text-[10px] text-white font-black uppercase tracking-widest">Enlarge</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="md:col-span-12 flex justify-center mt-12">
                                <motion.button
                                    onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative px-12 py-4 overflow-hidden rounded-full transition-all"
                                >
                                    <div className="absolute inset-0 glass-card rounded-full group-hover:bg-white/10 transition-all" />
                                    <span className="relative z-10 text-white text-[10px] font-black uppercase tracking-[0.4em] pr-[0.4em]">Go Back</span>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* LIGHTBOX */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-10 bg-black/95 backdrop-blur-2xl cursor-pointer"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            src={selectedImage}
                            className="max-w-full max-h-full object-contain rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* VISUAL CUE FOR MOBILE TOUCH (FINGER ICON) */}
            {!isExpanded && (
                <motion.div
                    className="absolute md:hidden bottom-20 right-10 z-40 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgba(255,255,255,0.8)" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834-1.658-1.591 1.591M6.166 2.842l1.591 1.591M2.25 12h2.25m13.234 8.166 1.591-1.591M2.842 17.834l1.591-1.591M21.75 12h-2.25" />
                            </svg>
                        </div>
                        <span className="text-[10px] text-white/50 font-black uppercase tracking-widest">Touch to Reveal</span>
                    </div>
                </motion.div>
            )}

            {/* CURSOR CUSTOMIZADO (SOLO DESKTOP) */}
            {!isExpanded && (
                <motion.div
                    className="absolute z-50 w-6 h-6 rounded-full border border-white/50 mix-blend-difference pointer-events-none hidden md:block"
                    style={{ x: mouseX, y: mouseY, left: -12, top: -12 }}
                />
            )}
        </div>
    );
};

export default ProjectCard;
