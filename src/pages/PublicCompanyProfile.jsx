import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  CheckCircle2, 
  ArrowLeft, 
  Loader2, 
  Truck, 
  Box, 
  DollarSign,
  ChevronRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { supabase } from '../services/supabase';

const PublicCompanyProfile = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*, listings(*)')
        .eq('id', id)
        .single();
      
      if (!error) setCompany(data);
      setLoading(false);
    };
    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-slate-950">
        <Loader2 className="w-10 h-10 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-slate-950 text-white">
        <h1 className="text-2xl font-bold mb-4">Institution not found</h1>
        <Link to="/directory" className="text-brand-orange font-bold underline">Back to Directory</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Link to="/directory" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Directory</span>
        </Link>

        {/* Hero Section */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 md:p-16 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-12">
            <div className="w-32 h-32 rounded-[2rem] bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
              {company.logo_url ? (
                <img src={company.logo_url} alt={company.name} className="w-full h-full object-cover" />
              ) : (
                <Building2 className="text-slate-600" size={48} />
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{company.name}</h1>
                {company.verified && (
                  <div className="bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-full border border-brand-orange/20 flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Verified Institution</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-6 text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-brand-orange" />
                  <span>{company.country}, {company.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={18} className="text-brand-orange" />
                  <span>{company.website || 'ruzave.com/partner'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-brand-orange" />
                  <span>Enterprise Member</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full md:w-auto">
              <button className="w-full md:w-auto px-8 py-4 bg-brand-orange text-white rounded-2xl font-bold shadow-xl shadow-brand-orange/20 transition-all">
                Send Formal Message
              </button>
              <button className="w-full md:w-auto px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold border border-white/5">
                Download Profile (PDF)
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Details & Portfolio */}
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <ShieldCheck size={24} className="text-brand-orange" />
                Institutional Background
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed whitespace-pre-wrap">
                {company.description}
              </p>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Active Portfolio</h2>
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{company.listings?.length || 0} Live Listings</span>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {company.listings?.map((listing) => (
                  <Link 
                    key={listing.id}
                    to={`/marketplace/${listing.id}`}
                    className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl group hover:border-brand-orange/20 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-brand-orange transition-colors">
                        {listing.type === 'freight' ? <Truck size={20} /> : listing.type === 'cargo' ? <Box size={20} /> : <DollarSign size={20} />}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-brand-orange transition-colors mb-1">{listing.title}</h4>
                        <div className="flex items-center gap-4 text-xs text-slate-500 font-bold uppercase tracking-widest">
                          <span>{listing.origin} → {listing.destination}</span>
                          <span className="w-1 h-1 bg-slate-700 rounded-full" />
                          <span>{listing.type}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="text-slate-700 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Institutional Stats & Contact */}
          <div className="space-y-8">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8">
              <h3 className="text-xl font-bold text-white mb-6">Service Capability</h3>
              <div className="flex flex-wrap gap-2">
                {company.categories?.map(cat => (
                  <span key={cat} className="px-4 py-2 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl border border-white/5 uppercase tracking-widest">
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8">
              <h3 className="text-xl font-bold text-white mb-6">Verification Details</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Identity Verified</div>
                    <div className="text-sm font-bold text-white">Institutional KYC Complete</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center text-emerald-400">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Business License</div>
                    <div className="text-sm font-bold text-white">Authenticated Partner</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicCompanyProfile;
