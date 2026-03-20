import { useState } from "react";
import { Hero } from "@/components/Hero";
import { MavaVoiceInterface } from "@/components/MavaVoiceInterface";
import { ROIConfirmation } from "@/components/ROIConfirmation";
import { CalBooking } from "@/components/CalBooking";

type FlowStep = "landing" | "conversation" | "clarity" | "booking";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("landing");
  const [contextData, setContextData] = useState<Record<string, string>>({});

  const handleBeginConversation = () => {
    setCurrentStep("conversation");
  };

  const handleConversationComplete = (responses: Record<string, string>) => {
    setContextData(responses);
    setCurrentStep("clarity");
  };

  const handleProceedToBooking = () => {
    setCurrentStep("booking");
  };

  const handleBackToClarity = () => {
    setCurrentStep("clarity");
  };

  return (
    <main className="bg-background min-h-screen">
      {currentStep === "landing" && (
        <Hero onBeginConversation={handleBeginConversation} />
      )}

      {currentStep === "conversation" && (
        <MavaVoiceInterface onComplete={handleConversationComplete} />
      )}

      {currentStep === "clarity" && (
        <ROIConfirmation
          contextData={contextData}
          onProceedToBooking={handleProceedToBooking}
        />
      )}

      {currentStep === "booking" && (
        <CalBooking onBack={handleBackToClarity} />
      )}
    </main>
  );
};

export default Index;
