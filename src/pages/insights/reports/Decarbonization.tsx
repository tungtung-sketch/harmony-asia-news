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
  Leaf,
  Wind,
  Globe
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const Decarbonization = () => {
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
        'decarbonization',
        isJapanese ? 'タイ脱炭素化レポート' : 'Thailand Decarbonization Report',
        'services',
        lang
      );
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(
        'decarbonization',
        isJapanese ? 'タイ脱炭素化レポート' : 'Thailand Decarbonization Report',
        'services',
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
    { id: 'facts', label: isJapanese ? 'ファクト（政策・市場・動向）' : 'Facts (Policy, Market & Trends)' },
    { id: 'opinion', label: isJapanese ? 'WaLensの見解と示唆' : 'Opinion & Implication from WaLens' },
    { id: 'recommendation', label: isJapanese ? '日本企業経営者への提言' : 'Recommendation for Japanese Executives' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: {
      en: "Thailand's Decarbonization Agenda: From Targets to Enforceable Policy Stack",
      ja: "タイの脱炭素化：「目標」から「執行可能な政策体系」への転換"
    },
    subheadline: {
      en: "NDC 3.0, carbon tax, climate law, and green electricity — the policy stack that will reshape Japanese operations in Thailand",
      ja: "NDC 3.0、炭素税、気候変動法、グリーン電力——日系企業のタイ事業を再編する政策体系"
    },
    category: {
      en: "Cross-Industry / Decarbonization",
      ja: "全産業横断 / 脱炭素化"
    },
    lastUpdated: "2026-02-08",
    executiveSummary: {
      en: [
        "Thailand has submitted NDC 3.0 to the UNFCCC, bringing forward its net-zero ambition to 2050 — 15 years earlier than the previously stated 2065 pathway. The absolute net GHG target for 2035 is 152 million tCO₂e, a 47% reduction vs. 2019. (Doc: Executive brief)", 
        "A carbon tax of THB 200/tCO₂e has been approved at Cabinet level, initially embedded into the excise structure for oil/petroleum products to avoid immediate burden while establishing a pricing mechanism. (Doc: Carbon pricing section)",
        "The draft Climate Change Act explicitly includes ETS, CBAM mechanisms, a Climate Fund, a national GHG database, and penalties for non-reporting/false reporting — signaling that compliance obligations will harden. (Doc: National targets and governance)",
        "Thailand is operationalizing green electricity procurement via Utility Green Tariff (UGT) and a Direct PPA via Third-Party Access pilot (initially for BOI-promoted data centers), both built around structured REC and grid-access rules. (Doc: Power sector transition)",
        "Japan-Thailand JCM cooperation was renewed in July 2024; Premium T-VER credits are explicitly designed for international equivalence, and Thailand has formalized corresponding-adjustment rules for international credit transfers. (Doc: Carbon markets)"
      ],
      ja: [
        "タイはNDC 3.0をUNFCCCに提出し、ネットゼロ目標を2065年から2050年へ15年前倒し。2035年の絶対的ネットGHG排出目標は1.52億tCO₂eで、2019年比47%削減。（Doc: Executive brief）",
        "THB 200/tCO₂eの炭素税が閣議承認済み。初期段階では石油・石油製品の物品税構造に組み込み、即時の負担を回避しつつ価格メカニズムを確立。（Doc: Carbon pricing section）",
        "気候変動法案にはETS、CBAMメカニズム、気候基金、国家GHGデータベース、未報告・虚偽報告への罰則が明示的に含まれ、コンプライアンス義務の強化を示唆。（Doc: National targets and governance）",
        "グリーン電力調達をUtility Green Tariff（UGT）とDirect PPA via Third-Party Accessパイロット（BOI促進データセンター向け）で制度化。構造化されたRECとグリッドアクセスルールに基づく。（Doc: Power sector transition）",
        "日タイJCM協力は2024年7月に更新。Premium T-VERクレジットは国際同等性を明示的に設計。タイは国際クレジット移転の「対応する調整」ルールを正式化済み。（Doc: Carbon markets）"
      ]
    },
    // Facts: Policy & Regulation
    policyInsights: {
      title: { en: "Policy & Regulation", ja: "政策・規制" },
      items: {
        en: [
          { policy: "NDC 3.0 (Nov 2025)", content: "Economy-wide absolute net GHG target: 152 MtCO₂e by 2035, 47% reduction vs. 2019 baseline. Aligns to net-zero by 2050. Emphasizes peaking before 2030 and relies primarily on domestic actions while remaining open to Article 6 cooperation.", citation: "UNFCCC NDC submission [2][8]" },
          { policy: "Carbon Tax (Jan 2025 approval)", content: "THB 200/tCO₂e approved by Cabinet on 21 January 2025. Initial stage integrated into existing excise tax on oil/petroleum. Explicitly designed to 'avoid additional financial burden' while preparing for stricter pricing later.", citation: "Sovereign sustainability-linked reporting [3]" },
          { policy: "Draft Climate Change Act", content: "Umbrella legislation establishing: (i) Climate Fund, (ii) national GHG database, (iii) ETS + CBAM mechanisms, (iv) carbon tax collection via Excise/Customs, (v) taxonomy, (vi) penalties for emissions-data noncompliance.", citation: "Cabinet approval in principle [4]" },
          { policy: "SEC ISSB-aligned Disclosure", content: "Listed companies required to apply IFRS S1 and S2 with climate-first focus on Scope 1/2 GHG emissions. Standardized assurance by appropriate providers (including TGO-registered verifiers). Phased timeline keyed to SET50, then SET100.", citation: "SEC Thailand [9][10]" },
          { policy: "EU CBAM Definitive Regime", content: "Entered into force 1 January 2026, shifting from transitional to definitive regime. Thai export economy increasingly mirrors 'embedded emissions + verification + pricing' framework even when domestic policies are framed differently.", citation: "European Commission [11][12]" }
        ],
        ja: [
          { policy: "NDC 3.0（2025年11月）", content: "経済全体の絶対的ネットGHG目標：2035年に1.52億tCO₂e、2019年基準比47%削減。2050年ネットゼロに整合。2030年前のピーキングを強調し、主に国内行動に依存しつつArticle 6協力にもオープン。", citation: "UNFCCC NDC提出 [2][8]" },
          { policy: "炭素税（2025年1月承認）", content: "2025年1月21日の閣議でTHB 200/tCO₂eを承認。初期段階は石油・石油製品の既存物品税に組み込み。「追加的な財政負担を回避」しつつ、より厳格な価格設定への準備と明示。", citation: "ソブリンサステナビリティ連動報告 [3]" },
          { policy: "気候変動法案", content: "包括的法律として以下を設立：(i) 気候基金、(ii) 国家GHGデータベース、(iii) ETS＋CBAMメカニズム、(iv) 物品税/税関経由の炭素税徴収、(v) タクソノミー、(vi) 排出データ不遵守への罰則。", citation: "閣議承認 [4]" },
          { policy: "SEC ISSB整合開示", content: "上場企業にIFRS S1・S2の適用を要求。気候ファーストアプローチでScope 1・2 GHG排出に焦点。TGO登録検証者を含む適切な保証提供者による標準化された保証。SET50、SET100の順に段階的タイムライン。", citation: "タイSEC [9][10]" },
          { policy: "EU CBAM本格適用", content: "2026年1月1日に発効し、移行期から本格適用へ移行。タイの輸出経済は国内政策が異なるフレーミングでも「組込排出量＋検証＋価格付け」の枠組みをますます反映。", citation: "欧州委員会 [11][12]" }
        ]
      }
    },
    // Facts: Market Structure — Power Sector
    powerSector: {
      title: { en: "Power Sector Transition", ja: "電力セクター転換" },
      segments: {
        en: [
          { name: "Renewables (New Capacity by 2037)", share: "34.9 GW", growth: "45% of new additions", players: "Solar, Wind, Biomass" },
          { name: "Battery Energy Storage", share: "10.5 GW", growth: "New category", players: "BESS reserve capacity" },
          { name: "Pumped Storage Hydro", share: "2.5 GW", growth: "Steady", players: "EGAT-operated" },
          { name: "Nuclear (SMR)", share: "0.6 GW", growth: "2037 horizon", players: "Under draft PDP" },
          { name: "Total New Generation Capacity", share: "77.4 GW", growth: "Draft PDP 2024", players: "All sources" }
        ],
        ja: [
          { name: "再生可能エネルギー（2037年新規容量）", share: "34.9 GW", growth: "新規追加の45%", players: "太陽光、風力、バイオマス" },
          { name: "蓄電池エネルギー貯蔵", share: "10.5 GW", growth: "新カテゴリー", players: "BESS予備容量" },
          { name: "揚水発電", share: "2.5 GW", growth: "安定", players: "EGAT運営" },
          { name: "原子力（SMR）", share: "0.6 GW", growth: "2037年展望", players: "PDP案に含む" },
          { name: "新規発電容量合計", share: "77.4 GW", growth: "PDP 2024案", players: "全電源" }
        ]
      }
    },
    // Facts: Carbon Markets
    carbonMarkets: {
      title: { en: "Carbon Markets & Credit Mechanisms", ja: "カーボン市場・クレジットメカニズム" },
      items: {
        en: [
          { policy: "T-VER Cumulative Scale", content: "208 projects (430 certification rounds) certified for total reductions/removals of 26.6 million tCO₂e. Largest share from renewable energy, significant volume from waste management.", citation: "TGO statistics [22]" },
          { policy: "Premium T-VER", content: "Elevated standards toward international equivalence. Explicitly designed to serve as a guideline for JCM projects following the July 2024 MoC renewal between Thailand and Japan.", citation: "Premium T-VER guideline [23]" },
          { policy: "OTC-Dominant Market", content: "FTIX Exchange operated 2023-2024 but has ceased operations. December 2025 trading: 25,083 tCO₂e at weighted average THB 44.86/tCO₂e. Execution depends on bilateral contracting, not exchange liquidity.", citation: "TGO carbon market Q&A [24][25]" },
          { policy: "International Credit Transfer Rules", content: "Cabinet-approved guideline (26 August 2025) explicitly defines 'international objective' use and requires corresponding adjustments for Article 6 accounting, reducing double-claiming risk.", citation: "International Carbon Credit Guideline [27]" }
        ],
        ja: [
          { policy: "T-VER累積規模", content: "208プロジェクト（430認証ラウンド）が合計2,664万tCO₂eの削減・除去で認証済み。最大シェアは再生可能エネルギー開発、廃棄物管理からも相当量。", citation: "TGO統計 [22]" },
          { policy: "Premium T-VER", content: "国際同等性に向けた基準引き上げ。2024年7月の日タイJCM覚書更新に基づくJCMプロジェクトのガイドラインとしても明示的に設計。", citation: "Premium T-VERガイドライン [23]" },
          { policy: "OTC主導市場", content: "FTIX取引所は2023-2024年に運営されたが現在は停止。2025年12月の取引量：25,083 tCO₂e、加重平均THB 44.86/tCO₂e。取引は取引所の流動性ではなく相対契約に依存。", citation: "TGOカーボン市場Q&A [24][25]" },
          { policy: "国際クレジット移転ルール", content: "閣議承認ガイドライン（2025年8月26日）が「国際目的」使用を明示的に定義し、Article 6会計のための対応する調整を要求。ダブルクレーミングリスクを低減。", citation: "国際カーボンクレジットガイドライン [27]" }
        ]
      }
    },
    // Facts: Green Electricity
    greenElectricity: {
      title: { en: "Green Electricity Procurement", ja: "グリーン電力調達" },
      items: {
        en: [
          { policy: "Utility Green Tariff (UGT)", content: "Approved by National Energy Policy Committee on 7 Nov 2022. ERC issued criteria 8 Jan 2024. EGAT, MEA, PEA required to provide green electricity by bundling with RECs aligned to I-REC standards.", citation: "ERC certification standard [6]" },
          { policy: "Direct PPA via TPA (Pilot)", content: "Targeted at BOI-promoted data centers. 2,000 MW total cap. Requires continuous IT base load ≥50 MW per building, ≥10-year operation. New renewable supply plants only. NEPC approved 25 June 2024.", citation: "ERC public hearing documents [6]" },
          { policy: "SAF (Sustainable Aviation Fuel)", content: "Jet A-1 standard updated to allow up to 50% SAF blend, effective 1 January 2026. Bangchak has established Thailand's first stand-alone 'Neat SAF' production unit at 1M litres/day using HEFA technology.", citation: "CAAT / Bangchak disclosure [5]" }
        ],
        ja: [
          { policy: "Utility Green Tariff（UGT）", content: "2022年11月7日に国家エネルギー政策委員会が承認。2024年1月8日にERC基準発行。EGAT、MEA、PEAがI-REC基準に整合したRECとの電力バンドリングによるグリーン電力を提供義務。", citation: "ERC認証基準 [6]" },
          { policy: "Direct PPA via TPA（パイロット）", content: "BOI促進データセンター対象。合計2,000 MWキャップ。ビル当たりIT連続ベースロード50 MW以上、運転期間10年以上が条件。新規再エネ発電所のみ。2024年6月25日NEPC承認。", citation: "ERC公聴会資料 [6]" },
          { policy: "SAF（持続可能な航空燃料）", content: "Jet A-1基準を更新しSAF最大50%ブレンドを許可、2026年1月1日施行。バンチャックがHEFA技術によるタイ初のスタンドアロン型「ニートSAF」生産ユニットを日産100万リットルで設立。", citation: "CAAT / バンチャック開示 [5]" }
        ]
      }
    },
    // Opportunities & Risks
    opportunities: {
      en: [
        "Scope 2 decarbonization via UGT provides auditable, standardized green electricity claims for Japanese manufacturers (Doc: Power sector transition)",
        "Premium T-VER + JCM linkage creates bilateral carbon credit opportunities between Japan and Thailand operations (Doc: Carbon markets)",
        "BOI incentives for CCS/CCU, green hydrogen, and green ammonia production explicitly promote hard-to-abate sector decarbonization (Doc: Industrial decarbonization)",
        "Thailand Taxonomy Phase 2 (May 2025) expands green finance eligibility to manufacturing and agriculture — key sectors for Japanese firms (Doc: Taxonomy expansion)",
        "SAF production and blending infrastructure positions Thailand as ASEAN's first SAF hub — supply chain opportunity for Japanese aviation suppliers (Doc: Transport section)"
      ],
      ja: [
        "UGT経由のScope 2脱炭素化は、日系製造業に監査可能で標準化されたグリーン電力クレームを提供（Doc: Power sector transition）",
        "Premium T-VER＋JCMリンケージが日タイ間の二国間カーボンクレジット機会を創出（Doc: Carbon markets）",
        "BOIインセンティブがCCS/CCU、グリーン水素、グリーンアンモニア生産を明示的に促進し、削減困難セクターの脱炭素化を支援（Doc: Industrial decarbonization）",
        "タイタクソノミーPhase 2（2025年5月）がグリーンファイナンス適格性を製造業・農業に拡大——日系企業の主要セクター（Doc: Taxonomy expansion）",
        "SAF生産・ブレンドインフラがタイをASEAN初のSAFハブとして位置付け——日系航空サプライヤーへのサプライチェーン機会（Doc: Transport section）"
      ]
    },
    risks: {
      en: [
        "Carbon tax at THB 200/tCO₂e is initial; explicit 'preparing for stricter pricing later' language signals escalation that could increase operating costs (Doc: Carbon pricing)",
        "Climate Change Act penalties for non-reporting/false reporting create new compliance risk for Japanese subsidiaries that treat emissions data as 'CSR report-line' (Doc: National governance)",
        "EU CBAM definitive regime (Jan 2026) adds embedded-emissions verification burden on Thai exports to Europe — particularly chemicals, cement, steel (Doc: External drivers)",
        "Carbon market is OTC-dominant with no active exchange; credit quality, methodology, and double-counting controls are strategic risks for offset strategies (Doc: Trading reality)",
        "Direct PPA via TPA is currently limited to BOI-promoted data centers; broader industrial access remains uncertain pending policy expansion (Doc: Green electricity)"
      ],
      ja: [
        "THB 200/tCO₂eの炭素税は初期段階；「より厳格な価格設定への準備」という明示的な文言はエスカレーションと操業コスト増を示唆（Doc: Carbon pricing）",
        "気候変動法の未報告・虚偽報告への罰則が、排出データを「CSRレポートライン」として扱う日系子会社に新たなコンプライアンスリスクを創出（Doc: National governance）",
        "EU CBAM本格適用（2026年1月）がタイの欧州向け輸出に組込排出量検証の負担を追加——特に化学品、セメント、鉄鋼（Doc: External drivers）",
        "カーボン市場はOTC主導で活発な取引所なし；クレジット品質、方法論、ダブルカウンティング管理がオフセット戦略の戦略的リスク（Doc: Trading reality）",
        "Direct PPA via TPAは現在BOI促進データセンターに限定；より広い産業アクセスは政策拡大次第で不確実（Doc: Green electricity）"
      ]
    },
    // Opinion
    opinion: {
      title: { en: "WaLens Analysis: Structural Interpretation", ja: "WaLensの分析：構造的解釈" },
      intro: {
        en: "The following represents WaLens' independent analysis based on the facts presented above. These are interpretive observations, not objective data points.",
        ja: "以下は上記のファクトに基づくWaLensの独自分析です。これらは解釈的な見解であり、客観的なデータポイントではありません。"
      },
      points: {
        en: [
          {
            title: "Decarbonization Is Now Industrial Policy, Not CSR",
            content: "The most important structural shift is that Thailand has stopped treating decarbonization as a parallel sustainability program. The convergence of NDC 3.0, carbon tax, climate law, disclosure requirements, and taxonomy creates an integrated policy stack where emissions measurement, reporting, and economic instruments are embedded into regulation. For Japanese subsidiaries, this means decarbonization compliance is no longer optional — it is becoming a prerequisite for permitting, procurement preferences, and financial market access."
          },
          {
            title: "The MRV Infrastructure Gap Is the Real Risk",
            content: "While policy ambition is high, the operational reality is that most Thai-based operations — including Japanese subsidiaries — lack the Measurement, Reporting, and Verification (MRV) infrastructure needed to comply with Scope 1/2 disclosure under ISSB standards, carbon tax reporting, and potential ETS participation. Companies that treat emissions data architecture as 'critical infrastructure' rather than a 'CSR report-line' will have a significant competitive advantage when compliance obligations harden."
          },
          {
            title: "Green Electricity Procurement Is Becoming a Competitive Moat",
            content: "Thailand's formalization of UGT and Direct PPA routes means that Scope 2 decarbonization claims can now be defensible in procurement audits — a significant upgrade from ad-hoc REC purchases. Japanese manufacturers who secure green electricity contracts early will have lower compliance costs and stronger positioning in supply chains that increasingly require provable low-carbon pathways."
          },
          {
            title: "The Carbon Credit Market Needs Sophistication, Not Just Volume",
            content: "Thailand's carbon market is at an unusual point: meaningful cumulative scale (26.6 MtCO₂e under T-VER) but no active exchange, OTC-dominant trading at thin volumes, and emerging international transfer rules. Japanese companies that build origination capability and governance literacy — particularly around JCM linkage and corresponding adjustments — will be better positioned than those relying on spot purchases of uncertain quality."
          }
        ],
        ja: [
          {
            title: "脱炭素化はCSRではなく産業政策となった",
            content: "最も重要な構造的変化は、タイが脱炭素化を並行的なサステナビリティプログラムとして扱うことをやめたことである。NDC 3.0、炭素税、気候変動法、開示要件、タクソノミーの収束が、排出量の測定・報告・経済的手段が規制に組み込まれた統合的な政策体系を生み出している。日系子会社にとって、脱炭素化コンプライアンスはもはやオプションではなく、許認可、調達優先順位、金融市場アクセスの前提条件になりつつある。"
          },
          {
            title: "MRVインフラのギャップこそ本当のリスク",
            content: "政策的野心は高いが、運用上の現実として、日系子会社を含むタイ拠点の大半の事業は、ISSB基準に基づくScope 1・2開示、炭素税報告、潜在的なETS参加に必要な測定・報告・検証（MRV）インフラを欠いている。排出データアーキテクチャを「CSRレポートライン」ではなく「重要インフラ」として扱う企業は、コンプライアンス義務が強化された際に大きな競争優位を持つ。"
          },
          {
            title: "グリーン電力調達が競争上の堀になりつつある",
            content: "タイのUGTとDirect PPAルートの制度化は、Scope 2脱炭素化の主張が調達監査で防御可能になることを意味する——アドホックなREC購入からの大幅なアップグレードである。早期にグリーン電力契約を確保した日系製造業は、コンプライアンスコストが低く、証明可能な低炭素パスウェイをますます求めるサプライチェーンでより強いポジションを持つ。"
          },
          {
            title: "カーボンクレジット市場には量だけでなく洗練さが必要",
            content: "タイのカーボン市場は異例の状況にある：T-VERで意味のある累積規模（2,664万tCO₂e）がありながら、活発な取引所はなく、OTC主導で薄い取引量、そして新興の国際移転ルール。JCMリンケージと対応する調整に関するオリジネーション能力とガバナンスリテラシーを構築する日本企業は、不確実な品質のスポット購入に依存する企業よりも有利なポジションを持つ。"
          }
        ]
      }
    },
    // Recommendation
    recommendation: {
      title: { en: "Strategic Recommendation for Japanese Executives", ja: "日本企業経営者への戦略的提言" },
      intro: {
        en: "Based on WaLens' analysis, the following strategic perspective is offered — not as an operational checklist, but as a framework for executive decision-making.",
        ja: "WaLensの分析に基づき、以下の戦略的視点を提供する——オペレーショナルなチェックリストとしてではなく、経営判断のためのフレームワークとして。"
      },
      content: {
        en: `The core strategic imperative is to stop treating decarbonization as a reporting exercise and start treating it as a competitive positioning tool.

First, build MRV infrastructure now. Thailand's NDC 3.0 resets the national 'pace car.' If Thailand is aiming for net emissions of 152 MtCO₂e by 2035 and net zero by 2050, then projects that were previously 'nice to have' become necessary. Japanese subsidiaries should treat emissions data architecture as critical infrastructure — not a CSR report-line.

Second, secure green electricity early. The UGT and Direct PPA routes are being standardized. Early movers will lock in favorable terms and build auditable Scope 2 claims that satisfy both Japanese HQ reporting requirements and Thai regulatory expectations.

Third, develop carbon credit governance literacy. The combination of Premium T-VER, JCM linkage renewal (July 2024), and formalized corresponding-adjustment rules creates a unique bilateral opportunity between Japan and Thailand. But this requires understanding registry processes, retirement mechanisms, and international accounting — not just price.

Fourth, prepare for carbon cost escalation. The THB 200/tCO₂e initial rate is explicitly a floor, not a ceiling. Japanese companies should model scenarios where carbon costs rise to THB 500-1,000/tCO₂e over the next 5-7 years and assess the impact on Thai operations' competitiveness.

Finally, use Japan-Thailand bilateral mechanisms proactively. AZEC, JCM, and bilateral MoUs position Japan as Thailand's preferred partner for transition finance and technology transfer. This is a diplomatic asset that should be leveraged at the project level, not just at the government-to-government level.`,
        ja: `核心的な戦略的命題は、脱炭素化を報告作業として扱うことをやめ、競争ポジショニングのツールとして扱い始めることである。

第一に、MRVインフラを今すぐ構築すること。タイのNDC 3.0は国家の「ペースカー」をリセットした。タイが2035年にネット排出量1.52億tCO₂e、2050年にネットゼロを目指すなら、以前は「あれば良い」だったプロジェクトが必要不可欠になる。日系子会社は排出データアーキテクチャを重要インフラとして扱うべきである——CSRレポートラインではなく。

第二に、グリーン電力を早期に確保すること。UGTとDirect PPAルートは標準化されつつある。先行者は有利な条件を確保し、日本本社の報告要件とタイの規制期待の両方を満たす監査可能なScope 2クレームを構築できる。

第三に、カーボンクレジットのガバナンスリテラシーを開発すること。Premium T-VER、JCMリンケージ更新（2024年7月）、正式化された対応する調整ルールの組み合わせが、日タイ間のユニークな二国間機会を生み出している。しかしこれには、レジストリプロセス、リタイアメントメカニズム、国際会計の理解が必要——価格だけではない。

第四に、炭素コストのエスカレーションに備えること。THB 200/tCO₂eの初期レートは明示的にフロアでありシーリングではない。日本企業は今後5-7年で炭素コストがTHB 500-1,000/tCO₂eに上昇するシナリオをモデル化し、タイ事業の競争力への影響を評価すべきである。

最後に、日タイ二国間メカニズムをプロアクティブに活用すること。AZEC、JCM、二国間MoUは日本をタイのトランジションファイナンスと技術移転の優先パートナーとして位置付けている。これは政府間レベルだけでなく、プロジェクトレベルで活用すべき外交的資産である。`
      }
    },
    // Data Appendix
    dataAppendix: {
      title: { en: "Data Appendix", ja: "データ付録" },
      tables: {
        policyTimeline: {
          title: { en: "Key Decarbonization Policy Timeline", ja: "主要脱炭素化政策タイムライン" },
          data: [
            { year: "2022 Nov", event: isJapanese ? "国家エネルギー政策委員会がUGTガイドライン承認" : "NEPC approved UGT guidelines", status: isJapanese ? "施行中" : "In force" },
            { year: "2024 Jan", event: isJapanese ? "ERC がUGT基準発行" : "ERC issued UGT criteria", status: isJapanese ? "施行中" : "In force" },
            { year: "2024 Jun", event: isJapanese ? "Direct PPA via TPAパイロット承認" : "Direct PPA via TPA pilot approved", status: isJapanese ? "パイロット" : "Pilot" },
            { year: "2024 Jul", event: isJapanese ? "日タイJCM覚書更新" : "Japan-Thailand JCM MoC renewed", status: isJapanese ? "有効" : "Active" },
            { year: "2025 Jan", event: isJapanese ? "炭素税THB 200/tCO₂e閣議承認" : "Carbon tax THB 200/tCO₂e Cabinet approved", status: isJapanese ? "承認済" : "Approved" },
            { year: "2025 May", event: isJapanese ? "タイタクソノミーPhase 2発行" : "Thailand Taxonomy Phase 2 released", status: isJapanese ? "施行中" : "In force" },
            { year: "2025 Aug", event: isJapanese ? "国際カーボンクレジットガイドライン閣議承認" : "International Carbon Credit Guideline Cabinet approved", status: isJapanese ? "承認済" : "Approved" },
            { year: "2025 Nov", event: isJapanese ? "NDC 3.0 UNFCCC提出" : "NDC 3.0 submitted to UNFCCC", status: isJapanese ? "提出済" : "Submitted" },
            { year: "2026 Jan", event: isJapanese ? "EU CBAM本格適用開始" : "EU CBAM definitive regime starts", status: isJapanese ? "発効" : "In force" }
          ]
        }
      }
    },
    sources: {
      title: { en: "Sources & Methodology", ja: "出典・方法論" },
      list: {
        en: [
          "Thailand's NDC 3.0 submission to UNFCCC (November 2025) [1][2][8]",
          "Thai Cabinet approval of carbon tax at THB 200/tCO₂e (January 2025) [3]",
          "Draft Climate Change Act — Cabinet approval in principle [4]",
          "Sovereign sustainability-linked financing framework (PDMO, October 2024) — draft PDP/AEDP references [5]",
          "ERC Utility Green Tariff criteria and certification standards [6]",
          "ERC Direct PPA via TPA public hearing documents [6]",
          "Thailand's 2nd Updated NDC (2022) [7]",
          "SEC Thailand — ISSB-aligned sustainability disclosure principles [9][10]",
          "European Commission — CBAM transitional and definitive regime [11][12]",
          "TGO — T-VER statistics and Premium T-VER guideline [22][23]",
          "TGO — Carbon market Q&A and trading statistics [24][25]",
          "International Carbon Credit Guideline — Cabinet approval (August 2025) [27]",
          "BOI Investment Promotion Guide 2025 — CCS/CCU and green hydrogen activities [19]",
          "Bank of Thailand / Thailand Taxonomy Phase 1 and Phase 2 [20][21]",
          "CAAT — SAF regulation and Bangchak disclosure",
          "WaLens analysis and field research (Q4 2025 – Q1 2026)"
        ],
        ja: [
          "タイNDC 3.0 UNFCCC提出（2025年11月）[1][2][8]",
          "炭素税THB 200/tCO₂e閣議承認（2025年1月）[3]",
          "気候変動法案——閣議原則承認 [4]",
          "ソブリンサステナビリティ連動資金調達フレームワーク（PDMO、2024年10月）——PDP/AEDP案参照 [5]",
          "ERC Utility Green Tariff基準・認証基準 [6]",
          "ERC Direct PPA via TPA公聴会資料 [6]",
          "タイ第2次NDC更新（2022年）[7]",
          "タイSEC——ISSB整合サステナビリティ開示原則 [9][10]",
          "欧州委員会——CBAM移行・本格適用レジーム [11][12]",
          "TGO——T-VER統計・Premium T-VERガイドライン [22][23]",
          "TGO——カーボン市場Q&A・取引統計 [24][25]",
          "国際カーボンクレジットガイドライン——閣議承認（2025年8月）[27]",
          "BOI投資促進ガイド2025——CCS/CCU・グリーン水素活動 [19]",
          "タイ中央銀行 / タイタクソノミーPhase 1・Phase 2 [20][21]",
          "CAAT——SAF規制・バンチャック開示",
          "WaLens分析・フィールドリサーチ（2025年Q4～2026年Q1）"
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
      <div className="blur-sm pointer-events-none select-none">{children}</div>
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
        title={isJapanese ? "タイ脱炭素化レポート | WaLens" : "Thailand Decarbonization Report | WaLens"}
        description={isJapanese 
          ? "タイの脱炭素化政策の包括的分析。NDC 3.0、炭素税、気候変動法、グリーン電力、カーボン市場の最新動向と日本企業への戦略的示唆。"
          : "Comprehensive analysis of Thailand's decarbonization policy stack. NDC 3.0, carbon tax, climate law, green electricity, carbon markets, and strategic implications for Japanese companies."
        }
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6 md:py-12 max-w-4xl">
          <div className="mb-6">
            <Breadcrumb 
              items={[
                { label: isJapanese ? "インサイト" : "Insights", href: "/insights" },
                { label: isJapanese ? "全産業横断" : "Cross-Industry" },
                { label: isJapanese ? "脱炭素化" : "Decarbonization" }
              ]}
            />
          </div>

          {/* Hero Section */}
          <section className="mb-8 md:mb-12">
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img src={heroImage} alt={isJapanese ? "タイ脱炭素化" : "Thailand Decarbonization"} className="w-full h-48 md:h-72 object-cover" />
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
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1"><FileText className="h-4 w-4" />{isJapanese ? "最終更新" : "Last Updated"}: {content.lastUpdated}</span>
              <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" />{isJapanese ? "読了時間：12分" : "12 min read"}</span>
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
            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2"><Database className="h-6 w-6" />{isJapanese ? "ファクト：政策・市場・動向" : "Facts: Policy, Market & Trends"}</h2>
            {hasFullAccess ? (
              <div className="space-y-6">
                {/* Policy & Regulation */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Shield className="h-5 w-5" />{isJapanese ? content.policyInsights.title.ja : content.policyInsights.title.en}</h3>
                  <div className="space-y-4">
                    {(isJapanese ? content.policyInsights.items.ja : content.policyInsights.items.en).map((item, i) => (
                      <Card key={i}><CardContent className="p-4">
                        <h4 className="font-bold mb-2">{item.policy}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{item.content}</p>
                        <p className="text-xs text-muted-foreground italic">{isJapanese ? "出典" : "Source"}: {item.citation}</p>
                      </CardContent></Card>
                    ))}
                  </div>
                </div>

                {/* Power Sector */}
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Wind className="h-5 w-5" />{isJapanese ? content.powerSector.title.ja : content.powerSector.title.en}</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(isJapanese ? content.powerSector.segments.ja : content.powerSector.segments.en).map((seg, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div><p className="font-medium">{seg.name}</p><p className="text-sm text-muted-foreground">{seg.players}</p></div>
                          <div className="text-right"><p className="font-bold text-lg">{seg.share}</p><p className="text-sm text-green-600">{seg.growth}</p></div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Carbon Markets */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Globe className="h-5 w-5" />{isJapanese ? content.carbonMarkets.title.ja : content.carbonMarkets.title.en}</h3>
                  <div className="space-y-4">
                    {(isJapanese ? content.carbonMarkets.items.ja : content.carbonMarkets.items.en).map((item, i) => (
                      <Card key={i}><CardContent className="p-4">
                        <h4 className="font-bold mb-2">{item.policy}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{item.content}</p>
                        <p className="text-xs text-muted-foreground italic">{isJapanese ? "出典" : "Source"}: {item.citation}</p>
                      </CardContent></Card>
                    ))}
                  </div>
                </div>

                {/* Green Electricity */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Leaf className="h-5 w-5" />{isJapanese ? content.greenElectricity.title.ja : content.greenElectricity.title.en}</h3>
                  <div className="space-y-4">
                    {(isJapanese ? content.greenElectricity.items.ja : content.greenElectricity.items.en).map((item, i) => (
                      <Card key={i}><CardContent className="p-4">
                        <h4 className="font-bold mb-2">{item.policy}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{item.content}</p>
                        <p className="text-xs text-muted-foreground italic">{isJapanese ? "出典" : "Source"}: {item.citation}</p>
                      </CardContent></Card>
                    ))}
                  </div>
                </div>

                {/* Opportunities & Risks */}
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
              <BlurredContent><div className="space-y-6"><Card className="h-64" /><Card className="h-48" /><Card className="h-48" /><div className="grid md:grid-cols-2 gap-4"><Card className="h-48" /><Card className="h-48" /></div></div></BlurredContent>
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
                    <Card key={i}><CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><span className="text-primary font-mono">{String(i + 1).padStart(2, '0')}</span>{point.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{point.content}</p>
                    </CardContent></Card>
                  ))}
                </div>
              </div>
            ) : (
              <BlurredContent><div className="space-y-4">{[1, 2, 3, 4].map((i) => (<Card key={i} className="h-32" />))}</div></BlurredContent>
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
          {hasFullAccess && (
            <section className="mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2" onClick={handleDataAppendixAccess}>
                <Database className="h-6 w-6" />{isJapanese ? content.dataAppendix.title.ja : content.dataAppendix.title.en}
              </h2>
              <Card><CardHeader><CardTitle className="text-lg">{isJapanese ? content.dataAppendix.tables.policyTimeline.title.ja : content.dataAppendix.tables.policyTimeline.title.en}</CardTitle></CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b"><th className="text-left p-2 font-medium">{isJapanese ? "時期" : "Date"}</th><th className="text-left p-2 font-medium">{isJapanese ? "政策・イベント" : "Policy/Event"}</th><th className="text-left p-2 font-medium">{isJapanese ? "ステータス" : "Status"}</th></tr></thead>
                      <tbody>{content.dataAppendix.tables.policyTimeline.data.map((row, i) => (<tr key={i} className="border-b last:border-0"><td className="p-2 font-mono text-xs">{row.year}</td><td className="p-2">{row.event}</td><td className="p-2"><Badge variant="outline" className="text-xs">{row.status}</Badge></td></tr>))}</tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          <FurtherInquiryNotice className="mb-8 md:mb-12" />

          {/* Sources */}
          <section id="sources" className="mb-8 md:mb-12">
            <Card className="bg-muted/30"><CardHeader><CardTitle className="text-lg">{isJapanese ? content.sources.title.ja : content.sources.title.en}</CardTitle></CardHeader>
              <CardContent><ul className="space-y-2 text-sm text-muted-foreground">{(isJapanese ? content.sources.list.ja : content.sources.list.en).map((source, i) => (<li key={i}>• {source}</li>))}</ul></CardContent>
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

export default Decarbonization;
