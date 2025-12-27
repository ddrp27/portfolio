import { Mail, Linkedin, Instagram } from 'lucide-react';

export default function Contact() {
    return (
        <footer className="w-full py-20 px-6 bg-neutral-950 border-t border-white/5">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-7xl font-black uppercase text-white tracking-tighter mb-8 text-balance">
                    Ready to create something amazing?
                </h2>

                <p className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto">
                    I am currently open to new opportunities and collaborations.
                    <br></br>Feel free to reach out.
                </p>

                {/* BOTÓN ESTILO "SKILLS" (GLASSMORPHISM) */}
                <a
                    href="mailto:contact@danidiaz.design"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-bold uppercase tracking-wider hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm mb-16"
                >
                    <Mail className="w-5 h-5" />
                    Get in touch
                </a>

                {/* REDES SOCIALES SEGURAS */}
                <div className="flex justify-center gap-8">
                    <a
                        href="https://www.linkedin.com/in/daniel-diaz-r/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
                        aria-label="LinkedIn Profile"
                    >
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a
                        href="https://www.instagram.com/ddrp.27/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
                        aria-label="Instagram Profile"
                    >
                        <Instagram className="w-6 h-6" />
                    </a>
                </div>

                <div className="mt-20 pt-10 border-t border-white/5 text-center text-white/20 text-sm">
                    © 2025 Daniel Diaz. All rights reserved.
                </div>
            </div>
        </footer>
    );
}