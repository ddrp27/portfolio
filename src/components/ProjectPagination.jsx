import { motion } from 'framer-motion';

const ProjectPagination = ({ projects, activeIndex, onPageClick }) => {
    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex gap-4">
            {projects.map((project, index) => {
                const isActive = index === activeIndex;
                return (
                    <motion.button
                        key={project.id}
                        onClick={() => onPageClick(index)}
                        className={`rounded-full transition-colors duration-300 ${isActive ? 'bg-white' : 'bg-white/30 hover:bg-white/50'}`}
                        initial={false}
                        animate={{
                            width: isActive ? 12 : 8,
                            height: isActive ? 12 : 8,
                            opacity: isActive ? 1 : 0.5
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        aria-label={`Go to project ${project.title}`}
                    />
                );
            })}
        </div>
    );
};

export default ProjectPagination;
