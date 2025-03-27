"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { testConnection } from "@/lib/test-connection";

export default function DatabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<"loading" | "success" | "error" | "not-configured">("loading");
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isConnected = await testConnection();
        
        if (isConnected) {
          setConnectionStatus("success");
          setConnectionError(null);
        } else {
          setConnectionStatus("error");
          setConnectionError("Failed to connect to database");
        }
      } catch (error: any) {
        console.error("Connection error:", error);
        setConnectionStatus("error");
        setConnectionError(error?.message || "An unknown error occurred");
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Supabase Connection Test</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Connection Status:</h2>
        {connectionStatus === "loading" && <p>Checking connection...</p>}
        {connectionStatus === "success" && <p className="text-green-600">✅ Connected to Supabase successfully!</p>}
        {connectionStatus === "error" && (
          <div>
            <p className="text-red-600">❌ Failed to connect to Supabase</p>
            {connectionError && (
              <p className="text-sm text-red-500 mt-1">Error: {connectionError}</p>
            )}
            <div className="text-sm mt-2">
              <p>Please check that:</p>
              <ul className="list-disc ml-6 mt-1">
                <li>Your .env.local file has the correct Supabase URL and API key</li>
                <li>Your Supabase project is active</li>
                <li>You have network connectivity to Supabase</li>
                <li>You have created the database tables using the SQL script</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <Button 
        onClick={() => window.location.reload()} 
        variant="outline"
      >
        Retry Connection Test
      </Button>
    </div>
  );
} 