import React from 'react';
import { motion } from 'motion/react';
import { GridScan } from './GridScan';

const Hero = () => {
    return (
        <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-[#101010]" id="system">
            <div className="absolute inset-0 z-0 opacity-60">
                <GridScan
                    scanColor="#00FFFF"
                    linesColor="#1A1A1A"
                    scanDuration={3}
                    scanGlow={0.8}
                />
            </div>

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 text-white">
                        PROJECT <span className="text-[#00FFFF] neon-text">A.R.E.S.</span> <br />
                        ZERO-TRUST AUTONOMOUS DEFENSE
                    </h1>
                </motion.div>

                <motion.p
                    className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    The first multi-agent system to achieve cryptographic verification for mission-critical decisions.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="pointer-events-auto"
                >
                    <button className="bg-transparent border border-[#00FFFF] text-[#00FFFF] px-8 py-4 text-lg font-bold hover:bg-[#00FFFF] hover:text-[#101010] transition-all duration-300 neon-border relative overflow-hidden group cursor-pointer">
                        <span className="relative z-10">INITIATE SYSTEM SCAN</span>
                        <div className="absolute inset-0 bg-[#00FFFF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
                    </button>
                </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-10 left-10 text-[#00FFFF]/50 text-xs font-mono pointer-events-none">
                <div>SYS.STATUS: ONLINE</div>
                <div>LATENCY: 12ms</div>
            </div>
            <div className="absolute bottom-10 right-10 text-[#00FFFF]/50 text-xs font-mono text-right pointer-events-none">
                <div>SECURE CONNECTION</div>
                <div>ENCRYPTION: AES-256</div>
            </div>
        </section>
    );
};

export default Hero;
