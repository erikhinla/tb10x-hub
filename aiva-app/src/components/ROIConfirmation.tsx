import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

interface ROIConfirmationProps {
  diagnosticData: Record<string, string>;
  onProceedToBooking: () => void;
}

const insights = [
  {
    metric: "12-18 hrs",
    label: "Weekly capacity recovered",
    detail: "Through intelligent decision routing",
  },
  {
    metric: "40%",
    label: "Reduction in owner-dependent decisions",
    detail: "Without sacrificing quality",
  },
  {
    metric: "3.2x",
    label: "Increase in qualified consultations",
    detail: "From optimized intake flow",
  },
];

export const ROIConfirmation = ({ diagnosticData, onProceedToBooking }: ROIConfirmationProps) => {
  const [visibleInsights, setVisibleInsights] = useState<number[]>([]);

  useEffect(() => {
    insights.forEach((_, index) => {
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
          <p className="text-bronze font-body text-sm tracking-widest uppercase mb-4 opacity-0 animate-fade-in">
            Diagnostic Complete
          </p>
          <h1 className="text-4xl md:text-5xl font-display text-foreground mb-6 opacity-0 animate-fade-up delay-100">
            Your leverage points are clear
          </h1>
          <p className="text-muted-foreground font-body text-lg opacity-0 animate-fade-up delay-200">
            Based on your responses, here's what MĀVĀ can unlock.
          </p>
        </div>

        {/* Insights grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {insights.map((insight, index) => (
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
              <p className="text-4xl font-display text-bronze mb-3">
                {insight.metric}
              </p>
              <p className="text-foreground font-body font-medium mb-2">
                {insight.label}
              </p>
              <p className="text-muted-foreground font-body text-sm">
                {insight.detail}
              </p>
            </div>
          ))}
        </div>

        {/* What's included */}
        <div className="border border-border rounded-sm p-10 mb-12 opacity-0 animate-fade-up delay-500">
          <h3 className="font-display text-xl text-foreground mb-6">
            The engagement includes
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "MĀVĀ voice interface deployment",
              "Custom decision routing logic",
              "Intake optimization system",
              "30-day calibration period",
              "Owner dashboard access",
              "Ongoing model refinement",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-bronze/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-bronze" />
                </div>
                <span className="text-secondary-foreground font-body text-sm">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center opacity-0 animate-fade-up delay-600">
          <Button
            variant="bronze"
            size="xl"
            onClick={onProceedToBooking}
            className="group"
          >
            Schedule Implementation Call
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="text-muted-foreground font-body text-sm mt-4">
            30-minute strategic session. No preparation required.
          </p>
        </div>
      </div>
    </div>
  );
};
