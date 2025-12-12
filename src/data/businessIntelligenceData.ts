// Mock data for Thai Business Intelligence APIs
export interface DataPoint {
  id: string;
  title: {
    en: string;
    ja: string;
  };
  summary: {
    en: string;
    ja: string;
  };
  category: string;
  subcategory: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  percentageChange: number;
  lastUpdated: string;
  year: number;
  source: {
    name: string;
    url: string;
  };
  chartData?: {
    monthly?: Array<{ period: string; value: number }>;
    quarterly?: Array<{ period: string; value: number }>;
    yearly?: Array<{ period: string; value: number }>;
  };
}

// Economy & Investment Data (BOT, NESDC, BOI)
export const economyData: DataPoint[] = [
  // GDP Growth - 2022
  {
    id: 'gdp-growth-2022',
    title: { en: 'Thailand GDP Growth Rate', ja: 'タイのGDP成長率' },
    summary: {
      en: 'Thailand\'s GDP expanded by 2.6% in 2022, recovering from the pandemic with tourism and export growth.',
      ja: 'タイのGDPは2022年に2.6%成長し、観光と輸出の回復によりパンデミックから回復した。'
    },
    category: 'economy', subcategory: 'gdp', value: 2.6, unit: '%', trend: 'up', percentageChange: 4.2,
    lastUpdated: '2022-12-31', year: 2022,
    source: { name: 'NESDC', url: 'https://www.nesdc.go.th' },
    chartData: {
      monthly: [
        { period: 'Jan 2022', value: 2.1 }, { period: 'Feb 2022', value: 2.2 }, { period: 'Mar 2022', value: 2.3 },
        { period: 'Apr 2022', value: 2.4 }, { period: 'May 2022', value: 2.5 }, { period: 'Jun 2022', value: 2.6 }
      ],
      quarterly: [
        { period: 'Q1 2022', value: 2.2 }, { period: 'Q2 2022', value: 2.5 }, { period: 'Q3 2022', value: 2.7 }, { period: 'Q4 2022', value: 2.6 }
      ],
      yearly: [{ period: '2020', value: -6.1 }, { period: '2021', value: 1.5 }, { period: '2022', value: 2.6 }]
    }
  },
  // GDP Growth - 2023
  {
    id: 'gdp-growth-2023',
    title: { en: 'Thailand GDP Growth Rate', ja: 'タイのGDP成長率' },
    summary: {
      en: 'Thailand\'s GDP grew by 1.9% in 2023, slowing due to global economic headwinds and export decline.',
      ja: 'タイのGDPは2023年に1.9%成長し、世界経済の逆風と輸出減少により減速した。'
    },
    category: 'economy', subcategory: 'gdp', value: 1.9, unit: '%', trend: 'down', percentageChange: -0.7,
    lastUpdated: '2023-12-31', year: 2023,
    source: { name: 'NESDC', url: 'https://www.nesdc.go.th' },
    chartData: {
      monthly: [
        { period: 'Jan 2023', value: 1.5 }, { period: 'Feb 2023', value: 1.6 }, { period: 'Mar 2023', value: 1.7 },
        { period: 'Apr 2023', value: 1.8 }, { period: 'May 2023', value: 1.9 }, { period: 'Jun 2023', value: 1.9 }
      ],
      quarterly: [
        { period: 'Q1 2023', value: 1.5 }, { period: 'Q2 2023', value: 1.8 }, { period: 'Q3 2023', value: 2.0 }, { period: 'Q4 2023', value: 1.9 }
      ],
      yearly: [{ period: '2021', value: 1.5 }, { period: '2022', value: 2.6 }, { period: '2023', value: 1.9 }]
    }
  },
  // GDP Growth - 2024
  {
    id: 'gdp-growth-2024',
    title: { en: 'Thailand GDP Growth Rate', ja: 'タイのGDP成長率' },
    summary: {
      en: 'Thailand\'s GDP rebounded to 2.8% in 2024, boosted by tourism recovery and government stimulus.',
      ja: 'タイのGDPは2024年に2.8%に回復し、観光回復と政府の景気刺激策が寄与した。'
    },
    category: 'economy', subcategory: 'gdp', value: 2.8, unit: '%', trend: 'up', percentageChange: 0.9,
    lastUpdated: '2024-12-31', year: 2024,
    source: { name: 'NESDC', url: 'https://www.nesdc.go.th' },
    chartData: {
      monthly: [
        { period: 'Jan 2024', value: 2.3 }, { period: 'Feb 2024', value: 2.4 }, { period: 'Mar 2024', value: 2.5 },
        { period: 'Apr 2024', value: 2.6 }, { period: 'May 2024', value: 2.7 }, { period: 'Jun 2024', value: 2.8 }
      ],
      quarterly: [
        { period: 'Q1 2024', value: 2.3 }, { period: 'Q2 2024', value: 2.5 }, { period: 'Q3 2024', value: 2.7 }, { period: 'Q4 2024', value: 2.8 }
      ],
      yearly: [{ period: '2022', value: 2.6 }, { period: '2023', value: 1.9 }, { period: '2024', value: 2.8 }]
    }
  },
  // GDP Growth - 2025
  {
    id: 'gdp-growth-2025',
    title: { en: 'Thailand GDP Growth Rate', ja: 'タイのGDP成長率' },
    summary: {
      en: 'Thailand\'s GDP expanded by 3.2% year-on-year in Q3 2025, driven by tourism recovery and public investment.',
      ja: 'タイのGDPは2025年第3四半期に前年同期比3.2%成長し、観光回復と公共投資が牽引した。'
    },
    category: 'economy', subcategory: 'gdp', value: 3.2, unit: '%', trend: 'up', percentageChange: 0.4,
    lastUpdated: '2025-11-15', year: 2025,
    source: { name: 'NESDC', url: 'https://www.nesdc.go.th' },
    chartData: {
      monthly: [
        { period: 'Jun 2025', value: 2.9 }, { period: 'Jul 2025', value: 3.0 }, { period: 'Aug 2025', value: 3.1 },
        { period: 'Sep 2025', value: 3.2 }, { period: 'Oct 2025', value: 3.2 }, { period: 'Nov 2025', value: 3.2 }
      ],
      quarterly: [
        { period: 'Q1 2025', value: 2.5 }, { period: 'Q2 2025', value: 2.8 }, { period: 'Q3 2025', value: 3.2 }
      ],
      yearly: [{ period: '2022', value: 2.6 }, { period: '2023', value: 1.9 }, { period: '2024', value: 2.8 }, { period: '2025', value: 3.2 }]
    }
  },
  {
    id: 'exchange-rate-thb-jpy',
    title: {
      en: 'THB/JPY Exchange Rate',
      ja: 'タイバーツ/日本円為替レート'
    },
    summary: {
      en: 'The Thai Baht strengthened against the Japanese Yen, currently trading at 4.48 JPY per THB.',
      ja: 'タイバーツは日本円に対して強くなり、現在1THB=4.48円で取引されている。'
    },
    category: 'economy',
    subcategory: 'exchange-rate',
    value: 4.48,
    unit: 'JPY/THB',
    trend: 'up',
    percentageChange: 3.7,
    lastUpdated: '2025-12-10',
    year: 2025,
    source: {
      name: 'Bank of Thailand (BOT)',
      url: 'https://www.bot.or.th'
    },
    chartData: {
      monthly: [
        { period: 'Jul 2025', value: 4.28 },
        { period: 'Aug 2025', value: 4.32 },
        { period: 'Sep 2025', value: 4.38 },
        { period: 'Oct 2025', value: 4.42 },
        { period: 'Nov 2025', value: 4.45 },
        { period: 'Dec 2025', value: 4.48 }
      ],
      quarterly: [
        { period: 'Q1 2025', value: 4.15 },
        { period: 'Q2 2025', value: 4.25 },
        { period: 'Q3 2025', value: 4.38 },
        { period: 'Q4 2025', value: 4.48 }
      ],
      yearly: [
        { period: '2022', value: 3.85 },
        { period: '2023', value: 4.02 },
        { period: '2024', value: 4.32 },
        { period: '2025', value: 4.48 }
      ]
    }
  },
  {
    id: 'inflation-rate-2025',
    title: {
      en: 'Inflation Rate (CPI)',
      ja: 'インフレ率（CPI）'
    },
    summary: {
      en: 'Thailand headline inflation rose to 1.2% in November 2025, within the BOT target range.',
      ja: 'タイのヘッドラインインフレ率は2025年11月に1.2%に上昇し、BOTの目標範囲内にある。'
    },
    category: 'economy',
    subcategory: 'inflation',
    value: 1.2,
    unit: '%',
    trend: 'up',
    percentageChange: 0.3,
    lastUpdated: '2025-12-05',
    year: 2025,
    source: {
      name: 'Ministry of Commerce',
      url: 'https://www.moc.go.th'
    },
    chartData: {
      monthly: [
        { period: 'Jul 2025', value: 0.8 },
        { period: 'Aug 2025', value: 0.9 },
        { period: 'Sep 2025', value: 1.0 },
        { period: 'Oct 2025', value: 1.1 },
        { period: 'Nov 2025', value: 1.2 }
      ],
      quarterly: [
        { period: 'Q1 2025', value: 0.5 },
        { period: 'Q2 2025', value: 0.7 },
        { period: 'Q3 2025', value: 1.0 },
        { period: 'Q4 2025', value: 1.2 }
      ],
      yearly: [
        { period: '2022', value: 6.1 },
        { period: '2023', value: 1.2 },
        { period: '2024', value: 0.4 },
        { period: '2025', value: 1.2 }
      ]
    }
  },
  {
    id: 'policy-interest-rate',
    title: {
      en: 'Policy Interest Rate',
      ja: '政策金利'
    },
    summary: {
      en: 'Bank of Thailand maintained the policy rate at 2.25% in December 2025 meeting.',
      ja: 'タイ中央銀行は2025年12月の会合で政策金利を2.25%に維持した。'
    },
    category: 'economy',
    subcategory: 'interest-rate',
    value: 2.25,
    unit: '%',
    trend: 'stable',
    percentageChange: 0,
    lastUpdated: '2025-12-11',
    year: 2025,
    source: {
      name: 'Bank of Thailand (BOT)',
      url: 'https://www.bot.or.th'
    },
    chartData: {
      monthly: [
        { period: 'Jul 2025', value: 2.50 },
        { period: 'Aug 2025', value: 2.50 },
        { period: 'Sep 2025', value: 2.25 },
        { period: 'Oct 2025', value: 2.25 },
        { period: 'Nov 2025', value: 2.25 },
        { period: 'Dec 2025', value: 2.25 }
      ],
      quarterly: [
        { period: 'Q1 2025', value: 2.50 },
        { period: 'Q2 2025', value: 2.50 },
        { period: 'Q3 2025', value: 2.25 },
        { period: 'Q4 2025', value: 2.25 }
      ],
      yearly: [
        { period: '2022', value: 1.25 },
        { period: '2023', value: 2.50 },
        { period: '2024', value: 2.50 },
        { period: '2025', value: 2.25 }
      ]
    }
  },
  {
    id: 'boi-investment-2025',
    title: {
      en: 'BOI Investment Promotion Value',
      ja: 'BOI投資奨励額'
    },
    summary: {
      en: 'BOI approved investment applications worth ฿892 billion in 2025, led by EV and electronics sectors.',
      ja: 'BOIは2025年に8,920億バーツの投資申請を承認し、EVと電子機器セクターが牽引した。'
    },
    category: 'economy',
    subcategory: 'investment',
    value: 892,
    unit: 'Billion THB',
    trend: 'up',
    percentageChange: 12.5,
    lastUpdated: '2025-11-30',
    year: 2025,
    source: {
      name: 'Board of Investment (BOI)',
      url: 'https://www.boi.go.th'
    },
    chartData: {
      monthly: [
        { period: 'Jul 2025', value: 68 },
        { period: 'Aug 2025', value: 75 },
        { period: 'Sep 2025', value: 82 },
        { period: 'Oct 2025', value: 89 },
        { period: 'Nov 2025', value: 95 }
      ],
      quarterly: [
        { period: 'Q1 2025', value: 185 },
        { period: 'Q2 2025', value: 225 },
        { period: 'Q3 2025', value: 265 },
        { period: 'Q4 2025', value: 217 }
      ],
      yearly: [
        { period: '2022', value: 664 },
        { period: '2023', value: 758 },
        { period: '2024', value: 793 },
        { period: '2025', value: 892 }
      ]
    }
  }
];

