import React from 'react';
import { motion } from 'framer-motion';
import { Anchor, Settings, Droplet, Truck, ShieldCheck, ChevronRight } from 'lucide-react';

const services = [
  {
    title: 'Ship Brokering',
    description: 'Expert brokerage for Container ships, Dry Cargo, and Tankers. We connect global maritime demand with precision.',
    icon: Anchor,
    items: ['Container Vessels', 'Dry Cargo', 'Tanker Operations', 'Chartering'],
    color: 'from-orange-500 to-orange-700'
  },
  {
    title: 'Technical Repairs',
    description: 'Specialized maintenance for Engines, PCB systems, Bridge Equipment, and Life Safety gear.',
    icon: Settings,
    items: ['Engine Maintenance', 'PCB & Electronics', 'Bridge Equipment', 'Life Safety Systems'],
    color: 'from-blue-500 to-blue-700'
  },
  {
    title: 'Cleaning & Maintenance',
    description: 'Comprehensive solutions including Tank cleaning, Hydroblasting, and professional Painting services.',
    icon: Droplet,
    items: ['Tank Cleaning', 'Hydroblasting', 'Marine Painting', 'Hull Maintenance'],
    color: 'from-emerald-500 to-emerald-700'
  },
  {
    title: 'Specialized Logistics',
    description: 'End-to-end support with Custom clearing and Marine legal consultancy for smooth operations.',
    icon: Truck,
    items: ['Custom Clearing', 'Marine Legal Support', 'Port Agency', 'Supply Chain Management'],
    color: 'from-purple-500 to-purple-700'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/5 blur-[120px] rounded-full -mr-64 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-widest mb-4"
          >
            Our Core Pillars
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Complete Marine <span className="text-brand-orange text-gradient">Infrastructure</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-lg"
          >
            We provide integrated solutions across four strategic pillars to ensure your maritime operations are seamless, safe, and efficient.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/[0.08] transition-all duration-500"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                <service.icon size={28} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-orange transition-colors">
                {service.title}
              </h3>
              
              <p className="text-white/50 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-3 mb-8">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                    <ShieldCheck size={14} className="text-brand-orange/60" />
                    {item}
                  </li>
                ))}
              </ul>

              <button className="flex items-center gap-2 text-sm font-bold text-brand-orange hover:gap-3 transition-all">
                Learn More
                <ChevronRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
