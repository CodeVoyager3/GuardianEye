import React from 'react';
import { motion } from 'motion/react';
import { Gavel, ShieldCheck, Zap, HeartHandshake, Lock, Activity, Users } from 'lucide-react';

const FeatureCard = ({ title, description, icon: Icon, className, delay }) => (
    <motion.div
        className={`bg-[#1A1A1A] border border-[#333] p-6 relative overflow-hidden group hover:border-[#00FFFF] transition-colors duration-300 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
    >
        <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
            <Icon className="w-12 h-12 text-[#00FFFF]" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
                <div className="mb-4 text-[#00FFFF]">
                    <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white tracking-tight">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#333] flex justify-between items-center text-xs text-gray-500 font-mono">
                <span>STATUS: ACTIVE</span>
                <span className="group-hover:text-[#00FFFF] transition-colors">:: VERIFIED</span>
            </div>
        </div>

        {/* Hover effect - Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FFFF]/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />
    </motion.div>
);

const Features = () => {
    return (
        <section className="py-20 bg-[#101010]" id="features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">CORE CAPABILITIES</h2>
                    <div className="h-1 w-20 bg-[#00FFFF]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
                    {/* Block 1: Large Panel */}
                    <FeatureCard
                        title="THE TRIBUNAL"
                        description="Three distinct AI agents (Aggressor, Safety, Logistican) negotiate decisions in milliseconds. Multi-agent consensus ensures balanced and strategic outcomes."
                        icon={Gavel}
                        className="md:col-span-2 md:row-span-2 min-h-[400px]"
                        delay={0.1}
                    />

                    {/* Block 2: Medium Panel */}
                    <FeatureCard
                        title="A.R.E.S. VERIFIED"
                        description="Zero-Trust Architecture. Cryptographically authenticates all sensor feeds before action is taken, neutralizing spoofing attacks."
                        icon={ShieldCheck}
                        className="md:col-span-1 md:row-span-1"
                        delay={0.2}
                    />

                    {/* Block 3: Small Panel */}
                    <FeatureCard
                        title="MISSION LATENCY"
                        description="Real-time threat correlation and response decisions executed in <50ms latency."
                        icon={Zap}
                        className="md:col-span-1 md:row-span-1"
                        delay={0.3}
                    />

                    {/* Block 4: Small Panel */}
                    <FeatureCard
                        title="THE CIVILIAN SHIELD"
                        description="Built-in ethical AI guardrails. Autonomous restraint and de-escalation protocols prioritize safety."
                        icon={HeartHandshake}
                        className="md:col-span-3 md:row-span-1"
                        delay={0.4}
                    />
                </div>
            </div>
        </section>
    );
};

export default Features;
