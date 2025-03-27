"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";

export default function ConfirmEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <EnvelopeOpenIcon className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-center">Check your email</CardTitle>
          <CardDescription className="text-center">
            We've sent you a confirmation email. Please click the link in the email to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Didn't receive the email? Check your spam folder or try signing in again.
          </p>
          <Button variant="outline" asChild>
            <Link href="/auth/sign-in">
              Return to sign in
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 