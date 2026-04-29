import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Mail, Lock, Loader2, ArrowRight, Building2, User, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';

const Register = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    companyName: '',
    companyWebsite: '',
    accountType: 'business' // 'business' or 'individual'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          company_name: formData.companyName,
          company_website: formData.companyWebsite,
          account_type: formData.accountType,
        }
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Create profile in profiles table (assuming it exists or will be created)
      // Supabase triggers or explicit insert can handle this
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-orange to-orange-600 mb-4 shadow-lg shadow-brand-orange/20">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-slate-400">Join the elite network of logistics professionals</p>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-2 mb-8 px-4">
            <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-brand-orange' : 'bg-slate-700'}`} />
            <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-brand-orange' : 'bg-slate-700'}`} />
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, accountType: 'business' })}
                      className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                        formData.accountType === 'business'
                          ? 'border-brand-orange bg-brand-orange/10 text-white'
                          : 'border-white/5 bg-slate-800/30 text-slate-400 hover:bg-slate-800/50'
                      }`}
                    >
                      <Building2 className="w-6 h-6" />
                      <span className="text-xs font-semibold">Business</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, accountType: 'individual' })}
                      className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                        formData.accountType === 'individual'
                          ? 'border-brand-orange bg-brand-orange/10 text-white'
                          : 'border-white/5 bg-slate-800/30 text-slate-400 hover:bg-slate-800/50'
                      }`}
                    >
                      <User className="w-6 h-6" />
                      <span className="text-xs font-semibold">Individual</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-orange transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange/50 transition-all"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 ml-1">Secure Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-orange transition-colors">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange/50 transition-all"
                        placeholder="••••••••"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-orange transition-colors">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange/50 transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  {formData.accountType === 'business' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Company Name</label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-orange transition-colors">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <input
                            name="companyName"
                            type="text"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange/50 transition-all"
                            placeholder="Ruzave Logistics Ltd"
                            required={formData.accountType === 'business'}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Company Website (Optional)</label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-orange transition-colors">
                            <Globe className="w-5 h-5" />
                          </div>
                          <input
                            name="companyWebsite"
                            type="url"
                            value={formData.companyWebsite}
                            onChange={handleChange}
                            className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange/50 transition-all"
                            placeholder="https://company.com"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-slate-800/50 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl border border-white/5 transition-all"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] group bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-brand-orange/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {step === 1 ? 'Next Step' : 'Create Account'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-orange font-semibold hover:text-orange-400 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
