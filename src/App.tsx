import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ReportSelector } from './components/ReportSelector';
import { ReportViewer } from './components/ReportViewer';
import { StructuredAnalysis } from './components/StructuredAnalysis';
import { ChatAssistant } from './components/ChatAssistant';
import { UploadModal } from './components/UploadModal';
import { CompareModal } from './components/CompareModal';
import { BackendGuideModal } from './components/BackendGuideModal';
import { SAMPLE_REPORTS } from './data/sampleReports';
import { ReportDocument, ChatMessage } from './types';
import { Sparkles, FileText, BarChart3, Bot, LayoutGrid } from 'lucide-react';

export default function App() {
  const [reports, setReports] = useState<ReportDocument[]>(SAMPLE_REPORTS);
  const [selectedReportId, setSelectedReportId] = useState<string>(SAMPLE_REPORTS[0].id);
  const [activeReport, setActiveReport] = useState<ReportDocument>(SAMPLE_REPORTS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string>('session-default');

  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  // Modals
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  // Fetch report list on mount
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/reports');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setReports(data);
        }
      }
    } catch (e) {
      console.warn('Backend not available yet or using client sample fallback', e);
    }
  };

  // Switch Active Report
  const handleSelectReport = async (id: string) => {
    setSelectedReportId(id);
    const foundLocal = reports.find((r) => r.id === id);
    if (foundLocal && foundLocal.rawText) {
      setActiveReport(foundLocal);
    }

    try {
      const res = await fetch(`/api/reports/${id}`);
      if (res.ok) {
        const doc = await res.json();
        setActiveReport(doc);
      }
    } catch (e) {
      console.warn('Using local report data fallback', e);
    }
  };

  // Upload New Report Handler
  const handleUploadSuccess = (newDoc: ReportDocument) => {
    setReports((prev) => [newDoc, ...prev]);
    setSelectedReportId(newDoc.id);
    setActiveReport(newDoc);
  };

  // Re-run Structured Extraction
  const handleReExtract = async () => {
    if (!activeReport) return;
    setIsExtracting(true);
    try {
      const res = await fetch('/api/reports/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId: activeReport.id, rawText: activeReport.rawText }),
      });

      if (res.ok) {
        const data = await res.json();
        setActiveReport((prev) => ({
          ...prev,
          structuredData: data.structuredData,
        }));
      }
    } catch (err) {
      console.error('Re-extraction failed', err);
    } finally {
      setIsExtracting(false);
    }
  };

  // Send Chat Message
  const handleSendMessage = async (msgContent: string) => {
    if (!msgContent.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-u`,
      role: 'user',
      content: msgContent,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsSending(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          reportId: activeReport.id,
          message: msgContent,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const modelMsg: ChatMessage = {
          id: `msg-${Date.now()}-m`,
          role: 'model',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString(),
          citedSnippets: data.citedSnippets,
        };
        setMessages((prev) => [...prev, modelMsg]);
      } else {
        throw new Error('API server error');
      }
    } catch (e) {
      // Offline fallback using structured report context
      setTimeout(() => {
        const fallbackMsg: ChatMessage = {
          id: `msg-${Date.now()}-m`,
          role: 'model',
          content: `Based on **${activeReport.company} (${activeReport.period})**:\n\n• **Revenue**: ${activeReport.structuredData?.revenue.totalRevenue || 'See document text'}\n• **Operating Expenses**: ${activeReport.structuredData?.expenses.totalOpEx || 'See document text'}\n• **Key Risks**: ${activeReport.structuredData?.risks.map(r => r.riskFactor).join(', ') || 'Raw material volatility, customer concentration'}.\n\n*(Connect to Express server with GEMINI_API_KEY for dynamic real-time reasoning)*`,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      }, 500);
    } finally {
      setIsSending(false);
    }
  };

  // Reset Conversation Memory
  const handleClearMemory = async () => {
    setMessages([]);
    try {
      await fetch('/api/chat/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
    } catch (e) {
      console.warn('Memory reset sent to client state');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* Header Bar */}
      <Header
        reportTitle={activeReport.title}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 lg:p-6 space-y-4">
        {/* Report Selector Bar */}
        <ReportSelector
          reports={reports}
          selectedReportId={selectedReportId}
          onSelectReport={handleSelectReport}
          onOpenUpload={() => setIsUploadOpen(true)}
        />

        {/* 3-Column Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* LEFT PANEL: Raw Ingested Document Reader (5 Cols on LG) */}
          <section className="lg:col-span-5 h-[620px] flex flex-col">
            <ReportViewer report={activeReport} />
          </section>

          {/* RIGHT PANEL: Structured Analysis + Multi-Turn Q&A Chat (7 Cols on LG) */}
          <section className="lg:col-span-7 space-y-4">
            {/* Structured Insights Dashboard */}
            <StructuredAnalysis
              data={activeReport.structuredData}
              isLoading={isExtracting}
              onRefresh={handleReExtract}
            />

            {/* Multi-turn Chat Assistant */}
            <div className="h-[480px]">
              <ChatAssistant
                messages={messages}
                onSendMessage={handleSendMessage}
                onClearMemory={handleClearMemory}
                isSending={isSending}
                sessionId={sessionId}
              />
            </div>
          </section>
        </div>
      </main>

      {/* Modals */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        reports={reports}
      />

      <BackendGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
