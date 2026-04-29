import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Building2, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  User as UserIcon,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Company Profile', icon: Building2, path: '/dashboard/company' },
    { name: 'My Listings', icon: FileText, path: '/dashboard/listings' },
    { name: 'Messages', icon: MessageSquare, path: '/dashboard/messages' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-slate-900/50 backdrop-blur-xl border-r border-white/5 pt-28 pb-8 px-6">
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                location.pathname === item.path
                  ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} className={location.pathname === item.path ? 'text-white' : 'text-slate-500 group-hover:text-brand-orange transition-colors'} />
              <span className="font-semibold text-sm">{item.name}</span>
              {location.pathname === item.path && (
                <motion.div layoutId="activeTab" className="ml-auto">
                  <ChevronRight size={16} />
                </motion.div>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all w-full group"
          >
            <LogOut size={20} className="text-slate-500 group-hover:text-red-400 transition-colors" />
            <span className="font-semibold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header & Sidebar */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 h-20 px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-black text-xl tracking-tighter">RUZAVE</span>
        </Link>
        <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-400 hover:text-white">
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-80 bg-slate-900 z-[70] p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="font-black text-2xl tracking-tighter">RUZAVE</span>
                <button onClick={() => setSidebarOpen(false)} className="p-2 text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex-1 space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                      location.pathname === item.path
                        ? 'bg-brand-orange text-white'
                        : 'text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={24} />
                    <span className="font-bold text-lg">{item.name}</span>
                  </Link>
                ))}
              </nav>
              <button
                onClick={handleSignOut}
                className="mt-auto flex items-center gap-4 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut size={24} />
                <span className="font-bold text-lg">Sign Out</span>
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Bar - Desktop */}
        <header className="hidden lg:flex h-24 items-center justify-between px-12 sticky top-0 bg-slate-950/80 backdrop-blur-xl z-40 border-b border-white/5">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-orange transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search leads, companies..." 
              className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-orange rounded-full border-2 border-slate-950" />
            </button>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-white">{user?.user_metadata?.full_name || 'Partner'}</div>
                <div className="text-[10px] font-black text-brand-orange uppercase tracking-widest">Enterprise</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-orange-600 flex items-center justify-center border border-white/10">
                <UserIcon size={20} className="text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 lg:p-12 mt-20 lg:mt-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
