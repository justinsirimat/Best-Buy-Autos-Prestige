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
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  CircleDollarSign, 
  CreditCard, 
  Calculator, 
  Clock, 
  Shield, 
  CheckCircle, 
  FileText,
  DollarSign,
  Percent
} from "lucide-react";

export default function FinancePage() {
  const [loanAmount, setLoanAmount] = useState(40000);
  const [downPayment, setDownPayment] = useState(8000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(4.5);
  
  // Calculate monthly payment
  const calculatePayment = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;
    
    if (monthlyRate === 0) return principal / numberOfPayments;
    
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                   (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return payment.toFixed(2);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const financingOptions = [
    {
      title: "Standard Financing",
      description: "Traditional auto loans with competitive rates",
      features: [
        "Competitive interest rates starting at 3.99% APR",
        "Flexible loan terms from 24 to 84 months",
        "No pre-payment penalties",
        "Available for new and pre-owned vehicles",
        "Fast approval process"
      ],
      bestFor: "Most buyers with good credit"
    },
    {
      title: "Premium Lease",
      description: "Flexible leasing options for luxury vehicles",
      features: [
        "Low monthly payments compared to financing",
        "Drive a new vehicle every 2-3 years",
        "Multiple mileage options",
        "Gap coverage included",
        "Exclusive lease-end options"
      ],
      bestFor: "Drivers who prefer a new vehicle every few years",
      featured: true
    },
    {
      title: "Balloon Financing",
      description: "Lower monthly payments with end-of-term options",
      features: [
        "Reduced monthly payments",
        "Final balloon payment at end of term",
        "Options to refinance, pay off, or trade in at term end",
        "Extended warranty options",
        "Flexible terms available"
      ],
      bestFor: "Buyers seeking lower monthly payments with future flexibility"
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
                <h1 className="text-4xl font-bold mb-6">Flexible Financing Solutions</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Discover tailored financing options that make luxury vehicle ownership accessible. Our financing specialists work with you to create the perfect plan for your budget and lifestyle.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <a href="#calculator">
                      Payment Calculator
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">
                      Speak to a Specialist
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
                  src="/images/finance-hero.jpg"
                  alt="Luxury Vehicle Financing"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10"></div>
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-background/90 backdrop-blur-sm rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Personalized Solutions</h3>
                  <p className="text-sm text-muted-foreground">
                    Financing options as unique as the vehicle you choose
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Financing Options */}
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
                Financing Options
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground"
              >
                We offer multiple financing solutions to meet your needs
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {financingOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`relative h-full ${option.featured ? 'border-primary shadow-md' : ''}`}>
                    {option.featured && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Badge className="bg-primary">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{option.title}</CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {option.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 pt-6 border-t border-border">
                        <p className="text-sm font-medium">Best for: <span className="text-muted-foreground">{option.bestFor}</span></p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant={option.featured ? 'default' : 'outline'} asChild>
                        <Link href="/contact">
                          Get Details
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Calculator Section */}
        <section id="calculator" className="py-20 bg-muted/30 scroll-mt-24">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Payment Calculator</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Estimate your monthly payments based on your preferred terms
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label>Vehicle Price: {formatCurrency(loanAmount)}</Label>
                          <span className="text-sm text-muted-foreground">${loanAmount.toLocaleString()}</span>
                        </div>
                        <Slider
                          value={[loanAmount]}
                          min={10000}
                          max={150000}
                          step={1000}
                          onValueChange={(value) => setLoanAmount(value[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>$10,000</span>
                          <span>$150,000</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label>Down Payment: {formatCurrency(downPayment)}</Label>
                          <span className="text-sm text-muted-foreground">${downPayment.toLocaleString()}</span>
                        </div>
                        <Slider
                          value={[downPayment]}
                          min={0}
                          max={loanAmount * 0.5}
                          step={500}
                          onValueChange={(value) => setDownPayment(value[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>$0</span>
                          <span>${(loanAmount * 0.5).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label>Interest Rate: {interestRate}%</Label>
                          <span className="text-sm text-muted-foreground">{interestRate}%</span>
                        </div>
                        <Slider
                          value={[interestRate]}
                          min={1}
                          max={12}
                          step={0.25}
                          onValueChange={(value) => setInterestRate(value[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1%</span>
                          <span>12%</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label>Loan Term: {loanTerm} months</Label>
                          <span className="text-sm text-muted-foreground">{loanTerm} months</span>
                        </div>
                        <RadioGroup 
                          value={loanTerm.toString()} 
                          onValueChange={(value) => setLoanTerm(parseInt(value))}
                          className="flex flex-wrap justify-between gap-2"
                        >
                          {[24, 36, 48, 60, 72, 84].map((term) => (
                            <div key={term} className="flex items-center space-x-2">
                              <RadioGroupItem value={term.toString()} id={`term-${term}`} />
                              <Label htmlFor={`term-${term}`}>{term} mo</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="flex-grow bg-muted rounded-lg p-6 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <Calculator className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Estimated Monthly Payment</h3>
                        <div className="text-4xl font-bold mb-4">
                          ${calculatePayment()}
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-2 text-left w-full">
                          <li className="flex justify-between">
                            <span>Vehicle Price:</span>
                            <span>${loanAmount.toLocaleString()}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Down Payment:</span>
                            <span>${downPayment.toLocaleString()}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Loan Amount:</span>
                            <span>${(loanAmount - downPayment).toLocaleString()}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Loan Term:</span>
                            <span>{loanTerm} months</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Interest Rate:</span>
                            <span>{interestRate}%</span>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-6">
                        <p className="text-sm text-muted-foreground mb-4">
                          This calculator provides an estimate. Your actual payment may vary based on credit approval, taxes, fees, and other factors.
                        </p>
                        <Button className="w-full" asChild>
                          <Link href="/contact">
                            Get Pre-Approved
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Process Steps */}
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
                Simple Financing Process
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground"
              >
                We've streamlined the financing process to get you on the road faster
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: 1,
                  title: "Apply Online",
                  description: "Complete our secure online application in just minutes",
                  icon: <FileText className="h-10 w-10 text-primary" />
                },
                {
                  step: 2,
                  title: "Quick Approval",
                  description: "Receive pre-approval decision, often within hours",
                  icon: <CheckCircle className="h-10 w-10 text-primary" />
                },
                {
                  step: 3,
                  title: "Select Vehicle",
                  description: "Choose your perfect vehicle with confidence",
                  icon: <CircleDollarSign className="h-10 w-10 text-primary" />
                },
                {
                  step: 4,
                  title: "Drive Home",
                  description: "Sign your paperwork and drive away in your new vehicle",
                  icon: <CreditCard className="h-10 w-10 text-primary" />
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
        
        {/* Benefits */}
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
                Why Finance With Us
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground"
              >
                Discover the advantages of financing through Best Buy Auto Prestige
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Competitive Rates",
                  description: "Access to exclusive rates from premium lenders specializing in luxury vehicles",
                  icon: <Percent className="h-8 w-8 text-primary" />
                },
                {
                  title: "Flexible Terms",
                  description: "Customizable loan and lease terms to match your lifestyle and financial goals",
                  icon: <CreditCard className="h-8 w-8 text-primary" />
                },
                {
                  title: "Quick Approvals",
                  description: "Streamlined approval process with decisions often available same day",
                  icon: <Clock className="h-8 w-8 text-primary" />
                },
                {
                  title: "Expert Guidance",
                  description: "Dedicated finance specialists who understand luxury vehicle financing",
                  icon: <CircleDollarSign className="h-8 w-8 text-primary" />
                },
                {
                  title: "Protection Plans",
                  description: "Optional vehicle protection plans to safeguard your investment",
                  icon: <Shield className="h-8 w-8 text-primary" />
                },
                {
                  title: "Special Programs",
                  description: "Access to manufacturer incentives and loyalty programs for returning customers",
                  icon: <DollarSign className="h-8 w-8 text-primary" />
                }
              ].map((benefit, index) => (
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
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Apply for financing today and take the first step toward driving your dream vehicle.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Apply Now
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    Speak to a Specialist
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