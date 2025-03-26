import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseInstance = null;

try {
  // Only create client if both URL and key are available and valid
  if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    console.log("Supabase client initialized successfully");
  } else {
    console.warn("Supabase client not initialized - missing environment variables");
    if (!supabaseUrl) console.warn("Missing NEXT_PUBLIC_SUPABASE_URL");
    if (!supabaseAnonKey) console.warn("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
    if (supabaseUrl && !supabaseUrl.startsWith('http')) console.warn("Invalid NEXT_PUBLIC_SUPABASE_URL format");
  }
} catch (error) {
  console.error("Error initializing Supabase client:", error);
  supabaseInstance = null;
}

export const supabase = supabaseInstance;

// Helper function to check if Supabase is initialized
export const isSupabaseInitialized = () => !!supabase; 