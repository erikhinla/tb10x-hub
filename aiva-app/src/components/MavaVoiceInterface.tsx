import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MavaVoiceInterfaceProps {
  onComplete: (responses: Record<string, string>) => void;
}

const diagnosticQuestions = [
  {
    id: "capacity",
    question: "How much of your current capacity goes unutilized each week?",
    followUp: "Understanding your slack reveals where leverage exists.",
  },
  {
    id: "bottleneck",
    question: "What's the primary constraint on your growth right now?",
    followUp: "Constraints aren't problems. They're routing signals.",
  },
  {
    id: "delegation",
    question: "What decisions currently require your presence that shouldn't?",
    followUp: "Your judgment should compound, not deplete.",
  },
];

export const MavaVoiceInterface = ({ onComplete }: MavaVoiceInterfaceProps) => {
  const [isListening, setIsListening] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleStartListening = () => {
    setIsListening(true);
    // Simulate voice input for demo
    setTimeout(() => {
      setTranscript("Processing your response...");
      setIsProcessing(true);
      setTimeout(() => {
        const question = diagnosticQuestions[currentQuestion];
        setResponses(prev => ({
          ...prev,
          [question.id]: "Voice response captured",
        }));
        setIsListening(false);
        setIsProcessing(false);
        setTranscript("");
        
        if (currentQuestion < diagnosticQuestions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
        } else {
          onComplete(responses);
        }
      }, 1500);
    }, 3000);
  };

  const handleSkip = () => {
    const question = diagnosticQuestions[currentQuestion];
    setResponses(prev => ({
      ...prev,
      [question.id]: "Skipped",
    }));
    
    if (currentQuestion < diagnosticQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(responses);
    }
  };

  const question = diagnosticQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / diagnosticQuestions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      {/* Progress indicator */}
      <div className="w-full max-w-md mb-16 opacity-0 animate-fade-in">
        <div className="h-px bg-border overflow-hidden">
          <div 
            className="h-full bg-bronze transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-muted-foreground text-sm mt-3 font-body">
          {currentQuestion + 1} of {diagnosticQuestions.length}
        </p>
      </div>

      {/* Question */}
      <div className="text-center max-w-2xl mb-16">
        <h2 className="text-3xl md:text-4xl font-display text-foreground mb-6 opacity-0 animate-fade-up">
          {question.question}
        </h2>
        <p className="text-muted-foreground font-body text-lg opacity-0 animate-fade-up delay-200">
          {question.followUp}
        </p>
      </div>

      {/* Voice interface */}
      <div className="flex flex-col items-center gap-8 opacity-0 animate-fade-up delay-300">
        <button
          onClick={handleStartListening}
          disabled={isListening || isProcessing}
          className={`
            relative w-24 h-24 rounded-full flex items-center justify-center
            transition-all duration-500 
            ${isListening 
              ? 'bg-bronze/20 voice-pulse' 
              : 'bg-secondary hover:bg-bronze/10 hover:border-bronze/30'
            }
            border border-border
          `}
        >
          {isListening ? (
            <Volume2 className="w-8 h-8 text-bronze animate-pulse" />
          ) : (
            <Mic className="w-8 h-8 text-muted-foreground" />
          )}
        </button>

        {transcript && (
          <p className="text-muted-foreground font-body text-sm animate-fade-in">
            {transcript}
          </p>
        )}

        <p className="text-muted-foreground font-body text-sm">
          {isListening ? "Listening..." : "Tap to speak"}
        </p>

        <Button
          variant="minimal"
          onClick={handleSkip}
          disabled={isListening || isProcessing}
          className="mt-4"
        >
          Continue without voice
        </Button>
      </div>
    </div>
  );
};
