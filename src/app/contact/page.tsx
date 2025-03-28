"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Map } from "@/components/ui/map";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    preferredContact: "email",
    subject: "",
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRadioChange = (value: string) => {
    setFormState(prev => ({ ...prev, preferredContact: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would send this data to your backend or a service
    console.log("Form submitted:", formState);
    
    setSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        preferredContact: "email",
        subject: "",
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Hero section */}
        <section className="bg-muted/30 py-16">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
              <p className="text-muted-foreground">
                Have a question about a specific vehicle? Interested in financing options? Or just want to provide feedback? We're here to help.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Contact information and form */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-1"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Reach out to us through any of these channels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-sm text-muted-foreground mb-1">Sales Department</p>
                        <p>(123) 456-7890</p>
                        <p className="text-sm text-muted-foreground mt-2 mb-1">Service Department</p>
                        <p>(123) 456-7891</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-start gap-4">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-sm text-muted-foreground mb-1">General Inquiries</p>
                        <p>info@bestbuyautoprestige.com</p>
                        <p className="text-sm text-muted-foreground mt-2 mb-1">Sales Team</p>
                        <p>sales@bestbuyautoprestige.com</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-sm text-muted-foreground mb-1">Main Showroom</p>
                        <p>123 Luxury Drive</p>
                        <p>Prestige City, PC 12345</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-start gap-4">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Business Hours</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                          <p className="text-sm">Monday - Friday:</p>
                          <p className="text-sm">9:00 AM - 7:00 PM</p>
                          <p className="text-sm">Saturday:</p>
                          <p className="text-sm">10:00 AM - 6:00 PM</p>
                          <p className="text-sm">Sunday:</p>
                          <p className="text-sm">11:00 AM - 4:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Contact form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {submitted ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                          <CheckCircle2 className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground max-w-md">
                          Thank you for reaching out. A member of our team will contact you shortly.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                              id="firstName" 
                              name="firstName" 
                              value={formState.firstName} 
                              onChange={handleChange} 
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              name="lastName" 
                              value={formState.lastName} 
                              onChange={handleChange} 
                              required 
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              name="email" 
                              type="email" 
                              value={formState.email} 
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
                              value={formState.phone} 
                              onChange={handleChange} 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Preferred Contact Method</Label>
                          <RadioGroup 
                            defaultValue="email" 
                            value={formState.preferredContact}
                            onValueChange={handleRadioChange}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="email" id="contact-email" />
                              <Label htmlFor="contact-email" className="cursor-pointer">Email</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="phone" id="contact-phone" />
                              <Label htmlFor="contact-phone" className="cursor-pointer">Phone</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Select 
                            value={formState.subject} 
                            onValueChange={(value) => handleSelectChange("subject", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sales">Vehicle Sales Inquiry</SelectItem>
                              <SelectItem value="service">Service Department</SelectItem>
                              <SelectItem value="finance">Financing Options</SelectItem>
                              <SelectItem value="test-drive">Schedule a Test Drive</SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea 
                            id="message" 
                            name="message" 
                            rows={5} 
                            value={formState.message} 
                            onChange={handleChange} 
                            required 
                            placeholder="How can we help you today?"
                          />
                        </div>
                        
                        <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                          {submitting ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Map section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Visit Our Showroom</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience our premium collection in person. Visit our state-of-the-art showroom and meet our team of automotive experts.
              </p>
            </div>
            
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Map 
                address="123 Luxury Drive, Prestige City, PC 12345"
                height="384px"
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 