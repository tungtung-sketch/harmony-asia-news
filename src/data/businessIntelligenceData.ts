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
  source: {
    name: string;
    url: string;
  };
  chartData?: Array<{
    period: string;
    value: number;
    label?: string;
  }>;
}

// Economy & Investment Data (BOT, NESDC, BOI)
export const economyData: DataPoint[] = [
  {
    id: 'gdp-growth-2024',
    title: {
      en: 'Thailand GDP Growth Rate',
      ja: 'タイのGDP成長率'
    },
    summary: {
      en: 'Thailand\'s GDP expanded by 2.8% year-on-year in Q4 2024, driven by domestic consumption and tourism recovery.',
      ja: 'タイのGDPは2024年第4四半期に前年同期比2.8%成長し、国内消費と観光回復が牽引した。'
    },
    category: 'economy',
    subcategory: 'gdp',
    value: 2.8,
    unit: '%',
    trend: 'up',
    percentageChange: 0.3,
    lastUpdated: '2024-12-15',
    source: {
      name: 'NESDC - National Economic and Social Development Council',
      url: 'https://www.nesdc.go.th'
    },
    chartData: [
      { period: '2024 Q1', value: 1.9 },
      { period: '2024 Q2', value: 2.3 },
      { period: '2024 Q3', value: 2.5 },
      { period: '2024 Q4', value: 2.8 }
    ]
  },
  {
    id: 'exchange-rate-thb-jpy',
    title: {
      en: 'THB/JPY Exchange Rate',
      ja: 'タイバーツ/日本円為替レート'
    },
    summary: {
      en: 'The Thai Baht strengthened against the Japanese Yen, currently trading at 4.32 JPY per THB.',
      ja: 'タイバーツは日本円に対して強くなり、現在1THB=4.32円で取引されている。'
    },
    category: 'economy',
    subcategory: 'exchange-rate',
    value: 4.32,
    unit: 'JPY/THB',
    trend: 'up',
    percentageChange: 2.1,
    lastUpdated: '2024-12-30',
    source: {
      name: 'Bank of Thailand (BOT)',
      url: 'https://www.bot.or.th'
    },
    chartData: [
      { period: 'Dec 25', value: 4.23 },
      { period: 'Dec 26', value: 4.28 },
      { period: 'Dec 27', value: 4.31 },
      { period: 'Dec 28', value: 4.29 },
      { period: 'Dec 29', value: 4.32 }
    ]
  }
];

// Trade & Industry Data (Customs, FTI, Ministry of Commerce)
export const tradeData: DataPoint[] = [
  {
    id: 'export-value-2024',
    title: {
      en: 'Thailand Export Value',
      ja: 'タイの輸出額'
    },
    summary: {
      en: 'Thailand exports reached $285.4 billion in 2024, with electronics and automotive leading growth sectors.',
      ja: 'タイの輸出額は2024年に2,854億ドルに達し、電子機器と自動車が成長セクターを牽引した。'
    },
    category: 'trade',
    subcategory: 'exports',
    value: 285.4,
    unit: 'Billion USD',
    trend: 'up',
    percentageChange: 4.7,
    lastUpdated: '2024-12-28',
    source: {
      name: 'Ministry of Commerce',
      url: 'https://www.moc.go.th'
    },
    chartData: [
      { period: 'Jan-Mar', value: 68.2 },
      { period: 'Apr-Jun', value: 71.8 },
      { period: 'Jul-Sep', value: 69.5 },
      { period: 'Oct-Dec', value: 75.9 }
    ]
  },
  {
    id: 'manufacturing-pmi',
    title: {
      en: 'Manufacturing PMI Index',
      ja: '製造業PMI指数'  
    },
    summary: {
      en: 'Manufacturing PMI improved to 51.2 in December, indicating expansion in industrial production.',
      ja: '製造業PMIは12月に51.2に改善し、工業生産の拡大を示している。'
    },
    category: 'trade',
    subcategory: 'manufacturing',
    value: 51.2,
    unit: 'Index',
    trend: 'up',
    percentageChange: 1.8,
    lastUpdated: '2024-12-30',
    source: {
      name: 'Federation of Thai Industries (FTI)',
      url: 'https://www.fti.or.th'
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
      en: 'Corporate tax revenue increased 8.3% to ฿847 billion, reflecting improved business performance.',
      ja: '法人税収入は8.3%増の8,470億バーツとなり、事業業績の改善を反映した。'
    },
    category: 'regulation',
    subcategory: 'taxation',
    value: 847,
    unit: 'Billion THB',
    trend: 'up',
    percentageChange: 8.3,
    lastUpdated: '2024-12-25',
    source: {
      name: 'Revenue Department',
      url: 'https://www.rd.go.th'
    }
  }
];

// Workforce & Society Data
export const workforceData: DataPoint[] = [
  {
    id: 'unemployment-rate',
    title: {
      en: 'Unemployment Rate',
      ja: '失業率'
    },
    summary: {
      en: 'Thailand unemployment rate dropped to 1.05% in November, the lowest level in two years.',
      ja: 'タイの失業率は11月に1.05%まで低下し、2年間で最低水準となった。'
    },
    category: 'workforce',
    subcategory: 'employment',
    value: 1.05,
    unit: '%',
    trend: 'down',
    percentageChange: -0.15,
    lastUpdated: '2024-12-20',
    source: {
      name: 'National Statistical Office (NSO)',
      url: 'https://www.nso.go.th'
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
      en: 'Thailand digital economy reached ฿4.9 trillion, accounting for 25.4% of total GDP in 2024.',
      ja: 'タイのデジタル経済は4.9兆バーツに達し、2024年のGDP総額の25.4%を占めた。'
    },
    category: 'infrastructure',
    subcategory: 'digital',
    value: 25.4,
    unit: '% of GDP',
    trend: 'up',
    percentageChange: 3.2,
    lastUpdated: '2024-12-22',
    source: {
      name: 'Digital Economy Promotion Agency (DEPA)',
      url: 'https://www.depa.or.th'
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
  const years = allBusinessData.map(item => 
    new Date(item.lastUpdated).getFullYear()
  );
  return [...new Set(years)].sort((a, b) => b - a);
};