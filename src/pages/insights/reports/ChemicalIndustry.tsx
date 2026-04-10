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
  Beaker,
  Leaf,
  Cpu
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const ChemicalIndustry = () => {
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
        'chemical-industry',
        isJapanese ? 'タイ化学産業レポート' : 'Thailand Chemical Industry Report',
        'manufacturing',
        lang
      );
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker('chemical-industry', 'Thailand Chemical Industry Report', 'タイ化学産業レポート', 'Manufacturing', hasFullAccess);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(
        'chemical-industry',
        isJapanese ? 'タイ化学産業レポート' : 'Thailand Chemical Industry Report',
        'manufacturing',
        lang
      );
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTOC = () => {
    const element = document.getElementById('table-of-contents');
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tocSections = [
    { id: 'executive-summary', label: isJapanese ? 'エグゼクティブサマリー' : 'Executive Summary' },
    { id: 'facts', label: isJapanese ? '市場・政策・動向に関する情報' : 'Facts (Market, Policy & Trends)' },
    { id: 'opinion', label: isJapanese ? 'WaLensの見解と示唆' : 'Opinion & Implication from WaLens' },
    { id: 'recommendation', label: isJapanese ? '日本企業経営者への提言' : 'Recommendation for Japanese Executives' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: {
      en: "Thailand's Chemical Industry at the 2025 Inflection Point: From Manufacturing Base to Social Solutions Hub",
      ja: "タイ化学産業の2025年転換点：「製造拠点」から「社会課題解決ハブ」への変貌"
    },
    subheadline: {
      en: "Why the commodity playbook is dead and how Japanese chemical firms can capture the specialty pivot",
      ja: "コモディティ戦略の終焉と日系化学メーカーがスペシャリティ転換を捉える方法"
    },
    category: {
      en: "Manufacturing / Chemicals",
      ja: "製造業 / 化学"
    },
    lastUpdated: "2026-02-08",
    executiveSummary: {
      en: [
        "Thailand's chemical industry is at a decisive pivot: the 'cheap production base' model is obsolete. Gulf of Thailand gas reserves are depleting, and Chinese oversupply has collapsed commodity margins. Naphtha-based crackers are structurally disadvantaged against US ethane or Middle East gas. (Doc: Section 3)",
        "The 'Social Solutions Hub' model is rising. Thailand is repositioning as a testing ground for high-value technologies addressing aging populations, food security, urbanization, and decarbonization — challenges Japan knows well. (Doc: Section 1)",
        "Five mega-themes define the opportunity: (1) Elderly Care & Smart Homes, (2) Next-Gen Food & Bio-Circular Hub, (3) Advanced Electronics & EV Materials, (4) Education/KOSEN talent pipeline, (5) Third-Country gateway via RCEP. (Doc: Sections 4-8)",
        "Asahi Kasei's withdrawal from its AN joint venture with PTTGC (late 2024) is a bellwether: Japanese firms will no longer sustain unprofitable commodity lines. PTTGC and SCGC are importing US ethane to maintain cracker competitiveness while pivoting downstream. (Doc: Section 3.1)",
        "Map Ta Phut Phase 3 expansion (1,000 rai reclaimed land, LNG terminal, 2027 completion target) secures the next 20 years of Thailand's petrochemical cluster competitiveness. (Doc: Section 9.1)"
      ],
      ja: [
        "タイの化学産業は決定的な転換点にある：「安価な生産拠点」モデルは陳腐化した。タイ湾のガス埋蔵量は枯渇しつつあり、中国の過剰供給がコモディティマージンを崩壊させた。ナフサベースクラッカーは米国エタンや中東ガスに対して構造的に不利。（Doc: Section 3）",
        "「社会課題解決ハブ」モデルが台頭。タイは高齢化、食料安全保障、都市化、脱炭素化——日本がよく知る課題——に取り組む高付加価値技術のテストグラウンドとして再ポジショニング中。（Doc: Section 1）",
        "5つのメガテーマが機会を定義：(1) 高齢者ケア＆スマートホーム、(2) 次世代食品＆バイオサーキュラーハブ、(3) 先端エレクトロニクス＆EV素材、(4) 教育/KOSEN人材パイプライン、(5) RCEP経由の第三国ゲートウェイ。（Doc: Sections 4-8）",
        "旭化成のPTTGCとのAN合弁からの撤退（2024年末）は先行指標：日系企業は不採算のコモディティラインをもはや維持しない。PTTGCとSCGCは米国エタンを輸入しクラッカー競争力を維持しながら川下へピボット。（Doc: Section 3.1）",
        "マプタプットPhase 3拡張（1,000ライの埋立地、LNGターミナル、2027年完成目標）が今後20年のタイ石油化学クラスターの競争力を確保。（Doc: Section 9.1）"
      ]
    },
    // Facts: Market Structure
    marketStructure: {
      title: { en: "Market Structure: The Commodity-to-Specialty Shift", ja: "市場構造：コモディティからスペシャリティへの転換" },
      segments: {
        en: [
          { name: "Commodity Petrochemicals (PE/PP)", share: "Declining", growth: "Margin collapse", players: "PTT GC, SCGC vs. Chinese mega-complexes" },
          { name: "Bioplastics (PLA/PBS/Bio-PE)", share: "Growing", growth: "World #2 producer", players: "TotalEnergies Corbion, PTTMCC (Mitsubishi JV), Braskem Siam" },
          { name: "EV Battery Chemicals", share: "Emerging", growth: "+40% YoY", players: "Mitsubishi Chemical, UBE, Sumitomo Metal Mining" },
          { name: "Semiconductor/PCB Chemicals", share: "Growing", growth: "+25% YoY", players: "Sumitomo Chemical, Mitsubishi Chemical" },
          { name: "Medical & Hygiene Polymers", share: "Stable Growth", growth: "+12% YoY", players: "Mitsui Chemicals (Sunrex), Kuraray, SCGC" }
        ],
        ja: [
          { name: "コモディティ石化（PE/PP）", share: "縮小中", growth: "マージン崩壊", players: "PTT GC, SCGC vs 中国メガコンプレックス" },
          { name: "バイオプラスチック（PLA/PBS/Bio-PE）", share: "拡大中", growth: "世界第2位生産国", players: "TotalEnergies Corbion, PTTMCC（三菱JV）, Braskem Siam" },
          { name: "EVバッテリー化学品", share: "新興", growth: "+40% YoY", players: "三菱ケミカル, UBE, 住友金属鉱山" },
          { name: "半導体/PCB化学品", share: "拡大中", growth: "+25% YoY", players: "住友化学, 三菱ケミカル" },
          { name: "医療・衛生ポリマー", share: "安定成長", growth: "+12% YoY", players: "三井化学（Sunrex）, クラレ, SCGC" }
        ]
      }
    },
    // Facts: Five Mega-Themes
    megaThemes: {
      title: { en: "Five Mega-Theme Opportunities", ja: "5つのメガテーマ機会" },
      items: {
        en: [
          { policy: "1. Elderly Care & Smart Homes", content: "Medical-grade polymers (adult incontinence films, PVC-free medical tubing), low-VOC/anti-viral coatings, high-performance insulation for building energy codes, and antibacterial surfaces (Mitsubishi Chemical's Durabio bio-PC for smart appliance interfaces).", citation: "Doc: Sections 4.1-4.2" },
          { policy: "2. Next-Gen Food & Bio-Circular Hub", content: "Thailand is world's #2 bioplastics producer: PLA (TotalEnergies Corbion, 75kt/yr Rayong), Bio-PBS (PTTMCC/Mitsubishi, world's largest), Bio-Ethylene (Braskem Siam/SCGC, 200kt/yr). Precision agriculture: drone-compatible formulations (Sumitomo Chemical), nutraceutical extraction from agri-waste (EECi Biopolis).", citation: "Doc: Sections 5.1-5.2" },
          { policy: "3. Advanced Electronics & EV Materials", content: "Battery chemicals (electrolytes, high-nickel cathodes), lightweighting composites (Teijin CFRP, Toray PBT/PPS), high-purity solvents for PCB/semiconductor washing (Sumitomo Chemical), thermal interface materials for data centers (Mitsubishi Chemical).", citation: "Doc: Sections 6.1-6.2" },
          { policy: "4. Education & KOSEN Talent Pipeline", content: "Two KOSEN institutes (KMITL/KMUTT) produce practical engineers for chemical plants. Japanese firms actively partnering for internships/recruitment, locking in Japanese standards in next-gen Thai industrial leadership.", citation: "Doc: Sections 7.1-7.2" },
          { policy: "5. Third-Country Gateway via RCEP", content: "RCEP accumulation rule: import intermediates from Japan (0% tariff under JTEPA), add value in Thailand (polymerization/compounding), export finished resin to Vietnam/Indonesia/India under RCEP preference. Map Ta Phut's 'plug-and-play' utility grid gives Thailand advantage over Vietnam for complex chemical synthesis.", citation: "Doc: Sections 8.1-8.2" }
        ],
        ja: [
          { policy: "1. 高齢者ケア＆スマートホーム", content: "医療グレードポリマー（成人用失禁フィルム、PVCフリー医療チューブ）、低VOC/抗ウイルスコーティング、建築エネルギー基準向け高性能断熱材、抗菌表面（三菱ケミカルDurabioバイオPCスマート家電インターフェース用）。", citation: "Doc: Sections 4.1-4.2" },
          { policy: "2. 次世代食品＆バイオサーキュラーハブ", content: "タイはバイオプラスチック世界第2位の生産国：PLA（TotalEnergies Corbion、ラヨーン7.5万t/年）、Bio-PBS（PTTMCC/三菱、世界最大）、Bio-Ethylene（Braskem Siam/SCGC、20万t/年）。精密農業：ドローン対応製剤（住友化学）、農業廃棄物からの機能性食品素材抽出（EECi Biopolis）。", citation: "Doc: Sections 5.1-5.2" },
          { policy: "3. 先端エレクトロニクス＆EV素材", content: "バッテリー化学品（電解液、高ニッケル正極材）、軽量化複合材料（帝人CFRP、東レPBT/PPS）、PCB/半導体洗浄用高純度溶剤（住友化学）、データセンター向け熱界面材料（三菱ケミカル）。", citation: "Doc: Sections 6.1-6.2" },
          { policy: "4. 教育＆KOSEN人材パイプライン", content: "2つのKOSEN機関（KMITL/KMUTT）が化学プラント向け実践的エンジニアを育成。日系企業がインターンシップ・採用で積極的にパートナーシップを構築し、日本基準を次世代タイ産業リーダーシップに定着。", citation: "Doc: Sections 7.1-7.2" },
          { policy: "5. RCEP経由の第三国ゲートウェイ", content: "RCEP累積ルール：日本から中間体を輸入（JTEPA下0%関税）、タイで付加価値（重合/コンパウンド）、完成樹脂をRCEP特恵でベトナム/インドネシア/インドへ輸出。マプタプットの「プラグ＆プレイ」ユーティリティグリッドが複雑な化学合成でベトナムに対する優位性を提供。", citation: "Doc: Sections 8.1-8.2" }
        ]
      }
    },
    // Facts: Policy & BOI
    policyInsights: {
      title: { en: "BOI Incentives & Regulatory Roadmap", ja: "BOIインセンティブ＆規制ロードマップ" },
      items: {
        en: [
          { policy: "Activity 6.6 (Eco-friendly Chemicals)", content: "8-year CIT exemption (Category A2). Requires renewable raw materials or recycled content, certified to ISO 14000/Carbon Footprint.", citation: "BOI Investment Promotion Guide 2025 [34]" },
          { policy: "Activity 5.2.1 (Advanced Materials)", content: "8-year CIT exemption (Category A2). Nano-technology or advanced-properties materials; continuous production gets benefits.", citation: "BOI Guide 2025 [35]" },
          { policy: "Activity 4.8.3 (EV Battery Cells)", content: "Up to 13-year CIT exemption (Category A1). High energy density requirements for localizing supply chain.", citation: "BOI Guide 2025 [34]" },
          { policy: "Retention & Expansion Package", content: "Crucial for existing investors (targeting Japanese firms). Companies with 15-year history and 3+ projects get special CIT exemptions for expansion, reducing temptation to relocate to Vietnam.", citation: "BOI Strategy 2026 [33]" },
          { policy: "BCG Economy Model (National Agenda)", content: "Target to raise BCG sector value to 4.4 trillion THB (24% of GDP) by 2026. Explicitly targets conversion of agricultural surplus into bioplastics and biochemicals.", citation: "BCG Strategic Plan [3][4]" }
        ],
        ja: [
          { policy: "活動6.6（環境配慮型化学品）", content: "8年間法人税免除（カテゴリーA2）。再生可能原料またはリサイクル含有を要求、ISO 14000/カーボンフットプリント認証必要。", citation: "BOI投資促進ガイド2025 [34]" },
          { policy: "活動5.2.1（先端材料）", content: "8年間法人税免除（カテゴリーA2）。ナノテクノロジーまたは先端特性の材料；連続生産に特典。", citation: "BOIガイド2025 [35]" },
          { policy: "活動4.8.3（EVバッテリーセル）", content: "最大13年間法人税免除（カテゴリーA1）。サプライチェーン現地化に向けた高エネルギー密度要件。", citation: "BOIガイド2025 [34]" },
          { policy: "リテンション＆拡張パッケージ", content: "既存投資家（日系企業をターゲット）に極めて重要。15年の歴史と3件以上のプロジェクトを持つ企業が拡張向け特別CIT免除を取得、ベトナム移転の誘惑を軽減。", citation: "BOI戦略2026 [33]" },
          { policy: "BCG経済モデル（国家アジェンダ）", content: "BCGセクターの価値を2026年までに4.4兆THB（GDP24%）に引き上げ目標。農業余剰のバイオプラスチック・生化学品への転換を明示的にターゲット。", citation: "BCG戦略計画 [3][4]" }
        ]
      }
    },
    opportunities: {
      en: [
        "Bioplastics leadership: Thailand's sugarcane/cassava feedstock gives a 'Bio-Hub' advantage that China/Vietnam cannot replicate (Doc: Section 5.1)",
        "EV material localization: electrolytes, high-purity solvents, and cathode materials for gigafactories in EEC (Doc: Section 6.1)",
        "RCEP accumulation: use Thailand as regional value-added hub for exports to India, Vietnam, Indonesia (Doc: Section 8.2)",
        "BOI Retention & Expansion package specifically targets long-tenure Japanese firms with favorable CIT terms (Doc: Section 10.1)",
        "KOSEN talent pipeline locks in Japanese standards for next-generation Thai engineers — strategic moat against generic competitors (Doc: Section 7.1)"
      ],
      ja: [
        "バイオプラスチックリーダーシップ：タイのサトウキビ/キャッサバ原料が中国/ベトナムには複製できない「バイオハブ」優位性を提供（Doc: Section 5.1）",
        "EV素材現地化：EEC内のギガファクトリー向け電解液、高純度溶剤、正極材料（Doc: Section 6.1）",
        "RCEP累積：タイをインド、ベトナム、インドネシアへの輸出のための地域付加価値ハブとして活用（Doc: Section 8.2）",
        "BOIリテンション＆拡張パッケージが長期在タイ日系企業を有利なCIT条件で特にターゲット（Doc: Section 10.1）",
        "KOSEN人材パイプラインが次世代タイエンジニアに日本基準を定着——汎用競合に対する戦略的堀（Doc: Section 7.1）"
      ]
    },
    risks: {
      en: [
        "Commodity margin collapse: Chinese 40M+ ton ethylene overcapacity makes standard-grade polymer production unviable in Thailand (Doc: Section 3.1)",
        "Feedstock transition risk: Gulf of Thailand gas depletion forces import dependence; PTTGC/SCGC pivot to US ethane adds supply chain complexity (Doc: Section 3)",
        "Vietnam competition: lower labor costs and growing refinery capacity challenge Thailand's cost competitiveness for basic processing (Doc: Appendix A)",
        "Carbon cost escalation: CBAM readiness for EU exports and domestic carbon neutrality 2050 target add compliance burden (Doc: Section 10.2)",
        "Labor shortage: aging workforce and competition for engineers from EV/semiconductor sectors create wage pressure (Doc: Appendix A)"
      ],
      ja: [
        "コモディティマージン崩壊：中国の4,000万t超エチレン過剰生産能力がタイでの標準グレードポリマー生産を不採算化（Doc: Section 3.1）",
        "原料転換リスク：タイ湾ガス枯渇が輸入依存を強制；PTTGC/SCGCの米国エタンへのピボットがサプライチェーン複雑性を追加（Doc: Section 3）",
        "ベトナム競争：低い人件費と成長する精製能力がタイの基礎加工コスト競争力に挑戦（Doc: Appendix A）",
        "炭素コストエスカレーション：EU輸出向けCBAM準備と国内カーボンニュートラル2050目標がコンプライアンス負担を追加（Doc: Section 10.2）",
        "労働力不足：高齢化する労働力とEV/半導体セクターからのエンジニア争奪が賃金圧力を創出（Doc: Appendix A）"
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
            title: "The Commodity Exit Is Not Optional — It Is Already Happening",
            content: "Asahi Kasei's withdrawal from its AN/MMA joint venture with PTTAC is not an isolated event. It is a structural signal that the Red Ocean of commodity chemicals in Thailand is no longer sustainable for Japanese cost structures. Companies that delay rationalization of standard-grade polymer assets will find themselves managing increasingly unprofitable operations while missing the window for specialty repositioning."
          },
          {
            title: "Thailand's 'Social Solutions' Framing Changes the Investment Thesis",
            content: "The most underappreciated shift is Thailand's repositioning from 'factory' to 'social solutions market.' Japanese chemical firms have a unique advantage here because Japan faces the same demographic and urbanization challenges as Thailand — but at a more advanced stage. This means products already developed for the Japanese market (medical polymers, elderly care materials, energy-efficient building chemicals) can be adapted for Thailand with minimal R&D. The 'Japan-to-Thailand' technology transfer model works in reverse for social solutions."
          },
          {
            title: "The Bio-Hub Is Real and Defensible",
            content: "Thailand's position as the world's #2 bioplastics producer is not an accident — it is built on genuine feedstock advantages (sugarcane, cassava, palm oil) that China and Vietnam cannot easily replicate. The PTTMCC Bio-PBS plant (Mitsubishi JV) and Braskem Siam Bio-Ethylene project represent structural competitive advantages. Companies that combine Japanese polymer technology with Thai bio-feedstock have a defensible moat in a world increasingly demanding verifiable green materials."
          },
          {
            title: "RCEP Makes Thailand More Valuable, Not Less",
            content: "The conventional wisdom that Thailand is 'losing competitiveness' to Vietnam misses the RCEP multiplier effect. Thailand's value is no longer primarily about domestic production cost — it is about the 'accumulation rule' that allows complex intermediates to be processed through Thailand's mature chemical infrastructure and re-exported under preferential tariffs. Map Ta Phut's integrated utility infrastructure gives Thailand an advantage for capital-intensive chemical processing that Vietnam's emerging zones cannot match."
          }
        ],
        ja: [
          {
            title: "コモディティからの撤退はオプションではない——既に進行中",
            content: "旭化成のPTTACとのAN/MMA合弁からの撤退は孤立した事象ではない。タイにおけるコモディティ化学品のレッドオーシャンが日本のコスト構造ではもはや持続不可能であるという構造的シグナルである。標準グレードポリマー資産の合理化を遅らせる企業は、収益性が低下する一方の事業を管理しながら、スペシャリティへの再ポジショニングの窓を逃すことになる。"
          },
          {
            title: "タイの「社会課題解決」フレーミングが投資テーシスを変える",
            content: "最も過小評価されている変化は、タイが「工場」から「社会課題解決市場」へ再ポジショニングしていることである。日系化学企業はここにユニークな優位性を持つ。日本がタイと同じ人口動態・都市化課題に直面しているが、より進んだ段階だからである。つまり日本市場向けに既に開発された製品（医療ポリマー、高齢者ケア素材、省エネ建築化学品）をタイ向けに最小限のR&Dで適応可能。社会課題解決では「日本からタイへ」の技術移転モデルが逆方向に機能する。"
          },
          {
            title: "バイオハブは実在し防御可能",
            content: "タイがバイオプラスチック世界第2位の生産国であることは偶然ではない——サトウキビ、キャッサバ、パーム油という中国やベトナムが容易に複製できない真正な原料優位性の上に構築されている。PTTMCC Bio-PBSプラント（三菱JV）とBraskem SiamのBio-Ethyleneプロジェクトは構造的競争優位を代表する。日本のポリマー技術とタイのバイオ原料を組み合わせる企業は、検証可能なグリーン素材をますます求める世界で防御可能な堀を持つ。"
          },
          {
            title: "RCEPはタイの価値を減少させるのではなく増大させる",
            content: "タイがベトナムに「競争力を失っている」という通説はRCEPの乗数効果を見落としている。タイの価値はもはや主に国内生産コストにあるのではなく、複雑な中間体をタイの成熟した化学インフラを通じて加工し、特恵関税で再輸出できる「累積ルール」にある。マプタプットの統合ユーティリティインフラは、ベトナムの新興ゾーンではマッチできない資本集約的化学プロセスでの優位性をタイに与える。"
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
        en: `The Thailand of 2025 is not the Thailand of 1990. The 'Cheap Production Base' model is obsolete. However, the 'Social Solution Hub' model is just beginning.

First, abandon commodities decisively. Divest or rationalize standard-grade petrochemical assets. You cannot compete with Chinese mega-complexes on cost. Asahi Kasei's AN/MMA exit is the template, not the exception.

Second, focus on 'Social Issue' chemicals across three verticals: (a) Aging — medical polymers, hygiene films, home wellness coatings; (b) Green — bioplastics, recycled compounds, biodegradable packaging; (c) Tech — battery electrolytes, semiconductor solvents, thermal management resins.

Third, localize the EV supply chain. Move from importing materials to mixing and compounding locally. The 'Rule of Origin' requirements for EVs will demand local content. The window for establishing upstream battery chemical positions in the EEC is closing as Chinese suppliers accelerate.

Fourth, use Thailand as the Lab. Leverage the EECi Biopolis/Aripolis infrastructure and the KOSEN talent pool to adapt products for the tropical ASEAN climate (high-heat, humidity resistance), creating a technical moat against generic competitors.

Fifth, leverage RCEP proactively. Structure supply chains to use Thailand as the value-added hub for exports to India and Vietnam. The accumulation rule transforms Thailand from a production island into a regional platform. Map Ta Phut's integrated infrastructure is the linchpin.

Finally, secure the BOI Retention & Expansion package. For firms with 15+ year histories, this is the most favorable incentive environment in a decade. Use it to fund the specialty pivot rather than incremental commodity maintenance.`,
        ja: `2025年のタイは1990年のタイではない。「安価な生産拠点」モデルは陳腐化した。しかし「社会課題解決ハブ」モデルはまだ始まったばかりである。

第一に、コモディティから断固として撤退すること。標準グレード石化資産を売却または合理化する。中国のメガコンプレックスとコストで競争することはできない。旭化成のAN/MMA撤退は例外ではなくテンプレートである。

第二に、「社会課題」化学品に3つのバーティカルで集中すること：(a) 高齢化——医療ポリマー、衛生フィルム、住宅ウェルネスコーティング；(b) グリーン——バイオプラスチック、リサイクルコンパウンド、生分解性パッケージ；(c) テック——バッテリー電解液、半導体溶剤、熱管理樹脂。

第三に、EVサプライチェーンを現地化すること。素材輸入からミキシング・コンパウンディングの現地化へ移行する。EVの「原産地規則」要件が現地調達を求める。EEC内での上流バッテリー化学品ポジション確立の窓は、中国サプライヤーの加速とともに閉じつつある。

第四に、タイをラボとして活用すること。EECi Biopolis/AripolisインフラとKOSEN人材プールを活用し、熱帯ASEAN気候（高温・高湿度耐性）向けに製品を適応させ、汎用競合に対する技術的堀を構築する。

第五に、RCEPをプロアクティブに活用すること。タイをインド・ベトナムへの輸出のための付加価値ハブとしてサプライチェーンを構造化する。累積ルールがタイを生産の孤島から地域プラットフォームに変える。マプタプットの統合インフラがその要である。

最後に、BOIリテンション＆拡張パッケージを確保すること。15年以上の歴史を持つ企業にとって、これは過去10年で最も有利なインセンティブ環境である。漸進的なコモディティ維持ではなく、スペシャリティ転換の資金として活用すべきである。`
      }
    },
    dataAppendix: {
      title: { en: "Data Appendix", ja: "データ付録" },
      tables: {
        comparison: {
          title: { en: "Thailand vs. Vietnam: Chemical Industry Comparison", ja: "タイ vs ベトナム：化学産業比較" },
          data: [
            { feature: isJapanese ? "主な役割" : "Primary Role", thailand: isJapanese ? "先端ハブ：R&D、複合合成、地域本社" : "Advanced Hub: R&D, Complex Synthesis, Regional HQ", vietnam: isJapanese ? "工場：組立、基礎加工、輸出拠点" : "Factory: Assembly, Basic Processing, Export Base" },
            { feature: isJapanese ? "クラスター深度" : "Cluster Depth", thailand: isJapanese ? "高：60以上の統合プラント、共有パイプライン" : "High: 60+ integrated plants, shared pipelines", vietnam: isJapanese ? "中：Long Sonは成長中だがエコシステムは断片的" : "Medium: Long Son growing but ecosystem fragmented" },
            { feature: isJapanese ? "電力安定性" : "Power Stability", thailand: isJapanese ? "高：安定グリッド、連続化学プロセスに重要" : "High: Stable grid, critical for continuous processes", vietnam: isJapanese ? "リスク：ピーク夏季の停電歴" : "Risk: History of power shortages in peak summer" },
            { feature: isJapanese ? "原料" : "Feedstock", thailand: isJapanese ? "多様：ガス（減少）、バイオマス（豊富）、輸入能力" : "Diverse: Gas (declining), Bio-mass (rich), Import capable", vietnam: isJapanese ? "輸入依存：新精製能力建設中" : "Import Dependent: Building new refinery capacity" },
            { feature: isJapanese ? "労働力" : "Labor", thailand: isJapanese ? "高技能/高コスト：高齢化、強いエンジニアプール" : "High Skill/High Cost: Aging, strong engineering pool", vietnam: isJapanese ? "若年/低コスト：豊富だが高い離職率" : "Young/Low Cost: Abundant but high turnover" },
            { feature: isJapanese ? "インセンティブ" : "Incentives", thailand: isJapanese ? "技術重視：ハイテク/グリーンに最大13年税免除" : "Tech Focus: Up to 13-year tax holiday for high-tech/green", vietnam: isJapanese ? "輸出重視：製造業に4年免除＋減額" : "Export Focus: 4-year holiday + reductions for manufacturing" }
          ]
        },
        japaneseMovements: {
          title: { en: "Japanese Chemical Companies — Strategic Movements (2024-2025)", ja: "日系化学メーカー——戦略的動向（2024-2025）" },
          data: [
            { company: isJapanese ? "三菱ケミカル" : "Mitsubishi Chemical", action: isJapanese ? "スマートホーム/テクニカルレジン拡大" : "Smart Home / Technical Resin Expansion", theme: isJapanese ? "高齢者ケア＆エレクトロニクス" : "Elderly Care & Electronics" },
            { company: isJapanese ? "住友化学" : "Sumitomo Chemical", action: isJapanese ? "事業再編（台湾半導体化学品買収含む）" : "Restructuring (incl. Taiwan semiconductor chemical acquisition)", theme: isJapanese ? "エレクトロニクス＆食品" : "Electronics & Food" },
            { company: "AGC", action: isJapanese ? "大規模クロルアルカリ拡張（1,000億円）" : "Massive Chlor-Alkali Expansion (100bn JPY)", theme: isJapanese ? "インフラ＆グリーン" : "Infrastructure & Green" },
            { company: isJapanese ? "旭化成" : "Asahi Kasei", action: isJapanese ? "AN/MMA JV（PTTAC）からの撤退" : "Withdrawal from AN/MMA JV (PTTAC)", theme: isJapanese ? "コモディティ撤退" : "Commodity Exit" },
            { company: isJapanese ? "帝人" : "Teijin", action: isJapanese ? "炭素繊維/複合材料拡大" : "Carbon Fiber/Composites Expansion", theme: isJapanese ? "モビリティ" : "Mobility" },
            { company: isJapanese ? "東レ" : "Toray", action: isJapanese ? "「地産地消」自動車用樹脂（PPS/PBT）" : "'Local for Local' Automotive Resins (PPS/PBT)", theme: isJapanese ? "モビリティ" : "Mobility" }
          ]
        }
      }
    },
    sources: {
      title: { en: "Sources & Methodology", ja: "出典・方法論" },
      list: {
        en: [
          "Bank of Ayudhya — Thailand Industry Outlook 2025-2027 [1]",
          "AGC — Energy Recovery Plant inauguration, Chlor-Alkali expansion [2][40]",
          "OECD STIP Compass — BCG Economy Model Strategic Plan [3]",
          "APEC — Understanding the BCG Economy Model [4]",
          "KPMG — RCEP analysis [5][6]",
          "TPSO — Thai International Trade Statistics [7]",
          "Mordor Intelligence — Thailand Freight & Logistics Market [8]",
          "Wood Mackenzie / S&P Global — Petrochemicals oversupply analysis [10][11]",
          "Mitsubishi Chemical Group — Business Strategy Briefing 2025 [12]",
          "TotalEnergies Corbion — PLA plant completion [13]",
          "Sugar Asia Magazine — PTT & Bangchak Biochemical Hub [14]",
          "Sumitomo Chemical — 2025 strategy, semiconductor chemical acquisition [15][24]",
          "EECi — Biopolis and Biorefinery Pilot Plant [16][17]",
          "Sumitomo Metal Mining / Toyota — Cathode materials collaboration [21]",
          "Teijin / Toray — Composites and automotive resins [22][23]",
          "Alvarez & Marsal — Thailand BOI Incentives 2026-2027 [33]",
          "BOI — Investment Promotion Guide 2025 [34][35]",
          "CarbonCredits.com — PTT $7B Green Hydrogen Deal [36]",
          "WaLens analysis and field research (Q4 2025 – Q1 2026)"
        ],
        ja: [
          "アユタヤ銀行 — タイ産業見通し2025-2027 [1]",
          "AGC — エネルギー回収プラント、クロルアルカリ拡張 [2][40]",
          "OECD STIP Compass — BCG経済モデル戦略計画 [3]",
          "APEC — BCG経済モデルの理解 [4]",
          "KPMG — RCEP分析 [5][6]",
          "TPSO — タイ国際貿易統計 [7]",
          "Mordor Intelligence — タイ貨物・物流市場 [8]",
          "Wood Mackenzie / S&P Global — 石化過剰供給分析 [10][11]",
          "三菱ケミカルグループ — 経営戦略説明会2025 [12]",
          "TotalEnergies Corbion — PLAプラント完成 [13]",
          "Sugar Asia Magazine — PTT＆バンチャック生化学ハブ [14]",
          "住友化学 — 2025戦略、半導体化学品買収 [15][24]",
          "EECi — バイオポリス＆バイオリファイナリーパイロット [16][17]",
          "住友金属鉱山/トヨタ — 正極材料協業 [21]",
          "帝人/東レ — 複合材料＆自動車用樹脂 [22][23]",
          "Alvarez & Marsal — タイBOIインセンティブ2026-2027 [33]",
          "BOI — 投資促進ガイド2025 [34][35]",
          "CarbonCredits.com — PTT 70億ドルグリーン水素取引 [36]",
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
          <h3 className="font-bold text-lg mb-2">{isJapanese ? "プレミアム会員限定コンテンツ" : "Premium Content"}</h3>
          <p className="text-sm text-muted-foreground mb-4">{isJapanese ? "この詳細分析はプレミアム会員専用です" : "This detailed analysis is available to Premium members"}</p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => setIsLoginOpen(true)} variant="outline" size="sm">{isJapanese ? "ログイン" : "Sign In"}</Button>
            <Button asChild size="sm"><Link to="/subscribe">{isJapanese ? "プレミアムに登録" : "Subscribe"}</Link></Button>
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
            <p className="text-sm text-muted-foreground">{isJapanese ? "詳細分析、データ付録、戦略的示唆をご覧いただけます" : "View detailed analysis, data appendix, and strategic insights"}</p>
          </div>
        </div>
        <Button asChild className="bg-amber-500 hover:bg-amber-600"><Link to="/subscribe">{isJapanese ? "今すぐ登録" : "Subscribe Now"}</Link></Button>
      </CardContent>
    </Card>
  );

  const handleSwitchToLogin = () => { setIsSignUpOpen(false); setIsLoginOpen(true); };
  const handleSwitchToSignUp = () => { setIsLoginOpen(false); setIsSignUpOpen(true); };

  return (
    <>
      <SEO 
        title={isJapanese ? "タイ化学産業レポート | WaLens" : "Thailand Chemical Industry Report | WaLens"}
        description={isJapanese 
          ? "タイ化学産業の包括的分析。コモディティからスペシャリティへの転換、5つのメガテーマ、BCG経済モデル、日本企業への戦略的示唆。"
          : "Comprehensive analysis of Thailand's chemical industry. Commodity-to-specialty pivot, 5 mega-themes, BCG economy model, and strategic implications for Japanese companies."
        }
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6 md:py-12 max-w-4xl">
          <div className="mb-6">
            <Breadcrumb items={[
              { label: isJapanese ? "インサイト" : "Insights", href: "/insights" },
              { label: isJapanese ? "製造業" : "Manufacturing", href: "/insights/manufacturing" },
              { label: isJapanese ? "化学産業" : "Chemical Industry" }
            ]} />
          </div>

          {/* Hero */}
          <section className="mb-8 md:mb-12">
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img src={heroImage} alt={isJapanese ? "タイ化学産業" : "Thailand Chemical Industry"} className="w-full h-48 md:h-72 object-cover" />
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
                <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" />{isJapanese ? "読了時間：15分" : "15 min read"}</span>
              </div>
              <BookmarkButton article={{ slug: 'chemical-industry', title: isJapanese ? 'タイ化学産業レポート' : 'Thailand Chemical Industry Report', language: lang === 'ja' ? 'JP' : 'EN', url: '/insights/reports/chemical-industry', category: 'Manufacturing' }} variant="button" />
            </div>
          </section>

          {/* TOC */}
          <section id="table-of-contents" className="mb-8 md:mb-12">
            <Card><CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Eye className="h-5 w-5" />{isJapanese ? "目次" : "Table of Contents"}</CardTitle></CardHeader>
              <CardContent><nav className="space-y-1">{tocSections.map((section, index) => (
                <button key={section.id} onClick={() => scrollToSection(section.id)} className="w-full text-left flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group">
                  <span className="text-primary font-mono text-sm">{String(index + 1).padStart(2, '0')}</span>
                  <span className="flex-1">{section.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              ))}</nav></CardContent>
            </Card>
          </section>

          {/* Executive Summary */}
          <section id="executive-summary" className="mb-8 md:mb-12">
            <Card><CardHeader><CardTitle className="flex items-center gap-2 text-xl md:text-2xl"><Zap className="h-6 w-6 text-primary" />{isJapanese ? "エグゼクティブサマリー" : "Executive Summary"}</CardTitle></CardHeader>
              <CardContent><ul className="space-y-4">{(isJapanese ? content.executiveSummary.ja : content.executiveSummary.en).map((item, i) => (
                <li key={i} className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{item}</span></li>
              ))}</ul></CardContent>
            </Card>
          </section>

          {!hasFullAccess && <PremiumCTA />}

          {/* Facts */}
          <section id="facts" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2"><Database className="h-6 w-6" />{isJapanese ? "ファクト：市場・政策・動向" : "Facts: Market, Policy & Trends"}</h2>
            {hasFullAccess ? (
              <div className="space-y-6">
                {/* Market Structure */}
                <Card><CardHeader><CardTitle className="flex items-center gap-2"><Factory className="h-5 w-5" />{isJapanese ? content.marketStructure.title.ja : content.marketStructure.title.en}</CardTitle></CardHeader>
                  <CardContent><div className="space-y-3">{(isJapanese ? content.marketStructure.segments.ja : content.marketStructure.segments.en).map((seg, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div><p className="font-medium">{seg.name}</p><p className="text-sm text-muted-foreground">{seg.players}</p></div>
                      <div className="text-right"><p className="font-bold text-lg">{seg.share}</p><p className="text-sm text-green-600">{seg.growth}</p></div>
                    </div>
                  ))}</div></CardContent>
                </Card>

                {/* Five Mega-Themes */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Lightbulb className="h-5 w-5" />{isJapanese ? content.megaThemes.title.ja : content.megaThemes.title.en}</h3>
                  <div className="space-y-4">{(isJapanese ? content.megaThemes.items.ja : content.megaThemes.items.en).map((item, i) => (
                    <Card key={i}><CardContent className="p-4">
                      <h4 className="font-bold mb-2">{item.policy}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{item.content}</p>
                      <p className="text-xs text-muted-foreground italic">{isJapanese ? "出典" : "Source"}: {item.citation}</p>
                    </CardContent></Card>
                  ))}</div>
                </div>

                {/* Policy & BOI */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Shield className="h-5 w-5" />{isJapanese ? content.policyInsights.title.ja : content.policyInsights.title.en}</h3>
                  <div className="space-y-4">{(isJapanese ? content.policyInsights.items.ja : content.policyInsights.items.en).map((item, i) => (
                    <Card key={i}><CardContent className="p-4">
                      <h4 className="font-bold mb-2">{item.policy}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{item.content}</p>
                      <p className="text-xs text-muted-foreground italic">{isJapanese ? "出典" : "Source"}: {item.citation}</p>
                    </CardContent></Card>
                  ))}</div>
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
              <BlurredContent><div className="space-y-6"><Card className="h-64" /><Card className="h-64" /><Card className="h-48" /><div className="grid md:grid-cols-2 gap-4"><Card className="h-48" /><Card className="h-48" /></div></div></BlurredContent>
            )}
          </section>

          {/* Opinion */}
          <section id="opinion" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2"><Lightbulb className="h-6 w-6" />{isJapanese ? content.opinion.title.ja : content.opinion.title.en}</h2>
            {hasFullAccess ? (
              <div className="space-y-6">
                <Card className="border-primary/20 bg-primary/5"><CardContent className="p-4"><p className="text-sm text-muted-foreground italic">{isJapanese ? content.opinion.intro.ja : content.opinion.intro.en}</p></CardContent></Card>
                <div className="space-y-4">{(isJapanese ? content.opinion.points.ja : content.opinion.points.en).map((point, i) => (
                  <Card key={i}><CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><span className="text-primary font-mono">{String(i + 1).padStart(2, '0')}</span>{point.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{point.content}</p>
                  </CardContent></Card>
                ))}</div>
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
              
              {/* Comparison Table */}
              <Card className="mb-6"><CardHeader><CardTitle className="text-lg">{isJapanese ? content.dataAppendix.tables.comparison.title.ja : content.dataAppendix.tables.comparison.title.en}</CardTitle></CardHeader>
                <CardContent><div className="overflow-x-auto"><table className="w-full text-sm">
                  <thead><tr className="border-b"><th className="text-left p-2 font-medium">{isJapanese ? "項目" : "Feature"}</th><th className="text-left p-2 font-medium">{isJapanese ? "タイ（EEC）" : "Thailand (EEC)"}</th><th className="text-left p-2 font-medium">{isJapanese ? "ベトナム" : "Vietnam"}</th></tr></thead>
                  <tbody>{content.dataAppendix.tables.comparison.data.map((row, i) => (<tr key={i} className="border-b last:border-0"><td className="p-2 font-medium">{row.feature}</td><td className="p-2 text-muted-foreground">{row.thailand}</td><td className="p-2 text-muted-foreground">{row.vietnam}</td></tr>))}</tbody>
                </table></div></CardContent>
              </Card>

              {/* Japanese Movements */}
              <Card><CardHeader><CardTitle className="text-lg">{isJapanese ? content.dataAppendix.tables.japaneseMovements.title.ja : content.dataAppendix.tables.japaneseMovements.title.en}</CardTitle></CardHeader>
                <CardContent><div className="overflow-x-auto"><table className="w-full text-sm">
                  <thead><tr className="border-b"><th className="text-left p-2 font-medium">{isJapanese ? "企業" : "Company"}</th><th className="text-left p-2 font-medium">{isJapanese ? "戦略的動向" : "Strategic Action"}</th><th className="text-left p-2 font-medium">{isJapanese ? "テーマ" : "Theme"}</th></tr></thead>
                  <tbody>{content.dataAppendix.tables.japaneseMovements.data.map((row, i) => (<tr key={i} className="border-b last:border-0"><td className="p-2 font-medium">{row.company}</td><td className="p-2 text-muted-foreground">{row.action}</td><td className="p-2"><Badge variant="outline" className="text-xs">{row.theme}</Badge></td></tr>))}</tbody>
                </table></div></CardContent>
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

export default ChemicalIndustry;
