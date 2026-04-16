import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Supabase client instance
export const supabase = (supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl)) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as any); 

if (!supabase) {
  console.warn('Supabase credentials missing. Data fetching will be disabled.');
}

// Generate signed URL for private PDFs
export const getSignedPdfUrl = async (path: string, expiresIn = 3600) => {
  if (!supabase) return null;

  const { data, error } = await supabase.storage
    .from('exams')
    .createSignedUrl(path, expiresIn);

  if (error) {
    console.error('Signing failed:', error);
    return null;
  }

  return data.signedUrl;
};

// Public URL fallback
export const getPublicPdfUrl = (path: string) => {
  const { data } = supabase.storage.from('exams').getPublicUrl(path);
  return data.publicUrl;
};
