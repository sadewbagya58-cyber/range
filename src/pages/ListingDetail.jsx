import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Weight, 
  DollarSign, 
  Building2, 
  Globe, 
  Mail, 
  Phone, 
  CheckCircle2, 
  MessageSquare, 
  Bookmark, 
  Share2, 
  AlertTriangle,
  Loader2,
  Truck,
  Box,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../services/supabase';
import { saveListing } from '../services/db';
import useAuthStore from '../store/useAuthStore';
import InquiryModal from '../components/modals/InquiryModal';

const ListingDetail = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*, companies(*)')
        .eq('id', id)
        .single();
      
      if (!error) setListing(data);
      setLoading(false);
    };
    fetchDetail();
  }, [id]);

  const handleSave = async () => {
    if (!user) return navigate('/login');
    setSaving(true);
    await saveListing(user.id, id);
    setSaving(false);
  };

  const openInquiry = () => {
    if (!user) return navigate('/login');
    setIsInquiryOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-slate-950">
        <Loader2 className="w-10 h-10 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-slate-950 text-white">
        <h1 className="text-2xl font-bold mb-4">Listing not found</h1>
        <Link to="/marketplace" className="text-brand-orange font-bold underline">Back to Marketplace</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Link to="/marketplace" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Marketplace</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-black text-brand-orange uppercase tracking-widest bg-brand-orange/5 px-3 py-1 rounded-full border border-brand-orange/20">
                  {listing.type}
                </span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-full">
                  ID: #{listing.id.slice(0, 8)}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight leading-tight">
                {listing.title}
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-white/5">
                  <MapPin className="text-brand-orange mb-2" size={20} />
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Origin</div>
                  <div className="text-sm font-bold text-white">{listing.origin}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-white/5">
                  <MapPin className="text-brand-orange mb-2" size={20} />
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Destination</div>
                  <div className="text-sm font-bold text-white">{listing.destination}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-white/5">
                  <Calendar className="text-brand-orange mb-2" size={20} />
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Proposed Date</div>
                  <div className="text-sm font-bold text-white">{new Date(listing.date).toLocaleDateString()}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-white/5">
                  {listing.type === 'opportunity' ? <DollarSign className="text-brand-orange mb-2" size={20} /> : <Weight className="text-brand-orange mb-2" size={20} />}
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                    {listing.type === 'opportunity' ? 'Valuation' : 'Weight'}
                  </div>
                  <div className="text-sm font-bold text-white">{listing.budget || listing.weight || 'N/A'}</div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Box size={20} className="text-brand-orange" />
                  Technical Specifications
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg whitespace-pre-wrap">
                  {listing.description}
                </p>
              </div>
            </div>

            {/* Quick Actions Mobile */}
            <div className="lg:hidden flex gap-4">
              <button onClick={openInquiry} className="flex-1 py-5 bg-brand-orange text-white rounded-2xl font-bold">
                Send Inquiry
              </button>
              <button onClick={handleSave} className="p-5 bg-slate-800 text-white rounded-2xl border border-white/5">
                <Bookmark size={20} />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Company Card */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center overflow-hidden">
                  {listing.companies?.logo_url ? (
                    <img src={listing.companies.logo_url} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Building2 className="text-slate-600" size={32} />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight mb-1">{listing.companies?.name || 'Partner'}</h3>
                  {listing.companies?.verified && (
                    <div className="flex items-center gap-2 text-brand-orange">
                      <CheckCircle2 size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Verified Institution</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <Globe size={16} className="text-slate-600" />
                  <span>{listing.companies?.country}, {listing.companies?.city}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <Mail size={16} className="text-slate-600" />
                  <span>{listing.companies?.email || 'Confidential'}</span>
                </div>
              </div>

              <Link 
                to={`/directory/${listing.companies?.id}`}
                className="w-full py-4 bg-slate-800/50 hover:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-widest border border-white/5 transition-all flex items-center justify-center gap-2"
              >
                View Directory Profile
                <ChevronRight size={14} />
              </Link>
            </div>

            {/* Inquiry Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 rounded-[2.5rem] p-8 sticky top-28">
              <h3 className="text-xl font-bold text-white mb-6">Contact Institutional Partner</h3>
              <div className="space-y-4">
                <button 
                  onClick={openInquiry}
                  disabled={saving}
                  className="w-full py-5 bg-brand-orange hover:bg-orange-600 text-white rounded-2xl font-bold shadow-xl shadow-brand-orange/20 transition-all flex items-center justify-center gap-3"
                >
                  <MessageSquare size={20} />
                  Send Formal Inquiry
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white rounded-2xl font-bold text-xs uppercase tracking-widest border border-white/5 transition-all flex items-center justify-center gap-2"
                >
                  <Bookmark size={18} />
                  Save for Review
                </button>
                <div className="pt-4 border-t border-white/5 flex justify-center gap-6">
                  <button className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <Share2 size={14} /> Share
                  </button>
                  <button className="text-slate-500 hover:text-red-400 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <AlertTriangle size={14} /> Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        listing={listing}
      />
    </div>
  );
};


export default ListingDetail;
