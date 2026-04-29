import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  ChevronDown, 
  CheckCircle2, 
  Building2, 
  ArrowRight,
  Globe,
  Tag,
  Loader2,
  X
} from 'lucide-react';
import { getListings, getPublicUrl } from '../services/db';
import { supabase } from '../services/supabase';

const MarketplaceExplorer = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'Freight Forwarding', 'Warehousing', 'Customs Brokerage', 
    'Last Mile Delivery', 'Supply Chain Management', 'Vessel Agency'
  ];

  const fetchMarketplace = async () => {
    setLoading(true);
    const { data, error } = await getListings();
    if (!error) {
      setListings(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMarketplace();
  }, []);

  const filteredListings = listings.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.companies?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || item.categories?.includes(selectedCategory);
    const matchesVerified = !verifiedOnly || item.companies?.verified;
    
    return matchesSearch && matchesType && matchesCategory && matchesVerified;
  });

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Global <span className="text-brand-orange">Marketplace</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Explore premium freight leads, cargo requests, and logistics opportunities from verified institutional partners.
          </p>
        </div>

        {/* Search & Main Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-orange transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search companies, leads, or services..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/5 rounded-3xl py-5 pl-16 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all text-lg shadow-2xl"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-8 py-5 rounded-3xl border transition-all flex items-center justify-center gap-3 font-bold ${
              showFilters ? 'bg-brand-orange border-brand-orange text-white' : 'bg-slate-900/50 border-white/5 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Filter size={20} />
            Advanced Filters
          </button>
        </div>

        {/* Advanced Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-slate-900/30 border border-white/5 rounded-[2.5rem] p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Opportunity Type</label>
                  <select 
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  >
                    <option value="all">All Types</option>
                    <option value="freight">Freight Leads</option>
                    <option value="cargo">Cargo Requests</option>
                    <option value="opportunity">Business Opps</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Service Category</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Trust Level</label>
                  <button 
                    onClick={() => setVerifiedOnly(!verifiedOnly)}
                    className={`w-full flex items-center justify-between px-6 py-3 rounded-2xl border transition-all ${
                      verifiedOnly ? 'bg-brand-orange/10 border-brand-orange text-white' : 'bg-slate-800/50 border-white/5 text-slate-400'
                    }`}
                  >
                    <span className="text-sm font-bold">Verified Partners</span>
                    <CheckCircle2 size={18} className={verifiedOnly ? 'text-brand-orange' : 'text-slate-600'} />
                  </button>
                </div>

                <div className="flex items-end">
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedType('all');
                      setSelectedCategory('all');
                      setVerifiedOnly(false);
                    }}
                    className="w-full py-3 text-sm font-bold text-slate-500 hover:text-white transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="text-slate-400 text-sm font-medium">
            Showing <span className="text-white font-bold">{filteredListings.length}</span> institutional opportunities
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Sort By:</span>
            <button className="text-xs font-black text-white hover:text-brand-orange transition-colors uppercase tracking-widest">Recent</button>
          </div>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-brand-orange" />
            <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Synchronizing Global Data...</span>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="bg-slate-900/20 border border-dashed border-white/10 rounded-[3rem] py-32 flex flex-col items-center text-center">
            <Search size={48} className="text-slate-700 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">No matching opportunities</h3>
            <p className="text-slate-500">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredListings.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 group hover:border-brand-orange/20 transition-all flex flex-col h-full relative overflow-hidden shadow-xl"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center overflow-hidden group-hover:border-brand-orange/30 transition-colors">
                      {item.companies?.logo_url ? (
                        <img src={item.companies.logo_url} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <Building2 className="text-slate-600" size={28} />
                      )}
                    </div>
                    {item.companies?.verified && (
                      <div className="bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-full border border-brand-orange/20 flex items-center gap-2">
                        <CheckCircle2 size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-black text-brand-orange uppercase tracking-widest bg-brand-orange/5 px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                      <span className="w-1 h-1 bg-slate-700 rounded-full" />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 leading-snug group-hover:text-brand-orange transition-colors">
                      {item.title}
                    </h3>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-4 text-slate-400">
                        <div className="p-2 rounded-lg bg-slate-800/50">
                          <MapPin size={16} />
                        </div>
                        <span className="text-sm font-medium">{item.origin} → {item.destination}</span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-400">
                        <div className="p-2 rounded-lg bg-slate-800/50">
                          <Globe size={16} />
                        </div>
                        <span className="text-sm font-medium truncate">{item.companies?.name || 'Institutional Partner'}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-5 bg-slate-800 hover:bg-brand-orange text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 group/btn relative overflow-hidden">
                    <span className="relative z-10">Send Inquiry</span>
                    <ArrowRight size={18} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-orange to-orange-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceExplorer;
