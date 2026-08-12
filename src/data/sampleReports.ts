import { ReportDocument } from '../types';

export const SAMPLE_REPORTS: ReportDocument[] = [
  {
    id: 'northgate-fy2025',
    title: 'Northgate Industrial Holdings - FY 2025 Annual Financial Report',
    company: 'Northgate Industrial Holdings, Inc.',
    period: 'FY 2025',
    uploadDate: '2025-10-15',
    isSample: true,
    rawText: `Northgate Industrial Holdings, Inc.
Annual Financial Report — Fiscal Year 2025

Revenue
Total revenue for FY2025 reached $842.3 million, an increase of 11.4% compared to $756.1 million in FY2024. Growth was driven primarily by the Industrial Equipment segment, which grew 15.2% year-over-year on the back of strong demand in North America and Southeast Asia. The Services segment grew a more modest 4.8%, reflecting slower renewal rates among mid-market clients. Recurring revenue now represents 38% of total revenue, up from 33% last year, as the company continues its shift toward subscription-based maintenance contracts.

Quarterly revenue accelerated through the year: Q1 $185.2M, Q2 $201.7M, Q3 $218.9M, and Q4 $236.5M, reflecting normal seasonal strength in the back half combined with the ramp of two new product lines launched in June.

Expenses
Total operating expenses were $612.7 million, up 8.1% from $566.8 million in FY2024, growing slower than revenue and driving 210 basis points of operating margin expansion. Cost of goods sold rose 9.3% to $410.4 million due to higher input costs for steel and semiconductors, partially offset by procurement efficiencies from the new supplier consolidation program. Selling, general and administrative expenses increased 5.6% to $148.9 million, reflecting continued investment in the sales organization in APAC. Research and development spending grew 12.0% to $53.4 million as the company accelerated development of its next-generation automation platform.

One-time restructuring charges of $9.2 million were recorded in Q3 related to the consolidation of two European distribution centers, expected to generate annualized savings of approximately $6 million beginning in FY2026.

Risks
Management has identified several risk factors that could affect future performance. First, continued volatility in raw material prices, particularly steel and semiconductor components, could compress margins if increases cannot be passed through to customers. Second, the company has significant customer concentration, with its top five customers representing approximately 34% of total revenue; the loss of any one of these relationships could materially affect results. Third, roughly 28% of revenue is now generated outside the United States, exposing the company to foreign currency fluctuation and geopolitical trade policy risk, including potential new tariffs on imported components. Fourth, the competitive landscape in industrial automation continues to intensify, with two well-capitalized entrants announcing competing products during the year. Finally, the company notes ongoing cybersecurity risk as its products increasingly rely on connected, cloud-based control systems.

Outlook
For FY2026, management is guiding to revenue of $920 million to $960 million, representing growth of approximately 9% to 14%, with continued margin expansion expected as the recurring-revenue mix increases. The company plans to invest an incremental $18 million in R&D to accelerate the automation platform roadmap and expects to open a new manufacturing facility in Vietnam in the second half of FY2026 to diversify production away from single-region dependency. Management also intends to pursue one or two tuck-in acquisitions in the software and analytics space to strengthen the recurring-revenue segment, funded from existing cash reserves of $214 million and available credit facilities.

Key Financial Summary
Metric FY2024 FY2025 YoY Change
Revenue ($M) 756.1 842.3 +11.4%
Operating Expenses ($M) 566.8 612.7 +8.1%
Operating Margin 25.0% 27.2% +2.2 pp
R&D Spend ($M) 47.7 53.4 +12.0%
Cash & Equivalents ($M) 189.3 214.0 +13.1%`,
    structuredData: {
      companyName: 'Northgate Industrial Holdings, Inc.',
      fiscalPeriod: 'FY 2025',
      executiveSummary: 'Northgate generated $842.3M in revenue (+11.4% YoY) with operating margin expansion of 210 bps to 27.2%. Growth was led by Industrial Equipment (+15.2%) and recurring subscription revenue expansion to 38% of total revenue.',
      revenue: {
        totalRevenue: '$842.3 Million',
        growthRate: '+11.4% YoY (vs $756.1M in FY24)',
        keyDrivers: [
          'Industrial Equipment segment grew 15.2% driven by North America & Southeast Asia demand',
          'Services segment grew 4.8% due to slower mid-market renewals',
          'Recurring revenue mix reached 38% (up from 33% in FY24)',
          'Two new product lines launched in June powered Q3/Q4 acceleration'
        ],
        quarterlyBreakdown: ['Q1: $185.2M', 'Q2: $201.7M', 'Q3: $218.9M', 'Q4: $236.5M']
      },
      expenses: {
        totalOpEx: '$612.7 Million (+8.1% YoY)',
        growthRate: '8.1% (Grew slower than revenue, expanding operating margin by 210 bps)',
        cogs: '$410.4M (+9.3%) due to steel and semiconductor input costs',
        rdSpend: '$53.4M (+12.0%) for next-gen automation platform',
        keyHighlights: [
          'SG&A increased 5.6% to $148.9M for APAC sales expansion',
          'One-time restructuring charge of $9.2M in Q3 for European distribution center consolidation ($6M expected annualized savings starting FY26)',
          'Procurement efficiencies from supplier consolidation partially offset raw material inflation'
        ]
      },
      risks: [
        { riskFactor: 'Raw Material Volatility', impact: 'Steel and semiconductor price swings could compress margins if cost increases cannot be passed on.' },
        { riskFactor: 'Customer Concentration', impact: 'Top 5 customers represent ~34% of total revenue; losing any relationship could materially impact earnings.' },
        { riskFactor: 'Foreign Currency & Geopolitical Trade', impact: '28% of revenue is international; potential tariffs and FX volatility present downside risk.' },
        { riskFactor: 'Intensifying Competition', impact: 'Two well-capitalized entrants introduced competing industrial automation solutions.' },
        { riskFactor: 'Cybersecurity Exposure', impact: 'Increasing reliance on connected, cloud-based control systems heightens cyber threat vectors.' }
      ],
      outlook: {
        guidanceRevenue: '$920M - $960M (9% to 14% growth)',
        projectedGrowth: '9.0% - 14.0%',
        strategicInitiatives: [
          'Invest incremental $18M in R&D for automation platform roadmap',
          'Establish new manufacturing facility in Vietnam in 2H FY2026 to mitigate single-region dependency',
          'Pursue 1-2 tuck-in software & analytics acquisitions using $214M cash reserves'
        ]
      },
      keyMetrics: [
        { metric: 'Revenue ($M)', fyPrevious: '756.1', fyCurrent: '842.3', yoyChange: '+11.4%', note: 'Driven by Industrial Equipment' },
        { metric: 'Operating Expenses ($M)', fyPrevious: '566.8', fyCurrent: '612.7', yoyChange: '+8.1%', note: 'Operating leverage achieved' },
        { metric: 'Operating Margin', fyPrevious: '25.0%', fyCurrent: '27.2%', yoyChange: '+2.2 pp', note: '210 bps expansion' },
        { metric: 'R&D Spend ($M)', fyPrevious: '47.7', fyCurrent: '53.4', yoyChange: '+12.0%', note: 'Next-gen automation platform' },
        { metric: 'Cash & Equivalents ($M)', fyPrevious: '189.3', fyCurrent: '214.0', yoyChange: '+13.1%', note: 'Supports M&A flexibility' }
      ]
    }
  },
  {
    id: 'saudi-aramco-fy2024',
    title: 'Saudi Aramco - FY 2024 / H1 2025 Financial Report',
    company: 'Saudi Arabian Oil Company (Saudi Aramco)',
    period: 'FY 2024 - H1 2025',
    uploadDate: '2025-08-01',
    isSample: true,
    rawText: `Saudi Aramco Financial Report
Company Snapshot
Saudi Aramco (Saudi Arabian Oil Company) is the world’s largest integrated oil and gas company, headquartered in Dhahran, Saudi Arabia. The company is majority-owned by the Government of Saudi Arabia. CEO: Amin H. Nasser. Operations include exploration, production, refining, distribution, and petrochemicals.

FY 2024 Financial Highlights
Metric Value (USD Billion)
Revenue 480.45
Operating Income 206.57
Net Income 106.25
Total Assets 646.30
Shareholder Equity 440.36

Dividend Performance
In 2024, Aramco declared total dividend payouts of approximately USD 85.4 billion. In the first half of 2025, base dividends reached USD 42.3 billion while performance-linked dividends dropped significantly by 98% year-on-year, reflecting lower free cash flow due to weaker oil prices.

Market & Industry Context
Net profit in FY 2024 declined by 12% to USD 106.25 billion due to lower energy prices. In Q2 2025, net profit fell further by 22% to USD 22.7 billion. Average realized oil prices dropped from about USD 85.7/barrel in Q2 2024 to USD 66.7/barrel in Q2 2025.

Detailed Financial Analysis
Period Adjusted Net Income Operating Cash Flow Free Cash Flow
Q2 2025 24.5 B 27.5 B 15.2 B
H1 2025 50.9 B 59.3 B 34.4 B
FY 2024 106.25 B - -

Financial Strength & Liquidity
Aramco maintains robust cash generation capacity despite market volatility. As of H1 2025, gearing ratio stood at 6.5% with borrowings at USD 92.9 billion. The company engaged in asset monetization and plans to issue Islamic bonds to strengthen liquidity.

Challenges & Outlook
Key challenges include sustained oil price volatility and dividend sustainability pressures. Performance-linked dividends dropped by 98% in H1 2025. Capital expenditure guidance for 2025 remains at USD 52–58 billion, with expectations of demand growth in the second half of the year.`,
    structuredData: {
      companyName: 'Saudi Arabian Oil Company (Saudi Aramco)',
      fiscalPeriod: 'FY 2024 / H1 2025',
      executiveSummary: 'Saudi Aramco reported $480.45B in FY 2024 revenue and $106.25B in net income (-12% YoY due to softer crude prices). H1 2025 net profit adjusted to $50.9B with realized oil prices dropping to $66.7/bbl in Q2 2025.',
      revenue: {
        totalRevenue: '$480.45 Billion (FY 2024)',
        growthRate: '-12% Net Profit decline due to lower crude prices',
        keyDrivers: [
          'Average realized crude oil price dropped from $85.7/bbl (Q2 2024) to $66.7/bbl (Q2 2025)',
          'Operating income totaled $206.57 Billion in FY 2024',
          'Free Cash Flow generated in H1 2025 reached $34.4 Billion'
        ]
      },
      expenses: {
        totalOpEx: 'Included in $206.57B Operating Income margin structure',
        growthRate: 'N/A (Softening margins due to price environment)',
        keyHighlights: [
          'Borrowings at $92.9 Billion with a low gearing ratio of 6.5%',
          'Asset monetization and planned Islamic bond issuance (Sukuk) to fortify liquidity'
        ]
      },
      risks: [
        { riskFactor: 'Oil Price & Energy Market Volatility', impact: 'Crude prices dropping to $66.7/bbl directly compresses operating margins and cash flow.' },
        { riskFactor: 'Dividend Sustainability Strain', impact: 'Performance-linked dividends dropped 98% YoY in H1 2025 due to reduced free cash flow.' },
        { riskFactor: 'Macroeconomic & Demand Uncertainties', impact: 'Second-half recovery dependent on global industrial and transport demand rebounds.' }
      ],
      outlook: {
        guidanceRevenue: 'Capex guidance USD 52B - 58B for 2025',
        projectedGrowth: 'Demand growth expected in second half of 2025',
        strategicInitiatives: [
          'Maintain 2025 Capital Expenditure guidance of $52B - $58B',
          'Issue Sukuk (Islamic bonds) and execute strategic asset monetization',
          'Sustain base dividend payout ($42.3B in H1 2025)'
        ]
      },
      keyMetrics: [
        { metric: 'Revenue ($B)', fyPrevious: 'N/A', fyCurrent: '480.45', yoyChange: 'N/A', note: 'FY 2024 total' },
        { metric: 'Operating Income ($B)', fyPrevious: 'N/A', fyCurrent: '206.57', yoyChange: 'N/A', note: 'FY 2024 total' },
        { metric: 'Net Income ($B)', fyPrevious: '120.73', fyCurrent: '106.25', yoyChange: '-12.0%', note: 'Softer oil price environment' },
        { metric: 'Total Assets ($B)', fyPrevious: 'N/A', fyCurrent: '646.30', yoyChange: 'N/A', note: 'Strong balance sheet' },
        { metric: 'H1 2025 Free Cash Flow ($B)', fyPrevious: 'N/A', fyCurrent: '34.40', yoyChange: 'N/A', note: 'Operating cash flow $59.3B' }
      ]
    }
  }
];
