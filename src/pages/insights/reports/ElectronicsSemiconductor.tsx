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
  Cpu
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const ElectronicsSemiconductor = () => {
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

  useEffect(() => {
    if (hasFullAccess && !hasLoggedView) {
      logView(
        'electronics-semiconductor',
        isJapanese ? 'タイ電子機器・半導体産業 2026' : 'Thailand Electronics & Semiconductor Industry 2026',
        'manufacturing',
        lang
      );
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker('electronics-semiconductor', 'Thailand Electronics & Semiconductor Industry 2026', 'タイ電子機器・半導体産業 2026', 'Manufacturing', hasFullAccess);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(
        'electronics-semiconductor',
        isJapanese ? 'タイ電子機器・半導体産業 2026' : 'Thailand Electronics & Semiconductor Industry 2026',
        'manufacturing',
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

  const tocSections = [
    { id: 'executive-summary', label: isJapanese ? 'エグゼクティブサマリー' : 'Executive Summary' },
    { id: 'facts', label: isJapanese ? '市場・政策・動向に関する情報' : 'Market, Policy & Trends Information' },
    { id: 'opinion', label: isJapanese ? 'WaLensの見解と示唆' : 'Opinion & Implication from WaLens' },
    { id: 'recommendation', label: isJapanese ? '日本企業経営者への提言' : 'Recommendation for Japanese Executives' },
    { id: 'data-appendix', label: isJapanese ? 'データ付録' : 'Data Appendix' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: {
      en: "Thailand's Electronics & Semiconductor Industry 2026: Supply Chain Realignment and Japanese Opportunities",
      ja: "タイ電子機器・半導体産業 2026：サプライチェーン再編と日本企業の勝機"
    },
    subheadline: {
      en: "From HDD assembly base to PCB & automotive semiconductor hub — the structural pivot that redefines Japan-Thailand industrial ties",
      ja: "HDD組立拠点からPCB・車載半導体ハブへ——日タイ産業関係を再定義する構造転換"
    },
    category: {
      en: "Manufacturing / Electronics & Semiconductor",
      ja: "製造業 / 電子機器・半導体"
    },
    lastUpdated: "2026-02-08",
    executiveSummary: {
      en: [
        "Thailand's electronics industry is undergoing its largest structural transformation in 30 years: the 'white goods & HDD assembly base' model led by Japanese firms is losing competitiveness to Chinese entrants, while a new role as a 'PCB and automotive/industrial semiconductor' cluster is emerging against the backdrop of US-China decoupling. (Doc: エグゼクティブサマリー)",
        "PCB investment is surging: major Taiwanese, Chinese, and Japanese manufacturers are simultaneously shifting production to Thailand, making it ASEAN's largest PCB production base. BOI electronics-component applications more than doubled YoY in 2025. (Doc: 1.2 PCB投資ラッシュ)",
        "Semiconductor back-end (OSAT) is upgrading: driven by EV and data center demand, investment in power semiconductor and sensor assembly/test (OSAT) is accelerating — symbolized by moves from Sony, ROHM, and Murata. (Doc: 2.1 半導体・受動部品)",
        "A clear shift from 'volume' to 'quality': BOI incentives now explicitly steer from simple assembly toward 'Smart Electronics' and upstream processes (wafer fabrication, IC design), with up to 13-year CIT exemptions for upstream semiconductor operations. (Doc: 3.1 BOIインセンティブ)",
        "Electronics exports reached a record ~$59B (1.86 trillion baht) in 2025, with IC exports growing ~30% YoY on AI server and data center demand, while legacy HDD products decelerate as SSD replacement advances. (Doc: 1.1 輸出・生産の構造変化)"
      ],
      ja: [
        "タイの電子機器産業は過去30年で最大の構造転換期にある。日本企業が主導した「白物家電・HDD組立拠点」モデルは中国企業の台頭により競争力を失いつつあり、代わって米中デカップリングを背景とした「PCB」と「車載・産業用半導体」の新たな集積地としての役割が浮上している。(Doc: エグゼクティブサマリー)",
        "PCB投資が爆発的に増加：台湾・中国・日本の主要メーカーが一斉にタイへ生産をシフトし、タイはASEANにおけるPCB生産の最大拠点となりつつある。2025年のBOI電子部品申請額は前年比2倍以上。(Doc: 1.2 PCB投資ラッシュ)",
        "半導体後工程（OSAT）の高度化：EV・データセンター需要を牽引役にパワー半導体やセンサーの組立・テスト工程への投資が急増——ソニー、ローム、村田製作所の動きが象徴的。(Doc: 2.1 半導体・受動部品)",
        "「量」から「質」への明確な転換：BOI恩典は単純組立から「スマート・エレクトロニクス」「上流工程（ウェハ製造、IC設計）」へと誘導されており、半導体上流には最大13年の法人税免除。(Doc: 3.1 BOIインセンティブ)",
        "2025年の電子機器輸出額は過去最高水準の約590億ドル（約1.86兆バーツ）に達し、IC輸出はAIサーバー・データセンター需要を背景に前年比約30%増の驚異的成長を記録。一方、HDDはSSD置換により成長鈍化。(Doc: 1.1 輸出・生産の構造変化)"
      ]
    },
    marketStructure: {
      title: { en: "Market Structure & Export Composition", ja: "市場構造と輸出構成" },
      segments: {
        en: [
          { name: "IC (Integrated Circuits)", share: "Growing rapidly", growth: "+~30% YoY", players: "Sony, ROHM, Murata, BOI-promoted new entrants" },
          { name: "PCB (Printed Circuit Boards)", share: "ASEAN's largest hub", growth: "BOI apps 2x+ YoY", players: "CMK, Meiko, Unimicron, Compeq" },
          { name: "MLCC & Passive Components", share: "Expanding", growth: "Steady", players: "Murata (Lamphun expansion)" },
          { name: "HDD / Legacy Storage", share: "Declining", growth: "Decelerating", players: "Western Digital, Seagate (transitioning)" },
          { name: "Smart Appliances / IoT", share: "B2B pivot", growth: "Moderate", players: "Panasonic (B2B/IAQ), vs Xiaomi/Haier" }
        ],
        ja: [
          { name: "IC（集積回路）", share: "急速成長", growth: "+約30% YoY", players: "ソニー, ローム, 村田, BOI促進新規参入者" },
          { name: "PCB（プリント基板）", share: "ASEAN最大拠点", growth: "BOI申請2倍超", players: "CMK, メイコー, Unimicron, Compeq" },
          { name: "MLCC・受動部品", share: "拡大中", growth: "安定成長", players: "村田製作所（ランプーン拡張）" },
          { name: "HDD/レガシーストレージ", share: "縮小", growth: "鈍化", players: "Western Digital, Seagate（転換中）" },
          { name: "スマート家電/IoT", share: "B2Bピボット", growth: "緩やか", players: "パナソニック（B2B/IAQ）vs Xiaomi/Haier" }
        ]
      }
    },
    keyPlayers: {
      title: { en: "Key Japanese Players in Thailand", ja: "主要日本企業のタイ展開" },
      data: {
        en: [
          { segment: "Sony Device Technology", examples: "Automotive image sensors (back-end capacity expansion)", status: "Strategic expansion" },
          { segment: "Murata Electronics", examples: "MLCC production expansion, Lamphun new factory", status: "Capacity building" },
          { segment: "ROHM", examples: "Power semiconductors & LSI back-end processing", status: "EV demand capture" },
          { segment: "CMK / Meiko", examples: "PCB production for non-China supply chains", status: "Major investment" },
          { segment: "Panasonic", examples: "B2B pivot: IAQ solutions, smart home with SENA", status: "Business model shift" }
        ],
        ja: [
          { segment: "ソニーデバイステクノロジー", examples: "車載イメージセンサー（後工程能力増強）", status: "戦略的拡大" },
          { segment: "村田製作所", examples: "MLCC生産拡大、ランプーン新工場", status: "生産能力拡充" },
          { segment: "ローム", examples: "パワー半導体・LSI後工程の主要拠点", status: "EV需要取り込み" },
          { segment: "CMK / メイコー", examples: "非中国サプライチェーン向けPCB生産", status: "大型投資" },
          { segment: "パナソニック", examples: "B2Bピボット：IAQソリューション、SENA提携スマートホーム", status: "ビジネスモデル転換" }
        ]
      }
    },
    policyInsights: {
      title: { en: "Policy & BOI Incentives", ja: "政策・BOIインセンティブ" },
      items: {
        en: [
          { policy: "Semiconductor Upstream (Wafer / IC Design)", content: "Maximum 13-year corporate income tax exemption — the highest tier of BOI incentives. Thailand's national semiconductor roadmap targets hubs in power semiconductors, sensors, and photonics, leveraging synergies with the automotive sector (especially EV). (Doc: 3.1 BOIインセンティブ)", citation: "BOI Investment Promotion, A&M analysis 2026" },
          { policy: "Smart Electronics Promotion", content: "BOI is explicitly shifting incentives from simple assembly to 'Smart Electronics' — automation, IoT-enabled manufacturing, and high-value-add products receive enhanced benefits. (Doc: エグゼクティブサマリー/提言2)", citation: "BOI 2026–2027 Strategy" },
          { policy: "PCB & Components Sector", content: "Electronics component BOI applications surged 2x+ YoY in 2025, driven primarily by PCB investments. US tariff avoidance and supply chain redundancy are the key motivations for Taiwanese and Japanese manufacturers. (Doc: 1.2 PCB投資ラッシュ)", citation: "Nation Thailand / BOI Statistics" },
          { policy: "KOSEN-style Engineering Education", content: "Japan-style technical college (KOSEN) model is being introduced in Thailand to address the engineer shortage. Companies are expected to invest in in-house academies and Work-Integrated Learning programs. (Doc: 3.2 人材不足)", citation: "BOI / Ministry of Education" }
        ],
        ja: [
          { policy: "半導体上流工程（ウェハ製造・IC設計）", content: "最大13年の法人税免除——BOI恩典の最高ランク。タイの国家半導体ロードマップはパワー半導体、センサー、フォトニクスのハブ化を目指し、自動車産業（特にEV）とのシナジーを狙う。(Doc: 3.1 BOIインセンティブ)", citation: "BOI投資促進、A&M分析 2026年" },
          { policy: "スマート・エレクトロニクス振興", content: "BOIは単純組立から「スマート・エレクトロニクス」——自動化、IoT対応製造、高付加価値製品——への恩典シフトを明確化。(Doc: エグゼクティブサマリー/提言2)", citation: "BOI 2026–2027年戦略" },
          { policy: "PCB・部品セクター", content: "2025年の電子部品BOI申請額は前年比2倍以上に急増、主役はPCB投資。米国関税回避とサプライチェーン冗長化が台湾・日本メーカーの主要動機。(Doc: 1.2 PCB投資ラッシュ)", citation: "Nation Thailand / BOI統計" },
          { policy: "KOSEN型工学教育", content: "日本式高等専門学校（KOSEN）モデルの導入が進行中。企業は単なる採用だけでなく、社内アカデミー設置やWork-Integrated Learningへの投資が求められる。(Doc: 3.2 人材不足)", citation: "BOI / 教育省" }
        ]
      }
    },
    opportunities: {
      en: [
        "PCB production hub for non-China supply chains: US tariff avoidance + China+1 = structural demand shift to Thailand (Doc: 1.2)",
        "Automotive semiconductor OSAT: EV-driven power device and sensor assembly — Japan has technology edge (Doc: 2.1)",
        "Factory Automation (FA) equipment: Thailand's shrinking labor force creates massive demand for e-F@ctory-type IoT/FA solutions (Doc: 提言2)",
        "B2B smart building/IoT: Panasonic-SENA model shows path from 'selling things' to 'selling spatial value' (Doc: 2.2)",
        "KOSEN / Work-Integrated Learning partnerships: Government co-funding available for talent development JVs (Doc: 3.2)"
      ],
      ja: [
        "非中国サプライチェーン向けPCB生産ハブ：米国関税回避＋チャイナプラスワン＝タイへの構造的需要シフト (Doc: 1.2)",
        "車載半導体OSAT：EV駆動のパワーデバイス・センサー組立——日本は技術優位を保持 (Doc: 2.1)",
        "FA（ファクトリーオートメーション）機器：タイの労働人口減少がe-F@ctory型IoT/FAソリューションの巨大需要を創出 (Doc: 提言2)",
        "B2Bスマートビルディング/IoT：パナソニック-SENAモデルが「モノ売り」から「空間価値」への転換パスを提示 (Doc: 2.2)",
        "KOSEN / Work-Integrated Learning提携：人材育成JVへの政府共同出資制度が充実 (Doc: 3.2)"
      ]
    },
    risks: {
      en: [
        "Chinese consumer electronics dominance: Xiaomi, Haier sweeping IoT appliance market on price — Japanese B2C increasingly untenable (Doc: 2.2)",
        "Engineer shortage intensifying: semiconductor design and AI talent in fierce competition, wages rising (Doc: 3.2)",
        "HDD legacy asset exposure: SSD replacement accelerating; companies with heavy HDD capacity face stranded-asset risk (Doc: 1.1)",
        "Over-dependence on BOI incentives: policy may shift post-election; incentive-driven decisions without underlying competitiveness are fragile",
        "Concentration risk in PCB: if too many producers cluster in Thailand simultaneously, margin compression is likely (Need verification)"
      ],
      ja: [
        "中国家電メーカーの市場席巻：Xiaomi、Haierが低価格IoT家電で市場を支配——日系B2Cは価格競争困難に (Doc: 2.2)",
        "エンジニア不足の深刻化：半導体設計・AI関連の高度人材が争奪戦、賃金上昇傾向 (Doc: 3.2)",
        "HDDレガシー資産リスク：SSD置換が加速、HDD生産能力に偏重する企業は座礁資産リスクに直面 (Doc: 1.1)",
        "BOIインセンティブへの過度な依存：政策は選挙後に変動しうる。基盤的競争力なきインセンティブ依存の意思決定は脆弱",
        "PCB集中リスク：多数の生産者がタイに同時集約した場合、マージン圧縮の可能性 (Need verification)"
      ]
    },
    opinion: {
      title: { en: "WaLens Analysis: Structural Interpretation", ja: "WaLensの分析：構造的解釈" },
      intro: {
        en: "The following represents WaLens' independent analysis based on the facts presented above. These are interpretive observations, not objective data points.",
        ja: "以下は上記のファクトに基づくWaLensの独自分析です。これらは解釈的な見解であり、客観的なデータポイントではありません。"
      },
      points: {
        en: [
          {
            title: "The 'China+1' Window Is Finite, Not Permanent",
            content: "The current PCB investment rush into Thailand is primarily driven by geopolitical arbitrage — US tariff avoidance and supply chain de-risking. Japanese executives should recognize that this window creates a structural opportunity, but it is time-bounded. Once capacity is built and geopolitical configurations stabilize (or shift again), the competitive advantage will pivot from 'location' to 'capability.' Companies that use this window to build merely assembly capacity without investing in design, testing, and quality infrastructure will find themselves in the same cost-competition trap within 5-7 years."
          },
          {
            title: "Thailand's Semiconductor Strategy Is Deliberately Narrow — And That's the Right Read",
            content: "Thailand is not trying to become Taiwan or South Korea. Its semiconductor roadmap explicitly targets back-end processing (OSAT), power semiconductors, and sensors — segments that align with its existing automotive industrial base. This is a realistic, defensible position. For Japanese firms, the implication is clear: Thailand is not the place for leading-edge logic chips, but it is becoming the optimal location for automotive and industrial semiconductor packaging where Japan has genuine technology advantages."
          },
          {
            title: "The B2C-to-B2B Pivot Is Existential, Not Optional",
            content: "Panasonic's shift from consumer appliances to B2B solutions (smart building systems, IAQ, developer partnerships) is not merely strategic diversification — it is survival. Chinese manufacturers have achieved price-performance ratios in consumer IoT that Japanese firms cannot match without fundamentally different cost structures. The lesson extends beyond Panasonic: any Japanese manufacturer still relying on Thailand as a consumer-product export base needs to accelerate the transition to solutions, services, and systems-integration business models."
          },
          {
            title: "The Talent Bottleneck Will Define Winners and Losers",
            content: "Thailand's engineer shortage — particularly in semiconductor design and AI — is not a temporary labor-market fluctuation. It reflects a structural mismatch between the country's ambitions and its educational pipeline. Japanese companies that invest in KOSEN-style training programs and Work-Integrated Learning now will build an asymmetric advantage: not just access to talent, but loyalty and institutional knowledge that competitors cannot easily replicate. This is a 5-year play, not a 1-year hiring campaign."
          }
        ],
        ja: [
          {
            title: "「チャイナプラスワン」の窓は有限であり、永続しない",
            content: "現在のタイへのPCB投資ラッシュは主に地政学的裁定——米国関税回避とサプライチェーンのリスク分散——によって駆動されている。日本の経営者はこの窓が構造的機会を創出するが、時間的に限定されていることを認識すべきである。生産能力が構築され、地政学的構図が安定（または再び変動）すれば、競争優位は「立地」から「能力」へと転換する。この窓を単なる組立能力の構築に使い、設計・テスト・品質インフラへの投資を怠る企業は、5-7年以内に同じコスト競争の罠に陥る。"
          },
          {
            title: "タイの半導体戦略は意図的にナロー——そしてそれが正しい読み筋",
            content: "タイは台湾や韓国になろうとしていない。その半導体ロードマップは後工程（OSAT）、パワー半導体、センサーを明示的にターゲットとしており、既存の自動車産業基盤とのシナジーを狙う。これは現実的で防衛可能なポジションである。日本企業への含意は明確：タイは先端ロジックチップの場ではないが、日本が真の技術優位を持つ車載・産業用半導体パッケージングの最適拠点となりつつある。"
          },
          {
            title: "B2CからB2Bへのピボットは選択ではなく生存条件",
            content: "パナソニックの消費者家電からB2Bソリューション（スマートビルディングシステム、IAQ、デベロッパー提携）への転換は、単なる戦略的多角化ではなく、生存の問題である。中国メーカーは日本企業がコスト構造を根本的に変えない限りマッチできない価格性能比をコンシューマーIoTで達成している。教訓はパナソニックを超えて広がる：タイを消費者製品輸出基地として依然頼る日本メーカーは、ソリューション・サービス・システムインテグレーションのビジネスモデルへの移行を加速する必要がある。"
          },
          {
            title: "人材ボトルネックが勝者と敗者を決定する",
            content: "タイのエンジニア不足——特に半導体設計とAI分野——は一時的な労働市場の変動ではない。国の野心と教育パイプラインの構造的ミスマッチを反映している。KOSEN型訓練プログラムとWork-Integrated Learningに今投資する日本企業は非対称的優位を構築する：単なる人材へのアクセスではなく、競合他社が容易に複製できないロイヤルティと組織知識である。これは1年の採用キャンペーンではなく5年の戦略である。"
          }
        ]
      }
    },
    recommendation: {
      title: { en: "Strategic Recommendation for Japanese Executives", ja: "日本企業経営者への戦略的提言" },
      intro: {
        en: "Based on WaLens' analysis, the following strategic perspective is offered — not as an operational checklist, but as a framework for executive decision-making.",
        ja: "WaLensの分析に基づき、以下の戦略的視点を提供する——オペレーショナルなチェックリストとしてではなく、経営判断のためのフレームワークとして。"
      },
      content: {
        en: `Recommendation 1: Position Thailand as the core of your 'non-China supply chain.' (Doc: 提言1)

As US-China tensions persist, Thailand has established itself as the most balanced 'neutral manufacturing hub' within ASEAN. For high-tech products destined for North American markets — automotive components, sensors, telecom equipment — consolidating final assembly in Thailand is the defensible play. But this must go beyond simple relocation: invest in design capability and quality infrastructure at the Thai site, or the cost-competition trap will re-emerge.

Recommendation 2: Build 'labor-light manufacturing' through Factory Automation. (Doc: 提言2)

Thailand's working-age population is shrinking. 'Cheap labor' no longer exists. Deploying IoT/FA solutions like Mitsubishi Electric's e-F@ctory is not just an efficiency play — it is the condition for survival in Thailand. This simultaneously represents an enormous commercial opportunity for Japanese FA equipment manufacturers. The companies that create showcase factories in Thailand will become the reference architecture for Southeast Asian manufacturing.

Recommendation 3: Pursue 'co-creation' with local partners, not standalone product sales. (Doc: 提言3)

The Panasonic-SENA smart home partnership exemplifies the required shift: embedding Japanese technology (sensors, energy-efficiency devices, management systems) as components within Thai partners' service offerings — real estate developers, hospitals, infrastructure operators. This is not merely a go-to-market strategy; it is the only sustainable business model when Chinese competitors can undercut on standalone product pricing.

The overarching strategic frame: Thailand in 2026 is no longer a 'low-cost assembly destination.' It is becoming a 'capability hub' for specific high-value electronics segments — PCB, automotive semiconductors, factory automation. Japanese companies that recognize and act on this distinction will find a durable competitive position. Those that continue to view Thailand through the lens of cost arbitrage will find diminishing returns.`,
        ja: `提言1：タイを「非中国サプライチェーン」の中核に据えよ (Doc: 提言1)

米中対立が長期化する中、タイはASEAN内で最もバランスの取れた「中立的な製造ハブ」としての地位を確立している。北米市場向けハイテク製品——車載部品、センサー、通信機器——の最終組立工程をタイに移管・集約することが防衛可能な打ち手である。ただし、単純な移転を超える必要がある：タイ拠点に設計能力と品質インフラを投資しなければ、コスト競争の罠が再現する。

提言2：FA（ファクトリーオートメーション）による「省人化モデル」を構築せよ (Doc: 提言2)

タイの労働人口は減少局面にあり、「安価な労働力」はもはや存在しない。三菱電機のe-F@ctoryのようなIoT/FAソリューションの導入は単なる効率化ではなく、タイでの存続条件である。これは同時に、日本のFA機器メーカーにとっての巨大な商機でもある。タイにショーケースファクトリーを構築する企業が、東南アジア製造業のリファレンスアーキテクチャとなる。

提言3：単独の製品販売ではなく、現地パートナーとの「共創（Co-creation）」を追求せよ (Doc: 提言3)

パナソニックとSENAのスマートホーム提携は、求められる転換を例証する：日本の技術（センサー、省エネ機器、管理システム）をタイパートナーのサービス提供——不動産デベロッパー、病院、インフラ事業者——の構成要素として組み込むことである。これは単なるgo-to-market戦略ではなく、中国競合他社がスタンドアロン製品の価格で下回れる環境における唯一の持続可能なビジネスモデルである。

全体の戦略フレーム：2026年のタイはもはや「低コスト組立先」ではない。特定の高付加価値電子機器セグメント——PCB、車載半導体、FA——の「能力ハブ」となりつつある。この区別を認識し行動する日本企業は持続的な競争ポジションを見出す。コスト裁定の視点でタイを見続ける企業は逓減的リターンに直面する。`
      }
    },
    dataAppendix: {
      title: { en: "Data Appendix", ja: "データ付録" },
      tables: {
        keyIndicators: {
          title: { en: "Key Indicators (2025-2026 Forecast)", ja: "主要指標（2025-2026予測）" },
          data: [
            { indicator: isJapanese ? "電子機器輸出額" : "Electronics Exports", value: isJapanese ? "約590億ドル" : "~$59B", trend: isJapanese ? "前年比堅調増、IC・PCBが牽引" : "Steady YoY growth, IC & PCB driving", source: "Doc: 補足データ" },
            { indicator: isJapanese ? "IC輸出成長率" : "IC Export Growth", value: "+29.5~30.5%", trend: isJapanese ? "データセンター・AI需要" : "Data center & AI demand", source: "Doc: 1.1" },
            { indicator: isJapanese ? "PCB市場" : "PCB Market", value: isJapanese ? "投資急増" : "Investment surge", trend: isJapanese ? "台湾・日本勢の大型投資が相次ぐ" : "Major TW/JP investments", source: "Doc: 1.2" },
            { indicator: isJapanese ? "BOI申請額" : "BOI Applications", value: "+67%", trend: isJapanese ? "電子・デジタル分野が過半を占める" : "Electronics & digital over 50%", source: "Doc: 補足データ" }
          ]
        }
      }
    },
    sources: {
      title: { en: "Sources & Methodology", ja: "出典・方法論" },
      list: {
        en: [
          "Nation Thailand — 'Thai Investment Surges as Japan Endorses Quick Big Win Strategy' (accessed Feb 2026)",
          "Krungsri Research — 'Industry Outlook 2026-2028: Electronics Industry'",
          "Krungsri Research — 'Industry Outlook 2025-2027: Electronics Industry'",
          "Alvarez & Marsal — 'Thailand's Renewed BOI Incentives: A Strategic Window 2026-2027'",
          "Panasonic / SENA / AZECSAVE — Home IoT system site visit and partnership announcements",
          "Terra BKK — Panasonic-SENA smart home collaboration coverage",
          "WaLens Field Research — Executive interviews & industry analysis (Q1 2026)"
        ],
        ja: [
          "Nation Thailand — 「タイ投資急増、日本が『クイック・ビッグ・ウィン』戦略を支持」（2026年2月アクセス）",
          "クルンシィリサーチ — 「産業見通し2026-2028：電子機器産業」",
          "クルンシィリサーチ — 「産業見通し2025-2027：電子機器産業」",
          "Alvarez & Marsal — 「タイの刷新されたBOIインセンティブ：2026-2027年の戦略的ウィンドウ」",
          "パナソニック / SENA / AZECSAVE — Home IoTシステム現地視察・提携発表",
          "Terra BKK — パナソニック-SENAスマートホーム協業報道",
          "WaLensフィールドリサーチ — 経営幹部インタビュー・産業分析（2026年Q1）"
        ]
      }
    },
    disclaimer: {
      en: "This report is prepared by WaLens for informational purposes only. The analysis and opinions expressed are those of WaLens and do not constitute investment advice, legal advice, or recommendation to take any specific action. All data from third-party sources is attributed and should be verified independently. © 2026 WaLens. All rights reserved. This report is for the exclusive use of the subscriber and may not be redistributed without permission.",
      ja: "本レポートはWaLensが情報提供のみを目的として作成したものです。表明された分析および意見はWaLensのものであり、投資アドバイス、法的アドバイス、または特定の行動を取ることの推奨を構成するものではありません。第三者ソースからのすべてのデータは帰属表示され、独立して検証されるべきです。© 2026 WaLens. 無断転載禁止。本レポートは購読者専用であり、許可なく再配布することはできません。"
    }
  };

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
            {isJapanese ? "この詳細分析はプレミアム会員専用です" : "This detailed analysis is available to Premium members"}
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => setIsLoginOpen(true)} variant="outline" size="sm">
              {isJapanese ? "ログイン" : "Sign In"}
            </Button>
            <Button asChild size="sm">
              <Link to="/subscribe">{isJapanese ? "プレミアムに登録" : "Subscribe"}</Link>
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
            <h3 className="font-bold">{isJapanese ? "完全版レポートにアクセス" : "Access the Full Report"}</h3>
            <p className="text-sm text-muted-foreground">
              {isJapanese ? "詳細分析、データ付録、戦略的示唆をご覧いただけます" : "View detailed analysis, data appendix, and strategic insights"}
            </p>
          </div>
        </div>
        <Button asChild className="bg-amber-500 hover:bg-amber-600">
          <Link to="/subscribe">{isJapanese ? "今すぐ登録" : "Subscribe Now"}</Link>
        </Button>
      </CardContent>
    </Card>
  );

  const handleSwitchToLogin = () => { setIsSignUpOpen(false); setIsLoginOpen(true); };
  const handleSwitchToSignUp = () => { setIsLoginOpen(false); setIsSignUpOpen(true); };

  return (
    <>
      <SEO 
        title={isJapanese ? "タイ電子機器・半導体産業 2026 | WaLens" : "Thailand Electronics & Semiconductor Industry 2026 | WaLens"}
        description={isJapanese 
          ? "タイ電子機器・半導体産業の包括的分析。サプライチェーン再編、PCB投資ラッシュ、車載半導体OSAT、日本企業の戦略的打ち手。"
          : "Comprehensive analysis of Thailand's electronics & semiconductor industry. Supply chain realignment, PCB investment surge, automotive OSAT, strategic plays for Japanese companies."
        }
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6 md:py-12 max-w-4xl">
          <div className="mb-6">
            <Breadcrumb 
              items={[
                { label: isJapanese ? "インサイト" : "Insights", href: "/insights" },
                { label: isJapanese ? "製造業" : "Manufacturing", href: "/insights/manufacturing" },
                { label: isJapanese ? "電子機器・半導体" : "Electronics & Semiconductor" }
              ]}
            />
          </div>

          {/* Hero Section */}
          <section className="mb-8 md:mb-12">
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img src={heroImage} alt={isJapanese ? "タイ電子機器産業" : "Thailand Electronics Industry"} className="w-full h-48 md:h-72 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex gap-2 mb-2">
                  <Badge variant="default" className="bg-amber-500 hover:bg-amber-600"><Crown className="h-3 w-3 mr-1" />Premium</Badge>
                  <Badge variant="secondary">{isJapanese ? content.category.ja : content.category.en}</Badge>
                </div>
              </div>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3">{isJapanese ? content.headline.ja : content.headline.en}</h1>
            <p className="text-lg text-muted-foreground mb-4">{isJapanese ? content.subheadline.ja : content.subheadline.en}</p>
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1"><FileText className="h-4 w-4" />{isJapanese ? "最終更新" : "Last Updated"}: {content.lastUpdated}</span>
                <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" />{isJapanese ? "読了時間：12分" : "12 min read"}</span>
              </div>
              <BookmarkButton article={{ slug: 'electronics-semiconductor', title: isJapanese ? 'タイ電子機器・半導体産業 2026' : 'Thailand Electronics & Semiconductor Industry 2026', language: lang === 'ja' ? 'JP' : 'EN', url: '/insights/reports/electronics-semiconductor', category: 'Manufacturing' }} variant="button" />
            </div>
          </section>

          {/* Table of Contents */}
          <section id="table-of-contents" className="mb-8 md:mb-12">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Eye className="h-5 w-5" />{isJapanese ? "目次" : "Table of Contents"}</CardTitle></CardHeader>
              <CardContent>
                <nav className="space-y-1">
                  {tocSections.map((section, index) => (
                    <button key={section.id} onClick={() => scrollToSection(section.id)} className="w-full text-left flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group">
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
              <CardHeader><CardTitle className="flex items-center gap-2 text-xl md:text-2xl"><Zap className="h-6 w-6 text-primary" />{isJapanese ? "エグゼクティブサマリー" : "Executive Summary"}</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {(isJapanese ? content.executiveSummary.ja : content.executiveSummary.en).map((item, i) => (
                    <li key={i} className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{item}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {!hasFullAccess && <PremiumCTA />}

          {/* Facts Section */}
          <section id="facts" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2"><Database className="h-6 w-6" />{isJapanese ? "ファクト：市場・政策・動向" : "Facts: Market, Policy & Trends"}</h2>
            {hasFullAccess ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Cpu className="h-5 w-5" />{isJapanese ? content.marketStructure.title.ja : content.marketStructure.title.en}</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(isJapanese ? content.marketStructure.segments.ja : content.marketStructure.segments.en).map((seg, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div><p className="font-medium">{seg.name}</p><p className="text-sm text-muted-foreground">{seg.players}</p></div>
                          <div className="text-right"><p className="font-bold text-lg">{seg.share}</p><p className="text-sm text-green-600">{seg.growth}</p></div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Building className="h-5 w-5" />{isJapanese ? content.keyPlayers.title.ja : content.keyPlayers.title.en}</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(isJapanese ? content.keyPlayers.data.ja : content.keyPlayers.data.en).map((player, i) => (
                        <div key={i} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-1"><p className="font-medium">{player.segment}</p><Badge variant="outline" className="text-xs">{player.status}</Badge></div>
                          <p className="text-sm text-muted-foreground">{player.examples}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Shield className="h-5 w-5" />{isJapanese ? content.policyInsights.title.ja : content.policyInsights.title.en}</h3>
                  <div className="space-y-4">
                    {(isJapanese ? content.policyInsights.items.ja : content.policyInsights.items.en).map((item, i) => (
                      <Card key={i}><CardContent className="p-4"><h4 className="font-bold mb-2">{item.policy}</h4><p className="text-sm text-muted-foreground mb-2">{item.content}</p><p className="text-xs text-muted-foreground italic">{isJapanese ? "出典" : "Source"}: {item.citation}</p></CardContent></Card>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-green-200 dark:border-green-900">
                    <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400 text-lg"><TrendingUp className="h-5 w-5" />{isJapanese ? "機会" : "Opportunities"}</CardTitle></CardHeader>
                    <CardContent><ul className="space-y-2">{(isJapanese ? content.opportunities.ja : content.opportunities.en).map((item, i) => (<li key={i} className="flex gap-2 text-sm"><CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" /><span>{item}</span></li>))}</ul></CardContent>
                  </Card>
                  <Card className="border-red-200 dark:border-red-900">
                    <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400 text-lg"><TrendingDown className="h-5 w-5" />{isJapanese ? "リスク" : "Risks"}</CardTitle></CardHeader>
                    <CardContent><ul className="space-y-2">{(isJapanese ? content.risks.ja : content.risks.en).map((item, i) => (<li key={i} className="flex gap-2 text-sm"><AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" /><span>{item}</span></li>))}</ul></CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <BlurredContent><div className="space-y-6"><Card className="h-64" /><Card className="h-48" /><div className="grid md:grid-cols-2 gap-4"><Card className="h-48" /><Card className="h-48" /></div></div></BlurredContent>
            )}
          </section>

          {/* Opinion */}
          <section id="opinion" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2"><Lightbulb className="h-6 w-6" />{isJapanese ? content.opinion.title.ja : content.opinion.title.en}</h2>
            {hasFullAccess ? (
              <div className="space-y-6">
                <Card className="border-primary/20 bg-primary/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground italic">{isJapanese ? content.opinion.intro.ja : content.opinion.intro.en}</p></CardContent></Card>
                <div className="space-y-4">
                  {(isJapanese ? content.opinion.points.ja : content.opinion.points.en).map((point, i) => (
                    <Card key={i}><CardContent className="p-6"><h3 className="font-bold text-lg mb-3 flex items-center gap-2"><span className="text-primary font-mono">{String(i + 1).padStart(2, '0')}</span>{point.title}</h3><p className="text-muted-foreground leading-relaxed">{point.content}</p></CardContent></Card>
                  ))}
                </div>
              </div>
            ) : (
              <BlurredContent><div className="space-y-4">{[1,2,3,4].map(i => <Card key={i} className="h-32" />)}</div></BlurredContent>
            )}
          </section>

          {/* Recommendation */}
          <section id="recommendation" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2"><Lightbulb className="h-6 w-6 text-primary" />{isJapanese ? content.recommendation.title.ja : content.recommendation.title.en}</h2>
            {hasFullAccess ? (
              <Card className="border-primary/30"><CardContent className="p-6 md:p-8">
                <p className="text-sm text-muted-foreground mb-6 italic">{isJapanese ? content.recommendation.intro.ja : content.recommendation.intro.en}</p>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {(isJapanese ? content.recommendation.content.ja : content.recommendation.content.en).split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">{paragraph}</p>
                  ))}
                </div>
              </CardContent></Card>
            ) : (
              <BlurredContent><Card className="h-64" /></BlurredContent>
            )}
          </section>

          {/* Data Appendix */}
          <section id="data-appendix" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2"><Database className="h-6 w-6" />{isJapanese ? content.dataAppendix.title.ja : content.dataAppendix.title.en}</h2>
            {hasFullAccess ? (
              <Card onClick={handleDataAppendixAccess}>
                <CardHeader><CardTitle className="text-lg">{isJapanese ? content.dataAppendix.tables.keyIndicators.title.ja : content.dataAppendix.tables.keyIndicators.title.en}</CardTitle></CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b"><th className="text-left p-2 font-semibold">{isJapanese ? "指標" : "Indicator"}</th><th className="text-left p-2 font-semibold">{isJapanese ? "予測値" : "Forecast"}</th><th className="text-left p-2 font-semibold">{isJapanese ? "動向・備考" : "Trend / Notes"}</th></tr></thead>
                      <tbody>
                        {content.dataAppendix.tables.keyIndicators.data.map((row, i) => (
                          <tr key={i} className="border-b"><td className="p-2 font-medium">{row.indicator}</td><td className="p-2">{row.value}</td><td className="p-2 text-muted-foreground">{row.trend}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <BlurredContent><Card className="h-48" /></BlurredContent>
            )}
          </section>

          <FurtherInquiryNotice className="mb-8 md:mb-12" />

          {/* Sources */}
          <section id="sources" className="mb-8 md:mb-12">
            <Card className="bg-muted/30">
              <CardHeader><CardTitle className="text-lg">{isJapanese ? content.sources.title.ja : content.sources.title.en}</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {(isJapanese ? content.sources.list.ja : content.sources.list.en).map((source, i) => (<li key={i}>• {source}</li>))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-6" />
          <section className="mb-8"><p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto">{isJapanese ? content.disclaimer.ja : content.disclaimer.en}</p></section>
        </main>

        <Footer />
        <FloatingNavButton onClick={scrollToTOC} />
      </div>

      <AuthModals isLoginOpen={isLoginOpen} isSignUpOpen={isSignUpOpen} onLoginClose={() => setIsLoginOpen(false)} onSignUpClose={() => setIsSignUpOpen(false)} onSwitchToLogin={handleSwitchToLogin} onSwitchToSignUp={handleSwitchToSignUp} />
    </>
  );
};

export default ElectronicsSemiconductor;
