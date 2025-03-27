"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SupabaseDiagnostics from "../supabase-diagnostics";

export default function SupabaseDebugPage() {
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  
  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">Supabase Connection Debugging</h1>
      
      <SupabaseDiagnostics />
      
      <Card>
        <CardHeader>
          <CardTitle>Troubleshooting Guide</CardTitle>
          <CardDescription>Common solutions for Supabase connection issues</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => setShowTroubleshooting(!showTroubleshooting)}
            variant="outline"
            className="mb-4"
          >
            {showTroubleshooting ? "Hide Troubleshooting Steps" : "Show Troubleshooting Steps"}
          </Button>
          
          {showTroubleshooting && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">1. Check Environment Variables</h3>
                <p className="text-sm text-muted-foreground">
                  Ensure your <code className="bg-muted px-1 py-0.5 rounded">.env.local</code> file contains the correct Supabase URL and anon key.
                  Make sure there are no typos or extra spaces.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">2. Verify Supabase Project Status</h3>
                <p className="text-sm text-muted-foreground">
                  Check if your Supabase project is active and not in a paused state.
                  Log in to the Supabase dashboard and verify the project status.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">3. Database Schema Issues</h3>
                <p className="text-sm text-muted-foreground">
                  Make sure you have run the database setup script to create all necessary tables.
                  Check the error messages for specific table or schema issues.
                </p>
                <pre className="mt-2 p-2 bg-muted rounded-md text-xs overflow-x-auto">
                  {`-- Run this SQL in the Supabase SQL Editor:
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'vehicles'
);`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">4. CORS Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  Ensure CORS is properly configured in your Supabase project settings.
                  Add <code className="bg-muted px-1 py-0.5 rounded">http://localhost:3000</code> to the allowed origins.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">5. Network Issues</h3>
                <p className="text-sm text-muted-foreground">
                  Check your network connection and ensure you don't have firewall or proxy settings blocking access to Supabase.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">6. Check Supabase Client Initialization</h3>
                <pre className="mt-2 p-2 bg-muted rounded-md text-xs overflow-x-auto">
                  {`// src/lib/supabase.ts should contain proper initialization:
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">7. Restart Development Server</h3>
                <p className="text-sm text-muted-foreground">
                  Try stopping and restarting your development server to reload environment variables:
                </p>
                <pre className="mt-2 p-2 bg-muted rounded-md text-xs overflow-x-auto">
                  {`npm run dev`}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 