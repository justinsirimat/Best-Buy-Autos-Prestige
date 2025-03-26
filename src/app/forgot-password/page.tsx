"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase, isSupabaseInitialized } from "@/lib/supabase";
import { Mail, ArrowLeft, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", content: "" });
    
    if (!email) {
      setMessage({ type: "error", content: "Please enter your email address" });
      setLoading(false);
      return;
    }
    
    try {
      if (!isSupabaseInitialized()) {
        console.log("Forgot password simulation - Supabase not initialized");
        // Simulate successful password reset request for demo purposes
        setMessage({ 
          type: "success", 
          content: "Password reset link sent to your email" 
        });
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      setMessage({ 
        type: "success", 
        content: "Password reset instructions sent to your email" 
      });
      setEmail("");
    } catch (error: any) {
      console.error("Password reset error:", error);
      setMessage({ 
        type: "error", 
        content: error.message || "Failed to send reset instructions. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-center">
                Reset Your Password
              </CardTitle>
              <CardDescription className="text-center">
                Enter your email and we'll send you instructions to reset your password
              </CardDescription>
            </CardHeader>
            
            {message.content && (
              <div className={`mx-6 p-3 mb-4 rounded-md flex items-center gap-2 text-sm ${
                message.type === "error" 
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" 
                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              }`}>
                {message.type === "error" ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                <span>{message.content}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending Instructions..." : "Send Reset Instructions"}
                </Button>
                
                <div className="mt-6 text-center">
                  <Link 
                    href="/login" 
                    className="flex items-center justify-center gap-1 text-sm text-primary hover:underline"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    Back to Login
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
} 