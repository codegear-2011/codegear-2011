import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Terminal, Shield, Workflow, Sparkles, BookOpen } from "lucide-react";
import { SKILLS, Skill } from "../data";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Frontend" | "Backend" | "DevOps & Tools" | "AI & Data">("All");
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const categories: Array<"All" | "Frontend" | "Backend" | "DevOps & Tools" | "AI & Data"> = [
    "All", "Frontend", "Backend", "DevOps & Tools", "AI & Data"
  ];

  const filteredSkills = selectedCategory === "All"
    ? SKILLS
    : SKILLS.filter(skill => skill.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Frontend":
        return <Terminal className="w-5 h-5 text-pink-500" />;
      case "Backend":
        return <Cpu className="w-5 h-5 text-violet-500" />;
      case "DevOps & Tools":
        return <Shield className="w-5 h-5 text-cyan-500" />;
      case "AI & Data":
        return <Sparkles className="w-5 h-5 text-amber-500 pulse-ai" />;
      default:
        return <Workflow className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden bg-white dark:bg-[#050505]"
    >
      {/* Visual glowing backdrops */}
      <div className="glow-orb w-[300px] h-[300px] top-1/10 right-1/10 bg-indigo-500/10 dark:bg-indigo-500/5"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Technical Arsenal
          </h2>
          <div className="w-12 h-1 bg-indigo-600 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-slate-400 font-sans text-sm sm:text-base">
            Expertise built over years of full-stack engineering, neural orchestrations, and scalable server orchestration.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category}
              id={`skill-tab-${category.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border focus:outline-none cursor-pointer ${
                selectedCategory === category
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20 scale-102"
                  : "bg-slate-50 dark:bg-white/5 border-gray-200/50 dark:border-white/5 text-gray-600 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-white dark:hover:bg-[#050505]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-panel glass-interactive p-6 rounded-2xl flex flex-col justify-between border-gray-250 dark:border-white/5"
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-gray-200/50 dark:border-white/5">
                        {getCategoryIcon(skill.category)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-base">
                          {skill.name}
                        </h4>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 dark:text-slate-500">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Hover detail indicator */}
                    <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-600/10 dark:bg-indigo-400/10 px-2.5 py-0.5 rounded-full">
                      {skill.level}% Focus Level
                    </span>
                  </div>

                  {/* Meter Track */}
                  <div className="relative w-full h-2.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                    />
                  </div>
                </div>

                {/* Additional metrics info panel */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-slate-400 font-mono">
                    <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                    Focus: {skill.yearsOfExperience}+ Years Sandbox and Production Usage
                  </span>
                  {hoveredSkill?.name === skill.name && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[10px] font-mono font-medium text-emerald-500"
                    >
                      Production Verified
                    </motion.span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Minimal Bottom Pro tip / detail notice */}
        <div className="mt-12 text-center">
          <p className="font-mono text-[11px]/relaxed text-gray-500 dark:text-slate-500 max-w-lg mx-auto uppercase tracking-wide border-t border-gray-200/40 dark:border-white/5 pt-6">
            🛠️ Standardized over standard lint setups & verified through strict container execution pipelines.
          </p>
        </div>
      </div>
    </section>
  );
}
