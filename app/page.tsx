"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Calculator,
  Shield,
  Wallet,
  SplitSquareVertical,
  Users,
  Receipt,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LandingPage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = async () => {
    // Simulated wallet connection
    setIsWalletConnected(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <SplitSquareVertical className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">SplitSmart</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#how-it-works"
          >
            How It Works
          </Link>
          <Button
            variant={isWalletConnected ? "outline" : "default"}
            onClick={handleConnectWallet}
          >
            {isWalletConnected ? (
              <span className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                Connected
              </span>
            ) : (
              <span className="flex items-center">
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </span>
            )}
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Split Bills Fairly with AI-Powered Intelligence
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Our ML algorithm analyzes multiple factors to ensure everyone
                  pays their fair share. Secure payments through MPC wallets
                  make splitting bills hassle-free.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
            </div>
            <Image
              src="/placeholder.svg?height=400&width=600"
              width={600}
              height={400}
              alt="App screenshot"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Smart Features for Smart Splitting
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our platform combines artificial intelligence with secure
                blockchain technology to revolutionize bill splitting
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Card>
              <CardHeader>
                <Brain className="h-10 w-10 mb-2" />
                <CardTitle>ML-Powered Splitting</CardTitle>
                <CardDescription>
                  Our AI analyzes consumption patterns, preferences, and item
                  sharing to suggest fair splits
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 mb-2" />
                <CardTitle>MPC Wallet Security</CardTitle>
                <CardDescription>
                  Multi-party computation ensures your crypto transactions are
                  secure and private
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Calculator className="h-10 w-10 mb-2" />
                <CardTitle>Smart Calculations</CardTitle>
                <CardDescription>
                  Automatically handle tax, tip, and special discounts in your
                  splits
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="w-full py-12 md:py-24 lg:py-32 bg-muted"
      >
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              className="flex flex-col items-center text-center space-y-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <Receipt className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-bold">1. Scan Receipt</h3>
              <p className="text-sm text-muted-foreground">
                Upload your receipt or bill through our app
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center text-center space-y-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <Brain className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-bold">2. AI Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Our ML model analyzes the bill and suggests fair splits
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center text-center space-y-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-bold">3. Group Review</h3>
              <p className="text-sm text-muted-foreground">
                Everyone in the group can review and adjust the split
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center text-center space-y-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <Wallet className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-bold">4. Secure Payment</h3>
              <p className="text-sm text-muted-foreground">
                Pay your share securely through MPC wallets
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to Split Smarter?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of users who are already splitting bills fairly
                with AI
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              {!isWalletConnected ? (
                <Button size="lg" onClick={handleConnectWallet}>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet to Start
                </Button>
              ) : (
                <Button size="lg">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Start Splitting Bills
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2024 SplitSmart. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
