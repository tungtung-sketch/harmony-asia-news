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
  keywords?: string[];
}

// Business Intelligence data
const businessIntelligenceResults: SearchResult[] = [
  {
    id: 'bi-economy-investment',
    title: 'Economy & Investment',
    titleJa: '経済・投資',
    description: 'Analysis of economic trends, investment opportunities, and financial insights in Thailand and global markets.',
    descriptionJa: 'タイおよびグローバル市場における経済動向、投資機会、金融分析。',
    type: 'bi',
    category: 'Business Intelligence',
    categoryJa: 'ビジネスインテリジェンス',
    url: '/business-intelligence/economy-investment',
    keywords: ['GDP', 'FDI', 'BOI', 'investment', 'economy', 'finance', 'capital', 'stock', 'bond', 'inflation', 'interest rate', 'monetary policy', 'fiscal', 'budget'],
  },
  {
    id: 'bi-trade-industry',
    title: 'Trade & Industry',
    titleJa: '貿易・産業',
    description: 'Trade policies, industrial development, and market dynamics across global markets.',
    descriptionJa: 'グローバル市場における貿易政策、産業発展、市場動向。',
    type: 'bi',
    category: 'Business Intelligence',
    categoryJa: 'ビジネスインテリジェンス',
    url: '/business-intelligence/trade-industry',
    keywords: ['trade', 'export', 'import', 'tariff', 'FTA', 'RCEP', 'supply chain', 'logistics', 'manufacturing', 'industrial estate'],
  },
  {
    id: 'bi-regulation-tax',
    title: 'Regulation & Tax',
    titleJa: '規制・税制',
    description: 'Regulatory updates, tax policies, and compliance requirements for businesses.',
    descriptionJa: 'ビジネス向けの規制更新、税制政策、コンプライアンス要件。',
    type: 'bi',
    category: 'Business Intelligence',
    categoryJa: 'ビジネスインテリジェンス',
    url: '/business-intelligence/regulation-tax',
    keywords: ['tax', 'regulation', 'compliance', 'CIT', 'VAT', 'BOI incentive', 'license', 'law', 'legal', 'policy'],
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
    keywords: ['infrastructure', 'EEC', 'rail', 'airport', '5G', 'smart city', 'digital', 'innovation', 'R&D', 'technology'],
  },
  {
    id: 'bi-workforce-society',
    title: 'Workforce & Society',
    titleJa: '労働力・社会',
    description: 'Labor market trends, workforce development, and social dynamics in global markets.',
    descriptionJa: 'グローバル市場における労働市場動向、人材開発、社会動態。',
    type: 'bi',
    category: 'Business Intelligence',
    categoryJa: 'ビジネスインテリジェンス',
    url: '/business-intelligence/workforce-society',
    keywords: ['labor', 'workforce', 'employment', 'HR', 'talent', 'wage', 'aging', 'population', 'education', 'skill'],
  },
];

// Industry Insights data
const insightsResults: SearchResult[] = [
  {
    id: 'insight-manufacturing',
    title: 'Manufacturing',
    titleJa: '製造業',
    description: 'Manufacturing sector analysis, automation trends, and industry 4.0 adoption.',
    descriptionJa: '製造業分析、自動化トレンド、インダストリー4.0の導入。',
    type: 'insight',
    category: 'Industry Insights',
    categoryJa: '業界インサイト',
    url: '/insights/manufacturing',
    keywords: ['manufacturing', 'factory', 'automation', 'industry 4.0', 'production', 'assembly', 'OEM'],
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
    keywords: ['services', 'digital', 'fintech', 'e-commerce', 'SaaS', 'consulting', 'outsourcing'],
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
    keywords: ['agriculture', 'farming', 'agritech', 'crop', 'food', 'organic', 'sustainable'],
  },
  {
    id: 'insight-real-estate',
    title: 'Real Estate',
    titleJa: '不動産',
    description: 'Real estate market analysis, property trends, and investment opportunities.',
    descriptionJa: '不動産市場分析、物件トレンド、投資機会。',
    type: 'insight',
    category: 'Industry Insights',
    categoryJa: '業界インサイト',
    url: '/insights/real-estate',
    keywords: ['real estate', 'property', 'condo', 'housing', 'commercial', 'land', 'REIT', 'construction'],
  },
  {
    id: 'insight-wellness-healthcare',
    title: 'Wellness & Healthcare',
    titleJa: 'ウェルネス・ヘルスケア',
    description: 'Healthcare industry insights, medical tourism, wellness sector growth, kaigo, elderly care, aging society.',
    descriptionJa: 'ヘルスケア業界インサイト、医療観光、ウェルネスセクターの成長、介護、高齢者ケア。',
    type: 'insight',
    category: 'Industry Insights',
    categoryJa: '業界インサイト',
    url: '/insights/wellness-healthcare',
    keywords: ['wellness', 'healthcare', 'medical', 'hospital', 'kaigo', 'elderly', 'aging', 'senior', 'nursing', 'pharma', 'biotech', 'health', 'care', '介護', '高齢者', 'ヘルスケア'],
  },
];

