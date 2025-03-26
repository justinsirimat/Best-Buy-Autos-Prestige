"use client";

import { useState, useEffect } from "react";

export default function EnvCheck() {
  const [envVars, setEnvVars] = useState({
    supabaseUrl: "",
    supabaseAnonKey: "",
  });

  useEffect(() => {
    // Next.js only makes environment variables with NEXT_PUBLIC prefix available on the client
    setEnvVars({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not found",
      supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
        ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 10) + "..." 
        : "Not found",
    });
  }, []);

  return (
    <div className="my-6 p-4 bg-muted rounded-md">
      <h2 className="text-lg font-semibold mb-3">Environment Variables Check</h2>
      <div className="space-y-2">
        <div>
          <span className="font-medium">NEXT_PUBLIC_SUPABASE_URL: </span>
          <span className={envVars.supabaseUrl === "Not found" ? "text-red-500" : "text-green-500"}>
            {envVars.supabaseUrl}
          </span>
        </div>
        <div>
          <span className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY: </span>
          <span className={envVars.supabaseAnonKey === "Not found" ? "text-red-500" : "text-green-500"}>
            {envVars.supabaseAnonKey}
          </span>
        </div>
      </div>
    </div>
  );
} 