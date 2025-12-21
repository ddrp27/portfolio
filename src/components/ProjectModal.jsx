import { motion, AnimatePresence, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const ProjectCard = ({ project }) => {
    const { title, date, pattern, mockup, supportImages } = project;

    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const maskSize = useSpring(250, { stiffness: 70, damping: 20 });

    useEffect(() => {
        maskSize.set(isExpanded ? 3000 : 250);
    }, [isExpanded, maskSize]);

    const handleMouseMove = (e) => {
        if (!isExpanded) {
            const { left, top } = e.currentTarget.getBoundingClientRect();
            mouseX.set(e.clientX - left);
            mouseY.set(e.clientY - top);
        }
    };

    const maskImage = useMotionTemplate`radial-gradient(${maskSize}px circle at ${mouseX}px ${mouseY}px, transparent ${maskSize}px, black ${maskSize}px)`;

    return (
        <div
            className="relative w-screen h-screen overflow-hidden bg-neutral-950 snap-center"
            onMouseMove={handleMouseMove}
        >
            {/* 1. EL FONDO (MOCKUP) */}
            <div className="absolute inset-0 z-0">
                <img src={mockup} className="w-full h-full object-cover" alt="" />
            </div>

            {/* 2. EL INTERRUPTOR (Capa invisible que detecta clics en el fondo) 
               La ponemos en z-10 para que no tape los botones del panel */}
            <div
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={() => !selectedImage && setIsExpanded(!isExpanded)}
            />

            {/* 3. LA MÁSCARA (PATTERN)
               IMPORTANTE: 'pointer-events-none' hace que esta capa sea invisible para el mouse, 
               dejando que los clics pasen al panel o al fondo. */}
            <motion.div
                className="absolute inset-0 z-20 w-full h-full pointer-events-none"
                style={{ maskImage, WebkitMaskImage: maskImage }}
            >
                <img src={pattern} className="w-full h-full object-cover" alt="" />
            </motion.div>

            {/* 4. TÍTULO CENTRAL */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                animate={{ opacity: isExpanded ? 0 : 1 }}
            >
                <h1 className="font-['Gilroy',_sans-serif] text-7xl md:text-9xl lg:text-[11rem] font-extrabold text-white uppercase tracking-tighter mix-blend-difference text-center">
                    {title}
                </h1>
            </motion.div>

            {/* 5. PANEL DE DETALLES (Z-40: Por encima de la máscara y del fondo) */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="absolute inset-0 z-40 flex items-center justify-end p-6 md:p-12 lg:p-20 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="w-full md:w-[450px] bg-black/80 backdrop-blur-3xl p-8 md:p-12 border border-white/20 rounded-[40px] shadow-2xl pointer-events-auto overflow-y-auto max-h-[90vh]"
                            initial={{ x: 100 }}
                            animate={{ x: 0 }}
                            exit={{ x: 100 }}
                            onClick={(e) => e.stopPropagation()} // Bloquea que el clic cierre el modo expansión
                        >
                            <div className="mb-8 text-white">
                                <h2 className="font-['Gilroy',_sans-serif] text-5xl font-extrabold uppercase tracking-tighter leading-none mb-2">{title}</h2>
                                <p className="font-['Gilroy',_sans-serif] text-[10px] text-[#958771] tracking-[0.5em] uppercase font-bold">{date}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {supportImages?.map((img, index) => (
                                    <div
                                        key={index}
                                        className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 cursor-pointer bg-neutral-800"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Detiene el cierre
                                            setSelectedImage(img);
                                        }}
                                    >
                                        <img src={img} className="w-full h-full object-cover" alt="detail" />
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setIsExpanded(false)}
                                className="w-full py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl"
                            >
                                Cerrar Detalles
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 6. EL LIGHTBOX (Z-100: Encima de absolutamente TODO) */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-10 bg-black/90 backdrop-blur-2xl cursor-pointer"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.img
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            src={selectedImage}
                            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CURSOR BOLITA */}
            {!isExpanded && (
                <motion.div
                    className="absolute z-50 w-6 h-6 rounded-full border-2 border-white mix-blend-difference pointer-events-none"
                    style={{ x: mouseX, y: mouseY, left: -12, top: -12 }}
                />
            )}
        </div>
    );
};

export default ProjectCard;