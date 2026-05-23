import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, GraduationCap, Award, Calendar, CheckSquare, PlusCircle, MinusCircle } from "lucide-react";
import { EVENTS, TimelineEvent } from "../data";

export default function Timeline() {
  const [filterType, setFilterType] = useState<"all" | "work" | "education" | "award">("all");
  const [expandedEventId, setExpandedEventId] = useState<string | null>("lead-engineer"); // Default expand the first one

  const filteredEvents = filterType === "all"
    ? EVENTS
    : EVENTS.filter(ev => ev.type === filterType);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase className="w-5 h-5 text-indigo-500" />;
      case "education":
        return <GraduationCap className="w-5 h-5 text-cyan-500" />;
      case "award":
        return <Award className="w-5 h-5 text-amber-500" />;
      default:
        return <Briefcase className="w-5 h-5 text-indigo-500" />;
    }
  };

  const getEventBorderColor = (type: string) => {
    switch (type) {
      case "work":
        return "border-indigo-500 bg-indigo-500/10";
      case "education":
        return "border-cyan-500 bg-cyan-500/10";
      case "award":
        return "border-amber-400 bg-amber-400/10";
      default:
        return "border-indigo-500 bg-indigo-500/10";
    }
  };

  const handleToggleExpand = (id: string) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  return (
    <section
      id="timeline"
      className="py-24 relative overflow-hidden bg-white dark:bg-[#050505]"
    >
      {/* Glow Backdrop */}
      <div className="glow-orb w-[350px] h-[350px] top-1/4 left-1/10 bg-indigo-900/10 dark:bg-indigo-900/15"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Journey & Accomplishments
          </h2>
          <div className="w-12 h-1 bg-indigo-600 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-slate-400 font-sans text-sm sm:text-base">
            An interactive chronicle of my roles, academic background, and industry accolades. Click any card to dive deep.
          </p>
        </div>

        {/* Timeline Type Filters toolbar */}
        <div className="flex items-center justify-center space-x-1.5 mb-14 bg-slate-100 dark:bg-white/5 p-1 rounded-xl max-w-sm mx-auto border border-gray-200/50 dark:border-white/5 backdrop-blur-md">
          <button
            onClick={() => setFilterType("all")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              filterType === "all" ? "bg-white dark:bg-[#050505] text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-500 dark:text-slate-400"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType("work")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              filterType === "work" ? "bg-white dark:bg-[#050505] text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-500 dark:text-slate-400"
            }`}
          >
            Work
          </button>
          <button
            onClick={() => setFilterType("education")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              filterType === "education" ? "bg-[#050505] dark:bg-[#050505] text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-500 dark:text-slate-400"
            }`}
          >
            Edu
          </button>
          <button
            onClick={() => setFilterType("award")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              filterType === "award" ? "bg-white dark:bg-[#050505] text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-500 dark:text-slate-400"
            }`}
          >
            Award
          </button>
        </div>

        {/* Interactive Vertical Timeline Trail */}
        <div className="relative border-l border-gray-200/60 dark:border-white/5 ml-4 sm:ml-8 space-y-12 pb-4">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((ev, index) => {
              const isExpanded = expandedEventId === ev.id;
              
              return (
                <motion.div
                  key={ev.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="relative pl-8 sm:pl-12 group"
                >
                  {/* Timeline node sphere */}
                  <div className={`absolute left-0 -translate-x-[11px] top-1 w-[22px] h-[22px] rounded-full border-2 bg-white dark:bg-[#050505] flex items-center justify-center shadow-md transition-all group-hover:scale-115 ${getEventBorderColor(ev.type)}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white" />
                  </div>

                  {/* Experience Card */}
                  <div
                    onClick={() => handleToggleExpand(ev.id)}
                    className={`glass-panel p-5 sm:p-6 rounded-2xl border border-gray-200/50 dark:border-white/5 hover:border-indigo-400 dark:hover:border-slate-800 transition-all cursor-pointer select-none ${
                      isExpanded 
                        ? "shadow-lg scale-[1.01] bg-white/70 dark:bg-white/5 border-indigo-500/55 dark:border-white/5" 
                        : "bg-white/40 dark:bg-white/5"
                    }`}
                  >
                    {/* Header elements */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-gray-200/30 dark:border-white/5">
                          {getEventIcon(ev.type)}
                        </div>
                        <div>
                          <h3 className="font-sans font-bold text-gray-900 dark:text-white text-base leading-snug">
                            {ev.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-slate-400 font-mono tracking-wider">
                            {ev.companyOrInstitution}
                          </p>
                        </div>
                      </div>

                      {/* Period calendar stamp */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400 font-mono self-start sm:self-center bg-gray-100/55 dark:bg-white/5 px-2.5 py-1 rounded-md border border-gray-200/30 dark:border-white/5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{ev.period}</span>
                      </div>
                    </div>

                    {/* Brief description summaries */}
                    <p className="mt-3 text-sm text-gray-600 dark:text-slate-300 font-sans leading-relaxed">
                      {ev.description}
                    </p>

                    {/* Expand toggler indicator */}
                    <div className="mt-4 flex items-center justify-between text-xs font-mono">
                      <span className="text-[10px] uppercase text-gray-400 dark:text-slate-500 tracking-wider">
                        Category: {ev.type}
                      </span>
                      <button
                        id={`timeline-toggle-expand-${ev.id}`}
                        className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold focus:outline-none"
                      >
                        {isExpanded ? (
                          <>
                            <MinusCircle className="w-4 h-4 shrink-0" />
                            Hide Milestones
                          </>
                        ) : (
                          <>
                            <PlusCircle className="w-4 h-4 shrink-0" />
                            Expand Milestones
                          </>
                        )}
                      </button>
                    </div>

                    {/* Animated Bullet Points Block */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          id={`timeline-details-${ev.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 pt-5 border-t border-gray-200/40 dark:border-white/5 space-y-3.5">
                            <h4 className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#6366f1] mb-1 select-none">
                              Key Outcomes & Sandboxed Benchmarks
                            </h4>
                            {ev.highlights.map((bullet, bi) => (
                              <div key={bi} className="flex items-start space-x-2.5 text-xs leading-relaxed font-sans text-gray-600 dark:text-slate-300">
                                <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{bullet}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
