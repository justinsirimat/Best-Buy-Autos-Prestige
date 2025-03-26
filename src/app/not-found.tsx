"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center pt-16 pb-16">
        <div className="container px-4 py-16">
          <div className="flex flex-col items-center text-center max-w-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-9xl font-bold text-primary mb-6"
            >
              404
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold mb-4"
            >
              Page Not Found
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              The page you are looking for doesn't exist or has been moved.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" asChild>
                <Link href="/">
                  <Home className="h-5 w-5 mr-2" />
                  Go Home
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild>
                <Link href="/inventory">
                  <Search className="h-5 w-5 mr-2" />
                  Browse Inventory
                </Link>
              </Button>
              
              <Button size="lg" variant="ghost" asChild>
                <Link href="/contact">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Contact Us
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16 p-8 bg-muted/50 rounded-lg max-w-md"
            >
              <h2 className="text-xl font-bold mb-4">Looking for something specific?</h2>
              <p className="text-muted-foreground mb-4">
                Check out these popular pages:
              </p>
              <ul className="space-y-2">
                <li>
                  <Link href="/inventory" className="text-primary hover:underline">
                    Browse our car inventory
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-primary hover:underline">
                    Explore our services
                  </Link>
                </li>
                <li>
                  <Link href="/finance" className="text-primary hover:underline">
                    Financing options
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-primary hover:underline">
                    Contact us
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 