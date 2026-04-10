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
  ChevronRight, Crown, Database, Flame, Leaf, Ship, Fuel, Building
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-oil-crisis-thai.jpg';

const OilCrisisThaiIndustry = () => {
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
        'oil-crisis-thai-industry',
        isJapanese ? '2026年米イラン紛争に伴うタイのエネルギー危機：製造業・環境企業への構造的影響' : '2026 US-Iran Conflict Energy Crisis: Structural Impact on Thai Manufacturing & Environmental Companies',
        'services',
        lang
      );
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker('oil-crisis-thai-industry', '2026 Oil Crisis: Impact on Thai Manufacturing & Decarbonization', '2026年石油危機：タイ製造業・脱炭素化への影響', 'Services', hasFullAccess);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(
        'oil-crisis-thai-industry',
        isJapanese ? '2026年石油危機：タイ製造業・脱炭素化への影響' : '2026 Oil Crisis: Impact on Thai Manufacturing & Decarbonization',
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
    { id: 'facts', label: isJapanese ? '市場・政策・動向に関する情報' : 'Market, Policy & Trends Information' },
    { id: 'opinion', label: isJapanese ? 'WaLensの見解と示唆' : 'Opinion & Implication from WaLens' },
    { id: 'recommendation', label: isJapanese ? '日本企業経営者への提言' : 'Recommendation for Japanese Executives' },
    { id: 'data-appendix', label: isJapanese ? 'データ付録' : 'Data Appendix' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: {
      en: "2026 US-Iran Conflict Energy Crisis: Structural Impact on Thai Manufacturing & Advanced Decarbonization Management Strategy",
      ja: "2026年3月米イラン紛争に伴うタイのエネルギー危機：製造業および環境関連企業への構造的影響と高度な脱炭素管理戦略"
    },
    subheadline: {
      en: "How the Hormuz Strait blockade is reshaping Thailand's industrial cost structure, forcing a coal reversion paradox, and driving explosive demand for digital GHG management platforms",
      ja: "ホルムズ海峡封鎖がタイの産業コスト構造をいかに再編し、石炭回帰のパラドックスを引き起こし、デジタルGHG管理プラットフォームへの爆発的需要を生んでいるか"
    },
    category: {
      en: "Energy / Manufacturing / Decarbonization",
      ja: "エネルギー / 製造業 / 脱炭素化"
    },
    lastUpdated: "2026-03-29",

    // ── Executive Summary ──
    executiveSummary: {
      en: [
        "The US-Israeli military strike on Iran (Feb 28, 2026) triggered the effective closure of the Strait of Hormuz, disrupting ~20% of global oil supply. Brent crude peaked at $126/barrel; Asian spot LNG surged 140% to $30.48/MMBtu; Singapore diesel rose 142% to $223/barrel.",
        "Thailand is Asia's most energy-vulnerable economy: net energy imports reach ~6% of GDP. 58% of crude oil and 30% of LNG pass through the Strait. The crisis threatens not just price hikes but physical fuel depletion.",
        "Manufacturing (25% of GDP, 6.2M jobs) faces a triple crisis: energy cost explosions (fuel/power costs hitting 50% of total manufacturing costs in heavy industry), logistics paralysis (container shipping costs up 3.5x), and SME cascading bankruptcy risk.",
        "The government's emergency response — full-capacity coal power plant operation — paradoxically undermines Thailand's Paris Agreement target (47% GHG reduction by 2035), adding an estimated 3.2M tonnes of CO₂ annually.",
        "Grid emission factors are dynamically shifting as coal replaces gas in the power mix, making corporate carbon accounting unreliable — creating explosive demand for real-time digital GHG management platforms with 15-minute data granularity."
      ],
      ja: [
        "米国・イスラエルによるイランへの軍事攻撃（2026年2月28日）がホルムズ海峡の事実上の封鎖を引き起こし、世界の石油供給の約20%が遮断された。ブレント原油は126ドル/バレルのピーク、アジアスポットLNGは140%上昇し30.48ドル/MMBtu、シンガポールディーゼルは142%上昇し223ドル/バレルに達した。",
        "タイはアジアで最もエネルギーに脆弱な経済構造：純エネルギー輸入額はGDPの約6%。原油の58%、LNGの30%がホルムズ海峡を経由。価格高騰だけでなく、燃料の物理的枯渇が脅威となっている。",
        "製造業（GDP25%、620万人雇用）は三重苦に直面：エネルギーコスト爆発（重工業で燃料・電力コストが総製造コストの50%に到達）、物流麻痺（コンテナ配送料3.5倍）、中小企業の連鎖倒産リスク。",
        "政府の緊急対応——石炭火力発電所のフル稼働——がパリ協定目標（2035年までにGHG47%削減）を逆説的に毀損し、年間推定320万トンのCO₂を追加排出する。",
        "石炭がガスに代替することでグリッド排出係数が動的に変動し、企業の炭素会計が不正確に——15分単位のデータ粒度を持つリアルタイム・デジタルGHG管理プラットフォームへの爆発的需要が生まれている。"
      ]
    },

    // ── Facts: Energy Market Impact ──
    energyMarketImpact: {
      title: { en: "Energy Price Impact (March 2026 Crisis)", ja: "エネルギー価格への影響（2026年3月危機）" },
      data: {
        en: [
          { indicator: "Brent Crude", preCrisis: "$72/bbl", peak: "$126/bbl", change: "+75.0%" },
          { indicator: "Dubai Crude", preCrisis: "$71/bbl", peak: "$115/bbl", change: "+61.9%" },
          { indicator: "Asian Spot LNG", preCrisis: "$12.70/MMBtu", peak: "$30.48/MMBtu", change: "+140.0%" },
          { indicator: "Singapore Diesel", preCrisis: "$92/bbl", peak: "$223/bbl", change: "+142.4%" },
          { indicator: "Gold", preCrisis: "$5,000/oz", peak: "$4,550/oz", change: "-9.0%" }
        ],
        ja: [
          { indicator: "ブレント原油", preCrisis: "72ドル/バレル", peak: "126ドル/バレル", change: "+75.0%" },
          { indicator: "ドバイ原油", preCrisis: "71ドル/バレル", peak: "115ドル/バレル", change: "+61.9%" },
          { indicator: "アジアスポットLNG", preCrisis: "12.70ドル/MMBtu", peak: "30.48ドル/MMBtu", change: "+140.0%" },
          { indicator: "シンガポール市場ディーゼル", preCrisis: "92ドル/バレル", peak: "223ドル/バレル", change: "+142.4%" },
          { indicator: "金", preCrisis: "5,000ドル/oz", peak: "4,550ドル/oz", change: "-9.0%" }
        ]
      }
    },

    // ── Manufacturing Sector Impact ──
    manufacturingImpact: {
      title: { en: "Manufacturing Sector Impact Forecast (FY2026)", ja: "製造業セクター別影響予測（2026年度）" },
      data: {
        en: [
          { sector: "Automotive & Parts", factor: "Fuel-driven logistics cost surge, consumer purchasing decline", mpiImpact: "Significant decline" },
          { sector: "Steel & Metal Processing", factor: "Direct energy cost burden (50% of total costs)", mpiImpact: "High production contraction risk" },
          { sector: "Food Processing", factor: "Transport cost increase, petroleum-based packaging cost surge", mpiImpact: "Severe margin compression" },
          { sector: "Electronics & Electrical", factor: "Double punch: US tariffs (19%) + energy costs", mpiImpact: "Export growth stagnation" },
          { sector: "Petrochemicals", factor: "Naphtha feedstock price explosion, logistics paralysis", mpiImpact: "Forced pivot to high-value specialties" }
        ],
        ja: [
          { sector: "自動車・同部品", factor: "燃料高による物流費増、消費者の購買意欲減退", mpiImpact: "顕著な低下" },
          { sector: "鉄鋼・金属加工", factor: "直接的なエネルギーコスト負担（コストの50%）", mpiImpact: "生産縮小のリスク大" },
          { sector: "食品加工", factor: "輸送費増、包装資材（石油由来）の価格高騰", mpiImpact: "利益率の大幅な圧迫" },
          { sector: "電子・電気機器", factor: "米国の関税措置（19%）とのダブルパンチ", mpiImpact: "輸出成長の停滞" },
          { sector: "石油化学", factor: "原料ナフサの価格爆発、物流麻痺", mpiImpact: "高付加価値製品への強制転換" }
        ]
      }
    },

    // ── Government Emergency Response ──
    governmentResponse: {
      title: { en: "Thai Government Emergency Response", ja: "タイ政府の緊急対応" },
      items: {
        en: [
          { measure: "Energy Ministry 'War Room'", detail: "Centralized crisis management monitoring oil supply, reserves, and price stabilization measures." },
          { measure: "Oil Fuel Fund Subsidy", detail: "Diesel capped at ~33 THB/L through subsidies of ~24 billion THB/day (~700 billion THB/month). Without subsidies, diesel would reach 57+ THB/L." },
          { measure: "LPG Account Deficit", detail: "LPG subsidy fund deficit exceeds 30 billion THB; fiscal sustainability in question." },
          { measure: "Coal Power Full Operation", detail: "Mae Moh and other coal plants ordered to maximum capacity to compensate for gas shortage — adding ~3.2M tonnes CO₂/year." },
          { measure: "100-Day Strategic Reserve", detail: "Government claims 100 days of fuel reserves, but panic buying by enterprises and individuals is creating artificial demand exceeding actual supply capacity." }
        ],
        ja: [
          { measure: "エネルギー省「ウォー・ルーム」設置", detail: "石油供給、備蓄、価格安定化措置を一元的に危機管理。" },
          { measure: "燃料油基金による補助金", detail: "ディーゼル価格を約33バーツ/Lに抑制するため1日約24億バーツ（月額約700億バーツ）の補助金を投入。補助金なしではディーゼルは57バーツ/L以上に。" },
          { measure: "LPGアカウント赤字", detail: "LPG補助金基金の赤字は300億バーツを超え、財政の持続可能性が問われている。" },
          { measure: "石炭火力フル稼働指示", detail: "メーモ石炭火力発電所等に最大キャパシティでの稼働を指示。ガス不足を補うが、年間約320万トンのCO₂を追加排出。" },
          { measure: "100日分の戦略備蓄", detail: "政府は100日分の燃料備蓄を主張するが、企業・個人の「不信感」による買い溜めが実際の供給能力を需要が上回る事態を招いている。" }
        ]
      }
    },

    // ── Decarbonization Paradox ──
    decarbonizationParadox: {
      title: { en: "The Decarbonization Paradox: Coal Reversion & Emission Factor Volatility", ja: "脱炭素化のパラドックス：石炭回帰と排出係数の変動" },
      items: {
        en: [
          { topic: "Paris Agreement Target at Risk", detail: "Coal reversion adds ~3.2M tonnes CO₂ annually — equivalent to ~5% of Thailand's 2037 emission reduction target. The 47% GHG reduction by 2035 target is now extremely difficult to achieve." },
          { topic: "Fossil Lock-In Dilemma", detail: "Environmental companies face a double hurdle: (1) Baht depreciation raises imported solar panel/battery costs, (2) Government focus shifts to 'stable supply' over long-term decarbonization investment incentives." },
          { topic: "Grid Emission Factor Volatility", detail: "TGO's Scope 2 emission factor was 0.4750 kgCO₂e/kWh at start of 2026. With coal shift, the actual factor significantly exceeds this. Companies unable to capture real-time changes face inaccurate carbon accounting." },
          { topic: "The Solar Cost Advantage", detail: "Despite the crisis, solar LCOE (33-75 USD/MWh) remains far cheaper than imported LNG (~38.66 USD/MMBtu). Domestic Gulf of Thailand gas (~5.51 USD/MMBtu) is also dramatically cheaper. The crisis accelerates 'energy security through decarbonization'." }
        ],
        ja: [
          { topic: "パリ協定目標が危機に", detail: "石炭回帰により年間約320万トンのCO₂を追加排出——タイの2037年排出削減目標の約5%に相当する負の影響。2035年までにGHG47%削減目標の達成が極めて困難に。" },
          { topic: "フォッシル・ロックインのジレンマ", detail: "環境関連企業は二重のハードルに直面：(1) バーツ安により太陽光パネル・蓄電池の輸入コスト上昇、(2) 政府の関心が中長期的な脱炭素投資より「安定供給」に偏る。" },
          { topic: "グリッド排出係数の変動", detail: "TGOの2026年初頭Scope 2排出係数は0.4750 kgCO₂e/kWh。石炭シフトにより実態的な係数はこれを大幅に上回る。リアルタイムで捕捉できない企業の炭素会計は不正確に。" },
          { topic: "太陽光のコスト優位性", detail: "危機にもかかわらず、太陽光LCOE（33〜75ドル/MWh）は輸入LNG（約38.66ドル/MMBtu）より遥かに安価。国産タイ湾ガス（約5.51ドル/MMBtu）も圧倒的に安い。危機が「エネルギー安全保障としての脱炭素」を加速。" }
        ]
      }
    },

    // ── Opportunities ──
    opportunities: {
      en: [
        "Real-time GHG Management Platforms: 15-minute data granularity for dynamic grid emission factor tracking, automated MRV reporting, and energy consumption timing optimization — manual data collection is now a compliance risk.",
        "Scope 3 Supply Chain Data Infrastructure: 80-90% of supply chain emissions are Scope 3. With logistics route changes and supplier fuel switching, shared data platforms across value chains become mandatory.",
        "Rooftop Solar + BESS Self-Consumption: With grid electricity costs surging via Ft surcharge, self-consumption solar with battery storage becomes self-funding through cost savings alone.",
        "Bio-fertilizer & Precision Agriculture: 90% urea import dependency severed — explosive demand for bio-fertilizer alternatives, precision farming (Kubota), and closed-loop nutrient management.",
        "Carbon Footprint Product (CFP) Certification: TGO-backed digital traceability enabling rapid certification for maintaining EU export market access under CBAM."
      ],
      ja: [
        "リアルタイムGHG管理プラットフォーム：15分単位のデータ粒度で動的なグリッド排出係数を追跡、MRV報告の自動化、電力消費タイミングの最適化——手動データ収集はコンプライアンスリスクに。",
        "Scope 3サプライチェーン・データ基盤：サプライチェーン排出量の80〜90%はScope 3。物流ルート変更やサプライヤーの燃料転換により、バリューチェーン全体でのデータ共有プラットフォームが不可欠に。",
        "ルーフトップソーラー＋BESS自家消費：Ft付加金によるグリッド電力コスト高騰により、蓄電池付き自家消費型太陽光がコスト削減だけで投資回収可能に。",
        "バイオ肥料・精密農業：尿素の90%輸入依存が遮断——バイオ肥料代替品、精密農業（クボタ）、閉鎖循環型栄養管理への爆発的需要。",
        "カーボンフットプリント製品（CFP）認証：TGO支援のデジタル・トレーサビリティでCBAM下のEU輸出市場アクセスを維持するための迅速な認証を実現。"
      ]
    },

    // ── Risks ──
    risks: {
      en: [
        "Oil Fuel Fund fiscal collapse: At ~24 billion THB/day subsidy rate, the fund is unsustainable. Price cap removal would push diesel to 57+ THB/L, devastating logistics and manufacturing costs.",
        "Prolonged strait closure: If conflict extends beyond weeks, Thailand faces physical energy rationing. Strategic reserves are limited despite 100-day claims.",
        "Coal lock-in undermining renewable transition: Emergency coal dependence creates institutional inertia that may delay solar/wind investment even after crisis resolution.",
        "GDP growth impairment: Kasikorn Research estimates GDP growth drops 0.6pp to just 1.3-1.6% if conflict is prolonged.",
        "Artificial fuel demand crisis: Panic-driven fuel hoarding by enterprises and individuals exceeding actual supply — creating a self-fulfilling shortage."
      ],
      ja: [
        "燃料油基金の財政崩壊：1日約240億バーツの補助金レートでは持続不可能。価格上限撤廃でディーゼルは57バーツ/L超に——物流・製造コストに壊滅的打撃。",
        "海峡封鎖の長期化：紛争が数週間を超えると、タイはエネルギー配給制に直面。100日分の備蓄という主張にも関わらず戦略備蓄は限定的。",
        "石炭ロックインが再エネ移行を阻害：緊急時の石炭依存が制度的慣性を生み、危機解決後も太陽光・風力投資が遅延する恐れ。",
        "GDP成長率の低下：カシコン・リサーチは紛争長期化でGDP成長率が0.6ポイント低下し、わずか1.3〜1.6%にとどまると予測。",
        "人工的な燃料需要危機：企業・個人のパニック的な燃料買い溜めが実際の供給能力を超え、自己実現的な不足を生み出している。"
      ]
    },

    // ── Opinion & Implication ──
    opinion: {
      title: { en: "WaLens Analysis: Structural Interpretation", ja: "WaLensの分析：構造的解釈" },
      intro: {
        en: "The following represents WaLens' independent analysis based on the facts presented above. These are interpretive observations, not objective data points.",
        ja: "以下は上記のファクトに基づくWaLensの独自分析です。これらは解釈的な見解であり、客観的なデータポイントではありません。"
      },
      points: {
        en: [
          {
            title: "The Coal Paradox Is Japan's GHG Platform Window",
            content: "Thailand's emergency coal reversion makes the grid emission factor unreliable — precisely when the Climate Change Act mandates accurate GHG reporting for 3,000-4,000 entities. Japanese GHG management platforms (Zeroboard, Fujitsu ESG solutions) that can dynamically calculate real-time emission factors have a 2-year first-mover window before Thai domestic alternatives emerge. The paradox of needing both coal AND accurate carbon accounting creates an unparalleled SaaS market entry opportunity."
          },
          {
            title: "Manufacturing Cost Explosion Will Force Permanent Energy Structure Change",
            content: "When diesel subsidies end (and they will — the fund burns 700B THB/month), Thai manufacturing will face a permanent 40-60% energy cost increase. Companies that have already invested in rooftop solar, BESS, and EMS during 2026-2027 will have a decisive cost advantage. This is not a temporary crisis response — it's a permanent structural shift in Thai manufacturing competitiveness. Japanese EMS providers (Yokogawa, Azbil, Omron) should position their solutions as 'crisis insurance' rather than 'green investments'."
          },
          {
            title: "Scope 3 Data Platforms Will Become Supply Chain Entry Tickets",
            content: "As 80-90% of emissions are Scope 3, large manufacturers requiring supplier emission data will effectively make GHG management platforms a supply chain participation requirement. SME suppliers without digital emission tracking will be excluded from major OEM supply chains by 2028. The company that builds a Thai-language, affordable, cloud-based Scope 3 platform — integrated with BOI incentive applications — will capture thousands of captive SME customers through Tier-1 mandate requirements."
          },
          {
            title: "The 'Fertilizer Shock' Is More Disruptive Than the Oil Shock",
            content: "While oil prices get headlines, the 90% urea import dependency with Middle Eastern supply severed is potentially more devastating for Thai agriculture and food exports — the backbone of rural employment. Bio-fertilizer, precision agriculture, and soil nutrient management technologies are no longer 'nice-to-have' — they are national food security infrastructure. Japanese agri-tech firms have an 18-month window before government-subsidized domestic alternatives emerge."
          }
        ],
        ja: [
          {
            title: "石炭パラドックスは日本のGHGプラットフォームの好機",
            content: "タイの緊急石炭回帰でグリッド排出係数が信頼性を失う——まさに気候変動法が3,000〜4,000法人に正確なGHG報告を義務付けるタイミングで。リアルタイムで動的な排出係数を算出できる日本のGHG管理プラットフォーム（Zeroboard、富士通ESGソリューション）は、タイ国内代替品が出現するまでの2年間のファーストムーバー・ウィンドウを持つ。石炭と正確な炭素会計の「両方」を必要とするパラドックスが、比類なきSaaS市場参入機会を生む。"
          },
          {
            title: "製造コスト爆発が恒久的なエネルギー構造変革を強制する",
            content: "ディーゼル補助金が終了すれば（月額7,000億バーツの消耗では不可避）、タイ製造業は恒久的に40〜60%のエネルギーコスト増に直面する。2026〜2027年にルーフトップソーラー、BESS、EMSに投資済みの企業が決定的なコスト優位を持つ。これは一時的な危機対応ではなく、タイ製造業の競争力の恒久的な構造変化だ。日本のEMSプロバイダー（横河電機、アズビル、オムロン）は「グリーン投資」ではなく「危機保険」としてソリューションをポジショニングすべき。"
          },
          {
            title: "Scope 3データプラットフォームがサプライチェーン参加チケットになる",
            content: "排出量の80〜90%がScope 3である以上、サプライヤーの排出データを要求する大手製造業者は、GHG管理プラットフォームを事実上のサプライチェーン参加要件にする。デジタル排出追跡のないSMEサプライヤーは2028年までに主要OEMサプライチェーンから排除される。タイ語対応で手頃な価格のクラウドベースScope 3プラットフォーム——BOI優遇申請と統合——を構築する企業が、Tier-1のマンデート要件を通じて数千のキャプティブSME顧客を獲得する。"
          },
          {
            title: "「肥料ショック」は石油ショック以上に破壊的",
            content: "石油価格が見出しを飾る一方、中東からの供給が遮断された尿素の90%輸入依存は、タイの農業・食品輸出——地方雇用の基盤——にとってより壊滅的な可能性がある。バイオ肥料、精密農業、土壌栄養管理技術はもはや「あれば良い」ではなく、国家食料安全保障インフラだ。日本のアグリテック企業は、政府補助の国内代替品が出現するまでの18ヶ月のウィンドウを持っている。"
          }
        ]
      }
    },

    // ── Recommendations ──
    recommendations: {
      en: [
        {
          title: "Deploy Real-Time GHG Management with Dynamic Emission Factors",
          content: "The coal reversion makes static emission factors unreliable. Deploy platforms with 15-minute data granularity that dynamically adjust Scope 2 calculations based on actual grid power mix. This is no longer optional — it's the difference between compliant and non-compliant carbon accounting under the Climate Change Act.",
          priority: "Immediate"
        },
        {
          title: "Invest in Self-Consumption Solar + BESS Before Subsidies End",
          content: "The Oil Fuel Fund is burning at 700B THB/month — diesel subsidy removal is inevitable. Install rooftop solar and battery storage now to lock in energy independence. BOI No. 5/2568 provides 100% CIT exemption for these investments through 2027. The payback period has shortened from 7 years to 3 years due to the crisis.",
          priority: "Immediate"
        },
        {
          title: "Build Scope 3 Data Sharing Infrastructure with SME Suppliers",
          content: "Establish digital emission data platforms with Tier-2/3 suppliers before Climate Change Act penalties take effect. Companies that proactively help SME suppliers measure and report emissions will secure supply chain loyalty and reduce their own Scope 3 exposure. The cost of building this now is 1/10th the cost of retrofitting later.",
          priority: "Mid-term"
        },
        {
          title: "Position Energy Management Systems as 'Crisis Insurance'",
          content: "Reframe EMS, peak-cut systems, and grid-solar dynamic switching not as 'green investments' but as operational insurance against recurring geopolitical energy shocks. The Hormuz crisis will not be the last — Taiwan Strait, South China Sea, and Iran 2.0 risks persist. Permanent energy cost reduction through smart management is the only structural hedge.",
          priority: "Strategic"
        },
        {
          title: "Capture the Bio-Fertilizer Transition Window",
          content: "With 90% urea import dependency severed, Thai agriculture is being forced into bio-fertilizer adoption. Japanese agri-tech firms should partner with Thai agricultural cooperatives and BOI-incentivized projects to establish bio-fertilizer production and precision farming infrastructure within the 18-month window before domestic alternatives emerge.",
          priority: "Strategic"
        }
      ],
      ja: [
        {
          title: "動的排出係数によるリアルタイムGHG管理を導入せよ",
          content: "石炭回帰により静的な排出係数は信頼性を失った。実際のグリッド電源構成に基づきScope 2計算を動的に調整する15分粒度のプラットフォームを導入すべき。これはもはや任意ではなく、気候変動法下で適法な炭素会計と違法な炭素会計を分ける一線だ。",
          priority: "即座"
        },
        {
          title: "補助金終了前に自家消費型ソーラー＋BESSに投資せよ",
          content: "燃料油基金は月額7,000億バーツで消耗——ディーゼル補助金の撤廃は不可避。今すぐルーフトップソーラーと蓄電池を設置し、エネルギー自立を確保せよ。BOI通知No. 5/2568は2027年までこれらの投資に100%法人税免除を提供。投資回収期間は危機により7年から3年に短縮。",
          priority: "即座"
        },
        {
          title: "SMEサプライヤーとのScope 3データ共有基盤を構築せよ",
          content: "気候変動法の罰則発効前に、Tier-2/3サプライヤーとのデジタル排出データプラットフォームを構築せよ。SMEサプライヤーの排出量測定・報告を積極支援する企業がサプライチェーンのロイヤリティを確保し、自社のScope 3エクスポージャーを低減する。今構築するコストは後から導入するコストの1/10。",
          priority: "中期"
        },
        {
          title: "エネルギー管理システムを「危機保険」としてポジショニングせよ",
          content: "EMS、ピークカットシステム、グリッド-ソーラー動的切替を「グリーン投資」ではなく、地政学的エネルギーショックに対する運用保険として再定義せよ。ホルムズ危機は最後ではない——台湾海峡、南シナ海、イラン2.0のリスクは継続する。スマート管理による恒久的エネルギーコスト削減が唯一の構造的ヘッジだ。",
          priority: "戦略的"
        },
        {
          title: "バイオ肥料転換ウィンドウを捉えよ",
          content: "尿素の90%輸入依存が遮断され、タイ農業はバイオ肥料採用を強制されている。日本のアグリテック企業はタイの農業協同組合やBOI優遇プロジェクトと連携し、国内代替品が出現する18ヶ月のウィンドウ内にバイオ肥料生産・精密農業インフラを構築すべき。",
          priority: "戦略的"
        }
      ]
    },

    // ── Data Appendix ──
    dataManagementPriority: {
      title: { en: "Industrial Data Management Priority Matrix (2026 Crisis Response)", ja: "産業別データ管理の優先順位（2026年クライシス対応）" },
      data: [
        { priority: { en: "Highest", ja: "最高" }, sector: { en: "Energy-intensive (Steel, Cement)", ja: "エネルギー集約型（鉄鋼、セメント）" }, kpi: { en: "15-min power consumption, fuel switching costs", ja: "15分単位の電力消費、燃料転換コスト" }, platform: { en: "Carbon tax minimization, energy efficiency ROI calculation", ja: "炭素税の最小化、省エネ投資のROI算出" } },
        { priority: { en: "High", ja: "高" }, sector: { en: "Export-oriented (Auto, Electronics)", ja: "輸出主導型（自動車、電子機器）" }, kpi: { en: "Scope 3, product-level carbon footprint", ja: "Scope 3、製品別カーボンフットプリント" }, platform: { en: "International client emission disclosure, CBAM compliance", ja: "国際取引先への排出データ開示、CBAM対応" } },
        { priority: { en: "Medium", ja: "中" }, sector: { en: "Agriculture / Food", ja: "農業・食品" }, kpi: { en: "Fertilizer input tracking, cold chain energy", ja: "肥料投入量追跡、コールドチェーンエネルギー" }, platform: { en: "Bio-fertilizer transition ROI, export certification", ja: "バイオ肥料転換ROI、輸出認証" } }
      ]
    },
    energyComparison: {
      title: { en: "Energy Cost Comparison Under Crisis", ja: "危機下のエネルギーコスト比較" },
      data: [
        { source: { en: "Imported LNG (Spot)", ja: "輸入LNG（スポット）" }, cost: { en: "~$38.66/MMBtu", ja: "約38.66ドル/MMBtu" }, note: { en: "Hormuz-disrupted supply", ja: "ホルムズ海峡遮断による影響" } },
        { source: { en: "Gulf of Thailand Gas", ja: "タイ湾産ガス" }, cost: { en: "~$5.51/MMBtu", ja: "約5.51ドル/MMBtu" }, note: { en: "Domestic, unaffected by Hormuz", ja: "国産、ホルムズ海峡の影響なし" } },
        { source: { en: "Solar PV (LCOE)", ja: "太陽光発電（LCOE）" }, cost: { en: "$33-75/MWh", ja: "33〜75ドル/MWh" }, note: { en: "Cheapest new-build option", ja: "新設で最も安価な選択肢" } },
        { source: { en: "Coal (Grid)", ja: "石炭（グリッド）" }, cost: { en: "~0.9-1.0 kgCO₂e/kWh", ja: "約0.9-1.0 kgCO₂e/kWh" }, note: { en: "High emission factor", ja: "高排出係数" } }
      ]
    },

    // ── Sources ──
    sources: [
      "Economic impact of the 2026 Iran war — Wikipedia",
      "The Guardian — Stocks rise and oil dips on hopes of 15-point Iran peace plan",
      "IEA — Strait of Hormuz: About",
      "Nation Thailand — Iran war shakes energy markets; Thailand flagged as Asia's most vulnerable",
      "Dentons — Geopolitics, Energy Security, and Thailand's Strategic Energy Transition",
      "Krungsri Research — Middle East Tensions: Implications for Thailand's Economy",
      "The Vietnamese — The Strait of Hormuz Crisis: How Việt Nam is Handling the 2026 Global Oil Shock",
      "Thai Enquirer — News Summary March 24, 2026 (FTI manufacturing impact data)",
      "CNA — Thailand says reached deal with Iran for vessels to transit Hormuz Strait",
      "World Bank — Thailand's Next Phase of Growth Depends on Industries of the Future",
      "Thai PBS World — Mid-East tensions will affect Thai energy structures and exports",
      "Krungsri Research — Thailand Industry Outlook 2026-2028",
      "Thai PBS World — Hormuz crisis raises energy security concerns for Thailand",
      "Mongabay — Thailand tightens embrace of fossil fuels amid Middle East conflict",
      "Ember Energy — Overcoming fossil lock-in is pivotal for Asia to buffer against energy shocks",
      "Energy Tracker Asia — Thailand's Energy Sector in 2026",
      "Nation Thailand — TGO sets new emission factors for electricity generation",
      "WJARR — Supply chain management: Balancing efficiency and environmental responsibility",
      "Frends — Energy sector 2026: How automation accelerates decarbonization",
      "Xeneta — The Biggest Supply Chain Risks of 2026",
      "NSC Thailand — Climate Change and Supply Chain: Thailand's Carbon Footprint Dilemma",
      "WEF — Asia's Carbon Markets: Strategic Imperatives for Corporations",
      "WEF — Global Value Chains Outlook 2026",
      "PMC — State-of-the-art carbon metering: Continuous emission monitoring systems",
      "MDPI — Green Supply Chain Management in Thailand's Processed Food Industry",
      "Nagashima Ohno & Tsunematsu — Thailand's 2026 Energy Outlook"
    ]
  };

  return (
    <>
      <SEO 
        title={isJapanese 
          ? "2026年石油危機：タイ製造業・脱炭素化への影響 | WaLens" 
          : "2026 Oil Crisis: Thai Manufacturing & Decarbonization Impact | WaLens"
        }
        description={isJapanese
          ? "米イラン紛争によるホルムズ海峡封鎖がタイ製造業のコスト構造、石炭回帰パラドックス、GHG管理プラットフォーム需要に与える構造的影響を分析。"
          : "Analysis of the US-Iran conflict Hormuz Strait blockade impact on Thai manufacturing costs, coal reversion paradox, and explosive demand for GHG management platforms."
        }
        canonicalPath="/insights/services/oil-crisis-thai-industry"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative w-full h-[340px] md:h-[420px] flex items-end overflow-hidden">
          <img src={heroImage} alt="Oil Crisis Thailand Manufacturing Impact" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
          <div className="relative z-20 container mx-auto px-4 pb-10">
            <Badge variant="outline" className="mb-3 bg-red-500/20 text-red-200 border-red-500/30">
              <Flame className="h-3 w-3 mr-1" />
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
                article={{ slug: 'oil-crisis-thai-industry', title: isJapanese ? '2026年石油危機：タイ製造業・脱炭素化への影響' : '2026 Oil Crisis: Thai Manufacturing & Decarbonization Impact', language: lang === 'ja' ? 'JP' : 'EN', url: '/insights/services/oil-crisis-thai-industry', category: 'Services' }}
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
            { label: isJapanese ? '石油危機とタイ産業' : 'Oil Crisis & Thai Industry' }
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
                <h2 className="text-2xl font-bold">{isJapanese ? '市場・政策・動向に関する情報' : 'Market, Policy & Trends Information'}</h2>
                <p className="text-sm text-muted-foreground">{isJapanese ? 'データベース' : 'Database'}</p>
              </div>
            </div>

            {/* Energy Price Impact */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Flame className="h-5 w-5 text-red-500" />
                  {content.energyMarketImpact.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '指標' : 'Indicator'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '紛争直前（2月）' : 'Pre-Crisis (Feb)'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'ピーク（3月）' : 'Peak (Mar)'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '変動率' : 'Change'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.energyMarketImpact.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium">{row.indicator}</td>
                          <td className="py-3 pr-4">{row.preCrisis}</td>
                          <td className="py-3 pr-4">{row.peak}</td>
                          <td className={`py-3 font-semibold ${row.change.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>{row.change}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Manufacturing Impact */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Factory className="h-5 w-5 text-blue-500" />
                  {content.manufacturingImpact.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'セクター' : 'Sector'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '主な影響要因' : 'Key Impact Factor'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? 'MPI予測' : 'MPI Forecast'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.manufacturingImpact.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium">{row.sector}</td>
                          <td className="py-3 pr-4 text-muted-foreground">{row.factor}</td>
                          <td className="py-3">
                            <Badge variant="destructive" className="text-xs">{row.mpiImpact}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Government Response */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  {content.governmentResponse.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.governmentResponse.items[isJapanese ? 'ja' : 'en'].map((item, idx) => (
                    <div key={idx} className="border-l-2 border-primary/30 pl-4">
                      <h4 className="font-semibold text-sm mb-1">{item.measure}</h4>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Decarbonization Paradox */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-emerald-500" />
                  {content.decarbonizationParadox.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.decarbonizationParadox.items[isJapanese ? 'ja' : 'en'].map((item, idx) => (
                    <div key={idx} className="border-l-2 border-emerald-500/30 pl-4">
                      <h4 className="font-semibold text-sm mb-1">{item.topic}</h4>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
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

                {/* Data Management Priority */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {content.dataManagementPriority.title[isJapanese ? 'ja' : 'en']}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '優先度' : 'Priority'}</th>
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '対象セクター' : 'Target Sector'}</th>
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '主要KPI' : 'Key KPIs'}</th>
                            <th className="text-left py-2 font-semibold">{isJapanese ? 'プラットフォーム活用' : 'Platform Use'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.dataManagementPriority.data.map((row, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 pr-4 font-medium">{row.priority[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 pr-4">{row.sector[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 pr-4 text-muted-foreground">{row.kpi[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 text-muted-foreground">{row.platform[isJapanese ? 'ja' : 'en']}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Energy Cost Comparison */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {content.energyComparison.title[isJapanese ? 'ja' : 'en']}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'エネルギー源' : 'Energy Source'}</th>
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'コスト' : 'Cost'}</th>
                            <th className="text-left py-2 font-semibold">{isJapanese ? '備考' : 'Notes'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.energyComparison.data.map((row, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 pr-4 font-medium">{row.source[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 pr-4">{row.cost[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 text-muted-foreground">{row.note[isJapanese ? 'ja' : 'en']}</td>
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

export default OilCrisisThaiIndustry;
