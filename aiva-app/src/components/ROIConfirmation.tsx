import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle } from "lucide-react";

interface ROIConfirmationProps {
  diagnosticData: Record<string, string>;
  onProceedToBooking: () => void;
}

// Diagnostic engine - generates insights based on actual responses
const generateDiagnostic = (data: Record<string, string>) => {
  const insights = [];
  
  // Example: If they answered "bottleneck" question
  if (data.bottleneck && data.bottleneck !== "Skipped") {
    insights.push({
      type: "bottleneck",
      title: "Primary Constraint Identified",
      finding: data.bottleneck,
      implication: "This is where the system is escalating everything upward. Fix this, everything downstream improves.",
    });
  }
  
  // Example: If they answered "delegation" question
  if (data.delegation && data.delegation !== "Skipped") {
    insights.push({
      type: "delegation",
      title: "Owner-Dependent Decision Pattern",
      finding: data.delegation,
      implication: "Your judgment is depleting, not compounding. These decisions should route automatically.",
    });
  }
  
  // Example: If they answered "capacity" question
  if (data.capacity && data.capacity !== "Skipped") {
    insights.push({
      type: "capacity",
      title: "Unutilized Capacity",
      finding: data.capacity,
      implication: "Slack exists but isn't leveraged. The infrastructure hasn't caught up to the vision.",
    });
  }
  
  // If no specific insights, return default diagnostic structure
  if (insights.length === 0) {
    insights.push({
      type: "general",
      title: "System Assessment",
      finding: "Based on your responses, coordination overhead is consuming decision bandwidth.",
      implication: "The bottleneck isn't tools. It's the absence of intelligent routing architecture.",
    });
  }
  
  return insights;
};

export const ROIConfirmation = ({ diagnosticData, onProceedToBooking }: ROIConfirmationProps) => {
  const [visibleInsights, setVisibleInsights] = useState<number[]>([]);
  const diagnostic = generateDiagnostic(diagnosticData);

  useEffect(() => {
    diagnostic.forEach((_, index) => {
      setTimeout(() => {
        setVisibleInsights(prev => [...prev, index]);
      }, 600 + index * 400);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="w-12 h-12 rounded-full bg-bronze/10 flex items-center justify-center mx-auto mb-6 opacity-0 animate-fade-in">
            <AlertCircle className="w-6 h-6 text-bronze" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display text-foreground mb-6 opacity-0 animate-fade-up delay-100">
            Diagnostic Complete
          </h1>
          <p className="text-muted-foreground font-body text-lg opacity-0 animate-fade-up delay-200">
            Based on your responses, here's what the assessment revealed.
          </p>
        </div>

        {/* Diagnostic findings */}
        <div className="space-y-8 mb-20">
          {diagnostic.map((insight, index) => (
            <div
              key={index}
              className={`
                p-8 rounded-sm border border-border bg-card
                transition-all duration-700 transform
                ${visibleInsights.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
                }
              `}
            >
              <h3 className="text-xl font-display text-foreground mb-4">
                {insight.title}
              </h3>
              <p className="text-secondary-foreground font-body mb-4 leading-relaxed">
                <span className="text-bronze font-medium">Finding:</span> {insight.finding}
              </p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {insight.implication}
              </p>
            </div>
          ))}
        </div>

        {/* The Fix */}
        <div className="border border-border rounded-sm p-10 mb-12 opacity-0 animate-fade-up delay-500">
          <h3 className="font-display text-2xl text-foreground mb-4">
            The Fix
          </h3>
          <p className="text-secondary-foreground font-body mb-6 leading-relaxed">
            Intelligence isn't in the tools. It's in the architecture.
          </p>
          <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
            What you need isn't more software. It's workflow architecture that routes decisions intelligently, removes coordination overhead, and lets your judgment compound instead of deplete.
          </p>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            FLOW Agent OS provides the infrastructure layer. Context Architecture provides the routing logic. AIVA provides the interface.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center opacity-0 animate-fade-up delay-600">
          <Button
            variant="bronze"
            size="xl"
            onClick={onProceedToBooking}
            className="group"
          >
            Book Implementation Call
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="text-muted-foreground font-body text-sm mt-4">
            30-minute strategy call. We'll map your specific deployment.
          </p>
        </div>
      </div>
    </div>
  );
};
