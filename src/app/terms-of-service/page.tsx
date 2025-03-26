"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Scale, FileText } from "lucide-react";

export default function TermsOfServicePage() {
  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      content: "By accessing or using Best Buy Auto Prestige's website and services, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you should not use our services. Best Buy Auto Prestige reserves the right to update or modify these terms at any time without prior notice. Your continued use of our services following any changes constitutes your acceptance of the revised terms."
    },
    {
      id: "eligibility",
      title: "Eligibility",
      content: "You must be at least 18 years old and possess the legal authority to enter into agreements to use our services. By using our services, you represent and warrant that you meet these eligibility requirements."
    },
    {
      id: "account",
      title: "Account Creation and Responsibilities",
      content: "When creating an account on our website, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use or security breaches of your account."
    },
    {
      id: "vehicle-listings",
      title: "Vehicle Listings and Information",
      content: "Best Buy Auto Prestige strives to provide accurate vehicle information, including specifications, prices, and availability. However, we cannot guarantee the complete accuracy of all details. Vehicle listings on our website are subject to prior sale, and pricing is subject to change without notice. All vehicle purchases are subject to our Sales Agreement, which will be provided at our dealership."
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      content: "All content on our website, including text, graphics, logos, images, and software, is the property of Best Buy Auto Prestige or our content suppliers and is protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission."
    },
    {
      id: "prohibited-conduct",
      title: "Prohibited Conduct",
      content: "When using our services, you agree not to: (a) violate any applicable laws or regulations; (b) infringe upon the rights of others; (c) interfere with or disrupt our services; (d) attempt to gain unauthorized access to our systems; (e) transmit viruses or other harmful code; (f) use our services for any illegal or unauthorized purpose; or (g) engage in any activity that could damage, disable, or impair our services."
    },
    {
      id: "privacy",
      title: "Privacy and Data Protection",
      content: "Your use of our services is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information. By using our services, you consent to the collection and use of your information as described in our Privacy Policy."
    },
    {
      id: "disclaimers",
      title: "Disclaimers and Limitations of Liability",
      content: "Our services are provided on an 'as is' and 'as available' basis without warranties of any kind, either express or implied. To the fullest extent permitted by law, Best Buy Auto Prestige disclaims all warranties, including but not limited to merchantability, fitness for a particular purpose, and non-infringement. We will not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use our services."
    },
    {
      id: "indemnification",
      title: "Indemnification",
      content: "You agree to indemnify, defend, and hold harmless Best Buy Auto Prestige, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, or expenses, including reasonable attorneys' fees, arising from: (a) your use of our services; (b) your violation of these Terms of Service; (c) your violation of any rights of another; or (d) your conduct in connection with our services."
    },
    {
      id: "termination",
      title: "Termination",
      content: "Best Buy Auto Prestige reserves the right to terminate or suspend your access to our services, without prior notice or liability, for any reason, including if you breach these Terms of Service. Upon termination, your right to use our services will immediately cease."
    },
    {
      id: "governing-law",
      title: "Governing Law and Dispute Resolution",
      content: "These Terms of Service shall be governed by and construed in accordance with the laws of the state where Best Buy Auto Prestige is headquartered, without regard to its conflict of law provisions. Any dispute arising from or relating to these terms or our services shall be resolved exclusively in the state or federal courts located in that state."
    },
    {
      id: "miscellaneous",
      title: "Miscellaneous Provisions",
      content: "These Terms of Service constitute the entire agreement between you and Best Buy Auto Prestige regarding our services. If any provision of these terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect. Our failure to enforce any right or provision of these terms will not be considered a waiver of those rights."
    },
    {
      id: "contact",
      title: "Contact Information",
      content: "If you have any questions or concerns about these Terms of Service, please contact us at legal@bestbuyautoprestige.com or through our Contact page."
    }
  ];

  const lastUpdated = "January 1, 2023";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                <Link href="/" className="hover:underline">Home</Link>
                <span>/</span>
                <span>Terms of Service</span>
              </div>
              
              <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Please read these terms carefully before using our services. By accessing or using Best Buy Auto Prestige's website and services, you agree to be bound by these terms.
              </p>
              
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center text-sm text-muted-foreground">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>Last Updated: {lastUpdated}</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="#" onClick={() => window.print()}>
                    Print Terms
                  </a>
                </Button>
              </div>
              
              <Separator className="my-8" />
            </motion.div>
            
            {/* Table of Contents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-10"
            >
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sections.map((section, index) => (
                    <li key={index}>
                      <a 
                        href={`#${section.id}`}
                        className="flex items-center hover:text-primary transition-colors"
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        <span>{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
            
            {/* Terms Content */}
            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  id={section.id}
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="scroll-mt-28"
                >
                  <h2 className="text-2xl font-bold mb-4">
                    {index + 1}. {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                  {index < sections.length - 1 && <Separator className="mt-12" />}
                </motion.div>
              ))}
            </div>
            
            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-16 bg-muted/30 rounded-lg p-8 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Scale className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3">Have Questions About Our Terms?</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                If you have any questions or concerns about our Terms of Service, please don't hesitate to reach out to our customer service team.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/privacy-policy">
                    Privacy Policy
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 