export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: "Full-Stack" | "Backend" | "AI/ML";
  tags: string[];
  tech: string[];
  metrics: string; // e.g., "45% performance increase", "10k+ active users"
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  completionDate: string;
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "DevOps & Tools" | "AI & Data";
  level: number; // 0-100 percentage
  yearsOfExperience: number;
}

export interface TimelineEvent {
  id: string;
  title: string;
  companyOrInstitution: string;
  period: string;
  type: "work" | "education" | "award";
  description: string;
  highlights: string[];
}

export const PORTFOLIO_OWNER = {
  name: "CodeGear",
  title: "Lead Full-Stack Engineer & AI Solution Integrator",
  tagline: "Engineering highly conversational AI pipelines, immersive React architectures, and hyper-scalable Node.js orchestration layers.",
  about: "I am a full-stack architect dedicated to crafting high-performance, aesthetically exceptional web applications. With a focus on type safety, smooth interactive animations, and server-side state optimization, I bridge the gap between elegant UI design and robust systems engineering.",
  location: "San Francisco, CA (Available for Hybrid & Remote)",
  email: "codegear.dev@gmail.com",
  github: "https://github.com/codegear-dev",
  linkedin: "https://linkedin.com/in/codegear-dev",
  twitter: "https://twitter.com/codegear_dev",
  resumeUrl: "#"
};

export const PROJECTS: Project[] = [
  {
    id: "polyflow",
    title: "PolyFlow AI - Visual Agent Orchestrator",
    description: "A drag-and-drop conversational node designer allowing users to assemble, benchmark, and deploy multi-model Gemini pipelines with real-time vector memory.",
    longDescription: "PolyFlow AI is a zero-code development engine built to address multi-agent alignment problems. Inside, developers can chain Gemini 3.5 LLMs, image generators, and tools (Google Search, Maps, custom webhooks) visually. It incorporates an automated testing bed to evaluate token response latency and drift over time.",
    category: "AI/ML",
    tags: ["React Flow", "Express.js", "Gemini @google/genai", "Redis"],
    tech: ["TypeScript", "React", "Node.js", "Vite", "Tailwind CSS", "Express", "Redis"],
    metrics: "12,000+ Agent Nodes Executed Weekly",
    githubUrl: "https://github.com/codegear-dev/polyflow-ai",
    liveUrl: "https://polyflow-ai-demo.example.com",
    featured: true,
    completionDate: "April 2026"
  },
  {
    id: "ledgerglass",
    title: "LedgerGlass - Real-time DeFi Ledger",
    description: "High-density glassmorphic dashboard showcasing real-time asset flows across EVM chains. Powered by parallel RPC streaming and WebSockets.",
    longDescription: "LedgerGlass is an immersive analytics center offering real-time token tracking. Developed with performance in mind, it utilizes high-performance RPC streaming and custom React chart hooks to display 1000+ token interactions per second with a fully animated SVG canvas structure.",
    category: "Full-Stack",
    tags: ["React v19", "WebSockets", "D3.js", "RPC Nodes"],
    tech: ["React", "TypeScript", "D3.js", "Node.js", "Tailwind CSS", "Recharts", "Ethers.js"],
    metrics: "Processed $4.5M+ simulated cross-chain transactions",
    githubUrl: "https://github.com/codegear-dev/ledgerglass",
    liveUrl: "https://ledgerglass.example.com",
    featured: true,
    completionDate: "February 2026"
  },
  {
    id: "auroraDB",
    title: "AuroraDB - Serverless Key-Value Cache",
    description: "A lightweight, memory-efficient key-value database engine featuring fully audited write-ahead logging (WAL) and automated local snapshots.",
    longDescription: "AuroraDB is a backend development showcase. It was written to benchmark low-latency disk writes and query filters in pure TypeScript. It implements a custom, tokenized query indexing system, binary search segment trees, and active health dashboards over Express API lines.",
    category: "Backend",
    tags: ["Node.js", "TypeScript", "Buffer WAL", "Trie Indexing"],
    tech: ["TypeScript", "Node.js", "Express", "Vite", "Chart.js"],
    metrics: "Sub-millisecond peak write latency (0.8ms)",
    githubUrl: "https://github.com/codegear-dev/auroradb",
    featured: false,
    completionDate: "December 2025"
  },
  {
    id: "chronoshift",
    title: "ChronoShift - Visual Git Time Machine",
    description: "An interactive, animated git visualizer tree which lets developers load repo history and replay commits in an elegant 3D timeline layout.",
    longDescription: "ChronoShift provides a visual view of git trees, making interactive rebase commands and branching histories understandable. Features include animated branch switching, interactive conflict resolver maps, and beautiful glassmorphism commit cards.",
    category: "Full-Stack",
    tags: ["React", "Framer Motion", "Git Parser", "Tailwind"],
    tech: ["React", "Framer Motion", "Tailwind CSS", "TypeScript", "Node.js"],
    metrics: "4.8/5 Developer Rating (1.2k Github Stars)",
    githubUrl: "https://github.com/codegear-dev/chronoshift",
    liveUrl: "https://chronoshift.example.com",
    featured: true,
    completionDate: "September 2025"
  },
  {
    id: "synapsemark",
    title: "SynapseMark - Collaborative Markdown Suite",
    description: "Full-stack real-time collaborative markdown editor utilizing CRDT conflict resolution, live cursor tracking, and inline AI outline suggestions.",
    longDescription: "SynapseMark provides visual and rich text editing with frictionless collaboration. It handles concurrency conflicts client-side using Yjs and features real-time inline document rewrite suggestions powered by the Gemini model on the backend.",
    category: "AI/ML",
    tags: ["CRDT", "WebSockets", "Yjs", "Gemini API"],
    tech: ["React", "Node.js", "Express", "Yjs", "WebSockets", "TypeScript", "Tailwind CSS"],
    metrics: "Concurrently synchronizes up to 50 active writers",
    githubUrl: "https://github.com/codegear-dev/synapse-mark",
    liveUrl: "https://synapsemark.example.com",
    featured: false,
    completionDate: "July 2025"
  }
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: "React 19 & Next.js", category: "Frontend", level: 95, yearsOfExperience: 5 },
  { name: "TypeScript", category: "Frontend", level: 98, yearsOfExperience: 5 },
  { name: "Tailwind CSS", category: "Frontend", level: 95, yearsOfExperience: 5 },
  { name: "Framer Motion / Motion", category: "Frontend", level: 90, yearsOfExperience: 4 },
  { name: "D3.js / SVG Canvas", category: "Frontend", level: 85, yearsOfExperience: 3 },
  
  // Backend
  { name: "Express & Node.js", category: "Backend", level: 94, yearsOfExperience: 5 },
  { name: "Python / FastAPI", category: "Backend", level: 85, yearsOfExperience: 3 },
  { name: "PostgreSQL & Prisma", category: "Backend", level: 88, yearsOfExperience: 4 },
  { name: "Redis Caching", category: "Backend", level: 85, yearsOfExperience: 3 },
  
  // DevOps & Tools
  { name: "Docker & Cloud Run", category: "DevOps & Tools", level: 90, yearsOfExperience: 4 },
  { name: "CI/CD (GitHub Actions)", category: "DevOps & Tools", level: 88, yearsOfExperience: 4 },
  { name: "AWS & GCP", category: "DevOps & Tools", level: 85, yearsOfExperience: 3 },
  { name: "Git Engine Core", category: "DevOps & Tools", level: 92, yearsOfExperience: 5 },
  
  // AI & Data
  { name: "Multi-Agent System Pipelines", category: "AI & Data", level: 92, yearsOfExperience: 2 },
  { name: "Gemini SDK Integration (@google/genai)", category: "AI & Data", level: 95, yearsOfExperience: 2 },
  { name: "RAG & Vector Embeddings", category: "AI & Data", level: 88, yearsOfExperience: 2 },
  { name: "LLM Fine-Tuning & Prompt Tuning", category: "AI & Data", level: 90, yearsOfExperience: 2 }
];

