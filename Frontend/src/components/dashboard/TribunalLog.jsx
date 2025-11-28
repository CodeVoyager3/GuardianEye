import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const AGENTS = {
    AGGRESSOR: {
        id: 'AGGRESSOR',
        color: '#EF4444', // Red
        borderColor: 'border-red-500',
        textColor: 'text-red-500',
    },
    GUARDIAN: {
        id: 'GUARDIAN',
        color: '#06B6D4', // Cyan
        borderColor: 'border-cyan-500',
        textColor: 'text-cyan-500',
    },
    LOGISTICAN: {
        id: 'LOGISTICAN',
        color: '#A855F7', // Purple
        borderColor: 'border-purple-500',
        textColor: 'text-purple-500',
    }
};

const TribunalLog = ({ activeThreats = [] }) => {
    const [messages, setMessages] = useState([]);
    const [consensus, setConsensus] = useState(50);
    const scrollRef = useRef(null);
    const lastProcessedThreatId = useRef(null);

    // Initial "System Boot" messages
    useEffect(() => {
        setMessages([
            { id: 'init-1', agent: 'LOGISTICAN', text: 'System initialized. Neural cores online.', timestamp: new Date() },
            { id: 'init-2', agent: 'GUARDIAN', text: 'Ethical subroutines loaded. Rules of Engagement: ACTIVE.', timestamp: new Date() },
            { id: 'init-3', agent: 'AGGRESSOR', text: 'Weapons systems hot. Waiting for targets.', timestamp: new Date() }
        ]);
    }, []);

    // Watch for NEW threats and trigger debate
    useEffect(() => {
        if (activeThreats.length === 0) return;

        const latestThreat = activeThreats[activeThreats.length - 1];

        // Prevent reacting to the same threat twice
        if (latestThreat.id === lastProcessedThreatId.current) return;
        lastProcessedThreatId.current = latestThreat.id;

        // 1. Determine the "Script" based on the threat data
        let script = [];
        const tType = latestThreat.type;
        const tSector = latestThreat.sector;
        const isVerified = latestThreat.isZyndVerified;

        if (!isVerified) {
            // SCENARIO: SPOOF DETECTED
            script = [
                { agent: 'AGGRESSOR', text: `Contact! ${tType} detected in ${tSector}. Engaging tracking algorithms.` },
                { agent: 'GUARDIAN', text: `HOLD FIRE. Zynd Protocol verification failed. Signature mismatch on sensors.` },
                { agent: 'LOGISTICAN', text: `Discarding data packet. Source marked as unreliable. No resources allocated.` },
                { agent: 'GUARDIAN', text: `Spoofing attempt logged. Threat disregarded.` }
            ];
        } else {
            // SCENARIO: REAL THREAT
            if (tType === 'DRONE_SWARM') {
                script = [
                    { agent: 'AGGRESSOR', text: `Swarm signature detected in ${tSector}. Requesting EMP detonation.` },
                    { agent: 'GUARDIAN', text: `Analyzing... Civilian infrastructure is within EMP range. Denied.` },
                    { agent: 'LOGISTICAN', text: `Alternative: Kinetic interceptors available. Cost: $120k. Success probability: 89%.` },
                    { agent: 'AGGRESSOR', text: `Acceptable. Scramble interceptors immediately.` }
                ];
            } else if (tType === 'INFANTRY') {
                script = [
                    { agent: 'AGGRESSOR', text: `Ground units identified in ${tSector}. Recommend suppression fire.` },
                    { agent: 'GUARDIAN', text: `Negative. Heat signatures indicate non-combatants mixed in group.` },
                    { agent: 'LOGISTICAN', text: ` deploying surveillance drone for visual confirmation. Fuel time: 4 hours.` },
                    { agent: 'GUARDIAN', text: `Agreed. Maintain observation only.` }
                ];
            } else {
                // Generic fallback
                script = [
                    { agent: 'AGGRESSOR', text: `Anomaly detected in ${tSector}. Threat level rising.` },
                    { agent: 'LOGISTICAN', text: `Verifying supply lines to ${tSector}. We are green for engagement.` },
                    { agent: 'GUARDIAN', text: `Proceed with caution. Rules of Engagement apply.` }
                ];
            }
        }

        // 2. Play the script with delays (The "Typing" effect)
        let delay = 0;
        script.forEach((line) => {
            delay += 1500; // 1.5 seconds between messages
            setTimeout(() => {
                const newMessage = {
                    id: Date.now() + Math.random(),
                    agent: line.agent,
                    text: line.text,
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, newMessage].slice(-20)); // Keep last 20

                // Animate consensus bar randomly based on who spoke
                setConsensus(prev => {
                    if (line.agent === 'AGGRESSOR') return Math.max(10, prev - 15);
                    if (line.agent === 'GUARDIAN') return Math.min(90, prev + 15);
                    return prev;
                });

            }, delay);
        });

    }, [activeThreats]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full bg-[#0A0A0A] border border-[#333] overflow-hidden relative rounded-xl">
            {/* Header */}
            <div className="p-4 border-b border-[#333] bg-[#111] flex justify-between items-center">
                <h3 className="text-xs font-mono text-gray-400 tracking-widest">LIVE TRIBUNAL FEED</h3>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-600">CONSENSUS</span>
                    <div className="w-20 h-1 bg-[#333] rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-red-500 via-purple-500 to-cyan-500"
                            animate={{ width: `${consensus}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Log Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
            >
                <AnimatePresence initial={false}>
                    {messages.map((msg) => {
                        const agent = AGENTS[msg.agent];
                        return (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`border-l-2 ${agent.borderColor} bg-white/5 p-3 relative group rounded-r-lg`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-[10px] font-bold font-mono tracking-wider ${agent.textColor}`}>
                                        {agent.id}
                                    </span>
                                    <span className="text-[10px] text-gray-600 font-mono">
                                        {msg.timestamp.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-300 font-mono leading-relaxed">
                                    {msg.text}
                                </p>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TribunalLog;