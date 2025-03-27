"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollFadeIn } from "@/components/ui/scroll-fade-in";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Sliders, X, Fuel, Gauge, Calendar, Users, ChevronRight, FilterX, ImageIcon } from "lucide-react";
import { supabase, isSupabaseInitialized } from "@/lib/supabase";

// Sample data - in a real app, this would come from Supabase
const cars = [
  {
    id: 1,
    title: "2023 Mercedes-Benz S-Class",
    price: 125000,
    image: "/images/car-mercedes.jpg",
    badges: ["Premium", "New Arrival"],
    specs: {
      year: 2023,
      mileage: 1200,
      fuelType: "Hybrid",
      seats: 5
    },
    brand: "Mercedes-Benz",
    model: "S-Class",
    bodyType: "Sedan"
  },
  {
    id: 2,
    title: "2022 BMW 7 Series",
    price: 110000,
    image: "/images/car-bmw.jpg",
    badges: ["Featured"],
    specs: {
      year: 2022,
      mileage: 5800,
      fuelType: "Petrol",
      seats: 5
    },
    brand: "BMW",
    model: "7 Series",
    bodyType: "Sedan"
  },
  {
    id: 3,
    title: "2023 Audi e-tron GT",
    price: 135000,
    image: "/images/car-audi.jpg",
    badges: ["Electric", "Premium"],
    specs: {
      year: 2023,
      mileage: 850,
      fuelType: "Electric",
      seats: 4
    },
    brand: "Audi",
    model: "e-tron GT",
    bodyType: "Coupe"
  },
  {
    id: 4,
    title: "2022 Porsche Taycan",
    price: 145000,
    image: "/images/car-porsche.jpg",
    badges: ["Electric", "Limited"],
    specs: {
      year: 2022,
      mileage: 2100,
      fuelType: "Electric",
      seats: 4
    },
    brand: "Porsche",
    model: "Taycan",
    bodyType: "Coupe"
  },
  {
    id: 5,
    title: "2022 Lexus LX 600",
    price: 105000,
    image: "/images/car-lexus.jpg",
    badges: ["Premium", "SUV"],
    specs: {
      year: 2022,
      mileage: 3200,
      fuelType: "Petrol",
      seats: 7
    },
    brand: "Lexus",
    model: "LX 600",
    bodyType: "SUV"
  },
  {
    id: 6,
    title: "2023 Range Rover Sport",
    price: 118000,
    image: "/images/car-rangerover.jpg",
    badges: ["Premium", "SUV"],
    specs: {
      year: 2023,
      mileage: 1500,
      fuelType: "Hybrid",
      seats: 5
    },
    brand: "Land Rover",
    model: "Range Rover Sport",
    bodyType: "SUV"
  },
  {
    id: 7,
    title: "2022 Tesla Model S Plaid",
    price: 130000,
    image: "/images/car-tesla.jpg",
    badges: ["Electric", "Performance"],
    specs: {
      year: 2022,
      mileage: 4200,
      fuelType: "Electric",
      seats: 5
    },
    brand: "Tesla",
    model: "Model S",
    bodyType: "Sedan"
  },
  {
    id: 8,
    title: "2021 Bentley Continental GT",
    price: 230000,
    image: "/images/car-bentley.jpg",
    badges: ["Luxury", "Limited"],
    specs: {
      year: 2021,
      mileage: 6300,
      fuelType: "Petrol",
      seats: 4
    },
    brand: "Bentley",
    model: "Continental GT",
    bodyType: "Coupe"
  }
];

