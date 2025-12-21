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
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center group hover:bg-white/10 transition-all duration-300">
            <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform group-hover:scale-110" fill={icon.color}><path d={icon.path} /></svg>
        </div>
    );
};

const ProjectCard = ({ project }) => {
    const { title, date, pattern, mockup, supportImages } = project;
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const maskSize = useSpring(250, { stiffness: 70, damping: 20 });

    useEffect(() => {
        maskSize.set(isExpanded ? 0 : 250);
    }, [isExpanded, maskSize]);

    const handleMouseMove = (e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const maskImage = useMotionTemplate`radial-gradient(${maskSize}px circle at ${mouseX}px ${mouseY}px, transparent ${maskSize}px, black ${maskSize}px)`;

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden bg-neutral-950 ${isExpanded ? 'cursor-default' : 'cursor-none'}`}
            onMouseMove={handleMouseMove}
            onClick={() => !selectedImage && !isExpanded && setIsExpanded(true)}
        >
            {/* Capa de Mockup con Blur */}
            <div className="absolute inset-0 z-0">
                <motion.img
                    src={mockup}
                    className="w-full h-[115%] object-cover"
                    style={{ y: yParallax }}
                    animate={{
                        opacity: isExpanded ? 0.15 : 0.6,
                        filter: isExpanded ? 'blur(30px)' : 'blur(0px)'
                    }}
                />
            </div>

            {/* Capa de Estampado (Pattern) */}
            <motion.div
                className="absolute inset-0 z-10 w-full h-full pointer-events-none"
                style={{ maskImage, WebkitMaskImage: maskImage }}
                animate={{ opacity: isExpanded ? 0 : 1 }}
            >
                <img src={pattern} alt="" className="w-full h-full object-cover" />
            </motion.div>

            {/* Título Principal */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                animate={{
                    opacity: isExpanded ? 0 : 1,
                    scale: isExpanded ? 0.8 : 1,
                }}
            >
                <h1 className="font-['Gilroy',_sans-serif] text-6xl md:text-8xl lg:text-[10rem] font-extrabold uppercase tracking-tighter leading-none text-center px-10 select-none mix-blend-overlay"
                    style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)' }}
                >
                    {title}
                </h1>
            </motion.div>

            {/* Bento Grid de Información */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="absolute inset-0 z-40 flex items-center justify-center p-6 md:p-12 overflow-y-auto"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    >
                        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-4 pointer-events-auto my-auto">

                            <motion.div className="md:col-span-12" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">{title}</h2>
                                <p className="text-emerald-400 text-[10px] tracking-[0.4em] uppercase font-black">{date}</p>
                            </motion.div>

                            <motion.div className="md:col-span-8 bg-white/5 border border-white/10 rounded-[30px] p-8" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                                <p className="text-lg md:text-xl text-white/90 leading-tight mb-8">
                                    Exploración táctil y digital. El estampado se diseñó para maximizar la conversión visual en retail, logrando una estética mediterránea moderna.
                                </p>
                                <div className="flex gap-3">
                                    <ToolIcon type="photoshop" />
                                    <ToolIcon type="illustrator" />
                                    <ToolIcon type="gemini" />
                                </div>
                            </motion.div>

                            <motion.div className="md:col-span-4 bg-emerald-500 rounded-[30px] p-8 text-black" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                                <h3 className="text-5xl font-black tracking-tighter leading-none">+45%</h3>
                                <p className="text-[10px] font-bold uppercase tracking-widest mt-1">Growth Yield</p>
                                <p className="text-xs mt-4 font-medium leading-tight text-black/70">Eficiencia en la producción y alto impacto comercial.</p>
                            </motion.div>

                            <motion.div className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                                {(supportImages || []).slice(0, 4).map((img, i) => (
                                    <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white/10 cursor-pointer group" onClick={() => setSelectedImage(img)}>
                                        <img src={img} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Support" />
                                    </div>
                                ))}
                            </motion.div>

                            <div className="md:col-span-12 flex justify-center mt-4">
                                <button onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }} className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-neutral-200 transition-colors">
                                    Cerrar Detalles
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Lightbox para ver la imagen de apoyo en grande */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-10 bg-black/95 backdrop-blur-2xl cursor-pointer" onClick={() => setSelectedImage(null)}>
                        <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={selectedImage} className="max-w-full max-h-full object-contain rounded-3xl" />
                    </motion.div>
                )}
            </AnimatePresence>

            {!isExpanded && <motion.div className="absolute z-50 w-6 h-6 rounded-full border-2 border-white mix-blend-difference pointer-events-none" style={{ x: mouseX, y: mouseY, left: -12, top: -12 }} />}
        </div>
    );
};

export default ProjectCard;
