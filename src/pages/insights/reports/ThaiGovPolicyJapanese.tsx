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
import { 
  FileText, TrendingUp, TrendingDown, Shield, AlertTriangle,
  CheckCircle, Factory, Zap, BookOpen, Lock, Lightbulb, Eye,
  ChevronRight, Crown, Database, Landmark, Leaf, Car, Cpu, FlaskConical, ShoppingCart
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-thai-gov-policy.jpg';

const ThaiGovPolicyJapanese = () => {
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
        'thai-gov-policy-japanese',
        isJapanese ? 'นโยบายรัฐบาลอนุทิน2：日系企業への影響分析' : 'Anutin 2 Government Policy: Strategic Implications for Japanese Companies in Thailand',
        'services',
        lang
      );
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker('thai-gov-policy-japanese', 'Anutin 2 Policy: Implications for Japanese Companies', 'อนุทิน2政策：日系企業への影響', 'Services', hasFullAccess);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(
        'thai-gov-policy-japanese',
        isJapanese ? 'อนุทิน2政策：日系企業への影響' : 'Anutin 2 Policy: Implications for Japanese Companies',
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
    { id: 'facts', label: isJapanese ? 'ファクト（政策・規制・動向）' : 'Facts (Policy, Regulation & Trends)' },
    { id: 'opinion', label: isJapanese ? 'WaLensの見解と示唆' : 'Opinion & Implication from WaLens' },
    { id: 'recommendation', label: isJapanese ? '日本企業経営者への提言' : 'Recommendation for Japanese Executives' },
    { id: 'data-appendix', label: isJapanese ? 'データ付録' : 'Data Appendix' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: {
      en: "Anutin 2 Government Policy (April 2026): Strategic Implications for Japanese Companies in Thailand",
      ja: "อนุทิน2政策分析（2026年4月）：タイにおける日系企業の事業戦略への影響"
    },
    subheadline: {
      en: "How Super License reform, Semiconductor Roadmap 2050, nominee crackdown, and green energy transition are reshaping the business landscape for Japanese enterprises",
      ja: "Super License改革、半導体ロードマップ2050、ノミニー取締強化、グリーンエネルギー転換が日系企業の事業環境をどう再編するか"
    },
    category: {
      en: "Government Policy / Regulation / Business Strategy",
      ja: "政府政策 / 規制 / 事業戦略"
    },
    lastUpdated: "2026-04-10",

    // ── Executive Summary ──
    executiveSummary: {
      en: [
        "PM Anutin Charnvirakul formed a 16-party coalition under Bhumjaithai Party leadership in early 2026, coinciding with a severe global energy crisis from Middle East shipping route disruptions. The policy statement on April 9-10, 2026 represents a major structural realignment.",
        "Emergency energy measures include a ฿150 billion emergency borrowing decree for the Oil Fund and ฿100 billion in low-interest loans for affected businesses. Diesel price target capped at 50.54 baht/liter through subsidies.",
        "The 'Super License' system launching within 180 days will consolidate multiple permit requirements into a single primary license, dramatically reducing bureaucratic burden for factory establishment and expansion.",
        "National Semiconductor Roadmap 2050 targets ฿2.5 trillion in investment and 230,000 high-skilled workers, elevating Thailand from contract assembler to technology owner in power semiconductors, sensors, and photonics.",
        "DBD Order 1/2569 (effective April 1, 2026) intensifies nominee shareholder crackdowns — Thai shareholders must provide 3-month financial statements proving genuine capital sources, with criminal penalties up to 3 years imprisonment.",
        "'Made in Thailand' procurement policy and de minimis threshold elimination create dual impact: opportunities for Japanese companies with local production, pressure to localize supply chains."
      ],
      ja: [
        "อนุทิน・チャンウィーラクン首相がภูมิใจไทย党主導の16党連立政権を2026年初頭に樹立。中東航路途絶による深刻な世界的エネルギー危機と重なり、2026年4月9-10日の政策声明は大規模な構造的再編を意味する。",
        "緊急エネルギー対策として燃料油基金向けの1,500億バーツ緊急借入法令と、影響を受けた企業向けの1,000億バーツ低利融資を実施。ディーゼル価格は補助金により50.54バーツ/リットルに上限設定。",
        "180日以内に導入される「Super License」制度は、複数の許認可要件を単一の主要ライセンスに統合し、工場設立・拡張における官僚的負担を劇的に削減する。",
        "国家半導体ロードマップ2050は投資額2.5兆バーツ、高技能労働者23万人を目標とし、タイをパワー半導体・センサー・フォトニクス分野で受託組立業者からテクノロジーオーナーへ格上げする。",
        "กรมพัฒนาธุรกิจ命令1/2569号（2026年4月1日施行）がノミニー株主の取締りを強化——タイ人株主は真正な資金源を証明する3ヶ月分の財務諸表を提出義務、違反には最大3年の禁固刑。",
        "「Made in Thailand」調達政策とDe Minimis Threshold撤廃が二重の影響を生む：現地生産を持つ日系企業にとってのチャンスと、サプライチェーン現地化への圧力。"
      ]
    },

    // ── Facts: Energy Crisis Response ──
    energyCrisisResponse: {
      title: { en: "Energy Crisis Emergency Measures (April 2026)", ja: "エネルギー危機緊急対策（2026年4月）" },
      data: {
        en: [
          { indicator: "Diesel Price Target", value: "≤50.54 baht/liter", policy: "Oil Fund subsidy mechanism to reduce logistics costs" },
          { indicator: "Emergency Borrowing", value: "฿150 billion", policy: "Maintain Oil Fund & energy price liquidity" },
          { indicator: "Low-interest Business Loans", value: "฿100 billion", policy: "Support SMEs and manufacturing facilities" },
          { indicator: "Middle East Oil Import Dependency", value: ">50% of total consumption", policy: "Vulnerability to Hormuz Strait disruption" },
          { indicator: "Fuel Strategic Reserve", value: "109 days", policy: "Short-term supply confidence building" }
        ],
        ja: [
          { indicator: "ディーゼル目標価格", value: "50.54バーツ/リットル以下", policy: "燃料油基金補助メカニズムによる物流コスト削減" },
          { indicator: "緊急借入予算", value: "1,500億バーツ", policy: "燃料油基金と国内エネルギー価格の流動性維持" },
          { indicator: "低利事業融資", value: "1,000億バーツ", policy: "SMEsおよび製造施設の支援" },
          { indicator: "中東原油輸入依存度", value: "総消費量の50%超", policy: "ホルムズ海峡途絶リスクへの脆弱性" },
          { indicator: "燃料戦略備蓄", value: "109日分", policy: "短期的な供給安定への信頼醸成" }
        ]
      }
    },

    // ── Super License & Omnibus Law ──
    superLicense: {
      title: { en: "Super License & Omnibus Law Reform", ja: "Super License制度とOmnibus Law改革" },
      items: {
        en: [
          { topic: "Super License Mechanism", detail: "Consolidates complex permit applications into a single point. Once a business receives a 'Primary License,' it automatically gains approval for related 'Secondary Licenses.' Target sectors include industrial factories, hotels, and energy businesses — previously requiring separate permits from multiple agencies." },
          { topic: "180-Day Implementation", detail: "Government pledged to launch the system within 180 days. The new system will be fully digital (Government Digital Transformation) for speed, transparency, and auditability." },
          { topic: "Omnibus Law Initiative", detail: "Plans to review and repeal over 7,000 outdated laws burdening businesses. Procurement reform shifts from 'lowest price' to 'value for money' criteria — benefiting Japanese companies competing on quality over price." },
          { topic: "Impact on Japanese Companies", detail: "Previously, foreign companies needed 25-35 documents with legal consultation costs averaging ฿25,000 per person for certain license applications. The new system dramatically reduces both time and cost." }
        ],
        ja: [
          { topic: "Super Licenseの仕組み", detail: "複雑な許認可申請を一元化。事業者が「主要ライセンス」を取得すれば、関連する「副次ライセンス」も自動的に承認される。対象は工場、ホテル、エネルギー事業——従来は複数省庁から個別に許可が必要だった。" },
          { topic: "180日以内の導入", detail: "政府は180日以内のシステム稼働を公約。新システムは完全デジタル化（Government Digital Transformation）により、迅速性・透明性・監査可能性を確保。" },
          { topic: "Omnibus Law構想", detail: "ビジネスに負担を課す7,000以上の旧法を見直し・廃止する計画。調達制度は「最低価格」から「バリュー・フォー・マネー」基準へ転換——品質で勝負する日系企業に有利。" },
          { topic: "日系企業への影響", detail: "従来、外国企業は特定の許認可申請に25〜35件の書類と1人あたり平均25,000バーツの法律相談費が必要だった。新制度はこれらの時間とコストを劇的に削減する。" }
        ]
      }
    },

    // ── Semiconductor Roadmap 2050 ──
    semiconductorRoadmap: {
      title: { en: "National Semiconductor Roadmap 2050", ja: "国家半導体ロードマップ2050" },
      phases: {
        en: [
          { phase: "Phase 1: Foundation (2026-2030)", target: "Focus on OSAT (Packaging & Testing) and IC Design", support: "Low-interest loans and R&D grants" },
          { phase: "Phase 2: Expansion (2030-2040)", target: "Wafer Fabrication plant establishment", support: "Maximum BOI privileges and high-skill visas" },
          { phase: "Phase 3: Leadership (2040-2050)", target: "ASEAN semiconductor innovation hub", support: "Global supply chain integration" },
          { phase: "Total Investment Target", target: "฿2.5 trillion (US$79 billion)", support: "Matching Fund for Thai-Japanese startups" },
          { phase: "Workforce Target", target: "230,000 high-skilled workers", support: "Partnerships with Japanese universities and research institutes" }
        ],
        ja: [
          { phase: "第1期：基盤構築（2026-2030）", target: "OSAT（パッケージング＆テスト）とIC設計に注力", support: "低利融資と研究開発補助金" },
          { phase: "第2期：拡大（2030-2040）", target: "ウェハーファブリケーション工場の設立", support: "BOI最高位の特典と高技能ビザ" },
          { phase: "第3期：リーダーシップ（2040-2050）", target: "ASEAN半導体イノベーションハブ", support: "グローバルサプライチェーンとの統合" },
          { phase: "投資目標総額", target: "2.5兆バーツ（約790億ドル）", support: "タイ-日本スタートアップ向けMatching Fund" },
          { phase: "人材育成目標", target: "高技能労働者23万人", support: "日本の大学・研究機関との連携" }
        ]
      }
    },

    // ── Nominee Crackdown ──
    nomineeCrackdown: {
      title: { en: "Nominee Shareholder Crackdown (DBD Order 1/2569)", ja: "ノミニー株主取締強化（กรมพัฒนาธุรกิจ命令1/2569号）" },
      items: {
        en: [
          { topic: "Financial Proof Requirement", detail: "Thai shareholders in companies with foreign co-investors must provide 3-month financial statements proving genuine capital sources." },
          { topic: "Criminal Penalties", detail: "Directors must provide sworn statements confirming no nominee usage. False declarations carry criminal penalties of up to 3 years imprisonment or fines of ฿100,000-1,000,000." },
          { topic: "Targeted Regions", detail: "Intensive investigations focused on Bangkok, Chonburi, Chiang Mai, and Phuket — targeting real estate, tourism, and agricultural land holding businesses." },
          { topic: "Impact on Japanese Companies", detail: "Japanese companies with 51/49 shareholding structures using Thai employees or partner companies as majority shareholders must verify capital source legitimacy and governance compliance to avoid prosecution risks." }
        ],
        ja: [
          { topic: "資金証明要件", detail: "外国人共同投資先企業のタイ人株主は、真正な資金源を証明する3ヶ月分の財務諸表を提出しなければならない。" },
          { topic: "刑事罰", detail: "取締役はノミニー不使用の宣誓書を提出義務。虚偽申告には最大3年の禁固刑または10万〜100万バーツの罰金。" },
          { topic: "重点調査地域", detail: "バンコク、チョンブリ、チェンマイ、プーケットで集中調査——不動産、観光、農業用地保有事業が対象。" },
          { topic: "日系企業への影響", detail: "タイ人従業員やパートナー企業を過半数株主とする51/49型持株構造の日系企業は、資金源の正当性とガバナンスの適法性を検証し、訴追リスクを回避する必要がある。" }
        ]
      }
    },

    // ── Green Energy Transition ──
    greenEnergy: {
      title: { en: "Green Energy Transition & GX Policy", ja: "グリーンエネルギー転換とGX政策" },
      comparison: {
        en: [
          { category: "Green Electricity Procurement", before: "Case-by-case negotiation required", after: "Clear UGT and Direct PPA systems" },
          { category: "Solar Investment Tax Deduction", before: "Standard BOI criteria", after: "150% tax deduction (certified equipment)" },
          { category: "Installation Permit", before: "Factory operation license required", after: "Exempted for ≤1 MW installations" },
          { category: "Government Fleet", before: "Low-cost ICE vehicles preferred", after: "Priority on EV and Hydrogen vehicles" }
        ],
        ja: [
          { category: "グリーン電力調達", before: "個別交渉が必要", after: "明確なUGTとDirect PPAシステム" },
          { category: "ソーラー投資税控除", before: "標準的BOI基準", after: "150%税控除（認定機器のみ）" },
          { category: "設置許可", before: "工場操業許可が必要", after: "1MW以下は許可不要" },
          { category: "政府車両", before: "低コストの内燃機関車優先", after: "EVと水素車両を優先" }
        ]
      }
    },

    // ── Opportunities ──
    opportunities: {
      en: [
        "Semiconductor value chain upgrade: Sony, Toshiba, Rohm can expand from OSAT to IC Design and R&D centers using Super License for faster establishment.",
        "Made in Thailand procurement advantage: Japanese companies with local factories gain priority in government procurement bidding, outcompeting import-dependent rivals.",
        "Green technology investment: 150% tax deduction for energy-saving equipment and solar rooftop installations reduces payback period significantly during energy crisis.",
        "Value-for-money procurement reform: Shift from 'lowest price' to 'value for money' criteria in government procurement favors Japanese quality-driven products.",
        "Matching Fund for Thai-Japanese startups: Government co-investment mechanism enables joint technology ventures in semiconductor and advanced manufacturing."
      ],
      ja: [
        "半導体バリューチェーンの高度化：Sony、東芝、Rohmが Super Licenseを活用しOSATからIC設計・R&Dセンターへ拡張可能。",
        "Made in Thailand調達優位性：現地工場を持つ日系企業が政府調達入札で優先権を獲得、輸入依存の競合に対して優位に。",
        "グリーンテクノロジー投資：省エネ機器・ソーラールーフトップ設置の150%税控除でエネルギー危機下の投資回収期間を大幅短縮。",
        "バリュー・フォー・マネー調達改革：政府調達基準が「最低価格」から「費用対効果」へ転換、品質重視の日本製品に有利。",
        "タイ-日本スタートアップ向けMatching Fund：政府の共同投資メカニズムにより半導体・先端製造分野の合弁事業が可能に。"
      ]
    },

    // ── Risks ──
    risks: {
      en: [
        "Nominee crackdown exposure: Japanese companies with traditional 51/49 structures may face investigation and prosecution under intensified enforcement.",
        "Public debt exceeding 70% of GDP by 2027: Emergency borrowing may impact Thailand's credit rating and future borrowing costs.",
        "Energy subsidy fiscal unsustainability: Oil Fund burns at emergency rates; price cap removal would push diesel to 57+ baht/liter.",
        "Supply chain localization pressure: Companies relying on imported finished goods face increasing pressure to establish local production or Thai suppliers.",
        "16-party coalition instability: Broad coalition governance may lead to policy inconsistency or delayed implementation of key reforms."
      ],
      ja: [
        "ノミニー取締りリスク：伝統的な51/49型持株構造の日系企業が強化された執行下で調査・訴追対象となる可能性。",
        "2027年までに公的債務がGDP70%超：緊急借入がタイの信用格付けと将来の借入コストに影響する恐れ。",
        "エネルギー補助金の財政持続不可能性：燃料油基金が緊急ペースで消耗、価格上限撤廃でディーゼル57バーツ/L超に。",
        "サプライチェーン現地化圧力：輸入完成品に依存する企業が現地生産またはタイ人サプライヤー確保への圧力増大。",
        "16党連立の不安定性：広範な連立政権がSmith策の一貫性欠如や主要改革の実施遅延を招く可能性。"
      ]
    },

    // ── Opinion & Implication ──
    opinion: {
      title: { en: "WaLens Analysis: Strategic Interpretation", ja: "WaLensの分析：戦略的解釈" },
      intro: {
        en: "The following represents WaLens' independent analysis based on the facts presented above. These are interpretive observations, not objective data points.",
        ja: "以下は上記のファクトに基づくWaLensの独自分析です。これらは解釈的な見解であり、客観的なデータポイントではありません。"
      },
      points: {
        en: [
          {
            title: "Super License Is Japan's Factory Expansion Accelerator",
            content: "The 180-day Super License implementation creates a rare window where Japan's existing industrial presence in Thailand can be leveraged for rapid expansion. Companies that begin permit applications during the transition period will gain first-mover advantage in the new streamlined system. The shift from document-heavy processes (25-35 documents per application) to digital single-point licensing fundamentally changes the ROI calculation for Thailand expansion — reducing setup costs by an estimated 30-40% and timeline by 50-60%."
          },
          {
            title: "Nominee Crackdown Is a Compliance Opportunity, Not Just a Threat",
            content: "While the intensified nominee enforcement creates immediate compliance risks for Japanese companies with traditional 51/49 structures, it also levels the playing field against competitors who relied on opaque shareholding arrangements. Companies that proactively restructure using BOI privileges (allowing 100% foreign ownership) or treaty-based exemptions will gain a structural governance advantage. The ฿25,000 per-person legal consultation cost is trivial compared to potential criminal prosecution risks."
          },
          {
            title: "Made in Thailand + Value-for-Money = Japanese Quality Premium",
            content: "The dual policy shift — from 'lowest price' to 'value for money' in government procurement AND 'Made in Thailand' preference — uniquely advantages Japanese manufacturers who already have Thai production bases. Chinese competitors who export finished goods to Thailand face a double barrier. This is perhaps the most favorable procurement policy environment for Japanese companies in Thailand in a decade."
          },
          {
            title: "Semiconductor Roadmap 2050 Is Thailand's Invitation to Japan's Chip Ecosystem",
            content: "Thailand's ฿2.5 trillion semiconductor investment target explicitly invites Japanese companies like Rohm, Sony, and Renesas to upgrade from assembly to design and fabrication. The Matching Fund mechanism for Thai-Japanese startups signals that Thailand sees Japan — not China or Korea — as its preferred semiconductor partner. Japanese companies that commit early will shape the industry standards and training programs, creating decades of competitive advantage."
          }
        ],
        ja: [
          {
            title: "Super Licenseは日本の工場拡張アクセラレーター",
            content: "180日以内のSuper License導入は、タイにおける日本の既存産業プレゼンスを活用した急速拡張の稀有なウィンドウを生む。移行期間中に許認可申請を開始する企業が新しい簡素化システムでファーストムーバー優位を獲得する。書類重視プロセス（申請あたり25〜35件）からデジタル一元化ライセンスへの転換は、タイ事業拡張のROI計算を根本的に変える——セットアップコスト推定30〜40%削減、タイムライン50〜60%短縮。"
          },
          {
            title: "ノミニー取締りは脅威だけでなくコンプライアンス上のチャンス",
            content: "強化されたノミニー執行は伝統的な51/49構造の日系企業に即座のコンプライアンスリスクを生むが、同時に不透明な株主構成に依存していた競合企業に対する競争条件を均等化する。BOI特権（外資100%保有許可）や条約ベースの免除を活用して積極的に再編する企業が構造的なガバナンス優位を獲得する。1人あたり25,000バーツの法律相談費用は、刑事訴追リスクと比較すれば些少である。"
          },
          {
            title: "Made in Thailand＋バリュー・フォー・マネー＝日本品質プレミアム",
            content: "二重の政策転換——政府調達における「最低価格」から「費用対効果」への転換AND「Made in Thailand」優先——は、すでにタイ生産拠点を持つ日系製造業者を独自に有利にする。完成品をタイに輸出する中国の競合企業は二重の障壁に直面する。これはおそらく過去10年で日系企業にとって最も有利なタイの調達政策環境である。"
          },
          {
            title: "半導体ロードマップ2050はタイから日本のチップエコシステムへの招待状",
            content: "タイの2.5兆バーツ半導体投資目標は、Rohm、Sony、Renesas等の日系企業に組立からdesignおよびファブリケーションへのアップグレードを明確に要請している。タイ-日本スタートアップ向けMatching Fundメカニズムは、タイが中国や韓国ではなく日本を優先的な半導体パートナーと見なしていることを示す。早期にコミットする日系企業が業界標準と研修プログラムを形成し、数十年にわたる競争優位を創出する。"
          }
        ]
      }
    },

    // ── Recommendations ──
    recommendations: {
      en: [
        {
          title: "Conduct Immediate Shareholding Compliance Audit",
          content: "With DBD Order 1/2569 now in effect, Japanese companies with 51/49 structures where Thai shareholders are individuals or shell companies must immediately audit their shareholding legitimacy. If risks are identified, restructure using BOI privileges allowing 100% foreign ownership or treaty-based exemptions. The cost of proactive restructuring is negligible compared to criminal prosecution risks (up to 3 years imprisonment, ฿1M fine).",
          priority: "Immediate"
        },
        {
          title: "Begin Super License Pre-Application Planning",
          content: "The Super License system launches within 180 days. Companies planning factory expansion, new facility establishment, or business line additions should prepare documentation now to be first in line when the digital system goes live. Early movers will benefit from reduced processing times and lower costs — estimated 30-40% savings on setup expenses.",
          priority: "Immediate"
        },
        {
          title: "Invest in Solar Rooftop + BESS with 150% Tax Deduction",
          content: "Royal Decree No. 805 provides 150% tax deduction for corporate investment in certified energy-saving equipment. With LNG prices surging due to the Middle East crisis, rooftop solar with battery storage is now the fastest payback energy investment. Installations ≤1 MW are exempt from factory operation permits under the new framework.",
          priority: "Mid-term"
        },
        {
          title: "Localize Supply Chain for Made in Thailand Certification",
          content: "The 'Made in Thailand First' policy in government procurement will become the new standard. Japanese companies with high import dependency should accelerate supplier partnerships in Thailand or invite key suppliers to establish Thai production bases, ensuring products meet local content requirements for the FTI 'Made in Thailand' mark.",
          priority: "Strategic"
        },
        {
          title: "Engage in Semiconductor Roadmap 2050 Through JCC and Industry Associations",
          content: "Leverage JCC (Japanese Chamber of Commerce) and industry associations to participate in shaping Super License and Omnibus Law implementation details. For semiconductor companies, commit early to Phase 1 (OSAT upgrade and IC Design center establishment) to capture BOI maximum privileges and secure positions in Thailand's 25-year semiconductor ecosystem buildout.",
          priority: "Strategic"
        }
      ],
      ja: [
        {
          title: "株主構成コンプライアンス監査を即時実施せよ",
          content: "กรมพัฒนาธุรกิจ命令1/2569号の施行により、タイ人株主が個人またはシェルカンパニーである51/49構造の日系企業は株主の正当性を即座に監査すべき。リスクが特定された場合、BOI特権（外資100%保有）や条約ベースの免除を用いて再編せよ。積極的な再編コストは刑事訴追リスク（最大3年禁固、100万バーツ罰金）と比較して些少。",
          priority: "即座"
        },
        {
          title: "Super License事前申請計画を開始せよ",
          content: "Super Licenseシステムは180日以内に稼働開始。工場拡張、新施設設立、事業ライン追加を計画する企業は、デジタルシステム稼働時に先頭に立てるよう今から書類を準備すべき。先行者はセットアップ費用の推定30〜40%削減という恩恵を受ける。",
          priority: "即座"
        },
        {
          title: "150%税控除を活用しソーラールーフトップ＋BESSに投資せよ",
          content: "พระราชกฤษฎีกา第805号は認定省エネ機器への法人投資に150%税控除を提供。中東危機によるLNG価格急騰下、蓄電池付きルーフトップソーラーは最速の投資回収を実現するエネルギー投資。1MW以下の設置は新制度下で工場操業許可不要。",
          priority: "中期"
        },
        {
          title: "Made in Thailand認証に向けサプライチェーンを現地化せよ",
          content: "政府調達における「Made in Thailand First」政策が新たな標準となる。輸入依存度が高い日系企業はタイ国内のサプライヤーとのパートナーシップを加速するか、主要サプライヤーのタイ生産拠点設立を促し、สภาอุตสาหกรรมの「Made in Thailand」マーク取得に必要なLocal Content要件を確保すべき。",
          priority: "戦略的"
        },
        {
          title: "JCCと業界団体を通じ半導体ロードマップ2050に参画せよ",
          content: "JCC（日本商工会議所）と業界団体を活用し、Super LicenseおよびOmnibus Lawの実施詳細の策定に参画せよ。半導体企業は第1期（OSATの高度化とIC設計センター設立）への早期コミットでBOI最高位特典を獲得し、タイの25年半導体エコシステム構築における地位を確保すべき。",
          priority: "戦略的"
        }
      ]
    },

    // ── Data Appendix ──
    industryImpact: {
      title: { en: "Industry-Specific Impact Assessment", ja: "産業別影響評価" },
      data: [
        { sector: { en: "Automotive & Parts", ja: "自動車・部品" }, impact: { en: "Dual challenge: Chinese EV competition + environmental policy pressure. Focus on xEV (HEV/PHEV/FCEV) production line expansion.", ja: "二重の課題：中国EV競争＋環境政策圧力。xEV（HEV/PHEV/FCEV）生産ライン拡張に注力。" }, action: { en: "Expand xEV lines, transfer technology to Thai suppliers for Made in Thailand compliance", ja: "xEVライン拡張、Made in Thailand対応のためタイサプライヤーへ技術移転" } },
        { sector: { en: "Electronics & Semiconductor", ja: "電子機器・半導体" }, impact: { en: "Highest growth potential under Roadmap 2050. IC Design and Wafer Fab opportunities.", ja: "ロードマップ2050下で最も高い成長ポテンシャル。IC設計とウェハーファブの機会。" }, action: { en: "Upgrade from OSAT to design centers, leverage Super License for innovation hub setup", ja: "OSATから設計センターへ高度化、Super Licenseでイノベーションハブ設立" } },
        { sector: { en: "Chemical & Petrochemical", ja: "化学・石油化学" }, impact: { en: "Highest cost impact from Naphtha and LNG price volatility.", ja: "ナフサおよびLNG価格変動から最大のコスト影響。" }, action: { en: "Invest in CCUS technology and bioplastics under BCG economy policy", ja: "BCG経済政策下でCCUS技術とバイオプラスチックに投資" } },
        { sector: { en: "Retail & Services", ja: "小売・サービス" }, impact: { en: "Half-Half Plus Phase 2 targets grassroots economy through small shops and SMEs.", ja: "คนละครึ่งพลัス Phase 2が小規模店舗とSMEsを通じた草の根経済を対象。" }, action: { en: "Position as SME support platform — offer space for OTOP/community products", ja: "SME支援プラットフォームとして位置付け——OTOP/地域産品の販売スペースを提供" } }
      ]
    },
    investorSentiment: {
      title: { en: "Japanese Investor Sentiment (H1 2026)", ja: "日本人投資家心理（2026年上半期）" },
      data: [
        { indicator: { en: "JCC Diffusion Index (DI)", ja: "JCC景況感指数（DI）" }, value: { en: "+1 (improved from negative in previous quarter)", ja: "+1（前四半期のマイナスから改善）" } },
        { indicator: { en: "Companies planning Thailand expansion", ja: "タイ事業拡大を計画する企業" }, value: { en: "23% of JCC members", ja: "JCC会員の23%" } },
        { indicator: { en: "Key concerns", ja: "主な懸念事項" }, value: { en: "Household debt, energy costs, labor shortage", ja: "家計債務、エネルギーコスト、労働力不足" } },
        { indicator: { en: "New BOI project applications", ja: "新規BOIプロジェクト申請" }, value: { en: "311 projects from Japanese investors", ja: "日本人投資家から311プロジェクト" } }
      ]
    },

    // ── Sources ──
    sources: [
      "Thai PM pledges economic relief, structural reforms in policy statement — Xinhua (April 10, 2026)",
      "\"อนุทิน\" แถลงนโยบายรัฐบาล — PRD Thailand (April 10, 2026)",
      "Anutin to unveil Thailand's economic strategy — Nation Thailand (April 10, 2026)",
      "Anutin to convene April 11 special Cabinet over soaring oil prices — Nation Thailand (April 10, 2026)",
      "Energy Security: How CASE Countries Navigate 2026 Fuel Crisis — CASE for SEA (April 2026)",
      "Thai PM unveils plan to boost economy — China Daily (April 10, 2026)",
      "Thai PM orders strict WFH for state agencies — Asian News Network (April 9, 2026)",
      "Thai Government Unveils Seven Measures To Ease Energy Crisis — Bernama (April 2026)",
      "Bank of Thailand: \"The Thai Economy: Resilient Today, Transformed Tomorrow\" (March 2026)",
      "Scholar slams PM's policies — Bangkok Post (April 2026)",
      "Thailand plans reforms to boost growth — VN Express (April 2026)",
      "OECD: Strengthening productivity through better product market regulation — Thailand 2025",
      "TDRI: Reforming Regulations to Unlock Thailand's Competitiveness (February 2026)",
      "Policy Statement by PM Anutin to National Assembly — PRD Thailand (April 2026)",
      "Thailand at the Crossroads: Connecting Global Semiconductor Value Chains — SEMI (January 2026)",
      "Thailand sets 25-year Made-in-Thailand Chips roadmap to 2050 — Nation Thailand",
      "Thailand Sets Long-Term Strategy to Build Complete Semiconductor Value Chain — BABL AI",
      "In-Depth Look at Anutin 2's Economic Policy — Thairath English (April 2026)",
      "Crackdown targets use of Thai proxies — Bangkok Post (April 2026)",
      "Thailand Closes Nominee Loophole with New Investment Confirmation — Emerhub (April 2026)",
      "Authorities to probe 21,000 foreign-linked cases — Thai Enquirer (2026)",
      "Nominee Shareholders in Thailand: How to Stay Compliant in 2026 — Juslaws",
      "Japanese investors submitting 311 new projects to Thailand — Money & Banking Magazine (2026)",
      "Thai PM promises broad economic reforms — Business Times (April 2026)",
      "Unlocking Rooftop Solar in Thailand: New Legal and Incentive Framework — Dentons (April 2026)",
      "JCC Survey on Business Sentiment H2 2025 — JETRO (2026)",
      "Japanese confidence rebounds for 2026; 23% to expand Thai investment — Nation Thailand",
      "Bhumjaithai rolls out \"10 Plus\" to revive confidence — Nation Thailand",
      "OECD: Implementing Net-zero Transition Framework in Thailand (2026)"
    ]
  };

  return (
    <>
      <SEO 
        title={isJapanese 
          ? "อนุทิน2政策分析：日系企業への戦略的影響 | WaLens" 
          : "Anutin 2 Policy: Strategic Implications for Japanese Companies | WaLens"
        }
        description={isJapanese
          ? "2026年4月อนุทิน政権の政策声明が日系企業に与える影響を分析。Super License、半導体ロードマップ2050、ノミニー取締り、グリーンエネルギー転換。"
          : "Analysis of Thailand's Anutin 2 government policy impact on Japanese companies: Super License reform, Semiconductor Roadmap 2050, nominee crackdown, and green energy transition."
        }
        canonicalPath="/insights/services/thai-gov-policy-japanese"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative w-full h-[340px] md:h-[420px] flex items-end overflow-hidden">
          <img src={heroImage} alt="Thai Government Policy Impact on Japanese Companies" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
          <div className="relative z-20 container mx-auto px-4 pb-10">
            <Badge variant="outline" className="mb-3 bg-blue-500/20 text-blue-200 border-blue-500/30">
              <Landmark className="h-3 w-3 mr-1" />
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
                article={{ slug: 'thai-gov-policy-japanese', title: isJapanese ? 'อนุทิน2政策：日系企業への影響' : 'Anutin 2 Policy: Implications for Japanese Companies', language: lang === 'ja' ? 'JP' : 'EN', url: '/insights/services/thai-gov-policy-japanese', category: 'Services' }}
                variant="button"
                className="text-white border-white/50 hover:bg-white/20 bg-white/10"
              />
            </div>
          </div>
        </section>

        <main className="container mx-auto px-4 py-8">
          <Breadcrumb items={[
            { label: isJapanese ? 'インサイト' : 'Insights', href: '/insights' },
            { label: isJapanese ? 'サービス' : 'Services', href: '/insights?filter=services' },
            { label: isJapanese ? 'タイ政府政策と日系企業' : 'Thai Gov Policy & Japanese Companies' }
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
                <h2 className="text-2xl font-bold">{isJapanese ? 'ファクト（政策・規制・動向）' : 'Facts (Policy, Regulation & Trends)'}</h2>
                <p className="text-sm text-muted-foreground">{isJapanese ? '客観的データのみ' : 'Objective data only'}</p>
              </div>
            </div>

            {/* Energy Crisis Response */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  {content.energyCrisisResponse.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '指標' : 'Indicator'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '数値' : 'Value'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '政策的含意' : 'Policy Implication'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.energyCrisisResponse.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium">{row.indicator}</td>
                          <td className="py-3 pr-4">{row.value}</td>
                          <td className="py-3 text-muted-foreground">{row.policy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Super License & Omnibus Law */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  {content.superLicense.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.superLicense.items[isJapanese ? 'ja' : 'en'].map((item, idx) => (
                    <div key={idx} className="border-l-2 border-green-500/30 pl-4">
                      <h4 className="font-semibold text-sm mb-1">{item.topic}</h4>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Semiconductor Roadmap */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-purple-500" />
                  {content.semiconductorRoadmap.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'フェーズ' : 'Phase'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '目標' : 'Target'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '政府支援' : 'Government Support'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.semiconductorRoadmap.phases[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium">{row.phase}</td>
                          <td className="py-3 pr-4">{row.target}</td>
                          <td className="py-3 text-muted-foreground">{row.support}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Nominee Crackdown */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  {content.nomineeCrackdown.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.nomineeCrackdown.items[isJapanese ? 'ja' : 'en'].map((item, idx) => (
                    <div key={idx} className="border-l-2 border-red-500/30 pl-4">
                      <h4 className="font-semibold text-sm mb-1">{item.topic}</h4>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Green Energy Transition */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-emerald-500" />
                  {content.greenEnergy.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'カテゴリ' : 'Category'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '従来の仕組み' : 'Previous System'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '新制度（2026年4月）' : 'New System (April 2026)'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.greenEnergy.comparison[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium">{row.category}</td>
                          <td className="py-3 pr-4 text-muted-foreground">{row.before}</td>
                          <td className="py-3 font-medium text-emerald-600">{row.after}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

          {/* Paywall check */}
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

                {/* Industry Impact Assessment */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {content.industryImpact.title[isJapanese ? 'ja' : 'en']}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'セクター' : 'Sector'}</th>
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '影響分析' : 'Impact Analysis'}</th>
                            <th className="text-left py-2 font-semibold">{isJapanese ? '推奨アクション' : 'Recommended Action'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.industryImpact.data.map((row, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 pr-4 font-medium">{row.sector[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 pr-4 text-muted-foreground">{row.impact[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 text-muted-foreground">{row.action[isJapanese ? 'ja' : 'en']}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Investor Sentiment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {content.investorSentiment.title[isJapanese ? 'ja' : 'en']}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '指標' : 'Indicator'}</th>
                            <th className="text-left py-2 font-semibold">{isJapanese ? '数値・状況' : 'Value / Status'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.investorSentiment.data.map((row, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 pr-4 font-medium">{row.indicator[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3">{row.value[isJapanese ? 'ja' : 'en']}</td>
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

export default ThaiGovPolicyJapanese;
