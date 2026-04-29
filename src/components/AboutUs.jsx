import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users } from 'lucide-react';
const AboutUs = () => {
  const aboutImage = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070"; // Modern logistics warehouse

  return (
    <section id="about" className="py-24 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-3xl overflow-hidden border border-white/10"
            >
              <img 
                src={aboutImage} 
                alt="Global Logistics Network"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
            </motion.div>
            
            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 -right-8 bg-brand-orange p-8 rounded-2xl shadow-2xl z-20 hidden md:block"
            >
              <div className="text-4xl font-bold text-white mb-1">GLOBAL</div>
              <div className="text-sm font-semibold text-white/80 uppercase tracking-widest leading-tight">B2B Network <br />Marketplace</div>
            </motion.div>
          </div>

          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Standardizing Global <span className="text-brand-orange">Shipping</span> Connections</h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Ruzave is the world's most comprehensive B2B marketplace dedicated to the shipping and logistics industry. We provide a transparent, efficient ecosystem where shippers, carriers, and specialized service providers connect to streamline the global supply chain.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                    <Target size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white">Our Mission</h4>
                  <p className="text-white/50 text-sm">To empower logistics businesses worldwide by providing digital tools for networking, partnership discovery, and operational efficiency.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                    <Eye size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white">Our Vision</h4>
                  <p className="text-white/50 text-sm">To become the singular global directory that bridges the gap between local expertise and international demand in maritime trade.</p>
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-dark bg-brand-navy flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Member" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-bold text-white uppercase tracking-wider">Join 5,000+ Enterprise Members</div>
                  <div className="text-xs text-white/40">Verified shipping agents, clearing houses, and freight forwarders.</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
