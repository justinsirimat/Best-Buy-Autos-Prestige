import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseInstance = null;
let initializationError: string | null = null;

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
    const issues = [];
    if (!supabaseUrl) issues.push("Missing NEXT_PUBLIC_SUPABASE_URL");
    if (!supabaseAnonKey) issues.push("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
    if (supabaseUrl && !supabaseUrl.startsWith('http')) issues.push("Invalid NEXT_PUBLIC_SUPABASE_URL format");
    
    initializationError = `Supabase client not initialized: ${issues.join(', ')}`;
    console.warn(initializationError);
  }
} catch (error: any) {
  initializationError = `Error initializing Supabase client: ${error.message}`;
  console.error(initializationError, error);
  supabaseInstance = null;
}

export const supabase = supabaseInstance;

// Helper function to check if Supabase is initialized
export const isSupabaseInitialized = () => !!supabase;

// Get initialization error if any
export const getSupabaseInitError = () => initializationError;

// Test connection to Supabase
export const testSupabaseConnection = async () => {
  if (!supabase) {
    return {
      success: false,
      error: initializationError || "Supabase client not initialized"
    };
  }

  try {
    // Try to fetch the simplest possible query
    const { data, error } = await supabase
      .from('vehicles')
      .select('count', { count: 'exact', head: true });

    if (error) {
      return { 
        success: false, 
        error: error.message,
        details: error
      };
    }

    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message,
      details: error
    };
  }
};

// Check if a table exists
export const checkTableExists = async (tableName: string) => {
  if (!supabase) {
    return {
      exists: false,
      error: initializationError || "Supabase client not initialized"
    };
  }

  try {
    // Use system tables to check if our table exists
    const { data, error } = await supabase
      .rpc('check_table_exists', { table_name: tableName });

    if (error) {
      return { 
        exists: false, 
        error: error.message
      };
    }

    return { 
      exists: !!data,
      data
    };
  } catch (error: any) {
    return { 
      exists: false, 
      error: error.message
    };
  }
}; 