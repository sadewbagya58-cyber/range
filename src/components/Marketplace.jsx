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
    <section id="marketplace" className="py-24 bg-brand-dark/50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-brand-orange font-bold uppercase tracking-widest text-xs mb-4"
            >
              <TrendingUp size={16} />
              Live Marketplace
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Global <span className="text-brand-orange">Marketplace</span> Leads
            </motion.h2>
            <p className="text-white/50 text-lg">
              Real-time freight requests, buying leads, and cargo offers from our verified global network. Connect with partners instantly.
            </p>
          </div>
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-brand-orange font-bold uppercase tracking-widest text-sm border-b-2 border-brand-orange pb-2"
          >
            View All Leads
            <ArrowRight size={18} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leads.map((lead, index) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/[0.08] transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 ${lead.bg} ${lead.color}`}>
                    {lead.type}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-orange transition-colors">
                    {lead.title}
                  </h3>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-white/30 text-[10px] uppercase font-bold tracking-widest">
                    <Clock size={12} />
                    {lead.date}
                  </div>
                  {lead.status === 'URGENT' && (
                    <div className="flex items-center gap-1 mt-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                      <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Urgent</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Origin</div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <MapPin size={14} className="text-brand-orange/60" />
                    {lead.origin}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Destination</div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <MapPin size={14} className="text-brand-orange/60" />
                    {lead.destination}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Package size={16} className="text-brand-orange/60" />
                  {lead.commodity}
                </div>
                <button className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                  Contact Lead
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
