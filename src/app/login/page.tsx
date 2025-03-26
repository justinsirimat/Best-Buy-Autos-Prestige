"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { supabase, isSupabaseInitialized } from "@/lib/supabase";
import { Mail, KeyRound, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  
  // Register form state
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", content: "" });
    
    if (!loginData.email || !loginData.password) {
      setMessage({ type: "error", content: "Please fill all fields" });
      setLoading(false);
      return;
    }
    
    try {
      if (!isSupabaseInitialized()) {
        console.log("Login simulation - Supabase not initialized");
        // Simulate successful login for demo purposes
        router.push("/dashboard");
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });
      
      if (error) {
        throw error;
      }
      
      setMessage({ type: "success", content: "Login successful. Redirecting..." });
      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.error("Login error:", error);
      setMessage({ type: "error", content: error.message || "Failed to login. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", content: "" });
    
    if (!registerData.email || !registerData.password || !registerData.confirmPassword) {
      setMessage({ type: "error", content: "Please fill all fields" });
      setLoading(false);
      return;
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      setMessage({ type: "error", content: "Passwords do not match" });
      setLoading(false);
      return;
    }
    
    if (registerData.password.length < 6) {
      setMessage({ type: "error", content: "Password must be at least 6 characters" });
      setLoading(false);
      return;
    }
    
    try {
      if (!isSupabaseInitialized()) {
        console.log("Register simulation - Supabase not initialized");
        // Simulate successful registration for demo purposes
        setActiveTab("login");
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: registerData.email,
        password: registerData.password,
      });
      
      if (error) {
        throw error;
      }
      
      setMessage({ 
        type: "success", 
        content: "Registration successful. Please check your email to verify your account."
      });
      setActiveTab("login");
    } catch (error: any) {
      console.error("Registration error:", error);
      setMessage({ type: "error", content: error.message || "Failed to register. Please try again." });
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
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <Card className="border-none shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-center">
                  Welcome to Best Buy Auto
                </CardTitle>
                <CardDescription className="text-center">
                  Access your account to manage your car search and more
                </CardDescription>
                <TabsList className="grid grid-cols-2 mt-4">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
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
              
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit}>
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
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link 
                          href="/forgot-password" 
                          className="text-xs text-primary hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="password" 
                          type="password" 
                          className="pl-10"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Logging in..." : "Sign In"}
                    </Button>
                    
                    <div className="mt-6 text-center text-sm">
                      <span className="text-muted-foreground">Don't have an account? </span>
                      <button 
                        type="button"
                        className="text-primary hover:underline font-medium"
                        onClick={() => setActiveTab("register")}
                      >
                        Create account
                      </button>
                    </div>
                  </CardFooter>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegisterSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="register-email" 
                          type="email" 
                          placeholder="name@example.com" 
                          className="pl-10"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="register-password" 
                          type="password" 
                          className="pl-10"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="confirm-password" 
                          type="password" 
                          className="pl-10"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                    
                    <div className="mt-6 text-center text-sm">
                      <span className="text-muted-foreground">Already have an account? </span>
                      <button 
                        type="button"
                        className="text-primary hover:underline font-medium"
                        onClick={() => setActiveTab("login")}
                      >
                        Sign in
                      </button>
                    </div>
                  </CardFooter>
                </form>
              </TabsContent>
            </Card>
          </Tabs>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
} 