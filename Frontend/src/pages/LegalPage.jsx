import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, FileText, AlertTriangle } from 'lucide-react';

const LegalSection = ({ title, icon: Icon, children, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="mb-12 border-l-2 border-[#333] pl-6 hover:border-[#00FFFF] transition-colors duration-300"
    >
        <div className="flex items-center gap-3 mb-4">
            <Icon className="w-6 h-6 text-[#00FFFF]" />
            <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
        </div>
        <div className="text-gray-400 space-y-4 leading-relaxed font-light">
            {children}
        </div>
    </motion.div>
);

const LegalPage = () => {
    return (
        <div className="bg-[#101010] min-h-screen text-white selection:bg-[#00FFFF] selection:text-[#101010] pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">LEGAL PROTOCOLS</h1>
                    <div className="h-1 w-24 bg-[#00FFFF] mx-auto mb-6" />
                    <p className="text-gray-500 font-mono text-sm">
                        CLASSIFICATION: PUBLIC // UNRESTRICTED ACCESS
                    </p>
                </motion.div>

                <LegalSection title="TERMS OF ENGAGEMENT" icon={Shield} delay={0.1}>
                    <p>
                        Access to the A.R.E.S. (Autonomous Response & Engagement System) platform is strictly regulated.
                        By initializing any system interface, you acknowledge that you are an authorized operator with
                        appropriate security clearance.
                    </p>
                    <p>
                        Unauthorized attempts to access, reverse engineer, or tamper with the neural decision cores
                        will result in immediate lockout and notification of relevant authorities under the
                        Cybersecurity Act of 2024.
                    </p>
                </LegalSection>

                <LegalSection title="DATA PRIVACY & ENCRYPTION" icon={Lock} delay={0.2}>
                    <p>
                        A.R.E.S. operates on a Zero-Trust architecture. All biometric and telemetry data is
                        encrypted using AES-256 standards at rest and in transit.
                    </p>
                    <p>
                        We do not sell, trade, or transfer your operational data to outside parties.
                        Data is retained only for the duration of the active mission parameters plus a
                        mandatory audit retention period of 7 years.
                    </p>
                </LegalSection>

                <LegalSection title="AUTONOMOUS LIABILITY" icon={AlertTriangle} delay={0.3}>
                    <p>
                        While A.R.E.S. utilizes advanced predictive algorithms for threat assessment, final
                        engagement authority remains with the human operator in the loop (HITL) or on the loop (HOTL),
                        depending on the configured Rules of Engagement (ROE).
                    </p>
                    <p>
                        Project A.R.E.S. Defense Systems assumes no liability for operational decisions made
                        under autonomous modes if the system logs indicate tampering or override of safety protocols.
                    </p>
                </LegalSection>

                <LegalSection title="INTELLECTUAL PROPERTY" icon={FileText} delay={0.4}>
                    <p>
                        The Zynd Protocol, GridScan technology, and the "Civilian Shield" ethical constraints
                        are proprietary technologies of Project A.R.E.S. Defense Systems.
                    </p>
                    <p>
                        Reproduction of the interface, underlying code, or visual assets without express
                        written permission is a violation of international copyright and patent laws.
                    </p>
                </LegalSection>

                <div className="mt-16 pt-8 border-t border-[#333] text-center">
                    <p className="text-gray-500 text-xs font-mono">
                        LAST UPDATED: 2025-11-27 // SYSTEM VERSION 2.4.0
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
