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
            Global Marketplace
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Integrated <span className="text-brand-orange text-gradient">Logistics</span> Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-lg"
          >
            Access a comprehensive ecosystem of verified service providers, standardizing the global supply chain through transparency and efficiency.
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
