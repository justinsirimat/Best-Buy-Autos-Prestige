"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Fuel, Gauge, Calendar, Users } from "lucide-react";

const featuredCars = [
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
    }
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
    }
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
    }
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
    }
  }
];

export function FeaturedCars() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Vehicles</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover our handpicked selection of premium vehicles, each offering luxury, performance, and exceptional value.
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0" asChild>
            <Link href="/inventory">
              View All
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative w-full pt-[56.25%]">
                  <Image
                    src={car.image}
                    alt={car.title}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-500"
                  />
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {car.badges.map((badge, i) => (
                      <Badge key={i} variant={badge === "Electric" ? "default" : "secondary"} className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                <CardHeader className="px-4 pt-4 pb-0">
                  <h3 className="text-lg font-bold mb-1 line-clamp-1">{car.title}</h3>
                  <p className="text-2xl font-bold text-primary">${car.price.toLocaleString()}</p>
                </CardHeader>

                <CardContent className="px-4 py-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{car.specs.year}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Gauge className="h-4 w-4 mr-1" />
                      <span>{car.specs.mileage.toLocaleString()} km</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Fuel className="h-4 w-4 mr-1" />
                      <span>{car.specs.fuelType}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{car.specs.seats} seats</span>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 