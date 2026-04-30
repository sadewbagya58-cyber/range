import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  ArrowLeft, 
  Building2, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck,
  MoreVertical,
  Paperclip,
  Clock
} from 'lucide-react';
import { supabase } from '../../services/supabase';
import { getMessages, sendMessage, updateInquiryStatus } from '../../services/db';
import useAuthStore from '../../store/useAuthStore';
import DashboardLayout from '../../layouts/DashboardLayout';

const Chat = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchThread = async () => {
      // Fetch Inquiry Details
      const { data: inqData } = await supabase
        .from('inquiries')
        .select('*, sender:profiles!sender_id(*), receiver:profiles!receiver_id(*), listing:listings(*)')
        .eq('id', id)
        .single();
      
      setInquiry(inqData);
      
      // Fetch initial messages
      const { data: msgData } = await getMessages(id);
      setMessages(msgData || []);
      setLoading(false);

      // If pending and I am the receiver, mark as replied (or viewed)
      if (inqData.status === 'pending' && user.id === inqData.receiver_id) {
        updateInquiryStatus(id, 'replied');
      }
    };

    fetchThread();

    // Subscribe to new messages
    const channel = supabase
      .channel(`inquiry_messages_${id}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `inquiry_id=eq.${id}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    const msgData = {
      inquiry_id: id,
      sender_id: user.id,
      content: newMessage.trim(),
      created_at: new Date().toISOString()
    };

    const { error } = await sendMessage(msgData);
    if (!error) {
      setNewMessage('');
    }
    setSending(false);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-brand-orange" />
        </div>
      </DashboardLayout>
    );
  }

  const partner = user.id === inquiry?.sender_id ? inquiry?.receiver : inquiry?.sender;

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-12rem)] bg-slate-900/40 border border-white/5 rounded-[3rem] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-slate-900/40 backdrop-blur-xl flex items-center justify-between z-10">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/dashboard/inbox')}
              className="p-3 rounded-2xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-slate-500">
                <Building2 size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold leading-none mb-1">{partner?.full_name || 'Institutional Partner'}</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Thread</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-white/5">
              <ShieldCheck size={14} className="text-brand-orange" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure Institutional Channel</span>
            </div>
            <button className="p-3 text-slate-500 hover:text-white">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth"
        >
          {/* Inquiry Context Card */}
          <div className="max-w-md mx-auto mb-12">
            <div className="bg-slate-800/30 border border-white/5 p-6 rounded-3xl text-center">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Original Inquiry</div>
              <h4 className="text-white font-bold mb-2">{inquiry?.metadata?.listing_title || 'General Marketplace Lead'}</h4>
              <p className="text-slate-500 text-xs italic mb-4">"{inquiry?.message}"</p>
              <div className="text-[9px] font-bold text-brand-orange bg-brand-orange/5 px-3 py-1 rounded-full border border-brand-orange/10 inline-block">
                Initial Lead: {new Date(inquiry?.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>

          {messages.map((msg, idx) => {
            const isMe = msg.sender_id === user.id;
            return (
              <motion.div
                key={msg.id || idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] space-y-1`}>
                  <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                    isMe 
                      ? 'bg-brand-orange text-white rounded-tr-none shadow-lg shadow-brand-orange/10' 
                      : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'
                  }`}>
                    {msg.content}
                  </div>
                  <div className={`flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-600 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <Clock size={10} />
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {isMe && <CheckCircle2 size={10} className="text-emerald-400" />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-slate-900/40 border-t border-white/5">
          <form onSubmit={handleSend} className="flex gap-4">
            <button type="button" className="p-4 rounded-2xl bg-slate-800 text-slate-500 hover:text-white transition-colors">
              <Paperclip size={20} />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your formal response..."
                className="w-full bg-slate-800 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={!newMessage.trim() || sending}
              className="p-4 rounded-2xl bg-brand-orange text-white hover:bg-orange-600 shadow-lg shadow-brand-orange/20 transition-all disabled:opacity-50"
            >
              {sending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </form>
          <div className="mt-3 text-[9px] text-slate-600 font-bold uppercase tracking-widest text-center">
            All communications are encrypted and logged for institutional compliance.
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
