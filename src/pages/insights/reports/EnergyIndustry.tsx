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
  Sun,
  Flame,
  Globe,
  Bolt,
  Wind,
  Droplets,
  Cpu,
  Battery
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const EnergyIndustry = () => {
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
        'energy-industry',
        isJapanese ? 'タイ・エネルギー産業変革レポート' : 'Thailand Energy Transformation Report',
        'services',
        lang
      );
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker('energy-industry', 'Thailand Energy Transformation Report', 'タイ・エネルギー産業変革レポート', 'Services', hasFullAccess);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(
        'energy-industry',
        isJapanese ? 'タイ・エネルギー産業変革レポート' : 'Thailand Energy Transformation Report',
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
    { id: 'facts', label: isJapanese ? 'ファクト（市場・政策・動向）' : 'Facts (Market, Policy & Trends)' },
    { id: 'opinion', label: isJapanese ? 'WaLensの見解と示唆' : 'Opinion & Implication from WaLens' },
    { id: 'recommendation', label: isJapanese ? '日本企業経営者への提言' : 'Recommendation for Japanese Executives' },
    { id: 'data-appendix', label: isJapanese ? 'データ付録' : 'Data Appendix' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: {
      en: "Thailand's Energy Transformation and Industrial Renaissance: A Strategic Blueprint for Japanese Executives (2025–2030)",
      ja: "タイのエネルギー変革と産業ルネサンス：日本企業経営者のための戦略青写真（2025–2030）"
    },
    subheadline: {
      en: "From state monopoly to decentralized green grid — hydrogen, Direct PPA, and the GX Solutions playbook for Japanese enterprises",
      ja: "国家独占から分散型グリーングリッドへ——水素・Direct PPA・GXソリューション、日系企業の戦略プレイブック"
    },
    category: {
      en: "Energy / Services",
      ja: "エネルギー / サービス"
    },
    lastUpdated: "2026-02-08",

    // ── Section 1: Executive Summary ──
    executiveSummary: {
      en: [
        "Thailand is undergoing its most radical energy sector liberalization in decades, shifting from a rigid state-monopolized single-buyer model toward a decentralized, digitized, and decarbonized market. The draft PDP 2024 mandates renewable energy at 51% of new generation capacity by 2037. (Doc: Executive Summary)",
        "The Direct Power Purchase Agreement (Direct PPA) pilot launching in 2025–2026 — initially restricted to data centers with >50 MW base load — marks the end of the 'Enhanced Single Buyer' monopoly and opens the path for Japanese factories to procure 100% green electrons by 2027–2028. (Doc: Section 2.2 / Direct PPA Mechanism)",
        "Chinese competitors have captured the emerging EV and solar hardware markets, but Thailand's deepening need for complex, high-reliability infrastructure — grid modernization, hydrogen value chains, CCUS, and Energy Management Systems — aligns precisely with Japan's technological strengths. (Doc: Executive Summary)",
        "The AZEC (Asia Zero Emission Community) framework provides diplomatic and financial vehicles for Japanese firms to lead Thailand's high-value energy transition, including JBIC transition finance and hydrogen co-firing projects with EGAT/PTT. (Doc: Section 8 / AZEC Strategy)",
        "BOI's 2025–2027 'Green Categories' (A1/A2) offer 8-year CIT exemptions for hydrogen production, battery manufacturing, and smart grid technology. The 'Thailand FastPass' expedites permits for green projects >1 billion THB. (Doc: Section 9 / BOI Green Package)"
      ],
      ja: [
        "タイは数十年で最も急進的なエネルギーセクターの自由化を進行中——硬直した国家独占の単一買手モデルから、分散型・デジタル化・脱炭素化された市場へと移行している。PDP 2024草案は2037年までに新規発電容量の51%を再生可能エネルギーとすることを義務付けている。（Doc: エグゼクティブサマリー）",
        "2025〜2026年に開始するDirect PPA（直接電力購入契約）パイロット——当初はベースロード50MW超のデータセンターに限定——は「強化型単一買手」独占の終焉を意味し、2027〜2028年までに日系工場が100%グリーン電力を調達する道を開く。（Doc: セクション2.2 / Direct PPAメカニズム）",
        "中国勢はEV・太陽光ハードウェア市場を席巻したが、タイが深く必要とする高信頼性インフラ——系統近代化、水素バリューチェーン、CCUS、エネルギーマネジメントシステム——は日本の技術的強みと正確に合致する。（Doc: エグゼクティブサマリー）",
        "AZEC（アジア・ゼロエミッション共同体）フレームワークは、JBICトランジション・ファイナンスやEGAT/PTTとの水素混焼プロジェクトを含め、日本企業がタイの高付加価値エネルギー転換をリードするための外交的・金融的手段を提供する。（Doc: セクション8 / AZEC戦略）",
        "BOIの2025〜2027年「グリーンカテゴリー」（A1/A2）は水素製造・蓄電池製造・スマートグリッド技術に8年間のCIT免除を付与。「タイランド・ファストパス」は10億バーツ超のグリーンプロジェクトの許認可を迅速化する。（Doc: セクション9 / BOIグリーンパッケージ）"
      ]
    },

    // ── Section 2: Facts ──
    marketStructure: {
      title: { en: "Market Structure: Thailand's Energy Sector Transformation", ja: "市場構造：タイ・エネルギーセクターの変革" },
      segments: {
        en: [
          { name: "Solar Energy (Hydro-Floating Solar Hybrid)", share: "24,000+ MW target", growth: "Dominant new fuel source", players: "EGAT floating solar, Chinese PV panel suppliers, BoS opportunities for Japanese firms" },
          { name: "Grid Modernization / Smart Grid", share: "Core priority in PDP 2024", growth: "Essential for 50%+ RE", players: "EGAT, MEA, PEA — Japanese inverters, substations, BESS" },
          { name: "Hydrogen / Ammonia Value Chain", share: "5% H₂ blending by 2030", growth: "20% by 2035", players: "JERA, MHI, EGAT, PTT — AZEC-backed" },
          { name: "Data Center Energy (Direct PPA)", share: "184B THB BOI-approved", growth: "Hyperscale expansion", players: "NTT, Google, AWS — cooling & power reliability" },
          { name: "CCUS / Eastern CCS Hub", share: "Map Ta Phut complex", growth: "Hard-to-abate sectors", players: "PTTEP, INPEX, JOGMEC" }
        ],
        ja: [
          { name: "太陽光エネルギー（水上ソーラーハイブリッド）", share: "24,000+ MW 目標", growth: "主要新規電源", players: "EGAT水上ソーラー、中国PVパネル、日系企業のBoS機会" },
          { name: "系統近代化 / スマートグリッド", share: "PDP 2024の中核優先事項", growth: "RE 50%超に不可欠", players: "EGAT、MEA、PEA — 日系インバーター・変電設備・BESS" },
          { name: "水素 / アンモニア・バリューチェーン", share: "2030年にH₂ 5%混焼", growth: "2035年に20%", players: "JERA、MHI、EGAT、PTT — AZEC支援" },
          { name: "データセンター・エネルギー（Direct PPA）", share: "BOI認可1,840億バーツ", growth: "ハイパースケール拡張", players: "NTT、Google、AWS — 冷却・電力信頼性" },
          { name: "CCUS / 東部CCSハブ", share: "マプタプット工業団地", growth: "削減困難セクター", players: "PTTEP、INPEX、JOGMEC" }
        ]
      }
    },
    keyPlayers: {
      title: { en: "Key Players & Ecosystem", ja: "主要プレイヤーとエコシステム" },
      data: {
        en: [
          { segment: "Thai State Energy", examples: "EGAT, PTT, PTTEP, MEA, PEA", status: "Monopoly dissolving; embracing RE & hydrogen" },
          { segment: "Japanese Heavy Industry", examples: "MHI, JERA, IHI, Toshiba Energy", status: "Co-firing, hydrogen turbines, grid equipment" },
          { segment: "Japanese EMS/HVAC", examples: "Daikin, Panasonic, Mitsubishi Electric", status: "Data center cooling, smart buildings, Silver Economy" },
          { segment: "Japanese Automotive (Energy)", examples: "Nissan (V2G), Toyota, Isuzu", status: "V2G pilots, BEV pickups, charging infra" },
          { segment: "BOI / AZEC Framework", examples: "BOI Green Categories, JBIC, MUFG", status: "Transition finance, FastPass permits" }
        ],
        ja: [
          { segment: "タイ国営エネルギー", examples: "EGAT、PTT、PTTEP、MEA、PEA", status: "独占体制の解体、RE・水素を受容" },
          { segment: "日系重工業", examples: "MHI、JERA、IHI、東芝エネルギー", status: "混焼、水素タービン、系統設備" },
          { segment: "日系EMS/HVAC", examples: "ダイキン、パナソニック、三菱電機", status: "データセンター冷却、スマートビル、シルバーエコノミー" },
          { segment: "日系自動車（エネルギー）", examples: "日産（V2G）、トヨタ、いすゞ", status: "V2Gパイロット、BEVピックアップ、充電インフラ" },
          { segment: "BOI / AZECフレームワーク", examples: "BOIグリーンカテゴリー、JBIC、MUFG", status: "トランジション・ファイナンス、ファストパス許認可" }
        ]
      }
    },
    policyInsights: {
      title: { en: "Policy & Regulation", ja: "政策・規制" },
      items: {
        en: [
          { policy: "PDP 2024 (Power Development Plan)", content: "Master blueprint mandating 51% RE by 2037 (up from 36% in PDP 2018). Solar target doubled to 24,000+ MW. Coal phase-out by 2050. Hydrogen blending: 5% by 2030, 20% by 2035. Smart Grid elevated to core priority. (Doc: Section 2.1)", citation: "Climate Policy Database, PDP 2024" },
          { policy: "Direct PPA & Third-Party Access (TPA) Code", content: "Pilot 2025–2026: data centers >50 MW can contract directly with RE generators via grid wheeling. Expected expansion to manufacturing (RE100 plants) by 2027–2028. Ends the Enhanced Single Buyer monopoly. (Doc: Section 2.2)", citation: "Nagashima Ohno & Tsunematsu, 2025" },
          { policy: "Utility Green Tariff (UGT)", content: "UGT1 (Bundled): RECs from existing plants — 'book-and-claim' for reporting. UGT2 (Unbundled/New): Power from new solar/wind with 10-year contracts providing additionality required by RE100. Slight premium but long-term price stability. (Doc: Section 2.3)", citation: "Argus Media / ERC Pricing 2026" },
          { policy: "CBAM & Supply Chain Pressure", content: "EU Carbon Border Adjustment Mechanism threatens Thai exports. Japanese factories (Toyota, Honda, Canon) under HQ pressure for carbon neutrality by 2040–2050. Grid mix (56% gas, coal) insufficient — driving demand for green electricity procurement. (Doc: Section 1.2)", citation: "EU CBAM Regulation / BloombergNEF" },
          { policy: "BOI Green Categories (A1–A4)", content: "A1/A2: 8-year CIT exemption for hydrogen, battery manufacturing, smart grid. A4: 3-year holiday for energy-efficient machinery upgrades and solar rooftops. Existing investors can access new incentives via 'Green Transformation' commitment. (Doc: Section 9)", citation: "BOI Investment Promotion Guide 2025" }
        ],
        ja: [
          { policy: "PDP 2024（電力開発計画）", content: "2037年までにRE 51%を義務化するマスタープラン（PDP 2018の36%から引き上げ）。太陽光目標は24,000+ MWに倍増。石炭は2050年までに段階的廃止。水素混焼：2030年に5%、2035年に20%。スマートグリッドを中核優先事項に格上げ。（Doc: セクション2.1）", citation: "Climate Policy Database, PDP 2024" },
          { policy: "Direct PPA & 第三者アクセス（TPA）コード", content: "パイロット2025〜2026年：50MW超のデータセンターが系統託送を通じてRE発電事業者と直接契約可能に。2027〜2028年に製造業（RE100工場）への拡大が見込まれる。強化型単一買手独占の終焉。（Doc: セクション2.2）", citation: "長島・大野・常松法律事務所、2025年" },
          { policy: "Utility Green Tariff（UGT）", content: "UGT1（バンドル型）：既存発電所からのREC——報告用の「記帳請求」方式。UGT2（アンバンドル/新規）：新規太陽光/風力からの電力を10年契約で提供、RE100基準の追加性を確保。若干のプレミアムだが長期的な価格安定性。（Doc: セクション2.3）", citation: "Argus Media / ERC価格設定 2026年" },
          { policy: "CBAM & サプライチェーン圧力", content: "EU炭素国境調整メカニズムがタイの輸出を脅かす。日系工場（トヨタ、ホンダ、キヤノン）は本社からの2040〜2050年カーボンニュートラル要請に直面。現行の系統構成（ガス56%、石炭）では不十分——グリーン電力調達への需要を喚起。（Doc: セクション1.2）", citation: "EU CBAM規則 / BloombergNEF" },
          { policy: "BOIグリーンカテゴリー（A1〜A4）", content: "A1/A2：水素製造・蓄電池製造・スマートグリッドに8年間のCIT免除。A4：省エネ機器更新・太陽光屋根設置に3年間の税制優遇。既存投資家は「グリーン・トランスフォーメーション」コミットメントにより新規優遇措置にアクセス可能。（Doc: セクション9）", citation: "BOI投資促進ガイド 2025年" }
        ]
      }
    },
    opportunities: {
      en: [
        "Grid Modernization & BESS: While Chinese firms dominate solar panels, Japanese firms should supply Balance of System (BoS) — inverters, substations, and Battery Energy Storage Systems — where reliability and grid code compliance are paramount. (Doc: Section 2.1 / PDP Analysis)",
        "Hydrogen/Ammonia Co-firing: JERA and MHI are collaborating with EGAT/PTT on co-firing ammonia in coal plants and hydrogen in gas turbines. This extends asset life while reducing emissions — pragmatic transition for debt-laden Thai utilities. (Doc: Section 8 / Hydrogen Value Chain)",
        "Data Center Cooling & Power: 184B THB in BOI-approved data center investments. Japanese technologies — magnetic bearing centrifugal chillers (MHI), absorption chillers (Kawasaki), AI-driven HVAC (Daikin) — can dramatically reduce Power Usage Effectiveness (PUE). (Doc: Section 3.2)",
        "Vehicle-to-Grid (V2G) Ecosystem: Nissan's V2G pilot with EGAT demonstrates EVs as grid-balancing assets. Japanese OEMs can offer fleet operators 'Electric Truck + Solar Carport + V2G Energy Management' as an integrated package. (Doc: Section 4.2)",
        "Eastern CCS Hub: PTTEP-INPEX partnership to capture CO₂ from Map Ta Phut and store offshore. Japanese manufacturers in EEC can tap into this network to decarbonize Scope 1 emissions, preserving EU export viability. (Doc: Section 8 / CCUS Hubs)"
      ],
      ja: [
        "系統近代化 & BESS：中国勢が太陽光パネルを支配する一方、日系企業はBoS（バランス・オブ・システム）——インバーター、変電設備、蓄電池システム——を供給すべき。信頼性と系統連系基準への適合が最重要。（Doc: セクション2.1 / PDP分析）",
        "水素/アンモニア混焼：JERAとMHIがEGAT/PTTと石炭火力のアンモニア混焼・ガスタービンの水素混焼で協業中。負債を抱えるタイ電力事業者にとって、資産寿命を延長しつつ排出削減する実用的移行策。（Doc: セクション8 / 水素バリューチェーン）",
        "データセンター冷却 & 電力：BOI認可のデータセンター投資1,840億バーツ。日本技術——磁気軸受遠心冷凍機（MHI）、吸収式冷凍機（川崎）、AI駆動HVAC（ダイキン）——でPUE（電力使用効率）を大幅に低減可能。（Doc: セクション3.2）",
        "V2G（Vehicle-to-Grid）エコシステム：日産のEGATとのV2Gパイロットが、EVを系統安定化資産として実証。日系OEMはフリートオペレーターに「電動トラック＋ソーラーカーポート＋V2Gエネルギー管理」を統合パッケージとして提供可能。（Doc: セクション4.2）",
        "東部CCSハブ：PTTEP-INPEX提携でマプタプットのCO₂を回収・海底貯留。EEC内の日系製造業者はこのネットワークに接続し、Scope 1排出を脱炭素化、EU輸出適格性を維持できる。（Doc: セクション8 / CCSハブ）"
      ]
    },
    risks: {
      en: [
        "Direct PPA regulatory uncertainty: Pilot restricted to data centers; expansion timeline to manufacturing is 'widely anticipated' but not legally guaranteed. Political changes could delay liberalization. (Doc: Section 2.2)",
        "Chinese solar hardware dominance: Chinese PV panels and battery cells dominate on price. Japanese firms competing on hardware alone will lose. The strategy must be systems integration and reliability, not component sales. (Doc: Executive Summary)",
        "Grid infrastructure bottleneck: 50%+ RE penetration requires massive grid upgrades. EGAT's financial capacity and institutional pace may lag behind policy ambition, creating project delays. (Need verification)",
        "Hydrogen cost competitiveness: Hydrogen and ammonia remain significantly more expensive than natural gas. Without sustained government subsidies and AZEC financing, commercial viability is uncertain pre-2030. (Doc: Section 8)",
        "EV charging infrastructure deficit: Only ~3,700 public charging stations for a rapidly growing fleet. Unmanaged charging threatens local distribution transformers — smart charging market opportunity but also grid risk. (Doc: Section 4.1)"
      ],
      ja: [
        "Direct PPAの規制不確実性：パイロットはデータセンターに限定、製造業への拡大スケジュールは「広く予想される」が法的保証はない。政治変動により自由化が遅延する可能性。（Doc: セクション2.2）",
        "中国勢の太陽光ハードウェア支配：中国PVパネル・蓄電池セルが価格で圧倒。ハードウェア単体で競争する日系企業は敗北する。戦略はシステムインテグレーションと信頼性であり、部品販売ではない。（Doc: エグゼクティブサマリー）",
        "系統インフラのボトルネック：RE 50%超の浸透には大規模な系統更新が必要。EGATの財務能力と制度的な動きが政策の野心に追いつかず、プロジェクト遅延を引き起こす可能性。（要検証）",
        "水素のコスト競争力：水素・アンモニアは天然ガスよりも大幅に高コスト。政府補助金とAZECファイナンスの持続的支援なしに、2030年以前の商業的実現可能性は不透明。（Doc: セクション8）",
        "EV充電インフラ不足：急成長するEVフリートに対し公共充電スタンドは約3,700基のみ。制御されない充電は配電変圧器を過負荷にする——スマートチャージング市場機会だが系統リスクでもある。（Doc: セクション4.1）"
      ]
    },

    // ── Section 3: Opinion & Implication ──
    opinion: {
      title: { en: "WaLens Analysis: Structural Interpretation", ja: "WaLensの分析：構造的解釈" },
      intro: {
        en: "The following represents WaLens' independent analysis based on the facts presented above. These are interpretive observations, not objective data points.",
        ja: "以下は上記のファクトに基づくWaLensの独自分析です。これらは解釈的な見解であり、客観的なデータポイントではありません。"
      },
      points: {
        en: [
          {
            title: "The 'System Integrator' Strategy is Japan's Only Viable Path",
            content: "Chinese firms have won the hardware war — solar panels, battery cells, and soon EV chargers. Competing on component cost is a losing game. However, Thailand's grid cannot simply absorb 51% renewables without sophisticated system integration: frequency regulation, voltage management, BESS orchestration, and predictive grid analytics. These are precisely the capabilities where Japanese firms have decades of accumulated expertise. The strategic imperative is clear: let Chinese firms supply the solar panels and battery cells; Japanese firms should supply the Energy Management Systems (EMS), Grid Stability Hardware, and System Integration engineering. In a Super-Aged, reliability-conscious society, trust and stability command a premium. (Doc: Conclusion / Recommendation 5)"
          },
          {
            title: "Direct PPA is the Most Important Regulatory Shift in a Decade",
            content: "The Direct PPA pilot appears narrow — data centers only, 50 MW minimum — but its structural significance is enormous. It breaks the EGAT monopoly on power trading for the first time. Success in the pilot virtually guarantees expansion to manufacturing by 2027–2028, which means every Japanese factory in Thailand will need to build internal capabilities for complex, long-term green power procurement. Executives who wait for the regulation to reach manufacturing will be 2–3 years behind competitors who begin preparing procurement teams and PPA negotiation skills now. (Doc: Section 2.2)"
          },
          {
            title: "Hydrogen is Japan's Diplomatic Masterpiece — But Commercial Viability Remains Unproven",
            content: "The inclusion of hydrogen blending targets in the PDP 2024 is a direct result of Japanese advocacy through AZEC. This is a remarkable diplomatic achievement. However, the commercial reality is sobering: green hydrogen remains 3–5x more expensive than natural gas in Southeast Asian markets. Without sustained government subsidies and AZEC-backed concessional finance, hydrogen projects will struggle to reach financial close before 2030. Japanese executives should pursue hydrogen strategically — as a positioning play and technology demonstration — but should not bet core business plans on hydrogen revenue in the near term. (Doc: Section 8 / Hydrogen Value Chain)"
          },
          {
            title: "The Silver Economy Creates an Entirely New Energy Demand Pattern",
            content: "Thailand's demographic transition to a Super-Aged Society by 2030 (28%+ aged 60+) is not just a social policy issue — it fundamentally reshapes energy demand. The shift from manufacturing workers to elderly residents changes consumption patterns: higher demand for indoor air quality, thermal comfort, 24/7 healthcare facility operation, and home-based monitoring systems. Japanese firms like Daikin and Panasonic are uniquely positioned because they already produce the full stack — from VRV HVAC systems with individual zone control to 'Wellness' smart home solutions integrating lighting, air quality, and elderly monitoring. The opportunity is to sell not air conditioners, but 'Air Quality and Efficiency Services.' (Doc: Section 6 / Smart Living and Silver Economy)"
          }
        ],
        ja: [
          {
            title: "「システムインテグレーター」戦略が日本企業の唯一の生存経路",
            content: "中国勢はハードウェア戦争に勝利した——太陽光パネル、蓄電池セル、そしてまもなくEV充電器も。部品コストでの競争は敗北のゲームだ。しかし、タイの電力系統は51%の再エネを高度なシステムインテグレーションなしに吸収できない：周波数調整、電圧管理、BESS制御、予測的系統分析。これらはまさに日系企業が数十年にわたり蓄積してきた能力である。戦略的命題は明確だ：中国勢に太陽光パネルと蓄電池セルを供給させ、日系企業はエネルギーマネジメントシステム（EMS）、系統安定化ハードウェア、システムインテグレーション・エンジニアリングを供給すべきだ。超高齢化し、信頼性を重視する社会では、信頼と安定性にプレミアムがつく。（Doc: 結論 / 提言5）"
          },
          {
            title: "Direct PPAはこの10年で最も重要な規制変革",
            content: "Direct PPAパイロットは一見狭い——データセンター限定、最低50MW——だが、その構造的意義は極めて大きい。EGATの電力取引独占が初めて破られるのだ。パイロットの成功は2027〜2028年の製造業への拡大を事実上保証する。つまり、タイにあるすべての日系工場が複雑な長期グリーン電力調達の社内能力を構築する必要がある。規制が製造業に到達するのを待つ経営者は、今から調達チームとPPA交渉スキルの準備を始める競合に2〜3年遅れをとることになる。（Doc: セクション2.2）"
          },
          {
            title: "水素は日本の外交的傑作——だが商業的実現可能性は未実証",
            content: "PDP 2024における水素混焼目標の盛り込みは、AZECを通じた日本の外交的働きかけの直接的成果である。これは注目すべき外交的成果だ。しかし、商業的現実は厳しい：グリーン水素は東南アジア市場で天然ガスの3〜5倍のコストが依然としてかかる。政府補助金とAZEC支援の譲許的ファイナンスの持続的支援なしに、水素プロジェクトは2030年以前のファイナンシャル・クローズに苦戦するだろう。日系経営者は水素を戦略的に追求すべきだ——ポジショニング・プレーと技術実証として——だが、近い将来の水素収益にコアビジネス計画を賭けるべきではない。（Doc: セクション8 / 水素バリューチェーン）"
          },
          {
            title: "シルバーエコノミーがまったく新しいエネルギー需要パターンを創出",
            content: "タイの2030年までの超高齢社会への人口動態転換（60歳以上28%超）は、単なる社会政策の問題ではない——エネルギー需要を根本的に再形成する。製造業労働者から高齢者居住者への移行が消費パターンを変える：室内空気質、熱的快適性、24時間医療施設運営、在宅モニタリングシステムへの需要増大。ダイキンやパナソニックのような日系企業は、個別ゾーン制御のVRV空調から、照明・空気質・高齢者見守りを統合する「ウェルネス」スマートホームソリューションまで、フルスタックをすでに製造しているため、独自のポジションにある。機会はエアコンを売ることではなく、「空気質・効率サービス」を売ることにある。（Doc: セクション6 / スマートリビングとシルバーエコノミー）"
          }
        ]
      }
    },

    // ── Section 4: Recommendation ──
    recommendations: {
      en: [
        {
          title: "Pivot from Hardware to 'Energy-as-a-Service'",
          content: "Do not sell air conditioners — sell 'Air Quality and Efficiency Services' to hospitals and senior homes. Do not sell trucks — sell 'Green Logistics Solutions' utilizing V2G and route optimization. This shift from product to service captures recurring revenue and deepens customer lock-in. (Doc: Conclusion / Recommendation 1)",
          priority: "Immediate"
        },
        {
          title: "Prepare for Direct PPA by Building Internal Procurement Capabilities",
          content: "Instruct local management to prepare for the 2026–2028 liberalization. Securing a long-term Direct PPA for green power is a strategic hedge against future fossil fuel volatility and CBAM tariffs. Procurement teams must learn to negotiate complex, long-term PPAs with private RE developers. (Doc: Conclusion / Recommendation 2)",
          priority: "Immediate"
        },
        {
          title: "Leverage AZEC Transition Finance for Hydrogen & Gas Projects",
          content: "Utilize the 'Transition Finance' mechanisms available through JBIC and MUFG. Thailand's hydrogen and gas-transition projects are prime candidates for this specialized funding, which recognizes the necessity of 'brown-to-green' pathways not available through conventional ESG financing. (Doc: Conclusion / Recommendation 3)",
          priority: "Mid-term"
        },
        {
          title: "Invest in KOSEN Human Infrastructure",
          content: "Support the KOSEN institutes (KOSEN-KMITL, KOSEN-KMUTT). Sponsoring a cohort of Thai engineering students — trained on Japanese machinery, safety standards, and work culture — ensures a loyal, highly skilled workforce for advanced hydrogen and digital energy systems. BOI offers 200% tax deduction for training expenses. (Doc: Section 7 / KOSEN Model)",
          priority: "Mid-term"
        },
        {
          title: "Dominate the System Integration Layer",
          content: "Let Chinese firms supply solar panels and battery cells. Focus on Energy Management Systems (EMS), Grid Stability Hardware, BESS orchestration, and System Integration engineering. In a Super-Aged, reliability-conscious society, trust and stability command a premium that commodity hardware cannot capture. (Doc: Conclusion / Recommendation 5)",
          priority: "Strategic"
        }
      ],
      ja: [
        {
          title: "ハードウェアから「エネルギー・アズ・ア・サービス」への転換",
          content: "エアコンを売るな——病院や高齢者住宅に「空気質・効率サービス」を売れ。トラックを売るな——V2Gとルート最適化を活用した「グリーン・ロジスティクス・ソリューション」を売れ。製品からサービスへのシフトにより、継続的収益を獲得し、顧客ロックインを深化させる。（Doc: 結論 / 提言1）",
          priority: "即座"
        },
        {
          title: "Direct PPAに備え社内調達能力を構築",
          content: "現地マネジメントに2026〜2028年の自由化への準備を指示せよ。グリーン電力の長期Direct PPA確保は、将来の化石燃料価格変動とCBAM関税に対する戦略的ヘッジとなる。調達チームは民間RE事業者との複雑な長期PPA交渉の能力を習得すべき。（Doc: 結論 / 提言2）",
          priority: "即座"
        },
        {
          title: "AZECトランジション・ファイナンスを水素・ガスプロジェクトに活用",
          content: "JBICとMUFGを通じて利用可能な「トランジション・ファイナンス」メカニズムを活用せよ。タイの水素・ガス転換プロジェクトは、従来のESGファイナンスでは利用できない「ブラウンからグリーンへ」の経路の必要性を認める、この特殊な資金調達の最有力候補。（Doc: 結論 / 提言3）",
          priority: "中期"
        },
        {
          title: "KOSEN人的インフラへの投資",
          content: "KOSEN拠点（KOSEN-KMITL、KOSEN-KMUTT）を支援せよ。日本の機械・安全基準・仕事文化で訓練されたタイ人エンジニアリング学生のコホートを支援することで、先進的な水素・デジタルエネルギーシステムに対応する忠実で高スキルの労働力を確保。BOIは研修費用に200%の税額控除を提供。（Doc: セクション7 / KOSENモデル）",
          priority: "中期"
        },
        {
          title: "システムインテグレーション層の支配",
          content: "中国勢に太陽光パネルと蓄電池セルを供給させよ。エネルギーマネジメントシステム（EMS）、系統安定化ハードウェア、BESS制御、システムインテグレーション・エンジニアリングに注力せよ。超高齢化し信頼性を重視する社会では、コモディティ・ハードウェアでは獲得できないプレミアムが信頼と安定性につく。（Doc: 結論 / 提言5）",
          priority: "戦略的"
        }
      ]
    },

    // ── Section 5: Data Appendix ──
    pdpComparison: {
      title: { en: "PDP 2024 vs PDP 2018: Key Metrics Comparison", ja: "PDP 2024 vs PDP 2018：主要指標比較" },
      data: [
        { metric: { en: "Renewable Energy Share", ja: "再生可能エネルギー比率" }, pdp2018: "36% by 2037", pdp2024: "51% by 2037", implication: { en: "Massive solar/wind expansion; BoS & BESS opportunities", ja: "太陽光/風力の大規模拡大、BoS・BESS機会" } },
        { metric: { en: "Solar Target", ja: "太陽光目標" }, pdp2018: "~12,000 MW", pdp2024: "~24,000+ MW", implication: { en: "Dominant new fuel source; requires BESS for stability", ja: "主要新規電源、安定性にBESSが必要" } },
        { metric: { en: "Coal Strategy", ja: "石炭戦略" }, pdp2018: "Maintain Clean Coal", pdp2024: "Phase Out by 2050", implication: { en: "No new coal; retrofit with ammonia/biomass", ja: "新規石炭なし、アンモニア/バイオマスで改修" } },
        { metric: { en: "Grid Modernization", ja: "系統近代化" }, pdp2018: "Limited Focus", pdp2024: "Core Priority", implication: { en: "Smart Grid investment essential for 50%+ RE", ja: "RE 50%超にスマートグリッド投資が不可欠" } },
        { metric: { en: "Hydrogen/Ammonia", ja: "水素/アンモニア" }, pdp2018: "Not Mentioned", pdp2024: "New Fuel Source", implication: { en: "5% H₂ blending by 2030; 20% by 2035", ja: "2030年にH₂ 5%混焼、2035年に20%" } }
      ]
    },
    strategicIndustries: {
      title: { en: "Five Strategic Industries × Energy Nexus", ja: "5つの戦略産業 × エネルギーネクサス" },
      data: [
        { industry: { en: "Advanced Electronics / Data Centers", ja: "先端エレクトロニクス / データセンター" }, energyNeed: { en: "Green power procurement (Direct PPA), cooling systems", ja: "グリーン電力調達（Direct PPA）、冷却システム" }, japanRole: { en: "High-efficiency cooling (MHI, Daikin), backup power", ja: "高効率冷却（MHI、ダイキン）、バックアップ電源" } },
        { industry: { en: "Green Mobility / Automotive", ja: "グリーンモビリティ / 自動車" }, energyNeed: { en: "EV charging infra, V2G, battery lifecycle", ja: "EV充電インフラ、V2G、蓄電池ライフサイクル" }, japanRole: { en: "V2G pilots (Nissan), BEV pickups (Isuzu/Toyota)", ja: "V2Gパイロット（日産）、BEVピックアップ（いすゞ/トヨタ）" } },
        { industry: { en: "BCG / Next-Gen Food", ja: "BCG / 次世代フード" }, energyNeed: { en: "Biomass/WtE, cold chain decarbonization", ja: "バイオマス/WtE、コールドチェーン脱炭素化" }, japanRole: { en: "WtE tech (JFE, Hitachi Zosen), LNG cold energy", ja: "WtE技術（JFE、日立造船）、LNG冷熱利用" } },
        { industry: { en: "Smart Living / Silver Economy", ja: "スマートリビング / シルバーエコノミー" }, energyNeed: { en: "EMS, IAQ, thermal comfort for elderly care", ja: "EMS、IAQ、高齢者ケアの温熱快適性" }, japanRole: { en: "Daikin VRV, Panasonic Wellness, smart homes", ja: "ダイキンVRV、パナソニック・ウェルネス、スマートホーム" } },
        { industry: { en: "Human Resource Development", ja: "人材開発" }, energyNeed: { en: "KOSEN energy engineering curriculum", ja: "KOSENエネルギー工学カリキュラム" }, japanRole: { en: "KOSEN model export, 200% BOI training deduction", ja: "KOSENモデル輸出、BOI研修費200%控除" } }
      ]
    },

    // ── Section 6: Sources ──
    sources: [
      "Climate Policy Database — PDP 2024 Summary (Doc: footnote 1, 10, 11)",
      "Watson Farley & Williams — Thailand Renewable Incentives 2024 (Doc: footnote 2)",
      "IEA — PDP Draft Hydrogen Blending Targets (Doc: footnote 3)",
      "BloombergNEF — Thailand Power Sector Decarbonization (Doc: footnote 4, 7)",
      "FOSRLaw — Third Party Access Code 2025 (Doc: footnote 5, 9)",
      "Nagashima Ohno & Tsunematsu — Direct PPA Pilot Criteria (Doc: footnote 6, 10)",
      "Hunton Andrews Kurth — Direct PPA Regulations (Doc: footnote 7, 14)",
      "Argus Media — UGT Pricing 2026 (Doc: footnote 12)",
      "PTTEP — CCS Collaboration with JOGMEC/INPEX (Doc: footnote 8, 29, 30)",
      "Anariev — EV Charging Market Analysis 2025 (Doc: footnote 9, 18)",
      "Nation Thailand — BOI Investment Incentives (Doc: footnote 10, 13)",
      "Mitsui & Co. — Ammonia Co-firing Projects (Doc: footnote 12, 27)",
      "MHI — Hydrogen Co-firing MoU with EGAT (Doc: footnote 13, 28)",
      "Thai Embassy DC — Japanese Automaker Investment (Doc: footnote 14, 19)",
      "Nissan ASEAN — Vehicle-to-Grid Project (Doc: footnote 15, 20, 21)",
      "JIRCAS — Biomass/Agricultural Waste Research (Doc: footnote 16, 22)",
      "KOSEN-K — Thai Kosen Project (Doc: footnote 23)",
      "BOI — Investment Promotion Guide 2025 (Doc: footnote 25)",
      "PWC — Thailand Corporate Tax Credits & Incentives (Doc: footnote 26)",
      "Nippon Steel — Investment in G Steel Thailand (Doc: footnote 20)",
      "Panasonic — New Business Strategy in Thailand (Doc: footnote 21)",
      "Mitsubishi Electric — Sustainable Building Collaboration (Doc: footnote 17)"
    ]
  };

  return (
    <>
      <SEO 
        title={isJapanese 
          ? "タイ・エネルギー産業変革レポート | WaLens" 
          : "Thailand Energy Transformation Report | WaLens"
        }
        description={isJapanese
          ? "タイのエネルギー転換と産業ルネサンス。水素・Direct PPA・GXソリューション——日系企業経営者のための戦略青写真。"
          : "Thailand's energy transformation and industrial renaissance. Hydrogen, Direct PPA, and GX Solutions — strategic blueprint for Japanese executives."
        }
        canonicalPath="/insights/services/energy-industry"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative w-full h-[340px] md:h-[420px] flex items-end overflow-hidden">
          <img src={heroImage} alt="Thailand Energy Industry" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
          <div className="relative z-20 container mx-auto px-4 pb-10">
            <Badge variant="outline" className="mb-3 bg-amber-500/20 text-amber-200 border-amber-500/30">
              <Zap className="h-3 w-3 mr-1" />
              {content.category[isJapanese ? 'ja' : 'en']}
            </Badge>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight max-w-4xl">
              {content.headline[isJapanese ? 'ja' : 'en']}
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-3xl">
              {content.subheadline[isJapanese ? 'ja' : 'en']}
            </p>
            <div className="flex items-center gap-3 mt-3 text-sm text-gray-300">
              <Badge variant="secondary" className="bg-white/10 text-white border-0">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
              <span>{isJapanese ? '最終更新' : 'Updated'}: {content.lastUpdated}</span>
              <BookmarkButton
                article={{ slug: 'energy-industry', title: isJapanese ? 'タイ・エネルギー産業変革レポート' : 'Thailand Energy Transformation Report', language: lang === 'ja' ? 'JP' : 'EN', url: '/insights/reports/energy-industry', category: 'Services' }}
                variant="button"
                className="text-white border-white/30 hover:bg-white/10"
              />
            </div>
          </div>
        </section>

        <main className="container mx-auto px-4 py-8">
          <Breadcrumb items={[
            { label: isJapanese ? 'インサイト' : 'Insights', href: '/insights' },
            { label: isJapanese ? 'サービス' : 'Services', href: '/insights/services' },
            { label: isJapanese ? 'エネルギー産業変革' : 'Energy Transformation' }
          ]} />

          {/* Table of Contents */}
          <Card className="mb-8 mt-6 border-primary/20" id="table-of-contents">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {isJapanese ? '目次' : 'Table of Contents'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {tocSections.map((section, idx) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="flex items-center gap-2 text-left p-2 rounded-md hover:bg-muted transition-colors text-sm"
                  >
                    <span className="text-primary font-mono text-xs w-6">{String(idx + 1).padStart(2, '0')}</span>
                    <span>{section.label}</span>
                    <ChevronRight className="h-3 w-3 ml-auto text-muted-foreground" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Executive Summary */}
          <section id="executive-summary" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{isJapanese ? 'エグゼクティブサマリー' : 'Executive Summary'}</h2>
                <p className="text-sm text-muted-foreground">{isJapanese ? '経営層のための要約' : 'Key insights for decision makers'}</p>
              </div>
            </div>
            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {content.executiveSummary[isJapanese ? 'ja' : 'en'].map((point, idx) => (
                    <li key={idx} className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 2: Facts */}
          <section id="facts" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Database className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{isJapanese ? 'ファクト（市場・政策・動向）' : 'Facts (Market, Policy & Trends)'}</h2>
                <p className="text-sm text-muted-foreground">{isJapanese ? '客観的データのみ' : 'Objective data only'}</p>
              </div>
            </div>

            {/* Market Structure */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  {content.marketStructure.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'セグメント' : 'Segment'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '規模/目標' : 'Scale/Target'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '成長性' : 'Growth'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '主要プレイヤー' : 'Key Players'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.marketStructure.segments[isJapanese ? 'ja' : 'en'].map((seg, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium">{seg.name}</td>
                          <td className="py-3 pr-4">{seg.share}</td>
                          <td className="py-3 pr-4">{seg.growth}</td>
                          <td className="py-3 text-muted-foreground">{seg.players}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Key Players */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-500" />
                  {content.keyPlayers.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {content.keyPlayers.data[isJapanese ? 'ja' : 'en'].map((player, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 p-3 rounded-lg bg-muted/50">
                      <span className="font-medium min-w-[180px]">{player.segment}</span>
                      <span className="text-sm text-muted-foreground flex-1">{player.examples}</span>
                      <Badge variant="outline" className="w-fit text-xs">{player.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Policy & Regulation */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  {content.policyInsights.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.policyInsights.items[isJapanese ? 'ja' : 'en'].map((item, idx) => (
                    <div key={idx} className="border-l-2 border-primary/30 pl-4">
                      <h4 className="font-semibold text-sm mb-1">{item.policy}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{item.content}</p>
                      <p className="text-xs text-muted-foreground italic">{isJapanese ? '出典' : 'Source'}: {item.citation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Opportunities & Risks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    {isJapanese ? '機会' : 'Opportunities'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {content.opportunities[isJapanese ? 'ja' : 'en'].map((opp, idx) => (
                      <li key={idx} className="flex gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{opp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-red-500" />
                    {isJapanese ? 'リスク' : 'Risks'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {content.risks[isJapanese ? 'ja' : 'en'].map((risk, idx) => (
                      <li key={idx} className="flex gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Paywall check for remaining sections */}
          {!hasFullAccess ? (
            <Card className="mb-12 border-amber-500/30 bg-amber-500/5">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Lock className="h-12 w-12 text-amber-500 mx-auto" />
                  <h3 className="text-xl font-bold">
                    {isJapanese ? 'プレミアムコンテンツ' : 'Premium Content'}
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {isJapanese 
                      ? 'WaLensの独自分析、経営者への提言、データ付録を含む完全版レポートにアクセスするにはプレミアムプランが必要です。'
                      : 'Access to WaLens analysis, executive recommendations, and data appendix requires a premium subscription.'
                    }
                  </p>
                  <div className="flex gap-3 justify-center">
                    {!user ? (
                      <>
                        <Button onClick={() => setIsLoginOpen(true)} variant="outline">
                          {isJapanese ? 'ログイン' : 'Log In'}
                        </Button>
                        <Button onClick={() => setIsSignUpOpen(true)} className="bg-amber-500 hover:bg-amber-600">
                          {isJapanese ? '無料トライアル開始' : 'Start Free Trial'}
                        </Button>
                      </>
                    ) : (
                      <Button asChild className="bg-amber-500 hover:bg-amber-600">
                        <Link to="/subscribe">{isJapanese ? 'プランをアップグレード' : 'Upgrade Plan'}</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Section 3: Opinion & Implication */}
              <section id="opinion" className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Lightbulb className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{content.opinion.title[isJapanese ? 'ja' : 'en']}</h2>
                    <p className="text-sm text-muted-foreground">{content.opinion.intro[isJapanese ? 'ja' : 'en']}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {content.opinion.points[isJapanese ? 'ja' : 'en'].map((point, idx) => (
                    <Card key={idx} className="border-l-4 border-l-purple-500/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Eye className="h-4 w-4 text-purple-500" />
                          {point.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">{point.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Section 4: Recommendation */}
              <section id="recommendation" className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <Crown className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{isJapanese ? '日本企業経営者への提言' : 'Recommendation for Japanese Executives'}</h2>
                  </div>
                </div>
                <div className="space-y-4">
                  {content.recommendations[isJapanese ? 'ja' : 'en'].map((rec, idx) => (
                    <Card key={idx} className="border-l-4 border-l-amber-500/50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{rec.title}</CardTitle>
                          <Badge variant={rec.priority === 'Immediate' || rec.priority === '即座' ? 'destructive' : rec.priority === 'Strategic' || rec.priority === '戦略的' ? 'default' : 'secondary'}>
                            {rec.priority}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">{rec.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Section 5: Data Appendix */}
              <section id="data-appendix" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <Database className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{isJapanese ? 'データ付録' : 'Data Appendix'}</h2>
                  </div>
                </div>

                {/* PDP Comparison Table */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {content.pdpComparison.title[isJapanese ? 'ja' : 'en']}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '指標' : 'Metric'}</th>
                            <th className="text-left py-2 pr-4 font-semibold">PDP 2018</th>
                            <th className="text-left py-2 pr-4 font-semibold">PDP 2024</th>
                            <th className="text-left py-2 font-semibold">{isJapanese ? '戦略的意味合い' : 'Strategic Implication'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.pdpComparison.data.map((row, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 pr-4 font-medium">{row.metric[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 pr-4">{row.pdp2018}</td>
                              <td className="py-3 pr-4 font-semibold text-primary">{row.pdp2024}</td>
                              <td className="py-3 text-muted-foreground">{row.implication[isJapanese ? 'ja' : 'en']}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Strategic Industries × Energy Nexus */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {content.strategicIndustries.title[isJapanese ? 'ja' : 'en']}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '戦略産業' : 'Strategic Industry'}</th>
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'エネルギー需要' : 'Energy Need'}</th>
                            <th className="text-left py-2 font-semibold">{isJapanese ? '日本企業の役割' : 'Japan\'s Role'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.strategicIndustries.data.map((row, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 pr-4 font-medium">{row.industry[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 pr-4">{row.energyNeed[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 text-muted-foreground">{row.japanRole[isJapanese ? 'ja' : 'en']}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Section 6: Sources */}
              <section id="sources" className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gray-500/10">
                    <BookOpen className="h-6 w-6 text-gray-500" />
                  </div>
                  <h2 className="text-2xl font-bold">{isJapanese ? '出典・参考文献' : 'Sources & References'}</h2>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                      {content.sources.map((source, idx) => (
                        <li key={idx}>{source}</li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </section>

              {/* Further Inquiry */}
              <FurtherInquiryNotice />
            </>
          )}
        </main>

        <FloatingNavButton onClick={scrollToTOC} />
        <Footer />
      </div>

      <AuthModals
        isLoginOpen={isLoginOpen}
        isSignUpOpen={isSignUpOpen}
        onLoginClose={() => setIsLoginOpen(false)}
        onSignUpClose={() => setIsSignUpOpen(false)}
        onSwitchToSignUp={() => { setIsLoginOpen(false); setIsSignUpOpen(true); }}
        onSwitchToLogin={() => { setIsSignUpOpen(false); setIsLoginOpen(true); }}
      />
    </>
  );
};

export default EnergyIndustry;
