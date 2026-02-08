import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { differenceInDays } from 'date-fns';

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
const reportMetadata: Record<string, {
  industry: string;
  industryJa: string;
  description: string;
  descriptionJa: string;
  link: string;
}> = {
  'ev-battery-industry': {
    industry: 'Manufacturing',
    industryJa: '製造業',
    description: 'Comprehensive analysis of EV battery industry for Japanese enterprises. Includes market structure, policy incentives, risk-opportunity assessment, and strategic implications.',
    descriptionJa: '日系企業向けのEVバッテリー産業の包括的分析。市場構造、政策インセンティブ、リスク機会評価、戦略的示唆を含む。',
    link: '/insights/manufacturing/ev-battery'
  },
  'thailand-market-strategy': {
    industry: 'Services',
    industryJa: 'サービス',
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
    industry: 'Services',
    industryJa: 'サービス',
    description: 'Big Data & AI trends in Thailand 2026: Hyperscale cloud regions, risk-tiered AI governance, PDPA enforcement reality, 80,000-person talent gap, and strategic plays for Japanese executives.',
    descriptionJa: 'タイのビッグデータ＆AI動向2026：ハイパースケールクラウドリージョン、リスク階層型AIガバナンス、PDPA執行の実態、8万人の人材ギャップ、日本企業経営者の戦略的打ち手。',
    link: '/insights/services/big-data-ai'
  },
  'decarbonization': {
    industry: 'Services',
    industryJa: 'サービス',
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
    industry: 'Services',
    industryJa: 'サービス',
    description: "Thailand's energy transformation 2025–2030: PDP 2024 mandating 51% RE, Direct PPA liberalization, hydrogen/ammonia co-firing via AZEC, data center cooling, V2G ecosystem, and Eastern CCS Hub — strategic blueprint for Japanese executives.",
    descriptionJa: 'タイのエネルギー変革2025–2030：PDP 2024でRE 51%義務化、Direct PPA自由化、AZECを通じた水素/アンモニア混焼、データセンター冷却、V2Gエコシステム、東部CCSハブ——日系企業経営者のための戦略青写真。',
    link: '/insights/services/energy-industry'
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

      setReports(reportsWithMeta);
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
