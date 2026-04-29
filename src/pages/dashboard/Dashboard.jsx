import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, MessageSquare, TrendingUp, Plus, Search } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const Dashboard = () => {
  const { user } = useAuthStore();

  const stats = [
    { name: 'Active Leads', value: '12', icon: TrendingUp, color: 'text-emerald-400' },
    { name: 'Inquiries', value: '48', icon: MessageSquare, color: 'text-blue-400' },
    { name: 'Connections', value: '256', icon: Users, color: 'text-brand-orange' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-12 px-6 lg:px-12 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Welcome, <span className="text-brand-orange">{user?.user_metadata?.full_name || 'Partner'}</span>
            </h1>
            <p className="text-slate-400">Here's what's happening with your logistics network today.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl border border-white/5 transition-all">
              <Search size={18} />
              Find Cargo
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-brand-orange/20 transition-all font-semibold">
              <Plus size={18} />
              Post Lead
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-6 rounded-3xl group hover:border-brand-orange/20 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-slate-800 group-hover:bg-brand-orange/10 transition-colors ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.name}</div>
            </motion.div>
          ))}
        </div>

        {/* Content Tabs Placeholder */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6 border border-white/5">
            <LayoutDashboard size={32} className="text-slate-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Your Workspace is Ready</h2>
          <p className="text-slate-400 max-w-md mx-auto mb-8">
            This is your central hub for managing freight leads, cargo requests, and business communications.
          </p>
          <div className="inline-flex p-1 bg-slate-800 rounded-xl border border-white/5">
            <button className="px-6 py-2 bg-brand-orange text-white rounded-lg text-sm font-bold shadow-lg shadow-brand-orange/10">Active Leads</button>
            <button className="px-6 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-bold transition-colors">Inquiries</button>
            <button className="px-6 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-bold transition-colors">Archive</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
