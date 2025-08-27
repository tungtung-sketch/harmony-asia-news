import { businessTips } from './businessTips';

export interface SearchResult {
  id: string;
  title: string;
  titleJa: string;
  description: string;
  descriptionJa: string;
  type: 'article' | 'tip' | 'insight';
  category: string;
  categoryJa: string;
  url: string;
  readTime?: string;
}

// Mock news articles data
const mockArticles: SearchResult[] = [
  {
    id: 'thai-policy-2025',
    title: 'Thai Government Announces New Foreign Investment Policies for 2025',
    titleJa: 'タイ政府、2025年の新外国投資政策を発表',
    description: 'Thailand introduces significant changes to foreign investment regulations, creating new opportunities for Japanese companies.',
    descriptionJa: 'タイは外国投資規制に大幅な変更を導入し、日本企業に新たな機会を創出します。',
    type: 'article',
    category: 'Policy & Regulation',
    categoryJa: '政策・規制',
    url: '/news/thai-policy-2025',
    readTime: '5 min read'
  },
  {
    id: 'digital-banking-thailand',
    title: 'Digital Banking Revolution Transforms Thai Financial Sector',
    titleJa: 'デジタルバンキング革命がタイの金融セクターを変革',
    description: 'How fintech innovations are reshaping traditional banking in Thailand and creating opportunities for international partnerships.',
    descriptionJa: 'フィンテックイノベーションがタイの従来の銀行業務をどのように再構築し、国際的なパートナーシップの機会を創出しているか。',
    type: 'article',
    category: 'Technology & Finance',
    categoryJa: 'テクノロジー・金融',
    url: '/news/digital-banking-thailand',
    readTime: '4 min read'
  },
  {
    id: 'sustainable-manufacturing-trends',
    title: 'Sustainable Manufacturing Trends Drive Thai Industrial Growth',
    titleJa: '持続可能な製造トレンドがタイの産業成長を牽引',
    description: 'Environmental regulations and consumer demand push Thai manufacturers toward sustainable practices.',
    descriptionJa: '環境規制と消費者需要により、タイの製造業者は持続可能な慣行に向かっています。',
    type: 'article',
    category: 'Manufacturing & Industry',
    categoryJa: '製造業・産業',
    url: '/news/sustainable-manufacturing-trends',
    readTime: '6 min read'
  }
];

// Mock insights data
const mockInsights: SearchResult[] = [
  {
    id: 'services-digital-transformation',
    title: 'Digital Transformation in Thai Service Industries',
    titleJa: 'タイサービス業界のデジタル変革',
    description: 'Comprehensive analysis of digital adoption trends across Thailand\'s service sector.',
    descriptionJa: 'タイのサービス部門におけるデジタル採用トレンドの包括的分析。',
    type: 'insight',
    category: 'Services Industry',
    categoryJa: 'サービス業界',
    url: '/insights/services',
    readTime: '8 min read'
  },
  {
    id: 'manufacturing-automation',
    title: 'Manufacturing Automation Opportunities in Thailand',
    titleJa: 'タイにおける製造業自動化の機会',
    description: 'Industry 4.0 adoption and automation trends shaping Thai manufacturing.',
    descriptionJa: 'インダストリー4.0の採用と自動化トレンドがタイの製造業を形作っています。',
    type: 'insight',
    category: 'Manufacturing',
    categoryJa: '製造業',
    url: '/insights/manufacturing',
    readTime: '7 min read'
  },
  {
    id: 'wellness-healthcare-market',
    title: 'Thailand\'s Wellness & Healthcare Market Expansion',
    titleJa: 'タイのウェルネス・ヘルスケア市場拡大',
    description: 'Growing opportunities in medical tourism, telemedicine, and wellness services.',
    descriptionJa: '医療観光、遠隔医療、ウェルネスサービスにおける成長機会。',
    type: 'insight',
    category: 'Healthcare & Wellness',
    categoryJa: 'ヘルスケア・ウェルネス',
    url: '/insights/wellness-healthcare',
    readTime: '6 min read'
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

// Combine all search data
export const allSearchData: SearchResult[] = [
  ...mockArticles,
  ...mockInsights,
  ...businessTipResults
];

export const searchContent = (query: string): SearchResult[] => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  
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