"use client";

import Image from "next/image";

interface MapProps {
  height?: string;
}

export function Map({ 
  height = "400px"
}: MapProps) {
  return (
    <div 
      style={{ 
        width: "100%", 
        height: height,
        position: "relative",
        borderRadius: "0.5rem",
        overflow: "hidden"
      }} 
    >
      <Image
        src="/location-map.jpg" // You'll need to add your map image to the public folder
        alt="Our dealership location"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
} 