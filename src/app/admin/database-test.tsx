/**
 * Database Test Component
 * 
 * A React component that provides a user interface for testing the Supabase database connection
 * and verifying the existence of required database tables. This component is part of the
 * admin dashboard and helps diagnose connection issues.
 * 
 * Features:
 * - Tests database connectivity
 * - Verifies table existence
 * - Provides visual feedback on test results
 * - Handles loading states and errors
 */

"use client";

import { useState } from 'react';
import { testSupabaseConnection, checkTableExists } from '@/lib/test-connection';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';

// Define the shape of our test results
interface TestResult {
  success?: boolean;    // Whether the connection test passed
  error?: string;       // Error message if any
  tableExists?: boolean; // Whether required tables exist
}

/**
 * DatabaseTest Component
 * 
 * Provides a user interface for testing database connectivity and structure.
 * Uses the test-connection utilities to perform actual tests.
 */
export default function DatabaseTest() {
  // State for managing loading state and test results
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<TestResult>({});

  /**
   * Runs the database connection and table existence tests
   * Updates the UI with the results of each test phase
   */
  const runTest = async () => {
    setIsLoading(true);
    try {
      // Phase 1: Test basic database connectivity
      const connectionResult = await testSupabaseConnection();
      
      // If connection fails, show error and stop
      if (!connectionResult.success) {
        setTestResult({
          success: false,
          error: connectionResult.error
        });
        return;
      }

      // Phase 2: Verify required tables exist
      const tableResult = await checkTableExists('vehicles');
      
      // Update UI with complete test results
      setTestResult({
        success: true,
        tableExists: tableResult.exists,
        error: tableResult.error
      });
    } catch (error: any) {
      // Handle any unexpected errors
      setTestResult({
        success: false,
        error: error.message || 'An unexpected error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Test trigger button with loading state */}
      <Button 
        onClick={runTest} 
        disabled={isLoading}
      >
        {isLoading ? 'Testing...' : 'Test Database Connection'}
      </Button>

      {/* Conditional rendering of test results */}
      {testResult.success !== undefined && (
        <Alert variant={testResult.success ? "default" : "destructive"}>
          {/* Status icon and title */}
          <div className="flex items-center gap-2">
            {testResult.success ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
            <AlertTitle>
              {testResult.success ? 'Connection Successful' : 'Connection Failed'}
            </AlertTitle>
          </div>
          
          {/* Detailed test results */}
          <AlertDescription className="mt-2">
            {testResult.error ? (
              testResult.error
            ) : testResult.tableExists ? (
              'All required tables are present in the database.'
            ) : (
              'Database is connected, but some required tables are missing.'
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
} 