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
  Car
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const AutomotiveIndustry = () => {
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
        'automotive-industry',
        isJapanese ? 'タイ自動車産業の構造転換：日本企業の生き残り戦略' : 'Thailand Automotive Industry Strategic Realignment',
        'manufacturing',
        lang
      );
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(
        'automotive-industry',
        isJapanese ? 'タイ自動車産業の構造転換：日本企業の生き残り戦略' : 'Thailand Automotive Industry Strategic Realignment',
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
    { id: 'facts', label: isJapanese ? 'ファクト（市場・政策・動向）' : 'Facts (Market, Policy & Trends)' },
    { id: 'opinion', label: isJapanese ? 'WaLensの見解と示唆' : 'Opinion & Implication from WaLens' },
    { id: 'recommendation', label: isJapanese ? '日本企業経営者への提言' : 'Recommendation for Japanese Executives' },
    { id: 'data-appendix', label: isJapanese ? 'データ付録' : 'Data Appendix' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: {
      // (Doc: Executive Summary title)
      en: "Strategic Realignment: Thailand's Industrial Transformation Amidst Mega-Trends (2026 Outlook)",
      ja: "戦略的再編：メガトレンドの中でのタイ産業変革（2026年展望）"
    },
    subheadline: {
      // (Doc: Executive Summary subtitle concept)
      en: "From 'Detroit of Asia' to 'Social Issue Solution Market' — A pivot that will redefine Japanese business presence in Thailand",
      ja: "「アジアのデトロイト」から「社会課題解決型市場」へ — 日本企業のタイにおけるプレゼンスを再定義するピボット"
    },
    category: {
      en: "Manufacturing / Automotive",
      ja: "製造業 / 自動車"
    },
    lastUpdated: "2026-02-08",
    // (Doc: Executive Summary)
    executiveSummary: {
      en: [
        "Thailand has served as the 'Detroit of Asia' for nearly four decades, but data from 2024–Q1 2026 indicates that the era of uncontested Japanese hegemony has concluded. (Doc: Executive Summary)",
        "Japanese automotive market share, once hovering near 90%, has contracted to approximately 70%, eroded by Chinese EVs commanding over 80% of the pure EV segment. (Doc: Executive Summary, Ref.1,3)",
        "The Thai market is being reshaped by three mega-trends: the onset of a 'Super-Aged Society' in 2025, rapid urbanization with Smart City imperatives, and aggressive industrial upgrading (Industry 4.0). (Doc: Section 1)",
        "The report reframes Thailand not as a mere production base, but as a 'Social Issue Solution Market' — where Japan's matured capabilities in elderly care, food logistics, electronics, and education align with Thailand's urgent challenges. (Doc: Executive Summary)",
        "Five interconnected high-growth industries — Automotive (EV/Mobility), Elderly Care & Smart Home, Next-Generation Food, Advanced Electronics, and Education — offer Japanese firms a pivot from hardware selling to integrated societal solutions. (Doc: Executive Summary)"
      ],
      ja: [
        "タイは約40年間「アジアのデトロイト」として機能してきたが、2024年〜2026年Q1のデータは、日本の無競争覇権時代が終了したことを示している。（Doc: エグゼクティブサマリー）",
        "かつて約90%を誇った日系自動車のシェアは約70%に縮小し、中国EVがピュアEVセグメントの80%以上を支配している。（Doc: エグゼクティブサマリー、Ref.1,3）",
        "タイ市場は3つのメガトレンドによって再編されている：2025年の「超高齢社会」突入、スマートシティを伴う急速な都市化、そして積極的な産業高度化（Industry 4.0）。（Doc: セクション1）",
        "本レポートはタイを単なる生産拠点ではなく「社会課題解決型市場」として再定義する。日本が培った高齢者ケア、食品物流、エレクトロニクス、教育の成熟した能力がタイの喫緊の課題と合致する。（Doc: エグゼクティブサマリー）",
        "5つの相互連関する成長産業 — 自動車（EV/モビリティ）、高齢者ケア＆スマートホーム、次世代食品、先端エレクトロニクス、教育 — が、日本企業にハードウェア販売から統合的ソシエタルソリューションへのピボットを提供する。（Doc: エグゼクティブサマリー）"
      ]
    },

    // Facts Section - Market Data (Doc: Section 2)
    marketStructure: {
      title: { en: "Automotive Market Structure: The New Reality", ja: "自動車市場構造：新しい現実" },
      segments: {
        en: [
          // (Doc: Section 2.1, Table)
          { name: "Japanese OEM Market Share", share: "~70%", growth: "↓ from 90%", players: "Toyota, Isuzu, Honda, Nissan, Mazda" },
          { name: "Chinese EV Market Dominance", share: ">80%", growth: "↑ Rapid", players: "BYD, Changan, GWM, MG (SAIC)" },
          { name: "Pickup Truck Segment", share: "~50% of domestic", growth: "Stable but threatened", players: "Toyota Hilux, Isuzu D-Max (legacy fortress)" },
          { name: "Hybrid (HEV/PHEV)", share: "Growing", growth: "+28% YoY", players: "Toyota, Honda — excise tax incentives 2028–2032" },
          { name: "Connected Car / SDV", share: "Emerging", growth: "+35% YoY", players: "Changan R&D center leads; Japanese Tier-1s lagging" }
        ],
        ja: [
          { name: "日系OEM市場シェア", share: "約70%", growth: "90%から↓", players: "トヨタ、いすゞ、ホンダ、日産、マツダ" },
          { name: "中国EV市場支配", share: "80%超", growth: "↑ 急速拡大", players: "BYD、長安、GWM、MG（SAIC）" },
          { name: "ピックアップトラックセグメント", share: "国内販売の約50%", growth: "安定だが脅威下", players: "トヨタ ハイラックス、いすゞ D-Max（レガシーの砦）" },
          { name: "ハイブリッド（HEV/PHEV）", share: "拡大中", growth: "+28% YoY", players: "トヨタ、ホンダ — 物品税優遇2028–2032" },
          { name: "コネクテッドカー / SDV", share: "新興", growth: "+35% YoY", players: "長安R&Dセンターがリード；日系Tier-1は後追い" }
        ]
      }
    },

    // (Doc: Section 2.1–2.3)
    keyPlayers: {
      title: { en: "Key Players & Strategic Postures", ja: "主要プレイヤーと戦略的姿勢" },
      data: {
        en: [
          // (Doc: Section 2.2, 2.3)
          { segment: "Chinese OEMs (BEV)", examples: "BYD, Changan, GWM, MG", status: "Full-scale FDI 'Blitzkrieg' in Rayong; mass-market BEV dominance" },
          { segment: "Toyota", examples: "Hilux Revo BEV, FCEV variant, HEV lineup", status: "Multi-Pathway defense; commercial fleet + hydrogen pivot" },
          { segment: "Isuzu", examples: "D-Max EV (export-led: Norway, UK, Australia)", status: "Export-first EV strategy; diesel domestic continuation" },
          { segment: "Honda / Others", examples: "City e:HEV, Yaris Cross HEV", status: "Hybrid 'safe harbor'; leveraging reliability + resale value" },
          { segment: "CP Group × Toyota", examples: "Hydrogen logistics partnership", status: "Biogas-to-hydrogen for FCEV trucks; decarbonized food cold chain" }
        ],
        ja: [
          { segment: "中国OEM（BEV）", examples: "BYD、長安、GWM、MG", status: "ラヨーンでのFDI電撃戦；マスマーケットBEV支配" },
          { segment: "トヨタ", examples: "ハイラックス レボ BEV、FCEV、HEVラインナップ", status: "マルチパスウェイ防衛；商用フリート＋水素ピボット" },
          { segment: "いすゞ", examples: "D-Max EV（輸出先行：ノルウェー、英国、豪州）", status: "輸出先行型EV戦略；国内ではディーゼル継続" },
          { segment: "ホンダ / その他", examples: "City e:HEV、ヤリスクロス HEV", status: "ハイブリッド「セーフハーバー」；信頼性＋リセールバリュー活用" },
          { segment: "CPグループ × トヨタ", examples: "水素ロジスティクス提携", status: "バイオガスからFCEVトラック用水素生産；脱炭素食品コールドチェーン" }
        ]
      }
    },

    // (Doc: Section 1.3, 2.3, 4)
    policyInsights: {
      title: { en: "Policy & Regulation", ja: "政策・規制" },
      items: {
        en: [
          // (Doc: Section 1.3, Ref.5)
          { policy: "BOI Incentive Overhaul (2025–2027)", content: "Incentives restructured to favor high-tech manufacturing over simple assembly. Battery cell/module production receives 8–15 years CIT exemption. Chinese entrants have secured most early allocations. (Doc: Section 1.3, 6.2)", citation: "BOI Investment Promotion Guide, 2025 (Ref.5,21)" },
          // (Doc: Section 2.3, Ref.15)
          { policy: "Hybrid Excise Tax Incentives (2028–2032)", content: "New excise tax reduction specifically for HEV manufacturing — a lifeline for Japanese OEMs' 'bridge strategy.' Enables aggressive HEV lineup expansion while BEV infrastructure catches up. (Doc: Section 2.3)", citation: "Legal 500 / Thai Revenue Department (Ref.15)" },
          // (Doc: Section 2.4, Ref.6,16)
          { policy: "Australia NVES (New Vehicle Efficiency Standard)", content: "Australia introduced NVES in 2025, penalizing high-emission vehicles. Thai auto exports to Australia dropped ~16% in first 7 months of 2025. Forces acceleration of RHD electrified pickup production. (Doc: Section 2.4)", citation: "AfMA / Nation Thailand (Ref.6,16)" },
          // (Doc: Section 4.2)
          { policy: "EV 3.5 Local Content Requirements", content: "40% local content requirement for EV production. Japanese Tier-2/3 suppliers positioned as 'local content solution' for Chinese OEMs facing government pressure to increase local sourcing. (Doc: Section 4.2)", citation: "ASEAN Briefing (Ref.7)" }
        ],
        ja: [
          { policy: "BOI優遇制度改編（2025–2027）", content: "優遇措置が単純組立から高度技術製造にシフト。バッテリーセル/モジュール生産に8–15年の法人税免除。中国系参入者が初期枠の大半を確保済み。（Doc: セクション1.3, 6.2）", citation: "BOI投資促進ガイド、2025年（Ref.5,21）" },
          { policy: "ハイブリッド物品税優遇（2028–2032）", content: "HEV製造向けの新物品税軽減措置 — 日系OEMの「ブリッジ戦略」のライフライン。BEVインフラが追いつくまでHEVラインナップの積極拡大を可能にする。（Doc: セクション2.3）", citation: "Legal 500 / タイ国税局（Ref.15）" },
          { policy: "豪州NVES（新車効率基準）", content: "豪州は2025年にNVESを導入し、高排出車にペナルティを課す。タイの対豪自動車輸出は2025年前7か月で約16%減少。右ハンドル電動ピックアップの生産加速を余儀なくされる。（Doc: セクション2.4）", citation: "AfMA / Nation Thailand（Ref.6,16）" },
          { policy: "EV 3.5 現地調達要件", content: "EV生産に40%の現地調達義務。日系Tier-2/3サプライヤーは、政府から現地調達比率引き上げを求められる中国OEMにとっての「ローカルコンテンツソリューション」として有利なポジション。（Doc: セクション4.2）", citation: "ASEAN Briefing（Ref.7）" }
        ]
      }
    },

    // (Doc: Section 3, 5)
    opportunities: {
      en: [
        "Elderly Care × Mobility: 'Welcab' (wheelchair-accessible) EV variants — standard in Japan, niche vacuum in Thailand (Doc: Section 3.1)",
        "V2H (Vehicle-to-Home): EV as backup power for smart senior housing — differentiator vs. Chinese EVs focused on range/speed (Doc: Section 3.1)",
        "Hydrogen logistics: CP Group × Toyota biogas-to-hydrogen model — decarbonized food cold chain; value proposition Chinese BEV trucks cannot match (Doc: Section 7)",
        "Tier-2/3 supplier pivot to Medical Devices, Aerospace leveraging precision machining capabilities (Doc: Section 4.2)",
        "'White Label' supply to Chinese OEMs: Japanese quality standards as local content solution for BYD/Changan (Doc: Section 4.2)"
      ],
      ja: [
        "高齢者ケア × モビリティ：「ウェルキャブ」（車椅子対応）EV — 日本では標準、タイではニッチの空白（Doc: セクション3.1）",
        "V2H（ビークル・トゥ・ホーム）：スマートシニア住宅のバックアップ電源としてのEV — 航続距離/スピード重視の中国EVとの差別化要因（Doc: セクション3.1）",
        "水素ロジスティクス：CPグループ × トヨタのバイオガス水素モデル — 脱炭素食品コールドチェーン；中国BEVトラックが提供できない価値提案（Doc: セクション7）",
        "Tier-2/3サプライヤーの精密加工能力を活かした医療機器・航空宇宙へのピボット（Doc: セクション4.2）",
        "中国OEMへの「ホワイトラベル」供給：BYD/長安のローカルコンテンツソリューションとしての日本品質基準（Doc: セクション4.2）"
      ]
    },

    risks: {
      en: [
        "Irreversible passenger EV market share loss: Chinese BEVs dominate >80% of pure EV segment; short-term recovery unlikely (Doc: Section 2.1,2.2)",
        "Australia NVES export shock: ~16% drop in Thai auto exports to Australia; threatens factory utilization rates (Doc: Section 2.4, Ref.16)",
        "Tier-2/3 supply chain 'Volume Cliff': ICE vehicles require ~30,000 parts vs. EV ~3,000 — structural demand collapse for traditional components (Doc: Section 4.1, Ref.24)",
        "Software-Defined Vehicle (SDV) gap: Chinese firms lead in ADAS, digital cockpit, Thai-language voice recognition; Japanese Tier-1s lag (Doc: Section 3.3)",
        "Decision-making speed mismatch: 'China Speed' vs. 'Checking with Tokyo' — empowering local management is critical (Doc: Section 5.4)"
      ],
      ja: [
        "乗用EV市場シェアの不可逆的喪失：中国BEVがピュアEVセグメントの80%超を支配；短期的回復は困難（Doc: セクション2.1,2.2）",
        "豪州NVES輸出ショック：対豪自動車輸出約16%減；工場稼働率を脅かす（Doc: セクション2.4、Ref.16）",
        "Tier-2/3サプライチェーン「ボリュームクリフ」：ICE車は約30,000部品 vs. EV約3,000部品 — 従来部品の構造的需要崩壊（Doc: セクション4.1、Ref.24）",
        "ソフトウェア・デファインド・ビークル（SDV）ギャップ：中国勢がADAS、デジタルコックピット、タイ語音声認識でリード；日系Tier-1は後追い（Doc: セクション3.3）",
        "意思決定スピードのミスマッチ：「チャイナスピード」vs.「東京に確認」— 現地マネジメントへの権限委譲が不可欠（Doc: セクション5.4）"
      ]
    },

    // Opinion & Implication (Doc: WaLens independent analysis)
    opinion: {
      title: { en: "WaLens Analysis: Structural Interpretation", ja: "WaLensの分析：構造的解釈" },
      intro: {
        en: "The following represents WaLens' independent analysis based on the facts presented above. These are interpretive observations, not objective data points.",
        ja: "以下は上記のファクトに基づくWaLensの独自分析です。これらは解釈的な見解であり、客観的なデータポイントではありません。"
      },
      points: {
        en: [
          {
            // (Doc: Section 2.1, 2.2 — WaLens interpretation)
            title: "The Passenger EV Battle is Already Lost — The Question is What Comes Next",
            content: "Japanese OEMs' share contraction from ~90% to ~70% is not a temporary dip but a structural repositioning. Chinese BEVs' >80% pure EV dominance reflects fundamental advantages in software integration, battery cost structure, and speed-to-market. The critical insight is that defending the passenger car segment through incremental electrification is a losing strategy. The more productive question is: where can Japanese firms create value that Chinese competitors structurally cannot?"
          },
          {
            // (Doc: Section 5.1, Section 7 — WaLens interpretation)
            title: "From 'Hardware Seller' to 'System Integrator' — The Only Viable Pivot",
            content: "The Toyota-CP Group hydrogen project reveals the winning formula: do not compete on vehicle price; compete on ecosystem value. Converting poultry farm biogas into hydrogen for FCEV logistics trucks while decarbonizing the food cold chain — this creates a multi-stakeholder value web that a standalone BEV truck sale cannot replicate. Japanese companies' competitive advantage lies in orchestrating complex, trust-dependent systems across multiple industries, not in selling individual hardware units."
          },
          {
            // (Doc: Section 4.1, 4.2 — WaLens interpretation)
            title: "The Tier-2/3 Supply Chain Crisis is an Existential Threat — But Also a Hidden Asset",
            content: "The 'Volume Cliff' (30,000 parts → 3,000) threatens to hollow out the Japanese supply chain ecosystem. However, these SMEs' precision machining capabilities are transferable to Medical Devices, Aerospace, and Agricultural machinery. More strategically, Chinese OEMs under 40% local content pressure need reliable local suppliers. Japanese Tier-2s can become the 'quality bridge' between Chinese OEMs and Thai local content requirements — an ironic but commercially viable position."
          },
          {
            // (Doc: Section 3.1, 1.1 — WaLens interpretation)
            title: "The 'Super-Aged Society' × Automotive Convergence is Japan's Natural Moat",
            content: "Thailand's 2025 Super-Aged Society threshold creates urgent demand for Welcab vehicles, V2H energy systems, and remote health monitoring — areas where Japan has decades of 'advanced country' experience that China simply doesn't possess. This is not about technology; it's about having lived through and solved these societal problems domestically. Japanese firms should treat Thailand's aging crisis as their strongest competitive advantage, not as a peripheral market."
          }
        ],
        ja: [
          {
            title: "乗用EVの戦いは既に決着 — 問われるのは「次に何をするか」",
            content: "日系OEMのシェアが約90%から約70%に縮小したのは一時的な落ち込みではなく、構造的再編である。中国BEVがピュアEVの80%超を支配している事実は、ソフトウェア統合、バッテリーコスト構造、市場投入スピードにおける根本的優位を反映している。重要な洞察は、乗用車セグメントを漸進的電動化で守ることは敗北の戦略であるということだ。より生産的な問いは、「中国の競合が構造的にできないところで、日本企業はどこに価値を創造できるか」である。"
          },
          {
            title: "「ハードウェア販売者」から「システムインテグレーター」へ — 唯一の実行可能なピボット",
            content: "トヨタ-CPグループの水素プロジェクトは勝利の方程式を明かしている：車両価格で競争するのではなく、エコシステム価値で競争せよ。養鶏場のバイオガスをFCEV物流トラック用水素に変換しながら食品コールドチェーンを脱炭素化する — これは単体のBEVトラック販売では複製できないマルチステークホルダー価値のウェブを創出する。日本企業の競争優位は、複数産業にまたがる複雑で信頼依存型のシステムをオーケストレーションすることにあり、個々のハードウェアユニットを販売することにはない。"
          },
          {
            title: "Tier-2/3サプライチェーン危機は存亡の脅威 — だが隠れた資産でもある",
            content: "「ボリュームクリフ」（30,000部品→3,000部品）は日系サプライチェーンエコシステムの空洞化を脅かす。しかし、これらSMEの精密加工能力は医療機器、航空宇宙、農業機械に転用可能である。さらに戦略的に見れば、40%のローカルコンテンツ圧力下にある中国OEMは信頼性の高い現地サプライヤーを必要としている。日系Tier-2は中国OEMとタイのローカルコンテンツ要件の間の「品質の橋」となりうる — 皮肉だが商業的に実現可能なポジションである。"
          },
          {
            title: "「超高齢社会」× 自動車のコンバージェンスは日本の天然の堀",
            content: "タイの2025年超高齢社会到達は、ウェルキャブ車両、V2Hエネルギーシステム、遠隔健康モニタリングへの緊急需要を生み出している — 中国が単に持ち合わせていない、日本が数十年の「先進国」経験を有する分野である。これは技術の問題ではない；国内でこれらの社会的問題を経験し解決してきたという実績の問題である。日本企業はタイの高齢化危機を周辺市場としてではなく、最強の競争優位として扱うべきである。"
          }
        ]
      }
    },

    // Recommendation (Doc: Section 5)
    recommendation: {
      title: { en: "Strategic Recommendation for Japanese Executives", ja: "日本企業経営者への戦略的提言" },
      intro: {
        en: "Based on WaLens' analysis and the document's five strategic recommendations, the following framework is offered for executive decision-making.",
        ja: "WaLensの分析とドキュメントの5つの戦略提言に基づき、経営判断のためのフレームワークを提供する。"
      },
      content: {
        // (Doc: Section 5.1–5.5)
        en: `Recommendation 1: Shift from "Hardware Seller" to "System Integrator"
Do not compete with Chinese firms solely on vehicle hardware price. Compete on ecosystem value. Offer packages that integrate the vehicle, charging/hydrogen infrastructure, fleet management data platform, and battery lifecycle management (recycling/repurposing). The Toyota-CP Group hydrogen project is the gold standard for this approach. (Doc: Section 5.1)

Recommendation 2: Defend the Commercial Fortress with Tech-Agnosticism
The pickup truck segment is the last line of defense. Deploy the "Multi-Pathway" strategy to offer what Chinese BEVs cannot: reliability in extreme conditions. Promote Hydrogen FCEV for long-haul heavy transport (where batteries fail) and robust Hybrids for rural agriculture. Position the Hilux BEV not as a mass-market truck, but as a specialized tool for corporate ESG goals. (Doc: Section 5.2)

Recommendation 3: Monetize the "Social Solution"
Leverage Japan's brand trust in Elderly Care and Food Safety. Use automotive technology (thermal management, automation, connectivity) to build products for the Super-Aged Society and Next-Gen Food cold chains. This diversification protects revenue streams against car market volatility. (Doc: Section 5.3)

Recommendation 4: Rapid Localization of Decision-Making
The era of "checking with Tokyo" for every decision is too slow to compete with "China Speed." Empower local Thai management to make product and partnership decisions. Establish local R&D centers that iterate software and design features for ASEAN consumers, mirroring the Changan strategy. (Doc: Section 5.4)

Recommendation 5: Proactive Supply Chain Rescue
Do not let the Tier 2/3 supply chain collapse. Actively assist these suppliers in pivoting to Medical Devices, Aerospace, and Agriculture machinery. A hollowed-out supply chain will ultimately hurt Japanese OEMs' ability to manufacture competitively in Thailand. (Doc: Section 5.5)`,
        ja: `提言1：「ハードウェア販売者」から「システムインテグレーター」への転換
中国企業と車両ハードウェアの価格だけで競争してはならない。エコシステムの価値で競争せよ。車両、充電/水素インフラ、フリート管理データプラットフォーム、バッテリーライフサイクル管理（リサイクル/リパーパス）を統合したパッケージを提供する。トヨタ-CPグループの水素プロジェクトがこのアプローチのゴールドスタンダードである。（Doc: セクション5.1）

提言2：技術不可知論で商用車の砦を守る
ピックアップトラックセグメントが最後の防衛線である。「マルチパスウェイ」戦略を展開し、中国BEVが提供できないもの — 過酷な条件下での信頼性 — を提供する。長距離重量輸送（バッテリーが機能しない領域）には水素FCEVを、農村部の農業にはロバストなハイブリッドを推進する。ハイラックスBEVはマス市場のトラックではなく、企業のESG目標のための専門ツールとして位置づける。（Doc: セクション5.2）

提言3：「ソーシャルソリューション」のマネタイズ
高齢者ケアと食品安全における日本のブランド信頼を活用する。自動車技術（熱管理、自動化、コネクティビティ）を使って、超高齢社会と次世代食品コールドチェーンのための製品を構築する。この多角化は自動車市場のボラティリティから収益を守る。（Doc: セクション5.3）

提言4：意思決定の迅速な現地化
すべての決定で「東京に確認」する時代は「チャイナスピード」と競争するには遅すぎる。タイの現地マネジメントに製品・パートナーシップの決定権限を委譲する。長安の戦略を鏡とし、ASEANの消費者向けにソフトウェアとデザインを反復する現地R&Dセンターを設立する。（Doc: セクション5.4）

提言5：サプライチェーンの先制的救済
Tier-2/3サプライチェーンを崩壊させてはならない。これらのサプライヤーが医療機器、航空宇宙、農業機械へピボットすることを積極的に支援する。空洞化したサプライチェーンは最終的に日系OEMのタイでの競争力ある製造能力を損なう。（Doc: セクション5.5）`
      }
    },

    // Data Appendix (Doc: Section 6)
    dataAppendix: {
      title: { en: "Data Appendix", ja: "データ付録" },
      tables: {
        evMarketShare: {
          // (Doc: Section 6.1, Table 2)
          title: { en: "Projected EV Market Share in Thailand (2024–2026)", ja: "タイにおけるEV市場シェア予測（2024–2026）" },
          data: [
            { manufacturer: isJapanese ? "中国（BYD, GWM等）" : "China (BYD, GWM, etc.)", y2024: "~80%", y2025: "~85%", y2026: "~82%", focus: isJapanese ? "マスマーケットBEV、RHD市場輸出" : "Mass Market BEV, Export to RHD Markets" },
            { manufacturer: isJapanese ? "日本（トヨタ, ホンダ）" : "Japan (Toyota, Honda)", y2024: "<1%", y2025: "~5%", y2026: "~10%", focus: isJapanese ? "商用BEV、HEV/PHEV、プレミアム" : "Commercial BEV, HEV/PHEV, Premium Segment" },
            { manufacturer: isJapanese ? "韓国（ヒュンダイ/起亜）" : "Korea (Hyundai/Kia)", y2024: "<5%", y2025: "~5%", y2026: "~6%", focus: isJapanese ? "ニッチBEV、組立現地化" : "Niche BEV, Assembly Localization" },
            { manufacturer: isJapanese ? "その他（テスラ, BMW）" : "Others (Tesla, BMW)", y2024: "~10%", y2025: "~5%", y2026: "~2%", focus: isJapanese ? "プレミアムラグジュアリー" : "Premium Luxury Segment" }
          ]
        },
        boiIncentives: {
          // (Doc: Section 6.2)
          title: { en: "BOI Incentive Structure for Automotive Transformation", ja: "自動車産業変革に向けたBOI優遇構造" },
          data: [
            { industry: isJapanese ? "自動車" : "Automotive", activity: isJapanese ? "バッテリーセル/モジュール" : "Battery Cells/Modules", incentive: isJapanese ? "CIT免除8–15年" : "8–15 Years CIT Exemption", relevance: isJapanese ? "現地バリューチェーンに不可欠" : "Critical for localized value chain" },
            { industry: isJapanese ? "自動車" : "Automotive", activity: isJapanese ? "HEV製造" : "HEV Manufacturing", incentive: isJapanese ? "物品税軽減" : "Excise Tax Reduction (2028–2032)", relevance: isJapanese ? "日系OEMの「ブリッジ」戦略" : "'Bridge' strategy for Japanese OEMs" },
            { industry: isJapanese ? "エレクトロニクス" : "Electronics", activity: isJapanese ? "パワーエレクトロニクス" : "Power Electronics", incentive: "A1/A2", relevance: isJapanese ? "自動車×テックの統合" : "Integration of Auto & Tech sectors" },
            { industry: isJapanese ? "デジタル" : "Digital", activity: isJapanese ? "クラウド/データセンター" : "Cloud / Data Center", incentive: isJapanese ? "CIT免除+スマートビザ" : "CIT Exemption + Smart Visa", relevance: isJapanese ? "コネクテッドカー＆スマートシティのインフラ" : "Infrastructure for Connected Cars & Smart Cities" },
            { industry: isJapanese ? "教育" : "Education", activity: isJapanese ? "ハイテク研修センター" : "High-Tech Training Centers", incentive: isJapanese ? "メリットベース優遇" : "Merit-based Incentives", relevance: isJapanese ? "Industry 4.0人材育成" : "Upskilling for Industry 4.0" }
          ]
        },
        supplyChainImpact: {
          // (Doc: Section 4.1)
          title: { en: "ICE vs. EV Parts Complexity & Supply Chain Impact", ja: "ICE vs. EV 部品複雑性とサプライチェーンへの影響" },
          data: [
            { metric: isJapanese ? "部品点数" : "Parts Count", ice: "~30,000", ev: "~3,000", impact: isJapanese ? "Tier-2/3の構造的需要崩壊" : "Structural demand collapse for Tier-2/3" },
            { metric: isJapanese ? "主要消失部品" : "Key Eliminated Components", ice: isJapanese ? "ピストン、燃料噴射、排気系" : "Pistons, Fuel Injection, Exhaust", ev: "N/A", impact: isJapanese ? "SME即時影響" : "Immediate SME impact" },
            { metric: isJapanese ? "新規需要部品" : "New Demand Components", ice: "N/A", ev: isJapanese ? "BMS、インバーター、SiCチップ" : "BMS, Inverters, SiC Chips", impact: isJapanese ? "日系エレクトロニクスの好機" : "Opportunity for Japanese electronics" }
          ]
        }
      }
    },

    // (Doc: Works Cited)
    sources: {
      title: { en: "Sources & Methodology", ja: "出典・方法論" },
      list: {
        en: [
          "China auto brands to top 2025 global sales, overtaking Japanese rivals — Nation Thailand (Ref.1)",
          "Japanese automakers losing market share in Southeast Asia — Asian News Network (Ref.2)",
          "Thailand's 'Green Rush': China, Japan… — NUS Research (Ref.3)",
          "'Fulfillment of Decarbonized City' Toyota hands over first Thailand… — Toyota Asia (Ref.4)",
          "Thailand's New Investment Strategy & Business… — BOI (Ref.5)",
          "Thai auto exports to drop amid Australia's new import standards — AfMA (Ref.6)",
          "BOI EV 3.5 Policy in Thailand — ASEAN Briefing (Ref.7)",
          "Changan Unveils Full New Energy Lineup at Thailand Expo 2025 (Ref.8)",
          "Sunwoda $1bn EV battery cell production — Just Auto (Ref.9)",
          "SVOLT Thailand factory 10,000th battery pack — Gasgoo (Ref.10)",
          "Toyota Hilux Revo BEV / FCEV variant — Toyota Global, Electrive (Ref.11,12)",
          "Isuzu D-MAX EV production in Thailand — Isuzu, Just Auto (Ref.13,14)",
          "Thailand Hybrid Vehicle Investment Incentives — Legal 500 (Ref.15)",
          "Thai car exports to drop below 1 million — Nation Thailand / KResearch (Ref.16)",
          "Asia Pacific Connected Cars Market 2025–2034 — GM Insights (Ref.17)",
          "CP Group × Toyota Carbon Neutrality Partnership — Toyota Asia, CP Global (Ref.18,19,20)",
          "BOI Investment Promotion Guide 2025 (Ref.21)",
          "Industry Outlook 2026–2028: Electronics — Krungsri Research (Ref.22)",
          "EV Conversion Industry Potential — MDPI (Ref.24)",
          "Thailand's Renewed BOI Incentives 2026–2027 — Alvarez & Marsal (Ref.25)",
          "CP Group Toyota CJPT Decarbonization Milestones — Toyota Asia (Ref.26)",
          "WaLens Field Research — Executive Interviews & Site Visits (Q4 2025–Q1 2026)"
        ],
        ja: [
          "中国自動車ブランド、2025年グローバル販売で首位 — Nation Thailand（Ref.1）",
          "日系自動車メーカー、東南アジアで市場シェア喪失 — Asian News Network（Ref.2）",
          "タイの「グリーンラッシュ」：中国、日本… — NUS Research（Ref.3）",
          "「脱炭素都市の実現」トヨタ、タイで初の… — Toyota Asia（Ref.4）",
          "タイの新投資戦略 — BOI（Ref.5）",
          "豪州の新輸入基準によりタイ自動車輸出減少 — AfMA（Ref.6）",
          "BOI EV 3.5政策 — ASEAN Briefing（Ref.7）",
          "長安、タイモーターエキスポ2025でフルNEVラインナップ公開（Ref.8）",
          "Sunwoda、10億ドルのEVバッテリーセル生産施設 — Just Auto（Ref.9）",
          "SVOLTタイ工場、1万台目のバッテリーパック — Gasgoo（Ref.10）",
          "トヨタ ハイラックス レボ BEV / FCEV — Toyota Global, Electrive（Ref.11,12）",
          "いすゞ D-MAX EV タイ生産開始 — Isuzu, Just Auto（Ref.13,14）",
          "タイのハイブリッド車投資優遇措置 — Legal 500（Ref.15）",
          "タイ自動車輸出100万台割れ — Nation Thailand / KResearch（Ref.16）",
          "アジア太平洋コネクテッドカー市場 2025–2034 — GM Insights（Ref.17）",
          "CPグループ × トヨタ カーボンニュートラル提携 — Toyota Asia, CP Global（Ref.18,19,20）",
          "BOI投資促進ガイド 2025（Ref.21）",
          "産業見通し 2026–2028：エレクトロニクス — Krungsri Research（Ref.22）",
          "EV転換産業の可能性 — MDPI（Ref.24）",
          "タイの更新BOI優遇措置 2026–2027 — Alvarez & Marsal（Ref.25）",
          "CPグループ トヨタ CJPT 脱炭素マイルストーン — Toyota Asia（Ref.26）",
          "WaLensフィールドリサーチ — 経営幹部インタビュー・現地視察（2025年Q4–2026年Q1）"
        ]
      }
    },
    disclaimer: {
      en: "This report is prepared by WaLens for informational purposes only. The analysis and opinions expressed are those of WaLens and do not constitute investment advice, legal advice, or recommendation to take any specific action. All data from third-party sources is attributed and should be verified independently. © 2026 WaLens. All rights reserved. This report is for the exclusive use of the subscriber and may not be redistributed without permission.",
      ja: "本レポートはWaLensが情報提供のみを目的として作成したものです。表明された分析および意見はWaLensのものであり、投資アドバイス、法的アドバイス、または特定の行動を取ることの推奨を構成するものではありません。第三者ソースからのすべてのデータは帰属表示され、独立して検証されるべきです。© 2026 WaLens. 無断転載禁止。本レポートは購読者専用であり、許可なく再配布することはできません。"
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
        title={isJapanese ? "タイ自動車産業の構造転換レポート | WaLens" : "Thailand Automotive Industry Strategic Realignment | WaLens"}
        description={isJapanese 
          ? "タイ自動車産業の構造的変革：中国EVの台頭、マルチパスウェイ戦略、5つの連関産業を通じた日系企業の生き残り戦略を徹底分析。"
          : "Strategic analysis of Thailand's automotive industry transformation: Chinese EV surge, Multi-Pathway defense, and 5 interconnected industries for Japanese survival strategy."
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
                { label: isJapanese ? "自動車産業" : "Automotive Industry" }
              ]}
            />
          </div>

          {/* Hero Section */}
          <section className="mb-8 md:mb-12">
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img 
                src={heroImage} 
                alt={isJapanese ? "タイ自動車産業" : "Thailand Automotive Industry"}
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

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                {isJapanese ? "最終更新" : "Last Updated"}: {content.lastUpdated}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {isJapanese ? "読了時間：15分" : "15 min read"}
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
                      <Car className="h-5 w-5" />
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

          {/* Data Appendix */}
          <section id="data-appendix" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
              <Database className="h-6 w-6" />
              {isJapanese ? content.dataAppendix.title.ja : content.dataAppendix.title.en}
            </h2>

            {hasFullAccess ? (
              <div className="space-y-6" onClick={handleDataAppendixAccess}>
                {/* EV Market Share Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isJapanese ? content.dataAppendix.tables.evMarketShare.title.ja : content.dataAppendix.tables.evMarketShare.title.en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2 font-semibold">{isJapanese ? "メーカー" : "Manufacturer"}</th>
                            <th className="text-center p-2 font-semibold">2024</th>
                            <th className="text-center p-2 font-semibold">2025 (Est.)</th>
                            <th className="text-center p-2 font-semibold">2026 (F)</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "戦略フォーカス" : "Strategic Focus"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.dataAppendix.tables.evMarketShare.data.map((row, i) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="p-2 font-medium">{row.manufacturer}</td>
                              <td className="p-2 text-center">{row.y2024}</td>
                              <td className="p-2 text-center">{row.y2025}</td>
                              <td className="p-2 text-center">{row.y2026}</td>
                              <td className="p-2 text-muted-foreground">{row.focus}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 italic">
                      {isJapanese ? "出典：Doc セクション6.1, Ref.1, 市場トレンド分析に基づく推計" : "Source: Doc Section 6.1, Ref.1, derived from market trend analysis"}
                    </p>
                  </CardContent>
                </Card>

                {/* BOI Incentives Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isJapanese ? content.dataAppendix.tables.boiIncentives.title.ja : content.dataAppendix.tables.boiIncentives.title.en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2 font-semibold">{isJapanese ? "産業" : "Industry"}</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "活動" : "Activity"}</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "優遇レベル" : "Incentive Level"}</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "戦略的意義" : "Strategic Relevance"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.dataAppendix.tables.boiIncentives.data.map((row, i) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="p-2 font-medium">{row.industry}</td>
                              <td className="p-2">{row.activity}</td>
                              <td className="p-2">{row.incentive}</td>
                              <td className="p-2 text-muted-foreground">{row.relevance}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 italic">
                      {isJapanese ? "出典：BOI投資促進ガイド（Ref.21）" : "Source: BOI Investment Promotion Guide (Ref.21)"}
                    </p>
                  </CardContent>
                </Card>

                {/* Supply Chain Impact Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isJapanese ? content.dataAppendix.tables.supplyChainImpact.title.ja : content.dataAppendix.tables.supplyChainImpact.title.en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2 font-semibold">{isJapanese ? "指標" : "Metric"}</th>
                            <th className="text-center p-2 font-semibold">ICE</th>
                            <th className="text-center p-2 font-semibold">EV</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "影響" : "Impact"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.dataAppendix.tables.supplyChainImpact.data.map((row, i) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="p-2 font-medium">{row.metric}</td>
                              <td className="p-2 text-center">{row.ice}</td>
                              <td className="p-2 text-center">{row.ev}</td>
                              <td className="p-2 text-muted-foreground">{row.impact}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 italic">
                      {isJapanese ? "出典：Doc セクション4.1（Ref.24）" : "Source: Doc Section 4.1 (Ref.24)"}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <BlurredContent>
                <div className="space-y-6">
                  <Card className="h-48" />
                  <Card className="h-48" />
                  <Card className="h-32" />
                </div>
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

export default AutomotiveIndustry;
