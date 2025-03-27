"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  Calendar, 
  Gauge, 
  Fuel, 
  Users, 
  Settings, 
  ShieldCheck, 
  CarFront, 
  MessageSquare, 
  Car, 
  Phone, 
  DownloadCloud,
  Info,
  Clock
} from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";

// Sample data - in a real app, this would come from Supabase
const cars = [
  {
    id: "1",
    title: "2023 Mercedes-Benz S-Class",
    price: 125000,
    description: "Experience the pinnacle of luxury with the 2023 Mercedes-Benz S-Class. This flagship sedan combines cutting-edge technology, exceptional comfort, and powerful performance in a stylish package. With its hybrid powertrain, you'll enjoy both efficiency and performance without compromise.",
    images: [
      "/images/car-mercedes.jpg",
      "/images/car-mercedes-interior.jpg",
      "/images/car-mercedes-rear.jpg",
      "/images/car-mercedes-engine.jpg",
    ],
    badges: ["Premium", "New Arrival"],
    specs: {
      year: 2023,
      mileage: 1200,
      fuelType: "Hybrid",
      seats: 5,
      engine: "3.0L Inline-6 Turbo with EQ Boost",
      transmission: "9-Speed Automatic",
      drivetrain: "All-Wheel Drive",
      exteriorColor: "Obsidian Black",
      interiorColor: "Macchiato Beige/Magma Grey",
      vin: "WDDUG8DB9MA456789",
      fuelEconomy: "22 city / 29 highway",
      features: [
        "MBUX Infotainment System",
        "Burmester® 4D Surround Sound",
        "Head-Up Display",
        "Heated and Ventilated Seats",
        "Panoramic Sunroof",
        "Adaptive Cruise Control",
        "Lane Keeping Assist",
        "360° Camera System",
        "Wireless Charging",
        "Ambient Lighting"
      ]
    },
    brand: "Mercedes-Benz",
    model: "S-Class",
    bodyType: "Sedan"
  }
];

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImage, setActiveImage] = useState(0);
  const [favorite, setFavorite] = useState(false);
  
  // Find the car based on id from URL params
  const car = cars.find(car => car.id === params.id);
  
  // If car not found, show message and back button
  if (!car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The vehicle you're looking for may have been sold or removed.
            </p>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Breadcrumbs & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <button 
                onClick={() => router.back()}
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Inventory
              </button>
              <h1 className="text-3xl font-bold mt-2">{car.title}</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <DownloadCloud className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Save as PDF</span>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: car.title,
                      url: window.location.href,
                    });
                  }
                }}
              >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
              <Button 
                variant={favorite ? "default" : "outline"} 
                size="icon" 
                className="rounded-full"
                onClick={() => setFavorite(!favorite)}
              >
                <Heart className={`h-4 w-4 ${favorite ? 'fill-current' : ''}`} />
                <span className="sr-only">Favorite</span>
              </Button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Car images */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-lg"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={car.images[activeImage]}
                        alt={car.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/10"></div>
                      <div className="absolute bottom-4 right-4 bg-black/60 rounded-full p-2 text-white">
                        <span className="sr-only">View gallery</span>
                        <div className="flex items-center justify-center w-6 h-6">
                          <span className="text-sm font-medium">{car.images.length}</span>
                        </div>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{car.title} - Gallery</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {car.images.map((img, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={img}
                            alt={`${car.title} - Image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
              
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {car.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative rounded-md overflow-hidden flex-shrink-0 w-24 h-16 border-2 ${
                      activeImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${car.title} - Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Price and actions */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="sticky top-24">
                  <div className="bg-muted/30 rounded-lg p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {car.badges.map((badge, index) => (
                        <Badge key={index} variant={badge === "Electric" ? "default" : "secondary"}>
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    
                    <h2 className="text-3xl font-bold">${car.price.toLocaleString()}</h2>
                    <p className="text-sm text-muted-foreground mb-6">Plus taxes and applicable fees</p>
                    
                    <div className="space-y-4">
                      <Button className="w-full" size="lg">
                        <Phone className="mr-2 h-4 w-4" />
                        Contact Dealer
                      </Button>
                      <Button variant="outline" className="w-full" size="lg">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Schedule Test Drive
                      </Button>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{car.specs.year}</p>
                          <p className="text-xs text-muted-foreground">Year</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{car.specs.mileage.toLocaleString()} km</p>
                          <p className="text-xs text-muted-foreground">Mileage</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{car.specs.fuelType}</p>
                          <p className="text-xs text-muted-foreground">Fuel Type</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{car.specs.transmission}</p>
                          <p className="text-xs text-muted-foreground">Transmission</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Info className="h-4 w-4" />
                      <p className="text-xs">VIN: {car.specs.vin}</p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground mt-2">
                      <Clock className="h-4 w-4" />
                      <p className="text-xs">Listed 3 days ago</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="p-6 bg-muted/30 rounded-lg">
                <div className="max-w-3xl">
                  <h3 className="text-xl font-semibold mb-4">Vehicle Overview</h3>
                  <p className="text-muted-foreground mb-6">
                    {car.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Quality Certified</h4>
                          <p className="text-sm text-muted-foreground">
                            This vehicle has undergone our rigorous 150-point inspection process to ensure it meets our premium standards.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CarFront className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Service History</h4>
                          <p className="text-sm text-muted-foreground">
                            Full service history available with documentation of all maintenance performed.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Car className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Extended Warranty</h4>
                          <p className="text-sm text-muted-foreground">
                            Eligible for our comprehensive extended warranty packages for additional peace of mind.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Previous Ownership</h4>
                          <p className="text-sm text-muted-foreground">
                            One previous owner with detailed history report available upon request.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="p-6 bg-muted/30 rounded-lg">
                <div className="max-w-3xl">
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="border-b pb-2">
                      <p className="text-sm text-muted-foreground">Year</p>
                      <p className="font-medium">{car.specs.year}</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-muted-foreground">Make</p>
                      <p className="font-medium">{car.brand}</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-muted-foreground">Model</p>
                      <p className="font-medium">{car.model}</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-muted-foreground">Body Style</p>
                      <p className="font-medium">{car.bodyType}</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-muted-foreground">Mileage</p>
                      <p className="font-medium">{car.specs.mileage.toLocaleString()} km</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-muted-foreground">VIN</p>
                      <p className="font-medium">{car.specs.vin}</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-muted-foreground">Engine</p>
                      <p className="font-medium">{car.specs.engine}</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-muted-foreground">Transmission</p>
                      <p className="font-medium">{car.specs.transmission}</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-muted-foreground">Drivetrain</p>
                      <p className="font-medium">{car.specs.drivetrain}</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-muted-foreground">Fuel Type</p>
                      <p className="font-medium">{car.specs.fuelType}</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-muted-foreground">Fuel Economy</p>
                      <p className="font-medium">{car.specs.fuelEconomy}</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-muted-foreground">Exterior Color</p>
                      <p className="font-medium">{car.specs.exteriorColor}</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-muted-foreground">Interior Color</p>
                      <p className="font-medium">{car.specs.interiorColor}</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm text-muted-foreground">Seating Capacity</p>
                      <p className="font-medium">{car.specs.seats} passengers</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="p-6 bg-muted/30 rounded-lg">
                <div className="max-w-3xl">
                  <h3 className="text-xl font-semibold mb-4">Key Features & Equipment</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {car.specs.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
          
          {/* Similar Vehicles */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Similar Vehicles</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cars.map((similarCar) => (
                <Card key={similarCar.id} className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative w-full pt-[56.25%]">
                    <Image
                      src={similarCar.images[0]}
                      alt={similarCar.title}
                      fill
                      className="object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>

                  <CardHeader className="px-4 pt-4 pb-0">
                    <h3 className="text-lg font-bold mb-1 line-clamp-1">{similarCar.title}</h3>
                    <p className="text-xl font-bold text-primary">${similarCar.price.toLocaleString()}</p>
                  </CardHeader>

                  <div className="px-4 py-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{similarCar.specs.year}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Gauge className="h-4 w-4 mr-1" />
                        <span>{similarCar.specs.mileage.toLocaleString()} km</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 