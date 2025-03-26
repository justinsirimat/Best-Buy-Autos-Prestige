"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight } from "lucide-react";

export function AboutSection() {
  const features = [
    "Premium & luxury vehicles",
    "Thorough vehicle inspection",
    "Certified pre-owned options",
    "Transparent pricing policy",
    "Extended warranty packages",
    "Professional customer service",
    "Secure financing options",
    "Trade-in program"
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-[16/10]">
                <Image
                  src="/images/dealership.jpg"
                  alt="Best Buy Auto Prestige Dealership"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-3/4 rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-video">
                <Image
                  src="/images/luxury-cars.jpg"
                  alt="Luxury Cars"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">About Best Buy Auto Prestige</h2>
            <p className="text-lg text-muted-foreground mb-6">
              For over 15 years, Best Buy Auto Prestige has been the leading destination for premium and luxury vehicles. We pride ourselves on offering exceptional service and a curated selection of high-quality automobiles.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Our team of expert professionals is dedicated to helping you find the perfect vehicle that matches your lifestyle and preferences. We ensure every car in our inventory meets strict quality standards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button size="lg" asChild>
              <Link href="/about">
                Learn More About Us
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 