// Premium Insight Reports with rich keywords for discoverability
const premiumInsightResults: SearchResult[] = [
  {
    id: 'premium-ev-battery',
    title: 'Thailand EV & Battery Industry Intelligence Report',
    titleJa: 'タイEV・バッテリー産業 インテリジェンスレポート',
    description: 'Comprehensive analysis of EV battery industry. Market structure, policy incentives, risk-opportunity assessment, and strategic implications for Japanese enterprises.',
    descriptionJa: 'EVバッテリー産業の包括的分析。市場構造、政策インセンティブ、リスク機会評価、日系企業への戦略的示唆。',
    type: 'premium-report',
    category: 'Premium Report - Manufacturing',
    categoryJa: 'プレミアムレポート - 製造業',
    url: '/insights/manufacturing/ev-battery',
    isPremium: true,
    keywords: ['EV', 'electric vehicle', 'battery', 'lithium', 'BEV', 'PHEV', 'charging', 'BYD', 'CATL', 'supply chain', 'BOI', 'incentive'],
  },
  {
    id: 'premium-thailand-market-strategy',
    title: 'Thailand Market Strategy: New Strategies for Japanese Enterprises',
    titleJa: 'タイ市場開拓：日本企業の新戦略',
    description: 'Strategic report redefining Thailand as a hub market. Covers elderly care, kaigo, smart home, next-gen food, electronics, education for Japanese companies.',
    descriptionJa: 'タイをハブ市場として再定義する戦略レポート。介護、スマートホーム、次世代食品、エレクトロニクス、教育の5産業を詳説。',
    type: 'premium-report',
    category: 'Premium Report - Services',
    categoryJa: 'プレミアムレポート - サービス',
    url: '/insights/services/thailand-market-strategy',
    isPremium: true,
    keywords: ['market strategy', 'market entry', 'Japanese enterprise', 'kaigo', 'elderly care', 'smart home', 'education', 'third country', 'hub', '介護', '市場参入', 'senior living'],
  },
  {
    id: 'premium-wellness-healthcare',
    title: "Thailand's Wellness & Healthcare Industry: A Strategic Blueprint for Japanese Enterprise",
    titleJa: 'タイ ウェルネス・ヘルスケア産業：日系企業の戦略的青写真',
    description: 'Healthcare industry strategic blueprint covering medical tourism, wellness economy, kaigo & senior living, functional food, medical devices, smart electronics, education & human capital. Aging society, elderly care opportunities.',
    descriptionJa: 'ヘルスケア産業の戦略的青写真。医療観光、ウェルネス経済、介護・シニアリビング、機能性食品、医療機器、スマートエレクトロニクス、教育・人材育成。高齢化社会、高齢者ケアの機会。',
    type: 'premium-report',
    category: 'Premium Report - Healthcare',
    categoryJa: 'プレミアムレポート - ヘルスケア',
    url: '/insights/wellness-healthcare/wellness-report',
    isPremium: true,
    keywords: ['wellness', 'healthcare', 'medical tourism', 'kaigo', 'senior living', 'elderly care', 'aging', 'aged society', 'NCD', 'hospital', 'nursing', 'pharma', 'medical device', 'functional food', 'health', 'care', 'blueprint', 'BOI', '介護', '高齢者', 'ウェルネス', 'ヘルスケア', '医療', 'シニア'],
  },
  {
    id: 'premium-agriculture',
    title: 'Thailand Agriculture Industry Trends Report',
    titleJa: 'タイ農業産業トレンドレポート',
    description: 'Agricultural sector developments, agritech innovations, and sustainable farming practices.',
    descriptionJa: '農業セクターの発展、アグリテックイノベーション、持続可能な農業実践。',
    type: 'premium-report',
    category: 'Premium Report - Agriculture',
    categoryJa: 'プレミアムレポート - 農業',
    url: '/insights/agriculture/agriculture-industry',
    isPremium: true,
    keywords: ['agriculture', 'farming', 'agritech', 'crop', 'rice', 'rubber', 'palm oil', 'organic', 'smart farming', 'precision agriculture'],
  },
  {
    id: 'premium-real-estate',
    title: 'Thailand Real Estate Market 2026 Report',
    titleJa: 'タイ不動産市場2026レポート',
    description: 'Real estate market analysis, property trends, and investment opportunities for 2026.',
    descriptionJa: '2026年の不動産市場分析、物件トレンド、投資機会。',
    type: 'premium-report',
    category: 'Premium Report - Real Estate',
    categoryJa: 'プレミアムレポート - 不動産',
    url: '/insights/real-estate/real-estate-market',
    isPremium: true,
    keywords: ['real estate', 'property', 'condo', 'housing', 'land', 'REIT', 'construction', 'Bangkok', 'EEC', 'commercial'],
  },
  {
    id: 'premium-electronics-semiconductor',
    title: 'Thailand Electronics & Semiconductor 2026 Report',
    titleJa: 'タイ エレクトロニクス・半導体2026レポート',
    description: 'Electronics and semiconductor industry analysis covering supply chains, investment, and growth.',
    descriptionJa: 'エレクトロニクス・半導体産業のサプライチェーン、投資、成長の分析。',
    type: 'premium-report',
    category: 'Premium Report - Manufacturing',
    categoryJa: 'プレミアムレポート - 製造業',
    url: '/insights/manufacturing/electronics-semiconductor',
    isPremium: true,
    keywords: ['electronics', 'semiconductor', 'chip', 'PCB', 'IC', 'wafer', 'fab', 'TSMC', 'supply chain', 'HDD', 'SSD'],
  },
  {
    id: 'premium-big-data-ai',
    title: 'Thailand Big Data and AI Trends Report',
    titleJa: 'タイ ビッグデータ・AIトレンドレポート',
    description: 'Big data and AI adoption trends, digital transformation, and technology opportunities.',
    descriptionJa: 'ビッグデータ・AI導入トレンド、デジタルトランスフォーメーション、テクノロジー機会。',
    type: 'premium-report',
    category: 'Premium Report - Services',
    categoryJa: 'プレミアムレポート - サービス',
    url: '/insights/services/big-data-ai',
    isPremium: true,
    keywords: ['big data', 'AI', 'artificial intelligence', 'machine learning', 'deep learning', 'NLP', 'cloud', 'data center', 'digital', 'IoT', 'ChatGPT', 'generative AI'],
  },
  {
    id: 'premium-decarbonization',
    title: 'Thailand Decarbonization Initiatives Report',
    titleJa: 'タイ脱炭素化イニシアチブレポート',
    description: 'Decarbonization strategies, carbon neutrality policies, and green investment.',
    descriptionJa: '脱炭素化戦略、カーボンニュートラル政策、グリーン投資。',
    type: 'premium-report',
    category: 'Premium Report - Manufacturing',
    categoryJa: 'プレミアムレポート - 製造業',
    url: '/insights/manufacturing/decarbonization',
    isPremium: true,
    keywords: ['decarbonization', 'carbon neutral', 'net zero', 'ESG', 'green', 'renewable', 'solar', 'wind', 'emission', 'carbon credit', 'sustainability', 'climate'],
  },
  {
    id: 'premium-chemical',
    title: 'Thailand Chemical Industry Insights Report',
    titleJa: 'タイ化学産業インサイトレポート',
    description: 'Chemical industry analysis covering petrochemicals, specialty chemicals, and sustainability trends.',
    descriptionJa: '石油化学、特殊化学品、サステナビリティトレンドの化学産業分析。',
    type: 'premium-report',
    category: 'Premium Report - Manufacturing',
    categoryJa: 'プレミアムレポート - 製造業',
    url: '/insights/manufacturing/chemical-industry',
    isPremium: true,
    keywords: ['chemical', 'petrochemical', 'polymer', 'plastic', 'bioplastic', 'specialty chemical', 'PTT', 'SCG', 'refinery'],
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
    keywords: ['food', 'alternative protein', 'plant-based', 'insect', 'food tech', 'functional food', 'export', 'halal', 'organic', 'CPF', 'ThaiFoods'],
  },
  {
    id: 'premium-energy',
    title: 'Thailand Energy Industry Opportunities Report',
    titleJa: 'タイ エネルギー産業機会レポート',
    description: 'Energy industry analysis covering renewables, LNG, power generation, and energy transition.',
    descriptionJa: '再生可能エネルギー、LNG、発電、エネルギー転換の産業分析。',
    type: 'premium-report',
    category: 'Premium Report - Manufacturing',
    categoryJa: 'プレミアムレポート - 製造業',
    url: '/insights/manufacturing/energy-industry',
    isPremium: true,
    keywords: ['energy', 'power', 'solar', 'wind', 'LNG', 'natural gas', 'oil', 'renewable', 'grid', 'EGAT', 'GPSC', 'hydrogen'],
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
    keywords: ['automotive', 'car', 'vehicle', 'Toyota', 'Honda', 'EV', 'pickup', 'assembly', 'parts', 'tier 1', 'OEM', 'Detroit of Asia'],
  },
  {
    id: 'premium-hormuz-crisis',
    title: '2026 Hormuz Strait Crisis: Impact on Thai Industry',
    titleJa: '2026年ホルムズ海峡危機：タイ産業への影響',
    description: 'Analysis of the Hormuz Strait crisis triggered by US-Iran military conflict. Oil price surge, energy security, supply chain disruption, strategic response for Japanese companies.',
    descriptionJa: '米国・イラン軍事衝突によるホルムズ海峡危機の分析。原油価格高騰、エネルギー安全保障、サプライチェーン混乱、日系企業の戦略的対応。',
    type: 'premium-report',
    category: 'Premium Report - Manufacturing',
    categoryJa: 'プレミアムレポート - 製造業',
    url: '/insights/manufacturing/hormuz-crisis-impact',
    isPremium: true,
    keywords: ['Hormuz', 'Iran', 'US', 'oil', 'crisis', 'geopolitical', 'Middle East', 'energy security', 'strait', 'conflict', 'war', 'sanctions', 'crude oil', 'イラン', 'ホルムズ', '中東', '原油'],
  },
  {
    id: 'premium-oil-crisis',
    title: '2026 US-Iran Conflict Energy Crisis: Impact on Thai Manufacturing',
    titleJa: '2026年米イラン紛争エネルギー危機：タイ製造業への構造的影響',
    description: 'Structural impact of the US-Iran conflict energy crisis on manufacturing and decarbonization. Oil price shock, sanctions, energy transition acceleration.',
    descriptionJa: '米イラン紛争によるエネルギー危機が製造業と脱炭素化に与える構造的影響。原油価格ショック、制裁、エネルギー転換加速。',
    type: 'premium-report',
    category: 'Premium Report - Manufacturing',
    categoryJa: 'プレミアムレポート - 製造業',
    url: '/insights/manufacturing/oil-crisis-thai-industry',
    isPremium: true,
    keywords: ['Iran', 'US', 'oil crisis', 'energy crisis', 'manufacturing', 'decarbonization', 'sanctions', 'crude oil', 'Middle East', 'conflict', 'geopolitical risk', 'イラン', '原油', 'エネルギー危機'],
  },
  {
    id: 'premium-thai-gov-policy',
    title: 'Anutin 2 Government Policy: Strategic Impact on Japanese Enterprises',
    titleJa: 'アヌティン2政策分析：日系企業への戦略的影響',
    description: 'Analysis of Anutin 2 government policy (April 2026): Super License reform, Semiconductor Roadmap 2050, nominee crackdown, Made in Thailand procurement, green energy transition.',
    descriptionJa: 'アヌティン2政権の政策分析（2026年4月）：Super License改革、半導体ロードマップ2050、ノミニー取締強化、Made in Thailand調達、グリーンエネルギー転換。',
    type: 'premium-report',
    category: 'Premium Report - Services',
    categoryJa: 'プレミアムレポート - サービス',
    url: '/insights/services/thai-gov-policy-japanese',
    isPremium: true,
    keywords: ['Anutin', 'government', 'policy', 'Super License', 'semiconductor', 'nominee', 'Made in Thailand', 'procurement', 'green energy', 'Bhumjaithai', 'アヌティン', '政策'],
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

// Static search data (BI + Tips + Premium Reports — excludes category landing pages)
const staticSearchData: SearchResult[] = [
  ...businessIntelligenceResults,
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

// Tokenize search query into individual words for multi-word matching
function tokenizeQuery(query: string): string[] {
  return query.toLowerCase().trim().split(/\s+/).filter(t => t.length > 0);
}

// Check if an item matches a single search token
function itemMatchesToken(item: SearchResult, token: string): boolean {
  // Search in English content
  const englishMatch =
    item.title.toLowerCase().includes(token) ||
    item.description.toLowerCase().includes(token) ||
    item.category.toLowerCase().includes(token);

  // Search in Japanese content
  const japaneseMatch =
    item.titleJa.includes(token) ||
    item.descriptionJa.includes(token) ||
    item.categoryJa.includes(token);

  // Search in keywords
  const keywordMatch = item.keywords?.some(kw => kw.toLowerCase().includes(token)) ?? false;

  return englishMatch || japaneseMatch || keywordMatch;
}

// Score a result for ranking (higher = more relevant)
function scoreResult(item: SearchResult, tokens: string[]): number {
  let score = 0;
  for (const token of tokens) {
    // Title exact match (highest priority)
    if (item.title.toLowerCase().includes(token)) score += 10;
    if (item.titleJa.includes(token)) score += 10;
    // Keyword match
    if (item.keywords?.some(kw => kw.toLowerCase() === token)) score += 8;
    if (item.keywords?.some(kw => kw.toLowerCase().includes(token))) score += 5;
    // Description match
    if (item.description.toLowerCase().includes(token)) score += 3;
    if (item.descriptionJa.includes(token)) score += 3;
    // Category match
    if (item.category.toLowerCase().includes(token)) score += 2;
  }
  // Boost premium reports
  if (item.type === 'premium-report') score += 2;
  return score;
}

// Async search function that fetches news
export async function searchContentAsync(query: string): Promise<SearchResult[]> {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) return [];

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

  // Match: item must match ALL tokens (AND logic for multi-word queries)
  // But also include items matching ANY token with lower score
  const results: { item: SearchResult; score: number }[] = [];

  for (const item of allSearchData) {
    const matchesAll = tokens.every(token => itemMatchesToken(item, token));
    const matchesAny = tokens.some(token => itemMatchesToken(item, token));

    if (matchesAll) {
      results.push({ item, score: scoreResult(item, tokens) + 100 });
    } else if (matchesAny) {
      results.push({ item, score: scoreResult(item, tokens) });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.map(r => r.item);
}

// Sync search for backward compatibility (searches static data only)
export const searchContent = (query: string): SearchResult[] => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) return [];

  const allSearchData = [...staticSearchData, ...(newsCache || [])];

  const results: { item: SearchResult; score: number }[] = [];

  for (const item of allSearchData) {
    const matchesAll = tokens.every(token => itemMatchesToken(item, token));
    const matchesAny = tokens.some(token => itemMatchesToken(item, token));

    if (matchesAll) {
      results.push({ item, score: scoreResult(item, tokens) + 100 });
    } else if (matchesAny) {
      results.push({ item, score: scoreResult(item, tokens) });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.map(r => r.item);
};

// Export for compatibility
export const allSearchData = staticSearchData;
