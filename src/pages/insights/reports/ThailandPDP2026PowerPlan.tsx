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
  ChevronRight, Crown, Database, Sparkles, Globe, Clock, Calculator, Info, Target, ArrowRight, Users
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-oil-crisis-thai.jpg';

// JP text is the report's original; EN translation drafted by Claude — to be reviewed before marketing push

type Bi<T> = { en: T; ja: T };
type Urgency = 'High' | 'HighOpportunity' | 'Medium' | 'Low';

const ThailandPDP2026PowerPlan = () => {
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

  const slug = 'thailand-pdp2026-power-plan';
  const titleEn = "Thailand's PDP2026 Before Formal Approval: What Will Be in It, and Who the Key Players Are";
  const titleJa = 'タイPDP2026（電力開発計画2026–2050）正式承認目前：何が決まり、誰が主導するのか';
  const publishedDate = '2026-11-24';
  const canonicalPath = '/insights/economic-policy/thailand-pdp2026-power-plan';
  const canonicalUrl = `https://walensnews.com${canonicalPath}`;

  const metaDescEn = "Thailand's PDP2026 is still a draft, but its ~50,900 MW 2026–2037 build-out (24.3 GW solar, 14.5 GW BESS, 9.1 GW gas, 300 MW SMR) is common to every scenario. Key players, the gas debate, Direct PPA and 2027 tariffs for Japanese firms.";
  const metaDescJa = 'タイPDP2026は未承認の草案だが、2026–2037年の新設約50,900MW（太陽光24.3GW、BESS14.5GW、ガス9.1GW、SMR300MW）は全シナリオ共通。キープレーヤー、ガス火力論争、Direct PPA、2027年電気料金が日系企業に与える影響を解説。';

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
    { id: 'overview', label: isJapanese ? '政策の概要' : 'Policy Overview' },
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
      en: 'As of 24 November 2026, PDP2026 is still a draft awaiting NEPC and Cabinet approval. But the ~50,900 MW first-phase build (2026–2037) is identical across all four options and can be treated as the baseline. The live debates are the 2038–2050 mix and the 9,100 MW of new gas-fired capacity. For Japanese firms, the nearer P&L hit is not the PDP itself but the proposed two-tier Ft from January 2027 (3.86 baht for households/small users vs 4.73 baht for everyone else).',
      ja: '2026年11月24日時点でPDP2026は依然「草案」であり、国家エネルギー政策委員会（NEPC／กพช.）と閣議の承認待ちである。ただし第1期（2026–2037年）の新設約50,900MWは4つの選択肢すべてに共通しており、事実上の既定路線とみなしてよい。争点は2038年以降の電源構成と、全シナリオに組み込まれたガス火力9,100MWの是非である。日系企業にとって目先の損益要因はPDPそのものではなく、2027年1月から適用されうる「Ft二層化」（家庭・小規模3.86バーツ／その他4.73バーツ）である。'
    },
    category: { en: 'Economic Policy / Energy (Power & Liquid Fuels)', ja: '経済政策 / エネルギー（電力・液体燃料）' },
    lastUpdated: publishedDate,

    reportMeta: {
      title: { en: 'About this report', ja: '本レポートについて' },
      rows: {
        en: [
          ['Audience', 'Japanese executives in Thailand; heads of power, fuel, trading and manufacturing businesses'],
          ['Published', 'November 2026'],
          ['Primary sources', 'EPPO (สนพ.) public-hearing materials and announcements; NEPC resolutions (15 July and 13 November 2026); ERC (กกพ.) Ft public hearing; Department of Energy Business (ธพ.) draft Oil Plan 2026; Thai/English/Japanese press'],
        ],
        ja: [
          ['対象読者', '在タイ日系企業の経営層、電力・燃料・商社・製造業の事業責任者'],
          ['公開', '2026年11月'],
          ['主な出典', 'EPPO（สนพ.）公聴会資料・発表、NEPC決議（2026年7月15日・11月13日）、ERC（กกพ.）Ft公聴会、エネルギー事業局（ธพ.）Oil Plan 2026草案、Thai/English/Japanese press'],
        ],
      },
      draftNote: {
        en: '**PDP2026, the draft Oil Plan 2026 and the ERC Ft options are drafts, not enacted measures.** Until PDP2026 is approved, PDP2018 Revision 1 remains the plan in force.',
        ja: '**PDP2026、Oil Plan 2026草案、ERCのFt案はいずれも草案であり、施行済みの措置ではない。** PDP2026の承認までは「PDP2018改訂1版」が有効な計画である。'
      },
    },

    executiveSummary: {
      en: [
        '**What is decided:** PDP2026 (2026–2050) held its public hearing on 8 September 2026 and closed comments on 15 September. As of 24 November, NEPC approval has not been confirmed; the target for completion is December 2026. Until approval, PDP2018 Revision 1 remains the plan in force. The first-phase new build of about 50,900 MW (solar 24,300 MW, wind 2,700 MW, BESS 14,500 MW, gas combined-cycle 9,100 MW, SMR 300 MW) is common to all scenarios, and EPPO favours "Option 4 (hybrid, clean-power share about 73%)".',
        '**Exposure for Japanese firms:** Manufacturers are directly affected on three fronts: (1) the January–April 2027 electricity tariff (4.73 baht proposed for business users, or 5.02 baht under a single tariff); (2) whether they can buy renewable power through Direct PPA / third-party access (TPA); (3) compliance with carbon rules such as CBAM. For trading houses, power, gas and engineering companies, the tenders from 2027 onwards (solar + BESS, gas-fired plants, grid, SMR) are large business opportunities.',
        '**Strategic stance:** "Move on what is already settled; do not wait for plan approval." The first-phase volumes, the July opening of Direct PPA to all sectors and the November gas reallocation already set the direction. What remains open is the post-2038 mix and the TPA (wheeling) charge; here, keep several assumptions and branch decisions accordingly.',
      ],
      ja: [
        '**何が決まっているか：** PDP2026（2026–2050年）は2026年9月8日に公聴会を実施し、9月15日に意見募集を締め切った。11月24日時点でNEPC承認は確認されておらず、完了目標は2026年12月とされる。承認までは「PDP2018改訂1版」が有効な計画である。第1期の新設約50,900MW（太陽光24,300MW、風力2,700MW、BESS 14,500MW、ガス複合火力9,100MW、SMR 300MW）は全シナリオ共通で、EPPOは「選択肢4（ハイブリッド、クリーン電源比率約73%）」を推している。',
        '**日系企業のエクスポージャー：** 製造業は①2027年1–4月の電気料金（事業用4.73バーツ案、単一料金なら5.02バーツ案）、②Direct PPA／第三者アクセス（TPA）による再エネ調達の可否、③CBAMなど炭素規制対応、の3点で直接影響を受ける。商社・電力・ガス・エンジニアリング企業にとっては、2027年以降の入札（太陽光＋BESS、ガス火力、送電網、SMR）が大型の事業機会となる。',
        '**戦略スタンス：** 「計画承認を待たずに、確定済みの部分で動く」。第1期の数量、7月のDirect PPA全業種開放、11月のガス配分見直しはすでに方向が出ている。未確定なのは2038年以降の構成とTPA料金（託送料）であり、ここは前提を複数持って意思決定を分岐させるべきである。',
      ]
    },
    executiveBrief: {
      title: { en: 'Executive Brief', ja: 'エグゼクティブブリーフ' },
      en: [
        'PDP2026 is not yet approved, but the build-out to 2037 is the same whichever scenario is chosen.',
        'The main political fight is over the 9,100 MW of new gas capacity in every scenario and the LNG imports it implies.',
        'For manufacturers, the near-term pain is a possible ~0.87 baht/kWh premium on business power after the gas reallocation.',
        'In liquid fuels, the draft Oil Plan 2026 makes E20 and B7 the base fuels and phases out gasohol 91, though reported end dates conflict.',
        'Japanese firms should not wait: prepare for Direct PPA, budget for 2027 tariffs, and organise for the 2027 tenders now.',
      ],
      ja: [
        'PDP2026はまだ承認されていないが、2037年までの電源開発量はシナリオに関係なく同じである。',
        '最大の政治的争点は、全シナリオに入った9,100MWの新規ガス火力と、その燃料となるLNG輸入の増加である。',
        '製造業にとって当面の痛みは、ガス配分の見直しに伴い事業用電力が家庭用より約0.87バーツ／kWh高くなる可能性である。',
        '液体燃料では、Oil Plan 2026草案がE20とB7を基準燃料とし、ガソホール91の廃止を打ち出しているが、廃止時期の報道は割れている。',
        '日系企業は承認を待たずに、Direct PPAの準備、2027年料金の予算織り込み、入札参加の体制づくりを今すぐ始めるべきである。',
      ]
    },

    overview: {
      paras: {
        en: [
          'PDP2026 (ร่างแผนพัฒนากำลังผลิตไฟฟ้าของประเทศไทย พ.ศ. 2569–2593) is a 25-year plan replacing the "draft PDP2024", which went through a public hearing in 2024 but was never approved. The Energy Policy and Planning Office (EPPO / สนพ.) began drafting it in November 2025; after about 22 meetings of a subcommittee chaired by Thosaporn Sirisumphand, it held a public hearing on 8 September 2026.',
          'The draft lists five pressures behind the plan: industrial demand for green power, the rapid growth of data centres and AI, the rise of prosumers (self-generating consumers), electrification of vehicles, and international carbon rules (EU CBAM, NDC 3.0 and the draft carbon tax law). The reliability standard also moves from reserve margin to LOLE (loss-of-load expectation).',
          'Energy Minister Ekanat Promphan (เอกนัฏ พร้อมพันธุ์) frames PDP2026 around three pillars, "clean, stable and fair", and puts liberalisation of the power market through Direct PPA at the front.',
        ],
        ja: [
          'PDP2026（ร่างแผนพัฒนากำลังผลิตไฟฟ้าของประเทศไทย พ.ศ. 2569–2593）は、2024年に公聴会を経たものの承認されなかった「PDP2024草案」に代わる25年計画である。エネルギー政策計画局（EPPO／สนพ.）が2025年11月に策定を開始し、小委員会（委員長：トーサポン・シリサムパン氏）で約22回の会合を経て、2026年9月8日に公聴会を実施した。',
          '計画の前提として草案は5つの圧力を挙げている：産業界のグリーン電力需要、データセンター・AIの急拡大、プロシューマー（自家発電需要家）の増加、EV化、そして炭素関連の国際ルール（EU CBAM、NDC 3.0、炭素税法案）である。信頼度基準も予備率（Reserve Margin）からLOLE（供給力不足期待時間）へ変更される。',
          'エカナット・プロムパン（เอกนัฏ พร้อมพันธุ์）エネルギー大臣は、PDP2026を「クリーン・安定・公正」の3本柱と位置づけ、Direct PPAによる電力市場の自由化を前面に出している。',
        ],
      },
      keyNumbers: {
        title: { en: 'Key Numbers', ja: '主要数値' },
        headers: {
          en: ['Metric', 'Figure', 'Source & status'],
          ja: ['指標', '数値', '出典・ステータス'],
        },
        rows: {
          en: [
            ['Horizon', '2026–2050 (25 years)', 'EPPO draft (not approved)'],
            ['New capacity 2026–2037', 'About 50,900 MW', 'EPPO public-hearing materials (draft)'],
            ['Breakdown', 'Solar 24,300 / wind 2,700 / BESS 14,500 / gas combined-cycle (CCGT) 9,100 / SMR 300 MW', 'EPPO, Nation (draft). Note: DR/DER 2,660 MW is not included in the 50,900 MW'],
            ['Clean share', 'About 49% in 2037; 65–89% in 2050 (about 73% under Option 4)', 'EPPO, Thansettakij (draft)'],
            ['Avg. retail tariff 2027–2050', '3.83–3.89 baht/kWh (about 3.88 under Option 4)', 'EPPO, Nation (draft estimates)'],
            ['Tariff in 2050', '4.11–4.58 baht/kWh', 'Nation (draft estimates)'],
            ['SMR', 'First 300 MW unit in 2037; about 9,000 MW in total by 2050', 'EPPO, Dentons (draft); EGAT reported as developer of the first unit'],
            ['Peak demand', '57,273 MW in 2037; 79,696 MW in 2050', 'Nation (draft). Note: figures differ from other reports (see Section 10)'],
            ['DC & AI load', 'Up to about 8,800 MW in the high-growth case', 'Nation, Bangkokbiznews (draft)'],
            ['Power-sector CO2', 'About 80 Mt now → about 19 Mt in 2050', 'Nation (draft)'],
            ['Grid & storage capex', 'More than 500 billion baht', 'Thansettakij (reporting on the draft)'],
            ['Direct PPA', 'NEPC opened it to all sectors on 15 July 2026 and removed the 2,000 MW cap', 'NEPC resolution (verified); rules and TPA charge not yet set by ERC'],
            ['Jan–Apr 2027 tariff options', 'Households, small users and farm pumps 3.86 / others 4.73 baht, or a flat 5.02 baht', 'ERC public hearing (18–24 Nov, not decided)'],
          ],
          ja: [
            ['計画期間', '2026–2050年（25年）', 'EPPO草案（未承認）'],
            ['第1期新設容量', '約50,900MW', 'EPPO公聴会資料（草案）'],
            ['内訳', '太陽光24,300／風力2,700／BESS 14,500／ガス複合火力（CCGT）9,100／SMR 300MW', 'EPPO・Nation（草案）※DR/DER 2,660MWは50,900MWに含まれない'],
            ['クリーン電源比率', '2037年約49%、2050年65–89%（選択肢4で約73%）', 'EPPO・Thansettakij（草案）'],
            ['平均小売料金（2027–2050年）', '3.83–3.89バーツ／kWh（選択肢4で約3.88）', 'EPPO・Nation（草案の試算）'],
            ['2050年時点料金', '4.11–4.58バーツ／kWh', 'Nation（草案の試算）'],
            ['SMR', '2037年に初号機300MW、2050年までに計約9,000MW', 'EPPO・Dentons（草案）、EGATが初号機を開発との報道'],
            ['ピーク需要', '2037年57,273MW、2050年79,696MW', 'Nation（草案）※他報道と数値相違あり（第10章）'],
            ['データセンター・AI需要', '高成長ケースで最大約8,800MW', 'Nation・Bangkokbiznews（草案）'],
            ['電力部門CO2', '現在約80Mt → 2050年約19Mt', 'Nation（草案）'],
            ['送電網・蓄電投資', '5,000億バーツ超', 'Thansettakij（草案関連報道）'],
            ['Direct PPA', '2026年7月15日NEPCが全業種へ拡大、2,000MW上限撤廃', 'NEPC決議（確認済）；規則・TPA料金はERC未確定'],
            ['2027年1–4月電気料金案', '家庭・小規模・農業用ポンプ3.86／その他4.73バーツ、または一律5.02バーツ', 'ERC公聴会（11月18–24日、未決定）'],
          ],
        },
      },
    },

    timeline: {
      headers: { en: ['Date', 'Event', 'Source'], ja: ['日付', '出来事', '出典'] },
      rows: {
        en: [
          ['25 Jun 2024', 'NEPC approves in principle a Direct PPA pilot for data centres (capped at 2,000 MW)', 'Chambers'],
          ['Mid-2024', 'Public hearing on the draft PDP2024 (including 6.3 GW of new gas). Never finally approved', 'IEEFA, Green Energy Thailand'],
          ['3 Oct 2025', 'ERC publishes draft Direct PPA criteria and a draft TPA code', 'Chambers'],
          ['Nov 2025', 'EPPO begins drafting PDP2026', 'Ten News'],
          ['10 Mar 2026', 'Cabinet approves a three-year extension of the Thailand–Japan LNG cooperation MOU', 'Nation, Thai Government PR'],
          ['Mar 2026', 'Iran conflict. The baht falls 5.3% and LNG cargo costs in baht rise 125% (IEEFA estimate)', 'IEEFA'],
          ['24 Mar 2026', 'PDP2026 focus-group hearing. GDP growth assumption cut from 2.56% to 2.49%', 'Ten News, Kaohoon'],
          ['29 Jun 2026', 'At the 8th Japan–Thailand Energy Policy Dialogue, EGAT signs MOUs with Tokyo Gas Asia and JERA', 'EGAT'],
          ['15 Jul 2026', 'NEPC (chaired by PM Anutin) approves seven measures: Direct PPA opened to all sectors, 2026–2030 tariff structure, review of legacy renewable PPAs', 'Thairath, Baker McKenzie'],
          ['Aug 2026', 'Government publishes an outline of the draft PDP2026', 'IEEFA'],
          ['8 Sep 2026', 'PDP2026 public hearing. EPPO recommends Option 4 (hybrid)', 'EPPO, Bangkokbiznews'],
          ['10 Sep 2026', 'Federation of Thai Industries (FTI) submits five proposals to the Minister (Direct PPA criteria, Causer Pays principle, etc.)', 'Money & Banking, Thansettakij'],
          ['15 Sep 2026', 'Comment period closes. Target of submitting to NEPC in October announced', 'Lexology, Thansettakij'],
          ['22 Sep 2026', 'Cabinet approves the "Fuel Crisis Response Plan" and the "Oil Fund Strategy 2026–2029"', 'InfoQuest'],
          ['18 Oct 2026', 'TDRI backs Option 4 but warns of grid bottlenecks', 'Thansettakij'],
          ['5 Nov 2026', 'EPPO gives no additional data to the House economic development committee. An opposition MP says the completion target is December 2026', 'Thairath'],
          ['13 Nov 2026', 'NEPC approves giving Gulf of Thailand gas priority to households, small businesses and farm pumps (Pool Gas review)', 'Thai PBS, MGR Online'],
          ['17–18 Nov 2026', 'ERC proposes a two-tier Ft for January–April 2027; comments open until 24 November', 'Thairath, The Standard'],
          ['19 Nov 2026', 'Department of Energy Business opens the hearing on the draft Oil Plan 2026 (comments until 27 November). Same day, CFNT flags five risks of the 9,100 MW of gas', 'Energy News Center, Bangkokbiznews'],
        ],
        ja: [
          ['2024年6月25日', 'NEPCがデータセンター向けDirect PPA試行（上限2,000MW）を原則承認', 'Chambers'],
          ['2024年半ば', 'PDP2024草案の公聴会（新規ガス6.3GWを含む）。最終承認に至らず', 'IEEFA、Green Energy Thailand'],
          ['2025年10月3日', 'ERCがDirect PPA基準案とTPAコード案を公表', 'Chambers'],
          ['2025年11月', 'EPPOがPDP2026の策定を開始', 'Ten News'],
          ['2026年3月10日', '閣議がタイ・日本LNG協力MOUの3年延長を承認', 'Nation、タイ政府広報'],
          ['2026年3月', 'イラン紛争。バーツが5.3%下落し、LNGカーゴの調達コストはバーツ建てで125%上昇（IEEFA推計）', 'IEEFA'],
          ['2026年3月24日', 'PDP2026のフォーカスグループ公聴会。GDP成長前提を2.56%→2.49%へ下方修正', 'Ten News、Kaohoon'],
          ['2026年6月29日', '第8回日タイエネルギー政策対話でEGATが東京ガスアジア、JERAとMOU署名', 'EGAT'],
          ['2026年7月15日', 'NEPC（議長：アヌティン首相）が7施策を承認。Direct PPAを全業種へ開放、2026–2030年料金体系、既存再エネPPAの見直し', 'Thairath、Baker McKenzie'],
          ['2026年8月', '政府がPDP2026草案の概要を公表', 'IEEFA'],
          ['2026年9月8日', 'PDP2026公聴会。EPPOは選択肢4（ハイブリッド）を推奨', 'EPPO、Bangkokbiznews'],
          ['2026年9月10日', 'タイ工業連盟（FTI）が5項目の提言を大臣に提出（Direct PPA基準、Causer Pays原則等）', 'Money & Banking、Thansettakij'],
          ['2026年9月15日', '意見募集締切。10月にNEPCへ付議する目標が示された', 'Lexology、Thansettakij'],
          ['2026年9月22日', '閣議が「燃料危機対応計画」と「石油基金戦略2026–2029」を承認', 'InfoQuest'],
          ['2026年10月18日', 'TDRIが選択肢4を支持しつつ、送電網のボトルネックを警告', 'Thansettakij'],
          ['2026年11月5日', '下院経済開発委員会でEPPOが追加データを示さず。野党議員は完了目標を2026年12月と説明', 'Thairath'],
          ['2026年11月13日', 'NEPCがタイ湾ガスを家庭・小規模事業・農業用ポンプに優先配分する方針を承認（Pool Gas見直し）', 'Thai PBS、MGR Online'],
          ['2026年11月17–18日', 'ERCが2027年1–4月のFtを二層化する案を公表、意見募集は11月24日まで', 'Thairath、The Standard'],
          ['2026年11月19日', 'エネルギー事業局がOil Plan 2026草案の公聴会を開始（意見募集は11月27日まで）。同日、CFNTが9,100MWガス火力の5つのリスクを指摘', 'Energy News Center、Bangkokbiznews'],
        ],
      },
      connect: {
        title: { en: 'How these connect', ja: 'これらのつながり' },
        en: 'The draft PDP2024 was criticised for an over-optimistic growth assumption and 6.3 GW of new gas, and was never approved. When the 2026 Iran conflict and the weaker baht sent LNG procurement costs soaring, "lowering gas dependence" and "holding down tariffs" became the top policy priorities. The result is a set of measures pointing the same way: the full opening of Direct PPA in July, the gas reallocation in November (households first), and a PDP2026 draft with a lower gas share. However, the 9,100 MW of gas remains in every scenario, and it is the fault line between a government focused on supply security and civil-society groups and researchers calling for an exit from gas. The resolutions reported from the November NEPC meeting were short-term tariff measures and did not include approval of the PDP.',
        ja: 'PDP2024草案は高すぎる経済成長前提と新規ガス6.3GWで批判を受け、承認されなかった。2026年のイラン紛争とバーツ安でLNG調達コストが急騰したことで、「ガス依存の引き下げ」と「料金抑制」が政策の最優先課題となった。その結果、7月のDirect PPA全面開放、11月のガス配分見直し（家庭優先）、そしてガス比率を引き下げたPDP2026草案が、同じ方向性の施策として出てきている。ただし、ガス火力9,100MWは全シナリオに残っており、供給安定性を重視する政府と、脱ガスを求める市民団体・研究者との対立点になっている。11月のNEPCで報道された決議事項は短期的な料金対策であり、PDP承認は含まれていない。'
      },
    },

    signals: {
      headers: {
        en: ['Signal', 'Current reading', 'Escalation trigger', 'Why it matters'],
        ja: ['シグナル', '現状', 'エスカレーションのトリガー', 'なぜ重要か'],
      },
      rows: {
        en: [
          ['Timing of NEPC submission', 'October target missed. December completion target (per an opposition MP)', 'Slips to January 2027 or later, or the draft is revised again', 'Pushes back the first 2027 tenders and affects order planning'],
          ['Final choice of option', 'EPPO, TDRI and major private players back Option 4 (about 73% clean)', 'Switch to Option 1 (CCS-led) or Option 3 (89% renewables)', 'Changes whether investment flows to gas, CCS or renewables'],
          ['9,100 MW of gas', 'In every scenario, but the project list and contract terms are not public', 'Reallocated to extensions of existing IPP contracts, or direct (non-tendered) awards announced', 'Determines LNG demand and the Availability Payment burden'],
          ['Direct PPA & TPA charge', 'NEPC has approved opening to all sectors. ERC rules and wheeling charge not yet published', 'ERC sets a high wheeling charge, or caps the new allocation', 'Drives the cost of renewable power for Japanese plants and their RE100 and CBAM compliance'],
          ['Business power tariff', 'Jan–Apr 2027 options: 4.73 baht for business users, or a flat 5.02 baht', 'ERC picks the flat 5.02-baht option', 'Manufacturers\' power costs rise by about 22–30% (Section 5 estimate)'],
          ['LNG imports', 'Jan–Jul 2026 average 1,628 MMcf/d (2021 average: 829)', 'Renewed deterioration in the Middle East, further baht weakness', 'Feeds directly into gas and power prices and the Oil Fund\'s finances'],
          ['Oil Plan 2026', 'Draft open for comment until 27 November. E20 and B7 become base fuels', 'Cabinet approval; end date for gasohol 91 fixed', 'Affects fuel retail, logistics costs and ethanol supply and demand'],
        ],
        ja: [
          ['NEPC付議の時期', '10月目標は未達。12月完了目標（野党議員の説明）', '2027年1月以降へずれ込む、または草案の再修正', '2027年の初回入札時期が後ろ倒しになり、受注計画に影響'],
          ['選択肢の最終選定', 'EPPO・TDRI・民間大手は選択肢4（クリーン約73%）を支持', '選択肢1（CCS主導）や選択肢3（再エネ89%）への変更', 'ガス・CCS・再エネのどれに投資が向かうかが変わる'],
          ['9,100MWガス火力', '全シナリオに含まれるが、案件の内訳・契約条件は未公開', '既存IPPの契約延長への振替、または随意契約の発表', 'LNG需要と容量支払い（Availability Payment）負担を決める'],
          ['Direct PPA・TPA料金', 'NEPCが全業種開放を承認済み。ERCの規則・託送料は未公表', 'ERCの託送料が高水準、または新規枠に上限が設定される', '日系工場の再エネ調達コストとRE100・CBAM対応を左右'],
          ['事業用電気料金', '2027年1–4月案：事業用4.73、または一律5.02バーツ', 'ERCが一律5.02バーツ案を選択', '製造業の電力コストが約22–30%上昇（第5章の試算）'],
          ['LNG輸入', '2026年1–7月平均1,628MMcf/d（2021年平均は829）', '中東情勢の再悪化、バーツ安の進行', 'ガス・電力価格と石油基金の財務に直結'],
          ['Oil Plan 2026', '草案の意見募集は11月27日まで。E20とB7を基準燃料化', '閣議承認、ガソホール91の廃止日確定', '燃料販売・物流コスト・エタノール需給に影響'],
        ],
      },
    },

    analysis: {
      label: {
        en: 'Everything below is a WaLens estimate, not an official figure.',
        ja: '以下はすべてWaLensによる概算（Estimate）であり、公式数値ではない。'
      },
      blocks: {
        en: [
          {
            title: '(1) Power cost, January–April 2027 (example: a factory using 10 GWh a year)',
            items: [
              'The gap between the 4.73-baht business option and the current average of 3.86 baht is 0.87 baht/kWh. This matches the Ft difference (103.34 satang − 16.23 satang = 87.11 satang).',
              'Four months of consumption: 10,000,000 kWh ÷ 3 ≈ 3,333,333 kWh',
              'Extra cost under the two-tier option: 3,333,333 × 0.87 ≈ **about 2.9 million baht (4 months)**. About 8.7 million baht annualised; an increase of about 22.5%.',
              'Under the flat 5.02-baht option: the gap is 1.16 baht/kWh, so 3,333,333 × 1.16 ≈ **about 3.87 million baht (4 months)**, an increase of about 30%.',
              'Assumption: the current unit price is taken as the national average of 3.86 baht. Actual unit prices differ by voltage class and TOU tariff; VAT (value-added tax) is excluded.',
            ],
          },
          {
            title: '(2) Average annual build rate in phase 1 (2026–2037, 12 years)',
            items: [
              'Solar: 24,300 ÷ 12 ≈ 2,025 MW/year',
              'BESS: 14,500 ÷ 12 ≈ 1,208 MW/year',
              'Wind: 2,700 ÷ 12 ≈ 225 MW/year',
              'This implies procurement of about 2 GW of solar and about 1.2 GW of BESS every year, and continuous demand for modules, PCS (power conditioning systems), batteries and substation equipment.',
            ],
          },
          {
            title: '(3) Fuel demand of the 9,100 MW of gas (rough estimate)',
            items: [
              'At a 50% capacity factor: 9,100 MW × 8,760 h × 0.5 ≈ 39.9 TWh/year',
              'Assuming a heat rate of about 6,800 Btu/kWh, annual heat input is about 271 trillion Btu, or about 742 billion Btu a day; converted to gas, **about 720 MMcf/d** (at 1 scf ≈ 1,030 Btu).',
              'This equals about 44% of Jan–Jul 2026 LNG imports (1,628 MMcf/d). Together with declining domestic gas fields, it is a factor pushing LNG procurement up.',
              'Meanwhile, IEEFA reports that in 2025, 7 of the 11 private gas plants it analysed ran at under 10% utilisation. Availability Payments (about 0.63 baht/kWh on EGAT\'s estimate, about 17% of the early-2026 base tariff of 3.78 baht) are incurred even at low utilisation.',
            ],
          },
          {
            title: '(4) Direct PPA market size',
            items: [
              'A brokerage (Yuanta) estimates that opening to all sectors expands Direct PPA capacity from 2,000 MW to 8,000–9,000 MW (a brokerage projection, not a government target).',
            ],
          },
          {
            title: '(5) Scale of decarbonisation',
            items: [
              'Power-sector CO2 falls from about 80 Mt to about 19 Mt, a cut of about 76% (draft target). CCS ranges from 0 to 47 MtCO2e depending on the option.',
            ],
          },
        ],
        ja: [
          {
            title: '(1) 2027年1–4月の電力コスト（10GWh／年の工場の例）',
            items: [
              '事業用4.73バーツ案と現行平均3.86バーツの差は0.87バーツ／kWhである。これはFtの差（103.34サタン−16.23サタン＝87.11サタン）とも一致する。',
              '4カ月分の使用量：10,000,000kWh ÷ 3 ≈ 3,333,333kWh',
              '二層案の追加コスト：3,333,333 × 0.87 ≈ **約290万バーツ（4カ月）**。年換算で約870万バーツ、上昇率は約22.5%。',
              '一律5.02バーツ案の場合：差は1.16バーツ／kWhで、3,333,333 × 1.16 ≈ **約387万バーツ（4カ月）**、上昇率は約30%。',
              '前提：現在の支払単価を全国平均3.86バーツと仮定した。実際の単価は電圧区分やTOU料金で異なり、VAT（付加価値税）は含まない。',
            ],
          },
          {
            title: '(2) 第1期の年平均導入ペース（2026–2037年、12年）',
            items: [
              '太陽光：24,300 ÷ 12 ≈ 2,025MW／年',
              'BESS：14,500 ÷ 12 ≈ 1,208MW／年',
              '風力：2,700 ÷ 12 ≈ 225MW／年',
              '太陽光とBESSは毎年それぞれ約2GW、約1.2GW規模の調達が続く計算になる。モジュール、PCS（パワーコンディショナ）、蓄電池、変電設備の継続的な需要が見込める。',
            ],
          },
          {
            title: '(3) 9,100MWガス火力の燃料需要（概算）',
            items: [
              '設備利用率50%の場合：9,100MW × 8,760h × 0.5 ≈ 39.9TWh／年',
              '熱効率を約6,800Btu/kWhと仮定すると、年間の熱量は約271兆Btu、1日あたり約7,420億Btu、ガス量に換算すると**約720MMcf/d**（1scf≈1,030Btuで換算）。',
              'これは2026年1–7月のLNG輸入（1,628MMcf/d）の約44%に相当する。国内ガス田の減退と合わせると、LNG調達量を押し上げる要因となる。',
              '一方、IEEFAによると2025年に分析対象の民間ガス火力11基のうち7基が稼働率10%未満だった。低稼働でもAvailability Payment（EGAT試算で約0.63バーツ／kWh、2026年初の基本料金3.78バーツの約17%）は発生する。',
            ],
          },
          {
            title: '(4) Direct PPA市場規模',
            items: [
              '証券会社（Yuanta）は、全業種開放によりDirect PPAの枠が2,000MWから8,000–9,000MWへ拡大すると推計している（証券会社の見通しであり、政府目標ではない）。',
            ],
          },
          {
            title: '(5) 脱炭素の幅',
            items: [
              '電力部門のCO2は約80Mtから約19Mtへ、約76%減少する（草案の目標）。CCSは選択肢により0〜47MtCO2e。',
            ],
          },
        ],
      } as Bi<{ title: string; items: string[] }[]>,
    },

    competitive: {
      players: {
        title: { en: 'Key Players', ja: 'キープレーヤー' },
        headers: {
          en: ['Group', 'Player', 'Role & stance'],
          ja: ['区分', 'プレーヤー', '役割・立場'],
        },
        rows: {
          en: [
            ['Decision-making', 'NEPC (chaired by PM Anutin Charnvirakul)', 'Final decision-maker on the PDP, Direct PPA and gas allocation'],
            ['Policy design', 'Ministry of Energy (Minister Ekanat; Permanent Secretary Prasut), EPPO (Director-General Wattanapong Kurovat)', 'Draft the plan. Recommend Option 4'],
            ['Regulation', 'ERC (กกพ., spokesperson Poonpat Leesombatpiboon)', 'Responsible for Ft, Direct PPA criteria and TPA charges. Denies that its four-member board is causing delays'],
            ['State utilities', 'EGAT (กฟผ.), PEA, MEA', 'Transmission and system operation; reported developer of the first SMR'],
            ['Gas & fuel', 'PTT Group', 'LNG imports and gas separation. Targets an LNG portfolio of 15 million tonnes a year by 2035'],
            ['Private IPPs', 'GULF (CEO Sarath Ratanavadi), B.Grimm (Chairman Harald Link), GPSC, GUNKUL, EGCO, RATCH, BCPG', 'GULF and B.Grimm back Direct PPA and Option 4. B.Grimm seeks contract extensions for 22 expiring plants, about 3,000 MW'],
            ['Industry', 'Federation of Thai Industries (FTI, Chair Pimjai Leeissaranukul)', 'Wants Direct PPA criteria set quickly and a Causer Pays principle, under which the cost of data-centre load is borne by those who cause it'],
            ['Critics', 'IEEFA, CFNT, JET IN Thailand, People\'s Party (MP Supachot Chaiyasat)', 'Criticise fossil-fuel lock-in from the 9,100 MW of gas and the lack of disclosure'],
            ['Japan', 'METI, JERA, Tokyo Gas, Mitsui & Co., Mitsubishi Heavy Industries group (Mitsubishi Power)', 'LNG cooperation MOU extension; low-carbon fuel and hydrogen MOUs with EGAT. Mitsui holds a stake in GULF\'s large EEC gas-fired plant (5,300 MW), which Mitsubishi Power is building'],
          ],
          ja: [
            ['政策決定', 'NEPC（議長：アヌティン・チャーンウィラクン首相）', 'PDP・Direct PPA・ガス配分の最終決定機関'],
            ['政策立案', 'エネルギー省（エカナット大臣、プラスート次官）、EPPO（ワッタナポン局長）', '草案作成。選択肢4を推奨'],
            ['規制', 'ERC（กกพ.、プーンパット報道官）', 'Ft、Direct PPA基準、TPA料金を担当。4人体制による遅延説は否定'],
            ['国営電力', 'EGAT（กฟผ.）、PEA、MEA', '送電・系統運用、SMR初号機の開発主体（報道）'],
            ['ガス・燃料', 'PTTグループ', 'LNG輸入・ガス分離。2035年までにLNGポートフォリオ年1,500万トンを目標'],
            ['民間IPP', 'GULF（サラット・ラタナワディCEO）、B.Grimm（ハラルド・リンク会長）、GPSC、GUNKUL、EGCO、RATCH、BCPG', 'GULF・B.GrimmはDirect PPAと選択肢4を支持。B.Grimmは期限切れの既存22基・約3,000MWの契約延長を要望'],
            ['産業界', 'タイ工業連盟（FTI、ピムジャイ会長）', 'Direct PPA基準の早期策定、データセンター負荷のコストは発生者が負担するCauser Pays原則を要望'],
            ['批判側', 'IEEFA、CFNT、JET IN Thailand、人民党（スパチョート議員）', 'ガス9,100MWによる化石燃料ロックイン、情報公開の不足を批判'],
            ['日本側', 'METI、JERA、東京ガス、三井物産、三菱重工系（Mitsubishi Power）', 'LNG協力MOU延長、EGATとの低炭素燃料・水素MOU。三井物産はGULFとのEEC大型ガス火力（5,300MW）に出資、同案件はMitsubishi Powerが建設'],
          ],
        },
      },
      winners: {
        title: { en: 'Winners and Losers', ja: '勝者と敗者' },
        en: [
          '**Likely winners:** Large IPPs with solar + BESS development capability and grid-connection know-how (GULF and GUNKUL are brokerage picks). Renewable developers able to sell under Direct PPA. Suppliers of transmission, smart-grid and BESS equipment.',
          '**Conditional:** Gas-fired plant operators. The 9,100 MW remains, but gas-turbine lead times have stretched from 1–2 years to 4–5 years (GULF), so even if tenders run in 2027, commercial operation will probably slip to the early 2030s.',
          '**Losers (at risk):** Power-intensive manufacturers unable to pass on higher business tariffs. Exporters that cannot secure green power and so cannot meet CBAM or supply-chain decarbonisation demands.',
        ],
        ja: [
          '**勝者（見込み）:** 太陽光＋BESSの開発力と系統接続ノウハウを持つ大手IPP（GULF、GUNKULは証券会社の推奨銘柄）。Direct PPAの売り手になれる再エネ事業者。送電・スマートグリッド・BESSの機器サプライヤー。',
          '**条件付き:** ガス火力事業者。9,100MWは残るが、ガスタービンの納期が1–2年から4–5年に延びており（GULF）、2027年に入札しても運転開始は2030年代前半になる可能性が高い。',
          '**敗者（リスク）:** 事業用料金の上昇を価格転嫁できない電力多消費型の製造業。グリーン電力を確保できず、CBAMやサプライチェーンの脱炭素要求に応えられない輸出企業。',
        ],
      },
      positioning: {
        title: { en: 'Japanese Positioning', ja: '日系企業のポジショニング' },
        en: [
          '**Trading houses, power and gas companies:** Using the LNG cooperation MOU (extended March 2026) and the low-carbon fuel MOU (June 2026) as a foothold, they can take part in gas-fired plants, LNG receiving, hydrogen and ammonia co-firing, and CCS projects. However, criticism from CFNT and others may tighten reputational screening of gas projects.',
          '**Equipment and EPC:** Gas-turbine supply constraints are a source of bargaining power for Japanese manufacturers. Demand for BESS, substation equipment, grid-stabilisation devices (STATCOM, etc.) and smart meters will also continue year after year.',
          '**SMR:** The first 300 MW unit in 2037 depends on the regulatory framework being put in place (Dentons). The realistic entry point for Japanese players is cooperation on technology and human-resource development.',
          '**Power users (manufacturers):** Once the Direct PPA and TPA rules are settled, the earliest signers will lock in the most favourable renewable suppliers.',
        ],
        ja: [
          '**商社・電力・ガス会社:** LNG協力MOU（2026年3月延長）と低炭素燃料MOU（2026年6月）を足がかりに、ガス火力、LNG受入、水素・アンモニア混焼、CCSの案件に関与できる。ただし、CFNTなどの批判によりガス案件はレピュテーション面の審査が強まる可能性がある。',
          '**機器・EPC:** ガスタービンの供給制約は日本メーカーにとって交渉力の源泉になる。BESS、変電設備、系統安定化装置（STATCOM等）、スマートメーターの需要も年単位で継続する。',
          '**SMR:** 2037年の初号機300MWは、規制枠組みの整備（Dentons）次第である。日本勢は技術・人材育成の協力から関与するのが現実的である。',
          '**需要家（製造業）:** Direct PPAとTPAの規則が固まった時点で、早く契約した企業ほど有利な再エネ供給元を確保できる。',
        ],
      },
      regional: {
        title: { en: 'Regional Comparison (for reference)', ja: '地域比較（参考）' },
        en: 'Within the scope of this research, no primary source comparing PDP2026 with the power plans of Singapore, Malaysia, Vietnam or Indonesia was found. No comparison is made here.',
        ja: '本調査の範囲では、PDP2026とシンガポール、マレーシア、ベトナム、インドネシアの電力計画を比較した一次資料は確認できなかった。ここでは比較を行わない。'
      },
    },

    sectorGuide: {
      labels: {
        relevance: { en: 'Direct relevance', ja: '直接的関連' },
        exposure: { en: 'Exposure', ja: 'エクスポージャー' },
      },
      urgencyLabel: {
        High: { en: 'High', ja: '高' },
        HighOpportunity: { en: 'High (opportunity)', ja: '高（機会）' },
        Medium: { en: 'Medium', ja: '中' },
        Low: { en: 'Low', ja: '低' },
      } as Record<Urgency, Bi<string>>,
      items: [
        {
          urgency: 'High' as Urgency,
          en: { sector: 'Electronics & semiconductors (export)', relevance: 'RE100, CBAM, Direct PPA', exposure: 'Higher tariffs and a shortage of green power', stance: 'Set out Direct PPA procurement requirements within this quarter' },
          ja: { sector: '電子・半導体（輸出）', relevance: 'RE100、CBAM、Direct PPA', exposure: '料金上昇とグリーン電力不足', stance: 'Direct PPAの調達要件を今四半期中に整理' },
        },
        {
          urgency: 'High' as Urgency,
          en: { sector: 'Automotive & parts', relevance: 'Power costs, supplier decarbonisation', exposure: 'Costs rise under the 4.73-baht option', stance: 'Build the two-tier tariff into the 2027 budget' },
          ja: { sector: '自動車・部品', relevance: '電力コスト、サプライヤーの脱炭素', exposure: '4.73バーツ案で原価が上昇', stance: '2027年予算に二層料金を織り込む' },
        },
        {
          urgency: 'High' as Urgency,
          en: { sector: 'Chemicals & petrochemicals', relevance: 'Gas prices, Pool Gas review', exposure: 'Hit on both gas and power', stance: 'Review price clauses in gas and power contracts' },
          ja: { sector: '化学・石化', relevance: 'ガス価格、Pool Gas見直し', exposure: 'ガス・電力の双方で影響', stance: 'ガス・電力契約の価格条項を点検' },
        },
        {
          urgency: 'High' as Urgency,
          en: { sector: 'Steel, glass & cement', relevance: 'Power-intensive', exposure: 'About a 30% increase under the flat 5.02-baht option', stance: 'Bring forward rooftop solar + BESS for self-consumption' },
          ja: { sector: '鉄鋼・ガラス・セメント', relevance: '電力多消費', exposure: '一律5.02バーツ案なら約30%の上昇', stance: '自家消費太陽光＋BESSを前倒しで検討' },
        },
        {
          urgency: 'High' as Urgency,
          en: { sector: 'Data centres', relevance: 'Up to 8,800 MW of projected demand; deposits for grid use', exposure: 'Connection capacity, tariffs, Causer Pays principle', stance: 'Negotiate grid connection and Direct PPA in parallel' },
          ja: { sector: 'データセンター', relevance: '最大8,800MWの需要想定、系統使用の保証金', exposure: '接続枠、料金、Causer Pays原則', stance: '系統接続とDirect PPAの交渉を並行' },
        },
        {
          urgency: 'HighOpportunity' as Urgency,
          en: { sector: 'Trading houses, power & gas', relevance: 'Tenders, LNG, selling under Direct PPA', exposure: 'Delays to tender timing', stance: 'Form consortia for the 2027 tenders' },
          ja: { sector: '商社・電力・ガス', relevance: '入札、LNG、Direct PPAの売り手', exposure: '入札時期の遅延', stance: '2027年入札に向けた共同体の組成' },
        },
        {
          urgency: 'HighOpportunity' as Urgency,
          en: { sector: 'Equipment & EPC', relevance: 'Turbines, BESS, transmission grid', exposure: 'Supply constraints and price competition', stance: 'Pre-market to EGAT, PEA and IPPs' },
          ja: { sector: '機器・EPC', relevance: 'タービン、BESS、送電網', exposure: '供給制約と価格競争', stance: 'EGAT、PEA、IPPへの事前営業' },
        },
        {
          urgency: 'Medium' as Urgency,
          en: { sector: 'Food & consumer goods', relevance: 'Power and logistics fuel', exposure: 'Moderate', stance: 'Check tariff increases and fuel-grade changes' },
          ja: { sector: '食品・日用品', relevance: '電力・物流燃料', exposure: '中程度', stance: '料金上昇と燃料グレード変更を確認' },
        },
        {
          urgency: 'Medium' as Urgency,
          en: { sector: 'Logistics & transport', relevance: 'B7/B20, E20, diesel prices', exposure: 'Changes to fuel specifications and Oil Fund subsidies', stance: 'Check vehicles\' B20 and E20 compatibility' },
          ja: { sector: '物流・運輸', relevance: 'B7／B20、E20、ディーゼル価格', exposure: '燃料仕様と石油基金補助の変更', stance: '車両のB20・E20適合性を確認' },
        },
        {
          urgency: 'Medium' as Urgency,
          en: { sector: 'Banks & leasing', relevance: 'Project finance, stranded-asset risk', exposure: 'Long-term risk on gas projects', stance: 'Scrutinise capacity payments and contract terms' },
          ja: { sector: '銀行・リース', relevance: 'プロジェクトファイナンス、座礁資産リスク', exposure: 'ガス案件の長期リスク', stance: '容量支払いと契約条件を精査' },
        },
      ],
    },

    nextActions: {
      horizons: {
        en: [
          {
            label: 'Today',
            actions: [
              'Total the power use (kWh) and voltage class of your Thai sites, and estimate the impact under the January–April 2027 tariff options (4.73 baht / 5.02 baht).',
              'Share the contents of the ERC hearing (closes 24 November) and the Oil Plan 2026 hearing (closes 27 November) with your in-house energy team.',
              'In reports to head office, state clearly that PDP2026 is "an unapproved draft" and that first-phase volumes are common to all scenarios.',
            ],
          },
          {
            label: 'This week',
            actions: [
              'Summarise your internal Direct PPA requirements on one page: volume needed, price ceiling, contract term, and RE100/CBAM certificate requirements.',
              'Sound out your IPP partners (GULF, B.Grimm, GPSC, etc.) and trading houses on whether they can supply under Direct PPA.',
              'Check your transport vehicles and boilers for B20 and E20 compatibility.',
            ],
          },
          {
            label: 'This month',
            actions: [
              'Monitor the next NEPC meeting and whether the PDP is tabled, and check whether first-phase volumes or options change in the approved version.',
              'Recalculate the payback on rooftop solar + BESS for self-consumption, assuming the two-tier tariff.',
              'Trading houses and equipment makers: shortlist partner candidates for the 2027 tenders (solar + BESS, gas, transmission).',
            ],
          },
          {
            label: 'This quarter',
            actions: [
              'Once ERC publishes the Direct PPA criteria and TPA charge, settle the economics of off-site renewable procurement.',
              'Reflect power and fuel cost assumptions in the 2027 budget and price pass-through policy.',
              'For LNG and gas projects, revise investment criteria to include stranded-asset risk and reputational screening.',
            ],
          },
        ],
        ja: [
          {
            label: '今日',
            actions: [
              '自社のタイ拠点の電力使用量（kWh）と電圧区分を集計し、2027年1–4月の料金案（4.73バーツ／5.02バーツ）で影響額を試算する。',
              'ERC公聴会（11月24日締切）とOil Plan 2026公聴会（11月27日締切）の内容を社内のエネルギー担当と共有する。',
              '本社への報告で、PDP2026は「未承認の草案」であり、第1期の数量はシナリオ共通という前提を明記する。',
            ],
          },
          {
            label: '今週',
            actions: [
              'Direct PPAの社内要件（必要量、価格上限、契約期間、RE100・CBAMの証書要件）を1枚にまとめる。',
              '取引先IPP（GULF、B.Grimm、GPSC等）や商社にDirect PPAの供給可能性を打診する。',
              '輸送車両とボイラーのB20・E20適合性を確認する。',
            ],
          },
          {
            label: '今月',
            actions: [
              'NEPCの次回会合とPDP付議の有無をモニターし、承認版で第1期数量や選択肢が変わっていないか確認する。',
              '自家消費太陽光＋BESSの投資回収を、二層料金を前提に再計算する。',
              '商社・機器メーカーは、2027年入札（太陽光＋BESS、ガス、送電）に向けたパートナー候補を絞り込む。',
            ],
          },
          {
            label: '今四半期',
            actions: [
              'ERCのDirect PPA基準とTPA料金が公表された時点で、オフサイト再エネ調達の経済性を確定させる。',
              '2027年度の予算と価格転嫁方針に電力・燃料コストの前提を反映する。',
              'LNG・ガス案件は、座礁資産リスクとレピュテーション審査を含めて投資判断の基準を見直す。',
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
          ['NEPC approves PDP2026 (December target)', 'First-phase volumes are fixed and tenders start in 2027', 'Step up tender preparation. Option 4 means a renewables- and BESS-led build'],
          ['Approval slips into 2027', 'PDP2018 Revision 1 stays in force', 'Tenders are pushed back; extensions of existing IPP contracts come first'],
          ['ERC chooses the flat 5.02 baht', 'Business tariffs rise by about 30%', 'Price pass-through negotiations; bring forward self-generation'],
          ['ERC publishes the TPA charge', 'The real cost of Direct PPA becomes clear', 'Start negotiating renewable supply contracts'],
          ['Breakdown of the 9,100 MW disclosed (direct awards, contract extensions)', 'It becomes clear who will build the gas projects', 'Participation opportunities for Japanese gas and equipment firms become concrete'],
          ['Renewed deterioration in the Middle East', 'Volatility in LNG prices and the baht', 'Ft rises again; Oil Fund subsidies expand'],
          ['Cabinet approves Oil Plan 2026', 'End date for gasohol 91 is fixed', 'Review fuel sales, ethanol supply and demand, and logistics costs'],
          ['SMR regulatory law put in place', 'Nuclear regulatory framework takes shape', 'Possible Japanese technology-cooperation and training projects'],
        ],
        ja: [
          ['NEPCがPDP2026を承認（12月目標）', '第1期の数量が確定し、2027年に入札開始', '入札準備を本格化。選択肢4なら再エネ・BESS中心'],
          ['承認が2027年にずれ込む', 'PDP2018改訂1版が継続', '入札は後ろ倒し。既存IPPの契約延長が先行'],
          ['ERCが一律5.02バーツを選択', '事業用料金が約30%上昇', '価格転嫁交渉、自家発電の前倒し'],
          ['ERCがTPA料金を公表', 'Direct PPAの実コストが判明', '再エネ調達の契約交渉を開始'],
          ['9,100MWの内訳開示（随意契約・契約延長）', 'ガス案件の担い手が判明', '日系ガス・機器企業の参画機会が具体化'],
          ['中東情勢の再悪化', 'LNG価格とバーツの変動', 'Ftの再上昇、石油基金の補助拡大'],
          ['Oil Plan 2026の閣議承認', 'ガソホール91の廃止時期が確定', '燃料販売、エタノール需給、物流コストの見直し'],
          ['SMRの規制法整備', '原子力規制の枠組みが具体化', '日本の技術協力・人材育成案件の可能性'],
        ],
      },
    },

    caveats: {
      title: { en: 'Source Notes and Caveats', ja: '出典注記と留意点' },
      groups: {
        en: [
          {
            title: 'Verified from primary or official sources',
            tone: 'verified',
            items: [
              'Public-hearing dates (held 8 September 2026, closed 15 September) and the first-phase breakdown (EPPO announcement).',
              'NEPC resolution of 15 July 2026 (Direct PPA opened to all sectors) and NEPC resolution of 13 November 2026 (priority allocation of Gulf of Thailand gas). Both reported by multiple outlets as government/ERC announcements.',
              'Cabinet extension of the Thailand–Japan LNG cooperation MOU on 10 March 2026 (Thai Government PR); MOUs between EGAT and Tokyo Gas Asia and JERA on 29 June 2026 (EGAT announcement).',
            ],
          },
          {
            title: 'Secondary (press and analysis)',
            tone: 'secondary',
            items: [
              'Average tariff estimates, the Option 4 recommendation, the SMR phasing, peak demand and transmission investment are based on press reports; the full draft has not been published.',
              'Direct PPA of 8,000–9,000 MW is a brokerage (Yuanta) estimate.',
              'Gas-plant utilisation and LNG procurement-cost analysis are IEEFA and CFNT estimates.',
            ],
          },
          {
            title: 'Not found',
            tone: 'notfound',
            items: [
              'Dates of NEPC and Cabinet approval of PDP2026 (not approved as of 24 November).',
              'Project names, developers and contract structures for the 9,100 MW of gas.',
              'The full text of the draft (EPPO has published only an outline and public-hearing materials).',
            ],
          },
          {
            title: 'Conflicting figures (listed, not merged)',
            tone: 'conflicting',
            items: [
              '**Peak demand (2037):** Nation reports 57,273 MW; Thai PBS Policy Watch reports both 48,041 MW (−4% vs PDP2024) and 54,192 MW. Probably a difference in definition (whether the three utilities are summed), but this could not be confirmed.',
              '**Clean-power share:** The Minister said "60% in 2050" in June; Thai PBS (July) said "70%"; the public-hearing materials say "65–89% (about 73% under Option 4)". The draft appears to have changed over time.',
              '**Number of post-2038 options:** Most reports describe four options, but one Nation article shows a table of three.',
              '**End date for gasohol 91:** Nation, MGR Online and Energy News Center report "(end-)2027"; Bangkokbiznews reports "by 2031 (พ.ศ. 2574)". The Prime Minister and the Ministry of Energy say it is "a matter for the future, not an immediate phase-out".',
            ],
          },
        ],
        ja: [
          {
            title: '一次資料で確認できたもの',
            tone: 'verified',
            items: [
              '公聴会の日程（2026年9月8日開催、9月15日締切）と第1期の内訳（EPPO発表）。',
              '2026年7月15日NEPC決議（Direct PPAの全業種開放）、2026年11月13日NEPC決議（タイ湾ガスの優先配分）。いずれも政府・ERCの発表として複数メディアが報道。',
              '2026年3月10日の閣議によるタイ・日本LNG協力MOU延長（タイ政府広報）、2026年6月29日のEGATと東京ガスアジア・JERAのMOU（EGAT発表）。',
            ],
          },
          {
            title: '二次資料（報道・分析）',
            tone: 'secondary',
            items: [
              '平均料金の試算、選択肢4の推奨、SMRの段階計画、ピーク需要、送電投資額は報道ベースであり、草案の全文は未公表。',
              'Direct PPA 8,000–9,000MWは証券会社（Yuanta）の推計。',
              'ガス火力の稼働率、LNG調達コストの分析はIEEFA・CFNTの独自推計。',
            ],
          },
          {
            title: '確認できなかったもの',
            tone: 'notfound',
            items: [
              'PDP2026のNEPC承認日、閣議承認日（11月24日時点で未承認）。',
              '9,100MWガス火力の案件名、事業者、契約形態。',
              '草案の全文（EPPOは概要と公聴会資料のみ公表）。',
            ],
          },
          {
            title: '数値の相違（統合せず併記）',
            tone: 'conflicting',
            items: [
              '**ピーク需要（2037年）:** Nationは57,273MW、Thai PBS Policy Watchは48,041MW（PDP2024比−4%）と54,192MWの両方の数値を報じている。需要の定義（3電力公社合計か否か）の違いとみられるが、確認できていない。',
              '**クリーン電源比率:** 大臣の6月時点の説明は「2050年に60%」、Thai PBS（7月）は「70%」、公聴会資料は「65–89%（選択肢4で約73%）」。時期によって草案が変わったものと考えられる。',
              '**2038年以降の選択肢数:** 大半の報道は4選択肢とするが、Nationの記事は3選択肢の表を示している。',
              '**ガソホール91の廃止時期:** Nation、MGR Online、Energy News Centerは「2027年（末）」、Bangkokbiznewsは「2031年（พ.ศ. 2574）までに」と報じている。また首相とエネルギー省は「将来の話で即時廃止ではない」と説明している。',
            ],
          },
        ],
      },
      forward: {
        en: '**Forward-looking items:** PDP2026, Oil Plan 2026 and the ERC Ft options are all "announced intentions / drafts", not measures in force. The estimates in Section 5 are WaLens approximations.',
        ja: '**将来に関する記述：** PDP2026、Oil Plan 2026、ERCのFt案はいずれも「発表された意向・草案」であり、施行済みの措置ではない。第5章の試算はWaLensの概算である。'
      },
    },

    sourceGroups: [
      {
        label: 'Thai',
        items: [
          { label: 'Thansettakij – ชง PDP2026 เข้า กพช. ต.ค. เอกชนเปิด 3 ทางรอด (16 Sep 2026)', url: 'https://www.thansettakij.com/economy/energy/669038' },
          { label: 'Thansettakij – ส.อ.ท. ชำแหละ PDP2026 50,900 เมกฯ', url: 'https://www.thansettakij.com/economy/energy/669430' },
          { label: 'Thansettakij – เวทีรับฟังความเห็น PDP 2026 แนวทางที่ 4 สะอาด 73%', url: 'https://www.thansettakij.com/economy/energy/668512' },
          { label: 'Thansettakij – TDRI ผ่า PDP 2026 (18 Oct 2026)', url: 'https://www.thansettakij.com/sustainable/671721' },
          { label: 'Bangkokbiznews – สนพ. เล็งเลือกกรณี 4 ไฮบริด (8 Sep 2026)', url: 'https://www.bangkokbiznews.com/economics/1250940' },
          { label: 'Bangkokbiznews – 5 ความเสี่ยง ก๊าซ 9,100 เมกะวัตต์ (19 Nov 2026)', url: 'https://www.bangkokbiznews.com/sustainability/1261114' },
          { label: 'Bangkokbiznews – รื้อใหญ่ Oil Plan 2026', url: 'https://www.bangkokbiznews.com/economics/1261463' },
          { label: 'Thairath – ศุภโชติ โวยยื้อส่งข้อมูล PDP2026 (6 Nov 2026)', url: 'https://www.thairath.co.th/news/politic/2970831' },
          { label: 'Thairath – กกพ. ชงตรึงค่าไฟบ้านงวด ม.ค.–เม.ย. 2570 (18 Nov 2026)', url: 'https://www.thairath.co.th/news/governmentpolicy/2973250' },
          { label: 'Thai PBS – กกพ. ชงตรึงค่าเอฟที 16.23 สต. รับมติรื้อ Pool Gas', url: 'https://www.thaipbs.or.th/news/content/572921' },
          { label: 'Thai PBS Policy Watch – PDP 2026 (demand forecast)', url: 'https://policywatch.thaipbs.or.th/article/economy-292' },
          { label: 'MGR Online – เปิดรับฟังความเห็นร่าง PDP (8 Sep 2026)', url: 'https://mgronline.com/business/detail/9690000088039' },
          { label: 'MGR Online – เปิดร่าง Oil Plan 2026', url: 'https://mgronline.com/business/detail/9690000110659' },
          { label: 'Energy News Center – เปิดร่างแผน Oil Plan 2026', url: 'https://www.energynewscenter.com/%E0%B8%A3%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%9C%E0%B8%99-oil-plan-2026-%E0%B8%88%E0%B9%88%E0%B8%AD%E0%B8%A2%E0%B8%81%E0%B9%80%E0%B8%A5%E0%B8%B4%E0%B8%81%E0%B9%81%E0%B8%81%E0%B9%8A%E0%B8%AA/' },
          { label: 'EPPO – สนพ. เปิดรับฟังความคิดเห็นร่างแผน PDP2026', url: 'https://www.eppo.go.th/information-services/advertise/news-eppo/%E0%B8%AA%E0%B8%99%E0%B8%9E-%E0%B9%80%E0%B8%9B%E0%B8%B4%E0%B8%94%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9F%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%B4%E0%B8%94%E0%B9%80-4/' },
          { label: 'Kaohoon – สนพ. เปิดร่าง PDP 2026 ชู GULF–GUNKUL', url: 'https://www.kaohoon.com/news/861406' },
          { label: 'Ten News – เปิดรับฟังร่างแผน PDP 2026 คุมค่าไฟไม่เกิน 3.88 บาท', url: 'https://www.ten-news.com/%E0%B9%80%E0%B8%9B%E0%B8%B4%E0%B8%94%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9F%E0%B8%B1%E0%B8%87%E0%B8%A3%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%9C%E0%B8%99-pdp-2026-%E0%B8%84%E0%B8%B8%E0%B8%A1%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B9%84%E0%B8%9F%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%80%E0%B8%81%E0%B8%B4%E0%B8%99-3-88-%E0%B8%9A%E0%B8%B2%E0%B8%97/' },
          { label: 'InfoQuest – ก.พลังงาน ปรับยุทธศาสตร์กองทุนน้ำมันฯ', url: 'https://www.infoquest.co.th/2026/660430' },
        ],
      },
      {
        label: 'English',
        items: [
          { label: 'Nation Thailand – PDP 2026 maps 50.9GW power build-out (2 Sep 2026)', url: 'https://www.nationthailand.com/sustaination/40070547' },
          { label: 'Nation Thailand – Four scenarios, tariffs up to 4.58 baht by 2050', url: 'https://www.nationthailand.com/news/40070671' },
          { label: 'Nation Thailand – Energy Ministry proposes ending gasohol 91 sales by end-2027 (20 Nov 2026)', url: 'https://www.nationthailand.com/news/policy/40073707' },
          { label: 'Nation Thailand – Cabinet backs Thailand–Japan LNG cooperation extension (10 Mar 2026)', url: 'https://www.nationthailand.com/news/policy/40063581' },
          { label: 'Thairath English – NEPC approves seven electricity measures (15 Jul 2026)', url: 'https://en.thairath.co.th/news/politic/2946495' },
          { label: 'Lexology – Draft PDP2026: A Structural Reorientation', url: 'https://www.lexology.com/library/detail.aspx?g=05be7782-a2c8-4bd8-a99f-5ce2f491819b' },
          { label: "Chambers – Thailand's draft Direct PPA criteria", url: 'https://chambers.com/articles/thailand-s-draft-direct-ppa-criteria-eligibility-allocation-and-the-road-ahead' },
          { label: 'Dentons – Regulatory pathway for SMRs (Oct 2026)', url: 'https://www.dentons.com/en/insights/articles/2026/october/15/navigating-thailands-nuclear-future-the-regulatory-pathway-for-smrs' },
          { label: 'IEEFA – Draft PDP 2026 signals historic retreat from gas (15 Sep 2026)', url: 'https://ieefa.org/resources/thailands-draft-power-development-plan-2026-signals-historic-retreat-gas-power' },
          { label: "IEEFA – Iran conflict exposes Thailand's LNG vulnerability (1 Apr 2026)", url: 'https://ieefa.org/resources/iran-conflict-exposes-thailands-lng-vulnerability' },
          { label: 'Thai PBS World – Clean energy or fossil fuel lock-in?', url: 'https://www.thaipbsworld.com/energy-crisis/558863' },
          { label: 'EGAT – Thailand and Japan join forces to advance clean energy (Jul 2026)', url: 'https://www.egat.co.th/home/en/?p=20353' },
          { label: 'Wikipedia – Rayong Power Plant (Gulf/Mitsui, Mitsubishi Power 5,300 MW)', url: 'https://en.wikipedia.org/wiki/Rayong_Power_Plant' },
          { label: 'Baker McKenzie – Government moves to revisit legacy renewable PPAs (Jul 2026)', url: 'https://www.bakermckenzie.com/-/media/files/insight/publications/2026/07/thailand_government-moves-to-revisit-legacy-renewable-ppas.pdf' },
        ],
      },
      {
        label: 'Japanese',
        items: [
          { label: 'NEDO – ASEANのエネルギー分野の現状・関連動向に係る調査（タイ）', url: 'https://www.nedo.go.jp/content/800053982.pdf' },
        ],
      },
    ],

    related: {
      title: { en: 'Related WaLens reports', ja: '関連レポート' },
      links: [
        { to: '/insights/services/oil-crisis-thai-industry', label: { en: 'Oil crisis and Thai industry', ja: '石油危機とタイ産業' } },
        { to: '/insights/services/energy-crisis-baht-strategy-2026', label: { en: 'Energy crisis and baht strategy', ja: 'エネルギー危機とバーツ戦略' } },
        { to: '/insights/investment/thailand-data-centre-pitching-2026', label: { en: 'Thailand moves new data centres to competitive pitching', ja: 'タイ新規データセンターの競争選抜' } },
      ],
    },
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
    u === 'High' || u === 'HighOpportunity' ? 'destructive' : u === 'Medium' ? 'secondary' : 'outline';

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
          <img src={heroImage} alt="Power-plant chimneys, LNG tankers and solar panels at sunset — Thailand PDP2026 power plan analysis for Japanese executives" className="absolute inset-0 w-full h-full object-cover z-0" />
          {/* Lighter shading than other reports so the power-plant photo stays visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
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
          <Breadcrumb items={[
            { label: isJapanese ? 'インサイト' : 'Insights', href: '/insights' },
            { label: isJapanese ? '経済政策' : 'Economic Policy', href: '/insights?filter=economic-policy' },
            { label: isJapanese ? 'タイPDP2026電力開発計画' : 'Thailand PDP2026 Power Plan' }
          ]} />

          {/* About this report — visible to everyone */}
          <Card className="mt-6 mb-6 bg-muted/40 border-dashed">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                {content.reportMeta.title[L]}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {content.reportMeta.rows[L].map(([k, v], idx) => (
                  <div key={idx} className="text-xs">
                    <p className="font-semibold text-foreground">{k}</p>
                    <p className="text-muted-foreground leading-relaxed" style={cellStyle}>{v}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground pt-2 border-t border-border/50" style={cellStyle}>
                {renderBold(content.reportMeta.draftNote[L])}
              </p>
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

          {/* 02 Policy Overview */}
          <section id="overview" className="mb-12 scroll-mt-20">
            {sectionHeader(<Database className="h-6 w-6 text-blue-500" />, 'bg-blue-500/10', isJapanese ? '政策の概要' : 'Policy Overview')}
            <Card className="mb-6 border-l-4 border-l-blue-500/50">
              <CardContent className="pt-6 space-y-3">
                {renderParas(content.overview.paras[L])}
              </CardContent>
            </Card>
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
                      ? '定量分析（WaLensによる概算）、キープレーヤー一覧と競争・戦略ダイナミクス、セクター別戦略判断、次のアクション、戦略的ウォッチポイント、出典を含む完全版レポートにアクセスするにはプレミアムプランが必要です。'
                      : 'The full quantitative analysis (WaLens estimates), key players and competitive dynamics, sector decision guide, next action insights, strategic watchpoints and sources require a premium subscription.'
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
                    {isJapanese ? 'WaLensによる概算' : 'Estimate'}
                  </Badge>
                  <p className="text-sm italic text-muted-foreground" style={cellStyle}>{content.analysis.label[L]}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.analysis.blocks[L].map((block, idx) => (
                    <Card key={idx} className={`border-l-4 border-l-purple-500/50 ${idx === 0 ? 'md:col-span-2' : ''}`}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base" style={cellStyle}>{block.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {renderList(block.items, bulletIcon)}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* 06 Competitive & Strategic Dynamics */}
              <section id="competitive" className="mb-12 scroll-mt-20" onClick={handleDataAppendixAccess}>
                {sectionHeader(<Globe className="h-6 w-6 text-blue-500" />, 'bg-blue-500/10', isJapanese ? '競争・戦略ダイナミクス' : 'Competitive & Strategic Dynamics')}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      {content.competitive.players.title[L]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderTable(content.competitive.players.headers[L], content.competitive.players.rows[L], 'font-semibold whitespace-nowrap', 'min-w-[720px]')}
                  </CardContent>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card className="border-l-4 border-l-blue-500/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{content.competitive.winners.title[L]}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderList(content.competitive.winners[L], bulletIcon)}
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-blue-500/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{content.competitive.positioning.title[L]}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderNumbered(content.competitive.positioning[L])}
                    </CardContent>
                  </Card>
                </div>
                <Card className="bg-muted/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{content.competitive.regional.title[L]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderParas([content.competitive.regional[L]])}
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
                              {content.sectorGuide.urgencyLabel[s.urgency][L]}
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
                <Card className="mb-6">
                  <CardContent className="pt-6 space-y-5">
                    {(() => {
                      let n = 0;
                      return content.sourceGroups.map((group) => (
                        <div key={group.label}>
                          <p className="text-sm font-semibold mb-2">{group.label}</p>
                          <ol className="space-y-1.5 text-sm text-muted-foreground">
                            {group.items.map((source) => {
                              n += 1;
                              return (
                                <li key={source.url} className="flex gap-2" style={cellStyle}>
                                  <span className="font-mono text-xs mt-0.5 w-6 flex-shrink-0 text-right">{n}.</span>
                                  <a
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                  >
                                    {source.label}
                                  </a>
                                </li>
                              );
                            })}
                          </ol>
                        </div>
                      ));
                    })()}
                  </CardContent>
                </Card>
                <Card className="bg-muted/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      {content.related.title[L]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {content.related.links.map((r) => (
                        <li key={r.to}>
                          <Link to={r.to} className="inline-flex items-center gap-1 text-sm text-primary hover:underline" style={cellStyle}>
                            {r.label[L]}
                            <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
                          </Link>
                        </li>
                      ))}
                    </ul>
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

export default ThailandPDP2026PowerPlan;
