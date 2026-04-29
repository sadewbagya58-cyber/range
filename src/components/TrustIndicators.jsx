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
    <section className="bg-brand-dark overflow-hidden">
      {/* Standards Bar */}
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

      {/* Partner Logo Carousel - CSS Animation */}
      <div className="py-16 bg-black/20">
        <div className="container mx-auto px-4 mb-12 text-center">
          <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mb-4">Strategic Global Partners</div>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale contrast-125">
            {partners.map((partner, i) => (
              <div key={i} className="text-2xl md:text-3xl font-black italic tracking-tighter text-white">{partner}</div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/5 relative"
              >
                <Quote size={40} className="absolute top-6 right-8 text-brand-orange/10" />
                <div className="flex items-center gap-1 mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-brand-orange text-brand-orange" />)}
                </div>
                <p className="text-white/70 text-lg italic mb-8 leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full border border-white/10" />
                  <div>
                    <div className="text-white font-bold">{t.author}</div>
                    <div className="text-white/40 text-xs uppercase tracking-widest">{t.role}</div>
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
