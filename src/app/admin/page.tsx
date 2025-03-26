"use client";  // Add this at the top to make it a Client Component

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import DatabaseTest from "./database-test";
import EnvCheck from "./env-check";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          <Separator className="mb-8" />
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Environment & Database</h2>
            <EnvCheck />
            <DatabaseTest />
            
            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-200 dark:border-yellow-800">
              <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300 mb-2">Troubleshooting Steps</h3>
              <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                <li>Make sure your Supabase project is active</li>
                <li>Check that your .env.local file contains correct URL and key</li>
                <li>Verify that you've executed the SQL setup script in the Supabase SQL Editor</li>
                <li>Check that you don't have any CORS restrictions in your Supabase settings</li>
                <li>Try restarting your Next.js development server</li>
              </ul>
              <div className="mt-4">
                <Button 
                  className="text-sm" 
                  variant="outline" 
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 