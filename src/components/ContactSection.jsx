import { motion } from 'framer-motion';

const ContactSection = () => {
    return (
        <section id="contact" className="relative w-[100vw] h-[100vh] flex-shrink-0 bg-neutral-900 flex flex-col items-center justify-center px-8 snap-center">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-center"
            >
                <h2 className="font-serif text-7xl md:text-9xl text-white mb-12 tracking-tighter uppercase">
                    Let's <span className="italic">Connect</span>
                </h2>

                <div className="flex flex-col gap-6 items-center">
                    <a
                        href="mailto:hello@danieldiaz.com"
                        className="group relative flex items-center gap-4 text-white text-2xl md:text-4xl font-light hover:italic transition-all"
                    >
                        hello@danieldiaz.com
                        <span className="w-0 group-hover:w-full h-[1px] bg-white absolute -bottom-2 left-0 transition-all duration-300" />
                    </a>

                    <div className="flex gap-12 mt-12">
                        {['LinkedIn', 'Instagram', 'Dribbble'].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="text-neutral-500 hover:text-white uppercase text-xs tracking-[0.3em] transition-colors"
                            >
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Footer-like credit */}
            <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center text-white/20 text-[10px] tracking-[0.4em] uppercase">
                <span>© 2024 Daniel Diaz</span>
                <span>All Rights Reserved</span>
                <span>Built with Precision</span>
            </div>
        </section>
    );
};

export default ContactSection;
