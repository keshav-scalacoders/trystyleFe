// app/components/Hero.tsx or wherever you keep it
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden pt-10 pb-24">
      {/* Subtle animated wave background */}
      {/* <div
        className="absolute inset-0 -z-10 opacity-70 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1440' height='590' viewBox='0 0 1440 590' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='50%25' x2='100%25' y2='50%25'%3E%3Cstop offset='0%25' stop-color='%23f5f5f5'/%3E%3Cstop offset='100%25' stop-color='%23e5e5e5'/%3E%3C/linearGradient%3E%3ClinearGradient id='g2' x1='0%25' y1='50%25' x2='100%25' y2='50%25'%3E%3Cstop offset='0%25' stop-color='%23fafafa'/%3E%3Cstop offset='100%25' stop-color='%23f0f0f0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M0,600 L0,150 C95.9,184.4 191.8,218.9 292,200 C392.2,181.1 496.6,109 593,100 C689.4,91 777.8,145.2 882,161 C986.2,176.8 1106.4,154.2 1202,146 C1297.6,137.8 1368.8,143.9 1440,150 L1440,600 Z' fill='url(%23g)' opacity='0.6'/%3E%3Cpath d='M0,600 L0,350 C103.3,394.9 206.7,439.8 294,421 C381.3,402.2 452.7,319.6 551,316 C649.3,312.4 774.6,387.9 880,395 C985.4,402.1 1071,340.9 1161,322 C1251,303.1 1345.5,326.6 1440,350 L1440,600 Z' fill='url(%23g2)'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat'
        }}
      /> */}

      <div className="container relative z-10 px-6 py-24 mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Text side */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground animate-fade-in -delay-0">
              <Sparkles className="h-4 w-4" />
              New: Instant AI Try-On
            </div>

            <h1 className="bg-linear-to-r from-primary to-secondary font-extrabold tracking-tight text-3xl sm:text-5xl lg:text-7xl bg-clip-text text-transparent animate-fade-up -delay-100">
              Try Before<br className="hidden sm:inline" /> You Buy
            </h1>

            <p className="mt-6 text-lg sm:text-xl max-w-2xl leading-relaxed animate-fade-up -delay-200">
              Instant AI try-on. No app needed.<br />
              See how clothes look on you in seconds - right in your browser.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-fade-up -delay-300">
              <a href="#garment-grid">
                <Button size="lg" className="group h-12 px-8 font-semibold shadow-lg cursor-pointer">
                  Try It Free Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <Button size="lg" variant="outline" className="h-12 px-8">
                Watch Demo
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground animate-fade-up -delay-400">
              Used by 50,000+ shoppers • 4.9/5 from 2.3k reviews
            </p>
          </div>

          {/* Image side */}
          <div className="hidden lg:flex justify-center lg:justify-end animate-fade-in -delay-300">
            <div className="relative">
              <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-3xl bg-secondary/40 blur-3xl" />
              <img
                src="/images/hero.png"
                alt="AI try-on preview"
                className="relative z-10 rounded-2xl shadow-2xl ring-1 ring-border/50 max-w-sm lg:max-w-lg xl:max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Floating "scroll down" indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-5 rounded-full border-2 border-neutral-400/60" />
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}