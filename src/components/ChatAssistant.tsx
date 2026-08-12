import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Send, Bot, User, Trash2, Sparkles, BookOpen, Clock, ShieldCheck, CornerDownLeft } from 'lucide-react';

interface ChatAssistantProps {
  messages: ChatMessage[];
  onSendMessage: (msg: string) => void;
  onClearMemory: () => void;
  isSending: boolean;
  sessionId: string;
}

const PRESET_QUERIES = [
  "What is the company's revenue growth this year?",
  "What risks were mentioned in the report?",
  "Give me a combined summary of revenue and risks so far.",
  "Compare operating expenses vs revenue growth margins.",
];

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  messages,
  onSendMessage,
  onClearMemory,
  isSending,
  sessionId,
}) => {
  const [inputMsg, setInputMsg] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || isSending) return;
    onSendMessage(inputMsg);
    setInputMsg('');
  };

  const handleChipClick = (query: string) => {
    if (isSending) return;
    onSendMessage(query);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-full overflow-hidden shadow-sm">
      {/* Header Bar */}
      <div className="p-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-semibold text-xs text-slate-100 flex items-center gap-1.5">
              Financial Q&A Assistant
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h2>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-teal-400" />
              Session Memory Active: <span className="font-mono text-teal-300">{sessionId}</span>
            </p>
          </div>
        </div>

        <button
          id="btn-clear-chat-memory"
          onClick={onClearMemory}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-300 border border-slate-700 transition-colors text-xs flex items-center gap-1"
          title="Reset conversation memory"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Memory</span>
        </button>
      </div>

      {/* Message List */}
      <div className="p-4 flex-1 overflow-y-auto space-y-3.5 min-h-[320px] max-h-[520px] bg-slate-950/40 text-xs">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-slate-400 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-teal-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="font-medium text-slate-300 text-sm">Ask any question about this financial report</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Multi-turn memory is active. You can ask follow-up questions like "Summarize my previous two questions" or "Combine revenue and risks".
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-3.5 shadow-sm space-y-1.5 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-br-none'
                    : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-bl-none'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[10px] opacity-75 font-mono mb-1">
                  {msg.role === 'user' ? (
                    <>
                      <User className="w-3 h-3" />
                      <span>Client ({msg.timestamp})</span>
                    </>
                  ) : (
                    <>
                      <Bot className="w-3 h-3 text-teal-400" />
                      <span>Financial AI Analyst</span>
                    </>
                  )}
                </div>

                <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </div>

                {/* Citations Box */}
                {msg.citedSnippets && msg.citedSnippets.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-slate-700/60 text-[11px] space-y-1 text-slate-300">
                    <p className="font-semibold text-teal-300 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> Referenced Report Snippets:
                    </p>
                    {msg.citedSnippets.map((snip, i) => (
                      <p key={i} className="pl-2 border-l-2 border-teal-500/60 italic text-slate-400 font-mono text-[10px]">
                        "{snip}"
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {isSending && (
          <div className="flex items-center gap-2 text-teal-400 text-xs font-mono p-2 bg-slate-800/50 rounded-lg w-fit animate-pulse">
            <Bot className="w-4 h-4 animate-spin" />
            <span>Evaluating document & retrieving multi-turn context...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Preset Query Chips */}
      <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800 overflow-x-auto flex gap-1.5 text-[11px]">
        {PRESET_QUERIES.map((q, idx) => (
          <button
            key={idx}
            id={`preset-chip-${idx}`}
            onClick={() => handleChipClick(q)}
            disabled={isSending}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 hover:border-teal-500/50 transition-colors whitespace-nowrap shrink-0 font-medium"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
        <input
          id="chat-input-field"
          type="text"
          placeholder="Ask a question (e.g. 'What is the projected Capex for 2025?')..."
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          disabled={isSending}
          className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
        />
        <button
          id="btn-send-chat"
          type="submit"
          disabled={!inputMsg.trim() || isSending}
          className="px-3.5 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 transition-all shadow-md"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};
