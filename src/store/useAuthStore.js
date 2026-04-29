import { create } from 'zustand';
import { supabase } from '../services/supabase';

const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,
  profile: null,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
  setProfile: (profile) => set({ profile }),

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, profile: null });
  },

  fetchProfile: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (data) {
      set({ profile: data });
    }
    return { data, error };
  }
}));

export default useAuthStore;
