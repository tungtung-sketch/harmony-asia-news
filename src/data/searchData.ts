import { businessTips } from './businessTips';
import { fetchWalensNews, WalensNews } from '@/sheetNews';
import { supabase } from '@/integrations/supabase/client';

export interface SearchResult {
  id: string;
  title: string;
  titleJa: string;
  description: string;
  descriptionJa: string;
  type: 'article' | 'tip' | 'insight' | 'bi' | 'premium-report';
  category: string;
  categoryJa: string;
  url: string;
  readTime?: string;
  image?: string;
  isPremium?: boolean;
  lastUpdated?: string;
}

// Business Intelligence data
const businessIntelligenceResults: SearchResult[] = [
  {
    id: 'bi-economy-investment',
    title: 'Economy & Investment',
    titleJa: '経済・投資',
    description: 'Analysis of economic trends, investment opportunities, and financial insights in Thailand and ASEAN.',
    descriptionJa: 'タイおよびASEANにおける経済動向、投資機会、金融分析。',
    type: 'bi',
    category: 'Business Intelligence',
    categoryJa: 'ビジネスインテリジェンス',
    url: '/business-intelligence/economy-investment',
  },
  {
    id: 'bi-trade-industry',
    title: 'Trade & Industry',
    titleJa: '貿易・産業',
    description: 'Trade policies, industrial development, and market dynamics across ASEAN nations.',
    descriptionJa: 'ASEAN諸国における貿易政策、産業発展、市場動向。',
    type: 'bi',
    category: 'Business Intelligence',
    categoryJa: 'ビジネスインテリジェンス',
    url: '/business-intelligence/trade-industry',
  },
  {
    id: 'bi-regulation-tax',
    title: 'Regulation & Tax',
    titleJa: '規制・税制',
    description: 'Regulatory updates, tax policies, and compliance requirements for businesses in Thailand.',
    descriptionJa: 'タイにおけるビジネス向けの規制更新、税制政策、コンプライアンス要件。',
    type: 'bi',
    category: 'Business Intelligence',
    categoryJa: 'ビジネスインテリジェンス',
    url: '/business-intelligence/regulation-tax',
  },
  {
    id: 'bi-infrastructure-innovation',
    title: 'Infrastructure & Innovation',
    titleJa: 'インフラ・イノベーション',
    description: 'Infrastructure projects, technological innovation, and digital transformation in the region.',
    descriptionJa: '地域におけるインフラプロジェクト、技術革新、デジタルトランスフォーメーション。',
    type: 'bi',
    category: 'Business Intelligence',
    categoryJa: 'ビジネスインテリジェンス',
    url: '/business-intelligence/infrastructure-innovation',
  },
  {
    id: 'bi-workforce-society',
    title: 'Workforce & Society',
    titleJa: '労働力・社会',
    description: 'Labor market trends, workforce development, and social dynamics in Thailand and ASEAN.',
    descriptionJa: 'タイおよびASEANにおける労働市場動向、人材開発、社会動態。',
    type: 'bi',
    category: 'Business Intelligence',
    categoryJa: 'ビジネスインテリジェンス',
    url: '/business-intelligence/workforce-society',
  },
];

