"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollFadeInProps {
  children: React.ReactNode;
  delay?: number;
}

export function ScrollFadeIn({ children, delay = 0 }: ScrollFadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -100px 0px"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
} 