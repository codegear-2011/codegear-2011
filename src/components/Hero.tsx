import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Terminal, Cpu, ArrowRight, Github, Linkedin, ShieldAlert } from "lucide-react";
import { PORTFOLIO_OWNER } from "../data";

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  const [activeCodeTab, setActiveCodeTab] = useState<"agent" | "server" | "crdt">("agent");

  const codeSnippets = {
    agent: `// agent.ts - Multi-Agent Gemini Orchestrator
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

export async function routeAgentQuery(prompt: string) {
  const result = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      temperature: 0.1,
      systemInstruction: "Act as an expert SQL optimizer..."
    }
  });
  return result.text;
}`,
    server: `// server.ts - High-Speed Express Gateway
import express from "express";
import { createServer } from "vite";

const app = express();
app.use(express.json());

app.post("/api/pipeline/exec", async (req, res) => {
  const { nodeGraph, payload } = req.body;
  const metrics = await Broker.dispatch(nodeGraph, payload);
  res.status(201).json({ status: "ok", metrics });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Fullstack Gateway online at Port 3000!");
});`,
    crdt: `// sync.ts - Real-Time Document Synchronization
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export class DocumentSession {
  private doc = new Y.Doc();
  private sharedText = this.doc.getText("markdown");

  constructor(serverUrl: string, room: string) {
    const provider = new WebsocketProvider(serverUrl, room, this.doc);
    this.sharedText.observe(event => {
      UI.renderPreview(this.sharedText.toString());
    });
  }
}`
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#050505]"
    >
      {/* Background Decorative Radial Glows (Orbs) */}
      <div className="glow-orb w-[420px] h-[420px] top-1/4 left-1/10 bg-indigo-900/10 dark:bg-indigo-900/15 blur-[120px]"></div>
      <div className="glow-orb w-[350px] h-[350px] bottom-1/4 right-1/10 bg-slate-800/10 dark:bg-slate-800/20 blur-[100px]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Info Columns */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Announcement badge */}
            <motion.div variants={itemVariants} className="inline-flex self-start">
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-600/10 dark:bg-indigo-400/10 border border-indigo-600/20 dark:border-indigo-400/20">
                <Sparkles className="w-3.5 h-3.5" />
                Available for fullstack projects
              </span>
            </motion.div>

            {/* Main Title heading using elegant Serif pairings */}
            <motion.div space-y-2 variants={itemVariants}>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 dark:text-white leading-tight">
                Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-indigo-400 to-slate-400">{PORTFOLIO_OWNER.name}</span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-sans font-semibold text-gray-700 dark:text-slate-300">
                {PORTFOLIO_OWNER.title}
              </h2>
            </motion.div>

            {/* About / description */}
            <motion.p 
              variants={itemVariants}
              className="font-sans text-base sm:text-lg text-gray-600 dark:text-slate-400 max-w-xl leading-relaxed"
            >
              {PORTFOLIO_OWNER.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => scrollToSection("projects")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                View Selected Work
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => scrollToSection("ai-assistant")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 dark:border-white/10 text-sm font-semibold rounded-xl text-gray-800 dark:text-white bg-white/40 dark:bg-white/5 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/10 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-amber-500 animate-spin-slow" />
                Consult AI Agent
              </button>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div 
              variants={itemVariants} 
              className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200/60 dark:border-white/5"
            >
              <div>
                <p className="font-sans text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">5+</p>
                <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-indigo-500 mt-1">Years Coding</p>
              </div>
              <div>
                <p className="font-sans text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">15+</p>
                <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 mt-1">Pro Projects</p>
              </div>
              <div>
                <p className="font-sans text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">2.5k+</p>
                <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-amber-500 mt-1">GitHub Stars</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Code Editor (Right Column) */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", duration: 1.2, delay: 0.3 }}
          >
            {/* Glow backing */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-slate-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition duration-1000"></div>
            
            {/* The main editor glass shell */}
            <div className="relative glass-panel-heavy rounded-2xl overflow-hidden border border-white/20 dark:border-white/5 shadow-2xl">
              {/* Header bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-100/90 dark:bg-[#050505]/95 border-b border-gray-200/50 dark:border-white/5">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="ml-2 font-mono text-xs text-gray-500 dark:text-slate-400 font-medium">~/codegear-core</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-white/70 dark:bg-white/5 px-2 py-1 rounded-md border border-gray-200/30 dark:border-white/5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="font-mono text-[10px] text-gray-600 dark:text-slate-300 uppercase tracking-widest">TypeScript</span>
                </div>
              </div>

              {/* Files Tab selection bar */}
              <div className="flex bg-slate-50/50 dark:bg-[#050505]/40 border-b border-gray-200/30 dark:border-white/5 overflow-x-auto">
                <button
                  id="tab-agent"
                  onClick={() => setActiveCodeTab("agent")}
                  className={`px-4 py-2 border-r border-gray-200/30 dark:border-white/5 font-mono text-xs font-medium transition-all flex items-center gap-1.5 ${
                    activeCodeTab === "agent"
                      ? "bg-white dark:bg-[#050505] text-indigo-600 dark:text-indigo-400 border-b-2 border-b-indigo-500"
                      : "text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/5"
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  agent.ts
                </button>
                <button
                  id="tab-server"
                  onClick={() => setActiveCodeTab("server")}
                  className={`px-4 py-2 border-r border-gray-200/30 dark:border-white/5 font-mono text-xs font-medium transition-all flex items-center gap-1.5 ${
                    activeCodeTab === "server"
                      ? "bg-white dark:bg-[#050505] text-indigo-600 dark:text-indigo-400 border-b-2 border-b-indigo-500"
                      : "text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/5"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  server.ts
                </button>
                <button
                  id="tab-crdt"
                  onClick={() => setActiveCodeTab("crdt")}
                  className={`px-4 py-2 font-mono text-xs font-medium transition-all flex items-center gap-1.5 ${
                    activeCodeTab === "crdt"
                      ? "bg-white dark:bg-[#050505] text-indigo-600 dark:text-indigo-400 border-b-2 border-b-indigo-500"
                      : "text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/5"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  sync.ts
                </button>
              </div>

              {/* Code display terminal */}
              <div className="p-4 bg-white/70 dark:bg-[#050505] overflow-x-auto min-h-[290px] flex flex-col justify-between">
                <pre className="font-mono text-xs text-gray-700 dark:text-slate-300 leading-relaxed overflow-x-auto select-none">
                  {codeSnippets[activeCodeTab].split("\n").map((line, i) => (
                    <div key={i} className="table-row">
                      <span className="table-cell text-right pr-4 text-gray-400 dark:text-slate-600 text-[10px] select-none w-5">
                        {i + 1}
                      </span>
                      <span className="table-cell text-left whitespace-pre">
                        {/* Simplistic highlighted classes mapping */}
                        {line.startsWith("//") ? (
                          <span className="text-gray-400 dark:text-emerald-500/80 italic">{line}</span>
                        ) : line.includes("import ") || line.includes("export ") || line.includes("const ") || line.includes("class ") || line.includes("private ") || line.includes("new ") ? (
                          <span className="text-purple-600 dark:text-pink-400">
                            {line.split(" ").map((word, wi) => {
                              if (["import", "export", "const", "class", "private", "new", "from"].includes(word.replace(/[{}]/g, ""))) {
                                return <span key={wi} className="text-indigo-600 dark:text-indigo-400 font-bold">{word} </span>;
                              }
                              return word + " ";
                            })}
                          </span>
                        ) : (
                          line
                        )}
                      </span>
                    </div>
                  ))}
                </pre>
                
                {/* Visual compiler terminal mock indicator */}
                <div className="mt-4 pt-3 border-t border-gray-200/40 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500 dark:text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>compiler: healthy</span>
                  </div>
                  <div>
                    <span>0.15ms build time</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
