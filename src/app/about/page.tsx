"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  BarChart3, 
  Users, 
  Gem, 
  Award, 
  Handshake, 
  ThumbsUp, 
  Car, 
  HeartHandshake, 
  BadgeCheck, 
  ChevronRight
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    { value: "15+", label: "Years in Business" },
    { value: "1,000+", label: "Vehicles Sold" },
    { value: "200+", label: "Premium Models" },
    { value: "98%", label: "Customer Satisfaction" }
  ];
  
  const values = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Quality Assurance",
      description: "Every vehicle undergoes a rigorous 150-point inspection to ensure premium quality."
    },
    {
      icon: <ThumbsUp className="h-8 w-8 text-primary" />,
      title: "Customer Satisfaction",
      description: "We prioritize your satisfaction above all, offering personalized service at every step."
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-primary" />,
      title: "Integrity & Transparency",
      description: "We believe in honest practices, clear communication, and no hidden fees."
    },
    {
      icon: <BadgeCheck className="h-8 w-8 text-primary" />,
      title: "Expertise",
      description: "Our team of automotive experts brings decades of industry knowledge and passion."
    }
  ];
  
  const teamMembers = [
    {
      name: "Michael Reynolds",
      position: "Founder & CEO",
      image: "/images/team/michael.jpg",
      bio: "With over 25 years in the luxury automotive industry, Michael founded Best Buy Auto Prestige with a vision to redefine the premium car buying experience."
    },
    {
      name: "Sarah Johnson",
      position: "Sales Director",
      image: "/images/team/sarah.jpg",
      bio: "Sarah brings 15 years of expertise in luxury vehicle sales, ensuring clients find their perfect automotive match with unparalleled service."
    },
    {
      name: "David Chen",
      position: "Service Manager",
      image: "/images/team/david.jpg",
      bio: "David leads our service department with meticulous attention to detail and a commitment to maintaining the highest standards for every vehicle."
    },
    {
      name: "Emily Parker",
      position: "Customer Experience Manager",
      image: "/images/team/emily.jpg",
      bio: "Emily ensures every client interaction exceeds expectations, from the first showroom visit through the entire ownership journey."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Hero section */}
        <section className="relative overflow-hidden py-20 bg-muted/30">
          <div className="container px-4 mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-bold mb-6">About Best Buy Auto Prestige</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  For over 15 years, we've been the premier destination for luxury and premium vehicles in Australia, delivering exceptional service and unparalleled automotive expertise.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  Our mission is simple: to provide an extraordinary car buying experience that matches the excellence of the vehicles we offer.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link href="/inventory">
                      Browse Our Collection
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">
                      Get in Touch
                    </Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-lg overflow-hidden shadow-xl aspect-[4/3] lg:aspect-auto lg:h-[30rem]"
              >
                <Image
                  src="/images/about-hero.jpg"
                  alt="Luxury Car Showroom"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="container px-4 mx-auto mt-16"
          >
            <div className="bg-background rounded-lg shadow-lg py-8 px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* Our Story section */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <Separator className="mx-auto w-20 mb-6" />
              <p className="text-lg text-muted-foreground">
                Best Buy Auto Prestige was founded in 2008 with a clear vision: to transform the car buying experience for discerning automotive enthusiasts seeking premium vehicles.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4">From Humble Beginnings</h3>
                <p className="text-muted-foreground mb-6">
                  Starting with just five luxury vehicles and a small showroom, founder Michael Reynolds set out to create a dealership that would prioritize quality, transparency, and exceptional customer service above all else.
                </p>
                <p className="text-muted-foreground mb-6">
                  His philosophy was simple: treat each customer as an individual with unique needs and preferences, and curate an inventory of only the finest vehicles that meet the most stringent quality standards.
                </p>
                <h3 className="text-2xl font-bold mb-4 mt-10">Growing with Excellence</h3>
                <p className="text-muted-foreground">
                  Over the years, this unwavering commitment to excellence allowed us to expand to our current state-of-the-art facility, with a team of dedicated automotive experts and a collection of the world's most prestigious vehicles. Despite our growth, we maintain the personalized approach that defined our beginnings.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <div className="aspect-[4/3]">
                    <Image
                      src="/images/about-story.jpg"
                      alt="Our Dealership History"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-8 -left-8 w-2/3 rounded-lg overflow-hidden shadow-xl">
                  <div className="aspect-video">
                    <Image
                      src="/images/about-story2.jpg"
                      alt="Our Team"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our Values section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Our Values</h2>
              <Separator className="mx-auto w-20 mb-6" />
              <p className="text-lg text-muted-foreground">
                These core principles guide everything we do, from selecting our inventory to serving our valued clients.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Team section */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
              <Separator className="mx-auto w-20 mb-6" />
              <p className="text-lg text-muted-foreground">
                Our staff of automotive enthusiasts brings decades of combined expertise to deliver an exceptional experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full overflow-hidden">
                    <div className="relative h-72">
                      <div className="absolute inset-0 bg-muted flex items-center justify-center">
                        <Users className="h-12 w-12 text-muted-foreground" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-primary text-sm mb-4">{member.position}</p>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 bg-primary/5 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Experience the Best Buy Difference</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Visit our showroom today to explore our premium collection and discover the perfect vehicle for your lifestyle.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/inventory">
                    Browse Inventory
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    Contact Us
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