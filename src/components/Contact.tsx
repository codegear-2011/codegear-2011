import React, { useState, useEffect } from "react";
import { Mail, Github, Linkedin, Twitter, MapPin, Send, AlertCircle, CheckCircle, Database } from "lucide-react";
import { PORTFOLIO_OWNER } from "../data";

interface Submission {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  date: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Full-Stack SaaS",
    message: ""
  });

  const [inbox, setInbox] = useState<Submission[]>([]);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const projectTypes = [
    "Full-Stack SaaS",
    "Conversational AI Pipeline",
    "Database / Caching Architecture",
    "General Inquiry / Say Hello",
    "Consulting & Advisory"
  ];

  // Load existing incoming inquiries from full-stack backend
  const fetchInbox = async () => {
    try {
      const response = await fetch("/api/contact/messages");
      const resData = await response.json();
      if (resData.status === "success" && resData.data) {
        setInbox(resData.data);
      }
    } catch (err) {
      console.warn("Failed to fetch fullstack contact inbox logs:", err);
    }
  };

  useEffect(() => {
    fetchInbox();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormState("error");
      setFeedbackMessage("Please fill in all required fields (Name, Email, and Message).");
      return;
    }

    setFormState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const resData = await response.json();

      if (response.ok && resData.status === "success") {
        setFormState("success");
        setFeedbackMessage(resData.message || "Your inquiry has been stored secure in memory on CodeGear server!");
        setFormData({
          name: "",
          email: "",
          projectType: "Full-Stack SaaS",
          message: ""
        });
        // Reload inbox log list from backend
        fetchInbox();
      } else {
        setFormState("error");
        setFeedbackMessage(resData.message || "Failed to submit message to background database.");
      }
    } catch (err) {
      console.error("Failed to post contact formData:", err);
      setFormState("error");
      setFeedbackMessage("Backend network error. Ensure that the express server is fully online.");
    }
  };

  const formatSimpleDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch {
      return "Just now";
    }
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-white dark:bg-[#050505]"
    >
      {/* Glow orb background */}
      <div className="glow-orb w-[300px] h-[300px] bottom-1/10 right-1/10 bg-indigo-900/10 dark:bg-indigo-900/15"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Metadata & Social Columns (Left column) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Secure Integration
              </h2>
              <div className="w-12 h-1 bg-indigo-600 mt-3 rounded-full mb-6"></div>
              <p className="text-gray-600 dark:text-slate-400 font-sans text-sm sm:text-base leading-relaxed">
                Connect and layout ideas. Submitting this form targets our secure Express server and registers an active cache entry in the backend.
              </p>
            </div>

            {/* Factual Details lists */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3.5 text-gray-700 dark:text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase font-mono font-bold tracking-wider text-gray-400 dark:text-slate-500">HQ Office Location</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{PORTFOLIO_OWNER.location}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 text-gray-700 dark:text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase font-mono font-bold tracking-wider text-gray-400 dark:text-slate-500">Corporate Email Coordinates</span>
                  <a href={`mailto:${PORTFOLIO_OWNER.email}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-mono transition-colors">
                    {PORTFOLIO_OWNER.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Social channels icons */}
            <div>
              <span className="block text-[11px] uppercase font-mono font-bold tracking-widest text-gray-400 dark:text-slate-500 mb-4 select-none">
                Global Developer Handshakes
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href={PORTFOLIO_OWNER.github}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 bg-slate-50 dark:bg-white/5 border border-gray-200/40 dark:border-white/5 hover:bg-indigo-600/10 hover:border-indigo-600 rounded-xl flex items-center justify-center text-gray-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-all cursor-pointer"
                  title="Github Code Vault"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={PORTFOLIO_OWNER.linkedin}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 bg-slate-50 dark:bg-white/5 border border-gray-200/40 dark:border-white/5 hover:bg-indigo-600/10 hover:border-indigo-600 rounded-xl flex items-center justify-center text-gray-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-all cursor-pointer"
                  title="LinkedIn Connections"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={PORTFOLIO_OWNER.twitter}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 bg-slate-50 dark:bg-white/5 border border-gray-200/40 dark:border-white/5 hover:bg-indigo-600/10 hover:border-indigo-600 rounded-xl flex items-center justify-center text-gray-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-all cursor-pointer"
                  title="Twitter / X Grid"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Detailed Input Form (Right column) */}
          <div className="lg:col-span-7 space-y-10 w-full">
            <div className="glass-panel-heavy p-6 sm:p-8 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-lg relative">
              <h3 className="font-sans font-extrabold text-lg text-gray-900 dark:text-white mb-6">
                Direct Project RFP Form
              </h3>

              <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-child">
                  <div>
                    <label id="lbl-name" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2 select-none">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      id="input-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rachel Foster"
                      required
                      className="w-full px-4.5 py-3 rounded-xl border border-gray-200 dark:border-white/5 text-sm focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 bg-white dark:bg-white/5 text-gray-900 dark:text-white leading-snug"
                    />
                  </div>

                  <div>
                    <label id="lbl-email" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2 select-none">
                      Electronic Mail *
                    </label>
                    <input
                      type="email"
                      id="input-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rachel@domain.com"
                      required
                      className="w-full px-4.5 py-3 rounded-xl border border-gray-200 dark:border-white/5 text-sm focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 bg-white dark:bg-white/5 text-gray-900 dark:text-white leading-snug"
                    />
                  </div>
                </div>

                <div>
                  <label id="lbl-project" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2 select-none">
                    Expected Deployment Branch
                  </label>
                  <select
                    id="select-project-type"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4.5 py-3 rounded-xl border border-gray-200 dark:border-white/5 text-sm focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 bg-white dark:bg-[#050505] text-gray-900 dark:text-white leading-snug"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} className="bg-white dark:bg-[#050505] text-gray-900 dark:text-white" value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label id="lbl-message" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2 select-none">
                    RFP Details & Requirements *
                  </label>
                  <textarea
                    id="textarea-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly detail what you are commissioning CodeGear to engineer..."
                    required
                    className="w-full px-4.5 py-3 rounded-xl border border-gray-200 dark:border-white/5 text-sm focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 bg-white dark:bg-white/5 text-gray-900 dark:text-white leading-relaxed resize-none"
                  ></textarea>
                </div>

                {/* Validation feedbacks alerts */}
                {formState === "error" && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs rounded-xl flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {formState === "success" && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {/* Submission button */}
                <button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={formState === "submitting"}
                  className="w-full py-3 px-5 text-sm uppercase tracking-wider font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-550 disabled:bg-gray-400 bg-gradient-to-r from-indigo-600 to-indigo-500 flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md shadow-indigo-500/15"
                >
                  <span>{formState === "submitting" ? "Transmitting..." : "Send Secure RFP Inquiry"}</span>
                  <Send className="w-4 h-4 shrink-0" />
                </button>
              </form>
            </div>

            {/* Back-end Inquiries Live DB Stream logger */}
            <div className="glass-panel p-6 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-indigo-400 font-bold">
                  <Database className="w-4 h-4 text-indigo-400" />
                  Local live backend Database
                </span>
                <span className="font-mono text-[10px] text-gray-400 dark:text-slate-500">
                  {inbox.length} Saved Record{inbox.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="space-y-4 max-h-[290px] overflow-y-auto pr-2">
                {inbox.length === 0 ? (
                  <p className="text-gray-400 dark:text-slate-500 text-xs text-center font-mono py-8 uppercase tracking-wide">
                    No active entries saved in backend memory cache.
                  </p>
                ) : (
                  inbox.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-3.5 rounded-xl border border-gray-200/55 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 space-y-2 text-xs leading-normal font-sans"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800 dark:text-slate-200">
                          {msg.name} ({msg.email})
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-slate-500 font-mono">
                          {formatSimpleDate(msg.date)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded">
                          {msg.projectType}
                        </span>
                        <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest">
                          ID: {msg.id}
                        </span>
                      </div>
                      <p className="text-gray-500 dark:text-slate-400 whitespace-pre-wrap leading-relaxed italic border-l-2 border-indigo-500/20 pl-2.5 mt-1 font-normal">
                        "{msg.message}"
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
