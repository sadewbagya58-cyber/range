import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, MessageSquare, Users, Plus, Search, ArrowUpRight } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuthStore();

  const stats = [
    { name: 'Active Leads', value: '12', icon: TrendingUp, color: 'text-emerald-400', trend: '+2 this week' },
    { name: 'Inquiries', value: '48', icon: MessageSquare, color: 'text-blue-400', trend: '5 pending' },
    { name: 'Global Network', value: '256', icon: Users, color: 'text-brand-orange', trend: '+12 new partners' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Executive <span className="text-brand-orange">Overview</span>
            </h1>
            <p className="text-slate-400">Welcome back, {user?.user_metadata?.full_name || 'Partner'}. Monitor your logistics ecosystem.</p>
          </div>
          <Link 
            to="/dashboard/listings/new"
            className="group bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 rounded-2xl shadow-xl shadow-brand-orange/20 transition-all font-bold flex items-center gap-3"
          >
            <Plus size={20} />
            Create New Listing
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] group hover:border-brand-orange/20 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="text-brand-orange" size={20} />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl bg-slate-800/50 border border-white/5 group-hover:bg-brand-orange/10 transition-colors ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.name}</div>
                </div>
              </div>
              <div className="text-slate-400 text-sm font-medium">
                <span className={stat.color}>{stat.trend.split(' ')[0]}</span> {stat.trend.split(' ').slice(1).join(' ')}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white">Recent Activity</h3>
              <button className="text-sm text-brand-orange font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-brand-orange transition-colors">
                    <MessageSquare size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white mb-1">New inquiry received for "Cargo Shipment HK-NY"</div>
                    <div className="text-xs text-slate-500">2 hours ago • Logistics Solutions Inc.</div>
                  </div>
                  <ChevronRight size={16} className="text-slate-600" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-brand-orange/10 to-transparent border border-brand-orange/20 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 rounded-[1.5rem] bg-brand-orange/20 flex items-center justify-center mb-6 shadow-2xl shadow-brand-orange/20">
              <Plus size={32} className="text-brand-orange" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Maximize Visibility</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Premium members get 5x more inquiries. Upgrade your account to feature your listings at the top.
            </p>
            <button className="w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-xs">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const ChevronRight = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default Dashboard;

