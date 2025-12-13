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
  }
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
