import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Award, Zap } from 'lucide-react';

const TrustIndicators = () => {
  const standards = [
    { icon: Shield, label: 'VERIFIED BUSINESS', sub: 'Enterprise Security' },
    { icon: Globe, label: 'WSAA MEMBER', sub: 'World Ship Agent Alliance' },
    { icon: Award, label: 'WAFA ALLIANCE', sub: 'World Air Freight Alliance' },
    { icon: Zap, label: '150+ COUNTRIES', sub: 'Global Connectivity' },
  ];

  return (
    <div className="py-12 border-y border-white/5 bg-brand-dark/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {standards.map((std, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <std.icon size={24} className="text-white" />
              <div>
                <div className="text-sm font-bold text-white tracking-wider">{std.label}</div>
                <div className="text-[10px] uppercase text-white/50 tracking-tighter">{std.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;
