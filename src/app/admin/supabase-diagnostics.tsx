"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { supabase, isSupabaseInitialized, getSupabaseInitError, testSupabaseConnection, checkTableExists } from "@/lib/supabase";

export default function SupabaseDiagnostics() {
  const [diagnostics, setDiagnostics] = useState({
    envVars: {
      supabaseUrl: "",
      supabaseKeyPartial: "",
      complete: false
    },
    clientInitialized: false,
    initError: null,
    apiTests: {
      ping: { status: "pending", message: "" },
      tables: { status: "pending", message: "", data: null },
      auth: { status: "pending", message: "" }
    },
    tableChecks: {
      vehicles: { status: "pending", exists: false, message: "" },
      vehicle_specs: { status: "pending", exists: false, message: "" },
      user_profiles: { status: "pending", exists: false, message: "" }
    },
    corsCheck: { status: "pending", message: "" },
    projectStatus: { status: "pending", message: "" }
  });

  useEffect(() => {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    setDiagnostics(prev => ({
      ...prev,
      envVars: {
        supabaseUrl: supabaseUrl || "Not found",
        supabaseKeyPartial: supabaseKey ? `${supabaseKey.substring(0, 10)}...` : "Not found",
        complete: !!(supabaseUrl && supabaseKey)
      },
      clientInitialized: isSupabaseInitialized(),
      initError: getSupabaseInitError()
    }));

  }, []);

  const runDiagnostics = async () => {
    if (!isSupabaseInitialized()) {
      return;
    }

    // Test 1: Connection test using our helper function
    try {
      setDiagnostics(prev => ({
        ...prev,
        apiTests: {
          ...prev.apiTests,
          ping: { status: "running", message: "Testing connection..." }
        }
      }));

      const connectionResult = await testSupabaseConnection();
      
      setDiagnostics(prev => ({
        ...prev,
        apiTests: {
          ...prev.apiTests,
          ping: { 
            status: connectionResult.success ? "success" : "error", 
            message: connectionResult.success ? "Connection successful" : `Error: ${connectionResult.error}` 
          }
        }
      }));
    } catch (error) {
      setDiagnostics(prev => ({
        ...prev,
        apiTests: {
          ...prev.apiTests,
          ping: { 
            status: "error", 
            message: `Exception: ${error.message}` 
          }
        }
      }));
    }

    // Test 2: Check if tables exist
    try {
      setDiagnostics(prev => ({
        ...prev,
        apiTests: {
          ...prev.apiTests,
          tables: { status: "running", message: "Checking tables...", data: null }
        }
      }));

      // Check critical tables
      const tablesToCheck = ['vehicles', 'vehicle_specs', 'user_profiles'];
      
      for (const tableName of tablesToCheck) {
        setDiagnostics(prev => ({
          ...prev,
          tableChecks: {
            ...prev.tableChecks,
            [tableName]: { status: "running", exists: false, message: `Checking if '${tableName}' exists...` }
          }
        }));
        
        try {
          const tableCheck = await checkTableExists(tableName);
          
          setDiagnostics(prev => ({
            ...prev,
            tableChecks: {
              ...prev.tableChecks,
              [tableName]: { 
                status: tableCheck.error ? "error" : "success",
                exists: tableCheck.exists,
                message: tableCheck.error 
                  ? `Error checking '${tableName}': ${tableCheck.error}` 
                  : tableCheck.exists 
                    ? `Table '${tableName}' exists` 
                    : `Table '${tableName}' does not exist`
              }
            }
          }));
        } catch (error) {
          setDiagnostics(prev => ({
            ...prev,
            tableChecks: {
              ...prev.tableChecks,
              [tableName]: { 
                status: "error",
                exists: false,
                message: `Exception checking '${tableName}': ${error.message}`
              }
            }
          }));
        }
      }
      
      // Try to get a sample of data
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .limit(1);
      
      setDiagnostics(prev => ({
        ...prev,
        apiTests: {
          ...prev.apiTests,
          tables: { 
            status: error ? "error" : "success", 
            message: error ? `Error: ${error.message}` : "Table query successful",
            data: data
          }
        }
      }));
    } catch (error) {
      setDiagnostics(prev => ({
        ...prev,
        apiTests: {
          ...prev.apiTests,
          tables: { 
            status: "error", 
            message: `Exception: ${error.message}`,
            data: null
          }
        }
      }));
    }

    // Test 3: CORS Check
    try {
      setDiagnostics(prev => ({
        ...prev,
        corsCheck: { status: "running", message: "Testing CORS configuration..." }
      }));

      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/vehicles?select=id&limit=1`, {
        method: 'GET',
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          'Content-Type': 'application/json'
        }
      });
      
      setDiagnostics(prev => ({
        ...prev,
        corsCheck: { 
          status: response.ok ? "success" : "error", 
          message: response.ok ? "CORS is configured correctly" : `CORS issue: ${response.statusText}`
        }
      }));
    } catch (error) {
      setDiagnostics(prev => ({
        ...prev,
        corsCheck: { 
          status: "error", 
          message: `CORS exception: ${error.message}`
        }
      }));
    }

    // Test 4: Project Status
    try {
      setDiagnostics(prev => ({
        ...prev,
        projectStatus: { status: "running", message: "Checking project status..." }
      }));

      // Try a public endpoint that doesn't require auth
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`);
      
      setDiagnostics(prev => ({
        ...prev,
        projectStatus: { 
          status: response.ok ? "success" : "warning", 
          message: response.ok ? "Project is active" : `Project might be paused: ${response.statusText}`
        }
      }));
    } catch (error) {
      setDiagnostics(prev => ({
        ...prev,
        projectStatus: { 
          status: "error", 
          message: `Cannot reach project: ${error.message}`
        }
      }));
    }
  };

  const StatusBadge = ({ status }) => {
    const colorMap = {
      pending: "bg-gray-500",
      running: "bg-blue-500 animate-pulse",
      success: "bg-green-500",
      warning: "bg-yellow-500",
      error: "bg-red-500"
    };

    const labelMap = {
      pending: "Pending",
      running: "Running",
      success: "Success",
      warning: "Warning",
      error: "Failed"
    };

    return (
      <Badge className={`${colorMap[status]}`}>
        {labelMap[status]}
      </Badge>
    );
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Supabase Connection Diagnostics</CardTitle>
        <CardDescription>Detailed diagnostics for Supabase connection issues</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {diagnostics.initError && (
          <Alert variant="destructive" className="mb-4">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Initialization Error</AlertTitle>
            <AlertDescription>
              {diagnostics.initError}
            </AlertDescription>
          </Alert>
        )}
      
        <div>
          <h3 className="text-lg font-medium mb-2">Environment Variables</h3>
          <div className="grid grid-cols-1 gap-1">
            <div className="flex justify-between">
              <span className="font-mono">NEXT_PUBLIC_SUPABASE_URL:</span>
              <span className={diagnostics.envVars.supabaseUrl === "Not found" ? "text-red-500" : "text-green-500 font-mono"}>
                {diagnostics.envVars.supabaseUrl}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>
              <span className={diagnostics.envVars.supabaseKeyPartial === "Not found" ? "text-red-500" : "text-green-500 font-mono"}>
                {diagnostics.envVars.supabaseKeyPartial}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Supabase Client</h3>
            <StatusBadge status={diagnostics.clientInitialized ? "success" : "error"} />
          </div>
          <p className="text-sm text-muted-foreground">
            {diagnostics.clientInitialized 
              ? "Supabase client initialized successfully" 
              : "Failed to initialize Supabase client - check console for errors"}
          </p>
        </div>

        <Separator />

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">API Connection</h3>
            <StatusBadge status={diagnostics.apiTests.ping.status} />
          </div>
          <p className="text-sm text-muted-foreground">
            {diagnostics.apiTests.ping.message}
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Required Tables</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(diagnostics.tableChecks).map(([tableName, check]) => (
              <div key={tableName} className="flex justify-between items-center border-b pb-2">
                <span className="font-mono">{tableName}</span>
                <div className="flex gap-2 items-center">
                  {check.exists && <Badge variant="outline" className="bg-green-100">Exists</Badge>}
                  {check.status !== "pending" && <StatusBadge status={check.status} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Data Query</h3>
            <StatusBadge status={diagnostics.apiTests.tables.status} />
          </div>
          <p className="text-sm text-muted-foreground">
            {diagnostics.apiTests.tables.message}
          </p>
          {diagnostics.apiTests.tables.data && (
            <div className="mt-2 p-2 bg-muted rounded-md overflow-x-auto">
              <pre className="text-xs">{JSON.stringify(diagnostics.apiTests.tables.data, null, 2)}</pre>
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">CORS Configuration</h3>
            <StatusBadge status={diagnostics.corsCheck.status} />
          </div>
          <p className="text-sm text-muted-foreground">
            {diagnostics.corsCheck.message}
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Project Status</h3>
            <StatusBadge status={diagnostics.projectStatus.status} />
          </div>
          <p className="text-sm text-muted-foreground">
            {diagnostics.projectStatus.message}
          </p>
        </div>

      </CardContent>
      <CardFooter>
        <Button 
          onClick={runDiagnostics} 
          disabled={!diagnostics.envVars.complete || !diagnostics.clientInitialized}
        >
          Run Diagnostics
        </Button>
      </CardFooter>
    </Card>
  );
} 