import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/page-transition";
import { useThemeStore } from '@/lib/stores/theme-store';
import Home from "./pages/home/Home";

const Navbar = React.lazy(() => import("./components/navbar"));
const NotFound = React.lazy(() => import("@/pages/not-found"));
const ThemePage = React.lazy(() => import('@/pages/theme/Theme'));

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence>
      <Navbar />
      <Switch location={location} key={location}>
        <Route path="/">
          {() => (
            <PageTransition>
              <Home />
            </PageTransition>
          )}
        </Route>
        <Route path="/theme">
          {() => (
            <PageTransition>
              <ThemePage />
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
    try { useThemeStore.getState().init(); } catch (e) { }
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
