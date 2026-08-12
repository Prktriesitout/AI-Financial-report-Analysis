import React, { useState } from 'react';
import { StructuredAnalysisData } from '../types';
import { DollarSign, AlertTriangle, TrendingUp, Compass, Table, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';

interface StructuredAnalysisProps {
  data?: StructuredAnalysisData;
  isLoading: boolean;
  onRefresh: () => void;
}

export const StructuredAnalysis: React.FC<StructuredAnalysisProps> = ({
  data,
  isLoading,
  onRefresh,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'metrics' | 'revenue' | 'expenses' | 'risks' | 'outlook'>('metrics');

  if (isLoading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[350px]">
        <RefreshCw className="w-8 h-8 text-teal-400 animate-spin mb-3" />
        <h3 className="font-semibold text-slate-200 text-sm">Analyzing Report & Extracting Financial Structure...</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-md">
          Gemini 3.6 Flash is evaluating Revenue, Operating Expenses, Risk Factors, Guidance, and Key Summary Metrics.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center flex flex-col items-center justify-center">
        <Layers className="w-8 h-8 text-slate-500 mb-2" />
        <p className="text-sm text-slate-300">No structured extraction available yet.</p>
        <button
          id="btn-trigger-extract"
          onClick={onRefresh}
          className="mt-3 px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold rounded-lg text-xs"
        >
          Run Structured Extraction
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-sm">
      {/* Header & Controls */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-sm text-slate-100">{data.companyName}</h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20 font-semibold">
              {data.fiscalPeriod}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{data.executiveSummary}</p>
        </div>

        <button
          id="btn-rerun-extract"
          onClick={onRefresh}
          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
          title="Re-evaluate report structure with Gemini"
        >
          <RefreshCw className="w-3.5 h-3.5 text-teal-400" />
          Re-Analyze
        </button>
      </div>

      {/* Structured Dashboard Sub-Tabs */}
      <div className="flex bg-slate-950 border-b border-slate-800 px-3 overflow-x-auto">
        {[
          { id: 'metrics', label: 'Summary Metrics Table', icon: Table },
          { id: 'revenue', label: 'Revenue Analysis', icon: TrendingUp },
          { id: 'expenses', label: 'Expenses Structure', icon: DollarSign },
          { id: 'risks', label: 'Risk Factors', icon: AlertTriangle },
          { id: 'outlook', label: 'Outlook & Guidance', icon: Compass },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-structured-${tab.id}`}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-2.5 text-xs font-medium flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-teal-400 text-teal-300 bg-slate-900/60 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Area */}
      <div className="p-4 space-y-4">
        {/* SUBTAB 1: Metrics Table */}
        {activeSubTab === 'metrics' && (
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5 text-teal-400" />
              Key Financial Metrics & Performance Indicators
            </h3>
            <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/50">
              <table className="w-full text-left text-xs text-slate-200">
                <thead className="bg-slate-900 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Financial Metric</th>
                    <th className="p-3">Previous Period</th>
                    <th className="p-3">Current Period</th>
                    <th className="p-3">YoY Change</th>
                    <th className="p-3">Key Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {data.keyMetrics?.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3 font-semibold text-slate-100">{m.metric}</td>
                      <td className="p-3 font-mono text-slate-400">{m.fyPrevious || 'N/A'}</td>
                      <td className="p-3 font-mono text-teal-300 font-bold">{m.fyCurrent || 'N/A'}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                            m.yoyChange?.includes('+') || m.yoyChange?.includes('growth')
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : m.yoyChange?.includes('-')
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {m.yoyChange || 'N/A'}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400 text-[11px]">{m.note || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBTAB 2: Revenue */}
        {activeSubTab === 'revenue' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <p className="text-[11px] font-mono uppercase text-slate-400">Total Reported Revenue</p>
                <p className="text-xl font-bold text-teal-300 mt-1">{data.revenue.totalRevenue}</p>
              </div>
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <p className="text-[11px] font-mono uppercase text-slate-400">Growth Trajectory</p>
                <p className="text-xl font-bold text-emerald-400 mt-1">{data.revenue.growthRate}</p>
              </div>
            </div>

            <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-300 mb-2">Key Revenue Growth Drivers</h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {data.revenue.keyDrivers?.map((driver, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>

            {data.revenue.quarterlyBreakdown && data.revenue.quarterlyBreakdown.length > 0 && (
              <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800">
                <h4 className="text-xs font-semibold text-slate-300 mb-2">Quarterly Acceleration</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {data.revenue.quarterlyBreakdown.map((q, i) => (
                    <div key={i} className="p-2 rounded bg-slate-900 border border-slate-800 text-center">
                      <p className="text-xs font-mono font-semibold text-teal-300">{q}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 3: Expenses */}
        {activeSubTab === 'expenses' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <p className="text-[11px] font-mono uppercase text-slate-400">Total Operating Expenses</p>
                <p className="text-lg font-bold text-slate-100 mt-1">{data.expenses.totalOpEx}</p>
              </div>
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <p className="text-[11px] font-mono uppercase text-slate-400">Cost of Goods Sold (COGS)</p>
                <p className="text-lg font-bold text-amber-300 mt-1">{data.expenses.cogs || 'N/A'}</p>
              </div>
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <p className="text-[11px] font-mono uppercase text-slate-400">R&D Investment</p>
                <p className="text-lg font-bold text-indigo-300 mt-1">{data.expenses.rdSpend || 'N/A'}</p>
              </div>
            </div>

            <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-300 mb-2">Cost Structure & Efficiency Notes</h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {data.expenses.keyHighlights?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* SUBTAB 4: Risks */}
        {activeSubTab === 'risks' && (
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Identified Risk Matrix & Mitigation Vulnerabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.risks?.map((r, i) => (
                <div key={i} className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-xs text-amber-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      {r.riskFactor}
                    </h4>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Risk Factor {i + 1}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{r.impact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 5: Outlook */}
        {activeSubTab === 'outlook' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <p className="text-[11px] font-mono uppercase text-slate-400">Revenue Guidance</p>
                <p className="text-lg font-bold text-emerald-300 mt-1">{data.outlook.guidanceRevenue || 'Not Guidance Specified'}</p>
              </div>
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <p className="text-[11px] font-mono uppercase text-slate-400">Projected Growth Range</p>
                <p className="text-lg font-bold text-teal-300 mt-1">{data.outlook.projectedGrowth || 'N/A'}</p>
              </div>
            </div>

            <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-300 mb-2">Forward Strategic Initiatives</h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {data.outlook.strategicInitiatives?.map((init, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Compass className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span>{init}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
