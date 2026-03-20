import { useState, useRef, useEffect } from "react";
import { Mic, Volume2, Loader2, Square } from "lucide-react";
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
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("Connected. I am listening.");

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create hidden audio element for AI voice output
    const audioEl = document.createElement("audio");
    audioEl.autoplay = true;
    audioRef.current = audioEl;
    document.body.appendChild(audioEl);

    return () => {
      document.body.removeChild(audioEl);
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, []);

  const handleStartSession = async () => {
    setIsProcessing(true);
    setTranscript("Initializing secure WebRTC channel...");

    try {
      // 1. Get an ephemeral session token using the API key from Vite env
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      if (!apiKey) {
        throw new Error("Missing VITE_OPENAI_API_KEY in environment variables.");
      }

      const tokenResponse = await fetch("https://api.openai.com/v1/realtime/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview-2024-12-17",
          voice: "ash", // Ash is a good voice for the concierge
          instructions: `You are AIVA, an elite AI Concierge for Transform By 10X. You exist to diagnose executive friction.
You must guide the user through 3 specific questions, one by one. Do not ask the next until they have answered the current one.
Keep your responses incredibly sharp, slightly edgy, and focused on infrastructure over tools.

Question 1: Where does Digital Fog show up most in your day-to-day flow? Name the friction points where execution stalls.
Question 2: Where does Tool Drool create more drag than leverage? Identify the tools that increase noise instead of clarity.
Question 3: What should be routed automatically but still depends on you? Your judgment should compound, not get trapped in handoffs.

When the user has answered all 3, explicitly say "Diagnosis complete. Processing your architecture." and trigger the function call 'completeDiagnosis'.`
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error("Failed to get ephemeral token");
      }

      const tokenData = await tokenResponse.json();
      const ephemeralKey = tokenData.client_secret.value;

      // 2. Set up WebRTC Peer Connection
      const pc = new RTCPeerConnection();
      peerConnectionRef.current = pc;

      // 3. Set up audio output
      pc.ontrack = (e) => {
        if (audioRef.current && e.streams[0]) {
          audioRef.current.srcObject = e.streams[0];
        }
      };

      // 4. Set up audio input
      const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
      pc.addTrack(ms.getTracks()[0], ms);

      // 5. Set up Data Channel for events and transcripts
      const dc = pc.createDataChannel("oai-events");
      dataChannelRef.current = dc;

      dc.addEventListener("message", (e) => {
        try {
          const event = JSON.parse(e.data);
          console.debug("Realtime Event:", event);

          if (event.type === "response.audio_transcript.delta") {
            setTranscript(prev => {
              // Simple heuristic to clear after a while or just keep the latest sentence
              const newText = event.delta;
              return newText;
            });
          }

          if (event.type === "response.audio_transcript.done") {
            setTranscript(event.transcript);
          }

          // Very simple fallback heuristic: if the AI says it's done, we move on
          if (event.type === "response.audio_transcript.done" && event.transcript.toLowerCase().includes("diagnosis complete")) {
            // Fake the responses based on the questions since we didn't hook up full complex function calling parsing here yet
            handleSkip();
          }
        } catch (err) {
          console.error("Failed to parse data channel message", err);
        }
      });

      // 6. Connect to OpenAI
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpResponse = await fetch(`https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${ephemeralKey}`,
          "Content-Type": "application/sdp"
        },
      });

      if (!sdpResponse.ok) {
        throw new Error("Failed to connect to OpenAI Realtime SDP endpoint");
      }

      const answer: RTCSessionDescriptionInit = {
        type: "answer",
        sdp: await sdpResponse.text(),
      };
      await pc.setRemoteDescription(answer);

      setIsSessionActive(true);
      setTranscript("AIVA is listening. Speak your diagnosis.");
    } catch (error) {
      console.error(error);
      setTranscript("Connection failed. Check your API key or permissions.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStopSession = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setIsSessionActive(false);
  };

  const handleSkip = () => {
    handleStopSession();
    // Pass back some dummy data just to keep the flow moving if we skip
    const nextResponses = {
      capacity: "Skipped / Voice Captured",
      bottleneck: "Skipped / Voice Captured",
      delegation: "Skipped / Voice Captured",
    };
    onComplete(nextResponses);
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
        {!isSessionActive ? (
          <button
            onClick={handleStartSession}
            disabled={isProcessing}
            className={`
              relative w-24 h-24 rounded-full flex items-center justify-center
              transition-all duration-500 bg-secondary hover:bg-bronze/10 hover:border-bronze/30
              border border-border
            `}
          >
            {isProcessing ? (
              <Loader2 className="w-8 h-8 text-bronze animate-spin" />
            ) : (
              <Mic className="w-8 h-8 text-muted-foreground" />
            )}
          </button>
        ) : (
          <button
            onClick={handleStopSession}
            className={`
              relative w-24 h-24 rounded-full flex items-center justify-center
              transition-all duration-500 bg-bronze/20 voice-pulse
              border border-border
            `}
          >
            <Square className="w-8 h-8 text-bronze fill-bronze" />
          </button>
        )}

        {transcript && (
          <p className="text-muted-foreground font-body text-sm animate-fade-in text-center max-w-md min-h-12">
            {transcript}
          </p>
        )}

        <p className="text-muted-foreground font-body text-sm">
          {isSessionActive ? "Live WebRTC Session Active" : isProcessing ? "Connecting..." : "Tap to Speak with AIVA"}
        </p>

        <Button
          variant="minimal"
          onClick={handleSkip}
          className="mt-4"
        >
          {isSessionActive ? "Force Complete Diagnosis" : "Skip Voice Diagnosis"}
        </Button>
      </div>
    </div>
  );
};
