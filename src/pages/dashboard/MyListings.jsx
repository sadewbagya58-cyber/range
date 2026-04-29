import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Loader2,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Box,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { getListings, deleteListing } from '../../services/db';
import useAuthStore from '../../store/useAuthStore';

const MyListings = () => {
  const { user } = useAuthStore();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchListings = async () => {
    if (!user) return;
    setLoading(true);
    // In a real app, we'd filter by user_id in the query
    const { data, error } = await getListings();
    if (!error) {
      // Filter manually for demonstration if needed, but the service should ideally handle it
      setListings(data.filter(l => l.user_id === user.id));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      const { error } = await deleteListing(id);
      if (!error) {
        setListings(listings.filter(l => l.id !== id));
      }
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'freight': return <Truck size={18} />;
      case 'cargo': return <Box size={18} />;
      case 'opportunity': return <DollarSign size={18} />;
      default: return <AlertCircle size={18} />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/20">
            <CheckCircle2 size={12} /> Active
          </span>
        );
      case 'closed':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-500 text-[10px] font-bold uppercase tracking-wider border border-white/5">
            <XCircle size={12} /> Closed
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-amber-400/20">
            <Clock size={12} /> Pending
          </span>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              My <span className="text-brand-orange">Listings</span>
            </h1>
            <p className="text-slate-400">Manage your active freight leads and cargo requests.</p>
          </div>
          <Link 
            to="/dashboard/listings/new"
            className="group bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 rounded-2xl shadow-xl shadow-brand-orange/20 transition-all font-bold flex items-center gap-3"
          >
            <Plus size={20} />
            Post New Listing
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search my listings..." 
              className="w-full bg-slate-900/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
            />
          </div>
          <div className="flex gap-2 p-1 bg-slate-900/40 border border-white/5 rounded-2xl">
            {['all', 'active', 'closed'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                  filter === s ? 'bg-brand-orange text-white' : 'text-slate-500 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Content */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-brand-orange opacity-20" />
          </div>
        ) : listings.length === 0 ? (
          <div className="bg-slate-900/20 border border-dashed border-white/10 rounded-[3rem] py-24 flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 rounded-[2rem] bg-slate-800/50 flex items-center justify-center mb-6 text-slate-600">
              <FileText size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Listings Found</h3>
            <p className="text-slate-500 max-w-sm mb-8">
              You haven't posted any freight leads or cargo requests yet. Start by creating your first listing.
            </p>
            <Link 
              to="/dashboard/listings/new"
              className="text-brand-orange font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              Post First Listing <Plus size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {listings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 md:p-8 rounded-[2rem] group hover:border-brand-orange/20 transition-all flex flex-col md:flex-row items-start md:items-center gap-8"
                >
                  <div className={`w-16 h-16 shrink-0 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-brand-orange transition-colors`}>
                    {getTypeIcon(listing.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-bold text-white truncate">{listing.title}</h3>
                      {getStatusBadge(listing.status)}
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 font-medium">
                      <span className="flex items-center gap-2 capitalize">
                        <Filter size={14} className="text-slate-700" /> {listing.type}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock size={14} className="text-slate-700" /> 
                        {new Date(listing.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                    <Link
                      to={`/dashboard/listings/edit/${listing.id}`}
                      className="flex-1 md:flex-none p-3 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Edit2 size={16} />
                      <span className="md:hidden font-bold text-xs uppercase tracking-widest">Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(listing.id)}
                      className="flex-1 md:flex-none p-3 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} />
                      <span className="md:hidden font-bold text-xs uppercase tracking-widest">Delete</span>
                    </button>
                    <div className="hidden md:block w-px h-8 bg-white/5 mx-2" />
                    <button className="flex-1 md:flex-none p-3 rounded-xl bg-brand-orange/10 text-brand-orange hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const FileText = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

export default MyListings;
