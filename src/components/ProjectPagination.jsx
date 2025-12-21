import { motion } from 'framer-motion';

const ProjectPagination = ({ projects, activeIndex, onPageClick }) => {
    // Only show dots on Work sections (index 1 to projects.length)
    if (activeIndex === 0 || activeIndex > projects.length) return null;

    return (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
            {projects.map((project, index) => {
                // Project 1 is at page index 1, Project 2 at 2, etc.
                const pageIndex = index + 1;
                const isActive = pageIndex === activeIndex;
                return (
                    <motion.button
                        key={project.id}
                        onClick={() => onPageClick(pageIndex)}
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
