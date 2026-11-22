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
import heroImage from '@/assets/hero-bkk-tokyo.webp';

// JP translation drafted by Claude — to be reviewed before marketing push

type Bi<T> = { en: T; ja: T };
type Urgency = 'High' | 'Medium' | 'Low';

const ThailandUSARTJointStatement2026 = () => {
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

  const slug = 'thailand-us-art-joint-statement-2026';
  const titleEn = 'Thailand–US ART Joint Statement: A Signal, Not a Tariff Cut — What Japanese Manufacturers Should Do Before the Final Text Lands';
  const titleJa = 'タイ・米国ART共同声明：関税引き下げではなく「シグナル」——最終条文が出る前に日系メーカーが打つべき手';
  const publishedDate = '2026-11-20';
  const canonicalPath = '/insights/trade/thailand-us-art-joint-statement-2026';
  const canonicalUrl = `https://walensnews.com${canonicalPath}`;

  const metaDescEn = 'Thailand and the US signed an ART joint statement on 17 November 2026, but Thai goods still pay 12.5% and origin rules are unconfirmed. What Japanese manufacturers in Thailand should lock in before the final text and the 11 March 2027 excess-capacity ruling.';
  const metaDescJa = 'タイと米国は2026年11月17日にART共同声明に署名したが、タイ製品への追加関税は12.5%のままで原産地規則も未確認。最終条文と2027年3月11日の過剰生産能力決定の前に、在タイ日系メーカーが固めるべき点を解説。';

  useEffect(() => {
    if (hasFullAccess && !hasLoggedView) {
      logView(slug, isJapanese ? titleJa : titleEn, 'trade', lang);
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker(slug, titleEn, titleJa, 'Trade', hasFullAccess);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(slug, isJapanese ? titleJa : titleEn, 'trade', lang);
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
    { id: 'overview', label: isJapanese ? '政策概要' : 'Policy Overview' },
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
      en: 'The 17 November joint statement confirms that negotiations on the Agreement on Reciprocal Trade (ART) are concluded "in substance". It does not cut the tariff that Thai-made goods pay today (12.5% under Section 301), and the reported terms say nothing about rules of origin. The decisions that move your P&L, the final tariff rate, the origin test and the excess-capacity ruling due by 11 March 2027, are still open.',
      ja: '11月17日の共同声明は、相互貿易協定（ART）の交渉が「実質的に」妥結したことを確認するものである。タイ製品が現在支払っている関税（通商法301条に基づく12.5%）は引き下げられておらず、報道された条件には原産地規則への言及もない。損益を左右する決定事項、すなわち最終的な関税率、原産地基準、そして2027年3月11日までに出される過剰生産能力に関する決定は、いずれも未決のままである。'
    },
    category: { en: 'Trade / US Tariffs', ja: '貿易 / 米国関税' },
    lastUpdated: publishedDate,

    reportMeta: {
      rows: {
        en: [
          ['Audience', 'Japanese executives, factory GMs, country heads and CFOs in Thailand'],
          ['Published', 'November 2026 (research as of 20 Nov 2026)'],
          ['Primary sources', 'USTR fact sheet (Oct 2025 framework), USTR/Federal Register (Section 301 excess capacity), Thai Government statement (via Nation, Thaipublica)'],
        ],
        ja: [
          ['対象読者', '在タイの日系企業経営者、工場長、国・地域統括責任者、最高財務責任者（CFO）'],
          ['公開', '2026年11月（2026年11月20日時点の調査）'],
          ['主な一次資料', '米国通商代表部（USTR）ファクトシート（2025年10月の枠組み）、USTR／連邦官報（通商法301条・過剰生産能力）、タイ政府声明（Nation、Thaipublica経由）'],
        ],
      },
    },

    verification: {
      title: { en: 'Read this first (verification status)', ja: 'まずお読みください（検証状況）' },
      items: {
        en: [
          'The White House joint statement text itself could not be retrieved; Thai and English press summaries were used.',
          'The "19%" figure circulating in headlines comes from the October 2025 framework; it is **not** the rate in force.',
          "Trump's remarks on zero tariffs and non-tariff barriers are the US President's characterisation; Thai reports carry them without a rate-by-rate schedule.",
        ],
        ja: [
          'ホワイトハウスの共同声明本文そのものは入手できなかったため、タイ語・英語の報道要約を用いた。',
          '見出しで流布している「19%」という数値は2025年10月の枠組みに由来するものであり、現在適用されている税率では**ない**。',
          'ゼロ関税と非関税障壁に関するトランプ大統領の発言は米国大統領による説明であり、タイの報道は品目別の税率表を伴わずにこれを伝えている。',
        ],
      },
    },

    executiveSummary: {
      en: [
        '**What is decided:** Leaders signed a joint statement in Manila on 17 Nov 2026 confirming that ART negotiations are concluded in substance. This is a preliminary step. Legal text, signing, Thai public hearing and Parliament submission still follow, with no timeline given.',
        '**Exposure:** Thai exports to the US pay 12.5% (Section 301 forced-labour measure) since 24 Jul 2026, versus 10% for Malaysia and Indonesia. A separate Section 301 excess-capacity ruling covering Thailand **and Japan** is due by 11 Mar 2027. The origin test for the 40% transshipment penalty is the least-visible risk.',
        '**Strategic stance:** Do not book a tariff windfall. Treat the statement as a reduction in deal-collapse risk, lock in origin documentation now, and prepare for US-made goods entering Thailand at zero duty.',
      ],
      ja: [
        '**決定事項：** 両首脳は2026年11月17日にマニラで共同声明に署名し、ART交渉が実質的に妥結したことを確認した。これは予備的な段階にすぎない。法的文書の作成、署名、タイでの公聴会、国会への提出がこれに続くが、日程は示されていない。',
        '**エクスポージャー：** タイから米国への輸出には2026年7月24日から12.5%（通商法301条に基づく強制労働措置）が課されており、マレーシアとインドネシアの10%を上回る。これとは別に、タイ**と日本**を対象とする通商法301条の過剰生産能力に関する決定が、2027年3月11日までに出される。40%の転送（transshipment）ペナルティの判定に用いられる原産地基準は、最も見えにくいリスクである。',
        '**戦略的スタンス：** 関税面での恩恵を前提に計上することは避けてください。共同声明は交渉決裂リスクが低下したものと捉え、原産地関連の書類を今のうちに固め、米国製品がゼロ関税でタイに流入する事態に備えることをおすすめする。',
      ]
    },
    executiveBrief: {
      title: { en: 'Executive brief', ja: 'エグゼクティブブリーフ' },
      en: [
        'The statement confirms substantive conclusion of talks; it is not a tariff cut.',
        'Thailand pays 12.5% today, 2.5 points above Malaysia and Indonesia at 10%.',
        'The excess-capacity Section 301 case covers both Thailand and Japan, with a statutory deadline of 11 March 2027.',
        'Origin (RVC) and transshipment terms are unconfirmed in reported content, and are the biggest uncertainty for Japanese plants.',
        'Thailand is moving to remove duties on nearly all US goods, easing entry for US vehicles, medical devices and pharmaceuticals that compete with Japanese imports.',
      ],
      ja: [
        '共同声明は「関税の引き下げ」ではなく、交渉が実質的に妥結したことの確認にすぎない。',
        '現行の対タイ追加関税は12.5%であり、マレーシア・インドネシアの10%より2.5ポイント高い。',
        '過剰生産能力に関する301条調査はタイと日本の双方を対象とし、決定期限は2027年3月11日である。',
        '原産地規則（RVC）と転送（transshipment）条項は、報道された内容では未確認であり、日系メーカーにとって最大の不確実性である。',
        'タイは米国製品への関税をほぼ全廃する方向で、日本からの輸入品と競合する米国製自動車・医療機器・医薬品が参入しやすくなる。',
      ]
    },

    overview: {
      blocks: {
        en: [
          { title: 'What was signed', body: "Prime Minister Anutin Charnvirakul and President Trump signed the joint statement at 19:00 Manila time on 17 Nov 2026, before the Special ASEAN–US Summit. The White House published a matching statement the same day; it says the ART builds on the 1966 Treaty of Amity and Economic Relations and the 2002 Trade and Investment Framework Arrangement. Thai officials describe it as a preliminary step. Next steps: legal text prepared and reviewed, full agreement signed, each side's domestic procedures, a Thai public hearing, then submission to Parliament." },
          { title: 'What Trump said (US characterisation, not a published schedule)', body: 'Thailand will eliminate all tariffs on US exports and remove substantial non-tariff barriers for American vehicles, medical devices, pharmaceuticals, ethanol and poultry; Thailand would buy about US$2.6bn in additional US agricultural products. He expects the formal agreement "in the coming weeks". Anutin said some details still need work.' },
          { title: 'What the October 2025 USTR framework contained (the best available blueprint, not the final text)', body: 'Thailand eliminates tariffs on 99% of goods; the US keeps a 19% reciprocal tariff with a 0% list (Annex III, Executive Order 14346). Thailand accepts US FDA certificates for medical devices and pharmaceuticals, issues import permits for US fuel ethanol, accepts US-built vehicles meeting federal safety and emissions standards, and aligns on export controls, investment security and duty evasion. Rules of origin and transshipment were not addressed on the fact-sheet page.' },
        ],
        ja: [
          { title: '署名された内容', body: 'アヌティン・チャーンウィーラクン首相とトランプ大統領は、特別ASEAN・米国首脳会議に先立ち、2026年11月17日マニラ時間19時に共同声明に署名した。ホワイトハウスは同日、対応する声明を公表し、ARTが1966年の友好経済関係条約と2002年の貿易投資枠組み協定を基盤とすると述べた。タイ当局はこれを予備的な段階と位置づけている。今後は、法的文書の作成と精査、協定全体の署名、双方の国内手続き、タイでの公聴会を経て、国会に提出される。' },
          { title: 'トランプ大統領の発言（米国側の説明であり、公表された税率表ではない）', body: 'タイは米国からの輸出品に対する関税をすべて撤廃し、米国製の自動車、医療機器、医薬品、エタノール、鶏肉に対する実質的な非関税障壁を取り除くという。またタイは、約26億米ドルの米国産農産物を追加購入するとされる。トランプ大統領は、正式な協定が「今後数週間のうちに」まとまると見込んでいる。アヌティン首相は、一部の詳細はなお詰める必要があると述べた。' },
          { title: '2025年10月のUSTR枠組みの内容（入手可能な最善の設計図であり、最終条文ではない）', body: 'タイは99%の品目で関税を撤廃し、米国は19%の相互関税を維持しつつ0%の品目リスト（附属書III、大統領令14346号）を設ける。タイは医療機器・医薬品について米国食品医薬品局（FDA）の証明書を受け入れ、米国産燃料用エタノールの輸入許可を発給し、連邦の安全・排出ガス基準を満たす米国製車両を受け入れ、輸出管理、投資安全保障、関税回避対策で歩調を合わせる。原産地規則と転送は、ファクトシートのページでは扱われていなかった。' },
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
            ['US tariff on most Thai goods now', '+12.5% (Section 301 forced-labour), effective 24 Jul 2026', 'Thai press (Infoquest, Thansettakij); replaced Section 122 10% that expired 24 Jul'],
            ['Items exempt from the 12.5%', '2,120 items, over half of Thai export value to US (e.g., integrated circuits)', 'Daily News (secondary; list truncated in source)'],
            ['Rate for Malaysia / Indonesia', '10% (forced-labour measure)', 'Nation Thailand, Sep 2026'],
            ['Framework rate (2025)', '19%, with 0% for Annex III products', 'USTR fact sheet, Oct 2025; **not the rate in force**'],
            ['Thai tariff concession', '99% of goods (framework)', 'USTR; final schedule not published'],
            ['Purchase commitments (framework)', 'US$2.6bn/yr agri; US$5.4bn/yr energy; 80 US aircraft, US$18.8bn', 'USTR; "estimated, from forthcoming commercial deals"'],
            ['Thai exports to US, Jan–May 2026', 'US$38.04bn, +40.31% y/y, 23.5% of exports', 'ส.อ.ท. via Infoquest'],
            ['US share of Thai exports (alt.)', '24.6% "so far this year"', 'TRT World (conflicts with 23.5%; different periods, not reconciled)'],
            ['2025 goods trade', 'US exports to Thailand US$19.5bn; imports from Thailand US$91.3bn; US deficit US$71.9bn', 'USTR NTE 2026 as cited by IBTimes'],
            ['Thai-side 2025 view', 'Exports to US THB2.37tn; imports ~THB700bn; surplus THB1.68tn', 'Nation Thailand (Suphajee)'],
          ],
          ja: [
            ['現在の大半のタイ製品に対する米国の関税', '+12.5%（通商法301条・強制労働）、2026年7月24日発効', 'タイの報道（Infoquest、Thansettakij）。7月24日に失効した通商法122条の10%に代わるもの'],
            ['12.5%の適用除外品目', '2,120品目、対米輸出額の半分超（例：集積回路）', 'Daily News（二次情報。出典ではリストが途中で切れている）'],
            ['マレーシア／インドネシアの税率', '10%（強制労働措置）', 'Nation Thailand、2026年9月'],
            ['枠組みの税率（2025年）', '19%、附属書IIIの品目は0%', 'USTRファクトシート、2025年10月。**現在適用されている税率ではない**'],
            ['タイ側の関税譲許', '99%の品目（枠組み）', 'USTR。最終的な税率表は未公表'],
            ['購入コミットメント（枠組み）', '農産物 年26億米ドル、エネルギー 年54億米ドル、米国製航空機80機・188億米ドル', 'USTR。「今後の商業取引からの推計」'],
            ['タイの対米輸出（2026年1〜5月）', '380.4億米ドル、前年比+40.31%、輸出全体の23.5%', 'タイ工業連盟（ส.อ.ท.）（Infoquest経由）'],
            ['タイの輸出に占める米国の比率（別の数値）', '「今年これまで」で24.6%', 'TRT World（23.5%と矛盾。期間が異なり、整合させていない）'],
            ['2025年の財貿易', '米国の対タイ輸出195億米ドル、タイからの輸入913億米ドル、米国の赤字719億米ドル', 'USTR NTE 2026（IBTimesの引用による）'],
            ['タイ側から見た2025年', '対米輸出2.37兆バーツ、輸入約7,000億バーツ、黒字1.68兆バーツ', 'Nation Thailand（スパジー氏）'],
          ],
        },
      },
    },

    timeline: {
      headers: { en: ['Date', 'Event', 'Source'], ja: ['日付', '出来事', '出典'] },
      rows: {
        en: [
          ['2025', 'Threatened 36% US tariff cut to 19%; 40% penalty for suspected transshipment', 'Nation Thailand'],
          ['26 Oct 2025', 'US–Thailand framework announced; Malaysia and Cambodia sign full ARTs', 'USTR'],
          ['19 Feb 2026', 'Indonesia ART signed', 'USTR'],
          ['Feb 2026', 'US Supreme Court rules IEEPA did not authorise the tariffs; 10% Section 122 tariff from 24 Feb', 'Nation Thailand; ECOVADIS/others'],
          ['11 Mar 2026', 'USTR opens Section 301 excess-capacity probes into 16 economies incl. Thailand, Japan', 'USTR / Federal Register'],
          ['24 Jul 2026', 'Section 122 expires; Section 301 forced-labour tariffs start (Thailand 12.5%)', 'Infoquest; Thansettakij'],
          ['1–4 Sep 2026', 'Washington talks (Suphajee–Greer); main terms agreed', 'Nation Thailand'],
          ['16 Sep 2026', 'DTN: no firm timetable; ART needs Cabinet, hearings, Parliament', 'Nation Thailand'],
          ['**17 Nov 2026**', '**Joint statement signed in Manila**', 'Nation, Thaipublica, Bernama'],
        ],
        ja: [
          ['2025年', '米国が示唆した36%の関税が19%に引き下げ。転送が疑われる場合は40%のペナルティ', 'Nation Thailand'],
          ['2025年10月26日', '米国・タイの枠組みを発表。マレーシアとカンボジアが完全なARTに署名', 'USTR'],
          ['2026年2月19日', 'インドネシアがARTに署名', 'USTR'],
          ['2026年2月', '米連邦最高裁が、国際緊急経済権限法（IEEPA）は当該関税を認めていないと判断。2月24日から通商法122条に基づく10%の関税', 'Nation Thailand；ECOVADISほか'],
          ['2026年3月11日', 'USTRが、タイと日本を含む16の経済圏を対象に通商法301条の過剰生産能力調査を開始', 'USTR／連邦官報'],
          ['2026年7月24日', '通商法122条が失効し、通商法301条の強制労働関税が開始（タイは12.5%）', 'Infoquest；Thansettakij'],
          ['2026年9月1〜4日', 'ワシントンでの協議（スパジー氏・グリア氏）。主要な条件で合意', 'Nation Thailand'],
          ['2026年9月16日', 'タイ貿易交渉局（DTN）：確定した日程はなく、ARTには閣議、公聴会、国会が必要', 'Nation Thailand'],
          ['**2026年11月17日**', '**マニラで共同声明に署名**', 'Nation、Thaipublica、Bernama'],
        ],
      },
      connect: {
        title: { en: 'How they connect', ja: '出来事のつながり' },
        en: 'The court ruling removed the legal basis for the 19% rate; Section 301 replaced it with a higher rate (12.5% vs 10%) on Thailand because the US judged its forced-labour import controls insufficient. ART is Thailand\'s route to the lower tier, but the lower rate depends on specified import-ban commitments, not merely on signing.',
        ja: '最高裁判決により19%の税率は法的根拠を失い、通商法301条がそれに代わって、タイにはより高い税率（10%に対し12.5%）を課した。米国がタイの強制労働に関する輸入管理を不十分と判断したためである。ARTはタイがより低い税率区分に移るための道筋であるが、低い税率は署名しただけで得られるものではなく、特定の輸入禁止に関するコミットメントにかかっている。'
      },
    },

    signals: {
      headers: {
        en: ['Signal', 'Current reading', 'Trigger for escalation', 'Why it matters'],
        ja: ['シグナル', '現状', 'エスカレーションのトリガー', 'なぜ重要か'],
      },
      rows: {
        en: [
          ['Final tariff rate', '12.5% in force; ART outcome unknown', 'Final text keeps 12.5% or adds excess-capacity duty', '2.5-pt gap vs Malaysia/Indonesia'],
          ['Rules of origin', 'Not in reported content', 'US publishes RVC threshold (reports cite 40% and 60% scenarios)', 'Failure risks the 40% rate'],
          ['Excess-capacity ruling', 'Pending, due by 11 Mar 2027', 'Determination names electronics, rubber, machinery', 'Japan also in scope'],
          ['Thai ratification', 'Hearing + Parliament required', 'Parliament delays or amends', 'Deal timing'],
          ['US goods into Thailand', 'Zero duty and FMVSS/FDA recognition planned', 'Final schedule includes vehicles', 'Competes with Japanese imports'],
        ],
        ja: [
          ['最終的な関税率', '12.5%が適用中。ARTの結果は不明', '最終条文が12.5%を維持するか、過剰生産能力関税を上乗せする', 'マレーシア／インドネシアとの2.5ポイントの差'],
          ['原産地規則', '報道された内容には含まれていない', '米国が付加価値基準（RVC）の閾値を公表する（報道では40%と60%のシナリオ）', '基準を満たせなければ40%の税率のリスク'],
          ['過剰生産能力に関する決定', '未決。2027年3月11日が期限', '決定で電子機器、ゴム、機械が名指しされる', '日本も対象'],
          ['タイの批准', '公聴会と国会審議が必要', '国会が遅延させるか修正する', '協定の時期'],
          ['タイに入る米国製品', 'ゼロ関税と、米連邦自動車安全基準（FMVSS）／FDA承認の受け入れを計画', '最終的な税率表に自動車が含まれる', '日本からの輸入品と競合'],
        ],
      },
    },

    related: {
      title: { en: 'Related WaLens reports', ja: '関連するWaLensレポート' },
      links: [
        {
          to: '/insights/trade/us-rules-of-origin-2026',
          label: { en: "Washington's rules-of-origin squeeze (June 2026)", ja: '米国「原産地ルール」包囲網（2026年6月）' },
        },
        {
          to: '/insights/economic-policy/thailand-auto-hub-japan-mission-2026',
          label: { en: "Thailand's auto hub at a crossroads: 35% EV excise from 1 Jan 2027", ja: 'タイ自動車ハブの分岐点：2027年1月1日からEV物品税35%' },
        },
      ],
    },

    analysis: {
      label: {
        en: 'All figures in this section are estimates.',
        ja: '本節の数値はすべて推計である。'
      },
      items: {
        en: [
          '**Tariff gap:** 12.5% − 10% = **2.5 points**. On US$100m of non-exempt shipments, the extra duty is **US$2.5m a year** (estimate).',
          '**Macro upper bound:** 2.5 pts × US$38.04bn (Jan–May exports) = **~US$0.95bn** in extra duty. This ignores the 2,120 exempt items (over half of export value per Daily News), so the real figure is lower. Treat as an upper bound.',
          "**Stacking scenario:** WaLens' June report flagged a possible stack to ~22.5% if an excess-capacity duty of ~10 points is added. That remains a scenario, not a finding.",
          '**Thai concession scale:** Framework purchase headlines total US$2.6bn + US$5.4bn per year, plus US$18.8bn of aircraft; these describe future commercial deals, not completed purchases.',
        ],
        ja: [
          '**関税差：** 12.5% − 10% = **2.5ポイント**。適用除外ではない出荷額1億米ドル当たり、追加の関税負担は**年250万米ドル**となる（推計）。',
          '**マクロでの上限：** 2.5ポイント × 380.4億米ドル（1〜5月の輸出）= **約9.5億米ドル**の追加関税。これは2,120の適用除外品目（Daily Newsによれば輸出額の半分超）を考慮していないため、実際の額はこれより小さい。上限値として扱ってください。',
          '**上乗せシナリオ：** WaLensの6月のレポートは、約10ポイントの過剰生産能力関税が加われば、合計で約22.5%に積み上がる可能性を指摘した。これは依然としてシナリオであり、確認された事実ではない。',
          '**タイ側の譲歩の規模：** 枠組みの購入に関する見出しの数値は、年26億米ドル＋年54億米ドルに加え、航空機188億米ドルである。これらは将来の商業取引を示すものであり、完了した購入ではない。',
        ],
      },
    },

    competitive: {
      blocks: {
        en: [
          { title: 'Regional position', body: 'Malaysia, Cambodia and Indonesia have signed full ARTs; Vietnam and Thailand reached frameworks, and Thailand has now reached substantive conclusion. Malaysia and Indonesia enjoy 10% under the forced-labour measure; Thailand 12.5%. Closing the deal is intended to put Thailand "closer to its partners", though the lower rate is not automatic.' },
          { title: 'Who gains', body: 'Exporters already on the exemption list (e.g., integrated circuits) and Japanese suppliers to US data-centre electronics. Thai exports to the US grew by nearly 30% between August and November 2025 on data-centre demand.' },
          { title: 'Who is exposed', body: 'Plants whose products fall outside the exempt list; assemblers using imported components who may fail a local-value test; Japanese exporters shipping vehicles, medical devices and pharmaceuticals into Thailand, which face new US competition at zero duty.' },
          { title: 'Opportunity', body: 'Japanese suppliers with documented Thai value-add become more valuable to US-bound customers; compliance capability becomes a selling point.' },
        ],
        ja: [
          { title: '地域内での位置づけ', body: 'マレーシア、カンボジア、インドネシアは完全なARTに署名した。ベトナムとタイは枠組みに達し、タイは今回、実質的な妥結に至った。強制労働措置のもとで、マレーシアとインドネシアは10%、タイは12.5%である。妥結はタイを「パートナー国に近づける」ことを意図しているが、低い税率が自動的に適用されるわけではない。' },
          { title: '恩恵を受ける側', body: 'すでに適用除外リストに入っている輸出企業（例：集積回路）と、米国のデータセンター向け電子機器を供給する日系サプライヤーである。データセンター需要により、タイの対米輸出は2025年8月から11月にかけて30%近く伸びた。' },
          { title: '影響を受ける側', body: '製品が適用除外リストの対象外となる工場、輸入部品を用いて現地付加価値の基準を満たせない可能性のある組立メーカー、そしてタイへ自動車・医療機器・医薬品を輸出する日系企業である。後者は、ゼロ関税で参入する米国製品との新たな競争に直面する。' },
          { title: '機会', body: 'タイでの付加価値を文書で示せる日系サプライヤーは、米国向けの顧客にとって価値が高まる。コンプライアンス対応能力そのものが売りになる。' },
        ],
      } as Bi<{ title: string; body: string }[]>,
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
          en: { sector: 'Automotive and parts', relevance: 'US-bound exports; US vehicles entering Thailand (FMVSS acceptance)', exposure: 'High', stance: 'Audit origin, model import-competition' },
          ja: { sector: '自動車・部品', relevance: '米国向け輸出、タイに入る米国製車両（FMVSSの受け入れ）', exposure: '高', stance: '原産地を監査し、輸入品との競合をモデル化してください' },
        },
        {
          urgency: 'Medium' as Urgency,
          en: { sector: 'Electronics / data-centre hardware', relevance: 'Many items exempt; excess-capacity target', exposure: 'Medium', stance: 'Confirm exemption by HS code' },
          ja: { sector: '電子機器／データセンター機器', relevance: '多くの品目が適用除外。過剰生産能力調査の対象', exposure: '中', stance: 'HSコードごとに適用除外を確認してください' },
        },
        {
          urgency: 'High' as Urgency,
          en: { sector: 'Appliances, rubber, machinery', relevance: 'Named in press as excess-capacity risk (unverified)', exposure: 'High', stance: 'Scenario-plan 22.5% stack' },
          ja: { sector: '家電、ゴム、機械', relevance: '報道で過剰生産能力のリスクとして名指し（未確認）', exposure: '高', stance: '22.5%への上乗せを想定したシナリオを計画してください' },
        },
        {
          urgency: 'Medium' as Urgency,
          en: { sector: 'Food and agri-processing', relevance: 'US corn, soybean meal; Thai purchase pledges', exposure: 'Medium', stance: 'Review feed and input sourcing' },
          ja: { sector: '食品・農産物加工', relevance: '米国産トウモロコシ、大豆ミール。タイの購入公約', exposure: '中', stance: '飼料と原材料の調達を見直してください' },
        },
        {
          urgency: 'Medium' as Urgency,
          en: { sector: 'Medical devices and pharma', relevance: 'FDA recognition lowers US entry barriers', exposure: 'Medium', stance: 'Defend registrations, pricing' },
          ja: { sector: '医療機器・医薬品', relevance: 'FDA承認の受け入れにより米国の参入障壁が低下', exposure: '中', stance: '製品登録と価格を守ってください' },
        },
        {
          urgency: 'Low' as Urgency,
          en: { sector: 'Chemicals and plastics', relevance: 'Ethanol and energy purchase pledges', exposure: 'Low', stance: 'Monitor' },
          ja: { sector: '化学・プラスチック', relevance: 'エタノールとエネルギーの購入公約', exposure: '低', stance: '動向を注視してください' },
        },
        {
          urgency: 'Low' as Urgency,
          en: { sector: 'Logistics', relevance: 'Flows follow tariff and origin outcomes', exposure: 'Low', stance: 'Monitor' },
          ja: { sector: '物流', relevance: '物流は関税と原産地の結果に左右される', exposure: '低', stance: '動向を注視してください' },
        },
      ],
    },

    nextActions: {
      horizons: {
        en: [
          {
            label: 'Today',
            actions: [
              'Do not price in a tariff cut; keep the 12.5% assumption in all US-bound quotes.',
              'Ask your Thai finance team which HS codes of your US-bound products are on the 2,120-item exempt list.',
              "Request your customs broker's current certificate-of-origin file for US shipments.",
            ],
          },
          {
            label: 'This week',
            actions: [
              'Calculate local-value share per SKU against 40% and 60% scenarios.',
              'Brief HQ on the three open items: final rate, origin test, excess-capacity ruling.',
              'Check customer contracts for tariff-sharing clauses.',
            ],
          },
          {
            label: 'This month',
            actions: [
              'Join JCC or FTI channels to submit comments when the Thai public hearing opens.',
              'Map imported-component content by supplier and country, with Chinese content flagged.',
              'For goods imported into Thailand from Japan, quantify exposure to US substitutes if zero duty applies.',
            ],
          },
          {
            label: 'This quarter',
            actions: [
              'Build a stacked-tariff scenario (12.5% + excess-capacity add-on) into the 2027 budget.',
              'Decide whether any component sourcing should shift to raise Thai value-add before the 11 Mar 2027 ruling.',
              'Document supply-chain traceability suitable for a US origin audit.',
            ],
          },
        ],
        ja: [
          {
            label: '今日',
            actions: [
              '関税引き下げを価格に織り込まないでください。米国向けの見積もりはすべて12.5%を前提に維持してください。',
              '米国向け製品のどのHSコードが2,120品目の適用除外リストに含まれるか、タイの財務チームに確認してください。',
              '米国向け出荷に関する現在の原産地証明書のファイルを、通関業者に依頼してください。',
            ],
          },
          {
            label: '今週',
            actions: [
              'SKUごとの現地付加価値比率を、40%と60%のシナリオに照らして算出してください。',
              '3つの未決事項（最終税率、原産地基準、過剰生産能力に関する決定）について本社に説明してください。',
              '顧客との契約に関税負担の分担条項があるかを確認してください。',
            ],
          },
          {
            label: '今月',
            actions: [
              'タイの公聴会が始まった際に意見を提出できるよう、在タイ日本人商工会議所（JCC）またはタイ工業連盟（FTI）の窓口に参加することをおすすめする。',
              'サプライヤー別・国別に輸入部品の構成を整理し、中国由来の部品を明示してください。',
              '日本からタイへ輸入する製品について、ゼロ関税が適用された場合に米国製の代替品にさらされる度合いを定量化してください。',
            ],
          },
          {
            label: '今四半期',
            actions: [
              '12.5%に過剰生産能力関税を上乗せしたシナリオを、2027年度予算に組み込んでください。',
              '2027年3月11日の決定の前に、タイでの付加価値を高めるために部品調達を移すべきかを判断してください。',
              '米国の原産地監査に耐えうるサプライチェーンのトレーサビリティを文書化してください。',
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
          ['White House/USTR publishes final ART text', 'Rate and origin terms visible', 'Reprice and re-source'],
          ['Thai public hearing and Parliament vote', 'Delay or amendment', 'Timeline slips'],
          ['Excess-capacity determination (by 11 Mar 2027)', 'Tariff added on named sectors', 'Stacking risk realised'],
          ['EV excise 35% from 1 Jan 2027', 'Interaction with US vehicle access', 'Auto competition shifts'],
          ['Thai–UAE FTA (early 2027 target)', 'Parallel market access', 'Diversification'],
        ],
        ja: [
          ['ホワイトハウス／USTRが最終的なART条文を公表', '税率と原産地の条件が明らかになる', '価格の見直しと調達先の再編'],
          ['タイの公聴会と国会採決', '遅延または修正', '日程がずれ込む'],
          ['過剰生産能力に関する決定（2027年3月11日まで）', '名指しされた業種に関税が追加される', '上乗せリスクが現実化する'],
          ['2027年1月1日からEV物品税35%', '米国製車両の参入との相互作用', '自動車の競争環境が変化する'],
          ['タイ・アラブ首長国連邦（UAE）FTA（2027年初めが目標）', '並行する市場アクセス', '多角化'],
        ],
      },
    },

    caveats: {
      title: { en: 'Source Notes and Caveats', ja: '出典注記と留意事項' },
      groups: {
        en: [
          {
            title: 'Verified from primary sources',
            tone: 'verified',
            items: [
              'USTR fact sheet (Oct 2025 framework).',
              'USTR and Federal Register notices on the Section 301 excess-capacity investigation (16 economies incl. Thailand and Japan).',
            ],
          },
          {
            title: 'Secondary (press)',
            tone: 'secondary',
            items: [
              'The 17 Nov signing and next steps (Nation Thailand, Thaipublica, Bernama, Kaohoon).',
              "Trump's remarks (TRT World, IBTimes).",
              '12.5% rate and exemptions (Infoquest, Thansettakij, Daily News).',
            ],
          },
          {
            title: 'Not found',
            tone: 'notfound',
            items: [
              'The White House joint statement text.',
              'Any tariff schedule or origin clause in the final ART.',
              'Any Japanese-government or JCC reaction to the 17 Nov statement.',
              "Japan's own current Section 301 rate.",
            ],
          },
          {
            title: 'Conflicts',
            tone: 'conflicting',
            items: [
              'US share of Thai exports 23.5% (ส.อ.ท., Jan–May) vs 24.6% (TRT World, "so far this year").',
              'Daily News says the 17 Nov signing was "scheduled" (published before the event) and its 2.5%–12.5% cost-gap estimate has no cited source.',
            ],
          },
        ],
        ja: [
          {
            title: '一次資料で確認済み',
            tone: 'verified',
            items: [
              'USTRファクトシート（2025年10月の枠組み）。',
              '通商法301条の過剰生産能力調査に関するUSTRおよび連邦官報の告示（タイと日本を含む16の経済圏）。',
            ],
          },
          {
            title: '二次情報（報道）',
            tone: 'secondary',
            items: [
              '11月17日の署名と今後の手順（Nation Thailand、Thaipublica、Bernama、Kaohoon）。',
              'トランプ大統領の発言（TRT World、IBTimes）。',
              '12.5%の税率と適用除外（Infoquest、Thansettakij、Daily News）。',
            ],
          },
          {
            title: '確認できなかった事項',
            tone: 'notfound',
            items: [
              'ホワイトハウスの共同声明本文。',
              '最終的なARTにおける税率表または原産地条項。',
              '11月17日の共同声明に対する日本政府またはJCCの反応。',
              '日本自身に現在適用されている通商法301条の税率。',
            ],
          },
          {
            title: '矛盾する情報',
            tone: 'conflicting',
            items: [
              'タイの輸出に占める米国の比率：23.5%（ส.อ.ท.、1〜5月）と24.6%（TRT World、「今年これまで」）。',
              'Daily Newsは11月17日の署名を「予定」と記しており（イベント前に公表）、同紙による2.5〜12.5%のコスト差の推計には出典が示されていない。',
            ],
          },
        ],
      },
      forward: {
        en: '**Forward-looking items** (zero tariffs on US goods, purchase commitments, FDA/vehicle recognition) are announced intentions from the framework and Trump\'s remarks, not enacted measures.',
        ja: '**将来に関する事項**（米国製品へのゼロ関税、購入コミットメント、FDA・車両承認の受け入れ）は、枠組みとトランプ大統領の発言による表明された意図であり、制定された措置ではない。'
      },
    },

    sources: [
      { label: 'Nation Thailand: Thailand and US sign joint ART statement', url: 'https://www.nationthailand.com/business/economy/40073614' },
      { label: 'Thaipublica: นายกฯ – ประธานาธิบดีสหรัฐฯ ลงนามแถลงการณ์ร่วม', url: 'https://thaipublica.org/2026/11/usa-thailand-art/' },
      { label: 'Thansettakij: ทำเนียบขาวเปิดเอกสารแถลงการณ์ร่วม', url: 'https://www.thansettakij.com/economy/674008' },
      { label: 'Bernama', url: 'https://www.bernama.com/tv/news.php?id=2635815' },
      { label: 'TRT World', url: 'https://trtworld.com/article/a68f8348ed5e' },
      { label: 'IBTimes', url: 'https://www.ibtimes.com/trump-thailand-proposed-reciprocal-trade-agreement-3809853' },
      { label: 'USTR fact sheet, Oct 2025', url: 'https://ustr.gov/about/policy-offices/press-office/fact-sheets/2025/october/fact-sheet-united-states-and-thailand-reach-framework-agreement-reciprocal-trade' },
      { label: 'Nation Thailand: Sep 2026 talks', url: 'https://www.nationthailand.com/news/40070668' },
      { label: 'Nation Thailand: 12.5% tariff and ART', url: 'https://www.nationthailand.com/business/trade/40071105' },
      { label: 'Infoquest: ส.อ.ท. ภาษี 301', url: 'https://infoquest.co.th/2026/621409' },
      { label: 'Thansettakij: ภาษี 301 12.5%', url: 'https://www.thansettakij.com/economy/664844' },
      { label: 'Daily News: ข้อยกเว้น 2,120 รายการ', url: 'https://www.dailynews.co.th/news/6053347/' },
      { label: 'Daily News: วิเคราะห์ Joint Statement', url: 'https://www.dailynews.co.th/news/6362753/' },
      { label: 'USTR: Section 301 excess-capacity initiation', url: 'https://ustr.gov/about/policy-offices/press-office/press-releases/2026/march/ustr-initiates-section-301-investigations-relating-structural-excess-capacity-and-production' },
      { label: 'ECOVADIS: Section 301 excess capacity (deadline 11 Mar 2027)', url: 'https://ecovadis.com/blog/section-301-structural-excess-capacity/' },
      { label: 'Kaohoon International: origin rules and 40% tariff', url: 'https://www.kaohooninternational.com/?p=562461' },
      { label: 'Nation Thailand: Thai exports double threat 2026', url: 'https://www.nationthailand.com/business/economy/40060959' },
      { label: 'Nation Thailand: Thailand aims to finalise tariff agreement', url: 'https://www.nationthailand.com/business/trade/40072019' },
      { label: 'PPTV: ภาษีสรรพสามิต EV 35%', url: 'https://www.pptvhd36.com/news/Wealth/286393' },
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

  const signalBorders = ['border-l-red-500', 'border-l-amber-500', 'border-l-blue-500', 'border-l-purple-500', 'border-l-emerald-500'];

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
        <meta property="article:section" content="Trade" />
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
          <img src={heroImage} alt="City skyline at dusk — Thailand–US trade analysis for Japanese executives" className="absolute inset-0 w-full h-full object-cover z-0" />
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
                  category: 'Trade'
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
            { label: isJapanese ? '貿易' : 'Trade', href: '/insights?filter=trade' },
            { label: isJapanese ? 'タイ・米国ART共同声明2026' : 'Thailand–US ART Joint Statement 2026' }
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
            {sectionHeader(<FileText className="h-6 w-6 text-primary" />, 'bg-primary/10', isJapanese ? 'エグゼクティブ・サマリー' : 'Executive Summary', isJapanese ? '経営層のための要約' : 'Key insights for decision makers')}

            {/* Verification status — shown prominently, visible to everyone */}
            <Card className="mb-6 border-amber-500/40 bg-amber-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-4 w-4 text-amber-500" />
                  {content.verification.title[L]}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderNumbered(content.verification.items[L])}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-border/50">
                  {content.reportMeta.rows[L].map(([k, v], idx) => (
                    <div key={idx} className="text-xs">
                      <p className="font-semibold text-foreground">{k}</p>
                      <p className="text-muted-foreground leading-relaxed" style={cellStyle}>{v}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
            {sectionHeader(<Database className="h-6 w-6 text-blue-500" />, 'bg-blue-500/10', isJapanese ? '政策概要' : 'Policy Overview')}
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

          {/* Related WaLens reports — visible to everyone */}
          <Card className="mb-12 bg-muted/40">
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
                      ? '定量分析（推計）、競争・戦略ダイナミクス、セクター別戦略判断、次のアクション、戦略的ウォッチポイント、出典を含む完全版レポートにアクセスするにはプレミアムプランが必要です。'
                      : 'The full quantitative analysis (estimates), competitive dynamics, sector decision guide, next action insights, strategic watchpoints and sources require a premium subscription.'
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
                    {isJapanese ? 'WaLens推計' : 'WaLens estimates'}
                  </Badge>
                  <p className="text-sm italic text-muted-foreground" style={cellStyle}>{content.analysis.label[L]}</p>
                </div>
                <Card className="border-l-4 border-l-purple-500/50">
                  <CardContent className="pt-6">
                    {renderList(content.analysis.items[L], bulletIcon)}
                  </CardContent>
                </Card>
              </section>

              {/* 06 Competitive Dynamics */}
              <section id="competitive" className="mb-12 scroll-mt-20" onClick={handleDataAppendixAccess}>
                {sectionHeader(<Globe className="h-6 w-6 text-blue-500" />, 'bg-blue-500/10', isJapanese ? '競争・戦略ダイナミクス' : 'Competitive and Strategic Dynamics')}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

export default ThailandUSARTJointStatement2026;
