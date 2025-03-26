"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqCategories = [
    {
      id: "general",
      label: "General",
      faqs: [
        {
          question: "What sets Best Buy Auto Prestige apart from other dealerships?",
          answer: "Best Buy Auto Prestige specializes in premium and luxury vehicles, offering a curated selection of high-quality cars. Our dealership provides a personalized buying experience with knowledgeable staff, comprehensive vehicle history reports, and premium services including financing, maintenance, and detailing. We focus on building long-term relationships with our customers through exceptional service."
        },
        {
          question: "What are your business hours?",
          answer: "Our showroom is open Monday through Friday from 9:00 AM to 8:00 PM, Saturday from 10:00 AM to 6:00 PM, and Sunday from 11:00 AM to 5:00 PM. Our service department operates Monday through Friday from 8:00 AM to 6:00 PM and Saturday from 9:00 AM to 3:00 PM. We are closed on major holidays."
        },
        {
          question: "Do you offer test drives?",
          answer: "Yes, we offer test drives for all our vehicles. You can schedule a test drive appointment online through our website, by phone, or by visiting our dealership in person. We recommend scheduling in advance for specific vehicles to ensure availability. For certain high-value luxury cars, we may require additional verification before test drives."
        },
        {
          question: "Do you ship vehicles to other states or countries?",
          answer: "Yes, we offer domestic shipping to all 50 states and can arrange international shipping to select countries. Shipping costs will vary based on distance and method of transport. We work with reputable auto transport companies to ensure your vehicle arrives safely and in pristine condition. Please contact our sales team for a shipping quote and details."
        }
      ]
    },
    {
      id: "purchasing",
      label: "Purchasing",
      faqs: [
        {
          question: "What documentation do I need to purchase a vehicle?",
          answer: "To purchase a vehicle, you'll need a valid driver's license, proof of insurance, and payment or financing approval. If you're financing, additional documents may include proof of income, proof of residence, and banking information. For trade-ins, bring your current vehicle's registration, title (if you own it outright), and loan information if applicable."
        },
        {
          question: "Do you take trade-ins?",
          answer: "Yes, we accept trade-ins of all makes and models, not just luxury vehicles. Our appraisal process is transparent, and we strive to offer competitive values based on current market conditions, vehicle condition, service history, and demand. You can start the appraisal process online through our website or visit us for an in-person evaluation."
        },
        {
          question: "Can I buy a car online without visiting the dealership?",
          answer: "Yes, we offer a complete online purchasing process. You can browse our inventory, apply for financing, get a trade-in value, and complete all paperwork digitally. We offer virtual walkarounds of vehicles via video call, and once purchased, we can deliver the vehicle to your location. Our digital concierge is available to assist throughout the entire online buying process."
        },
        {
          question: "What warranties come with your vehicles?",
          answer: "Our new vehicles come with the manufacturer's warranty. Certified pre-owned vehicles include extended manufacturer warranties with specific terms. For used vehicles, any remaining original warranty will transfer to you. We also offer extended warranty options for additional coverage and peace of mind. All warranties and their terms are clearly outlined in the vehicle listing and sales documentation."
        }
      ]
    },
    {
      id: "financing",
      label: "Financing",
      faqs: [
        {
          question: "What financing options do you offer?",
          answer: "We offer various financing options including traditional auto loans, lease agreements, and balloon payment plans. We work with multiple lenders, including major banks, credit unions, and specialized luxury vehicle financiers, to secure competitive rates and terms. Our finance team can customize a financing solution based on your preferences, down payment, term length, and financial situation."
        },
        {
          question: "Can I get pre-approved for financing before visiting?",
          answer: "Yes, you can apply for pre-approval through our website or by contacting our finance department. Pre-approval takes approximately 24-48 hours and is valid for 30 days. This process helps you establish a budget and streamlines the purchasing process. Pre-approval does not obligate you to purchase a vehicle or accept specific financing terms."
        },
        {
          question: "Do you offer financing for customers with less-than-perfect credit?",
          answer: "Yes, we work with lenders who specialize in various credit situations. While prime rates are available for excellent credit, we have programs for a wide range of credit profiles. Factors like down payment amount, vehicle selection, and loan term can help secure approval. Our finance team is experienced in finding solutions for customers across the credit spectrum."
        },
        {
          question: "What lease options are available?",
          answer: "We offer flexible lease terms typically ranging from 24 to 48 months with various mileage allowances (from 7,500 to 15,000 miles per year). Lease specials are available on select models and change monthly. We also offer single-payment leases and lease-to-own options. Our lease agreements include options for lease-end purchases and early lease terminations."
        }
      ]
    },
    {
      id: "services",
      label: "Services",
      faqs: [
        {
          question: "What services does your maintenance department offer?",
          answer: "Our service department offers comprehensive maintenance and repair services including routine maintenance (oil changes, tire rotations, brake service), diagnostics and repairs, factory-scheduled maintenance, performance upgrades, and detailing services. All service is performed by factory-trained technicians using OEM parts. We also offer a convenient pickup and delivery service for maintenance appointments."
        },
        {
          question: "Do you offer loaner vehicles during service?",
          answer: "Yes, complimentary loaner vehicles are available for customers when service is expected to take more than two hours. Loaners should be reserved in advance when scheduling your service appointment. We also offer a shuttle service within a 10-mile radius of our dealership and have a comfortable waiting lounge with amenities for shorter service visits."
        },
        {
          question: "What detailing services do you provide?",
          answer: "We offer several levels of detailing services ranging from basic wash and vacuum to complete interior and exterior detailing. Our premium detailing includes paint correction, ceramic coating application, leather conditioning, and engine bay cleaning. We use only high-quality products designed specifically for luxury vehicles to maintain their appearance and value."
        },
        {
          question: "Can I get accessories installed after purchasing my vehicle?",
          answer: "Yes, we offer a wide range of genuine accessories and aftermarket options that can be installed at our dealership. These include technology upgrades, appearance enhancements, performance modifications, and protection packages. All installations are performed by our trained technicians to ensure proper fit and function without compromising your vehicle's warranty or integrity."
        }
      ]
    }
  ];
  
  const allFaqs = faqCategories.flatMap(category => category.faqs);
  
  const filteredFaqs = searchQuery.trim() === "" 
    ? [] 
    : allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Hero section */}
        <section className="relative overflow-hidden py-20 bg-muted/30">
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-6"
              >
                Frequently Asked Questions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-muted-foreground mb-8"
              >
                Find answers to common questions about our vehicles, services, and processes.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative max-w-xl mx-auto"
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Search for questions..." 
                  className="pl-10 py-6 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Search Results */}
        {searchQuery.trim() !== "" && (
          <section className="py-12">
            <div className="container px-4 mx-auto">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">
                  Search Results for "{searchQuery}"
                </h2>
                
                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground mb-6">
                      No questions found matching your search.
                    </p>
                    <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`search-${index}`}>
                        <AccordionTrigger className="text-left text-lg font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
                
                {filteredFaqs.length > 0 && (
                  <div className="mt-6 text-center">
                    <Button variant="outline" onClick={() => setSearchQuery("")}>
                      Clear Search
                    </Button>
                  </div>
                )}
                
                <Separator className="my-12" />
              </div>
            </div>
          </section>
        )}
        
        {/* FAQ Tabs */}
        <section className="py-12">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                  {faqCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {faqCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="mt-8">
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`${category.id}-${index}`}>
                          <AccordionTrigger className="text-left text-lg font-medium">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Contact CTA */}
        <section className="py-16 bg-primary/5 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our team is ready to assist you with any additional questions or concerns you may have.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">
                    Learn About Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 