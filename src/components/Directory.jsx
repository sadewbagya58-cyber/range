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
    <section id="directory" className="py-24 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <Globe size={14} />
            Global Network Explorer
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Find Partners by <span className="text-brand-orange">Category</span> & Country
          </motion.h2>
          <div className="max-w-2xl mx-auto relative group">
            <input 
              type="text" 
              placeholder="Search companies, services, or ports..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-12 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand-orange transition-colors" size={20} />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-orange text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-orange/90 transition-all">
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6">Top Categories</h4>
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 10 }}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-brand-orange/30 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                    <cat.icon size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{cat.name}</div>
                    <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">{cat.count} Companies</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-white/20" />
              </motion.div>
            ))}
          </div>

          {/* Countries Grid */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6">Global Presence</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {countries.map((country, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 border border-white/5 p-6 rounded-2xl text-center hover:bg-brand-orange/10 transition-all cursor-pointer group"
                >
                  <div className="text-3xl mb-3 group-hover:scale-125 transition-transform">{country.flag}</div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">{country.name}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-brand-orange/20 to-transparent border border-brand-orange/20 flex items-center justify-between">
              <div>
                <h5 className="text-lg font-bold text-white mb-1">Expand Your Global Reach</h5>
                <p className="text-xs text-white/50">Register your business today to appear in our directory.</p>
              </div>
              <button className="bg-white text-brand-dark px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all">
                List Company
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Directory;
