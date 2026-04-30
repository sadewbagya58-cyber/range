import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Clock, 
  User, 
  Building2, 
  ChevronRight, 
  MoreVertical,
  MailOpen,
  Mail as MailIcon,
  CheckCircle2,
  Loader2,
  Inbox as InboxIcon,
  ArrowUpRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { getInquiries, updateInquiryStatus } from '../../services/db';
import useAuthStore from '../../store/useAuthStore';

const Inbox = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('received');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchInquiries = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await getInquiries(user.id, filter);
    if (!error) setInquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, [user, filter]);

  const handleStatusChange = async (id, newStatus) => {
    const { error } = await updateInquiryStatus(id, newStatus);
    if (!error) {
      setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
    }
  };

  const filteredInquiries = inquiries.filter(inq => 
    statusFilter === 'all' || inq.status === statusFilter
  );

  return (
    <DashboardLayout>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Business <span className="text-brand-orange">Inbox</span>
            </h1>
            <p className="text-slate-400">Manage institutional leads and marketplace inquiries.</p>
          </div>
          <div className="flex p-1 bg-slate-900/40 border border-white/5 rounded-2xl">
            <button
              onClick={() => setFilter('received')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                filter === 'received' ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' : 'text-slate-500 hover:text-white'
              }`}
            >
              Received Leads
            </button>
            <button
              onClick={() => setFilter('sent')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                filter === 'sent' ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' : 'text-slate-500 hover:text-white'
              }`}
            >
              Sent Inquiries
            </button>
          </div>
        </div>

        {/* Filters & Status */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search leads by company or listing..." 
              className="w-full bg-slate-900/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'replied', 'closed'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                  statusFilter === s 
                    ? 'border-brand-orange text-brand-orange bg-brand-orange/5' 
                    : 'border-white/5 text-slate-500 hover:border-white/20'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Inbox Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-brand-orange opacity-20" />
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Loading Leads...</span>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="bg-slate-900/20 border border-dashed border-white/10 rounded-[3rem] py-24 flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 rounded-[2rem] bg-slate-800/50 flex items-center justify-center mb-6 text-slate-600">
              <InboxIcon size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No messages yet</h3>
            <p className="text-slate-500 max-w-sm">
              When institutional partners contact you about listings, they will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredInquiries.map((inq, index) => (
                <motion.div
                  key={inq.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(`/dashboard/chat/${inq.id}`)}
                  className={`bg-slate-900/40 backdrop-blur-xl border p-6 rounded-[2rem] group hover:border-brand-orange/20 transition-all flex flex-col md:flex-row items-start md:items-center gap-8 cursor-pointer relative overflow-hidden ${
                    inq.status === 'pending' ? 'border-brand-orange/10' : 'border-white/5'
                  }`}
                >
                  {inq.status === 'pending' && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange" />
                  )}
                  
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-brand-orange transition-colors">
                    <Building2 size={24} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-white truncate">
                        {filter === 'received' ? inq.metadata?.sender_name : inq.receiver?.full_name}
                      </h3>
                      {inq.status === 'pending' && (
                        <span className="px-2 py-0.5 rounded-full bg-brand-orange/20 text-brand-orange text-[8px] font-black uppercase tracking-widest">New Lead</span>
                      )}
                    </div>
                    <div className="text-xs text-brand-orange font-bold uppercase tracking-widest mb-3">
                      {inq.metadata?.sender_company || 'Institutional Partner'}
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-1 italic">
                      "{inq.message}"
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                      <Clock size={12} />
                      {new Date(inq.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 rounded-full bg-slate-800 border border-white/5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        {inq.metadata?.listing_title || 'General'}
                      </div>
                      <ChevronRight size={16} className="text-slate-700 group-hover:text-brand-orange transition-colors" />
                    </div>
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

export default Inbox;