// Trade & Industry Data (Customs, FTI, Ministry of Commerce)
export const tradeData: DataPoint[] = [
  // Export Growth - 2022
  {
    id: 'export-growth-2022',
    title: { en: 'Export Growth (YoY)', ja: '輸出成長率（前年同期比）' },
    summary: { en: 'Thailand exports grew by 5.5% YoY in 2022.', ja: 'タイの輸出は2022年に前年比5.5%成長した。' },
    category: 'trade', subcategory: 'exports', value: 5.5, unit: '%', trend: 'up', percentageChange: 5.5,
    lastUpdated: '2022-12-31', year: 2022,
    source: { name: 'Ministry of Commerce', url: 'https://www.moc.go.th' },
    chartData: {
      monthly: [{ period: 'Jul 2022', value: 4.5 }, { period: 'Aug 2022', value: 7.5 }, { period: 'Sep 2022', value: 7.8 }, { period: 'Oct 2022', value: -4.4 }, { period: 'Nov 2022', value: -6.0 }],
      quarterly: [{ period: 'Q1 2022', value: 14.0 }, { period: 'Q2 2022', value: 11.5 }, { period: 'Q3 2022', value: 6.6 }, { period: 'Q4 2022', value: -5.8 }],
      yearly: [{ period: '2020', value: -6.0 }, { period: '2021', value: 17.1 }, { period: '2022', value: 5.5 }]
    }
  },
  // Export Growth - 2023
  {
    id: 'export-growth-2023',
    title: { en: 'Export Growth (YoY)', ja: '輸出成長率（前年同期比）' },
    summary: { en: 'Thailand exports contracted by 1.7% YoY in 2023 due to global slowdown.', ja: 'タイの輸出は2023年に世界的な景気減速により前年比1.7%減少した。' },
    category: 'trade', subcategory: 'exports', value: -1.7, unit: '%', trend: 'down', percentageChange: -7.2,
    lastUpdated: '2023-12-31', year: 2023,
    source: { name: 'Ministry of Commerce', url: 'https://www.moc.go.th' },
    chartData: {
      monthly: [{ period: 'Jul 2023', value: -6.2 }, { period: 'Aug 2023', value: -2.5 }, { period: 'Sep 2023', value: 2.1 }, { period: 'Oct 2023', value: 8.3 }, { period: 'Nov 2023', value: 4.9 }],
      quarterly: [{ period: 'Q1 2023', value: -4.5 }, { period: 'Q2 2023', value: -5.5 }, { period: 'Q3 2023', value: -2.2 }, { period: 'Q4 2023', value: 3.6 }],
      yearly: [{ period: '2021', value: 17.1 }, { period: '2022', value: 5.5 }, { period: '2023', value: -1.7 }]
    }
  },
  // Export Growth - 2024
  {
    id: 'export-growth-2024',
    title: { en: 'Export Growth (YoY)', ja: '輸出成長率（前年同期比）' },
    summary: { en: 'Thailand exports recovered to 4.7% growth in 2024.', ja: 'タイの輸出は2024年に4.7%の成長に回復した。' },
    category: 'trade', subcategory: 'exports', value: 4.7, unit: '%', trend: 'up', percentageChange: 6.4,
    lastUpdated: '2024-12-31', year: 2024,
    source: { name: 'Ministry of Commerce', url: 'https://www.moc.go.th' },
    chartData: {
      monthly: [{ period: 'Jul 2024', value: 15.2 }, { period: 'Aug 2024', value: 7.0 }, { period: 'Sep 2024', value: 1.1 }, { period: 'Oct 2024', value: 14.6 }, { period: 'Nov 2024', value: 8.2 }],
      quarterly: [{ period: 'Q1 2024', value: 1.8 }, { period: 'Q2 2024', value: 2.5 }, { period: 'Q3 2024', value: 7.8 }, { period: 'Q4 2024', value: 6.5 }],
      yearly: [{ period: '2022', value: 5.5 }, { period: '2023', value: -1.7 }, { period: '2024', value: 4.7 }]
    }
  },
  // Export Growth - 2025
  {
    id: 'export-growth-2025',
    title: { en: 'Export Growth (YoY)', ja: '輸出成長率（前年同期比）' },
    summary: { en: 'Thailand exports grew by 5.8% YoY in November 2025, driven by electronics and agricultural products.', ja: 'タイの輸出は2025年11月に前年同期比5.8%成長し、電子機器と農産物が牽引した。' },
    category: 'trade', subcategory: 'exports', value: 5.8, unit: '%', trend: 'up', percentageChange: 1.2,
    lastUpdated: '2025-12-08', year: 2025,
    source: { name: 'Ministry of Commerce', url: 'https://www.moc.go.th' },
    chartData: {
      monthly: [{ period: 'Jul 2025', value: 4.2 }, { period: 'Aug 2025', value: 4.8 }, { period: 'Sep 2025', value: 5.1 }, { period: 'Oct 2025', value: 5.4 }, { period: 'Nov 2025', value: 5.8 }],
      quarterly: [{ period: 'Q1 2025', value: 3.2 }, { period: 'Q2 2025', value: 4.1 }, { period: 'Q3 2025', value: 5.1 }, { period: 'Q4 2025', value: 5.6 }],
      yearly: [{ period: '2022', value: 5.5 }, { period: '2023', value: -1.7 }, { period: '2024', value: 4.7 }, { period: '2025', value: 5.6 }]
    }
  },
  // Industrial Production Index - 2022
  {
    id: 'industrial-production-index-2022',
    title: { en: 'Industrial Production Index (IPI)', ja: '鉱工業生産指数（IPI）' },
    summary: { en: 'Industrial production index reached 96.2 in 2022.', ja: '鉱工業生産指数は2022年に96.2に達した。' },
    category: 'trade', subcategory: 'manufacturing', value: 96.2, unit: 'Index', trend: 'up', percentageChange: 3.5,
    lastUpdated: '2022-12-31', year: 2022,
    source: { name: 'Office of Industrial Economics (OIE)', url: 'https://www.oie.go.th' },
    chartData: {
      monthly: [{ period: 'Jul 2022', value: 97.5 }, { period: 'Aug 2022', value: 97.0 }, { period: 'Sep 2022', value: 96.5 }, { period: 'Oct 2022', value: 96.0 }, { period: 'Nov 2022', value: 95.8 }],
      quarterly: [{ period: 'Q1 2022', value: 95.5 }, { period: 'Q2 2022', value: 97.0 }, { period: 'Q3 2022', value: 97.0 }, { period: 'Q4 2022', value: 95.5 }],
      yearly: [{ period: '2020', value: 91.0 }, { period: '2021', value: 92.8 }, { period: '2022', value: 96.2 }]
    }
  },
  // Industrial Production Index - 2023
  {
    id: 'industrial-production-index-2023',
    title: { en: 'Industrial Production Index (IPI)', ja: '鉱工業生産指数（IPI）' },
    summary: { en: 'Industrial production index declined to 91.5 in 2023 due to weak demand.', ja: '鉱工業生産指数は2023年に需要低迷により91.5に低下した。' },
    category: 'trade', subcategory: 'manufacturing', value: 91.5, unit: 'Index', trend: 'down', percentageChange: -4.9,
    lastUpdated: '2023-12-31', year: 2023,
    source: { name: 'Office of Industrial Economics (OIE)', url: 'https://www.oie.go.th' },
    chartData: {
      monthly: [{ period: 'Jul 2023', value: 90.5 }, { period: 'Aug 2023', value: 91.0 }, { period: 'Sep 2023', value: 91.8 }, { period: 'Oct 2023', value: 92.0 }, { period: 'Nov 2023', value: 91.5 }],
      quarterly: [{ period: 'Q1 2023', value: 93.5 }, { period: 'Q2 2023', value: 91.8 }, { period: 'Q3 2023', value: 91.1 }, { period: 'Q4 2023', value: 89.5 }],
      yearly: [{ period: '2021', value: 92.8 }, { period: '2022', value: 96.2 }, { period: '2023', value: 91.5 }]
    }
  },
  // Industrial Production Index - 2024
  {
    id: 'industrial-production-index-2024',
    title: { en: 'Industrial Production Index (IPI)', ja: '鉱工業生産指数（IPI）' },
    summary: { en: 'Industrial production index recovered to 94.3 in 2024.', ja: '鉱工業生産指数は2024年に94.3に回復した。' },
    category: 'trade', subcategory: 'manufacturing', value: 94.3, unit: 'Index', trend: 'up', percentageChange: 3.1,
    lastUpdated: '2024-12-31', year: 2024,
    source: { name: 'Office of Industrial Economics (OIE)', url: 'https://www.oie.go.th' },
    chartData: {
      monthly: [{ period: 'Jul 2024', value: 93.5 }, { period: 'Aug 2024', value: 94.0 }, { period: 'Sep 2024', value: 94.2 }, { period: 'Oct 2024', value: 94.5 }, { period: 'Nov 2024', value: 94.8 }],
      quarterly: [{ period: 'Q1 2024', value: 91.5 }, { period: 'Q2 2024', value: 93.0 }, { period: 'Q3 2024', value: 93.9 }, { period: 'Q4 2024', value: 98.5 }],
      yearly: [{ period: '2022', value: 96.2 }, { period: '2023', value: 91.5 }, { period: '2024', value: 94.3 }]
    }
  },
  // Industrial Production Index - 2025
  {
    id: 'industrial-production-index-2025',
    title: { en: 'Industrial Production Index (IPI)', ja: '鉱工業生産指数（IPI）' },
    summary: { en: 'Industrial production index increased to 98.5 in October 2025, showing gradual recovery.', ja: '鉱工業生産指数は2025年10月に98.5に上昇し、緩やかな回復を示している。' },
    category: 'trade', subcategory: 'manufacturing', value: 98.5, unit: 'Index', trend: 'up', percentageChange: 1.5,
    lastUpdated: '2025-11-28', year: 2025,
    source: { name: 'Office of Industrial Economics (OIE)', url: 'https://www.oie.go.th' },
    chartData: {
      monthly: [{ period: 'Jun 2025', value: 95.2 }, { period: 'Jul 2025', value: 96.1 }, { period: 'Aug 2025', value: 97.0 }, { period: 'Sep 2025', value: 97.8 }, { period: 'Oct 2025', value: 98.5 }],
      quarterly: [{ period: 'Q1 2025', value: 93.5 }, { period: 'Q2 2025', value: 95.8 }, { period: 'Q3 2025', value: 97.0 }, { period: 'Q4 2025', value: 98.5 }],
      yearly: [{ period: '2022', value: 96.2 }, { period: '2023', value: 91.5 }, { period: '2024', value: 94.3 }, { period: '2025', value: 98.5 }]
    }
  }
];

