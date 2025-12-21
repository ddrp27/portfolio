import { motion, AnimatePresence, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import React, { useState, useEffect } from 'react';

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
    const { title, date, pattern, mockup, supportImages, bgImages } = project;
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
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
        <div
            className={`relative w-screen h-screen overflow-hidden bg-neutral-950 snap-center ${isExpanded ? 'cursor-default' : 'cursor-none'}`}
            onMouseMove={handleMouseMove}
            onClick={() => !selectedImage && setIsExpanded(!isExpanded)}
        >
            {/* 1. FONDO TRÍPTICO (Lo que se ve de fondo) */}
            <div className="absolute inset-0 z-0 flex pointer-events-none">
                <div className="w-full h-full border-r border-white/5"><img src={mockup} className="w-full h-full object-cover" alt="" /></div>
            </div>

            {/* 2. MÁSCARA (Aseguramos que cubra todo sin divisiones) */}
            <motion.div
                className="absolute inset-0 z-10 w-full h-full pointer-events-none overflow-hidden"
                style={{ maskImage, WebkitMaskImage: maskImage }}
            >
                {/* Esta imagen es la que se "recorta", debe ser una sola */}
                <img src={pattern} alt="" className="w-full h-full object-cover" />
            </motion.div>

            {/* 3. TÍTULO GLASS TEXT */}
            <motion.div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none" animate={{ opacity: isExpanded ? 0 : 1 }}>
                <h1 className="font-['Gilroy',_sans-serif] text-7xl md:text-9xl lg:text-[11rem] font-extrabold uppercase tracking-tighter leading-none text-center px-10 select-none drop-shadow-2xl"
                    style={{
                        color: 'rgba(255, 255, 255, 0.84)',
                        WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.63)',
                        mixBlendMode: 'overlay'
                    }}
                >
                    {title}
                </h1>
            </motion.div>

            {/* 4. PANEL DE DETALLES */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div className="absolute inset-0 z-40 flex items-center justify-end p-6 md:p-12 lg:p-20 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div className="w-full md:w-[480px] h-fit max-h-[90vh] overflow-y-auto bg-black/80 backdrop-blur-3xl p-8 md:p-12 border border-white/20 rounded-[40px] shadow-2xl pointer-events-auto" initial={{ x: 100 }} animate={{ x: 0 }} exit={{ x: 100 }} onClick={(e) => e.stopPropagation()}>
                            <div className="mb-8 text-white">
                                <h2 className="font-['Gilroy',_sans-serif] text-4xl font-extrabold uppercase tracking-tighter leading-none mb-2">{title}</h2>
                                <p className="font-['Gilroy',_sans-serif] text-[10px] text-white/50 tracking-[0.5em] uppercase font-black">{date}</p>
                            </div>

                            <div className="mb-10 p-6 bg-white/5 border-l-2 border-emerald-500 rounded-r-3xl backdrop-blur-md text-white">
                                <p className="text-emerald-400 text-[9px] tracking-[0.4em] uppercase font-black mb-2">Design Performance</p>
                                <h3 className="text-4xl font-extrabold tracking-tighter">High <span className="text-emerald-400">Print</span> Value</h3>
                                <p className="text-white/40 text-[10px] mt-2 font-light uppercase tracking-[0.2em]">La fuerza visual del estampado fue el motor principal de conversión.</p>
                            </div>

                            <div className="mb-10">
                                <p className="text-[9px] text-white/40 tracking-[0.4em] uppercase font-black mb-4">Crafting Tools</p>
                                <div className="flex gap-4">
                                    <ToolIcon type="photoshop" />
                                    <ToolIcon type="illustrator" />
                                    <ToolIcon type="gemini" />
                                </div>
                            </div>



                            <button onClick={() => setIsExpanded(false)} className="w-full py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl">Cerrar Detalles</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 5. LIGHTBOX */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-10 bg-black/95 backdrop-blur-2xl cursor-pointer" onClick={() => setSelectedImage(null)}>
                        <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={selectedImage} className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CURSOR */}
            {!isExpanded && <motion.div className="absolute z-50 w-6 h-6 rounded-full border-2 border-white mix-blend-difference pointer-events-none" style={{ x: mouseX, y: mouseY, left: -12, top: -12 }} />}
        </div>
    );
};

export default ProjectCard;