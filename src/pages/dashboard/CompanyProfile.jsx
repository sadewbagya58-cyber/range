import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Globe, MapPin, Mail, Phone, Save, Loader2, Upload, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DashboardLayout from '../../layouts/DashboardLayout';
import useAuthStore from '../../store/useAuthStore';
import { getProfile, upsertCompany, uploadFile, getPublicUrl } from '../../services/db';

const companySchema = z.object({
  name: z.string().min(2, 'Company name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  website: z.string().url().optional().or(z.literal('')),
  country: z.string().min(2, 'Country is required'),
  city: z.string().min(2, 'City is required'),
  email: z.string().email('Valid work email is required'),
  phone: z.string().min(5, 'Valid phone number is required'),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
});

const categories = [
  'Freight Forwarding',
  'Warehousing',
  'Customs Brokerage',
  'Last Mile Delivery',
  'Supply Chain Management',
  'Vessel Agency',
  'Trucking & Haulage',
  'Air Freight',
  'Sea Freight',
];

const CompanyProfile = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: {
      categories: [],
    },
  });

  const selectedCategories = watch('categories');

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!user) return;
      const { data, error } = await getProfile(user.id);
      if (data?.companies) {
        const company = data.companies;
        reset({
          name: company.name || '',
          description: company.description || '',
          website: company.website || '',
          country: company.country || '',
          city: company.city || '',
          email: company.email || '',
          phone: company.phone || '',
          categories: company.categories || [],
        });
        if (company.logo_url) setLogoPreview(company.logo_url);
      }
      setLoading(false);
    };
    fetchCompanyData();
  }, [user, reset]);

  const onLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setSaving(true);
    setSuccess(false);

    try {
      let logo_url = logoPreview;

      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const filePath = `${user.id}/logo.${fileExt}`;
        const { error: uploadError } = await uploadFile('logos', filePath, logoFile);
        if (!uploadError) {
          logo_url = getPublicUrl('logos', filePath);
        }
      }

      const { error } = await upsertCompany({
        user_id: user.id,
        ...data,
        logo_url,
        updated_at: new Date().toISOString(),
      });

      if (!error) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const toggleCategory = (cat) => {
    const current = selectedCategories || [];
    const updated = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];
    setValue('categories', updated);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Company <span className="text-brand-orange">Profile</span>
            </h1>
            <p className="text-slate-400">Establish your institutional presence on the global network.</p>
          </div>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-xl border border-emerald-400/20"
            >
              <CheckCircle2 size={18} />
              <span className="text-sm font-bold">Profile Updated</span>
            </motion.div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Visual Identity */}
          <section className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <Upload size={20} className="text-brand-orange" />
              Institutional Identity
            </h3>
            
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
              <div className="relative group">
                <div className="w-40 h-40 rounded-3xl bg-slate-800 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-brand-orange/50">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Building2 size={48} className="text-slate-600" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onLogoChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-xs font-bold uppercase tracking-widest">Update Logo</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6 w-full">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">Company Legal Name</label>
                  <input
                    {...register('name')}
                    className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
                    placeholder="Enter official company name"
                  />
                  {errors.name && <p className="text-red-400 text-xs ml-1">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">Institutional Description</label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all resize-none"
                    placeholder="Describe your company's core mission and services..."
                  />
                  {errors.description && <p className="text-red-400 text-xs ml-1">{errors.description.message}</p>}
                </div>
              </div>
            </div>
          </section>

          {/* Global Presence */}
          <section className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <Globe size={20} className="text-brand-orange" />
              Global Presence
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 ml-1">Headquarters Country</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    {...register('country')}
                    className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                    placeholder="e.g. Singapore"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 ml-1">Headquarters City</label>
                <input
                  {...register('city')}
                  className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  placeholder="e.g. Downtown"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 ml-1">Institutional Website</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    {...register('website')}
                    className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                    placeholder="https://company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 ml-1">Primary Contact Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    {...register('phone')}
                    className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                    placeholder="+1 (000) 000-0000"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-400 ml-1">Official Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    {...register('email')}
                    className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                    placeholder="contact@company.com"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Service Categories */}
          <section className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <CheckCircle2 size={20} className="text-brand-orange" />
              Service Capabilities
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`px-6 py-3 rounded-xl border text-sm font-bold transition-all ${
                    selectedCategories?.includes(cat)
                      ? 'bg-brand-orange border-brand-orange text-white shadow-lg shadow-brand-orange/20'
                      : 'bg-slate-800/50 border-white/5 text-slate-400 hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {errors.categories && <p className="text-red-400 text-xs mt-4 ml-1">{errors.categories.message}</p>}
          </section>

          <div className="flex justify-end gap-6 pt-8">
            <button
              type="button"
              onClick={() => reset()}
              className="px-10 py-4 rounded-2xl font-bold text-slate-400 hover:text-white transition-colors"
            >
              Reset Changes
            </button>
            <button
              type="submit"
              disabled={saving}
              className="group bg-brand-orange hover:bg-orange-600 text-white px-12 py-4 rounded-2xl shadow-xl shadow-brand-orange/20 transition-all font-bold flex items-center gap-3 disabled:opacity-50"
            >
              {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CompanyProfile;
