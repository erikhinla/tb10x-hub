import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onBeginDiagnostic: () => void;
}

export const Hero = ({ onBeginDiagnostic }: HeroProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="px-6 md:px-12 py-6 flex justify-between items-center opacity-0 animate-fade-in">
        <div className="font-display text-xl tracking-tight text-foreground">
          Anaconda
        </div>
        <Button variant="minimal" size="sm">
          For Owners
        </Button>
      </nav>

      {/* Hero content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 pb-20">
        <div className="max-w-4xl text-center">
          {/* Eyebrow */}
          <p className="text-bronze font-body text-sm tracking-[0.2em] uppercase mb-8 opacity-0 animate-fade-in delay-200">
            FLOW — Frictionless Leverage. Orchestrated Workflows.
          </p>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-foreground leading-[0.95] mb-8 opacity-0 animate-fade-up delay-300">
            Your judgment,<br />
            <span className="text-bronze">extended</span>
          </h1>

          {/* Subhead */}
          <p className="text-xl md:text-2xl font-body font-light text-muted-foreground max-w-2xl mx-auto mb-12 opacity-0 animate-fade-up delay-400">
            MĀVĀ is a voice-first strategic interface that routes decisions intelligently—so you're present only where it matters.
          </p>

          {/* CTA */}
          <div className="opacity-0 animate-fade-up delay-500">
            <Button
              variant="bronze"
              size="xl"
              onClick={onBeginDiagnostic}
              className="group"
            >
              Begin Diagnostic
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-muted-foreground font-body text-sm mt-4">
              3 questions. 2 minutes. Complete clarity.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 flex justify-between items-center text-muted-foreground font-body text-sm opacity-0 animate-fade-in delay-600">
        <p>For medical aesthetics owners</p>
        <p>Built for leverage, not labor</p>
      </footer>
    </div>
  );
};
