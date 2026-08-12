export interface FinancialMetric {
  metric: string;
  fyPrevious?: string;
  fyCurrent?: string;
  yoyChange?: string;
  note?: string;
}

export interface StructuredAnalysisData {
  companyName: string;
  fiscalPeriod: string;
  executiveSummary: string;
  revenue: {
    totalRevenue: string;
    growthRate: string;
    keyDrivers: string[];
    quarterlyBreakdown?: string[];
  };
  expenses: {
    totalOpEx: string;
    growthRate: string;
    cogs?: string;
    rdSpend?: string;
    keyHighlights: string[];
  };
  risks: {
    riskFactor: string;
    impact: string;
  }[];
  outlook: {
    guidanceRevenue?: string;
    projectedGrowth?: string;
    strategicInitiatives: string[];
  };
  keyMetrics: FinancialMetric[];
}

export interface ReportDocument {
  id: string;
  title: string;
  company: string;
  period: string;
  rawText: string;
  structuredData?: StructuredAnalysisData;
  uploadDate: string;
  isSample?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: string;
  citedSnippets?: string[];
}

export interface ChatSession {
  sessionId: string;
  reportId: string;
  messages: ChatMessage[];
  createdAt: string;
}
