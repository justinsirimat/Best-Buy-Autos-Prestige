"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Define the props interface for type safety and documentation
interface ScrollFadeInProps {
  children: React.ReactNode;  // Accept any valid React child elements
  delay?: number;            // Optional delay for staggered animations
}

/**
 * A reusable component that adds a fade-in animation when elements enter the viewport.
 * Uses the Intersection Observer API through Framer Motion's useInView hook.
 * 
 * @param children - The content to be animated
 * @param delay - Optional delay in seconds before the animation starts
 */
export function ScrollFadeIn({ children, delay = 0 }: ScrollFadeInProps) {
  // Create a ref to track the element's position
  const ref = useRef(null);
  
  // Use Framer Motion's useInView hook to detect when the element enters viewport
  // margin parameter creates a buffer zone of 100px below the viewport
  const isInView = useInView(ref, {
    once: true,  // Animation triggers only once
    margin: "0px 0px -100px 0px"  // Bottom margin to trigger animation earlier
  });

  return (
    <motion.div
      ref={ref}
      // Initial state: invisible and slightly moved down
      initial={{ opacity: 0, y: 20 }}
      // Animate based on viewport visibility
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut"  // Smooth easing function for natural motion
      }}
    >
      {children}
    </motion.div>
  );
} 