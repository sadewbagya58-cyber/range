import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Anchor } from 'lucide-react';
const Hero = () => {
  const heroImage = "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2070"; // Real-world container terminal

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background System */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/80 to-brand-dark z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-transparent to-brand-dark/80 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-pulse-slow"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            opacity: 0.5
          }}
        />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-navy/20 rounded-full blur-[120px] pointer-events-none animate-float-delayed" />

      <div className="container mx-auto px-4 relative z-20 pt-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-10 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
            </span>
            Verified Global Network
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gradient mb-10 max-w-5xl"
          >
            Orchestrating the Future of <span className="text-brand-orange">Global Logistics</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/40 text-lg md:text-2xl max-w-3xl mb-16 leading-relaxed font-light"
          >
            The world's most elite B2B marketplace for maritime agencies, freight forwarders, and supply chain visionaries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 mb-24"
          >
            <button className="btn-primary">
              Access Marketplace
              <ArrowRight size={16} />
            </button>
            <button className="btn-secondary">
              Strategic Alliances
            </button>
          </motion.div>
      </div>

          {/* Institutional Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20 border-t border-white/5 pt-12 w-full max-w-6xl"
          >
            {[
              { label: 'Verified Partners', value: '5,000+' },
              { label: 'Active Countries', value: '150+' },
              { label: 'Freight Requests', value: '12K+', pulse: true },
              { label: 'Strategic Alliances', value: '450+' },
            ].map((stat, i) => (
              <div key={i} className="space-y-2 group cursor-default">
                <div className="text-3xl md:text-4xl font-bold text-white group-hover:text-brand-orange transition-colors duration-500 flex items-center justify-center gap-2">
                  {stat.value}
                  {stat.pulse && <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-ping" />}
                </div>
                <div className="text-[10px] text-white/20 uppercase font-black tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
