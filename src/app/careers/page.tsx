"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Heart, 
  GraduationCap, 
  Award, 
  CreditCard,
  Coffee,
  Gamepad,
  Car
} from "lucide-react";

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState("sales");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
    position: ""
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const departments = [
    { id: "sales", label: "Sales" },
    { id: "service", label: "Service" },
    { id: "finance", label: "Finance" },
    { id: "admin", label: "Administrative" }
  ];
  
  const jobs = [
    {
      id: "1",
      title: "Luxury Vehicle Sales Consultant",
      department: "sales",
      location: "Prestige City",
      type: "Full-time",
      salary: "$60,000 - $120,000 + Commission",
      description: "As a Luxury Vehicle Sales Consultant, you'll work with high-end clientele to match them with their perfect luxury vehicle. You'll showcase premium automobiles, arrange test drives, and guide clients through the purchasing process.",
      responsibilities: [
        "Build relationships with prospective clients and maintain relationships with existing clients",
        "Demonstrate in-depth knowledge of our luxury vehicle inventory and features",
        "Arrange and conduct professional test drives",
        "Negotiate deals that satisfy both the client and the dealership",
        "Work with our finance team to complete sales transactions",
        "Meet or exceed monthly sales targets"
      ],
      requirements: [
        "Previous automotive sales experience preferred",
        "Strong communication and negotiation skills",
        "Professional appearance and demeanor",
        "Valid driver's license with clean record",
        "Ability to work evenings and weekends as needed",
        "Passion for luxury vehicles and automotive industry"
      ]
    },
    {
      id: "2",
      title: "Finance Manager",
      department: "finance",
      location: "Prestige City",
      type: "Full-time",
      salary: "$80,000 - $120,000 + Bonuses",
      description: "The Finance Manager plays a crucial role in our dealership, working directly with clients to finalize vehicle purchases and secure financing. You'll present financing options, extended warranties, and protection packages while ensuring compliance with all regulations.",
      responsibilities: [
        "Present and explain financing options to clients",
        "Process loan applications and work with various lending institutions",
        "Sell extended warranties and protection packages",
        "Ensure all paperwork is accurate and complete",
        "Maintain compliance with federal and state regulations",
        "Meet finance department goals"
      ],
      requirements: [
        "2+ years experience in automotive finance",
        "Knowledge of automotive lending practices and regulations",
        "Strong mathematical and analytical skills",
        "Excellent sales and negotiation abilities",
        "Detail-oriented with high accuracy in paperwork",
        "Valid finance license or ability to obtain one"
      ]
    },
    {
      id: "3",
      title: "Certified Luxury Vehicle Technician",
      department: "service",
      location: "Prestige City",
      type: "Full-time",
      salary: "$70,000 - $100,000 DOE",
      description: "Our Certified Technicians maintain and repair high-end luxury vehicles according to manufacturer specifications. You'll diagnose complex issues, perform repairs, and ensure each vehicle meets our premium standards before returning to the client.",
      responsibilities: [
        "Diagnose and repair sophisticated vehicle systems",
        "Perform routine maintenance according to manufacturer specifications",
        "Test drive vehicles to verify repairs",
        "Maintain detailed service records",
        "Stay current with new vehicle technologies and repair methods",
        "Work efficiently while maintaining attention to detail"
      ],
      requirements: [
        "ASE Certification required, luxury brand certifications preferred",
        "3+ years experience working on luxury vehicles",
        "Proficiency with computerized diagnostic equipment",
        "Knowledge of electrical systems and modern vehicle technology",
        "Clean driving record",
        "Own tools and toolbox"
      ]
    },
    {
      id: "4",
      title: "Customer Experience Manager",
      department: "admin",
      location: "Prestige City",
      type: "Full-time",
      salary: "$65,000 - $85,000",
      description: "The Customer Experience Manager oversees all client interactions to ensure an exceptional experience at every touchpoint. You'll implement processes, train staff, and personally handle VIP clients to maintain our reputation for outstanding service.",
      responsibilities: [
        "Develop and implement customer experience standards",
        "Train staff on customer service protocols",
        "Handle escalated customer concerns and feedback",
        "Organize client appreciation events",
        "Analyze customer satisfaction metrics",
        "Continuously improve the customer journey"
      ],
      requirements: [
        "Bachelor's degree in Business, Hospitality, or related field",
        "3+ years in customer service management, luxury retail preferred",
        "Excellent communication and problem-solving skills",
        "Experience with CRM systems",
        "Ability to work flexible hours including some weekends",
        "Passionate about delivering exceptional service"
      ]
    },
    {
      id: "5",
      title: "Detailing Specialist",
      department: "service",
      location: "Prestige City",
      type: "Full-time",
      salary: "$40,000 - $60,000",
      description: "Our Detailing Specialists are responsible for maintaining the pristine appearance of our luxury vehicles. You'll perform comprehensive cleaning, polishing, and protection services to ensure our inventory looks showroom-ready at all times.",
      responsibilities: [
        "Perform exterior washing, clay bar treatment, polishing, and waxing",
        "Deep clean and condition vehicle interiors",
        "Apply ceramic coatings and paint protection films",
        "Prepare new inventory and client vehicles for delivery",
        "Maintain detailing equipment and supplies",
        "Work efficiently while maintaining exceptional quality standards"
      ],
      requirements: [
        "1+ years of auto detailing experience, luxury vehicles preferred",
        "Knowledge of modern detailing techniques and products",
        "Attention to detail and commitment to quality",
        "Ability to stand for extended periods and work in various positions",
        "Valid driver's license with clean record",
        "Experience with ceramic coatings and paint correction a plus"
      ]
    },
    {
      id: "6",
      title: "Administrative Assistant",
      department: "admin",
      location: "Prestige City",
      type: "Full-time",
      salary: "$40,000 - $50,000",
      description: "The Administrative Assistant provides vital support to our management team and ensures smooth daily operations. You'll handle correspondence, coordinate schedules, maintain records, and assist with various administrative tasks.",
      responsibilities: [
        "Manage phone calls, emails, and correspondence",
        "Coordinate schedules and appointments",
        "Prepare and organize documentation",
        "Maintain filing systems and databases",
        "Assist with basic accounting and record-keeping",
        "Support managers and staff with administrative needs"
      ],
      requirements: [
        "Associate's degree or equivalent experience",
        "2+ years in administrative support roles",
        "Proficiency in Microsoft Office suite",
        "Excellent organizational and time management skills",
        "Strong written and verbal communication abilities",
        "Professional demeanor and discretion with confidential information"
      ]
    }
  ];
  
  const benefits = [
    {
      title: "Competitive Compensation",
      description: "Generous salary packages with performance-based incentives and regular reviews",
      icon: <DollarSign className="h-8 w-8 text-primary" />
    },
    {
      title: "Comprehensive Healthcare",
      description: "Medical, dental, and vision insurance with coverage options for family members",
      icon: <Heart className="h-8 w-8 text-primary" />
    },
    {
      title: "Professional Development",
      description: "Ongoing training, certification programs, and opportunities for advancement",
      icon: <GraduationCap className="h-8 w-8 text-primary" />
    },
    {
      title: "Employee Vehicle Program",
      description: "Special leasing options and employee discounts on vehicle purchases",
      icon: <Car className="h-8 w-8 text-primary" />
    },
    {
      title: "Retirement Planning",
      description: "401(k) plan with company matching to help secure your financial future",
      icon: <CreditCard className="h-8 w-8 text-primary" />
    },
    {
      title: "Work-Life Balance",
      description: "Paid time off, holidays, and flexible scheduling options when possible",
      icon: <Coffee className="h-8 w-8 text-primary" />
    }
  ];
  
  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = job.department === activeTab || activeTab === "all";
    const matchesSearch = searchTerm === "" || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDepartment && matchesSearch;
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.files?.[0] }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        resume: null,
        coverLetter: "",
        position: ""
      });
    }, 5000);
  };

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
                <h1 className="text-4xl font-bold mb-6">Join Our Team</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Build your career at Best Buy Auto Prestige. We're looking for passionate individuals to help deliver exceptional experiences to our luxury vehicle clients.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <a href="#open-positions">
                      View Open Positions
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="#application">
                      Apply Now
                    </a>
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
                  src="/images/careers-hero.jpg"
                  alt="Join Our Team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10"></div>
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-background/90 backdrop-blur-sm rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Growth Opportunities</h3>
                  <p className="text-sm text-muted-foreground">
                    Develop your skills and advance your career in a supportive environment
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Why Work With Us */}
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
                Why Work With Us
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground"
              >
                Join a team that values excellence, growth, and a positive work environment
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
        
        {/* Open Positions */}
        <section id="open-positions" className="py-20 bg-muted/30 scroll-mt-24">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="text-3xl font-bold mb-6">Open Positions</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Explore our current job openings and find the perfect role for your skills and passion
              </p>
              
              <div className="relative max-w-xl mx-auto mb-8">
                <Input
                  type="text"
                  placeholder="Search positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Briefcase className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <Tabs 
              defaultValue="sales" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="max-w-5xl mx-auto"
            >
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                {departments.map(dept => (
                  <TabsTrigger key={dept.id} value={dept.id}>{dept.label}</TabsTrigger>
                ))}
              </TabsList>
              
              <div className="mt-8">
                {filteredJobs.length === 0 ? (
                  <div className="text-center py-12 bg-background rounded-lg">
                    <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-bold mb-2">No positions found</h3>
                    <p className="text-muted-foreground mb-4">
                      We couldn't find any positions matching your search.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm("");
                        setActiveTab("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {filteredJobs.map((job) => (
                      <motion.div 
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex flex-wrap justify-between items-start gap-4">
                              <div>
                                <CardTitle className="text-xl">{job.title}</CardTitle>
                                <CardDescription className="mt-1">
                                  <div className="flex flex-wrap gap-4 items-center text-sm">
                                    <div className="flex items-center">
                                      <MapPin className="h-4 w-4 mr-1" />
                                      <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-1" />
                                      <span>{job.type}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <DollarSign className="h-4 w-4 mr-1" />
                                      <span>{job.salary}</span>
                                    </div>
                                  </div>
                                </CardDescription>
                              </div>
                              <Badge variant="outline" className="capitalize">
                                {job.department}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p>{job.description}</p>
                            
                            <div>
                              <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                              <ul className="list-disc list-inside space-y-1 pl-4">
                                {job.responsibilities.map((item, index) => (
                                  <li key={index} className="text-muted-foreground">{item}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">Requirements:</h4>
                              <ul className="list-disc list-inside space-y-1 pl-4">
                                {job.requirements.map((item, index) => (
                                  <li key={index} className="text-muted-foreground">{item}</li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              asChild
                              onClick={() => {
                                setFormData(prev => ({...prev, position: job.title}));
                                document.getElementById("application")?.scrollIntoView({behavior: "smooth"});
                              }}
                            >
                              <a href="#application">Apply Now</a>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </Tabs>
          </div>
        </section>
        
        {/* Application Form */}
        <section id="application" className="py-20 scroll-mt-24">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-6">Apply Now</h2>
                <p className="text-lg text-muted-foreground">
                  Submit your application and join our team of automotive professionals
                </p>
              </motion.div>
              
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg p-8 text-center"
                >
                  <Award className="h-12 w-12 text-green-600 dark:text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Application Received!</h3>
                  <p className="text-lg mb-4">
                    Thank you for your interest in joining the Best Buy Auto Prestige team. We'll review your application and contact you if there's a match.
                  </p>
                </motion.div>
              ) : (
                <Card>
                  <form onSubmit={handleSubmit}>
                    <CardHeader>
                      <CardTitle>Application Form</CardTitle>
                      <CardDescription>
                        Please fill out all required fields with accurate information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Position</Label>
                          <Input 
                            id="position" 
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <Label htmlFor="resume">Resume (PDF)</Label>
                        <Input 
                          id="resume" 
                          name="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          required
                        />
                        <p className="text-sm text-muted-foreground">
                          Accepted formats: PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="coverLetter">Cover Letter</Label>
                        <Textarea 
                          id="coverLetter" 
                          name="coverLetter"
                          rows={6}
                          placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                          value={formData.coverLetter}
                          onChange={handleChange}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                      <p className="text-sm text-muted-foreground mb-4 text-center">
                        By submitting this application, you consent to our team reviewing your information for employment consideration.
                      </p>
                      <Button type="submit" className="w-full">
                        Submit Application
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              )}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Have Questions?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                If you have any questions about our open positions or the application process, please don't hesitate to reach out.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Contact HR Team
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">
                    Learn About Our Company
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