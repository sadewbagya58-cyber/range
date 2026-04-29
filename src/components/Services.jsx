import React from 'react';
import { motion } from 'framer-motion';
import { Anchor, Settings, Droplet, Truck, ShieldCheck, ChevronRight } from 'lucide-react';

const services = [
  {
    title: 'Freight Forwarding',
    description: 'Dynamic orchestration of global trade. We connect you with top-tier carriers for seamless air, ocean, and project cargo solutions.',
    icon: Anchor,
    items: ['Air Freight Forwarding', 'Ocean Logistics (LCL/FCL)', 'Project & Heavy Lift', 'Dangerous Goods (DG)'],
    color: 'from-orange-500 to-orange-700'
  },
  {
    title: 'Maritime Agency',
    description: 'Comprehensive port and vessel management services. From ship brokerage to technical repairs and chandling.',
    icon: Settings,
    items: ['Port Agency Services', 'Ship Management', 'Technical Ship Repairs', 'Marine Insurance'],
    color: 'from-blue-500 to-blue-700'
  },
  {
    title: 'Smart Warehousing',
    description: 'Scalable storage solutions designed for modern supply chains. Temperature-controlled and bonded facilities worldwide.',
    icon: Droplet,
    items: ['Bonded Warehousing', 'Cold & Reefer Storage', 'Container Depots', 'Inventory Management'],
    color: 'from-emerald-500 to-emerald-700'
  },
  {
    title: 'Inland & Intermodal',
    description: 'Integrated land and rail logistics ensuring last-mile precision and cost-effective regional distribution.',
    icon: Truck,
    items: ['Land & Rail Logistics', 'FTL/LTL Trucking', 'Customs Clearance', 'Last-Mile Delivery'],
    color: 'from-purple-500 to-purple-700'
  }
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-brand-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/5 blur-[150px] rounded-full -mr-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-brand-navy/5 blur-[120px] rounded-full -ml-32 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/5 text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Settings size={14} className="text-brand-orange" />
            Operational Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-white mb-10"
          >
            Integrated <span className="text-brand-orange">Logistics</span> Infrastructure
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/40 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light"
          >
            Unifying fragmented logistics sectors into a singular, high-performance ecosystem. Built for transparency, speed, and global scale.
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
              className="premium-card p-10 group"
            >
              <div className="w-16 h-16 rounded-[1.25rem] bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange mb-8 group-hover:bg-brand-orange group-hover:text-white transition-all duration-500 shadow-2xl shadow-brand-orange/5">
                <service.icon size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6 leading-tight group-hover:text-brand-orange transition-colors">
                {service.title}
              </h3>
              
              <p className="text-white/40 text-sm mb-8 leading-relaxed font-light">
                {service.description}
              </p>

              <ul className="space-y-4 mb-10">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                    <div className="w-1 h-1 rounded-full bg-brand-orange" />
                    {item}
                  </li>
                ))}
              </ul>

              <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-brand-orange transition-all group-hover:translate-x-2">
                Operational Details
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
