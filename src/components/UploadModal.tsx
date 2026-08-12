import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newReport: any) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'pdf' | 'text'>('pdf');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [period, setPeriod] = useState('');
  const [rawText, setRawText] = useState('');
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [pdfFileName, setPdfFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setErrorMsg('Please select a valid PDF file (.pdf)');
      return;
    }

    setErrorMsg('');
    setPdfFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      setPdfBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMsg('');

    try {
      const payload = {
        title: title || pdfFileName.replace('.pdf', '') || 'Custom Financial Report',
        company,
        period,
        text: activeTab === 'text' ? rawText : undefined,
        pdfBase64: activeTab === 'pdf' ? pdfBase64 : undefined,
      };

      const res = await fetch('/api/reports/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload report.');
      }

      onUploadSuccess(data.report);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error processing document upload.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-100 bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Upload className="w-5 h-5 text-teal-400" />
            Upload Financial Report Document
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Ingest custom PDF annual reports, 10-Ks, or earnings release texts for automated Gemini parsing.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('pdf')}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'pdf'
                ? 'bg-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" /> PDF File Upload
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'text'
                ? 'bg-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Paste Raw Text
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Metadata Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Company Name</label>
              <input
                type="text"
                placeholder="e.g. Acme Corp"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-300 mb-1">Fiscal Period</label>
              <input
                type="text"
                placeholder="e.g. FY 2025"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {activeTab === 'pdf' ? (
            <div className="border-2 border-dashed border-slate-800 hover:border-teal-500/60 rounded-xl p-6 text-center bg-slate-950/50 transition-colors">
              <Upload className="w-8 h-8 text-teal-400 mx-auto mb-2" />
              <p className="font-semibold text-slate-200 text-xs">Select PDF Financial Document</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Annual Report, 10-K, 10-Q, or Quarterly Deck</p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="mt-3 block w-full text-xs text-slate-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-teal-300 hover:file:bg-slate-700 cursor-pointer"
              />
              {pdfFileName && (
                <p className="mt-2 text-xs font-mono text-emerald-400 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Selected: {pdfFileName}
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="block font-medium text-slate-300 mb-1">Financial Report Raw Text</label>
              <textarea
                rows={6}
                placeholder="Paste earnings text or financial report contents here..."
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing || (activeTab === 'pdf' && !pdfBase64) || (activeTab === 'text' && !rawText.trim())}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-md disabled:opacity-50"
            >
              {isProcessing && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{isProcessing ? 'Processing & Extracting...' : 'Ingest Document'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
