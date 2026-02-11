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
  Brain,
  Globe,
  Server
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const BigDataAI = () => {
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
        'big-data-ai',
        isJapanese ? 'タイのビッグデータ＆AI動向 2026' : 'Big Data & AI Trends in Thailand 2026',
        'services',
        lang
      );
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker('big-data-ai', 'Big Data & AI Trends in Thailand 2026', 'タイのビッグデータ＆AI動向 2026', 'Technology', hasFullAccess);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(
        'big-data-ai',
        isJapanese ? 'タイのビッグデータ＆AI動向 2026' : 'Big Data & AI Trends in Thailand 2026',
        'services',
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
    { id: 'facts', label: isJapanese ? 'ファクト（インフラ・規制・エコシステム）' : 'Facts (Infrastructure, Regulation & Ecosystem)' },
    { id: 'opinion', label: isJapanese ? 'WaLensの見解と示唆' : 'Opinion & Implication from WaLens' },
    { id: 'recommendation', label: isJapanese ? '日本企業経営者への提言' : 'Recommendation for Japanese Executives' },
    { id: 'data-appendix', label: isJapanese ? 'データ付録' : 'Data Appendix' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: {
      en: "Big Data and AI Trends in Thailand: From Experimentation to National Infrastructure",
      ja: "タイのビッグデータ＆AI動向：「実験」から「国家インフラ」への転換"
    },
    subheadline: {
      en: "Hyperscale cloud regions, risk-tiered AI governance, and an 80,000-person talent gap — what Japanese executives need to know",
      ja: "ハイパースケールクラウドリージョン、リスク階層型AIガバナンス、8万人の人材ギャップ——日本の経営者が知るべきこと"
    },
    category: {
      en: "Services / Big Data & AI",
      ja: "サービス / ビッグデータ＆AI"
    },
    lastUpdated: "2026-02-08",
    executiveSummary: {
      en: [
        "Thailand has moved from 'AI as experimentation' to 'AI as national infrastructure' in 2024–2026, with in-country cloud regions (AWS, Google Cloud, Microsoft), state-led AI governance, and Thai-language AI platforms lowering adoption friction. (Doc: Strategic snapshot)",
        "Multiple hyperscalers are launching or building local cloud regions, and Thailand's BOI has approved multi-billion-dollar data center projects explicitly driven by AI-era compute demand — including ~$2.7B in March 2025 and ~$3.1B in November 2025. (Doc: Infrastructure and investment boom)",
        "AI governance is hardening from soft guidelines to enforceable expectations: ETDA published executive AI governance → GenAI governance → draft AI law principles (consultation opened June 2025), signaling that large organizations must implement documented governance before full legislation. (Doc: Governance and regulation)",
        "PDPA enforcement is now operational reality: 2,672 complaints recorded by January 2026, administrative fines issued across multiple cases, and regulators communicating that 'the era of warnings is over.' (Doc: PDPA enforcement)",
        "The biggest constraint is capability, not enthusiasm: Thailand faces an estimated shortage of ~80,000 AI professionals (UNESCO RAM), with only ~700 AI-specific staff identified in a national workforce scan, and ~800 project managers — a critical leadership bottleneck. (Doc: Adoption breadth/talent gap)"
      ],
      ja: [
        "タイは2024-2026年に「AIは実験」から「AIは国家インフラ」へと転換。国内クラウドリージョン（AWS、Google Cloud、Microsoft）、国主導のAIガバナンス、タイ語AIプラットフォームが導入障壁を引き下げている。(Doc: Strategic snapshot)",
        "複数のハイパースケーラーがタイ国内クラウドリージョンを開設・建設中。BOIはAI時代の計算需要を明示的な動機とするデータセンター案件を大規模に承認——2025年3月に約27億ドル、11月に約31億ドル。(Doc: Infrastructure and investment boom)",
        "AIガバナンスはソフトなガイドラインから執行可能な期待値へと硬化：ETDAは経営者向けAIガバナンス→GenAIガバナンス→AI法原則案（2025年6月パブコメ開始）を段階的に発表。大組織は法制化前にガバナンス文書化を求められるシグナル。(Doc: Governance and regulation)",
        "PDPA執行は「将来のリスク」ではなく「現在の実務」：2026年1月時点で2,672件の苦情を記録、複数の行政罰金案件が発生、規制当局は「警告の時代は終わった」と公言。(Doc: PDPA enforcement)",
        "最大の制約はやる気ではなく能力：タイはAI専門人材約8万人の不足に直面（UNESCO RAM）。全国人材調査でAI専門スタッフは約700人、プロジェクトマネージャーは約800人にとどまり、リーダーシップ層のボトルネックが深刻。(Doc: Adoption breadth/talent gap)"
      ]
    },
    infraData: {
      title: { en: "Cloud & Data Center Infrastructure", ja: "クラウド＆データセンターインフラ" },
      items: {
        en: [
          { name: "AWS Asia Pacific (Thailand)", detail: "Generally available Jan 2025, 3 Availability Zones (ap-southeast-7)", status: "Operational" },
          { name: "Google Cloud Bangkok Region", detail: "Launched Jan 2026; estimated THB 1.4T economic value over 5 years, ~130K jobs/year", status: "Operational" },
          { name: "Microsoft Azure Thailand", detail: "AI-powered growth initiative late 2025; local region for data residency", status: "Building" },
          { name: "BOI Data Center Approvals", detail: "~$2.7B (Mar 2025) + ~$3.1B (Nov 2025); 300MW planned facility", status: "Approved" },
          { name: "TikTok/ByteDance", detail: "~$3.8B data hosting project; reported $8.8B 5-year commitment", status: "Announced" }
        ],
        ja: [
          { name: "AWS Asia Pacific (Thailand)", detail: "2025年1月一般提供開始、3アベイラビリティゾーン（ap-southeast-7）", status: "稼働中" },
          { name: "Google Cloud バンコクリージョン", detail: "2026年1月開設。5年間でTHB 1.4兆の経済効果、年間約13万人の雇用を推計", status: "稼働中" },
          { name: "Microsoft Azure タイ", detail: "2025年後半のAI成長イニシアティブ。データレジデンシー対応の国内リージョン", status: "構築中" },
          { name: "BOIデータセンター承認", detail: "約27億ドル（2025年3月）＋約31億ドル（2025年11月）。300MW施設計画含む", status: "承認済" },
          { name: "TikTok/ByteDance", detail: "約38億ドルのデータホスティングプロジェクト。5年間で88億ドルの投資と報道", status: "発表済" }
        ]
      }
    },
    governanceData: {
      title: { en: "AI Governance & PDPA Enforcement", ja: "AIガバナンス＆PDPA執行" },
      items: {
        en: [
          { policy: "ETDA AI Governance Guideline (Executives)", content: "Published guidance covering AI lifecycle phases — data preparation, model building, deployment, monitoring, retirement — with emphasis on organizational oversight and risk management. (Doc: Thailand is building a layered AI governance stack)", citation: "ETDA, 2024" },
          { policy: "ETDA GenAI Governance Guideline", content: "Enterprise-ready guidance covering GenAI understanding, benefits/limits, risks, implementation approach, and governance considerations. Published October 2024. (Doc: GenAI governance guideline)", citation: "ETDA / Digital Ministry, Oct 2024" },
          { policy: "Draft AI Law Principles", content: "Consultation opened June 2025. Emphasizes high-risk AI, human rights, accountability, regulatory sandboxes. Risk-tiered posture — soft law to hard law depending on context. (Doc: Draft principles for AI law)", citation: "ETDA / Digital Ministry, Jun 2025" },
          { policy: "PDPA Enforcement Reality", content: "2,672 complaints as of Jan 2026. Common themes: lack of lawful basis, non-compliant collection, unauthorized use/disclosure. Administrative fines issued. 'Era of warnings is over.' (Doc: PDPA enforcement)", citation: "PDPC Data Privacy Day 2026" }
        ],
        ja: [
          { policy: "ETDA AIガバナンスガイドライン（経営者向け）", content: "AIライフサイクル全段階——データ準備、モデル構築、デプロイ、モニタリング、廃止——を網羅。組織的監督とリスク管理を重視。(Doc: Thailand is building a layered AI governance stack)", citation: "ETDA、2024年" },
          { policy: "ETDA GenAIガバナンスガイドライン", content: "GenAIの理解、利点/制限、リスク、導入アプローチ、ガバナンス考慮事項を企業向けに整理。2024年10月発表。(Doc: GenAI governance guideline)", citation: "ETDA / デジタル省、2024年10月" },
          { policy: "AI法原則案", content: "2025年6月パブコメ開始。ハイリスクAI、人権、説明責任、規制サンドボックスを重視。コンテキストに応じたソフトロー～ハードローのリスク階層型アプローチ。(Doc: Draft principles for AI law)", citation: "ETDA / デジタル省、2025年6月" },
          { policy: "PDPA執行の実態", content: "2026年1月時点で2,672件の苦情。共通テーマ：法的根拠の欠如、不適切な収集、無許可の利用・開示。行政罰金が複数案件で発動。「警告の時代は終わった」。(Doc: PDPA enforcement)", citation: "PDPC データプライバシーデー2026" }
        ]
      }
    },
    ecosystemData: {
      title: { en: "AI Ecosystem & Adoption", ja: "AIエコシステム＆普及" },
      items: {
        en: [
          { name: "National AI Service Platform", detail: "60+ AI APIs (Thai NLP, OCR, vision) via nationalai.in.th. 1M calls/month avg, 53.6M requests in Sep, 20K+ user accounts. Cabinet-promoted for government-wide adoption. (Doc: National AI Service Platform)", status: "Scaling" },
          { name: "LANTA Supercomputer (ThaiSC/NSTDA)", detail: "No.1 in ASEAN for computing performance since Nov 2022. Supports Thai LLM projects and medical AI data-sharing. (Doc: High-performance computing)", status: "Operational" },
          { name: "UNESCO 3rd Global Forum on Ethics of AI", detail: "Hosted in Bangkok, June 2025. Thailand positioning as regional AI governance hub. AI Governance Practice Center launched. (Doc: Thailand is explicitly integrating international AI ethics)", status: "Completed" },
          { name: "Big Data & AI Market (BDI)", detail: "Market value 37,814M baht. Big Data Services 52.7% (19,923M baht). Only ~700 AI staff, ~800 PM/managers in national scan. (Doc: Big Data & AI market)", status: "Growing 7-8% p.a." }
        ],
        ja: [
          { name: "国家AIサービスプラットフォーム", detail: "nationalai.in.thで60以上のAI API（タイ語NLP、OCR、画像認識）を提供。月間平均100万コール、9月は5,360万リクエスト、2万超ユーザーアカウント。閣議で政府全体の導入促進を決定。(Doc: National AI Service Platform)", status: "拡大中" },
          { name: "LANTAスーパーコンピュータ（ThaiSC/NSTDA）", detail: "2022年11月以降ASEAN1位の計算性能。タイ語LLMプロジェクトと医療AI向けデータ共有を支援。(Doc: High-performance computing)", status: "稼働中" },
          { name: "UNESCO 第3回AI倫理グローバルフォーラム", detail: "2025年6月バンコク開催。タイが地域AIガバナンスハブとしてのポジショニング。AIガバナンス・プラクティスセンター設立。(Doc: Thailand is explicitly integrating)", status: "完了" },
          { name: "ビッグデータ＆AI市場（BDI）", detail: "市場規模37,814百万バーツ。ビッグデータサービスが52.7%（19,923百万バーツ）。全国調査でAI専門スタッフ約700人、PM約800人にとどまる。(Doc: Big Data & AI market)", status: "年率7-8%成長" }
        ]
      }
    },
    adoptionCases: {
      title: { en: "Enterprise Adoption Signals", ja: "企業導入シグナル" },
      items: {
        en: [
          { company: "Bangkok Bank", useCase: "Intelligent automation, legacy system modernization, faster time-to-market for financial products with in-country cloud (Doc: Microsoft describes Thai enterprises)", source: "Microsoft announcement" },
          { company: "EGAT", useCase: "Data + AI platforms for process optimization, sustainability, and new digital services (Doc: Microsoft describes Thai enterprises)", source: "Microsoft announcement" },
          { company: "KASIKORN / SCBX", useCase: "Unified data + AI workflows, AI-first/agentic experiences; in-country region for security, speed, compliance (Doc: Microsoft describes Thai enterprises)", source: "Microsoft announcement" },
          { company: "Thai Government Legal Office", useCase: "AI translation/comparison of 70,000+ Thai laws against 270+ OECD legal instruments; 500+ officials, 80+ agencies, compressing years of work (Doc: Public sector AI)", source: "Microsoft case study" }
        ],
        ja: [
          { company: "バンコク銀行", useCase: "インテリジェント・オートメーション、レガシーシステムの近代化、国内クラウドによる金融商品の市場投入加速 (Doc: Microsoft describes Thai enterprises)", source: "Microsoft発表" },
          { company: "EGAT（タイ発電公社）", useCase: "データ＋AIプラットフォームによるプロセス最適化、サステナビリティ、新デジタルサービス創出 (Doc: Microsoft describes Thai enterprises)", source: "Microsoft発表" },
          { company: "KASIKORN / SCBX", useCase: "統合データ＋AIワークフロー、AI-first/エージェント体験。国内リージョンでセキュリティ・速度・コンプライアンス強化 (Doc: Microsoft describes Thai enterprises)", source: "Microsoft発表" },
          { company: "タイ政府法務機関", useCase: "70,000超のタイ法令と270超のOECD法文書のAI翻訳・比較。500名超の官僚、80超の省庁が参加、数年の作業を圧縮 (Doc: Public sector AI)", source: "Microsoftケーススタディ" }
        ]
      }
    },
    opportunities: {
      en: [
        "Data-local AI deployment: AWS/GCP/Azure in-country regions unlock regulated workloads (finance, healthcare, HR analytics) — massive advantage for Japanese firms already in Thailand (Doc: Strategic implications)",
        "Thai-language AI APIs: National AI Service Platform reduces time-to-value for call centers, document processing, customer interaction — faster than building from scratch (Doc: National AI Service Platform)",
        "AI governance consulting: Thailand aims to shape regional norms; Japanese firms can build governance playbooks that scale across ASEAN (Doc: Thailand as regional governance node)",
        "Financial services / retail / telecom AI: These sectors advancing first on compliance-driven architectures — entry point for payments, CX, fraud, supply chain finance (Doc: Practical opportunity areas)",
        "Data center infrastructure services: Power and permitting are gating factors — engineering, cooling, energy management expertise is in demand (Doc: Infrastructure)"
      ],
      ja: [
        "データローカルAIデプロイ：AWS/GCP/Azureの国内リージョンが規制ワークロード（金融、医療、HR分析）を解禁——既にタイに拠点を持つ日本企業に大きな優位 (Doc: Strategic implications)",
        "タイ語AI API：国家AIサービスプラットフォームがコールセンター、文書処理、顧客対応のtime-to-valueを短縮——ゼロから構築するより高速 (Doc: National AI Service Platform)",
        "AIガバナンスコンサルティング：タイは地域規範の形成を目指す。日本企業はASEAN全域に展開可能なガバナンスプレイブックを構築できる (Doc: Thailand as regional governance node)",
        "金融・小売・テレコムのAI：コンプライアンス駆動アーキテクチャで先行するセクター——決済、CX、不正検知、サプライチェーンファイナンスの参入ポイント (Doc: Practical opportunity areas)",
        "データセンターインフラサービス：電力と許認可がボトルネック——エンジニアリング、冷却、エネルギー管理の専門知識に需要 (Doc: Infrastructure)"
      ]
    },
    risks: {
      en: [
        "Talent gap is the binding constraint: ~80,000 AI professional shortage, only ~700 AI-specific staff nationwide — execution risk for large-scale programs (Doc: Adoption breadth/talent gap)",
        "Power & permitting bottlenecks: data center projects gated by power availability and approval friction — could create compute shortages (Doc: Infrastructure)",
        "AI regulatory framework still in motion: direction is clear (risk-tiered, accountability-focused) but final legislation may create compliance surprises (Doc: Watchlist)",
        "PDPA compliance as prerequisite: any AI program touching personal data must embed privacy engineering from day one — not a parallel legal project (Doc: Strategic implications)",
        "Thin management layer: BDI workforce scan found only ~800 Big Data/AI project managers — scaling transformation programs faces leadership bottleneck (Doc: Big Data & AI market)"
      ],
      ja: [
        "人材ギャップが最大の制約：AI専門人材約8万人不足、全国で約700人のAI専門スタッフ——大規模プログラムの実行リスク (Doc: Adoption breadth/talent gap)",
        "電力・許認可ボトルネック：データセンター案件が電力供給と許認可プロセスに制約——コンピュート不足の可能性 (Doc: Infrastructure)",
        "AI規制フレームワークはまだ流動的：方向性は明確（リスク階層型、説明責任重視）だが、最終法制化でコンプライアンス上の驚きが生じうる (Doc: Watchlist)",
        "PDPA準拠が前提条件：個人データに触れるAIプログラムは初日からプライバシーエンジニアリングを組み込む必要——並行的な法務プロジェクトではない (Doc: Strategic implications)",
        "マネジメント層の薄さ：BDI人材調査でビッグデータ/AI/ITプロジェクトマネージャーは約800人——変革プログラムのスケールにリーダーシップのボトルネック (Doc: Big Data & AI market)"
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
            title: "Thailand's AI Story Is an Infrastructure Story, Not a Technology Story",
            content: "The most consequential development is not any specific AI application — it is the simultaneous arrival of three hyperscale cloud providers with in-country regions, combined with multi-billion-dollar data center approvals. This changes the physics of the market: data residency ceases to be a barrier and becomes a feature. For Japanese companies, the implication is that Thailand-based operations can now run regulated AI workloads locally — identity, security, logging, model governance — without the latency and compliance overhead of offshore processing. This is a structural unlock, not an incremental improvement."
          },
          {
            title: "The Governance Trajectory Is More Important Than the Current Rules",
            content: "Thailand's layered approach — executive guidance → GenAI guidance → draft law principles → eventual legislation — is not indecision. It is a deliberate strategy to build institutional capacity before imposing hard obligations. Japanese companies that wait for 'final rules' before acting will find themselves behind competitors who engaged with the governance process early. The smart play is to implement governance documentation and risk-tiering now, using ETDA's existing frameworks, and treat eventual legislation as a validation rather than a surprise."
          },
          {
            title: "The 80,000-Person Talent Gap Is Actually a 800-Person Leadership Gap",
            content: "BDI's finding that Thailand has only ~800 Big Data/AI/IT project managers is more strategically significant than the headline 80,000-person shortage. Thailand can train technical staff through boot camps, university programs, and platform-assisted learning. But experienced leaders who can architect enterprise AI transformations, navigate organizational politics, and bridge business-technology gaps are genuinely scarce. Japanese firms that import core architecture leadership while building local capability will outperform those trying to hire locally at scale."
          },
          {
            title: "Thailand as ASEAN's AI Governance Node Creates a Playbook Opportunity",
            content: "Thailand's hosting of the UNESCO AI Ethics Forum, its establishment of an AI Governance Practice Center, and its explicit ambition to shape regional norms is not just diplomatic positioning. It creates a practical opportunity: governance frameworks, compliance playbooks, and risk-assessment methodologies developed for the Thai market will be directly transferable (with adaptation) across ASEAN. Japanese firms with regional coverage should treat Thailand as the governance R&D lab, not just another deployment market."
          }
        ],
        ja: [
          {
            title: "タイのAIストーリーはテクノロジーの話ではなく、インフラの話である",
            content: "最も重要な展開は特定のAIアプリケーションではなく、3つのハイパースケールクラウドプロバイダーが同時に国内リージョンを開設し、数十億ドル規模のデータセンターが承認されたことである。これが市場の「物理法則」を変える：データレジデンシーは障壁ではなくなり、機能となる。日本企業にとっての含意は、タイ拠点のオペレーションが規制対象AIワークロード——ID管理、セキュリティ、ログ、モデルガバナンス——をオフショア処理のレイテンシやコンプライアンス負荷なしにローカルで実行できるようになったことである。これは漸進的改善ではなく、構造的な解禁である。"
          },
          {
            title: "ガバナンスの軌道は現行ルールより重要である",
            content: "タイの段階的アプローチ——経営者ガイダンス→GenAIガイダンス→法原則案→最終法制化——は優柔不断ではない。ハードな義務を課す前に制度的能力を構築する意図的な戦略である。「最終ルール」を待ってから行動する日本企業は、ガバナンスプロセスに早期に関与した競合他社に後れを取る。賢明な打ち手は、ETDAの既存フレームワークを使ってガバナンス文書化とリスク階層分類を今実施し、最終法制化をサプライズではなく検証として受け止めることである。"
          },
          {
            title: "8万人の人材ギャップは実際には800人のリーダーシップギャップである",
            content: "BDIの調査でタイにビッグデータ/AI/ITプロジェクトマネージャーが約800人しかいないという発見は、見出しの8万人不足より戦略的に重要である。技術スタッフはブートキャンプ、大学プログラム、プラットフォーム支援学習で育成できる。しかし、企業のAI変革を設計し、組織政治を渡り、ビジネスとテクノロジーのギャップを橋渡しできる経験あるリーダーは真に希少である。コアのアーキテクチャリーダーシップを輸入しながらローカル能力を構築する日本企業が、ローカル採用を大規模に試みる企業を上回る。"
          },
          {
            title: "ASEAN AIガバナンスのノードとしてのタイが、プレイブック機会を生む",
            content: "タイのUNESCO AI倫理フォーラム開催、AIガバナンス・プラクティスセンター設立、地域規範形成への明示的野心は、外交的ポジショニングだけではない。実践的な機会を創出する：タイ市場向けに開発されたガバナンスフレームワーク、コンプライアンスプレイブック、リスク評価手法は、適応を加えればASEAN全域に直接移転可能である。リージョナルカバレッジを持つ日本企業は、タイを単なるデプロイメント市場ではなく、ガバナンスのR&Dラボとして扱うべきである。"
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
        en: `Treat Thailand as a 'data-local AI deployment market.' (Doc: Strategic implications)

With AWS, Google Cloud, and Microsoft all operating in-country, Thailand is moving toward architectures where regulated and high-trust workloads run locally. This affects how Japanese firms should plan identity, security, logging, and model governance for Thai operations — especially in finance, retail, healthcare-adjacent, and HR analytics. The companies that restructure their AI architectures around Thailand's data-local infrastructure now will have a structural advantage as competitors catch up.

Prepare for risk-tiered AI regulation, not a single compliance checklist. (Doc: Strategic implications)

ETDA's consultation explicitly emphasizes 'high-risk AI,' regulatory sandboxes, and flexible mechanisms. Japanese firms should map use cases into risk tiers now — biometrics, credit decisions, employee monitoring, customer profiling — because Thailand is explicitly trying to avoid one-size-fits-all while still enforcing accountability. Start with ETDA's published frameworks and build internal classification systems before the law crystallizes.

Assume PDPA compliance is a 'license to scale AI,' not a parallel legal project. (Doc: Strategic implications)

PDPC's complaint volumes and enforcement actions mean that AI programs touching personal data should embed privacy engineering, breach response, and vendor governance from day one. This is particularly critical for generative AI with customer or employee data. Companies that treat PDPA as a legal department's problem rather than an engineering requirement will find their AI programs blocked at scale.

Plan for a 'thin leadership layer' in the domestic workforce. (Doc: Strategic implications)

The optimal staffing model is hybrid: import core architecture leadership, partner with Thai institutions (NSTDA, universities, ETDA), and build internal academies. Expecting the local market to staff full AI transformation immediately is unrealistic given the ~800-person PM bottleneck. The investment in leadership development is a 3-5 year commitment with compounding returns.

Leverage Thailand as a regional AI governance R&D base. (Doc: Strategic implications)

UNESCO's AI Ethics Forum, ETDA's governance center, and Thailand's risk-tiered regulatory trajectory make it the ideal location to develop compliance frameworks that can be adapted across ASEAN. Japanese firms with multi-country operations should centralize governance R&D in Thailand rather than building separate compliance approaches in each market.`,
        ja: `タイを「データローカルAIデプロイメント市場」として扱え (Doc: Strategic implications)

AWS、Google Cloud、Microsoftがすべて国内で稼働する中、タイは規制対象・高信頼ワークロードをローカル実行するアーキテクチャへ移行している。これは日本企業がタイオペレーション——特に金融、小売、ヘルスケア隣接、HR分析——のID管理、セキュリティ、ログ、モデルガバナンスをどう設計すべきかに影響する。タイのデータローカルインフラを中心にAIアーキテクチャを再構築する企業が、競合他社が追いつく中で構造的優位を持つ。

リスク階層型AI規制に備えよ。単一のコンプライアンスチェックリストではなく。(Doc: Strategic implications)

ETDAのパブコメは「ハイリスクAI」、規制サンドボックス、柔軟なメカニズムを明示的に強調している。日本企業はユースケースを今リスク階層に分類すべきである——生体認証、与信判断、従業員モニタリング、顧客プロファイリング——タイは画一的アプローチを避けながら説明責任を執行しようとしているからである。ETDAの公表フレームワークから始め、法律が結晶化する前に社内分類システムを構築せよ。

PDPAコンプライアンスは「AI拡大のライセンス」であり、並行法務プロジェクトではない (Doc: Strategic implications)

PDPCの苦情件数と執行実績は、個人データに触れるAIプログラムが初日からプライバシーエンジニアリング、インシデント対応、ベンダーガバナンスを組み込む必要があることを意味する。これは特に顧客・従業員データを扱う生成AIで重要である。PDPAを法務部門の問題として扱う企業は、AIプログラムの拡大時にブロックされる。

国内人材の「薄いリーダーシップ層」を前提に計画せよ (Doc: Strategic implications)

最適な人員モデルはハイブリッド：コアのアーキテクチャリーダーシップを輸入し、タイの機関（NSTDA、大学、ETDA）と提携し、社内アカデミーを構築する。PM約800人のボトルネックを考えると、ローカル市場がAI変革の即座のフル人員配置を提供することを期待するのは非現実的である。リーダーシップ開発への投資は3-5年のコミットメントであり、複利的なリターンをもたらす。

タイをリージョナルAIガバナンスR&D基地として活用せよ (Doc: Strategic implications)

UNESCOのAI倫理フォーラム、ETDAのガバナンスセンター、タイのリスク階層型規制軌道が、ASEAN全域に適応可能なコンプライアンスフレームワーク開発の理想的拠点とする。複数国でオペレーションを持つ日本企業は、各市場で別々のコンプライアンスアプローチを構築するのではなく、ガバナンスR&Dをタイに集約すべきである。`
      }
    },
    dataAppendix: {
      title: { en: "Data Appendix", ja: "データ付録" },
      tables: {
        marketSize: {
          title: { en: "Thailand Big Data & AI Market (BDI, 2024)", ja: "タイ ビッグデータ＆AI市場（BDI、2024年）" },
          data: [
            { segment: isJapanese ? "ビッグデータサービス" : "Big Data Services", value: "19,923M THB", share: "52.7%" },
            { segment: isJapanese ? "ビッグデータ/AIソフトウェア" : "Big Data/AI Software", value: isJapanese ? "（内訳は文書に記載なし）" : "(breakdown not in source)", share: "—" },
            { segment: isJapanese ? "AIサービス" : "AI Services", value: isJapanese ? "（内訳は文書に記載なし）" : "(breakdown not in source)", share: "—" },
            { segment: isJapanese ? "ハードウェア" : "Hardware", value: isJapanese ? "（内訳は文書に記載なし）" : "(breakdown not in source)", share: "—" },
            { segment: isJapanese ? "合計" : "Total", value: "37,814M THB", share: "100%" }
          ]
        },
        workforce: {
          title: { en: "AI Workforce Snapshot (BDI, Aug-Dec 2024)", ja: "AI人材スナップショット（BDI、2024年8-12月）" },
          data: [
            { segment: isJapanese ? "ビッグデータ関連スタッフ" : "Big Data Staff", value: "~14,500", note: "Doc: BDI workforce scan" },
            { segment: isJapanese ? "AI専門スタッフ" : "AI-specific Staff", value: "~700", note: isJapanese ? "非常に少ない" : "Very thin" },
            { segment: isJapanese ? "BD/AI/IT PM" : "BD/AI/IT Project Managers", value: "~800", note: isJapanese ? "リーダーシップボトルネック" : "Leadership bottleneck" },
            { segment: isJapanese ? "合計BD＆AI関連" : "Total BD & AI-connected", value: "~32,000", note: "Doc: BDI" },
            { segment: isJapanese ? "不足推計（UNESCO）" : "Shortage estimate (UNESCO)", value: "~80,000", note: "UNESCO RAM Country Report" }
          ]
        }
      }
    },
    sources: {
      title: { en: "Sources & Methodology", ja: "出典・方法論" },
      list: {
        en: [
          "Google Cloud — 'Google Cloud Launches New Cloud Region in Thailand' (Jan 2026)",
          "AWS — 'Announcing the new AWS Asia Pacific (Thailand) Region' (Jan 2025)",
          "Microsoft — 'Landmark strategic commitment to accelerate Thailand's AI-powered growth' (Nov 2025)",
          "Reuters — Thailand BOI data center approvals coverage (Mar 2025, Nov 2025)",
          "UNESCO — 3rd Global Forum on the Ethics of AI (Jun 2025); RAM Country Report for Thailand",
          "ETDA — AI Governance Guidelines, GenAI Governance Guidelines, Draft AI Law Principles",
          "PDPC — Data Privacy Day 2026 disclosures",
          "Big Data Institute (BDI) — Thailand Big Data & AI market report, workforce scan (2024)",
          "Thailand National AI Strategy Annual Report 2024",
          "World Bank — Thailand Digital Data Infrastructure Roadmap (Jun 2025)",
          "DLA Piper — Data protection laws in Thailand (PDPA)",
          "WaLens Analysis — Independent interpretation and synthesis (Q1 2026)"
        ],
        ja: [
          "Google Cloud — 「Google Cloudがタイに新クラウドリージョンを開設」（2026年1月）",
          "AWS — 「新AWS Asia Pacific (Thailand)リージョン発表」（2025年1月）",
          "Microsoft — 「タイのAI駆動成長を加速する画期的な戦略コミットメント」（2025年11月）",
          "Reuters — タイBOIデータセンター承認報道（2025年3月、11月）",
          "UNESCO — 第3回AI倫理グローバルフォーラム（2025年6月）；タイRAMカントリーレポート",
          "ETDA — AIガバナンスガイドライン、GenAIガバナンスガイドライン、AI法原則案",
          "PDPC — データプライバシーデー2026開示",
          "ビッグデータインスティテュート（BDI）— タイ ビッグデータ＆AI市場レポート、人材調査（2024年）",
          "タイ国家AI戦略年次報告書2024",
          "世界銀行 — タイ デジタルデータインフラ ロードマップ（2025年6月）",
          "DLA Piper — タイの個人情報保護法（PDPA）",
          "WaLens分析 — 独自の解釈と統合（2026年Q1）"
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
        title={isJapanese ? "タイのビッグデータ＆AI動向 2026 | WaLens" : "Big Data & AI Trends in Thailand 2026 | WaLens"}
        description={isJapanese 
          ? "タイのビッグデータ＆AI産業の包括的分析。ハイパースケールクラウド、AIガバナンス、PDPA執行、人材ギャップ、日本企業の戦略的打ち手。"
          : "Comprehensive analysis of Thailand's Big Data & AI landscape. Hyperscale cloud, AI governance, PDPA enforcement, talent gap, and strategic plays for Japanese companies."
        }
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6 md:py-12 max-w-4xl">
          <div className="mb-6">
            <Breadcrumb 
              items={[
                { label: isJapanese ? "インサイト" : "Insights", href: "/insights" },
                { label: isJapanese ? "サービス" : "Services", href: "/insights/services" },
                { label: isJapanese ? "ビッグデータ＆AI" : "Big Data & AI" }
              ]}
            />
          </div>

          {/* Hero */}
          <section className="mb-8 md:mb-12">
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img src={heroImage} alt={isJapanese ? "タイAIインフラ" : "Thailand AI Infrastructure"} className="w-full h-48 md:h-72 object-cover" />
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
              <BookmarkButton article={{ slug: 'big-data-ai', title: isJapanese ? 'タイのビッグデータ＆AI動向 2026' : 'Big Data & AI Trends in Thailand 2026', language: lang === 'ja' ? 'JP' : 'EN', url: '/insights/reports/big-data-ai', category: 'Technology' }} variant="button" />
            </div>
          </section>

          {/* TOC */}
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

          {/* Facts */}
          <section id="facts" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2"><Database className="h-6 w-6" />{isJapanese ? "ファクト：インフラ・規制・エコシステム" : "Facts: Infrastructure, Regulation & Ecosystem"}</h2>
            {hasFullAccess ? (
              <div className="space-y-6">
                {/* Infrastructure */}
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Server className="h-5 w-5" />{isJapanese ? content.infraData.title.ja : content.infraData.title.en}</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(isJapanese ? content.infraData.items.ja : content.infraData.items.en).map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div><p className="font-medium">{item.name}</p><p className="text-sm text-muted-foreground">{item.detail}</p></div>
                          <Badge variant="outline" className="text-xs flex-shrink-0 ml-2">{item.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Governance */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Shield className="h-5 w-5" />{isJapanese ? content.governanceData.title.ja : content.governanceData.title.en}</h3>
                  <div className="space-y-4">
                    {(isJapanese ? content.governanceData.items.ja : content.governanceData.items.en).map((item, i) => (
                      <Card key={i}><CardContent className="p-4"><h4 className="font-bold mb-2">{item.policy}</h4><p className="text-sm text-muted-foreground mb-2">{item.content}</p><p className="text-xs text-muted-foreground italic">{isJapanese ? "出典" : "Source"}: {item.citation}</p></CardContent></Card>
                    ))}
                  </div>
                </div>

                {/* Ecosystem */}
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5" />{isJapanese ? content.ecosystemData.title.ja : content.ecosystemData.title.en}</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(isJapanese ? content.ecosystemData.items.ja : content.ecosystemData.items.en).map((item, i) => (
                        <div key={i} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-1"><p className="font-medium">{item.name}</p><Badge variant="outline" className="text-xs">{item.status}</Badge></div>
                          <p className="text-sm text-muted-foreground">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Adoption Cases */}
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Brain className="h-5 w-5" />{isJapanese ? content.adoptionCases.title.ja : content.adoptionCases.title.en}</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(isJapanese ? content.adoptionCases.items.ja : content.adoptionCases.items.en).map((item, i) => (
                        <div key={i} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-1"><p className="font-medium">{item.company}</p><p className="text-xs text-muted-foreground">{item.source}</p></div>
                          <p className="text-sm text-muted-foreground">{item.useCase}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

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
              <div className="space-y-6" onClick={handleDataAppendixAccess}>
                <Card>
                  <CardHeader><CardTitle className="text-lg">{isJapanese ? content.dataAppendix.tables.marketSize.title.ja : content.dataAppendix.tables.marketSize.title.en}</CardTitle></CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead><tr className="border-b"><th className="text-left p-2 font-semibold">{isJapanese ? "セグメント" : "Segment"}</th><th className="text-left p-2 font-semibold">{isJapanese ? "市場規模" : "Market Size"}</th><th className="text-left p-2 font-semibold">{isJapanese ? "シェア" : "Share"}</th></tr></thead>
                        <tbody>{content.dataAppendix.tables.marketSize.data.map((row, i) => (<tr key={i} className="border-b"><td className="p-2 font-medium">{row.segment}</td><td className="p-2">{row.value}</td><td className="p-2">{row.share}</td></tr>))}</tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">{isJapanese ? content.dataAppendix.tables.workforce.title.ja : content.dataAppendix.tables.workforce.title.en}</CardTitle></CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead><tr className="border-b"><th className="text-left p-2 font-semibold">{isJapanese ? "カテゴリ" : "Category"}</th><th className="text-left p-2 font-semibold">{isJapanese ? "人数" : "Count"}</th><th className="text-left p-2 font-semibold">{isJapanese ? "備考" : "Notes"}</th></tr></thead>
                        <tbody>{content.dataAppendix.tables.workforce.data.map((row, i) => (<tr key={i} className="border-b"><td className="p-2 font-medium">{row.segment}</td><td className="p-2">{row.value}</td><td className="p-2 text-muted-foreground">{row.note}</td></tr>))}</tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <BlurredContent><div className="space-y-4"><Card className="h-48" /><Card className="h-48" /></div></BlurredContent>
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

export default BigDataAI;
