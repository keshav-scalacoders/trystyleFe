import type { ReactNode } from "react";
import { LazyMotion, m } from "framer-motion";

const loadFeatures = () =>
  import("framer-motion").then((res) => res.domAnimation);

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full h-full"
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
