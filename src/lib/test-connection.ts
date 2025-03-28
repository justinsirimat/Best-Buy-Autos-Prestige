/**
 * Database Testing Module
 * 
 * This module provides utilities for testing the Supabase database connection
 * and verifying the existence of required database tables.
 * Used primarily by the admin dashboard for system diagnostics.
 */

import { supabase } from './supabase';

/**
 * Tests the connection to the Supabase database
 * Attempts to perform a simple query to verify database access
 * 
 * @returns {Promise<{success: boolean, error?: string, details?: any}>} 
 *          Object containing:
 *          - success: whether the connection test passed
 *          - error: error message if the test failed
 *          - details: additional error information if available
 */
export const testSupabaseConnection = async () => {
  // Check if Supabase client exists
  if (!supabase) {
    return {
      success: false,
      error: "Supabase client not initialized"
    };
  }

  try {
    // Perform a lightweight query to test connection
    // Using count() with head: true for minimal data transfer
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

/**
 * Checks if a specific table exists in the database
 * Uses a custom RPC function to verify table existence
 * 
 * @param {string} tableName - The name of the table to check
 * @returns {Promise<{exists: boolean, error?: string, data?: any}>}
 *          Object containing:
 *          - exists: whether the table exists
 *          - error: error message if the check failed
 *          - data: additional information about the table
 */
export const checkTableExists = async (tableName: string = 'vehicles') => {
  // Verify Supabase client is initialized
  if (!supabase) {
    return {
      exists: false,
      error: "Supabase client not initialized"
    };
  }

  try {
    // Call the RPC function to check table existence
    // This uses a stored procedure in the database
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