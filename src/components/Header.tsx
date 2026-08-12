import React from 'react';
import { TrendingUp, Bot, FileText, Cpu, BookOpen, GitCompare } from 'lucide-react';

interface HeaderProps {
  reportTitle: string;
  onOpenGuide: () => void;
  onOpenUpload: () => void;
  onOpenCompare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  reportTitle,
  onOpenGuide,
  onOpenUpload,
  onOpenCompare,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white px-4 lg:px-6 py-3.5 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <TrendingUp className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-slate-100 tracking-tight">
                Financial Report Assistant
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Cpu className="w-3 h-3" /> Gemini 3.6 Flash
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <FileText className="w-3 h-3 text-teal-400" />
              Active Document: <span className="text-teal-300 font-medium truncate max-w-xs">{reportTitle}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            id="btn-upload-report"
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-teal-400" />
            Upload PDF / Text
          </button>

          <button
            id="btn-compare-reports"
            onClick={onOpenCompare}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-sm"
          >
            <GitCompare className="w-3.5 h-3.5 text-indigo-400" />
            Peer Compare
          </button>

          <button
            id="btn-backend-guide"
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 transition-all shadow-md shadow-teal-500/10 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Backend Guide & Pipeline Steps
          </button>
        </div>
      </div>
    </header>
  );
};
