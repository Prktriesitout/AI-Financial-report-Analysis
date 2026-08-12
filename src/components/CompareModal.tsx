import React, { useState } from 'react';
import { ReportDocument } from '../types';
import { X, GitCompare, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  reports: ReportDocument[];
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  reports,
}) => {
  const [reportIdA, setReportIdA] = useState(reports[0]?.id || '');
  const [reportIdB, setReportIdB] = useState(reports[1]?.id || reports[0]?.id || '');
  const [comparisonResult, setComparisonResult] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleRunComparison = async () => {
    if (!reportIdA || !reportIdB) return;
    setIsComparing(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/reports/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportIdA, reportIdB }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to compare reports.');
      }

      setComparisonResult(data.comparison);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error running comparative analysis.');
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-100 bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-indigo-400" />
            Peer & Multi-Period Financial Report Comparison
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Compare key financial metrics, revenue trajectories, risk factors, and outlook guidance side-by-side using Gemini 3.6 Flash.
          </p>
        </div>

        {/* Report Selector Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
          <div>
            <label className="block font-semibold text-teal-300 mb-1">Select Primary Report (A)</label>
            <select
              value={reportIdA}
              onChange={(e) => setReportIdA(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-teal-500"
            >
              {reports.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.company} ({r.period})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-indigo-300 mb-1">Select Secondary Report (B)</label>
            <select
              value={reportIdB}
              onChange={(e) => setReportIdB(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {reports.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.company} ({r.period})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleRunComparison}
          disabled={isComparing || !reportIdA || !reportIdB}
          className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-indigo-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
        >
          {isComparing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating Peer Benchmark Analysis...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Run Side-by-Side Financial Comparison</span>
            </>
          )}
        </button>

        {errorMsg && (
          <p className="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">{errorMsg}</p>
        )}

        {/* Output Box */}
        {comparisonResult && (
          <div className="flex-1 overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap font-mono leading-relaxed space-y-2">
            <div className="text-emerald-400 font-sans font-semibold mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Comparative Executive Summary Generated:
            </div>
            {comparisonResult}
          </div>
        )}
      </div>
    </div>
  );
};
