import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { FileText, User } from 'lucide-react';

const reports = [
    {
        id: 1,
        name: "COL. S. SINGH",
        role: "SECOPS LEAD",
        content: "A.R.E.S.'s autonomous response time reduced our incident containment window by 94%. The Tribunal system provides the audit trail we need for compliance.",
        date: "2024-11-15",
        clearance: "LEVEL 4"
    },
    {
        id: 2,
        name: "DR. A. MISHRA",
        role: "CHIEF AI ETHICIST",
        content: "The Civilian Shield protocols are not just a safety feature; they are the foundation of trust. We've seen zero false positives in urban deployment tests.",
        date: "2024-10-22",
        clearance: "LEVEL 5"
    },
    {
        id: 3,
        name: "M. GOSWAMI",
        role: "INFRASTRUCTURE DIR",
        content: "Deploying A.R.E.S. was seamless. The Zero-Trust architecture integrated perfectly with our existing sensor grid without requiring a complete overhaul.",
        date: "2024-12-01",
        clearance: "LEVEL 3"
    },
    {
        id: 4,
        name: "SGT. T. REDDY",
        role: "FIELD OPERATOR",
        content: "In the field, hesitation kills. A.R.E.S. doesn't hesitate, but it also doesn't make mistakes. It's the partner I want watching my six.",
        date: "2024-11-30",
        clearance: "LEVEL 4"
    },
    {
        id: 5,
        name: "DR. A. MISHRA",
        role: "CHIEF AI ETHICIST",
        content: "The Civilian Shield protocols are not just a safety feature; they are the foundation of trust. We've seen zero false positives in urban deployment tests.",
        date: "2024-10-22",
        clearance: "LEVEL 5"
    },
    {
        id: 6,
        name: "DR. A. MISHRA",
        role: "CHIEF AI ETHICIST",
        content: "The Civilian Shield protocols are not just a safety feature; they are the foundation of trust. We've seen zero false positives in urban deployment tests.",
        date: "2024-10-22",
        clearance: "LEVEL 5"
    },
    {
        id: 7,
        name: "DR. A. MISHRA",
        role: "CHIEF AI ETHICIST",
        content: "The Civilian Shield protocols are not just a safety feature; they are the foundation of trust. We've seen zero false positives in urban deployment tests.",
        date: "2024-10-22",
        clearance: "LEVEL 5"
    },
];

const Testimonials = () => {
    const containerRef = useRef(null);

    return (
        <section className="py-20 bg-[#101010] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">FIELD REPORTS — CONFIRMED EFFICACY</h2>
                <div className="h-1 w-20 bg-[#00FFFF]" />
            </div>

            <div ref={containerRef} className="w-full overflow-hidden cursor-grab active:cursor-grabbing">
                <motion.div
                    className="flex gap-6 px-4 sm:px-6 lg:px-8 w-max"
                    drag="x"
                    dragConstraints={containerRef}
                >
                    {reports.map((report) => (
                        <motion.div
                            key={report.id}
                            className="w-[350px] bg-[#1A1A1A] border border-[#333] p-6 flex-shrink-0 relative group hover:border-[#00FFFF] transition-colors duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-6 border-b border-[#333] pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#222] flex items-center justify-center border border-[#444]">
                                        <User className="text-gray-400 w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-[#00FFFF] font-bold text-sm tracking-wider">{report.name}</h4>
                                        <p className="text-xs text-gray-500 font-mono">{report.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <FileText className="w-5 h-5 text-gray-600 mb-1 ml-auto" />
                                    <p className="text-[10px] text-gray-600 font-mono">REF: {report.date}</p>
                                </div>
                            </div>

                            {/* Content */}
                            <p className="text-gray-300 text-sm leading-relaxed mb-6 font-mono">
                                "{report.content}"
                            </p>

                            {/* Footer */}
                            <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase">
                                <span className="bg-[#222] px-2 py-1 border border-[#333]">Clearance: {report.clearance}</span>
                                <span className="text-[#00FFFF] opacity-0 group-hover:opacity-100 transition-opacity">:: DECLASSIFIED</span>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00FFFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00FFFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00FFFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00FFFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
