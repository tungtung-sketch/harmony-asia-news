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
  Database,
  Globe,
  Heart,
  Home,
  GraduationCap,
  Utensils,
  Users
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';

// Reuse existing hero image
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const ThailandMarketStrategy = () => {
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
        'thailand-market-strategy',
        isJapanese ? 'タイ市場開拓：日本企業の新戦略' : 'Thailand Market Development: New Strategies for Japanese Companies',
        'cross-industry',
        lang
      );
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker('thailand-market-strategy', 'Thailand Market Development: New Strategies for Japanese Companies', 'タイ市場開拓：日本企業の新戦略', 'Strategy', hasFullAccess);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(
        'thailand-market-strategy',
        isJapanese ? 'タイ市場開拓：日本企業の新戦略' : 'Thailand Market Development: New Strategies for Japanese Companies',
        'cross-industry',
        lang
      );
    }
  };

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

  // Table of Contents — same 5-section template
  const tocSections = [
    { id: 'executive-summary', label: isJapanese ? 'エグゼクティブサマリー' : 'Executive Summary' },
    { id: 'facts', label: isJapanese ? 'ファクト（市場・政策・動向）' : 'Facts (Market, Policy & Trends)' },
    { id: 'opinion', label: isJapanese ? 'WaLensの見解と示唆' : 'Opinion & Implication from WaLens' },
    { id: 'recommendation', label: isJapanese ? '日本企業経営者への提言' : 'Recommendation for Japanese Executives' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: {
      // (Doc: タイトル)
      en: "Can Japanese Companies Reinvent Their Thailand Strategy for 2025?",
      ja: "日本企業はタイ市場戦略を再定義できるか？ ——第三国市場ハブと社会課題解決型市場への転換"
    },
    subheadline: {
      // (Doc: エグゼクティブサマリー冒頭)
      en: "From low-cost manufacturing base to CLMV gateway and social-issue-solving market — the paradigm shift Japanese executives must navigate",
      ja: "安価な製造拠点からCLMVゲートウェイ・社会課題解決型市場へ——日本企業経営者が直面するパラダイムシフト"
    },
    category: {
      en: "Cross-Industry / Thailand Strategy",
      ja: "クロスインダストリー / タイ戦略"
    },
    lastUpdated: "2026-02-04",

    // ── Executive Summary ──
    // (Doc: エグゼクティブサマリー)
    executiveSummary: {
      en: [
        "Thailand is at a historic turning point in 2025, undergoing a fundamental transformation from a low-cost manufacturing base to a social-issue-solving market and a third-country market hub for CLMV nations. (Doc: Executive Summary)",
        "Three irreversible megatrends — super-aging society, rapid urbanization, and Industry 4.0 — are reshaping Thailand's economic landscape. GDP growth is projected at 1.8–2.3% for 2025, signaling a mature, stable-growth phase. (Doc: §1.1–1.2)",
        "Five strategic industries present the highest monetization potential for Japanese expertise: (1) Elderly Care, (2) Smart Home, (3) Future Food, (4) Advanced Electronics/EV, and (5) Education & Workforce Development. (Doc: Executive Summary)",
        "Thailand's IBC (International Business Center) regime offers corporate tax rates as low as 3% and flat 15% personal income tax for expatriate staff, making it a cost-competitive alternative to Singapore for ASEAN regional headquarters. (Doc: §2.2)",
        "Japanese companies must shift from hardware-centric sales to solution-oriented service models — leveraging their 'social-issue-advanced-nation' know-how — before Chinese competitors capture these emerging markets. (Doc: Executive Summary)"
      ],
      ja: [
        "2025年、タイは安価な製造拠点から「社会課題解決型市場」および「CLMV第三国市場ハブ」への歴史的転換点に立っている。（Doc: エグゼクティブサマリー）",
        "「超高齢社会化」「急速な都市化」「産業高度化（タイランド4.0）」の3つの不可逆的メガトレンドがタイ経済を再編。2025年のGDP成長率は1.8〜2.3%と予測され、成熟安定成長期に突入。（Doc: §1.1–1.2）",
        "日本企業の技術・ノウハウが最も高く評価される5つの戦略産業：(1) 高齢者ケア、(2) スマートホーム、(3) 次世代食品、(4) 高度エレクトロニクス・EV、(5) 教育・人材育成。（Doc: エグゼクティブサマリー）",
        "タイIBC（国際ビジネスセンター）制度は、法人税率最低3%、駐在員個人所得税一律15%を提供し、シンガポールに代わるASEAN地域統括拠点としてのコスト競争力を持つ。（Doc: §2.2）",
        "日本企業はハードウェア売り切りからソリューション型サービスモデルへの転換が急務——「課題先進国」の知見を活かし、中国企業に先んじてこれらの新興市場を確保すべきである。（Doc: エグゼクティブサマリー）"
      ]
    },

    // ── Facts: Market Structure ──
    // (Doc: §1.1 経済概況、§3–7各章)
    marketStructure: {
      title: { en: "Strategic Industry Segments", ja: "戦略的産業セグメント" },
      segments: {
        en: [
          { name: "Elderly Care", share: "$9.6B (2024)", growth: "CAGR ~10%", players: "Sena Hankyu Hanshin, Origin-Samitivej, Thai hospitals (Doc: §3.1)" },
          { name: "Smart Home", share: "$1.8B (2024)", growth: "CAGR 26.8%", players: "Panasonic, Daikin, KDDI Thailand, Xiaomi, Samsung (Doc: §4.1)" },
          { name: "Future Food", share: "฿500B target by 2027", growth: "High growth", players: "Ajinomoto, CP Group, Thai FDA-backed startups (Doc: §5.1)" },
          { name: "Advanced Electronics / EV", share: "IC exports +30% YoY", growth: "+30% YoY", players: "BYD, GWM, Japanese Tier-1s, PCB makers (Doc: §6.1–6.2)" },
          { name: "Education & EdTech", share: "$1.76B (2025)", growth: "CAGR 11.4%", players: "KOSEN model exports, Microsoft AI programs (Doc: §7.2)" }
        ],
        ja: [
          { name: "高齢者ケア", share: "96億ドル（2024年）", growth: "CAGR 約10%", players: "阪急阪神×SENA、Origin×サミティヴェート、タイ病院グループ（Doc: §3.1）" },
          { name: "スマートホーム", share: "18億ドル（2024年）", growth: "CAGR 26.8%", players: "パナソニック、ダイキン、KDDIタイランド、Xiaomi、Samsung（Doc: §4.1）" },
          { name: "次世代食品", share: "2027年5,000億バーツ目標", growth: "高成長", players: "味の素、CPグループ、タイFDA支援スタートアップ（Doc: §5.1）" },
          { name: "高度エレクトロニクス・EV", share: "IC輸出+30% YoY", growth: "+30% YoY", players: "BYD、GWM、日系Tier-1、PCBメーカー（Doc: §6.1–6.2）" },
          { name: "教育・EdTech", share: "17.6億ドル（2025年）", growth: "CAGR 11.4%", players: "高専モデル輸出、Microsoft AI人材育成（Doc: §7.2）" }
        ]
      }
    },

    // ── Facts: Key Players ──
    // (Doc: §2.2 IBC活用事例、§3.2 ケーススタディ、§5.3、§6.2)
    keyPlayers: {
      title: { en: "Key Players & Case Studies", ja: "主要プレイヤーとケーススタディ" },
      data: {
        en: [
          { segment: "Elderly Care JV", examples: "Sena Hankyu Hanshin — Wellness-integrated condominiums with care managers", status: "Operational (Doc: §3.2)" },
          { segment: "Medical-Residential", examples: "Origin Property × Samitivej Hospital — Telemedicine & rehab services in residences", status: "Operational (Doc: §3.2)" },
          { segment: "Regional HQ (IBC)", examples: "Ajinomoto — ASEAN/Africa HR & BMX strategy hub from Bangkok", status: "Expanding (Doc: §2.2)" },
          { segment: "Smart Home / IoT", examples: "KDDI Thailand, Panasonic, Daikin — IAQ & HEMS integrated solutions", status: "Growing (Doc: §4.2)" },
          { segment: "Future Food", examples: "Ajinomoto FarmAI — Cassava farm productivity + GHG reduction", status: "Pilot phase (Doc: §5.3)" }
        ],
        ja: [
          { segment: "高齢者ケアJV", examples: "阪急阪神×SENA — ケアマネ常駐・バリアフリー設計のウェルネスコンドミニアム", status: "稼働中（Doc: §3.2）" },
          { segment: "医療×住宅連携", examples: "Origin Property×サミティヴェート病院 — 遠隔医療・リハビリ支援付き住宅", status: "稼働中（Doc: §3.2）" },
          { segment: "地域統括拠点（IBC）", examples: "味の素 — バンコクからASEAN・アフリカ地域の人事・BMX戦略を主導", status: "拡大中（Doc: §2.2）" },
          { segment: "スマートホーム・IoT", examples: "KDDIタイランド、パナソニック、ダイキン — IAQ＆HEMS統合ソリューション", status: "成長中（Doc: §4.2）" },
          { segment: "次世代食品", examples: "味の素FarmAI — キャッサバ農家の生産性向上＆温室効果ガス削減", status: "パイロット段階（Doc: §5.3）" }
        ]
      }
    },

    // ── Facts: Policy & Regulation ──
    // (Doc: §1.3、§2.1–2.2、§5.2規制緩和)
    policyInsights: {
      title: { en: "Policy & Regulation", ja: "政策・規制" },
      items: {
        en: [
          { policy: "IBC (International Business Center) Regime", content: "Corporate tax as low as 3% (for ≥฿600M domestic spend), dividends/interest tax exemptions for overseas affiliates, flat 15% PIT for expat staff. Designed to attract ASEAN regional headquarters away from Singapore. (Doc: §2.2)", citation: "BOI / EY Incentives in ASEAN 2025" },
          { policy: "Thailand 4.0 & BOI Target Industries", content: "Long-term CIT exemptions (up to 8–13 years) for target sectors including elderly care, smart electronics, next-gen automotive, future food, and digital/education. EEC zones offer additional land rental reductions. (Doc: §1.2, Table 2)", citation: "BOI Investment Promotion Guide 2025" },
          { policy: "Smart City Expansion Plan", content: "depa targets 105 smart city-certified areas by 2027 (up from 37), driving demand for IoT infrastructure, smart living systems, and 5G ambulance projects. (Doc: §1.2)", citation: "depa / Nation Thailand" },
          { policy: "FDA Positive List for Functional Food", content: "Thai FDA plans to approve 150+ functional ingredients by 2027, reducing approval time/cost. Major opportunity for Japanese companies with FOSHU evidence data. (Doc: §5.3)", citation: "Thai FDA / Nation Thailand" }
        ],
        ja: [
          { policy: "IBC（国際ビジネスセンター）制度", content: "国内支出額6億バーツ以上で法人税率3%、海外関連会社への配当・利子の課税免除、駐在員個人所得税一律15%。シンガポールに代わるASEAN地域統括拠点の誘致を目的とする。（Doc: §2.2）", citation: "BOI / EY Incentives in ASEAN 2025" },
          { policy: "タイランド4.0＆BOIターゲット産業", content: "高齢者ケア、スマートエレクトロニクス、次世代自動車、未来食品、デジタル・教育等の対象セクターに最大8〜13年間の法人税免除。EEC地区は追加の土地賃借料削減も提供。（Doc: §1.2、表2）", citation: "BOI投資促進ガイド2025" },
          { policy: "スマートシティ拡大計画", content: "depaは2027年までにスマートシティ認定地域を37箇所から105箇所へ拡大。IoTインフラ、スマートリビングシステム、5G救急車プロジェクトへの需要を創出。（Doc: §1.2）", citation: "depa / Nation Thailand" },
          { policy: "FDA機能性食品ポジティブリスト", content: "タイFDAは2027年までに150以上の機能性成分を承認予定。許認可時間・コストを大幅削減。トクホのエビデンスデータを持つ日本企業に大きなチャンス。（Doc: §5.3）", citation: "タイFDA / Nation Thailand" }
        ]
      }
    },

    // ── Facts: Opportunities ──
    // (Doc: §3.3、§4.2、§5.3、§6.2、§7.2)
    opportunities: {
      en: [
        "Elderly care 'middle class' gap: Massive unmet demand between luxury and public facilities — Japan's 'prevent bedridden' care model is highly valued (Doc: §3.1–3.3)",
        "Smart home system integration: B2B with Thai developers — building-in IAQ, HEMS, security as housing infrastructure, not appliance sales (Doc: §4.2)",
        "Functional food fast-track: FDA positive list + Japanese FOSHU evidence = reduced approval barriers for health-focused food products (Doc: §5.3)",
        "PCB manufacturing hub shift: Geopolitical de-risking driving Taiwanese/Japanese PCB makers from China to Thailand — equipment & materials demand surge (Doc: §6.2)",
        "KOSEN-model education export: High demand for practical engineering education; corporate training in Kaizen, management also expanding (Doc: §7.2)"
      ],
      ja: [
        "高齢者ケア「中間層」ギャップ：富裕層向け高級施設と公的支援の間に位置する大多数向けの「適正価格で質の高いケア」が圧倒的に不足——日本の「寝たきりにさせない」介護モデルが高評価（Doc: §3.1–3.3）",
        "スマートホームのシステム統合：タイデベロッパーとのB2B連携——IAQ、HEMS、セキュリティを住宅インフラとしてビルトイン提供（Doc: §4.2）",
        "機能性食品の許認可迅速化：FDAポジティブリスト＋日本のトクホエビデンス＝承認障壁の大幅低減（Doc: §5.3）",
        "PCB製造ハブの中国からの移転：地政学的リスク回避で台湾・日系PCBメーカーがタイへシフト——製造装置・高機能材料の需要急増（Doc: §6.2）",
        "高専モデルの教育輸出：実務直結型エンジニア教育に高い需要。カイゼン・管理職研修の企業向けトレーニングも拡大中（Doc: §7.2）"
      ]
    },

    // ── Facts: Risks ──
    // (Doc: §1.1、§1.3、§6.1)
    risks: {
      en: [
        "China EV ecosystem lock-in: Chinese OEMs control 80%+ of Thailand's EV market and are building full battery-to-charging ecosystems — Japanese competitiveness further constrained (Doc: §6.1)",
        "Labor force structural decline: Aging rate crossed 20% in 2024; 'super-aged society' projected by 2033 — labor-intensive operations must migrate to CLMV (Doc: §1.2)",
        "IMF's 'four traps': US tariff impacts, geopolitical tensions, household debt, and productivity stagnation threaten macro stability (Doc: §1.1)",
        "Smart home price war: Xiaomi, Samsung, LG flooding market with cheap IoT devices — standalone appliance sales unviable for Japanese brands (Doc: §4.2)",
        "Workforce skills mismatch: ฿6.9B government budget for AI/semiconductor upskilling, but public education cannot match industry speed requirements (Doc: §7.1)"
      ],
      ja: [
        "中国EVエコシステムの囲い込み：中国OEMがタイEV市場シェア8割以上を掌握し、バッテリーから充電インフラまでのエコシステム全体を構築——日本企業の競争力がさらに制約（Doc: §6.1）",
        "労働力の構造的減少：2024年に高齢化率20%超の「完全高齢社会」に突入、2033年には「超高齢社会」移行が確実——労働集約的工程はCLMV諸国への移管が不可避（Doc: §1.2）",
        "IMFの「4つの罠」：米国関税政策の影響、地政学的緊張、家計債務問題、生産性の伸び悩みがマクロ安定性を脅かす（Doc: §1.1）",
        "スマートホームの価格競争：Xiaomi、Samsung、LGが安価なIoT家電を大量投入——日本ブランドによる単体家電販売は価格競争力なし（Doc: §4.2）",
        "人材スキルのミスマッチ：政府は69億バーツのAI・半導体スキルアップ予算を計上するも、公教育だけでは産業界が求めるスピードと質に対応不可（Doc: §7.1）"
      ]
    },

    // ── Opinion & Implication ──
    // (Doc: §1.3、§8.1 — WaLens independent interpretation)
    opinion: {
      title: { en: "WaLens Analysis: Structural Interpretation", ja: "WaLensの分析：構造的解釈" },
      intro: {
        en: "The following represents WaLens' independent analysis based on the facts presented above. These are interpretive observations, not objective data points.",
        ja: "以下は上記のファクトに基づくWaLensの独自分析です。これらは解釈的な見解であり、客観的なデータポイントではありません。"
      },
      points: {
        en: [
          {
            title: "Thailand Is No Longer a 'Factory' — It's a 'Showroom for Solutions'",
            content: "The era of Thailand as a low-cost assembly platform for Japanese companies is definitively over. Rising wages, labor shortages, and the aging society have structurally undermined the old model. However, this transformation creates a far more valuable opportunity: Thailand's social challenges (aging, urbanization, environmental degradation) are identical to what Japan has spent decades solving. The companies that recognize Thailand as a showroom to demonstrate and monetize Japan's 'issue-advanced-nation' expertise — rather than a cost center — will unlock the highest-value positioning in ASEAN. (Doc: §1.3, §8.1)"
          },
          {
            title: "The IBC Arbitrage Window Is Closing",
            content: "Thailand's IBC regime offers remarkably aggressive tax incentives — 3% CIT, 15% flat PIT for expats, dividend exemptions — that meaningfully undercut Singapore's cost structure. Yet most Japanese companies remain anchored to Singapore out of inertia. This window is finite: as more multinationals discover Thailand's IBC advantages, the competitive differentiation will erode. Early movers who establish regional treasury, R&D, and talent hubs in Bangkok will gain structural advantages that followers cannot easily replicate. (Doc: §2.2)"
          },
          {
            title: "The 'Middle-Class Care Gap' Is Japan's Strongest Moat",
            content: "Thailand's elderly care market is structurally bifurcated: luxury facilities for the wealthy and public support for the poor, with virtually nothing for the vast middle class. This is precisely the gap Japan's care industry has spent decades filling domestically. Japanese know-how in dementia care, fall-prevention, care-tech sensors, and 'prevent bedridden' methodologies has no equivalent from Chinese or Korean competitors. This is arguably the single most defensible market position available to Japanese companies in all of ASEAN. (Doc: §3.1–3.3)"
          },
          {
            title: "The CLMV Multiplier Effect Is Under-Leveraged",
            content: "Most Japanese companies still evaluate their Thai operations as standalone P&L units. This fundamentally undervalues Thailand's role as a gateway to Cambodia, Laos, Myanmar, and Vietnam. Solutions proven in Thailand — whether elderly care models, smart home systems, or food safety protocols — can be horizontally deployed across CLMV markets with minimal adaptation. Companies that design their Thailand strategy with this 'mother market + satellite markets' architecture will generate returns that single-country strategies cannot match. (Doc: §2.1, §2.3)"
          }
        ],
        ja: [
          {
            title: "タイはもはや「工場」ではなく「ソリューションのショールーム」である",
            content: "日本企業にとってのタイ＝低コスト組立拠点という時代は完全に終焉した。賃金上昇、労働力不足、高齢化が旧来モデルの構造的基盤を掘り崩している。しかしこの変容は、はるかに価値の高い機会を創出する。タイが直面する社会課題（高齢化、都市化、環境問題）は、日本が数十年かけて解決してきたものと同一である。タイをコストセンターではなく、日本の「課題先進国」としての知見を実証しマネタイズする「ショールーム」と認識する企業が、ASEANにおける最高付加価値のポジショニングを獲得するだろう。（Doc: §1.3、§8.1）"
          },
          {
            title: "IBC活用の裁定機会は閉じつつある",
            content: "タイのIBC制度は極めて積極的な税制優遇——法人税3%、駐在員個人所得税一律15%、配当免除——を提供し、シンガポールのコスト構造を大幅に下回る。しかし大半の日本企業は惰性でシンガポールに留まっている。この機会の窓は有限である。より多くの多国籍企業がタイIBCの利点を発見するにつれ、競争上の差別化は薄れる。バンコクに地域トレジャリー、R&D、人材育成ハブを早期に確立した企業は、後発が容易に複製できない構造的優位を獲得する。（Doc: §2.2）"
          },
          {
            title: "「中間層ケアギャップ」は日本企業にとって最強の堀である",
            content: "タイの高齢者ケア市場は構造的に二極化している。富裕層向けの超高級施設と低所得者向けの公的支援の間に、大多数の中間層が利用可能なサービスがほぼ皆無である。これはまさに日本の介護産業が国内で数十年かけて埋めてきたギャップそのものである。認知症ケア、転倒予防、見守りセンサー、「寝たきりにさせない」メソドロジーにおける日本のノウハウには、中国や韓国の競合に同等のものがない。これはASEAN全域において日本企業が獲得可能な、おそらく最も防衛しやすい市場ポジションである。（Doc: §3.1–3.3）"
          },
          {
            title: "CLMVマルチプライヤー効果は過小評価されている",
            content: "大半の日本企業はタイ事業を単独のP&Lユニットとして評価している。これはカンボジア、ラオス、ミャンマー、ベトナムへのゲートウェイとしてのタイの役割を根本的に過小評価するものである。タイで実証されたソリューション——高齢者ケアモデル、スマートホームシステム、食品安全プロトコル——は最小限の適応でCLMV市場に水平展開可能である。この「マザーマーケット＋サテライト市場」アーキテクチャでタイ戦略を設計する企業は、単一国戦略では実現できないリターンを創出するだろう。（Doc: §2.1、§2.3）"
          }
        ]
      }
    },

    // ── Recommendation ──
    // (Doc: §8.1–8.2)
    recommendation: {
      title: { en: "Strategic Recommendation for Japanese Executives", ja: "日本企業経営者への戦略的提言" },
      intro: {
        en: "Based on WaLens' analysis, the following strategic perspective is offered — not as an operational checklist, but as a framework for executive decision-making.",
        ja: "WaLensの分析に基づき、以下の戦略的視点を提供する——オペレーショナルなチェックリストとしてではなく、経営判断のためのフレームワークとして。"
      },
      content: {
        en: `The fundamental question facing Japanese executives is not "how to grow our Thailand business" but rather "what strategic role should Thailand play in our next-decade ASEAN architecture." (Doc: §8.1)

Three concrete actions demand immediate board-level attention:

First, elevate Thailand to a Regional Headquarters under the IBC regime. Consolidate treasury, R&D, procurement, and talent development functions in Bangkok. The tax arbitrage versus Singapore is significant and time-limited — companies that move within the next 18 months will secure the strongest positions. (Doc: §8.2 Action 1)

Second, abandon the 'go-it-alone' mindset and pursue co-creation with Thai conglomerates (CP Group, Central, Siam Cement), hospital groups, and property developers. They possess the local customer base, regulatory know-how, and distribution networks that Japanese companies lack. The Sena Hankyu Hanshin and Origin-Samitivej models demonstrate that joint ventures can achieve what neither party could accomplish independently. (Doc: §8.2 Action 2)

Third, design every Thailand investment with CLMV horizontal deployment in mind. Thailand should be the 'mother market' where solutions are proven, refined, and packaged for subsequent rollout to Cambodia, Laos, Myanmar, and Vietnam as 'satellite markets.' The cross-border trade infrastructure is now mature enough — ฿1.63 trillion in border trade in Jan–Oct 2025 — to support this model operationally. (Doc: §8.2 Action 3, §2.1)

The most dangerous path is continuing to treat Thailand as a legacy manufacturing operation while competitors build solution-based businesses around Japan's own strengths. The irony is acute: Japanese companies possess exactly the capabilities Thailand needs most, yet organizational inertia prevents them from deploying those capabilities effectively. The companies that break through this inertia first will define the next decade of Japan-Thailand business.`,
        ja: `日本企業経営者が直面する根本的な問いは「タイ事業をいかに成長させるか」ではなく、むしろ「今後10年のASEANアーキテクチャにおいてタイはいかなる戦略的役割を果たすべきか」である。（Doc: §8.1）

3つの具体的アクションが取締役会レベルでの即時の議論を求めている。

第一に、IBC制度を活用してタイを地域統括拠点に昇格させよ。トレジャリー、R&D、調達、人材育成の各機能をバンコクに集約する。シンガポールとの税制裁定は大きく、かつ時限的である——今後18ヶ月以内に動く企業が最も強いポジションを確保する。（Doc: §8.2 アクション1）

第二に、単独主義を捨て、タイ財閥（CPグループ、セントラル、サイアムセメント）、病院グループ、デベロッパーとの共創（Co-creation）を追求せよ。彼らは日本企業が欠く現地顧客基盤、規制対応力、流通ネットワークを保持している。阪急阪神×SENA、Origin×サミティヴェートの各モデルが、単独では達成不可能な成果をJVが実現できることを実証している。（Doc: §8.2 アクション2）

第三に、すべてのタイ投資をCLMV水平展開を念頭に設計せよ。タイをソリューションを実証・精製・パッケージ化する「マザーマーケット」とし、カンボジア、ラオス、ミャンマー、ベトナムを「サテライト市場」として後続展開する。国境貿易インフラは2025年1〜10月で1.63兆バーツに達するまで成熟しており、このモデルのオペレーション上の実行可能性を担保している。（Doc: §8.2 アクション3、§2.1）

最も危険な道は、タイを旧来の製造拠点として扱い続けることである——競合他社がまさに日本の強みを活かしたソリューションビジネスを構築している最中に。皮肉なことに、日本企業はタイが最も必要とする能力を正確に保有しているにもかかわらず、組織的惰性がその能力の効果的な展開を阻んでいる。この惰性を最初に打破した企業が、日タイビジネスの次の10年を定義することになる。`
      }
    },

    // ── Data Appendix ──
    // (Doc: 補足資料 表1–3)
    dataAppendix: {
      title: { en: "Data Appendix", ja: "データ付録" },
      tables: {
        macroIndicators: {
          title: { en: "Thailand Key Economic Indicators & 2025 Outlook", ja: "タイ主要経済指標と2025年見通し" },
          data: [
            { indicator: isJapanese ? "GDP成長率" : "GDP Growth", value2024: "1.9%", value2025: "1.8–2.3%", note: isJapanese ? "安定成長期へ移行" : "Transition to stable growth (Doc: Table 1)" },
            { indicator: isJapanese ? "輸出成長率" : "Export Growth", value2024: "3.8%", value2025: "5.5%", note: isJapanese ? "電子部品等が牽引" : "Electronics-led (Doc: Table 1)" },
            { indicator: isJapanese ? "インフレ率" : "Inflation", value2024: "0.4%", value2025: "0.0–0.5%", note: isJapanese ? "低位安定" : "Low and stable (Doc: Table 1)" },
            { indicator: isJapanese ? "高齢化率" : "Aging Rate", value2024: "20%", value2025: "20%+", note: isJapanese ? "完全高齢社会に突入" : "Entered 'Aged Society' (Doc: Table 1)" },
            { indicator: isJapanese ? "経常収支" : "Current Account", value2024: "2.5% GDP", value2025: "2.1% GDP", note: isJapanese ? "黒字維持" : "Surplus maintained (Doc: Table 1)" }
          ]
        },
        boiIncentives: {
          title: { en: "BOI Target Industries & Incentives", ja: "BOIターゲット産業と恩典" },
          data: [
            { industry: isJapanese ? "高齢者ケア" : "Elderly Care", scope: isJapanese ? "高齢者住宅・介護施設" : "Senior housing, care facilities", incentive: isJapanese ? "法人税免除（最大8年）、輸入関税免除" : "CIT exemption (up to 8 years), import duty exemption (Doc: Table 2)" },
            { industry: isJapanese ? "スマートエレクトロニクス" : "Smart Electronics", scope: isJapanese ? "IoTデバイス、車載電子部品" : "IoT devices, automotive electronics", incentive: isJapanese ? "法人税免除（最大10–13年）" : "CIT exemption (up to 10–13 years) (Doc: Table 2)" },
            { industry: isJapanese ? "次世代自動車" : "Next-Gen Automotive", scope: isJapanese ? "EV完成車・バッテリー・主要部品" : "EV assembly, battery, key components", incentive: isJapanese ? "法人税免除、物品税減免" : "CIT exemption, excise tax reduction (Doc: Table 2)" },
            { industry: isJapanese ? "未来食品" : "Future Food", scope: isJapanese ? "代替タンパク質・機能性食品・医療用食品" : "Alt-protein, functional food, medical food", incentive: isJapanese ? "法人税免除、R&D支援" : "CIT exemption, R&D support (Doc: Table 2)" },
            { industry: isJapanese ? "デジタル・教育" : "Digital / Education", scope: isJapanese ? "ソフトウェア開発・職業訓練" : "Software development, vocational training", incentive: isJapanese ? "法人税免除、スマートビザ発給" : "CIT exemption, Smart Visa (Doc: Table 2)" }
          ]
        },
        borderTrade: {
          title: { en: "Cross-Border Trade with CLMV (Jan–Oct 2025)", ja: "CLMV国境貿易動向（2025年1–10月）" },
          data: [
            { country: isJapanese ? "マレーシア" : "Malaysia", volume: "฿27,260M", yoy: "+9.6%", exports: isJapanese ? "コンピュータ、ゴム製品" : "Computers, rubber products (Doc: Table 3)" },
            { country: isJapanese ? "ラオス" : "Laos", volume: "฿24,110M", yoy: "+6.3%", exports: isJapanese ? "燃料、消費財、建材" : "Fuel, consumer goods, construction materials (Doc: Table 3)" },
            { country: isJapanese ? "ミャンマー" : "Myanmar", volume: "฿13,954M", yoy: "-16.7%", exports: isJapanese ? "飲料、燃料（政情不安定）" : "Beverages, fuel (political instability) (Doc: Table 3)" }
          ]
        }
      }
    },

    // ── Sources ──
    // (Doc: Works Cited)
    sources: {
      title: { en: "Sources & Methodology", ja: "出典・方法論" },
      list: {
        en: [
          "NESDC — Q2/2025 Economic Report (GDP, exports, inflation, current account) [1]",
          "NESDC — Social Outlook Q3/2025 (aging society data) [2]",
          "Argus Media — Thailand EV boom drives auto market in 2025 [3]",
          "EY — Incentives in ASEAN 2025 (IBC regime details) [6]",
          "KPMG — Thailand's Ageing Society: Opportunities for Businesses [8]",
          "Bangkok Post — Agency preps plan for the silver economy [9]",
          "Nation Thailand — depa pushes Smart City, targeting 105 cities by 2027 [10]",
          "BOI — Investment Promotion Guide 2025, e&e Industry Opportunities [12, 13]",
          "Thailand PRD — Transport Plans 2025-2026 [16]",
          "NESDC — Thailand Logistics Report 2024 [17]",
          "DataBridge Market Research — Thailand Elderly Care Market & Smart Home Market [22, 26]",
          "Ajinomoto Global — 2025 Business Plan, FarmAI initiatives [30]",
          "Krungsri Research — Electronics Industry Outlook 2026-2028 [33]",
          "WaLens Analysis — Independent interpretation based on cited sources"
        ],
        ja: [
          "NESDC — 2025年第2四半期経済報告（GDP、輸出、インフレ、経常収支）[1]",
          "NESDC — 2025年第3四半期社会展望（高齢化データ）[2]",
          "Argus Media — タイEVブームが2025年自動車市場を牽引 [3]",
          "EY — ASEAN優遇制度2025（IBC制度詳細）[6]",
          "KPMG — タイの高齢化社会：企業にとっての機会 [8]",
          "Bangkok Post — シルバーエコノミー計画策定 [9]",
          "Nation Thailand — depaスマートシティ推進、2027年までに105地域目標 [10]",
          "BOI — 投資促進ガイド2025、エレクトロニクス産業機会 [12, 13]",
          "タイ政府広報局 — 交通計画2025-2026 [16]",
          "NESDC — タイ物流レポート2024 [17]",
          "DataBridge Market Research — タイ高齢者ケア市場＆スマートホーム市場 [22, 26]",
          "味の素グローバル — 2025年事業計画、FarmAIイニシアティブ [30]",
          "クルンシィリサーチ — エレクトロニクス産業見通し2026-2028 [33]",
          "WaLens分析 — 引用元に基づく独自解釈"
        ]
      }
    },

    disclaimer: {
      en: "This report is prepared by WaLens for informational purposes only. The analysis and opinions expressed are those of WaLens and do not constitute investment advice, legal advice, or recommendation to take any specific action. All data from third-party sources is attributed and should be verified independently. Content marked 'Need verification' indicates data points that require additional confirmation. © 2026 WaLens. All rights reserved. This report is for the exclusive use of the subscriber and may not be redistributed without permission.",
      ja: "本レポートはWaLensが情報提供のみを目的として作成したものです。表明された分析および意見はWaLensのものであり、投資アドバイス、法的アドバイス、または特定の行動を取ることの推奨を構成するものではありません。第三者ソースからのすべてのデータは帰属表示され、独立して検証されるべきです。「要検証」と記されたコンテンツは追加確認を要するデータポイントを示します。© 2026 WaLens. 無断転載禁止。本レポートは購読者専用であり、許可なく再配布することはできません。"
    }
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
        title={isJapanese ? "タイ市場開拓：日本企業の新戦略 | WaLens" : "Thailand Market Development: New Strategies for Japanese Companies | WaLens"}
        description={isJapanese 
          ? "タイを第三国市場ハブ・社会課題解決型市場として再定義する戦略レポート。高齢者ケア、スマートホーム、次世代食品、エレクトロニクス、教育の5産業を詳説。"
          : "Strategic report redefining Thailand as a third-country market hub and social-issue-solving market. Covers 5 strategic industries for Japanese companies."
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
                { label: isJapanese ? "タイ市場戦略" : "Thailand Market Strategy" }
              ]}
            />
          </div>

          {/* Hero Section */}
          <section className="mb-8 md:mb-12">
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img 
                src={heroImage} 
                alt={isJapanese ? "タイ市場戦略" : "Thailand Market Strategy"}
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

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3">
              {isJapanese ? content.headline.ja : content.headline.en}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {isJapanese ? content.subheadline.ja : content.subheadline.en}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {isJapanese ? "最終更新" : "Last Updated"}: {content.lastUpdated}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {isJapanese ? "読了時間：15分" : "15 min read"}
                </span>
              </div>
              <BookmarkButton article={{ slug: 'thailand-market-strategy', title: isJapanese ? 'タイ市場開拓：日本企業の新戦略' : 'Thailand Market Development: New Strategies', language: lang === 'ja' ? 'JP' : 'EN', url: '/insights/reports/thailand-market-strategy', category: 'Strategy' }} variant="button" />
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

                {/* Data Appendix Tables */}
                <div onClick={handleDataAppendixAccess}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    {isJapanese ? content.dataAppendix.title.ja : content.dataAppendix.title.en}
                  </h3>

                  {/* Macro Indicators Table */}
                  <Card className="mb-4">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        {isJapanese ? content.dataAppendix.tables.macroIndicators.title.ja : content.dataAppendix.tables.macroIndicators.title.en}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2 font-medium">{isJapanese ? "指標" : "Indicator"}</th>
                              <th className="text-right p-2 font-medium">2024</th>
                              <th className="text-right p-2 font-medium">2025F</th>
                              <th className="text-left p-2 font-medium">{isJapanese ? "備考" : "Note"}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {content.dataAppendix.tables.macroIndicators.data.map((row, i) => (
                              <tr key={i} className="border-b last:border-0">
                                <td className="p-2 font-medium">{row.indicator}</td>
                                <td className="p-2 text-right">{row.value2024}</td>
                                <td className="p-2 text-right font-bold">{row.value2025}</td>
                                <td className="p-2 text-muted-foreground text-xs">{row.note}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* BOI Incentives Table */}
                  <Card className="mb-4">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        {isJapanese ? content.dataAppendix.tables.boiIncentives.title.ja : content.dataAppendix.tables.boiIncentives.title.en}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2 font-medium">{isJapanese ? "産業" : "Industry"}</th>
                              <th className="text-left p-2 font-medium">{isJapanese ? "対象事業" : "Scope"}</th>
                              <th className="text-left p-2 font-medium">{isJapanese ? "恩典" : "Incentive"}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {content.dataAppendix.tables.boiIncentives.data.map((row, i) => (
                              <tr key={i} className="border-b last:border-0">
                                <td className="p-2 font-medium">{row.industry}</td>
                                <td className="p-2 text-sm">{row.scope}</td>
                                <td className="p-2 text-sm text-muted-foreground">{row.incentive}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Border Trade Table */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        {isJapanese ? content.dataAppendix.tables.borderTrade.title.ja : content.dataAppendix.tables.borderTrade.title.en}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2 font-medium">{isJapanese ? "相手国" : "Country"}</th>
                              <th className="text-right p-2 font-medium">{isJapanese ? "貿易額" : "Volume"}</th>
                              <th className="text-right p-2 font-medium">{isJapanese ? "前年比" : "YoY"}</th>
                              <th className="text-left p-2 font-medium">{isJapanese ? "主要輸出品目" : "Key Exports"}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {content.dataAppendix.tables.borderTrade.data.map((row, i) => (
                              <tr key={i} className="border-b last:border-0">
                                <td className="p-2 font-medium">{row.country}</td>
                                <td className="p-2 text-right">{row.volume}</td>
                                <td className={`p-2 text-right font-bold ${row.yoy.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>{row.yoy}</td>
                                <td className="p-2 text-sm text-muted-foreground">{row.exports}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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

export default ThailandMarketStrategy;
