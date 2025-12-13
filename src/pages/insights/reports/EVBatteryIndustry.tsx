import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import SEO from '@/components/SEO';
import { useI18n } from '@/i18n/I18nProvider';
import { useAuth } from '@/contexts/AuthContext';
import { usePaywall } from '@/hooks/usePaywall';
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
  Globe,
  BookOpen,
  Lock
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { PdfDownloadButton } from '@/components/insights/PdfDownloadButton';

const EVBatteryIndustry = () => {
  const { lang } = useI18n();
  const { user } = useAuth();
  const { canViewArticle } = usePaywall();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const access = canViewArticle('premium');
  const hasFullAccess = access.canViewFull;

  const isJapanese = lang === 'ja';

  const content = {
    title: {
      en: "Thailand EV & Battery Industry Intelligence Report",
      ja: "タイEV・バッテリー産業 インテリジェンスレポート"
    },
    category: {
      en: "Manufacturing / Electric Vehicles",
      ja: "製造業 / 電気自動車"
    },
    lastUpdated: "2025-01-10",
    sourceOrgs: {
      en: ["Board of Investment (BOI)", "Ministry of Industry", "Eastern Economic Corridor Office", "Federation of Thai Industries"],
      ja: ["タイ投資委員会（BOI）", "工業省", "東部経済回廊事務局", "タイ産業連盟"]
    },
    executiveSummary: {
      en: [
        "Thailand is positioning itself as the regional hub for EV and battery manufacturing, with over $15 billion in committed investments through 2027.",
        "Japanese automakers face strategic pressure: BOI incentives favor new entrants (Chinese, Korean), potentially eroding traditional market dominance.",
        "Battery cell localization requirements (40% by 2027) create both supply chain risks and partnership opportunities for Japanese trading companies.",
        "The policy environment is highly favorable but execution gaps remain—permit delays and workforce readiness are key operational risks.",
        "First-mover advantage in charging infrastructure and battery recycling represents untapped strategic opportunity."
      ],
      ja: [
        "タイは2027年までに150億ドル以上の投資コミットメントを背景に、EV・バッテリー製造の地域ハブとしての地位を確立しつつある。",
        "日系自動車メーカーは戦略的プレッシャーに直面：BOI優遇措置は新規参入者（中国系・韓国系）に有利であり、従来の市場支配力が揺らぐ可能性がある。",
        "バッテリーセルの現地化要件（2027年までに40%）は、日系商社にとってサプライチェーンリスクであると同時にパートナーシップ機会でもある。",
        "政策環境は極めて良好だが実行面でのギャップが残る—許認可の遅延と人材の準備状況が主要なオペレーショナルリスク。",
        "充電インフラとバッテリーリサイクルにおける先行者利益は、未開拓の戦略的機会として存在する。"
      ]
    },
    marketStructure: {
      title: { en: "Market Structure & Value Chain", ja: "市場構造とバリューチェーン" },
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
      title: { en: "Key Players by Segment", ja: "セグメント別主要プレイヤー" },
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
    policyInsights: {
      title: { en: "Policy & Regulation Insights", ja: "政策・規制インサイト" },
      items: {
        en: [
          {
            policy: "BOI EV Package 3.5",
            official: "8-year corporate income tax exemption for EV assembly, 10-year for battery cells",
            practical: "Chinese entrants have secured most allocations. Japanese applications face longer review cycles. Early 2025 application recommended."
          },
          {
            policy: "30@30 Policy",
            official: "30% ZEV production by 2030",
            practical: "Implicitly favors BEV over HEV. Japanese hybrid strategy may face regulatory headwinds post-2027."
          },
          {
            policy: "Local Content Requirements",
            official: "40% battery cell localization by 2027",
            practical: "Creates forced partnership opportunities. Japanese trading houses should position for supplier matching role."
          },
          {
            policy: "EEC Special Incentives",
            official: "Additional 50% reduction on land rental, 90-day visa for skilled workers",
            practical: "Rayong and Chonburi zones are nearly full. Chachoengsao offers better land availability but weaker logistics."
          }
        ],
        ja: [
          {
            policy: "BOI EVパッケージ3.5",
            official: "EV組立に8年間の法人税免除、バッテリーセルには10年間",
            practical: "中国系参入者が大半の枠を確保済み。日本企業の申請は審査期間が長期化傾向。2025年初頭の申請を推奨。"
          },
          {
            policy: "30@30政策",
            official: "2030年までにZEV生産30%",
            practical: "暗黙的にBEVがHEVより有利。日系のハイブリッド戦略は2027年以降に規制上の逆風を受ける可能性。"
          },
          {
            policy: "現地調達要件",
            official: "2027年までにバッテリーセル40%の現地化",
            practical: "強制的なパートナーシップ機会を創出。日系商社はサプライヤーマッチング役として位置づけるべき。"
          },
          {
            policy: "EEC特別優遇",
            official: "土地賃借料50%追加削減、熟練労働者向け90日ビザ",
            practical: "ラヨーン・チョンブリ地区はほぼ満杯。チャチューンサオは土地供給に余裕があるが物流面で劣る。"
          }
        ]
      }
    },
    opportunities: {
      title: { en: "Opportunities", ja: "機会" },
      items: {
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
      }
    },
    risks: {
      title: { en: "Risks", ja: "リスク" },
      items: {
        en: [
          "Market share erosion: Chinese EVs gaining consumer preference rapidly",
          "Technology mismatch: Thai EV ecosystem optimizing for BEV, not HEV",
          "Talent competition: Salary expectations rising 20-30% annually in EV sector",
          "Policy uncertainty: Potential incentive revisions post-2025 election",
          "Supply chain concentration: Over-reliance on Chinese battery cell supply"
        ],
        ja: [
          "市場シェア浸食：中国製EVが消費者選好を急速に獲得",
          "技術ミスマッチ：タイEVエコシステムはHEVでなくBEV最適化へ進行",
          "人材獲得競争：EV分野の給与期待値が年率20-30%上昇",
          "政策不確実性：2025年選挙後の優遇措置見直しの可能性",
          "サプライチェーン集中リスク：中国製バッテリーセルへの過度な依存"
        ]
      }
    },
    strategicImplications: {
      title: { en: "Strategic Implications by WaLens", ja: "WaLensによる戦略的示唆" },
      mistakes: {
        title: { en: "Common Mistakes by Japanese HQ", ja: "日本本社がよく犯す誤り" },
        items: {
          en: [
            "Applying domestic market timelines to Thailand EV transition (market is moving 2x faster)",
            "Assuming traditional dealer networks will adapt—new EV players are building direct-to-consumer models",
            "Underestimating Chinese competitors' local decision-making speed",
            "Over-engineering products for price-sensitive market segment",
            "Treating Thailand as 'single market' instead of ASEAN gateway"
          ],
          ja: [
            "日本市場のタイムラインをタイEV転換に適用（市場は2倍速で進行）",
            "従来のディーラーネットワークが適応すると仮定—新規EVプレイヤーはD2Cモデルを構築中",
            "中国系競合の現地意思決定スピードを過小評価",
            "価格感応度の高い市場セグメントに対する過剰品質設計",
            "タイを「単一市場」として扱い、ASEANゲートウェイとして認識していない"
          ]
        }
      },
      options: {
        title: { en: "Strategic Options", ja: "戦略オプション" },
        items: {
          en: [
            { option: "Accelerated Electrification", description: "Fast-track BEV development, accept margin compression, defend market share" },
            { option: "Ecosystem Pivot", description: "Exit assembly competition, focus on high-value components, battery, and infrastructure" },
            { option: "Partnership Strategy", description: "Form JVs with Chinese battery makers or Thai conglomerates for local production" },
            { option: "Niche Specialization", description: "Focus on commercial vehicles, trucks, and specialty segments where Japanese brands retain advantage" }
          ],
          ja: [
            { option: "電動化加速", description: "BEV開発を前倒し、利益率圧縮を許容、市場シェア防衛" },
            { option: "エコシステム転換", description: "組立競争から撤退、高付加価値部品・バッテリー・インフラに集中" },
            { option: "パートナーシップ戦略", description: "中国系バッテリーメーカーまたはタイ財閥とのJV形成で現地生産体制構築" },
            { option: "ニッチ特化", description: "日系ブランドが優位性を維持する商用車・トラック・特殊用途セグメントに集中" }
          ]
        }
      }
    },
    sources: {
      title: { en: "Sources & Methodology", ja: "出典・調査手法" },
      list: {
        en: [
          "Board of Investment Thailand (BOI) - Investment statistics and policy documents (2024)",
          "Eastern Economic Corridor Office - EEC development reports and zone data",
          "Ministry of Industry Thailand - Industrial production statistics",
          "Federation of Thai Industries - Industry surveys and member data",
          "Bank of Thailand - Import/export statistics for automotive sector",
          "WaLens primary research - Interviews with industry executives and policymakers (Q4 2024)"
        ],
        ja: [
          "タイ投資委員会（BOI）- 投資統計および政策文書（2024年）",
          "東部経済回廊事務局 - EEC開発レポートおよびゾーンデータ",
          "タイ工業省 - 工業生産統計",
          "タイ産業連盟 - 産業調査および会員データ",
          "タイ中央銀行 - 自動車セクター輸出入統計",
          "WaLens独自調査 - 業界幹部・政策担当者インタビュー（2024年第4四半期）"
        ]
      }
    },
    disclaimer: {
      en: "© 2025 WaLens Co., Ltd. All rights reserved. This report contains proprietary analysis and is intended for the exclusive use of authorized subscribers. Redistribution, reproduction, or commercial use without prior written consent is strictly prohibited. Information is provided 'as-is' without warranty. WaLens is not responsible for decisions made based on this content.",
      ja: "© 2025 WaLens株式会社 無断転載・複製・商業利用禁止。本レポートは独自分析を含み、正規購読者のみを対象としています。事前の書面による同意なく再配布・複製・商業利用することは固く禁じられています。情報は「現状のまま」提供され、保証はありません。WaLensは本コンテンツに基づく意思決定について責任を負いません。"
    }
  };

  // Build report content for PDF generation
  const buildReportContent = () => ({
    title: isJapanese ? content.title.ja : content.title.en,
    category: isJapanese ? content.category.ja : content.category.en,
    lastUpdated: content.lastUpdated,
    executiveSummary: isJapanese ? content.executiveSummary.ja : content.executiveSummary.en,
    sections: [
      {
        title: isJapanese ? content.marketStructure.title.ja : content.marketStructure.title.en,
        content: (isJapanese ? content.marketStructure.segments.ja : content.marketStructure.segments.en)
          .map(s => `<strong>${s.name}</strong>: ${s.share} (${s.growth}) - ${s.players}`).join('<br>')
      },
      {
        title: isJapanese ? content.keyPlayers.title.ja : content.keyPlayers.title.en,
        content: (isJapanese ? content.keyPlayers.data.ja : content.keyPlayers.data.en)
          .map(p => `<strong>${p.segment}</strong>: ${p.examples} (${p.status})`).join('<br>')
      },
      {
        title: isJapanese ? content.policyInsights.title.ja : content.policyInsights.title.en,
        content: (isJapanese ? content.policyInsights.items.ja : content.policyInsights.items.en)
          .map(p => `<strong>${p.policy}</strong><br>${isJapanese ? '公式' : 'Official'}: ${p.official}<br>${isJapanese ? '実務的示唆' : 'Practical'}: ${p.practical}`).join('<br><br>')
      },
      {
        title: isJapanese ? content.opportunities.title.ja : content.opportunities.title.en,
        content: (isJapanese ? content.opportunities.items.ja : content.opportunities.items.en)
          .map((item, i) => `${i + 1}. ${item}`).join('<br>')
      },
      {
        title: isJapanese ? content.risks.title.ja : content.risks.title.en,
        content: (isJapanese ? content.risks.items.ja : content.risks.items.en)
          .map((item, i) => `${i + 1}. ${item}`).join('<br>')
      },
      {
        title: isJapanese ? content.strategicImplications.title.ja : content.strategicImplications.title.en,
        content: `<strong>${isJapanese ? content.strategicImplications.mistakes.title.ja : content.strategicImplications.mistakes.title.en}</strong><br>` +
          (isJapanese ? content.strategicImplications.mistakes.items.ja : content.strategicImplications.mistakes.items.en)
            .map((item, i) => `${i + 1}. ${item}`).join('<br>') +
          `<br><br><strong>${isJapanese ? content.strategicImplications.options.title.ja : content.strategicImplications.options.title.en}</strong><br>` +
          (isJapanese ? content.strategicImplications.options.items.ja : content.strategicImplications.options.items.en)
            .map(o => `<strong>${o.option}</strong>: ${o.description}`).join('<br>')
      }
    ],
    sources: isJapanese ? content.sources.list.ja : content.sources.list.en,
    disclaimer: isJapanese ? content.disclaimer.ja : content.disclaimer.en,
  });

  const handleSwitchToLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  const handleSwitchToSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  const BlurredContent = ({ children }: { children: React.ReactNode }) => (
    <div className="relative">
      <div className="blur-sm pointer-events-none select-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg">
        <Card className="max-w-md mx-4">
          <CardContent className="p-6 text-center">
            <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">
              {isJapanese ? "プレミアム会員限定コンテンツ" : "Premium Members Only"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isJapanese 
                ? "このセクションの閲覧にはプレミアムプランへの登録が必要です。" 
                : "Access to this section requires a Premium subscription."}
            </p>
            <div className="flex flex-col gap-2">
              {!user ? (
                <>
                  <Button onClick={() => setIsLoginOpen(true)}>
                    {isJapanese ? "ログイン" : "Login"}
                  </Button>
                  <Button variant="outline" onClick={() => setIsSignUpOpen(true)}>
                    {isJapanese ? "無料トライアルを開始" : "Start Free Trial"}
                  </Button>
                </>
              ) : (
                <Button asChild>
                  <Link to="/subscribe">
                    {isJapanese ? "プランをアップグレード" : "Upgrade Plan"}
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title={isJapanese ? content.title.ja : content.title.en}
        description={isJapanese 
          ? "タイEV・バッテリー産業の包括的インテリジェンスレポート。日本企業向け戦略的示唆を提供。" 
          : "Comprehensive intelligence report on Thailand's EV and battery industry with strategic implications for Japanese companies."}
        canonicalPath="/insights/manufacturing/ev-battery"
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <Breadcrumb items={[
            { label: isJapanese ? 'インサイト' : 'Insights', href: '/insights' },
            { label: isJapanese ? '製造業' : 'Manufacturing', href: '/insights/manufacturing' },
            { label: isJapanese ? 'EV・バッテリー産業' : 'EV & Battery Industry' }
          ]} />

          {/* Cover Section */}
          <section className="mb-12 mt-8">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-background to-primary/5 border p-8 md:p-12">
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                  {isJapanese ? "プレミアム" : "Premium"}
                </Badge>
                <Badge variant="outline">
                  <FileText className="h-3 w-3 mr-1" />
                  {isJapanese ? "インサイトレポート" : "Insight Report"}
                </Badge>
              </div>
              
              <div className="max-w-3xl">
                <p className="text-sm text-muted-foreground mb-2">
                  {isJapanese ? content.category.ja : content.category.en}
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {isJapanese ? content.title.ja : content.title.en}
                </h1>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-6">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {isJapanese ? "最終更新" : "Last Updated"}: {content.lastUpdated}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    {(isJapanese ? content.sourceOrgs.ja : content.sourceOrgs.en).slice(0, 2).join(", ")}
                  </span>
                </div>

                <div className="mt-6">
                  <PdfDownloadButton 
                    reportId="ev-battery-industry"
                    reportContent={buildReportContent()}
                    onLoginRequired={() => setIsLoginOpen(true)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Executive Summary - Always visible */}
          <section className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  {isJapanese ? "エグゼクティブサマリー" : "Executive Summary"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
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

          {/* Industry Snapshot */}
          {hasFullAccess ? (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Factory className="h-6 w-6" />
                {isJapanese ? content.marketStructure.title.ja : content.marketStructure.title.en}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isJapanese ? "市場セグメント" : "Market Segments"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
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

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isJapanese ? content.keyPlayers.title.ja : content.keyPlayers.title.en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
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
              </div>
            </section>
          ) : (
            <BlurredContent>
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">
                  {isJapanese ? content.marketStructure.title.ja : content.marketStructure.title.en}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="h-64" />
                  <Card className="h-64" />
                </div>
              </section>
            </BlurredContent>
          )}

          {/* Policy & Regulation */}
          {hasFullAccess ? (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                {isJapanese ? content.policyInsights.title.ja : content.policyInsights.title.en}
              </h2>
              
              <div className="space-y-4">
                {(isJapanese ? content.policyInsights.items.ja : content.policyInsights.items.en).map((item, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-3">{item.policy}</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            {isJapanese ? "公式内容" : "Official Statement"}
                          </p>
                          <p className="text-sm">{item.official}</p>
                        </div>
                        <div className="bg-primary/5 p-3 rounded-lg">
                          <p className="text-sm font-medium text-primary mb-1">
                            {isJapanese ? "実務上の解釈" : "Practical Interpretation"}
                          </p>
                          <p className="text-sm">{item.practical}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ) : (
            <BlurredContent>
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">
                  {isJapanese ? content.policyInsights.title.ja : content.policyInsights.title.en}
                </h2>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="h-32" />
                  ))}
                </div>
              </section>
            </BlurredContent>
          )}

          {/* Opportunities & Risks */}
          {hasFullAccess ? (
            <section className="mb-12">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-green-200 dark:border-green-900">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <TrendingUp className="h-5 w-5" />
                      {isJapanese ? content.opportunities.title.ja : content.opportunities.title.en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(isJapanese ? content.opportunities.items.ja : content.opportunities.items.en).map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-red-200 dark:border-red-900">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                      <TrendingDown className="h-5 w-5" />
                      {isJapanese ? content.risks.title.ja : content.risks.title.en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(isJapanese ? content.risks.items.ja : content.risks.items.en).map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
          ) : (
            <BlurredContent>
              <section className="mb-12">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="h-64" />
                  <Card className="h-64" />
                </div>
              </section>
            </BlurredContent>
          )}

          {/* Strategic Implications */}
          {hasFullAccess ? (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Globe className="h-6 w-6" />
                {isJapanese ? content.strategicImplications.title.ja : content.strategicImplications.title.en}
              </h2>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-amber-200 dark:border-amber-900">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                      <AlertTriangle className="h-5 w-5" />
                      {isJapanese ? content.strategicImplications.mistakes.title.ja : content.strategicImplications.mistakes.title.en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(isJapanese ? content.strategicImplications.mistakes.items.ja : content.strategicImplications.mistakes.items.en).map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm">
                          <span className="text-amber-600 font-bold">{i + 1}.</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isJapanese ? content.strategicImplications.options.title.ja : content.strategicImplications.options.title.en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(isJapanese ? content.strategicImplications.options.items.ja : content.strategicImplications.options.items.en).map((item, i) => (
                        <div key={i} className="p-3 bg-muted/50 rounded-lg">
                          <p className="font-semibold text-primary">{item.option}</p>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          ) : (
            <BlurredContent>
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">
                  {isJapanese ? content.strategicImplications.title.ja : content.strategicImplications.title.en}
                </h2>
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="h-64" />
                  <Card className="h-64" />
                </div>
              </section>
            </BlurredContent>
          )}

          {/* Sources & Methodology */}
          <section className="mb-12">
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
          <Separator className="my-8" />
          
          <section className="mb-12">
            <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto">
              {isJapanese ? content.disclaimer.ja : content.disclaimer.en}
            </p>
          </section>
        </main>

        <Footer />
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
