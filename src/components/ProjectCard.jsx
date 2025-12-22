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
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center group hover:bg-white/10 transition-all duration-300">
            <svg viewBox="0 0 24 24" className="w-6 h-6 transition-transform group-hover:scale-110" fill={icon.color}>
                <path d={icon.path} />
            </svg>
        </div>
    );
};

const ProjectCard = ({ project }) => {
    const { id, title, date, pattern, mockup, supportImages, description, metricValue, metricLabel, tools } = project;

    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const containerRef = useRef(null);

    // Resetear estados al cambiar de proyecto (Veracidad en React)
    useEffect(() => {
        setIsExpanded(false);
        setSelectedImage(null);
    }, [id]);

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const maskSize = useSpring(230, { stiffness: 70, damping: 20 });

    useEffect(() => {
        maskSize.set(isExpanded ? 0 : 230);
        document.body.style.overflow = isExpanded ? 'hidden' : 'unset';
    }, [isExpanded, maskSize]);

    const handleMouseMove = (e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const maskImage = useMotionTemplate`radial-gradient(${maskSize}px circle at ${mouseX}px ${mouseY}px, transparent ${maskSize}px, black ${maskSize}px)`;

    return (
        <div
            key={id}
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden bg-neutral-950 ${isExpanded ? 'cursor-default' : 'cursor-none'}`}
            onMouseMove={handleMouseMove}
            onClick={() => !selectedImage && !isExpanded && setIsExpanded(true)}
        >
            {/* Capa 0: Mockup Fondo */}
            <div className="absolute inset-0 z-0">
                <motion.img src={mockup} className="w-full h-[115%] object-cover" style={{ y: yParallax }} animate={{ opacity: isExpanded ? 0.1 : 0.6, filter: isExpanded ? 'blur(20px)' : 'blur(0px)' }} />
            </div>

            {/* Capa 1: Pattern con Máscara */}
            <motion.div className="absolute inset-0 z-10 w-full h-full pointer-events-none" style={{ maskImage, WebkitMaskImage: maskImage }} animate={{ opacity: isExpanded ? 0 : 1 }}>
                <img src={pattern} alt="" className="w-full h-full object-cover" />
            </motion.div>

            {/* Capa 2: Título Principal (Extra Bold) */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                animate={{ opacity: isExpanded ? 0 : 1, scale: isExpanded ? 0.8 : 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <h1
                    className="text-6xl md:text-8xl lg:text-[11rem] uppercase tracking-tighter leading-none text-center px-10 select-none"
                    style={{
                        fontFamily: "'Gilroy', sans-serif",
                        fontWeight: 900,
                        mixBlendMode: 'overlay',
                        color: 'rgba(255, 255, 255, 0.85)',
                        WebkitTextStroke: '2px rgba(255, 255, 255, 0.15)',
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
                    }}
                >
                    {title}
                </h1>
            </motion.div>

            {/* BOTÓN "DETAILS" (CORREGIDO) */}
            <AnimatePresence>
                {!isExpanded && (
                    <motion.div
                        className="absolute bottom-16 left-1/2 z-30 pointer-events-auto"
                        initial={{ opacity: 0, y: 20, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 10, x: "-50%" }}
                        transition={{ delay: 0.8 }}
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
                            className="group relative px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center"
                        >
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/20 rounded-full group-hover:bg-white/10 transition-all" />
                            <span className="relative z-10 text-white font-['Gilroy'] text-[10px] font-black uppercase tracking-[0.4em] pr-[0.4em] whitespace-nowrap">
                                View Details
                            </span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PANEL BENTO GRID (EXPANDIDO) */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12 overflow-y-auto bg-black/40 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-4 pointer-events-auto my-auto py-20">

                            <div className="md:col-span-12 mb-6 text-center md:text-left">
                                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">{title}</h2>
                                <p className="text-white/40 text-[10px] tracking-[0.5em] uppercase font-black mt-3">{date}</p>
                            </div>

                            <div className="md:col-span-8 bg-white/5 border border-white/10 backdrop-blur-md rounded-[30px] p-10 flex flex-col justify-between">
                                <p className="text-lg md:text-xl text-white/90 leading-tight font-light italic">
                                    {description || "No description provided."}
                                </p>
                                <div className="mt-10 flex gap-3">
                                    {tools?.map(tool => <ToolIcon key={tool} type={tool} />)}
                                </div>
                            </div>

                            <div className="md:col-span-4 bg-white/10 border border-white/20 backdrop-blur-lg rounded-[30px] p-10 flex flex-col justify-center text-center">
                                <h3 className="text-6xl font-black tracking-tighter text-white leading-none">
                                    {metricValue || "0%"}
                                </h3>
                                <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-2">
                                    {metricLabel || "Metric"}
                                </p>
                            </div>

                            <div className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                {(supportImages || []).slice(0, 4).map((img, i) => (
                                    <div key={`${id}-img-${i}`} className="aspect-square rounded-2xl overflow-hidden border border-white/10 cursor-pointer bg-white/5 group" onClick={() => setSelectedImage(img)}>
                                        <img src={img} className="w-full h-full object-cover opacity-70 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100" alt="" />
                                    </div>
                                ))}
                            </div>

                            <div className="md:col-span-12 flex justify-center mt-12">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                                    className="group relative px-12 py-4 overflow-hidden rounded-full transition-all"
                                >
                                    <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-full group-hover:bg-white/20 transition-all" />
                                    <span className="relative z-10 text-white text-[10px] font-black uppercase tracking-[0.4em] pr-[0.4em]">Go Back</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* LIGHTBOX */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-10 bg-black/95 backdrop-blur-2xl cursor-pointer" onClick={() => setSelectedImage(null)}>
                        <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={selectedImage} className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl" />
                    </motion.div>
                )}
            </AnimatePresence>

            {!isExpanded && <motion.div className="absolute z-50 w-6 h-6 rounded-full border-2 border-white mix-blend-difference pointer-events-none" style={{ x: mouseX, y: mouseY, left: -12, top: -12 }} />}
        </div>
    );
};

export default ProjectCard;
