import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import SEO from '@/components/SEO';
import { useI18n } from '@/i18n/I18nProvider';
import { useAuth } from '@/contexts/AuthContext';
import { usePaywall } from '@/hooks/usePaywall';
import { usePremiumActionLogger } from '@/hooks/usePremiumActionLogger';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Building,
  Factory,
  Zap,
  BookOpen,
  Lock,
  Lightbulb,
  Eye,
  ChevronRight,
  Crown,
  Database
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';

import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';

// Hero image import
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const EVBatteryIndustry = () => {
  const { lang } = useI18n();
  const { user } = useAuth();
  const { canViewArticle } = usePaywall();
  const { logView, logDataAccess } = usePremiumActionLogger();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [hasLoggedView, setHasLoggedView] = useState(false);

  const access = canViewArticle('premium');
  const hasFullAccess = access.canViewFull;
  const isJapanese = lang === 'ja';

  // Log view when premium user accesses the report
  useEffect(() => {
    if (hasFullAccess && !hasLoggedView) {
      logView(
        'ev-battery-industry',
        isJapanese ? 'タイEV・バッテリー産業レポート' : 'Thailand EV & Battery Industry Report',
        'manufacturing',
        lang
      );
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  // Handler for data appendix access logging
  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(
        'ev-battery-industry',
        isJapanese ? 'タイEV・バッテリー産業レポート' : 'Thailand EV & Battery Industry Report',
        'manufacturing',
        lang
      );
    }
  };

  // Scroll to section handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTOC = () => {
    const element = document.getElementById('table-of-contents');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Table of Contents - new streamlined structure
  const tocSections = [
    { id: 'executive-summary', label: isJapanese ? 'エグゼクティブサマリー' : 'Executive Summary' },
    { id: 'facts', label: isJapanese ? 'ファクト（市場・政策・動向）' : 'Facts (Market, Policy & Trends)' },
    { id: 'opinion', label: isJapanese ? 'WaLensの見解と示唆' : 'Opinion & Implication from WaLens' },
    { id: 'recommendation', label: isJapanese ? '日本企業経営者への提言' : 'Recommendation for Japanese Executives' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: {
      en: "Can Japanese Automakers Survive Thailand's EV Revolution?",
      ja: "日系自動車メーカーはタイのEV革命を生き残れるか？"
    },
    subheadline: {
      en: "The structural shift that will reshape ASEAN's largest automotive market",
      ja: "ASEANの最大自動車市場を再編する構造的転換"
    },
    category: {
      en: "Manufacturing / Electric Vehicles",
      ja: "製造業 / 電気自動車"
    },
    lastUpdated: "2025-01-10",
    executiveSummary: {
      en: [
        "Thailand is positioning itself as the regional hub for EV and battery manufacturing, with over $15 billion in committed investments through 2027 (BOI, 2024).",
        "Japanese automakers face strategic pressure: BOI incentives favor new entrants (Chinese, Korean), potentially eroding traditional market dominance.",
        "Battery cell localization requirements (40% by 2027) create both supply chain risks and partnership opportunities for Japanese trading companies.",
        "The policy environment is highly favorable but execution gaps remain—permit delays and workforce readiness are key operational risks.",
        "First-mover advantage in charging infrastructure and battery recycling represents untapped strategic opportunity."
      ],
      ja: [
        "タイは2027年までに150億ドル以上の投資コミットメントを背景に、EV・バッテリー製造の地域ハブとしての地位を確立しつつある（BOI、2024年）。",
        "日系自動車メーカーは戦略的プレッシャーに直面：BOI優遇措置は新規参入者（中国系・韓国系）に有利であり、従来の市場支配力が揺らぐ可能性がある。",
        "バッテリーセルの現地化要件（2027年までに40%）は、日系商社にとってサプライチェーンリスクであると同時にパートナーシップ機会でもある。",
        "政策環境は極めて良好だが実行面でのギャップが残る—許認可の遅延と人材の準備状況が主要なオペレーショナルリスク。",
        "充電インフラとバッテリーリサイクルにおける先行者利益は、未開拓の戦略的機会として存在する。"
      ]
    },
    // Facts Section - Market Data
    marketStructure: {
      title: { en: "Market Structure", ja: "市場構造" },
      segments: {
        en: [
          { name: "EV Assembly", share: "35%", growth: "+28% YoY", players: "BYD, Great Wall, MG, Honda, Toyota" },
          { name: "Battery Pack", share: "25%", growth: "+45% YoY", players: "CATL, BYD, Samsung SDI, local JVs" },
          { name: "Components", share: "20%", growth: "+18% YoY", players: "Japanese Tier-1s, Thai suppliers" },
          { name: "Infrastructure", share: "12%", growth: "+52% YoY", players: "EA, PTT, Shell, local startups" },
          { name: "Recycling", share: "8%", growth: "+85% YoY", players: "Emerging players, minimal capacity" }
        ],
        ja: [
          { name: "EV組立", share: "35%", growth: "+28% YoY", players: "BYD, Great Wall, MG, ホンダ, トヨタ" },
          { name: "バッテリーパック", share: "25%", growth: "+45% YoY", players: "CATL, BYD, Samsung SDI, 現地JV" },
          { name: "部品", share: "20%", growth: "+18% YoY", players: "日系Tier-1, タイサプライヤー" },
          { name: "インフラ", share: "12%", growth: "+52% YoY", players: "EA, PTT, Shell, 地場スタートアップ" },
          { name: "リサイクル", share: "8%", growth: "+85% YoY", players: "新興プレイヤー、キャパシティ限定的" }
        ]
      }
    },
    keyPlayers: {
      title: { en: "Key Players", ja: "主要プレイヤー" },
      data: {
        en: [
          { segment: "Chinese OEMs", examples: "BYD, Great Wall, Neta, Changan", status: "Aggressive expansion" },
          { segment: "Japanese OEMs", examples: "Toyota, Honda, Nissan, Mazda", status: "Defensive transition" },
          { segment: "Battery Makers", examples: "CATL, BYD Battery, Samsung SDI", status: "Capacity building" },
          { segment: "Thai Conglomerates", examples: "PTT, Banpu, Energy Absolute", status: "Diversification" }
        ],
        ja: [
          { segment: "中国系OEM", examples: "BYD, Great Wall, Neta, 長安", status: "積極的拡大" },
          { segment: "日系OEM", examples: "トヨタ, ホンダ, 日産, マツダ", status: "守勢の転換期" },
          { segment: "バッテリーメーカー", examples: "CATL, BYD Battery, Samsung SDI", status: "生産能力拡大" },
          { segment: "タイ財閥", examples: "PTT, バンプー, エナジーアブソルート", status: "事業多角化" }
        ]
      }
    },
    // Facts Section - Policy
    policyInsights: {
      title: { en: "Policy & Regulation", ja: "政策・規制" },
      items: {
        en: [
          { policy: "BOI EV Package 3.5", content: "8-year corporate income tax exemption for EV assembly, 10-year for battery cells. Chinese entrants have secured most allocations; Japanese applications face longer review cycles.", citation: "BOI Official Gazette, September 2024" },
          { policy: "30@30 Policy", content: "Target of 30% ZEV production by 2030. Implicitly favors BEV over HEV; Japanese hybrid strategy may face regulatory headwinds post-2027.", citation: "Ministry of Industry, 2023" },
          { policy: "Local Content Requirements", content: "40% battery cell localization by 2027. Creates forced partnership opportunities for Japanese trading houses as supplier matching intermediaries.", citation: "BOI Investment Promotion Division" },
          { policy: "EEC Special Incentives", content: "Additional 50% reduction on land rental, 90-day visa for skilled workers. Rayong and Chonburi zones are nearly full; Chachoengsao offers better land availability.", citation: "EEC Office Zone Report, Q3 2024" }
        ],
        ja: [
          { policy: "BOI EVパッケージ3.5", content: "EV組立に8年間の法人税免除、バッテリーセルには10年間。中国系参入者が大半の枠を確保済み；日本企業の申請は審査期間が長期化傾向。", citation: "BOI官報、2024年9月" },
          { policy: "30@30政策", content: "2030年までにZEV生産30%目標。暗黙的にBEVがHEVより有利；日系のハイブリッド戦略は2027年以降に規制上の逆風を受ける可能性。", citation: "工業省、2023年" },
          { policy: "現地調達要件", content: "2027年までにバッテリーセル40%の現地化。日系商社にとってサプライヤーマッチング仲介者としての強制的なパートナーシップ機会を創出。", citation: "BOI投資促進部" },
          { policy: "EEC特別優遇", content: "土地賃借料50%追加削減、熟練労働者向け90日ビザ。ラヨーン・チョンブリ地区はほぼ満杯；チャチューンサオは土地供給に余裕あり。", citation: "EEC事務局ゾーンレポート、2024年Q3" }
        ]
      }
    },
    // Facts Section - Opportunities & Risks
    opportunities: {
      en: [
        "Battery recycling infrastructure: First-mover position available, minimal competition",
        "Tier-2/3 supplier upgrade programs: Japanese quality standards as differentiator",
        "Charging network partnerships: PTT and EA actively seeking technology partners",
        "Battery testing and certification services: Gap in local capabilities",
        "Workforce training JVs: Strong government co-funding available"
      ],
      ja: [
        "バッテリーリサイクルインフラ：先行者ポジション獲得可能、競争少ない",
        "Tier-2/3サプライヤー育成プログラム：日本品質基準を差別化要因に",
        "充電ネットワークパートナーシップ：PTTとEAが技術パートナーを積極募集",
        "バッテリー試験・認証サービス：現地能力にギャップあり",
        "人材育成JV：政府の共同出資制度が充実"
      ]
    },
    risks: {
      en: [
        "Market share erosion: Chinese EVs gaining consumer preference rapidly (J.D. Power Thailand, 2024)",
        "Technology mismatch: Thai EV ecosystem optimizing for BEV, not HEV",
        "Talent competition: Salary expectations rising 20-30% annually in EV sector",
        "Policy uncertainty: Potential incentive revisions post-2025 election",
        "Supply chain concentration: Over-reliance on Chinese battery cell supply"
      ],
      ja: [
        "市場シェア浸食：中国製EVが消費者選好を急速に獲得（J.D.Powerタイ、2024年）",
        "技術ミスマッチ：タイEVエコシステムはHEVでなくBEV最適化へ進行",
        "人材獲得競争：EV分野の給与期待値が年率20-30%上昇",
        "政策不確実性：2025年選挙後の優遇措置見直しの可能性",
        "サプライチェーン集中リスク：中国製バッテリーセルへの過度な依存"
      ]
    },
    // Opinion & Implication Section
    opinion: {
      title: { en: "WaLens Analysis: Structural Interpretation", ja: "WaLensの分析：構造的解釈" },
      intro: {
        en: "The following represents WaLens' independent analysis based on the facts presented above. These are interpretive observations, not objective data points.",
        ja: "以下は上記のファクトに基づくWaLensの独自分析です。これらは解釈的な見解であり、客観的なデータポイントではありません。"
      },
      points: {
        en: [
          {
            title: "The Structural Disadvantage is Real",
            content: "Unlike previous market transitions where Japanese incumbents could leverage existing infrastructure, the EV shift fundamentally favors new entrants. Chinese OEMs starting fresh can optimize for EV-specific requirements, while Japanese incumbents must retrofit ICE-optimized facilities and supply chains. This is not a temporary competitive pressure—it is a structural repositioning of the industry."
          },
          {
            title: "The Battery Chokepoint",
            content: "Thailand has no lithium resources and minimal chemical processing capability. Once CATL and BYD establish local cell production, Chinese OEMs will have structural cost advantages that cannot be easily matched. This is the single most important strategic inflection point to watch. Japanese companies without battery partnerships will find their competitive position increasingly constrained."
          },
          {
            title: "Speed of Decision-Making Matters More Than Quality",
            content: "Japanese companies' traditional strength—careful deliberation and quality engineering—may be a liability in this market. The evidence suggests that 'good enough' technology at the right price point is winning over superior technology at premium prices. More critically, Chinese competitors' local decision-making authority allows responses in weeks, not months."
          },
          {
            title: "The Hybrid Strategy Has a Shelf Life",
            content: "While hybrid vehicles remain profitable today, the policy trajectory clearly favors full electrification. Companies that over-invest in hybrid production capacity in Thailand may find themselves with stranded assets by 2028-2030. The 30@30 policy, while aspirational, signals regulatory intent."
          }
        ],
        ja: [
          {
            title: "構造的不利は現実である",
            content: "日系既存企業が既存インフラを活用できた過去の市場転換とは異なり、EV転換は根本的に新規参入者を有利にする。ゼロから始める中国OEMはEV固有の要件に最適化できるが、日系既存企業はICE最適化された施設とサプライチェーンを改修しなければならない。これは一時的な競争圧力ではなく、業界の構造的再編である。"
          },
          {
            title: "バッテリーのチョークポイント",
            content: "タイはリチウム資源を持たず、化学処理能力も限定的である。CATLとBYDが現地セル生産を確立すれば、中国OEMは容易にマッチできない構造的コスト優位を持つ。これは注視すべき最重要の戦略的転換点である。バッテリーパートナーシップを持たない日本企業は、競争ポジションがますます制約されることになる。"
          },
          {
            title: "意思決定のスピードが品質より重要",
            content: "日本企業の伝統的な強み—慎重な審議と品質エンジニアリング—は、この市場では負債になりうる。証拠は、適正価格での「十分に良い」技術がプレミアム価格での優れた技術に勝利していることを示している。より重要なことに、中国競合他社の現地意思決定権限は、数ヶ月ではなく数週間での対応を可能にしている。"
          },
          {
            title: "ハイブリッド戦略には賞味期限がある",
            content: "ハイブリッド車は今日も収益性があるが、政策の軌道は明らかに完全電動化を好んでいる。タイでハイブリッド生産能力に過剰投資する企業は、2028-2030年までに座礁資産を抱える可能性がある。30@30政策は野心的だが、規制の意図を示している。"
          }
        ]
      }
    },
    // Recommendation Section
    recommendation: {
      title: { en: "Strategic Recommendation for Japanese Executives", ja: "日本企業経営者への戦略的提言" },
      intro: {
        en: "Based on WaLens' analysis, the following strategic perspective is offered—not as an operational checklist, but as a framework for executive decision-making.",
        ja: "WaLensの分析に基づき、以下の戦略的視点を提供する—オペレーショナルなチェックリストとしてではなく、経営判断のためのフレームワークとして。"
      },
      content: {
        en: `The core strategic question is not "how to win in Thailand's EV market" but rather "what role should Thailand play in our broader ASEAN and global EV strategy."

For companies with existing significant Thailand operations, the priority should be defending commercial vehicle and specialty segments where brand loyalty and relationship networks remain valuable, while simultaneously building partnerships for passenger EV competitiveness.

For companies with lighter Thailand footprints, this may be the moment to consider Thailand as a component and infrastructure opportunity rather than an assembly competition—pivoting to high-value battery management, charging technology, and recycling where Japanese engineering advantage is more defensible.

The most dangerous path is the middle ground: incremental investments that are too small to meaningfully compete but too large to write off. The market rewards decisive action—either committed expansion or strategic repositioning.

Whatever path is chosen, the timeline for decision is compressed. The structural dynamics outlined above are accelerating, not stabilizing. Waiting for clarity is itself a strategic choice—one that increasingly favors competitors.`,
        ja: `核心的な戦略的問いは「タイのEV市場でいかに勝つか」ではなく、むしろ「より広いASEANおよびグローバルEV戦略において、タイはどのような役割を果たすべきか」である。

既にタイで重要な事業を持つ企業にとっての優先事項は、ブランドロイヤルティと関係ネットワークが依然として価値を持つ商用車・特殊用途セグメントを守りながら、同時に乗用EV競争力のためのパートナーシップを構築することである。

タイでのプレゼンスが軽い企業にとっては、タイを組立競争の場ではなく、部品とインフラの機会として捉える好機かもしれない—日本のエンジニアリング優位性がより防衛可能な高付加価値バッテリー管理、充電技術、リサイクルへのピボットである。

最も危険な道は中間地帯である：意味のある競争には小さすぎるが、償却するには大きすぎる漸進的投資。市場は決定的な行動—コミットした拡大か戦略的再ポジショニングか—に報いる。

どの道を選ぶにせよ、決定のタイムラインは圧縮されている。上記で概説した構造的動態は安定化ではなく加速している。明確さを待つこと自体が戦略的選択であり—ますます競合他社を有利にする選択である。`
      }
    },
    // Data Appendix
    dataAppendix: {
      title: { en: "Data Appendix", ja: "データ付録" },
      tables: {
        investmentTimeline: {
          title: { en: "Major EV Investment Timeline (2022-2025)", ja: "主要EV投資タイムライン（2022-2025）" },
          data: [
            { year: "2022", company: "BYD", type: isJapanese ? "EV組立工場" : "EV Assembly Plant", value: "$500M", status: isJapanese ? "稼働中" : "Operational" },
            { year: "2023", company: "Great Wall", type: isJapanese ? "EV・バッテリー" : "EV + Battery", value: "$770M", status: isJapanese ? "稼働中" : "Operational" },
            { year: "2023", company: "CATL", type: isJapanese ? "バッテリーパック" : "Battery Pack", value: "$120M", status: isJapanese ? "計画中" : "Planned" },
            { year: "2024", company: "Foxconn", type: isJapanese ? "EV製造" : "EV Manufacturing", value: "$1.0B", status: isJapanese ? "建設中" : "Under Construction" },
            { year: "2024", company: "BYD Phase 2", type: isJapanese ? "バッテリーセル" : "Battery Cell", value: "$200M", status: isJapanese ? "計画中" : "Planned" },
            { year: "2025", company: "Toyota EV", type: isJapanese ? "BEV生産" : "BEV Production", value: "TBD", status: isJapanese ? "発表済" : "Announced" }
          ]
        }
      }
    },
    sources: {
      title: { en: "Sources & Methodology", ja: "出典・方法論" },
      list: {
        en: [
          "Thailand Board of Investment (BOI) — Official Investment Statistics & Promotion Packages (2024)",
          "Ministry of Industry, Thailand — 30@30 ZEV Policy Documents (2023)",
          "Eastern Economic Corridor (EEC) Office — Zone Development Reports (Q3 2024)",
          "Office of Industrial Economics (OIE) — Vehicle Registration Statistics (2024)",
          "J.D. Power Thailand — Consumer EV Preference Survey (2024)",
          "Federation of Thai Industries — Automotive Industry Updates",
          "WaLens Field Research — Executive Interviews & Site Visits (Q4 2024)"
        ],
        ja: [
          "タイ投資委員会（BOI）— 公式投資統計・振興パッケージ（2024年）",
          "タイ工業省 — 30@30 ZEV政策文書（2023年）",
          "東部経済回廊（EEC）事務局 — ゾーン開発レポート（2024年Q3）",
          "工業経済局（OIE）— 車両登録統計（2024年）",
          "J.D.Powerタイ — 消費者EV選好調査（2024年）",
          "タイ産業連盟 — 自動車産業アップデート",
          "WaLensフィールドリサーチ — 経営幹部インタビュー・現地視察（2024年Q4）"
        ]
      }
    },
    disclaimer: {
      en: "This report is prepared by WaLens for informational purposes only. The analysis and opinions expressed are those of WaLens and do not constitute investment advice, legal advice, or recommendation to take any specific action. All data from third-party sources is attributed and should be verified independently. © 2025 WaLens. All rights reserved. This report is for the exclusive use of the subscriber and may not be redistributed without permission.",
      ja: "本レポートはWaLensが情報提供のみを目的として作成したものです。表明された分析および意見はWaLensのものであり、投資アドバイス、法的アドバイス、または特定の行動を取ることの推奨を構成するものではありません。第三者ソースからのすべてのデータは帰属表示され、独立して検証されるべきです。© 2025 WaLens. 無断転載禁止。本レポートは購読者専用であり、許可なく再配布することはできません。"
    }
  };

  // Build report content for PDF
  const buildReportContent = () => {
    return {
      title: isJapanese ? 'タイEV・バッテリー産業レポート' : 'Thailand EV & Battery Industry Report',
      category: isJapanese ? content.category.ja : content.category.en,
      lastUpdated: content.lastUpdated,
      executiveSummary: isJapanese ? content.executiveSummary.ja : content.executiveSummary.en,
      sections: [
        { title: isJapanese ? 'エグゼクティブサマリー' : 'Executive Summary', content: (isJapanese ? content.executiveSummary.ja : content.executiveSummary.en).join('\n\n') }
      ],
      sources: isJapanese ? content.sources.list.ja : content.sources.list.en,
      disclaimer: isJapanese ? content.disclaimer.ja : content.disclaimer.en
    };
  };

  // Blurred content wrapper for non-premium users
  const BlurredContent = ({ children }: { children: React.ReactNode }) => (
    <div className="relative">
      <div className="blur-sm pointer-events-none select-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-background/80">
        <Card className="p-6 text-center max-w-md">
          <Lock className="h-10 w-10 text-amber-500 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">
            {isJapanese ? "プレミアム会員限定コンテンツ" : "Premium Content"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {isJapanese 
              ? "この詳細分析はプレミアム会員専用です" 
              : "This detailed analysis is available to Premium members"}
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => setIsLoginOpen(true)} variant="outline" size="sm">
              {isJapanese ? "ログイン" : "Sign In"}
            </Button>
            <Button asChild size="sm">
              <Link to="/subscribe">
                {isJapanese ? "プレミアムに登録" : "Subscribe"}
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  // Premium CTA component
  const PremiumCTA = () => (
    <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-transparent my-8">
      <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Crown className="h-8 w-8 text-amber-500" />
          <div>
            <h3 className="font-bold">
              {isJapanese ? "完全版レポートにアクセス" : "Access the Full Report"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isJapanese 
                ? "詳細分析、データ付録、戦略的示唆をご覧いただけます" 
                : "View detailed analysis, data appendix, and strategic insights"}
            </p>
          </div>
        </div>
        <Button asChild className="bg-amber-500 hover:bg-amber-600">
          <Link to="/subscribe">
            {isJapanese ? "今すぐ登録" : "Subscribe Now"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );

  // Handle modal switches
  const handleSwitchToLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  const handleSwitchToSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  return (
    <>
      <SEO 
        title={isJapanese ? "タイEV・バッテリー産業レポート | WaLens" : "Thailand EV & Battery Industry Report | WaLens"}
        description={isJapanese 
          ? "タイのEV・バッテリー産業に関する詳細な分析レポート。市場構造、政策動向、日本企業への戦略的示唆を提供。"
          : "Comprehensive analysis of Thailand's EV & battery industry. Market structure, policy trends, and strategic implications for Japanese companies."
        }
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6 md:py-12 max-w-4xl">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb 
              items={[
                { label: isJapanese ? "インサイト" : "Insights", href: "/insights" },
                { label: isJapanese ? "製造業" : "Manufacturing", href: "/insights/manufacturing" },
                { label: isJapanese ? "EV・バッテリー" : "EV & Battery" }
              ]}
            />
          </div>

          {/* Hero Section */}
          <section className="mb-8 md:mb-12">
            {/* Hero Image */}
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img 
                src={heroImage} 
                alt={isJapanese ? "タイEV産業" : "Thailand EV Industry"}
                className="w-full h-48 md:h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex gap-2 mb-2">
                  <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                  <Badge variant="secondary">
                    {isJapanese ? content.category.ja : content.category.en}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3">
              {isJapanese ? content.headline.ja : content.headline.en}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {isJapanese ? content.subheadline.ja : content.subheadline.en}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                {isJapanese ? "最終更新" : "Last Updated"}: {content.lastUpdated}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {isJapanese ? "読了時間：10分" : "10 min read"}
              </span>
            </div>

          </section>

          {/* Table of Contents */}
          <section id="table-of-contents" className="mb-8 md:mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="h-5 w-5" />
                  {isJapanese ? "目次" : "Table of Contents"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-1">
                  {tocSections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="w-full text-left flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <span className="text-primary font-mono text-sm">{String(index + 1).padStart(2, '0')}</span>
                      <span className="flex-1">{section.label}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </section>

          {/* Executive Summary */}
          <section id="executive-summary" className="mb-8 md:mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                  <Zap className="h-6 w-6 text-primary" />
                  {isJapanese ? "エグゼクティブサマリー" : "Executive Summary"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {(isJapanese ? content.executiveSummary.ja : content.executiveSummary.en).map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Premium CTA after Executive Summary */}
          {!hasFullAccess && <PremiumCTA />}

          {/* Facts Section */}
          <section id="facts" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
              <Database className="h-6 w-6" />
              {isJapanese ? "ファクト：市場・政策・動向" : "Facts: Market, Policy & Trends"}
            </h2>

            {hasFullAccess ? (
              <div className="space-y-6">
                {/* Market Structure */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Factory className="h-5 w-5" />
                      {isJapanese ? content.marketStructure.title.ja : content.marketStructure.title.en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(isJapanese ? content.marketStructure.segments.ja : content.marketStructure.segments.en).map((seg, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium">{seg.name}</p>
                            <p className="text-sm text-muted-foreground">{seg.players}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{seg.share}</p>
                            <p className="text-sm text-green-600">{seg.growth}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Key Players */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      {isJapanese ? content.keyPlayers.title.ja : content.keyPlayers.title.en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(isJapanese ? content.keyPlayers.data.ja : content.keyPlayers.data.en).map((player, i) => (
                        <div key={i} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-medium">{player.segment}</p>
                            <Badge variant="outline" className="text-xs">{player.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{player.examples}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Policy & Regulation */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {isJapanese ? content.policyInsights.title.ja : content.policyInsights.title.en}
                  </h3>
                  <div className="space-y-4">
                    {(isJapanese ? content.policyInsights.items.ja : content.policyInsights.items.en).map((item, i) => (
                      <Card key={i}>
                        <CardContent className="p-4">
                          <h4 className="font-bold mb-2">{item.policy}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{item.content}</p>
                          <p className="text-xs text-muted-foreground italic">
                            {isJapanese ? "出典" : "Source"}: {item.citation}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Opportunities & Risks */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-green-200 dark:border-green-900">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400 text-lg">
                        <TrendingUp className="h-5 w-5" />
                        {isJapanese ? "機会" : "Opportunities"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {(isJapanese ? content.opportunities.ja : content.opportunities.en).map((item, i) => (
                          <li key={i} className="flex gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 dark:border-red-900">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400 text-lg">
                        <TrendingDown className="h-5 w-5" />
                        {isJapanese ? "リスク" : "Risks"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {(isJapanese ? content.risks.ja : content.risks.en).map((item, i) => (
                          <li key={i} className="flex gap-2 text-sm">
                            <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <BlurredContent>
                <div className="space-y-6">
                  <Card className="h-64" />
                  <Card className="h-48" />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="h-48" />
                    <Card className="h-48" />
                  </div>
                </div>
              </BlurredContent>
            )}
          </section>

          {/* Opinion & Implication Section */}
          <section id="opinion" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6" />
              {isJapanese ? content.opinion.title.ja : content.opinion.title.en}
            </h2>
            
            {hasFullAccess ? (
              <div className="space-y-6">
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground italic">
                      {isJapanese ? content.opinion.intro.ja : content.opinion.intro.en}
                    </p>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {(isJapanese ? content.opinion.points.ja : content.opinion.points.en).map((point, i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                          <span className="text-primary font-mono">{String(i + 1).padStart(2, '0')}</span>
                          {point.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">{point.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <BlurredContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="h-32" />
                  ))}
                </div>
              </BlurredContent>
            )}
          </section>

          {/* Recommendation Section */}
          <section id="recommendation" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              {isJapanese ? content.recommendation.title.ja : content.recommendation.title.en}
            </h2>
            
            {hasFullAccess ? (
              <Card className="border-primary/30">
                <CardContent className="p-6 md:p-8">
                  <p className="text-sm text-muted-foreground mb-6 italic">
                    {isJapanese ? content.recommendation.intro.ja : content.recommendation.intro.en}
                  </p>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {(isJapanese ? content.recommendation.content.ja : content.recommendation.content.en).split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <BlurredContent>
                <Card className="h-64" />
              </BlurredContent>
            )}
          </section>

          {/* Further Inquiry Notice */}
          <FurtherInquiryNotice className="mb-8 md:mb-12" />

          {/* Sources */}
          <section id="sources" className="mb-8 md:mb-12">
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">
                  {isJapanese ? content.sources.title.ja : content.sources.title.en}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {(isJapanese ? content.sources.list.ja : content.sources.list.en).map((source, i) => (
                    <li key={i}>• {source}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Copyright Disclaimer */}
          <Separator className="my-6" />
          
          <section className="mb-8">
            <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto">
              {isJapanese ? content.disclaimer.ja : content.disclaimer.en}
            </p>
          </section>
        </main>

        <Footer />

        {/* Floating Navigation Button */}
        <FloatingNavButton onClick={scrollToTOC} />
      </div>

      <AuthModals
        isLoginOpen={isLoginOpen}
        isSignUpOpen={isSignUpOpen}
        onLoginClose={() => setIsLoginOpen(false)}
        onSignUpClose={() => setIsSignUpOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
    </>
  );
};

export default EVBatteryIndustry;