// Industry Insights data
const insightsResults: SearchResult[] = [
  {
    id: 'insight-manufacturing',
    title: 'Manufacturing',
    titleJa: '製造業',
    description: 'Manufacturing sector analysis, automation trends, and industry 4.0 adoption in Thailand.',
    descriptionJa: 'タイにおける製造業分析、自動化トレンド、インダストリー4.0の導入。',
    type: 'insight',
    category: 'Industry Insights',
    categoryJa: '業界インサイト',
    url: '/insights/manufacturing',
  },
  {
    id: 'insight-services',
    title: 'Services',
    titleJa: 'サービス業',
    description: 'Service industry trends, digital transformation, and growth opportunities.',
    descriptionJa: 'サービス業のトレンド、デジタルトランスフォーメーション、成長機会。',
    type: 'insight',
    category: 'Industry Insights',
    categoryJa: '業界インサイト',
    url: '/insights/services',
  },
  {
    id: 'insight-agriculture',
    title: 'Agriculture',
    titleJa: '農業',
    description: 'Agricultural sector developments, agritech innovations, and sustainable farming practices.',
    descriptionJa: '農業セクターの発展、アグリテックイノベーション、持続可能な農業実践。',
    type: 'insight',
    category: 'Industry Insights',
    categoryJa: '業界インサイト',
    url: '/insights/agriculture',
  },
  {
    id: 'insight-real-estate',
    title: 'Real Estate',
    titleJa: '不動産',
    description: 'Real estate market analysis, property trends, and investment opportunities in Thailand.',
    descriptionJa: 'タイにおける不動産市場分析、物件トレンド、投資機会。',
    type: 'insight',
    category: 'Industry Insights',
    categoryJa: '業界インサイト',
    url: '/insights/real-estate',
  },
  {
    id: 'insight-wellness-healthcare',
    title: 'Wellness & Healthcare',
    titleJa: 'ウェルネス・ヘルスケア',
    description: 'Healthcare industry insights, medical tourism, and wellness sector growth.',
    descriptionJa: 'ヘルスケア業界インサイト、医療観光、ウェルネスセクターの成長。',
    type: 'insight',
    category: 'Industry Insights',
    categoryJa: '業界インサイト',
    url: '/insights/wellness-healthcare',
  },
];

