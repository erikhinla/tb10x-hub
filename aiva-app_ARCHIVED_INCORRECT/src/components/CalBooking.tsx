import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";

interface CalBookingProps {
  onBack: () => void;
}

export const CalBooking = ({ onBack }: CalBookingProps) => {
  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full">
        {/* Back button */}
        <Button
          variant="minimal"
          onClick={onBack}
          className="mb-12 opacity-0 animate-fade-in"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to summary
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-bronze/10 flex items-center justify-center mx-auto mb-6 opacity-0 animate-fade-up">
            <Calendar className="w-7 h-7 text-bronze" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display text-foreground mb-4 opacity-0 animate-fade-up delay-100">
            Select your time
          </h1>
          <p className="text-muted-foreground font-body opacity-0 animate-fade-up delay-200">
            30-minute implementation call. We'll map your specific deployment.
          </p>
        </div>

        {/* Cal.com embed placeholder */}
        <div className="opacity-0 animate-fade-up delay-300">
          <div 
            className="border border-border rounded-sm bg-card p-8 min-h-[500px] flex flex-col items-center justify-center"
          >
            {/* This would be replaced with actual Cal.com embed */}
            <div className="text-center">
              <p className="text-muted-foreground font-body mb-6">
                Cal.com scheduling interface loads here
              </p>
              <div className="space-y-3">
                {["Monday, Jan 15", "Tuesday, Jan 16", "Wednesday, Jan 17"].map((day, i) => (
                  <div key={i} className="border border-border rounded-sm p-4 hover:border-bronze/50 transition-colors cursor-pointer">
                    <p className="text-foreground font-body mb-2">{day}</p>
                    <div className="flex gap-2 justify-center">
                      {["10:00 AM", "2:00 PM", "4:00 PM"].map((time, j) => (
                        <button
                          key={j}
                          className="px-3 py-1 text-sm border border-border rounded hover:bg-bronze/10 hover:border-bronze/30 transition-colors text-muted-foreground hover:text-foreground"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-muted-foreground font-body text-sm mt-8 opacity-0 animate-fade-in delay-400">
          All times shown in your local timezone
        </p>
      </div>
    </div>
  );
};
