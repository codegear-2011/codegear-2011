import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Send, Bot, User, Trash2, HelpCircle } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
  time: string;
}

export default function AIRepresentative() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "### Welcome to CodeGear Assistant! 👋\n\nI am an AI agent trained directly on CodeGear's actual experience timeline, technologies, and published deployments.\n\nAsk me questions like:\n- *What are his competencies in React and TypeScript?*\n- *Explain the architecture of PolyFlow AI.*\n- *How can I submit a freelance request and what is his rate guidance?*",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    "List tech stack & years of experience",
    "Explain PolyFlow AI project in depth",
    "Typical price/timeline guidelines",
    "Is CodeGear open to relocation?"
  ];

  useEffect(() => {
    if (messages.length > 1 || isLoading) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      role: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(1).map((m) => ({
            role: m.role,
            text: m.text
          }))
        })
      });

      const data = await response.json();
      
      const replyMsg: Message = {
        role: "model",
        text: data.reply || "I apologize, but my core thread experienced a timeout. Could you ask again?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, replyMsg]);
    } catch (err) {
      console.error("Failed to query portfolio AI representative:", err);
      const errorMsg: Message = {
        role: "model",
        text: "### Oops! Backend Timeout ⚡\n\nI encountered an error querying the portfolio server-side integration. Please ensure the Express server is up and verify network connections.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "model",
        text: "### Thread cleared successfully! ✨\n\nWhat other professional queries can I answer about CodeGear's skills, experience, or project availability?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

  // Basic markdown inline bolding/headers parse
  const parseSimpleMarkdown = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, li) => {
      let content: React.ReactNode = line;
      
      // Headers
      if (line.startsWith("### ")) {
        return <h4 key={li} className="font-bold text-gray-900 dark:text-white mt-4 mb-2 text-sm sm:text-base">{line.slice(4)}</h4>;
      }
      if (line.startsWith("#### ")) {
        return <h5 key={li} className="font-bold text-gray-900 dark:text-white mt-3 mb-1 text-xs sm:text-sm">{line.slice(5)}</h5>;
      }
      if (line.startsWith("## ")) {
        return <h3 key={li} className="font-extrabold text-gray-900 dark:text-white mt-5 mb-2.5 text-base sm:text-lg">{line.slice(3)}</h3>;
      }
      if (line.startsWith("⚠️")) {
        return <div key={li} className="p-3 my-2 border border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400 rounded-lg text-xs leading-relaxed">{line}</div>;
      }
      if (line.startsWith("❌")) {
        return <div key={li} className="p-3 my-2 border border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400 rounded-lg text-xs leading-relaxed">{line}</div>;
      }
      
      // Bullets
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const bulletText = line.trim().slice(2);
        return (
          <li key={li} className="ml-4 list-disc text-xs sm:text-sm text-gray-700 dark:text-slate-300 my-1">
            {bulletText.split("**").map((part, pi) => pi % 2 === 1 ? <strong key={pi} className="font-semibold text-gray-900 dark:text-white">{part}</strong> : part)}
          </li>
        );
      }

      // Standard paragraphs with basic **bold** parsing
      if (line.trim() !== "") {
        const parts = line.split("**");
        content = parts.map((part, pi) => {
          if (pi % 2 === 1) {
            return <strong key={pi} className="font-semibold text-gray-900 dark:text-white">{part}</strong>;
          }
          // handle italics
          const subParts = part.split("*");
          return subParts.map((sub, si) => si % 2 === 1 ? <em key={si} className="italic text-gray-800 dark:text-slate-200">{sub}</em> : sub);
        });
        return <p key={li} className="text-xs sm:text-sm text-gray-700 dark:text-slate-300 my-1.5 leading-relaxed font-normal">{content}</p>;
      }

      return <div key={li} className="h-2" />;
    });
  };

  return (
    <section
      id="ai-assistant"
      className="py-24 relative overflow-hidden bg-slate-50 dark:bg-[#050505]"
    >
      {/* Glow */}
      <div className="glow-orb w-[420px] h-[420px] top-1/10 right-1/10 bg-indigo-900/10 dark:bg-indigo-900/15 animate-pulse-slow"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Gemini Conversational Agent
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-4">
            AI Assistant Desk
          </h2>
          <p className="mt-3 text-gray-600 dark:text-slate-400 font-sans text-sm sm:text-base">
            Consult CodeGear's server-side AI representative about his stack, capabilities, past deployments, or request freelance budgeting estimates instantly.
          </p>
        </div>

        {/* Chat Interface Container */}
        <div className="glass-panel-heavy rounded-2xl overflow-hidden border border-gray-200/50 dark:border-white/5 shadow-xl flex flex-col h-[520px]">
          {/* Header */}
          <div className="px-6 py-4 bg-slate-100/90 dark:bg-[#050505]/90 border-b border-gray-200/50 dark:border-white/5 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-amber-500/10 dark:bg-amber-400/15 flex items-center justify-center text-amber-500">
                <Bot className="w-5 h-5 pulse-ai" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-sm text-gray-900 dark:text-white">
                  CodeGear AI Representative
                </h3>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active & Security Hardened
                </span>
              </div>
            </div>

            <button
              id="clear-chat-btn"
              onClick={handleClearChat}
              className="p-2 rounded-lg border border-gray-200/50 dark:border-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-all cursor-pointer"
              title="Clear Thread History"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Panel Scroll Area */}
          <div className="flex-1 p-5 overflow-y-auto bg-white/40 dark:bg-slate-950/30 flex flex-col space-y-5">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-start gap-2.5 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    {/* Role Avatar */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs shadow-sm border ${
                      msg.role === "user"
                        ? "bg-indigo-600/10 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                        : "bg-amber-500/10 border-amber-400 text-amber-500"
                    }`}>
                      {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    {/* Bubble Content */}
                    <div className={`p-4 rounded-2xl text-xs sm:text-sm select-text ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none shadow-sm font-medium"
                        : "glass-panel rounded-tl-none border-gray-200/60 dark:border-white/5"
                    }`}>
                      {msg.role === "user" ? (
                        <p className="whitespace-pre-wrap leading-relaxed select-text">{msg.text}</p>
                      ) : (
                        <div className="space-y-1.5 select-text">
                          {parseSimpleMarkdown(msg.text)}
                        </div>
                      )}
                      <span className={`block text-[9px] mt-1.5 text-right font-mono ${
                        msg.role === "user" ? "text-indigo-200" : "text-gray-400 dark:text-slate-500"
                      }`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Chat Loader element */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2.5 max-w-[85%]">
                    <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-400 text-amber-500 flex items-center justify-center">
                      <Bot className="w-4 h-4 pulse-ai" />
                    </div>
                    <div className="glass-panel p-4 rounded-2xl rounded-tl-none border-gray-200/60 dark:border-white/5 flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-5 py-3 border-t border-gray-100 dark:border-white/5 bg-white/80 dark:bg-[#050505]/85 flex items-center gap-2 overflow-x-auto select-none shrink-0 scrollbar-none">
            <HelpCircle className="w-4 h-4 text-gray-400 shrink-0" />
            <div className="flex items-center space-x-2 shrink-0">
              {suggestionChips.map((chip, index) => (
                <button
                  key={index}
                  id={`ai-suggestion-chip-${index}`}
                  onClick={() => handleSendMessage(chip)}
                  className="px-3 py-1.5 bg-slate-50 dark:bg-white/5 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-gray-600 dark:text-slate-400 text-[11px] font-semibold rounded-lg border border-gray-200/40 dark:border-white/5 transition-all cursor-pointer whitespace-nowrap active:scale-95"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* TextInput Panel */}
          <div className="p-4 bg-slate-100/90 dark:bg-[#050505]/95 border-t border-gray-200/50 dark:border-white/5 flex gap-3 shrink-0">
            <input
              type="text"
              id="ai-chat-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
              placeholder="Ask me something, or check rate guidelines..."
              className="flex-1 px-4.5 py-3 rounded-xl border border-gray-200/60 dark:border-white/5 text-sm focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 leading-snug"
            />
            <button
              id="ai-send-btn"
              onClick={() => handleSendMessage(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              className="px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-200 dark:disabled:bg-white/5 text-white disabled:text-gray-400 flex items-center justify-center transition-all cursor-pointer shadow-md shadow-indigo-500/10 active:scale-95 shrink-0"
              title="Submit Prompt"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
