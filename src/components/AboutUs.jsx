import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users } from 'lucide-react';
const AboutUs = () => {
  const aboutImage = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070"; // Modern logistics warehouse

  return (
    <section id="about" className="section-padding bg-brand-dark overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl group"
            >
              <img 
                src={aboutImage} 
                alt="Global Logistics Operations"
                className="w-full h-[600px] object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
            </motion.div>
            
            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-10 -left-10 bg-brand-orange p-10 rounded-[2rem] shadow-2xl z-20 hidden md:block"
            >
              <div className="text-5xl font-black text-white mb-2">15+</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80 leading-tight">Years of Institutional<br />Excellence</div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-brand-orange font-black uppercase tracking-[0.3em] text-[10px] mb-6"
              >
                Institutional Legacy
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display font-bold text-white mb-8"
              >
                Standardizing the <span className="text-brand-orange">Global</span> Supply Chain
              </motion.h2>
              <p className="text-white/40 text-lg md:text-xl leading-relaxed font-light">
                Ruzave Global is not just a marketplace; it is an institution dedicated to the modernization of global trade. We bridge the gap between regional excellence and international scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  icon: Target, 
                  title: "Precision Mission", 
                  text: "To engineer the world's most reliable digital infrastructure for logistics professionals." 
                },
                { 
                  icon: Eye, 
                  title: "Global Vision", 
                  text: "To become the singular standard for B2B maritime and freight connections." 
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="premium-card p-8 group hover:border-brand-orange/30 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-6 group-hover:scale-110 transition-transform">
                    <item.icon size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-4">{item.title}</h4>
                  <p className="text-sm text-white/40 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-6 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-brand-dark overflow-hidden ring-4 ring-brand-orange/10">
                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Partner" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="text-xs font-black text-white uppercase tracking-[0.2em] mb-1">Join 5,000+ Enterprise Partners</div>
                <div className="text-[10px] text-white/20 uppercase font-black tracking-widest">Global Maritime & Freight Alliances</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
