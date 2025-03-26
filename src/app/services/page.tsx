"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Wrench, 
  Shield, 
  Clock, 
  Sparkles, 
  Car, 
  ClipboardCheck, 
  Gauge, 
  RotateCcw, 
  HeartHandshake,
  Brush,
  Hammer,
  MapPin,
  Calendar,
  CircleDollarSign
} from "lucide-react";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("maintenance");
  
  const services = [
    {
      id: "maintenance",
      title: "Maintenance Services",
      description: "Keep your luxury vehicle in pristine condition with our comprehensive maintenance services",
      icon: <Wrench className="h-8 w-8" />,
      items: [
        {
          title: "Scheduled Maintenance",
          description: "Factory-recommended service intervals to maintain your vehicle's warranty and optimal performance",
          icon: <Calendar className="h-6 w-6 text-primary" />,
          features: [
            "Comprehensive multi-point inspection",
            "Oil and filter change with premium synthetic oils",
            "Fluid checks and top-offs",
            "Filter replacements",
            "Computer diagnostics",
            "Software updates"
          ],
          popular: true,
          cta: "Schedule Service"
        },
        {
          title: "Brake System Service",
          description: "Ensure optimal stopping power and safety with our premium brake services",
          icon: <CircleDollarSign className="h-6 w-6 text-primary" />,
          features: [
            "Brake pad replacement",
            "Rotor inspection and resurfacing",
            "Caliper service and replacement",
            "Brake fluid flush",
            "ABS system diagnostics",
            "Complete brake system inspection"
          ],
          popular: false,
          cta: "Schedule Service"
        },
        {
          title: "Fluid Services",
          description: "Extend the life of your vehicle's components with regular fluid maintenance",
          icon: <Gauge className="h-6 w-6 text-primary" />,
          features: [
            "Transmission fluid flush",
            "Coolant system service",
            "Power steering fluid service",
            "Differential fluid service",
            "Brake fluid flush",
            "Air conditioning system service"
          ],
          popular: false,
          cta: "Schedule Service"
        }
      ]
    },
    {
      id: "detailing",
      title: "Detailing Services",
      description: "Premium detailing services to keep your luxury vehicle looking showroom-new",
      icon: <Brush className="h-8 w-8" />,
      items: [
        {
          title: "Executive Detail Package",
          description: "Our comprehensive detail package for the discerning vehicle owner",
          icon: <Sparkles className="h-6 w-6 text-primary" />,
          features: [
            "Hand wash and dry",
            "Clay bar treatment",
            "Machine polish and paint correction",
            "Carnauba wax application",
            "Interior deep cleaning",
            "Leather conditioning",
            "Engine bay detail"
          ],
          popular: true,
          cta: "Book Detailing"
        },
        {
          title: "Ceramic Coating",
          description: "Long-lasting protection for your vehicle's paint with our premium ceramic coatings",
          icon: <Shield className="h-6 w-6 text-primary" />,
          features: [
            "Surface preparation and decontamination",
            "Paint correction",
            "Professional ceramic coating application",
            "Up to 5 years of protection",
            "Enhanced gloss and depth",
            "Hydrophobic properties",
            "Resistance to chemical stains and UV damage"
          ],
          popular: false,
          cta: "Book Detailing"
        },
        {
          title: "Interior Rejuvenation",
          description: "Restore your vehicle's interior to like-new condition",
          icon: <HeartHandshake className="h-6 w-6 text-primary" />,
          features: [
            "Deep vacuuming of all surfaces",
            "Leather cleaning and conditioning",
            "Carpet shampooing",
            "Air vent cleaning",
            "Dashboard and trim restoration",
            "Window and mirror cleaning",
            "Odor elimination"
          ],
          popular: false,
          cta: "Book Detailing"
        }
      ]
    },
    {
      id: "repairs",
      title: "Repair Services",
      description: "Expert repair services for all luxury vehicle makes and models",
      icon: <Hammer className="h-8 w-8" />,
      items: [
        {
          title: "Diagnostic Services",
          description: "Cutting-edge diagnostic technology to identify and resolve issues",
          icon: <ClipboardCheck className="h-6 w-6 text-primary" />,
          features: [
            "Advanced computer diagnostics",
            "Electrical system testing",
            "Check engine light diagnosis",
            "Performance issue analysis",
            "Noise, vibration, and harshness assessment",
            "Comprehensive inspection report"
          ],
          popular: true,
          cta: "Schedule Repair"
        },
        {
          title: "Mechanical Repairs",
          description: "Comprehensive repair services from our master technicians",
          icon: <Wrench className="h-6 w-6 text-primary" />,
          features: [
            "Engine repair and rebuilding",
            "Transmission repair and replacement",
            "Suspension and steering system repairs",
            "Cooling system service",
            "Exhaust system repair",
            "Drivetrain repairs"
          ],
          popular: false,
          cta: "Schedule Repair"
        },
        {
          title: "Electrical Repairs",
          description: "Expert solutions for complex electrical systems in modern luxury vehicles",
          icon: <RotateCcw className="h-6 w-6 text-primary" />,
          features: [
            "Entertainment system repairs",
            "Navigation system service",
            "Advanced driver assistance system calibration",
            "Battery and charging system repair",
            "Lighting system service",
            "Computer module programming"
          ],
          popular: false,
          cta: "Schedule Repair"
        }
      ]
    },
    {
      id: "custom",
      title: "Customization",
      description: "Personalize your luxury vehicle with our premium customization services",
      icon: <Sparkles className="h-8 w-8" />,
      items: [
        {
          title: "Performance Upgrades",
          description: "Elevate your vehicle's performance with our expert tuning services",
          icon: <Gauge className="h-6 w-6 text-primary" />,
          features: [
            "Engine performance tuning",
            "Exhaust system upgrades",
            "Suspension enhancements",
            "Brake system upgrades",
            "Intake system modifications",
            "Custom dyno tuning"
          ],
          popular: true,
          cta: "Customize Vehicle"
        },
        {
          title: "Appearance Enhancements",
          description: "Transform your vehicle's look with our custom aesthetic upgrades",
          icon: <Car className="h-6 w-6 text-primary" />,
          features: [
            "Custom wheels and tires",
            "Body kit installation",
            "Window tinting",
            "Paint protection film",
            "Vinyl wraps",
            "Interior customization",
            "Lighting upgrades"
          ],
          popular: false,
          cta: "Customize Vehicle"
        },
        {
          title: "Technology Integration",
          description: "Upgrade your vehicle with the latest technology features",
          icon: <Sparkles className="h-6 w-6 text-primary" />,
          features: [
            "Audio system upgrades",
            "Smartphone integration",
            "Advanced security systems",
            "Radar and laser detection",
            "Backup camera installation",
            "Parking sensor installation",
            "Custom lighting effects"
          ],
          popular: false,
          cta: "Customize Vehicle"
        }
      ]
    }
  ];
  
  const benefits = [
    {
      title: "Factory-Trained Technicians",
      description: "Our technicians are certified and trained specifically for luxury vehicles",
      icon: <ClipboardCheck className="h-8 w-8 text-primary" />
    },
    {
      title: "Genuine Parts",
      description: "We use only genuine OEM parts to maintain your vehicle's integrity",
      icon: <Shield className="h-8 w-8 text-primary" />
    },
    {
      title: "State-of-the-Art Facility",
      description: "Our service center features the latest tools and diagnostic equipment",
      icon: <Wrench className="h-8 w-8 text-primary" />
    },
    {
      title: "Concierge Service",
      description: "Complimentary pickup and delivery for scheduled service appointments",
      icon: <Car className="h-8 w-8 text-primary" />
    },
    {
      title: "Loaner Vehicles",
      description: "Luxury loaner vehicles available for extended service visits",
      icon: <RotateCcw className="h-8 w-8 text-primary" />
    },
    {
      title: "Digital Updates",
      description: "Receive real-time updates on your vehicle's service progress",
      icon: <Clock className="h-8 w-8 text-primary" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 bg-muted/30">
          <div className="container px-4 mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-bold mb-6">Luxury Vehicle Services</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Experience the highest standard of care for your premium vehicle at Best Buy Auto Prestige. Our expert technicians and state-of-the-art facility ensure your luxury automobile receives the attention it deserves.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <a href="#services">
                      Explore Services
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">
                      Schedule Service
                    </Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-lg overflow-hidden shadow-xl h-80"
              >
                <Image
                  src="/images/services-hero.jpg"
                  alt="Luxury Vehicle Service"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10"></div>
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-background/90 backdrop-blur-sm rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Expert Care</h3>
                  <p className="text-sm text-muted-foreground">
                    Factory-trained technicians for all luxury brands
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-6"
              >
                The Prestige Difference
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground"
              >
                We offer a service experience as exceptional as the vehicles we care for
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-lg p-6 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="services" className="py-20 bg-muted/30 scroll-mt-24">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Services</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Comprehensive services designed specifically for luxury vehicles
              </p>
            </div>
            
            <Tabs 
              defaultValue="maintenance" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="max-w-5xl mx-auto"
            >
              <TabsList className="grid w-full grid-cols-4">
                {services.map(service => (
                  <TabsTrigger key={service.id} value={service.id}>
                    <div className="flex flex-col items-center">
                      <div className="mb-2">{service.icon}</div>
                      <span>{service.title}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {services.map(service => (
                <TabsContent key={service.id} value={service.id} className="mt-8">
                  <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {service.items.map((item, index) => (
                      <Card key={index} className={`overflow-hidden ${item.popular ? 'border-primary shadow-lg' : ''}`}>
                        {item.popular && (
                          <div className="bg-primary text-primary-foreground text-xs font-medium text-center py-1">
                            MOST POPULAR
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              {item.icon}
                            </div>
                          </div>
                          <CardTitle className="mt-4">{item.title}</CardTitle>
                          <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {item.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <div className="mr-2 mt-0.5 text-primary">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                </div>
                                <span className="text-sm text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" asChild>
                            <Link href="/contact">
                              {item.cta}
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
        
        {/* Service Process */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-6"
              >
                Our Service Process
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground"
              >
                A streamlined approach designed with your convenience in mind
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: 1,
                  title: "Schedule Service",
                  description: "Book your appointment online, by phone, or in person",
                  icon: <Calendar className="h-10 w-10 text-primary" />
                },
                {
                  step: 2,
                  title: "Vehicle Drop-Off",
                  description: "Drop off your vehicle or use our complimentary pickup service",
                  icon: <Car className="h-10 w-10 text-primary" />
                },
                {
                  step: 3,
                  title: "Expert Service",
                  description: "Our technicians perform the requested services with precision",
                  icon: <Wrench className="h-10 w-10 text-primary" />
                },
                {
                  step: 4,
                  title: "Return & Review",
                  description: "Pick up your vehicle and review the completed services",
                  icon: <ClipboardCheck className="h-10 w-10 text-primary" />
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative text-center"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute top-8 left-1/2 w-full h-1 bg-primary/20 -z-10 hidden md:block"></div>
                  <span className="inline-block bg-primary text-primary-foreground text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Service Locations */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-6"
              >
                Service Locations
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground"
              >
                Visit one of our state-of-the-art service centers
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Main Service Center",
                  address: "123 Luxury Lane, Prestige City, CA 90210",
                  phone: "(555) 123-4567",
                  hours: "Monday - Friday: 7:30 AM - 6:00 PM\nSaturday: 9:00 AM - 5:00 PM\nSunday: Closed",
                  image: "/images/service-center-1.jpg"
                },
                {
                  name: "Downtown Express Center",
                  address: "456 Elite Avenue, Prestige City, CA 90211",
                  phone: "(555) 987-6543",
                  hours: "Monday - Friday: 8:00 AM - 7:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
                  image: "/images/service-center-2.jpg"
                }
              ].map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <div className="relative h-64 overflow-hidden rounded-t-lg">
                      <Image
                        src={location.image}
                        alt={location.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl font-bold">{location.name}</h3>
                      </div>
                    </div>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                          <span>{location.address}</span>
                        </div>
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                          <div className="whitespace-pre-line">
                            {location.hours}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline" asChild>
                        <Link href="/contact">
                          Schedule at This Location
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Experience Premium Service?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Schedule your service appointment today and discover the Best Buy Auto Prestige difference.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Schedule Service
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    Contact Service Advisor
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