export const EVENTS: TimelineEvent[] = [
  {
    id: "lead-engineer",
    title: "Lead Full-Stack Architect",
    companyOrInstitution: "Aegis Labs Inc.",
    period: "May 2024 - Present",
    type: "work",
    description: "Designing corporate LLM automation pipelines, container microservices, and interactive rich-data dashboards.",
    highlights: [
      "Led development of core developer pipeline tool, scaling to 15,000+ developers.",
      "Optimized enterprise backend RPC queues, reducing latency from 240ms to 45ms.",
      "Established strict TypeScript and React code conventions, ensuring 98% lint coverage with fast builds."
    ]
  },
  {
    id: "sr-dev",
    title: "Senior Full-Stack Developer",
    companyOrInstitution: "Apex Software Studio",
    period: "June 2022 - April 2024",
    type: "work",
    description: "Developed consumer-facing SaaS products, specialized web editors, and localized database syncing routines.",
    highlights: [
      "Released complete visual editor suite that won the 'Web Design Excellence Medallion' in 2023.",
      "Integrated secure multi-auth OAuth gateways and real-time canvas capabilities.",
      "Mentored a team of 6 junior and mid-level fullstack engineers in clean architecture."
    ]
  },
  {
    id: "bs-cs",
    title: "Bachelor of Science in Computer Science",
    companyOrInstitution: "University of Tech Labs",
    period: "Sept 2018 - May 2022",
    type: "education",
    description: "Graduated with Honors, specializing in Distributed Systems, Compiler Design, and Interactive Human-Computer Interfaces.",
    highlights: [
      "Academic Excellence Scholarship Holder (3.95 GPA).",
      "Created an open-source visual parser generator as a senior thesis project.",
      "Elected President of the Campus Robotics & Distributed Systems Club."
    ]
  },
  {
    id: "gold-medallion",
    title: "First Place - Global AI Orchestration Hackathon",
    companyOrInstitution: "Google Workspace & AI Guild",
    period: "November 2025",
    type: "award",
    description: "Recognized among 1,200 entrants for developing 'PromptVibe', a real-time speech-to-system-control agent.",
    highlights: [
      "Built a fully speech-driven multi-agent terminal in under 48 hours.",
      "Showcased zero-shot latency control via Gemini micro-agents."
    ]
  }
];
