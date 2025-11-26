import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

const CTA = () => {
    return (
        <section className="py-24 bg-[#101010] relative overflow-hidden" id="access">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 bg-[#FF3333]/10 border border-[#FF3333] text-[#FF3333] px-4 py-1 mb-8 animate-pulse">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs font-bold tracking-wider">LIMITED SLOTS REMAIN</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    RESTRICTED ACCESS REQUIRED
                </h2>

                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                    Integration slots for early access defense partners are severely limited. Initiate Phase 1 deployment review today.
                </p>

                <motion.button
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-[#101010] bg-[#00FFFF] overflow-hidden transition-all duration-300 hover:bg-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        REQUEST DEPLOYMENT ACCESS
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>

                    {/* Glint Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12" />
                </motion.button>

                <div className="mt-8 text-xs text-gray-600 font-mono">
                    SECURE TRANSMISSION // ENCRYPTED END-TO-END
                </div>
            </div>
        </section>
    );
};

export default CTA;