// Regulation & Tax Data
export const regulationData: DataPoint[] = [
  {
    id: 'corporate-tax-collection',
    title: {
      en: 'Corporate Tax Collection',
      ja: '法人税徴収額'
    },
    summary: {
      en: 'Corporate tax revenue increased 9.2% to ฿925 billion in 2025, reflecting improved business performance.',
      ja: '法人税収入は9.2%増の9,250億バーツとなり、事業業績の改善を反映した。'
    },
    category: 'regulation',
    subcategory: 'taxation',
    value: 925,
    unit: 'Billion THB',
    trend: 'up',
    percentageChange: 9.2,
    lastUpdated: '2025-11-25',
    year: 2025,
    source: {
      name: 'Revenue Department',
      url: 'https://www.rd.go.th'
    },
    chartData: {
      monthly: [
        { period: 'Jul 2025', value: 72 },
        { period: 'Aug 2025', value: 78 },
        { period: 'Sep 2025', value: 85 },
        { period: 'Oct 2025', value: 82 },
        { period: 'Nov 2025', value: 88 }
      ],
      quarterly: [
        { period: 'Q1 2025', value: 215 },
        { period: 'Q2 2025', value: 235 },
        { period: 'Q3 2025', value: 245 },
        { period: 'Q4 2025', value: 230 }
      ],
      yearly: [
        { period: '2022', value: 765 },
        { period: '2023', value: 812 },
        { period: '2024', value: 847 },
        { period: '2025', value: 925 }
      ]
    }
  }
];

