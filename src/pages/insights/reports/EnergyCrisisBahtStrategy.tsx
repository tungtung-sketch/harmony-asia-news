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
  CheckCircle, BookOpen, Lock, Lightbulb, Eye,
  ChevronRight, Crown, Database, Truck, Zap, DollarSign, Sparkles
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-energy-crisis-baht-strategy.jpg';

const EnergyCrisisBahtStrategy = () => {
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

  const slug = 'energy-crisis-baht-strategy-2026';
  const titleEn = 'Strategic Briefing for Japanese Executives in Thailand: Energy Crisis, Baht Depreciation, and Sector Recommendations';
  const titleJa = '在タイ日系企業経営層向け戦略ブリーフィング：エネルギー危機・バーツ安・セクター別推奨アクション';

  useEffect(() => {
    if (hasFullAccess && !hasLoggedView) {
      logView(slug, isJapanese ? titleJa : titleEn, 'services', lang);
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker(slug, titleEn, titleJa, 'Services', hasFullAccess);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(slug, isJapanese ? titleJa : titleEn, 'services', lang);
    }
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTOC = () => {
    document.getElementById('table-of-contents')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      en: 'Strategic Briefing for Japanese Executives in Thailand: Energy Crisis, Baht Depreciation, and Sector Recommendations',
      ja: '在タイ日系企業経営層向け戦略ブリーフィング：エネルギー危機・バーツ安・セクター別推奨アクション'
    },
    subheadline: {
      en: 'How the US–Iran conflict, Hormuz closure, May–August Ft tariff hike, and the 28–30 April central-bank week reshape margins, FX, and sector strategy as of 28 April 2026',
      ja: '2026年4月28日時点：米イラン紛争・ホルムズ封鎖・5〜8月Ft料金引上げ・4月28〜30日中央銀行週間が、利益率・為替・セクター戦略をどう再構築するか'
    },
    category: {
      en: 'Macro / Energy / FX / Cross-Sector Strategy',
      ja: 'マクロ経済 / エネルギー / 為替 / セクター横断戦略'
    },
    lastUpdated: '2026-04-28',

    executiveSummary: {
      en: [
        'Stagflationary squeeze: Brent at US$106–108/bbl, baht at 32.38 THB/USD (27 Apr), May–Aug electricity tariff up 1.8% to 3.95 THB/kWh, and BoT/Fed both meeting 28–30 April — yen-reporting parents face translation losses but tactical hedging and repatriation windows are open.',
        'Electricity tariff (May–Aug 2026) approved at 3.95 THB/kWh (Ft = 16.23 satang/kWh, up from 9.72) using 9.472 Bn baht in clawback funds; EGAT still carries 35.928 Bn baht of unrecovered cost — Sept–Dec cycle is widely expected to rise more sharply.',
        'Energy supply shock: Hormuz closed since 11 March, two QatarEnergy LNG cargoes blocked, spot LNG up from US$11 to US$23.50/MMBtu (+113% in USD, +125% landed in baht). IEA calls it the largest energy supply shock on record.',
        'Government response: 150 Bn baht emergency fuel-fund borrowing under preparation; public-debt ceiling possibly lifted to 75% of GDP; diesel held at 31.14 THB/litre vs. 54.19 unsubsidised; rooftop-solar tax relief up to THB 200,000.',
        'JPY/THB at 100/20.3 — yen ~14% stronger vs. baht YoY: a one-time strategic window for intercompany dividend repatriation, intercompany loan settlement, and Thai-asset acquisition before a possible Fed dovish pivot reverses it.',
        'Sector divergence: Manufacturing should hedge USD receivables long, lock renewable PPAs, and pivot harder into HEV/BEV exports; Logistics should renegotiate fuel-surcharges; Retail should defer capex; Real Estate should lock long-tenor THB debt at 1.00% policy rate; Financial Services should run dual scenarios for the 28–30 April central-bank week.'
      ],
      ja: [
        'スタグフレーション的圧迫：ブレント原油106〜108米ドル/バレル、バーツ32.38 THB/USD（4月27日）、5〜8月電力料金が1.8%上昇し3.95 THB/kWh、BoTとFedがいずれも4月28〜30日に開催——円建て報告の親会社は換算損に直面するが、戦術的ヘッジと本国還流の好機。',
        '電力料金（2026年5〜8月）：3.95 THB/kWh承認（Ft = 16.23サタン/kWh、9.72から上昇）。94.72億バーツのクローバック原資を活用。EGATは依然359.28億バーツの未回収コストを抱え、9〜12月サイクルでより急激な上昇が予想される。',
        'エネルギー供給ショック：ホルムズ海峡は3月11日以降閉鎖、QatarEnergyのLNGカーゴ2隻がブロック、スポットLNGは11米ドルから23.50米ドル/MMBtuへ（USD建て+113%、バーツ建て陸揚げ価格+125%）。IEAは「観測史上最大のエネルギー供給ショック」と評価。',
        '政府対応：1,500億バーツの石油基金緊急借入を準備、公的債務上限をGDP比75%へ引き上げ検討、ディーゼル価格を31.14 THB/Lに据置（無補助では54.19）、屋根置き太陽光向け所得税控除を最大20万バーツへ。',
        'JPY/THBは100/20.3——円は対バーツで前年同期比約14%上昇：Fedのハト派転換により逆転する前に、企業間配当の本国還流、企業間貸付の決済、タイ資産取得を実行する一回限りの戦略的好機。',
        'セクター別分岐：製造業はUSD建て売掛金の長期ヘッジ・再エネPPA固定化・HEV/BEV輸出への一層の転換、物流は燃料サーチャージの再交渉、小売は出店投資の延期、不動産は政策金利1.00%下での長期THB建て負債固定、金融は4月28〜30日の中央銀行週間に向け複数シナリオの並行運用が必要。'
      ]
    },

    electricityTariff: {
      title: { en: 'Thailand Electricity Tariff (May–August 2026)', ja: 'タイ電力料金（2026年5〜8月）' },
      data: {
        en: [
          { indicator: 'Approved Tariff (Ex-VAT)', value: '3.95 THB/kWh', growth: '+1.8% vs. Jan–Apr', driver: 'ERC selected lowest of three scenarios' },
          { indicator: 'Base Tariff', value: '3.78 THB/kWh', growth: 'Unchanged', driver: 'Grid infrastructure cost' },
          { indicator: 'Fuel Tariff (Ft)', value: '16.23 satang/kWh', growth: 'Up from 9.72', driver: 'LNG price reversal post-Hormuz' },
          { indicator: 'Rejected Option 2', value: '4.08 THB/kWh', growth: '+5%', driver: 'EGAT continues debt absorption' },
          { indicator: 'Rejected Option 3', value: '4.59 THB/kWh', growth: '+18%', driver: 'Full EGAT cost pass-through' },
          { indicator: 'Clawback Funds Deployed', value: '~9.472 Bn baht', growth: '13.43 satang/unit relief', driver: 'Excess returns from electricity authorities' },
          { indicator: 'EGAT Accumulated Burden', value: '~35.928 Bn baht (~US$1 Bn)', growth: 'Deferred', driver: 'Sept–Dec 2026 cycle expected sharper' },
          { indicator: 'PTT Unrecovered LNG Subsidy', value: '~US$360 million', growth: 'Deferred', driver: 'Pressure on future tariff cycles' }
        ],
        ja: [
          { indicator: '承認料金（VAT除く）', value: '3.95 THB/kWh', growth: '1〜4月比 +1.8%', driver: 'ERCが3シナリオ中最低を選択' },
          { indicator: '基本料金', value: '3.78 THB/kWh', growth: '据置', driver: '送配電インフラコスト' },
          { indicator: '燃料調整費（Ft）', value: '16.23サタン/kWh', growth: '9.72から上昇', driver: 'ホルムズ後のLNG価格反転' },
          { indicator: '却下案2', value: '4.08 THB/kWh', growth: '+5%', driver: 'EGATが債務を継続吸収' },
          { indicator: '却下案3', value: '4.59 THB/kWh', growth: '+18%', driver: 'EGATコストの全額転嫁' },
          { indicator: '投入クローバック原資', value: '約94.72億バーツ', growth: '13.43サタン/kWh分の緩和', driver: '電力当局の超過収益' },
          { indicator: 'EGAT累積負担', value: '約359.28億バーツ（約10億米ドル）', growth: '繰延', driver: '2026年9〜12月サイクルで急上昇予想' },
          { indicator: 'PTT未回収LNG補助', value: '約3.6億米ドル', growth: '繰延', driver: '将来の料金サイクルへ圧力' }
        ]
      }
    },

    energyShock: {
      title: { en: 'Energy Supply Shock & Hormuz Disruption', ja: 'エネルギー供給ショックとホルムズ海峡の混乱' },
      data: {
        en: [
          { metric: 'Brent Crude (27 Apr 2026)', value: 'US$106–108/bbl', implication: 'Up from ~US$72 pre-conflict (late Feb 2026)' },
          { metric: 'March 2026 Brent Surge', value: '+51% in one month', implication: 'Among the largest one-month moves on record' },
          { metric: 'Spot LNG Price', value: 'US$11 → US$23.50/MMBtu', implication: '+113% in USD; +125% landed cost in baht (with 5.3% baht depreciation)' },
          { metric: 'Strait of Hormuz', value: 'Effectively closed since 11 March', implication: 'Two QatarEnergy LNG cargoes (60,000 t each) blocked' },
          { metric: 'Gas Share of Power Generation', value: '~60–66%', implication: 'LNG ~27% of gas; ~28% of LNG normally transits Hormuz' },
          { metric: 'Goldman Q4 Brent Forecast', value: 'US$90 (raised from US$80)', implication: 'Citi conditional scenario: US$150 if disruption extends past June' },
          { metric: 'Qatar LNG Restoration', value: '3–5 years', implication: 'Thailand has long-term contracts with Qatar (~2 Mt/yr)' },
          { metric: 'IEA Characterization', value: 'Largest energy supply shock on record', implication: 'Surpasses 1973 and 2022 episodes' }
        ],
        ja: [
          { metric: 'ブレント原油（2026年4月27日）', value: '106〜108米ドル/バレル', implication: '紛争前の約72米ドル（2026年2月末）から上昇' },
          { metric: '2026年3月ブレント急騰', value: '単月+51%', implication: '観測史上最大級の月間変動' },
          { metric: 'スポットLNG価格', value: '11米ドル → 23.50米ドル/MMBtu', implication: 'USD建て+113%、バーツ建て陸揚げ価格+125%（バーツ5.3%下落含む）' },
          { metric: 'ホルムズ海峡', value: '3月11日以降事実上閉鎖', implication: 'QatarEnergyのLNGカーゴ2隻（各6万トン）がブロック' },
          { metric: '発電に占めるガス比率', value: '約60〜66%', implication: 'LNGはガスの約27%、そのうち約28%がホルムズ経由' },
          { metric: 'Goldman第4四半期ブレント予測', value: '90米ドル（80米ドルから上方修正）', implication: 'Citi条件付シナリオ：6月超えれば150米ドル' },
          { metric: 'カタールLNG復旧', value: '3〜5年', implication: 'タイはカタールと年間約200万トンの長期契約' },
          { metric: 'IEAによる位置付け', value: '観測史上最大のエネルギー供給ショック', implication: '1973年・2022年を凌駕' }
        ]
      }
    },

    govResponse: {
      title: { en: 'Government Policy Response (Anutin Caretaker Govt.)', ja: '政府政策対応（アヌティン暫定政権）' },
      data: {
        en: [
          { factor: 'Oil Fuel Fund Borrowing', impact: 'Fund deficit >12 Bn baht by mid-March', mitigation: 'Emergency decree to borrow up to 150 Bn baht' },
          { factor: 'Public Debt Ceiling', impact: 'Government considering raising ceiling to 75% of GDP', mitigation: 'Creates fiscal "ammunition" for further intervention' },
          { factor: 'Diesel Price Cap', impact: 'Held at ~31.14 THB/L vs. unsubsidised ~54.19 THB/L', mitigation: '23 THB/L wedge financed by the state — temporary' },
          { factor: 'Targeted Subsidies', impact: '~13.4 million low-income citizens (income <100,000 baht/yr)', mitigation: '"Thai Helps Thai Plus" replaces broad fuel subsidies' },
          { factor: 'Supply Diversification', impact: 'Russia crude imports negotiated; Mae Moh coal restart; B20 biofuel expansion', mitigation: 'Lignite ~6 US¢/kWh — cheaper than LNG; B20 saves 4–5 baht/L vs. B7' },
          { factor: 'Renewables Acceleration', impact: 'Income-tax relief up to THB 200,000 for rooftop solar (3 March)', mitigation: 'UGT1 premium cut 37% to 0.0375 THB/kWh on cheaper hydro I-RECs' }
        ],
        ja: [
          { factor: '石油基金借入', impact: '基金は3月中旬に120億バーツ超の赤字', mitigation: '最大1,500億バーツの緊急借入勅令準備中' },
          { factor: '公的債務上限', impact: '政府がGDP比75%への引き上げを検討', mitigation: '更なる介入のための財政「弾薬」を確保' },
          { factor: 'ディーゼル価格上限', impact: '約31.14 THB/L（無補助なら約54.19 THB/L）', mitigation: '差額23 THB/Lを国家が負担——一時的措置' },
          { factor: '対象限定補助', impact: '低所得層約1,340万人（年収10万バーツ未満）', mitigation: '「タイ・ヘルプス・タイ・プラス」が一般燃料補助を代替' },
          { factor: '供給源多角化', impact: 'ロシア原油輸入交渉、Mae Moh石炭火力再起動、B20バイオ燃料拡大', mitigation: '亜炭は約6米セント/kWhでLNGより安価、B20はB7比4〜5バーツ/L安' },
          { factor: '再エネ加速', impact: '屋根置き太陽光向け所得税控除最大20万バーツ（3月3日）', mitigation: 'UGT1プレミアムを37%引下げ0.0375 THB/kWhへ（安価な水力I-REC反映）' }
        ]
      }
    },

    macroDashboard: {
      title: { en: 'Macro Dashboard Driving Sector Recommendations', ja: 'セクター提言を規定するマクロダッシュボード' },
      data: {
        en: [
          { factor: 'Baht/USD', value: '32.38 (27 Apr 2026)', direction: 'Weakened from ~32.0 earlier in April; further weakness if Fed remains hawkish' },
          { factor: 'JPY/THB', value: '100 JPY ≈ 20.3 THB (26 Apr)', direction: 'Yen ~14% stronger vs. THB YoY — favourable for repatriation' },
          { factor: 'BoT Policy Rate', value: '1.00% (cut from 1.25% in Feb 2026, 4–2 vote)', direction: 'กนง. meets 29–30 April; further cut possible but not consensus' },
          { factor: 'Fed Funds Rate', value: '3.50–3.75% (held at March meeting)', direction: 'FOMC 28–29 April; hold expected; Powell\'s last meeting (term ends 15 May 2026); Warsh nominated successor' },
          { factor: 'Thai 2026 GDP', value: 'Forecast 1.5–1.8%', direction: 'Weakest in three decades excluding crisis years (BoT, IMF, World Bank, SCB EIC)' },
          { factor: 'Thai 2026 Inflation', value: '0.3% forecast', direction: 'Subdued despite energy shock — burden absorbed by margins/subsidies, not CPI' }
        ],
        ja: [
          { factor: 'バーツ/USD', value: '32.38（2026年4月27日）', direction: '4月初の約32.0から下落、Fedがタカ派継続なら更に下落' },
          { factor: 'JPY/THB', value: '100円 ≈ 20.3バーツ（4月26日）', direction: '円は対バーツ前年同期比約14%上昇——本国還流に有利' },
          { factor: 'BoT政策金利', value: '1.00%（2026年2月、1.25%から4対2で引下げ）', direction: 'กนง.は4月29〜30日開催、追加利下げあり得るがコンセンサスではない' },
          { factor: 'FF金利', value: '3.50〜3.75%（3月会合で据置）', direction: 'FOMCは4月28〜29日、据置予想。パウエル最後の会合（任期2026年5月15日終了）、後任にウォーシュ指名' },
          { factor: 'タイ2026年GDP', value: '予測1.5〜1.8%', direction: '危機年除き30年で最弱（BoT、IMF、世界銀行、SCB EIC）' },
          { factor: 'タイ2026年インフレ', value: '予測0.3%', direction: 'エネルギーショック下でも低水準——負担は利益率・補助金が吸収、CPIには現れず' }
        ]
      }
    },

    industrialImpact: {
      title: { en: 'Impact on Industrial Electricity Consumers', ja: '産業用電力消費者への影響' },
      data: {
        en: [
          { parameter: 'Direct Cost Impact', offer: '+7 satang/kWh tariff increase', demand: '~17.5 Mn baht / year per 250 GWh', driver: 'Typical mid-sized auto-parts complex' },
          { parameter: 'Capacity-Payment Burden', offer: 'EGAT availability payments 0.63 THB/kWh', demand: '~17% of base tariff', driver: 'Underutilized gas plants (7 of 11 <10% capacity factor in 2025)' },
          { parameter: 'Petrochemical Disruption', offer: 'Plastic resin prices +30–40%', demand: 'Olefins plants suspended on feedstock shortage', driver: 'Hits downstream consumer-goods manufacturers' },
          { parameter: 'Inflation Pass-Through', offer: 'Thai goods +3–5% on average', demand: 'Energy & logistics cost pressure', driver: 'Margin compression rather than CPI rise' }
        ],
        ja: [
          { parameter: '直接コスト影響', offer: '+7サタン/kWh値上げ', demand: '250 GWh消費当り年間約1,750万バーツ', driver: '中規模自動車部品コンプレックスの典型' },
          { parameter: '容量支払負担', offer: 'EGAT待機支払0.63 THB/kWh', demand: '基本料金の約17%', driver: '稼働率の低いガス火力（2025年は11基中7基が10%未満）' },
          { parameter: '石油化学の混乱', offer: '樹脂価格+30〜40%', demand: 'オレフィン工場が原料不足で停止', driver: '川下の消費財メーカーを直撃' },
          { parameter: 'インフレ転嫁', offer: 'タイ製品平均+3〜5%', demand: 'エネルギー・物流コスト圧力', driver: 'CPI上昇ではなく利益率圧迫として現れる' }
        ]
      }
    },

    opportunities: {
      en: [
        'JPY/THB at 100/20.3 (~14% YoY favourable): one-time strategic window to repatriate accumulated THB cash, settle intercompany loans, and acquire Thai assets in JPY terms before a possible Fed dovish pivot reverses it.',
        'Lock renewable PPAs and rooftop solar now under Direct PPA / UGT2 frameworks — payback 5–8 years at current tariffs, supported by the new THB 200,000 rooftop-solar tax relief.',
        'BEV/HEV export pivot: EV 3.5 1.5x export credit makes Thailand a structurally more competitive base for hybrids than for ICE — Toyota Yaris ATIV HEV emergence as #1 selling model in November 2025 confirms the thesis.',
        'Diversify exports under 14 existing FTAs: utilization remains low (one in five eligible exports forgo preferences) — material upside for ASEAN, RCEP, CPTPP-focused trade-compliance teams.',
        'Yield-curve & FX-volatility opportunities: BoT cut to 0.75% while Fed holds would steepen the curve (receive 2y, pay 10y THB IRS); corporate clients have unmet appetite for FX collars and TARFs given ~9% YTD baht volatility.'
      ],
      ja: [
        'JPY/THBは100/20.3（前年同期比約14%有利）：Fedのハト派転換で逆転する前に、内部留保の本国還流、企業間貸付の決済、円建てでのタイ資産取得を実行する一回限りの戦略的好機。',
        'Direct PPA／UGT2枠組みで再エネPPA・屋根置き太陽光を直ちに固定化——現行料金下で投資回収5〜8年、新設の20万バーツ屋根置き太陽光税控除が後押し。',
        'BEV／HEV輸出ピボット：EV 3.5の1.5倍輸出クレジットにより、タイはICE車よりHEV輸出基地として構造的に競争力が高い——2025年11月にトヨタ・ヤリスATIV HEVが販売トップに立ちテーゼを実証。',
        '既存14のFTAを活用した輸出多角化：利用率は低位（適格輸出の5件に1件は特恵を放棄）——ASEAN、RCEP、CPTPPに特化した通商コンプライアンスチームには大きな上振れ余地。',
        'イールドカーブ・為替ボラティリティ機会：BoTが0.75%へ追加利下げかつFed据置となればカーブはスティープ化（2年Receive・10年Pay THB IRS）、年初来約9%の為替変動を受け企業はFXカラーやTARFの需要が顕在化。'
      ]
    },

    risks: {
      en: [
        'Stagflationary margin squeeze: the BoT 0.3% inflation forecast masks a heavy producer-side cost burden — the energy shock is being absorbed by corporate margins, not CPI, so price recovery is structurally constrained.',
        'September–December 2026 Ft cycle: EGAT 35.928 Bn baht and PTT US$360 Mn unrecovered burdens must eventually flow through — base-case 20–60 satang/kWh increase even if Brent retreats to US$80.',
        'Hormuz / supply-chain re-rupture: Qatar LNG production may take 3–5 years to fully restore; petrochemical feedstock shortfall already pushed Thai plastic resin +30–40% in weeks.',
        'Central-bank week regime risk: Fed hawkish hold + BoT cut would push baht toward 33; Fed dovish + BoT hold would drive baht below 32 — pre-positioned hedging instructions for all four combinations are essential.',
        'US Section 301 + 10–15% Section 122 tariffs replacing IEEPA tariffs (struck 20 February 2026): BoT 2026 export growth forecast collapses to 0.6% from 12% in 2025 — front-loading and FTA diversification become defensive necessities.',
        'SME / household credit deterioration: household debt >86% of GDP (highest in ASEAN-5); SME loan quality is degrading; Japanese banks (MUFG/Krungsri, SMBC, Mizuho) should increase provisioning.'
      ],
      ja: [
        'スタグフレーション的利益圧迫：BoTの0.3%インフレ予想は重い生産者側コスト負担を隠蔽——エネルギーショックは企業利益率が吸収しCPIには現れず、価格回復は構造的に制約。',
        '2026年9〜12月Ftサイクル：EGAT 359.28億バーツ、PTT 3.6億米ドルの未回収負担は最終的に転嫁が不可避——ブレントが80米ドルへ戻っても20〜60サタン/kWh上昇がベースケース。',
        'ホルムズ／サプライチェーン再断絶：カタールLNG生産の完全復旧は3〜5年要す可能性、石化原料不足は既に数週間でタイ樹脂価格を+30〜40%押し上げ。',
        '中央銀行週間のレジームリスク：Fed据置タカ派＋BoT利下げならバーツは33方向、Fedハト派＋BoT据置なら32割れ——4組合せ全てに対する事前ヘッジ指示が必須。',
        '米Section 301＋IEEPA関税（2026年2月20日違憲判決）に代わるSection 122の10〜15%関税：BoTの2026年輸出成長予測は2025年12%から0.6%へ崩落——前倒し出荷とFTA多角化が防衛的必須。',
        'SME・家計信用の劣化：家計債務はGDP比86%超（ASEAN-5最大）、SMEローン品質は悪化、日系銀行（MUFG／クルンスリ、SMBC、みずほ）は引当金積み増しが必要。'
      ]
    },

    opinion: {
      title: { en: 'WaLens Analysis: Strategic Interpretation', ja: 'WaLensの分析：戦略的解釈' },
      intro: {
        en: 'The following represents WaLens\' independent analysis based on the facts presented above. These are interpretive observations, not objective data points.',
        ja: '以下は上記のファクトに基づくWaLensの独自分析です。これらは解釈的な見解であり、客観的なデータポイントではありません。'
      },
      points: {
        en: [
          {
            title: 'Treat the 1.8% Tariff Hike as a Down Payment, Not the Bill',
            content: 'The May–August Ft increase looks moderate — but it was only achievable because the ERC drained 9.472 Bn baht of clawback funds and deferred 35.928 Bn baht of EGAT debt. Plan capex, pricing, and procurement assuming the September–December 2026 cycle absorbs a meaningful share of that deferred burden. Companies that price as if 3.95 THB/kWh is the new normal will be caught off-guard at the next ERC announcement.'
          },
          {
            title: 'The Weak Baht Is a Strategic Window, Not a Headwind',
            content: 'Yen-reporting parents instinctively read 32.38 THB/USD as bad news, but the JPY/THB cross is the deciding metric — and at 100/20.3, retained THB earnings translate into 14% more JPY than 12 months ago. The correct response is to accelerate intercompany dividends, settle JPY-denominated intercompany loans, and bring forward any Thai-asset acquisitions while the cross holds.'
          },
          {
            title: 'The 28–30 April Central-Bank Week Will Set the Q2–Q3 Regime',
            content: 'FOMC (28–29 April) and กนง. (29–30 April) are back-to-back. The four combinatorial outcomes have materially different implications for FX, IRS, and credit. Treasury teams that walk in without pre-positioned hedge instructions for each scenario will be making decisions under stress in the 24 hours after each release — when liquidity is thinnest and bid-offer spreads widest.'
          },
          {
            title: 'Energy Cost Is Now a Procurement Strategy, Not an Operating Expense',
            content: 'With EGAT debt deferral, capacity payments at 17% of base tariff, and Sept–Dec Ft pressure, a one-time PPA / rooftop-solar / UGT2 decision in Q2 2026 has more permanent margin impact than five years of incremental kaizen on the shop floor. CFOs and plant managers should escalate this from a facilities-engineering decision to a board-level capital-allocation question.'
          }
        ],
        ja: [
          {
            title: '1.8%の値上げは「請求書」ではなく「頭金」と捉えよ',
            content: '5〜8月Ft上昇は穏当に見えるが、これはERCが94.72億バーツのクローバック原資を投入し、EGATの359.28億バーツの債務を繰延したからこそ実現した。設備投資・価格・調達は、繰延負担の相当部分が9〜12月サイクルで現れる前提で計画せよ。3.95 THB/kWhを「新常態」と価格設定する企業は次回ERC発表で不意を突かれる。'
          },
          {
            title: 'バーツ安は逆風ではなく戦略的好機',
            content: '円建て報告の親会社は本能的に32.38 THB/USDを悪材料と読むが、決定的な指標はJPY/THBのクロスである——100/20.3では、内部留保のバーツが12ヶ月前より14%多い円に換算される。正しい対応は、企業間配当の加速、円建て企業間貸付の決済、クロスが維持されている間のタイ資産取得の前倒しである。'
          },
          {
            title: '4月28〜30日の中央銀行週間が第2〜第3四半期のレジームを決める',
            content: 'FOMC（4月28〜29日）と กนง.（4月29〜30日）が連続開催。4つの組合せ結果はFX・IRS・信用に対し質的に異なる含意を持つ。各シナリオに対する事前ヘッジ指示なしに臨む財務チームは、流動性が最も薄くビッドオファーが最も広がる発表後24時間に、ストレス下で判断することになる。'
          },
          {
            title: 'エネルギーコストはもはや「経費」ではなく「調達戦略」',
            content: 'EGAT債務繰延、基本料金の17%に達する容量支払、9〜12月のFt圧力を踏まえれば、2026年第2四半期のPPA／屋根置き太陽光／UGT2に関する一度限りの判断は、現場で5年間積み重ねるカイゼンよりも恒久的な利益率インパクトを持つ。CFOと工場長はこれを「ファシリティ・エンジニアリング判断」から「取締役会レベルの資本配分課題」に格上げすべきである。'
          }
        ]
      }
    },

    recommendations: {
      en: [
        { title: 'Run Dual Scenarios for the 28–30 April Central-Bank Week', content: 'Pre-position hedging instructions with treasury counterparties for all four FOMC × กนง. combinations. Scenario A (Fed hawkish hold + BoT cut): baht to ~33, lock USD payable hedges. Scenario B (Fed dovish hold + BoT hold): baht recovers to ~31.50, close THB-short positions. Scenario C (Fed dovish + BoT cut): yen-funded carry into THB compresses, reassess intra-group funding mix.', priority: 'Immediate' },
        { title: 'Repatriate Accumulated THB Cash and Settle Intercompany Loans Now', content: 'With JPY/THB at 100/20.3 (vs. 100/24+ in early 2025), THB retained earnings translate into 14% more JPY than a year ago. Time intercompany dividends, royalties, management fees, and JPY-denominated intercompany loan settlements before any Fed dovish pivot reverses the cross.', priority: 'Immediate' },
        { title: 'Lock Renewable PPAs and Rooftop Solar Before the Sept–Dec Ft Hike', content: 'EGAT\'s 35.928 Bn baht and PTT\'s US$360 Mn unrecovered burdens guarantee further tariff pressure. Sign Direct PPA or UGT2 agreements in Q2 2026 and commission rooftop solar under the new THB 200,000 tax-relief grant — payback is 5–8 years at current tariffs and shorter once the Sept–Dec Ft increase lands.', priority: 'Immediate' },
        { title: 'Manufacturing: Extend USD Hedges to 6–9 Months and Add Energy-Pass-Through Clauses', content: 'For Japanese OEMs (Toyota, Honda, Nissan, Mitsubishi, Isuzu, Suzuki) and Tier 1/2 suppliers, extend USD/JPY-receivable forward-cover from 3-month rolling to 6–9 months before potential Fed dovishness reverses the trend. Renegotiate supply contracts with OEMs to include Ft-indexed energy-cost pass-through and a baht/USD trigger; finance Thai subsidiaries via intercompany loans rather than equity to capture the 14% JPY/THB gain on conversion.', priority: 'Immediate' },
        { title: 'Logistics & Supply Chain: Renegotiate Fuel Surcharges and Diversify Around Hormuz', content: 'Treat the 31.14 THB/L diesel cap as temporary — build contractual flexibility in case the 150 Bn baht fuel-fund borrowing exhausts and retail diesel rises toward 40+ THB/L in H2 2026. Pre-position 2–4 weeks of safety stock on imported polymers, electronic chemicals, and specialty steel; route Middle East / Europe cargo via Cape of Good Hope; review marine cargo war-risk premia at the regional level.', priority: 'Immediate' },
        { title: 'Real Estate & Construction: Lock Long-Tenor THB Debt at the 1.00% Policy Rate', content: 'With BoT at a 3-year low and baht weakness limiting how far rates can fall without triggering capital outflow, refinance variable-rate debt to fixed-rate now. Embed energy-cost escalators (steel, copper, cement, plastic) in construction contracts. Prioritise green-certified, energy-efficient developments — rising tariffs make efficiency a material differentiator for industrial-estate, logistics-park, and Grade-A office tenants with parent-company decarbonisation mandates.', priority: 'Mid-term' },
        { title: 'Retail & Consumer Goods: Defer Capex, Reweight Toward JPY-Sourced Imports', content: 'Household debt >86% of GDP, end of Khon La Khrueng co-payment, and weak farm incomes limit pricing power. Prioritise same-store productivity over footprint expansion. Pass through energy costs only on premium SKUs with inelastic demand. JPY weakness in the JPY/THB cross is favourable for Japanese-origin imports relative to USD-sourced — reweight SKU sourcing accordingly.', priority: 'Mid-term' },
        { title: 'Financial Services: Reprice SME Credit, Capitalise on FX-Volatility Demand', content: 'Increase SME loan provisioning consistent with BoT\'s flagged credit-quality concerns. Position for a steeper Thai yield curve under Fed-hold / BoT-cut scenario (receive 2y, pay 10y THB IRS). Build out FX option structures (collars, target-redemption forwards) — corporate clients have unmet hedging appetite given ~9% YTD baht volatility. Expand renewable-energy and EV-supply-chain financing — BOI Japanese investment applications surged 146% YoY to 119 Bn baht.', priority: 'Strategic' },
        { title: 'Export-Oriented Industries: Front-Load US Inventory and Activate FTA Compliance', content: 'With Section 301 investigations active and 10–15% Section 122 tariffs replacing the struck-down IEEPA tariffs, pre-position inventory in US warehouses ahead of outcomes. Build dedicated trade-compliance teams to capture ASEAN, RCEP, CPTPP preferences — current FTA utilisation is low (one in five eligible exports forgo preferences).', priority: 'Strategic' }
      ],
      ja: [
        { title: '4月28〜30日中央銀行週間に向け複数シナリオを並行運用せよ', content: 'FOMC × กนง. の4組合せ全てに対する事前ヘッジ指示をトレジャリー・カウンターパーティと共有せよ。シナリオA（Fed据置タカ派＋BoT利下げ）：バーツは約33へ、USD建て買掛のヘッジを固定。シナリオB（Fedハト派据置＋BoT据置）：バーツは約31.50へ回復、THBショートを解消。シナリオC（Fedハト派＋BoT利下げ）：円ファンディングのバーツへのキャリーが縮小、グループ内資金構成を再評価。', priority: '即座' },
        { title: '蓄積THBキャッシュの本国還流と企業間貸付決済を直ちに実行せよ', content: 'JPY/THB 100/20.3（2025年初の100/24+対比）により、THB内部留保は1年前より14%多い円に換算される。Fedのハト派転換でクロスが逆転する前に、企業間配当、ロイヤリティ、マネジメントフィー、円建て企業間貸付の決済タイミングを合わせよ。', priority: '即座' },
        { title: '9〜12月Ft上昇前に再エネPPA・屋根置き太陽光を固定化せよ', content: 'EGAT 359.28億バーツとPTT 3.6億米ドルの未回収負担は更なる料金圧力を保証する。2026年第2四半期にDirect PPAまたはUGT2を締結し、新設の20万バーツ税控除を活用して屋根置き太陽光を発注せよ——現行料金で投資回収5〜8年、9〜12月Ft上昇後は更に短縮。', priority: '即座' },
        { title: '製造業：USDヘッジを6〜9ヶ月に延長し、エネルギー転嫁条項を追加せよ', content: '日系OEM（トヨタ、ホンダ、日産、三菱、いすゞ、スズキ）とTier 1/2サプライヤーは、Fedのハト派転換で潮流が反転する前に、USD/JPY建て売掛のフォワードカバーを3ヶ月ローリングから6〜9ヶ月へ延長。OEMとの供給契約を再交渉し、Ft連動のエネルギーコスト転嫁とバーツ/USDトリガーを織り込め。タイ子会社への資金供給は出資ではなく企業間貸付で実施し、14%のJPY/THB換算益を取りに行け。', priority: '即座' },
        { title: '物流・サプライチェーン：燃料サーチャージ再交渉とホルムズ回避ルートの多角化', content: '31.14 THB/Lのディーゼル価格上限は一時措置と見なせ——1,500億バーツの石油基金借入が枯渇し、2026年下半期に小売ディーゼルが40 THB/L超へ上昇する場合に備え、契約上の柔軟性を構築せよ。輸入ポリマー、電子化学品、特殊鋼の安全在庫を2〜4週間積み増し、中東・欧州向け貨物は喜望峰経由へ振り替え、海上貨物の戦争リスク保険料を地域レベルで再交渉せよ。', priority: '即座' },
        { title: '不動産・建設：政策金利1.00%で長期THB建て負債を固定化せよ', content: 'BoTは3年ぶり低水準、バーツ安が更なる利下げ余地を制約する中、変動金利債務を直ちに固定金利へ借換せよ。建設契約にエネルギーコスト・エスカレーター（鉄鋼、銅、セメント、樹脂）を埋め込め。グリーン認証・省エネ型開発を優先せよ——料金上昇は、親会社に脱炭素義務を負う工業団地・物流パーク・グレードA級オフィスのテナントにとって省エネを実質的差別化要因に変える。', priority: '中期' },
        { title: '小売・消費財：出店投資を延期し、円建て輸入比率を引き上げよ', content: '家計債務GDP比86%超、コン・ラ・クルン共同決済の終了、農業所得の低迷が価格決定力を制約する。出店拡大より既存店生産性を優先せよ。エネルギーコスト転嫁は需要非弾力的なプレミアムSKUに限定せよ。JPY/THBクロスにおける円安はUSD建て調達対比で日本産輸入に有利——SKU調達の比重を移せ。', priority: '中期' },
        { title: '金融：SME信用の再プライシング、為替ボラティリティ需要の取り込み', content: 'BoTが指摘する信用品質懸念に整合的にSMEローンの引当金を積み増せ。Fed据置／BoT利下げシナリオ下のスティープ化に備えポジション構築（2年Receive、10年Pay THB IRS）。為替オプション構造（カラー、TARF）を整備せよ——年初来約9%のバーツ変動を踏まえ、企業のヘッジ需要は未充足。再エネ・EVサプライチェーン融資を拡張せよ——BOIの日系投資申請は前年同期比+146%の1,190億バーツへ急増。', priority: '戦略的' },
        { title: '輸出産業：米国向け在庫を前倒しし、FTAコンプライアンスを起動せよ', content: 'Section 301調査が進行中で、違憲判決を受けたIEEPA関税に代わり10〜15%のSection 122関税が導入される中、結果判明前に米国倉庫へ在庫を前倒し配置せよ。専従の通商コンプライアンスチームを構築し、ASEAN、RCEP、CPTPPの特恵を取り込め——現状FTA利用率は低く、適格輸出の5件に1件は特恵を放棄している。', priority: '戦略的' }
      ]
    },

    industryImpact: {
      title: { en: 'Sector-Specific Impact Snapshot', ja: 'セクター別影響スナップショット' },
      data: [
        { sector: { en: 'Automotive & Auto Parts', ja: '自動車・自動車部品' }, impact: { en: '2025 production -0.9% to 1.46 Mn units; exports -8.2% to 0.94 Mn (THB 622 Bn, -11.1%); FTI 2026 forecast 1.50 Mn units (+3.1%); pickup demand weak under tight credit', ja: '2025年生産-0.9%で146万台、輸出-8.2%で94万台（6,220億バーツ、-11.1%）、FTIの2026年予測150万台（+3.1%）、信用引締めでピックアップ需要弱含み' }, action: { en: 'Hedge USD long, lock renewable PPAs, pivot harder into HEV/BEV exports under EV 3.5 1.5x credit', ja: 'USD建て長期ヘッジ、再エネPPA固定、EV 3.5の1.5倍クレジット下でHEV/BEV輸出に一層シフト' } },
        { sector: { en: 'Electronics & Export-Oriented', ja: '電子機器・輸出産業' }, impact: { en: 'PMI 56.6 in Oct 2025 (highest since May 2023); BoT 2026 export growth forecast just 0.6% (vs. 12% 2025) on US 10–15% tariffs + Section 301', ja: '2025年10月PMI 56.6（2023年5月以来の高値）、BoT 2026年輸出成長予測は米国10〜15%関税＋Section 301で僅か0.6%（2025年12%対比）' }, action: { en: 'Front-load US inventory, lock long USD hedges, activate FTA compliance teams', ja: '米国在庫の前倒し、USD建て長期ヘッジ固定、FTAコンプライアンスチーム起動' } },
        { sector: { en: 'Retail & Consumer Goods', ja: '小売・消費財' }, impact: { en: 'Household debt >86% of GDP; end of Khon La Khrueng; weak farm incomes; plastic resin +30–40%', ja: '家計債務GDP比86%超、コン・ラ・クルン終了、農業所得低迷、樹脂+30〜40%' }, action: { en: 'Defer store-expansion capex; selective pass-through; reweight to JPY-sourced imports; target 13.4 Mn subsidy recipients via value tier', ja: '出店投資延期、選択的価格転嫁、JPY建て輸入比率引上げ、バリュー層で1,340万人補助対象を獲得' } },
        { sector: { en: 'Real Estate & Construction', ja: '不動産・建設' }, impact: { en: 'KBank/SCB MLR ~6.40% at policy rate 1.00%; SME loan quality deteriorating; energy-driven steel/cement/resin inflation', ja: '政策金利1.00%下でKBank／SCBのMLRは約6.40%、SMEローン品質悪化、エネルギー起因の鉄鋼・セメント・樹脂インフレ' }, action: { en: 'Refinance to fixed-rate now; energy escalators in contracts; prioritise green-certified developments; cautious on residential speculation', ja: '直ちに固定金利へ借換、契約にエネルギー・エスカレーター、グリーン認証開発を優先、住宅投機には慎重' } },
        { sector: { en: 'Financial Services / Banking', ja: '金融サービス・銀行' }, impact: { en: 'Q2 2025 credit growth +0.1% YoY after 5 quarters of contraction; gold-trade FX scrutiny; Powell→Warsh transition (15 May 2026)', ja: '2025年第2四半期の与信成長は5四半期連続マイナス後の前年同期比+0.1%、金取引FXへの監視強化、パウエル→ウォーシュ移行（2026年5月15日）' }, action: { en: 'Reprice SME credit; steepener trades; expand FX option desk; renewable & EV supply-chain financing (BOI Japanese applications +146% YoY)', ja: 'SME信用再プライシング、スティープナー取引、FXオプションデスク拡張、再エネ・EVサプライチェーン融資拡大（BOI日系申請+146%）' } },
        { sector: { en: 'Logistics & Supply Chain', ja: '物流・サプライチェーン' }, impact: { en: 'Diesel 31.14 vs unsubsidised 54.19 THB/L; Hormuz disruption; Thai-Cambodia border closed through H1 2026; petrochemical feedstock shortage', ja: 'ディーゼル31.14（無補助54.19）THB/L、ホルムズ混乱、タイ・カンボジア国境は2026年上半期通じ閉鎖、石化原料不足' }, action: { en: 'Renegotiate fuel surcharges; build alt routings via Cape of Good Hope; +2–4 weeks safety stock; depot fleet electrification + rooftop solar', ja: '燃料サーチャージ再交渉、喜望峰経由代替ルート構築、安全在庫2〜4週間積み増し、デポ車両電化＋屋根置き太陽光' } }
      ]
    },

    crossCutting: {
      title: { en: 'Cross-Cutting Strategic Themes', ja: '横断的戦略テーマ' },
      data: [
        { indicator: { en: 'Use Weak Baht as One-Time Window', ja: 'バーツ安は一回限りの戦略的好機として活用' }, value: { en: 'Accelerate intercompany dividends, loan settlements, and Thai-asset acquisitions before a Fed dovish pivot reverses the JPY/THB cross', ja: 'Fedのハト派転換でJPY/THBクロスが逆転する前に、企業間配当、貸付決済、タイ資産取得を加速' } },
        { indicator: { en: 'Treat Energy-Cost Escalation as Structural', ja: 'エネルギーコスト上昇は構造的と捉えよ' }, value: { en: 'Even if Brent returns to US$80, EGAT 35.928 Bn baht and PTT US$360 Mn deferred debts must flow through — base case Sept–Dec Ft hike of 20–60 satang/kWh', ja: 'ブレントが80米ドルへ戻っても、EGAT 359.28億バーツ・PTT 3.6億米ドルの繰延債務は転嫁不可避——9〜12月Ft上昇20〜60サタン/kWhがベースケース' } },
        { indicator: { en: 'Watch the 28–30 April Central-Bank Week', ja: '4月28〜30日中央銀行週間を注視' }, value: { en: 'FOMC + กนง. outcomes set the FX/IRS/credit regime for the next 6–10 weeks; pre-positioned hedge instructions for all four combinations', ja: 'FOMC＋กนง.の結果が今後6〜10週間のFX／IRS／信用レジームを規定、4組合せ全てに対する事前ヘッジ指示' } },
        { indicator: { en: 'Confirm Political Stability Assumptions', ja: '政治安定の前提を再確認' }, value: { en: 'PM Anutin\'s Bhumjaithai government has ~194/500 seats; capital-budget disbursement delayed; FY2027 budget at risk — build 3–6 month timeline buffers for approvals', ja: 'アヌティン首相のプームジャイタイ政権は約194／500議席、資本予算執行は遅延、2027年度予算はリスク——承認案件には3〜6ヶ月のスケジュール余裕を確保' } },
        { indicator: { en: 'JETRO Bangkok Survey (Nov–Dec 2025)', ja: 'JETROバンコク調査（2025年11〜12月）' }, value: { en: '23% plan to increase Thailand investment in 2026; 35% expect export growth; 26% considering regional offices — recalibrate against post-Iran-conflict data', ja: '23%が2026年タイ投資拡大を計画、35%が輸出拡大予想、26%が地域拠点設置検討——イラン紛争後のデータで再較正' } }
      ]
    },

    sources: [
      'Energy Regulatory Commission (ERC, กกพ.) — May–August 2026 Tariff Approval (1 April 2026)',
      'Nation Thailand — ERC Tariff Decision Coverage (April 2026)',
      'Kaohoon International — Ft Adjustment and Clawback Fund Analysis (April 2026)',
      'IEEFA — Thailand LNG Cost & Hormuz Disruption Analysis (March–April 2026)',
      'Bank of Thailand — Monetary Policy Committee (กนง.) Releases (Feb & April 2026)',
      'US Federal Reserve — FOMC March & April 2026 Statements',
      'Trading Economics — THB/USD, JPY/THB, Brent Crude (April 2026)',
      'Bangkok Bank & Wise — FX Reference Rates (26–27 April 2026)',
      'IEA — Energy Supply Shock Assessment (March–April 2026)',
      'Goldman Sachs — Q4 2026 Brent Forecast Update (April 2026)',
      'Citi Research — Brent Conditional Scenarios (April 2026)',
      'Rory Johnston / Commodity Context — Hormuz Reopening Scenario Note',
      'CNBC, Al Jazeera — Iran Conflict & Hormuz Coverage (March–April 2026)',
      'PTT — LNG Subsidy Position Disclosures',
      'EGAT — Capacity Payment & Accumulated Cost Filings',
      'Ministry of Energy (Thailand) — Emergency Borrowing Decree Drafts (April 2026)',
      'Federation of Thai Industries (FTI) — 2026 Production & Export Forecasts',
      'JETRO Bangkok — Japanese Firms Survey (Nov–Dec 2025)',
      'BOI (Thailand) — Japanese Investment Applications (2025–2026)',
      'KBank, SCB, KTB — MLR Disclosures (Late 2025)',
      'IMF, World Bank, SCB EIC — Thailand 2026 GDP Forecasts',
      'SCB EIC — Household Debt and SME Credit Quality Notes',
      'Reuters & Nikkei Asia — Thai Politics, Anutin Government Coverage'
    ]
  };

  return (
    <>
      <SEO
        title={isJapanese
          ? '在タイ日系企業経営層向け戦略ブリーフィング：エネルギー危機・バーツ安・セクター別推奨アクション | WaLens'
          : 'Strategic Briefing for Japanese Executives in Thailand: Energy Crisis, Baht Depreciation & Sector Recommendations | WaLens'
        }
        description={isJapanese
          ? '2026年4月28日時点の戦略ブリーフィング：5〜8月電力料金、ホルムズ封鎖によるLNGショック、バーツ32.38、4月28〜30日中央銀行週間、6セクター別推奨アクション。'
          : 'Strategic briefing as of 28 April 2026: May–Aug electricity tariff, Hormuz LNG shock, baht at 32.38, 28–30 April central-bank week, and recommendations across 6 sectors.'
        }
        canonicalPath="/insights/services/energy-crisis-baht-strategy-2026"
      />
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero */}
        <section className="relative w-full h-[340px] md:h-[420px] flex items-end overflow-hidden">
          <img src={heroImage} alt="Energy Crisis and Baht Depreciation Strategic Briefing for Japanese Executives in Thailand" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
          <div className="relative z-20 container mx-auto px-4 pb-10">
            <Badge variant="outline" className="mb-3 bg-blue-500/20 text-blue-200 border-blue-500/30">
              <Sparkles className="h-3 w-3 mr-1" />
              {content.category[isJapanese ? 'ja' : 'en']}
            </Badge>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight max-w-4xl" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
              {content.headline[isJapanese ? 'ja' : 'en']}
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-3xl" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
              {content.subheadline[isJapanese ? 'ja' : 'en']}
            </p>
            <div className="flex items-center gap-3 mt-3 text-sm text-gray-300 flex-wrap">
              <Badge variant="secondary" className="bg-white/10 text-white border-0">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
              <span>{isJapanese ? '最終更新' : 'Updated'}: {content.lastUpdated}</span>
              <BookmarkButton
                article={{
                  slug,
                  title: isJapanese ? titleJa : titleEn,
                  language: lang === 'ja' ? 'JP' : 'EN',
                  url: `/insights/services/${slug}`,
                  category: 'Services'
                }}
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
            { label: isJapanese ? 'エネルギー危機・バーツ安戦略' : 'Energy Crisis & Baht Strategy' }
          ]} />

          {/* TOC */}
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
                    <span style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{section.label}</span>
                    <ChevronRight className="h-3 w-3 ml-auto text-muted-foreground" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Executive Summary */}
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
                      <span className="text-sm leading-relaxed" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Facts */}
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

            {/* Electricity Tariff */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  {content.electricityTariff.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '指標' : 'Indicator'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '数値' : 'Value'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '変化率' : 'Change'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '主因' : 'Driver'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.electricityTariff.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.indicator}</td>
                          <td className="py-3 pr-4">{row.value}</td>
                          <td className="py-3 pr-4 text-muted-foreground">{row.growth}</td>
                          <td className="py-3 text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.driver}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Energy Shock */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  {content.energyShock.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '指標' : 'Metric'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '数値' : 'Value'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '戦略的含意' : 'Implication'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.energyShock.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.metric}</td>
                          <td className="py-3 pr-4">{row.value}</td>
                          <td className="py-3 text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.implication}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Govt Response */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  {content.govResponse.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.govResponse.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                    <div key={idx} className="border-l-2 border-blue-500/30 pl-4">
                      <h4 className="font-semibold text-sm mb-1" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.factor}</h4>
                      <p className="text-sm text-muted-foreground mb-1" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}><span className="font-medium text-foreground">{isJapanese ? '影響：' : 'Impact: '}</span>{row.impact}</p>
                      <p className="text-sm text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}><span className="font-medium text-foreground">{isJapanese ? '緩和策：' : 'Mitigation: '}</span>{row.mitigation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Macro Dashboard */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-emerald-500" />
                  {content.macroDashboard.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '要因' : 'Factor'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '現状' : 'Current State'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '方向性' : 'Direction'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.macroDashboard.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.factor}</td>
                          <td className="py-3 pr-4">{row.value}</td>
                          <td className="py-3 text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.direction}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Industrial Impact */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Truck className="h-5 w-5 text-amber-600" />
                  {content.industrialImpact.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '項目' : 'Parameter'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '指標' : 'Metric'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '影響' : 'Impact'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '主因' : 'Driver'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.industrialImpact.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.parameter}</td>
                          <td className="py-3 pr-4">{row.offer}</td>
                          <td className="py-3 pr-4">{row.demand}</td>
                          <td className="py-3 text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.driver}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Opp & Risks */}
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
                        <span style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{opp}</span>
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
                        <span style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Paywall */}
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
              {/* Opinion */}
              <section id="opinion" className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Lightbulb className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{content.opinion.title[isJapanese ? 'ja' : 'en']}</h2>
                    <p className="text-sm text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{content.opinion.intro[isJapanese ? 'ja' : 'en']}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {content.opinion.points[isJapanese ? 'ja' : 'en'].map((point, idx) => (
                    <Card key={idx} className="border-l-4 border-l-purple-500/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Eye className="h-4 w-4 text-purple-500" />
                          <span style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{point.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{point.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Recommendations */}
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
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                          <CardTitle className="text-base" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{rec.title}</CardTitle>
                          <Badge variant={rec.priority === 'Immediate' || rec.priority === '即座' ? 'destructive' : rec.priority === 'Strategic' || rec.priority === '戦略的' ? 'default' : 'secondary'}>
                            {rec.priority}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{rec.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Data Appendix */}
              <section id="data-appendix" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <Database className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{isJapanese ? 'データ付録' : 'Data Appendix'}</h2>
                  </div>
                </div>

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
                              <td className="py-3 pr-4 font-medium" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.sector[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 pr-4 text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.impact[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.action[isJapanese ? 'ja' : 'en']}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-rose-500" />
                      {content.crossCutting.title[isJapanese ? 'ja' : 'en']}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'テーマ' : 'Theme'}</th>
                            <th className="text-left py-2 font-semibold">{isJapanese ? '内容' : 'Detail'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.crossCutting.data.map((row, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 pr-4 font-medium" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.indicator[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.value[isJapanese ? 'ja' : 'en']}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Sources */}
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
                        <li key={idx} style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{source}</li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </section>

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

export default EnergyCrisisBahtStrategy;
