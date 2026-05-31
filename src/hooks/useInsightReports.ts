import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';


interface InsightReport {
  id: string;
  report_slug: string;
  title_en: string;
  title_ja: string;
  base_report_version: string | null;
  base_report_updated_at: string | null;
  last_content_update: string | null;
  pdf_enabled: boolean | null;
  watermark_text: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface InsightReportWithMeta extends InsightReport {
  updateCount30Days: number;
  industry: string;
  industryJa: string;
  description: string;
  descriptionJa: string;
  link: string;
}

// Static mapping of report metadata (can be moved to DB later)
export const reportMetadata: Record<string, {
  industry: string;
  industryJa: string;
  description: string;
  descriptionJa: string;
  link: string;
  titleEn?: string;
  titleJa?: string;
  lastUpdated?: string;
}> = {
  'ev-battery-industry': {
    industry: 'Manufacturing',
    industryJa: '製造業',
    description: 'Comprehensive analysis of EV battery industry for Japanese enterprises. Includes market structure, policy incentives, risk-opportunity assessment, and strategic implications.',
    descriptionJa: '日系企業向けのEVバッテリー産業の包括的分析。市場構造、政策インセンティブ、リスク機会評価、戦略的示唆を含む。',
    link: '/insights/manufacturing/ev-battery'
  },
  'thailand-market-strategy': {
    industry: 'Economic Policy',
    industryJa: '経済政策',
    description: 'Strategic report redefining Thailand as a third-country market hub and social-issue-solving market. Covers 5 key industries: elderly care, smart home, future food, electronics, and education.',
    descriptionJa: 'タイを第三国市場ハブ・社会課題解決型市場として再定義する戦略レポート。高齢者ケア、スマートホーム、次世代食品、エレクトロニクス、教育の5産業を詳説。',
    link: '/insights/reports/thailand-market-strategy'
  },
  'wellness-healthcare': {
    industry: 'Healthcare',
    industryJa: 'ヘルスケア',
    description: 'Strategic blueprint for Japanese enterprise in Thailand\'s wellness & healthcare industry.',
    descriptionJa: 'タイのウェルネス＆ヘルスケア産業における日本企業のための戦略的青写真。',
    link: '/insights/wellness-healthcare/wellness-report'
  },
  'agriculture-industry': {
    industry: 'Agriculture',
    industryJa: '農業',
    description: 'Thailand agriculture sector analysis: compliance, climate & value-add cycle. Covers rice, durian, cassava, poultry, shrimp, rubber with EUDR readiness and strategic plays for Japanese companies.',
    descriptionJa: 'タイ農業セクター分析：コンプライアンス・気候変動・高付加価値化サイクル。米、ドリアン、キャッサバ、鶏肉、エビ、ゴムのEUDR対応と日本企業の戦略的打ち手。',
    link: '/insights/agriculture/industry-trends'
  },
  'real-estate-market': {
    industry: 'Real Estate',
    industryJa: '不動産',
    description: 'Thailand real estate market 2026: Two-speed market dynamics, Japanese J-Quality premium, EEC industrial boom, data center rush, and strategic recommendations for shifting from box-selling to operations.',
    descriptionJa: 'タイ不動産市場2026：二極化市場、日本品質プレミアム、EEC産業用不動産活況、データセンターラッシュ、「ハコ売り」から「運営」への転換提言。',
    link: '/insights/real-estate/market-2026'
  },
  'electronics-semiconductor': {
    industry: 'Manufacturing',
    industryJa: '製造業',
    description: 'Thailand electronics & semiconductor industry 2026: PCB investment surge, automotive OSAT upgrading, supply chain realignment from China+1, and strategic recommendations for Japanese manufacturers.',
    descriptionJa: 'タイ電子機器・半導体産業2026：PCB投資ラッシュ、車載OSAT高度化、チャイナプラスワンによるサプライチェーン再編、日本メーカーへの戦略提言。',
    link: '/insights/manufacturing/electronics-semiconductor'
  },
  'big-data-ai': {
    industry: 'Technology',
    industryJa: 'テクノロジー',
    description: 'Big Data & AI trends in Thailand 2026: Hyperscale cloud regions, risk-tiered AI governance, PDPA enforcement reality, 80,000-person talent gap, and strategic plays for Japanese executives.',
    descriptionJa: 'タイのビッグデータ＆AI動向2026：ハイパースケールクラウドリージョン、リスク階層型AIガバナンス、PDPA執行の実態、8万人の人材ギャップ、日本企業経営者の戦略的打ち手。',
    link: '/insights/services/big-data-ai'
  },
  'decarbonization': {
    industry: 'Energy',
    industryJa: 'エネルギー',
    description: 'Thailand decarbonization 2026: NDC 3.0 net-zero by 2050, carbon tax THB 200/tCO₂e, Climate Change Act with ETS/CBAM, green electricity procurement (UGT/Direct PPA), and carbon credit market architecture for Japanese operations.',
    descriptionJa: 'タイ脱炭素化2026：NDC 3.0で2050年ネットゼロ、炭素税THB 200/tCO₂e、ETS/CBAM付き気候変動法、グリーン電力調達（UGT/Direct PPA）、日系企業向けカーボンクレジット市場構造。',
    link: '/insights/services/decarbonization'
  },
  'chemical-industry': {
    industry: 'Manufacturing',
    industryJa: '製造業',
    description: 'Thailand chemical industry at the 2025 inflection point: commodity-to-specialty pivot, 5 mega-themes (elderly care, bio-circular, EV materials, KOSEN talent, RCEP gateway), BCG economy model, and strategic roadmap for Japanese chemical firms.',
    descriptionJa: 'タイ化学産業の2025年転換点：コモディティからスペシャリティへの転換、5つのメガテーマ（高齢者ケア、バイオサーキュラー、EV素材、KOSEN人材、RCEPゲートウェイ）、BCG経済モデル、日系化学メーカーの戦略ロードマップ。',
    link: '/insights/manufacturing/chemical-industry'
  },
  'food-industry': {
    industry: 'Agriculture',
    industryJa: '農業',
    description: "Thailand's food revolution: from 'Kitchen of the World' to 'Pharmacy of the World.' Future Food, functional ingredients, alternative proteins, Halal hub strategy, and automation imperatives for Japanese enterprises.",
    descriptionJa: 'タイの食品革命：「世界の台所」から「世界の薬局」へ。フューチャーフード、機能性食品原料、代替タンパク質、ハラールハブ戦略、日系企業向け自動化の必然性。',
    link: '/insights/agriculture/food-industry'
  },
  'energy-industry': {
    industry: 'Energy',
    industryJa: 'エネルギー',
    description: "Thailand's energy transformation 2025–2030: PDP 2024 mandating 51% RE, Direct PPA liberalization, hydrogen/ammonia co-firing via AZEC, data center cooling, V2G ecosystem, and Eastern CCS Hub — strategic blueprint for Japanese executives.",
    descriptionJa: 'タイのエネルギー変革2025–2030：PDP 2024でRE 51%義務化、Direct PPA自由化、AZECを通じた水素/アンモニア混焼、データセンター冷却、V2Gエコシステム、東部CCSハブ——日系企業経営者のための戦略青写真。',
    link: '/insights/services/energy-industry'
  },
  'automotive-industry': {
    industry: 'Manufacturing',
    industryJa: '製造業',
    description: "Thailand's automotive strategic realignment 2026: from 'Detroit of Asia' to 'Social Issue Solution Market.' Chinese EV surge (>80% BEV share), Multi-Pathway defense, 5 interconnected industries (Elderly Care, Food, Electronics, Education), Tier-2/3 supply chain crisis, and hydrogen logistics pivot for Japanese executives.",
    descriptionJa: 'タイ自動車産業の構造転換2026：「アジアのデトロイト」から「社会課題解決型市場」へ。中国EVの台頭（BEVシェア80%超）、マルチパスウェイ防衛、5つの連関産業（高齢者ケア・食品・電子機器・教育）、Tier-2/3サプライチェーン危機、水素ロジスティクスピボット。',
    link: '/insights/manufacturing/automotive-industry'
  },
  'hormuz-crisis-impact': {
    industry: 'Energy',
    industryJa: 'エネルギー',
    description: "2026 Hormuz Strait Crisis: Multi-dimensional impact on Thai industry. Energy security vulnerabilities, manufacturing cost explosions, fertilizer shock, Climate Change Act enforcement acceleration, and strategic opportunities in digital GHG management and decarbonization for Japanese enterprises.",
    descriptionJa: '2026年ホルムズ海峡危機：タイ産業への多角的影響分析。エネルギー安全保障の脆弱性、製造コスト爆発、肥料ショック、気候変動法施行加速、デジタルGHG管理・脱炭素化における日系企業の戦略的機会。',
    link: '/insights/services/hormuz-crisis-impact'
  },
  'oil-crisis-thai-industry': {
    industry: 'Energy',
    industryJa: 'エネルギー',
    description: "2026 US-Iran conflict energy crisis: structural impact on Thai manufacturing and advanced decarbonization management strategy. Coal reversion paradox, grid emission factor volatility, and explosive demand for real-time digital GHG management platforms.",
    descriptionJa: '2026年米イラン紛争に伴うタイのエネルギー危機：製造業および環境関連企業への構造的影響と高度な脱炭素管理戦略。石炭回帰のパラドックス、グリッド排出係数の変動、リアルタイムGHG管理プラットフォームへの爆発的需要。',
    link: '/insights/services/oil-crisis-thai-industry'
  },
  'thai-gov-policy-japanese': {
    industry: 'Economic Policy',
    industryJa: '経済政策',
    description: "Anutin 2 government policy analysis (April 2026): Super License reform, Semiconductor Roadmap 2050, nominee crackdown, Made in Thailand procurement, and green energy transition — strategic implications for Japanese enterprises in Thailand.",
    descriptionJa: 'アヌティン2政策分析（2026年4月）：Super License改革、半導体ロードマップ2050、ノミニー取締強化、Made in Thailand調達、グリーンエネルギー転換——タイにおける日系企業への戦略的影響。',
    link: '/insights/services/thai-gov-policy-japanese'
  },
  'songkran-japanese-business': {
    industry: 'Services',
    industryJa: 'サービス',
    description: "Songkran 2026 strategic playbook: macroeconomic indicators (THB 30.4 Bn revenue, +6% YoY), JCCB business sentiment rebound (+1 DI), at-home premiumization (69%), Daikin Amata lockout case study, Seven Dangerous Days BCP, and Toyota/Sumitomo CSR blueprints for Japanese enterprises in Thailand.",
    descriptionJa: 'ソンクラン2026戦略プレイブック：マクロ経済指標（観光収入304億バーツ、前年比+6%）、JCCB景況感回復（DI +1）、自宅プレミアム化（69%）、Daikin Amataロックアウト事例、セブン・デンジャラス・デイズBCP、トヨタ・住友のCSR青写真——タイにおける日系企業向け。',
    link: '/insights/services/songkran-japanese-business'
  },
  'energy-crisis-baht-strategy-2026': {
    industry: 'Economic Policy',
    industryJa: '経済政策',
    description: "April 2026 strategic briefing for Japanese executives in Thailand: May–Aug electricity tariff at 3.95 THB/kWh, Hormuz LNG shock, baht at 32.38 THB/USD, the 28–30 April BoT/FOMC central-bank week, JPY/THB repatriation window, and recommended actions across 6 sectors (manufacturing, electronics, retail, real estate, financial services, logistics).",
    descriptionJa: '2026年4月の在タイ日系企業経営層向け戦略ブリーフィング：5〜8月電力料金3.95 THB/kWh、ホルムズLNGショック、バーツ32.38 THB/USD、4月28〜30日BoT／FOMC中央銀行週間、JPY/THB本国還流ウィンドウ、6セクター（製造、電子機器、小売、不動産、金融、物流）別推奨アクション。',
    link: '/insights/services/energy-crisis-baht-strategy-2026'
  },
  'sea-automotive-aftermarket-2026': {
    industry: 'Manufacturing',
    industryJa: '製造業',
    description: "Strategic transformation of Southeast Asia's automotive aftermarket 2026: 10% CAGR market outlook, Chinese OEM competitive surge, EV battery logistics, ASEAN supply-chain realignment, and strategic recommendations for Japanese executives.",
    descriptionJa: '東南アジア自動車アフターマーケットの戦略的変革2026：年平均成長率10％の市場展望、中国OEMの競争激化、EVバッテリー物流、ASEANサプライチェーン再編、日系企業経営層への戦略提言。',
    link: '/insights/manufacturing/sea-automotive-aftermarket-2026'
  },
  'thai-chuay-thai-plus-2026': {
    industry: 'Economic Policy',
    industryJa: '経済政策',
    description: "Thailand's Thai Chuay Thai Plus stimulus 2026: ฿175.7 billion 60/40 co-payment program targeting 43 million consumers, channel dynamics, Chinese competitive moves, sector decision guide, and next actions for Japanese executives.",
    descriptionJa: 'タイ「タイ・チュワイ・タイ・プラス（Thai Chuay Thai Plus）」刺激策2026：1,757億バーツの60/40コペイメント、4,318万人対象、チャネル動向、中国系競合の戦略分析、セクター別優先度評価と日系エグゼクティブへの次のアクション。',
    link: '/insights/economic-policy/thai-chuay-thai-plus-2026',
    titleEn: "Thailand's 'Thais Help Thais Plus' Stimulus: Strategic Implications for Japanese Executives",
    titleJa: 'タイ「タイ・チュワイ・タイ・プラス（Thai Chuay Thai Plus）」政策の全解剖 ── 中国企業の次の一手と、日系エグゼクティブが今知るべき戦略的含意',
    lastUpdated: '2026-06-01'
  }
};

export const useInsightReports = () => {
  const [reports, setReports] = useState<InsightReportWithMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch reports
      const { data: reportsData, error: reportsError } = await supabase
        .from('insight_reports')
        .select('*')
        .order('updated_at', { ascending: false });

      if (reportsError) throw reportsError;

      // Fetch update counts for each report
      const reportsWithMeta: InsightReportWithMeta[] = await Promise.all(
        (reportsData || []).map(async (report) => {
          // Get update count for last 30 days
          const { data: updates, error: updatesError } = await supabase
            .from('insight_updates')
            .select('id')
            .eq('report_slug', report.report_slug)
            .eq('is_published', true)
            .gte('update_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

          const updateCount30Days = updatesError ? 0 : (updates?.length || 0);
          const meta = reportMetadata[report.report_slug] || {
            industry: 'General',
            industryJa: '一般',
            description: report.title_en,
            descriptionJa: report.title_ja,
            link: `/insights/reports/${report.report_slug}`
          };

          return {
            ...report,
            updateCount30Days,
            ...meta
          };
        })
      );

      // Synthesize cards for any reportMetadata entries that have no matching DB row
      const dbSlugs = new Set(reportsWithMeta.map(r => r.report_slug));
      const staticReports: InsightReportWithMeta[] = Object.entries(reportMetadata)
        .filter(([slug, meta]) => !dbSlugs.has(slug) && meta.titleEn)
        .map(([slug, meta]) => ({
          id: `static-${slug}`,
          report_slug: slug,
          title_en: meta.titleEn!,
          title_ja: meta.titleJa || '',
          base_report_version: null,
          base_report_updated_at: null,
          last_content_update: meta.lastUpdated || null,
          pdf_enabled: null,
          watermark_text: null,
          created_at: meta.lastUpdated || null,
          updated_at: meta.lastUpdated || null,
          updateCount30Days: 0,
          ...meta
        }));

      const allReports = [...reportsWithMeta, ...staticReports].sort((a, b) => {
        const dateA = a.last_content_update || a.updated_at || a.created_at || '';
        const dateB = b.last_content_update || b.updated_at || b.created_at || '';
        return dateB.localeCompare(dateA);
      });
      setReports(allReports);
    } catch (err) {
      console.error('Error fetching insight reports:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return {
    reports,
    loading,
    error,
    refetch: fetchReports
  };
};