export default function InventoryPage() {
  const [filteredCars, setFilteredCars] = useState(cars);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 250000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicles, setVehicles] = useState(cars); // Start with mock data

  const brands = Array.from(new Set(cars.map(car => car.brand)));
  const bodyTypes = Array.from(new Set(cars.map(car => car.bodyType)));
  const fuelTypes = Array.from(new Set(cars.map(car => car.specs?.fuelType).filter(Boolean)));

  useEffect(() => {
    // Fetch vehicles from Supabase if initialized
    const fetchVehicles = async () => {
      if (!isSupabaseInitialized()) {
        console.log("Using mock data - Supabase not initialized");
        return;
      }

      setIsLoading(true);
      try {
        // Replace 'vehicles' with your actual table name
        const { data, error } = await supabase
          .from('vehicles')
          .select('*');

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          console.log("Loaded vehicles from Supabase:", data.length);
          setVehicles(data);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = vehicles.filter(car => {
      // Search term filter
      const matchesSearch = car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            car.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Price range filter
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
      
      // Brand filter
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(car.brand);
      
      // Body type filter
      const matchesBodyType = selectedBodyTypes.length === 0 || selectedBodyTypes.includes(car.bodyType);
      
      // Fuel type filter
      const matchesFuelType = selectedFuelTypes.length === 0 || 
                             (car.specs?.fuelType && selectedFuelTypes.includes(car.specs.fuelType));
      
      return matchesSearch && matchesPrice && matchesBrand && matchesBodyType && matchesFuelType;
    });
    
    setFilteredCars(filtered);
    
    // Count active filters
    let count = 0;
    if (priceRange[0] > 0 || priceRange[1] < 250000) count++;
    if (selectedBrands.length > 0) count++;
    if (selectedBodyTypes.length > 0) count++;
    if (selectedFuelTypes.length > 0) count++;
    
    setActiveFilters(count);
  }, [searchTerm, priceRange, selectedBrands, selectedBodyTypes, selectedFuelTypes, vehicles]);

  const resetFilters = () => {
    setPriceRange([0, 250000]);
    setSelectedBrands([]);
    setSelectedBodyTypes([]);
    setSelectedFuelTypes([]);
    setSearchTerm("");
  };

  const toggleBrandFilter = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };

  const toggleBodyTypeFilter = (type: string) => {
    setSelectedBodyTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const toggleFuelTypeFilter = (type: string) => {
    setSelectedFuelTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        {/* Hero section */}
        <section className="bg-muted/30 py-12">
          <div className="container px-4 mx-auto">
            <ScrollFadeIn>
              <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4 text-foreground">Our Premium Collection</h1>
                <p className="text-muted-foreground mb-8">
                  Explore our handpicked selection of premium vehicles. Find your perfect match with our comprehensive search and filtering options.
                </p>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    placeholder="Search by brand, model, or keyword..." 
                    className="pl-10 h-12 rounded-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setSearchTerm("")}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </ScrollFadeIn>
          </div>
        </section>
        
        {/* Filters and inventory section */}
        <section className="py-12">
          <div className="container px-4 mx-auto">
            <ScrollFadeIn>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">{filteredCars.length} vehicles found</h2>
                  {activeFilters > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {activeFilters} filter{activeFilters !== 1 ? 's' : ''} active
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => setFiltersOpen(!filtersOpen)}
                  >
                    <Sliders className="h-4 w-4" />
                    <span className="hidden sm:inline">Filters</span>
                  </Button>
                  
                  {activeFilters > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1 text-muted-foreground"
                      onClick={resetFilters}
                    >
                      <FilterX className="h-4 w-4" />
                      <span className="hidden sm:inline">Reset</span>
                    </Button>
                  )}
                </div>
              </div>
            </ScrollFadeIn>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters sidebar */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: filtersOpen ? 1 : 0,
                  height: filtersOpen ? "auto" : 0,
                  display: filtersOpen ? "block" : "none"
                }}
                transition={{ duration: 0.3 }}
                className="lg:col-span-1 lg:opacity-100 lg:h-auto lg:block"
              >
                <Card className="sticky top-24">
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-bold text-foreground">Filters</h3>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Price Range */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Price Range</h4>
                      <div className="pl-1">
                        <Slider
                          defaultValue={[0, 250000]}
                          max={250000}
                          step={5000}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>${priceRange[0].toLocaleString()}</span>
                          <span>${priceRange[1].toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Brand */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Brand</h4>
                      <div className="space-y-2">
                        {brands.map(brand => (
                          <div key={brand} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`brand-${brand}`} 
                              checked={selectedBrands.includes(brand)}
                              onCheckedChange={() => toggleBrandFilter(brand)}
                            />
                            <label 
                              htmlFor={`brand-${brand}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                            >
                              {brand}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Body Type */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Body Type</h4>
                      <div className="space-y-2">
                        {bodyTypes.map(type => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`type-${type}`} 
                              checked={selectedBodyTypes.includes(type)}
                              onCheckedChange={() => toggleBodyTypeFilter(type)}
                            />
                            <label 
                              htmlFor={`type-${type}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                            >
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Fuel Type */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Fuel Type</h4>
                      <div className="space-y-2">
                        {fuelTypes.map(type => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`fuel-${type}`} 
                              checked={selectedFuelTypes.includes(type)}
                              onCheckedChange={() => toggleFuelTypeFilter(type)}
                            />
                            <label 
                              htmlFor={`fuel-${type}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                            >
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Car list */}
              <div className="lg:col-span-3">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredCars.length > 0 ? (
                    filteredCars.map((car, index) => (
                      <ScrollFadeIn key={car.id} delay={index * 0.1}>
                        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="relative w-full pt-[56.25%]">
                            {car.image ? (
                              <Image
                                src={car.image}
                                alt={car.title || 'Vehicle image'}
                                fill
                                className="object-cover transition-transform hover:scale-105 duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                                <ImageIcon className="h-12 w-12 text-muted-foreground" />
                              </div>
                            )}
                            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                              {car.badges && car.badges.map((badge, i) => (
                                <Badge key={i} variant={badge === "Electric" ? "default" : "secondary"} className="text-xs">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <CardHeader className="px-4 pt-4 pb-0">
                            <h3 className="text-lg font-bold mb-1 line-clamp-1 text-foreground">{car.title}</h3>
                            <p className="text-2xl font-bold text-primary">${car.price.toLocaleString()}</p>
                          </CardHeader>

                          <CardContent className="px-4 py-2">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{car.specs?.year}</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Gauge className="h-4 w-4 mr-1" />
                                <span>{car.specs?.mileage?.toLocaleString()} km</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Fuel className="h-4 w-4 mr-1" />
                                <span>{car.specs?.fuelType}</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{car.specs?.seats} seats</span>
                              </div>
                            </div>
                          </CardContent>

                          <CardFooter className="px-4 pt-0 pb-4">
                            <Button className="w-full" variant="outline" asChild>
                              <Link href={`/inventory/${car.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </ScrollFadeIn>
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center">
                      <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                        <Search className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">No vehicles found</h3>
                      <p className="text-muted-foreground max-w-md mx-auto mb-6">
                        We couldn't find any vehicles matching your current filters. Try adjusting your search criteria.
                      </p>
                      <Button onClick={resetFilters}>
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </div>
                
                {filteredCars.length > 0 && (
                  <div className="mt-8 flex justify-center">
                    <Button variant="outline" asChild>
                      <Link href="/contact" className="flex items-center">
                        Don't see what you're looking for?
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 