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
  UtensilsCrossed,
  Beaker,
  Globe
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const FoodIndustry = () => {
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
        'food-industry',
        isJapanese ? 'タイ次世代フード産業レポート' : 'Thailand Next-Generation Food Industry Report',
        'agriculture',
        lang
      );
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker('food-industry', 'Thailand Next-Generation Food Industry Report', 'タイ次世代フード産業レポート', 'Agriculture', hasFullAccess);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(
        'food-industry',
        isJapanese ? 'タイ次世代フード産業レポート' : 'Thailand Next-Generation Food Industry Report',
        'agriculture',
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
    { id: 'facts', label: isJapanese ? '市場・政策・動向に関する情報' : 'Facts (Market, Policy & Trends)' },
    { id: 'opinion', label: isJapanese ? 'WaLensの見解と示唆' : 'Opinion & Implication from WaLens' },
    { id: 'recommendation', label: isJapanese ? '日本企業経営者への提言' : 'Recommendation for Japanese Executives' },
    { id: 'data-appendix', label: isJapanese ? 'データ付録' : 'Data Appendix' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: {
      en: "Thailand's Food Revolution: From 'Kitchen of the World' to 'Pharmacy of the World'",
      ja: "タイの食品革命：「世界の台所」から「世界の薬局」への変貌"
    },
    subheadline: {
      en: "Future Food, Halal hub strategy, and functional ingredients — the next-generation opportunities for Japanese enterprises",
      ja: "フューチャーフード・ハラール戦略・機能性食品——日系企業の次世代ビジネス機会"
    },
    category: {
      en: "Agriculture / Future Food",
      ja: "農業 / フューチャーフード"
    },
    lastUpdated: "2026-02-08",
    // ── Section 1: Executive Summary ──
    executiveSummary: {
      en: [
        "Thailand is pivoting from commodity-based food exports to value-added 'Future Food' — functional ingredients, alternative proteins, and medical nutrition — targeting ¥500 billion+ in new market creation by 2030. (Doc: Executive Summary / Key Strategic Insights)",
        "The Super-Aged Society transition (20%+ aged 65+ by 2030) creates a massive 'Silver Economy' for medical foods and personalized nutrition, directly aligning with Japan's mature capabilities in UDF (Universal Design Food) and clinical nutrition. (Doc: Megatrend 1 / Hyper-Aging Society)",
        "Thailand's strategic push to become a top-5 global Halal exporter offers Japanese firms a 'Thailand Bypass' — producing Halal-certified Japanese products on Thai soil using CICOT certification to access the $2.5 trillion Islamic market duty-free. (Doc: Pillar I / Section 3.3)",
        "BOI incentives for Future Food (Category 1.17) offer 5–8 year CIT exemptions; Biotechnology (1.14) provides 10–13 years. Combined with the BCG economy framework, these represent the most favorable entry conditions in ASEAN. (Doc: Section 3.4 / BOI Incentives)",
        "Labor shortages are driving food manufacturing automation — Japanese machinery makers (Ishida, Satake) can shift from standalone equipment to integrated Smart Factory solutions with traceability and predictive maintenance. (Doc: Pillar III / Section 5.1)"
      ],
      ja: [
        "タイはコモディティ型食品輸出から高付加価値「フューチャーフード」——機能性食品原料、代替タンパク質、医療用栄養食品——へとピボットし、2030年までに5,000億円超の新市場創出を目指す。（Doc: エグゼクティブサマリー / Key Strategic Insights）",
        "超高齢社会への移行（2030年までに65歳以上が20%超）は、医療用食品・パーソナライズド栄養における巨大な「シルバーエコノミー」を創出し、UDF（ユニバーサルデザインフード）・臨床栄養における日本の成熟した技術力と直接的に合致する。（Doc: メガトレンド1 / 超高齢社会）",
        "タイのハラール食品輸出トップ5入り戦略は、日系企業に「タイランド・バイパス」——タイ国内でCICOT認証を活用し、ハラール認証済み日本食品を製造、2.5兆ドルのイスラム市場に無関税でアクセス——を提供する。（Doc: 第3章 / セクション3.3）",
        "BOIのフューチャーフード優遇（カテゴリー1.17）は5〜8年の法人税免除、バイオテクノロジー（1.14）は10〜13年を提供。BCG経済フレームワークと合わせ、ASEAN域内で最も有利な参入条件を構成する。（Doc: セクション3.4 / BOI優遇措置）",
        "労働力不足が食品製造の自動化を推進——日系機械メーカー（イシダ、サタケ）は単体設備からトレーサビリティ・予知保全を統合したスマートファクトリーソリューションへの転換が可能。（Doc: 第5章 / セクション5.1）"
      ]
    },
    // ── Section 2: Facts ──
    marketStructure: {
      title: { en: "Market Structure: Thailand's Food Industry Transformation", ja: "市場構造：タイ食品産業の変革" },
      segments: {
        en: [
          { name: "Medical Foods (Clinical Nutrition)", share: "Growing", growth: "High NCD burden", players: "Imported products dominant; local production nascent" },
          { name: "Functional Ingredients (Bio-Extracts)", share: "Emerging", growth: "CAGR ~15%", players: "Thai raw materials, Japanese fermentation/extraction tech" },
          { name: "Alternative Proteins", share: "THB 6.5B+", growth: "+20% YoY", players: "Thai Union (OMG Meat), insect protein farms" },
          { name: "Halal Export Hub", share: "$7.1B to OIC", growth: "Strategic priority", players: "CICOT-certified processors, new Saudi channel" },
          { name: "Smart Packaging / Green Packaging", share: "USD 14.5B (Smart Home adjacent)", growth: "CAGR 30.6%", players: "Mitsubishi Chemical, Fuji Seal, Thai bioplastics" }
        ],
        ja: [
          { name: "医療用食品（臨床栄養）", share: "成長中", growth: "NCD負担増大", players: "輸入品が支配的、国内生産は黎明期" },
          { name: "機能性食品原料（バイオ抽出物）", share: "新興市場", growth: "CAGR 約15%", players: "タイ原材料＋日本の発酵・抽出技術" },
          { name: "代替タンパク質", share: "65億バーツ超", growth: "+20% YoY", players: "Thai Union（OMG Meat）、昆虫タンパク農場" },
          { name: "ハラール輸出ハブ", share: "OIC向け71億ドル", growth: "戦略的優先事項", players: "CICOT認証加工業者、サウジ新チャネル" },
          { name: "スマート・グリーンパッケージング", share: "145億ドル（スマートホーム隣接）", growth: "CAGR 30.6%", players: "三菱ケミカル、フジシール、タイ系バイオプラスチック" }
        ]
      }
    },
    keyPlayers: {
      title: { en: "Key Players & Ecosystem", ja: "主要プレイヤーとエコシステム" },
      data: {
        en: [
          { segment: "Thai Food Conglomerates", examples: "Thai Union, CP Group, Betagro", status: "Pivoting to Future Food" },
          { segment: "Japanese Machinery", examples: "Ishida, Satake, Kubota", status: "Embedded, shifting to Smart Factory" },
          { segment: "Japanese Food Firms", examples: "Ajinomoto, Meiji, Kirin", status: "R&D-led expansion" },
          { segment: "Halal Certification", examples: "CICOT, Chulalongkorn Halal Science Center", status: "Globally recognized" },
          { segment: "BOI / Government", examples: "BOI Category 1.14/1.17, BCG Model", status: "Active incentive window 2025-2027" }
        ],
        ja: [
          { segment: "タイ食品コングロマリット", examples: "Thai Union、CPグループ、ベタグロ", status: "フューチャーフードへ転換中" },
          { segment: "日系機械メーカー", examples: "イシダ、サタケ、クボタ", status: "基盤確立、スマートファクトリーへ" },
          { segment: "日系食品企業", examples: "味の素、明治、キリン", status: "R&D主導の拡大" },
          { segment: "ハラール認証機関", examples: "CICOT、チュラロンコン大学ハラール科学センター", status: "国際的に認知" },
          { segment: "BOI / 政府", examples: "BOIカテゴリー1.14/1.17、BCGモデル", status: "2025-2027年 優遇措置窓口開放中" }
        ]
      }
    },
    policyInsights: {
      title: { en: "Policy & Regulation", ja: "政策・規制" },
      items: {
        en: [
          { policy: "BOI Future Food (Category 1.17)", content: "5–8 year CIT exemption for value-added food manufacturing including functional foods, medical foods, and alternative proteins. Additional privileges for R&D and technology transfer components. (Doc: Section 3.4)", citation: "BOI Investment Promotion Guide 2025" },
          { policy: "BOI Biotechnology (Category 1.14)", content: "A1+ tier: 10–13 year CIT exemption with no cap for biotech including fermentation, extraction, and bio-active compound development. Thailand's most generous incentive tier. (Doc: Section 3.4)", citation: "BOI Official Gazette, 2025" },
          { policy: "Thai FDA Special Purpose Foods", content: "Foreign entities cannot directly register products — a local license holder is required. Medical foods require clinical data. Recent e-submission systems streamline applications but regulatory navigation remains complex. (Doc: Section 3.4)", citation: "Thai FDA Registration Guidelines" },
          { policy: "BCG Economy National Agenda", content: "Bio-Circular-Green economy aims to raise agro-food and medical sectors to 24% of GDP. Provides overarching policy framework that aligns BOI incentives, R&D funding, and regulatory reform. (Doc: Section 2.3)", citation: "OECD STIP Compass — BCG Economy Model" },
          { policy: "Halal Hub Strategy (CICOT)", content: "Government target: top 5 global Halal exporter. Saudi Arabia diplomatic reset reopened Middle East market. CICOT certification backed by forensic science from Chulalongkorn University — globally recognized and duty-free eligible for OIC markets. (Doc: Section 3.3)", citation: "Thailand Halal Assembly 2025" }
        ],
        ja: [
          { policy: "BOI フューチャーフード（カテゴリー1.17）", content: "機能性食品・医療用食品・代替タンパク質を含む高付加価値食品製造に5〜8年のCIT免除。R&D・技術移転要素には追加優遇あり。（Doc: セクション3.4）", citation: "BOI投資促進ガイド2025" },
          { policy: "BOI バイオテクノロジー（カテゴリー1.14）", content: "A1+ティア：発酵・抽出・生理活性化合物開発を含むバイオテクノロジーに上限なし10〜13年のCIT免除。タイ最高水準の優遇ティア。（Doc: セクション3.4）", citation: "BOI官報、2025年" },
          { policy: "タイFDA 特別目的食品", content: "外国企業は直接の製品登録不可——現地ライセンスホルダーが必要。医療用食品には臨床データが必須。電子申請システムの導入で手続きは合理化されたが、規制ナビゲーションは依然として複雑。（Doc: セクション3.4）", citation: "タイFDA登録ガイドライン" },
          { policy: "BCG経済 国家アジェンダ", content: "バイオ・サーキュラー・グリーン経済モデルは、農食品・医療セクターのGDP比24%への引き上げを目指す。BOI優遇・R&D資金・規制改革を整合させる包括的政策フレームワーク。（Doc: セクション2.3）", citation: "OECD STIP Compass — BCG経済モデル" },
          { policy: "ハラールハブ戦略（CICOT）", content: "政府目標：世界ハラール輸出トップ5。サウジアラビアとの外交正常化で中東市場が再開放。CICOT認証はチュラロンコン大学のフォレンジック科学に裏打ちされ、国際的に認知——OIC市場への無関税輸出が可能。（Doc: セクション3.3）", citation: "Thailand Halal Assembly 2025" }
        ]
      }
    },
    opportunities: {
      en: [
        "Medical Foods (UDF): Co-develop patient-specific diets with Thai hospital chains (BDMS, Bumrungrad) — Thai palate-adapted soft meals bypass import tariffs and gain clinical trust (Doc: Section 3.1)",
        "Functional Ingredients: Japanese fermentation expertise (Lactobacillus strains) + Thai bio-resources (herbs, turmeric, coconut) = high-value bioactive compounds. 'Psychobiotics' (gut-brain axis) identified as 2026 mega-trend (Doc: Section 3.1)",
        "Halal 'Thailand Bypass': Establish production in EEC/Southern Corridor, use CICOT certification to export Japanese-brand Halal products to $2.5T Islamic market duty-free (Doc: Section 3.3)",
        "Insect Protein Processing: Thailand is world's leading cricket farmer. Japanese food-tech masking/texturizing capabilities can unlock export-grade odorless protein powders (Doc: Section 3.2)",
        "Smart Factory Integration: Shift from selling standalone machines to integrated solutions — data-driven traceability (crucial for export QC) and predictive maintenance (Doc: Section 5.1)"
      ],
      ja: [
        "医療用食品（UDF）：タイ病院チェーン（BDMS、バムルンラード）と患者別食事の共同開発——タイ味覚に適応した軟菜食は輸入関税を回避し、臨床信頼を獲得（Doc: セクション3.1）",
        "機能性食品原料：日本の発酵技術（乳酸菌株）＋タイのバイオ資源（ハーブ、ターメリック、ココナッツ）＝高付加価値生理活性化合物。「サイコバイオティクス」（腸脳軸）が2026年メガトレンドに（Doc: セクション3.1）",
        "ハラール「タイランド・バイパス」：EEC/南部経済回廊に生産拠点設置、CICOT認証で日本ブランドのハラール製品を2.5兆ドルのイスラム市場に無関税輸出（Doc: セクション3.3）",
        "昆虫タンパク加工：タイは世界最大のコオロギ養殖国。日本の食品テクノロジーによるマスキング・テクスチャライジング技術で輸出品質の無臭プロテインパウダーを解放（Doc: セクション3.2）",
        "スマートファクトリー統合：単体設備販売から統合ソリューションへ——データ駆動のトレーサビリティ（輸出品質管理に不可欠）と予知保全（Doc: セクション5.1）"
      ]
    },
    risks: {
      en: [
        "Thai FDA regulatory complexity: Foreign firms cannot register directly; local license holder required. Medical food clinical data requirements add 12–18 months to market entry (Doc: Section 3.4)",
        "Labor shortage escalation: 13.6M citizens aged 60+ already exceed youth population (9.5M). Chronic shortage pushes wages up, making automation non-optional (Doc: Section 2.1)",
        "Halal certification fragmentation: While CICOT is globally recognized, some Middle East markets require additional country-specific certifications — due diligence essential (Need verification)",
        "Chinese competition in alternative proteins: Chinese firms are aggressively entering Thai protein market with lower price points, potentially squeezing margins (Need verification)",
        "Raw material price volatility: Climate-driven crop instability (rice, cassava, sugar) creates supply chain risk for food processors dependent on Thai agricultural inputs (Doc: Section 2.3)"
      ],
      ja: [
        "タイFDAの規制複雑性：外国企業の直接登録不可、現地ライセンスホルダーが必要。医療用食品の臨床データ要件は市場参入に12〜18ヶ月を追加（Doc: セクション3.4）",
        "労働力不足の深刻化：60歳以上が1,360万人に達し、すでに若年人口（950万人）を上回る。慢性的不足が賃金を押し上げ、自動化が不可避に（Doc: セクション2.1）",
        "ハラール認証の分断性：CICOTは国際的に認知されているが、一部の中東市場では追加の国別認証が必要——デューデリジェンスが不可欠（要検証）",
        "代替タンパク質市場での中国勢の競争：中国企業がより低い価格帯でタイのタンパク市場に積極参入、マージン圧迫の可能性（要検証）",
        "原材料価格変動リスク：気候変動による作物不安定性（米、キャッサバ、砂糖）がタイ農業原材料に依存する食品加工業者のサプライチェーンリスクを生む（Doc: セクション2.3）"
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
            title: "The 'Kitchen to Pharmacy' Pivot is Structurally Irreversible",
            content: "Thailand's demographic destiny — a Super-Aged Society at middle-income levels — means the domestic market will demand medical foods and functional nutrition at scale. This is not a policy whim; it is a structural imperative driven by healthcare cost pressures. Japanese companies with decades of UDF and clinical nutrition experience have a genuine first-mover window, but it will close as Korean and European competitors recognize the same opportunity. The key differentiator is speed of localization — adapting products to Thai palates and hospital procurement systems, not simply exporting Japanese-market products. (Doc: Section 3.1)"
          },
          {
            title: "The Halal Bypass is Japan's Most Underrated Strategic Option",
            content: "Japanese manufacturers have historically struggled with Halal certification due to fragmented domestic standards and the difficulty of maintaining Halal-only production lines in Japan. Thailand offers a structural solution: an established, internationally recognized certification ecosystem (CICOT), abundant Muslim-friendly raw materials, and newly restored diplomatic channels to the Gulf states. The strategic insight is that Thailand is not just a production base — it is a 'certification gateway' that Japanese firms cannot replicate at home. Companies that establish Halal production lines in Thailand by 2027 will have a 3–5 year structural advantage over competitors trying to certify from Japan. (Doc: Section 3.3)"
          },
          {
            title: "Alternative Proteins: Thailand Has the Supply, Japan Has the Technology",
            content: "Thailand's position as the world's leading cricket farmer is remarkable but incomplete — the raw protein lacks the processing sophistication needed for global markets. Japanese food-tech companies specialize precisely in the 'missing middle': odor masking, texture modification, and functional blending. This is a textbook case of complementary capability alignment. However, the window is competitive: European firms and Israeli startups are also eyeing Thai protein supply chains. The advantage goes to whoever establishes JV structures first. (Doc: Section 3.2)"
          },
          {
            title: "The Automation Imperative is a Disguised Opportunity",
            content: "The labor shortage narrative is typically framed as a threat, but for Japanese machinery makers already embedded in Thai food manufacturing, it is a demand accelerant. The shift from selling individual machines to selling integrated 'Smart Factory' solutions (traceability + predictive maintenance + automated QC) fundamentally changes the revenue model from one-time capital sales to recurring service contracts. Thai food processors facing EU and US traceability requirements have no choice but to invest — the question is whether they invest in Japanese systems or Chinese alternatives that are rapidly improving. (Doc: Section 5.1)"
          }
        ],
        ja: [
          {
            title: "「台所から薬局へ」の転換は構造的に不可逆",
            content: "タイの人口動態的宿命——中所得水準での超高齢社会——は、国内市場が医療用食品と機能性栄養食品を大規模に要求することを意味する。これは政策的気まぐれではなく、医療費圧力に駆動される構造的必然である。UDFと臨床栄養で数十年の経験を持つ日本企業には真のファーストムーバー・ウィンドウがあるが、韓国やヨーロッパの競合が同じ機会に気づけば閉じる。主要な差別化要因は現地化のスピード——タイの味覚や病院調達システムへの適応であり、日本市場向け製品の単純輸出ではない。（Doc: セクション3.1）"
          },
          {
            title: "ハラール・バイパスは日本の最も過小評価された戦略オプション",
            content: "日本の製造業者は歴史的に、国内の分断された認証基準と日本国内工場でのハラール専用ラインの維持困難のため、ハラール認証に苦戦してきた。タイは構造的解決策を提供する：確立され国際的に認知された認証エコシステム（CICOT）、豊富なムスリムフレンドリーな原材料、そして湾岸諸国との新たに回復した外交チャネル。戦略的洞察は、タイが単なる生産拠点ではなく、日本企業が国内では複製できない「認証ゲートウェイ」であるということだ。2027年までにタイでハラール生産ラインを確立する企業は、日本から認証を試みる競合に対して3〜5年の構造的優位を持つ。（Doc: セクション3.3）"
          },
          {
            title: "代替タンパク質：タイに供給力、日本に技術力",
            content: "世界最大のコオロギ養殖国としてのタイの地位は注目に値するが不完全——原料タンパク質はグローバル市場に必要な加工の洗練度を欠く。日本の食品テクノロジー企業はまさに「欠けた中間工程」——臭気マスキング、テクスチャー改変、機能性ブレンディング——を専門としている。これは補完的能力整合の教科書的事例である。ただし、ウィンドウは競争的であり、欧州企業やイスラエルのスタートアップもタイのタンパク質サプライチェーンに注目している。JV体制を最初に構築した者が優位に立つ。（Doc: セクション3.2）"
          },
          {
            title: "自動化の必然性は偽装された機会である",
            content: "労働力不足の物語は一般に脅威として語られるが、タイの食品製造に既に根を張る日系機械メーカーにとっては需要加速要因である。個別機械の販売から統合「スマートファクトリー」ソリューション（トレーサビリティ＋予知保全＋自動品質管理）の販売への転換は、一回限りの資本財販売から継続的サービス契約への収益モデルの根本的変革を意味する。EUや米国のトレーサビリティ要件に直面するタイの食品加工業者には投資以外の選択肢がない——問題は日本のシステムに投資するか、急速に改善している中国の代替品に投資するかである。（Doc: セクション5.1）"
          }
        ]
      }
    },
    // ── Section 4: Recommendation ──
    recommendation: {
      title: { en: "Strategic Recommendation for Japanese Executives", ja: "日本企業経営者への戦略的提言" },
      intro: {
        en: "Based on WaLens' analysis, the following strategic perspective is offered — not as an operational checklist, but as a framework for executive decision-making.",
        ja: "WaLensの分析に基づき、以下の戦略的視点を提供する——オペレーショナルなチェックリストとしてではなく、経営判断のためのフレームワークとして。"
      },
      content: {
        en: `The core strategic question for Japanese food-related companies is no longer "should we invest in Thailand" but rather "how do we redefine our Thailand operations as a value-creation hub rather than a cost-optimization base."

Recommendation 1: Pivot food portfolios from standard exports to 'Wellness + Halal.' Do not merely sell Japanese products in Thailand — invest in local R&D to co-develop Medical Foods (UDF dysphagia diets adapted to Thai palates such as Tom Yum-flavored soft meals) and establish dedicated Halal production lines in the EEC or Southern Economic Corridor. This is a 2-3 year setup but yields a structural moat. (Doc: Recommendations 1)

Recommendation 2: Reframe automation investment as survival, not optimization. Utilize BOI's 'Measure for Industrial Upgrades' (3-year tax exemption) to fund Smart Factory transitions. For machinery suppliers, market solutions not on 'speed' alone but on 'hygiene + labor reduction + traceability' — the three pain points Thai food SMEs cannot ignore. (Doc: Recommendations 2)

Recommendation 3: Build a 'Functional Ingredients JV' anchored in Thai bio-resources. Partner with Thai universities (Chulalongkorn, Kasetsart) and Thai Union's Global Innovation Center for open innovation in fermentation-based functional compounds. The 'Psychobiotics' wave (gut-brain axis probiotics) is a concrete first-mover niche for Japanese firms with Lactobacillus R&D depth. (Doc: Section 3.1)

Recommendation 4: Treat the KOSEN-KMITL pipeline as an operational necessity, not CSR. The skills gap — particularly for food-tech engineers and quality control specialists — is the binding constraint on growth. Co-design curriculums with local technical colleges to secure a talent pipeline familiar with Japanese machinery and corporate culture. (Doc: Section 6.2)

The most dangerous path is incremental expansion of existing commodity operations. Thailand's food industry is bifurcating: commodity margins will continue to erode, while value-added segments (medical foods, Halal, functional ingredients) offer defensible premium positions. Japanese companies that straddle both worlds will find themselves underfunding the future to subsidize the past.`,
        ja: `日本の食品関連企業にとっての核心的な戦略的問いは、もはや「タイに投資すべきか」ではなく、「タイの事業をコスト最適化拠点からいかに価値創造ハブへと再定義するか」である。

提言1：食品ポートフォリオを標準的輸出から「ウェルネス＋ハラール」へ転換せよ。日本製品をタイで単に販売するのではなく、現地R&Dに投資して医療用食品（タイの味覚に適応したUDF嚥下困難食——例えばトムヤム風味の軟菜食）を共同開発し、EECまたは南部経済回廊に専用ハラール生産ラインを設立する。セットアップには2〜3年を要するが、構造的な堀を築く。（Doc: 提言1）

提言2：自動化投資を最適化ではなく「生存」として再フレームせよ。BOIの「産業高度化措置」（3年間のCIT免除）を活用してスマートファクトリー転換を推進する。機械サプライヤーは「速度」だけでなく「衛生＋省人化＋トレーサビリティ」——タイ食品SMEが無視できない3つのペインポイント——でソリューションを訴求する。（Doc: 提言2）

提言3：タイのバイオ資源を基盤とした「機能性食品原料JV」を構築せよ。チュラロンコン大学・カセサート大学やThai Unionのグローバルイノベーションセンターと提携し、発酵ベースの機能性化合物のオープンイノベーションを推進する。「サイコバイオティクス」の波（腸脳軸プロバイオティクス）は、乳酸菌R&Dに深みを持つ日系企業にとって具体的なファーストムーバーニッチである。（Doc: セクション3.1）

提言4：KOSEN-KMITLパイプラインをCSRではなくオペレーション上の必須事項として扱え。スキルギャップ——特にフードテックエンジニアと品質管理スペシャリスト——は成長のバインディング制約である。現地の技術系大学とカリキュラムを共同設計し、日本の機械と企業文化に精通した人材パイプラインを確保する。（Doc: セクション6.2）

最も危険な道は、既存のコモディティ事業の漸進的拡大である。タイの食品産業は二極化しつつある：コモディティのマージンは引き続き侵食される一方、高付加価値セグメント（医療用食品、ハラール、機能性原料）は防御可能なプレミアムポジションを提供する。両世界にまたがる日本企業は、過去を補助金で維持するために未来への投資を不足させることになる。`
      }
    },
    // ── Section 5: Data Appendix ──
    dataAppendix: {
      title: { en: "Data Appendix", ja: "データ付録" },
      tables: {
        macroIndicators: {
          title: { en: "Thailand Macro Indicators (Food Industry Relevant)", ja: "タイマクロ指標（食品産業関連）" },
          data: [
            { indicator: isJapanese ? "GDP成長率" : "GDP Growth", value: "2.0% – 3.2%", relevance: isJapanese ? "中程度の成長——高成長ニッチ市場のターゲティングが必要" : "Moderate growth — requires targeting high-growth niches" },
            { indicator: isJapanese ? "インフレ率" : "Inflation", value: "0.0% – 0.5%", relevance: isJapanese ? "安定的な消費環境" : "Stable consumption environment" },
            { indicator: isJapanese ? "60歳以上人口" : "Population 60+", value: "> 13.6M", relevance: isJapanese ? "シルバーエコノミー製品の巨大市場" : "Massive market for Silver Economy products" },
            { indicator: isJapanese ? "OIC向け食品輸出" : "Food Exports (OIC)", value: "> $7.1B", relevance: isJapanese ? "ハラール市場（中東/インドネシア）からの強い需要" : "Strong demand in Halal markets (Middle East/Indonesia)" },
            { indicator: isJapanese ? "代替タンパク市場規模" : "Alt-Protein Market", value: "THB 6.5B+", relevance: isJapanese ? "急速成長中、加工技術にギャップあり" : "Rapid growth, processing technology gap exists" }
          ]
        },
        boiIncentives: {
          title: { en: "Key BOI Incentives for Food Industry (2025–2027)", ja: "食品産業向けBOI主要優遇措置（2025-2027年）" },
          data: [
            { category: isJapanese ? "バイオテクノロジー" : "Biotechnology", code: "1.14", tier: "A1+", benefits: isJapanese ? "10〜13年CIT免除（上限なし）" : "10–13 Years CIT Exemption (No Cap)" },
            { category: isJapanese ? "フューチャーフード" : "Future Food", code: "1.17", tier: "A1–A3", benefits: isJapanese ? "5〜8年CIT免除＋関税免除" : "5–8 Years CIT Exemption + Duty Waivers" },
            { category: isJapanese ? "スマートパッケージング" : "Smart Packaging", code: "4.14", tier: "A2", benefits: isJapanese ? "8年CIT免除" : "8 Years CIT Exemption" },
            { category: isJapanese ? "自動化（産業高度化措置）" : "Automation (Measure 4)", code: "Measure 4", tier: isJapanese ? "特別" : "Special", benefits: isJapanese ? "3年CIT免除（投資額の50%または100%）" : "3 Years CIT Exemption (50% or 100% of Investment)" },
            { category: isJapanese ? "地域統括本部（IBC）" : "Regional HQ (IBC)", code: "7.34", tier: "IBC", benefits: isJapanese ? "個人所得税15%、配当免除" : "Reduced Personal Income Tax (15%), Dividend Exemption" }
          ]
        },
        strategicMatrix: {
          title: { en: "Strategic Alignment Matrix: Thai Policy × Japanese Capability", ja: "戦略的整合マトリクス：タイ国家政策 × 日本企業の強み" },
          data: [
            { thaiStrategy: isJapanese ? "BCG経済" : "BCG Economy", japaneseStrength: isJapanese ? "バイオテク、グリーンエネルギー、廃棄物発電" : "Biotech, Green Energy, Waste-to-Energy", opportunity: isJapanese ? "バイオプラスチック、機能性原料、バイオマス発電" : "Bioplastics, Functional Ingredients, Biomass Power" },
            { thaiStrategy: isJapanese ? "メディカルハブ" : "Medical Hub", japaneseStrength: isJapanese ? "医療機器、UDF、介護システム" : "Medical Devices, UDF, Care Systems", opportunity: isJapanese ? "医療用食品、テレヘルス、介護施設" : "Medical Foods, Telehealth, Care Facilities" },
            { thaiStrategy: isJapanese ? "ハラールハブ" : "Halal Hub", japaneseStrength: isJapanese ? "食品加工品質・安全性" : "Food Processing Quality, Safety", opportunity: isJapanese ? "ハラール輸出生産拠点としてのタイ活用" : "Thailand as Halal Production Base for Export" },
            { thaiStrategy: isJapanese ? "インダストリー4.0" : "Industry 4.0", japaneseStrength: isJapanese ? "ロボティクス、自動化、IoT" : "Robotics, Automation, IoT", opportunity: isJapanese ? "スマートファクトリー統合、予知保全" : "Smart Factory Integration, Predictive Maintenance" }
          ]
        }
      }
    },
    // ── Section 6: Sources ──
    sources: {
      title: { en: "Sources & Methodology", ja: "出典・方法論" },
      list: {
        en: [
          "KPMG — Thailand's Ageing Society: The opportunities for businesses in Thailand (2024)",
          "USDA FAS — Food and Beverage Trends to Watch for 2026, Bangkok (TH2025-0047)",
          "NXPO — Policy Recommendations for Driving Thailand's Future Food Industry through Science, Research, and Innovation",
          "Scribd / Bangkok Post — Thailand Plus One Strategy Analysis",
          "UN DESA — Aging in Thailand (Population Division)",
          "Nation Thailand — Thailand Bets Big on 'Future Food' with New 500 Billion Baht Goal",
          "Asia Food Beverages — Thailand aims for greater pie of the US$2.5 trillion Halal Market",
          "BOI — Investment Promotion Guide 2025 (Categories 1.14, 1.17, 4.14, 7.34)",
          "Mitsui Global Strategic Studies Institute — Digital Revolution for Food (2025)",
          "Krungsri Research — Thailand Industry Outlook 2025-2027 / Future Food Industry",
          "Grand View Research — Thailand Smart Home Market Size & Outlook 2025-2030",
          "OECD STIP Compass — BCG Economy Model Strategic Plan (Draft)",
          "Mordor Intelligence — Packaging Industry in Thailand",
          "Thai Union — Alternative Protein / OMG Meat Initiative",
          "Thailand Halal Assembly 2025 — Business Potential of the Green Halal Economy",
          "JICA — Data Collection Survey on the Silver Economy in Thailand (2025)",
          "WEF — The Future of Jobs in South-Eastern Asia (2025)",
          "Nikkeibizruptors — Bridging Two Systems: Adapting KOSEN's Japanese Engineering Education to Thailand",
          "WaLens Analysis — Field Research & Executive Interviews (Q1 2026)"
        ],
        ja: [
          "KPMG — タイの高齢化社会：タイにおけるビジネス機会（2024年）",
          "米国農務省FAS — 2026年注目の食品・飲料トレンド、バンコク（TH2025-0047）",
          "NXPO — 科学・研究・イノベーションによるタイのフューチャーフード産業推進に向けた政策提言",
          "Scribd / Bangkok Post — タイランド・プラスワン戦略分析",
          "国連DESA — タイの高齢化（人口部門）",
          "Nation Thailand — タイ、「フューチャーフード」に大きく賭ける：新目標5,000億バーツ",
          "Asia Food Beverages — タイ、2.5兆ドルのハラール市場でより大きなシェアを目指す",
          "BOI — 投資促進ガイド2025（カテゴリー1.14、1.17、4.14、7.34）",
          "三井グローバル戦略研究所 — 食のデジタル革命（2025年）",
          "クルンシィリサーチ — タイ産業見通し2025-2027 / フューチャーフード産業",
          "Grand View Research — タイ スマートホーム市場規模・見通し2025-2030",
          "OECD STIP Compass — BCG経済モデル戦略計画（草案）",
          "Mordor Intelligence — タイのパッケージング産業",
          "Thai Union — 代替タンパク質 / OMG Meatイニシアティブ",
          "Thailand Halal Assembly 2025 — グリーンハラール経済のビジネスポテンシャル",
          "JICA — タイのシルバーエコノミーに関するデータ収集調査（2025年）",
          "WEF — 東南アジアにおける仕事の未来（2025年）",
          "日経ビズラプターズ — 二つのシステムの架け橋：KOSENの日本型工学教育のタイ適応",
          "WaLens分析 — フィールドリサーチ・経営幹部インタビュー（2026年Q1）"
        ]
      }
    },
    disclaimer: {
      en: "This report is prepared by WaLens for informational purposes only. The analysis and opinions expressed are those of WaLens and do not constitute investment advice, legal advice, or recommendation to take any specific action. All data from third-party sources is attributed and should be verified independently. Items marked 'Need verification' require additional confirmation. © 2026 WaLens. All rights reserved. This report is for the exclusive use of the subscriber and may not be redistributed without permission.",
      ja: "本レポートはWaLensが情報提供のみを目的として作成したものです。表明された分析および意見はWaLensのものであり、投資アドバイス、法的アドバイス、または特定の行動を取ることの推奨を構成するものではありません。第三者ソースからのすべてのデータは帰属表示され、独立して検証されるべきです。「要検証」と表示された項目は追加の確認が必要です。© 2026 WaLens. 無断転載禁止。本レポートは購読者専用であり、許可なく再配布することはできません。"
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
        title={isJapanese ? "タイ次世代フード産業レポート | WaLens" : "Thailand Next-Generation Food Industry Report | WaLens"}
        description={isJapanese 
          ? "タイの次世代フード産業に関する詳細な分析レポート。フューチャーフード、ハラール戦略、機能性食品——日系企業の戦略的示唆を提供。"
          : "Comprehensive analysis of Thailand's next-generation food industry. Future Food, Halal strategy, functional ingredients, and strategic implications for Japanese companies."
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
                { label: isJapanese ? "農業" : "Agriculture", href: "/insights/agriculture" },
                { label: isJapanese ? "次世代フード産業" : "Food Industry" }
              ]}
            />
          </div>

          {/* Hero Section */}
          <section className="mb-8 md:mb-12">
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img 
                src={heroImage} 
                alt={isJapanese ? "タイ食品産業" : "Thailand Food Industry"}
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
              <BookmarkButton article={{ slug: 'food-industry', title: isJapanese ? 'タイ次世代フード産業レポート' : 'Thailand Next-Generation Food Industry Report', language: lang === 'ja' ? 'JP' : 'EN', url: '/insights/reports/food-industry', category: 'Agriculture' }} variant="button" />
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
                      <UtensilsCrossed className="h-5 w-5" />
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
                {/* Macro Indicators */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {isJapanese ? content.dataAppendix.tables.macroIndicators.title.ja : content.dataAppendix.tables.macroIndicators.title.en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2 font-semibold">{isJapanese ? "指標" : "Indicator"}</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "数値" : "Value"}</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "ビジネス関連性" : "Business Relevance"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.dataAppendix.tables.macroIndicators.data.map((row, i) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="p-2 font-medium">{row.indicator}</td>
                              <td className="p-2">{row.value}</td>
                              <td className="p-2 text-muted-foreground">{row.relevance}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* BOI Incentives */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {isJapanese ? content.dataAppendix.tables.boiIncentives.title.ja : content.dataAppendix.tables.boiIncentives.title.en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2 font-semibold">{isJapanese ? "産業カテゴリー" : "Category"}</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "活動コード" : "Code"}</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "ティア" : "Tier"}</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "優遇内容" : "Benefits"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.dataAppendix.tables.boiIncentives.data.map((row, i) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="p-2 font-medium">{row.category}</td>
                              <td className="p-2">{row.code}</td>
                              <td className="p-2">{row.tier}</td>
                              <td className="p-2 text-muted-foreground">{row.benefits}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Strategic Matrix */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {isJapanese ? content.dataAppendix.tables.strategicMatrix.title.ja : content.dataAppendix.tables.strategicMatrix.title.en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2 font-semibold">{isJapanese ? "タイ国家戦略" : "Thai Strategy"}</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "日本企業の強み" : "Japanese Strength"}</th>
                            <th className="text-left p-2 font-semibold">{isJapanese ? "協業機会" : "Opportunity"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.dataAppendix.tables.strategicMatrix.data.map((row, i) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="p-2 font-medium">{row.thaiStrategy}</td>
                              <td className="p-2">{row.japaneseStrength}</td>
                              <td className="p-2 text-muted-foreground">{row.opportunity}</td>
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

export default FoodIndustry;
