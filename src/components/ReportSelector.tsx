import React from 'react';
import { ReportDocument } from '../types';
import { Building2, Sparkles, Plus, Layers } from 'lucide-react';

interface ReportSelectorProps {
  reports: ReportDocument[];
  selectedReportId: string;
  onSelectReport: (id: string) => void;
  onOpenUpload: () => void;
}

export const ReportSelector: React.FC<ReportSelectorProps> = ({
  reports,
  selectedReportId,
  onSelectReport,
  onOpenUpload,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 shadow-sm">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Layers className="w-3.5 h-3.5 text-teal-400" />
          <span>Report Library ({reports.length})</span>
        </div>
        <button
          id="btn-quick-add"
          onClick={onOpenUpload}
          className="text-xs text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Custom
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {reports.map((doc) => {
          const isSelected = doc.id === selectedReportId;
          return (
            <button
              key={doc.id}
              id={`report-select-${doc.id}`}
              onClick={() => onSelectReport(doc.id)}
              className={`text-left p-3 rounded-lg border transition-all relative overflow-hidden text-slate-200 ${
                isSelected
                  ? 'bg-slate-800/90 border-teal-500/80 shadow-md ring-1 ring-teal-500/50'
                  : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md ${isSelected ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-slate-100 line-clamp-1">{doc.company}</h3>
                    <p className="text-[11px] text-slate-400 font-mono">{doc.period}</p>
                  </div>
                </div>
                {doc.isSample && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> Sample
                  </span>
                )}
              </div>
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