// Premium Insight Reports
const premiumInsightResults: SearchResult[] = [
  {
    id: 'premium-ev-battery',
    title: 'Thailand EV & Battery Industry Intelligence Report',
    titleJa: 'タイEV・バッテリー産業 インテリジェンスレポート',
    description: 'Comprehensive analysis of EV battery industry for Japanese enterprises. Includes market structure, policy incentives, risk-opportunity assessment, and strategic implications.',
    descriptionJa: '日系企業向けのEVバッテリー産業の包括的分析。市場構造、政策インセンティブ、リスク機会評価、戦略的示唆を含む。',
    type: 'premium-report',
    category: 'Premium Report - Manufacturing',
    categoryJa: 'プレミアムレポート - 製造業',
    url: '/insights/manufacturing/ev-battery',
    isPremium: true,
  },
  {
    id: 'premium-thailand-market-strategy',
    title: 'Thailand Market Strategy: New Strategies for Japanese Enterprises',
    titleJa: 'タイ市場開拓：日本企業の新戦略',
    description: 'Strategic report redefining Thailand as a third-country hub and social issue-solving market. Covers elderly care, smart home, next-gen food, electronics, education.',
    descriptionJa: 'タイを第三国市場ハブ・社会課題解決型市場として再定義する戦略レポート。高齢者ケア、スマートホーム、次世代食品、エレクトロニクス、教育の5産業を詳説。',
    type: 'premium-report',
    category: 'Premium Report - Services',
    categoryJa: 'プレミアムレポート - サービス',
    url: '/insights/services/thailand-market-strategy',
    isPremium: true,
  },
  {
    id: 'premium-wellness-healthcare',
    title: 'Thailand Wellness & Healthcare Industry Report',
    titleJa: 'タイ ウェルネス・ヘルスケア産業レポート',
    description: 'Healthcare industry insights covering medical tourism, wellness sector growth, and opportunities for Japanese enterprises in Thailand.',
    descriptionJa: 'タイにおけるヘルスケア産業インサイト、医療観光、ウェルネスセクターの成長、日系企業の機会。',
    type: 'premium-report',
    category: 'Premium Report - Healthcare',
    categoryJa: 'プレミアムレポート - ヘルスケア',
    url: '/insights/wellness-healthcare/wellness-healthcare',
    isPremium: true,
  },
  {
    id: 'premium-agriculture',
    title: 'Thailand Agriculture Industry Trends Report',
    titleJa: 'タイ農業産業トレンドレポート',
    description: 'Agricultural sector developments, agritech innovations, and sustainable farming practices in Thailand.',
    descriptionJa: 'タイにおける農業セクターの発展、アグリテックイノベーション、持続可能な農業実践。',
    type: 'premium-report',
    category: 'Premium Report - Agriculture',
    categoryJa: 'プレミアムレポート - 農業',
    url: '/insights/agriculture/agriculture-industry',
    isPremium: true,
  },
  {
    id: 'premium-real-estate',
    title: 'Thailand Real Estate Market 2026 Report',
    titleJa: 'タイ不動産市場2026レポート',
    description: 'Real estate market analysis, property trends, and investment opportunities in Thailand for 2026.',
    descriptionJa: 'タイにおける2026年の不動産市場分析、物件トレンド、投資機会。',
    type: 'premium-report',
    category: 'Premium Report - Real Estate',
    categoryJa: 'プレミアムレポート - 不動産',
    url: '/insights/real-estate/real-estate-market',
    isPremium: true,
  },
  {
    id: 'premium-electronics-semiconductor',
    title: 'Thailand Electronics & Semiconductor 2026 Report',
    titleJa: 'タイ エレクトロニクス・半導体2026レポート',
    description: 'Electronics and semiconductor industry analysis covering supply chains, investment, and growth in Thailand.',
    descriptionJa: 'タイにおけるエレクトロニクス・半導体産業のサプライチェーン、投資、成長の分析。',
    type: 'premium-report',
    category: 'Premium Report - Manufacturing',
    categoryJa: 'プレミアムレポート - 製造業',
    url: '/insights/manufacturing/electronics-semiconductor',
    isPremium: true,
  },
  {
    id: 'premium-big-data-ai',
    title: 'Thailand Big Data and AI Trends Report',
    titleJa: 'タイ ビッグデータ・AIトレンドレポート',
    description: 'Big data and AI adoption trends, digital transformation, and technology opportunities in Thailand.',
    descriptionJa: 'タイにおけるビッグデータ・AI導入トレンド、デジタルトランスフォーメーション、テクノロジー機会。',
    type: 'premium-report',
    category: 'Premium Report - Services',
    categoryJa: 'プレミアムレポート - サービス',
    url: '/insights/services/big-data-ai',
    isPremium: true,
  },
  {
    id: 'premium-decarbonization',
    title: 'Thailand Decarbonization Initiatives Report',
    titleJa: 'タイ脱炭素化イニシアチブレポート',
    description: 'Decarbonization strategies, carbon neutrality policies, and green investment in Thailand.',
    descriptionJa: 'タイにおける脱炭素化戦略、カーボンニュートラル政策、グリーン投資。',
    type: 'premium-report',
    category: 'Premium Report - Manufacturing',
    categoryJa: 'プレミアムレポート - 製造業',
    url: '/insights/manufacturing/decarbonization',
    isPremium: true,
  },
  {
    id: 'premium-chemical',
    title: 'Thailand Chemical Industry Insights Report',
    titleJa: 'タイ化学産業インサイトレポート',
    description: 'Chemical industry analysis covering petrochemicals, specialty chemicals, and sustainability trends in Thailand.',
    descriptionJa: 'タイにおける石油化学、特殊化学品、サステナビリティトレンドの化学産業分析。',
    type: 'premium-report',
    category: 'Premium Report - Manufacturing',
    categoryJa: 'プレミアムレポート - 製造業',
    url: '/insights/manufacturing/chemical-industry',
    isPremium: true,
  },
  {
    id: 'premium-food-industry',
    title: 'Thailand Next-Generation Food Industry Report',
    titleJa: 'タイ次世代食品産業レポート',
    description: 'Food industry trends including alternative proteins, food tech innovation, and export opportunities.',
    descriptionJa: '代替タンパク質、フードテックイノベーション、輸出機会を含む食品産業トレンド。',
    type: 'premium-report',
    category: 'Premium Report - Agriculture',
    categoryJa: 'プレミアムレポート - 農業',
    url: '/insights/agriculture/food-industry',
    isPremium: true,
  },
  {
    id: 'premium-energy',
    title: 'Thailand Energy Industry Opportunities Report',
    titleJa: 'タイ エネルギー産業機会レポート',
    description: 'Energy industry analysis covering renewables, LNG, power generation, and energy transition in Thailand.',
    descriptionJa: 'タイにおける再生可能エネルギー、LNG、発電、エネルギー転換の産業分析。',
    type: 'premium-report',
    category: 'Premium Report - Manufacturing',
    categoryJa: 'プレミアムレポート - 製造業',
    url: '/insights/manufacturing/energy-industry',
    isPremium: true,
  },
  {
    id: 'premium-automotive',
    title: 'Thailand Automotive Industry: Strategic Realignment Report',
    titleJa: 'タイ自動車産業：戦略的再編レポート',
    description: 'Automotive industry strategic realignment amidst mega-trends including EV transition and supply chain shifts.',
    descriptionJa: 'EV転換やサプライチェーンシフトなどのメガトレンドの中での自動車産業の戦略的再編。',
    type: 'premium-report',
    category: 'Premium Report - Manufacturing',
    categoryJa: 'プレミアムレポート - 製造業',
    url: '/insights/manufacturing/automotive-industry',
    isPremium: true,
  },
  {
    id: 'premium-hormuz-crisis',
    title: '2026 Hormuz Strait Crisis: Impact on Thai Industry',
    titleJa: '2026年ホルムズ海峡危機：タイ産業への影響',
    description: 'Analysis of the Hormuz Strait crisis triggered by US-Iran military conflict. Covers oil price surge, energy security, supply chain disruption, and strategic response for Japanese companies in Thailand. Iran, Middle East, geopolitical risk.',
    descriptionJa: '米国・イラン軍事衝突によるホルムズ海峡危機の分析。原油価格高騰、エネルギー安全保障、サプライチェーン混乱、タイにおける日系企業の戦略的対応。イラン、中東、地政学リスク。',
    type: 'premium-report',
    category: 'Premium Report - Manufacturing',
    categoryJa: 'プレミアムレポート - 製造業',
    url: '/insights/manufacturing/hormuz-crisis-impact',
    isPremium: true,
  },
  {
    id: 'premium-oil-crisis',
    title: '2026 US-Iran Conflict Energy Crisis: Impact on Thai Manufacturing',
    titleJa: '2026年米イラン紛争エネルギー危機：タイ製造業への構造的影響',
    description: 'Structural impact of the US-Iran conflict energy crisis on Thai manufacturing and decarbonization. Oil price shock, Iran sanctions, Middle East instability, energy transition acceleration, and strategic implications.',
    descriptionJa: '米イラン紛争によるエネルギー危機がタイ製造業と脱炭素化に与える構造的影響。原油価格ショック、イラン制裁、中東不安定化、エネルギー転換加速、戦略的示唆。',
    type: 'premium-report',
    category: 'Premium Report - Manufacturing',
    categoryJa: 'プレミアムレポート - 製造業',
    url: '/insights/manufacturing/oil-crisis-thai-industry',
    isPremium: true,
  },
  {
    id: 'premium-thai-gov-policy',
    title: 'Anutin 2 Government Policy: Strategic Impact on Japanese Enterprises',
    titleJa: 'アヌティン2政策分析：日系企業への戦略的影響',
    description: 'Analysis of Thailand Anutin 2 government policy (April 2026): Super License reform, Semiconductor Roadmap 2050, nominee crackdown, Made in Thailand procurement, green energy transition.',
    descriptionJa: 'タイ・アヌティン2政権の政策分析（2026年4月）：Super License改革、半導体ロードマップ2050、ノミニー取締強化、Made in Thailand調達、グリーンエネルギー転換。',
    type: 'premium-report',
    category: 'Premium Report - Services',
    categoryJa: 'プレミアムレポート - サービス',
    url: '/insights/services/thai-gov-policy-japanese',
    isPremium: true,
  },
];

