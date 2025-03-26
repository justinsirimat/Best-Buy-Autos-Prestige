"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Home, 
  Car, 
  Users, 
  Phone, 
  CreditCard, 
  Shield, 
  Tool, 
  LogIn, 
  Lock, 
  FileText,
  Info
} from "lucide-react";

export default function SitemapPage() {
  const siteLinks = [
    {
      category: "Main Pages",
      icon: <Home className="h-5 w-5 text-primary" />,
      links: [
        { href: "/", label: "Home" },
        { href: "/inventory", label: "Inventory / Browse Cars" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact Us" },
      ]
    },
    {
      category: "Vehicle Services",
      icon: <Car className="h-5 w-5 text-primary" />,
      links: [
        { href: "/services", label: "Auto Services" },
        { href: "/finance", label: "Financing" },
        { href: "/trade-in", label: "Trade-In" },
      ]
    },
    {
      category: "Account Pages",
      icon: <Users className="h-5 w-5 text-primary" />,
      links: [
        { href: "/login", label: "Login" },
        { href: "/forgot-password", label: "Forgot Password" },
        { href: "/reset-password", label: "Reset Password" },
      ]
    },
    {
      category: "Legal Information",
      icon: <FileText className="h-5 w-5 text-primary" />,
      links: [
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/terms-of-service", label: "Terms of Service" },
        { href: "/sitemap", label: "Sitemap" },
      ]
    },
    {
      category: "Information Pages",
      icon: <Info className="h-5 w-5 text-primary" />,
      links: [
        { href: "/testimonials", label: "Testimonials" },
        { href: "/faq", label: "FAQ" },
        { href: "/blog", label: "Blog" },
        { href: "/careers", label: "Careers" },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-6">Sitemap</h1>
            <p className="text-lg text-muted-foreground mb-12">
              Find all the pages available on our website organized by category.
            </p>
            
            <div className="grid gap-12">
              {siteLinks.map((category, index) => (
                <motion.div 
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {category.icon}
                    <h2 className="text-2xl font-bold">{category.category}</h2>
                  </div>
                  <Separator className="mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                    {category.links.map((link) => (
                      <Link 
                        key={link.href}
                        href={link.href}
                        className="text-lg hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Feel free to contact us.
              </p>
              <Button asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 