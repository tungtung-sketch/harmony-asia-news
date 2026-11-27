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
  ChevronRight, Crown, Database, Sparkles, Globe, Clock, Calculator, Info, Target, ArrowRight
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-data-centre-cooling.jpg';

// JP translation drafted by Claude — to be reviewed before marketing push

type Bi<T> = { en: T; ja: T };
type Urgency = 'High' | 'Medium' | 'Low' | 'Monitor';

const ThailandNvidiaServerHalt2026 = () => {
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

  const slug = 'thailand-nvidia-server-halt-2026';
  const titleEn = "Nvidia's Thailand Server Shipment Halt: What It Means for Thailand's Data-Centre Investment";
  const titleJa = 'エヌビディアのタイ向けサーバー出荷停止：データセンター投資は「中止」ではなく「選別と遅延」へ';
  const publishedDate = '2026-11-27';
  const canonicalPath = '/insights/investment/thailand-nvidia-server-halt-2026';
  const canonicalUrl = `https://walensnews.com${canonicalPath}`;

  const metaDescEn = 'A US licensing rule took effect 19 Nov 2026 and Nvidia reportedly paused server shipments to Thailand. What is confirmed, what is not, and what Japanese investors, lenders and suppliers should do now.';
  const metaDescJa = '米国のライセンス規則が2026年11月19日に発効し、エヌビディアがタイ向けサーバー出荷を停止したと報じられた。確認された事実と未確認の事項、日系の投資家・金融機関・サプライヤーが今すべき対応を整理する。';

  useEffect(() => {
    if (hasFullAccess && !hasLoggedView) {
      logView(slug, isJapanese ? titleJa : titleEn, 'investment', lang);
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker(slug, titleEn, titleJa, 'Investment', hasFullAccess);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(slug, isJapanese ? titleJa : titleEn, 'investment', lang);
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
    { id: 'overview', label: isJapanese ? '事象の概要' : 'Overview' },
    { id: 'timeline', label: isJapanese ? 'タイムライン' : 'Timeline' },
    { id: 'signals', label: isJapanese ? '主要インテリジェンスシグナル' : 'Key Intelligence Signals' },
    { id: 'analysis', label: isJapanese ? '定量分析' : 'Quantitative Analysis' },
    { id: 'competitive', label: isJapanese ? '競争・戦略ダイナミクス' : 'Competitive Dynamics' },
    { id: 'sector-guide', label: isJapanese ? 'セクター別戦略判断' : 'Sector Decision Guide' },
    { id: 'next-actions', label: isJapanese ? '次のアクション' : 'Next Action Insights' },
    { id: 'watchpoints', label: isJapanese ? '戦略的ウォッチポイント' : 'Strategic Watchpoints' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: { en: titleEn, ja: titleJa },
    subheadline: {
      en: 'What is confirmed is a US licensing rule (in force since 19 Nov 2026); what is reported, but not confirmed by Nvidia, is a pause on servers carrying Nvidia chips to Thailand. Expect delay, re-sorting of tenants and tighter financing — not a collapse of the pipeline — but only licensed, non-China-linked and US-hyperscaler-anchored capacity keeps its schedule.',
      ja: '確認されているのは米国のライセンス規則（2026年11月19日施行）であり、報じられてはいるがエヌビディアが確認していないのは、同社チップを搭載したサーバーのタイ向け出荷停止である。想定すべきはパイプラインの崩壊ではなく、遅延、テナントの選別、融資の引き締めである。ただし予定どおり進むのは、ライセンスを得た、中国と関係のない、米国のハイパースケーラーを核とする容量だけである。'
    },
    category: { en: 'Investment / Trade & Export Controls', ja: '投資 / 貿易・輸出管理' },
    lastUpdated: publishedDate,

    reportMeta: {
      rows: {
        en: [
          ['Audience', 'Japanese executives in Thailand (country heads, factory GMs, regional CFOs, data-centre and infrastructure investors)'],
          ['Published', 'November 2026 (as of 27 Nov 2026, 14:00 ICT)'],
          ['Primary sources', 'US BIS interim final rule "Addressing Remote Access to Advanced Semiconductors" (via law-firm analyses; Federal Register text not read directly), Thai Commerce Ministry statements, Thai BOI figures (via press), SEC filings; FT/WSJ/Reuters/Bloomberg via secondary reports'],
        ],
        ja: [
          ['対象読者', '在タイ日系企業の経営層（国・地域統括責任者、工場長、地域CFO、データセンター・インフラ投資家）'],
          ['公開', '2026年11月（2026年11月27日14時〈タイ時間〉時点）'],
          ['主な出典', '米商務省産業安全保障局（BIS）の暫定最終規則「Addressing Remote Access to Advanced Semiconductors」（法律事務所の分析経由。連邦官報の原文は直接確認していない）、タイ商務省の声明、タイ投資委員会（BOI）の数値（報道経由）、米証券取引委員会（SEC）への提出書類、FT・WSJ・Reuters・Bloombergの報道（二次報道経由）'],
        ],
      },
    },

    headlineCheck: {
      title: { en: 'Headline check (read first)', ja: 'ヘッドラインの検証（最初にお読みください）' },
      intro: {
        en: 'The user-facing headline "Nvidia stops exporting chips to Thailand" overstates what is verified.',
        ja: '「エヌビディアがタイへのチップ輸出を停止」という見出しは、確認されている事実を誇張している。'
      },
      items: {
        en: [
          'The legal instrument is a **US Commerce/BIS licence requirement**, not an Nvidia decision.',
          'The Nvidia action is **reported** (FT, 26 Nov, three unnamed sources; WSJ similar) as an instruction to partners such as Dell and Supermicro to **pause shipments of servers containing its chips** to Thailand, Malaysia, Singapore and Indonesia.',
          'Nvidia, Dell, Supermicro and BIS had **not publicly confirmed** it as of the sources read; **duration is unknown**.',
          'No individual Thai data-centre cancellation had been confirmed as of 27 Nov.',
        ],
        ja: [
          '法的な手段は**米商務省・BISのライセンス要件**であり、エヌビディアの決定ではない。',
          'エヌビディアの措置は、DellやSupermicroなどの提携企業に対し、タイ、マレーシア、シンガポール、インドネシア向けに**同社チップを搭載したサーバーの出荷を停止する**よう指示したものと**報じられている**（FT、11月26日、匿名の関係者3人。WSJも同様）。',
          '参照した情報源の時点で、エヌビディア、Dell、Supermicro、BISはいずれもこれを**公に確認しておらず**、**期間も不明**である。',
          '11月27日時点で、タイの個別データセンター案件の中止は確認されていない。',
        ],
      },
    },

    executiveSummary: {
      en: [
        '**What is decided:** The US rule requires licences (case-by-case, no licence exceptions) for advanced chips going to Thailand, Malaysia, Singapore, Indonesia and Brazil, effective 19 Nov 2026; shipments to US-headquartered end users are excluded subject to monthly reporting. Nvidia\'s reported server pause is a compliance reaction one week later, with no end date.',
        '**Exposure:** Thailand has about 216 MW live and about 944 MW under construction or planned (BMI, Q2 2026), against ฿1.7 trillion of BOI applications in Jan–Sep 2026. Most exposed: GPU-rental ("neocloud") operators and China-linked projects (OCBC: 38.4% of approved capacity). Least exposed: US hyperscalers.',
        '**Strategic stance:** Treat this as a 3–12 month schedule and financing shock, not a cancellation event. Japanese investors, lenders and suppliers should re-underwrite tenant mix and delivery dates now, and position as the "clean-compliance" counterparty.',
      ],
      ja: [
        '**決定事項：** 米国の規則は、タイ、マレーシア、シンガポール、インドネシア、ブラジル向けの先端半導体にライセンス（個別審査、ライセンス例外なし）を義務付け、2026年11月19日に施行された。米国に本社を置くエンドユーザー向けの出荷は、月次報告を条件に対象外となる。報じられたエヌビディアのサーバー出荷停止は、その1週間後のコンプライアンス上の対応であり、終了時期は示されていない。',
        '**エクスポージャー：** タイで稼働中の容量は約216MW、建設中・計画中は約944MWである（BMI、2026年第2四半期）。これに対し、2026年1〜9月のBOI申請額は1.7兆バーツに上る。最も影響を受けるのはGPUレンタル事業者（「ネオクラウド」）と中国系の案件（OCBC：承認済み容量の38.4%）であり、影響が最も小さいのは米国のハイパースケーラーである。',
        '**戦略的スタンス：** これは中止イベントではなく、3〜12カ月の工程・資金調達上のショックとして扱うべきである。日系の投資家、金融機関、サプライヤーは、テナント構成と納期を今すぐ再評価し、「クリーンなコンプライアンス」を備えた取引相手として自らを位置づけるべきである。',
      ]
    },
    executiveBrief: {
      title: { en: 'Executive Brief', ja: 'エグゼクティブブリーフ' },
      en: [
        'The US Bureau of Industry and Security required licences for advanced-chip exports to five countries including Thailand, effective 19 November 2026.',
        'One week later, on 26 November, the FT reported that Nvidia told partners to halt server shipments to Thailand, but Nvidia has not confirmed it and the duration is unknown.',
        'The largest impact falls on GPU-cloud operators dependent on China-linked tenants and on half-built projects still waiting for servers.',
        'No Thai data-centre cancellation is confirmed, so the base case is delay and sorting rather than cancellation.',
        'Japanese firms should re-check tenant mix, delivery dates and financing terms this week.',
      ],
      ja: [
        '米商務省産業安全保障局（BIS）は2026年11月19日付で、タイを含む5カ国向けの先端半導体輸出にライセンスを義務付けた。',
        'その1週間後の11月26日、エヌビディアが提携メーカーにタイ向けサーバー出荷の停止を指示したとFTが報じたが、同社は確認しておらず期間も不明である。',
        '最大の影響は、中国系テナントに依存するGPUクラウド事業者と、サーバー未着の建設途上案件に及ぶ。',
        '現時点でタイのデータセンター案件の中止は確認されておらず、基本シナリオは「中止」ではなく「遅延と選別」である。',
        '日系企業は、テナント構成・納期・融資条件の再点検を今週中に行うべきである。',
      ]
    },

    overview: {
      blocks: {
        en: [
          { title: 'What the rule does (secondary legal analyses; Federal Register text not read directly)', body: 'The interim final rule, released 16 Nov and effective on Federal Register publication on 19 Nov, extends destination-based advanced-computing licence requirements to Brazil, Indonesia, Malaysia, Singapore and Thailand. Applications are reviewed case by case; no licence exceptions; covered items are not eligible for de minimis treatment. A consignee or end user headquartered in the US (or with a US-headquartered ultimate parent) is excluded from the new requirement, provided the exporter files monthly reports with BIS. A separate worldwide end-use control targets data centres that provide more than 12 million aggregate TPP of compute to companies headquartered in China, Macau or other Country Group D:5. Data centres already doing so have 90 days to obtain a licence. The rule also formally rescinds the AI Diffusion Rule.' },
          { title: 'What Nvidia reportedly did', body: 'FT (26 Nov, three people familiar) and WSJ: Nvidia told Dell and Supermicro to stop shipping servers with its chips to the four countries (Brazil is not named in the reports) while it assesses whether regional partners meet US requirements. A cloud executive told the FT there is no clear guidance on how to apply for licences.' },
          { title: 'Thai government response (confirmed)', body: 'The Commerce Ministry said on 18 Nov that chip-supply uncertainty could affect data-centre investment and expansion and that licensing could raise importers\' costs; it is seeking clarification from US officials. Deputy PM and Commerce Minister Suphajee Suthumpun ordered an assessment, citing that US chips in the categories examined are about 0.7% of Thailand\'s chip imports, and asked that it cover chip leasing and computing services supplied to overseas customers.' },
        ],
        ja: [
          { title: '規則の内容（法律事務所の二次分析による。連邦官報の原文は直接確認していない）', body: '暫定最終規則は11月16日に公表され、11月19日の連邦官報掲載をもって施行された。仕向地を基準とする先端コンピューティング関連のライセンス要件を、ブラジル、インドネシア、マレーシア、シンガポール、タイに拡大するものである。申請は個別に審査され、ライセンス例外はなく、対象品目はデミニミス（僅少）扱いの対象外である。荷受人またはエンドユーザーが米国に本社を置く場合（または最終親会社が米国本社の場合）は、輸出者がBISに月次報告を提出することを条件に、新たな要件の対象外となる。これとは別に、中国、マカオ、その他の国グループD:5に本社を置く企業に合計1,200万TPP超の計算能力を提供するデータセンターを対象とする、全世界共通の最終用途規制が設けられた。すでにそうしたサービスを提供しているデータセンターには、ライセンス取得まで90日の猶予がある。この規則はAI拡散規則（AI Diffusion Rule）も正式に撤回している。' },
          { title: 'エヌビディアが行ったと報じられていること', body: 'FT（11月26日、関係者3人）とWSJによれば、エヌビディアはDellとSupermicroに対し、地域のパートナーが米国の要件を満たしているかを評価する間、同社チップを搭載したサーバーの4カ国向け出荷を停止するよう指示した（報道ではブラジルは挙げられていない）。あるクラウド企業の幹部はFTに対し、ライセンスの申請方法について明確な指針がないと語っている。' },
          { title: 'タイ政府の対応（確認済み）', body: '商務省は11月18日、チップ供給の不確実性がデータセンターへの投資と拡張に影響しうること、ライセンス制度が輸入業者のコストを押し上げうることを指摘し、米国当局に説明を求めているとした。スパジー・スタムパン副首相兼商務相は影響評価を指示し、調査対象の品目区分では米国製チップがタイのチップ輸入の約0.7%であることを挙げたうえで、海外顧客向けのチップのリースや計算サービスも評価の対象に含めるよう求めた。' },
        ],
      } as Bi<{ title: string; body: string }[]>,
      keyNumbers: {
        title: { en: 'Key Numbers', ja: '主要数値' },
        headers: {
          en: ['Metric', 'Figure', 'Source / status'],
          ja: ['指標', '数値', '出典・ステータス'],
        },
        rows: {
          en: [
            ['BIS rule released / effective', '16 Nov / 19 Nov 2026', 'Law-firm analyses (Morgan Lewis, Wiley, Eversheds) — secondary'],
            ['Countries needing licence', 'Thailand, Malaysia, Singapore, Indonesia, Brazil', 'Law-firm analyses; press'],
            ['Licence review policy', 'Case by case; no licence exceptions; no de minimis', 'Morgan Lewis — secondary'],
            ['US-HQ exclusion', 'Applies if consignee/end user US-headquartered; monthly BIS reports (§743.10)', 'Morgan Lewis — secondary'],
            ['Remote-access end-use control', '>12 million aggregate TPP to D:5/Macau-HQ companies', 'Pillsbury, Morgan Lewis — secondary'],
            ['90-day licence window for existing data centres', 'Ends about 17 Feb 2027 (19 Nov + 90 days; my calculation)', 'Rule per law firms; date is estimate. Asia Times cites "enforcement on Dec 1" — **conflicting, unverified**'],
            ['Public comment deadline', '18 Jan 2027 (HLC) vs 19 Jan 2027 (Eversheds)', '**Conflicting**'],
            ['Nvidia server pause', 'Reported 26 Nov; duration unknown', 'FT/WSJ via Bangkok Post, Thairath, TechCrunch — **not confirmed by Nvidia**'],
            ['Megaspeed (Thailand) Entity List', 'Added 23 Nov; 7 Southeast Asian entities in total; Federal Register 25 Nov', 'Thai Examiner (secondary) citing official action; allegation of diversion is unproven'],
            ['US chips share of Thai chip imports', '~0.7%', 'Commerce Minister (via Thai Examiner, ANN); scope of "categories examined" unclear'],
            ['BOI-promoted data-centre projects', '57 (17 operating, 20 with construction permits, 20 in progress/monitoring)', 'Thairath, 27 Nov (press, citing BOI)'],
            ['BOI applications Jan–Sep 2026', '฿1.707 trillion (+28% YoY); foreign ฿1.55 trillion (+62%); digital ฿1.175 trillion (68.8%)', 'Thai Examiner, MGR (press). Applications, not realised investment'],
            ['AI supply-chain applications', '111 projects, ~฿1.2 trillion (~70%); also quoted as >$35.3bn', 'MGR; Thai Examiner — figures differ in basis'],
            ['Live vs pipeline capacity', '~216 MW live; ~944 MW under construction/planned (Q2 2026)', 'BMI via Green Design Consulting, Jakarta Market Lab — secondary'],
            ['China-linked share of approved capacity', '38.4%', 'OCBC Group Research, 19 Nov (via MGR); weighting methodology not disclosed'],
            ['GMI Cloud (Thailand) financing', '$300m (≈฿10bn); private-credit fund withdrew; Tencent planned user', 'Bloomberg 25 Nov via MGR, Asia Times — project not confirmed cancelled'],
            ['Aolani financing', '~$500m (≈฿16bn) paused; ByteDance as planned tenant', 'Thairath, Thai Examiner — **location conflicts** (Thairath: regional; Thai Examiner: Malaysian)'],
            ['Bridge Data Centres (Malaysia)', '$6.6bn debt package stalled', 'Asia Times — secondary'],
          ],
          ja: [
            ['BIS規則の公表／施行', '2026年11月16日／11月19日', '法律事務所の分析（Morgan Lewis、Wiley、Eversheds）— 二次情報'],
            ['ライセンスが必要な国', 'タイ、マレーシア、シンガポール、インドネシア、ブラジル', '法律事務所の分析、報道'],
            ['ライセンス審査方針', '個別審査、ライセンス例外なし、デミニミス適用なし', 'Morgan Lewis — 二次情報'],
            ['米国本社の除外', '荷受人・エンドユーザーが米国本社の場合に適用。BISへの月次報告（§743.10）', 'Morgan Lewis — 二次情報'],
            ['リモートアクセスの最終用途規制', 'D:5・マカオ本社の企業向けに合計1,200万TPP超', 'Pillsbury、Morgan Lewis — 二次情報'],
            ['既存データセンターの90日ライセンス猶予', '2027年2月17日ごろ終了（11月19日＋90日。筆者の計算）', '規則は法律事務所による。日付は推計。Asia Timesは「12月1日に執行」としている — **矛盾、未確認**'],
            ['意見募集の締切', '2027年1月18日（HLC）／2027年1月19日（Eversheds）', '**矛盾**'],
            ['エヌビディアのサーバー出荷停止', '11月26日に報道。期間は不明', 'FT／WSJ（Bangkok Post、Thairath、TechCrunch経由）— **エヌビディアは未確認**'],
            ['Megaspeed（タイ）のエンティティリスト掲載', '11月23日に追加。東南アジアで計7社。連邦官報掲載は11月25日', 'Thai Examiner（二次情報）が公式措置を引用。転用の疑惑は未証明'],
            ['タイのチップ輸入に占める米国製の比率', '約0.7%', '商務相（Thai Examiner、ANN経由）。「調査対象の品目区分」の範囲は不明'],
            ['BOI奨励のデータセンター案件', '57件（稼働17件、建設許可取得20件、進行中・監視中20件）', 'Thairath、11月27日（BOIを引用した報道）'],
            ['BOI申請（2026年1〜9月）', '1.707兆バーツ（前年比+28%）。外国企業1.55兆バーツ（+62%）。デジタル1.175兆バーツ（68.8%）', 'Thai Examiner、MGR（報道）。申請額であり、実現した投資額ではない'],
            ['AIサプライチェーン関連の申請', '111件、約1.2兆バーツ（約70%）。353億ドル超とする数値もある', 'MGR；Thai Examiner — 数値の基準が異なる'],
            ['稼働中と計画中の容量', '稼働中約216MW、建設中・計画中約944MW（2026年第2四半期）', 'BMI（Green Design Consulting、Jakarta Market Lab経由）— 二次情報'],
            ['承認済み容量に占める中国系の比率', '38.4%', 'OCBCグループ・リサーチ、11月19日（MGR経由）。加重方法は非公表'],
            ['GMI Cloud（タイ）の資金調達', '3億ドル（約100億バーツ）。プライベートクレジット・ファンドが撤退。Tencentが利用予定', 'Bloomberg 11月25日（MGR、Asia Times経由）— 案件の中止は未確認'],
            ['Aolaniの資金調達', '約5億ドル（約160億バーツ）が停止。ByteDanceがテナント予定', 'Thairath、Thai Examiner — **所在地の情報が矛盾**（Thairath：地域、Thai Examiner：マレーシア）'],
            ['Bridge Data Centres（マレーシア）', '66億ドルの融資パッケージが停滞', 'Asia Times — 二次情報'],
          ],
        },
      },
      related: {
        title: { en: 'Related WaLens report', ja: '関連するWaLensレポート' },
        to: '/insights/investment/thailand-data-centre-pitching-2026',
        label: {
          en: 'Thailand Moves New Data Centres to Competitive Pitching (29 Oct 2026)',
          ja: 'タイ、新規データセンターを「競争選抜（ピッチング）」へ（2026年10月29日）'
        },
      },
    },

    timeline: {
      headers: { en: ['Date', 'Event', 'Source'], ja: ['日付', '出来事', '出典'] },
      rows: {
        en: [
          ['May 2025', 'BIS announces it will stop enforcing the Biden-era AI Diffusion Rule', 'Squire Patton Boggs (secondary)'],
          ['Since 2024 (reported)', 'US investigators examine Megaspeed', 'Thai Examiner — reported, unverified'],
          ['Apr 2026', 'BOI stops approving new data-centre projects (Thai press); government sets up a data-centre policy committee', 'Bangkokbiznews, Kaohoon — **conflicts with May approvals below, unresolved**'],
          ['6 May 2026', 'BOI approves large digital projects; TikTok System (Thailand) ฿842bn is the largest (total quoted ฿913bn or ฿958bn depending on source)', 'Earlier WaLens research; Green Design Consulting, DC Market Insights — **conflicting totals**'],
          ['Jun 2026', 'WaLens covers the AI/data-centre boom and talent gap', 'Prior WaLens work'],
          ['Aug–Oct 2026', 'Government data-centre policy board meets; 166 projects temporarily paused pending common rules', 'Thansettakij; Maverick Consulting Group (secondary)'],
          ['29 Oct 2026', 'WaLens report: new data centres move to competitive pitching; 83 existing facilities grandfathered', 'WaLens'],
          ['12 Nov 2026', 'Nvidia announces Jensen Huang\'s departure (reported amid espionage/personal-conduct allegations); reinstated 23 Nov', 'Thai Examiner, Forbes Japan/Reuters — corporate action confirmed, allegations unverified'],
          ['16 Nov 2026', 'BIS releases the interim final rule', 'Law firms'],
          ['17 Nov 2026', 'Thailand and US announce substantial progress in trade talks; proposed Section 301 tariff ceiling up to 18% for Thailand, final US decision expected March 2027', 'Thailand Business News'],
          ['18 Nov 2026', 'Thai Commerce Ministry flags chip-access concerns', 'ANN'],
          ['19 Nov 2026', 'Rule effective; OCBC note on 38.4% China-linked share', 'Law firms; MGR'],
          ['23 Nov 2026', 'Megaspeed (Thailand) and six affiliated entities added to Entity List', 'Thai Examiner; Thailand Business News'],
          ['25 Nov 2026', 'Bloomberg: banks review multi-billion-dollar Asian data-centre loans tied to ByteDance, Alibaba, Tencent', 'MGR; Asia Times'],
          ['**26 Nov 2026**', '**FT/WSJ: Nvidia server shipment pause to four countries**', 'Bangkok Post, TechCrunch, Kyodo'],
          ['1 Dec 2026', 'Jensen Huang congressional testimony (per Asia Times)', 'Asia Times — single source'],
          ['~17 Feb 2027', 'End of 90-day licence window (estimate)', 'Calculated'],
        ],
        ja: [
          ['2025年5月', 'BISが、バイデン政権期のAI拡散規則の執行を停止すると発表', 'Squire Patton Boggs（二次情報）'],
          ['2024年以降（報道）', '米国の捜査当局がMegaspeedを調査', 'Thai Examiner — 報道、未確認'],
          ['2026年4月', 'BOIが新規データセンター案件の承認を停止（タイの報道）。政府がデータセンター政策委員会を設置', 'Bangkokbiznews、Kaohoon — **下記5月の承認と矛盾、未解決**'],
          ['2026年5月6日', 'BOIが大型デジタル案件を承認。最大はTikTok System（タイ）の8,420億バーツ（総額は情報源により9,130億バーツまたは9,580億バーツ）', 'WaLensの過去の調査；Green Design Consulting、DC Market Insights — **総額が矛盾**'],
          ['2026年6月', 'WaLensがAI・データセンターブームと人材不足を取り上げる', 'WaLensの過去の分析'],
          ['2026年8〜10月', '政府のデータセンター政策委員会が会合。共通ルールの策定まで166案件を一時停止', 'Thansettakij；Maverick Consulting Group（二次情報）'],
          ['2026年10月29日', 'WaLensレポート：新規データセンターは競争選抜方式へ。既存の83施設は従来制度の適用を継続', 'WaLens'],
          ['2026年11月12日', 'エヌビディアがジェンスン・フアン氏の退任を発表（スパイ行為・個人的行為に関する疑惑の中で報道）。11月23日に復帰', 'Thai Examiner、Forbes Japan／Reuters — 企業の措置は確認済み、疑惑は未確認'],
          ['2026年11月16日', 'BISが暫定最終規則を公表', '法律事務所'],
          ['2026年11月17日', 'タイと米国が通商交渉の大幅な進展を発表。タイへの通商法301条関税の上限を最大18%とする案。米国の最終決定は2027年3月の見込み', 'Thailand Business News'],
          ['2026年11月18日', 'タイ商務省がチップ調達への懸念を表明', 'ANN'],
          ['2026年11月19日', '規則が施行。OCBCが中国系比率38.4%とするレポートを公表', '法律事務所；MGR'],
          ['2026年11月23日', 'Megaspeed（タイ）と関連6社がエンティティリストに追加', 'Thai Examiner；Thailand Business News'],
          ['2026年11月25日', 'Bloomberg：銀行がByteDance、Alibaba、Tencentに関連するアジアの数十億ドル規模のデータセンター融資を見直し', 'MGR；Asia Times'],
          ['**2026年11月26日**', '**FT／WSJ：エヌビディアが4カ国向けサーバー出荷を停止**', 'Bangkok Post、TechCrunch、共同通信'],
          ['2026年12月1日', 'ジェンスン・フアン氏の議会証言（Asia Timesによる）', 'Asia Times — 単一の情報源'],
          ['2027年2月17日ごろ', '90日のライセンス猶予期間が終了（推計）', '計算による'],
        ],
      },
      connect: {
        title: { en: 'How the pieces connect', ja: '出来事のつながり' },
        en: 'Thailand\'s boom was already being re-regulated domestically (BOI pause, policy board, pitching) because of power and water strain. The US rule adds an external gate on the hardware itself. The evidence supports a sequence (rule → Nvidia compliance pause → lender caution); it does **not** show that the earlier Thai domestic pause was caused by, or coordinated with, the US action.',
        ja: 'タイのデータセンターブームは、電力と水の逼迫を理由に、すでに国内で規制の見直しが進んでいた（BOIの承認停止、政策委員会、競争選抜方式）。米国の規則は、そこにハードウェアそのものへの外部からの関門を加えるものである。証拠が裏付けるのは「規則 → エヌビディアのコンプライアンス上の出荷停止 → 金融機関の慎重姿勢」という順序であり、それ以前のタイ国内の停止措置が米国の措置によって引き起こされた、あるいは米国と連携していたことは**示されていない**。'
      },
    },

    signals: {
      headers: {
        en: ['Signal', 'Current reading', 'Trigger for escalation', 'Why it matters'],
        ja: ['シグナル', '現状', 'エスカレーションのトリガー', 'なぜ重要か'],
      },
      rows: {
        en: [
          ['Nvidia pause duration', 'Unknown; unconfirmed', 'Official confirmation of an open-ended halt, or extension to non-server products', 'Determines whether delay is weeks or quarters'],
          ['BIS licence guidance', 'Operators report no clear process', 'First published FAQ or licence decisions for Thai applicants; or none by mid-Dec', 'Licence throughput sets the commissioning calendar'],
          ['Lender behaviour', 'GMI Cloud $300m: a private-credit fund withdrew; Aolani and Bridge facilities paused', 'A Thai-bank or Japanese-bank facility publicly paused', 'Financing, not hardware, is the likely binding constraint for neoclouds'],
          ['China-linked tenant share', '38.4% of approved capacity (OCBC)', 'Named Thai projects re-classified or tenants exiting', 'Defines which projects lose their anchor revenue'],
          ['Entity List expansion', 'Megaspeed (Thailand) listed 23 Nov', 'Additional Thai entities listed', 'Raises compliance risk for any counterparty'],
          ['Hyperscaler carve-out', 'US-HQ end users excluded with monthly reporting', 'BIS tightens the reporting condition', 'US cloud providers are the relative winners'],
          ['BOI new applications', 'Press expects possible slowdown in Q4 2026–Q1 2027', 'Quarterly BOI digital applications fall sharply', 'Forward indicator for investment intent'],
          ['US–Thai trade talks', '"Substantial progress" 17 Nov; tariff decision Mar 2027', 'Chip licensing linked to the trade package', 'Possible diplomatic route to fast-track licences'],
        ],
        ja: [
          ['エヌビディアの出荷停止の期間', '不明、未確認', '無期限の停止が公式に確認される、またはサーバー以外の製品に拡大', '遅延が数週間で済むか、数四半期に及ぶかを決める'],
          ['BISのライセンス指針', '事業者は明確な手続きがないと報告', 'タイの申請者向けのFAQやライセンス決定が初めて公表される、または12月中旬までに何も出ない', 'ライセンスの処理速度が稼働開始の時期を決める'],
          ['金融機関の動き', 'GMI Cloudの3億ドル：プライベートクレジット・ファンドが撤退。AolaniとBridgeの融資は停止', 'タイの銀行または日本の銀行の融資停止が公になる', 'ネオクラウドにとって制約となるのは、ハードウェアよりも資金調達である可能性が高い'],
          ['中国系テナントの比率', '承認済み容量の38.4%（OCBC）', '名前の挙がったタイの案件の分類変更、またはテナントの撤退', 'どの案件が中核となる収入源を失うかを決める'],
          ['エンティティリストの拡大', 'Megaspeed（タイ）が11月23日に掲載', 'タイの企業がさらに掲載される', 'あらゆる取引相手に関するコンプライアンス上のリスクが高まる'],
          ['ハイパースケーラーの除外', '米国本社のエンドユーザーは月次報告を条件に対象外', 'BISが報告条件を厳格化する', '米国のクラウド事業者が相対的な勝者となる'],
          ['BOIの新規申請', '報道は2026年第4四半期〜2027年第1四半期の鈍化の可能性を予想', 'BOIの四半期ごとのデジタル分野の申請が急減する', '投資意欲の先行指標'],
          ['米タイ通商交渉', '11月17日に「大幅な進展」。関税の決定は2027年3月', 'チップのライセンスが通商パッケージと結び付けられる', 'ライセンスを迅速化する外交ルートとなる可能性'],
        ],
      },
    },

    analysis: {
      label: {
        en: 'All figures in this section are labelled as estimates.',
        ja: '本節の数値はすべて推計である。'
      },
      blocks: {
        en: [
          { title: 'Investment exposed (estimate)', body: "Using BMI's ~944 MW pipeline and a benchmark construction cost of $7–8m per MW (Research and Markets via Yahoo Finance): 944 × 7 = $6.6bn; 944 × 8 = $7.6bn. Midpoint ≈ $7.1bn, roughly ฿230bn at ~฿33/$. This is a build-cost benchmark only; it excludes GPU servers, which for AI halls can exceed the shell cost — the share is **not sourced** and is not estimated here." },
          { title: 'Why headline BOI numbers overstate near-term risk', body: '฿1.7 trillion of applications is an intention figure. Live capacity is ~216 MW, so the pipeline-to-live ratio is 944 / 216 ≈ 4.4×. The shock hits the 4.4× multiple (what gets built and when), not the existing base.' },
          { title: 'Illustrative China-linked exposure (low confidence)', body: '38.4% × 944 MW ≈ 363 MW. The two figures use different bases (OCBC "approved capacity" vs BMI pipeline), so treat ~360 MW only as an order of magnitude.' },
        ],
        ja: [
          { title: '影響を受ける投資額（推計）', body: 'BMIの約944MWのパイプラインと、1MW当たり700万〜800万ドルという建設コストの目安（Research and Markets、Yahoo Finance経由）を用いると、944 × 7 = 66億ドル、944 × 8 = 76億ドルとなる。中央値は約71億ドルで、1ドル＝約33バーツで換算すると約2,300億バーツである。これは建設コストの目安にすぎず、GPUサーバーは含まない。AI向けの施設ではGPUサーバーが建屋のコストを上回ることもあるが、その比率は**出典がなく**、ここでは推計していない。' },
          { title: 'BOIの見出しの数値が短期のリスクを誇張する理由', body: '1.7兆バーツの申請額は意向を示す数値である。稼働中の容量は約216MWであり、パイプラインと稼働中の比率は944 ÷ 216 ≈ 4.4倍となる。ショックが及ぶのはこの4.4倍の部分（何が、いつ建設されるか）であり、既存の稼働基盤ではない。' },
          { title: '中国系エクスポージャーの例示（確度は低い）', body: '38.4% × 944MW ≈ 363MW。2つの数値は基準が異なる（OCBCの「承認済み容量」とBMIのパイプライン）ため、約360MWは規模感の目安としてのみ扱うべきである。' },
        ],
      } as Bi<{ title: string; body: string }[]>,
      scenarios: {
        title: {
          en: 'Delay carrying-cost scenarios (estimates; 8% cost of capital is my assumption, applied to ~$7.1bn)',
          ja: '遅延に伴う保有コストのシナリオ（推計。資本コスト8%は筆者の仮定で、約71億ドルに適用）'
        },
        headers: {
          en: ['Scenario', 'Assumption', 'Delay', 'Carrying cost on ~$7.1bn', 'Likely outcome'],
          ja: ['シナリオ', '前提', '遅延', '約71億ドルに対する保有コスト', '想定される結果'],
        },
        rows: {
          en: [
            ['A. Short pause', 'Nvidia resumes after compliance clarity', '~3 months', '7.1 × 8% × 0.25 ≈ $142m', 'Schedules slip one quarter; no cancellations'],
            ['B. Licensed regime (base case, my judgment)', 'Licences granted case by case, slow', '6–12 months', '≈ $284–568m', 'China-linked tenants exit or re-paper; US-anchored projects proceed; neocloud consolidation'],
            ['C. Prolonged restriction', 'Licences scarce or politicised', '>12 months', '>$568m, plus impairment risk on half-built halls', 'Stranded-asset risk (Asia Times, author\'s analysis); shift to non-Nvidia silicon or other hubs'],
          ],
          ja: [
            ['A. 短期の停止', 'コンプライアンス面が明確になればエヌビディアが出荷を再開', '約3カ月', '7.1 × 8% × 0.25 ≈ 1億4,200万ドル', '工程が1四半期ずれ込む。中止はない'],
            ['B. ライセンス制度（基本シナリオ、筆者の判断）', 'ライセンスは個別に、時間をかけて付与', '6〜12カ月', '約2億8,400万〜5億6,800万ドル', '中国系テナントは撤退または契約を見直す。米国を核とする案件は進行。ネオクラウドの再編'],
            ['C. 長期の制限', 'ライセンスが希少、または政治化', '12カ月超', '5億6,800万ドル超。建設途上の施設には減損リスク', '座礁資産のリスク（Asia Times、筆者の分析）。エヌビディア以外の半導体や他の拠点への移行'],
          ],
        },
      },
      tail: {
        en: [
          '**Licence timeline arithmetic.** SIS Distribution (a Thai IT distributor) says approval checks can take up to 90 days and that it has rejected orders and leases worth roughly ฿1–10bn+ with China-linked end users. A 90-day check starting 1 Dec ends about 1 Mar 2027 — after the ~17 Feb statutory window for existing data centres. **Inference, not a reported fact:** operators that apply late may miss their own window.',
          '**Power.** MEA/PEA requests for data-centre power total 22,000–30,000 MW against a draft PDP midpoint of ~8,800 MW (Maverick Consulting). A chip-driven slowdown eases near-term grid pressure; it does not remove the structural gap. **No evidence** was found of any EGAT or PDP revision in response to the rule.',
        ],
        ja: [
          '**ライセンス取得までの日数の計算。** タイのIT販売会社SIS Distributionは、承認の確認に最大90日かかる場合があり、中国系のエンドユーザーとの約10億〜100億バーツ超の受注やリースを断ったとしている。12月1日に90日の確認を始めると、終了は2027年3月1日ごろとなり、既存データセンター向けの法定猶予期間（2月17日ごろ）を過ぎてしまう。**報じられた事実ではなく推論である：** 申請が遅れた事業者は、自らの猶予期間に間に合わない可能性がある。',
          '**電力。** 首都圏配電公社（MEA）と地方配電公社（PEA）へのデータセンター向け電力の申請は合計22,000〜30,000MWに上り、PDP草案の中央値約8,800MWを大きく上回る（Maverick Consulting）。チップを要因とする減速は短期的な系統への圧力を和らげるが、構造的な需給ギャップを解消するものではない。規則を受けてタイ発電公社（EGAT）やPDPが見直されたという**証拠は見つかっていない**。',
        ],
      },
    },

    competitive: {
      blocks: {
        en: [
          { title: 'Winners (relative)', body: 'AWS, Microsoft and Google, through the US-HQ exclusion and likely customer migration from smaller providers (MGR analysis; Thai Examiner is similar). Enterprises wanting certainty of GPU access may move to them.' },
          { title: 'Losers (relative)', body: "Neoclouds and GPU-rental firms (Fitch's assessment: most exposed to GPU-supply uncertainty and limits on serving Chinese tech customers); projects with China-linked ownership or anchor tenants; half-built campuses that secured power and water but not servers; downstream EPC, electrical, cooling and industrial-estate players if projects slip." },
          { title: 'Not simply affected', body: 'Firms that do not import chips are not automatically safe: Lightup Total Solutions (LTS) said in July 2025 it was not directly affected, but MGR notes NVIDIA Cloud Partner status gives no export-law exemption and installation revenue can still be delayed.' },
          { title: 'Japanese positioning', body: 'I found **no verified report naming a Japanese company\'s Thai data-centre project as affected**. Japanese-language coverage (Kyodo, Nikkei, Reuters Japan, Forbes Japan) reports the pause itself. Japanese advantage is structural: clean US-aligned compliance posture, power/cooling/electrical supply capability, and project-finance depth. The opportunity is to be the compliant counterparty for operators that need non-China-linked capital and tenants. The risk is being drawn into projects with undisclosed China-linked end users.' },
        ],
        ja: [
          { title: '勝者（相対的）', body: 'AWS、Microsoft、Googleである。米国本社の除外規定に加え、小規模事業者からの顧客移行が見込まれるためである（MGRの分析。Thai Examinerも同様）。GPUを確実に利用したい企業は、これらの事業者に移る可能性がある。' },
          { title: '敗者（相対的）', body: 'ネオクラウドとGPUレンタル企業（Fitchの評価：GPU供給の不確実性と中国テック企業向けサービスの制限に最もさらされている）、中国系の出資者や中核テナントを持つ案件、電力と水は確保したがサーバーを確保できていない建設途上のキャンパス、そして案件が遅れた場合の下流のEPC、電気設備、冷却設備、工業団地の事業者である。' },
          { title: '単純に影響を受けるとは限らない企業', body: 'チップを輸入していない企業も自動的に安全というわけではない。Lightup Total Solutions（LTS）は2025年7月に直接の影響はないとしたが、MGRは、NVIDIA Cloud Partnerの資格は輸出規制法上の免除にはならず、設置関連の収入が遅れる可能性はあると指摘している。' },
          { title: '日系企業のポジショニング', body: '**日本企業のタイでのデータセンター案件が影響を受けたと名指しした、確認済みの報道は見つからなかった**。日本語の報道（共同通信、日本経済新聞、ロイター日本語版、Forbes JAPAN）は出荷停止そのものを伝えている。日本企業の強みは構造的なものである。米国に沿ったクリーンなコンプライアンス体制、電力・冷却・電気設備の供給能力、そしてプロジェクトファイナンスの厚みである。機会は、中国と関係のない資金とテナントを必要とする事業者にとって、コンプライアンスを満たした取引相手になることにある。リスクは、中国系のエンドユーザーが開示されていない案件に巻き込まれることである。' },
        ],
      } as Bi<{ title: string; body: string }[]>,
      regional: {
        title: { en: 'Regional comparison (limited evidence)', ja: '地域比較（証拠は限定的）' },
        headers: {
          en: ['Market', 'Reported signal', 'Confidence'],
          ja: ['市場', '報じられたシグナル', '確度'],
        },
        rows: {
          en: [
            ['Thailand', 'Named in pause; GMI Cloud pullback; domestic pitching/pause regime', 'Medium'],
            ['Malaysia (Johor)', 'Named in pause; Bridge $6.6bn debt package stalled; utility scrutiny', 'Medium'],
            ['Singapore', 'Named in pause; in US smuggling cases; US hyperscalers exempt', 'Medium'],
            ['Indonesia', 'Named only in the pause; no other specifics found', 'Low'],
            ['Vietnam, Philippines, Japan', 'Not covered by the rule or reports found; potential diversion hubs — **no evidence** gathered', 'None'],
          ],
          ja: [
            ['タイ', '出荷停止の対象として名指し。GMI Cloudからの資金引き揚げ。国内の競争選抜・停止制度', '中'],
            ['マレーシア（ジョホール）', '出荷停止の対象として名指し。Bridgeの66億ドルの融資パッケージが停滞。電力会社による精査', '中'],
            ['シンガポール', '出荷停止の対象として名指し。米国の密輸事件に関与。米国のハイパースケーラーは対象外', '中'],
            ['インドネシア', '出荷停止で名指しされたのみ。その他の具体的な情報は見つからず', '低'],
            ['ベトナム、フィリピン、日本', '規則や見つかった報道の対象外。転用拠点となる可能性 — **証拠は収集されていない**', 'なし'],
          ],
        },
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
        Monitor: { en: 'Monitor', ja: '注視' },
      } as Record<Urgency, Bi<string>>,
      items: [
        {
          urgency: 'High' as Urgency,
          en: { sector: 'Data-centre investors / JV partners', relevance: 'Direct: tenant mix, server delivery, licences', exposure: 'High if China-linked tenants or GPU-rental model; low if US-hyperscaler-anchored', stance: 'Audit tenants; add licence and delivery conditions to JV terms' },
          ja: { sector: 'データセンター投資家／合弁パートナー', relevance: '直接：テナント構成、サーバーの納入、ライセンス', exposure: '中国系テナントやGPUレンタル型なら高、米国ハイパースケーラーが核なら低', stance: 'テナントを監査し、合弁契約にライセンスと納入の条件を加える' },
        },
        {
          urgency: 'Medium' as Urgency,
          en: { sector: 'Power, cooling and electrical suppliers (EPC)', relevance: 'Order timing for halls awaiting servers', exposure: 'Medium: order slippage rather than cancellation', stance: 'Confirm milestone payments and stage-gate contracts' },
          ja: { sector: '電力・冷却・電気設備のサプライヤー（EPC）', relevance: 'サーバー待ちの施設に関する発注時期', exposure: '中：中止ではなく発注のずれ込み', stance: 'マイルストーン払いと段階審査型の契約を確認する' },
        },
        {
          urgency: 'Low' as Urgency,
          en: { sector: 'EEC manufacturers (cloud/AI users)', relevance: 'Possible price or capacity effects for local GPU cloud', exposure: 'Low–medium', stance: 'Keep US-hyperscaler regions as fallback; avoid single local GPU provider for critical workloads' },
          ja: { sector: '東部経済回廊（EEC）の製造業（クラウド・AIの利用者）', relevance: '国内GPUクラウドの価格や容量への影響の可能性', exposure: '低〜中', stance: '米国ハイパースケーラーのリージョンを代替として確保し、重要な業務を単一の国内GPU事業者に依存しない' },
        },
        {
          urgency: 'High' as Urgency,
          en: { sector: 'Banks and lenders (project finance)', relevance: 'Bloomberg-reported loan reviews; need legal chip access and legal customer use', exposure: 'High for neocloud loans', stance: 'Add chip-licence conditions precedent and tenant-sanctions covenants' },
          ja: { sector: '銀行・金融機関（プロジェクトファイナンス）', relevance: 'Bloombergが報じた融資の見直し。合法的なチップ調達と顧客による合法的な利用が必要', exposure: 'ネオクラウド向け融資は高', stance: 'チップのライセンスを貸付実行の前提条件とし、テナントの制裁に関する誓約条項を加える' },
        },
        {
          urgency: 'Medium' as Urgency,
          en: { sector: 'Trading houses and equity investors', relevance: 'Stakes in operators or landlords', exposure: 'Medium', stance: 'Mark-to-schedule, not mark-to-cancellation' },
          ja: { sector: '商社・株式投資家', relevance: '事業者や施設所有者への出資', exposure: '中', stance: '中止ではなく、工程の遅れを前提に評価する' },
        },
        {
          urgency: 'Medium' as Urgency,
          en: { sector: 'Industrial estates / landlords', relevance: 'Land sales and leases to data-centre tenants', exposure: 'Medium', stance: 'Expect deferred take-up' },
          ja: { sector: '工業団地／施設所有者', relevance: 'データセンターのテナントへの土地売却・賃貸', exposure: '中', stance: '入居の先送りを想定する' },
        },
        {
          urgency: 'Medium' as Urgency,
          en: { sector: 'Logistics and IT distributors', relevance: 'Held or rejected AI server orders', exposure: 'Medium–high for AI hardware', stance: 'Verify end users; document destination' },
          ja: { sector: '物流・IT販売会社', relevance: '保留または拒否されたAIサーバーの受注', exposure: 'AIハードウェアでは中〜高', stance: 'エンドユーザーを確認し、仕向地を記録に残す' },
        },
        {
          urgency: 'Monitor' as Urgency,
          en: { sector: 'SET-listed Thai data-centre and power names', relevance: 'Press reports market pressure; specific price moves **not retrieved**', exposure: 'Not quantified', stance: 'Monitor' },
          ja: { sector: 'タイ証券取引所（SET）上場のデータセンター・電力銘柄', relevance: '報道は市場への圧力を伝えるが、具体的な株価の動きは**取得できていない**', exposure: '定量化されていない', stance: '注視する' },
        },
      ],
    },

    nextActions: {
      horizons: {
        en: [
          {
            label: 'Today',
            actions: [
              'Request written confirmation from each Thai data-centre counterparty of server order status and the vendor\'s current shipping position.',
              'List all tenants by headquarters and ultimate parent; flag any China/Macau-linked tenant exceeding material revenue share.',
              'Brief the board: the pause is reported, not confirmed; the rule is confirmed.',
            ],
          },
          {
            label: 'This week',
            actions: [
              'Ask counsel to map the §743.10 US-HQ exclusion and the 12M-TPP end-use test to each project.',
              'Contact lenders to confirm no facility has been paused or conditioned; review conditions precedent on chip delivery.',
              'Obtain from construction contractors the stage-gate schedule showing what is still payable if servers slip one and two quarters.',
            ],
          },
          {
            label: 'This month',
            actions: [
              'Re-run project IRR under Scenarios A, B and C with delay and carrying-cost assumptions.',
              'Open dialogue via JETRO, the Japanese Chamber of Commerce in Bangkok and the Embassy on a joint position on licence clarity (no such statement was found yet).',
              'Evaluate non-Nvidia or US-hyperscaler-anchored configurations for projects still pre-procurement.',
            ],
          },
          {
            label: 'This quarter',
            actions: [
              'Complete licence applications ahead of the ~17 Feb 2027 window rather than at the deadline, and plan for 90-day review times.',
              'Rebalance supplier portfolios toward projects with US-anchored or Japanese/European-anchored tenants.',
              'Prepare a response to the March 2027 US tariff decision and any link to chip licensing.',
            ],
          },
        ],
        ja: [
          {
            label: '今日',
            actions: [
              'タイの各データセンターの取引相手に対し、サーバーの発注状況と販売元の現在の出荷方針を書面で確認するよう求める。',
              '全テナントを本社所在地と最終親会社別に一覧化し、収入に占める比率が重要な水準を超える中国・マカオ系のテナントに印を付ける。',
              '取締役会に説明する：出荷停止は報道であり未確認、規則は確認済みである。',
            ],
          },
          {
            label: '今週',
            actions: [
              '§743.10の米国本社除外規定と1,200万TPPの最終用途基準を各案件に当てはめるよう、弁護士に依頼する。',
              '金融機関に連絡し、停止や条件付けとなった融資がないかを確認する。チップの納入に関する貸付実行の前提条件を見直す。',
              'サーバーの納入が1四半期、2四半期遅れた場合に、なお支払いが必要な額を示す段階審査型の工程表を建設会社から入手する。',
            ],
          },
          {
            label: '今月',
            actions: [
              '遅延と保有コストの前提を置き、シナリオA・B・Cで案件のIRRを再計算する。',
              '日本貿易振興機構（JETRO）、盤谷日本人商工会議所、日本大使館を通じて、ライセンスの明確化に関する共同の立場について対話を始める（そのような声明はまだ見つかっていない）。',
              '調達前の案件について、エヌビディア以外の構成や米国ハイパースケーラーを核とする構成を検討する。',
            ],
          },
          {
            label: '今四半期',
            actions: [
              'ライセンス申請は期限間際ではなく、2027年2月17日ごろの猶予期間より前に完了させ、審査に90日かかることを見込んでおく。',
              'サプライヤーとしての取引先構成を、米国または日本・欧州の企業を核とするテナントの案件へと再配分する。',
              '2027年3月の米国の関税決定と、それがチップのライセンスと結び付けられる可能性への対応を準備する。',
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
          ['Nvidia, Dell or Supermicro confirm an open-ended halt', 'Pause becomes policy', 'Move to Scenario C planning'],
          ['BIS issues FAQs or approves first Thai licences', 'Process becomes clear', 'Scenario A–B; delays measured in weeks to months'],
          ['A Thai or Japanese bank pauses a facility', 'Financing channel tightens', 'Neocloud failures; consolidation; asset sales'],
          ['More Thai entities added to the Entity List', 'Compliance risk rises across counterparties', 'Tighter KYC; project exits'],
          ['Thai government links chip access to trade talks', 'Diplomatic fast track possible', 'Faster licences for non-China-linked projects'],
          ['BOI quarterly digital applications fall', 'Investment intent weakens', 'Lower pipeline realisation'],
          ['Hyperscalers announce accelerated Thai capacity', 'Share shifts to US providers', 'Market concentration'],
        ],
        ja: [
          ['エヌビディア、Dell、Supermicroが無期限の停止を確認', '停止が方針となる', 'シナリオCに基づく計画へ移行'],
          ['BISがFAQを公表、またはタイ向けの初のライセンスを承認', '手続きが明確になる', 'シナリオA〜B。遅延は数週間から数カ月単位'],
          ['タイまたは日本の銀行が融資を停止', '資金調達の経路が狭まる', 'ネオクラウドの破綻、再編、資産売却'],
          ['タイの企業がエンティティリストに追加される', '取引相手全般でコンプライアンス上のリスクが高まる', '本人確認（KYC）の厳格化、案件からの撤退'],
          ['タイ政府がチップの調達を通商交渉と結び付ける', '外交による迅速化の可能性', '中国と関係のない案件のライセンスが迅速化'],
          ['BOIの四半期ごとのデジタル分野の申請が減少', '投資意欲が弱まる', 'パイプラインの実現率が低下'],
          ['ハイパースケーラーがタイでの容量拡大の前倒しを発表', 'シェアが米国の事業者に移る', '市場の寡占化'],
        ],
      },
    },

    caveats: {
      title: { en: 'Source Notes and Caveats', ja: '出典注記と留意事項' },
      groups: {
        en: [
          { title: 'Verified from primary or near-primary', tone: 'verified', items: ['Thai Commerce Ministry statements (via ANN and Thai Examiner reporting).', 'Entity List addition (reported with Federal Register date, not read directly).', 'Nvidia SEC filings on export-control risk (generic).'] },
          { title: 'Secondary', tone: 'secondary', items: ['All details of the BIS rule come from law-firm analyses; the Federal Register text was **not read directly** (one source cites FR document 2026-23529; another cites 91 FR 74970 — citation unverified).'] },
          { title: 'Single-source / unconfirmed', tone: 'secondary', items: ["Nvidia's server pause (FT, WSJ; Nvidia, Dell, Supermicro and BIS had not confirmed).", 'The Bloomberg loan freezes.', 'The Megaspeed and Alibaba-unit diversion allegations (unproven).'] },
          { title: 'Conflicting figures, not merged', tone: 'conflicting', items: ['Comment deadline (18 vs 19 Jan 2027).', 'May 2026 BOI approval total (฿913bn vs ฿958bn).', '2025 BOI data-centre figure (฿728bn applications vs ฿746bn approved).', 'Aolani project location.', '"Enforcement on Dec 1" (Asia Times) vs 90 days from 19 Nov.', 'BOI approvals paused since April 2026 vs approvals in May 2026.', 'Capacity (216 MW live per BMI vs ~350 MW gross per the Thailand Data Center Association; pipeline 944 MW vs 2.87 GW as of Sept 2025).'] },
          { title: 'Not found', tone: 'notfound', items: ['SET price moves (the Kaohoon page could not be retrieved).', 'Any named Japanese-company exposure.', 'Official Nvidia statement.', 'Thai bank facilities paused.', 'Federal Register primary text.'] },
        ],
        ja: [
          { title: '一次または準一次情報で確認済み', tone: 'verified', items: ['タイ商務省の声明（ANNとThai Examinerの報道経由）。', 'エンティティリストへの追加（連邦官報の掲載日とともに報道。原文は直接確認していない）。', '輸出規制リスクに関するエヌビディアのSEC提出書類（一般的な記載）。'] },
          { title: '二次情報', tone: 'secondary', items: ['BIS規則の詳細はすべて法律事務所の分析によるもので、連邦官報の原文は**直接確認していない**（ある情報源はFR文書2026-23529、別の情報源は91 FR 74970を引用しており、引用は未確認）。'] },
          { title: '単一の情報源／未確認', tone: 'secondary', items: ['エヌビディアのサーバー出荷停止（FT、WSJ。エヌビディア、Dell、Supermicro、BISは未確認）。', 'Bloombergが報じた融資の凍結。', 'MegaspeedとAlibaba関連会社による転用の疑惑（未証明）。'] },
          { title: '矛盾する数値（統合せず併記）', tone: 'conflicting', items: ['意見募集の締切（2027年1月18日と19日）。', '2026年5月のBOI承認総額（9,130億バーツと9,580億バーツ）。', '2025年のBOIデータセンター関連の数値（申請7,280億バーツと承認7,460億バーツ）。', 'Aolani案件の所在地。', '「12月1日に執行」（Asia Times）と、11月19日から90日。', '2026年4月以降のBOI承認停止と、2026年5月の承認。', '容量（BMIによる稼働中216MWと、タイ・データセンター協会による総容量約350MW。パイプラインは944MWと、2025年9月時点の2.87GW）。'] },
          { title: '確認できなかった事項', tone: 'notfound', items: ['SETの株価の動き（Kaohoonのページを取得できなかった）。', '日本企業が名指しされたエクスポージャー。', 'エヌビディアの公式声明。', 'タイの銀行による融資の停止。', '連邦官報の原文。'] },
        ],
      },
      forward: {
        en: [
          '**Forward-looking items** (scenario delays, 90-day deadlines, tariff decision) are estimates or announced intentions, not enacted measures. The 8% carrying cost and base-case scenario are my assumptions.',
          '**Research method note:** the dedicated research tool was unavailable in this session; this report is compiled from direct web searches and page reads on 27 Nov 2026.',
        ],
        ja: [
          '**将来に関する事項**（シナリオ上の遅延、90日の期限、関税の決定）は推計または表明された意向であり、施行済みの措置ではない。8%の保有コストと基本シナリオは筆者の仮定である。',
          '**調査方法に関する注記：** 本セッションでは専用の調査ツールが利用できなかったため、本レポートは2026年11月27日のウェブ検索とページの直接閲覧に基づいて作成した。',
        ],
      },
    },

    sources: [
      { label: 'Bangkok Post — Nvidia halts server shipments to Southeast Asia', url: 'https://www.bangkokpost.com/business/general/3361629/nvidia-halts-server-shipments-to-southeast-asia' },
      { label: 'ANN — Nvidia halts server shipments to Thailand and three other markets', url: 'https://asianews.network/nvidia-halts-server-shipments-to-thailand-and-three-other-markets/' },
      { label: 'TechCrunch — Nvidia hits pause on chip shipments to Southeast Asia', url: 'https://techcrunch.com/2026/11/26/nvidia-hits-pause-on-chip-shipments-to-southeast-asia' },
      { label: 'Thailand Business News — Morning Business Briefing', url: 'https://www.thailand-business-news.com/news/342543-thailand-business-news-morning-business-briefing' },
      { label: 'Thai Examiner — Thai firm at the centre of White House throttling', url: 'https://www.thaiexaminer.com/thai-news-foreigners/2026/11/27/thai-firm-at-the-centre-of-white-house-throttling-of-southeast-asias-data-centre-boom-links-nvidia/' },
      { label: "Asia Times — Southeast Asia's AI data center bets turning into stranded assets", url: 'https://asiatimes.com/2026/11/southeast-asias-ai-data-center-bets-turning-into-stranded-assets/' },
      { label: "CNBC — New U.S. chip curbs put Southeast Asia's data center boom at risk (snippet only)", url: 'https://www.cnbc.com/2026/11/18/nvidia-us-ai-chip-export-controls-data-centers-.html' },
      { label: "Bloomberg — US Moves to Curb China's Remote Access to Nvidia's AI Chips (snippet only)", url: 'https://www.bloomberg.com/news/articles/2026-11-16/us-moves-to-limit-remote-access-to-advanced-ai-chips' },
      { label: 'Morgan Lewis — Commerce targets remote access to advanced semiconductors', url: 'https://www.morganlewis.com/pubs/2026/11/commerce-targets-remote-access-to-advanced-semiconductors-in-new-interim-final-rule' },
      { label: 'Eversheds Sutherland — BIS closes the remote-access gap', url: 'https://www.eversheds-sutherland.com/en/united-states/insights/bis-closes-the-remote-access-gap-with-interim-final-rule' },
      { label: 'Pillsbury — Commerce restricts remote access to advanced chips', url: 'https://www.pillsburylaw.com/en/news-and-insights/commerce-restricts-remote-access-advanced-chips.html' },
      { label: 'Squire Patton Boggs — BIS issues rule restricting remote access', url: 'https://www.squirepattonboggs.com/insights/publications/bis-issues-rule-restricting-remote-access/' },
      { label: 'MGR Online — NVIDIA เบรกส่งชิป AI เขย่าแผน Data Center ไทย', url: 'https://mgronline.com/cyberbiz/detail/9690000113021' },
      { label: 'Thairath — Nvidia เบรกส่งชิป AI 4 ชาติอาเซียน รวมไทย', url: 'https://www.thairath.co.th/money/economics/global_economics/2974892' },
      { label: 'Bangkokbiznews — ดาต้าเซ็นเตอร์ไทยสะเทือน! Nvidia ระงับส่งเซิร์ฟเวอร์มาไทย', url: 'https://bangkokbiznews.com/world/economics/1262486' },
      { label: 'Kaohoon — SET เสี่ยงลงต่อ! พิษ Nvidia เบรกส่งชิป AI (snippet only)', url: 'https://www.kaohoon.com/news/884986' },
      { label: 'Bangkokbiznews — ปิดช่องโหว่ Data Center', url: 'https://www.bangkokbiznews.com/economics/1250191' },
      { label: 'Thansettakij — รัฐบาลสั่งชะลอสร้าง Data Center', url: 'https://www.thansettakij.com/economy/668154' },
      { label: 'Maverick Consulting Group — Thailand Data Centres 2026', url: 'https://www.mcg-asia.com/featured-insights/thailand-data-centre-power-water-grid-2026' },
      { label: "Green Design Consulting — Thailand's Data Centre Boom Hits a Regulatory Reality Check", url: 'https://www.greendesignconsulting.com/single-post/thailand-s-data-centre-boom-hits-a-regulatory-reality-check' },
      { label: 'Jakarta Market Lab — Thailand Data Center Market 2027-2032', url: 'https://www.jakartamarketlab.com/2026/11/thailand-data-center-market-2027-2032.html' },
      { label: 'Yahoo Finance (Research and Markets) — Thailand Data Center Market Investment Analysis', url: 'https://finance.yahoo.com/news/thailand-data-center-market-investment-104100612.html' },
      { label: '共同通信 (Yahoo!ニュース) — エヌビディア東南アジア向け停止', url: 'https://news.yahoo.co.jp/articles/8c65a1f062f584fcc0e7c296dcbdd994e81bb5d5' },
      { label: 'Forbes JAPAN (Yahoo!ニュース) — エヌビディア、東南アジア4カ国へのAIサーバー出荷停止を指示', url: 'https://news.yahoo.co.jp/articles/cce2c3c7500077dce13d1466f77a85dff69c9d85' },
      { label: 'WaLens — Thailand Moves New Data Centres to Competitive Pitching', url: 'https://walensnews.com/insights/investment/thailand-data-centre-pitching-2026' },
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

  const signalBorders = ['border-l-red-500', 'border-l-amber-500', 'border-l-blue-500', 'border-l-purple-500', 'border-l-emerald-500', 'border-l-orange-500', 'border-l-gray-500', 'border-l-pink-500'];

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
        <meta property="article:section" content="Investment" />
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
          <img src={heroImage} alt="Close-up of data-centre server fans and liquid-cooling pipes — Thailand data-centre investment analysis for Japanese executives" className="absolute inset-0 w-full h-full object-cover z-0" />
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
                  category: 'Investment'
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
            { label: isJapanese ? '投資' : 'Investment', href: '/insights?filter=investment' },
            { label: isJapanese ? 'エヌビディアのタイ向け出荷停止2026' : 'Nvidia Thailand Server Halt 2026' }
          ]} />

          {/* Report details — visible to everyone */}
          <Card className="mt-6 mb-6 bg-muted/40 border-dashed">
            <CardContent className="pt-4 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {content.reportMeta.rows[L].map(([k, v], idx) => (
                  <div key={idx} className="text-xs">
                    <p className="font-semibold text-foreground">{k}</p>
                    <p className="text-muted-foreground leading-relaxed" style={cellStyle}>{v}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <Card className="mb-8 border-primary/20" id="table-of-contents">
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
                {renderNumbered(content.executiveBrief[L])}
              </CardContent>
            </Card>
          </section>

          {/* 02 Overview */}
          <section id="overview" className="mb-12 scroll-mt-20">
            {sectionHeader(<Database className="h-6 w-6 text-blue-500" />, 'bg-blue-500/10', isJapanese ? '事象の概要' : 'Overview')}

            {/* Headline check — prominent warning, visible to everyone */}
            <Card className="mb-6 border-2 border-amber-500/60 bg-amber-500/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  {content.headlineCheck.title[L]}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm font-medium text-foreground" style={cellStyle}>{content.headlineCheck.intro[L]}</p>
                {renderNumbered(content.headlineCheck.items[L])}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {content.overview.blocks[L].map((b, idx) => (
                <Card key={idx} className="border-l-4 border-l-blue-500/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base" style={cellStyle}>{b.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderParas([b.body])}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mb-6">
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

            {/* Related WaLens report */}
            <Card className="bg-muted/40">
              <CardContent className="pt-4 pb-4">
                <p className="text-xs font-semibold text-foreground mb-1">{content.overview.related.title[L]}</p>
                <Link to={content.overview.related.to} className="inline-flex items-center gap-1 text-sm text-primary hover:underline" style={cellStyle}>
                  {content.overview.related.label[L]}
                  <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
                </Link>
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
              <CardContent>
                {renderParas([content.timeline.connect[L]])}
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
                      ? '定量分析とシナリオ表（推計）、競争・戦略ダイナミクスと地域比較、セクター別戦略判断、次のアクション、戦略的ウォッチポイント、出典を含む完全版レポートにアクセスするにはプレミアムプランが必要です。'
                      : 'The full quantitative analysis and scenario table (estimates), competitive dynamics and regional comparison, sector decision guide, next action insights, strategic watchpoints and sources require a premium subscription.'
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
                {sectionHeader(<Calculator className="h-6 w-6 text-purple-500" />, 'bg-purple-500/10', isJapanese ? '定量分析（推計）' : 'Quantitative Analysis (estimates)')}
                <div className="mb-6 flex items-start gap-2 rounded-md border border-purple-500/30 bg-purple-500/5 px-4 py-3">
                  <Badge variant="outline" className="border-purple-500/50 text-purple-600 dark:text-purple-300 flex-shrink-0">
                    {isJapanese ? '推計' : 'Estimates'}
                  </Badge>
                  <p className="text-sm italic text-muted-foreground" style={cellStyle}>{content.analysis.label[L]}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {content.analysis.blocks[L].map((b, idx) => (
                    <Card key={idx} className="border-l-4 border-l-purple-500/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base" style={cellStyle}>{b.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {renderParas([b.body])}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-base" style={cellStyle}>{content.analysis.scenarios.title[L]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderTable(content.analysis.scenarios.headers[L], content.analysis.scenarios.rows[L], 'font-semibold', 'min-w-[760px]')}
                  </CardContent>
                </Card>
                <Card className="bg-muted/40">
                  <CardContent className="pt-6 space-y-3">
                    {renderParas(content.analysis.tail[L])}
                  </CardContent>
                </Card>
              </section>

              {/* 06 Competitive Dynamics */}
              <section id="competitive" className="mb-12 scroll-mt-20" onClick={handleDataAppendixAccess}>
                {sectionHeader(<Globe className="h-6 w-6 text-blue-500" />, 'bg-blue-500/10', isJapanese ? '競争・戦略ダイナミクス' : 'Competitive and Strategic Dynamics')}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {content.competitive.blocks[L].map((b, idx) => (
                    <Card key={idx} className="border-l-4 border-l-blue-500/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base" style={cellStyle}>{b.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {renderParas([b.body])}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">{content.competitive.regional.title[L]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderTable(content.competitive.regional.headers[L], content.competitive.regional.rows[L], 'font-semibold')}
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
                            <span className="font-semibold text-foreground">{content.sectorGuide.labels.relevance[L]}{colon}</span>{renderBold(d.relevance)}
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
                    <CardTitle className="text-base flex items-center gap-2">
                      <Info className="h-4 w-4 text-muted-foreground" />
                      {content.caveats.title[L]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {content.caveats.groups[L].map((g, idx) => (
                      <div key={idx} className={`border-l-4 pl-4 ${caveatTone[g.tone]}`}>
                        <p className="text-sm font-semibold mb-2" style={cellStyle}>{g.title}</p>
                        {renderList(g.items, bulletIcon)}
                      </div>
                    ))}
                    <div className="space-y-2 pt-2">
                      {renderParas(content.caveats.forward[L])}
                    </div>
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

export default ThailandNvidiaServerHalt2026;