// Convert business tips to search results format
const businessTipResults: SearchResult[] = businessTips.map(tip => ({
  id: tip.id,
  title: tip.title,
  titleJa: tip.titleJa,
  description: tip.description,
  descriptionJa: tip.descriptionJa,
  type: 'tip' as const,
  category: 'Business Tips',
  categoryJa: 'ビジネスチップス',
  url: `/business-tips/${tip.id}`,
  readTime: tip.readTime
}));

// Static search data (BI + Insights + Tips + Premium Reports)
const staticSearchData: SearchResult[] = [
  ...businessIntelligenceResults,
  ...insightsResults,
  ...premiumInsightResults,
  ...businessTipResults
];

// Cache for news articles
let newsCache: SearchResult[] | null = null;
let newsCacheTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Convert news articles to search results format
function convertNewsToSearchResults(news: WalensNews[]): SearchResult[] {
  return news.map(article => ({
    id: article.slug || `news-${article.date}-${article.title_en.slice(0, 20)}`,
    title: article.title_en || article.title_raw,
    titleJa: article.title_jp || article.title_raw,
    description: (article.content_en || article.content_raw).slice(0, 200) + '...',
    descriptionJa: (article.content_jp || article.content_raw).slice(0, 200) + '...',
    type: 'article' as const,
    category: article.category || 'News',
    categoryJa: getCategoryJa(article.category),
    url: `/news/sheet/${article.slug}`,
    image: article.image,
  }));
}

