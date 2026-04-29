import React from 'react';
import { Ship, Globe, Share2, Anchor, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#020202] text-white pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-brand-orange/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          
          <div className="space-y-10">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-white/10">
                <img src={logo} alt="Ruzave" className="w-full h-full object-contain p-2" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-black tracking-tight leading-none">
                  RUZAVE <span className="text-brand-orange">GLOBAL</span>
                </span>
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/40 mt-1">Institutional Platform</span>
              </div>
            </div>
            <p className="text-white/30 text-sm leading-relaxed font-light">
              The world's most elite B2B ecosystem for the maritime and logistics industry. Orchestrating global trade through transparency and precision networking.
            </p>
            <div className="flex space-x-4">
              {[Globe, Share2, Anchor, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all duration-500 hover:-translate-y-1">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-10">Global Solutions</h4>
            <ul className="space-y-5 text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
              <li><a href="#marketplace" className="hover:text-brand-orange transition-colors">B2B Marketplace</a></li>
              <li><a href="#directory" className="hover:text-brand-orange transition-colors">Strategic Directory</a></li>
              <li><a href="#services" className="hover:text-brand-orange transition-colors">Freight Alliances</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Operational Hubs</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Verified Entities</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-10">Corporate Hub</h4>
            <ul className="space-y-5 text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
              <li><a href="#about" className="hover:text-brand-orange transition-colors">About Institution</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Global Leadership</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Compliance & Trust</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Investor Relations</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Media Inquiry</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-10">Inquiry Center</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin size={18} className="text-brand-orange shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-widest text-white/60">Institutional Hub, 150+ Countries</span>
              </li>
              <li className="flex gap-4">
                <Phone size={18} className="text-brand-orange shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-widest text-white">+91 95400 00000</span>
              </li>
              <li className="flex gap-4">
                <Mail size={18} className="text-brand-orange shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-widest text-white/60">support@ruzave.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em]">
            © 2026 RUZAVE GLOBAL INSTITUTION. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-8 text-[10px] font-black text-white/10 uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
            <a href="#" className="hover:text-white transition-colors">Operational Terms</a>
            <a href="#" className="hover:text-white transition-colors">Regulatory Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
