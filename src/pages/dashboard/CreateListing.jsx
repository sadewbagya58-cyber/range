import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  Truck, 
  Box, 
  DollarSign, 
  MapPin, 
  Calendar, 
  Weight, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DashboardLayout from '../../layouts/DashboardLayout';
import useAuthStore from '../../store/useAuthStore';
import { createListing } from '../../services/db';

const listingSchema = z.object({
  type: z.enum(['freight', 'cargo', 'opportunity']),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Please provide more details'),
  origin: z.string().min(2, 'Origin is required'),
  destination: z.string().min(2, 'Destination is required'),
  date: z.string().min(1, 'Date is required'),
  weight: z.string().optional(),
  budget: z.string().optional(),
});

const CreateListing = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      type: 'freight',
    },
  });

  const selectedType = watch('type');

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const { error } = await createListing({
        user_id: user.id,
        ...data,
        status: 'active',
        created_at: new Date().toISOString(),
      });

      if (!error) {
        navigate('/dashboard/listings');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const types = [
    { id: 'freight', label: 'Freight Lead', icon: Truck, desc: 'Offer shipping capacity' },
    { id: 'cargo', label: 'Cargo Request', icon: Box, desc: 'Looking for shipping' },
    { id: 'opportunity', label: 'Business Opp', icon: DollarSign, desc: 'Buy/Sell opportunities' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/dashboard/listings" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Listings</span>
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Post New <span className="text-brand-orange">Listing</span>
          </h1>
          <p className="text-slate-400">Expand your reach by broadcasting your logistics needs.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Listing Type Selection */}
          <section className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <FileText size={20} className="text-brand-orange" />
              Listing Category
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {types.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setValue('type', type.id)}
                  className={`p-6 rounded-3xl border text-left transition-all relative overflow-hidden group ${
                    selectedType === type.id
                      ? 'border-brand-orange bg-brand-orange/10 ring-2 ring-brand-orange/20'
                      : 'border-white/5 bg-slate-800/30 hover:bg-slate-800/50'
                  }`}
                >
                  <type.icon 
                    size={24} 
                    className={`mb-4 transition-colors ${selectedType === type.id ? 'text-brand-orange' : 'text-slate-500'}`} 
                  />
                  <div className={`font-bold mb-1 ${selectedType === type.id ? 'text-white' : 'text-slate-400'}`}>
                    {type.label}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                    {type.desc}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Primary Details */}
          <section className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <AlertCircle size={20} className="text-brand-orange" />
              Primary Information
            </h3>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 ml-1">Listing Title</label>
                <input
                  {...register('title')}
                  className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
                  placeholder="e.g. Need 40ft Container Shipment from Shanghai to Rotterdam"
                />
                {errors.title && <p className="text-red-400 text-xs ml-1">{errors.title.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">Origin</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      {...register('origin')}
                      className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                      placeholder="Country, City"
                    />
                  </div>
                  {errors.origin && <p className="text-red-400 text-xs ml-1">{errors.origin.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      {...register('destination')}
                      className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                      placeholder="Country, City"
                    />
                  </div>
                  {errors.destination && <p className="text-red-400 text-xs ml-1">{errors.destination.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">Proposed Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      {...register('date')}
                      type="date"
                      className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                    />
                  </div>
                  {errors.date && <p className="text-red-400 text-xs ml-1">{errors.date.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">
                    {selectedType === 'opportunity' ? 'Valuation' : 'Approx Weight'}
                  </label>
                  <div className="relative">
                    {selectedType === 'opportunity' ? (
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    ) : (
                      <Weight className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    )}
                    <input
                      {...register(selectedType === 'opportunity' ? 'budget' : 'weight')}
                      className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                      placeholder={selectedType === 'opportunity' ? 'USD' : 'KGs / Tons'}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 ml-1">Additional Specifications</label>
                <textarea
                  {...register('description')}
                  rows={6}
                  className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all resize-none"
                  placeholder="Provide detailed specifications, requirements, or terms..."
                />
                {errors.description && <p className="text-red-400 text-xs ml-1">{errors.description.message}</p>}
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-6 pt-8 pb-12">
            <button
              type="button"
              onClick={() => navigate('/dashboard/listings')}
              className="px-10 py-4 rounded-2xl font-bold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="group bg-brand-orange hover:bg-orange-600 text-white px-12 py-4 rounded-2xl shadow-xl shadow-brand-orange/20 transition-all font-bold flex items-center gap-3 disabled:opacity-50"
            >
              {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
              Publish Listing
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateListing;