// Workforce & Society Data
export const workforceData: DataPoint[] = [
  {
    id: 'unemployment-rate-2025',
    title: {
      en: 'Unemployment Rate',
      ja: '失業率'
    },
    summary: {
      en: 'Thailand unemployment rate dropped to 0.98% in October 2025, the lowest level in three years.',
      ja: 'タイの失業率は2025年10月に0.98%まで低下し、3年間で最低水準となった。'
    },
    category: 'workforce',
    subcategory: 'employment',
    value: 0.98,
    unit: '%',
    trend: 'down',
    percentageChange: -0.12,
    lastUpdated: '2025-11-20',
    year: 2025,
    source: {
      name: 'National Statistical Office (NSO)',
      url: 'https://www.nso.go.th'
    },
    chartData: {
      monthly: [
        { period: 'Jun 2025', value: 1.12 },
        { period: 'Jul 2025', value: 1.08 },
        { period: 'Aug 2025', value: 1.05 },
        { period: 'Sep 2025', value: 1.02 },
        { period: 'Oct 2025', value: 0.98 }
      ],
      quarterly: [
        { period: 'Q1 2025', value: 1.18 },
        { period: 'Q2 2025', value: 1.10 },
        { period: 'Q3 2025', value: 1.02 },
        { period: 'Q4 2025', value: 0.98 }
      ],
      yearly: [
        { period: '2022', value: 1.33 },
        { period: '2023', value: 1.08 },
        { period: '2024', value: 1.05 },
        { period: '2025', value: 0.98 }
      ]
    }
  }
];

