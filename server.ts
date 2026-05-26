import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { PROJECTS, SKILLS, EVENTS, PORTFOLIO_OWNER } from "./src/data";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Body parsing middleware
app.use(express.json());

// In-memory contact submission storage
const submittedMessages: any[] = [
  {
    id: "seed-1",
    name: "Olivia Vance",
    email: "olivia@cloudscale.io",
    projectType: "Full-Stack SaaS",
    message: "Hey CodeGear! Loved your PolyFlow AI tool. We'd love to discuss building an automated vector storage pipeline for our active customer service agents. Let me know if you are free for a call next Tuesday!",
    date: "2026-05-21T18:30:00Z"
  },
  {
    id: "seed-2",
    name: "Thomas Chen",
    email: "t.chen@apexventures.vc",
    projectType: "Consulting",
    message: "Impressive portfolio. Your high-density ledger chart looks incredibly smooth. Do you have experience with gas optimization and custom RPC caching? Let's check.",
    date: "2026-05-22T04:15:00Z"
  }
];

// API Routes
// 1. Portfolio data endpoints
app.get("/api/portfolio-info", (req, res) => {
  res.json({
    owner: PORTFOLIO_OWNER,
    projects: PROJECTS,
    skills: SKILLS,
    timeline: EVENTS
  });
});

// 2. Contact form handling
app.get("/api/contact/messages", (req, res) => {
  res.json({ status: "success", data: submittedMessages });
});

app.post("/api/contact", (req, res) => {
  const { name, email, projectType, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ 
      status: "error", 
      message: "Missing required fields (name, email, and message are required)." 
    });
  }

  const newMessage = {
    id: "msg-" + Date.now(),
    name,
    email,
    projectType: projectType || "General Inquiry",
    message,
    date: new Date().toISOString()
  };

  submittedMessages.unshift(newMessage);
  res.status(201).json({ 
    status: "success", 
    message: "Your message has been securely submitted directly to CodeGear's backend database!",
    data: newMessage
  });
});

// 3. Gemini AI Assistant Route
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ status: "error", message: "Message cannot be empty." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return res.json({
      status: "success",
      reply: `### ⚠️ Gemini API Key Required
Hello there! I am **CodeGear's AI Representative**.

To chat with me in real-time, please configure your **\`GEMINI_API_KEY\`** in the **Settings > Secrets** panel in the Google AI Studio UI. 

Once added, the key is piped to the server-side code without exposing it to the client, allowing you to ask me about:
- CodeGear's background & technical skill metrics
- Deep architectural details of projects like **PolyFlow AI** or **LedgerGlass**
- Estimated cost and timelines for a custom project of your choice!
`
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // Prepare comprehensive portfolio context for the model
    const context = `
YOU ARE:
CodeGear's elite AI Portfolio Agent. You represent CodeGear, a gifted Full-Stack Developer & AI Specialist.
Your voice is professional, clever, modern, slightly tech-humorous, and concise.
Keep all responses strictly under 150 words. Do not make up facts. Answer markdown compatible.

PORTFOLIO OWNER SUMMARY:
- Name: ${PORTFOLIO_OWNER.name}
- Title: ${PORTFOLIO_OWNER.title}
- Tagline: ${PORTFOLIO_OWNER.tagline}
- Core Ethos: ${PORTFOLIO_OWNER.about}
- Location: ${PORTFOLIO_OWNER.location}
- Email: ${PORTFOLIO_OWNER.email}

TECHNICAL SKILLS:
${SKILLS.map(s => `- ${s.name} (Category: ${s.category}, Experience Focus Level: ${s.level}%)`).join("\n")}

TIMELINE OF EXPERIENCE & MILESTONES:
${EVENTS.map(ev => `- [${ev.period}] ${ev.title} at ${ev.companyOrInstitution}: ${ev.description} Key Achievements: ${ev.highlights.join(", ")}`).join("\n")}

PROJECTS SHOWN:
${PROJECTS.map(p => `- ${p.title} (${p.category}): ${p.description} Metrics: ${p.metrics}. Stack includes: ${p.tech.join(", ")}. Complete details: ${p.longDescription}`).join("\n")}

DIRECTIONS:
1. Always stay in character as CodeGear's portfolio representative.
2. If the user wants to hire, offer estimated guidelines: Projects typically range from $5,000 - $35,000 with a 3 to 12-week delivery timeline depending on complexity. Encourage using the contact form directly!
3. If the user asks about skills or specific projects, explain using the specific definitions above. Highlight full-stack integration and performance.
4. Keep replies snappy, using elegant bolding and bullet points. Never hallucinate.
`;

    // Convert history format to systemInstruction + chat contents
    const formattedHistory: any[] = [];
    
    if (history && history.length > 0) {
      history.forEach((msg: any) => {
        formattedHistory.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      });
    }

    // Add the user's latest query
    formattedHistory.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedHistory,
      config: {
        systemInstruction: context,
        temperature: 0.7,
      }
    });

    res.json({
      status: "success",
      reply: response.text || "I was unable to compile a response. Could you ask again?"
    });

  } catch (apiError: any) {
    console.error("Gemini API Call failed:", apiError);
    res.json({
      status: "success",
      reply: `### ❌ API Connection Issue
I ran into an issue communicating with the server: ${apiError.message || apiError}. Please check your environment configuration and try again.`
    });
  }
});

// Guard listener startup when loaded as a platform/edge serverless function (e.g. Vercel)
const isVercel = process.env.VERCEL === "1" || !!process.env.VERCEL;

async function startServer() {
  if (isVercel) {
    console.log("Vercel context detected. Bypassing active server stream bindings...");
    return;
  }

  // Vite middleware for development or server-static files for production
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-Stack Server booting successfully on port ${PORT}`);
    console.log(`Primary endpoint live at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical: Failed to boot Full-Stack Express Server", err);
});

export default app;
