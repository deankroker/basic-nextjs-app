"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type MascotState = "idle" | "happy" | "excited" | "sleeping" | "thinking" | "love";

const speechBubbles: Record<MascotState, string[]> = {
  idle: [
    "Woof! Need help? 🐕",
    "Click me for a trick!",
    "I believe in you! ✨",
    "You're doing great!",
    "Code is fun! 💻",
  ],
  happy: [
    "Yay! Good job! 🎉",
    "That's pawsome! 🐾",
    "Tail wags for you!",
    "*happy panting*",
    "You rock! 🎸",
  ],
  excited: [
    "WOW WOW WOW! 🤩",
    "SO EXCITING!!!",
    "*zoomies*",
    "BEST DAY EVER!",
    "LET'S GOOO! 🚀",
  ],
  sleeping: [
    "Zzz... 💤",
    "*snoring softly*",
    "Dreaming of treats...",
    "Five more minutes...",
  ],
  thinking: [
    "Hmm... 🤔",
    "*tilts head*",
    "Let me think...",
    "Interesting...",
  ],
  love: [
    "I love coding! 💖",
    "You're the best! 💕",
    "*heart eyes*",
    "So much love! 🥰",
  ],
};

interface GoldenRetrieverProps {
  onConfetti?: () => void;
  mood?: MascotState;
}

