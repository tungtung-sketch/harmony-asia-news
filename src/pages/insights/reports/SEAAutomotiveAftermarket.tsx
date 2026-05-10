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
import heroImage from '@/assets/hero-sea-automotive-aftermarket.jpg';

const SEAAutomotiveAftermarket = () => {
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

  const slug = 'sea-automotive-aftermarket-2026';
  const titleEn = "Strategic Transformation of Southeast Asia's Automotive Aftermarket: Growth Drivers, Disruptive Entrants, and Supply Chain Reconfiguration";
  const titleJa = '東南アジア自動車アフターマーケットの構造転換：成長ドライバー、ディスラプター、サプライチェーン再編';

  useEffect(() => {
    if (hasFullAccess && !hasLoggedView) {
      logView(slug, isJapanese ? titleJa : titleEn, 'manufacturing', lang);
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker(slug, titleEn, titleJa, 'Manufacturing', hasFullAccess);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(slug, isJapanese ? titleJa : titleEn, 'manufacturing', lang);
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
    headline: { en: titleEn, ja: titleJa },
    subheadline: {
      en: 'A 10% CAGR aftermarket through 2033, the rise of Chinese OEMs, the China Plus One pivot, and the move from mechanical repair to energy asset management — what Japanese executives must prepare for at the 2026 ASEAN inflection point.',
      ja: '2033年まで年率10%成長のアフターマーケット、中国OEMの台頭、チャイナプラスワン転換、機械整備からエネルギー資産管理への移行——2026年ASEAN転換点に向け日系企業経営層が備えるべきこと。'
    },
    category: { en: 'Manufacturing / Automotive / Aftermarket / EV', ja: '製造業 / 自動車 / アフターマーケット / EV' },
    lastUpdated: '2026-05-10',

    executiveSummary: {
      en: [
        'ASEAN automotive aftermarket projected at 10.0% CAGR (2026–2033), reaching US$38.07 Bn in 2026 and US$74.19 Bn by 2033; the DIFM ("Do It For Me") model holds 55.5% share as vehicle technical complexity rises and DIY declines.',
        'Two-speed regional growth: Vietnam TIV +20.3% (VinFast-led), Philippines +4.6%, Malaysia +0.2%, Thailand –0.1%, Indonesia –7.2% under VAT and household-debt headwinds; xEV adoption Thailand ~44% vs. Indonesia ~11% vs. Malaysia ~5%.',
        'Competitive reset: Japanese ASEAN-6 share fell from ~68% (2023) to 57% (2025); Chinese OEMs (BYD, GWM, Hozon/Neta) climbed from 4% to 11%, with BYD capturing 35% of Thai NEV in H1 2023 — but 58% of consumers still cite quality and battery-safety concerns.',
        'Supply chain reconfiguration: Thailand FDI applications hit US$42.2 Bn in 2025 (+94% YoY); Vietnam FDI US$38.42 Bn (56% in processing/manufacturing); Indonesia leverages nickel restrictions to anchor battery cell and precursor production.',
        'EV value pools to 2035: vehicle manufacturing & aftermarket US$55–69 Bn (Thailand/Vietnam), battery production US$9–11 Bn (Indonesia/Thailand), raw-materials processing US$7–9 Bn (Indonesia) — total ~69% of an US$80–100 Bn ASEAN EV ecosystem.',
        'Strategic edge for Japanese players: invest now in EV diagnostics, battery health monitoring, wireless and semi-dynamic charging, telematics-driven predictive maintenance (–37% unscheduled downtime in Asian ride-share fleets), and OTA service contracts.'
      ],
      ja: [
        'ASEAN自動車アフターマーケットは2026〜2033年にCAGR 10.0%、2026年380.7億米ドル、2033年741.9億米ドルへ成長予想。車両の技術的複雑化でDIYが後退し、DIFM（業者整備）モデルが55.5%のシェアを占める。',
        '二極化する地域成長：ベトナムTIV +20.3%（VinFast主導）、フィリピン+4.6%、マレーシア+0.2%、タイ-0.1%、インドネシア-7.2%（VAT引上げ・家計債務逆風）。xEV普及率はタイ約44%、インドネシア約11%、マレーシア約5%。',
        '競争構図の刷新：ASEAN-6の日系シェアは2023年約68%から2025年57%へ低下、中国OEM（BYD、GWM、Hozon／Neta）は4%→11%へ上昇。BYDは2023年上半期にタイNEV市場の35%を獲得——一方、消費者の58%は依然として品質と電池安全性に懸念を示す。',
        'サプライチェーン再編：タイFDI申請は2025年422億米ドル（前年比+94%）、ベトナムFDIは384.2億米ドル（うち56%が加工・製造）、インドネシアはニッケル輸出規制を活用し電池セル・前駆体生産を誘致。',
        '2035年までのEVバリュープール：車両製造＆アフターマーケット550〜690億米ドル（タイ／ベトナム）、電池製造90〜110億米ドル（インドネシア／タイ）、原材料加工70〜90億米ドル（インドネシア）——ASEAN EVエコシステム800〜1,000億米ドル全体の約69%。',
        '日系企業の戦略的エッジ：EV診断、電池健全性モニタリング、ワイヤレス・準動的充電、テレマティクス予知保全（アジアのライドシェア車両で計画外停止-37%）、OTAサービス契約への先行投資が鍵。'
      ]
    },

    marketGrowth: {
      title: { en: 'ASEAN Aftermarket Growth Outlook', ja: 'ASEANアフターマーケット成長見通し' },
      data: {
        en: [
          { indicator: 'Aftermarket CAGR (2026–2033)', value: '10.0%', growth: 'Forecast', driver: 'Aging vehicle parc, technical complexity, DIFM dominance' },
          { indicator: 'Market Size 2026', value: 'US$38.07 Bn', growth: 'Base year', driver: 'Coherent Market Insights' },
          { indicator: 'Market Size 2033', value: 'US$74.19 Bn', growth: '+95% vs. 2026', driver: 'Compounded growth scenario' },
          { indicator: 'DIFM Market Share', value: '55.5% in 2026', growth: 'Rising', driver: 'EV/SDV complexity discourages DIY' },
          { indicator: 'Regional Avg. Vehicle Age', value: '7.5 years (Asia-Pacific)', growth: 'Trending older', driver: 'Higher wear-and-tear demand' },
          { indicator: 'Engine Components Share', value: '16.3% revenue (2026)', growth: 'Largest segment', driver: 'ICE fleet still dominant' },
          { indicator: 'Electronics Components CAGR', value: '5.59% (through 2031)', growth: 'Fastest growing', driver: 'Software-defined vehicle pivot' },
          { indicator: 'SE Asia Lead-Acid Battery', value: '+US$1.61 Bn (2025–2030)', growth: 'CAGR 7.7%', driver: 'EFB/AGM tech for start-stop systems' }
        ],
        ja: [
          { indicator: 'アフターマーケットCAGR（2026〜2033）', value: '10.0%', growth: '予測', driver: '車両高齢化、技術的複雑化、DIFM優位' },
          { indicator: '市場規模2026年', value: '380.7億米ドル', growth: '基準年', driver: 'Coherent Market Insights' },
          { indicator: '市場規模2033年', value: '741.9億米ドル', growth: '2026年比+95%', driver: '複利成長シナリオ' },
          { indicator: 'DIFMシェア', value: '2026年55.5%', growth: '上昇', driver: 'EV／SDVの複雑化でDIY後退' },
          { indicator: '地域平均車齢', value: '7.5年（アジア太平洋）', growth: '上昇傾向', driver: '消耗部品需要拡大' },
          { indicator: 'エンジン部品シェア', value: '2026年売上16.3%', growth: '最大セグメント', driver: 'ICE車両が依然主流' },
          { indicator: '電子部品CAGR', value: '5.59%（2031年まで）', growth: '最速成長', driver: 'ソフトウェア・デファインド車両への転換' },
          { indicator: '東南アジア鉛蓄電池', value: '+16.1億米ドル（2025〜2030）', growth: 'CAGR 7.7%', driver: 'アイドリングストップ向けEFB／AGM' }
        ]
      }
    },

    countryMarket: {
      title: { en: 'Country-Level Macro & TIV Snapshot (2025/2026)', ja: '国別マクロ・TIVスナップショット（2025／2026）' },
      data: {
        en: [
          { metric: 'Thailand', value: 'TIV –0.1%, xEV ~44%', implication: 'Mature ecosystem, EV-pivoted production hub; Continental Tyres THB 13 Bn Rayong expansion' },
          { metric: 'Indonesia', value: 'TIV –7.2%, xEV ~11%', implication: 'VAT hike + household debt headwinds, but battery hub via nickel restrictions' },
          { metric: 'Vietnam', value: 'TIV +20.3%, GDP +8.02%', implication: 'On-fire FDI; Decree 205/2025 provides 50% funding for CNC/robotics localization' },
          { metric: 'Malaysia', value: 'TIV +0.2%, GDP +4.9%', implication: 'Stable mature market; xEV adoption ~5% lags region' },
          { metric: 'Philippines', value: 'TIV +4.6%, GDP +4.4%', implication: 'Rising xEV adoption, growing middle-class demand' },
          { metric: 'EV Aftermarket Timeline', value: '3–5 years to mass revenue', implication: 'Charging infrastructure & diagnostics already monetisable today' }
        ],
        ja: [
          { metric: 'タイ', value: 'TIV -0.1%、xEV約44%', implication: '成熟エコシステム、EV転換型生産ハブ；コンチネンタルがラヨーンに130億バーツ投資拡張' },
          { metric: 'インドネシア', value: 'TIV -7.2%、xEV約11%', implication: 'VAT引上げ＋家計債務逆風、ニッケル規制で電池ハブ化' },
          { metric: 'ベトナム', value: 'TIV +20.3%、GDP +8.02%', implication: 'FDI過熱、Decree 205/2025がCNC／ロボット国産化に最大50%補助' },
          { metric: 'マレーシア', value: 'TIV +0.2%、GDP +4.9%', implication: '安定的成熟市場、xEV普及率約5%で地域内で遅れ' },
          { metric: 'フィリピン', value: 'TIV +4.6%、GDP +4.4%', implication: 'xEV普及加速、中間層需要拡大' },
          { metric: 'EVアフターマーケット時間軸', value: '本格収益化まで3〜5年', implication: '充電インフラ・診断は既に収益化可能' }
        ]
      }
    },

    chineseOEM: {
      title: { en: 'Chinese OEM Disruption & Localization Barriers', ja: '中国OEMによる破壊的競争とローカライズ障壁' },
      data: {
        en: [
          { factor: 'Japanese ASEAN-6 Share', impact: '~68% (2023) → 57% (2025)', mitigation: 'Defend via HEV pivot, after-sales service depth, certified used-car programs' },
          { factor: 'Chinese OEM Share', impact: '4% → 11% (2023→2025)', mitigation: 'BYD, GWM, Hozon/Neta lead via vertical battery integration and aggressive pricing' },
          { factor: 'BYD Thailand NEV Share', impact: '35% in H1 2023', mitigation: 'Localization via Rever Automotive partnership' },
          { factor: 'Brand Prestige Deficit', impact: '58% of consumers cite quality / battery-safety concerns', mitigation: 'Risk of "1990s motorcycle fate" repeat for new entrants' },
          { factor: 'Environmental Adaptation', impact: 'Vehicles must survive monsoons, humidity, poor roads', mitigation: 'Localized engineering and durability testing' },
          { factor: 'After-Sales Networks', impact: 'BYD has ~3,000 dealers in China but minimal in ASEAN', mitigation: 'Pivot from "sell and move" to "value chain output" model' },
          { factor: 'Price Wars & Margin Squeeze', impact: 'Intense intra-Chinese competition compresses margins', mitigation: 'Cost discipline in invisible features while preserving core quality' },
          { factor: 'Resale Value Risk', impact: 'High depreciation discourages financing for new brands', mitigation: 'Certified used-car programs to stabilize residual values' }
        ],
        ja: [
          { factor: '日系ASEAN-6シェア', impact: '約68%（2023）→ 57%（2025）', mitigation: 'HEVへの転換、アフターサービスの厚み、認定中古車プログラムで防衛' },
          { factor: '中国OEMシェア', impact: '4%→11%（2023→2025）', mitigation: 'BYD、GWM、Hozon／Netaが電池の垂直統合と攻撃的価格で先行' },
          { factor: 'BYDタイNEVシェア', impact: '2023年上半期で35%', mitigation: 'Rever Automotiveとの提携で現地化' },
          { factor: 'ブランド威信ギャップ', impact: '消費者の58%が品質・電池安全性に懸念', mitigation: '新規参入勢の「1990年代バイク撤退」再現リスク' },
          { factor: '環境適応', impact: 'モンスーン・高湿度・劣悪路面に耐える必要', mitigation: '現地エンジニアリングと耐久試験のローカライズ' },
          { factor: 'アフターサービス網', impact: 'BYDは中国で約3,000ディーラー、ASEANではごく僅か', mitigation: '「売り抜け」から「バリューチェーン出力」モデルへ転換' },
          { factor: '価格競争・利益圧迫', impact: '中国勢内部の激しい競争でマージン縮小', mitigation: '見えない部分のコスト管理＋中核品質の維持' },
          { factor: '残価リスク', impact: '新興ブランドは高い減価で割賦販売が阻害', mitigation: '認定中古車プログラムで残価安定化' }
        ]
      }
    },

    valuePool: {
      title: { en: 'EV Value Pools to 2035 (Total US$80–100 Bn ASEAN Ecosystem)', ja: '2035年までのEVバリュープール（ASEAN総額800〜1,000億米ドル）' },
      data: {
        en: [
          { factor: 'Vehicle Manufacturing & Aftermarket', value: 'US$55–69 Bn', direction: 'Thailand / Vietnam lead' },
          { factor: 'Battery Production & Assembly', value: 'US$9–11 Bn', direction: 'Indonesia / Thailand lead' },
          { factor: 'Raw Materials & Processing', value: 'US$7–9 Bn', direction: 'Indonesia (nickel) lead' },
          { factor: 'Connectivity & Diagnostics', value: 'High-growth, share of aftermarket', direction: 'Open to agile aftermarket startups' },
          { factor: 'Charging Infrastructure', value: 'Revenue starting now', direction: 'Wireless / semi-dynamic charging emerging' },
          { factor: 'Battery Second-Life & Module Repair', value: 'Triggered by aging EV fleet', direction: 'Replace cells/modules instead of full pack recycling' }
        ],
        ja: [
          { factor: '車両製造＆アフターマーケット', value: '550〜690億米ドル', direction: 'タイ／ベトナムが牽引' },
          { factor: '電池製造・組立', value: '90〜110億米ドル', direction: 'インドネシア／タイが牽引' },
          { factor: '原材料・加工', value: '70〜90億米ドル', direction: 'インドネシア（ニッケル）が牽引' },
          { factor: 'コネクティビティ＆診断', value: '高成長、アフターマーケット内シェア', direction: 'アジャイルなアフターマーケット・スタートアップに機会' },
          { factor: '充電インフラ', value: '既に収益化開始', direction: 'ワイヤレス／準動的充電が登場' },
          { factor: '電池セカンドライフ・モジュール修理', value: 'EV車両高齢化で需要発生', direction: 'パック丸ごとリサイクルでなくセル／モジュール交換' }
        ]
      }
    },

    distributionShift: {
      title: { en: 'Distribution & Workshop Disruption Map', ja: '流通・整備工場の破壊的変化マップ' },
      data: {
        en: [
          { parameter: 'Importers / Distributors', offer: 'Digital platforms & D2C', demand: 'Loss of margin to data-driven platforms', driver: 'Evolve into logistics & fulfillment partners' },
          { parameter: 'Independent Workshops', offer: 'EV complexity & specialized certifications', demand: 'Exclusion from high-growth EV service market', driver: 'Specialize in battery / module-level repair' },
          { parameter: 'Traditional Dealerships', offer: 'Subscription models & online sales', demand: 'Reduced foot traffic and showroom relevance', driver: 'Hybrid sales models combining online and offline' },
          { parameter: 'Aftermarket Startups', offer: 'Agile technology entrants', demand: 'High customer-acquisition costs', driver: 'Capture connectivity & diagnostics value pools' },
          { parameter: 'Automotive E-Commerce', offer: 'US$9.18 Bn by 2030, +11.4% CAGR', demand: 'Alibaba, Amazon, eBay entering ASEAN', driver: 'Trust gap closure via pricing transparency' }
        ],
        ja: [
          { parameter: '輸入業者・ディストリビューター', offer: 'デジタルプラットフォーム＆D2C', demand: 'データ駆動型プラットフォームへのマージン流出', driver: '物流・フルフィルメントパートナーへ進化' },
          { parameter: '独立系整備工場', offer: 'EVの複雑化と特殊資格', demand: '高成長のEVサービス市場から排除', driver: '電池・モジュール修理に特化' },
          { parameter: '従来型ディーラー', offer: 'サブスク・オンライン販売', demand: '来店減少とショールーム陳腐化', driver: 'オンライン×オフライン併用ハイブリッド販売' },
          { parameter: 'アフターマーケット・スタートアップ', offer: 'アジャイルなテクノロジー参入', demand: '高い顧客獲得コスト', driver: 'コネクティビティ・診断のバリュープール獲得' },
          { parameter: '自動車Eコマース', offer: '2030年91.8億米ドル、CAGR +11.4%', demand: 'Alibaba／Amazon／eBayがASEAN参入', driver: '価格透明性による信頼ギャップの解消' }
        ]
      }
    },

    opportunities: {
      en: [
        'Predictive maintenance & telematics: AI battery heat-mapping and torque-load diagnostics in Asian ride-share fleets cut unscheduled maintenance by up to 37% — high-margin SaaS aftermarket layer.',
        'Wireless and semi-dynamic charging: sensorless WPT positioning reduces energy loss and addresses range anxiety for urban fleets, autonomous vehicles, and ride-share — combinable with 360° vehicle monitoring tech.',
        'Battery diagnostics & module-level repair: aging EV parc creates demand for cell/module replacement and second-life applications instead of full-pack recycling.',
        'OTA software-defined services: a rising share of aftermarket revenue migrates to subscription-based, software-delivered value (active-safety upgrades, drive-mode unlocks, remote diagnostics).',
        'Bonded warehouses & FTZs: position inventory close to customers under "China Plus One" without triggering import duties; cross-border trucking China–Vietnam–Thailand–Singapore stabilizes lead times.',
        'Lead-acid battery EFB/AGM upgrade cycle: ICE-fleet replacement demand of US$1.61 Bn (2025–2030) supports start-stop systems with up to 6% fuel-efficiency gain.'
      ],
      ja: [
        '予知保全・テレマティクス：アジアのライドシェア車両でAI電池ヒートマップ＋トルク負荷診断が計画外整備を最大-37%削減——高マージンSaaS型アフターマーケット層。',
        'ワイヤレス・準動的充電：センサーレスWPT位置決めがエネルギー損失を低減し、都市フリート・自律走行・ライドシェアの航続不安を解消——360度車両モニタリング技術と組み合わせ可能。',
        '電池診断・モジュール単位修理：EV車両の高齢化が、パック丸ごとリサイクルでなくセル／モジュール交換とセカンドライフ用途の需要を生成。',
        'OTAソフトウェア・デファインド・サービス：アフターマーケット収益のうち、アクティブセーフティ機能アップグレード、ドライブモード解放、遠隔診断などサブスク型ソフト配信の比率が拡大。',
        '保税倉庫・FTZ：「チャイナプラスワン」下で輸入関税発生前に顧客近傍に在庫配置、中国〜ベトナム〜タイ〜シンガポール越境陸送がリードタイムを安定化。',
        '鉛蓄電池EFB／AGMアップグレードサイクル：ICE車両向け2025〜2030年で16.1億米ドルの代替需要、アイドリングストップ対応で最大6%の燃費改善。'
      ]
    },

    risks: {
      en: [
        'Skilled-technician shortage: ASEAN service ecosystem lacks high-voltage certifications and diagnostic infrastructure — projected aftermarket growth will not convert into revenue without workforce build-out.',
        'Brand-prestige risk for new Chinese entrants: 58% of ASEAN consumers still cite quality and battery-safety concerns; failure to localize service may trigger a "1990s Chinese motorcycle" exit pattern.',
        'Resale-value depreciation for new EV brands suppresses financing penetration and slows fleet renewal; certified used-car programs become a pre-condition for sustained share.',
        'Petrochemical & feedstock disruption from Middle East / Hormuz volatility flows through to the aftermarket via plastic resin price spikes (already +30–40% in recent weeks).',
        'Margin compression for legacy OEMs: financing the powertrain transition while absorbing US tariff pressure is squeezing profitability — automotive suppliers remain stable but OEM spreads narrow.',
        'Indonesia macro headwinds: -7.2% TIV in 2025 under VAT, household debt, and price hikes outpacing wages — short-term aftermarket softness despite long-term battery hub thesis.'
      ],
      ja: [
        '熟練技術者不足：ASEANサービスエコシステムに高電圧資格と診断インフラが不足——人材育成なしには予測されたアフターマーケット成長は収益化しない。',
        '新興中国OEMの威信リスク：ASEAN消費者の58%が依然品質・電池安全性に懸念、現地化失敗は「1990年代中国バイク撤退」パターン再来の引き金。',
        '新興EVブランドの残価下落が割賦販売を抑制し車両刷新を遅延、認定中古車プログラムがシェア持続の前提条件に。',
        '中東・ホルムズの混乱に起因する石化原料ショックがアフターマーケットに波及、樹脂価格は既に+30〜40%。',
        'レガシーOEMのマージン圧迫：パワートレイン移行の資金負担と米国関税圧力で収益性が縮小——自動車サプライヤーは安定だがOEMスプレッドは狭まる。',
        'インドネシアのマクロ逆風：VAT・家計債務・賃金を上回る価格上昇で2025年TIV-7.2%——長期的な電池ハブ論にも関わらず短期的アフターマーケットは軟調。'
      ]
    },

    opinion: {
      title: { en: 'WaLens Analysis: Strategic Interpretation', ja: 'WaLensの分析：戦略的解釈' },
      intro: {
        en: "The following represents WaLens' independent analysis based on the facts presented above. These are interpretive observations, not objective data points.",
        ja: '以下は上記のファクトに基づくWaLensの独自分析です。これらは解釈的見解であり、客観的なデータポイントではありません。'
      },
      points: {
        en: [
          { title: 'The Aftermarket Is No Longer a Repair Business — It Is an Energy-Asset Business', content: 'The 10% CAGR headline obscures a fundamental category shift: the value migration is from "fixing what breaks" to "managing the battery as an energy asset across its lifecycle." Japanese executives who frame the aftermarket as a margin extension of new-car sales will misallocate capital; those who frame it as a recurring SaaS-plus-service energy-management business will capture the high-margin layer.' },
          { title: 'The Chinese OEM Win Is Conditional, Not Irreversible', content: 'The 4%→11% share gain is real, but 58% of ASEAN consumers still flag quality and battery-safety concerns. The decisive variable is after-sales density — BYD has ~3,000 dealers in China but only a fraction in any ASEAN country. If Chinese brands fail to build localized service depth in the next 24 months, the 1990s motorcycle-brand collapse pattern is a credible reversal scenario, opening defensive ground for Japanese incumbents.' },
          { title: 'Mid-Tier Distributors Are the Most Vulnerable Layer', content: 'D2C platforms and data-driven aftermarket marketplaces hollow out distributors that add only logistical cost without digital value or data insight. The defensible position is to evolve from "moving boxes" to "operating the customer data" — predictive-maintenance subscriptions, fleet uptime guarantees, and embedded-finance offerings.' },
          { title: '3–5 Years Is the Wrong Question for Charging & Diagnostics', content: 'For replacement parts, the 3–5 year wait is real. For charging infrastructure, telematics, and battery diagnostics, the revenue is starting now. The companies that win 2030 will be those that bridge "range anxiety" (infrastructure) and "resale anxiety" (battery health certification) before mass EV adoption forces commoditization.' }
        ],
        ja: [
          { title: 'アフターマーケットはもはや「修理業」ではなく「エネルギー資産事業」', content: '10%CAGRの見出しは根本的なカテゴリーシフトを隠蔽している——価値移動は「壊れたものの修理」から「ライフサイクル全体での電池というエネルギー資産の管理」へ。アフターマーケットを新車販売のマージン延長と位置付ける日系経営層は資本配分を誤る。SaaS＋サービス型エネルギー管理事業として再定義する企業が高マージン層を獲得する。' },
          { title: '中国OEMの勝利は条件付きであり不可逆ではない', content: '4%→11%のシェア拡大は事実だが、ASEAN消費者の58%が品質・電池安全性に懸念を抱える。決定変数はアフターサービス密度——BYDは中国で約3,000ディーラーを持つがASEAN各国では極僅か。今後24ヶ月で現地サービス網構築に失敗すれば、1990年代中国バイク撤退パターンの再来は現実的シナリオであり、日系既存勢力に防衛的余地が生まれる。' },
          { title: '最も脆弱なのは中間流通層', content: 'D2Cプラットフォームとデータ駆動型マーケットプレイスは、デジタル価値・データ洞察を提供せず物流コストのみ加算する流通業者を空洞化させる。防衛可能なポジションは「箱を運ぶ」から「顧客データを運用する」への進化——予知保全サブスク、フリート稼働保証、組込金融サービス。' },
          { title: '充電・診断には「3〜5年」は誤った問い', content: '交換部品では3〜5年待ちは事実。だが充電インフラ、テレマティクス、電池診断は既に収益化が始まっている。2030年に勝つ企業は、EV普及がコモディティ化を強制する前に、「航続不安」（インフラ）と「残価不安」（電池健全性証明）を橋渡しする企業である。' }
        ]
      }
    },

    recommendations: {
      en: [
        { title: 'Pivot the Aftermarket P&L from "Parts" to "Energy Asset Management"', content: 'Restructure aftermarket business units around battery-state-of-health certification, second-life packs, module-level repair, and OTA service contracts. Treat replacement-parts revenue as a declining base and SaaS-plus-service revenue as the growth engine. This is a board-level capital reallocation, not a workshop-level optimization.', priority: 'Immediate' },
        { title: 'Lock In High-Voltage Certification & Technician Capacity Now', content: 'The skilled-technician shortage is the single largest gating factor for converting projected 10% CAGR into actual revenue. Invest in EV-tech vocational partnerships in Thailand, Vietnam, and Indonesia within the next 12 months — late entrants will pay a structural wage premium and lose service-quality differentiation.', priority: 'Immediate' },
        { title: 'Defend Japanese ASEAN-6 Share via HEV Pivot + Service Depth + Certified Used-Car Programs', content: "The 68%→57% share erosion is reversible if Japanese OEMs lean into HEV (Toyota Yaris ATIV HEV is already #1 in Thailand monthly), build the densest after-sales footprint, and roll out certified used-car programs that stabilize residual values where Chinese new entrants are weakest.", priority: 'Immediate' },
        { title: 'Capture Connectivity & Diagnostics Before EV Mass Adoption Commoditizes Them', content: 'Wireless / semi-dynamic charging, AI battery heat-mapping, torque-load diagnostics, and 360° vehicle monitoring are monetisable today. Sign anchor contracts with ride-share operators and corporate fleets where uptime is valued above unit cost — these reference deployments compound into category leadership before mass EV adoption forces price compression.', priority: 'Mid-term' },
        { title: 'Reposition Distributors as Logistics & Fulfillment Partners with Embedded Data', content: 'Mid-tier distributors that add only logistical cost will be hollowed out by D2C platforms within this decade. Pivot the distribution arm to bonded-warehouse / FTZ operations with embedded telematics, predictive-maintenance triggering, and integrated CRM — turning logistics into an information business.', priority: 'Mid-term' },
        { title: 'Country Allocation: Thailand for EV Production, Vietnam for FDI Surge, Indonesia for Battery Hub', content: "Differentiate plays per country. Thailand: leverage BOI smart-manufacturing pivot and tyre/component scale. Vietnam: capture Decree 205/2025 50% CNC/robotics co-funding before localization rates lock in. Indonesia: anchor battery cell/precursor positions while nickel restrictions hold; manage short-term TIV softness as a buying opportunity.", priority: 'Strategic' },
        { title: 'Run Bonded Warehouse + Cross-Border Trucking + FTA Compliance as One Operating System', content: 'China Plus One is now permanent. Combine bonded warehouses, cross-border trucking (China–Vietnam–Thailand–Singapore), and dedicated ASEAN/RCEP/CPTPP trade-compliance teams into one resilient operating system; current FTA utilization is low and a measurable structural upside.', priority: 'Strategic' },
        { title: 'Bridge "Range Anxiety" and "Resale Anxiety" with a Single Data Platform', content: 'Build (or partner to build) a unified data layer that connects charging infrastructure, telematics, predictive maintenance, and battery-health certification. The company that owns this connective tissue between manufacturer, fleet, workshop, and used-car market becomes the de facto standard — and captures the 2030 economics rather than competing for them.', priority: 'Strategic' }
      ],
      ja: [
        { title: 'アフターマーケットP&Lを「部品」から「エネルギー資産管理」へ転換', content: '電池SoH証明、セカンドライフパック、モジュール単位修理、OTAサービス契約を軸にアフターマーケット事業を再構成。交換部品売上を逓減ベース、SaaS＋サービス売上を成長エンジンと位置付けよ。これは整備工場レベルの最適化ではなく取締役会レベルの資本再配分。', priority: '即座' },
        { title: '高電圧資格と技術者キャパシティを今ロックインせよ', content: '予測されたCAGR 10%を実収益に変換する最大のボトルネックは熟練技術者不足。タイ・ベトナム・インドネシアでEV技術職業訓練連携に12ヶ月以内に投資せよ——後発参入企業は構造的に賃金プレミアムを払い、サービス品質の差別化も失う。', priority: '即座' },
        { title: 'HEV転換＋サービス密度＋認定中古車で日系ASEAN-6シェアを防衛', content: '68%→57%のシェア低下はHEV注力（トヨタ・ヤリスATIV HEVは既にタイ月次首位）、最密のアフターサービス網構築、新興中国勢が最も弱い領域での認定中古車プログラムによる残価安定で反転可能。', priority: '即座' },
        { title: 'EV大衆化によるコモディティ化前にコネクティビティ・診断を獲得', content: 'ワイヤレス／準動的充電、AI電池ヒートマップ、トルク負荷診断、360度車両モニタリングは今日収益化可能。稼働率を単価以上に評価するライドシェア運営者・企業フリートとアンカー契約を締結せよ——参照導入実績がEV大衆化による価格圧縮前にカテゴリーリーダーシップに複利化する。', priority: '中期' },
        { title: '流通機能を「データ埋込型物流・フルフィルメントパートナー」へ再定義', content: '物流コストのみを加算する中間流通層は今後10年以内にD2Cプラットフォームに空洞化される。流通部門を保税倉庫／FTZ運用＋テレマティクス埋込＋予知保全トリガー＋統合CRMへ転換し、物流を情報ビジネスへ昇華せよ。', priority: '中期' },
        { title: '国別配分：タイ＝EV生産、ベトナム＝FDIラッシュ、インドネシア＝電池ハブ', content: '国別の打ち手を差別化せよ。タイ：BOIのスマート製造転換とタイヤ・部品スケールを活用。ベトナム：Decree 205/2025の50% CNC／ロボット共同投資を国産化率固定前に取り込め。インドネシア：ニッケル規制が継続する間に電池セル・前駆体ポジションを確保、短期TIV軟調は逆に買い場として処理。', priority: '戦略的' },
        { title: '保税倉庫＋越境陸送＋FTAコンプライアンスを単一OSとして運用', content: 'チャイナプラスワンは恒久化した。保税倉庫、越境陸送（中国〜ベトナム〜タイ〜シンガポール）、ASEAN／RCEP／CPTPP通商コンプライアンス専従チームを1つのレジリエント運営システムに統合せよ。現状FTA利用率は低く、計測可能な構造的上振れ余地。', priority: '戦略的' },
        { title: '「航続不安」と「残価不安」を単一データプラットフォームで橋渡し', content: '充電インフラ、テレマティクス、予知保全、電池SoH証明を接続する統合データレイヤーを構築（または提携で構築）せよ。メーカー・フリート・整備工場・中古車市場を結ぶこの結合組織を保有する企業がデファクト標準となり、2030年の経済を競争で得るのではなく所有する。', priority: '戦略的' }
      ]
    },

    industryImpact: {
      title: { en: 'Sector-Specific Impact Snapshot', ja: 'セクター別影響スナップショット' },
      data: [
        { sector: { en: 'Japanese OEMs (Toyota, Honda, Nissan, etc.)', ja: '日系OEM（トヨタ・ホンダ・日産など）' }, impact: { en: 'ASEAN-6 share 68%→57% (2023→2025); margin pressure from powertrain transition + US tariffs', ja: 'ASEAN-6シェア68%→57%（2023→2025）、パワートレイン移行＋米関税でマージン圧迫' }, action: { en: 'HEV pivot, deepen after-sales density, certified used-car programs, OTA service revenue layer', ja: 'HEV転換、アフターサービス密度強化、認定中古車プログラム、OTAサービス収益レイヤー追加' } },
        { sector: { en: 'Tier 1 / Tier 2 Suppliers', ja: 'Tier 1／Tier 2サプライヤー' }, impact: { en: 'Stable supplier profitability vs. squeezed OEM margins; electronics components fastest-growing (CAGR 5.59%)', ja: 'OEMマージン縮小に対しサプライヤー収益は安定、電子部品が最速成長（CAGR 5.59%）' }, action: { en: 'Reweight portfolio toward EV-power electronics, BMS, sensors; capture China Plus One FDI tailwind', ja: 'ポートフォリオをEVパワエレ・BMS・センサーへ再配分、チャイナプラスワンFDI追い風を獲得' } },
        { sector: { en: 'Aftermarket Distributors', ja: 'アフターマーケット流通' }, impact: { en: 'D2C, e-commerce ($9.18 Bn by 2030, +11.4% CAGR), and digital platforms hollow out mid-tier margin', ja: 'D2C・Eコマース（2030年91.8億米ドル、CAGR +11.4%）・デジタルプラットフォームが中間層マージンを侵食' }, action: { en: 'Evolve into bonded-warehouse / FTZ operators with embedded telematics & CRM', ja: 'テレマティクス・CRM埋込型の保税倉庫／FTZ運営者へ進化' } },
        { sector: { en: 'Independent Workshops', ja: '独立系整備工場' }, impact: { en: 'Excluded from EV service market without high-voltage certification', ja: '高電圧資格なしではEVサービス市場から排除' }, action: { en: 'Specialize in battery / module repair, second-life applications, EV diagnostics partnerships', ja: '電池・モジュール修理、セカンドライフ用途、EV診断提携に特化' } },
        { sector: { en: 'Battery & Energy Hubs', ja: '電池・エネルギーハブ' }, impact: { en: 'Indonesia anchors raw materials & cells; Thailand anchors assembly; Vietnam captures FDI surge', ja: 'インドネシアが原材料・セル、タイが組立、ベトナムがFDIラッシュを獲得' }, action: { en: 'Differentiate country plays; pre-position before localization rules harden', ja: '国別打ち手を差別化、国産化規定が固定化する前にポジション確保' } },
        { sector: { en: 'Charging Infra & Diagnostics', ja: '充電インフラ・診断' }, impact: { en: 'Revenue beginning now; wireless / semi-dynamic WPT, AI battery heat-mapping, telematics', ja: '既に収益化開始、ワイヤレス／準動的WPT、AI電池ヒートマップ、テレマティクス' }, action: { en: 'Sign anchor contracts with fleets / ride-share; bundle with 360° monitoring tech', ja: 'フリート・ライドシェアとアンカー契約、360度モニタリング技術とバンドル' } }
      ]
    },

    crossCutting: {
      title: { en: 'Cross-Cutting Strategic Themes', ja: '横断的戦略テーマ' },
      data: [
        { indicator: { en: 'From "Repair" to "Energy Asset Management"', ja: '「修理」から「エネルギー資産管理」へ' }, value: { en: 'Reframe the aftermarket P&L around battery SoH, second-life, OTA service contracts', ja: '電池SoH、セカンドライフ、OTAサービス契約を軸にアフターマーケットP&Lを再構築' } },
        { indicator: { en: 'Localization Density Decides the Chinese OEM Outcome', ja: 'ローカライズ密度が中国OEMの帰趨を決める' }, value: { en: '24-month window before "1990s motorcycle exit" pattern is reversible / locked in', ja: '今後24ヶ月が「1990年代バイク撤退」パターンの可逆／固定化を分ける' } },
        { indicator: { en: 'High-Voltage Certification Is the Workforce Bottleneck', ja: '高電圧資格が人材ボトルネック' }, value: { en: 'Without certified technicians, projected 10% CAGR will not convert into revenue', ja: '有資格技術者なしには予測されたCAGR 10%は収益に結実しない' } },
        { indicator: { en: 'Country Differentiation: TH / VN / ID Are Not Substitutes', ja: '国別差別化：タイ・ベトナム・インドネシアは代替ではない' }, value: { en: 'Thailand = production hub, Vietnam = FDI surge, Indonesia = battery hub — separate playbooks', ja: 'タイ＝生産ハブ、ベトナム＝FDIラッシュ、インドネシア＝電池ハブ——別個のプレイブックが必要' } },
        { indicator: { en: 'Data Ownership > Inventory Ownership', ja: 'データ保有 ＞ 在庫保有' }, value: { en: 'Predictive-maintenance and fleet-uptime data are the durable moat in 2030, not box-moving margin', ja: '予知保全・フリート稼働データが2030年の堅牢な堀、箱を動かすマージンではない' } }
      ]
    },

    sources: [
      'Coherent Market Insights — ASEAN Automotive Aftermarket Size and Forecast 2026–2033',
      'Industry Asia Pacific — Automotive: Electrification 2.0 and the Rise of SE Asia\'s EV Supply Chain',
      'Asian Insiders — Asia Market Entry Outlook 2026: Automotive Supply Chain Diversification',
      'Ken Research — Asia Pacific Automotive Aftermarket Market Trends to 2030',
      'PwC Malaysia — Overview of the ASEAN-6 Automotive Market (5th Snapshot)',
      'Geotab APAC — Is Southeast Asia Ready for the Electric Vehicle Evolution?',
      'Mordor Intelligence — Asia-Pacific Automotive Parts & Components Market Report',
      'Technavio — Southeast Asia Lead-Acid Battery Market Growth Analysis 2026–2030',
      'Fulcrum (ISEAS) — Chinese EVs in Southeast Asia: More Sustainable Approach Needed',
      'JATO Dynamics — Driving Change: Opportunities & Barriers for Chinese Automakers in SE Asia',
      'Arthur D. Little — Chinese Electric Vehicles: Drag or Driver for Global Markets?',
      'Beacon Venture Capital — Accelerating EV Adoption in Southeast Asia',
      'ReAnIn — Guaranteed Auto Protection (GAP) Insurance Market Insights',
      'PwC US — Automotive Industry Outlook 2026',
      'Source of Asia — ASEAN\'s Role in Global Supply Chain Rebalancing (2026)',
      'Thai Board of Investment (BOI) — 2025 FDI Application Statistics',
      'Continental Tyres — Rayong Plant Expansion Disclosures',
      'DEPT Agency — Disruption, Data & D2C: Automotive Industry Digital Trends',
      'Deloitte SE Asia — Global Automotive Consumer Study',
      'EY Indonesia — EV Sales Expected to See Sharp Growth Across ASEAN',
      'IEEE Xplore / ResearchGate — Sensorless Automatic Stop Control of EV in Semi-dynamic Wireless Charging Systems',
      'Wireless Power Week 2020 — IEEE Xplore Proceedings'
    ]
  };

  return (
    <>
      <SEO
        title={isJapanese
          ? '東南アジア自動車アフターマーケットの構造転換：成長ドライバー、ディスラプター、サプライチェーン再編 | WaLens'
          : "Strategic Transformation of Southeast Asia's Automotive Aftermarket | WaLens"
        }
        description={isJapanese
          ? 'ASEANアフターマーケットCAGR 10%、中国OEM台頭、チャイナプラスワン転換、EV診断・ワイヤレス充電・予知保全。日系経営層への戦略提言。'
          : 'ASEAN aftermarket 10% CAGR, Chinese OEM disruption, China Plus One pivot, EV diagnostics, wireless charging, predictive maintenance — strategic recommendations for Japanese executives.'
        }
        canonicalPath="/insights/manufacturing/sea-automotive-aftermarket-2026"
      />
      <div className="min-h-screen bg-background">
        <Header />

        <section className="relative w-full h-[340px] md:h-[420px] flex items-end overflow-hidden">
          <img src={heroImage} alt="Southeast Asia Automotive Aftermarket Strategic Transformation" className="absolute inset-0 w-full h-full object-cover z-0" />
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
                  url: `/insights/manufacturing/${slug}`,
                  category: 'Manufacturing'
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
            { label: isJapanese ? '製造業' : 'Manufacturing', href: '/insights?filter=manufacturing' },
            { label: isJapanese ? 'SEA自動車アフターマーケット' : 'SEA Automotive Aftermarket' }
          ]} />

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

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  {content.marketGrowth.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '指標' : 'Indicator'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '数値' : 'Value'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '変化' : 'Change'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '主因' : 'Driver'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.marketGrowth.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
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

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-amber-500" />
                  {content.countryMarket.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '国' : 'Country'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '指標' : 'Value'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '戦略的含意' : 'Implication'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.countryMarket.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
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

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  {content.chineseOEM.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.chineseOEM.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                    <div key={idx} className="border-l-2 border-blue-500/30 pl-4">
                      <h4 className="font-semibold text-sm mb-1" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.factor}</h4>
                      <p className="text-sm text-muted-foreground mb-1" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}><span className="font-medium text-foreground">{isJapanese ? '影響：' : 'Impact: '}</span>{row.impact}</p>
                      <p className="text-sm text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}><span className="font-medium text-foreground">{isJapanese ? '対応：' : 'Response: '}</span>{row.mitigation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-emerald-500" />
                  {content.valuePool.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'セグメント' : 'Segment'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '推定額' : 'Estimated Value'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '地域リード' : 'Regional Lead'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.valuePool.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
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

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Truck className="h-5 w-5 text-amber-600" />
                  {content.distributionShift.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'プレイヤー' : 'Actor'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '破壊源' : 'Disruption'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'リスク' : 'Risk'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '機会' : 'Opportunity'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.distributionShift.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
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

export default SEAAutomotiveAftermarket;
