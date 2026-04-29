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
