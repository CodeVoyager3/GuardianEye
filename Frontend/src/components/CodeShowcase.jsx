import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Code, Cpu, ShieldAlert } from 'lucide-react';

import { BrainCircuit, ShieldCheck, Network } from 'lucide-react';

const snippets = [
    {
        id: 'agent-core',
        title: 'AGENT_DECISION_CORE.PY',
        language: 'python',
        icon: BrainCircuit,
        code: `async def evaluate_threat_vector(sensor_data, roe_context):
    # Initialize specialized agent roles via LangChain/LLM
    aggressor_agent = Agent(role="OFFENSIVE_STRATEGIST")
    safety_agent = Agent(role="CIVILIAN_PROTECTION")

    # Parallel execution of agent reasoning
    Analysis results = await asyncio.gather(
        aggressor_agent.analyze(sensor_data),
        safety_agent.analyze(sensor_data)
    )

    # Synthesize conflicting reports against Rules of Engagement (ROE)
    final_command = synthesis_engine.arbitrate(results, roe_context)

    if final_command.confidence < 0.95:
        return Action.ESCALATE_TO_HUMAN_COMMAND
    
    return final_command.execute()`
    },
    {
        id: 'zynd-verify',
        title: 'ZYND_VERIFIER.JS',
        language: 'javascript',
        icon: ShieldCheck,
        code: `async function verifyIncomingDataStream(packet) {
    const { dataPayload, sourceDID, cryptoSignature } = packet;

    // Step 1: Zero-Trust Gatekeeping via Zynd Protocol
    // Verify the sender's Decentralized Identifier (DID) isn't spoofed
    const isIdentityValid = await zyndClient.resolveDID(sourceDID);

    if (!isIdentityValid) {
        // Immediate rejection - Do not process data from unverified sources
        logger.alert("SPOOFING ATTEMPT BLOCKED", { source: sourceDID });
        throw new SecurityError("UNTRUSTED_SOURCE_IDENTITY");
    }

    // Step 2: Verify data integrity using the attached signature
    const isDataIntact = crypto.verify(dataPayload, cryptoSignature, sourceDID.publicKey);

    if (!isDataIntact) {
         throw new SecurityError("DATA_TAMPERING_DETECTED");
    }

    return true; // Data accepted for agent processing
}`
    },
    {
        id: 'tribunal-net',
        title: 'TRIBUNAL_ORCHESTRATOR.PY',
        language: 'python',
        icon: Network,
        code: `def convene_tribunal(threat_id, ProposedActions):
    # The Multi-Agent Debate System
    # Takes proposed actions from sub-agents and forces a consensus negotiation.

    debate_log = []
    consensus_reached = False

    while not consensus_reached and len(debate_log) < MAX_DEBATE_TURNS:
        # Agents critique each other's proposals based on their specific directive
        critiques = parallel_critique(ProposedActions)
        
        # Adjust confidence scores based on peer review
        updated_proposals = adjust_confidence(ProposedActions, critiques)
        
        # Check if dominant strategy emerges with >90% agreement across all agents
        consensus_reached, final_plan = check_consensus_threshold(updated_proposals)
        debate_log.append(critiques)

    if consensus_reached:
        # Log the reasoning chain for transparency and execute
        audit_log.record_decision_chain(threat_id, debate_log)
        return final_plan.activate()
    
    else:
        # Failed consensus defaults to defensive posture
        return Action.DEFENSIVE_HOLD_AND_ALERT`
    }
];

const CodeShowcase = () => {
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTab((prev) => (prev + 1) % snippets.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 bg-[#0A0A0A] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">SYSTEM ARCHITECTURE</h2>
                    <div className="h-1 w-20 bg-[#00FFFF] mx-auto" />
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                        Direct insight into the autonomous logic powering A.R.E.S.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                    {/* Description Side */}
                    <div className="space-y-8 lg:col-span-2">
                        {snippets.map((snippet, index) => (
                            <motion.button
                                key={snippet.id}
                                onClick={() => setActiveTab(index)}
                                className={`w-full text-left p-6 border transition-all duration-300 relative overflow-hidden group ${activeTab === index
                                    ? 'bg-[#1A1A1A] border-[#00FFFF]'
                                    : 'bg-transparent border-[#333] hover:border-[#00FFFF]/50'
                                    }`}
                                whileHover={{ x: 10 }}
                            >
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className={`p-3 rounded-none ${activeTab === index ? 'bg-[#00FFFF]/20 text-[#00FFFF]' : 'bg-[#333] text-gray-400'}`}>
                                        <snippet.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className={`font-mono text-lg font-bold ${activeTab === index ? 'text-[#00FFFF]' : 'text-white'}`}>
                                            {snippet.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1 font-mono">
                                            MODULE::{snippet.id.toUpperCase()}
                                        </p>
                                    </div>
                                </div>
                                {activeTab === index && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute inset-0 bg-[#00FFFF]/5 z-0"
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Code Terminal Side */}
                    <div className="relative lg:col-span-3">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#00FFFF] to-[#00FFFF]/0 opacity-20 blur-lg" />
                        <div className="bg-[#050505] border border-[#333] rounded-sm overflow-hidden relative h-[600px]">
                            {/* Terminal Header */}
                            <div className="bg-[#101010] px-4 py-2 border-b border-[#333] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-[#00FFFF]" />
                                    <span className="text-xs text-gray-400 font-mono">A.R.E.S. TERMINAL // ROOT ACCESS</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                </div>
                            </div>

                            {/* Code Content */}
                            {/* Code Content */}
                            <div className="p-6 font-mono text-sm overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="text-gray-500 mb-4">
                      // Loading module: <span className="text-[#00FFFF]">{snippets[activeTab].title}</span>...<br />
                      // Verifying integrity... OK
                                        </div>
                                        <pre className="text-gray-300 leading-relaxed whitespace-pre-wrap break-all">
                                            <code>
                                                {snippets[activeTab].code.split('\n').map((line, i) => (
                                                    <div key={i} className="table-row">
                                                        <span className="table-cell text-gray-700 select-none pr-4 text-right w-8 align-top">{i + 1}</span>
                                                        <span className="table-cell" dangerouslySetInnerHTML={{
                                                            __html: line
                                                                .replace(/def|class|return|if|elif|else|async|fn|let|void|const/g, '<span class="text-[#ff79c6]">$&</span>')
                                                                .replace(/Action|THRESHOLD|Decision|Error|Ok|Err|Vector2|LidarPoint|Object/g, '<span class="text-[#8be9fd]">$&</span>')
                                                                .replace(/neural_net|crypto|kalman_filter|alert_system|defense_grid/g, '<span class="text-[#bd93f9]">$&</span>')
                                                                .replace(/".*?"/g, '<span class="text-[#f1fa8c]">$&</span>')
                                                                .replace(/\/\/.*|#.*/g, '<span class="text-[#6272a4]">$&</span>')
                                                        }} />
                                                    </div>
                                                ))}
                                            </code>
                                        </pre>
                                        <motion.div
                                            className="w-2 h-4 bg-[#00FFFF] mt-1 inline-block"
                                            animate={{ opacity: [1, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.8 }}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Scanline */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FFFF]/5 to-transparent h-[10%] w-full animate-scan pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CodeShowcase;
