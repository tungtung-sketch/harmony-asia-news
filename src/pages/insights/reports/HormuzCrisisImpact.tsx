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
  Globe,
  Flame,
  Leaf,
  Ship
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const HormuzCrisisImpact = () => {
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
        'hormuz-crisis-impact',
        isJapanese ? '2026年ホルムズ海峡危機：タイ産業への多角的影響分析' : '2026 Hormuz Strait Crisis: Multi-dimensional Impact on Thai Industry',
        'services',
        lang
      );
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker('hormuz-crisis-impact', '2026 Hormuz Strait Crisis: Impact on Thai Industry', '2026年ホルムズ海峡危機：タイ産業への影響分析', 'Services', hasFullAccess);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(
        'hormuz-crisis-impact',
        isJapanese ? '2026年ホルムズ海峡危機：タイ産業への多角的影響分析' : '2026 Hormuz Strait Crisis: Multi-dimensional Impact on Thai Industry',
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
      en: "2026 Hormuz Strait Crisis: Structural Impact on Thai Industry — Manufacturing Restructuring and Forced Transition to Decarbonization",
      ja: "2026年ホルムズ海峡危機におけるタイ産業への多角的影響分析報告書：製造業の再編と脱炭素経済への強制的移行"
    },
    subheadline: {
      en: "How the Middle East geopolitical upheaval is reshaping Thailand's energy security, manufacturing costs, and accelerating the Climate Change Act enforcement",
      ja: "中東の地政学的動乱がタイのエネルギー安全保障・製造コスト構造・気候変動法の施行加速にいかに影響しているか"
    },
    category: {
      en: "Geopolitics / Energy / Manufacturing",
      ja: "地政学 / エネルギー / 製造業"
    },
    lastUpdated: "2026-03-16",

    // ── Executive Summary ──
    executiveSummary: {
      en: [
        "On February 28, 2026, a joint US-Israeli military strike on Iran — including the elimination of its supreme leader — triggered the effective closure of the Strait of Hormuz, disrupting ~20% of global oil supply and massive LNG flows. Brent crude peaked at $126/barrel. (Doc: Ch.1)",
        "Thailand's structural vulnerability is acute: 57% of crude oil imports originate from the Middle East, and imported LNG has surged from 2.18% of supply in 2011 to 29.07% in 2024, making the strait closure an immediate threat to electricity stability and industrial costs. (Doc: Ch.2)",
        "Manufacturing sectors face dual pressure: energy cost explosions and supply chain disruption. The auto industry faces fuel surges plus new CO₂-based vehicle excise tax; electronics face soaring Ft electricity surcharges; agriculture/food processing face a 'fertilizer shock' as urea imports (90% imported) are severed. (Doc: Ch.3)",
        "The Thailand Climate Change Act (Cabinet-approved Dec 2, 2025) transforms GHG reporting from voluntary to mandatory for 3,000-4,000 entities, introduces an Emissions Trading System (ETS) for ~300 large emitters, a carbon tax at THB 200/tCO₂e, and a Thai CBAM mechanism. (Doc: Ch.4)",
        "BOI Notification No. 5/2568 offers 100% CIT exemption (2026-2027) for SME investments in energy efficiency, renewable energy adoption, digital GHG management platforms, and sustainability certifications (ISO 14064, CFP). (Doc: Ch.6)"
      ],
      ja: [
        "2026年2月28日、米国・イスラエルによるイランへの共同軍事攻撃——最高指導者の殺害を含む——がホルムズ海峡の事実上の封鎖を引き起こし、世界の石油供給の約20%および膨大なLNG輸送が遮断された。ブレント原油は126ドル/バレルのピークに達した。（Doc: 第1章）",
        "タイの構造的脆弱性は深刻：原油輸入の57%が中東から調達され、輸入LNGは2011年の2.18%から2024年には29.07%に急拡大しており、海峡封鎖は電力安定性と産業コストへの即座の脅威となっている。（Doc: 第2章）",
        "製造業はエネルギーコスト爆発とサプライチェーン寸断の二重圧力に直面。自動車産業は燃料高騰に加え新CO₂ベース物品税、電子機器は電力料金（Ft）急騰、農業・食品加工は尿素輸入（90%を輸入依存）途絶による「肥料ショック」に見舞われている。（Doc: 第3章）",
        "タイ気候変動法（2025年12月2日閣議承認）は、3,000〜4,000法人のGHG報告を任意から法的義務へ転換し、約300の大規模排出施設にETS（排出量取引制度）を導入、CO₂換算1トンあたり200バーツの炭素税、タイ版CBAMメカニズムを導入する。（Doc: 第4章）",
        "BOI通知No. 5/2568は、SMEのエネルギー効率改善、再エネ導入、デジタルGHG管理プラットフォーム、サステナビリティ認証（ISO 14064、CFP）への投資に対し、100%法人税免除（2026〜2027年）を提供。（Doc: 第6章）"
      ]
    },

    // ── Facts: Market Structure ──
    marketStructure: {
      title: { en: "Energy Infrastructure Damage & Market Impact (March 2026)", ja: "エネルギーインフラ被害と市場への影響（2026年3月）" },
      segments: {
        en: [
          { name: "Strait of Hormuz", share: "Navigation at zero", growth: "80% of Asia-bound oil/LNG halted", players: "IRGC drones, mines; civilian tanker 'Skylight' hit (Doc: Ch.1)" },
          { name: "Sitra Refinery (Bahrain)", share: "Force majeure declared", growth: "380,000 bbl/day capacity lost", players: "Direct attack — Thailand energy supply chain disrupted (Doc: Ch.1)" },
          { name: "Ras Tanura (Saudi)", share: "Drone attack, operations halted", growth: "World's largest export terminal disabled", players: "Critical supply node for Thai crude imports (Doc: Ch.1)" },
          { name: "Brent Crude Price", share: "$126/bbl (peak)", growth: "Explosive cost surge across all sectors", players: "Surpassed 1970s oil crisis scale (Doc: Ch.1)" },
          { name: "Spot LNG Price", share: ">$25.40/MMBtu", growth: "Power generation cost → Ft surcharge escalation", players: "Thailand's gas-dependent power mix (50-60%) severely impacted (Doc: Ch.2)" }
        ],
        ja: [
          { name: "ホルムズ海峡", share: "航行船舶が実質ゼロ", growth: "アジア向け原油・LNG供給の80%が停滞", players: "IRGC無人機・機雷、民間タンカー「スカイライト」被弾（Doc: 第1章）" },
          { name: "シトラ製油所（バレーン）", share: "フォース・マジュール宣言", growth: "1日38万バレルの処理能力喪失", players: "直接攻撃——タイのエネルギー供給網に波及（Doc: 第1章）" },
          { name: "ラス・タヌラ製油所（サウジ）", share: "ドローン攻撃で操業停止", growth: "世界最大級の輸出ターミナル機能不全", players: "タイの原油輸入にとって重要な供給拠点（Doc: 第1章）" },
          { name: "ブレント原油価格", share: "126ドル/バレル（ピーク）", growth: "全産業で燃料・物流コストの爆発的上昇", players: "1970年代石油危機を上回る規模（Doc: 第1章）" },
          { name: "スポットLNG価格", share: "25.40ドル/MMBtu超", growth: "発電コスト増→電力料金（Ft）への転嫁", players: "タイのガス依存電力構成（50-60%）に深刻な打撃（Doc: 第2章）" }
        ]
      }
    },

    keyPlayers: {
      title: { en: "Impact by Manufacturing Sector", ja: "製造セクター別影響" },
      data: {
        en: [
          { segment: "Automotive (incl. EV)", examples: "Fuel price surge + new CO₂-based excise tax (Jan 2026) → accelerated ICE-to-BEV shift but higher manufacturing costs", status: "High Impact (Doc: Ch.3)" },
          { segment: "Electronics (IC/HDD)", examples: "Massive power consumption for clean rooms; Ft electricity surcharge escalation directly hits production costs", status: "High Impact (Doc: Ch.3)" },
          { segment: "Food Processing / Agriculture", examples: "'Fertilizer shock' — 90% urea import dependency; Middle East supplies 1/3 global urea, 1/2 sulfur; food export competitiveness eroding", status: "Severe Impact (Doc: Ch.3)" },
          { segment: "Petrochemicals", examples: "Naphtha feedstock price explosion; logistics paralysis; forced pivot to BCG circular economy and high-value specialties", status: "Severe Impact (Doc: Ch.3)" },
          { segment: "Thai Government Response", examples: "Energy Ministry 'War Room'; Oil Fuel Fund subsidies (diesel capped at 30 THB/L with 3.51 THB/L subsidy); LPG deficit >30B THB", status: "Strained (Doc: Ch.2)" }
        ],
        ja: [
          { segment: "自動車（EV含む）", examples: "燃料価格高騰＋新CO₂ベース物品税（2026年1月）→ICEからBEVへのシフト加速だが製造コスト増大", status: "影響大（Doc: 第3章）" },
          { segment: "電子機器（IC/HDD）", examples: "クリーンルーム維持に膨大な電力消費、Ft電力付加金の上昇が生産コストを直撃", status: "影響大（Doc: 第3章）" },
          { segment: "食品加工・農業", examples: "「肥料ショック」——尿素の90%を輸入依存、中東が世界の尿素1/3・硫黄1/2を供給、食品輸出競争力が低下", status: "深刻（Doc: 第3章）" },
          { segment: "石油化学", examples: "原料ナフサの価格爆発、物流麻痺、BCG循環型経済・高付加価値製品への転換を迫られる", status: "深刻（Doc: 第3章）" },
          { segment: "タイ政府の対応", examples: "エネルギー省「ウォー・ルーム」設置、燃料油基金（ディーゼル30バーツ/L上限、3.51バーツ/L補助金）、LPGアカウント赤字300億バーツ超", status: "限界的（Doc: 第2章）" }
        ]
      }
    },

    policyInsights: {
      title: { en: "Climate Change Act & Regulatory Revolution", ja: "気候変動法と規制革命" },
      items: {
        en: [
          { policy: "Mandatory GHG Reporting (MRV)", content: "3,000-4,000 entities must annually measure, verify, and report Scope 1 & 2 emissions. Penalties: up to THB 5 million fines; imprisonment for egregious violations. (Doc: Ch.4)", citation: "Thailand Climate Change Act 2025" },
          { policy: "Emissions Trading System (ETS)", content: "Cap-and-trade for ~300 large-emitting facilities. Emission allowances allocated; shortfalls must be purchased on the market. Direct financial cost for energy-intensive heavy industry. (Doc: Ch.4)", citation: "Thailand Climate Change Act 2025" },
          { policy: "Carbon Tax", content: "31 product categories taxed based on lifecycle emissions at pilot rate of THB 200/tCO₂e, with planned escalation. (Doc: Ch.4)", citation: "Thailand Climate Change Act 2025" },
          { policy: "Thai CBAM", content: "Carbon border adjustment mechanism to protect domestic producers, charging imports based on carbon content — mirroring EU CBAM approach. (Doc: Ch.4)", citation: "Thailand Climate Change Act 2025" },
          { policy: "EU CBAM Enforcement (Jan 2026)", content: "Steel, cement, aluminum, fertilizer, electricity, hydrogen exports to EU now require carbon certificate purchases. Thai CBAM-affected exports already declined 14-24%. (Doc: Ch.5)", citation: "Thai Central Bank / EU CBAM Regulation" }
        ],
        ja: [
          { policy: "GHG報告義務（MRV）", content: "3,000〜4,000法人にScope 1・2の温室効果ガス排出量の測定・検証・報告を毎年義務付け。罰則：最大500万バーツの罰金、悪質な場合は禁錮刑。（Doc: 第4章）", citation: "タイ気候変動法2025" },
          { policy: "排出量取引制度（ETS）", content: "約300の大規模排出施設にキャップ・アンド・トレード方式を導入。排出枠を割り当て、不足分は市場で購入。エネルギー多消費型の重工業に直接的な財務コスト。（Doc: 第4章）", citation: "タイ気候変動法2025" },
          { policy: "炭素税", content: "31カテゴリの製品にライフサイクル排出量ベースで課税。パイロットレートはCO₂換算1トンあたり200バーツ、将来的な引き上げを予定。（Doc: 第4章）", citation: "タイ気候変動法2025" },
          { policy: "タイ版CBAM", content: "国内生産者の競争力を保護するため、輸入品の炭素含有量に課金する炭素国境調整措置——EU CBAMのアプローチを踏襲。（Doc: 第4章）", citation: "タイ気候変動法2025" },
          { policy: "EU CBAM本格施行（2026年1月）", content: "鉄鋼・セメント・アルミ・肥料・電気・水素のEU向け輸出に炭素証明書の購入が義務化。タイのCBAM対象品目の輸出は既に14〜24%減少。（Doc: 第5章）", citation: "タイ中央銀行 / EU CBAM規則" }
        ]
      }
    },

    opportunities: {
      en: [
        "Digital GHG Management Platforms: Explosive demand for real-time emissions visualization, audit-trail management, and automated MRV reporting — manual data collection is now a compliance risk under the Climate Change Act. (Doc: Ch.4)",
        "Scope 3 Supply Chain Data Infrastructure: Large manufacturers need shared data platforms with SME suppliers; banks require ESG scoring data for loan conditions; BOI incentive applications need verified emissions data. (Doc: Ch.4)",
        "BOI SME Efficiency Incentives (2026-2027): 100% CIT exemption for rooftop solar, high-efficiency boilers, AI/ML production management, GHG management software, and ISO 14064/CFP certification costs. (Doc: Ch.6)",
        "Bio-fertilizer & Energy-Efficient Processing: Agriculture/food sector forced to pivot from imported urea to bio-fertilizers; energy-efficient food processing technology demand surging. (Doc: Ch.3)",
        "Carbon Footprint Product (CFP) Certification: TGO-backed digital traceability solutions enabling rapid certification — critical for maintaining EU export market access. (Doc: Ch.5)"
      ],
      ja: [
        "デジタルGHG管理プラットフォーム：リアルタイム排出量可視化、証跡管理、MRV報告自動化への爆発的需要——気候変動法下で手動データ収集はコンプライアンスリスクに。（Doc: 第4章）",
        "Scope 3サプライチェーン・データ基盤：大手製造業はSMEサプライヤーとの共有データプラットフォームを必要とし、銀行はESGスコアリングを融資条件に要求、BOI優遇申請には検証済み排出量データが不可欠。（Doc: 第4章）",
        "BOI SME効率改善インセンティブ（2026-2027年）：ルーフトップソーラー、高効率ボイラー、AI/ML生産管理、GHG管理ソフトウェア、ISO 14064/CFP認証取得費用に100%法人税免除。（Doc: 第6章）",
        "バイオ肥料・省エネ食品加工技術：農業・食品セクターは輸入尿素からバイオ肥料への転換を迫られ、省エネ食品加工技術の需要が急増。（Doc: 第3章）",
        "カーボンフットプリント製品（CFP）認証：TGO支援のデジタル・トレーサビリティ・ソリューションによる迅速な認証——EU輸出市場アクセス維持に不可欠。（Doc: 第5章）"
      ]
    },

    risks: {
      en: [
        "Oil Fuel Fund depletion: Government diesel subsidy (THB 3.51/L) is unsustainable with Brent above $120; LPG account deficit exceeds THB 30B; exit strategy (price cap removal) being considered — further industrial cost increases likely. (Doc: Ch.2)",
        "Prolonged strait closure: If the conflict extends beyond weeks, Thailand faces critical energy rationing scenarios; strategic petroleum reserves are limited. (Doc: Ch.1-2)",
        "Fertilizer-driven food inflation: 90% urea import dependency with Middle East supply routes severed; rice, corn yields will decline, pushing up food processing raw material costs and eroding export competitiveness. (Doc: Ch.3)",
        "Climate Change Act compliance burden on SMEs: Penalties up to THB 5M and potential imprisonment create existential risk for SMEs without digital GHG management capabilities — risk of being excluded from major supply chains. (Doc: Ch.4)",
        "EU CBAM export erosion: 14-24% export decline already observed in affected categories; companies without certified carbon data face progressive EU market exclusion. (Doc: Ch.5)"
      ],
      ja: [
        "燃料油基金の枯渇：ブレント120ドル超でのディーゼル補助金（3.51バーツ/L）は持続不可能、LPGアカウント赤字は300億バーツ超、価格上限撤廃（Exit Strategy）検討中——更なる産業コスト上昇が不可避。（Doc: 第2章）",
        "海峡封鎖の長期化：紛争が数週間を超えると、タイは深刻なエネルギー配給シナリオに直面、戦略石油備蓄は限定的。（Doc: 第1-2章）",
        "肥料由来の食品インフレ：尿素の90%輸入依存の中で中東供給ルートが遮断、米・トウモロコシ収穫量減少→食品加工原材料コスト上昇→輸出競争力低下。（Doc: 第3章）",
        "気候変動法のSMEへのコンプライアンス負荷：最大500万バーツの罰金と禁錮刑のリスクが、デジタルGHG管理能力を持たないSMEに存続的脅威——主要サプライチェーンからの排除リスク。（Doc: 第4章）",
        "EU CBAM輸出侵食：対象品目で既に14〜24%の輸出減少、認証済み炭素データを持たない企業はEU市場から段階的に排除される。（Doc: 第5章）"
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
            title: "This Crisis Permanently Ends the 'Cheap Energy' Assumption for Thai Operations",
            content: "For decades, Japanese manufacturers have built their Thai cost models on the assumption of stable, affordable fossil fuel energy. The Hormuz crisis doesn't just create a temporary price spike — it exposes a structural vulnerability that will persist regardless of how this particular conflict resolves. Future crises (Taiwan Strait, South China Sea, Iran 2.0) will trigger the same supply chain fragility. Companies that return to 'business as usual' once oil prices stabilize will be blindsided again. The strategic response is not to hedge on oil futures, but to fundamentally reduce fossil fuel dependency through solar, BESS, and energy management systems. This is no longer an ESG initiative — it's operational survival."
          },
          {
            title: "The Climate Change Act and the Energy Crisis Are a Perfect Storm — In Japan's Favor",
            content: "The simultaneous arrival of mandatory GHG reporting (3,000-4,000 entities), carbon taxation, and an energy cost explosion creates a market environment where companies are forced to both measure and reduce emissions simultaneously. This is precisely the intersection where Japanese GHG management platforms, energy efficiency technologies (Daikin HVAC, Mitsubishi Electric EMS, Fujitsu GHG visualization), and sustainability consulting have no peer competition from Chinese or Korean firms. The window is 2026-2028: once Thai companies lock in their compliance platforms and efficiency partners, switching costs become prohibitive."
          },
          {
            title: "The 'Fertilizer Shock' Will Accelerate Thailand's Bio-Economy Pivot Faster Than Any Policy Could",
            content: "Government bio-economy (BCG) promotion has been gradual and policy-driven. The sudden severance of Middle Eastern fertilizer supply chains forces immediate action: bio-fertilizer adoption, precision agriculture, and closed-loop nutrient management are no longer aspirational — they are survival necessities. Japanese agricultural technology firms (Kubota precision farming, Ajinomoto bio-stimulants, Mitsubishi Chemical bio-inputs) have a compressed but decisive window to become embedded infrastructure partners before domestic alternatives emerge."
          },
          {
            title: "SMEs Are the Hidden Battlefield — and the Biggest Opportunity",
            content: "The Climate Change Act's penalties (THB 5M fines, potential imprisonment) and large companies' Scope 3 reporting requirements will cascade down to SME suppliers. Most Thai SMEs have zero GHG measurement capability. The company that provides an affordable, Thai-language, cloud-based GHG management platform — integrated with BOI incentive applications and bank ESG scoring — will capture a market of thousands of companies in 2026-2027. This is not a technology challenge; it's a distribution and localization challenge. Japanese firms with existing Thai SME relationships (through Tier-1/Tier-2 supply chains) have a structural advantage."
          }
        ],
        ja: [
          {
            title: "この危機がタイ事業の「安いエネルギー」前提を永久に終わらせる",
            content: "数十年にわたり、日系製造業はタイのコストモデルを安定した手頃な化石燃料エネルギーという前提の上に構築してきた。ホルムズ危機は一時的な価格スパイクではなく、この特定の紛争がどう解決されようと持続する構造的脆弱性を露呈させた。将来の危機（台湾海峡、南シナ海、イラン2.0）でも同じサプライチェーンの脆弱性が顕在化する。原油価格が安定したら「通常業務に戻る」企業は、再び不意を突かれる。戦略的対応は原油先物のヘッジではなく、太陽光、BESS、エネルギー管理システムによる化石燃料依存の根本的削減である。これはもはやESGイニシアチブではなく、事業の生存戦略だ。"
          },
          {
            title: "気候変動法とエネルギー危機の「パーフェクトストーム」は日本企業に有利に働く",
            content: "GHG報告義務化（3,000〜4,000法人）、炭素税、エネルギーコスト爆発の同時到来は、企業が排出量の測定と削減を同時に強制される市場環境を生む。これはまさに日本のGHG管理プラットフォーム、省エネ技術（ダイキンHVAC、三菱電機EMS、富士通GHG可視化）、サステナビリティ・コンサルティングが中国・韓国勢に対して無敵の競争優位を持つ領域だ。ウィンドウは2026〜2028年：タイ企業がコンプライアンス・プラットフォームと効率化パートナーを固めると、スイッチングコストが禁止的になる。"
          },
          {
            title: "「肥料ショック」はいかなる政策よりも速くタイのバイオエコノミー転換を加速させる",
            content: "政府のバイオエコノミー（BCG）推進はこれまで段階的・政策主導だった。中東からの肥料供給チェーンの突然の遮断は即座の行動を強いる：バイオ肥料採用、精密農業、閉鎖循環型栄養管理はもはや理想ではなく、生存の必需品となった。日本の農業技術企業（クボタの精密農業、味の素のバイオスティミュラント、三菱ケミカルのバイオインプット）は、国内代替品が出現する前に組み込みインフラ・パートナーとなる、圧縮された決定的なウィンドウを持っている。"
          },
          {
            title: "SMEが隠れた戦場——そして最大の機会",
            content: "気候変動法の罰則（500万バーツ罰金、禁錮刑の可能性）と大企業のScope 3報告要件は、SMEサプライヤーにカスケードする。大半のタイSMEはGHG測定能力がゼロだ。手頃な価格で、タイ語対応の、クラウドベースのGHG管理プラットフォーム——BOI優遇申請や銀行ESGスコアリングと統合されたもの——を提供する企業が、2026〜2027年に数千社の市場を獲得する。これは技術の課題ではなく、流通とローカライゼーションの課題だ。既存のタイSME関係（Tier-1/Tier-2サプライチェーンを通じた）を持つ日系企業は構造的優位を持っている。"
          }
        ]
      }
    },

    // ── Recommendations ──
    recommendations: {
      en: [
        {
          title: "Treat Decarbonization as a Financial Indicator, Not an Environmental One",
          content: "Carbon emissions are no longer an 'environmental metric' — they are a financial metric that directly impacts tax liability, loan interest rates, and export eligibility. Delaying Climate Change Act compliance means future fines, financing delays, and lost export opportunities. CFOs, not CSR departments, should own decarbonization strategy. (Doc: Ch.7 Expert Summary)",
          priority: "Immediate"
        },
        {
          title: "Automate MRV with Cloud-Based Digital Platforms",
          content: "Under the 2026 regulatory regime, manual data collection lacks credibility and inflates verification costs. Deploy cloud-based platforms to automate the energy-use-to-GHG-emissions conversion and report generation pipeline. BOI provides 100% CIT exemption for such digital investments through 2027. (Doc: Ch.7 Expert Summary)",
          priority: "Immediate"
        },
        {
          title: "Build Supply Chain Resilience Through Partner Decarbonization",
          content: "Large manufacturers bear both the responsibility and economic necessity to support SME supplier decarbonization. Establish shared emissions data platforms with Tier-2/3 suppliers and pursue joint reduction targets. Companies that help their supply chain comply with the Climate Change Act will secure loyalty and reduce Scope 3 exposure. (Doc: Ch.7 Expert Summary)",
          priority: "Mid-term"
        },
        {
          title: "Leverage BOI No. 5/2568 for Immediate Energy Efficiency Investments",
          content: "The 2026-2027 application window for 100% CIT exemption on energy efficiency, renewable energy, and digital GHG systems is time-limited. Prioritize rooftop solar installation, high-efficiency boiler upgrades, and EMS deployment now — the energy crisis makes these investments self-funding through cost savings. (Doc: Ch.6)",
          priority: "Immediate"
        },
        {
          title: "Secure EU Market Access Through Digital Carbon Traceability",
          content: "With EU CBAM fully enforced and Thai exports already declining 14-24%, companies exporting steel, cement, aluminum, or fertilizer to Europe must urgently deploy ISO 14067-compliant carbon traceability systems. Partner with TGO for CFP labeling to enable Thai carbon tax credits to offset EU CBAM charges. (Doc: Ch.5)",
          priority: "Strategic"
        }
      ],
      ja: [
        {
          title: "脱炭素化を「環境指標」ではなく「財務指標」として扱え",
          content: "炭素排出量はもはや「環境指標」ではなく、税負担、融資金利、輸出適格性に直結する「財務指標」である。気候変動法への対応を遅らせることは、将来の罰金、融資停滞、輸出機会の喪失を意味する。CSR部門ではなく、CFOが脱炭素化戦略を主導すべきだ。（Doc: 第7章 専門家総括）",
          priority: "即座"
        },
        {
          title: "クラウドベースのデジタルプラットフォームでMRVを自動化せよ",
          content: "2026年の法制度下では、手動のデータ収集は信頼性を欠き、検証コストを増大させる。クラウドベースのプラットフォームを導入し、エネルギー使用量からGHG排出量への変換・報告書生成までを自動化すべき。BOIは2027年までこのようなデジタル投資に100%法人税免除を提供。（Doc: 第7章 専門家総括）",
          priority: "即座"
        },
        {
          title: "パートナー企業の脱炭素化によるサプライチェーン・レジリエンスを構築せよ",
          content: "大手製造業者は、SMEサプライヤーの脱炭素化を支援する責任と経済的必要性の両方を負っている。Tier-2/3サプライヤーとの間で排出量データ共有プラットフォームを構築し、共同削減目標を追求せよ。サプライチェーンの気候変動法準拠を支援する企業がロイヤリティを確保し、Scope 3エクスポージャーを低減する。（Doc: 第7章 専門家総括）",
          priority: "中期"
        },
        {
          title: "BOI通知No. 5/2568を活用し即座にエネルギー効率投資を実行せよ",
          content: "エネルギー効率・再エネ・デジタルGHGシステムへの100%法人税免除の2026-2027年申請期間は期間限定。ルーフトップソーラー設置、高効率ボイラー更新、EMS導入を今すぐ優先せよ——エネルギー危機がこれらの投資をコスト削減で自己資金化する。（Doc: 第6章）",
          priority: "即座"
        },
        {
          title: "デジタル・カーボン・トレーサビリティでEU市場アクセスを確保せよ",
          content: "EU CBAMが完全施行されタイの輸出が既に14-24%減少する中、鉄鋼・セメント・アルミ・肥料を欧州に輸出する企業はISO 14067準拠のカーボン・トレーサビリティ・システムを緊急導入すべき。TGOと連携しCFPラベルを取得、タイ国内で支払った炭素税をEU CBAM課金から控除可能にせよ。（Doc: 第5章）",
          priority: "戦略的"
        }
      ]
    },

    // ── Data Appendix ──
    sectorImpact: {
      title: { en: "Manufacturing Sector Impact & Response Matrix", ja: "製造セクター影響・対応マトリクス" },
      data: [
        { sector: { en: "Automotive (incl. EV)", ja: "自動車（EV含む）" }, impactFactor: { en: "Fuel price surge, CO₂ excise tax reform", ja: "燃料価格高騰、CO₂物品税改訂" }, response: { en: "Supply chain localization, accelerated BEV production shift", ja: "サプライチェーンのローカル化、BEV生産への早期転換" } },
        { sector: { en: "Electronics (IC/HDD)", ja: "電子機器（IC/HDD）" }, impactFactor: { en: "Ft electricity surcharge, logistics cost increase", ja: "電力料金（Ft）増、物流コスト増" }, response: { en: "Energy Management System (EMS) deployment for efficiency", ja: "エネルギー管理システム（EMS）導入による効率化" } },
        { sector: { en: "Food Processing / Agriculture", ja: "食品加工・農業" }, impactFactor: { en: "Urea fertilizer shortage, raw material price surge", ja: "肥料（尿素）不足、原材料価格高騰" }, response: { en: "Bio-fertilizer transition, energy-efficient processing adoption", ja: "バイオ肥料への転換、省エネ加工プロセスの採用" } },
        { sector: { en: "Petrochemicals", ja: "石油化学" }, impactFactor: { en: "Naphtha feedstock explosion, logistics paralysis", ja: "原料ナフサ価格高騰、物流麻痺" }, response: { en: "BCG circular economy investment, high-value product shift", ja: "循環型経済（BCG）投資、高付加価値製品へのシフト" } }
      ]
    },
    regulatoryTimeline: {
      title: { en: "Climate Change Act: Key Regulatory Instruments", ja: "気候変動法：主要規制手段" },
      data: [
        { instrument: { en: "MRV Reporting Obligation", ja: "MRV報告義務" }, scope: { en: "3,000-4,000 entities", ja: "3,000〜4,000法人" }, penalty: { en: "Up to THB 5M fine; imprisonment", ja: "最大500万バーツ罰金、禁錮刑" } },
        { instrument: { en: "Emissions Trading System (ETS)", ja: "排出量取引制度（ETS）" }, scope: { en: "~300 large emitters", ja: "約300大規模排出施設" }, penalty: { en: "Cap-and-trade financial cost", ja: "キャップ・アンド・トレード財務負担" } },
        { instrument: { en: "Carbon Tax", ja: "炭素税" }, scope: { en: "31 product categories", ja: "31製品カテゴリ" }, penalty: { en: "THB 200/tCO₂e (pilot, will escalate)", ja: "200バーツ/tCO₂e（パイロット、引上げ予定）" } },
        { instrument: { en: "Thai CBAM", ja: "タイ版CBAM" }, scope: { en: "Imported goods", ja: "輸入品" }, penalty: { en: "Carbon content-based import charge", ja: "炭素含有量ベースの輸入課金" } }
      ]
    },

    // ── Sources ──
    sources: [
      "2026 Strait of Hormuz crisis — Wikipedia (Doc: footnote 1)",
      "The Guardian — What is the Strait of Hormuz (Doc: footnote 2)",
      "Times of India — US-Iran war: Strait of Hormuz closure impacts (Doc: footnote 3)",
      "CBS News — Strait of Hormuz disruption threatens global economy (Doc: footnote 4)",
      "TIME — How the War With Iran Is Impacting Economies in Asia (Doc: footnote 5)",
      "Nation Thailand — Thailand unveils plan to cushion oil and power bills (Doc: footnote 6)",
      "Dentons — Geopolitics, Energy Security, and Thailand's Strategic Energy Transition (Doc: footnote 7)",
      "Energy Tracker Asia — Thailand's Energy Sector in 2026 (Doc: footnote 8)",
      "Kaizen — Thailand manufacturing trends 2026 (Doc: footnote 9)",
      "Iconic Research — Thailand Manufacturing Industry: Strategic Intelligence 2026 (Doc: footnote 10)",
      "Krungsri Research — Thailand Industry Outlook 2026-2028 (Doc: footnote 11)",
      "Krungsri Research — Electronics Industry Outlook 2026-2028 (Doc: footnote 12)",
      "KPMG — Outlook for Thailand's electric vehicle industry (Doc: footnote 13)",
      "Nation Thailand — Prolonged Hormuz closure could hammer food costs in Thailand (Doc: footnote 15)",
      "Bangkok Post — War disrupts fertiliser supplies, puts food security at risk (Doc: footnote 16)",
      "Al Habtoor Research — The Strait That Starves: Iran's 2026 Food Shock (Doc: footnote 17)",
      "Fujitsu Global — ESG Strategy: GHG visualization and reduction (Doc: footnote 18)",
      "MNRE Hub — Monitoring the Climate Change Act (Doc: footnote 19)",
      "MCG Asia — Thailand's Climate Change Act and Rules-Based Governance (Doc: footnote 21)",
      "The Legal Co. — Draft Climate Change Act: Full Overview with ETS (Doc: footnote 22)",
      "Nishimura & Asahi — Thai Cabinet Approves Draft Climate Change Act (Doc: footnote 24)",
      "EY — Thailand set to implement carbon tax (Doc: footnote 25)",
      "PMI Climate — Thailand Partnership for Market Implementation (Doc: footnote 26)",
      "Thai Central Bank — CBAM impact analysis (Doc: footnote 30)",
      "BOI — Investment Promotion Guide 2025-2027 (Doc: footnotes 37-40)"
    ]
  };

  return (
    <>
      <SEO 
        title={isJapanese 
          ? "2026年ホルムズ海峡危機：タイ産業影響分析 | WaLens" 
          : "2026 Hormuz Crisis: Thai Industry Impact Analysis | WaLens"
        }
        description={isJapanese
          ? "ホルムズ海峡危機がタイの製造業・エネルギー安全保障・気候変動法施行に与える多角的影響を分析。日系企業の戦略的対応策を提言。"
          : "Analysis of the Hormuz Strait crisis impact on Thai manufacturing, energy security, and Climate Change Act enforcement. Strategic recommendations for Japanese enterprises."
        }
        canonicalPath="/insights/services/hormuz-crisis-impact"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative w-full h-[340px] md:h-[420px] flex items-end overflow-hidden">
          <img src={heroImage} alt="Hormuz Crisis Thailand Impact" className="absolute inset-0 w-full h-full object-cover z-0" />
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
                article={{ slug: 'hormuz-crisis-impact', title: isJapanese ? '2026年ホルムズ海峡危機：タイ産業影響分析' : '2026 Hormuz Crisis: Thai Industry Impact Analysis', language: lang === 'ja' ? 'JP' : 'EN', url: '/insights/services/hormuz-crisis-impact', category: 'Services' }}
                variant="button"
                className="text-white border-white/50 hover:bg-white/20 bg-white/10"
              />
            </div>
          </div>
        </section>

        <main className="container mx-auto px-4 py-8">
          <Breadcrumb items={[
            { label: isJapanese ? 'インサイト' : 'Insights', href: '/insights' },
            { label: isJapanese ? 'サービス' : 'Services', href: '/insights/services' },
            { label: isJapanese ? 'ホルムズ海峡危機' : 'Hormuz Crisis Impact' }
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

            {/* Energy Infrastructure Impact */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Flame className="h-5 w-5 text-red-500" />
                  {content.marketStructure.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '対象・指標' : 'Target / Indicator'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '状況・規模' : 'Status / Scale'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '産業への影響' : 'Industry Impact'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '備考' : 'Notes'}</th>
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

            {/* Sector Impact */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Factory className="h-5 w-5 text-blue-500" />
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

                {/* Sector Impact Matrix */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {content.sectorImpact.title[isJapanese ? 'ja' : 'en']}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'セクター' : 'Sector'}</th>
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '影響要因' : 'Impact Factor'}</th>
                            <th className="text-left py-2 font-semibold">{isJapanese ? '対応・戦略' : 'Response / Strategy'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.sectorImpact.data.map((row, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 pr-4 font-medium">{row.sector[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 pr-4">{row.impactFactor[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 text-muted-foreground">{row.response[isJapanese ? 'ja' : 'en']}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Regulatory Instruments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {content.regulatoryTimeline.title[isJapanese ? 'ja' : 'en']}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '規制手段' : 'Instrument'}</th>
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '対象範囲' : 'Scope'}</th>
                            <th className="text-left py-2 font-semibold">{isJapanese ? '罰則・コスト' : 'Penalty / Cost'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.regulatoryTimeline.data.map((row, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 pr-4 font-medium">{row.instrument[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 pr-4">{row.scope[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 text-muted-foreground">{row.penalty[isJapanese ? 'ja' : 'en']}</td>
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

export default HormuzCrisisImpact;
