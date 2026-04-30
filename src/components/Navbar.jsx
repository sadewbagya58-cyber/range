import React, { useState, useEffect } from 'react';
import { Menu, X, Ship, Phone, User, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', href: '/#services' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Global Network', href: '/directory' },
    { name: 'Institutional', href: '/#about' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-4 group cursor-pointer">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="relative w-10 h-10 overflow-hidden rounded-xl border border-white/10 group-hover:border-brand-orange/50 transition-colors"
            >
              <img src={logo} alt="Ruzave" className="w-full h-full object-contain p-1.5" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-black tracking-tight leading-none">
                RUZAVE <span className="text-brand-orange">GLOBAL</span>
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/40 mt-1">Institutional Platform</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-12">
            <div className="flex items-center space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[10px] font-black text-white/40 hover:text-brand-orange transition-all duration-500 uppercase tracking-[0.2em]"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="h-4 w-px bg-white/10 mx-2" />
            
            {user ? (
              <div className="flex items-center gap-6">
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 text-[10px] font-black text-white/40 hover:text-brand-orange transition-all uppercase tracking-[0.2em]"
                >
                  <LayoutDashboard size={14} />
                  Dashboard
                </Link>
                <button 
                  onClick={signOut}
                  className="flex items-center gap-2 text-[10px] font-black text-white/40 hover:text-red-400 transition-all uppercase tracking-[0.2em]"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link 
                  to="/login" 
                  className="text-[10px] font-black text-white/40 hover:text-brand-orange transition-all uppercase tracking-[0.2em]"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary scale-90"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-orange transition-colors p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-brand-dark/98 backdrop-blur-3xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 pt-8 pb-12 space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-2xl font-bold hover:text-brand-orange transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-6 space-y-4 border-t border-white/5">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block text-2xl font-bold hover:text-brand-orange transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="block text-2xl font-bold text-red-400 hover:text-red-500 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block text-2xl font-bold hover:text-brand-orange transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="btn-primary w-full py-5 text-center"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

