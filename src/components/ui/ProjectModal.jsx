import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Layers, Hash } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                >
                    {/* Backdop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <motion.div
                        layoutId={`project-card-${project.id}`}
                        className="relative w-full max-w-6xl max-h-[90vh] bg-neutral-900 overflow-hidden rounded-[2rem] shadow-2xl flex flex-col md:flex-row"
                        initial={{ scale: 0.9, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        {/* BACKGROUND PATTERN (Only visible here) */}
                        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
                            <img
                                src={project.pattern}
                                className="w-full h-full object-cover"
                                alt="Decorative Pattern"
                            />
                        </div>

                        {/* Close Button - Mobile Accessible */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-colors md:top-6 md:right-6"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {/* Content Left: Visuals */}
                        <div className="relative z-10 w-full md:w-1/2 p-6 md:p-12 md:pr-8 flex flex-col justify-end min-h-[40vh]">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                            >
                                <span className="text-secondary tracking-[0.5em] text-xs font-bold uppercase mb-4 block" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                                    {project.date}
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black uppercase leading-none text-white mb-6" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                                    {project.title}
                                </h2>
                                <div className="flex gap-4">
                                    {project.tools?.map((tool, i) => (
                                        <span key={i} className="px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm text-xs uppercase tracking-wider text-white/90">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Content Right: Details */}
                        <div className="relative z-10 w-full md:w-1/2 bg-neutral-900/80 backdrop-blur-xl p-6 md:p-12 overflow-y-auto border-l border-white/5">

                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-2 mb-2 text-primary">
                                        <Hash className="w-4 h-4" />
                                        <span className="text-xs uppercase font-bold tracking-wider opacity-70">Units</span>
                                    </div>
                                    <span className="text-3xl font-bold">{project.metricValue}</span>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-2 mb-2 text-primary">
                                        <Layers className="w-4 h-4" />
                                        <span className="text-xs uppercase font-bold tracking-wider opacity-70">Category</span>
                                    </div>
                                    <span className="text-xl font-bold">Textile Print</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4">About the Collection</h3>
                            <p className="text-neutral-400 leading-relaxed mb-10 font-light">
                                {project.description}
                            </p>

                            <h3 className="text-xl font-bold text-white mb-6">Gallery</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {project.supportImages?.map((img, idx) => (
                                    <div key={idx} className="aspect-[3/4] rounded-xl overflow-hidden bg-neutral-800">
                                        <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt={`Detail ${idx}`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
