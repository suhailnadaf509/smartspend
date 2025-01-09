"use client"

import Image from "next/image";
import React from "react"
import { useState } from "react";
import {Header} from "@/components/Header"
import { ExpenseForm } from "@/components/ExpenseForm";

export default function Home() {

  const handleSubmit = async (data: any) => {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(null)
    setIsLoading(true)
    try {
      // Replace this with your actual API call
      const response = await fetch("/api/calculate-expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const results = await response.json()
      setResults(results)
    } catch (error) {
      console.error("Error calculating expenses:", error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex flex-col">
  <Header/>
  <main className="flex-1 container py-8">
  <h1 className="text-3xl font-bold mb-8">Travel Expense Calculator</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <ExpenseForm onSubmit={handleSubmit} />
          </div>
          </div>
  </main>
  </div>
  );
}
