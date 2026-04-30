import { supabase } from './supabase';

/**
 * Profiles & Companies
 */
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*, companies(*)')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  return { data, error };
};

export const upsertCompany = async (companyData) => {
  const { data, error } = await supabase
    .from('companies')
    .upsert(companyData)
    .select()
    .single();
  return { data, error };
};

/**
 * Listings
 */
export const getListings = async (filters = {}) => {
  let query = supabase
    .from('listings')
    .select('*, profiles(full_name), companies(name, logo_url, verified)')
    .order('created_at', { ascending: false });

  if (filters.type) query = query.eq('type', filters.type);
  if (filters.status) query = query.eq('status', filters.status);
  if (filters.category) query = query.contains('categories', [filters.category]);

  const { data, error } = await query;
  return { data, error };
};

export const createListing = async (listingData) => {
  const { data, error } = await supabase
    .from('listings')
    .insert(listingData)
    .select()
    .single();
  return { data, error };
};

export const updateListing = async (id, updates) => {
  const { data, error } = await supabase
    .from('listings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deleteListing = async (id) => {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', id);
  return { error };
};

/**
 * Companies Directory
 */
export const getCompanies = async (filters = {}) => {
  let query = supabase
    .from('companies')
    .select('*')
    .order('name');

  if (filters.country && filters.country !== 'all') query = query.eq('country', filters.country);
  if (filters.category && filters.category !== 'all') query = query.contains('categories', [filters.category]);
  if (filters.verified) query = query.eq('verified', true);

  const { data, error } = await query;
  return { data, error };
};

export const getCompany = async (id) => {
  const { data, error } = await supabase
    .from('companies')
    .select('*, listings(*)')
    .eq('id', id)
    .single();
  return { data, error };
};

/**
 * User Actions
 */
export const saveListing = async (userId, listingId) => {
  const { data, error } = await supabase
    .from('saved_listings')
    .upsert({ user_id: userId, listing_id: listingId })
    .select();
  return { data, error };
};

export const sendInquiry = async (inquiryData) => {
  const { data, error } = await supabase
    .from('inquiries')
    .insert(inquiryData)
    .select();
  return { data, error };
};

export const getInquiries = async (userId, type = 'received') => {
  let query = supabase
    .from('inquiries')
    .select('*, sender:profiles!sender_id(*), receiver:profiles!receiver_id(*), listing:listings(*)')
    .order('created_at', { ascending: false });

  if (type === 'received') {
    query = query.eq('receiver_id', userId);
  } else {
    query = query.eq('sender_id', userId);
  }

  const { data, error } = await query;
  return { data, error };
};

export const updateInquiryStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('inquiries')
    .update({ status })
    .eq('id', id)
    .select();
  return { data, error };
};

/**
 * Real-time Messaging
 */
export const getMessages = async (inquiryId) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('inquiry_id', inquiryId)
    .order('created_at', { ascending: true });
  return { data, error };
};

export const sendMessage = async (messageData) => {
  const { data, error } = await supabase
    .from('messages')
    .insert(messageData)
    .select();
  return { data, error };
};

export const reportListing = async (reportData) => {
  const { data, error } = await supabase
    .from('reports')
    .insert(reportData)
    .select();
  return { data, error };
};

/**
 * Storage
 */
export const uploadFile = async (bucket, path, file) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true });
  return { data, error };
};

export const getPublicUrl = (bucket, path) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};
