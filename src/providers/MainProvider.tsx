"use client";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import { Toaster } from "@/components/ui/toast";
import CounterContextProvider from "@/contexts/counterContext";
import { ReactNode } from "react";

export default function MainProvider({ children }: { children: ReactNode }) {
  return (
    <CounterContextProvider>
      <Navbar />
      <div className="py-5">{children}</div>
      <Footer />
      <Toaster />
    </CounterContextProvider>
  );
}
