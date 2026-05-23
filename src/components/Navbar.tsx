import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Sparkles, FolderCode } from "lucide-react";
import { PORTFOLIO_OWNER } from "../data";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  scrollToSection: (id: string) => void;
}

export default function Navbar({ isDarkMode, toggleDarkMode, scrollToSection }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ["home", "skills", "projects", "timeline", "ai-assistant", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "timeline" },
    { label: "AI Representative", id: "ai-assistant" },
    { label: "Hire Me", id: "contact" }
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-white/75 dark:bg-[#050505]/75 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 shadow-md" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          id="nav-logo"
          onClick={() => handleNavClick("home")}
          className="flex items-center space-x-2 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/25 group-hover:bg-indigo-500 transition-colors">
            <FolderCode className="w-5 h-5" />
          </div>
          <span className="font-sans font-bold text-xl tracking-tight text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
            {PORTFOLIO_OWNER.name}
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 glass-panel px-3 py-1.5 rounded-full border border-gray-200/40 dark:border-white/10 bg-white/40 dark:bg-[#050505]/40 shadow-inner">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-white/5"
              }`}
            >
              {item.id === "ai-assistant" ? (
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 pulse-ai" />
                  {item.label}
                </span>
              ) : (
                item.label
              )}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          {/* Dark Mode Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 dark:text-slate-300 hover:bg-gray-100/80 dark:hover:bg-white/5 focus:outline-none border border-gray-200/50 dark:border-white/5 transition-colors"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
          </button>

          {/* Call To Action button */}
          <button
            id="nav-hire-btn"
            onClick={() => handleNavClick("contact")}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-xl bg-indigo-600 hover:bg-indigo-500 hover:scale-105 active:scale-95 text-white transition-all shadow-md shadow-indigo-500/15"
          >
            Send Inquiry
          </button>

          {/* Mobile menu button */}
          <button
            id="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-gray-700 dark:text-slate-300 hover:bg-gray-100/80 dark:hover:bg-white/5 focus:outline-none border border-gray-200/50 dark:border-white/5 transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-1 bg-white/95 dark:bg-[#050505]/95 backdrop-blur-3xl border-b border-gray-200/80 dark:border-white/5 animate-in fade-in slide-in-from-top-3 duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all ${
                activeSection === item.id
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
            >
              {item.id === "ai-assistant" ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  {item.label}
                </span>
              ) : (
                item.label
              )}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick("contact")}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-center hover:bg-indigo-500 block"
            >
              Contact CodeGear
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
