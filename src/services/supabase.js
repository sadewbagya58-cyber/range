import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://finblwpynlptkwuqnegf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Ah5ejuEokV92Me01eiydyg_qBp5DuON';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
