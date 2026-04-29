import React from 'react';
import { motion } from 'framer-motion';
import { Tag, MapPin, Package, Clock, ArrowRight, TrendingUp } from 'lucide-react';

const leads = [
  {
    id: 'L-8942',
    type: 'FREIGHT REQUEST',
    title: 'Container Transport (40ft High Cube)',
    origin: 'Shanghai, China',
    destination: 'Hamburg, Germany',
    commodity: 'Industrial Electronics',
    date: '2 mins ago',
    status: 'URGENT',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },
  {
    id: 'L-8941',
    type: 'BUYING LEAD',
    title: 'Looking for Clearing Agent in Mundra',
    origin: 'Mundra Port, India',
    destination: 'Domestic Delivery',
    commodity: 'Textile Machinery',
    date: '5 mins ago',
    status: 'ACTIVE',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    id: 'L-8940',
    type: 'CARGO OFFER',
    title: 'LCL Space Available - Dubai to New York',
    origin: 'Jebel Ali, UAE',
    destination: 'New York, USA',
    commodity: 'General Cargo',
    date: '12 mins ago',
    status: 'ACTIVE',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  },
  {
    id: 'L-8939',
    type: 'SELL LEAD',
    title: 'Refurbished 20ft Containers for Sale',
    origin: 'Singapore Port',
    destination: 'Global Shipping',
    commodity: 'Storage Containers',
    date: '18 mins ago',
    status: 'ACTIVE',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  }
];

const Marketplace = () => {
  return (
    <section id="marketplace" className="section-padding bg-brand-dark relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-brand-orange font-bold uppercase tracking-[0.3em] text-[10px] mb-6"
            >
              <TrendingUp size={14} />
              Real-Time Global Marketplace
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-white mb-8"
            >
              Strategic <span className="text-brand-orange">Market</span> Opportunities
            </motion.h2>
            <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-2xl">
              Access an exclusive flow of verified cargo leads and freight opportunities. Orchestrated for transparency and global scale.
            </p>
          </div>
          <motion.button
            whileHover={{ x: 5 }}
            className="group flex items-center gap-3 text-white font-bold uppercase tracking-[0.2em] text-[10px] border-b border-white/10 pb-3 hover:text-brand-orange hover:border-brand-orange transition-all"
          >
            Explore All Leads
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leads.map((lead, index) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="premium-card p-8 group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 border border-current ${lead.bg} ${lead.color}`}>
                    <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
                    {lead.type}
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight mb-2">
                    {lead.title}
                  </h3>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 text-white/20 text-[9px] uppercase font-black tracking-[0.2em]">
                    <Clock size={12} />
                    {lead.date}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="space-y-2">
                  <div className="text-[9px] text-white/20 uppercase font-black tracking-[0.2em]">Route Origin</div>
                  <div className="flex items-center gap-2 text-white font-medium">
                    <MapPin size={14} className="text-brand-orange" />
                    {lead.origin}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-[9px] text-white/20 uppercase font-black tracking-[0.2em]">Target Destination</div>
                  <div className="flex items-center gap-2 text-white font-medium">
                    <MapPin size={14} className="text-brand-orange" />
                    {lead.destination}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-8 border-t border-white/5">
                <div className="flex items-center gap-3 text-xs text-white/40 font-bold uppercase tracking-widest">
                  <Package size={16} className="text-brand-orange/60" />
                  {lead.commodity}
                </div>
                <button className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-brand-orange transition-colors">
                  Submit Proposal
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marketplace;
