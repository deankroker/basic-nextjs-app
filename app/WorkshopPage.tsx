"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import GoldenRetriever from "./GoldenRetriever";

type TipCard = {
  id: string;
  icon: string;
  emoji: string;
  title: string;
  preview: string;
  tips: { title: string; description: string }[];
  link?: { label: string; url: string };
  gradient: string;
};

const tipCards: TipCard[] = [
  {
    id: "git",
    icon: "</>",
    emoji: "🌿",
    title: "Git Basics",
    preview: "Clone, commit, push, branches",
    gradient: "from-emerald-500 to-teal-500",
    tips: [
      { title: "git clone <url>", description: "Download a repository to your local machine" },
      { title: "git add .", description: "Stage all changes for commit" },
      { title: 'git commit -m "message"', description: "Save staged changes with a description" },
      { title: "git push", description: "Upload commits to remote repository (GitHub)" },
      { title: "git pull", description: "Download and merge remote changes" },
    ],
    link: { label: "Git Handbook", url: "https://guides.github.com/introduction/git-handbook/" },
  },
  {
    id: "terminal",
    icon: ">_",
    emoji: "🖥️",
    title: "Terminal/CLI",
    preview: "Navigate like a pro",
    gradient: "from-violet-500 to-purple-500",
    tips: [
      { title: "cd <folder>", description: "Change directory - navigate into a folder" },
      { title: "cd ..", description: "Go up one directory level" },
      { title: "ls (or dir on Windows)", description: "List files and folders in current directory" },
      { title: "pwd", description: "Print working directory - see where you are" },
      { title: "clear (or cls)", description: "Clear the terminal screen" },
    ],
    link: { label: "Command Line Crash Course", url: "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line" },
  },
  {
    id: "opencode",
    icon: "AI",
    emoji: "🤖",
    title: "OpenCode Tips",
    preview: "/init, Tab, /models",
    gradient: "from-pink-500 to-rose-500",
    tips: [
      { title: "/init", description: "Creates Agent.md for project context - helps AI understand your codebase" },
      { title: "Tab (Plan vs Build)", description: "Toggle modes: Plan = safe exploration, Build = make changes" },
      { title: "/models", description: "Switch AI models - select GitHub Copilot for free access" },
      { title: "/help", description: "See all available slash commands" },
      { title: "Ctrl+P", description: "Open action palette for quick commands" },
    ],
    link: { label: "OpenCode Docs", url: "https://opencode.ai/docs" },
  },
  {
    id: "vscode",
    icon: "{}",
    emoji: "💻",
    title: "VS Code Shortcuts",
    preview: "Work faster with hotkeys",
    gradient: "from-blue-500 to-cyan-500",
    tips: [
      { title: "Ctrl+` (backtick)", description: "Toggle integrated terminal" },
      { title: "Ctrl+P", description: "Quick file open - type filename to jump to it" },
      { title: "Ctrl+Shift+P", description: "Command palette - access all VS Code commands" },
      { title: "Ctrl+/ ", description: "Toggle comment on selected lines" },
      { title: "Ctrl+Shift+V", description: "Preview markdown file" },
    ],
    link: { label: "VS Code Shortcuts", url: "https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf" },
  },
  {
    id: "node",
    icon: "npm",
    emoji: "📦",
    title: "Node/pnpm",
    preview: "Package management basics",
    gradient: "from-orange-500 to-amber-500",
    tips: [
      { title: "pnpm install (or pnpm i)", description: "Install all dependencies from package.json" },
      { title: "pnpm dev", description: "Start development server (runs next dev)" },
      { title: "pnpm add <package>", description: "Add a new dependency to your project" },
      { title: "package.json", description: "Config file listing dependencies and scripts" },
      { title: "node_modules/", description: "Folder with installed packages (don't edit or commit!)" },
    ],
    link: { label: "pnpm Docs", url: "https://pnpm.io/motivation" },
  },
  {
    id: "debug",
    icon: "!",
    emoji: "🐛",
    title: "Debugging Tips",
    preview: "Find and fix issues",
    gradient: "from-red-500 to-pink-500",
    tips: [
      { title: "console.log()", description: "Print values to browser/terminal to inspect them" },
      { title: "Browser DevTools (F12)", description: "Inspect elements, network, console in browser" },
      { title: "Read the error message", description: "Errors usually tell you the file and line number" },
      { title: "Google the error", description: "Copy the error message - someone else had it too" },
      { title: "Ask OpenCode!", description: "Paste the error and ask for help debugging" },
    ],
    link: { label: "Chrome DevTools Guide", url: "https://developer.chrome.com/docs/devtools/" },
  },
];