export default function GoldenRetriever({ onConfetti, mood: externalMood }: GoldenRetrieverProps) {
  const [state, setState] = useState<MascotState>("idle");
  const [showSpeech, setShowSpeech] = useState(true);
  const [speechText, setSpeechText] = useState(speechBubbles.idle[0]);
  const [clickCount, setClickCount] = useState(0);
  const [isDoingTrick, setIsDoingTrick] = useState(false);

  // Sync with external mood
  useEffect(() => {
    if (externalMood) {
      setState(externalMood);
    }
  }, [externalMood]);

  // Rotate speech bubbles
  useEffect(() => {
    const interval = setInterval(() => {
      const bubbles = speechBubbles[state];
      const randomBubble = bubbles[Math.floor(Math.random() * bubbles.length)];
      setSpeechText(randomBubble);
    }, 4000);
    return () => clearInterval(interval);
  }, [state]);

  // Auto-return to idle
  useEffect(() => {
    if (state !== "idle" && state !== "sleeping" && !externalMood) {
      const timeout = setTimeout(() => setState("idle"), 5000);
      return () => clearTimeout(timeout);
    }
  }, [state, externalMood]);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    
    if (clickCount >= 4) {
      // Easter egg: 5 clicks = excited + confetti
      setIsDoingTrick(true);
      setState("excited");
      onConfetti?.();
      setClickCount(0);
      setTimeout(() => setIsDoingTrick(false), 1000);
    } else {
      // Normal click: do a trick
      setIsDoingTrick(true);
      setState("happy");
      setTimeout(() => setIsDoingTrick(false), 600);
    }
  };

  const getTailAnimation = () => {
    switch (state) {
      case "excited":
        return { rotate: [-20, 20, -20, 20, -20], transition: { duration: 0.3, repeat: Infinity } };
      case "happy":
        return { rotate: [-15, 15], transition: { duration: 0.4, repeat: Infinity, repeatType: "reverse" as const } };
      case "sleeping":
        return { rotate: 0 };
      default:
        return { rotate: [-8, 8], transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse" as const } };
    }
  };

  const getBodyAnimation = () => {
    if (isDoingTrick) {
      return { 
        y: [0, -30, 0], 
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 1],
        transition: { duration: 0.6 } 
      };
    }
    switch (state) {
      case "excited":
        return { y: [0, -10, 0], transition: { duration: 0.3, repeat: Infinity } };
      case "sleeping":
        return { y: [0, 2, 0], transition: { duration: 2, repeat: Infinity } };
      default:
        return { y: [0, -3, 0], transition: { duration: 2, repeat: Infinity } };
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showSpeech && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="glass-card rounded-2xl rounded-br-sm px-4 py-2 max-w-[180px] text-center"
          >
            <p className="text-sm font-medium text-white/90">{speechText}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dog */}
      <motion.div
        className="cursor-pointer select-none"
        onClick={handleClick}
        animate={getBodyAnimation()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Tail */}
          <motion.path
            d="M75 60 Q90 45 85 35"
            stroke="#D4A44C"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            animate={getTailAnimation()}
            style={{ originX: "75px", originY: "60px" }}
          />
          
          {/* Back leg */}
          <ellipse cx="70" cy="75" rx="8" ry="12" fill="#C4943C" />
          
          {/* Body */}
          <ellipse cx="55" cy="60" rx="25" ry="20" fill="#D4A44C" />
          
          {/* Front leg */}
          <ellipse cx="38" cy="75" rx="7" ry="12" fill="#C4943C" />
          
          {/* Chest fluff */}
          <ellipse cx="40" cy="55" rx="12" ry="10" fill="#E8C36A" />
          
          {/* Head */}
          <circle cx="32" cy="40" r="20" fill="#D4A44C" />
          
          {/* Snout */}
          <ellipse cx="20" cy="45" rx="12" ry="8" fill="#E8C36A" />
          
          {/* Nose */}
          <ellipse cx="12" cy="44" rx="4" ry="3" fill="#333" />
          
          {/* Nose shine */}
          <circle cx="11" cy="43" r="1.5" fill="#666" />
          
          {/* Ears */}
          <ellipse cx="45" cy="28" rx="10" ry="14" fill="#B8843C" transform="rotate(20 45 28)" />
          <ellipse cx="22" cy="25" rx="8" ry="12" fill="#B8843C" transform="rotate(-15 22 25)" />
          
          {/* Eyes */}
          {state === "sleeping" ? (
            <>
              <path d="M25 38 Q30 36 35 38" stroke="#333" strokeWidth="2" strokeLinecap="round" />
              <path d="M36 35 Q41 33 46 35" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Left eye */}
              <circle cx="28" cy="38" r="5" fill="#fff" />
              <circle cx="29" cy="38" r="3" fill="#4A3728" />
              <circle cx="30" cy="37" r="1" fill="#fff" />
              
              {/* Right eye */}
              <circle cx="42" cy="36" r="5" fill="#fff" />
              <circle cx="43" cy="36" r="3" fill="#4A3728" />
              <circle cx="44" cy="35" r="1" fill="#fff" />
              
              {/* Eyebrows for expressions */}
              {state === "excited" && (
                <>
                  <path d="M24 32 L32 30" stroke="#B8843C" strokeWidth="2" strokeLinecap="round" />
                  <path d="M38 30 L46 32" stroke="#B8843C" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </>
          )}
          
          {/* Tongue (when happy/excited) */}
          {(state === "happy" || state === "excited") && (
            <motion.path
              d="M16 50 Q18 58 14 60"
              fill="#FF6B9D"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ originY: "50px" }}
            />
          )}
          
          {/* Blush (when love) */}
          {state === "love" && (
            <>
              <circle cx="20" cy="42" r="4" fill="#FF9999" opacity="0.5" />
              <circle cx="45" cy="40" r="4" fill="#FF9999" opacity="0.5" />
            </>
          )}
          
          {/* Hearts floating (when love) */}
          {state === "love" && (
            <motion.g
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -20 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <text x="5" y="25" fontSize="12">💕</text>
            </motion.g>
          )}
          
          {/* Zzz (when sleeping) */}
          {state === "sleeping" && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5], x: [0, 5, 0], y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <text x="50" y="25" fontSize="14" fill="#a78bfa">💤</text>
            </motion.g>
          )}

          {/* Sparkles (when excited) */}
          {state === "excited" && (
            <>
              <motion.text
                x="60" y="20" fontSize="10"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 180, 360] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
              >✨</motion.text>
              <motion.text
                x="10" y="15" fontSize="8"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, -180, -360] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
              >⭐</motion.text>
              <motion.text
                x="70" y="45" fontSize="10"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.5 }}
              >🌟</motion.text>
            </>
          )}
        </svg>
      </motion.div>

      {/* Toggle speech button */}
      <button
        onClick={() => setShowSpeech(!showSpeech)}
        className="text-xs text-white/40 hover:text-white/70 transition-colors"
      >
        {showSpeech ? "shh..." : "speak!"}
      </button>
    </div>
  );
}
