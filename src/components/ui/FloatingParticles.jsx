import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function FloatingParticles({ count = 20 }) {
    // Generate random particles with positions and delays
    const particles = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100, // Random horizontal position (%)
            delay: Math.random() * 5, // Random animation delay
            duration: 10 + Math.random() * 8, // Random duration (10-18s) - faster
            size: Math.random() > 0.5 ? 'small' : 'large', // Random size
            shape: Math.random() > 0.5 ? 'circle' : 'cross', // Random shape
        }));
    }, [count]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute"
                    style={{
                        left: `${particle.x}%`,
                        bottom: '-20px',
                    }}
                    animate={{
                        y: [0, -window.innerHeight - 100],
                        x: [0, (Math.random() - 0.5) * 100], // Slight horizontal drift
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: 'linear',
                    }}
                >
                    {particle.shape === 'circle' ? (
                        <div
                            className={`rounded-full bg-white/30 ${particle.size === 'small' ? 'w-2 h-2' : 'w-3 h-3'
                                }`}
                        />
                    ) : (
                        <div className="relative" style={{ width: '8px', height: '8px' }}>
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/30 -translate-y-1/2" />
                            <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white/30 -translate-x-1/2" />
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    );
}
