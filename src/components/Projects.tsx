import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, Filter, Target, Calendar, CheckCircle, X, ChevronRight } from "lucide-react";
import { PROJECTS, Project } from "../data";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Full-Stack" | "Backend" | "AI/ML">("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters: Array<"All" | "Full-Stack" | "Backend" | "AI/ML"> = ["All", "Full-Stack", "Backend", "AI/ML"];

  const filteredProjects = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter(project => project.category === activeFilter);

  const closeCaseStudy = () => {
    setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      className="py-24 relative overflow-hidden bg-slate-50 dark:bg-[#050505]"
    >
      {/* Background Radial Glow */}
      <div className="glow-orb w-[450px] h-[450px] bottom-1/10 left-1/10 bg-indigo-900/10 dark:bg-indigo-900/15"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Selected Deployments
            </h2>
            <p className="mt-3 text-gray-600 dark:text-slate-400 font-sans text-sm sm:text-base">
              Explore recently shipped full-stack architectures, interactive AI modules, and custom database cache pipelines.
            </p>
          </div>

          {/* Filtering buttons toolbar */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none self-start md:self-end">
            <Filter className="w-4 h-4 text-indigo-500 mr-1 shrink-0 hidden sm:block" />
            <div className="flex space-x-1 border border-gray-200/50 dark:border-white/5 bg-white/40 dark:bg-white/5 p-1 rounded-xl backdrop-blur-md">
              {filters.map((filter) => (
                <button
                  key={filter}
                  id={`project-filter-${filter.toLowerCase().replace(/\//g, "-")}`}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeFilter === filter
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-panel glass-interactive rounded-2xl overflow-hidden border border-gray-200/50 dark:border-white/5 flex flex-col justify-between"
              >
                {/* Image / Header Block */}
                <div className="p-6 pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] uppercase font-mono tracking-widest bg-indigo-600/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-600/20 dark:border-indigo-400/20">
                      {project.category}
                    </span>
                    <span className="text-[11px] text-gray-400 dark:text-slate-500 font-mono">
                      {project.completionDate}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-lg text-gray-900 dark:text-white leading-snug group-hover:text-indigo-500 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="mt-2 text-gray-600 dark:text-slate-400 text-sm font-sans line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tags and Action Bar */}
                <div className="p-6 mt-4 border-t border-gray-200/40 dark:border-white/5">
                  {/* Tech stack short indicators */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono font-medium text-gray-500 dark:text-slate-400 bg-slate-100 dark:bg-[#050505] px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Impact metrics panel highlight */}
                  <div className="flex items-center gap-1.5 mb-4 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 dark:bg-emerald-400/5 px-2.5 py-1.5 rounded-lg border border-emerald-500/10">
                    <Target className="w-3.5 h-3.5" />
                    <span>KPI: {project.metrics}</span>
                  </div>

                  {/* Footer Interactive Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      id={`project-btn-${project.id}`}
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 gap-1 focus:outline-none cursor-pointer"
                    >
                      Case Study
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center space-x-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-lg border border-gray-200/50 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/5 flex items-center justify-center text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                        title="View Source on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded-lg border border-gray-200/50 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/5 flex items-center justify-center text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                          title="Open Live Demonstration"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Detailed Modal/Case Study View */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeCaseStudy}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              />

              {/* Modal Body */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-3xl glass-panel-heavy rounded-2xl overflow-hidden border border-white/10 shadow-2xl p-6 sm:p-8 flex flex-col"
              >
                {/* Close Button */}
                <button
                  id="close-project-modal"
                  onClick={closeCaseStudy}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full border border-gray-200/50 dark:border-white/5 bg-white/50 dark:bg-white/5 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-slate-300 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Case Study Header */}
                <div className="pr-12">
                  <div className="flex items-center space-x-2.5 mb-2">
                    <span className="px-2 py-0.5 rounded text-[9px] uppercase font-mono tracking-widest bg-indigo-600/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 font-bold">
                      {selectedProject.category}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-slate-500 font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Shipped: {selectedProject.completionDate}
                    </span>
                  </div>
                  <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="mt-6 space-y-6 overflow-y-auto max-h-[60vh] pr-2">
                  {/* Detailed Description */}
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-indigo-500 mb-2 font-bold select-none">
                      Overview & Architecture
                    </h4>
                    <p className="font-sans text-sm sm:text-base text-gray-600 dark:text-slate-300 leading-relaxed font-normal">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Impact Highlight Stats Box */}
                  <div className="p-4 rounded-xl bg-indigo-600/5 border border-indigo-600/10 dark:bg-indigo-400/5 dark:border-indigo-400/10">
                    <h5 className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#6366f1] mb-1.5">
                      Factual Impact & Metric Target
                    </h5>
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-slate-200">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>{selectedProject.metrics}</span>
                    </div>
                  </div>

                  {/* Complete Tech stack map */}
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-slate-400 mb-2 font-bold select-none">
                      Factual Dependency Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tool) => (
                        <span
                          key={tool}
                          className="px-3 py-1 font-mono text-xs font-semibold rounded-lg bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-slate-300 border border-gray-200/50 dark:border-white/5"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer and link references */}
                <div className="mt-8 pt-4 border-t border-gray-200/60 dark:border-white/5 flex items-center justify-end gap-3 shrink-0">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl border border-gray-200/60 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Github Repo
                  </a>
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="px-4 py-2 text-xs uppercase tracking-wider rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-500/15 font-semibold transition-transform hover:scale-103"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Preview
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
