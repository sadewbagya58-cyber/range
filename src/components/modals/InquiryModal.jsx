import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle2, ShieldCheck, MessageSquare } from 'lucide-react';
import { sendInquiry } from '../../services/db';
import useAuthStore from '../../store/useAuthStore';

const InquiryModal = ({ isOpen, onClose, listing, receiverId }) => {
  const { user } = useAuthStore();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return; // Should be handled by parent (e.g. redirect to login)

    setLoading(true);
    const { error } = await sendInquiry({
      sender_id: user.id,
      receiver_id: receiverId || listing?.user_id,
      listing_id: listing?.id || null,
      message: message,
      status: 'pending',
      metadata: {
        listing_title: listing?.title || 'General Inquiry',
        sender_name: user.user_metadata?.full_name,
        sender_company: user.user_metadata?.company_name
      }
    });

    if (!error) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setMessage('');
      }, 2500);
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {success ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-400/20">
                  <CheckCircle2 size={40} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Inquiry Dispatched</h3>
                <p className="text-slate-400">Your professional inquiry has been sent. You will be notified of responses.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-brand-orange/10 rounded-2xl border border-brand-orange/20 text-brand-orange">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Send Inquiry</h3>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">To: {listing?.companies?.name || 'Institutional Partner'}</p>
                    </div>
                  </div>
                  <button type="button" onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {listing && (
                    <div className="p-4 bg-slate-800/50 rounded-2xl border border-white/5">
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Inquiring About:</div>
                      <div className="text-sm font-bold text-white truncate">{listing.title}</div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 ml-1">Your Message</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all resize-none"
                      placeholder="Specify your requirements, timelines, and budget details..."
                    />
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                    <ShieldCheck size={20} className="text-blue-400 shrink-0" />
                    <p className="text-[10px] text-blue-400/80 font-medium leading-relaxed">
                      Your identity and business details are protected under Ruzave's Institutional Security Protocol.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !message.trim()}
                    className="w-full py-5 bg-brand-orange hover:bg-orange-600 text-white rounded-2xl font-bold shadow-xl shadow-brand-orange/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                    Dispatch Inquiry
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InquiryModal;
