"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase, isSupabaseInitialized } from "@/lib/supabase";
import { KeyRound, ArrowLeft, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      try {
        if (!isSupabaseInitialized()) {
          console.log("Reset password simulation - Supabase not initialized");
          // Simulate session check for demo purposes
          setLoading(false);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/login');
        }
      } catch (error) {
        console.error("Error checking session:", error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage({ type: "error", content: "Passwords do not match" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", content: "" });

    try {
      if (!isSupabaseInitialized()) {
        console.log("Reset password simulation - Supabase not initialized");
        // Simulate successful password reset for demo purposes
        setMessage({ type: "success", content: "Your password has been reset successfully" });
        setTimeout(() => {
          router.push('/login');
        }, 3000);
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;
      
      setMessage({ type: "success", content: "Your password has been reset successfully" });
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error: any) {
      console.error("Password update error:", error);
      setMessage({ 
        type: "error", 
        content: error.message || "Failed to update password. Please try again." 
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
                Create New Password
              </CardTitle>
              <CardDescription className="text-center">
                Enter and confirm your new password
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
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Updating Password..." : "Update Password"}
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