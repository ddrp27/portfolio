import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import React, { useRef } from 'react';

const ProjectCard = ({ project }) => {
    const { title, date, pattern, mockup } = project;
    const [isActive, setIsActive] = React.useState(false);

    // Motion values for interaction
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth transition for the reveal scale
    const revealScale = useSpring(1, { stiffness: 100, damping: 20 });
    const isHovered = useMotionValue(0);

    // Spring for the mask size
    const maskSize = useSpring(300, { stiffness: 80, damping: 20 });

    React.useEffect(() => {
        maskSize.set(isActive ? 3000 : 300);
        // Gentle zoom when active to prevent "frozen" feel
        revealScale.set(isActive ? 1.05 : 1);
    }, [isActive, maskSize, revealScale]);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);

        // Only calculate distance scale if NOT active (passive hover effect)
        if (!isActive) {
            const centerX = width / 2;
            const centerY = height / 2;
            const distance = Math.sqrt(Math.pow(e.clientX - left - centerX, 2) + Math.pow(e.clientY - top - centerY, 2));
            revealScale.set(1 + (1 - distance / width) * 0.05);
        }
    };

    const handleMouseEnter = () => isHovered.set(1);
    const handleMouseLeave = () => {
        isHovered.set(0);
        revealScale.set(1);
    };

    const handleClick = () => {
        setIsActive(!isActive);
    };

    // Mask circle size - slightly larger for better reveal
    const maskImage = useMotionTemplate`radial-gradient(${maskSize}px circle at ${mouseX}px ${mouseY}px, transparent, black)`;

    return (
        <div
            className={`relative w-[100vw] h-[100vh] flex-shrink-0 overflow-hidden bg-neutral-900 ${isActive ? 'cursor-zoom-out' : 'cursor-none'} transition-colors snap-center`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {/* Bottom Layer: Mockup (Revealed on hover) */}
            <motion.div
                className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
                style={{ scale: revealScale }}
            >
                <img
                    src={mockup}
                    alt={`${title} Mockup`}
                    className={`w-full h-full object-cover transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-90'}`}
                />
                <div className={`absolute inset-0 transition-colors duration-700 ${isActive ? 'bg-black/0' : 'bg-black/30'}`} />
            </motion.div>

            {/* Top Layer: Pattern (Masked) */}
            <motion.div
                className={`absolute inset-0 z-10 w-full h-full pointer-events-none transition-opacity duration-700 ${isActive ? 'opacity-0' : 'opacity-100'}`}
                style={{ maskImage, WebkitMaskImage: maskImage }}
            >
                <img
                    src={pattern}
                    alt={`${title} Pattern`}
                    className={`w-full h-full object-cover object-center transition-all duration-1000 ${isActive ? 'grayscale-0' : 'grayscale'}`}
                />
            </motion.div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none mix-blend-difference text-white">
                <motion.h2
                    className="font-serif text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter opacity-90"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 0.9 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {title}
                </motion.h2>
                <motion.p
                    className="font-sans text-sm md:text-base tracking-[0.2em] mt-4 uppercase opacity-70"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 0.7 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {date}
                </motion.p>
            </div>

            {/* Sublte cursor hint */}
            <motion.div
                className="absolute z-50 w-4 h-4 rounded-full border border-white mix-blend-difference pointer-events-none"
                style={{ x: mouseX, y: mouseY, left: -8, top: -8 }}
            />
        </div>
    );
};

export default ProjectCard;

