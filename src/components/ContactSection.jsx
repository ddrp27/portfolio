import { motion } from 'framer-motion';

const ContactSection = () => {
    return (
        <section id="contact" className="relative w-full h-screen bg-neutral-950 flex flex-col items-center justify-center px-8 snap-start overflow-hidden">

            {/* Gradiente de fondo sutil para que el glassmorphism resalte */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white-500/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-center z-10"
            >
                {/* Título Principal */}
                <h2 className="flex flex-row items-baseline justify-center gap-x-4 mb-12 select-none">
                    <span className="font-['Gilroy',_sans-serif] text-5xl md:text-8xl lg:text-9xl text-white uppercase tracking-tighter font-bold">
                        Let's
                    </span>
                    <span className="font-['Luxurious_Script'] text-7xl md:text-[9rem] lg:text-[11rem] text-white-400 normal-case leading-none drop-shadow-white -ml-2">
                        Connect
                    </span>
                </h2>

                <div className="flex flex-col gap-12 items-center">

                    {/* BOTÓN CON ESTÉTICA GLASSMORPHISM */}
                    <a
                        href="mailto:diazdiaz@gmail.com"
                        className="group relative px-14 py-6 overflow-hidden rounded-full transition-all duration-500 hover:scale-105 active:scale-95"
                    >
                        {/* Capa de Vidrio (Background & Blur) */}
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-full group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500" />

                        {/* Brillo interno dinámico */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Texto del Botón */}
                        <span className="relative z-10 text-white font-['Gilroy'] text-[11px] font-black uppercase tracking-[0.6em] ml-[0.6em]">
                            Send an E-mail
                        </span>
                    </a>

                    {/* Redes Sociales */}
                    <div className="flex gap-16 mt-8">
                        <a
                            href="https://www.linkedin.com/in/daniel-diaz-r/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-500 hover:text-white font-['Gilroy'] text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-300 hover:tracking-[0.5em]"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://www.instagram.com/ddrp.27"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-500 hover:text-white font-['Gilroy'] text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-300 hover:tracking-[0.5em]"
                        >
                            Instagram
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* Footer Minimalista */}
            <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-center gap-4 text-white/10 font-['Gilroy'] text-[9px] font-black tracking-[0.6em] uppercase pointer-events-none">
                <span>© 2025 Daniel Diaz</span>
                <span className="hidden md:block">Based in Envigado,Colombia</span>
                <span>All Rights Reserved</span>
            </div>
        </section>
    );
};

export default ContactSection;
