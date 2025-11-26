import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#050505] border-t border-[#1A1A1A] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <img src="/logo.png" alt="A.R.E.S. Logo" className="h-8 w-auto" />
                        <span className="font-bold text-lg tracking-tighter text-white">A.R.E.S.</span>
                    </div>

                    <div className="flex space-x-8 text-sm text-gray-400">
                        <a href="/#system" className="hover:text-[#00FFFF] transition-colors">SYSTEM</a>
                        <a href="/#features" className="hover:text-[#00FFFF] transition-colors">FEATURES</a>
                        <a href="/#access" className="hover:text-[#00FFFF] transition-colors">ACCESS</a>
                        <Link to="/legal" className="hover:text-[#00FFFF] transition-colors">LEGAL</Link>
                    </div>
                </div>

                <div className="border-t border-[#1A1A1A] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono">
                    <p>&copy; 2025 PROJECT A.R.E.S. DEFENSE SYSTEMS. ALL RIGHTS RESERVED.</p>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <span>STATUS: OPERATIONAL</span>
                        <div className="w-2 h-2 bg-[#00FFFF] animate-pulse rounded-none" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;