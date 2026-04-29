import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Award, Zap, Star, Quote } from 'lucide-react';

const partners = [
  'WSAA', 'WAFA', 'FIATA', 'IATA', 'BIMCO', 'FONASBA'
];

const testimonials = [
  {
    quote: "Ruzave has completely transformed how we source freight partners globally. The transparency and speed are unparalleled.",
    author: "David Chen",
    role: "Logistics Director, Global Trade Corp",
    avatar: "https://i.pravatar.cc/150?u=david"
  },
  {
    quote: "The marketplace leads are consistently high-quality. We've expanded our network to 15+ new countries within six months.",
    author: "Elena Rodriguez",
    role: "CEO, Port-Link Solutions",
    avatar: "https://i.pravatar.cc/150?u=elena"
  }
];

const TrustIndicators = () => {
  const standards = [
    { icon: Shield, label: 'VERIFIED BUSINESS', sub: 'Enterprise Security' },
    { icon: Globe, label: 'WSAA MEMBER', sub: 'World Ship Agent Alliance' },
    { icon: Award, label: 'WAFA ALLIANCE', sub: 'World Air Freight Alliance' },
    { icon: Zap, label: '150+ COUNTRIES', sub: 'Global Connectivity' },
  ];

  return (
    <section className="bg-brand-dark overflow-hidden relative">
      {/* Standards Bar */}
      <div className="py-16 border-y border-white/5 bg-brand-dark/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-1000">
            {standards.map((std, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 group cursor-default"
              >
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-all duration-500">
                  <std.icon size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{std.label}</div>
                  <div className="text-[9px] uppercase text-white/30 tracking-widest mt-1">{std.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Partner Logo Strip */}
      <div className="py-24 bg-black/40 relative">
        <div className="container mx-auto px-4 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em] mb-12"
          >
            Strategic Institutional Alliances
          </motion.div>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-20 grayscale contrast-150 hover:opacity-50 transition-all duration-1000">
            {partners.map((partner, i) => (
              <div key={i} className="text-3xl md:text-5xl font-black italic tracking-tighter text-white select-none">{partner}</div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="premium-card p-12 group relative overflow-hidden"
              >
                <Quote size={60} className="absolute -top-4 -right-4 text-brand-orange/5 group-hover:text-brand-orange/10 transition-colors duration-700" />
                <div className="flex items-center gap-1 mb-10">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-brand-orange text-brand-orange" />)}
                </div>
                <p className="text-white/40 text-xl italic mb-12 leading-relaxed font-light">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                  <div className="relative">
                    <img src={t.avatar} alt={t.author} className="w-14 h-14 rounded-full border border-white/10 ring-4 ring-brand-orange/5" />
                    <div className="absolute -bottom-1 -right-1 bg-brand-orange rounded-full p-1 border-2 border-brand-dark">
                      <Shield size={10} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">{t.author}</div>
                    <div className="text-[10px] text-white/20 uppercase font-black tracking-[0.2em] mt-1">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
