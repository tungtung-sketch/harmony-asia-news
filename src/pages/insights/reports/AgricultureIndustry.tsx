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
  Wheat
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const AgricultureIndustry = () => {
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
        'agriculture-industry',
        isJapanese ? 'タイ農業産業トレンドレポート' : 'Thailand Agriculture Industry Trends Report',
        'agriculture',
        lang
      );
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker('agriculture-industry', 'Thailand Agriculture Industry Trends Report', 'タイ農業産業トレンドレポート', 'Agriculture', hasFullAccess);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(
        'agriculture-industry',
        isJapanese ? 'タイ農業産業トレンドレポート' : 'Thailand Agriculture Industry Trends Report',
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
    { id: 'facts', label: isJapanese ? '市場・政策・動向に関する情報' : 'Market, Policy & Trends Information' },
    { id: 'opinion', label: isJapanese ? 'WaLensの見解と示唆' : 'Opinion & Implication from WaLens' },
    { id: 'recommendation', label: isJapanese ? '日本企業経営者への提言' : 'Recommendation for Japanese Executives' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: {
      en: "Thailand's Agriculture Sector: Compliance, Climate & Value-Add — Where Japanese Capital Should Play",
      ja: "タイ農業セクター：コンプライアンス・気候変動・高付加価値化——日本企業の資本投下先はどこか？"
    },
    subheadline: {
      en: "The structural shift from volume-based commodity exports to traceable, premium, processed agriculture",
      ja: "量的コモディティ輸出からトレーサブル・プレミアム・加工型農業への構造転換"
    },
    category: {
      en: "Agriculture / Food & Agribusiness",
      ja: "農業 / 食品・アグリビジネス"
    },
    lastUpdated: "2026-02-08",
    executiveSummary: {
      en: [
        "Thailand's agriculture sector is entering a 'compliance + climate + value-add' cycle: faster near-term growth (~2–3% GDP growth in 2026), tighter market-access rules, and increasing differentiation between commodity exporters and traceable, premium, processed exporters. (Doc: Executive takeaways)",
        "Agriculture contributes ~8.8% of GDP (2022) but employs ~12.7 million workers (~30% of the labor force)—a structural signal that productivity gains and consolidation remain a policy priority. (Doc: Thailand's Taxonomy Document)",
        "The EUDR timetable has been pushed back but not removed: obligations for large/medium operators from 30 December 2026, covering commodities highly relevant to Thailand (rubber, palm oil, coffee, cocoa, wood). (Doc: EUDR section)",
        "Rice exports beat expectations (7.9M tonnes, ฿148B in 2025); durian exports reached industrial scale (833K tonnes to China, US$3.7B, 97.4% market share). (Doc: Rice / Durian sections)",
        "BOI has introduced direct financial support (฿5B) for competitiveness and skills—explicitly including advanced agriculture and food processing—signaling a policy shift from tax-only incentives. (Doc: Investment Policy Shifts)"
      ],
      ja: [
        "タイ農業セクターは「コンプライアンス＋気候変動＋高付加価値化」サイクルに突入：短期的成長加速（2026年GDP成長率約2〜3%）、厳格化する市場アクセス規制、コモディティ輸出者とトレーサブル・プレミアム・加工型輸出者の二極化が進行。(Doc: Executive takeaways)",
        "農業はGDPの約8.8%（2022年）だが、約1,270万人（労働力の約30%）を雇用——生産性向上と集約化が引き続き政策優先事項であることを示す構造的シグナル。(Doc: Thailand's Taxonomy Document)",
        "EUDR（EU森林破壊規制）のタイムラインは延期されたが撤廃されていない：大企業・中堅企業の義務適用は2026年12月30日から。タイに関連性の高いコモディティ（ゴム、パーム油、コーヒー、カカオ、木材）が対象。(Doc: EUDR section)",
        "米輸出は予想を上回る実績（790万トン、1,482億バーツ、2025年）。ドリアン輸出は産業規模に到達（中国向け83.3万トン、37億ドル、市場シェア97.4%）。(Doc: Rice / Durian sections)",
        "BOIは競争力強化・人材育成向けの直接財政支援（50億バーツ）を導入——先端農業・食品加工を明示的に包含し、税制優遇のみから政策転換のシグナル。(Doc: Investment Policy Shifts)"
      ]
    },
    marketStructure: {
      title: { en: "Agricultural Sub-Sector Overview", ja: "農業サブセクター概観" },
      segments: {
        en: [
          { name: "Rice", share: "Strategic", growth: "7.9M t exported (2025)", players: "CP, Thai Rice Exporters Assoc., government programs" },
          { name: "Tropical Fruits (Durian)", share: "US$3.7B", growth: "+97.4% China share", players: "Thai exporters, digital commerce platforms" },
          { name: "Cassava", share: "~25% global export", growth: "Volume up, value mixed", players: "Thai Tapioca Starch Assoc., starch processors" },
          { name: "Poultry (Processed)", share: "Export leader", growth: "Tailwind from Brazil flu", players: "CP Foods, GFPT, Betagro" },
          { name: "Shrimp", share: "~US$1.08B", growth: "-3.6% YoY (2026E)", players: "Thai Union, local farms, KASIKORN Research" },
          { name: "Rubber", share: "Climate-exposed", growth: "Flood risk + EUDR", players: "Southern processors, tire supply chains" }
        ],
        ja: [
          { name: "米", share: "戦略的", growth: "790万トン輸出（2025年）", players: "CP、タイ米輸出協会、政府プログラム" },
          { name: "熱帯果実（ドリアン）", share: "37億ドル", growth: "中国シェア97.4%", players: "タイ輸出業者、デジタルコマースプラットフォーム" },
          { name: "キャッサバ", share: "世界輸出の約25%", growth: "数量増、金額混在", players: "タイタピオカ澱粉協会、澱粉加工業者" },
          { name: "鶏肉（加工品）", share: "輸出リーダー", growth: "ブラジル鳥インフル追い風", players: "CPフーズ、GFPT、ベタグロ" },
          { name: "エビ", share: "約10.8億ドル", growth: "-3.6% YoY（2026年予測）", players: "タイユニオン、地場養殖、カシコンリサーチ" },
          { name: "ゴム", share: "気候リスク露出", growth: "洪水リスク＋EUDR", players: "南部加工業者、タイヤサプライチェーン" }
        ]
      }
    },
    keyPlayers: {
      title: { en: "Strategic Actor Map", ja: "戦略的アクターマップ" },
      data: {
        en: [
          { segment: "Thai Agri-Conglomerates", examples: "CP Group, Betagro, Thai Union", status: "Vertical integration" },
          { segment: "Japanese Trading Houses", examples: "Mitsubishi Corp, Mitsui, Itochu, Sojitz", status: "Supply chain orchestration" },
          { segment: "Government Bodies", examples: "OAE, DOAE, BOI, Bank of Thailand", status: "Policy + taxonomy + traceability" },
          { segment: "Chinese Demand System", examples: "China fruit importers, digital platforms", status: "Pulling QA standards forward" }
        ],
        ja: [
          { segment: "タイ農業コングロマリット", examples: "CPグループ、ベタグロ、タイユニオン", status: "垂直統合" },
          { segment: "日系商社", examples: "三菱商事、三井物産、伊藤忠、双日", status: "サプライチェーン統合" },
          { segment: "政府機関", examples: "OAE、DOAE、BOI、タイ中央銀行", status: "政策＋タクソノミー＋トレーサビリティ" },
          { segment: "中国需要システム", examples: "中国果物輸入業者、デジタルプラットフォーム", status: "QA基準を前倒し" }
        ]
      }
    },
    policyInsights: {
      title: { en: "Policy & Regulation", ja: "政策・規制" },
      items: {
        en: [
          { policy: "EUDR (EU Deforestation Regulation)", content: "Obligations for large/medium operators from 30 December 2026; micro/small from 30 June 2027. Covers rubber, palm oil, coffee, cocoa, wood and derived products (tyres, furniture, chocolate, leather). Thai DOAE is already building plot-level geolocation covering 20% of production area for oil palm, coffee, and cocoa. (Doc: EUDR section)", citation: "EU Official Sources; DOAE 2026 Direction" },
          { policy: "Thailand Taxonomy Phase 2", content: "Released May 2025, explicitly covers agriculture as a high-GHG sector. Uses practice-based transition criteria for key Thai crops (rice, sugarcane, oil palm, rubber, cassava). Board includes BOT, SEC, SET, and Dept. of Climate Change. (Doc: Thailand's Taxonomy Document)", citation: "Bank of Thailand Joint Press Release, May 2025" },
          { policy: "BCG Model (Bio-Circular-Green)", content: "National framework prioritizing smart farming, food technology (shelf-life extension), alternative proteins as explicit agriculture focus areas. Not rhetoric only—proven by processed poultry and China-facing fruit program successes. (Doc: Policy intent section)", citation: "Thailand Foreign Affairs BCG Framework" },
          { policy: "BOI Direct Financial Support", content: "New ฿5 billion program of direct financial aid (not only tax incentives) to boost competitiveness and workforce skills, explicitly including biotechnology, advanced agriculture, and food processing. Jan-Sep 2025 investment applications totaled ฿1.37 trillion (+94% YoY). (Doc: Investment Policy Shifts)", citation: "Reuters; Thai PRD, 2025" }
        ],
        ja: [
          { policy: "EUDR（EU森林破壊規制）", content: "大企業・中堅企業の義務適用は2026年12月30日から、零細・小企業は2027年6月30日から。ゴム、パーム油、コーヒー、カカオ、木材および派生品（タイヤ、家具、チョコレート、皮革）が対象。タイDOAEはオイルパーム、コーヒー、カカオの生産面積20%について圃場レベルの位置情報整備を推進中。(Doc: EUDR section)", citation: "EU公式資料; DOAE 2026年方針" },
          { policy: "タイ・タクソノミー Phase 2", content: "2025年5月公表、農業を高GHG排出セクターとして明示的にカバー。主要タイ作物（米、サトウキビ、オイルパーム、ゴム、キャッサバ）に実践ベースの移行基準を適用。理事会にはBOT、SEC、SET、気候変動・環境局を含む。(Doc: Thailand's Taxonomy Document)", citation: "タイ中央銀行共同プレスリリース、2025年5月" },
          { policy: "BCGモデル（バイオ・サーキュラー・グリーン）", content: "スマート農業、食品技術（賞味期限延長）、代替タンパク質を農業分野の明示的な重点領域とする国家フレームワーク。加工鶏肉や中国向け果実プログラムの成功で実証済み。(Doc: Policy intent section)", citation: "タイ外務省BCGフレームワーク" },
          { policy: "BOI直接財政支援", content: "競争力強化・人材育成向けの50億バーツの新プログラム（税制優遇のみでなく直接的財政支援）。バイオテクノロジー、先端農業、食品加工を明示的に含む。2025年1-9月の投資申請総額は1.37兆バーツ（前年比+94%）。(Doc: Investment Policy Shifts)", citation: "ロイター; タイPRD、2025年" }
        ]
      }
    },
    opportunities: {
      en: [
        "Traceability infrastructure: EUDR-readiness services for rubber, palm oil, coffee, cocoa supply chains — Thai DOAE already building plot-level data backbone (Doc: EUDR section)",
        "Premium fruit cold chain: Industrial-scale durian/fruit QA + cold chain partnerships leveraging Japan's logistics expertise (Doc: China-driven horticulture)",
        "Processed poultry expansion: Japan is a major destination for Thai processed chicken; Brazil's bird flu creating market share opportunity (Doc: Poultry section)",
        "Modified starch & bio-based ingredients: Moving cassava value chain upstream from commodity chips to specialized starches (Doc: Cassava section)",
        "Sustainable finance alignment: Use Thailand Taxonomy Phase 2 to structure transition CAPEX and communicate with Thai lenders (Doc: Taxonomy section)"
      ],
      ja: [
        "トレーサビリティインフラ：ゴム、パーム油、コーヒー、カカオのサプライチェーン向けEUDR対応サービス——タイDOAEは既に圃場レベルのデータ基盤を構築中 (Doc: EUDR section)",
        "プレミアム果物コールドチェーン：産業規模のドリアン/果物QA＋日本の物流ノウハウを活用したコールドチェーンパートナーシップ (Doc: China-driven horticulture)",
        "加工鶏肉の拡大：日本はタイ加工鶏肉の主要仕向地；ブラジルの鳥インフルによる市場シェア機会 (Doc: Poultry section)",
        "変性澱粉・バイオ原料：キャッサババリューチェーンをコモディティチップから特殊澱粉へ上流シフト (Doc: Cassava section)",
        "サステナブルファイナンス活用：タイ・タクソノミーPhase 2を活用してトランジションCAPEXを構築しタイの金融機関と連携 (Doc: Taxonomy section)"
      ]
    },
    risks: {
      en: [
        "Climate volatility: Southern Thailand floods threatened rubber output by 90,000 tonnes (฿4.5B losses); rainfall unpredictability affects all crops (Doc: Rubber section)",
        "Crop switching instability: Sugarcane-to-cassava shift (cane price ฿900/t, -22% YoY) can swing starch supply and affect cost baselines for food ingredients (Doc: Crop Switching)",
        "Shrimp structural decline: Fourth consecutive year of export value decline projected; Thai shrimp lacks competitiveness vs. Ecuador, Indonesia (Doc: Shrimp section)",
        "Farm-level adoption gaps: Labor shortage, water-access inequality, and data constraints at smallholder level slow technology rollout (Doc: Taxonomy background)",
        "EUDR partial coverage risk: DOAE's initial 20% production area data coverage means uneven compliance capacity across suppliers (Doc: EUDR section)"
      ],
      ja: [
        "気候変動リスク：南部タイの洪水がゴム生産を9万トン減少させる恐れ（45億バーツの損失）；降雨の予測不能性が全作物に影響 (Doc: Rubber section)",
        "作物転換の不安定性：サトウキビからキャッサバへのシフト（サトウキビ価格900バーツ/トン、前年比-22%）が澱粉供給を変動させ食品原料のコストベースに影響 (Doc: Crop Switching)",
        "エビの構造的衰退：輸出額の4年連続減少が予測；タイのエビはエクアドル、インドネシアに対し競争力不足 (Doc: Shrimp section)",
        "農場レベルの導入格差：労働力不足、水アクセスの不平等、小規模農家レベルのデータ制約が技術展開を遅延 (Doc: Taxonomy background)",
        "EUDR部分的カバレッジリスク：DOAEの初期生産面積データカバレッジ20%はサプライヤー間でコンプライアンス能力に偏りを生む (Doc: EUDR section)"
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
            title: "Agriculture Is Smaller in GDP, Bigger in Strategic Weight",
            content: "From a Japanese executive lens, Thailand's agriculture sector matters less as a 'GDP share' story and more as a workforce + land + water + trade-access system that shapes labor markets, political stability, and upstream supply security for food, retail, chemicals, and automotive-related materials. The ~30% labor force share means any disruption in agriculture reverberates across consumer spending and social stability—a systemic risk that pure GDP analysis misses. (Doc: Macro Reality)"
          },
          {
            title: "China Is Pulling Thai Agriculture Standards Forward Faster Than the EU",
            content: "The most underappreciated dynamic is that China's demand for quality-assured Thai fruit (especially durian at US$3.7B) is forcing 'orchard-to-border' standards, real-time monitoring, and digital commercialization—investments that happen to also prepare Thailand for Western ESG rules. Japanese companies obsessing over EUDR compliance may be missing that China's commercial pull is the faster standardization driver. (Doc: China-driven horticulture)"
          },
          {
            title: "Crop Switching Is the New Semiconductor Shortage Signal",
            content: "The sugarcane-to-cassava shift driven by disease and price collapse is not just an agricultural footnote—it is a leading indicator for ingredient pricing across food, feed, and bio-based materials. Japanese manufacturers using starches, sweeteners, and bio-based intermediates should treat Thai crop allocation as a procurement KPI, similar to how automotive firms track semiconductor capacity. Price shocks originate upstream, not at the factory gate. (Doc: Crop Switching / Cassava)"
          },
          {
            title: "The 'Last Mile' Problem Favors Hybrid Models, Not Pure Tech Plays",
            content: "What remains structurally hard is farm-level execution: labor constraints, management gaps, and uneven water access force hybrid models (aggregation + contract farming + service providers) rather than pure direct-to-farm technology rollouts. Japanese firms should not plan for 'precision agriculture at scale' but for 'precision aggregation'—layering technology onto Thailand's existing contract farming and cooperative structures. (Doc: Technology and investment section)"
          }
        ],
        ja: [
          {
            title: "農業はGDPシェアでは小さいが、戦略的重みは大きい",
            content: "日系経営者の視点では、タイ農業セクターは「GDP比率」の話としてよりも、労働市場、政治的安定性、食品・小売・化学・自動車関連素材の上流供給安全保障を形成する「労働力＋土地＋水＋貿易アクセス」システムとしてはるかに重要である。労働力の約30%を占めるということは、農業のいかなる混乱も消費支出と社会的安定に波及する——純粋なGDP分析では見落とされるシステミックリスクである。(Doc: Macro Reality)"
          },
          {
            title: "中国がEUより速くタイ農業基準を引き上げている",
            content: "最も過小評価されているダイナミクスは、品質保証されたタイ果物（特にドリアン37億ドル）に対する中国の需要が「果樹園から国境まで」の基準、リアルタイムモニタリング、デジタル商業化を強制していることである——これらの投資は偶然にもタイを西側ESGルールにも準備させる。EUDRコンプライアンスに執着する日本企業は、中国の商業的プルがより速い標準化ドライバーであることを見落としている可能性がある。(Doc: China-driven horticulture)"
          },
          {
            title: "作物転換は新たな半導体不足シグナルである",
            content: "病害と価格崩壊に起因するサトウキビからキャッサバへのシフトは、単なる農業の脚注ではなく、食品・飼料・バイオ素材全般の原料価格の先行指標である。澱粉、甘味料、バイオ中間体を使用する日本の製造業者は、自動車企業が半導体キャパシティを追跡するように、タイの作物配分を調達KPIとして扱うべきである。価格ショックは工場ゲートではなく上流で発生する。(Doc: Crop Switching / Cassava)"
          },
          {
            title: "「ラストマイル」問題はハイブリッドモデルを有利にし、純粋テックプレイを不利にする",
            content: "構造的に困難なのは農場レベルの実行である：労働力の制約、管理のギャップ、不均等な水アクセスが、純粋な農場直接型テクノロジーロールアウトではなく、ハイブリッドモデル（集約＋契約農業＋サービスプロバイダー）を強制する。日本企業は「大規模精密農業」ではなく、「精密集約」——タイの既存の契約農業と協同組合構造の上にテクノロジーを重ねるモデルを計画すべきである。(Doc: Technology and investment section)"
          }
        ]
      }
    },
    recommendation: {
      title: { en: "Strategic Recommendation for Japanese Executives", ja: "日本企業経営者への戦略的提言" },
      intro: {
        en: "Based on WaLens' analysis, the following strategic perspective is offered—not as an operational checklist, but as a framework for executive decision-making.",
        ja: "WaLensの分析に基づき、以下の戦略的視点を提供する——オペレーショナルなチェックリストとしてではなく、経営判断のためのフレームワークとして。"
      },
      content: {
        en: `First, treat traceability as infrastructure, not paperwork. With EUDR keyed to 2026/2027 application dates and requiring proof against deforestation for rubber, palm oil, coffee, cocoa, and derived products, Japanese firms should map whether any Thailand-linked SKU or component falls into scope. Because DOAE is already building plot-level data coverage (20% for certain crops), Japanese buyers can accelerate readiness by contracting for geolocation + supplier plot lists + auditable practice evidence rather than waiting for full national coverage. (Doc: EUDR / DOAE section)

Second, anchor bets in Thailand's proven export engines, not only staple crops. Differentiation is increasingly needed in rice; simultaneously, durian exports to China are at industrial scale powered by QA and digital commercialization. For Japanese groups with retail/foodservice reach, the asymmetric opportunities are in (a) premium fruit programs with QA and cold chain, and (b) processed proteins where Thailand has integrated supply chains and Japan is a major market. (Doc: Rice / Durian / Poultry sections)

Third, monitor 'land reallocation' signals as leading indicators for ingredient pricing. The sugarcane-to-cassava shift implies that Thai starch supply trends can swing quickly, affecting cost baselines for food ingredients and industrial starch derivatives. Japanese manufacturers should treat Thai crop allocation as a procurement KPI—because price shocks originate upstream, not at the factory gate. (Doc: Crop Switching)

Fourth, differentiate poultry and shrimp in risk models. Poultry has near-term upside from competitor constraints and Thailand's processed-product strengths, while shrimp faces persistent competitiveness limits. Plan for 'stability through processing and branding' in seafood rather than assuming a volume-led rebound; Thailand's processed chicken may be a more reliable base for Japan-facing prepared-food growth. (Doc: Poultry / Shrimp sections)

Fifth, use Thailand's Taxonomy as a governance and financing advantage. Thailand Taxonomy Phase 2 explicitly covers agriculture; Japanese investors and subsidiaries can use it to structure transition CAPEX roadmaps, communicate with Thai lenders in local terms, and pre-empt future disclosure expectations. (Doc: Taxonomy section)

Finally, exploit the policy window: capability-building support is expanding. With BOI introducing direct financial support for training and competitiveness—including advanced agriculture and food processing—Japanese firms should consider locating 'regional excellence' units in Thailand that combine processing, QA, and traceability operations, especially where Thailand already wins in export logistics and standards. (Doc: Investment Policy Shifts)`,
        ja: `第一に、トレーサビリティをペーパーワークではなくインフラとして扱うこと。EUDRが2026/2027年の適用日を設定し、ゴム、パーム油、コーヒー、カカオ、派生品について森林破壊との非関連の証明を要求する中、日本企業はタイ関連のSKUやコンポーネントが対象範囲に入るかをマッピングすべきである。DOAEが既に圃場レベルのデータカバレッジ（特定作物で20%）を構築しているため、日本のバイヤーは全国カバレッジを待つのではなく、位置情報＋サプライヤー圃場リスト＋監査可能な実践証拠の契約によって準備を加速できる。(Doc: EUDR / DOAE section)

第二に、主食作物だけでなくタイの実証済み輸出エンジンに賭けること。米では差別化がますます必要；同時に、中国向けドリアン輸出はQAとデジタル商業化に支えられ産業規模に達している。小売/外食リーチを持つ日系グループにとっての非対称的な機会は、(a) QAとコールドチェーンを備えたプレミアム果物プログラム、(b) タイが統合サプライチェーンを持ち日本が主要市場である加工タンパク質にある。(Doc: Rice / Durian / Poultry sections)

第三に、「土地再配分」シグナルを原料価格の先行指標として監視すること。サトウキビからキャッサバへのシフトは、タイの澱粉供給トレンドが急速に変動し食品原料や工業用澱粉誘導体のコストベースに影響しうることを示唆する。日本の製造業者はタイの作物配分を調達KPIとして扱うべきである——価格ショックは工場ゲートではなく上流で発生するからである。(Doc: Crop Switching)

第四に、鶏肉とエビをリスクモデルで差別化すること。鶏肉は競合の制約とタイの加工品の強みから短期的上昇余地がある一方、エビは持続的な競争力の限界に直面している。水産物では数量主導のリバウンドを仮定するのではなく「加工とブランディングによる安定」を計画すべき；タイの加工鶏肉は日本向け調理済食品の成長のためのより信頼性の高い基盤かもしれない。(Doc: Poultry / Shrimp sections)

第五に、タイ・タクソノミーをガバナンスと資金調達の優位性として活用すること。タイ・タクソノミーPhase 2は農業を明示的にカバーしており、日本の投資家・子会社はこれを活用してトランジションCAPEXロードマップを構築し、タイの金融機関と現地の言葉で対話し、将来の開示要件を先取りできる。(Doc: Taxonomy section)

最後に、政策の窓を活用すること：能力構築支援が拡大中。BOIが先端農業・食品加工を含む訓練・競争力向上のための直接的財政支援を導入する中、日本企業は加工・QA・トレーサビリティ業務を組み合わせた「地域エクセレンス」拠点のタイ設置を検討すべきである——特にタイが輸出物流と基準で既に優位を持つ分野において。(Doc: Investment Policy Shifts)`
      }
    },
    dataAppendix: {
      title: { en: "Data Appendix", ja: "データ付録" },
      tables: {
        exportSnapshot: {
          title: { en: "Key Agricultural Export Snapshot (2025-2026E)", ja: "主要農産物輸出スナップショット（2025-2026年予測）" },
          data: [
            { commodity: isJapanese ? "米" : "Rice", volume: "7.9M t (2025)", value: "฿148.2B", trend: isJapanese ? "安定成長" : "Stable growth", japanRelevance: isJapanese ? "市場開発対象" : "Market development target" },
            { commodity: isJapanese ? "ドリアン" : "Durian", volume: "833K t (2024)", value: "US$3.7B", trend: isJapanese ? "急成長" : "Rapid growth", japanRelevance: isJapanese ? "冷コールドチェーン技術" : "Cold chain tech" },
            { commodity: isJapanese ? "キャッサバ" : "Cassava", volume: "~25% global share", value: isJapanese ? "変動的" : "Volatile", trend: isJapanese ? "数量増・金額変動" : "Volume up, value mixed", japanRelevance: isJapanese ? "澱粉原料調達" : "Starch sourcing" },
            { commodity: isJapanese ? "加工鶏肉" : "Processed Chicken", volume: isJapanese ? "輸出リーダー" : "Export leader", value: isJapanese ? "上昇傾向" : "Rising", trend: isJapanese ? "追い風" : "Tailwind", japanRelevance: isJapanese ? "主要仕向地" : "Major destination" },
            { commodity: isJapanese ? "エビ" : "Shrimp", volume: isJapanese ? "30万トン台停滞" : "Stagnant ~300K t", value: "~US$1.08B", trend: "-3.6% YoY", japanRelevance: isJapanese ? "加工・ブランド戦略" : "Processing & branding" },
            { commodity: isJapanese ? "ゴム" : "Rubber", volume: isJapanese ? "気候リスク露出" : "Climate-exposed", value: isJapanese ? "洪水で45億バーツ損失リスク" : "฿4.5B flood risk", trend: isJapanese ? "EUDR対応必要" : "EUDR compliance needed", japanRelevance: isJapanese ? "タイヤ・自動車SC" : "Tire & auto supply chain" }
          ]
        }
      }
    },
    sources: {
      title: { en: "Sources & Methodology", ja: "出典・方法論" },
      list: {
        en: [
          "Office of Agricultural Economics (OAE) — 2026 Agricultural GDP Growth Forecast (PRD Channel)",
          "Bank of Thailand — Thailand Taxonomy Phase 2: Agriculture Sector (May 2025)",
          "Thai Department of Agricultural Extension (DOAE) — 2026 Direction: Climate-Smart Agriculture",
          "EU Official Sources — EUDR Regulation & Postponement Confirmation (2026/2027)",
          "Thai Government PRD — Rice Export Statistics 2025 (7.9M tonnes)",
          "Thailand.go.th — Durian Export Strategy to China (833K tonnes, US$3.7B, 2024)",
          "KASIKORN RESEARCH CENTER — Shrimp Export Value Forecast 2026 (US$1.075B)",
          "Reuters — BOI ฿5B Competitiveness Fund; Thai Poultry Industry Outlook 2025",
          "Krungsri Research — Thailand Industry Outlook: Cassava, Chicken, Agriculture 2025-2027",
          "WaLens Field Research — Executive Interviews & Source Verification (Q1 2026)"
        ],
        ja: [
          "農業経済局（OAE）— 2026年農業GDP成長率予測（PRDチャネル）",
          "タイ中央銀行（BOT）— タイ・タクソノミーPhase 2：農業セクター（2025年5月）",
          "タイ農業普及局（DOAE）— 2026年方針：気候スマート農業",
          "EU公式資料 — EUDR規制と延期確認（2026/2027年）",
          "タイ政府PRD — 米輸出統計2025年（790万トン）",
          "Thailand.go.th — 中国向けドリアン輸出戦略（83.3万トン、37億ドル、2024年）",
          "カシコンリサーチセンター — エビ輸出額予測2026年（10.75億ドル）",
          "ロイター — BOI 50億バーツ競争力ファンド；タイ鶏肉産業見通し2025年",
          "クルンシーリサーチ — タイ産業見通し：キャッサバ、鶏肉、農業 2025-2027年",
          "WaLensフィールドリサーチ — 経営幹部インタビュー・ソース検証（2026年Q1）"
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
        title={isJapanese ? "タイ農業産業トレンドレポート | WaLens" : "Thailand Agriculture Industry Trends Report | WaLens"}
        description={isJapanese 
          ? "タイ農業セクターの包括的分析。コンプライアンス、気候変動、高付加価値化の構造転換と日本企業の戦略的機会。"
          : "Comprehensive analysis of Thailand's agriculture sector. Compliance, climate, and value-add structural shift with strategic opportunities for Japanese companies."
        }
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6 md:py-12 max-w-4xl">
          <div className="mb-6">
            <Breadcrumb 
              items={[
                { label: isJapanese ? "インサイト" : "Insights", href: "/insights" },
                { label: isJapanese ? "農業" : "Agriculture", href: "/insights/agriculture" },
                { label: isJapanese ? "産業トレンド" : "Industry Trends" }
              ]}
            />
          </div>

          {/* Hero Section */}
          <section className="mb-8 md:mb-12">
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img 
                src={heroImage} 
                alt={isJapanese ? "タイ農業産業" : "Thailand Agriculture Industry"}
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
                  {isJapanese ? "読了時間：12分" : "12 min read"}
                </span>
              </div>
              <BookmarkButton article={{ slug: 'agriculture-industry', title: isJapanese ? 'タイ農業産業トレンドレポート' : 'Thailand Agriculture Industry Trends Report', language: lang === 'ja' ? 'JP' : 'EN', url: '/insights/reports/agriculture-industry', category: 'Agriculture' }} variant="button" />
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
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wheat className="h-5 w-5" />
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

                {/* Data Appendix */}
                <div onClick={handleDataAppendixAccess}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        {isJapanese ? content.dataAppendix.tables.exportSnapshot.title.ja : content.dataAppendix.tables.exportSnapshot.title.en}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2 font-semibold">{isJapanese ? "品目" : "Commodity"}</th>
                              <th className="text-left p-2 font-semibold">{isJapanese ? "数量" : "Volume"}</th>
                              <th className="text-left p-2 font-semibold">{isJapanese ? "金額" : "Value"}</th>
                              <th className="text-left p-2 font-semibold">{isJapanese ? "トレンド" : "Trend"}</th>
                              <th className="text-left p-2 font-semibold">{isJapanese ? "日本との関連" : "Japan Relevance"}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {content.dataAppendix.tables.exportSnapshot.data.map((row, i) => (
                              <tr key={i} className="border-b last:border-0">
                                <td className="p-2 font-medium">{row.commodity}</td>
                                <td className="p-2">{row.volume}</td>
                                <td className="p-2">{row.value}</td>
                                <td className="p-2">{row.trend}</td>
                                <td className="p-2">{row.japanRelevance}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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

export default AgricultureIndustry;
