import React from 'react';
import { Ship, Globe, Share2, Anchor, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Ruzave Logo" className="w-10 h-10 object-contain" />
              <span className="text-xl font-display font-bold tracking-tight">
                RUZAVE <span className="text-brand-orange">GLOBAL</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              The world's premier B2B marketplace for the shipping and logistics industry. Empowering businesses with global connectivity and precision networking.
            </p>
            <div className="flex space-x-4">
              {[Globe, Share2, Anchor, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Marketplace</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-brand-orange transition-colors">Global Directory</a></li>
              <li><a href="#services" className="hover:text-brand-orange transition-colors">Freight Services</a></li>
              <li><a href="#about" className="hover:text-brand-orange transition-colors">Business Alliances</a></li>
              <li><a href="#contact" className="hover:text-brand-orange transition-colors">Inquiry System</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Member Benefits</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-brand-orange transition-colors">Ocean Logistics</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Air Freight Solutions</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Port Agency</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Smart Warehousing</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Customs Brokerage</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Global</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li className="flex gap-3">
                <MapPin size={18} className="text-brand-orange shrink-0" />
                <span>Global Digital Platform - 150+ Countries</span>
              </li>
              <li className="flex gap-3 text-white">
                <Phone size={18} className="text-brand-orange shrink-0" />
                <span>+91 95400 00000 (Global Support)</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-brand-orange shrink-0" />
                <span>support@ruzave.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/20">
          <p>© 2026 Ruzave Global Marketplace. All rights reserved.</p>
          <p>Connecting the World's Logistics Experts.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
