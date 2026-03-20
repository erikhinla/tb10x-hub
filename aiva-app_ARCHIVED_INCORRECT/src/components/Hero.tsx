import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onBeginConversation: () => void;
}

export const Hero = ({ onBeginConversation }: HeroProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12">
      <div className="max-w-4xl text-center">
        {/* Eyebrow */}
        <p className="text-bronze font-body text-sm tracking-[0.2em] uppercase mb-8 opacity-0 animate-fade-in">
          They&apos;re Lying to You
        </p>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-foreground leading-[0.95] mb-8 opacity-0 animate-fade-up delay-100">
          Deploy Revenue Infrastructure
        </h1>

        {/* Subhead */}
        <p className="text-xl md:text-2xl font-body font-light text-muted-foreground max-w-2xl mx-auto mb-12 opacity-0 animate-fade-up delay-200">
          Stop bleeding margin to information chaos. Establish the Context Architecture required for AI-native scale.
        </p>

        {/* CTA */}
        <div className="opacity-0 animate-fade-up delay-300">
          <Button
            variant="bronze"
            size="xl"
            onClick={onBeginConversation}
            className="group"
          >
            Begin Context Audit
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
