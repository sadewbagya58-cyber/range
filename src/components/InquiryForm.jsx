import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Ship, MapPin, Hash, ClipboardList, User, Mail, MessageSquare } from 'lucide-react';

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    vesselName: '',
    imoNumber: '',
    serviceType: '',
    portOfCall: '',
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    setSubmitted(true);
    // Reset after some time
    setTimeout(() => setSubmitted(false), 5000);
  };

  const serviceOptions = [
    'Ship Brokering',
    'Technical Repairs',
    'Cleaning & Maintenance',
    'Specialized Logistics',
    'Emergency Support',
    'Other'
  ];

  return (
    <section id="contact" className="py-24 bg-brand-dark relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
          
          {/* Info Side */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Connect with Our <span className="text-brand-orange">Operations Team</span></h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Need immediate port assistance or a long-term logistics partner? Fill out the inquiry form and our regional manager will contact you within 2 business hours.
              </p>

              <div className="space-y-6">
                {[
                  { icon: MapPin, label: 'Headquarters', value: '55/14, Modara, Colombo 15, Sri Lanka' },
                  { icon: User, label: 'Direct Operations', value: '+94 770648206' },
                  { icon: Mail, label: 'Email Inquiry', value: 'widerange.ops@gmail.com' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-12 h-12 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-white/40 mb-1">{item.label}</div>
                      <div className="text-white font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Form Side */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden"
            >
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-20 h-20 bg-brand-orange/20 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-orange">
                    <Send size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-white/60">Thank you for your inquiry. Our team will get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/60 ml-1">Vessel Name</label>
                      <div className="relative">
                        <Ship className="absolute left-4 top-3.5 text-white/20" size={18} />
                        <input
                          required
                          type="text"
                          name="vesselName"
                          placeholder="e.g. MV Golden Horizon"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-12 focus:border-brand-orange outline-none transition-all"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/60 ml-1">IMO Number</label>
                      <div className="relative">
                        <Hash className="absolute left-4 top-3.5 text-white/20" size={18} />
                        <input
                          required
                          type="text"
                          name="imoNumber"
                          placeholder="7-digit number"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-12 focus:border-brand-orange outline-none transition-all"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/60 ml-1">Service Type</label>
                      <div className="relative">
                        <ClipboardList className="absolute left-4 top-3.5 text-white/20" size={18} />
                        <select
                          required
                          name="serviceType"
                          className="w-full bg-brand-dark/50 border border-white/10 rounded-xl py-3 px-12 focus:border-brand-orange outline-none transition-all appearance-none text-white/80"
                          onChange={handleChange}
                        >
                          <option value="">Select Service</option>
                          {serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/60 ml-1">Port of Call</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-3.5 text-white/20" size={18} />
                        <input
                          required
                          type="text"
                          name="portOfCall"
                          placeholder="e.g. Port of Colombo"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-12 focus:border-brand-orange outline-none transition-all"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/60 ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 text-white/20" size={18} />
                        <input
                          required
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-12 focus:border-brand-orange outline-none transition-all"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/60 ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-white/20" size={18} />
                        <input
                          required
                          type="email"
                          name="email"
                          placeholder="email@company.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-12 focus:border-brand-orange outline-none transition-all"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60 ml-1">Additional Requirements</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-3.5 text-white/20" size={18} />
                      <textarea
                        name="message"
                        rows="4"
                        placeholder="Please describe your requirements in detail..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-12 focus:border-brand-orange outline-none transition-all resize-none"
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-2 group"
                  >
                    Submit Inquiry
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
