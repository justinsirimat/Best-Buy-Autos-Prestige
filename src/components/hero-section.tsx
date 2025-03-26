"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Search, ShieldCheck, Clock, Tag } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-black z-0" 
        style={{
          backgroundImage: "url('/images/hero-car.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find Your Perfect <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">Luxury</span> Vehicle
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-300 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover premium and luxury vehicles at Best Buy Auto Prestige. Browse our extensive collection and experience exceptional service.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" asChild>
                <Link href="/inventory">
                  Browse Inventory
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20" asChild>
                <Link href="/contact">
                  <span>Contact Us</span>
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-red-500" />
                <span className="text-sm text-white">Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-red-500" />
                <span className="text-sm text-white">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-red-500" />
                <span className="text-sm text-white">Best Price Promise</span>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-background/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Quick Search</h2>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Brand</label>
                    <select className="w-full rounded-md border border-input bg-background p-2">
                      <option value="">All Brands</option>
                      <option value="audi">Audi</option>
                      <option value="bmw">BMW</option>
                      <option value="mercedes">Mercedes-Benz</option>
                      <option value="lexus">Lexus</option>
                      <option value="porsche">Porsche</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Model</label>
                    <select className="w-full rounded-md border border-input bg-background p-2">
                      <option value="">All Models</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Min Price</label>
                    <select className="w-full rounded-md border border-input bg-background p-2">
                      <option value="">No Min</option>
                      <option value="20000">$20,000</option>
                      <option value="30000">$30,000</option>
                      <option value="50000">$50,000</option>
                      <option value="75000">$75,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Max Price</label>
                    <select className="w-full rounded-md border border-input bg-background p-2">
                      <option value="">No Max</option>
                      <option value="50000">$50,000</option>
                      <option value="75000">$75,000</option>
                      <option value="100000">$100,000</option>
                      <option value="150000">$150,000+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Body Type</label>
                  <select className="w-full rounded-md border border-input bg-background p-2">
                    <option value="">All Types</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="coupe">Coupe</option>
                    <option value="convertible">Convertible</option>
                  </select>
                </div>
                <Button size="lg" className="w-full mt-2">
                  <Search className="mr-2 h-4 w-4" />
                  Search Vehicles
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 