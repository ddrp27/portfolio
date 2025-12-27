import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ParallaxWrapper from '../ui/ParallaxWrapper';

export default function Projects({ projects, onProjectClick }) {
    return (
        <div className="w-full px-4 md:px-10 py-20">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-16 md:mb-32 pl-4 border-l-2 border-[#958771]">
                    <h2 className="text-4xl md:text-7xl font-black uppercase text-white tracking-tighter">Selected<br />Works</h2>
                </div>

                {/* Project List / Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-24">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`group cursor-pointer ${index % 2 === 1 ? 'md:mt-32' : ''}`}
                            onClick={() => onProjectClick(project)}
                        >
                            <ParallaxWrapper offset={index % 2 === 0 ? 20 : 60}>
                                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-neutral-900 mb-6">
                                    {/* MOCKUP IMAGE ONLY - NO PATTERN */}
                                    <motion.img
                                        src={project.mockup}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        style={{ filter: 'grayscale(0.2)' }}
                                        whileHover={{ filter: 'grayscale(0)' }}
                                    />

                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                            <ArrowUpRight className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-[#958771] text-xs font-bold uppercase tracking-widest">{project.date}</span>
                                        <h3 className="text-2xl md:text-4xl font-bold text-white mt-1 group-hover:text-[#958771] transition-colors">{project.title}</h3>
                                    </div>
                                </div>
                            </ParallaxWrapper>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
