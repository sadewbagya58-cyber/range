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
              <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
              <span className="text-xl font-display font-bold tracking-tight">
                WIDE RANGE <span className="text-brand-orange">ENTERPRISES</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Leading the maritime industry with innovative solutions and unparalleled service reliability. Committed to precision and safety across all global ports.
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
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-brand-orange transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-brand-orange transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-brand-orange transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-brand-orange transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Our Services</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-brand-orange transition-colors">Ship Brokering</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Technical Repairs</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Cleaning & Maintenance</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Specialized Logistics</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Custom Clearing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li className="flex gap-3">
                <MapPin size={18} className="text-brand-orange shrink-0" />
                <span>55/14, Modara, Colombo 15, Sri Lanka</span>
              </li>
              <li className="flex gap-3 text-white">
                <Phone size={18} className="text-brand-orange shrink-0" />
                <span>+94 770648206</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-brand-orange shrink-0" />
                <span>widerange.ops@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/20">
          <p>© 2026 Wide Range Enterprises (Pvt) Ltd. All rights reserved.</p>
          <p>Designed for Maritime Excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
