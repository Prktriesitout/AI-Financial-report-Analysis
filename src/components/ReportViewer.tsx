import React, { useState } from 'react';
import { ReportDocument } from '../types';
import { FileText, Search, Copy, Check, Eye, EyeOff } from 'lucide-react';

interface ReportViewerProps {
  report: ReportDocument;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({ report }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'revenue' | 'expenses' | 'risks' | 'outlook'>('all');

  const handleCopy = () => {
    navigator.clipboard.writeText(report.rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract section blocks from report
  const getSectionContent = () => {
    const text = report.rawText;
    if (activeTab === 'all') return text;

    const sections: Record<string, string> = {};
    let currentKey = 'general';
    const lines = text.split('\n');

    lines.forEach((line) => {
      const lower = line.toLowerCase().trim();
      if (lower.startsWith('revenue')) currentKey = 'revenue';
      else if (lower.startsWith('expenses') || lower.startsWith('operating expenses')) currentKey = 'expenses';
      else if (lower.startsWith('risks') || lower.startsWith('risk factors')) currentKey = 'risks';
      else if (lower.startsWith('outlook') || lower.startsWith('guidance')) currentKey = 'outlook';

      if (!sections[currentKey]) sections[currentKey] = '';
      sections[currentKey] += line + '\n';
    });

    return sections[activeTab] || text;
  };

  const contentToShow = getSectionContent();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full shadow-sm">
      {/* Document Header Bar */}
      <div className="p-3.5 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-semibold text-xs text-slate-200">{report.title}</h2>
            <p className="text-[11px] text-slate-400">Raw Ingested Text Document</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Section Filter Pills */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            {(['all', 'revenue', 'expenses', 'risks', 'outlook'] as const).map((tab) => (
              <button
                key={tab}
                id={`doc-tab-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`px-2 py-1 rounded-md capitalize transition-colors font-medium text-[11px] ${
                  activeTab === tab
                    ? 'bg-teal-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            id="btn-copy-raw"
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs flex items-center gap-1 border border-slate-700"
            title="Copy Raw Document Text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-3 py-2 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-2">
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <input
          id="doc-search-input"
          type="text"
          placeholder="Filter document terms (e.g., steel, guidance, margin)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent text-xs text-slate-200 placeholder-slate-500 w-full focus:outline-none"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-[11px] text-slate-400 hover:text-slate-200"
          >
            Clear
          </button>
        )}
      </div>

      {/* Document Text Box */}
      <div className="p-4 overflow-y-auto max-h-[500px] text-xs font-mono leading-relaxed text-slate-300 space-y-2 bg-slate-950/40">
        {contentToShow
          .split('\n')
          .filter((line) => !searchTerm || line.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((line, idx) => {
            const isHeading =
              line.toLowerCase().includes('revenue') ||
              line.toLowerCase().includes('expenses') ||
              line.toLowerCase().includes('risks') ||
              line.toLowerCase().includes('outlook') ||
              line.toLowerCase().includes('summary');

            return (
              <p
                key={idx}
                className={`py-0.5 rounded px-1 transition-colors ${
                  isHeading ? 'text-teal-300 font-bold font-sans text-sm mt-3 border-b border-slate-800/80 pb-1' : ''
                } ${
                  searchTerm && line.toLowerCase().includes(searchTerm.toLowerCase())
                    ? 'bg-amber-500/20 text-amber-200'
                    : ''
                }`}
              >
                {line}
              </p>
            );
          })}
      </div>
    </div>
  );
};