type Tab = "guide" | "reference";
type MascotMood = "idle" | "happy" | "excited" | "sleeping" | "thinking" | "love";

type Props = {
  readmeContent: string;
};

// Floating background blobs
const FloatingBlobs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      className="absolute w-96 h-96 rounded-full bg-purple-500/20 blob"
      initial={{ x: -100, y: -100 }}
      animate={{ x: ["-10%", "5%", "-10%"], y: ["-10%", "10%", "-10%"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-80 h-80 rounded-full bg-pink-500/20 blob"
      initial={{ x: "80%", y: "20%" }}
      animate={{ x: ["80%", "70%", "80%"], y: ["20%", "30%", "20%"] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-72 h-72 rounded-full bg-blue-500/20 blob"
      initial={{ x: "30%", y: "70%" }}
      animate={{ x: ["30%", "40%", "30%"], y: ["70%", "60%", "70%"] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-64 h-64 rounded-full bg-cyan-500/15 blob"
      initial={{ x: "60%", y: "80%" }}
      animate={{ x: ["60%", "50%", "60%"], y: ["80%", "90%", "80%"] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

// Sparkle effect component - client-only to avoid hydration mismatch
const Sparkles = ({ count = 20 }: { count?: number }) => {
  const [sparkles, setSparkles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    duration: number;
    delay: number;
    emoji: string;
  }>>([]);

  useEffect(() => {
    // Generate sparkles only on client side
    const emojis = ["✨", "⭐", "🌟", "💫"];
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 5,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setSparkles(generated);
  }, [count]);

  if (sparkles.length === 0) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute text-lg"
          initial={{ 
            x: `${sparkle.x}%`, 
            y: `${sparkle.y}%`,
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut"
          }}
        >
          {sparkle.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default function WorkshopPage({ readmeContent }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("guide");
  const [selectedCard, setSelectedCard] = useState<TipCard | null>(null);
  const [mascotMood, setMascotMood] = useState<MascotMood>("idle");
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [discoMode, setDiscoMode] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Konami code: up up down down left right left right b a
  const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === konamiCode[konamiProgress]) {
        const newProgress = konamiProgress + 1;
        setKonamiProgress(newProgress);
        
        if (newProgress === konamiCode.length) {
          // DISCO MODE ACTIVATED!
          setDiscoMode(true);
          setMascotMood("excited");
          fireConfetti();
          setTimeout(() => {
            setDiscoMode(false);
            setKonamiProgress(0);
          }, 10000);
        }
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiProgress]);

  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      
      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#a78bfa", "#f472b6", "#38bdf8", "#4ade80", "#fbbf24"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#a78bfa", "#f472b6", "#38bdf8", "#4ade80", "#fbbf24"],
      });
    }, 250);
  }, []);

  const handleCardSelect = (card: TipCard) => {
    setSelectedCard(card);
    setMascotMood("happy");
    
    // Mini confetti burst
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#a78bfa", "#f472b6", "#38bdf8"],
    });
    
    setTimeout(() => setMascotMood("idle"), 3000);
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSelectedCard(null);
  };

  // 3D tilt effect for cards
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>, cardId: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div className={`min-h-screen font-sans relative ${discoMode ? "animate-pulse" : ""}`}>
      {/* Background effects */}
      <FloatingBlobs />
      <Sparkles count={15} />
      
      {/* Disco mode overlay */}
      <AnimatePresence>
        {discoMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 pointer-events-none"
            style={{
              background: "linear-gradient(45deg, rgba(168,85,247,0.3), rgba(236,72,153,0.3), rgba(59,130,246,0.3), rgba(16,185,129,0.3))",
              backgroundSize: "400% 400%",
              animation: "gradient-shift 1s ease infinite",
            }}
          />
        )}
      </AnimatePresence>

      {/* Golden Retriever Mascot */}
      <GoldenRetriever onConfetti={fireConfetti} mood={mascotMood} />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 border-b border-white/10 glass"
      >
        <div className="mx-auto max-w-4xl px-6 py-6">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-0.5">
                <div className="h-full w-full rounded-[10px] bg-[#0f0a1f] flex items-center justify-center">
                  <span className="text-2xl">🐕</span>
                </div>
              </div>
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm">✨</span>
              </motion.div>
            </motion.div>
            <div>
              <motion.h1
                className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                animate={discoMode ? { 
                  backgroundPosition: ["0%", "100%", "0%"],
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                OpenCode Workshop
              </motion.h1>
              <p className="mt-1 text-sm text-white/60">
                Learn to vibe code with AI using your Microsoft license 🚀
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-2">
            {(["guide", "reference"] as Tab[]).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => handleTabChange(tab)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-lg border border-white/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === "guide" ? "📖 Workshop Guide" : "⚡ Quick Reference"}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-20 mx-auto max-w-4xl px-6 py-10">
        <AnimatePresence mode="wait">
          {activeTab === "guide" ? (
            <motion.article
              key="guide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="prose prose-invert max-w-none 
                prose-headings:font-bold 
                prose-headings:bg-gradient-to-r prose-headings:from-purple-400 prose-headings:to-pink-400 prose-headings:bg-clip-text prose-headings:text-transparent
                prose-h1:text-4xl 
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2 
                prose-h3:text-xl prose-h3:mt-8 
                prose-h4:text-lg 
                prose-code:rounded-lg prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:text-amber-300 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none 
                prose-pre:glass-card prose-pre:border-white/10
                prose-a:text-purple-400 hover:prose-a:text-pink-400 prose-a:transition-colors
                prose-blockquote:border-l-purple-500 prose-blockquote:glass prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-white/80 prose-blockquote:not-italic 
                prose-table:text-sm 
                prose-th:glass prose-th:px-3 prose-th:py-2 
                prose-td:px-3 prose-td:py-2 prose-td:border-white/10 
                prose-li:marker:text-purple-400
                prose-strong:text-white
                prose-p:text-white/80"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  pre: ({ children }) => (
                    <pre className="overflow-x-auto rounded-xl glass-card p-4 text-sm border border-white/10">
                      {children}
                    </pre>
                  ),
                  code: ({ className, children, ...props }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code
                          className="rounded-md bg-white/10 px-2 py-0.5 text-sm text-amber-300"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className="text-green-300" {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {readmeContent}
              </ReactMarkdown>
            </motion.article>
          ) : (
            <motion.div
              key="reference"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-6 text-white/60">
                Click a card to see detailed tips for each topic. 🎯
              </p>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tipCards.map((card, index) => (
                  <motion.button
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onClick={() => handleCardSelect(card)}
                    onMouseMove={(e) => handleMouseMove(e, card.id)}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() => setHoveredCard(card.id)}
                    className={`group glass-card rounded-2xl p-6 text-left transition-all duration-300 ${
                      selectedCard?.id === card.id
                        ? "ring-2 ring-purple-500 border-purple-500/50"
                        : ""
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div 
                      className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} text-white font-mono text-lg font-bold shadow-lg`}
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {card.emoji}
                    </motion.div>
                    <h2 className="font-semibold text-white text-lg">
                      {card.title}
                    </h2>
                    <p className="mt-1 text-sm text-white/50">
                      {card.preview}
                    </p>
                    
                    {/* Hover glow effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}
                    />
                  </motion.button>
                ))}
              </div>

              {/* Detail Panel */}
              <AnimatePresence>
                {selectedCard && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 glass-card rounded-2xl p-6"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${selectedCard.gradient} text-white text-xl`}>
                          {selectedCard.emoji}
                        </div>
                        <h2 className="text-xl font-bold text-white">
                          {selectedCard.title}
                        </h2>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedCard(null)}
                        className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                        aria-label="Close"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.button>
                    </div>

                    <ul className="space-y-4">
                      {selectedCard.tips.map((tip, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex gap-3"
                        >
                          <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${selectedCard.gradient} text-xs font-bold text-white`}>
                            {index + 1}
                          </span>
                          <div>
                            <code className="rounded-lg bg-white/10 px-2 py-1 font-mono text-sm text-amber-300">
                              {tip.title}
                            </code>
                            <p className="mt-1 text-sm text-white/60">
                              {tip.description}
                            </p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>

                    {selectedCard.link && (
                      <div className="mt-6 border-t border-white/10 pt-4">
                        <motion.a
                          href={selectedCard.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ x: 5 }}
                          className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-pink-400 transition-colors"
                        >
                          {selectedCard.link.label}
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </motion.a>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Fun footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 text-center"
              >
                <p className="text-sm text-white/30">
                  Press{" "}
                  <kbd className="rounded-lg border border-white/20 bg-white/5 px-2 py-1 font-mono text-xs text-white/60">
                    Tab
                  </kbd>{" "}
                  in OpenCode to toggle between Plan and Build mode
                </p>
                <p className="mt-4 text-xs text-white/20">
                  Made with 🦴 and 🤖 • Try the Konami code for a surprise! 🎮
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Fun footer */}
      <footer className="relative z-20 border-t border-white/10 py-6">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.p
            className="text-sm text-white/40"
            whileHover={{ scale: 1.02 }}
          >
            Built with 💜 for developers who want to have fun while learning
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
