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
  Heart,
  Zap,
  BookOpen,
  Lock,
  Lightbulb,
  Eye,
  ChevronRight,
  Crown,
  Database,
  Home,
  Apple,
  Cpu,
  GraduationCap,
  Users
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const WellnessHealthcareReport = () => {
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
        'wellness-healthcare',
        isJapanese ? 'タイ・ウェルネス＆ヘルスケア産業レポート' : 'Thailand Wellness & Healthcare Industry Report',
        'healthcare',
        lang
      );
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(
        'wellness-healthcare',
        isJapanese ? 'タイ・ウェルネス＆ヘルスケア産業レポート' : 'Thailand Wellness & Healthcare Industry Report',
        'healthcare',
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

  // Table of Contents - matching EV report structure
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
      en: "Thailand's Wellness & Healthcare Industry: A Strategic Blueprint for Japanese Enterprise",
      ja: "タイ・ウェルネス＆ヘルスケア産業：日本企業のための戦略的青写真"
    },
    subheadline: {
      en: "The \"Mirror Image Opportunity\" — Japan's aging solutions meet Thailand's accelerating demographic transition",
      ja: "「ミラーイメージ機会」—日本の高齢化ソリューションがタイの加速する人口動態転換と出会う"
    },
    category: {
      en: "Healthcare / Wellness",
      ja: "ヘルスケア / ウェルネス"
    },
    lastUpdated: "2026-02-08",

    // ── Section 1: Executive Summary ──
    executiveSummary: {
      en: [
        "Thailand's wellness economy reached USD 40.5 billion in 2023 (~8% of GDP), driven by domestic NCD burden (74% of deaths) and a robust medical tourism sector. (Doc: Executive Strategic Assessment)",
        "The country is transitioning from \"Aged Society\" to \"Super-Aged Society\" by the early 2030s—far faster than Japan did, while still in the middle-income bracket. This velocity creates acute demand for professionalized elderly care. (Doc: 1.1 The Velocity of Aging)",
        "Five strategic pillars present entry opportunities for Japanese firms: (1) Kaigo & Senior Living, (2) Wellness Real Estate, (3) Functional/Future Food, (4) Medical Devices & Smart Electronics, (5) Education & Human Capital. (Doc: Sections 2-6)",
        "BOI incentives offer 8–13 years of CIT exemptions for high-tech medical manufacturing, functional foods, and smart electronics—targeting \"New S-Curve\" industries. (Doc: 4.1, 5.1)",
        "Thailand serves as a \"Third Country\" platform—a neutral, stable base for penetrating the broader CLMV and ASEAN markets via medical tourism and regulatory harmonization (AMDD). (Doc: Section 7)"
      ],
      ja: [
        "タイのウェルネス経済は2023年に405億ドル（GDP比約8%）に達し、国内のNCD負担（死因の74%）と堅調な医療ツーリズム部門が牽引している。（Doc: エグゼクティブ戦略評価）",
        "同国は「高齢社会」から2030年代前半までに「超高齢社会」へ移行中—日本よりはるかに速く、しかも中所得国の段階で。この速度がプロフェッショナルな高齢者ケアへの切迫した需要を生む。（Doc: 1.1 高齢化の速度）",
        "日本企業に5つの戦略的柱が参入機会を提供：(1) 介護・シニアリビング、(2) ウェルネス不動産、(3) 機能性食品・フューチャーフード、(4) 医療機器・スマートエレクトロニクス、(5) 教育・人材開発。（Doc: セクション2-6）",
        "BOI優遇措置はハイテク医療製造、機能性食品、スマートエレクトロニクスに8-13年のCIT免除を提供—「新Sカーブ」産業を対象。（Doc: 4.1, 5.1）",
        "タイは「第三国」プラットフォームとして機能—医療ツーリズムと規制調和（AMDD）を通じ、より広いCLMV・ASEAN市場を攻略するための安定した中立的な拠点。（Doc: セクション7）"
      ]
    },

    // ── Section 2: Facts — Market Structure ──
    marketStructure: {
      title: { en: "Market Structure", ja: "市場構造" },
      segments: {
        en: [
          { name: "Elderly Care (Kaigo)", share: "~15%", growth: "+12% YoY (est.)", players: "Sompo Care, Riei/Saha Group, local operators" },
          { name: "Wellness Real Estate", share: "~20%", growth: "+19% YoY", players: "Hankyu Hanshin/Sena, Panasonic/Sena, Mitsui Fudosan/Ananda" },
          { name: "Functional/Future Food", share: "~25%", growth: "+8% CAGR", players: "Ajinomoto, local FMCG, BOI-backed startups" },
          { name: "Medical Devices & Electronics", share: "~30%", growth: "+6.5% CAGR", players: "Terumo, Nipro, Olympus, Chinese entrants" },
          { name: "Education & Human Capital", share: "~10%", growth: "+15% YoY (est.)", players: "TPA (Thailand-Japan), Kaigo schools, EdTech" }
        ],
        ja: [
          { name: "高齢者ケア（介護）", share: "~15%", growth: "+12% YoY（推定）", players: "SOMPOケア、リエイ/サハグループ、現地事業者" },
          { name: "ウェルネス不動産", share: "~20%", growth: "+19% YoY", players: "阪急阪神/セナ、パナソニック/セナ、三井不動産/アナンダ" },
          { name: "機能性食品・フューチャーフード", share: "~25%", growth: "+8% CAGR", players: "味の素、現地FMCG、BOI支援スタートアップ" },
          { name: "医療機器・エレクトロニクス", share: "~30%", growth: "+6.5% CAGR", players: "テルモ、ニプロ、オリンパス、中国系参入者" },
          { name: "教育・人材開発", share: "~10%", growth: "+15% YoY（推定）", players: "TPA（泰日工業大学）、介護学校、EdTech" }
        ]
      }
    },

    // ── Section 3: Facts — Key Players ──
    keyPlayers: {
      title: { en: "Key Players & Strategic JVs", ja: "主要プレイヤーと戦略的JV" },
      data: {
        en: [
          { segment: "Kaigo / Senior Living", examples: "Sompo Care, Riei × Saha Group, Jin Wellbeing County", status: "Market entry / scaling" },
          { segment: "Wellness Real Estate JVs", examples: "Hankyu Hanshin × Sena, Panasonic × Sena, Mitsui × Ananda, Nomura × Origin, Tokyo Tatemono × SC Asset", status: "Active development" },
          { segment: "Functional Food", examples: "Ajinomoto (aminoVITAL, AminoNite), local FOSHU-equivalent players", status: "Pivoting to wellness" },
          { segment: "Medical Devices", examples: "Terumo, Nipro, Paramount Bed, Matsunaga (assistive devices)", status: "Supply chain diversification" },
          { segment: "Thai Healthcare Conglomerates", examples: "BDMS, Bumrungrad, Thonburi Group", status: "Premium positioning" }
        ],
        ja: [
          { segment: "介護・シニアリビング", examples: "SOMPOケア、リエイ×サハグループ、ジン・ウェルビーイング・カウンティ", status: "市場参入・拡大中" },
          { segment: "ウェルネス不動産JV", examples: "阪急阪神×セナ、パナソニック×セナ、三井不動産×アナンダ、野村不動産×オリジン、東京建物×SCアセット", status: "開発進行中" },
          { segment: "機能性食品", examples: "味の素（aminoVITAL、AminoNite）、現地FOSHU相当企業", status: "ウェルネスへの転換" },
          { segment: "医療機器", examples: "テルモ、ニプロ、パラマウントベッド、松永（福祉用具）", status: "サプライチェーン多角化" },
          { segment: "タイ医療コングロマリット", examples: "BDMS、バムルンラード、トンブリグループ", status: "プレミアムポジショニング" }
        ]
      }
    },

    // ── Section 4: Facts — Policy & Regulation ──
    policyInsights: {
      title: { en: "Policy & Regulation", ja: "政策・規制" },
      items: {
        en: [
          { policy: "BOI \"New S-Curve\" Incentives", content: "8-year CIT exemption for functional food manufacturing; 10-13 years for medical devices (Class 4) and smart electronics (Group A1/A2). Thailand explicitly targets Japanese wellness technology as part of its industrial upgrade roadmap.", citation: "Doc: 4.1 BOI incentives (Ref 26, 30)" },
          { policy: "ASEAN Medical Device Directive (AMDD)", content: "Thai FDA registration serves as a regulatory dossier for fast-tracking approvals in Vietnam, Indonesia, and Malaysia—transforming Thailand into a one-stop regulatory gateway for ASEAN.", citation: "Doc: 5.2 CLMV Gateway (Ref 34)" },
          { policy: "EEC Special Zone for Healthcare", content: "Additional land rental reductions and 90-day skilled worker visas. EEC infrastructure (high-speed rail, deep-sea ports) accelerates deployment to CLMV markets.", citation: "Doc: 5.2, EEC Office (Ref 36)" },
          { policy: "FOSHU → Thai FDA Pathway", content: "Japan's FOSHU clinical validation data can expedite Thai FDA health-claim approvals, giving Japanese functional food firms a regulatory fast-track that competitors lack.", citation: "Doc: 4.1 (Ref 26)" },
          { policy: "SSW Visa Program (Specified Skilled Worker)", content: "Japan's SSW visa actively recruits Thai nationals for nursing care. This creates a circular talent pipeline: train in Thailand → deploy to Japan → return as \"Super-Caregivers\" to manage Thai operations.", citation: "Doc: 2.2 Cross-Border Labor (Ref 13, 14)" }
        ],
        ja: [
          { policy: "BOI「新Sカーブ」優遇措置", content: "機能性食品製造に8年間のCIT免除；医療機器（クラス4）とスマートエレクトロニクス（グループA1/A2）に10-13年。タイは産業高度化ロードマップの一環として日本のウェルネス技術を明示的に対象としている。", citation: "Doc: 4.1 BOI優遇（参照26, 30）" },
          { policy: "ASEAN医療機器指令（AMDD）", content: "タイFDA登録はベトナム、インドネシア、マレーシアでの迅速承認のための規制ドシエとして機能—タイをASEANのワンストップ規制ゲートウェイに変える。", citation: "Doc: 5.2 CLMVゲートウェイ（参照34）" },
          { policy: "EECヘルスケア特区", content: "追加の土地賃借料減額と熟練労働者向け90日ビザ。EECインフラ（高速鉄道、深海港）がCLMV市場への展開を加速。", citation: "Doc: 5.2, EEC事務局（参照36）" },
          { policy: "FOSHU→タイFDA経路", content: "日本のFOSHU臨床検証データがタイFDAの健康表示承認を迅速化でき、日本の機能性食品企業に競合他社にはない規制上のファストトラックを提供。", citation: "Doc: 4.1（参照26）" },
          { policy: "特定技能（SSW）ビザプログラム", content: "日本のSSWビザはタイ国民を介護人材として積極採用。これが循環型人材パイプラインを創出：タイで訓練→日本で就労→「スーパー介護士」としてタイに帰国し現地事業を管理。", citation: "Doc: 2.2 越境労働（参照13, 14）" }
        ]
      }
    },

    // ── Section 5: Facts — Opportunities ──
    opportunities: {
      en: [
        "\"Missing Middle\" senior care: Affordable, high-quality facilities for Thailand's upper-middle-class retirees—a massive gap between ultra-luxury and informal care (Doc: 2.1)",
        "Wellness real estate premium: Thai consumers pay premium for \"medically engineered\" living with PM2.5 filtration, IoT wellness monitoring, validated by R&D (Doc: 3.1-3.2)",
        "Functional food (FOSHU advantage): Japan's clinical validation data fast-tracks Thai FDA approvals; Ajinomoto's aminoVITAL/AminoNite model is replicable (Doc: 4.2)",
        "Medical device CLMV gateway: AMDD harmonization means Thai registration unlocks Vietnam, Indonesia, Malaysia markets simultaneously (Doc: 5.2)",
        "Circular caregiver talent pipeline: SSW visa creates train → deploy → return cycle that is a sustainable, hard-to-replicate competitive moat (Doc: 2.2)"
      ],
      ja: [
        "「ミッシングミドル」シニアケア：タイの中上流層退職者向けの手頃で高品質な施設—超高級と非公式ケアの間の巨大なギャップ（Doc: 2.1）",
        "ウェルネス不動産プレミアム：タイ消費者はPM2.5フィルトレーション、IoTウェルネス監視、R&D検証済みの「医学的に設計された」住空間にプレミアムを支払う（Doc: 3.1-3.2）",
        "機能性食品（FOSHU優位性）：日本の臨床検証データがタイFDA承認を迅速化；味の素のaminoVITAL/AminoNiteモデルは他社にも再現可能（Doc: 4.2）",
        "医療機器CLMVゲートウェイ：AMDD調和によりタイ登録がベトナム、インドネシア、マレーシア市場を同時に開放（Doc: 5.2）",
        "循環型介護人材パイプライン：SSWビザが訓練→派遣→帰国サイクルを創出、持続可能で模倣困難な競争上の堀（Doc: 2.2）"
      ]
    },

    // ── Section 6: Facts — Risks ──
    risks: {
      en: [
        "Regulatory bottleneck: Thai FDA health-claim approval processes remain slow; functional food companies may face 12-18 month delays (Doc: 4.1, Need verification on exact timeline)",
        "\"Getting old before getting rich\": Thailand's middle-income status limits the addressable market for premium Japanese care services—pricing calibration is critical (Doc: 1.1)",
        "Chinese medical device competition: Lower-cost Chinese consumables are eroding market share; Japanese firms must defend the \"Japan Brand\" premium in high-reliability segments (Doc: 5.2, Ref 38)",
        "Labor shortage symmetry: Both Japan and Thailand face caregiver shortages, creating competition for the same SSW talent pool (Doc: 2.2)",
        "JV governance risk: Deep reliance on local partners (land, distribution) means Japanese firms must negotiate clear IP and operational control frameworks (Doc: 2.3, 3.1)"
      ],
      ja: [
        "規制ボトルネック：タイFDAの健康表示承認プロセスは依然として遅く、機能性食品企業は12-18ヶ月の遅延に直面する可能性（Doc: 4.1、正確なタイムラインは要検証）",
        "「豊かになる前に老いる」：タイの中所得国としての地位がプレミアム日本型ケアサービスのアドレサブル市場を制限—価格設定の調整が不可欠（Doc: 1.1）",
        "中国医療機器との競合：低価格中国製消耗品がシェアを浸食；日本企業は高信頼性セグメントで「ジャパンブランド」プレミアムを守る必要（Doc: 5.2、参照38）",
        "労働力不足の対称性：日本とタイの双方が介護人材不足に直面し、同じSSW人材プールをめぐる競争が発生（Doc: 2.2）",
        "JVガバナンスリスク：現地パートナー（土地、流通）への深い依存は、IPとオペレーション管理の明確なフレームワーク交渉を必要とする（Doc: 2.3, 3.1）"
      ]
    },

    // ── Section 7: Opinion & Implication ──
    opinion: {
      title: { en: "WaLens Analysis: Structural Interpretation", ja: "WaLensの分析：構造的解釈" },
      intro: {
        en: "The following represents WaLens' independent analysis based on the facts presented above. These are interpretive observations, not objective data points.",
        ja: "以下は上記のファクトに基づくWaLensの独自分析です。これらは解釈的な見解であり、客観的なデータポイントではありません。"
      },
      points: {
        en: [
          {
            title: "The \"Mirror Image\" Is Real—But the Reflection Is Distorted",
            content: "Thailand's demographic trajectory genuinely mirrors Japan's, but the economic context is fundamentally different. Japan became aged after becoming wealthy; Thailand is aging while still middle-income. This means Japanese solutions cannot be transplanted at Japanese price points. The winning formula is Japanese methodology at Thai affordability—what we term the \"Zen Model\" approach. Companies that insist on premium-only positioning will find the addressable market far smaller than the demographic data suggests. (Doc: Executive Strategic Assessment, 1.1)"
          },
          {
            title: "The Kaigo Talent Pipeline Is Japan's Deepest Moat",
            content: "The circular SSW visa talent model (train → deploy → return) is the single most defensible competitive advantage available to Japanese operators. Chinese competitors can match on price and scale, but they cannot replicate Japan's 30-year institutional knowledge in standardized elderly care. The caregiver who has worked 3-5 years in a Japanese facility returns to Thailand not just with skills, but with cultural alignment that no training manual can reproduce. Companies should view training center investment as strategic infrastructure, not a cost center. (Doc: 2.2)"
          },
          {
            title: "Wellness Real Estate Has Peaked in Concept but Not in Execution",
            content: "The JV model between Japanese developers and Thai land partners is proven and scalable. However, WaLens observes that most projects remain concentrated in Bangkok's luxury segment. The Panasonic-Sena \"Zen Model\"—which uses empirical R&D to validate health claims—represents the next evolution. Projects that can scientifically prove health outcomes (better sleep, lower stress) will command sustainable premiums. Those selling \"wellness\" as marketing rather than measurable outcomes will face commoditization. (Doc: 3.1-3.2)"
          },
          {
            title: "The CLMV Gateway Value Is Under-Appreciated",
            content: "Most Japanese executives evaluate Thailand as a standalone market. This undervalues Thailand's true strategic worth. The AMDD regulatory harmonization means a single Thai FDA registration effectively opens doors to 4+ ASEAN markets. Combined with Thailand's logistics infrastructure and medical tourism reputation, a Thailand base is not a market entry—it is a regional platform. Companies not incorporating this \"multiplier effect\" into their ROI calculations are systematically undervaluing the opportunity. (Doc: 5.2, Section 7)"
          }
        ],
        ja: [
          {
            title: "「ミラーイメージ」は現実—だが反射像は歪んでいる",
            content: "タイの人口動態軌道は確かに日本を映し出しているが、経済的文脈は根本的に異なる。日本は裕福になってから高齢化した。タイは中所得のまま高齢化している。これは日本のソリューションを日本の価格帯でそのまま移植できないことを意味する。勝利の方程式は「日本の方法論をタイの手頃さで」—我々が「禅モデル」アプローチと呼ぶものだ。プレミアム専用ポジショニングに固執する企業は、人口動態データが示唆するよりもはるかに小さなアドレサブル市場に直面するだろう。（Doc: エグゼクティブ戦略評価, 1.1）"
          },
          {
            title: "介護人材パイプラインは日本の最も深い堀",
            content: "循環型SSWビザ人材モデル（訓練→派遣→帰国）は、日本のオペレーターが利用できる最も防衛可能な競争優位性である。中国の競合他社は価格と規模でマッチできるが、標準化された高齢者ケアにおける日本の30年の制度的知識を複製することはできない。日本の施設で3-5年働いた介護士は、スキルだけでなく、いかなるトレーニングマニュアルでも再現できない文化的整合性を持ってタイに帰国する。企業はトレーニングセンターへの投資をコストセンターではなく戦略的インフラとして捉えるべきだ。（Doc: 2.2）"
          },
          {
            title: "ウェルネス不動産はコンセプトでは成熟したが実行では未完成",
            content: "日系デベロッパーとタイの地主パートナー間のJVモデルは実証済みでスケーラブルである。しかしWaLensは、大半のプロジェクトがバンコクのラグジュアリーセグメントに集中していることを観察している。パナソニック-セナの「禅モデル」—実証的R&Dを用いて健康効果を検証する—が次の進化を示している。健康アウトカム（睡眠改善、ストレス軽減）を科学的に証明できるプロジェクトは持続可能なプレミアムを獲得する。「ウェルネス」を測定可能な成果ではなくマーケティングとして売るプロジェクトはコモディティ化に直面する。（Doc: 3.1-3.2）"
          },
          {
            title: "CLMVゲートウェイとしての価値は過小評価されている",
            content: "ほとんどの日本企業経営者はタイを単独市場として評価している。これはタイの真の戦略的価値を過小評価している。AMDD規制調和により、単一のタイFDA登録が実質的に4つ以上のASEAN市場への扉を開く。タイの物流インフラと医療ツーリズムの評判を組み合わせると、タイ拠点は市場参入ではなく地域プラットフォームである。この「乗数効果」をROI計算に組み込んでいない企業は、機会を体系的に過小評価している。（Doc: 5.2, セクション7）"
          }
        ]
      }
    },

    // ── Section 8: Recommendation ──
    recommendation: {
      title: { en: "Strategic Recommendation for Japanese Executives", ja: "日本企業経営者への戦略的提言" },
      intro: {
        en: "Based on WaLens' analysis, the following strategic perspective is offered—not as an operational checklist, but as a framework for executive decision-making.",
        ja: "WaLensの分析に基づき、以下の戦略的視点を提供する—オペレーショナルなチェックリストとしてではなく、経営判断のためのフレームワークとして。"
      },
      content: {
        en: `The core strategic question is not "should we enter Thailand's wellness market" but rather "what role should Thailand play in our broader Asia healthcare strategy."

1. Enter as a Solution Provider, Not a Vendor: Whether selling condos, catheters, or care services, the value proposition must be "Quality of Life" and "Total Cost of Ownership," not price. Thai consumers will pay for Japanese quality—but only when it is adapted to local conditions (heat, humidity, lifestyle). The Panasonic-Sena "Zen Model" proves that R&D-validated adaptation commands sustainable premiums. (Doc: Section 8, Recommendation 1 & 3)

2. Invest in the Human Capital Pipeline First: The shortage of skilled caregivers is the single biggest operational risk. Controlling the training pipeline—through Kaigo schools, SSW visa partnerships, and university JVs—is the ultimate hedge. This is not a cost center; it is strategic infrastructure that creates a self-reinforcing talent cycle competitors cannot easily replicate. (Doc: Section 8, Recommendation 4; Section 2.2)

3. Leverage BOI A1/A2 Incentives for Medical Manufacturing: The 8-13 year tax holidays for high-tech medical devices and smart electronics are substantial. Companies should combine these with EEC special zone benefits. Thailand's existing precision manufacturing base (legacy of automotive) provides ready supply chains for medical device production. (Doc: Section 8, Recommendation 2; Section 5.1)

4. Look Beyond Bangkok: Second-tier cities (Chiang Mai, Khon Kaen) offer lower land costs and environments more conducive to senior living and wellness. The EEC corridor is optimal for manufacturing, but wellness services should explore provincial markets where competition is minimal and government support is growing. (Doc: Section 8, Recommendation 5)

5. Calculate ROI with the CLMV Multiplier: Every Thai market entry should be evaluated not in isolation, but as a platform for regional expansion. A medical device registered with Thai FDA via AMDD can access Vietnam, Indonesia, and Malaysia markets. A care training center in Bangkok produces caregivers for both Thai and Japanese markets. This "multiplier effect" fundamentally changes the investment calculus. (Doc: Section 7)

The window for establishing market leadership is open but closing. As Thailand accelerates toward "Super-Aged" status, competitors from China and local conglomerates are scaling. The data indicates 2026 is a pivotal year. Waiting for clarity is itself a strategic choice—one that increasingly favors first movers.`,
        ja: `核心的な戦略的問いは「タイのウェルネス市場に参入すべきか」ではなく、「より広いアジア・ヘルスケア戦略において、タイはどのような役割を果たすべきか」である。

1. ベンダーではなくソリューション・プロバイダーとして参入せよ：コンドミニアム、カテーテル、ケアサービスのいずれを販売する場合も、バリュープロポジションは「生活の質」と「トータルコスト・オブ・オーナーシップ」であり、価格ではない。タイの消費者は日本品質に対価を払う—ただし現地条件（暑さ、湿度、ライフスタイル）に適応されている場合に限る。パナソニック-セナの「禅モデル」は、R&D検証済みの適応が持続可能なプレミアムを獲得することを証明している。（Doc: セクション8、提言1&3）

2. まず人材パイプラインに投資せよ：熟練介護士の不足は最大のオペレーショナルリスクである。トレーニングパイプラインの制御—介護学校、SSWビザパートナーシップ、大学JVを通じて—が究極のヘッジである。これはコストセンターではなく、競合他社が容易に複製できない自己強化型人材サイクルを生む戦略的インフラである。（Doc: セクション8、提言4；セクション2.2）

3. 医療製造でBOI A1/A2優遇を活用せよ：ハイテク医療機器とスマートエレクトロニクスへの8-13年の税制優遇は大きい。企業はこれをEEC特区の恩典と組み合わせるべきだ。タイの既存の精密製造基盤（自動車産業のレガシー）が医療機器生産のための既製サプライチェーンを提供する。（Doc: セクション8、提言2；セクション5.1）

4. バンコクを超えて目を向けよ：地方都市（チェンマイ、コンケン）はより低い地価とシニアリビング・ウェルネスに適した環境を提供する。EEC回廊は製造に最適だが、ウェルネスサービスは競争が少なく政府支援が拡大している地方市場を探索すべきだ。（Doc: セクション8、提言5）

5. CLMVマルチプライヤーを含めてROIを算出せよ：すべてのタイ市場参入は単独ではなく、地域拡大のプラットフォームとして評価されるべきだ。AMDDを通じてタイFDAに登録された医療機器はベトナム、インドネシア、マレーシア市場にアクセスできる。バンコクのケアトレーニングセンターはタイ市場と日本市場の両方に介護士を輩出する。この「乗数効果」が投資の計算を根本的に変える。（Doc: セクション7）

市場リーダーシップを確立するための窓は開いているが閉じつつある。タイが「超高齢」ステータスに向けて加速するにつれ、中国や現地コングロマリットの競合がスケールアップしている。データは2026年が転換点であることを示している。明確さを待つこと自体が戦略的選択であり—ますます先行者を有利にする選択である。`
      }
    },

    // ── Section 9: Data Appendix ──
    dataAppendix: {
      title: { en: "Data Appendix", ja: "データ付録" },
      tables: {
        macroIndicators: {
          title: { en: "Thailand Wellness Macro Indicators", ja: "タイ・ウェルネス主要マクロ指標" },
          data: [
            { metric: isJapanese ? "ウェルネス経済規模" : "Wellness Economy Size", current: "USD 40.5B (2023)", projection: "USD 110.1B (2034, medical tourism)", source: "Doc: 1.2 (Ref 1, 2)" },
            { metric: isJapanese ? "高齢化ステータス" : "Aging Status", current: isJapanese ? "高齢社会（60歳以上14%超）" : "Aged Society (>14% elderly)", projection: isJapanese ? "超高齢社会（65歳以上20-28%、2030年代前半）" : "Super-Aged Society (>20-28%, early 2030s)", source: "Doc: 1.1 (Ref 3, 4)" },
            { metric: isJapanese ? "医療費" : "Healthcare Spending", current: isJapanese ? "GDP比~4.6%" : "~4.6% of GDP", projection: isJapanese ? "民間支出+6.5% CAGR" : "Private +6.5% CAGR", source: "Doc: Table 1 (Ref 5)" },
            { metric: isJapanese ? "NCD死亡率" : "NCD Mortality", current: isJapanese ? "全死因の74%" : "74% of all deaths", projection: isJapanese ? "都市化・食生活により上昇" : "Rising due to urbanization/diet", source: "Doc: 1.2 (Ref 5)" },
            { metric: isJapanese ? "ウェルネス不動産成長" : "Wellness Real Estate Growth", current: "+19% (2022-2023)", projection: isJapanese ? "継続的拡大" : "Continued expansion", source: "Doc: 3.1 (Ref 1)" }
          ]
        },
        jvDirectory: {
          title: { en: "Japanese-Thai Wellness JV Directory", ja: "日系・タイ系ウェルネスJV一覧" },
          data: [
            { japanese: isJapanese ? "阪急阪神不動産" : "Hankyu Hanshin Properties", thai: isJapanese ? "セナ・デベロップメント" : "Sena Development", focus: isJapanese ? "Geo-Fit+統合、ゼロカーボン、PM2.5フィルトレーション" : "Geo-Fit+ Integration, Zero Carbon, PM2.5 Filtration", ref: "Doc: Table 2 (Ref 18)" },
            { japanese: isJapanese ? "パナソニック" : "Panasonic", thai: isJapanese ? "セナ・デベロップメント" : "Sena Development", focus: isJapanese ? "「禅モデル」：チュラロンコン大学でのIoT研究、室内快適環境" : "\"Zen Model\": IoT research at Chulalongkorn, Indoor Comfort", ref: "Doc: 3.2 (Ref 20, 21)" },
            { japanese: isJapanese ? "三井不動産" : "Mitsui Fudosan", thai: isJapanese ? "アナンダ・デベロップメント" : "Ananda Development", focus: isJapanese ? "都市ウェルネス：ハイドロセラピー、カーボンフィルター空調" : "Urban Wellness: hydrotherapy, carbon-filtered air", ref: "Doc: Table 2 (Ref 22)" },
            { japanese: isJapanese ? "野村不動産" : "Nomura Real Estate", thai: isJapanese ? "オリジン・プロパティ" : "Origin Property", focus: isJapanese ? "ウェルネスホテル、長期滞在メディカルツーリスト向け" : "Wellness hotels, long-stay medical tourists", ref: "Doc: Table 2 (Ref 22)" },
            { japanese: isJapanese ? "東京建物" : "Tokyo Tatemono", thai: "SC Asset", focus: isJapanese ? "コールドチェーン物流、高級住宅" : "Cold chain logistics, high-end residential", ref: "Doc: Table 2 (Ref 23)" },
            { japanese: isJapanese ? "リエイ" : "Riei Co., Ltd.", thai: isJapanese ? "サハ・グループ" : "Saha Group", focus: isJapanese ? "介護施設：日本式プロトコル、ローカルJVモデル" : "Kaigo facilities: Japanese protocols, local JV model", ref: "Doc: 2.1 (Ref 16)" }
          ]
        }
      }
    },

    // ── Section 10: Sources ──
    sources: {
      title: { en: "Sources & Methodology", ja: "出典・方法論" },
      list: {
        en: [
          "Global Wellness Institute — The Global Wellness Economy: Thailand (2025)",
          "IMARC Group — Thailand Health and Wellness Market Size and Trends, 2034",
          "World Health Organization (WHO) — Thailand's Leadership and Innovation Towards Healthy Ageing",
          "KPMG — Thailand's Ageing Society: Opportunities for Businesses (2024)",
          "Bangkok Bank — From Health Crisis to Growth Engine: Thailand's Wellness Economy",
          "Japan Valuers — Thailand's Healthcare & Wellness Industry Outlook",
          "Thailand Board of Investment (BOI) — Future Foods & Smart Electronics Investment Promotion",
          "Sompo Holdings — Nursing Care Business Overview",
          "ASEAN-Japan Centre — Healthcare Business Mission to Thailand (Ref 17)",
          "Panasonic × Chulalongkorn University — Indoor Comfortable Living Conditions Research (Ref 20)",
          "Ajinomoto (Thailand) — 2025 Business Plan: AminoScience Strategy (Ref 27, 28)",
          "Krungsri Research — Industry Outlook 2025-2027: Medical Devices (Ref 38)",
          "WaLens Field Research — Executive Interviews & Industry Analysis (Q1 2026)"
        ],
        ja: [
          "グローバル・ウェルネス・インスティテュート — グローバルウェルネス経済：タイ（2025年）",
          "IMARCグループ — タイの健康・ウェルネス市場規模とトレンド、2034年",
          "世界保健機関（WHO） — タイの健康的高齢化に向けたリーダーシップとイノベーション",
          "KPMG — タイの高齢化社会：企業のための機会（2024年）",
          "バンコク銀行 — 健康危機から成長エンジンへ：タイのウェルネス経済",
          "ジャパンバリュアーズ — タイのヘルスケア＆ウェルネス産業アウトルック",
          "タイ投資委員会（BOI） — フューチャーフード＆スマートエレクトロニクス投資促進",
          "SOMPOホールディングス — 介護事業概要",
          "ASEAN-Japan Centre — タイへのヘルスケアビジネスミッション（参照17）",
          "パナソニック×チュラロンコン大学 — 室内快適生活環境研究（参照20）",
          "味の素（タイランド）— 2025年事業計画：アミノサイエンス戦略（参照27, 28）",
          "クルンシィリサーチ — 産業アウトルック2025-2027：医療機器（参照38）",
          "WaLensフィールドリサーチ — 経営幹部インタビュー＆産業分析（2026年Q1）"
        ]
      }
    },

    // ── Section 11: Disclaimer ──
    disclaimer: {
      en: "This report is prepared by WaLens for informational purposes only. The analysis and opinions expressed are those of WaLens and do not constitute investment advice, legal advice, or recommendation to take any specific action. All data from third-party sources is attributed and should be verified independently. \"Need verification\" tags indicate data points requiring additional confirmation. © 2026 WaLens. All rights reserved. This report is for the exclusive use of the subscriber and may not be redistributed without permission.",
      ja: "本レポートはWaLensが情報提供のみを目的として作成したものです。表明された分析および意見はWaLensのものであり、投資アドバイス、法的アドバイス、または特定の行動を取ることの推奨を構成するものではありません。第三者ソースからのすべてのデータは帰属表示され、独立して検証されるべきです。「要検証」タグは追加確認が必要なデータポイントを示します。© 2026 WaLens. 無断転載禁止。本レポートは購読者専用であり、許可なく再配布することはできません。"
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
        title={isJapanese ? "タイ・ウェルネス＆ヘルスケア産業レポート | WaLens" : "Thailand Wellness & Healthcare Industry Report | WaLens"}
        description={isJapanese 
          ? "タイのウェルネス・ヘルスケア産業に関する詳細な分析レポート。介護、ウェルネス不動産、機能性食品、医療機器、教育の5分野を日本企業幹部向けに解説。"
          : "Comprehensive analysis of Thailand's wellness & healthcare industry. Covers elderly care, wellness real estate, functional food, medical devices, and education for Japanese executives."
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
                { label: isJapanese ? "ヘルスケア" : "Healthcare", href: "/insights/wellness-healthcare" },
                { label: isJapanese ? "ウェルネス＆ヘルスケア" : "Wellness & Healthcare" }
              ]}
            />
          </div>

          {/* Hero Section */}
          <section className="mb-8 md:mb-12">
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img 
                src={heroImage} 
                alt={isJapanese ? "タイ・ウェルネス＆ヘルスケア" : "Thailand Wellness & Healthcare"}
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
                      <Heart className="h-5 w-5" />
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
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
              <Database className="h-6 w-6" />
              {isJapanese ? content.dataAppendix.title.ja : content.dataAppendix.title.en}
            </h2>

            {hasFullAccess ? (
              <div className="space-y-6" onClick={handleDataAppendixAccess}>
                {/* Macro Indicators Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isJapanese ? content.dataAppendix.tables.macroIndicators.title.ja : content.dataAppendix.tables.macroIndicators.title.en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2 font-semibold">{isJapanese ? "指標" : "Metric"}</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "現状" : "Current"}</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "予測" : "Projection"}</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "出典" : "Source"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.dataAppendix.tables.macroIndicators.data.map((row, i) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="p-2 font-medium">{row.metric}</td>
                              <td className="p-2 text-muted-foreground">{row.current}</td>
                              <td className="p-2 text-muted-foreground">{row.projection}</td>
                              <td className="p-2 text-xs text-muted-foreground italic">{row.source}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* JV Directory Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isJapanese ? content.dataAppendix.tables.jvDirectory.title.ja : content.dataAppendix.tables.jvDirectory.title.en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2 font-semibold">{isJapanese ? "日本企業" : "Japanese Partner"}</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "タイ企業" : "Thai Partner"}</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "フォーカス" : "Focus"}</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "出典" : "Ref"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.dataAppendix.tables.jvDirectory.data.map((row, i) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="p-2 font-medium">{row.japanese}</td>
                              <td className="p-2">{row.thai}</td>
                              <td className="p-2 text-muted-foreground">{row.focus}</td>
                              <td className="p-2 text-xs text-muted-foreground italic">{row.ref}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <BlurredContent>
                <div className="space-y-6">
                  <Card className="h-48" />
                  <Card className="h-48" />
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

export default WellnessHealthcareReport;
