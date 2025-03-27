import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rrvzkwqfglumuvzonexn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydnprd3FmZ2x1bXV2em9uZXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMjYzOTgsImV4cCI6MjA1ODYwMjM5OH0.IZaOtE0tyqgCWGCeWuTYL6SqrkSrb7JATZc6SWXXBfU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Don't persist the session for this test
    autoRefreshToken: false,
  },
});

// Test function
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('count', { count: 'exact', head: true });

    if (error) {
      console.error('Connection error:', error);
      return false;
    }

    console.log('Connection successful:', data);
    return true;
  } catch (error) {
    console.error('Test failed:', error);
    return false;
  }
}; 