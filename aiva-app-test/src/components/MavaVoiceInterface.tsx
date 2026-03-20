import { useState } from "react";
import { Mic, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MavaVoiceInterfaceProps {
  onComplete: (responses: Record<string, string>) => void;
}

const contextQuestions = [
  {
    id: "capacity",
    question: "Where does Digital Fog show up most in your day-to-day flow?",
    followUp: "Name the friction points where execution stalls.",
  },
  {
    id: "bottleneck",
    question: "Where does Tool Drool create more drag than leverage?",
    followUp: "Identify the tools that increase noise instead of clarity.",
  },
  {
    id: "delegation",
    question: "What should be routed automatically but still depends on you?",
    followUp: "Your judgment should compound, not get trapped in handoffs.",
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
        const question = contextQuestions[currentQuestion];
        const nextResponses = {
          ...responses,
          [question.id]: "Voice response captured",
        };
        setResponses(nextResponses);
        setIsListening(false);
        setIsProcessing(false);
        setTranscript("");
        
        if (currentQuestion < contextQuestions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
        } else {
          onComplete(nextResponses);
        }
      }, 1500);
    }, 3000);
  };

  const handleSkip = () => {
    const question = contextQuestions[currentQuestion];
    const nextResponses = {
      ...responses,
      [question.id]: "Skipped",
    };
    setResponses(nextResponses);
    
    if (currentQuestion < contextQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(nextResponses);
    }
  };

  const question = contextQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / contextQuestions.length) * 100;

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
          {currentQuestion + 1} of {contextQuestions.length}
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