// Infrastructure & Innovation Data
export const infrastructureData: DataPoint[] = [
  {
    id: 'digital-economy-value',
    title: {
      en: 'Digital Economy Value',
      ja: 'デジタル経済価値'
    },
    summary: {
      en: 'Thailand digital economy reached ฿5.8 trillion, accounting for 28.2% of total GDP in 2025.',
      ja: 'タイのデジタル経済は5.8兆バーツに達し、2025年のGDP総額の28.2%を占めた。'
    },
    category: 'infrastructure',
    subcategory: 'digital',
    value: 28.2,
    unit: '% of GDP',
    trend: 'up',
    percentageChange: 2.8,
    lastUpdated: '2025-11-22',
    year: 2025,
    source: {
      name: 'Digital Economy Promotion Agency (DEPA)',
      url: 'https://www.depa.or.th'
    },
    chartData: {
      monthly: [
        { period: 'Jul 2025', value: 26.5 },
        { period: 'Aug 2025', value: 27.0 },
        { period: 'Sep 2025', value: 27.5 },
        { period: 'Oct 2025', value: 27.8 },
        { period: 'Nov 2025', value: 28.2 }
      ],
      quarterly: [
        { period: 'Q1 2025', value: 25.8 },
        { period: 'Q2 2025', value: 26.5 },
        { period: 'Q3 2025', value: 27.5 },
        { period: 'Q4 2025', value: 28.2 }
      ],
      yearly: [
        { period: '2022', value: 21.5 },
        { period: '2023', value: 23.8 },
        { period: '2024', value: 25.4 },
        { period: '2025', value: 28.2 }
      ]
    }
  }
];

export const allBusinessData = [
  ...economyData,
  ...tradeData, 
  ...regulationData,
  ...workforceData,
  ...infrastructureData
];

export const categories = {
  economy: 'Economy & Investment',
  trade: 'Trade & Industry', 
  regulation: 'Regulation & Tax',
  workforce: 'Workforce & Society',
  infrastructure: 'Infrastructure & Innovation'
};

export const getDataByCategory = (category: string) => {
  return allBusinessData.filter(item => item.category === category);
};

export const getAvailableYears = () => {
  return [2025, 2024, 2023, 2022];
};

export type TimePeriod = 'monthly' | 'quarterly' | 'yearly';
