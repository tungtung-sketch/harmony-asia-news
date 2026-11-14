import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
  FileText, TrendingUp, AlertTriangle, CheckCircle, BookOpen, Lock, Lightbulb, Eye,
  ChevronRight, Crown, Database, Sparkles, Globe, Factory, Clock, Calculator, Info, Target
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-sea-automotive-aftermarket.jpg';

// JP translation drafted by Claude — to be reviewed before marketing push

type Bi<T> = { en: T; ja: T };
type Urgency = 'High' | 'Medium' | 'Low';

const ThailandAutoHubJapanMission2026 = () => {
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

  const slug = 'thailand-auto-hub-japan-mission-2026';
  const titleEn = "Thailand's Auto Hub at a Crossroads: What Japanese Executives Should Know Before the Tokyo Mission";
  const titleJa = 'タイ自動車ハブの分岐点：日本ミッション前に日系企業が押さえるべき論点';
  const publishedDate = '2026-11-14';
  const canonicalPath = '/insights/economic-policy/thailand-auto-hub-japan-mission-2026';
  const canonicalUrl = `https://walensnews.com${canonicalPath}`;

  const metaDescEn = 'Thailand will tax fully imported EVs at 35% from 1 January 2027 and is drafting a "Made in Thailand" local-content ladder. What Japanese automakers and suppliers should secure before the 18–20 November Tokyo mission.';
  const metaDescJa = 'タイは2027年1月1日から完成車輸入EVに35%の物品税を課し、「メイド・イン・タイランド」現地調達基準を策定中。11月18〜20日の訪日ミッションを前に、日系自動車メーカーとサプライヤーが確保すべき論点を解説。';

  useEffect(() => {
    if (hasFullAccess && !hasLoggedView) {
      logView(slug, isJapanese ? titleJa : titleEn, 'economic-policy', lang);
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker(slug, titleEn, titleJa, 'Economic Policy', hasFullAccess);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(slug, isJapanese ? titleJa : titleEn, 'economic-policy', lang);
    }
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTOC = () => {
    document.getElementById('table-of-contents')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const renderBold = (text: string): React.ReactNode => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    if (parts.length === 1) return text;
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i} className="font-semibold text-foreground">{part}</strong> : part
    );
  };

  const L = isJapanese ? 'ja' : 'en';
  const colon = isJapanese ? '：' : ': ';
  const cellStyle = { wordBreak: 'keep-all' as const, overflowWrap: 'anywhere' as const };

  const tocSections = [
    { id: 'executive-summary', label: isJapanese ? 'エグゼクティブブリーフ' : 'Executive Brief' },
    { id: 'overview', label: isJapanese ? '政策・イベント概要' : 'Policy & Event Overview' },
    { id: 'timeline', label: isJapanese ? 'タイムライン' : 'Timeline' },
    { id: 'signals', label: isJapanese ? '主要インテリジェンスシグナル' : 'Key Intelligence Signals' },
    { id: 'analysis', label: isJapanese ? '定量分析' : 'Quantitative Analysis' },
    { id: 'competitive', label: isJapanese ? '競争・戦略ダイナミクス' : 'Competitive & Strategic Dynamics' },
    { id: 'sector-guide', label: isJapanese ? 'セクター別戦略判断' : 'Sector Decision Guide' },
    { id: 'next-actions', label: isJapanese ? '次のアクション' : 'Next Action Insights' },
    { id: 'watchpoints', label: isJapanese ? '戦略的ウォッチポイント' : 'Strategic Watchpoints' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: { en: titleEn, ja: titleJa },
    subheadline: {
      en: 'Thailand has now switched from courting cheap EV imports to defending its production base. On 3 November the Cabinet raised the excise tax on fully imported BEVs and range-extended EVs (REEVs) from 10% to 35%, effective 1 January 2027. The next day, Japan\'s ambassador publicly asked Thailand to review duty-free EV imports. The Deputy Prime Minister then flies to Tokyo on 18–20 November to meet six Japanese automakers. For Japanese firms, a tax wall on CBU imports is no longer the open question. The open question is who qualifies for the low tier under a "Made in Thailand" (MIT) local-content test still being written, and Japanese OEMs and suppliers have roughly three years to make sure they qualify.',
      ja: 'タイは今、安価なEV輸入の誘致から国内生産基盤の防衛へと舵を切った。11月3日、閣議は完成車輸入（CBU）のバッテリーEV（BEV）およびレンジエクステンダーEV（REEV）に対する物品税を10%から35%に引き上げることを決定し、2027年1月1日に施行する。翌日には駐タイ日本国大使が、無関税でのEV輸入の見直しをタイに公に求めた。そして副首相は11月18〜20日に訪日し、日系自動車メーカー6社と会談する。日系企業にとって、CBU輸入に対する税の壁はもはや論点ではない。論点は、まだ策定中の「メイド・イン・タイランド（MIT）」現地調達基準のもとで誰が低税率区分の対象となるかであり、日系の自動車メーカーとサプライヤーがその対象となるための猶予はおよそ3年である。'
    },
    category: { en: 'Economic Policy / Automotive', ja: '経済政策 / 自動車' },
    lastUpdated: publishedDate,

    verificationNote: {
      title: { en: 'Verification note', ja: '検証に関する注記' },
      en: 'The mission dates, delegation and agenda are verified from two independent reports published 4 November 2026 (The Nation; Bangkokbiznews). The 35% CBU excise and its 1 January 2027 effective date are verified from Thai-language reports of the Cabinet decision (Thai Post, Bangkokbiznews, 3 Nov 2026). **The MIT three-tier rates (10% / ~15–20% / 35%) are a Finance Ministry proposal, not an enacted regulation.** The local-content threshold has not been set. No Royal Gazette ministerial regulation for the 35% rate had been located at the time of writing.',
      ja: '訪日ミッションの日程、代表団、議題は、2026年11月4日に公表された2つの独立した報道（The Nation、Bangkokbiznews）で確認した。CBUへの35%の物品税と2027年1月1日の施行日は、閣議決定を伝えるタイ語報道（Thai Post、Bangkokbiznews、2026年11月3日）で確認した。**MITの3段階税率（10%／約15〜20%／35%）は財務省の提案であり、制定された規則ではない。**現地調達の基準値は設定されていない。執筆時点で、35%税率に関する官報（Royal Gazette）掲載の省令は確認できていない。'
    },

    executiveSummary: {
      en: [
        '**What is decided:** The Cabinet approved, on 3 November 2026, a 35% excise rate for fully imported BEVs and REEVs (up from 10%), effective 1 January 2027. The Finance Ministry has also outlined a three-tier structure: 10% for locally built EVs meeting an MIT content test, about 15–20% for locally assembled EVs that miss it, and 35% for CBU imports. It has given manufacturers three years to prepare. The tiers and threshold are still proposals.',
        '**Exposure:** Japanese brands\' share of Thai passenger-vehicle registrations fell from 86.6% in 2021 to 55.8% in January–July 2026 (Krungsri Research). Combustion-engine passenger-car sales fell 20.2% in January–September 2026 while BEV sales almost doubled. Vehicle exports fell 4.9%. Two Japanese brands (Subaru, Suzuki) have already stopped building cars in Thailand. The risk is not a sudden plant exit but slow erosion of domestic volume beneath an export hub that still produced 1.08 million vehicles in nine months.',
        '**Strategic stance:** Treat the 18–20 November mission as a negotiation window, not a ceremony. Japanese OEMs should use it to fix the MIT definition, the hybrid excise glide path and the treatment of select CBU imports. Suppliers should map now which of their parts would count as "genuinely Thai-made", because that list, not nationality, decides the next tax tier.',
      ],
      ja: [
        '**決定済みの事項：** 閣議は2026年11月3日、完成車輸入のBEVおよびREEVに対する物品税率を35%（従来は10%）とすることを承認し、2027年1月1日に施行する。財務省はさらに3段階の税率構造を示した。MIT現地調達基準を満たす国内生産EVは10%、基準を満たさない国内組立EVは約15〜20%、CBU輸入は35%である。メーカーには3年間の準備期間が与えられた。税率区分と基準値はなお提案段階にある。',
        '**エクスポージャー：** タイの乗用車登録に占める日系ブランドのシェアは、2021年の86.6%から2026年1〜7月には55.8%に低下した（クルンシィ・リサーチ）。2026年1〜9月のエンジン車（内燃機関車）の乗用車販売は20.2%減少した一方、BEV販売はほぼ倍増した。自動車輸出は4.9%減少した。日系2ブランド（スバル、スズキ）はすでにタイでの自動車生産を終了している。リスクは工場の突然の撤退ではなく、9か月間で108万台を生産した輸出ハブの足元で、国内販売台数がじわじわと侵食されることである。',
        '**戦略的スタンス：** 11月18〜20日のミッションを儀礼ではなく交渉の機会と捉えるべきである。日系自動車メーカーはこの機会を使い、MITの定義、ハイブリッド車（HEV）物品税の段階的引き上げの道筋、一部のCBU輸入の扱いを固めるべきである。サプライヤーは、自社部品のうちどれが「真にタイで製造された」と認められるかを今すぐ洗い出すべきである。次の税率区分を決めるのは国籍ではなく、そのリストだからである。',
      ]
    },
    executiveBrief: {
      title: { en: 'Executive Brief', ja: 'エグゼクティブブリーフ' },
      en: [
        'The Thai Cabinet has approved a 35% excise tax on fully imported BEVs and REEVs from 1 January 2027.',
        'This marks a clear policy shift from attracting cheap EV imports to defending the domestic production base.',
        'However, the "Made in Thailand" (MIT) local-content criteria that will decide access to the lowest tax tier have not been finalised and will be designed during a three-year preparation period.',
        'Deputy Prime Minister Ekniti\'s 18–20 November visit to Japan is a key opportunity for the six Japanese automakers to influence the substance of these criteria.',
        'For suppliers, winning or losing will be decided not by nationality but by whether their parts are recognised as "genuinely Thai-made".',
      ],
      ja: [
        'タイ政府は、2027年1月1日から完成車輸入のBEV・REEVに35%の物品税を課すことを閣議決定した。',
        'これは「安価なEV輸入の誘致」から「国内生産基盤の防衛」への明確な政策転換である。',
        'ただし最も低い税率区分の条件となる「メイド・イン・タイランド（MIT）」の現地調達基準はまだ確定しておらず、今後3年間の準備期間中に設計される。',
        '11月18〜20日のエークニティ副首相の訪日は、日系自動車メーカー6社がこの基準の中身に影響を与えられる重要な機会である。',
        'サプライヤーにとっての勝敗は国籍ではなく、「真にタイで製造された部品」として認定されるかどうかで決まる。',
      ]
    },

    overview: {
      intro: {
        en: 'Three developments landed within 72 hours in early November 2026. They are best read together.',
        ja: '2026年11月上旬の72時間のうちに、3つの動きが相次いだ。これらは一体として読むべきである。'
      },
      items: {
        en: [
          {
            title: '(a) The tax wall (3 November).',
            body: ['At its mobile Cabinet meeting in Udon Thani, the Cabinet approved restructuring the excise tax on imported BEVs and REEVs to a single 35% rate from 1 January 2027 (Thai Post; Bangkokbiznews). The Excise Department said the measure implements National EV Policy Committee (EV Board) resolutions No. 1/2568 (25 Nov 2025) and No. 1/2569 (10 Sep 2026). Their aim is to encourage investment in producing or assembling key components locally and to stabilise the industry against imports that sit outside government promotion schemes.'],
          },
          {
            title: '(b) The MIT ladder (5 November, proposal).',
            body: ['Finance Ministry Permanent Secretary Lavaron Sangsnit outlined a three-tier EV excise structure (The Nation, citing Thansettakij):'],
            bullets: [
              '**10%** for local manufacturers that meet a "Made in Thailand" content requirement;',
              '**about 15–20%** for local producers that miss the threshold (rate not yet decided);',
              '**35%** for fully imported EVs.',
            ],
            after: ['Eligibility would be based on identifiable physical parts made in Thailand, such as seats, doors, glass and tyres, not on the accounting-based content formulas used in rules of origin. Lavaron argued those formulas can show 20–40% local content even when few real Thai parts are used. A 40% threshold has been mentioned but not confirmed. Manufacturers would have three years to plan sourcing with the FTI. Lavaron said the restructuring "is not being done to appease Japanese carmakers or because of external pressure."'],
          },
          {
            title: '(c) The diplomatic signal (4 November).',
            body: ["At The Standard Economic Forum 2026, Japan's ambassador Otaka Masato called for a review of duty-free EV imports. He argued that opening the domestic market to large volumes of cheap cars hurts the existing industry and Thailand's ability to export. He cited Suzuki's and Subaru's decisions to end vehicle production in Thailand as evidence of the pressure (The Nation, 4 and 7 Nov 2026)."],
          },
          {
            title: '(d) The mission (18–20 November).',
            body: ["Deputy PM and Finance Minister Ekniti Nitithanprapas will lead a delegation to Japan. It includes the Industry Minister, the Finance Ministry Permanent Secretary, the Customs Department Director-General, the heads of the FTI, the Thai Chamber of Commerce and the Thai Bankers' Association, and more than 40 Thai businesspeople. Bangkokbiznews says this is the first time the leaders of these three private-sector bodies have travelled to Japan together. Scheduled meetings:"],
            bullets: [
              'the six Japanese automakers with Thai production: Toyota, Honda, Isuzu, Mitsubishi, Mazda, Nissan. Agenda: support measures, car-tax restructuring for fair competition, upgrading Thai parts makers, and the shift to xEVs;',
              'a BOI–Keidanren "Thailand–Japan Investment and Business Dialogue 2026", focused on xEVs and parts, data-centre and advanced-electronics supply chains, and grid modernisation;',
              'a BOI "Thailand–Japan Semiconductor Strategic Partnership" meeting;',
              "METI, JETRO and Japan's Finance Minister, including Japan's POWERR Asia energy-resilience initiative.",
            ],
          },
        ],
        ja: [
          {
            title: '(a) 税の壁（11月3日）',
            body: ['ウドンターニーで開かれた移動閣議において、閣議は輸入BEV・REEVに対する物品税を2027年1月1日から35%の単一税率に再編することを承認した（Thai Post、Bangkokbiznews）。物品税局は、この措置が国家電気自動車政策委員会（EVボード）の決議第1/2568号（2025年11月25日）および第1/2569号（2026年9月10日）を実施するものであると説明した。その狙いは、主要部品の国内生産・組立への投資を促し、政府の振興策の枠外にある輸入車に対して産業を安定させることにある。'],
          },
          {
            title: '(b) MITの段階税率（11月5日、提案）',
            body: ['ラワロン・セーンサニット財務次官は、EV物品税の3段階構造を示した（The Nation、Thansettakijを引用）。'],
            bullets: [
              '「メイド・イン・タイランド」の現地調達要件を満たす国内メーカーは**10%**',
              '基準に届かない国内生産者は**約15〜20%**（税率は未定）',
              '完成車輸入のEVは**35%**',
            ],
            after: ['適格性は、座席、ドア、ガラス、タイヤなど、タイで製造された識別可能な物理的部品に基づいて判断され、原産地規則で用いられる会計ベースの現地調達率の算定式には依拠しない。ラワロン次官は、そうした算定式では実際のタイ製部品がわずかでも20〜40%の現地調達率が示されうると主張した。40%という基準値が言及されているが、確定していない。メーカーにはタイ工業連盟（FTI）とともに調達を計画するための3年間が与えられる。ラワロン次官は、今回の再編は「日系自動車メーカーをなだめるためでも、外圧によるものでもない」と述べた。'],
          },
          {
            title: '(c) 外交的シグナル（11月4日）',
            body: ['The Standard Economic Forum 2026において、大鷹正人駐タイ日本国大使は無関税でのEV輸入の見直しを求めた。大使は、安価な車を大量に国内市場へ受け入れることは既存産業とタイの輸出力を損なうと主張し、その圧力の証左として、スズキとスバルがタイでの自動車生産を終了した決定を挙げた（The Nation、2026年11月4日・7日）。'],
          },
          {
            title: '(d) 訪日ミッション（11月18〜20日）',
            body: ['エークニティ・ニティタンプラパート副首相兼財務相が代表団を率いて訪日する。代表団には工業相、財務次官、関税局長、FTI・タイ商業会議所・タイ銀行協会の各トップ、40人以上のタイ人経営者が含まれる。Bangkokbiznewsによれば、これら民間3団体のトップがそろって訪日するのは初めてである。予定されている会合は次のとおりである。'],
            bullets: [
              'タイに生産拠点を持つ日系自動車メーカー6社：トヨタ、ホンダ、いすゞ、三菱自動車、マツダ、日産。議題は支援策、公正な競争のための自動車税制の再編、タイの部品メーカーの高度化、xEVへの移行。',
              'タイ投資委員会（BOI）と経団連による「タイ・日本投資・ビジネス対話2026」。xEVと部品、データセンター・先端エレクトロニクスのサプライチェーン、送電網の近代化が焦点。',
              'BOIの「タイ・日本半導体戦略パートナーシップ」会合。',
              '経済産業省（METI）、日本貿易振興機構（JETRO）、日本の財務大臣との会談。日本のエネルギー強靭化構想「POWERR Asia」を含む。',
            ],
          },
        ],
      } as Bi<{ title: string; body: string[]; bullets?: string[]; after?: string[] }[]>,
      keyNumbers: {
        title: { en: 'Key Numbers', ja: '主要数値' },
        headers: {
          en: ['Metric', 'Figure', 'Source / status'],
          ja: ['指標', '数値', '出典・ステータス'],
        },
        rows: {
          en: [
            ['Excise on fully imported BEV/REEV', '10% → **35%** from 1 Jan 2027', 'Cabinet, 3 Nov 2026 — **verified (Thai press citing Excise Dept.)**'],
            ['Effective tax burden of 35% levy (tax-inclusive)', 'Up to **49%** of vehicle price', 'Finance Ministry via The Nation, 5 Nov 2026 — secondary'],
            ['Proposed MIT tier / non-MIT local tier', '**10%** / **~15–20%**', 'Finance Ministry proposal — **not enacted**'],
            ['MIT preparation period', '**3 years**', 'Proposal — not enacted'],
            ['Electrified share of new car market (Jan–Jul 2026)', '**55%** (BEV + HEV + PHEV)', 'BOI PR 153/2569 — verified'],
            ['Japanese-brand share of passenger registrations', '86.6% (2021) → **55.8%** (Jan–Jul 2026)', 'Krungsri Research, Sep 2026 — secondary'],
            ['Thai vehicle production, Jan–Sep 2026', '**1,080,030** (+0.39% y/y)', 'FTI, 27 Oct 2026 — verified via Reuters/Nation'],
            ['Vehicle exports (CBU), Jan–Sep 2026', '**655,009** (−4.94% y/y)', 'FTI — verified via Nation'],
            ['BEV / HEV / ICE passenger-car sales, Jan–Sep 2026', '161,532 (+98.56%) / 116,431 (+13.95%) / 77,837 (−20.20%)', 'FTI — verified via Nation'],
            ['FTI 2026 production target', '**1.45 million** (550,000 domestic, 900,000 export)', 'FTI via just-auto — secondary'],
            ['BOI EV-ecosystem approvals (to 31 Aug 2026)', '**USD 4.59 bn**, 189 projects', 'BOI PR 153/2569 — verified'],
            ['Japanese OEM automation upgrades (Honda, Mitsubishi, Isuzu, Mazda)', '**USD 1.53 bn** combined', 'BOI PR 153/2569 — verified'],
            ['Japanese BOI applications, 2025', '302 projects, >THB 113.7 bn', 'BOI via Nation/Bangkokbiznews, 4 Nov 2026 — **conflicts with earlier BOI figure; see §10**'],
            ['Japanese BOI applications, Jan–Sep 2026', '192 projects, >THB 45.4 bn', 'Same — secondary'],
            ["Jobs / local content cited by Japan's ambassador", '>80,000 jobs; local-content ratio >90%', 'Bangkokbiznews via Nation — secondary, basis not stated'],
          ],
          ja: [
            ['完成車輸入BEV／REEVの物品税', '10% → **35%**（2027年1月1日から）', '閣議、2026年11月3日 — **確認済み（物品税局を引用したタイ報道）**'],
            ['35%課税の実効税負担（税込み）', '車両価格の最大**49%**', '財務省（The Nation経由、2026年11月5日）— 二次情報'],
            ['提案中のMIT区分／非MITの国内区分', '**10%**／**約15〜20%**', '財務省提案 — **未制定**'],
            ['MIT準備期間', '**3年**', '提案 — 未制定'],
            ['新車市場に占める電動車比率（2026年1〜7月）', '**55%**（BEV＋HEV＋PHEV）', 'BOI PR 153/2569 — 確認済み'],
            ['乗用車登録に占める日系ブランドのシェア', '86.6%（2021年）→ **55.8%**（2026年1〜7月）', 'クルンシィ・リサーチ、2026年9月 — 二次情報'],
            ['タイの自動車生産（2026年1〜9月）', '**1,080,030台**（前年比+0.39%）', 'FTI、2026年10月27日 — 確認済み（Reuters／Nation経由）'],
            ['自動車輸出（CBU、2026年1〜9月）', '**655,009台**（前年比−4.94%）', 'FTI — 確認済み（Nation経由）'],
            ['BEV／HEV／エンジン車の乗用車販売（2026年1〜9月）', '161,532台（+98.56%）／116,431台（+13.95%）／77,837台（−20.20%）', 'FTI — 確認済み（Nation経由）'],
            ['FTIの2026年生産目標', '**145万台**（国内55万台、輸出90万台）', 'FTI（just-auto経由）— 二次情報'],
            ['BOIのEVエコシステム認可（2026年8月31日まで）', '**45.9億米ドル**、189件', 'BOI PR 153/2569 — 確認済み'],
            ['日系自動車メーカーの自動化投資（ホンダ、三菱自動車、いすゞ、マツダ）', '合計**15.3億米ドル**', 'BOI PR 153/2569 — 確認済み'],
            ['日系企業のBOI申請（2025年）', '302件、1,137億バーツ超', 'BOI（Nation／Bangkokbiznews経由、2026年11月4日）— **BOIの以前の数値と矛盾。§10参照**'],
            ['日系企業のBOI申請（2026年1〜9月）', '192件、454億バーツ超', '同上 — 二次情報'],
            ['日本大使が挙げた雇用・現地調達率', '8万人超の雇用、現地調達率90%超', 'Bangkokbiznews（Nation経由）— 二次情報、根拠は明示されていない'],
          ],
        },
      },
    },

    timeline: {
      headers: { en: ['Date', 'Event', 'Source'], ja: ['日付', '出来事', '出典'] },
      rows: {
        en: [
          ['Jun 2024', "Suzuki announces end of Thai car production by end-2025; Subaru's Thai assembler announces end of production by end-2024", 'Suzuki statement; Khaosod English'],
          ['Jul 2024', 'Honda announces end of vehicle production at Ayutthaya, consolidating at Prachinburi', 'Reuters / Bangkok Post'],
          ['18 Dec 2024', 'Toyota pledges THB 55 bn to expand hybrid production in Thailand', 'Bangkok Post; MarkLines'],
          ['30 Dec 2024', "Subaru's Lat Krabang plant ends operations; vehicles imported from Japan thereafter", 'The Nation'],
          ['25 Nov 2025', 'EV Board resolution 1/2568, later cited as legal basis for the CBU excise rise', 'Excise Dept. via Bangkokbiznews'],
          ['End-2025', 'Suzuki ends Rayong production (4,400 units in 2025 vs ~60,000 peak); plant reported sold to Ford', 'just-auto; The Nation (26 Jan 2026)'],
          ['2025 full year', "Japanese brands' Thai market share 69.3%; Chinese brands 21.5%", 'Industry data via Gasgoo / Nikkei'],
          ['Jan 2026', "EV 3.0 ends; EV 3.5 cuts subsidies, imports face 10% excise; Excise Dept. reviews Neta's 24,000 outstanding compensation units", 'The Nation, 13 & 26 Jan 2026'],
          ['14 May 2026', 'Ten auto and parts associations call for ≥32% excise on CBU EVs, citing a 30–40% cost gap versus Chinese imports', 'The Nation; Thansettakij'],
          ['4 Aug 2026', "Indonesia's Finance Minister publicly invites Toyota to move its main regional base from Thailand", 'Jakarta Post; Khaosod English'],
          ['7 Aug 2026', 'FM Ekniti says ministry is weighing excise cuts for automakers producing locally with Thai parts', 'The Nation'],
          ['16 Aug 2026', 'Honda, with five other Japanese brands via the JCC, presses eight issues including hybrid excise timing and import duties', 'The Nation'],
          ['28 Aug 2026', 'Toyota Motor Vietnam adds USD 283.7 m investment, incl. a hybrid line', 'VietnamNet; Tuoi Tre'],
          ['10 Sep 2026', 'EV Board approves new excise framework in principle; electrified vehicles hit 55% share', 'BOI PR 153/2569'],
          ['Late Sep–mid Oct 2026', 'Floods disrupt parts supply; several assembly plants pause, September output −6.08%', 'FTI via Reuters; see WaLens flood report'],
          ['3 Nov 2026', 'Cabinet approves 35% excise on CBU BEV/REEV from 1 Jan 2027', 'Thai Post; Bangkokbiznews'],
          ['4 Nov 2026', 'Ambassador Otaka calls for review of duty-free EV imports; mission to Japan announced', 'The Nation'],
          ['5 Nov 2026', 'Finance Ministry outlines MIT three-tier proposal', 'The Nation / Thansettakij'],
          ['13–15 Nov 2026', "Chinese Premier Li Qiang's official visit to Thailand (first by a Chinese premier in seven years)", 'Chinese MFA; Thairath'],
          ['**18–20 Nov 2026**', '**Ekniti-led mission meets Toyota, Honda, Isuzu, Mitsubishi, Mazda, Nissan; BOI–Keidanren dialogue**', 'The Nation; Bangkokbiznews'],
          ['1 Jan 2027', '35% CBU excise takes effect', 'Cabinet decision'],
          ['2027', 'EV 3.5 scheme ends; local-production compensation ratio for imports rises to 1:3', 'Phuket News / Bangkok Post; electrive'],
        ],
        ja: [
          ['2024年6月', 'スズキがタイでの自動車生産を2025年末までに終了すると発表。スバルのタイ組立会社が2024年末までの生産終了を発表', 'スズキ発表；Khaosod English'],
          ['2024年7月', 'ホンダがアユタヤでの車両生産終了を発表し、プラーチーンブリーに集約', 'Reuters／Bangkok Post'],
          ['2024年12月18日', 'トヨタがタイでのハイブリッド車生産拡大に550億バーツを投じると表明', 'Bangkok Post；MarkLines'],
          ['2024年12月30日', 'スバルのラートクラバン工場が操業を終了。以降は日本から輸入', 'The Nation'],
          ['2025年11月25日', 'EVボード決議第1/2568号。後にCBU物品税引き上げの法的根拠として引用される', '物品税局（Bangkokbiznews経由）'],
          ['2025年末', 'スズキがラヨーンでの生産を終了（2025年は4,400台、ピーク時は約6万台）。工場はフォードに売却されたと報じられる', 'just-auto；The Nation（2026年1月26日）'],
          ['2025年通年', '日系ブランドのタイ市場シェア69.3%、中国ブランド21.5%', '業界データ（Gasgoo／日経経由）'],
          ['2026年1月', 'EV 3.0が終了。EV 3.5で補助金が縮小し、輸入車に10%の物品税。物品税局がNetaの未履行の補填生産24,000台を審査', 'The Nation、2026年1月13日・26日'],
          ['2026年5月14日', '自動車・部品の10団体が、中国からの輸入車との30〜40%のコスト差を理由に、CBU EVへの32%以上の物品税を要求', 'The Nation；Thansettakij'],
          ['2026年8月4日', 'インドネシア財務相がトヨタに対し、地域の主力拠点をタイから移すよう公に呼びかけ', 'Jakarta Post；Khaosod English'],
          ['2026年8月7日', 'エークニティ財務相が、タイ製部品を用いて国内生産する自動車メーカーへの物品税引き下げを財務省が検討中と表明', 'The Nation'],
          ['2026年8月16日', 'ホンダが在タイ日本人商工会議所（JCC）を通じて他の日系5ブランドとともに、ハイブリッド車物品税の時期や輸入関税を含む8項目を要望', 'The Nation'],
          ['2026年8月28日', 'トヨタ・モーター・ベトナムが、ハイブリッド車ラインを含む2億8,370万米ドルの追加投資', 'VietnamNet；Tuoi Tre'],
          ['2026年9月10日', 'EVボードが新たな物品税の枠組みを原則承認。電動車のシェアが55%に到達', 'BOI PR 153/2569'],
          ['2026年9月下旬〜10月中旬', '洪水で部品供給が混乱し、複数の組立工場が一時停止。9月の生産は−6.08%', 'FTI（Reuters経由）；WaLens洪水レポート参照'],
          ['2026年11月3日', '閣議が2027年1月1日からのCBU BEV／REEVへの35%物品税を承認', 'Thai Post；Bangkokbiznews'],
          ['2026年11月4日', '大鷹大使が無関税でのEV輸入の見直しを要請。訪日ミッションを発表', 'The Nation'],
          ['2026年11月5日', '財務省がMITの3段階案を提示', 'The Nation／Thansettakij'],
          ['2026年11月13〜15日', '中国の李強首相がタイを公式訪問（中国首相の訪タイは7年ぶり）', '中国外交部；Thairath'],
          ['**2026年11月18〜20日**', '**エークニティ副首相率いるミッションがトヨタ、ホンダ、いすゞ、三菱自動車、マツダ、日産と会談。BOI・経団連対話**', 'The Nation；Bangkokbiznews'],
          ['2027年1月1日', 'CBUへの35%物品税が施行', '閣議決定'],
          ['2027年', 'EV 3.5制度が終了。輸入に対する国内生産の補填比率が1:3に上昇', 'Phuket News／Bangkok Post；electrive'],
        ],
      },
      connect: {
        title: { en: 'How the events connect', ja: '出来事のつながり' },
        intro: { en: 'The chain runs in four steps.', ja: '連鎖は4つの段階で進んだ。' },
        steps: {
          en: [
            '**EV 3.0/3.5 opened a door.** Zero ASEAN–China FTA tariffs plus low excise let Chinese brands build share quickly, while Japanese domestic volumes fell.',
            '**The weakest Japanese plants closed.** Subaru (2024) and Suzuki (2025) stopped production, and Honda consolidated its two plants into one.',
            "**Pressure became a lobbying coalition.** Parts associations (May), the JCC brands (August) and finally Japan's ambassador (November) pushed for change.",
            '**The state responded with tax, not tariffs.** It raised the excise on CBU EVs and floated a local-content ladder.',
          ],
          ja: [
            '**EV 3.0／3.5が扉を開いた。** ASEAN・中国自由貿易協定（ACFTA）による関税ゼロと低い物品税により、中国ブランドは急速にシェアを伸ばし、日系の国内販売台数は減少した。',
            '**最も弱い日系工場が閉鎖された。** スバル（2024年）とスズキ（2025年）が生産を終了し、ホンダは2つの工場を1つに集約した。',
            '**圧力はロビー連合へと変わった。** 部品業界団体（5月）、JCCの日系ブランド（8月）、そして最後に日本大使（11月）が変化を迫った。',
            '**国家は関税ではなく税で応じた。** CBU EVへの物品税を引き上げ、現地調達に応じた段階税率案を打ち出した。',
          ],
        },
        closing: {
          en: "Indonesia's open bid for Toyota (August) and Toyota's Vietnam expansion (also August) added urgency. Officials framed the August excise review partly as a response to the Indonesian pitch (The Nation, 17 Aug 2026). **No evidence was found that the September–October floods influenced the tax decision.** They are a parallel operational shock, not a cause.",
          ja: 'インドネシアによる公然のトヨタ誘致（8月）とトヨタのベトナムでの拡張（同じく8月）が、切迫感を高めた。当局は8月の物品税見直しを、部分的にはインドネシアの誘致への対応と位置づけた（The Nation、2026年8月17日）。**9〜10月の洪水が税制の決定に影響したという証拠は見つからなかった。**洪水は並行して起きた操業上のショックであり、原因ではない。'
        },
      },
    },

    signals: {
      headers: {
        en: ['Signal', 'Current reading', 'Trigger for escalation', 'Why it matters'],
        ja: ['シグナル', '現状', 'エスカレーションのトリガー', 'なぜ重要か'],
      },
      rows: {
        en: [
          ['MIT local-content threshold', 'Not set; 40% mentioned, not final; physical-parts method proposed', 'Excise Dept. publishes parts list or threshold; FTI working-group calendar', 'Decides whether Japanese hybrids, Chinese locally built EVs and suppliers fall into the 10% tier or the 15–20% tier'],
          ['Year-end CBU booking rush', 'Industry expects pull-forward of imported EV sales before 1 Jan 2027', 'November–December FTI BEV registrations spike', "A Q4 surge then a Q1 2027 cliff distorts dealers' and suppliers' order books"],
          ['Mission outcome (18–20 Nov)', 'Agenda: tax restructuring, parts upgrading, xEV transition', 'Any announced OEM investment, hybrid excise concession or CBU import allowance', 'First indication of what Thailand traded for Japanese commitments'],
          ['Hybrid excise glide path', 'Honda warned up to four models could see rates rise from 6% to 8% then 10% if launch timing cannot meet local-content conditions', 'Ministerial regulation on HEV/MHEV timing', 'Directly sets hybrid prices, the segment where Japanese brands still lead'],
          ['Chinese response', 'Eight Chinese automakers already assemble locally and may qualify for lower tiers', "Statements after Li Qiang's visit; any WTO or ACFTA complaint", 'Determines whether the measure actually narrows the cost gap or only hits import-only brands'],
          ['Indonesia / Vietnam incentive race', 'Indonesia offering Toyota "whatever incentives you want"; Toyota adding hybrid capacity in Vietnam', 'New Indonesian fiscal package; any OEM model-allocation announcement outside Thailand', 'Next-generation model allocation, not current plants, is the real prize'],
          ['EV 3.5 sunset (2027)', 'Compensation ratio rises to 1:3; scheme then ends', 'Absence of a successor scheme by mid-2027', 'Without obligations, Chinese brands could shift back toward imports, now taxed at 35%'],
        ],
        ja: [
          ['MIT現地調達基準値', '未設定。40%が言及されたが確定していない。物理的部品による方式が提案されている', '物品税局による部品リストまたは基準値の公表。FTI作業部会の日程', '日系ハイブリッド車、中国の国内生産EV、サプライヤーが10%区分と15〜20%区分のどちらに入るかを決める'],
          ['年末のCBU駆け込み受注', '業界は2027年1月1日前の輸入EV販売の前倒しを見込む', '11〜12月のFTIのBEV登録の急増', '第4四半期の急増とその後の2027年第1四半期の急落が、ディーラーとサプライヤーの受注残を歪める'],
          ['ミッションの成果（11月18〜20日）', '議題：税制再編、部品の高度化、xEVへの移行', '自動車メーカーの投資、ハイブリッド車物品税の譲歩、CBU輸入枠の発表', 'タイが日系企業のコミットメントと引き換えに何を差し出したかを示す最初の手がかり'],
          ['ハイブリッド車物品税の段階的引き上げ', 'ホンダは、発売時期が現地調達条件を満たせない場合、最大4車種の税率が6%から8%、さらに10%へ上がりうると警告', 'HEV／マイルドハイブリッド車（MHEV）の時期に関する省令', '日系ブランドがなお首位にあるセグメントで、ハイブリッド車の価格を直接左右する'],
          ['中国の反応', '中国の自動車メーカー8社がすでに国内で組立を行っており、低い税率区分の対象となる可能性がある', '李強首相の訪問後の声明。WTOまたはACFTAへの申し立て', 'この措置が実際にコスト差を縮めるのか、輸入専業ブランドにのみ打撃を与えるのかを決める'],
          ['インドネシア・ベトナムとの誘致競争', 'インドネシアはトヨタに「望むどおりのインセンティブ」を提示。トヨタはベトナムでハイブリッド車の生産能力を追加', 'インドネシアの新たな財政パッケージ。タイ以外での車種配分の発表', '真の争奪対象は現在の工場ではなく、次世代車種の配分である'],
          ['EV 3.5の終了（2027年）', '補填比率が1:3に上昇し、その後制度は終了', '2027年半ばまでに後継制度が示されない', '義務がなくなれば、中国ブランドは今や35%が課される輸入へと再びシフトしかねない'],
        ],
      },
    },

    analysis: {
      label: {
        en: 'All calculations below are WaLens estimates from the public figures cited, rounded and simplified.',
        ja: '以下の計算はすべて、引用した公開数値に基づくWaLensの推計であり、端数処理と簡略化を行っている。'
      },
      blocks: {
        en: [
          {
            title: '5.1 The size of the tax wedge (estimate)',
            paras: ['Per THB 1,000,000 of excise tax base, the excise on a CBU BEV rises from THB 100,000 (10%) to THB 350,000 (35%), an increase of THB 250,000. Thailand also levies an interior (local) tax equal to 10% of excise, adding about THB 25,000, plus 7% VAT on the increase. The illustrative increase is roughly (250,000 + 25,000) × 1.07 ≈ **THB 294,000 per THB 1 million of tax base**. This is an order-of-magnitude estimate only: the statutory excise base and price pass-through vary by model. It is consistent with the Finance Ministry\'s statement that the levy can mean an effective burden of up to 49% of the vehicle price. It is large enough to erase most of the 30–40% cost advantage of Chinese imports that the industry associations cited in May.'],
          },
          {
            title: '5.2 Where 2026 growth actually went (FTI, Jan–Sep)',
            paras: ['Back-calculating prior-year bases from the reported growth rates:'],
            bullets: [
              'ICE passenger cars: 77,837 ÷ 0.798 ≈ 97,540 a year earlier → **−19,700 units**.',
              'HEV passenger cars: 116,431 ÷ 1.1395 ≈ 102,180 → **+14,250 units**.',
              'BEV passenger cars: 161,532 ÷ 1.9856 ≈ 81,350 → **+80,180 units**.',
            ],
            after: ['The two segments where Japanese brands dominate (ICE and HEV) **lost about 5,450 units net**. The BEV segment, where Krungsri estimates more than 90% of passenger BEVs sold are Chinese brands, **took essentially all the growth**. The domestic market grew, but almost none of that growth reached the Japanese-led production and supplier base.'],
          },
          {
            title: '5.3 Export gap',
            paras: ["January–September CBU exports of 655,009 (−4.94%) imply about 689,050 a year earlier, a loss of about **34,000 units**, linked largely to Middle East disruption. To hit the FTI's 900,000 full-year export target, Q4 would need about 245,000 units (≈81,700 a month). September alone shipped 89,972, so the target is reachable but with little margin."],
          },
          {
            title: "5.4 Scale economics behind the ambassador's argument",
            paras: ["Toyota's Thai capacity is about 770,000 vehicles a year (The Nation, Sep 2026). National output is running at an annualised rate of about 1.44 million (1,080,030 × 12/9). Honda's Prachinburi plant is near its 110,000-unit ceiling, and Honda plans >THB 12 bn to lift it to 150,000 by 2029. The exits so far are at the bottom of the scale curve: Suzuki's Rayong plant fell to 4,400 units in 2025 against a peak near 60,000. **Implication:** plants below a viable scale have already gone. The remaining risk falls on suppliers whose volumes are tied to specific domestic-only models."],
          },
          {
            title: '5.5 Supplier sensitivity (illustrative scenario)',
            paras: ["Take a Tier-2 supplier with 60% of revenue tied to Japanese OEM models sold mainly in Thailand. A further 10% fall in those models' domestic volume would cut its revenue by about 6% before any fixed-cost leverage effect. For a business with 30% fixed costs at an 8% operating margin, that could compress operating margin by about two to three percentage points. This is a scenario, not a forecast."],
          },
          {
            title: '5.6 Japanese investment pace',
            paras: ["Japanese BOI applications reached more than THB 45.4 bn in January–September 2026. Annualised, that is about THB 60.5 bn, or roughly 47% below 2025's THB 113.7 bn. The comparison is distorted by large one-off projects in 2025 and should not be read as a trend without the project-level data."],
          },
        ],
        ja: [
          {
            title: '5.1 税負担の差の規模（推計）',
            paras: ['物品税の課税標準100万バーツ当たり、CBU BEVへの物品税は10万バーツ（10%）から35万バーツ（35%）へと25万バーツ増える。タイではさらに物品税額の10%に相当する内務税（地方税）が課されて約2万5,000バーツが加わり、増加分には7%の付加価値税（VAT）がかかる。概算の増加額は (250,000 + 25,000) × 1.07 ≈ **課税標準100万バーツ当たり294,000バーツ**となる。これは規模感をつかむための推計にすぎず、法定の物品税課税標準と価格転嫁は車種によって異なる。この結果は、課税により実効負担が車両価格の最大49%になりうるとする財務省の説明と整合する。業界団体が5月に指摘した、中国からの輸入車が持つ30〜40%のコスト優位の大半を打ち消すのに十分な大きさである。'],
          },
          {
            title: '5.2 2026年の成長はどこへ向かったか（FTI、1〜9月）',
            paras: ['公表された伸び率から前年の基準値を逆算すると、次のとおりである。'],
            bullets: [
              'エンジン車（乗用車）：77,837 ÷ 0.798 ≈ 前年97,540台 → **−19,700台**',
              'HEV（乗用車）：116,431 ÷ 1.1395 ≈ 102,180台 → **+14,250台**',
              'BEV（乗用車）：161,532 ÷ 1.9856 ≈ 81,350台 → **+80,180台**',
            ],
            after: ['日系ブランドが優位にある2つのセグメント（エンジン車とHEV）は、**差し引きで約5,450台減少した**。クルンシィ・リサーチが乗用BEV販売の90%超を中国ブランドが占めると推計するBEVセグメントが、**実質的に成長のすべてを取り込んだ**。国内市場は成長したが、その成長は日系主導の生産・サプライヤー基盤にほとんど届いていない。'],
          },
          {
            title: '5.3 輸出の落ち込み',
            paras: ['1〜9月のCBU輸出655,009台（−4.94%）から、前年は約689,050台であったと推計され、約**34,000台**の減少となる。主因は中東の混乱である。FTIの通年輸出目標90万台を達成するには、第4四半期に約245,000台（月約81,700台）が必要となる。9月単月の出荷は89,972台であり、目標は達成可能だが余裕は小さい。'],
          },
          {
            title: '5.4 大使の主張の背後にある規模の経済',
            paras: ['トヨタのタイでの生産能力は年約77万台である（The Nation、2026年9月）。国内生産は年率換算で約144万台（1,080,030 × 12/9）のペースで推移している。ホンダのプラーチーンブリー工場は11万台の上限に近く、ホンダは120億バーツ超を投じて2029年までに15万台に引き上げる計画である。これまでの撤退は規模曲線の最下部で起きている。スズキのラヨーン工場は、ピーク時の約6万台に対し、2025年には4,400台に落ち込んでいた。**示唆：**採算規模を下回る工場はすでに姿を消した。残るリスクは、国内専売の特定車種に数量が連動するサプライヤーに降りかかる。'],
          },
          {
            title: '5.5 サプライヤーの感応度（例示シナリオ）',
            paras: ['売上の60%が、主にタイ国内で販売される日系自動車メーカーの車種に連動するTier-2サプライヤーを想定する。それらの車種の国内販売がさらに10%減少すれば、固定費のレバレッジ効果を考慮する前の段階で、売上は約6%減少する。固定費比率30%、営業利益率8%の事業であれば、営業利益率は約2〜3ポイント圧縮されうる。これはシナリオであり、予測ではない。'],
          },
          {
            title: '5.6 日系投資のペース',
            paras: ['日系企業のBOI申請は2026年1〜9月に454億バーツを超えた。年率換算では約605億バーツとなり、2025年の1,137億バーツを約47%下回る。この比較は2025年の大型の単発案件によって歪んでおり、案件レベルのデータなしにトレンドとして読むべきではない。'],
          },
        ],
      } as Bi<{ title: string; paras: string[]; bullets?: string[]; after?: string[] }[]>,
    },

    competitive: {
      whoWins: {
        en: '**Who wins from the 35% wall.** The sharpest effect falls on **import-only brands** (Automotive World cites Tesla, Volvo, Porsche and Audi) and on Chinese models not yet assembled in Thailand. **Chinese automakers with Thai plants**, eight according to Automotive World and "about eight plants" per the Finance Ministry, may qualify for lower tiers, especially before the MIT test bites. Locally built EVs currently receive a preferential 2% excise under the existing scheme. A wall on CBU imports alone therefore does not close the gap between Japanese hybrids and Chinese locally built EVs. The MIT ladder is what could.',
        ja: '**35%の壁で誰が得をするか。** 最も強い影響を受けるのは**輸入専業ブランド**（Automotive WorldはTesla、Volvo、Porsche、Audiを挙げる）と、まだタイで組み立てられていない中国車種である。**タイに工場を持つ中国の自動車メーカー**（Automotive Worldによれば8社、財務省によれば「約8工場」）は、特にMIT基準が効き始める前であれば、低い税率区分の対象となる可能性がある。国内生産EVは現在、既存制度のもとで2%の優遇物品税を受けている。したがって、CBU輸入だけに壁を設けても、日系ハイブリッド車と中国の国内生産EVとの差は縮まらない。差を縮めうるのはMITの段階税率である。'
      },
      whereJapan: {
        en: '**Where Japanese makers stand.** Japanese OEMs hold about 80% of Thailand\'s production capacity (Krungsri) and a deep supplier base. Under an MIT test that counts physical Thai-made parts, that base is an asset (The Nation, 13 Sep 2026). They have been asking for:',
        ja: '**日系メーカーの立ち位置。** 日系自動車メーカーはタイの生産能力の約80%を占め（クルンシィ・リサーチ）、厚いサプライヤー基盤を持つ。タイ製の物理的部品を数えるMIT基準のもとでは、その基盤は資産となる（The Nation、2026年9月13日）。日系メーカーが求めてきたのは次の点である。'
      },
      asks: {
        en: [
          'a hybrid excise timetable that matches model launch cycles;',
          'lower duties on select Japanese CBU imports. Honda cites rates of up to 80%; the Thailand–Japan EPA rate is widely reported at 20% (see §10);',
          'import quotas or excise measures against CBU EVs (Thansettakij; The Nation, 16 Aug 2026).',
        ],
        ja: [
          '車種の発売サイクルに合わせたハイブリッド車物品税の時間軸',
          '一部の日本からのCBU輸入に対する関税の引き下げ。ホンダは最大80%の税率を挙げているが、日タイ経済連携協定（EPA）の税率は20%と広く報じられている（§10参照）',
          'CBU EVに対する輸入枠または物品税措置（Thansettakij；The Nation、2026年8月16日）',
        ],
      },
      lever: {
        en: 'The EV Board framework already allows automakers with Thai assembly plants to import select models for market testing, with volumes tied to the local economic value they created in the prior year (BOI PR 153/2569). This is the lever Japanese OEMs should watch most closely in Tokyo.',
        ja: 'EVボードの枠組みはすでに、タイに組立工場を持つ自動車メーカーが市場テストのために一部車種を輸入することを認めており、その台数は前年に生み出した国内の経済的価値に連動する（BOI PR 153/2569）。これこそ、日系自動車メーカーが東京で最も注視すべきレバーである。'
      },
      regional: {
        title: { en: 'The regional contest', ja: '地域間の競争' },
        headers: {
          en: ['Country', 'Latest move (2026)', 'Relevance to Japanese firms in Thailand'],
          ja: ['国', '最新の動き（2026年）', '在タイ日系企業にとっての意味'],
        },
        rows: {
          en: [
            ['Thailand', '35% CBU EV excise; MIT ladder; mission to Japan; Toyota THB 55 bn hybrid pledge (2024)', 'Defending incumbent base; next model allocation at stake'],
            ['Indonesia', 'FM Purbaya (4 Aug) invited Toyota to move its main base and suppliers, offering incentives', 'Largest ASEAN market; Suzuki already concentrates Asian output there; Toyota has made no relocation announcement'],
            ['Vietnam', 'Toyota +USD 283.7 m in Phu Tho, about 52,000 units of capacity including hybrids; Honda moving UC3 e-motorcycle production from Thailand', 'Diversification rather than relocation: Thai capacity remains about 15× larger, but new hybrid lines go elsewhere'],
          ],
          ja: [
            ['タイ', 'CBU EVへの35%物品税、MITの段階税率、訪日ミッション、トヨタの550億バーツのハイブリッド車投資表明（2024年）', '既存拠点の防衛。次の車種配分がかかっている'],
            ['インドネシア', 'プルバヤ財務相（8月4日）がインセンティブを提示し、トヨタに主力拠点とサプライヤーの移転を呼びかけ', 'ASEAN最大の市場。スズキはすでにアジアの生産を同国に集中。トヨタは移転を発表していない'],
            ['ベトナム', 'トヨタがフート省に2億8,370万米ドルを追加投資し、ハイブリッド車を含む約52,000台の生産能力。ホンダは電動二輪車UC3の生産をタイから移管', '移転ではなく分散。タイの生産能力はなお約15倍大きいが、新しいハイブリッド車ラインは他国に向かう'],
          ],
        },
      },
      relocation: {
        en: 'Analysts quoted by The Nation agree that **immediate relocation is unlikely**. The real competition is for the next wave of investment: which country gets the next hybrid or EV platform and its supplier cluster.',
        ja: 'The Nationが引用したアナリストは、**即時の移転は起こりにくい**という点で一致している。本当の競争は次の投資の波、すなわち次のハイブリッド車・EVプラットフォームとそのサプライヤー集積をどの国が獲得するかをめぐるものである。'
      },
      suppliers: {
        en: '**Opportunities for suppliers.** If the MIT test is built on a physical-parts list, the winners will be Thai-based makers of high-weight, high-value "common parts" used in both EVs and ICE vehicles: chassis, body, seats, glass, tyres and wiring. The parts associations specifically asked for common-parts sourcing obligations (Thansettakij, 14 May 2026). Japanese Tier-1s with Thai plants can also position as localisation partners for Chinese assemblers that need MIT status. That decision is strategically sensitive and should be made at head-office level.',
        ja: '**サプライヤーにとっての機会。** MIT基準が物理的部品のリストに基づいて構築されれば、勝者はEVとエンジン車の双方で使われる、重量があり高付加価値の「共通部品」（シャシー、ボディ、座席、ガラス、タイヤ、配線）を製造するタイ拠点のメーカーとなる。部品業界団体は共通部品の調達義務を具体的に求めていた（Thansettakij、2026年5月14日）。タイに工場を持つ日系Tier-1は、MIT認定を必要とする中国の組立メーカーの現地化パートナーとして自らを位置づけることもできる。これは戦略的に機微な判断であり、本社レベルで行うべきである。'
      },
    },

    sectorGuide: {
      labels: {
        relevance: { en: 'Direct relevance', ja: '直接的な関連性' },
        exposure: { en: 'Exposure', ja: 'エクスポージャー' },
        urgency: { en: 'Urgency', ja: '緊急度' },
      },
      urgencyLabel: {
        High: { en: 'High', ja: '高' },
        Medium: { en: 'Medium', ja: '中' },
        Low: { en: 'Low', ja: '低' },
      } as Record<Urgency, Bi<string>>,
      items: [
        {
          urgency: 'High' as Urgency,
          en: { sector: 'Japanese automakers (OEM)', relevance: 'Tax tiers, hybrid glide path, CBU import allowance', exposure: 'High', stance: 'Use the 18–20 Nov meetings to secure MIT definitions and hybrid timing in writing; prepare model-allocation narrative for HQ' },
          ja: { sector: '日系自動車メーカー（OEM）', relevance: '税率区分、ハイブリッド車の段階的引き上げ、CBU輸入枠', exposure: '高', stance: '11月18〜20日の会合を活用し、MITの定義とハイブリッド車の時期を書面で確保する。本社向けに車種配分の説明材料を準備する' },
        },
        {
          urgency: 'High' as Urgency,
          en: { sector: 'Tier-1/Tier-2 auto parts', relevance: 'MIT parts list decides demand', exposure: 'High', stance: 'Build a "Thai-made" evidence file per part number now; target Chinese assemblers as MIT customers where HQ policy allows' },
          ja: { sector: 'Tier-1／Tier-2自動車部品', relevance: 'MIT部品リストが需要を決める', exposure: '高', stance: '部品番号ごとの「タイ製」証拠ファイルを今すぐ作成する。本社方針が許す範囲で、中国の組立メーカーをMIT顧客として狙う' },
        },
        {
          urgency: 'Medium' as Urgency,
          en: { sector: 'Steel, resin, glass, rubber, chemicals', relevance: 'Upstream of common parts', exposure: 'Medium', stance: 'Track MIT list; prepare local-origin documentation for OEM customers' },
          ja: { sector: '鉄鋼、樹脂、ガラス、ゴム、化学', relevance: '共通部品の上流', exposure: '中', stance: 'MITリストを追跡し、OEM顧客向けに国内原産の証明書類を準備する' },
        },
        {
          urgency: 'Medium' as Urgency,
          en: { sector: 'Electronics / semiconductors', relevance: 'xEV electronics; BOI semiconductor partnership meeting in Tokyo', exposure: 'Medium', stance: 'Watch whether "critical electronic components" get the deepest tax tier' },
          ja: { sector: 'エレクトロニクス／半導体', relevance: 'xEVの電子部品。東京でのBOI半導体パートナーシップ会合', exposure: '中', stance: '「重要電子部品」が最も優遇された税率区分の対象となるかを注視する' },
        },
        {
          urgency: 'Medium' as Urgency,
          en: { sector: 'Trading houses and logistics', relevance: 'CBU import flows fall, CKD/parts flows rise', exposure: 'Medium', stance: 'Expect Q4 2026 import spike then Q1 2027 drop; rebalance bonded warehouse and port capacity' },
          ja: { sector: '商社・物流', relevance: 'CBU輸入の流れが減り、CKD（現地組立用部品）／部品の流れが増える', exposure: '中', stance: '2026年第4四半期の輸入急増とその後の2027年第1四半期の急減を見込み、保税倉庫と港湾の能力を再配分する' },
        },
        {
          urgency: 'Medium' as Urgency,
          en: { sector: 'Banks and leasing', relevance: 'Dealer inventory, auto loans, supplier credit', exposure: 'Medium', stance: 'Stress-test dealer floor-plan exposure to CBU EV brands after 1 Jan 2027' },
          ja: { sector: '銀行・リース', relevance: 'ディーラー在庫、自動車ローン、サプライヤー与信', exposure: '中', stance: '2027年1月1日以降のCBU EVブランドに対するディーラー在庫金融（フロアプラン）のエクスポージャーをストレステストする' },
        },
        {
          urgency: 'Low' as Urgency,
          en: { sector: 'Dealers (Japanese brands)', relevance: 'Price gap versus CBU EVs narrows', exposure: 'Low–Medium', stance: 'Plan Q1 2027 campaigns around the price reset' },
          ja: { sector: 'ディーラー（日系ブランド）', relevance: 'CBU EVとの価格差が縮小', exposure: '低〜中', stance: '価格リセットを軸に2027年第1四半期のキャンペーンを計画する' },
        },
      ],
    },

    nextActions: {
      horizons: {
        en: [
          {
            label: 'Today',
            actions: [
              'Share this summary with the regional or Japan head office before the 18–20 November meetings, flagging that the MIT tiers are proposals and that the threshold is still open.',
              'Confirm whether your company, or your main OEM customer, is part of any meeting in Tokyo or Bangkok tied to the mission, and who owns the follow-up.',
              'Ask finance to identify all CBU EV or REEV imports (company cars, test fleets, dealer stock) that will land after 1 January 2027 and re-price them.',
            ],
          },
          {
            label: 'This week',
            actions: [
              'Build a part-number list showing which components are physically made in Thailand, by whom and at what volume. This is the likely evidence base for MIT.',
              "Request the FTI Automotive Industry Club's working-group schedule on the MIT component list and nominate a participant.",
              'For OEMs: brief the JCC automotive committee on your position on hybrid timing and select-import allowances so the eight-issue agenda stays aligned.',
            ],
          },
          {
            label: 'This month',
            actions: [
              'Model three scenarios for 2027 domestic volume: MIT threshold at 20%, 40% and 60%, each with and without a hybrid excise concession.',
              'Review customer concentration: what share of revenue depends on domestic-only Japanese models versus export models?',
              "Prepare a written localisation proposal (capacity, timing, capex) that could support an OEM's MIT case or a BOI application.",
            ],
          },
          {
            label: 'This quarter',
            actions: [
              'Decide at head-office level whether to supply Chinese assemblers seeking MIT status, including IP, pricing and reputational guardrails.',
              'Re-run Thailand vs Indonesia vs Vietnam footprint economics for any new model or line, using the post-January 2027 tax structure.',
              'Lock in BOI incentives (including automation-upgrade measures) before the EV 3.5 sunset in 2027 removes current comparators.',
            ],
          },
        ],
        ja: [
          {
            label: '今日',
            actions: [
              '11月18〜20日の会合の前に、この要約を地域統括会社または日本本社と共有する。その際、MITの税率区分は提案段階であり、基準値はまだ決まっていないことを明記する。',
              '自社または主要OEM顧客が、ミッションに関連する東京またはバンコクでの会合に参加するかどうか、またフォローアップの担当者は誰かを確認する。',
              '2027年1月1日以降に到着するCBUのEVまたはREEVの輸入（社用車、テスト車両、ディーラー在庫）をすべて財務部門に洗い出させ、価格を見直す。',
            ],
          },
          {
            label: '今週',
            actions: [
              'どの部品がタイで物理的に製造されているか、誰が、どの数量で製造しているかを示す部品番号リストを作成する。これがMITの証拠基盤となる可能性が高い。',
              'MIT部品リストに関するFTI自動車産業クラブの作業部会の日程を入手し、参加者を指名する。',
              'OEMの場合：8項目の要望の足並みがそろうよう、ハイブリッド車の時期と一部輸入枠に関する自社の立場をJCC自動車部会に説明する。',
            ],
          },
          {
            label: '今月',
            actions: [
              '2027年の国内販売台数について、MIT基準値20%、40%、60%の3シナリオを、それぞれハイブリッド車物品税の譲歩がある場合とない場合でモデル化する。',
              '顧客集中度を見直す。売上のどれだけが国内専売の日系車種に依存し、どれだけが輸出車種に依存しているか。',
              'OEMのMIT申請やBOI申請を支えうる、書面による現地化提案（生産能力、時期、設備投資）を準備する。',
            ],
          },
          {
            label: '今四半期',
            actions: [
              'MIT認定を目指す中国の組立メーカーに供給するかどうかを、知的財産、価格、評判に関する歯止めを含めて本社レベルで決定する。',
              '2027年1月以降の税制を前提に、新車種・新ラインについてタイ、インドネシア、ベトナムの拠点経済性を再計算する。',
              '2027年のEV 3.5終了で現在の比較対象がなくなる前に、BOIの優遇措置（自動化投資の高度化措置を含む）を確保する。',
            ],
          },
        ],
      },
    },

    watchpoints: {
      headers: {
        en: ['Signal', 'If it happens', 'Implication'],
        ja: ['シグナル', '起きた場合', '示唆'],
      },
      rows: {
        en: [
          ['Ministerial regulation for 35% is published in the Royal Gazette', 'Legal certainty for 1 Jan 2027', 'Import-only brands reprice; booking rush ends'],
          ['MIT threshold set at ~40% physical Thai parts', 'Many Chinese local assemblers fall into the 15–20% tier', 'Japanese hybrids and long-localised models gain a relative cost edge'],
          ['MIT threshold set low or with broad "Thai-made" definitions', 'Most local assemblers qualify for 10%', 'Wall hits only CBU importers; competitive gap with Japanese brands persists'],
          ['Mission yields hybrid excise relief or bigger CBU import quotas for Japanese brands', 'Japanese lineup widens, prices fall', 'Positive for OEMs; mixed for suppliers if imports replace local models'],
          ['A Japanese OEM announces new Thai model or capacity after the mission', 'Next-generation allocation stays in Thailand', 'Supplier volumes stabilise from 2028'],
          ['A Japanese OEM allocates a new hybrid/EV platform to Indonesia or Vietnam', 'Hub status erodes at the margin', 'Suppliers should consider following the platform or diversifying customers'],
          ['China raises the measure formally (ACFTA or WTO)', 'Trade friction', 'Risk of delay or dilution of the MIT ladder'],
          ['No EV 3.5 successor scheme by mid-2027', 'Compensation-production obligations lapse', 'Chinese brands may cut local output, hurting Thai suppliers shared with Japanese OEMs'],
        ],
        ja: [
          ['35%税率の省令が官報に掲載される', '2027年1月1日施行の法的確実性', '輸入専業ブランドが価格を改定し、駆け込み受注が終わる'],
          ['MIT基準値がタイ製の物理的部品の約40%に設定される', '国内組立の中国メーカーの多くが15〜20%区分に入る', '日系ハイブリッド車と長く現地化してきた車種が相対的なコスト優位を得る'],
          ['MIT基準値が低く、または「タイ製」の定義が広く設定される', '国内組立メーカーの大半が10%の対象となる', '壁はCBU輸入業者にしか効かず、日系ブランドとの競争上の差は残る'],
          ['ミッションの結果、日系ブランドにハイブリッド車物品税の軽減やCBU輸入枠の拡大がもたらされる', '日系の車種ラインナップが広がり、価格が下がる', 'OEMにはプラス。輸入が国内生産車種に置き換わる場合、サプライヤーにとっては評価が分かれる'],
          ['ミッション後に日系OEMがタイでの新車種または生産能力を発表する', '次世代の配分がタイにとどまる', '2028年からサプライヤーの数量が安定する'],
          ['日系OEMが新しいハイブリッド車／EVプラットフォームをインドネシアまたはベトナムに配分する', 'ハブとしての地位が少しずつ損なわれる', 'サプライヤーはプラットフォームへの追随か顧客の多様化を検討すべきである'],
          ['中国が本措置を正式に問題提起する（ACFTAまたはWTO）', '貿易摩擦', 'MITの段階税率が遅延または骨抜きになるリスク'],
          ['2027年半ばまでにEV 3.5の後継制度がない', '補填生産の義務が失効する', '中国ブランドが国内生産を減らし、日系OEMと共通のタイのサプライヤーに打撃を与えうる'],
        ],
      },
    },

    caveats: {
      title: { en: 'Source Notes and Caveats', ja: '出典に関する注記と留意点' },
      groups: {
        en: [
          {
            title: 'Verified from primary or near-primary sources',
            tone: 'verified',
            items: [
              'Cabinet approval of 35% excise on CBU BEV/REEV from 1 January 2027, and its basis in EV Board resolutions 1/2568 and 1/2569: Thai Post and Bangkokbiznews (3 Nov 2026), quoting the Finance Minister and the Excise Department. The Royal Gazette text was not located.',
              'EV Board framework, 55% electrified share, BOI EV-ecosystem approvals and Japanese automation commitments: BOI Press Release No. 153/2569 (10 Sep 2026).',
              'FTI January–September 2026 production, sales and export data: FTI release of 27 Oct 2026 as reported by Reuters (via The Star) and The Nation.',
            ],
          },
          {
            title: 'Secondary (reputable press, not yet matched to primary documents)',
            tone: 'secondary',
            items: [
              'MIT three-tier rates and three-year period: The Nation citing Thansettakij (5 Nov 2026). **This is a proposal, not an enacted measure.**',
              'Mission delegation and agenda: The Nation and Bangkokbiznews (both 4 Nov 2026).',
              'Ambassador Otaka\'s remarks: The Nation (4 and 7 Nov 2026). The ">80,000 jobs" and ">90% local content" figures are attributed to Bangkokbiznews without a stated basis.',
              'Japanese-brand share figures: Krungsri Research (registrations, Jan–Jul 2026) and industry data for 2025 (69.3%). These use different bases (registrations vs sales) and are not directly comparable.',
            ],
          },
          {
            title: 'Conflicting figures (listed, not merged)',
            tone: 'conflicting',
            items: [
              '**Japanese BOI applications in 2025:** 302 projects / THB 113.7 bn (BOI via The Nation and Bangkokbiznews, 4 Nov 2026) versus 311 projects / about THB 119 bn (BOI Secretary-General via Khaosod, Jan 2026). The difference may reflect revisions or definitions.',
              '**Import duty on Japanese CBU cars:** Honda cites "up to 80%" (The Nation, 16 Aug 2026), while Automotive World reports a 20% rate for Japan under the bilateral agreement. Both may be correct for different vehicle categories or origin conditions. This needs checking against the Customs tariff schedule.',
              '**EV-ecosystem investment:** USD 4.59 bn / 189 projects to 31 Aug 2026 (BOI PR 153) versus "203 projects, more than THB 141 bn" to September 2026 (BOI via just-auto). The baht and dollar totals do not reconcile cleanly.',
              '**Excise for locally built EVs:** currently 2% under the existing scheme (Automotive World; Serrari) versus the proposed 10% MIT tier. It is unclear whether 10% is a future post-transition rate or a misreport. Treat as unresolved.',
            ],
          },
          {
            title: 'Not found',
            tone: 'notfound',
            items: [
              'Any official Japanese-government readout of the mission (it has not yet taken place).',
              'Any statement from Toyota responding to Indonesia\'s invitation (Thaiger reports none).',
              'Any evidence that the 2026 floods influenced the excise decision.',
              "Outcomes of Chinese Premier Li Qiang's 13–15 November visit relating to autos.",
            ],
          },
        ],
        ja: [
          {
            title: '一次または準一次情報で確認済み',
            tone: 'verified',
            items: [
              '2027年1月1日からのCBU BEV／REEVへの35%物品税の閣議承認と、その根拠であるEVボード決議第1/2568号・第1/2569号：Thai PostおよびBangkokbiznews（2026年11月3日）が財務相と物品税局の発言を引用。官報の本文は確認できていない。',
              'EVボードの枠組み、電動車比率55%、BOIのEVエコシステム認可、日系企業の自動化投資：BOIプレスリリース第153/2569号（2026年9月10日）。',
              'FTIの2026年1〜9月の生産・販売・輸出データ：2026年10月27日のFTI発表を、Reuters（The Star経由）とThe Nationが報道。',
            ],
          },
          {
            title: '二次情報（信頼できる報道。一次資料との照合は未了）',
            tone: 'secondary',
            items: [
              'MITの3段階税率と3年間の期間：The NationがThansettakijを引用（2026年11月5日）。**これは提案であり、制定された措置ではない。**',
              'ミッションの代表団と議題：The NationおよびBangkokbiznews（いずれも2026年11月4日）。',
              '大鷹大使の発言：The Nation（2026年11月4日・7日）。「8万人超の雇用」「90%超の現地調達率」という数値はBangkokbiznewsによるもので、根拠は示されていない。',
              '日系ブランドのシェア：クルンシィ・リサーチ（登録ベース、2026年1〜7月）と2025年の業界データ（69.3%）。両者は基準（登録と販売）が異なり、直接比較はできない。',
            ],
          },
          {
            title: '矛盾する数値（統合せず併記）',
            tone: 'conflicting',
            items: [
              '**2025年の日系企業のBOI申請：** 302件／1,137億バーツ（BOI、The NationおよびBangkokbiznews経由、2026年11月4日）に対し、311件／約1,190億バーツ（BOI事務局長、Khaosod経由、2026年1月）。差は改訂または定義の違いによる可能性がある。',
              '**日本からのCBU車への輸入関税：** ホンダは「最大80%」を挙げる（The Nation、2026年8月16日）一方、Automotive Worldは二国間協定のもとで日本からの輸入は20%と報じている。車両区分や原産地条件によって、どちらも正しい可能性がある。関税局の関税表との照合が必要である。',
              '**EVエコシステム投資：** 2026年8月31日までに45.9億米ドル／189件（BOI PR 153）に対し、2026年9月までに「203件、1,410億バーツ超」（BOI、just-auto経由）。バーツと米ドルの合計はきれいに整合しない。',
              '**国内生産EVの物品税：** 既存制度のもとで現在2%（Automotive World；Serrari）に対し、提案中のMIT区分は10%。10%が移行期間後の将来の税率なのか、誤報なのかは不明であり、未解決として扱う。',
            ],
          },
          {
            title: '確認できなかった事項',
            tone: 'notfound',
            items: [
              'ミッションに関する日本政府の公式発表（ミッションはまだ実施されていない）。',
              'インドネシアの誘致に対するトヨタの声明（Thaigerは声明がないと報じている）。',
              '2026年の洪水が物品税の決定に影響したことを示す証拠。',
              '中国の李強首相の11月13〜15日の訪問における自動車関連の成果。',
            ],
          },
        ],
      },
      forward: {
        en: '**Forward-looking items:** The MIT tiers, the hybrid excise path, the EV 3.5 successor and mission outcomes are **announced intentions or proposals, not enacted measures**. Calculations in Section 5 are WaLens estimates.',
        ja: '**将来に関する事項：** MITの税率区分、ハイブリッド車物品税の道筋、EV 3.5の後継制度、ミッションの成果は、**表明された意図または提案であり、制定された措置ではない。**第5節の計算はWaLensの推計である。'
      },
    },

    sources: [
      { label: 'Thailand targets Japanese investment in semiconductors and automotive manufacturing — The Nation, 4 Nov 2026', url: 'https://www.nationthailand.com/business/40073086' },
      { label: "'เอกนิติ' นำทีม 'บีโอไอ-กกร.' บุกญี่ปุ่น ดึงลงทุนเซมิคอนดักเตอร์-ยานยนต์ — Bangkokbiznews, 4 Nov 2026", url: 'https://www.bangkokbiznews.com/economics/1259210' },
      { label: 'Japan envoy urges Thailand to review EV import policy — The Nation, 7 Nov 2026', url: 'https://www.nationthailand.com/business/automobile/40073216' },
      { label: 'Japan Envoy Urges Thailand to Protect its Car Export Hub as Cheap EV Imports Surge — The Nation, 4 Nov 2026', url: 'https://www.nationthailand.com/business/economy/40073111' },
      { label: 'Cabinet approves 35% excise on imported BEV/REEV (Thai) — Thai Post, 3 Nov 2026', url: 'https://www.thaipost.net/general-news/1100911/' },
      { label: "'สรรพสามิต' เคาะภาษีนำเข้ารถยนต์ BEV-REEV ที่ 35% เริ่มบังคับใช้ 1 ม.ค. 70 — Bangkokbiznews, 3 Nov 2026", url: 'https://www.bangkokbiznews.com/economics/1259043' },
      { label: 'Thailand plans EV tax tiers tied to Thai-made components — The Nation, 5 Nov 2026', url: 'https://www.nationthailand.com/business/40073146' },
      { label: 'Thailand Overhauls Vehicle Excise Tax as EVs Capture 55% of New Car Market — BOI PR 153/2569, 10 Sep 2026', url: 'https://www.boi.go.th/upload/content/PR153_2569EN.pdf' },
      { label: 'Thai pickup sales fall 7.11% as FTI seeks easier credit (FTI Sep 2026 data) — The Nation', url: 'https://www.nationthailand.com/business/automobile/40072797' },
      { label: "Thailand's auto output falls in September as floods disrupt parts supply — The Star / Reuters, 28 Oct 2026", url: 'https://www.thestar.com.my/aseanplus/aseanplus-news/2026/10/28/thailand039s-auto-output-falls-in-september-as-floods-disrupt-parts-supply' },
      { label: 'Thai vehicle sales rise 14% in September — just-auto', url: 'https://www.just-auto.com/newsletters/thai-vehicle-sales-rise-14-in-september' },
      { label: 'Industry Outlook 2026-2028: Automotive Dealerships — Krungsri Research, 23 Sep 2026', url: 'https://www.krungsri.com/en/research/industry/industry-outlook/services/auto-dealers/io/automotive-dealerships-2026' },
      { label: 'Honda seeks review of import tariffs and hybrid tax timing in Thailand — The Nation, 16 Aug 2026', url: 'https://www.nationthailand.com/business/economy/40069855' },
      { label: 'Thai auto groups seek 32% tax on imported EVs — The Nation / ANN, May 2026', url: 'https://asianews.network/thai-auto-groups-seek-32-tax-on-imported-evs-to-protect-local-industry/' },
      { label: 'กลุ่มชิ้นส่วนยานยนต์ร้องรัฐบาลขึ้นภาษี EV นำเข้าจีน 32% — Thansettakij, 14 May 2026', url: 'https://www.thansettakij.com/motor/659035' },
      { label: 'Indonesia urges Toyota to move regional production hub from Thailand — Khaosod English, 14 Aug 2026', url: 'https://www.khaosodenglish.com/news/international/2026/08/14/indonesia-urges-toyota-to-move-regional-production-hub-from-thailand/' },
      { label: 'Purbaya urges Toyota to move production from Thailand — The Jakarta Post, 5 Aug 2026', url: 'https://www.thejakartapost.com/business/2026/08/05/purbaya-urges-toyota-to-move-production-from-thailand' },
      { label: 'Toyota expands in Vietnam while Thailand remains key production base — The Nation, 1 Sep 2026', url: 'https://www.nationthailand.com/business/40070517' },
      { label: 'Toyota invests $283.7 million to make hybrid vehicles in Vietnam — VietnamNet', url: 'https://vietnamnet.vn/en/toyota-invests-283-7-million-to-make-hybrid-vehicles-in-vietnam-2551108.html' },
      { label: "Toyota 'to expand hybrid output in Thailand' (THB 55 bn) — Bangkok Post", url: 'https://bangkokpost.com/business/motoring/2922335/toyota-to-expand-hybrid-output-in-thailand' },
      { label: 'Subaru shuts Lat Krabang plant, shifts to imported vehicles — The Nation, 30 Dec 2024', url: 'https://www.nationthailand.com/business/automobile/40044642' },
      { label: 'Suzuki to close automobile plant in Thailand — Suzuki release via Automotive World', url: 'https://www.automotiveworld.com/news-releases/suzuki-to-close-automobile-plant-in-thailand/' },
      { label: 'Suzuki Rayong plant sale to Ford — just-auto', url: 'https://www.just-auto.com/?p=189287' },
      { label: "Thailand's EV import tax hike spares China's local plants — Automotive World", url: 'https://www.automotiveworld.com/?p=508254' },
      { label: 'Excise Department watches Neta after 24,000 EV compensation units remain — The Nation, 26 Jan 2026', url: 'https://www.nationthailand.com/business/automobile/40061705' },
      { label: "Thailand plans auto tax overhaul after Indonesia's Toyota bid — The Nation, 17 Aug 2026", url: 'https://www.nationthailand.com/news/40069868' },
      { label: 'Thailand and China prepare seven agreements on trade and security — The Nation, 11 Nov 2026', url: 'https://www.nationthailand.com/business/trade/40073362' },
      { label: "WaLens: Thailand's 2026 Floods — Strategic Implications for Japanese Executives", url: 'https://walensnews.com/insights/economic-policy/thailand-flood-2026' },
    ]
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: isJapanese ? titleJa : titleEn,
    description: isJapanese ? metaDescJa : metaDescEn,
    datePublished: publishedDate,
    dateModified: publishedDate,
    inLanguage: isJapanese ? 'ja' : 'en',
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    author: { '@type': 'Organization', name: 'WaLens', url: 'https://walensnews.com' },
    publisher: {
      '@type': 'Organization',
      name: 'WaLens',
      url: 'https://walensnews.com',
      logo: { '@type': 'ImageObject', url: 'https://walensnews.com/favicon.ico' }
    },
    image: `https://walensnews.com${heroImage}`,
    isAccessibleForFree: false,
    hasPart: {
      '@type': 'WebPageElement',
      isAccessibleForFree: false,
      cssSelector: '.premium-content'
    },
  };

  // minWidth keeps multi-column tables readable on phones: they scroll sideways instead of squashing
  const renderTable = (headers: string[], rows: string[][], firstColClass = 'font-medium', minWidth = 'min-w-[640px]') => (
    <div className="overflow-x-auto -mx-2 px-2">
      <table className={`w-full text-sm ${minWidth}`}>
        <thead>
          <tr className="border-b">
            {headers.map((h, i) => (
              <th key={i} className={`text-left py-2 font-semibold ${i < headers.length - 1 ? 'pr-4' : ''}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b last:border-0">
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className={`py-3 align-top ${cIdx < row.length - 1 ? 'pr-4' : ''} ${cIdx === 0 ? firstColClass : 'text-muted-foreground'}`}
                  style={cellStyle}
                >
                  {renderBold(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderList = (items: string[], icon: React.ReactNode) => (
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex gap-2 text-sm">
          {icon}
          <span className="text-muted-foreground leading-relaxed" style={cellStyle}>{renderBold(item)}</span>
        </li>
      ))}
    </ul>
  );

  const renderNumbered = (items: string[]) => (
    <ol className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex gap-2 text-sm">
          <span className="text-primary font-mono text-xs mt-0.5 w-4 flex-shrink-0">{idx + 1}.</span>
          <span className="text-muted-foreground leading-relaxed" style={cellStyle}>{renderBold(item)}</span>
        </li>
      ))}
    </ol>
  );

  const renderParas = (paras: string[]) => paras.map((p, i) => (
    <p key={i} className="text-sm leading-relaxed text-muted-foreground" style={cellStyle}>{renderBold(p)}</p>
  ));

  const bulletIcon = <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />;

  const urgencyVariant = (u: Urgency): 'destructive' | 'secondary' | 'outline' =>
    u === 'High' ? 'destructive' : u === 'Medium' ? 'secondary' : 'outline';

  const caveatTone: Record<string, string> = {
    verified: 'border-l-emerald-500/60',
    secondary: 'border-l-blue-500/60',
    conflicting: 'border-l-amber-500/60',
    notfound: 'border-l-gray-400/60',
  };

  const signalBorders = ['border-l-red-500', 'border-l-amber-500', 'border-l-blue-500', 'border-l-purple-500', 'border-l-emerald-500', 'border-l-orange-500', 'border-l-gray-500'];

  const sectionHeader = (icon: React.ReactNode, bg: string, title: string, subtitle?: string) => (
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-2 rounded-lg ${bg}`}>{icon}</div>
      <div>
        <h2 className="text-2xl font-bold" style={cellStyle}>{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground" style={cellStyle}>{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title={(isJapanese ? titleJa : titleEn) + ' | WaLens'}
        description={isJapanese ? metaDescJa : metaDescEn}
        canonicalPath={canonicalPath}
      />
      <Helmet>
        <html lang={isJapanese ? 'ja' : 'en'} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={isJapanese ? titleJa : titleEn} />
        <meta property="og:description" content={isJapanese ? metaDescJa : metaDescEn} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`https://walensnews.com${heroImage}`} />
        <meta property="og:site_name" content="WaLens" />
        <meta property="og:locale" content={isJapanese ? 'ja_JP' : 'en_US'} />
        <meta property="og:locale:alternate" content={isJapanese ? 'en_US' : 'ja_JP'} />
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:modified_time" content={publishedDate} />
        <meta property="article:section" content="Economic Policy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isJapanese ? titleJa : titleEn} />
        <meta name="twitter:description" content={isJapanese ? metaDescJa : metaDescEn} />
        <meta name="twitter:image" content={`https://walensnews.com${heroImage}`} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl} />
        <link rel="alternate" hrefLang="ja" href={canonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero */}
        <section className="relative w-full min-h-[380px] md:min-h-[460px] flex items-end overflow-hidden">
          <img src={heroImage} alt="Rows of finished cars on a factory line with a map of Southeast Asia — Thailand auto hub analysis for Japanese executives" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />
          <div className="relative z-20 container mx-auto px-4 pt-16 pb-10">
            <Badge variant="outline" className="mb-3 bg-blue-500/20 text-blue-200 border-blue-500/30">
              <Sparkles className="h-3 w-3 mr-1" />
              {content.category[L]}
            </Badge>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight max-w-4xl" style={cellStyle}>
              {content.headline[L]}
            </h1>
            <p className="text-sm md:text-base text-gray-200 italic max-w-4xl leading-relaxed" style={cellStyle}>
              {content.subheadline[L]}
            </p>
            <div className="flex items-center gap-3 mt-4 text-sm text-gray-300 flex-wrap">
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
                  url: canonicalPath,
                  category: 'Economic Policy'
                }}
                variant="button"
                className="text-white border-white/50 hover:bg-white/20 bg-white/10"
              />
            </div>
          </div>
        </section>

        <main className="container mx-auto px-4 py-8">
          {/* Verification note — visible to everyone */}
          <Card className="mb-6 bg-muted/40 border-dashed">
            <CardContent className="pt-4 pb-4">
              <div className="flex gap-3">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-xs leading-relaxed text-muted-foreground" style={cellStyle}>
                  <span className="font-semibold text-foreground">{content.verificationNote.title[L]}{colon}</span>{' '}
                  {renderBold(content.verificationNote[L])}
                </p>
              </div>
            </CardContent>
          </Card>

          <Breadcrumb items={[
            { label: isJapanese ? 'インサイト' : 'Insights', href: '/insights' },
            { label: isJapanese ? '経済政策' : 'Economic Policy', href: '/insights?filter=economic-policy' },
            { label: isJapanese ? 'タイ自動車ハブと訪日ミッション2026' : 'Thailand Auto Hub & Japan Mission 2026' }
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
                    <span style={cellStyle}>{section.label}</span>
                    {idx >= 4 && <Lock className="h-3 w-3 text-amber-500" />}
                    <ChevronRight className="h-3 w-3 ml-auto text-muted-foreground" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 01 Executive Brief */}
          <section id="executive-summary" className="mb-12 scroll-mt-20">
            {sectionHeader(<FileText className="h-6 w-6 text-primary" />, 'bg-primary/10', isJapanese ? 'エグゼクティブサマリー' : 'Executive Summary', isJapanese ? '経営層のための要約' : 'Key insights for decision makers')}
            <Card className="border-l-4 border-l-primary mb-6">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {content.executiveSummary[L].map((point, idx) => (
                    <li key={idx} className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed" style={cellStyle}>{renderBold(point)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-muted/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  {content.executiveBrief.title[L]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground" style={cellStyle}>
                  {content.executiveBrief[L].join(isJapanese ? '' : ' ')}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 02 Policy & Event Overview */}
          <section id="overview" className="mb-12 scroll-mt-20">
            {sectionHeader(<Database className="h-6 w-6 text-blue-500" />, 'bg-blue-500/10', isJapanese ? '政策・イベント概要' : 'Policy & Event Overview', content.overview.intro[L])}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {content.overview.items[L].map((item, idx) => (
                <Card key={idx} className="border-l-4 border-l-blue-500/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base" style={cellStyle}>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {renderParas(item.body)}
                    {item.bullets && renderList(item.bullets, bulletIcon)}
                    {item.after && renderParas(item.after)}
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-500" />
                  {content.overview.keyNumbers.title[L]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderTable(content.overview.keyNumbers.headers[L], content.overview.keyNumbers.rows[L])}
              </CardContent>
            </Card>
          </section>

          {/* 03 Timeline */}
          <section id="timeline" className="mb-12 scroll-mt-20">
            {sectionHeader(<Clock className="h-6 w-6 text-purple-500" />, 'bg-purple-500/10', isJapanese ? 'タイムライン' : 'Timeline')}
            <Card className="mb-6">
              <CardContent className="pt-6">
                {renderTable(content.timeline.headers[L], content.timeline.rows[L], 'font-semibold text-primary whitespace-nowrap')}
              </CardContent>
            </Card>
            <Card className="bg-muted/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  {content.timeline.connect.title[L]}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground" style={cellStyle}>{content.timeline.connect.intro[L]}</p>
                {renderNumbered(content.timeline.connect.steps[L])}
                <p className="text-sm leading-relaxed text-muted-foreground" style={cellStyle}>{renderBold(content.timeline.connect.closing[L])}</p>
              </CardContent>
            </Card>
          </section>

          {/* 04 Key Intelligence Signals */}
          <section id="signals" className="mb-12 scroll-mt-20">
            {sectionHeader(<TrendingUp className="h-6 w-6 text-emerald-500" />, 'bg-emerald-500/10', isJapanese ? '主要インテリジェンスシグナル' : 'Key Intelligence Signals', isJapanese ? '主な不確実性と注視すべき指標' : 'Key uncertainties and indicators to watch')}
            {/* Desktop: table */}
            <Card className="hidden md:block border-l-4 border-l-emerald-500">
              <CardContent className="pt-6">
                {renderTable(content.signals.headers[L], content.signals.rows[L], 'font-semibold', 'min-w-[760px]')}
              </CardContent>
            </Card>
            {/* Mobile: coloured border cards */}
            <div className="md:hidden space-y-3">
              {content.signals.rows[L].map((row, idx) => (
                <Card key={idx} className={`border-l-4 ${signalBorders[idx % signalBorders.length]}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base" style={cellStyle}>{row[0]}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {row.slice(1).map((cell, cIdx) => (
                      <div key={cIdx}>
                        <p className="text-xs font-semibold text-foreground">{content.signals.headers[L][cIdx + 1]}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed" style={cellStyle}>{renderBold(cell)}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* PAYWALL */}
          {!hasFullAccess ? (
            <Card className="mb-12 border-amber-500/30 bg-amber-500/5">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Lock className="h-12 w-12 text-amber-500 mx-auto" />
                  <h3 className="text-xl font-bold">
                    {isJapanese ? 'プレミアムコンテンツ' : 'Premium Content'}
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto" style={cellStyle}>
                    {isJapanese
                      ? '定量分析（WaLens推計）、競争・戦略ダイナミクス、セクター別戦略判断、次のアクション、戦略的ウォッチポイント、出典を含む完全版レポートにアクセスするにはプレミアムプランが必要です。'
                      : 'The full quantitative analysis (WaLens estimates), competitive & strategic dynamics, sector decision guide, next action insights, strategic watchpoints and sources require a premium subscription.'
                    }
                  </p>
                  <div className="flex gap-3 justify-center flex-wrap">
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
            <div className="premium-content">
              {/* 05 Quantitative Analysis */}
              <section id="analysis" className="mb-12 scroll-mt-20" onClick={handleDataAppendixAccess}>
                {sectionHeader(<Calculator className="h-6 w-6 text-purple-500" />, 'bg-purple-500/10', isJapanese ? '定量分析' : 'Quantitative Analysis')}
                <div className="mb-6 flex items-start gap-2 rounded-md border border-purple-500/30 bg-purple-500/5 px-4 py-3">
                  <Badge variant="outline" className="border-purple-500/50 text-purple-600 dark:text-purple-300 flex-shrink-0">
                    {isJapanese ? 'WaLens推計' : 'WaLens estimates'}
                  </Badge>
                  <p className="text-sm italic text-muted-foreground" style={cellStyle}>{content.analysis.label[L]}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.analysis.blocks[L].map((block, idx) => (
                    <Card key={idx} className="border-l-4 border-l-purple-500/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base" style={cellStyle}>{block.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {renderParas(block.paras)}
                        {block.bullets && renderList(block.bullets, bulletIcon)}
                        {block.after && renderParas(block.after)}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* 06 Competitive & Strategic Dynamics */}
              <section id="competitive" className="mb-12 scroll-mt-20" onClick={handleDataAppendixAccess}>
                {sectionHeader(<Globe className="h-6 w-6 text-blue-500" />, 'bg-blue-500/10', isJapanese ? '競争・戦略ダイナミクス' : 'Competitive & Strategic Dynamics')}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card className="border-l-4 border-l-blue-500/50">
                    <CardContent className="pt-6">
                      {renderParas([content.competitive.whoWins[L]])}
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-blue-500/50">
                    <CardContent className="pt-6 space-y-3">
                      {renderParas([content.competitive.whereJapan[L]])}
                      {renderList(content.competitive.asks[L], bulletIcon)}
                      {renderParas([content.competitive.lever[L]])}
                    </CardContent>
                  </Card>
                </div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Factory className="h-5 w-5 text-blue-500" />
                      {content.competitive.regional.title[L]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {renderTable(content.competitive.regional.headers[L], content.competitive.regional.rows[L], 'font-semibold whitespace-nowrap')}
                    {renderParas([content.competitive.relocation[L]])}
                  </CardContent>
                </Card>
                <Card className="bg-muted/40">
                  <CardContent className="pt-6">
                    {renderParas([content.competitive.suppliers[L]])}
                  </CardContent>
                </Card>
              </section>

              {/* 07 Sector Decision Guide */}
              <section id="sector-guide" className="mb-12 scroll-mt-20" onClick={handleDataAppendixAccess}>
                {sectionHeader(<Target className="h-6 w-6 text-amber-500" />, 'bg-amber-500/10', isJapanese ? 'セクター別戦略判断' : 'Sector Decision Guide')}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.sectorGuide.items.map((s, idx) => {
                    const d = s[L];
                    return (
                      <Card key={idx} className="border-l-4 border-l-amber-500/50">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between gap-3">
                            <CardTitle className="text-base" style={cellStyle}>{d.sector}</CardTitle>
                            <Badge variant={urgencyVariant(s.urgency)} className="flex-shrink-0">
                              {content.sectorGuide.labels.urgency[L]}: {content.sectorGuide.urgencyLabel[s.urgency][L]}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <p className="text-muted-foreground" style={cellStyle}>
                            <span className="font-semibold text-foreground">{content.sectorGuide.labels.relevance[L]}{colon}</span>{d.relevance}
                          </p>
                          <p className="text-muted-foreground" style={cellStyle}>
                            <span className="font-semibold text-foreground">{content.sectorGuide.labels.exposure[L]}{colon}</span>{d.exposure}
                          </p>
                          <p className="text-muted-foreground leading-relaxed pt-1" style={cellStyle}>{d.stance}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </section>

              {/* 08 Next Action Insights */}
              <section id="next-actions" className="mb-12 scroll-mt-20" onClick={handleDataAppendixAccess}>
                {sectionHeader(<CheckCircle className="h-6 w-6 text-emerald-500" />, 'bg-emerald-500/10', isJapanese ? '次のアクション' : 'Next Action Insights')}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.nextActions.horizons[L].map((horizon, idx) => (
                    <Card key={idx} className="border-t-4 border-t-primary">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base" style={cellStyle}>{horizon.label}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {renderNumbered(horizon.actions)}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* 09 Strategic Watchpoints */}
              <section id="watchpoints" className="mb-12 scroll-mt-20" onClick={handleDataAppendixAccess}>
                {sectionHeader(<AlertTriangle className="h-6 w-6 text-red-500" />, 'bg-red-500/10', isJapanese ? '戦略的ウォッチポイント' : 'Strategic Watchpoints')}
                <Card className="border-l-4 border-l-red-500/50">
                  <CardContent className="pt-6">
                    {renderTable(content.watchpoints.headers[L], content.watchpoints.rows[L], 'font-semibold')}
                  </CardContent>
                </Card>
              </section>

              {/* 10 Sources */}
              <section id="sources" className="mb-12 scroll-mt-20" onClick={handleDataAppendixAccess}>
                {sectionHeader(<BookOpen className="h-6 w-6 text-gray-500" />, 'bg-gray-500/10', isJapanese ? '出典' : 'Sources')}
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{content.caveats.title[L]}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {content.caveats.groups[L].map((g, idx) => (
                      <div key={idx} className={`border-l-4 pl-4 ${caveatTone[g.tone]}`}>
                        <p className="text-sm font-semibold mb-2" style={cellStyle}>{g.title}</p>
                        {renderList(g.items, bulletIcon)}
                      </div>
                    ))}
                    <p className="text-sm leading-relaxed text-muted-foreground pt-2" style={cellStyle}>{renderBold(content.caveats.forward[L])}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <ol className="space-y-1.5 text-sm text-muted-foreground">
                      {content.sources.map((source, idx) => (
                        <li key={idx} className="flex gap-2" style={cellStyle}>
                          <span className="font-mono text-xs mt-0.5 w-6 flex-shrink-0 text-right">{idx + 1}.</span>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {source.label}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </section>

              <FurtherInquiryNotice />
            </div>
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

export default ThailandAutoHubJapanMission2026;
