"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegistrationSuccessPage() {
  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const containerVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card className="w-[380px] shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">Registration Successful!</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6 py-8">
            <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <motion.svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M10 25L20 35L40 15"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-500"
                  variants={checkmarkVariants}
                />
              </motion.svg>
            </div>
            <p className="text-center text-muted-foreground">
              Your account has been successfully verified. You can now sign in to access your account.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Link href="/auth/sign-in">
              <Button size="lg">
                Sign In
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
} 