function getCategoryJa(category: string): string {
  const categoryMap: Record<string, string> = {
    'Politics': '政治',
    'Economic': '経済',
    'Business': 'ビジネス',
    'Technology': 'テクノロジー',
    'Society': '社会',
    'News': 'ニュース',
  };
  return categoryMap[category] || category;
}

// Async search function that fetches news
export async function searchContentAsync(query: string): Promise<SearchResult[]> {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  
  // Fetch news if cache is expired
  const now = Date.now();
  if (!newsCache || (now - newsCacheTime) > CACHE_DURATION) {
    try {
      const news = await fetchWalensNews();
      newsCache = convertNewsToSearchResults(news);
      newsCacheTime = now;
    } catch (error) {
      console.error('Failed to fetch news for search:', error);
      newsCache = [];
    }
  }

  // Combine all searchable data
  const allSearchData = [...staticSearchData, ...(newsCache || [])];
  
  return allSearchData.filter(item => {
    // Search in English content
    const englishMatch = 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm);
    
    // Search in Japanese content
    const japaneseMatch = 
      item.titleJa.includes(searchTerm) ||
      item.descriptionJa.includes(searchTerm) ||
      item.categoryJa.includes(searchTerm);
    
    return englishMatch || japaneseMatch;
  });
}

// Sync search for backward compatibility (searches static data only)
export const searchContent = (query: string): SearchResult[] => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  
  // Use cached news if available, otherwise just static data
  const allSearchData = [...staticSearchData, ...(newsCache || [])];
  
  return allSearchData.filter(item => {
    // Search in English content
    const englishMatch = 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm);
    
    // Search in Japanese content
    const japaneseMatch = 
      item.titleJa.includes(searchTerm) ||
      item.descriptionJa.includes(searchTerm) ||
      item.categoryJa.includes(searchTerm);
    
    return englishMatch || japaneseMatch;
  });
};

// Export for compatibility
export const allSearchData = staticSearchData;
