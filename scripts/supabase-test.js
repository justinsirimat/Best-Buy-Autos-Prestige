// This script tests direct connection to Supabase
// Run with: node scripts/supabase-test.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Testing Supabase connection...");
console.log(`Supabase URL: ${supabaseUrl ? supabaseUrl : 'Not found'}`);
console.log(`Supabase Key: ${supabaseAnonKey ? supabaseAnonKey.substring(0, 10) + '...' : 'Not found'}`);

async function testConnection() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Error: Missing environment variables");
    process.exit(1);
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log("Supabase client created successfully");

    // Test connection with a simple query
    console.log("Testing query...");
    const { data, error } = await supabase.from('vehicles').select('count(*)', { count: 'exact', head: true });
    
    if (error) {
      console.error("Query error:", error);
      process.exit(1);
    }
    
    console.log("Connection successful!");
    console.log("Query result:", data);
    
    console.log("\nIf you still have issues in your Next.js app:");
    console.log("1. Make sure you've restarted your Next.js server after updating .env.local");
    console.log("2. Check for CORS issues in your Supabase project settings");
    console.log("3. Verify you've run the SQL setup script to create the necessary tables");
    
  } catch (error) {
    console.error("Connection error:", error);
    process.exit(1);
  }
}

testConnection(); 