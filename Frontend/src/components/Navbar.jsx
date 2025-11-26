import React from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'SYSTEM', href: '#system' },
    { name: 'FEATURES', href: '#features' },
    { name: 'ACCESS', href: '#access' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#101010]/90 backdrop-blur-md border-b border-[#00FFFF]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.div
              className="flex-shrink-0 text-[#00FFFF] flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <img src="/logo.png" alt="A.R.E.S. Logo" className="h-10  w-auto" />
              <span className="font-bold text-xl tracking-tighter">A.R.E.S.</span>
            </motion.div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-[#00FFFF] px-3 py-2 text-sm font-medium transition-colors duration-300 relative group"
                  whileHover={{ x: 2 }}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00FFFF] transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-[#00FFFF] hover:bg-[#1A1A1A] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-[#101010] border-b border-[#00FFFF]/30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-[#00FFFF] block px-3 py-2 text-base font-medium border-l-2 border-transparent hover:border-[#00FFFF] hover:bg-[#1A1A1A]"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
