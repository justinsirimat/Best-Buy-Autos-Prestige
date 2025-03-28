import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Configuration Module
 * 
 * This module handles the initialization and configuration of the Supabase client.
 * It provides a centralized way to manage database connections and authentication.
 */

// Environment variables required for Supabase connection
// These should be set in .env.local for development and in deployment environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Initialize Supabase client with type safety
// Using 'any' type here as the Supabase client type is complex
let supabase: any = null;

/**
 * Checks if the Supabase client is properly initialized
 * Verifies both the client instance and required credentials exist
 * 
 * @returns {boolean} True if Supabase is ready to use
 */
export function isSupabaseInitialized(): boolean {
  return !!(supabase && supabaseUrl && supabaseKey);
}

/**
 * Initializes the Supabase client if not already done
 * Only creates a new client if the required credentials are available
 * 
 * @returns The initialized Supabase client or null if initialization failed
 */
export function initSupabase() {
  // Only initialize if environment variables are available and client doesn't exist
  if (supabaseUrl && supabaseKey && !supabase) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
}

// Initialize Supabase client when this module is first imported
initSupabase();

// Export the initialized client for use in other modules
export { supabase };

/**
 * Gets any initialization error that occurred
 * Useful for debugging connection issues
 * 
 * @returns {string | null} Error message or null if no error
 */
export const getSupabaseInitError = () => {
  if (!supabase) {
    return "Supabase client not initialized";
  }
  return null;
};

// Test connection to Supabase
export const testSupabaseConnection = async () => {
  if (!supabase) {
    return {
      success: false,
      error: getSupabaseInitError() || "Supabase client not initialized"
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
      error: getSupabaseInitError() || "Supabase client not initialized"
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