import React, { useState } from 'react';
import { X, BookOpen, Server, Code, CheckCircle2, ArrowRight, Database, Bot, Cpu, Layers } from 'lucide-react';

interface BackendGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackendGuideModal: React.FC<BackendGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'steps' | 'backend'>('steps');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-100 bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-100">
              Financial Report Assistant Architecture Guide
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20">
              Gemini 3.6 Flash + Express Pipeline
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete step-by-step breakdown and backend implementation guide for the Financial Report Q&A Assistant.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('steps')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'steps'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Step-by-Step Pipeline Overview
          </button>
          <button
            onClick={() => setActiveTab('backend')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'backend'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-4 h-4" /> Backend Implementation Details (server.ts)
          </button>
        </div>

        {/* Content Box */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs leading-relaxed text-slate-300">
          {activeTab === 'steps' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* STEP 1 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-teal-400 font-bold">STEP 1</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">Prompting</span>
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm">Financial Prompt Templates</h3>
                  <p className="text-slate-400">
                    Construct two distinct prompt templates:
                    <br />
                    1) <code className="text-teal-300">STRUCTURED_EXTRACTION_TEMPLATE</code> for one-shot extraction of Revenue, Expenses, Risks, Outlook, and Metrics tables in JSON.
                    <br />
                    2) <code className="text-teal-300">FINANCE_PROMPT</code> for multi-turn Q&A.
                  </p>
                </div>

                {/* STEP 2 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-teal-400 font-bold">STEP 2</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">State</span>
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm">Session Conversation Memory</h3>
                  <p className="text-slate-400">
                    Implement stateful chat history indexed by <code className="text-teal-300">sessionId</code>. Preserves past user turns and model answers so users can ask follow-ups like "Combine my previous two questions on revenue and risk".
                  </p>
                </div>

                {/* STEP 3 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-teal-400 font-bold">STEP 3</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">Governance</span>
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm">Domain Tone & Guardrails</h3>
                  <p className="text-slate-400">
                    System instructions force an institutional financial analyst persona. All responses prioritize bullet points, bold key numerical figures, and strict reliance on the report text without hallucinating.
                  </p>
                </div>

                {/* STEP 4 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-teal-400 font-bold">STEP 4</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">Ingestion</span>
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm">PDF & Text Ingestion Engine</h3>
                  <p className="text-slate-400">
                    Parse PDFs using <code className="text-teal-300">pdf-parse</code> on Express backend or pass raw text directly. Store documents in an in-memory document registry (<code className="text-teal-300">reportsMap</code>).
                  </p>
                </div>

                {/* STEP 5 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-teal-400 font-bold">STEP 5</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">Model Execution</span>
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm">Gemini 3.6 Flash Integration</h3>
                  <p className="text-slate-400">
                    Execute <code className="text-teal-300">ai.models.generateContent</code> on server side using the modern <code className="text-teal-300">@google/genai</code> TypeScript SDK with strict JSON schema response mode when extracting structures.
                  </p>
                </div>

                {/* STEP 6 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-teal-400 font-bold">STEP 6</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">Grounding</span>
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm">Verifiable Source Citations</h3>
                  <p className="text-slate-400">
                    Extract matching source snippets from the financial document and attach them as <code className="text-teal-300">citedSnippets</code> to each chat response for audit transparency.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 font-mono text-[11px]">
              {/* SDK Init */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between font-sans">
                  <h3 className="font-bold text-teal-300 text-xs flex items-center gap-1.5">
                    <Code className="w-4 h-4" /> 1. Server-Side Gemini SDK Setup (server.ts)
                  </h3>
                  <span className="text-[10px] text-slate-500">@google/genai</span>
                </div>
                <pre className="p-3 bg-slate-900 rounded-lg text-slate-200 overflow-x-auto text-[10.5px]">
{`import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});`}
                </pre>
              </div>

              {/* Ingestion & Structured Extraction */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between font-sans">
                  <h3 className="font-bold text-teal-300 text-xs flex items-center gap-1.5">
                    <Database className="w-4 h-4" /> 2. PDF Parsing & Structured Extraction Endpoint
                  </h3>
                  <span className="text-[10px] text-slate-500">POST /api/reports/upload</span>
                </div>
                <pre className="p-3 bg-slate-900 rounded-lg text-slate-200 overflow-x-auto text-[10.5px]">
{`app.post("/api/reports/upload", async (req, res) => {
  const { pdfBase64, text, company, period } = req.body;
  let rawText = text || "";

  if (pdfBase64) {
    const buffer = Buffer.from(pdfBase64.replace(/^data:application\\/pdf;base64,/, ""), "base64");
    const parsed = await pdfParse(buffer);
    rawText = parsed.text;
  }

  // Generate structured JSON with Gemini 3.6 Flash
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: promptWithRawText,
    config: {
      responseMimeType: "application/json",
      systemInstruction: "Extract precise financial data.",
    },
  });

  const structuredData = JSON.parse(response.text);
  reportsMap.set(newId, { id: newId, rawText, structuredData });
  res.json({ report: { id: newId, structuredData } });
});`}
                </pre>
              </div>

              {/* Multi-turn Chat Endpoint */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between font-sans">
                  <h3 className="font-bold text-teal-300 text-xs flex items-center gap-1.5">
                    <Bot className="w-4 h-4" /> 3. Stateful Chat Endpoint with Conversation Memory
                  </h3>
                  <span className="text-[10px] text-slate-500">POST /api/chat</span>
                </div>
                <pre className="p-3 bg-slate-900 rounded-lg text-slate-200 overflow-x-auto text-[10.5px]">
{`app.post("/api/chat", async (req, res) => {
  const { sessionId = "default", reportId, message } = req.body;
  let history = sessionsMap.get(sessionId) || [];

  // Build contents array with prior turns
  const contents = history.map(turn => ({
    role: turn.role,
    parts: [{ text: turn.content }]
  }));
  contents.push({ role: "user", parts: [{ text: message }] });

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: contents,
    config: {
      systemInstruction: "You are an institutional Wall St AI Analyst..."
    }
  });

  // Save turn to session memory
  history.push({ role: "user", content: message });
  history.push({ role: "model", content: response.text });
  sessionsMap.set(sessionId, history);

  res.json({ reply: response.text, history });
});`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
