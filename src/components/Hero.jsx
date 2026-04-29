import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Anchor } from 'lucide-react';
const Hero = () => {
  const heroImage = "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2070"; // Real-world container terminal

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-dark/90 to-brand-dark z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-pulse-slow"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            opacity: 0.6
          }}
        />
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-navy/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
        >
          <Anchor size={16} className="text-brand-orange" />
          <span className="text-sm font-medium tracking-wider uppercase text-white/80">Global Logistics Ecosystem</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8"
        >
          The World's <span className="text-brand-orange">B2B</span> Marketplace. <br />
          <span className="text-white/40">Shipping Simplified.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-12"
        >
          Connecting global shippers, carriers, and maritime service providers across 150+ countries. Streamline your supply chain with our precision-engineered networking platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="btn-primary flex items-center justify-center gap-2 px-8 py-4">
            Access Marketplace
            <ArrowRight size={20} />
          </button>
          <button className="btn-secondary px-8 py-4">
            List Your Business
          </button>
        </motion.div>
      </div>

      {/* Stats Overlay - Enterprise Scale */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 w-full hidden lg:block"
      >
        <div className="max-w-5xl mx-auto flex justify-between px-8 border-t border-white/5 pt-8">
          {[
            { label: 'Verified Businesses', value: '5,000+' },
            { label: 'Global Reach', value: '150+ Countries' },
            { label: 'Strategic Alliances', value: '12+' },
            { label: 'Monthly Traffic', value: '1M+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-white/40 mt-1 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
