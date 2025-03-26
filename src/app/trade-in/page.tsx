"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Clipboard, Car, DollarSign, Check, ArrowRight } from "lucide-react";

export default function TradeInPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleTrim: "",
    mileage: "",
    vin: "",
    condition: "excellent",
    ownershipStatus: "",
    comments: "",
    preferredContact: "email"
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const carMakes = [
    "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Buick", "Cadillac", 
    "Chevrolet", "Chrysler", "Dodge", "Ferrari", "Fiat", "Ford", "Genesis", "GMC", 
    "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Lamborghini", "Land Rover", 
    "Lexus", "Lincoln", "Maserati", "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", 
    "Nissan", "Porsche", "Ram", "Rolls-Royce", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo"
  ];
  
  const vehicleConditions = [
    { value: "excellent", label: "Excellent - Like new condition with minimal wear" },
    { value: "good", label: "Good - Normal wear and tear, all features functional" },
    { value: "fair", label: "Fair - Some cosmetic issues, may need minor repairs" },
    { value: "poor", label: "Poor - Significant issues, needs major repairs" }
  ];
  
  const ownershipStatuses = [
    { value: "paid", label: "Paid off - I own the vehicle outright" },
    { value: "financed", label: "Financed - I'm still making payments" },
    { value: "leased", label: "Leased - The vehicle is on a lease" }
  ];

  const tradeInBenefits = [
    {
      title: "Reduce Your Purchase Price",
      description: "The value of your trade-in is applied directly to your new vehicle purchase, lowering the amount you need to finance.",
      icon: <DollarSign className="h-8 w-8 text-primary" />
    },
    {
      title: "Convenient One-Stop Process",
      description: "Avoid the hassle of selling your car privately. We handle all the paperwork and make the process seamless.",
      icon: <Clipboard className="h-8 w-8 text-primary" />
    },
    {
      title: "Potential Tax Benefits",
      description: "In many states, trading in your vehicle means you only pay sales tax on the difference between the new car price and trade-in value.",
      icon: <CheckCircle className="h-8 w-8 text-primary" />
    }
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setSubmitting(false);
      setSubmitted(true);
      
      // Reset after showing success message
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          vehicleYear: "",
          vehicleMake: "",
          vehicleModel: "",
          vehicleTrim: "",
          mileage: "",
          vin: "",
          condition: "excellent",
          ownershipStatus: "",
          comments: "",
          preferredContact: "email"
        });
        setSubmitted(false);
      }, 5000);
    }, 1500);
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
                <h1 className="text-4xl font-bold mb-6">Trade In Your Vehicle</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Get a fair and competitive offer for your current vehicle. Our trade-in process is simple, transparent, and designed to give you maximum value.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <a href="#trade-in-form">
                      Get Your Trade-In Estimate
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/inventory">
                      Browse Our Inventory
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
                  src="/images/trade-in-hero.jpg"
                  alt="Trade In Your Vehicle"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10"></div>
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-background/90 backdrop-blur-sm rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Quick & Easy Process</h3>
                  <p className="text-sm text-muted-foreground">
                    From evaluation to offer in as little as 30 minutes
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">How Our Trade-In Process Works</h2>
              <p className="text-lg text-muted-foreground">
                We've made trading in your vehicle as simple and convenient as possible
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Submit Your Info</h3>
                  <p className="text-muted-foreground">
                    Fill out our trade-in form with details about your vehicle's make, model, year, and condition
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Get Your Estimate</h3>
                  <p className="text-muted-foreground">
                    Receive a preliminary estimate based on current market value and vehicle information
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Finalize Your Offer</h3>
                  <p className="text-muted-foreground">
                    Bring your vehicle in for a quick inspection and receive your final trade-in offer on the spot
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Why Trade In With Us?</h2>
              <p className="text-lg text-muted-foreground">
                Trading in your vehicle at Best Buy Auto Prestige offers several advantages
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {tradeInBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background rounded-lg p-6 shadow-sm"
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
        
        {/* Trade-In Form */}
        <section id="trade-in-form" className="py-20 scroll-mt-24">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6 text-center">Get Your Trade-In Estimate</h2>
                <p className="text-lg text-muted-foreground text-center mb-10">
                  Fill out the form below and our team will contact you with a trade-in estimate for your vehicle
                </p>
              </motion.div>
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                    <Check className="h-8 w-8 text-green-600 dark:text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Submission Received!</h3>
                  <p className="text-lg mb-4">
                    Thank you for your trade-in inquiry. Our team will review your information and contact you shortly with an estimate.
                  </p>
                  <Button variant="outline" className="mt-2" asChild>
                    <Link href="/inventory">
                      Browse Our Inventory
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Trade-In Information</CardTitle>
                    <CardDescription>
                      Please provide accurate information about your vehicle to receive the most precise estimate
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-8">
                      {/* Contact Information */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Your Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                              id="firstName" 
                              name="firstName" 
                              value={formData.firstName} 
                              onChange={handleChange} 
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              name="lastName" 
                              value={formData.lastName} 
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
                            <Label htmlFor="phone">Phone Number</Label>
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
                      </div>
                      
                      <Separator />
                      
                      {/* Vehicle Information */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Vehicle Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <Label htmlFor="vehicleYear">Year</Label>
                            <Input 
                              id="vehicleYear" 
                              name="vehicleYear" 
                              type="number" 
                              min="1900" 
                              max={new Date().getFullYear()} 
                              value={formData.vehicleYear} 
                              onChange={handleChange} 
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="vehicleMake">Make</Label>
                            <Select 
                              value={formData.vehicleMake} 
                              onValueChange={(value) => handleSelectChange("vehicleMake", value)}
                            >
                              <SelectTrigger id="vehicleMake">
                                <SelectValue placeholder="Select Make" />
                              </SelectTrigger>
                              <SelectContent>
                                {carMakes.map((make) => (
                                  <SelectItem key={make} value={make}>
                                    {make}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="vehicleModel">Model</Label>
                            <Input 
                              id="vehicleModel" 
                              name="vehicleModel" 
                              value={formData.vehicleModel} 
                              onChange={handleChange} 
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="vehicleTrim">Trim (Optional)</Label>
                            <Input 
                              id="vehicleTrim" 
                              name="vehicleTrim" 
                              value={formData.vehicleTrim} 
                              onChange={handleChange} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mileage">Mileage</Label>
                            <Input 
                              id="mileage" 
                              name="mileage" 
                              type="number" 
                              min="0"
                              value={formData.mileage} 
                              onChange={handleChange} 
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="vin">VIN (Optional)</Label>
                            <Input 
                              id="vin" 
                              name="vin" 
                              value={formData.vin} 
                              onChange={handleChange} 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Vehicle Condition</Label>
                            <RadioGroup 
                              value={formData.condition} 
                              onValueChange={(value) => handleRadioChange("condition", value)}
                              className="grid grid-cols-1 md:grid-cols-2 gap-2"
                            >
                              {vehicleConditions.map((condition) => (
                                <div key={condition.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={condition.value} id={`condition-${condition.value}`} />
                                  <Label htmlFor={`condition-${condition.value}`} className="cursor-pointer">
                                    {condition.label}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Ownership Status</Label>
                            <RadioGroup 
                              value={formData.ownershipStatus} 
                              onValueChange={(value) => handleRadioChange("ownershipStatus", value)}
                              className="grid grid-cols-1 md:grid-cols-2 gap-2"
                            >
                              {ownershipStatuses.map((status) => (
                                <div key={status.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={status.value} id={`ownership-${status.value}`} />
                                  <Label htmlFor={`ownership-${status.value}`} className="cursor-pointer">
                                    {status.label}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Additional Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium mb-2">Additional Information</h3>
                        <div className="space-y-2">
                          <Label htmlFor="comments">Comments (Optional)</Label>
                          <Textarea 
                            id="comments" 
                            name="comments" 
                            placeholder="Please include any additional details about your vehicle that might affect its value, such as modifications, damages, or recent repairs."
                            rows={4}
                            value={formData.comments} 
                            onChange={handleChange} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Preferred Contact Method</Label>
                          <RadioGroup 
                            value={formData.preferredContact} 
                            onValueChange={(value) => handleRadioChange("preferredContact", value)}
                            className="flex flex-wrap gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="email" id="contact-email" />
                              <Label htmlFor="contact-email" className="cursor-pointer">Email</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="phone" id="contact-phone" />
                              <Label htmlFor="contact-phone" className="cursor-pointer">Phone</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="text" id="contact-text" />
                              <Label htmlFor="contact-text" className="cursor-pointer">Text Message</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                      <p className="text-sm text-muted-foreground mb-4 text-center">
                        By submitting this form, you agree to be contacted by our team regarding your trade-in request.
                      </p>
                      <Button type="submit" className="w-full" disabled={submitting}>
                        {submitting ? "Submitting..." : "Submit Trade-In Request"}
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
              <h2 className="text-3xl font-bold mb-6">Ready to Upgrade Your Ride?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Discover our exclusive inventory of premium vehicles. Trade in your current car and drive home in luxury today.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/inventory">
                    Browse Our Inventory
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    Contact Sales Team
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