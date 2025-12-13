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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
  Lock,
  Lightbulb,
  Target,
  Eye,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Clock,
  Users,
  Briefcase,
  Car,
  Package,
  Rocket,
  AlertCircle,
  HelpCircle,
  Database,
  Calendar,
  Battery,
  TrendingUp as TrendUp,
  Menu
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { PdfDownloadButton } from '@/components/insights/PdfDownloadButton';

const EVBatteryIndustry = () => {
  const { lang } = useI18n();
  const { user } = useAuth();
  const { canViewArticle } = usePaywall();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [expandedDeepDive, setExpandedDeepDive] = useState<string | null>(null);
  const [deepDiveMode, setDeepDiveMode] = useState<'summary' | 'deep' | 'full'>('summary');
  const [tocOpen, setTocOpen] = useState(false);

  const access = canViewArticle('premium');
  const hasFullAccess = access.canViewFull;

  const isJapanese = lang === 'ja';

  // Table of Contents sections
  const tocSections = [
    { id: 'ceo-brief', label: isJapanese ? 'CEOブリーフ' : 'CEO Brief' },
    { id: 'executive-summary', label: isJapanese ? 'エグゼクティブサマリー' : 'Executive Summary' },
    { id: 'industry-snapshot', label: isJapanese ? '産業スナップショット' : 'Industry Snapshot' },
    { id: 'policy-regulation', label: isJapanese ? '政策・規制' : 'Policy & Regulation' },
    { id: 'opportunities-risks', label: isJapanese ? '機会とリスク' : 'Opportunities & Risks' },
    { id: 'company-type-implications', label: isJapanese ? '企業タイプ別示唆' : 'By Company Type' },
    { id: 'strategic-implications', label: isJapanese ? '戦略的示唆' : 'Strategic Implications' },
    { id: 'confidence-assumptions', label: isJapanese ? '確信度・前提' : 'Confidence & Assumptions' },
    { id: 'deep-dive', label: isJapanese ? 'ディープダイブ分析' : 'Deep-Dive Analysis' },
    { id: 'data-appendix', label: isJapanese ? 'データ付録' : 'Data Appendix' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    // CEO Brief (1-page)
    ceoBrief: {
      title: { en: "CEO Brief", ja: "CEOブリーフ" },
      keyMessage: {
        en: "Thailand's EV transition presents both existential risk and transformational opportunity for Japanese manufacturers—decisive action in the next 12-18 months will determine decade-long competitive position.",
        ja: "タイのEV転換は日本メーカーにとって存続リスクと変革的機会の両面を持つ——今後12〜18ヶ月の決断的行動が10年間の競争ポジションを決定する。"
      },
      hqChecklist: {
        title: { en: "HQ Decision Checklist", ja: "本社意思決定チェックリスト" },
        items: {
          en: [
            "Is our Thailand EV strategy aligned with 2x faster market timeline vs. domestic assumptions?",
            "Have we evaluated battery partnership options (Chinese JV vs. component specialization)?",
            "Is local decision-making authority sufficient to match competitor speed?",
            "Do we have dedicated Thailand market intelligence resources (not rotating staff)?",
            "Have we assessed charging infrastructure and recycling as strategic growth areas?"
          ],
          ja: [
            "タイEV戦略は国内想定の2倍速い市場タイムラインに整合しているか？",
            "バッテリーパートナーシップ選択肢（中国JV vs コンポーネント特化）を評価したか？",
            "現地意思決定権限は競合スピードに対応可能か？",
            "専任のタイ市場インテリジェンスリソース（ローテーションスタッフではなく）を持っているか？",
            "充電インフラとリサイクルを戦略的成長領域として評価したか？"
          ]
        }
      },
      recommendedActions: {
        title: { en: "Recommended Actions", ja: "推奨アクション" },
        items: {
          en: [
            { timeline: "30 days", action: "Complete competitive intelligence refresh on Chinese OEM Thailand positioning" },
            { timeline: "60 days", action: "Evaluate BOI EV Package 3.5 application timeline and requirements" },
            { timeline: "90 days", action: "Present Thailand battery strategy decision (partnership/specialization/wait) to board" }
          ],
          ja: [
            { timeline: "30日", action: "中国OEMタイポジショニングの競合インテリジェンス更新を完了" },
            { timeline: "60日", action: "BOI EVパッケージ3.5申請タイムラインと要件を評価" },
            { timeline: "90日", action: "タイバッテリー戦略決定（パートナーシップ/特化/待機）を取締役会に提示" }
          ]
        }
      }
    },
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
        "Thailand is positioning itself as the regional hub for EV and battery manufacturing, with over $15 billion in committed investments through 2027 (BOI, 2024).",
        "Japanese automakers face strategic pressure: BOI incentives favor new entrants (Chinese, Korean), potentially eroding traditional market dominance.",
        "Battery cell localization requirements (40% by 2027) create both supply chain risks and partnership opportunities for Japanese trading companies.",
        "The policy environment is highly favorable but execution gaps remain—permit delays and workforce readiness are key operational risks (WaLens interviews, Q4 2024).",
        "First-mover advantage in charging infrastructure and battery recycling represents untapped strategic opportunity."
      ],
      ja: [
        "タイは2027年までに150億ドル以上の投資コミットメントを背景に、EV・バッテリー製造の地域ハブとしての地位を確立しつつある（BOI、2024年）。",
        "日系自動車メーカーは戦略的プレッシャーに直面：BOI優遇措置は新規参入者（中国系・韓国系）に有利であり、従来の市場支配力が揺らぐ可能性がある。",
        "バッテリーセルの現地化要件（2027年までに40%）は、日系商社にとってサプライチェーンリスクであると同時にパートナーシップ機会でもある。",
        "政策環境は極めて良好だが実行面でのギャップが残る—許認可の遅延と人材の準備状況が主要なオペレーショナルリスク（WaLensインタビュー、2024年Q4）。",
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
            practical: "Chinese entrants have secured most allocations. Japanese applications face longer review cycles. Early 2025 application recommended.",
            citation: "BOI Official Gazette, September 2024"
          },
          {
            policy: "30@30 Policy",
            official: "30% ZEV production by 2030",
            practical: "Implicitly favors BEV over HEV. Japanese hybrid strategy may face regulatory headwinds post-2027.",
            citation: "Ministry of Industry Policy Document, 2023"
          },
          {
            policy: "Local Content Requirements",
            official: "40% battery cell localization by 2027",
            practical: "Creates forced partnership opportunities. Japanese trading houses should position for supplier matching role.",
            citation: "BOI Investment Promotion Division"
          },
          {
            policy: "EEC Special Incentives",
            official: "Additional 50% reduction on land rental, 90-day visa for skilled workers",
            practical: "Rayong and Chonburi zones are nearly full. Chachoengsao offers better land availability but weaker logistics.",
            citation: "EEC Office Zone Report, Q3 2024"
          }
        ],
        ja: [
          {
            policy: "BOI EVパッケージ3.5",
            official: "EV組立に8年間の法人税免除、バッテリーセルには10年間",
            practical: "中国系参入者が大半の枠を確保済み。日本企業の申請は審査期間が長期化傾向。2025年初頭の申請を推奨。",
            citation: "BOI官報、2024年9月"
          },
          {
            policy: "30@30政策",
            official: "2030年までにZEV生産30%",
            practical: "暗黙的にBEVがHEVより有利。日系のハイブリッド戦略は2027年以降に規制上の逆風を受ける可能性。",
            citation: "工業省政策文書、2023年"
          },
          {
            policy: "現地調達要件",
            official: "2027年までにバッテリーセル40%の現地化",
            practical: "強制的なパートナーシップ機会を創出。日系商社はサプライヤーマッチング役として位置づけるべき。",
            citation: "BOI投資促進部"
          },
          {
            policy: "EEC特別優遇",
            official: "土地賃借料50%追加削減、熟練労働者向け90日ビザ",
            practical: "ラヨーン・チョンブリ地区はほぼ満杯。チャチューンサオは土地供給に余裕があるが物流面で劣る。",
            citation: "EEC事務局ゾーンレポート、2024年Q3"
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
          "Market share erosion: Chinese EVs gaining consumer preference rapidly (J.D. Power Thailand, 2024)",
          "Technology mismatch: Thai EV ecosystem optimizing for BEV, not HEV",
          "Talent competition: Salary expectations rising 20-30% annually in EV sector (WaLens survey)",
          "Policy uncertainty: Potential incentive revisions post-2025 election",
          "Supply chain concentration: Over-reliance on Chinese battery cell supply"
        ],
        ja: [
          "市場シェア浸食：中国製EVが消費者選好を急速に獲得（J.D.Powerタイ、2024年）",
          "技術ミスマッチ：タイEVエコシステムはHEVでなくBEV最適化へ進行",
          "人材獲得競争：EV分野の給与期待値が年率20-30%上昇（WaLens調査）",
          "政策不確実性：2025年選挙後の優遇措置見直しの可能性",
          "サプライチェーン集中リスク：中国製バッテリーセルへの過度な依存"
        ]
      }
    },
    // Company Type Implications
    companyTypeImplications: {
      title: { en: "Implications by Company Type", ja: "企業タイプ別示唆" },
      types: {
        en: [
          {
            type: "OEM",
            icon: "Car",
            opportunities: [
              "Leverage existing Thailand manufacturing footprint for rapid EV transition",
              "Brand recognition advantage in premium/safety-conscious segments",
              "Commercial vehicle and pickup truck segments remain defensible"
            ],
            risks: [
              "Consumer preference shifting to Chinese brands in passenger BEV",
              "Dealer network may become liability vs direct-to-consumer models",
              "Hybrid-focused strategy increasingly misaligned with market direction"
            ],
            actions: [
              "Accelerate BEV model launch timeline by 12-18 months",
              "Pilot direct-sales showroom model in Bangkok",
              "Negotiate battery supply partnership with Chinese or Korean manufacturer"
            ]
          },
          {
            type: "Tier-1/2 Supplier",
            icon: "Package",
            opportunities: [
              "Battery management systems and thermal management as high-value specialization",
              "Quality certification services for emerging Thai suppliers",
              "EV-specific components (motors, inverters) with Japanese precision advantage"
            ],
            risks: [
              "Volume reduction if Japanese OEM assembly share declines",
              "Customer diversification to Chinese OEMs may require different quality/cost trade-offs",
              "Talent poaching by new EV entrants offering premium salaries"
            ],
            actions: [
              "Develop customer relationships with Chinese OEMs in Thailand",
              "Evaluate local R&D capability for Thailand-specific product development",
              "Invest in EV-specific engineering talent retention programs"
            ]
          },
          {
            type: "Trading Company",
            icon: "Briefcase",
            opportunities: [
              "Supplier matching and sourcing intermediation for battery materials",
              "Logistics optimization for EV supply chain (heavier components, different routing)",
              "Investment coordination role connecting Japanese capital with Thai opportunities"
            ],
            risks: [
              "Disintermediation risk as OEMs build direct relationships",
              "Battery materials trading dominated by Chinese players with upstream control",
              "Traditional automotive trading relationships becoming less relevant"
            ],
            actions: [
              "Build battery material sourcing relationships in Indonesia and Australia",
              "Position for EV recycling and secondary materials trading",
              "Develop Thailand EV market intelligence as value-added service"
            ]
          },
          {
            type: "New Entrant",
            icon: "Rocket",
            opportunities: [
              "Clean-slate positioning without legacy ICE burden",
              "BOI incentives still available for differentiated offerings",
              "Charging infrastructure and energy services as greenfield opportunity"
            ],
            risks: [
              "Established players have relationship advantages with government and partners",
              "Brand building in Thailand requires significant time and investment",
              "Competition for same limited pool of EV-skilled workforce"
            ],
            actions: [
              "Partner with Thai conglomerate for market access and local credibility",
              "Focus on specific niche (e.g., fleet, delivery, two-wheelers) rather than broad market",
              "Leverage government co-funding for workforce development"
            ]
          }
        ],
        ja: [
          {
            type: "OEM",
            icon: "Car",
            opportunities: [
              "既存のタイ製造拠点を活用した迅速なEV転換",
              "プレミアム/安全重視セグメントでのブランド認知優位",
              "商用車・ピックアップトラックセグメントは依然防御可能"
            ],
            risks: [
              "消費者選好が乗用BEVで中国ブランドにシフト",
              "ディーラーネットワークがD2Cモデルに対する負債になる可能性",
              "ハイブリッド中心戦略が市場方向性と乖離"
            ],
            actions: [
              "BEVモデル発売タイムラインを12〜18ヶ月前倒し",
              "バンコクで直販ショールームモデルを試験",
              "中国または韓国メーカーとバッテリー供給パートナーシップを交渉"
            ]
          },
          {
            type: "Tier-1/2サプライヤー",
            icon: "Package",
            opportunities: [
              "バッテリー管理システムと熱管理の高付加価値特化",
              "新興タイサプライヤー向け品質認証サービス",
              "日本の精度優位を活かしたEV専用部品（モーター、インバーター）"
            ],
            risks: [
              "日系OEM組立シェア低下に伴う数量減少",
              "中国OEMへの顧客多様化は異なる品質/コストトレードオフを要求",
              "プレミアム給与を提示する新規EV参入者による人材引き抜き"
            ],
            actions: [
              "タイの中国OEMとの顧客関係を構築",
              "タイ固有製品開発のための現地R&D能力を評価",
              "EV専門エンジニアリング人材の維持プログラムに投資"
            ]
          },
          {
            type: "商社",
            icon: "Briefcase",
            opportunities: [
              "バッテリー材料のサプライヤーマッチングと調達仲介",
              "EVサプライチェーン向け物流最適化（重い部品、異なるルーティング）",
              "日本資本とタイ機会を結ぶ投資コーディネーション役割"
            ],
            risks: [
              "OEMが直接関係を構築することによる中抜きリスク",
              "バッテリー材料取引は上流支配力を持つ中国プレイヤーが優位",
              "従来の自動車取引関係の重要性低下"
            ],
            actions: [
              "インドネシアとオーストラリアでバッテリー材料調達関係を構築",
              "EVリサイクルと二次材料取引のポジショニング",
              "付加価値サービスとしてタイEV市場インテリジェンスを開発"
            ]
          },
          {
            type: "新規参入者",
            icon: "Rocket",
            opportunities: [
              "レガシーICE負担のないクリーンスレートポジショニング",
              "差別化された製品にはBOIインセンティブがまだ利用可能",
              "充電インフラとエネルギーサービスはグリーンフィールド機会"
            ],
            risks: [
              "既存プレイヤーは政府・パートナーとの関係優位を保有",
              "タイでのブランド構築には相当な時間と投資が必要",
              "同一のEV熟練労働力プールを巡る競争"
            ],
            actions: [
              "市場アクセスと現地信用のためタイ財閥と提携",
              "広範な市場ではなく特定ニッチ（例：フリート、配送、二輪）に集中",
              "人材開発のための政府共同出資を活用"
            ]
          }
        ]
      }
    },
    // Confidence & Assumptions
    confidenceAssumptions: {
      title: { en: "Confidence & Assumptions", ja: "確信度・前提条件" },
      items: {
        en: [
          {
            level: "high",
            statement: "Thailand will remain ASEAN's primary EV manufacturing hub through 2030",
            rationale: "Established automotive infrastructure, BOI commitment, and geographic advantage",
            signals: "Watch for: Indonesia nickel-based battery investment scale, Vietnam EV export growth"
          },
          {
            level: "high",
            statement: "Chinese OEMs will capture >50% of Thailand passenger EV market by 2027",
            rationale: "Current trajectory, pricing advantage, and consumer acceptance trends",
            signals: "Watch for: Japanese OEM BEV pricing response, Chinese quality perception shifts"
          },
          {
            level: "medium",
            statement: "Battery cell localization requirement (40%) will be enforced as stated",
            rationale: "Political commitment is strong but implementation capacity is uncertain",
            signals: "Watch for: BOI enforcement actions, timeline extension discussions"
          },
          {
            level: "medium",
            statement: "Thai consumer EV preferences will remain price-sensitive",
            rationale: "Current data supports, but premium segment could emerge with income growth",
            signals: "Watch for: Tesla/premium brand sales trends, financing rate sensitivity"
          },
          {
            level: "uncertain",
            statement: "Post-2025 election government will maintain EV policy direction",
            rationale: "Policy has bipartisan support but priority levels may shift",
            signals: "Watch for: Election campaign platforms, coalition formation outcomes"
          }
        ],
        ja: [
          {
            level: "high",
            statement: "タイは2030年までASEANの主要EV製造ハブであり続ける",
            rationale: "確立された自動車インフラ、BOIのコミットメント、地理的優位性",
            signals: "注視：インドネシアのニッケルベースバッテリー投資規模、ベトナムEV輸出成長"
          },
          {
            level: "high",
            statement: "中国OEMは2027年までにタイ乗用EV市場の50%以上を獲得",
            rationale: "現在の軌道、価格優位、消費者受容トレンド",
            signals: "注視：日系OEMのBEV価格対応、中国品質認識の変化"
          },
          {
            level: "medium",
            statement: "バッテリーセル現地化要件（40%）は記載通り執行される",
            rationale: "政治的コミットメントは強いが実施能力は不確実",
            signals: "注視：BOI執行措置、タイムライン延長の議論"
          },
          {
            level: "medium",
            statement: "タイ消費者のEV選好は価格感応的であり続ける",
            rationale: "現在のデータは支持しているが、所得成長に伴いプレミアムセグメントが出現する可能性",
            signals: "注視：テスラ/プレミアムブランドの販売動向、ファイナンスレート感応度"
          },
          {
            level: "uncertain",
            statement: "2025年選挙後の政府はEV政策方向性を維持する",
            rationale: "政策は超党派的支持があるが優先度レベルは変化する可能性",
            signals: "注視：選挙キャンペーンプラットフォーム、連立政権形成結果"
          }
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
    // Deep-Dive Analysis Section
    deepDive: {
      title: {
        en: "Deep-Dive Analysis: Structural Transformation of Thailand's EV Industry",
        ja: "ディープダイブ分析：タイEV産業の構造的変革"
      },
      readingModes: {
        summary: { en: "Summary (3 min)", ja: "概要だけ読む（3分）" },
        deep: { en: "Deep Read (15-20 min)", ja: "深掘りを読む（15〜20分）" },
        full: { en: "Full Chapter", ja: "全章を読む" }
      },
      sections: {
        whyDifferent: {
          title: {
            en: "Why Thailand's EV Transition Is Structurally Different",
            ja: "タイのEV転換が構造的に異なる理由"
          },
          summary: {
            en: "Thailand's EV transition represents a unique 'industrial policy arbitrage' model—neither China's state-driven approach nor Europe's regulatory push. The competitive dynamics fundamentally favor new entrants over incumbents.",
            ja: "タイのEV転換は独自の「産業政策アービトラージ」モデルを代表する——中国の国家主導型でもヨーロッパの規制プッシュでもない。競争力学は根本的に既存企業より新規参入者を有利にしている。"
          },
          content: {
            en: `Thailand's EV transition cannot be understood through the lens of China's state-driven rapid electrification or Europe's regulatory push. Instead, it represents a unique "industrial policy arbitrage" model—leveraging its position as ASEAN's established automotive hub while opportunistically attracting new players.

**Comparison with China:**
China's EV dominance emerged from a decade of aggressive industrial policy: subsidies exceeding $100 billion (China Ministry of Finance estimates, 2023), protected domestic market, and state-directed battery supply chain control. Thailand lacks the domestic market scale (70 million vs 1.4 billion population) and political capacity for such intervention. Instead, Thailand operates as a "neutral manufacturing platform," accepting investment from all origins while avoiding the geopolitical entanglements that restrict Chinese OEMs in Western markets.

**Comparison with EU:**
The European transition is regulation-driven (ICE ban by 2035) with established premium OEMs pivoting reluctantly. Thailand faces no such regulatory pressure—its 30@30 policy is aspirational rather than binding (Ministry of Industry, 2023). The transition is occurring because new entrants (Chinese OEMs) see Thailand as a low-risk export platform, not because incumbent players are being forced to change.

**The Industrial Policy Logic:**
Thailand's approach is fundamentally about maintaining manufacturing employment and GDP contribution as the global automotive industry restructures. The BOI's incentive framework is designed to ensure that EV production replaces ICE production without net job losses—a politically critical objective for any Thai government. This creates a unique competitive dynamic: Thailand competes primarily on incentives and logistics, not on technology development or market access.

**Structural Characteristic 1: Incumbent Disadvantage**
Unlike China (where local champions were supported) or Europe (where incumbents have political influence), Thailand's incentive structure inadvertently favors new entrants. Chinese OEMs starting fresh can optimize for EV-specific requirements, while Japanese incumbents must retrofit ICE-optimized facilities and supply chains.

**Structural Characteristic 2: Battery as Chokepoint**
Thailand has no lithium resources and minimal chemical processing capability (OIE, 2024). Unlike Indonesia (nickel) or Australia (lithium), Thailand cannot control upstream battery materials. This creates structural dependency that shapes all downstream investment decisions.`,
            ja: `タイのEV転換は、中国の国家主導型急速電動化やヨーロッパの規制プッシュの視点では理解できない。これは独自の「産業政策アービトラージ」モデルを代表している——ASEANの確立された自動車ハブとしての地位を活用しながら、機会主義的に新規プレイヤーを惹きつけるものである。

**中国との比較：**
中国のEV支配は、10年以上にわたる積極的な産業政策から生まれた：1,000億ドルを超える補助金（中国財政部推計、2023年）、保護された国内市場、国家主導のバッテリーサプライチェーン統制。タイにはそのような介入を可能にする国内市場規模（7,000万人対14億人）も政治的能力もない。代わりに、タイは「中立的な製造プラットフォーム」として機能し、あらゆる出自からの投資を受け入れつつ、西側市場で中国OEMを制限する地政学的関与を回避している。

**EUとの比較：**
欧州の転換は規制主導型（2035年までのICE禁止）であり、確立されたプレミアムOEMが不本意ながら方向転換している。タイにはそのような規制圧力がない——30@30政策は拘束力があるというより理想的なものである（工業省、2023年）。転換が起こっているのは、新規参入者（中国OEM）がタイを低リスクの輸出プラットフォームと見なしているからであり、既存プレイヤーが変化を強いられているからではない。

**産業政策のロジック：**
タイのアプローチは、グローバル自動車産業の再編に伴い、製造業の雇用とGDP貢献を維持することを根本的な目的としている。BOIのインセンティブ枠組みは、EV生産がICE生産に取って代わる際に純雇用損失が発生しないことを保証するよう設計されている——これはいかなるタイ政府にとっても政治的に重要な目標である。これにより独特の競争力学が生まれる：タイは主にインセンティブと物流で競争し、技術開発や市場アクセスでは競争しない。

**構造的特徴1：既存企業の不利益**
中国（現地チャンピオンが支援された）やヨーロッパ（既存企業が政治的影響力を持つ）とは異なり、タイのインセンティブ構造は意図せず新規参入者を有利にしている。ゼロから始める中国OEMはEV固有の要件に最適化できる一方、日系既存企業はICE最適化された施設とサプライチェーンを改修しなければならない。

**構造的特徴2：ボトルネックとしてのバッテリー**
タイにはリチウム資源がなく、化学処理能力も最小限である（OIE、2024年）。インドネシア（ニッケル）やオーストラリア（リチウム）とは異なり、タイは上流のバッテリー材料を制御できない。これにより、すべての下流投資決定を形作る構造的依存が生まれる。`
          }
        },
        boiTradeoffs: {
          title: {
            en: "The Hidden Trade-offs Behind BOI Incentives",
            ja: "BOIインセンティブに隠されたトレードオフ"
          },
          summary: {
            en: "BOI incentives appear generous on paper but come with implicit expectations: technology transfer, Thai management hiring, and participation as 'showcase projects.' Approximately 30-35% of approved EV projects experience significant delays.",
            ja: "BOIインセンティブは書類上は寛大に見えるが、暗黙の期待が伴う：技術移転、タイ人管理職採用、「ショーケースプロジェクト」としての参加。承認されたEVプロジェクトの約30〜35%が大幅な遅延を経験している。"
          },
          content: {
            en: `BOI incentives appear generous on paper—8-10 years of corporate income tax exemption, import duty waivers, and land subsidies. However, the practical implementation reveals significant hidden costs and expectations that many foreign investors underestimate.

**Implicit Expectations:**
While not legally binding, BOI approval implicitly expects: technology transfer to Thai suppliers within 3-5 years, employment of Thai nationals in management positions (typically 70%+ by year 5), and gradual increase in local content beyond minimum requirements (WaLens interviews with BOI officials, 2024). Companies that fail to meet these unstated expectations face difficulties in subsequent applications for additional activities or expansions.

**The "Showcase Project" Pressure:**
High-profile investments receive expedited approval and enhanced incentives, but come with pressure to participate in government publicity campaigns, host ministerial visits, and serve as "success stories" for future investment promotion. This creates operational disruptions and time commitments that smaller headquarters teams struggle to accommodate.

**Real-World Stalling Patterns:**
Approximately 30-35% of BOI-approved EV projects experience significant delays (>18 months from approval to operational status). Common causes include:
- Underestimated infrastructure requirements (power, water, waste treatment)
- Workforce availability gaps in specialized technical roles
- Supplier qualification timelines exceeding projections
- Internal headquarters approval cycles misaligned with BOI milestones

**The Claw-back Risk:**
BOI incentives can be revoked if companies fail to meet committed investment amounts, employment targets, or export ratios within specified timeframes. While enforcement has historically been lenient, the current administration shows increased willingness to audit and enforce compliance—particularly for projects that receive public attention (BOI Annual Review, 2024).

**Strategic Implication:**
Japanese companies should budget 20-30% contingency on both capital expenditure and implementation timeline when planning BOI-dependent projects. More critically, they should assign dedicated Thai-based resources to manage ongoing BOI relationship and compliance reporting rather than treating it as a one-time application process.`,
            ja: `BOIインセンティブは書類上は寛大に見える——8〜10年の法人税免除、輸入関税免除、土地補助金。しかし、実際の実施には多くの外国投資家が過小評価している隠れたコストと期待が含まれている。

**暗黙の期待：**
法的拘束力はないものの、BOI承認は暗黙のうちに以下を期待している：3〜5年以内のタイサプライヤーへの技術移転、タイ国籍者の経営職への登用（通常5年目までに70%以上）、最低要件を超えるローカルコンテンツの段階的増加（WaLensによるBOI当局者インタビュー、2024年）。これらの暗黙の期待を満たさない企業は、追加活動や拡張の後続申請で困難に直面する。

**「ショーケースプロジェクト」のプレッシャー：**
注目度の高い投資は承認が迅速化され、インセンティブも強化されるが、政府の広報キャンペーンへの参加、閣僚訪問の受け入れ、将来の投資促進のための「成功事例」としての役割を果たすプレッシャーが伴う。これにより、小規模な本社チームでは対応が困難な業務上の混乱と時間的コミットメントが発生する。

**実際のプロジェクト停滞パターン：**
BOI承認を受けたEVプロジェクトの約30〜35%が大幅な遅延（承認から稼働まで18ヶ月以上）を経験している。一般的な原因：
- 過小評価されたインフラ要件（電力、水、廃棄物処理）
- 専門技術職における人材確保のギャップ
- 予測を超えるサプライヤー認定タイムライン
- BOIマイルストーンと整合しない本社内部承認サイクル

**クローバック・リスク：**
指定された期間内に約束された投資額、雇用目標、輸出比率を達成できない場合、BOIインセンティブは取り消される可能性がある。歴史的に執行は寛大であったが、現政権は監査と遵守執行への意欲が高まっている——特に注目を集めるプロジェクトに対して（BOI年次レビュー、2024年）。

**戦略的示唆：**
日本企業は、BOI依存のプロジェクトを計画する際、資本支出と実施タイムラインの両方に20〜30%のコンティンジェンシーを計上すべきである。より重要なのは、一回限りの申請プロセスとして扱うのではなく、継続的なBOI関係管理とコンプライアンス報告を管理するために、タイに拠点を置く専任リソースを配置すべきである。`
          }
        },
        batteryBattlefield: {
          title: {
            en: "Battery as the Real Strategic Battlefield",
            ja: "真の戦略的戦場としてのバッテリー"
          },
          summary: {
            en: "The strategic center of gravity is battery cell production, not EV assembly. Japanese companies face a binary choice: partner with Chinese/Korean cell manufacturers, specialize in components, or wait for solid-state technology breakthrough.",
            ja: "戦略的重心はEV組立ではなくバッテリーセル生産にある。日本企業は二者択一の選択に直面：中国/韓国セルメーカーとの提携、コンポーネント特化、または全固体技術のブレークスルーを待つ。"
          },
          content: {
            en: `The conventional narrative focuses on EV assembly—which OEMs are building plants, what models are being launched. But the strategic center of gravity in Thailand's EV transition is battery manufacturing, specifically cell production. This is where competitive advantage will be won or lost over the next decade.

**Why Battery, Not Assembly, Matters:**
EV assembly is fundamentally a low-margin, commodity-like activity. The vehicle platform, software, and battery determine 70-80% of the vehicle's value and differentiation. Chinese OEMs have demonstrated that assembly operations can be established rapidly (12-18 months) with relatively modest capital requirements ($200-400 million for initial capacity). Battery cell production, in contrast, requires $1-2 billion investment, 3-5 year lead times, and proprietary technology that cannot be easily replicated (BloombergNEF, 2024).

**Thailand's Battery Ecosystem Gap:**
Despite ambitious targets, Thailand currently has no large-scale lithium-ion cell production. All cells are imported—primarily from China (CATL, BYD Battery) with some volumes from Korea (Samsung SDI, LG Energy Solution). The 40% local content requirement by 2027 creates a "forced localization" scenario, but the question is: who will control these local facilities?

**The Japanese Constraint:**
Japanese battery technology (Panasonic, Envision AESC, Toyota's solid-state development) has been historically focused on high-end applications with different chemistry priorities (NMC for range/performance rather than LFP for cost). This creates a technology mismatch with Thailand's emerging market focus, where Chinese LFP cells dominate due to cost advantages of 20-30% (BOT import data analysis, 2024).

**Partnership or Marginalization:**
Japanese companies face a binary strategic choice in Thai battery value chain:
1. **Partnership Path:** Form JVs with Chinese or Korean cell manufacturers, accepting technology dependency in exchange for local production capability
2. **Component Specialization:** Focus on battery management systems, thermal management, and module assembly where Japanese engineering expertise creates value
3. **Wait for Solid-State:** Delay Thailand battery investment while developing next-generation solid-state technology for future market entry

Each path has significant implications for Thailand market position and ASEAN-wide strategy.

**The Recycling Frontier:**
Battery recycling represents an often-overlooked opportunity where Japanese companies could establish early advantage. Thailand will generate significant battery waste volumes by 2028-2030, but currently has minimal processing capability. This is an area where Japanese environmental technology and process expertise could create defensible market position.`,
            ja: `一般的な物語はEV組立に焦点を当てている——どのOEMが工場を建設しているか、どのモデルが発売されているか。しかし、タイのEV転換における戦略的重心はバッテリー製造、特にセル生産にある。これが今後10年で競争優位が勝ち取られるか失われるかを決める場所である。

**組立ではなくバッテリーが重要な理由：**
EV組立は基本的に低マージンのコモディティ的活動である。車両プラットフォーム、ソフトウェア、バッテリーが車両の価値と差別化の70〜80%を決定する。中国OEMは、組立事業が比較的控えめな資本要件（初期キャパシティに2〜4億ドル）で迅速に（12〜18ヶ月）確立できることを実証している。対照的に、バッテリーセル生産には10〜20億ドルの投資、3〜5年のリードタイム、容易に複製できない独自技術が必要である（BloombergNEF、2024年）。

**タイのバッテリーエコシステムのギャップ：**
野心的な目標にもかかわらず、タイには現在大規模なリチウムイオンセル生産がない。すべてのセルは輸入されている——主に中国（CATL、BYD Battery）から、一部は韓国（Samsung SDI、LG Energy Solution）から。2027年までの40%ローカルコンテンツ要件は「強制的な現地化」シナリオを作り出しているが、問題は：これらの現地施設を誰がコントロールするのか？

**日本の制約：**
日本のバッテリー技術（パナソニック、Envision AESC、トヨタの全固体開発）は、歴史的に異なる化学優先事項（コストのためのLFPではなく航続距離/性能のためのNMC）を持つハイエンドアプリケーションに焦点を当ててきた。これにより、タイの新興市場フォーカスとの技術ミスマッチが生じる。そこでは中国製LFPセルが20〜30%のコスト優位性により支配的である（BOT輸入データ分析、2024年）。

**パートナーシップか周縁化か：**
日本企業は、タイバッテリーバリューチェーンにおいて二者択一の戦略的選択に直面している：
1. **パートナーシップパス：** 中国または韓国のセルメーカーとJVを形成し、現地生産能力と引き換えに技術依存を受け入れる
2. **コンポーネント特化：** 日本のエンジニアリング専門知識が価値を生み出すバッテリー管理システム、熱管理、モジュール組立に集中
3. **全固体を待つ：** 次世代全固体技術を開発し将来の市場参入を目指しつつ、タイバッテリー投資を遅らせる

各パスは、タイ市場でのポジションとASEAN全体の戦略に重大な影響を持つ。

**リサイクルのフロンティア：**
バッテリーリサイクルは、日本企業が早期優位性を確立できる見過ごされがちな機会を代表している。タイは2028〜2030年までに大量のバッテリー廃棄物を発生させるが、現在処理能力は最小限である。これは日本の環境技術とプロセス専門知識が防御可能な市場ポジションを創出できる領域である。`
          }
        },
        hqMisreads: {
          title: {
            en: "What Japanese Headquarters Often Misread",
            ja: "日本本社がしばしば誤解すること"
          },
          summary: {
            en: "Five systematic misperceptions appear consistently: timeline compression underestimation, competitor capability dismissal, dealer network overvaluation, technology leadership assumption, and single-country thinking. These share common organizational origins.",
            ja: "5つの系統的誤認識が一貫して現れる：タイムライン圧縮の過小評価、競合能力の軽視、ディーラーネットワークの過大評価、技術リーダーシップの前提、単一国思考。これらは共通の組織的起源を持つ。"
          },
          content: {
            en: `Based on WaLens research and advisory work, several systematic misperceptions consistently appear in Japanese headquarters' understanding of Thailand's EV market. These are not random errors but reflect deeper organizational and cultural patterns that create strategic blind spots.

**Misread #1: Timeline Compression**
Japanese headquarters consistently underestimate the speed of market change in Thailand. Internal planning cycles of 3-5 years are misaligned with a market moving in 12-18 month cycles. Example: A major Japanese OEM's 2022 Thailand EV strategy assumed BEV market share reaching 10% by 2027. Actual 2024 data shows BEV already at 12% and accelerating (OIE registration data). The strategy became obsolete before implementation began.

**Misread #2: Competitor Capability**
Japanese executives often describe Chinese competitors as "low quality" or "unsustainable." Field evidence contradicts this: Chinese EV models in Thailand consistently score high in J.D. Power quality surveys (2024), and customer satisfaction for BYD's Atto 3 rivals Japanese premium brands. The competitive threat is real and growing, not a temporary market distortion.

**Misread #3: Dealer Network Value**
Japanese OEMs in Thailand invested decades building dealer networks with deep customer relationships. However, EV consumers show different purchasing behavior: online research-heavy, brand-agnostic, focused on features and value rather than brand heritage. Chinese OEMs' direct-to-consumer models and shopping mall showrooms are outperforming traditional dealer channels for EV acquisition. The network investment may be a sunk cost rather than competitive advantage in the EV era.

**Misread #4: Technology Leadership Assumption**
Japanese companies often assume their engineering superiority translates to market advantage. In Thailand's EV market, "good enough" technology at lower price points is winning. BYD's Blade Battery and LFP chemistry, while arguably less advanced than Japanese solid-state research, is what customers are buying today. Technology leadership in 2030 matters less than market position in 2025.

**Misread #5: Single-Country Thinking**
Thailand decisions are often made in isolation from ASEAN-wide strategy. However, Thailand's EV investments have implications for Vietnam (emerging EV production), Indonesia (battery materials), and Malaysia (palm oil-based biofuels competing with BEV). A Thailand-only optimization may suboptimize ASEAN-wide positioning.

**Organizational Root Causes:**
These misreads share common organizational origins:
- Risk-averse approval processes that delay market entry
- Language barriers limiting direct Thai market intelligence
- Rotation systems that transfer Thailand-experienced managers before their insights mature
- Headquarters-centric decision making that overweights Japan market experience`,
            ja: `WaLensのリサーチとアドバイザリー業務に基づき、日本本社のタイEV市場理解には、いくつかの系統的な誤認識が一貫して現れている。これらはランダムな誤りではなく、戦略的盲点を生み出すより深い組織的・文化的パターンを反映している。

**誤解#1：タイムライン圧縮**
日本本社は一貫してタイにおける市場変化のスピードを過小評価している。3〜5年の内部計画サイクルは、12〜18ヶ月サイクルで動く市場と整合していない。例：ある大手日系OEMの2022年タイEV戦略は、BEV市場シェアが2027年までに10%に達すると想定していた。2024年の実際のデータは、BEVがすでに12%に達し加速していることを示している（OIE登録データ）。戦略は実施開始前に陳腐化した。

**誤解#2：競合他社の能力**
日本の経営幹部はしばしば中国競合他社を「低品質」または「持続不可能」と表現する。フィールドの証拠はこれに矛盾する：タイの中国製EVモデルはJ.D.Power品質調査（2024年）で一貫して高スコアを獲得しており、BYDのAtto 3に対する顧客満足度は日本のプレミアムブランドに匹敵する。競争上の脅威は現実であり拡大している——一時的な市場の歪みではない。

**誤解#3：ディーラーネットワークの価値**
タイの日系OEMは、深い顧客関係を持つディーラーネットワークの構築に数十年を投資してきた。しかし、EV消費者は異なる購買行動を示す：オンラインリサーチ重視、ブランド不可知論、ブランド遺産よりも機能と価値に焦点。中国OEMのD2Cモデルとショッピングモールのショールームは、EV獲得において従来のディーラーチャネルを上回っている。ネットワーク投資は、EV時代には競争優位ではなく埋没コストである可能性がある。

**誤解#4：技術リーダーシップの前提**
日本企業はしばしば、自社のエンジニアリング優位性が市場優位に転換すると想定する。タイのEV市場では、より低い価格帯での「十分に良い」技術が勝利している。BYDのブレードバッテリーとLFP化学は、日本の全固体研究より技術的に劣るとも言えるが、今日顧客が購入しているものである。2030年の技術リーダーシップは、2025年の市場ポジションよりも重要度が低い。

**誤解#5：単一国思考**
タイの決定はしばしばASEAN全体の戦略から孤立して行われる。しかし、タイのEV投資はベトナム（新興EV生産）、インドネシア（バッテリー材料）、マレーシア（BEVと競合するパーム油ベースのバイオ燃料）に影響を与える。タイのみの最適化は、ASEAN全体のポジショニングを準最適化する可能性がある。

**組織的根本原因：**
これらの誤解には共通の組織的起源がある：
- 市場参入を遅らせるリスク回避的な承認プロセス
- 直接的なタイ市場インテリジェンスを制限する言語障壁
- タイ経験者のインサイトが成熟する前に移動させるローテーションシステム
- 日本市場経験を過大評価する本社中心の意思決定`
          }
        },
        scenarios: {
          title: {
            en: "Strategic Scenarios (2025–2030)",
            ja: "戦略シナリオ（2025〜2030年）"
          },
          summary: {
            en: "Three plausible scenarios: (A) Chinese Consolidation with 60%+ market share, (B) Fragmented Competition with no clear winner, (C) Policy Reversal slowing EV transition. A robust strategy should avoid catastrophic failure in any scenario.",
            ja: "3つのもっともらしいシナリオ：（A）60%以上の市場シェアで中国系統合、（B）明確な勝者なしの分断された競争、（C）EV転換を遅らせる政策反転。堅牢な戦略はいかなるシナリオでも壊滅的失敗を回避すべき。"
          },
          content: {
            en: `Rather than projecting specific market share numbers or sales volumes—which have proven unreliable in rapidly evolving EV markets—this analysis presents three plausible structural scenarios that would require fundamentally different strategic responses.

**Scenario A: Chinese Consolidation**
*Probability: Moderate-High*

In this scenario, Chinese OEMs and battery manufacturers achieve dominant market positions by 2028, leveraging integrated supply chains and aggressive pricing to capture 60%+ of the Thai EV market. Key dynamics:
- CATL and BYD establish local cell production, controlling battery supply
- Chinese OEMs offer leasing models that traditional financing cannot match
- Thai consumers normalize Chinese brands as default EV choice
- Japanese OEMs retain presence primarily in commercial vehicles and export-focused production

Strategic Logic: If this scenario materializes, Japanese companies should pivot to component specialization and infrastructure rather than defending assembly positions. Partnership with Chinese players becomes necessary for market access.

**Scenario B: Fragmented Competition**
*Probability: Moderate*

Market fragments across multiple players with no clear winner. Korean, European, and new ASEAN entrants prevent Chinese dominance while Japanese OEMs maintain meaningful share through hybrid and PHEV offerings. Key dynamics:
- 30@30 policy enforcement proves weak, allowing continued ICE and HEV sales
- Multiple battery suppliers (Chinese, Korean, potentially Indian) create competitive supply landscape
- Thai conglomerates (PTT, Banpu) emerge as kingmakers through charging infrastructure control
- Consumer preferences remain diverse, supporting multiple technology approaches

Strategic Logic: This scenario favors patient, diversified investment across multiple technology platforms and partnerships. No single strategic bet dominates.

**Scenario C: Policy Reversal**
*Probability: Low-Moderate*

Political change or economic pressure leads to weakened EV incentives and prolonged ICE transition period. Key dynamics:
- 2025-2026 political shifts reduce BOI EV incentive generosity
- Global economic slowdown reduces consumer appetite for premium-priced EVs
- Japanese OEMs benefit from pause, using time to strengthen BEV pipeline
- Chinese investment momentum slows but does not reverse

Strategic Logic: This scenario represents the most favorable environment for Japanese incumbents but should not be used as basis for planning. The risk of scenario non-occurrence outweighs the benefit of optimized response.

**Scenario Planning Application:**
Rather than predicting which scenario will occur, Japanese executives should evaluate their current Thailand strategy against all three scenarios. A robust strategy should avoid catastrophic failure in any scenario while positioning for opportunity in the most likely outcomes.`,
            ja: `急速に進化するEV市場では信頼性が低いことが証明されている具体的な市場シェアや販売台数を予測するのではなく、本分析では根本的に異なる戦略的対応を必要とする3つのもっともらしい構造的シナリオを提示する。

**シナリオA：中国系の統合**
*発生確率：中〜高*

このシナリオでは、中国OEMとバッテリーメーカーが2028年までに支配的な市場ポジションを達成し、統合されたサプライチェーンと積極的な価格設定を活用してタイEV市場の60%以上を獲得する。主要な動態：
- CATLとBYDが現地セル生産を確立し、バッテリー供給をコントロール
- 中国OEMが従来の金融では対抗できないリースモデルを提供
- タイ消費者が中国ブランドをデフォルトのEV選択として正規化
- 日系OEMは主に商用車と輸出向け生産でプレゼンスを維持

戦略的ロジック：このシナリオが実現する場合、日本企業は組立ポジションを守るのではなく、コンポーネント特化とインフラにピボットすべきである。市場アクセスのために中国プレイヤーとのパートナーシップが必要になる。

**シナリオB：分断された競争**
*発生確率：中*

市場は明確な勝者なく複数のプレイヤーに分断される。韓国、欧州、新しいASEAN参入者が中国の支配を防ぎ、日系OEMはハイブリッドとPHEVの提供を通じて意味のあるシェアを維持する。主要な動態：
- 30@30政策の執行が弱く、ICEとHEVの販売継続を許容
- 複数のバッテリーサプライヤー（中国、韓国、潜在的にインド）が競争的な供給状況を創出
- タイ財閥（PTT、バンプー）が充電インフラ制御を通じてキングメーカーとして台頭
- 消費者の好みは多様で、複数の技術アプローチを支持

戦略的ロジック：このシナリオは、複数の技術プラットフォームとパートナーシップにわたる忍耐強く多様な投資を好む。単一の戦略的賭けは支配的にならない。

**シナリオC：政策反転**
*発生確率：低〜中*

政治的変化または経済的圧力がEVインセンティブの弱体化とICE移行期間の延長につながる。主要な動態：
- 2025〜2026年の政治的変化がBOI EVインセンティブの寛大さを減少
- 世界経済の減速がプレミアム価格EVへの消費者需要を減少
- 日系OEMは一時停止の恩恵を受け、BEVパイプラインを強化する時間を使用
- 中国投資のモメンタムは減速するが逆転はしない

戦略的ロジック：このシナリオは日系既存企業にとって最も好ましい環境を代表するが、計画の基礎として使用すべきではない。シナリオ非発生のリスクは、最適化された対応の利益を上回る。

**シナリオプランニングの適用：**
どのシナリオが発生するかを予測するのではなく、日本の経営幹部は現在のタイ戦略を3つのシナリオすべてに対して評価すべきである。堅牢な戦略は、いかなるシナリオでも壊滅的な失敗を回避しながら、最も可能性の高い結果において機会に向けたポジションを取るべきである。`
          }
        },
        signalsToWatch: {
          title: {
            en: "Signals to Watch",
            ja: "注視すべきシグナル"
          },
          summary: {
            en: "Six leading indicators for quarterly monitoring: BOI pipeline composition, CATL/BYD local content announcements, consumer financing trends, skilled workforce salary inflation, policy enforcement actions, and Thai conglomerate investment direction.",
            ja: "四半期モニタリングのための6つの先行指標：BOIパイプライン構成、CATL/BYDローカルコンテンツ発表、消費者金融トレンド、熟練労働力給与インフレ、政策執行アクション、タイ財閥の投資方向。"
          },
          content: {
            en: `Strategic decision-making in uncertain environments requires identifying leading indicators that signal market direction before trends become obvious. The following signals should be monitored on a monthly or quarterly basis by Japanese executives responsible for Thailand operations.

**Signal 1: BOI Approval Pipeline Composition**
*What to monitor:* Ratio of Chinese vs Japanese vs other applications in BOI EV promotion pipeline
*Why it matters:* Leading indicator of future competitive landscape. A sustained shift toward Chinese applications signals accelerating market share pressure.
*Current status:* Chinese applications comprise approximately 65-70% of active pipeline (BOI Q4 2024 data)

**Signal 2: CATL/BYD Local Content Announcements**
*What to monitor:* Timeline and scale of cell manufacturing commitments by major Chinese battery makers
*Why it matters:* Once local cell production is established, Chinese OEMs will have structural cost advantage that cannot be easily matched. This is a strategic inflection point.
*Current status:* Both companies have announced intentions but specific factory locations and timelines remain fluid

**Signal 3: Thai Consumer Financing Trends**
*What to monitor:* Interest rates and terms offered by Chinese captive finance companies vs traditional bank auto lending
*Why it matters:* Chinese OEMs are subsidizing consumer financing as market entry tool. When this becomes mainstream, it shifts purchasing dynamics fundamentally.
*Current status:* BYD and Neta offering promotional rates 1-2% below market; not yet scaled to mainstream buyers

**Signal 4: Skilled Workforce Salary Inflation**
*What to monitor:* Year-over-year salary increases for EV-specialized engineers (battery, power electronics, software)
*Why it matters:* Rapid salary inflation indicates demand exceeding supply, creating execution risk for new projects and margin pressure for existing operations.
*Current status:* EV technical roles showing 15-25% annual salary increases; general automotive roles at 5-8% (WaLens compensation survey, 2024)

**Signal 5: Policy Enforcement Actions**
*What to monitor:* BOI audits, incentive claw-backs, and policy compliance enforcement cases
*Why it matters:* Increased enforcement signals government seriousness about 30@30 targets and creates additional compliance costs for all players.
*Current status:* Limited enforcement to date; upcoming 2025 review cycle may change pattern

**Signal 6: Thai Conglomerate Investment Direction**
*What to monitor:* PTT, Banpu, and CP Group strategic announcements in EV ecosystem
*Why it matters:* These groups control critical infrastructure (fuel distribution, power, retail) and their strategic choices will shape the competitive environment.
*Current status:* All three actively investing in charging; PTT most aggressive in upstream battery materials

**Strategic Use of Signals:**
These signals should be incorporated into quarterly Thailand market reviews. When multiple signals move in the same direction simultaneously, it indicates potential need for strategic response rather than incremental adjustment.`,
            ja: `不確実な環境における戦略的意思決定には、トレンドが明白になる前に市場の方向性を示す先行指標の特定が必要である。以下のシグナルは、タイ事業を担当する日本の経営幹部が月次または四半期ベースでモニタリングすべきものである。

**シグナル1：BOI承認パイプラインの構成**
*モニタリング対象：* BOI EV促進パイプラインにおける中国対日本対その他の申請比率
*重要な理由：* 将来の競争環境の先行指標。中国申請への持続的なシフトは、市場シェア圧力の加速を示す。
*現状：* 2024年Q4 BOIデータによると、中国申請がアクティブパイプラインの約65〜70%を占める

**シグナル2：CATL/BYDローカルコンテンツ発表**
*モニタリング対象：* 主要中国バッテリーメーカーによるセル製造コミットメントのタイムラインと規模
*重要な理由：* 現地セル生産が確立されると、中国OEMは容易にマッチできない構造的コスト優位を持つ。これは戦略的転換点である。
*現状：* 両社とも意図を発表しているが、具体的な工場立地とタイムラインは流動的

**シグナル3：タイ消費者金融トレンド**
*モニタリング対象：* 中国キャプティブファイナンス会社対従来の銀行自動車融資が提供する金利と条件
*重要な理由：* 中国OEMは市場参入ツールとして消費者金融を補助金化している。これがメインストリームになると、購買動態が根本的に変化する。
*現状：* BYDとNetaが市場より1〜2%低いプロモーション金利を提供；まだメインストリーム購入者にはスケールしていない

**シグナル4：熟練労働力の給与インフレ**
*モニタリング対象：* EV専門エンジニア（バッテリー、パワーエレクトロニクス、ソフトウェア）の前年比給与増加
*重要な理由：* 急速な給与インフレは需要が供給を超えていることを示し、新規プロジェクトの実行リスクと既存事業のマージン圧力を生む。
*現状：* EV技術職は年間15〜25%の給与増加；一般自動車職は5〜8%（WaLens報酬調査、2024年）

**シグナル5：政策執行アクション**
*モニタリング対象：* BOI監査、インセンティブクローバック、政策コンプライアンス執行事例
*重要な理由：* 執行強化は政府の30@30目標への本気度を示し、すべてのプレイヤーに追加のコンプライアンスコストを生む。
*現状：* これまで執行は限定的；2025年のレビューサイクルでパターンが変化する可能性

**シグナル6：タイ財閥の投資方向**
*モニタリング対象：* PTT、バンプー、CPグループのEVエコシステムにおける戦略発表
*重要な理由：* これらのグループは重要インフラ（燃料流通、電力、小売）をコントロールしており、彼らの戦略的選択が競争環境を形成する。
*現状：* 3社とも充電に積極投資；PTTは上流バッテリー材料で最も積極的

**シグナルの戦略的活用：**
これらのシグナルは四半期ごとのタイ市場レビューに組み込まれるべきである。複数のシグナルが同時に同じ方向に動く場合、漸進的な調整ではなく戦略的対応の必要性を示している可能性がある。`
          }
        }
      }
    },
    // Data Appendix
    dataAppendix: {
      title: { en: "Data Appendix (Premium Reference)", ja: "データ付録（プレミアム参考資料）" },
      tables: {
        investmentTimeline: {
          title: { en: "Major EV Investment Timeline (2022-2025)", ja: "主要EV投資タイムライン（2022-2025）" },
          data: [
            { year: "2022", company: "BYD", type: isJapanese ? "EV組立工場" : "EV Assembly Plant", value: "$500M", status: isJapanese ? "稼働中" : "Operational" },
            { year: "2023", company: "Great Wall", type: isJapanese ? "EV・バッテリー" : "EV + Battery", value: "$770M", status: isJapanese ? "稼働中" : "Operational" },
            { year: "2023", company: "CATL", type: isJapanese ? "バッテリーパック" : "Battery Pack", value: "$120M", status: isJapanese ? "計画中" : "Planned" },
            { year: "2024", company: "Foxconn", type: isJapanese ? "EV製造" : "EV Manufacturing", value: "$1.0B", status: isJapanese ? "建設中" : "Under Construction" },
            { year: "2024", company: "SAIC-MG", type: isJapanese ? "生産能力拡大" : "Capacity Expansion", value: "$300M", status: isJapanese ? "計画中" : "Planned" },
            { year: "2025", company: "Changan", type: isJapanese ? "EV組立" : "EV Assembly", value: "$450M", status: isJapanese ? "発表済み" : "Announced" }
          ]
        },
        boiApprovals: {
          title: { en: "BOI EV Approvals by Origin Country (2023-2024)", ja: "出身国別BOI EV承認（2023-2024）" },
          data: [
            { country: isJapanese ? "中国" : "China", projects2023: 12, projects2024: 18, value2024: "$2.1B", share: "52%" },
            { country: isJapanese ? "日本" : "Japan", projects2023: 5, projects2024: 4, value2024: "$680M", share: "17%" },
            { country: isJapanese ? "韓国" : "Korea", projects2023: 3, projects2024: 5, value2024: "$520M", share: "13%" },
            { country: isJapanese ? "欧州" : "Europe", projects2023: 2, projects2024: 3, value2024: "$380M", share: "9%" },
            { country: isJapanese ? "その他" : "Others", projects2023: 4, projects2024: 6, value2024: "$360M", share: "9%" }
          ]
        },
        evShareTrend: {
          title: { en: "Thailand EV Market Share Trend", ja: "タイEV市場シェアトレンド" },
          data: [
            { year: "2021", bevShare: "0.8%", hevShare: "8.2%", totalNew: "750K" },
            { year: "2022", bevShare: "2.1%", hevShare: "9.5%", totalNew: "820K" },
            { year: "2023", bevShare: "6.8%", hevShare: "11.2%", totalNew: "880K" },
            { year: "2024", bevShare: "12.4%", hevShare: "12.8%", totalNew: "920K" },
            { year: "2025F", bevShare: "18-22%", hevShare: "13-15%", totalNew: "950K" }
          ]
        },
        batteryDependency: {
          title: { en: "Battery Cell Import Dependency (2024)", ja: "バッテリーセル輸入依存（2024）" },
          data: [
            { source: isJapanese ? "中国" : "China", share: "72%", mainPlayers: "CATL, BYD, CALB" },
            { source: isJapanese ? "韓国" : "Korea", share: "18%", mainPlayers: "Samsung SDI, LG ES" },
            { source: isJapanese ? "日本" : "Japan", share: "6%", mainPlayers: "Panasonic, Envision" },
            { source: isJapanese ? "その他" : "Others", share: "4%", mainPlayers: isJapanese ? "各種" : "Various" }
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
          "Office of Industrial Economics (OIE) - Vehicle registration and production data",
          "BloombergNEF - Global battery market analysis",
          "J.D. Power Thailand - Customer satisfaction surveys (2024)",
          "WaLens primary research - Interviews with industry executives and policymakers (Q4 2024)"
        ],
        ja: [
          "タイ投資委員会（BOI）- 投資統計および政策文書（2024年）",
          "東部経済回廊事務局 - EEC開発レポートおよびゾーンデータ",
          "タイ工業省 - 工業生産統計",
          "タイ産業連盟 - 産業調査および会員データ",
          "タイ中央銀行 - 自動車セクター輸出入統計",
          "工業経済事務局（OIE）- 車両登録・生産データ",
          "BloombergNEF - グローバルバッテリー市場分析",
          "J.D.Power タイ - 顧客満足度調査（2024年）",
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
        title: isJapanese ? content.ceoBrief.title.ja : content.ceoBrief.title.en,
        content: `<p><strong>${isJapanese ? 'キーメッセージ' : 'Key Message'}:</strong> ${isJapanese ? content.ceoBrief.keyMessage.ja : content.ceoBrief.keyMessage.en}</p>`
      },
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
      },
      // Deep-Dive sections for PDF
      {
        title: isJapanese ? content.deepDive.title.ja : content.deepDive.title.en,
        content: Object.values(content.deepDive.sections).map(section => 
          `<h3>${isJapanese ? section.title.ja : section.title.en}</h3><p>${(isJapanese ? section.content.ja : section.content.en).replace(/\n/g, '<br>')}</p>`
        ).join('<br><br>')
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTocOpen(false);
  };

  const getConfidenceBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <Badge className="bg-green-500/10 text-green-600 border-green-200">{isJapanese ? '高確信' : 'High'}</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-200">{isJapanese ? '中確信' : 'Medium'}</Badge>;
      case 'uncertain':
        return <Badge className="bg-red-500/10 text-red-600 border-red-200">{isJapanese ? '不確実' : 'Uncertain'}</Badge>;
      default:
        return null;
    }
  };

  const getCompanyTypeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return Car;
      case 'Package': return Package;
      case 'Briefcase': return Briefcase;
      case 'Rocket': return Rocket;
      default: return Building;
    }
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

  // Premium CTA Box
  const PremiumCTA = () => (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 my-8">
      <CardContent className="p-6 text-center">
        <Lock className="h-8 w-8 mx-auto mb-3 text-primary" />
        <h3 className="text-lg font-semibold mb-2">
          {isJapanese ? "さらに深いインサイトを得る" : "Get Deeper Insights"}
        </h3>
        <p className="text-muted-foreground mb-4 text-sm">
          {isJapanese 
            ? "プレミアムメンバーは全セクション・データ付録・PDFダウンロードにアクセス可能" 
            : "Premium members get full access to all sections, data appendix, and PDF download"}
        </p>
        {!user ? (
          <Button onClick={() => setIsSignUpOpen(true)}>
            {isJapanese ? "無料トライアルを開始" : "Start Free Trial"}
          </Button>
        ) : (
          <Button asChild>
            <Link to="/subscribe">
              {isJapanese ? "プレミアムにアップグレード" : "Upgrade to Premium"}
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );

  // Deep Dive Section Component with collapsible
  const DeepDiveSection = ({ 
    icon: Icon, 
    title, 
    summary,
    content,
    sectionKey
  }: { 
    icon: React.ElementType; 
    title: string; 
    summary: string;
    content: string; 
    sectionKey: string;
  }) => {
    const isExpanded = expandedDeepDive === sectionKey || deepDiveMode === 'full';
    const showContent = deepDiveMode !== 'summary' || isExpanded;

    return (
      <Card className="mb-4">
        <Collapsible open={showContent} onOpenChange={() => {
          if (deepDiveMode === 'summary') {
            setExpandedDeepDive(isExpanded ? null : sectionKey);
          }
        }}>
          <CardHeader className="pb-3">
            <CollapsibleTrigger className="w-full text-left">
              <div className="flex items-start gap-3">
                <Icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <CardTitle className="text-base md:text-lg flex items-center justify-between gap-2">
                    <span>{title}</span>
                    {deepDiveMode === 'summary' && (
                      showContent ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{summary}</p>
                  {!showContent && (
                    <Button variant="link" className="p-0 h-auto text-primary text-sm mt-2">
                      {isJapanese ? "続きを読む →" : "Read more →"}
                    </Button>
                  )}
                </div>
              </div>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <Separator className="mb-4" />
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {content.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <h4 key={i} className="font-bold text-primary mt-4 mb-2">{paragraph.replace(/\*\*/g, '')}</h4>;
                  }
                  if (paragraph.startsWith('**')) {
                    const parts = paragraph.split('**');
                    return (
                      <p key={i} className="mb-3 leading-relaxed">
                        {parts.map((part, j) => 
                          j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part
                        )}
                      </p>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                    return (
                      <ul key={i} className="list-disc pl-5 mb-3 space-y-1">
                        {items.map((item, j) => (
                          <li key={j} className="text-muted-foreground">{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.startsWith('*') && paragraph.includes('*') && !paragraph.startsWith('**')) {
                    return <p key={i} className="text-sm italic text-muted-foreground mb-3">{paragraph.replace(/\*/g, '')}</p>;
                  }
                  return <p key={i} className="mb-3 leading-relaxed text-muted-foreground">{paragraph}</p>;
                })}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    );
  };

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
        
        <main className="container mx-auto px-4 py-6 md:py-8">
          <Breadcrumb items={[
            { label: isJapanese ? 'インサイト' : 'Insights', href: '/insights' },
            { label: isJapanese ? '製造業' : 'Manufacturing', href: '/insights/manufacturing' },
            { label: isJapanese ? 'EV・バッテリー産業' : 'EV & Battery Industry' }
          ]} />

          {/* Floating TOC Button (Mobile) */}
          <div className="fixed bottom-4 right-4 z-50 md:hidden">
            <Collapsible open={tocOpen} onOpenChange={setTocOpen}>
              <CollapsibleTrigger asChild>
                <Button size="lg" className="rounded-full shadow-lg">
                  <Menu className="h-5 w-5" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="absolute bottom-14 right-0 w-64 bg-background border rounded-lg shadow-xl p-2">
                <nav className="space-y-1">
                  {tocSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Desktop TOC Sidebar */}
          <div className="hidden lg:block fixed left-4 top-32 w-48 z-40">
            <Card className="p-3">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                {isJapanese ? '目次' : 'Contents'}
              </p>
              <nav className="space-y-1">
                {tocSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="w-full text-left px-2 py-1.5 text-xs rounded hover:bg-muted transition-colors"
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Cover Section */}
          <section className="mb-8 md:mb-12 mt-6 md:mt-8">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-background to-primary/5 border p-6 md:p-12">
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
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {isJapanese ? content.title.ja : content.title.en}
                </h1>
                
                <div className="flex flex-wrap gap-3 md:gap-4 text-sm text-muted-foreground mt-4 md:mt-6">
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

          {/* CEO Brief Section */}
          <section id="ceo-brief" className="mb-8 md:mb-12">
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                  <Target className="h-6 w-6 text-primary" />
                  {isJapanese ? content.ceoBrief.title.ja : content.ceoBrief.title.en}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Message */}
                <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {isJapanese ? "キーメッセージ" : "Key Message"}
                  </p>
                  <p className="text-base md:text-lg font-semibold">
                    {isJapanese ? content.ceoBrief.keyMessage.ja : content.ceoBrief.keyMessage.en}
                  </p>
                </div>

                {/* HQ Decision Checklist */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    {isJapanese ? content.ceoBrief.hqChecklist.title.ja : content.ceoBrief.hqChecklist.title.en}
                  </h4>
                  <ul className="space-y-2">
                    {(isJapanese ? content.ceoBrief.hqChecklist.items.ja : content.ceoBrief.hqChecklist.items.en).map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="text-primary font-bold">{i + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 30/60/90 Day Actions */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    {isJapanese ? content.ceoBrief.recommendedActions.title.ja : content.ceoBrief.recommendedActions.title.en}
                  </h4>
                  <div className="grid gap-3">
                    {(isJapanese ? content.ceoBrief.recommendedActions.items.ja : content.ceoBrief.recommendedActions.items.en).map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <Badge variant="outline" className="shrink-0 font-mono">
                          {item.timeline}
                        </Badge>
                        <span className="text-sm">{item.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Executive Summary - Always visible */}
          <section id="executive-summary" className="mb-8 md:mb-12">
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

          {/* Premium CTA after Executive Summary */}
          {!hasFullAccess && <PremiumCTA />}

          {/* Industry Snapshot */}
          <section id="industry-snapshot" className="mb-8 md:mb-12">
            {hasFullAccess ? (
              <>
                <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
                  <Factory className="h-6 w-6" />
                  {isJapanese ? content.marketStructure.title.ja : content.marketStructure.title.en}
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {isJapanese ? "市場セグメント" : "Market Segments"}
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

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
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
                </div>
              </>
            ) : (
              <BlurredContent>
                <h2 className="text-xl md:text-2xl font-bold mb-6">
                  {isJapanese ? content.marketStructure.title.ja : content.marketStructure.title.en}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="h-64" />
                  <Card className="h-64" />
                </div>
              </BlurredContent>
            )}
          </section>

          {/* Policy & Regulation */}
          <section id="policy-regulation" className="mb-8 md:mb-12">
            {hasFullAccess ? (
              <>
                <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  {isJapanese ? content.policyInsights.title.ja : content.policyInsights.title.en}
                </h2>
                
                <div className="space-y-4">
                  {(isJapanese ? content.policyInsights.items.ja : content.policyInsights.items.en).map((item, i) => (
                    <Card key={i}>
                      <CardContent className="p-4 md:p-6">
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
                        <p className="text-xs text-muted-foreground mt-3 italic">
                          {isJapanese ? "出典" : "Source"}: {item.citation}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <BlurredContent>
                <h2 className="text-xl md:text-2xl font-bold mb-6">
                  {isJapanese ? content.policyInsights.title.ja : content.policyInsights.title.en}
                </h2>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="h-32" />
                  ))}
                </div>
              </BlurredContent>
            )}
          </section>

          {/* Opportunities & Risks */}
          <section id="opportunities-risks" className="mb-8 md:mb-12">
            {hasFullAccess ? (
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
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
            ) : (
              <BlurredContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="h-64" />
                  <Card className="h-64" />
                </div>
              </BlurredContent>
            )}
          </section>

          {/* Company Type Implications */}
          <section id="company-type-implications" className="mb-8 md:mb-12">
            {hasFullAccess ? (
              <>
                <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  {isJapanese ? content.companyTypeImplications.title.ja : content.companyTypeImplications.title.en}
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  {(isJapanese ? content.companyTypeImplications.types.ja : content.companyTypeImplications.types.en).map((type, i) => {
                    const Icon = getCompanyTypeIcon(type.icon);
                    return (
                      <Card key={i}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Icon className="h-5 w-5 text-primary" />
                            {type.type}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-green-600 mb-2">{isJapanese ? "機会" : "Opportunities"}</p>
                            <ul className="text-sm space-y-1">
                              {type.opportunities.map((opp, j) => (
                                <li key={j} className="flex gap-2">
                                  <span className="text-green-500">•</span>
                                  <span className="text-muted-foreground">{opp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-red-600 mb-2">{isJapanese ? "リスク" : "Risks"}</p>
                            <ul className="text-sm space-y-1">
                              {type.risks.map((risk, j) => (
                                <li key={j} className="flex gap-2">
                                  <span className="text-red-500">•</span>
                                  <span className="text-muted-foreground">{risk}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-primary mb-2">{isJapanese ? "推奨アクション" : "Recommended Actions"}</p>
                            <ul className="text-sm space-y-1">
                              {type.actions.map((action, j) => (
                                <li key={j} className="flex gap-2">
                                  <span className="text-primary">→</span>
                                  <span className="text-muted-foreground">{action}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </>
            ) : (
              <BlurredContent>
                <h2 className="text-xl md:text-2xl font-bold mb-6">
                  {isJapanese ? content.companyTypeImplications.title.ja : content.companyTypeImplications.title.en}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="h-80" />
                  ))}
                </div>
              </BlurredContent>
            )}
          </section>

          {/* Strategic Implications */}
          <section id="strategic-implications" className="mb-8 md:mb-12">
            {hasFullAccess ? (
              <>
                <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
                  <Globe className="h-6 w-6" />
                  {isJapanese ? content.strategicImplications.title.ja : content.strategicImplications.title.en}
                </h2>

                <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
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
                      <div className="space-y-3">
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
              </>
            ) : (
              <BlurredContent>
                <h2 className="text-xl md:text-2xl font-bold mb-6">
                  {isJapanese ? content.strategicImplications.title.ja : content.strategicImplications.title.en}
                </h2>
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="h-64" />
                  <Card className="h-64" />
                </div>
              </BlurredContent>
            )}
          </section>

          {/* Confidence & Assumptions */}
          <section id="confidence-assumptions" className="mb-8 md:mb-12">
            {hasFullAccess ? (
              <>
                <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
                  <HelpCircle className="h-6 w-6" />
                  {isJapanese ? content.confidenceAssumptions.title.ja : content.confidenceAssumptions.title.en}
                </h2>
                
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-4">
                      {(isJapanese ? content.confidenceAssumptions.items.ja : content.confidenceAssumptions.items.en).map((item, i) => (
                        <div key={i} className="p-4 border rounded-lg">
                          <div className="flex items-start gap-3 mb-2">
                            {getConfidenceBadge(item.level)}
                            <p className="font-medium flex-1">{item.statement}</p>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2 ml-16">
                            <strong>{isJapanese ? "根拠" : "Rationale"}:</strong> {item.rationale}
                          </p>
                          <p className="text-sm text-primary ml-16">
                            <strong>{isJapanese ? "注視すべきシグナル" : "Signals to watch"}:</strong> {item.signals}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <BlurredContent>
                <h2 className="text-xl md:text-2xl font-bold mb-6">
                  {isJapanese ? content.confidenceAssumptions.title.ja : content.confidenceAssumptions.title.en}
                </h2>
                <Card className="h-64" />
              </BlurredContent>
            )}
          </section>

          {/* Deep-Dive Analysis Section */}
          <section id="deep-dive" className="mb-8 md:mb-12">
            {hasFullAccess ? (
              <>
                <div className="mb-6">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-3">
                    <Lightbulb className="h-7 w-7 text-primary" />
                    {isJapanese ? content.deepDive.title.ja : content.deepDive.title.en}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    {isJapanese 
                      ? "タイEV産業の構造的変革についての詳細分析です。読み方を選択してください。"
                      : "Detailed analysis on Thailand's EV industry structural transformation. Choose your reading mode."}
                  </p>
                  
                  {/* Reading Mode Selector */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Button
                      variant={deepDiveMode === 'summary' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setDeepDiveMode('summary')}
                      className="flex items-center gap-2"
                    >
                      <Clock className="h-4 w-4" />
                      {isJapanese ? content.deepDive.readingModes.summary.ja : content.deepDive.readingModes.summary.en}
                    </Button>
                    <Button
                      variant={deepDiveMode === 'deep' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setDeepDiveMode('deep')}
                      className="flex items-center gap-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      {isJapanese ? content.deepDive.readingModes.deep.ja : content.deepDive.readingModes.deep.en}
                    </Button>
                    <Button
                      variant={deepDiveMode === 'full' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setDeepDiveMode('full')}
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      {isJapanese ? content.deepDive.readingModes.full.ja : content.deepDive.readingModes.full.en}
                    </Button>
                  </div>
                </div>

                <DeepDiveSection 
                  icon={Globe}
                  title={isJapanese ? content.deepDive.sections.whyDifferent.title.ja : content.deepDive.sections.whyDifferent.title.en}
                  summary={isJapanese ? content.deepDive.sections.whyDifferent.summary.ja : content.deepDive.sections.whyDifferent.summary.en}
                  content={isJapanese ? content.deepDive.sections.whyDifferent.content.ja : content.deepDive.sections.whyDifferent.content.en}
                  sectionKey="whyDifferent"
                />

                <DeepDiveSection 
                  icon={Shield}
                  title={isJapanese ? content.deepDive.sections.boiTradeoffs.title.ja : content.deepDive.sections.boiTradeoffs.title.en}
                  summary={isJapanese ? content.deepDive.sections.boiTradeoffs.summary.ja : content.deepDive.sections.boiTradeoffs.summary.en}
                  content={isJapanese ? content.deepDive.sections.boiTradeoffs.content.ja : content.deepDive.sections.boiTradeoffs.content.en}
                  sectionKey="boiTradeoffs"
                />

                <DeepDiveSection 
                  icon={Battery}
                  title={isJapanese ? content.deepDive.sections.batteryBattlefield.title.ja : content.deepDive.sections.batteryBattlefield.title.en}
                  summary={isJapanese ? content.deepDive.sections.batteryBattlefield.summary.ja : content.deepDive.sections.batteryBattlefield.summary.en}
                  content={isJapanese ? content.deepDive.sections.batteryBattlefield.content.ja : content.deepDive.sections.batteryBattlefield.content.en}
                  sectionKey="batteryBattlefield"
                />

                <DeepDiveSection 
                  icon={Target}
                  title={isJapanese ? content.deepDive.sections.hqMisreads.title.ja : content.deepDive.sections.hqMisreads.title.en}
                  summary={isJapanese ? content.deepDive.sections.hqMisreads.summary.ja : content.deepDive.sections.hqMisreads.summary.en}
                  content={isJapanese ? content.deepDive.sections.hqMisreads.content.ja : content.deepDive.sections.hqMisreads.content.en}
                  sectionKey="hqMisreads"
                />

                <DeepDiveSection 
                  icon={BarChart3}
                  title={isJapanese ? content.deepDive.sections.scenarios.title.ja : content.deepDive.sections.scenarios.title.en}
                  summary={isJapanese ? content.deepDive.sections.scenarios.summary.ja : content.deepDive.sections.scenarios.summary.en}
                  content={isJapanese ? content.deepDive.sections.scenarios.content.ja : content.deepDive.sections.scenarios.content.en}
                  sectionKey="scenarios"
                />

                <DeepDiveSection 
                  icon={Eye}
                  title={isJapanese ? content.deepDive.sections.signalsToWatch.title.ja : content.deepDive.sections.signalsToWatch.title.en}
                  summary={isJapanese ? content.deepDive.sections.signalsToWatch.summary.ja : content.deepDive.sections.signalsToWatch.summary.en}
                  content={isJapanese ? content.deepDive.sections.signalsToWatch.content.ja : content.deepDive.sections.signalsToWatch.content.en}
                  sectionKey="signalsToWatch"
                />
              </>
            ) : (
              <BlurredContent>
                <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
                  <Lightbulb className="h-6 w-6" />
                  {isJapanese ? content.deepDive.title.ja : content.deepDive.title.en}
                </h2>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="h-32" />
                  ))}
                </div>
              </BlurredContent>
            )}
          </section>

          {/* Premium CTA before Data Appendix */}
          {!hasFullAccess && <PremiumCTA />}

          {/* Data Appendix */}
          <section id="data-appendix" className="mb-8 md:mb-12">
            {hasFullAccess ? (
              <>
                <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
                  <Database className="h-6 w-6" />
                  {isJapanese ? content.dataAppendix.title.ja : content.dataAppendix.title.en}
                </h2>
                
                <div className="grid gap-6">
                  {/* Investment Timeline Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {isJapanese ? content.dataAppendix.tables.investmentTimeline.title.ja : content.dataAppendix.tables.investmentTimeline.title.en}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">{isJapanese ? "年" : "Year"}</th>
                              <th className="text-left p-2">{isJapanese ? "企業" : "Company"}</th>
                              <th className="text-left p-2">{isJapanese ? "タイプ" : "Type"}</th>
                              <th className="text-right p-2">{isJapanese ? "金額" : "Value"}</th>
                              <th className="text-right p-2">{isJapanese ? "ステータス" : "Status"}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {content.dataAppendix.tables.investmentTimeline.data.map((row, i) => (
                              <tr key={i} className="border-b">
                                <td className="p-2">{row.year}</td>
                                <td className="p-2 font-medium">{row.company}</td>
                                <td className="p-2">{row.type}</td>
                                <td className="p-2 text-right">{row.value}</td>
                                <td className="p-2 text-right">
                                  <Badge variant="outline" className="text-xs">{row.status}</Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* BOI Approvals Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {isJapanese ? content.dataAppendix.tables.boiApprovals.title.ja : content.dataAppendix.tables.boiApprovals.title.en}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">{isJapanese ? "国" : "Country"}</th>
                              <th className="text-right p-2">2023</th>
                              <th className="text-right p-2">2024</th>
                              <th className="text-right p-2">{isJapanese ? "2024金額" : "2024 Value"}</th>
                              <th className="text-right p-2">{isJapanese ? "シェア" : "Share"}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {content.dataAppendix.tables.boiApprovals.data.map((row, i) => (
                              <tr key={i} className="border-b">
                                <td className="p-2 font-medium">{row.country}</td>
                                <td className="p-2 text-right">{row.projects2023}</td>
                                <td className="p-2 text-right">{row.projects2024}</td>
                                <td className="p-2 text-right">{row.value2024}</td>
                                <td className="p-2 text-right font-bold">{row.share}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* EV Share Trend */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {isJapanese ? content.dataAppendix.tables.evShareTrend.title.ja : content.dataAppendix.tables.evShareTrend.title.en}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2">{isJapanese ? "年" : "Year"}</th>
                                <th className="text-right p-2">BEV</th>
                                <th className="text-right p-2">HEV</th>
                                <th className="text-right p-2">{isJapanese ? "新車計" : "Total New"}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {content.dataAppendix.tables.evShareTrend.data.map((row, i) => (
                                <tr key={i} className="border-b">
                                  <td className="p-2">{row.year}</td>
                                  <td className="p-2 text-right text-green-600">{row.bevShare}</td>
                                  <td className="p-2 text-right text-blue-600">{row.hevShare}</td>
                                  <td className="p-2 text-right">{row.totalNew}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Battery Dependency */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {isJapanese ? content.dataAppendix.tables.batteryDependency.title.ja : content.dataAppendix.tables.batteryDependency.title.en}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2">{isJapanese ? "国" : "Source"}</th>
                                <th className="text-right p-2">{isJapanese ? "シェア" : "Share"}</th>
                                <th className="text-left p-2">{isJapanese ? "主要企業" : "Main Players"}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {content.dataAppendix.tables.batteryDependency.data.map((row, i) => (
                                <tr key={i} className="border-b">
                                  <td className="p-2 font-medium">{row.source}</td>
                                  <td className="p-2 text-right font-bold">{row.share}</td>
                                  <td className="p-2 text-muted-foreground">{row.mainPlayers}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            ) : (
              <BlurredContent>
                <h2 className="text-xl md:text-2xl font-bold mb-6">
                  {isJapanese ? content.dataAppendix.title.ja : content.dataAppendix.title.en}
                </h2>
                <div className="grid gap-6">
                  <Card className="h-48" />
                  <Card className="h-48" />
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="h-48" />
                    <Card className="h-48" />
                  </div>
                </div>
              </BlurredContent>
            )}
          </section>

          {/* Sources & Methodology */}
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
          <Separator className="my-6 md:my-8" />
          
          <section className="mb-8 md:mb-12">
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
