import { Mail, Linkedin, Instagram } from 'lucide-react';

export default function Contact() {
    return (
        <footer className="w-full py-20 px-6 bg-neutral-950 border-t border-white/5">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-7xl font-black uppercase text-white tracking-tighter mb-8 text-balance">
                    Ready to create something amazing?
                </h2>

                <p className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto">
                    I am currently open to new opportunities and collaborations. Feel free to reach out.
                </p>

                <a
                    href="mailto:contact@danidiaz.design"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#958771] text-white rounded-full font-bold uppercase tracking-wider hover:bg-[#867863] transition-colors mb-16"
                >
                    <Mail className="w-5 h-5" />
                    Get in touch
                </a>

                <div className="flex justify-center gap-8">
                    <a href="#" className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white">
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a href="#" className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white">
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
