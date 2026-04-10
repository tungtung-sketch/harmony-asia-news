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
  Home,
  Building2
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const RealEstateMarket = () => {
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
        'real-estate-market',
        isJapanese ? 'タイ不動産市場2026レポート' : 'Thailand Real Estate Market 2026 Report',
        'real-estate',
        lang
      );
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker('real-estate-market', 'Thailand Real Estate Market 2026 Report', 'タイ不動産市場2026レポート', 'Real Estate', hasFullAccess);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(
        'real-estate-market',
        isJapanese ? 'タイ不動産市場2026レポート' : 'Thailand Real Estate Market 2026 Report',
        'real-estate',
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
      ja: "タイ不動産市場2026：構造変化と日本企業の勝ち筋",
      en: "Thailand Real Estate Market 2026: Structural Shifts & Winning Strategies for Japanese Companies"
    },
    subheadline: {
      ja: "「ハコ売り」から「運営・機能」への転換——二極化市場で日本品質が差別化を生む",
      en: "From 'box-selling' to 'operations & functionality' — Japanese quality creates differentiation in a two-speed market"
    },
    category: {
      en: "Real Estate / Property Development",
      ja: "不動産 / プロパティ開発"
    },
    lastUpdated: "2026-02-08",
    executiveSummary: {
      ja: [
        "2026年のタイ不動産市場は「二極化（Two-Speed Market）」の様相を呈している。家計債務増大（GDP比90%超）によりマスマーケット向けコンドミニアムは深刻な在庫調整局面にある一方、産業用不動産（EEC・データセンター）、超富裕層向け住宅、ウェルネス・レジデンスが堅調に成長。(Doc: エグゼクティブサマリー)[⁷]",
        "日系デベロッパーとのJV物件は「日本品質（J-Quality）」の代名詞として、周辺相場より高いプレミアムでも成約率が高い。三菱地所、三井不動産、阪急阪神不動産、東急不動産が「Geo fit+」「スマートシティ技術」で明確な差別化に成功。(Doc: 1.1 市場の二極化)[¹]",
        "産業用不動産は活況：EEC（チョンブリ、ラヨーン、チャチュンサオ）へのEV・電子部品投資が集中し、データセンター建設ラッシュが新たなトレンドとして出現。(Doc: 第2章 産業用不動産)[⁹]",
        "オフィス市場は「ワン・バンコク」等の大量供給で借り手市場化。しかしLEED・WELL認証「グリーンビルディング」への需要は堅調——ESG非対応の築古ビルからの「Flight to Quality」が進行。(Doc: 第3章 オフィス市場)",
        "外国人の99年借地権法案は「事実上の凍結・先送り」状態。現行法通り、コンドミニアム49%所有または30年リースホールドでの事業計画が現実的。(Doc: 4.1 99年借地権)"
      ],
      en: [
        "Thailand's 2026 real estate market exhibits a 'Two-Speed Market' dynamic. Mass-market condominiums face severe inventory adjustments amid rising household debt (>90% of GDP), while industrial real estate (EEC & data centers), ultra-luxury housing, and wellness residences show robust growth. (Doc: Executive Summary)[⁷]",
        "JV properties with Japanese developers command a 'J-Quality' premium: higher closing rates despite above-market pricing. Mitsubishi Estate, Mitsui Fudosan, Hankyu Hanshin Properties, and Tokyu Fudosan differentiate through 'Geo fit+' and smart city technology. (Doc: Section 1.1)[¹]",
        "Industrial real estate is booming: EV and electronics component investments concentrate in the EEC (Chonburi, Rayong, Chachoengsao), with a data center construction rush emerging as the new trend. (Doc: Chapter 2)[⁹]",
        "Office market is becoming a tenant's market due to massive supply from projects like 'One Bangkok'. However, demand for LEED/WELL-certified 'green buildings' remains firm—'Flight to Quality' away from non-ESG compliant older buildings. (Doc: Chapter 3)",
        "The proposed 99-year leasehold law for foreigners is effectively frozen. Business planning should assume the current framework: 49% condominium ownership or 30-year leasehold (+renewal option). (Doc: Section 4.1)"
      ]
    },
    marketStructure: {
      title: { en: "Real Estate Sector Overview", ja: "不動産セクター概観" },
      segments: {
        ja: [
          { name: "マスマーケット住宅", share: "停滞", growth: "ローン拒否率70%", players: "ローカルデベロッパー" },
          { name: "ラグジュアリー住宅", share: "堅調", growth: "利回り4-6%（バンコク都心）", players: "日系JV、中国・ロシア富裕層" },
          { name: "産業用不動産（EEC）", share: "活況", growth: "EV・電子部品投資集中", players: "WHA, Frasers, BYD, 村田製作所" },
          { name: "データセンター", share: "急成長", growth: "Google, Microsoft大型投資", players: "テック大手、電力インフラ" },
          { name: "オフィス（CBD）", share: "供給過剰", growth: "空室率上昇", players: "One Bangkok, 築古ビルリノベ" },
          { name: "ウェルネス・レジデンス", share: "新興", growth: "高齢化＋医療近接型", players: "Origin × サミティヴェート" }
        ],
        en: [
          { name: "Mass-Market Housing", share: "Stagnant", growth: "Loan rejection rate 70%", players: "Local developers" },
          { name: "Luxury Housing", share: "Firm", growth: "Yield 4-6% (Bangkok CBD)", players: "Japanese JVs, Chinese/Russian HNWI" },
          { name: "Industrial (EEC)", share: "Booming", growth: "EV & electronics investment", players: "WHA, Frasers, BYD, Murata" },
          { name: "Data Centers", share: "Rapid growth", growth: "Google, Microsoft mega-investments", players: "Tech giants, power infra" },
          { name: "Office (CBD)", share: "Oversupplied", growth: "Vacancy rising", players: "One Bangkok, retrofit demand" },
          { name: "Wellness Residences", share: "Emerging", growth: "Aging + medical proximity", players: "Origin × Samitivej" }
        ]
      }
    },
    keyPlayers: {
      title: { en: "Key Japanese Players & Partners", ja: "主要日系プレイヤーとパートナー" },
      data: {
        ja: [
          { segment: "阪急阪神不動産 × SENA", examples: "「Geo fit+」ローカライズ、製品開発プロセス輸出", status: "機能性差別化" },
          { segment: "Origin × 野村不動産 × サミティヴェート", examples: "遠隔医療・健康モニタリング付きWellness Residences", status: "医療近接型" },
          { segment: "Panasonic × SENA × チュラロンコン大学", examples: "「ZENモデル」IoT住宅、PM2.5・暑熱対策", status: "環境ソリューション" },
          { segment: "三菱地所・三井不動産", examples: "高付加価値物流施設（AS/RS・コールドチェーン）", status: "産業用不動産" },
          { segment: "東急コミュニティー", examples: "ASEAN横展開の不動産管理拠点", status: "ストック事業" },
          { segment: "SOMPOケア・リエイ", examples: "シニアリビング（ハード＋介護サービスパッケージ）", status: "高齢者ケア" }
        ],
        en: [
          { segment: "Hankyu Hanshin × SENA", examples: "'Geo fit+' localization, product dev process export", status: "Functional differentiation" },
          { segment: "Origin × Nomura RE × Samitivej", examples: "Wellness Residences with telemedicine & health monitoring", status: "Medical proximity" },
          { segment: "Panasonic × SENA × Chula Univ.", examples: "'ZEN Model' IoT housing, PM2.5 & heat solutions", status: "Environmental solutions" },
          { segment: "Mitsubishi Estate / Mitsui Fudosan", examples: "High-value logistics (AS/RS, cold chain)", status: "Industrial real estate" },
          { segment: "Tokyu Community", examples: "ASEAN property management hub", status: "Stock business" },
          { segment: "SOMPO Care / Riei", examples: "Senior living (hardware + care service packages)", status: "Elderly care" }
        ]
      }
    },
    policyInsights: {
      title: { en: "Policy & Regulation", ja: "政策・規制" },
      items: {
        ja: [
          { policy: "99年借地権法案", content: "一部で報道された外国人借地権を30年から99年に延長する法案は、世論の「国を売るのか」という反発により事実上の凍結・先送り状態。現行法通り、コンドミニアム49%所有または30年リースホールド（+更新オプション）で事業計画を立てるのが現実的。「99年保証」を謳う販売業者には警戒が必要。(Doc: 4.1 99年借地権)", citation: "タイ現地法制度・報道" },
          { policy: "LTRビザ制度", content: "「長期居住者（LTR）ビザ」制度が富裕層や高度専門職を誘致するドライバーとして機能開始。投資用だけでなく「実際に住む」ためのハイエンド物件需要を底支え。(Doc: 4.2 LTRビザ)", citation: "タイ投資委員会（BOI）" },
          { policy: "ESG・グリーンビルディング規制", content: "多国籍企業が本社ESG要請によりLEED・WELL認証ビルへの移転を加速。ESG非対応の築古ビルはテナント流出リスクに晒されている。既存ビルの省エネ改修（レトロフィット）需要が急増。(Doc: 3.2 グリーンビルディング)", citation: "バンコクオフィス市場動向" },
          { policy: "EEC特別優遇", content: "EECエリア（チョンブリ、ラヨーン、チャチュンサオ）への産業投資が集中。BYD・長城汽車のEV工場稼働、村田製作所・ソニーセミコンダクタの電子部品投資拡大。Google・Microsoftのデータセンター投資も加速。(Doc: 2.1 EECの再加速)", citation: "EEC事務局・Google Cloud" }
        ],
        en: [
          { policy: "99-Year Leasehold Bill", content: "The proposed extension of foreign leasehold rights from 30 to 99 years is effectively frozen due to public backlash ('selling the country'). Business plans should assume current law: 49% condo ownership or 30-year leasehold (+renewal option). Beware of sellers claiming '99-year guarantee'. (Doc: Section 4.1)", citation: "Thai legal framework & media reports" },
          { policy: "LTR Visa Program", content: "The Long-Term Resident (LTR) Visa is functioning as a driver for attracting wealthy individuals and professionals. Supporting demand for high-end properties not just as investments but as actual residences. (Doc: Section 4.2)", citation: "Thailand Board of Investment (BOI)" },
          { policy: "ESG & Green Building Regulations", content: "MNCs are accelerating moves to LEED/WELL-certified buildings driven by HQ ESG mandates. Non-ESG-compliant older buildings face tenant outflow risk. Retrofit demand is surging. (Doc: Section 3.2)", citation: "Bangkok office market trends" },
          { policy: "EEC Special Incentives", content: "Industrial investment concentrating in EEC zones (Chonburi, Rayong, Chachoengsao). BYD/GWM EV factories operational, Murata/Sony Semiconductor expanding. Google and Microsoft data center investments accelerating. (Doc: Section 2.1)", citation: "EEC Office; Google Cloud" }
        ]
      }
    },
    opportunities: {
      ja: [
        "「住まいのOS」提供：空気質管理（IAQ）、省エネ断熱、高齢者見守りシステムなど、住宅に機能を実装する技術提供者としての参入 (Doc: 1.3 日本企業への示唆)",
        "高付加価値物流施設：自動化（AS/RS）・定温管理（コールドチェーン）対応の次世代物流施設開発・運営 (Doc: 2.3 日本企業への示唆)",
        "グリーン工場建設：太陽光パネル・省エネ設計（LEED認証）など、Scope 3対応の環境建築技術 (Doc: 2.3 グリーン工場)",
        "既存ビルのレトロフィット：省エネ改修、スマートビル化、LIXIL等の衛生陶器リフォームによる資産価値向上 (Doc: 3.2 リノベーション需要)",
        "ASEAN不動産管理ハブ：タイで培った管理ノウハウをベトナム・インドネシアへ横展開 (Doc: 提言1)",
        "シニアリビング：日本の介護事業者と連携したハード＋ソフトパッケージ (Doc: 提言2)"
      ],
      en: [
        "'Housing OS' provision: Entry as technology provider implementing IAQ, energy-efficient insulation, elderly monitoring systems into residences (Doc: Section 1.3)",
        "High-value logistics facilities: Next-gen warehouse development with automation (AS/RS) and temperature control (cold chain) (Doc: Section 2.3)",
        "Green factory construction: Solar panels, energy-efficient design (LEED certification) for Scope 3 compliance (Doc: Section 2.3)",
        "Building retrofit: Energy-saving renovation, smart building conversion, LIXIL-type sanitary refurbishment for asset value enhancement (Doc: Section 3.2)",
        "ASEAN property management hub: Expand Thai-developed management knowhow to Vietnam & Indonesia (Doc: Recommendation 1)",
        "Senior living: Hardware + care service packages with Japanese elderly care operators (Doc: Recommendation 2)"
      ]
    },
    risks: {
      ja: [
        "マスマーケット在庫リスク：300万バーツ以下の物件は住宅ローン拒否率70%、販売が極めて困難 (Doc: 1.1 市場の二極化)",
        "オフィス供給ショック：ワン・バンコク等の相次ぐ竣工で空室率上昇、賃料下落圧力 (Doc: 3.1 ワン・バンコク)",
        "中国系デベロッパーの価格競争：中国系が価格競争力を武器に台頭、日系のプレミアムポジション維持が課題 (Doc: エグゼクティブサマリー)",
        "99年借地権の不確実性：法案は凍結中だが将来の政治動向次第で再浮上リスク (Doc: 4.1 99年借地権)",
        "家計債務の構造的圧力：GDP比90%超の家計債務が中間層の購買力を長期的に抑制 (Doc: エグゼクティブサマリー)"
      ],
      en: [
        "Mass-market inventory risk: Properties under ฿3M face 70% loan rejection rates, sales extremely difficult (Doc: Section 1.1)",
        "Office supply shock: Sequential completions of projects like One Bangkok driving vacancy up and rent pressure down (Doc: Section 3.1)",
        "Chinese developer price competition: Chinese firms competing on price, challenging Japanese premium positioning (Doc: Executive Summary)",
        "99-year leasehold uncertainty: Bill is frozen but may resurface depending on political dynamics (Doc: Section 4.1)",
        "Structural household debt pressure: Household debt >90% of GDP suppressing middle-class purchasing power long-term (Doc: Executive Summary)"
      ]
    },
    opinion: {
      title: { en: "WaLens Analysis: Structural Interpretation", ja: "WaLensの分析：構造的解釈" },
      intro: {
        en: "The following represents WaLens' independent analysis based on the facts presented above. These are interpretive observations, not objective data points.",
        ja: "以下は上記のファクトに基づくWaLensの独自分析です。これらは解釈的な見解であり、客観的なデータポイントではありません。"
      },
      points: {
        ja: [
          {
            title: "「ハコ売り」の終焉——「住まいのOS」提供者に転換せよ",
            content: "タイ不動産市場の最も重要な構造変化は、単なる高級化ではなく「具体的な生活課題を解決する機能が売れる時代」への移行である。阪急阪神不動産の「Geo fit+」、PanasonicのZENモデル、Originのウェルネス・レジデンスは、いずれも「空間を売る」のではなく「生活の質を売る」モデルに転換している。日本企業の真の競争優位は建築品質だけでなく、空気質管理、省エネ、高齢者見守りといった「住まいのオペレーティングシステム」を提供できることにある。(Doc: 1.2 成功事例)"
          },
          {
            title: "産業用不動産こそ「見えない勝ち筋」",
            content: "メディアの注目は住宅市場に集中するが、日本企業にとっての最大の成長機会は産業用不動産にある。EEC地区へのEV・電子部品投資の集中、データセンター建設ラッシュ、そしてサプライチェーン全体のScope 3脱炭素要求——これらが交差するポイントで、日本の環境建築技術とスマートファクトリーノウハウは圧倒的な差別化要因となる。(Doc: 第2章 産業用不動産)"
          },
          {
            title: "「建てて終わり」から「運営で稼ぐ」への移行が不可逆的",
            content: "開発利益の一回性に依存するモデルから、不動産管理・シニアリビング・サービスアパートメントなどの反復収益モデルへの転換は、タイ市場固有のトレンドではなく、東南アジア全体の構造変化である。東急コミュニティーの管理ノウハウASEAN横展開モデルは、この潮流の先駆的事例であり、他の日系企業も参考にすべきである。(Doc: 提言1・提言2)"
          },
          {
            title: "ESGは「義務」ではなく「差別化の武器」",
            content: "MNCのESG要請によるグリーンビルディングへの「Flight to Quality」は、日本企業にとってコスト負担ではなく競争優位の源泉である。省エネ改修、LEED認証取得支援、スマートビル化——これらは日本企業が技術的に最も強い領域であり、築古ビルのリノベーション市場は未開拓かつ急拡大中の巨大市場である。(Doc: 3.2 グリーンビルディング)"
          }
        ],
        en: [
          {
            title: "The End of 'Box-Selling' — Become a 'Housing OS' Provider",
            content: "The most important structural shift in Thailand's real estate market is not mere premiumization, but the transition to an era where 'functionality that solves specific lifestyle problems' sells. Hankyu Hanshin's 'Geo fit+', Panasonic's ZEN Model, and Origin's Wellness Residences all represent a shift from 'selling space' to 'selling quality of life'. Japanese companies' true competitive advantage lies not just in construction quality, but in providing the 'operating system of housing'—IAQ management, energy efficiency, and elderly monitoring systems. (Doc: Section 1.2)"
          },
          {
            title: "Industrial Real Estate Is the 'Hidden Winning Play'",
            content: "While media attention focuses on the residential market, the biggest growth opportunity for Japanese companies is in industrial real estate. The concentration of EV and electronics investments in the EEC, the data center construction rush, and Scope 3 decarbonization requirements across supply chains—at the intersection of these forces, Japanese environmental construction technology and smart factory knowhow become overwhelming differentiators. (Doc: Chapter 2)"
          },
          {
            title: "The Shift from 'Build and Leave' to 'Earn from Operations' Is Irreversible",
            content: "The transition from one-time development profits to recurring revenue models—property management, senior living, serviced apartments—is not a Thailand-specific trend but a structural change across Southeast Asia. Tokyu Community's ASEAN expansion of management knowhow is a pioneering example that other Japanese companies should study. (Doc: Recommendations 1 & 2)"
          },
          {
            title: "ESG Is a 'Differentiation Weapon', Not an 'Obligation'",
            content: "The MNC-driven 'Flight to Quality' toward green buildings is not a cost burden for Japanese companies but a source of competitive advantage. Energy-saving retrofits, LEED certification support, and smart building conversion—these are the areas where Japanese companies have the strongest technical capabilities, and the older building renovation market is untapped yet rapidly expanding. (Doc: Section 3.2)"
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
        ja: `提言1：ASEANの「不動産マネジメント・ハブ」としてタイを活用すること。タイ市場単体での開発利益だけでなく、バンコクを「ASEAN地域の不動産管理拠点」とする戦略を推奨する。東急コミュニティーや三菱地所コミュニティなどは、タイで培った管理ノウハウ（清掃、修繕積立金管理、警備）を、ベトナムやインドネシアへ横展開する動きを見せている。タイはASEANの中で最も都市化が進んでおり、管理ビジネスの実験場として最適である。(Doc: 提言1)[¹⁰]

提言2：「建設」から「運営（Operation）」へバリューチェーンを延伸すること。「建物を建てて終わり」ではなく、その後の運営に関与することで収益を安定させる。高齢者ケアでは、日本の介護事業者（SOMPOケア、リエイなど）と連携し、ハード（施設）とソフト（介護サービス）をパッケージ化した「シニアリビング」を展開する。サービスアパートメントは、出張者・駐在員向けで収益ボラティリティが低く、日本企業の運営ノウハウ（おもてなし）が生きる領域である。(Doc: 提言2)

提言3：現地パートナーとの「対等な共創」を実現すること。法規制（土地所有不可）の壁を超えるためだけでなく、複雑化する許認可や地域住民対応において、現地大手（Central, CP, TCC, Origin, Sena等）とのJVは必須である。日本側は「資金」だけでなく、「脱炭素技術（省エネ）」「高齢化対応（ユニバーサルデザイン）」「スマートホーム技術」というタイのデベロッパーが喉から手が出るほど欲しい「ソリューション」を交渉材料とすることで、有利な条件での提携が可能となる。(Doc: 提言3)

補足：マスマーケット住宅への新規参入は回避すること。300万バーツ以下のセグメントはローン拒否率70%に達し、中国系デベロッパーとの価格競争は日系の強みを活かせない。投下資本は「ラグジュアリー＋機能性」「産業用不動産」「ストック事業」の3軸に集中すべきである。(Doc: 1.1 / エグゼクティブサマリー)`,
        en: `Recommendation 1: Leverage Thailand as an 'ASEAN Property Management Hub.' Beyond development profits in the Thai market alone, we recommend a strategy positioning Bangkok as the 'ASEAN regional property management base.' Tokyu Community and Mitsubishi Jisho Community are already expanding Thai-developed management knowhow (cleaning, sinking fund management, security) to Vietnam and Indonesia. Thailand is the most urbanized country in ASEAN and the ideal testing ground for management businesses. (Doc: Recommendation 1)[¹⁰]

Recommendation 2: Extend the value chain from 'construction' to 'operations.' Stabilize revenues by engaging in post-construction operations rather than 'build and leave.' For elderly care, partner with Japanese care operators (SOMPO Care, Riei, etc.) to deploy 'Senior Living' that packages hardware (facilities) with software (care services). Serviced apartments targeting business travelers and expatriates offer lower revenue volatility and leverage Japanese hospitality (omotenashi) expertise. (Doc: Recommendation 2)

Recommendation 3: Achieve 'equal co-creation' with local partners. JVs with major local players (Central, CP, TCC, Origin, Sena, etc.) are essential not only to overcome legal barriers (no land ownership) but also for increasingly complex permits and community relations. Japanese companies should use 'decarbonization technology,' 'aging-society solutions (universal design),' and 'smart home technology'—solutions Thai developers desperately want—as negotiation leverage for favorable partnership terms. (Doc: Recommendation 3)

Note: Avoid new entry into mass-market housing. The sub-฿3M segment faces 70% loan rejection rates, and price competition with Chinese developers doesn't play to Japanese strengths. Capital deployment should focus on three axes: 'luxury + functionality,' 'industrial real estate,' and 'stock business (operations).' (Doc: Section 1.1 / Executive Summary)`
      }
    },
    dataAppendix: {
      title: { en: "Data Appendix", ja: "データ付録" },
      tables: {
        yieldEstimate: {
          title: { en: "Estimated Rental Yields by Area (2025-2026)", ja: "主要エリア別・想定利回り（2025-2026）" },
          data: [
            { area: isJapanese ? "スクンビット (Asoke-Thonglor)" : "Sukhumvit (Asoke-Thonglor)", type: isJapanese ? "高級コンドミニアム" : "Luxury Condo", yield: "4.0% - 5.0%", notes: isJapanese ? "日本人・欧米駐在員向け。安定しているが競合多。" : "Japanese/Western expats. Stable but competitive." },
            { area: isJapanese ? "シーロム・サトーン (CBD)" : "Silom-Sathorn (CBD)", type: isJapanese ? "高級コンドミニアム" : "Luxury Condo", yield: "3.8% - 4.8%", notes: isJapanese ? "金融街勤務者向け。供給限定的で底堅い。" : "Financial district workers. Limited supply, resilient." },
            { area: isJapanese ? "バンナー (Bang Na)" : "Bang Na", type: isJapanese ? "中級コンド・戸建" : "Mid-range Condo/House", yield: "5.0% - 6.0%", notes: isJapanese ? "インター校が多く、ファミリー層・EEC通勤者に人気。" : "International schools, popular with families & EEC commuters." },
            { area: isJapanese ? "パタヤ・チョンブリ (EEC)" : "Pattaya-Chonburi (EEC)", type: isJapanese ? "サービスアパート" : "Serviced Apartment", yield: "6.0% - 7.0%", notes: isJapanese ? "工業団地勤務のエンジニア、長期滞在観光客向け。" : "Industrial park engineers, long-stay tourists." }
          ]
        }
      }
    },
    sources: {
      title: { en: "Sources & Methodology", ja: "出典・方法論" },
      list: {
        ja: [
          "阪急阪神不動産 — タイ14号プロジェクト（コンドミニアム）プレスリリース[¹]",
          "Krungsri Research — タイ産業見通し2025-2027: 不動産セクター[²]",
          "サミティヴェート病院 × Origin Property — ウェルネスレジデンス発表[³]",
          "Nation Thailand — 外国人投資によるタイ不動産開発[⁴]",
          "日本経済新聞 / Nippon.com — 日本企業の海外介護事業展開[⁵]",
          "TIME Magazine — SOMPOホールディングス・高齢者ケア特集[⁶]",
          "Global Wellness Institute — タイのウェルネス経済レポート2025[⁷]",
          "AZEC — Panasonic × SENA ZENモデル現地視察レポート[⁸]",
          "Google Cloud — タイ新クラウドリージョン開設プレスリリース[⁹]",
          "Saha Tokyu Corporation — タイ不動産管理事業[¹⁰]",
          "WaLensフィールドリサーチ — 経営幹部インタビュー・現地視察（2026年Q1）"
        ],
        en: [
          "Hankyu Hanshin Properties — 14th Thailand Project (Condominium) Press Release[¹]",
          "Krungsri Research — Thailand Industry Outlook 2025-2027: Real Estate[²]",
          "Samitivej Hospital × Origin Property — Wellness Residences Announcement[³]",
          "Nation Thailand — Foreign Investment in Thai Property Development[⁴]",
          "Nippon.com — Japanese Businesses Expand Elderly Care Abroad[⁵]",
          "TIME Magazine — SOMPO Holdings Elderly Care Feature[⁶]",
          "Global Wellness Institute — Thailand Wellness Economy Report 2025[⁷]",
          "AZEC — Panasonic × SENA ZEN Model Site Visit Report[⁸]",
          "Google Cloud — New Thailand Cloud Region Press Release[⁹]",
          "Saha Tokyu Corporation — Thailand Property Management[¹⁰]",
          "WaLens Field Research — Executive Interviews & Site Visits (Q1 2026)"
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
        title={isJapanese ? "タイ不動産市場2026レポート | WaLens" : "Thailand Real Estate Market 2026 Report | WaLens"}
        description={isJapanese 
          ? "タイ不動産市場の構造変化と日本企業の勝ち筋。住宅・産業用・オフィスの3セクター分析と戦略的提言。"
          : "Structural shifts in Thailand's real estate market and winning strategies for Japanese companies. Analysis across residential, industrial, and office sectors."
        }
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6 md:py-12 max-w-4xl">
          <div className="mb-6">
            <Breadcrumb 
              items={[
                { label: isJapanese ? "インサイト" : "Insights", href: "/insights" },
                { label: isJapanese ? "不動産" : "Real Estate", href: "/insights/real-estate" },
                { label: isJapanese ? "市場2026" : "Market 2026" }
              ]}
            />
          </div>

          {/* Hero Section */}
          <section className="mb-8 md:mb-12">
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img 
                src={heroImage} 
                alt={isJapanese ? "タイ不動産市場" : "Thailand Real Estate Market"}
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
                  {isJapanese ? "読了時間：10分" : "10 min read"}
                </span>
              </div>
              <BookmarkButton article={{ slug: 'real-estate-market', title: isJapanese ? 'タイ不動産市場2026レポート' : 'Thailand Real Estate Market 2026 Report', language: lang === 'ja' ? 'JP' : 'EN', url: '/insights/reports/real-estate-market', category: 'Real Estate' }} variant="button" />
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
                      <Home className="h-5 w-5" />
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
                      <Building2 className="h-5 w-5" />
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
                        {isJapanese ? content.dataAppendix.tables.yieldEstimate.title.ja : content.dataAppendix.tables.yieldEstimate.title.en}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2 font-semibold">{isJapanese ? "エリア" : "Area"}</th>
                              <th className="text-left p-2 font-semibold">{isJapanese ? "物件タイプ" : "Property Type"}</th>
                              <th className="text-left p-2 font-semibold">{isJapanese ? "想定利回り" : "Est. Yield"}</th>
                              <th className="text-left p-2 font-semibold">{isJapanese ? "特徴" : "Notes"}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {content.dataAppendix.tables.yieldEstimate.data.map((row, i) => (
                              <tr key={i} className="border-b last:border-0">
                                <td className="p-2 font-medium">{row.area}</td>
                                <td className="p-2">{row.type}</td>
                                <td className="p-2 font-bold">{row.yield}</td>
                                <td className="p-2 text-muted-foreground">{row.notes}</td>
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

export default RealEstateMarket;
