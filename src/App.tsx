import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import AIRepresentative from "./components/AIRepresentative";
import Contact from "./components/Contact";
import { PORTFOLIO_OWNER } from "./data";
import { FolderCode, ArrowUp, Coffee } from "lucide-react";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark theme as requested
  const [showScrollBack, setShowScrollBack] = useState(false);

  // Initialize Lenis smooth scroll engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Watch for scroll position to show "Back To Top" indicators
    const handleScroll = () => {
      setShowScrollBack(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Theme synchronization effect with page body class
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset navbar py padding or heights
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="font-sans antialiased text-gray-800 dark:text-[#E0E0E0] bg-white dark:bg-[#050505] min-h-screen selection:bg-indigo-600 selection:text-white transition-colors duration-300">
      
      {/* Floating radial gradient glow backdrops */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/10 dark:bg-indigo-900/15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-slate-800/10 dark:bg-slate-800/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Primary header navbar */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        scrollToSection={scrollToSection}
      />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero scrollToSection={scrollToSection} />
        
        <Skills />
        
        <Projects />
        
        <Timeline />
        
        <AIRepresentative />
        
        <Contact />
      </main>

      {/* Footer Block */}
      <footer className="relative bg-slate-50 dark:bg-[#020202] border-t border-gray-100 dark:border-white/5 transition-colors z-10 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-200/50 dark:border-white/5">
            {/* Left side Logo */}
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                <FolderCode className="w-5 h-5" />
              </div>
              <span className="font-sans font-bold text-lg tracking-tight text-gray-900 dark:text-white">
                {PORTFOLIO_OWNER.name} CodeGear
              </span>
            </div>

            {/* Middle Nav Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-500 dark:text-white/50 font-medium">
              <button onClick={() => scrollToSection("home")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</button>
              <button onClick={() => scrollToSection("skills")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Skills</button>
              <button onClick={() => scrollToSection("projects")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Projects</button>
              <button onClick={() => scrollToSection("timeline")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Experience</button>
              <button onClick={() => scrollToSection("ai-assistant")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">AI representative</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-gray-400 dark:text-white/30 font-mono">
            <p>
              &copy; {new Date().getFullYear()} CodeGear. Fully built over Cloud Run with Lenis Smooth Scrolling.
            </p>
            <p className="flex items-center gap-1">
              <span>Made with TypeScript</span>
              <Coffee className="w-3.5 h-3.5 text-amber-500" />
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Scroll Back To Top Button */}
      {showScrollBack && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 hover:scale-106 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 shadow-opacity-30 transition-all border border-indigo-500/40 cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5 animate-bounce" />
        </button>
      )}

    </div>
  );
}
