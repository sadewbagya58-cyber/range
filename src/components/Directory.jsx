import React from 'react';
import { motion } from 'framer-motion';
import { Search, Globe, Building2, Anchor, Truck, Shield, ChevronRight } from 'lucide-react';

const categories = [
  { name: 'Freight Forwarders', count: '1,240', icon: Truck },
  { name: 'Ship Agents', count: '850', icon: Anchor },
  { name: 'Customs Brokers', count: '620', icon: Shield },
  { name: 'Warehousing & 3PL', count: '430', icon: Building2 },
];

const countries = [
  { name: 'China', flag: '🇨🇳' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'United Arab Emirates', flag: '🇦🇪' },
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Sri Lanka', flag: '🇱🇰' },
];

const Directory = () => {
  return (
    <section id="directory" className="section-padding bg-brand-dark overflow-hidden relative">
      {/* Decorative Orbs */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-navy/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/5 text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Globe size={14} className="text-brand-orange" />
            Global Reach Index
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-white mb-10 max-w-4xl mx-auto"
          >
            Orchestrating <span className="text-brand-orange">Connectivity</span> Across Borders
          </motion.h2>
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-0 bg-brand-orange/20 rounded-full blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
            <div className="relative flex items-center bg-white/[0.03] border border-white/10 rounded-full p-2 backdrop-blur-xl group-focus-within:border-brand-orange/50 transition-all duration-500">
              <Search className="ml-6 text-white/20 group-focus-within:text-brand-orange transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search global partners, regional hubs, or specific port services..."
                className="w-full bg-transparent border-none py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-0 text-sm"
              />
              <button className="bg-white text-black px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all duration-500 shadow-2xl">
                Execute Search
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Categories Explorer */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Sector Explorer</h4>
              <div className="h-px flex-1 mx-6 bg-white/5" />
            </div>
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 10 }}
                className="premium-card flex items-center justify-between p-6 cursor-pointer group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 group-hover:text-brand-orange group-hover:border-brand-orange/30 transition-all duration-500">
                    <cat.icon size={22} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-brand-orange transition-colors">{cat.name}</div>
                    <div className="text-[9px] text-white/20 uppercase font-black tracking-widest mt-1">{cat.count} VERIFIED ENTITIES</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-white/10 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
              </motion.div>
            ))}
          </div>

          {/* Regional Hubs */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Regional Operations</h4>
              <div className="h-px flex-1 mx-6 bg-white/5" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {countries.map((country, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  className="premium-card p-8 text-center cursor-pointer group"
                >
                  <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">{country.flag}</div>
                  <div className="text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">{country.name}</div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 p-10 rounded-[2.5rem] bg-gradient-to-br from-brand-orange/20 via-brand-orange/5 to-transparent border border-brand-orange/20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            >
              <div className="relative z-10">
                <h5 className="text-2xl font-bold text-white mb-3">Scale Your Global Operations</h5>
                <p className="text-sm text-white/40 max-w-md leading-relaxed">
                  Join the world's most elite logistics network. Gain visibility, build trust, and secure global partnerships today.
                </p>
              </div>
              <button className="relative z-10 bg-white text-black px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all duration-500 shadow-2xl shrink-0">
                Register Business
              </button>
              {/* Decorative Pulse */}
              <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-brand-orange/20 rounded-full blur-3xl animate-pulse" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Directory;
