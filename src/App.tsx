import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/page-transition";
import HomePage from "@/pages/home/Home";

import NotFound from "@/pages/not-found";
import Navbar from "./components/navbar";
import Home from "./pages/home/Home";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Navbar />
      <Switch location={location} key={location}>
        <Route path="/">
          {() => (
            <PageTransition>
              <Home />
            </PageTransition>
          )}
        </Route>
        <Route path="/first">
          {() => (
            <PageTransition>
              <HomePage />
            </PageTransition>
          )}
        </Route>
        <Route>
          {() => (
            <PageTransition>
              <NotFound />
            </PageTransition>
          )}
        </Route>
      </Switch>
    </AnimatePresence>
  );
}


function App() {
  // initialize auth store from storage on app mount
  useEffect(() => {
    try { useAuthStore.getState().init(); } catch (e) { }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster duration={5000} />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
