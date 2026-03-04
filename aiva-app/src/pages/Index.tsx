import { useState } from "react";
import { Hero } from "@/components/Hero";
import { MavaVoiceInterface } from "@/components/MavaVoiceInterface";
import { ROIConfirmation } from "@/components/ROIConfirmation";
import { CalBooking } from "@/components/CalBooking";

type FlowStep = "landing" | "diagnostic" | "roi" | "booking";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("landing");
  const [diagnosticData, setDiagnosticData] = useState<Record<string, string>>({});

  const handleBeginDiagnostic = () => {
    setCurrentStep("diagnostic");
  };

  const handleDiagnosticComplete = (responses: Record<string, string>) => {
    setDiagnosticData(responses);
    setCurrentStep("roi");
  };

  const handleProceedToBooking = () => {
    setCurrentStep("booking");
  };

  const handleBackToROI = () => {
    setCurrentStep("roi");
  };

  return (
    <main className="bg-background min-h-screen">
      {currentStep === "landing" && (
        <Hero onBeginDiagnostic={handleBeginDiagnostic} />
      )}

      {currentStep === "diagnostic" && (
        <MavaVoiceInterface onComplete={handleDiagnosticComplete} />
      )}

      {currentStep === "roi" && (
        <ROIConfirmation
          diagnosticData={diagnosticData}
          onProceedToBooking={handleProceedToBooking}
        />
      )}

      {currentStep === "booking" && (
        <CalBooking onBack={handleBackToROI} />
      )}
    </main>
  );
};

export default Index;
