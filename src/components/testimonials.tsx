"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Michael Johnson",
    avatar: "/images/avatars/michael.jpg",
    role: "Business Executive",
    content: "Best Buy Auto Prestige exceeded all my expectations. Their collection of luxury vehicles is impressive, and the purchase process was seamless. I'm now driving my dream car thanks to their expert guidance.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Williams",
    avatar: "/images/avatars/sarah.jpg",
    role: "Marketing Director",
    content: "I was looking for a specific model for months until I found Best Buy Auto Prestige. Their team went above and beyond to source exactly what I wanted. The customer service is truly exceptional.",
    rating: 5
  },
  {
    id: 3,
    name: "David Chen",
    avatar: "/images/avatars/david.jpg",
    role: "Tech Entrepreneur",
    content: "The financing options at Best Buy Auto Prestige made it possible for me to upgrade to a premium vehicle. The staff was knowledgeable, patient, and helped me find the perfect car within my budget.",
    rating: 4
  },
  {
    id: 4,
    name: "Emily Parker",
    avatar: "/images/avatars/emily.jpg",
    role: "Interior Designer",
    content: "From the moment I walked in, I felt valued as a customer. The showroom is impressive and the vehicles are in immaculate condition. I wouldn't hesitate to recommend Best Buy Auto Prestige to anyone.",
    rating: 5
  },
  {
    id: 5,
    name: "Robert Thompson",
    avatar: "/images/avatars/robert.jpg",
    role: "Financial Advisor",
    content: "As someone who appreciates quality and attention to detail, I found the perfect match at Best Buy Auto Prestige. Their after-sales service has been just as impressive as the initial purchase experience.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground">
            Discover why our clients choose Best Buy Auto Prestige for their luxury vehicle needs.
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-2 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <blockquote className="text-sm mb-6">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious className="relative static" />
            <CarouselNext className="relative static" />
          </div>
        </Carousel>
      </div>
    </section>
  );
} 