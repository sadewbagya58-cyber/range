import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Globe, 
  CheckCircle2, 
  Building2, 
  ArrowRight,
  Loader2,
  Tag,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCompanies } from '../services/db';

const CompanyDirectory = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const categories = [
    'Freight Forwarding', 'Warehousing', 'Customs Brokerage', 
    'Last Mile Delivery', 'Supply Chain Management', 'Vessel Agency'
  ];

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, error } = await getCompanies();
      if (!error) setCompanies(data);
      setLoading(false);
    };
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         company.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || company.country === selectedCountry;
    const matchesCategory = selectedCategory === 'all' || company.categories?.includes(selectedCategory);
    const matchesVerified = !verifiedOnly || company.verified;
    
    return matchesSearch && matchesCountry && matchesCategory && matchesVerified;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange mb-6">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Institutional Network</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Institutional <span className="text-brand-orange">Directory</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Connect with verified logistics providers, freight forwarders, and supply chain institutions globally.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-6 mb-12 flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search companies by name or services..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-800/50 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
            >
              <option value="all">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <button 
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`px-8 py-4 rounded-2xl border font-bold text-sm transition-all flex items-center gap-2 ${
                verifiedOnly ? 'bg-brand-orange border-brand-orange text-white shadow-lg shadow-brand-orange/20' : 'bg-slate-800/50 border-white/5 text-slate-400 hover:border-white/20'
              }`}
            >
              <CheckCircle2 size={16} />
              Verified Only
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 px-4">
          <div className="text-slate-500 text-sm font-medium">
            Found <span className="text-white font-bold">{filteredCompanies.length}</span> institutions
          </div>
        </div>

        {/* Directory Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-brand-orange" />
            <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Accessing Global Database...</span>
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="bg-slate-900/20 border border-dashed border-white/10 rounded-[3rem] py-32 flex flex-col items-center text-center">
            <Building2 size={48} className="text-slate-700 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">No institutions found</h3>
            <p className="text-slate-500">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 group hover:border-brand-orange/20 transition-all flex flex-col shadow-xl"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-slate-800 border border-white/5 flex items-center justify-center overflow-hidden transition-all group-hover:scale-105">
                    {company.logo_url ? (
                      <img src={company.logo_url} alt={company.name} className="w-full h-full object-cover" />
                    ) : (
                      <Building2 className="text-slate-600" size={32} />
                    )}
                  </div>
                  {company.verified && (
                    <div className="bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-full border border-brand-orange/20 flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-orange transition-colors">
                    {company.name}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                    <MapPin size={14} />
                    <span>{company.country}, {company.city}</span>
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-3 mb-8 leading-relaxed">
                    {company.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {company.categories?.slice(0, 3).map(cat => (
                      <span key={cat} className="text-[9px] font-black uppercase tracking-widest bg-slate-800 text-slate-400 px-3 py-1 rounded-lg">
                        {cat}
                      </span>
                    ))}
                    {company.categories?.length > 3 && (
                      <span className="text-[9px] font-black uppercase tracking-widest bg-slate-800 text-slate-400 px-3 py-1 rounded-lg">
                        +{company.categories.length - 3} More
                      </span>
                    )}
                  </div>
                </div>

                <Link 
                  to={`/directory/${company.id}`}
                  className="w-full py-5 bg-slate-800/50 hover:bg-brand-orange text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                >
                  <span className="relative z-10">Institutional Profile</span>
                  <ArrowRight size={18} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-orange to-orange-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDirectory;
