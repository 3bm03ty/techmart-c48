"use client";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import { Toaster } from "@/components/ui/toast";
import CounterContextProvider from "@/contexts/counterContext";
import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import { ReactNode, Suspense } from "react";

import { Provider } from "react-redux";

export default function MainProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <CounterContextProvider>
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <div className="py-5">{children}</div>
          <Toaster />
          <Footer />
        </CounterContextProvider>
      </SessionProvider>
    </Provider>
  );
}
