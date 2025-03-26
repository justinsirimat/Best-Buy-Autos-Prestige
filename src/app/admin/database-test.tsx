"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase, isSupabaseInitialized } from "@/lib/supabase";

export default function DatabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<"loading" | "success" | "error" | "not-configured">("loading");
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    if (!isSupabaseInitialized()) {
      setConnectionStatus("not-configured");
      return;
    }

    const checkConnection = async () => {
      try {
        if (!supabase) {
          setConnectionStatus("not-configured");
          return;
        }

        // Simple query to test connection - checking if vehicles table exists
        const { data, error } = await supabase
          .from('vehicles')
          .select('count(*)', { count: 'exact', head: true });
        
        if (error) throw error;
        setConnectionStatus("success");
      } catch (error) {
        console.error("Database connection error:", error);
        setConnectionStatus("error");
      }
    };

    checkConnection();
  }, []);

  const testQuery = async () => {
    if (!isSupabaseInitialized() || !supabase) {
      alert("Supabase is not configured properly. Check your environment variables.");
      return;
    }

    try {
      // Query vehicles table with joins to specs
      const { data, error } = await supabase
        .from('vehicles')
        .select(`
          id, 
          title, 
          price, 
          brand, 
          model, 
          year, 
          mileage, 
          bodyType,
          transmission,
          image_main,
          vehicle_specs (
            fuelType,
            seats
          )
        `)
        .limit(10);
      
      if (error) throw error;
      setData(data);
    } catch (error) {
      console.error("Query error:", error);
      alert("Failed to query database. Check console for details.");
    }
  };

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
            <p className="text-sm mt-2">
              Please check that:
              <ul className="list-disc ml-6 mt-1">
                <li>Your .env.local file has the correct Supabase URL and API key</li>
                <li>Your Supabase project is active</li>
                <li>You have network connectivity to Supabase</li>
                <li>You have created the database tables using the SQL script</li>
              </ul>
            </p>
          </div>
        )}
        {connectionStatus === "not-configured" && (
          <div>
            <p className="text-amber-600">⚠️ Supabase is not properly configured</p>
            <p className="text-sm mt-2">
              Please add your Supabase credentials to .env.local:
              <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
                NEXT_PUBLIC_SUPABASE_URL=your-project-url<br/>
                NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
              </pre>
            </p>
          </div>
        )}
      </div>

      <Button onClick={testQuery} disabled={connectionStatus !== "success"}>
        Test Vehicles Query
      </Button>

      {data && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Vehicle Query Results:</h2>
          <div className="bg-gray-100 p-4 rounded overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">Title</th>
                  <th className="text-left p-2">Brand</th>
                  <th className="text-left p-2">Price</th>
                  <th className="text-left p-2">Body Type</th>
                  <th className="text-left p-2">Fuel Type</th>
                </tr>
              </thead>
              <tbody>
                {data.map(vehicle => (
                  <tr key={vehicle.id} className="border-t border-gray-200">
                    <td className="p-2">{vehicle.id.substring(0, 8)}...</td>
                    <td className="p-2">{vehicle.title}</td>
                    <td className="p-2">{vehicle.brand}</td>
                    <td className="p-2">${parseFloat(vehicle.price).toLocaleString()}</td>
                    <td className="p-2">{vehicle.bodyType}</td>
                    <td className="p-2">{vehicle.vehicle_specs?.[0]?.fuelType || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-blue-600">View Raw JSON Data</summary>
            <pre className="mt-2 bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-xs">
              {JSON.stringify(data, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
} 