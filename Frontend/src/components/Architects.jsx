import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const team = [
    {
        name: "AYUSH KUMAR",
        role: "LEAD SYSTEMS ARCHITECT",
        bio: "Specializing in autonomous swarm logic and adversarial AI defense systems.",
        image: "/person1.png"
    },
    {
        name: "AMRITESH KUMAR RAI",
        role: "HEAD OF CRYPTOGRAPHY",
        bio: "Pioneer of the Zynd Protocol. Expert in zero-knowledge proof implementation.",
        image: "/person2.png"
    },
    {
        name: "KAUSTUBH SHARMA",
        role: "ETHICS COMPLIANCE OFFICER",
        bio: "Ensures autonomous decision trees align with international engagement protocols.",
        image: "/person3.jpg"
    },
    {
        name: "HIMANSHU KUMAR MAHTO",
        role: "CHIEF OPERATIONS OFFICER",
        bio: "Orchestrating global deployment logistics and mission-critical infrastructure.",
        image: "/person4.jpg"
    }
];

const Architects = () => {
    return (
        <section className="py-20 bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">THE ARCHITECTS OF A.R.E.S.</h2>
                    <div className="h-1 w-20 bg-[#00FFFF] mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            className="group relative bg-[#101010] border border-[#333] hover:border-[#00FFFF] transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden border-b border-[#333] group-hover:border-[#00FFFF] transition-colors duration-300">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-[#00FFFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />

                                {/* Scanner Effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FFFF]/20 to-transparent h-[20%] w-full -translate-y-full group-hover:translate-y-[500%] transition-transform duration-1000 ease-linear pointer-events-none" />

                                {/* Grid Overlay */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-white mb-1 truncate" title={member.name}>{member.name}</h3>
                                <p className="text-[#00FFFF] text-[10px] font-mono mb-4">{member.role}</p>
                                <p className="text-gray-400 text-xs leading-relaxed mb-6 h-16 overflow-hidden">
                                    {member.bio}
                                </p>

                                <div className="flex gap-4">
                                    <a href="#" className="text-gray-500 hover:text-[#00FFFF] transition-colors">
                                        <Github className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="text-gray-500 hover:text-[#00FFFF] transition-colors">
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="text-gray-500 hover:text-[#00FFFF] transition-colors">
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Architects;
