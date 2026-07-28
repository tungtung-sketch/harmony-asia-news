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
  FileText, TrendingUp, Shield, AlertTriangle,
  CheckCircle, BookOpen, Lock, Lightbulb, Eye,
  ChevronRight, Crown, Database, Sparkles, Globe, Clock
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/executive-analysis.jpg';

const ThailandFDIFirstHalf2026 = () => {
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

  const slug = 'thailand-fdi-h1-2026';
  const titleEn = "Japan Leads by Value, China by Count: What Thailand's H1 2026 FDI Data Says About the Supplier Base Beneath You";
  const titleJa = '日本が金額1位、中国が社数1位 ── タイFDI 2026年上半期が映すサプライヤー網の静かな交代';
  const publishedDate = '2026-07-28';
  const canonicalPath = '/insights/investment/thailand-fdi-h1-2026';
  const canonicalUrl = `https://walensnews.com${canonicalPath}`;

  const metaDescEn = "Japan topped Thailand's H1 2026 foreign investment by value while China led by company count — but the two figures come from different datasets. What the BOI, DBD and BOT numbers actually show about the supplier ecosystem around Japanese plants, and the RVC origin risk it creates.";
  const metaDescJa = '2026年上半期、タイへの外国投資は日本が金額1位、中国が社数1位となった。しかしこの2つの数字は異なる統計に由来する。BOI・DBD・中央銀行の各データが示す日系工場周辺のサプライヤー網の変化と、そこから生じるRVC（原産地）リスクを読み解く。';

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

  const tocSections = [
    { id: 'executive-summary', label: isJapanese ? 'エグゼクティブブリーフ' : 'Executive Brief' },
    { id: 'dbd-table', label: isJapanese ? '見出しの統計（DBD）' : 'The Headline Table (DBD)' },
    { id: 'boi-table', label: isJapanese ? 'もう一つの統計（BOI）' : 'The Other Table (BOI)' },
    { id: 'analysis', label: isJapanese ? '分析：3つの視点' : 'The Analysis' },
    { id: 'signals', label: isJapanese ? '主要インテリジェンスシグナル' : 'Key Intelligence Signals' },
    { id: 'reconciliation', label: isJapanese ? '統計の照合と地域比較' : 'Reconciliation & Regional View' },
    { id: 'sector-guide', label: isJapanese ? 'セクター別戦略判断' : 'Sector Decision Guide' },
    { id: 'next-actions', label: isJapanese ? '次のアクション' : 'Next Action Insights' },
    { id: 'watchpoints', label: isJapanese ? '戦略的ウォッチポイント' : 'Strategic Watchpoints' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: { en: titleEn, ja: titleJa },
    subheadline: {
      en: "Japan topped Thailand's H1 2026 foreign investment by value; China led by company count. The two figures come from different datasets — and the gap between them, not either ranking, is the finding: a quiet change in the nationality of the supplier base beneath Japanese plants.",
      ja: '2026年上半期、タイへの外国投資は日本が金額1位、中国が社数1位となった。しかしこの2つの数字は異なる統計に由来する。注目すべきはどちらの順位でもなく、その差が映すもの——日系工場を支えるサプライヤー網の国籍が静かに交代しつつある事実である。'
    },
    category: { en: 'Investment / FDI / Supply Chain', ja: '投資 / FDI / サプライチェーン' },
    lastUpdated: publishedDate,

    executiveSummary: {
      en: [
        "The headline is real, but it comes from **two different datasets**. In the **DBD** (กรมพัฒนาธุรกิจการค้า) Foreign Business Act tally for H1 2026, **Japan ranked #1 by value (THB 44,662 million across 87 businesses)** while **China ranked #1 by number of businesses (110 firms, THB 35,479 million)**. A *separate* dataset — **BOI investment-promotion applications** (คำขอรับการส่งเสริมการลงทุน) — shows **Singapore #1 by value and China #1 by FDI project count (321 projects)**, with Japan **5th by value** (THB 32,790 million / 123 projects). Anyone citing \"Japan #1 / China #1\" is using the DBD figures.",
        "China's lead is in **count, not capital**. Its average deal runs **THB 323M** (DBD) and roughly **THB 143M** per BOI FDI project — a fraction of Japan's **THB 513M** (DBD) and **THB 267M** (BOI) — concentrated in PCB/PCBA, moulds (แม่พิมพ์), electronic components and EV engineering: the **Tier-2/Tier-3 supplier layer** around Japanese plants. This is a quiet repopulation of the supplier ecosystem, not a contest over headline value.",
        "The whole structure rests on **tariff-driven relocation risk**. The US **Section 122** 10% surcharge expired **24 July 2026** and a **12.5% Section 301** duty replaced it; Thailand's negotiated deal cut the reciprocal rate to **19%** but requires a Regional Value Content (RVC) rule toward **~50%** and carries a **40%** transshipment (สวมสิทธิ์) penalty. Rising Chinese volume raises \"Made in Thailand\" origin exposure for everyone — Japanese exporters included."
      ],
      ja: [
        '見出しは事実だが、出所の異なる**2つの統計**に由来する。商務省事業開発局（DBD／กรมพัฒนาธุรกิจการค้า）の外国人事業法ベースの2026年上半期集計では、**日本が金額1位（446.62億バーツ／87社）**、**中国が社数1位（110社／354.79億バーツ）**。一方、投資委員会（BOI）の投資奨励申請（คำขอรับการส่งเสริมการลงทุน）ベースでは**シンガポールが金額1位、中国がFDIプロジェクト数1位（321件）**で、日本は**金額5位**（327.90億バーツ／123件）。「日本1位・中国1位」はDBD統計を指す。',
        '中国の首位は「**金額**」ではなく「**件数**」にある。1件あたり平均はDBDで約**3.23億バーツ**、BOIのFDIで約**1.43億バーツ**と、日本の**5.13億バーツ**（DBD）・**2.67億バーツ**（BOI）の数分の一。PCB/PCBA、金型（แม่พิมพ์）、電子部品、EV関連エンジニアリングなど**Tier2〜3層**に集中する。これは見出しの金額を競うものではなく、サプライヤー網の静かな再構築である。',
        '全体が**米国関税起点の生産移転リスク**の上に成立している。米通商法**122条**の10%課徴金は**2026年7月24日**に失効し、**12.5%の301条**関税が置き換わった。タイの対米合意は相互関税を**19%**に引き下げたが、地域原産割合（RVC）を約**50%**へ引き上げる要件と、迂回輸出（สวมสิทธิ์）に対する最大**40%**の関税を伴う。中国の量的投資の増加は、日系を含む全企業の「タイ原産」認定リスクを高める。'
      ]
    },

    dbdTable: {
      title: { en: 'The Headline Table — DBD Foreign Business Act, H1 2026', ja: '見出しの統計 ── DBD外国人事業法、2026年上半期' },
      note: {
        en: 'Source: DBD / Poonpong Naiyanapakorn (พูนพงษ์ นัยนาภากรณ์) briefing, 17 July 2026. Totals: 640 businesses (151 licences ใบอนุญาต + 489 certificates หนังสือรับรอง), THB 187,614 million, +68% value YoY, +27% count. This is the "actual legal entry" measure and the source of the "Japan #1 / China #1" headline.',
        ja: '出典：DBD／プーンポン・ナイヤナパコーン（พูนพงษ์ นัยนาภากรณ์）局長ブリーフィング、2026年7月17日。合計：640社（免許151件 ใบอนุญาต＋証明489件 หนังสือรับรอง）、1,876.14億バーツ、金額前年比+68%、社数+27%。これは「実際の法的参入」を示す統計であり、「日本1位・中国1位」という見出しの出所である。'
      },
      data: {
        en: [
          { rank: '1', source: 'Japan', value: '44,662', firms: '87', share: '14%', avg: '513' },
          { rank: '2', source: 'Singapore', value: '37,867', firms: '83', share: '13%', avg: '456' },
          { rank: '3', source: 'China', value: '35,479', firms: '110 (#1 by count)', share: '17%', avg: '323' },
          { rank: '4', source: 'Hong Kong', value: '13,088', firms: '59', share: '9%', avg: '222' },
          { rank: '5', source: 'United States', value: '6,043', firms: '107', share: '17%', avg: '56.5' },
        ],
        ja: [
          { rank: '1', source: '日本', value: '44,662', firms: '87', share: '14%', avg: '513' },
          { rank: '2', source: 'シンガポール', value: '37,867', firms: '83', share: '13%', avg: '456' },
          { rank: '3', source: '中国', value: '35,479', firms: '110（社数1位）', share: '17%', avg: '323' },
          { rank: '4', source: '香港', value: '13,088', firms: '59', share: '9%', avg: '222' },
          { rank: '5', source: '米国', value: '6,043', firms: '107', share: '17%', avg: '56.5' },
        ]
      }
    },

    boiTable: {
      title: { en: 'The Other League Table — BOI Applications, H1 2026', ja: 'もう一つの統計 ── BOI投資奨励申請、2026年上半期' },
      note: {
        en: 'Source: BOI PR116/117-2569, 23 July 2026. Totals: 1,299 projects / THB 1,473,718 million (~USD 43.6B), +37% YoY. FDI subset: 877 projects, ~USD 40.5B, +80% YoY; Digital sector ~THB 1.115tn. This is an "intentions/pledge" measure — Singapore leads by value, China by FDI project count. Japan\'s application value FELL YoY (THB 49,820M → 32,790M).',
        ja: '出典：BOI PR116/117-2569、2026年7月23日。合計：1,299件／1兆4,737.18億バーツ（約436億米ドル）、前年比+37%。FDI部分：877件、約405億米ドル、+80%、デジタル部門約1.115兆バーツ。これは「意図・申請」を示す統計で、金額はシンガポール、FDI件数は中国が首位。日本の申請額は前年比で減少（498.20億→327.90億バーツ）。'
      },
      data: {
        en: [
          { rank: '1', source: 'Singapore', value: '~1,121,000', usd: '$33.2B', projects: '158', avg: '~7,095' },
          { rank: '2', source: 'United Kingdom', value: '~47,200', usd: '$1.40B', projects: '11', avg: '~4,291' },
          { rank: '3', source: 'China', value: '~45,800', usd: '$1.35B', projects: '321 (#1 by count)', avg: '~143' },
          { rank: '4', source: 'Taiwan', value: '~38,000', usd: '$1.12B', projects: '47', avg: '~808' },
          { rank: '5', source: 'Japan', value: '32,790', usd: '$970.1M', projects: '123', avg: '~267' },
        ],
        ja: [
          { rank: '1', source: 'シンガポール', value: '~1,121,000', usd: '$33.2B', projects: '158', avg: '~7,095' },
          { rank: '2', source: '英国', value: '~47,200', usd: '$1.40B', projects: '11', avg: '~4,291' },
          { rank: '3', source: '中国', value: '~45,800', usd: '$1.35B', projects: '321（件数1位）', avg: '~143' },
          { rank: '4', source: '台湾', value: '~38,000', usd: '$1.12B', projects: '47', avg: '~808' },
          { rank: '5', source: '日本', value: '32,790', usd: '$970.1M', projects: '123', avg: '~267' },
        ]
      }
    },

    keyNumbers: {
      title: { en: 'Key Numbers', ja: '主要数値' },
      data: {
        en: [
          { metric: 'BOI total applications, H1 2026', value: '1,299 projects / THB 1.47tn (~USD 43.6B), +37% YoY' },
          { metric: 'BOI FDI subset', value: '877 projects, ~USD 40.5B, +80% YoY' },
          { metric: 'BOI digital sector', value: '~THB 1.115 trillion' },
          { metric: 'DBD total (Foreign Business Act)', value: '640 businesses / THB 187.6bn, +68% value YoY' },
          { metric: 'DBD businesses in the EEC', value: '199 (31%) / THB 83,779M — 45% of national value' },
          { metric: 'Average deal — China (DBD / BOI FDI)', value: 'THB 323M / ~143M' },
          { metric: 'Average deal — Japan (DBD / BOI)', value: 'THB 513M / ~267M' },
          { metric: 'Japan BOI application value, YoY', value: 'THB 49,820M → 32,790M (down)' },
        ],
        ja: [
          { metric: 'BOI申請総額（2026年上半期）', value: '1,299件／1.47兆バーツ（約436億米ドル）、前年比+37%' },
          { metric: 'BOI FDI部分', value: '877件、約405億米ドル、前年比+80%' },
          { metric: 'BOIデジタル部門', value: '約1.115兆バーツ' },
          { metric: 'DBD総額（外国人事業法）', value: '640社／1,876億バーツ、金額前年比+68%' },
          { metric: 'DBD・EEC内の企業', value: '199社（31%）／837.79億バーツ——全国価値の45%' },
          { metric: '1件平均——中国（DBD／BOI FDI）', value: '3.23億バーツ／約1.43億バーツ' },
          { metric: '1件平均——日本（DBD／BOI）', value: '5.13億バーツ／約2.67億バーツ' },
          { metric: '日本のBOI申請額・前年比', value: '498.20億→327.90億バーツ（減少）' },
        ]
      }
    },

    analysis: {
      title: { en: 'The Analysis — Three Ways to Read the Data', ja: '分析 ── データを読む3つの視点' },
      points: {
        en: [
          { title: "Anatomy of Japan's value lead", content: "Japan's DBD value of **THB 44,662M** spread across **87 businesses** (avg **THB 513M**) — no single mega-project distorts the H1 window. (DBD does not publish per-project values, so a large undisclosed project cannot be 100% excluded; but the biggest identified Japanese project — Datasection (Thailand)'s **USD 235.2 million / THB 7.8 billion** GPU-server investment — was approved at the BOI board on **8 July 2026**, i.e. in H2.) H1 activity was diversified and quality-tilted: engineering & technical consultancy, machinery selection & factory-layout advice, workpiece inspection, EV charging stations, software, solar generation, generators, metal products. Read carefully, this is not a resurgence — Japan's **BOI application value fell** YoY (THB 49,820M → 32,790M) and its automotive footprint is contracting (Subaru, Suzuki, Honda, Nissan all cutting Thai output)." },
          { title: "China's volume playbook", content: "China filed **321 BOI FDI projects** — the highest project count of any single country — at an average of just **~THB 143M** each, and **110 DBD firms** at **THB 323M**. Activity clusters in printed-circuit-board assembly (PCBA), moulds (แม่พิมพ์), electronic components, EV-related engineering consultancy and combined-cycle power-plant EPC — the **Tier-2/Tier-3 layer that physically surrounds Japanese OEM plants**. Thailand is now ASEAN's largest PCB base (2nd in APAC); between 2022 and June 2025 the BOI received **>180 PCB applications worth >THB 200bn**, and in 2025 approved **>THB 65bn of PCB expansion by Zhen Ding Technology (ZDT)** — the world's largest PCB maker — via its JV **Peng Shen Technology (Thailand)** with Saha Group in Prachin Buri. The supplier tier is not disappearing; it is changing nationality." },
          { title: "The Singapore/Hong Kong conduit and the นอมินี wave", content: "BOI's own analysis states most high-value **Singapore-routed** applications have **Chinese, Japanese and American parents**; Singapore-routed applications rose from THB 16,365M (2020) to **THB 547,316M (2025)**, with Hong Kong a parallel **THB 245bn** channel. So \"Singapore #1 by value\" overstates genuine Singaporean capital and understates true Chinese exposure. In parallel, DBD nominee (นอมินี) enforcement has escalated: of ~782,542 active companies, **~119,297 sit in the vulnerable 0.01–49.99% foreign band**. DBD Order 2/2568 (effective 1 Jan 2026) cut at-risk new registrations ~65%; in-person verification began 1 April 2026; and **from 1 August 2026 bank-statement financial-trail checks begin across 16 high-risk provinces**. As of mid-2026, 852 companies had been prosecuted (~THB 15.1bn in identified damage); FBA Section 36 penalties reach 3 years' imprisonment and THB 100,000–1,000,000 fines." },
        ],
        ja: [
          { title: '日本の金額首位の解剖', content: '日本のDBD金額**446.62億バーツ**は**87社**（平均**5.13億バーツ**）に広く分散し、上半期に単一の大型案件が順位を歪めた形跡はない。（DBDは案件別金額を公表しないため、大型の未公表案件を100%排除はできない。ただし確認できる最大の日系案件——Datasection（Thailand）の**2億3,520万米ドル／78億バーツ**のGPUサーバー投資——はBOI理事会で**2026年7月8日**、すなわち下半期に承認された。）上半期の活動は多様かつ良質側に傾く：エンジニアリング・技術コンサルティング、機械選定・工場レイアウト助言、ワーク検査、EV充電ステーション、ソフトウェア、太陽光発電、発電機、金属製品。慎重に読めば、これは回復ではない——日本の**BOI申請額は前年比で減少**（498.20億→327.90億バーツ）し、自動車の生産拠点は縮小している（スバル・スズキ・ホンダ・日産がいずれもタイ生産を削減）。' },
          { title: '中国の量的プレイブック', content: '中国は**321件のBOI FDIプロジェクト**——単一国として最多の件数——を、1件平均わずか**約1.43億バーツ**で申請し、DBDでは**110社**を**3.23億バーツ**で登記した。活動はPCBA（プリント基板実装）、金型（แม่พิมพ์）、電子部品、EV関連エンジニアリングコンサルティング、コンバインドサイクル発電所EPCに集中する——**日系OEM工場を物理的に取り囲むTier2〜3層**である。タイは今やASEAN最大のPCB基地（APAC2位）。2022年〜2025年6月にBOIは**180件超・2,000億バーツ超のPCB申請**を受け、2025年には世界最大のPCBメーカー**Zhen Ding Technology（ZDT）による650億バーツ超のPCB拡張**を、サハグループとの合弁**Peng Shen Technology（Thailand）**（プラチンブリ）を通じて承認した。サプライヤー層は消えているのではなく、国籍が交代している。' },
          { title: 'シンガポール／香港の導管と นอมินี の波', content: 'BOI自身の分析によれば、高額の**シンガポール経由**申請の多くは**中国・日本・米国の親会社**を持つ。シンガポール経由申請は163.65億バーツ（2020年）から**5,473.16億バーツ（2025年）**へ増加し、香港も並行して**2,450億バーツ**の経路となっている。したがって「シンガポール金額1位」は真正なシンガポール資本を過大に、真の中国エクスポージャーを過小に見せる。並行して、DBDのノミニー（นอมินี）取締りは強化された：約78万2,542社のうち**約11万9,297社が脆弱な外資比率0.01〜49.99%の帯域**にある。DBD命令2/2568（2026年1月1日施行）は高リスク新規登記を約65%削減し、2026年4月1日から対面確認が開始、そして**2026年8月1日から16の高リスク県で銀行取引明細による資金トレース調査が始まる**。2026年半ば時点で852社が訴追され（確認された経済損害約151億バーツ）、外国人事業法36条の罰則は最長3年の禁錮とTHB10万〜100万の罰金に及ぶ。' },
        ]
      }
    },

    reconciliationTable: {
      title: { en: 'Table C — Why the Numbers Differ', ja: '照合表 ── なぜ数字が食い違うのか' },
      headers: {
        en: ['Dimension', 'BOI applications', 'DBD Foreign Business Act', 'Bank of Thailand (ธปท.)'],
        ja: ['観点', 'BOI投資奨励申請', 'DBD外国人事業法', 'タイ中央銀行（ธปท.）']
      },
      data: {
        en: [
          { dim: 'What it measures', boi: 'Promotion pledges (คำขอ) — intentions', dbd: 'Legal permission to operate — actual entry', bot: 'Balance-of-payments realized FDI' },
          { dim: 'H1 2026 headline', boi: '1,299 projects / THB 1.47tn', dbd: '640 businesses / THB 187.6bn', bot: 'H1 by-country not yet published; 2025 record USD 18.8B' },
          { dim: '#1 by value', boi: 'Singapore', dbd: 'Japan', bot: 'n/a' },
          { dim: '#1 by count', boi: 'China (321 FDI projects)', dbd: 'China (110 businesses)', bot: 'n/a' },
          { dim: 'Caveat', boi: 'Applications ≠ actual. FY2025: 2,779 promotion certificates (ออกบัตรส่งเสริม) worth THB 1,152,782M', dbd: 'Permission ≠ deployed capital', bot: 'Only BOT captures money actually transferred' },
        ],
        ja: [
          { dim: '何を測るか', boi: '奨励申請（คำขอ）——意図', dbd: '営業の法的許可——実際の参入', bot: '国際収支ベースの実現FDI' },
          { dim: '2026上半期の見出し', boi: '1,299件／1.47兆バーツ', dbd: '640社／1,876億バーツ', bot: '国別上半期は未公表、2025年通年は過去最高188億米ドル' },
          { dim: '金額1位', boi: 'シンガポール', dbd: '日本', bot: '該当なし' },
          { dim: '件数1位', boi: '中国（FDI 321件）', dbd: '中国（110社）', bot: '該当なし' },
          { dim: '留意点', boi: '申請≠実行。2025年度：奨励証（ออกบัตรส่งเสริม）2,779件・1兆1,527.82億バーツ', dbd: '許可≠展開資本', bot: 'BOTのみが実際に移転された資金を捕捉' },
        ]
      }
    },

    botWarning: {
      title: { en: 'Quality Over Quantity — the Bank of Thailand\'s Warning', ja: '量より質 ── タイ中央銀行の警告' },
      content: {
        en: "In its **Q1 2026 Monetary Policy Report** (via Bangkok Post, 15 May 2026), the Bank of Thailand urged the government to prioritise FDI **quality over quantity**. It noted that data-centre investment has grown **50-fold** versus pre-pandemic levels, warned that in the electronics sector **more than half of product value is derived from imports**, and ranked Thailand only the **fourth-largest destination in the region — behind Singapore, Vietnam and Malaysia**. This is the analytical heart of the story: the more impressive the BOI application headline, the more it depends on imported content and conduit capital.",
        ja: 'タイ中央銀行は**2026年第1四半期金融政策報告**（Bangkok Post、2026年5月15日）で、政府に対しFDIの**量より質**を優先するよう促した。データセンター投資はパンデミック前の**50倍**に膨らみ、電子部門では**製品価値の半分超が輸入由来**であると警告。タイは域内で**シンガポール・ベトナム・マレーシアに次ぐ4番手**の投資先にすぎないと位置づけた。これが本稿の分析上の核心である：BOIの申請見出しが華々しいほど、その中身は輸入コンテンツと導管資本に依存している。'
      }
    },

    regionalTable: {
      title: { en: 'Regional Peer Comparison, H1 2026', ja: '地域ピア比較、2026年上半期' },
      headers: {
        en: ['Country', 'Metric', 'H1 2026', 'YoY', 'Top sources'],
        ja: ['国', '指標', '2026上半期', '前年比', '主要投資元']
      },
      data: {
        en: [
          { country: 'Thailand', metric: 'BOI applications', value: 'THB 1.47tn (~$43.6B)', yoy: '+37%', top: 'Singapore, UK, China, Taiwan, Japan' },
          { country: 'Vietnam', metric: 'Registered FDI', value: '$34.65B', yoy: '+61%', top: 'Singapore, Korea, Japan, China' },
          { country: 'Vietnam', metric: 'Disbursed FDI', value: '$13.03B (5-yr high)', yoy: '+11.2%', top: 'Manufacturing 82.6% of disbursed' },
          { country: 'Indonesia', metric: 'Realized investment', value: 'IDR 1,010.6tn (~$56.1B)', yoy: '+7.2%', top: 'Singapore $8.8B, HK $7.8B, China $3.9B, Japan $1.9B, US $1.7B' },
          { country: 'Malaysia', metric: 'Approved (Q1 2026)', value: 'RM92.8bn (~$22.8B)', yoy: '−0.2%', top: 'Japan #1 (RM21.5bn), China, US, Singapore, Thailand' },
          { country: 'Philippines', metric: 'BSP net FDI (Q1)', value: '$1.72B (weakest since 2020)', yoy: '−17%', top: 'Japan, US, Singapore' },
        ],
        ja: [
          { country: 'タイ', metric: 'BOI申請', value: '1.47兆バーツ（約436億ドル）', yoy: '+37%', top: 'シンガポール、英国、中国、台湾、日本' },
          { country: 'ベトナム', metric: '登録FDI', value: '346.5億ドル', yoy: '+61%', top: 'シンガポール、韓国、日本、中国' },
          { country: 'ベトナム', metric: '実行FDI', value: '130.3億ドル（5年ぶり高水準）', yoy: '+11.2%', top: '実行額の82.6%が製造業' },
          { country: 'インドネシア', metric: '実現投資', value: '1,010.6兆ルピア（約561億ドル）', yoy: '+7.2%', top: 'シンガポール88億、香港78億、中国39億、日本19億、米国17億ドル' },
          { country: 'マレーシア', metric: '承認額（2026Q1）', value: '928億リンギ（約228億ドル）', yoy: '−0.2%', top: '日本1位（215億リンギ）、中国、米国、シンガポール、タイ' },
          { country: 'フィリピン', metric: 'BSP純FDI（Q1）', value: '17.2億ドル（2020年以来最弱）', yoy: '−17%', top: '日本、米国、シンガポール' },
        ]
      }
    },

    sectorGuide: {
      title: { en: 'Sector Decision Guide', ja: 'セクター別戦略判断' },
      data: [
        {
          sector: { en: 'Electronics / PCB & components', ja: '電子機器・PCB・部品' },
          dynamic: { en: 'Chinese Tier-2/3 influx (ZDT/Peng Shen, PCBA, components) rebuilding the supplier base', ja: '中国Tier2〜3の流入（ZDT／Peng Shen、PCBA、部品）がサプライヤー網を再構築' },
          rvc: { en: 'HIGH — high imported-component share', ja: '高：輸入部材比率が高い' },
          urgency: { en: 'Strategic Priority', ja: '戦略的最優先' }, urgencyLevel: 'high',
          note: { en: 'Localizing onto newly-arrived Chinese PCB/component suppliers can lift local content and cut cost — but only if those suppliers themselves clear origin and นอมินี scrutiny. Verify UBO before the 1 Aug 2026 financial-trail checks.', ja: '新規参入の中国系PCB・部品サプライヤーへの現地化はローカルコンテンツを高め、コストも下げうる——ただし当該サプライヤー自身が原産地・นอมินี審査をクリアする場合に限る。8月1日の資金トレース調査前にUBOを確認すること。' }
        },
        {
          sector: { en: 'Automotive & parts', ja: '自動車・部品' },
          dynamic: { en: 'Japanese ICE footprint shrinking (Subaru/Suzuki/Honda/Nissan); Chinese EV capacity rising (BYD Rayong)', ja: '日系ICE拠点が縮小（スバル／スズキ／ホンダ／日産）、中国EV能力が拡大（BYDラヨーン）' },
          rvc: { en: 'HIGH — deep imported-content supply chains', ja: '高：輸入部材依存度の高いサプライチェーン' },
          urgency: { en: 'Act Now', ja: '即対応' }, urgencyLevel: 'high',
          note: { en: 'The value ranking is not a resurgence; the auto base is contracting. Reposition toward hybrids/EV components and audit Chinese-origin BOM content against the ~50% RVC threshold.', ja: '金額順位は回復ではなく、自動車基盤は縮小している。ハイブリッド／EV部品へ軸足を移し、BOMの中国原産コンテンツを約50%のRVC閾値に照らして監査すること。' }
        },
        {
          sector: { en: 'Machinery / industrial & automation', ja: '機械・産業・自動化' },
          dynamic: { en: 'Mid-sized Japanese engineering & technical-consultancy projects drive DBD count', ja: '中堅の日系エンジニアリング・技術コンサル案件がDBD件数を牽引' },
          rvc: { en: 'MEDIUM–HIGH — assembly-heavy, imported parts', ja: '中〜高：組立中心・輸入部材多用' },
          urgency: { en: 'Monitor', ja: '継続監視' }, urgencyLevel: 'medium',
          note: { en: 'This is where broad-based Japanese activity concentrates. Document Thai value-add per product line so RVC exposure is known before it becomes a cost event.', ja: '広く分散した日系活動が集中する分野。RVC露出がコスト化する前に、製品ライン別のタイ国内付加価値を文書化すること。' }
        },
        {
          sector: { en: 'Data centre & digital', ja: 'データセンター・デジタル' },
          dynamic: { en: 'The BOI headline driver (~THB 1.115tn digital); Japanese Telehouse/KDDI THB 42M (2024) → >THB 7.6bn (2025)', ja: 'BOI見出しの牽引役（デジタル約1.115兆バーツ）、日系Telehouse／KDDIは4,200万→76億バーツ超（2024→2025）' },
          rvc: { en: 'LOW — services-led', ja: '低：サービス主導' },
          urgency: { en: 'Strategic Priority', ja: '戦略的最優先' }, urgencyLevel: 'high',
          note: { en: 'A genuine Japanese growth vector (Datasection\'s THB 7.8bn GPU project lands in H2). But BOT flags import-heavy value — distinguish real capex from Singapore-routed conduit pledges.', ja: '日系の真の成長ベクトル（DatasectionのGPU案件78億バーツは下半期）。ただしBOTは輸入依存の価値を警告——真の設備投資とシンガポール経由の導管的申請を区別すること。' }
        },
        {
          sector: { en: 'Energy / solar & power', ja: 'エネルギー・太陽光・電力' },
          dynamic: { en: 'Chinese combined-cycle power-plant EPC; Japanese solar generation & generators', ja: '中国のコンバインドサイクル発電所EPC、日系の太陽光発電・発電機' },
          rvc: { en: 'MEDIUM', ja: '中' },
          urgency: { en: 'Monitor', ja: '継続監視' }, urgencyLevel: 'medium',
          note: { en: 'Watch decarbonisation-linked demand, and confirm the local-content share of imported equipment on any EPC-style project.', ja: '脱炭素関連の需要を注視し、EPC型案件では輸入設備のローカルコンテンツ比率を確認すること。' }
        },
        {
          sector: { en: 'Processed food & agriculture', ja: '食品加工・農業' },
          dynamic: { en: 'BOI agriculture & food THB 61.4bn / 131 projects; largely domestic content', ja: 'BOI農業・食品614億バーツ／131件、国内原料比率が高い' },
          rvc: { en: 'LOW — largely domestic content', ja: '低：国内原料比率が高い' },
          urgency: { en: 'Monitor', ja: '継続監視' }, urgencyLevel: 'low',
          note: { en: 'Lower origin risk, but confirm line-level HS RVC status rather than assuming an exemption holds.', ja: '原産地リスクは低いが、除外維持を前提とせず品目別HSのRVC状況を確認すること。' }
        },
      ]
    },

    nextActions: {
      title: { en: 'Next Action Insights for Japanese Executives', ja: '日系エグゼクティブへの次のアクション' },
      horizons: {
        en: [
          {
            label: 'Right Now',
            actions: [
              'Reconcile which dataset your internal reporting cites — never present "Japan #1 / China #1" without labelling it the DBD Foreign Business Act measure and pairing it with the BOI table (Singapore #1 value / China #1 FDI count).',
              'Audit the Chinese-origin content in your Thai bills of materials against the ~50% RVC threshold before the 19% US deal is ratified.',
              'Verify UBO and genuine capitalisation of any sub-49.99%-foreign Thai JV partner ahead of the 1 August 2026 DBD financial-trail (bank-statement) checks.',
            ]
          },
          {
            label: 'Through Q3 2026',
            actions: [
              'Model a stacked scenario where Section 301 reaches 25% (forced-labour + excess-capacity cases combined).',
              'Watch parliamentary ratification of the 19% US deal and the final RVC threshold — including whether it is set per sector.',
              'Re-source high-value inputs to Thai/ASEAN suppliers, or document substantial transformation, for exposed export lines.',
            ]
          },
          {
            label: '2027 and Beyond',
            actions: [
              'Treat RVC as a permanent design constraint built into sourcing and localisation decisions.',
              "Position around Japan's real growth vectors — semiconductors/PCB, hybrids & EV components, data centres, decarbonisation — not legacy ICE assembly.",
              'Stage discretionary Thai capex behind the JCC/JETRO Diffusion Index returning above 0 (1H2026 −6, 2H2026 forecast −7).',
            ]
          }
        ],
        ja: [
          {
            label: '今すぐ',
            actions: [
              '社内報告がどの統計を引用しているかを照合する——「日本1位・中国1位」を、DBD外国人事業法ベースであると明示せず、かつBOI表（金額シンガポール1位／FDI件数中国1位）と併記せずに提示しないこと。',
              '19%の対米合意が批准される前に、タイのBOMに含まれる中国原産コンテンツを約50%のRVC閾値に照らして監査する。',
              '2026年8月1日のDBD資金トレース（銀行明細）調査に先立ち、外資49.99%未満のタイ合弁パートナーのUBOと真正な資本充実を確認する。',
            ]
          },
          {
            label: '2026年第3四半期まで',
            actions: [
              '301条が25%（強制労働＋過剰生産能力の両案件の合算）に達する積み上げシナリオをモデル化する。',
              '19%対米合意の議会批准と、最終的なRVC閾値——セクター別に設定されるか否かを含め——を注視する。',
              '露出のある輸出品目について、高付加価値部材をタイ／ASEANサプライヤーへ切り替えるか、実質的変更を文書化する。',
            ]
          },
          {
            label: '2027年以降',
            actions: [
              'RVCを、調達・現地化の意思決定に組み込む恒久的な設計制約として扱う。',
              '日本の真の成長ベクトル——半導体／PCB、ハイブリッド＆EV部品、データセンター、脱炭素化——に軸を置き、旧来のICE組立から離れる。',
              'JCC／JETROの景況感指数（DI）が0を回復するまで（2026上半期−6、下半期予測−7）、任意の設備投資を段階的に配置する。',
            ]
          }
        ]
      }
    },

    watchpoints: {
      title: { en: 'Strategic Watchpoints', ja: '戦略的ウォッチポイント' },
      data: {
        en: [
          { signal: 'BOT H1 2026 balance-of-payments FDI release by country', source: 'Bank of Thailand (typically Q3/Q4)', implication: 'Confirms or refutes the Singapore/HK conduit thesis; realized Chinese flows diverging sharply from BOI/DBD counts validates it' },
          { signal: 'Final RVC threshold and whether it is set per sector', source: 'USTR / Thailand–US ART text', implication: 'Defines exactly which Thai-assembled goods keep origin; above 50% or per-sector changes the re-sourcing math' },
          { signal: 'Parliamentary ratification of the 19% US deal', source: 'Thai Parliament', implication: 'Locks the reciprocal rate and the RVC / transshipment regime into force' },
          { signal: 'Second Section 301 (excess-capacity) ruling', source: 'USTR', implication: 'Could stack toward a combined 25% duty on exposed sectors' },
          { signal: 'Next JCC/JETRO Diffusion Index reading', source: 'JCC / JETRO Bangkok survey', implication: 'DI back above 0 is the trigger to release staged discretionary capex' },
          { signal: '1 August 2026 DBD financial-trail enforcement', source: 'DBD, 16 high-risk provinces', implication: 'Bank-statement checks on นอมินี-vulnerable JVs begin; UBO documentation becomes an immediate compliance imperative' },
        ],
        ja: [
          { signal: 'BOTの2026年上半期・国別国際収支FDI公表', source: 'タイ中央銀行（通常Q3〜Q4）', implication: 'シンガポール／香港の導管仮説を裏付けるか否定するか。実現した中国フローがBOI／DBD件数と大きく乖離すれば仮説が実証される' },
          { signal: '最終RVC閾値と、セクター別設定か否か', source: 'USTR／タイ・米ART本文', implication: 'どのタイ組立品が原産地資格を保つかを確定。50%超やセクター別なら再調達の計算が変わる' },
          { signal: '19%対米合意の議会批准', source: 'タイ議会', implication: '相互関税率とRVC／迂回輸出レジームを法的に確定させる' },
          { signal: '第2の301条（過剰生産能力）判定', source: 'USTR', implication: '露出セクターで合算25%関税へ積み上がる可能性' },
          { signal: '次回のJCC／JETRO景況感指数（DI）', source: 'JCC／JETROバンコク調査', implication: 'DIの0回復が、段階配置した任意設備投資を解除する引き金' },
          { signal: '2026年8月1日のDBD資金トレース執行', source: 'DBD、16の高リスク県', implication: 'นอมินี脆弱な合弁への銀行明細調査が開始。UBO文書化が即時のコンプライアンス義務に' },
        ]
      }
    },

    sources: [
      'Nation Thailand — "Thailand draws THB188bn in first-half FDI as China leads firms and Japan investment value" (17 July 2026) — https://www.nationthailand.com/business/investment/40068735',
      'Thansettakij — "จีนแห่ลงทุนไทย ครึ่งปีแรกเม็ดเงินทะลุ 1.87 แสนล้าน" (17 July 2026) — https://www.thansettakij.com/economy/664201',
      'BOI (OSOS) — "Thailand Secures $43.6bn 1H 2026 Investment Surge" (23 July 2026) — https://osos.boi.go.th/EN/news/2430/',
      'Nation Thailand — "BOI says first-half investment tops B1.47tn" — https://www.nationthailand.com/business/economy/40068948',
      'Bloomberg — "AI Data Center Boom Sparks 80% Surge in First-Half FDI Applications to Thailand" (23 July 2026)',
      'Nation Thailand — "Singapore tops BOI applications at THB 547bn, driven by global parents" — https://www.nationthailand.com/business/investment/40061742',
      'Bangkok Post / Bank of Thailand Q1 2026 Monetary Policy Report — "BoT urges focus on quality over quantity for foreign flows" (15 May 2026)',
      'Nation Thailand — "DBD tightens nominee crackdown, orders financial-trail checks in 16 risk provinces" — https://www.nationthailand.com/news/general/40068701',
      'Bangkok Post — "Nominee crackdown steps up" — https://www.bangkokpost.com/business/general/3281069',
      'Thai Enquirer — "Thailand seeks lower US tariff as 12.5% levy takes effect" (24 July 2026) — https://www.thaienquirer.com/72428/',
      'Nation Thailand — "Thailand agrees to US terms, adopts 50% RVC to curb Chinese goods" — https://www.nationthailand.com/business/economy/40053598',
      'Bangkok Post — "Thai industry jittery over US tariff rules" — https://www.bangkokpost.com/business/general/3126933',
      'JETRO / JCC Bangkok — Survey on Business Sentiment of Japanese Corporations in Thailand, 1H 2026 (30 June 2026)',
      'Thailand.go.th — "BOI Approves THB65bn Expansion by World\'s Top PCB Maker" (Zhen Ding Technology / Peng Shen Technology)',
      'Nation Thailand — "Thailand Approves $1.99 Billion in New Investment, Led by AI and Advanced Electronics" (8 July 2026) — https://www.nationthailand.com/pr-news/pr-news/40068400',
      'VietnamPlus — "FDI disbursement hits five-year high in H1" — https://en.vietnamplus.vn/fdi-disbursement-hits-five-year-high-in-h1-post347684.vnp',
      'Indonesia Investments — Q2 2026 investment realization — https://www.indonesia-investments.com/news/todays-headlines/item9992',
      'MIDA — "Malaysia Attracts RM92.8 Billion in Q1 2026 Approved Investments"',
      'Manila Bulletin — "Foreign direct investments plunge to $1.7 billion in Q1"',
      'Nation Thailand — "Thai GDP grows 2.8% in Q1 as NESDC warns of cost-of-living pressure" — https://www.nationthailand.com/business/economy/40066349',
    ]
  };

  const urgencyVariant = (level: string) => {
    if (level === 'high') return 'destructive';
    if (level === 'medium') return 'secondary';
    return 'outline';
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
  };

  return (
    <>
      <SEO
        title={isJapanese ? titleJa + ' | WaLens' : titleEn + ' | WaLens'}
        description={isJapanese ? metaDescJa : metaDescEn}
        canonicalPath={canonicalPath}
      />
      <Helmet>
        <html lang={isJapanese ? 'ja' : 'en'} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={isJapanese ? titleJa : titleEn} />
        <meta property="og:description" content={isJapanese ? metaDescJa : metaDescEn} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="WaLens" />
        <meta property="og:locale" content={isJapanese ? 'ja_JP' : 'en_US'} />
        <meta property="og:locale:alternate" content={isJapanese ? 'en_US' : 'ja_JP'} />
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:section" content="Investment" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isJapanese ? titleJa : titleEn} />
        <meta name="twitter:description" content={isJapanese ? metaDescJa : metaDescEn} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl} />
        <link rel="alternate" hrefLang="ja" href={canonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero */}
        <section className="relative w-full h-[340px] md:h-[420px] flex items-end overflow-hidden">
          <img src={heroImage} alt="Thailand FDI H1 2026 — Japan by Value, China by Count: Strategic Analysis for Japanese Executives" className="absolute inset-0 w-full h-full object-cover z-0" />
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
              <span>{isJapanese ? '公開' : 'Published'}: {content.lastUpdated}</span>
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
            { label: isJapanese ? 'タイFDI 2026上半期' : 'Thailand FDI H1 2026' }
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
                <h2 className="text-2xl font-bold">{isJapanese ? 'エグゼクティブブリーフ' : 'Executive Brief'}</h2>
                <p className="text-sm text-muted-foreground">{isJapanese ? '経営層のための要約' : 'Key insights for decision makers'}</p>
              </div>
            </div>
            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {content.executiveSummary[isJapanese ? 'ja' : 'en'].map((point, idx) => (
                    <li key={idx} className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{renderBold(point)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* DBD Table (primary) */}
          <section id="dbd-table" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Database className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{isJapanese ? '見出しの統計（DBD）' : 'The Headline Table (DBD)'}</h2>
                <p className="text-sm text-muted-foreground">{isJapanese ? '「日本1位・中国1位」の出所' : 'Where the "Japan #1 / China #1" headline comes from'}</p>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <span style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{content.dbdTable.title[isJapanese ? 'ja' : 'en']}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">#</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '投資元' : 'Source'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '金額（百万バーツ）' : 'Value (THB mn)'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '社数' : 'Businesses'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '社数シェア' : 'Share of firms'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '平均（百万バーツ）' : 'Avg deal (THB mn)'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.dbdTable.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-semibold text-primary">{row.rank}</td>
                          <td className="py-3 pr-4 font-medium" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.source}</td>
                          <td className="py-3 pr-4 font-semibold text-primary whitespace-nowrap">{row.value}</td>
                          <td className="py-3 pr-4" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.firms}</td>
                          <td className="py-3 pr-4">{row.share}</td>
                          <td className="py-3">{row.avg}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
                  {content.dbdTable.note[isJapanese ? 'ja' : 'en']}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* BOI Table (secondary) + Key Numbers */}
          <section id="boi-table" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Globe className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{isJapanese ? 'もう一つの統計（BOI）' : 'The Other Table (BOI)'}</h2>
                <p className="text-sm text-muted-foreground">{isJapanese ? '同じ半年、まったく異なる順位表' : 'Same half-year, a completely different league table'}</p>
              </div>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  <span style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{content.boiTable.title[isJapanese ? 'ja' : 'en']}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">#</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '投資元' : 'Source'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '金額（百万バーツ）' : 'Value (THB mn)'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">USD</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '件数' : 'Projects'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '平均（百万バーツ）' : 'Avg project (THB mn)'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.boiTable.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-semibold text-primary">{row.rank}</td>
                          <td className="py-3 pr-4 font-medium" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.source}</td>
                          <td className="py-3 pr-4 font-semibold text-primary whitespace-nowrap">{row.value}</td>
                          <td className="py-3 pr-4 whitespace-nowrap">{row.usd}</td>
                          <td className="py-3 pr-4" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.projects}</td>
                          <td className="py-3">{row.avg}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
                  {content.boiTable.note[isJapanese ? 'ja' : 'en']}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  {content.keyNumbers.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '指標' : 'Metric'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '数値' : 'Figure'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.keyNumbers.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.metric}</td>
                          <td className="py-3 font-semibold text-primary" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Analysis */}
          <section id="analysis" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Lightbulb className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{content.analysis.title[isJapanese ? 'ja' : 'en']}</h2>
              </div>
            </div>
            <div className="space-y-6">
              {content.analysis.points[isJapanese ? 'ja' : 'en'].map((point, idx) => (
                <Card key={idx} className="border-l-4 border-l-purple-500/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Eye className="h-4 w-4 text-purple-500" />
                      <span style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{point.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{renderBold(point.content)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Key Signals */}
          <section id="signals" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{isJapanese ? '主要インテリジェンスシグナル' : 'Key Intelligence Signals'}</h2>
                <p className="text-sm text-muted-foreground">{isJapanese ? '今読むべき3つのシグナル' : 'Three signals every executive should track now'}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    {isJapanese ? '緊急' : 'Urgent'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
                    {isJapanese
                      ? <>関税の時計はすでに鳴った。122条の10%は<strong className="font-semibold text-foreground">7月24日</strong>に失効し、12.5%の301条が発効。2026年の残り5カ月で<strong className="font-semibold text-foreground">約300億米ドル</strong>のタイ輸出が露出し、301条の2案件合算で<strong className="font-semibold text-foreground">25%</strong>に達しうる。旧10%を前提とした下半期の陸揚げコストはすでに陳腐化している。</>
                      : <>The tariff clock has already struck. Section 122's 10% expired <strong className="font-semibold text-foreground">24 July</strong> and a 12.5% Section 301 levy is live; ~<strong className="font-semibold text-foreground">USD 30bn</strong> of Thai exports over the remaining five months of 2026 are exposed, and both Section 301 cases combined could reach <strong className="font-semibold text-foreground">25%</strong>. H2 landed-cost models built on the old 10% floor are already stale.</>
                    }
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="h-4 w-4 text-amber-500" />
                    {isJapanese ? '構造的' : 'Structural'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
                    {isJapanese
                      ? <>「Made in Thailand」の原産地は、量ではなく<strong className="font-semibold text-foreground">RVC</strong>によって再定義されつつある。中国のTier2〜3サプライヤーが基盤を再構築するにつれ、日系輸出企業のタイBOMはより多くの中国原産コンテンツを吸収する——まさに約50%のRVC閾値と40%の สวมสิทธิ์ 罰則が狙う対象だ。サプライヤーの流入は現地化の好機であり、同時に原産地コンプライアンスのリスクでもある。</>
                      : <>"Made in Thailand" origin is being redefined by <strong className="font-semibold text-foreground">RVC</strong>, not by volume. As Chinese Tier-2/3 suppliers repopulate the base, Japanese exporters' Thai bills of materials absorb more Chinese-origin content — precisely what the ~50% RVC threshold and 40% สวมสิทธิ์ penalty target. The supplier influx is both a localisation opportunity and an origin-compliance risk.</>
                    }
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    {isJapanese ? 'データの読み方' : 'Read the Data Right'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
                    {isJapanese
                      ? <>2つの順位は<strong className="font-semibold text-foreground">別のもの</strong>を測っている。日本はDBD金額で首位、中国は両方の件数表で首位、シンガポールはBOI金額で首位（大半が導管資本）。片方の数字だけを引けば市場を読み誤る。BOTの上半期国際収支FDI公表を注視せよ——国別の実現フローが<strong className="font-semibold text-foreground">導管仮説</strong>を裏付けるか否定する。</>
                      : <>The two rankings measure <strong className="font-semibold text-foreground">different things</strong>. Japan leads DBD value; China leads both count tables; Singapore leads BOI value (largely conduit capital). Citing one number without the other misreads the market. Watch BOT's H1 balance-of-payments FDI release — realized flows by country will confirm or refute the <strong className="font-semibold text-foreground">conduit thesis</strong>.</>
                    }
                  </p>
                </CardContent>
              </Card>
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
                  <p className="text-muted-foreground max-w-md mx-auto" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
                    {isJapanese
                      ? '統計の照合・地域比較、セクター別戦略判断、次のアクション、戦略的ウォッチポイントを含む完全版レポートにアクセスするにはプレミアムプランが必要です。'
                      : 'The full dataset reconciliation, regional comparison, sector decision guide, next action insights, and strategic watchpoints require a premium subscription.'
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
              {/* Reconciliation & Regional */}
              <section id="reconciliation" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <Shield className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{isJapanese ? '統計の照合と地域比較' : 'Reconciliation & Regional View'}</h2>
                    <p className="text-sm text-muted-foreground">{isJapanese ? '3つの統計、3つの物語' : 'Three datasets, three different stories'}</p>
                  </div>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Database className="h-5 w-5 text-red-500" />
                      <span style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{content.reconciliationTable.title[isJapanese ? 'ja' : 'en']}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            {content.reconciliationTable.headers[isJapanese ? 'ja' : 'en'].map((h, i) => (
                              <th key={i} className="text-left py-2 pr-4 font-semibold" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {content.reconciliationTable.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 pr-4 font-medium text-foreground align-top" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.dim}</td>
                              <td className="py-3 pr-4 text-muted-foreground align-top" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.boi}</td>
                              <td className="py-3 pr-4 text-muted-foreground align-top" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.dbd}</td>
                              <td className="py-3 text-muted-foreground align-top" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.bot}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6 border-l-4 border-l-red-500/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Eye className="h-4 w-4 text-red-500" />
                      <span style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{content.botWarning.title[isJapanese ? 'ja' : 'en']}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{renderBold(content.botWarning.content[isJapanese ? 'ja' : 'en'])}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Globe className="h-5 w-5 text-red-500" />
                      <span style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{content.regionalTable.title[isJapanese ? 'ja' : 'en']}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            {content.regionalTable.headers[isJapanese ? 'ja' : 'en'].map((h, i) => (
                              <th key={i} className="text-left py-2 pr-4 font-semibold" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {content.regionalTable.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 pr-4 font-medium text-foreground align-top" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.country}</td>
                              <td className="py-3 pr-4 text-muted-foreground align-top" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.metric}</td>
                              <td className="py-3 pr-4 font-semibold text-primary align-top whitespace-nowrap" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.value}</td>
                              <td className="py-3 pr-4 text-muted-foreground align-top">{row.yoy}</td>
                              <td className="py-3 text-muted-foreground align-top" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.top}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Sector Decision Guide */}
              <section id="sector-guide" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <Crown className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{content.sectorGuide.title[isJapanese ? 'ja' : 'en']}</h2>
                  </div>
                </div>
                <div className="space-y-4">
                  {content.sectorGuide.data.map((row, idx) => (
                    <Card key={idx} className="border-l-4 border-l-amber-500/50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                          <CardTitle className="text-base" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.sector[isJapanese ? 'ja' : 'en']}</CardTitle>
                          <Badge variant={urgencyVariant(row.urgencyLevel) as 'destructive' | 'secondary' | 'outline'}>
                            {row.urgency[isJapanese ? 'ja' : 'en']}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground mb-1" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
                          <span className="font-medium text-foreground">{isJapanese ? '投資動向：' : 'Investment dynamic: '}</span>{row.dynamic[isJapanese ? 'ja' : 'en']}
                        </p>
                        <p className="text-xs text-muted-foreground mb-2" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
                          <span className="font-medium text-foreground">{isJapanese ? '原産地（RVC）露出：' : 'Origin (RVC) exposure: '}</span>{row.rvc[isJapanese ? 'ja' : 'en']}
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
                          <span className="font-medium text-foreground">{isJapanese ? 'メモ：' : 'Note: '}</span>{row.note[isJapanese ? 'ja' : 'en']}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Next Action Insights */}
              <section id="next-actions" className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <TrendingUp className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{content.nextActions.title[isJapanese ? 'ja' : 'en']}</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {content.nextActions.horizons[isJapanese ? 'ja' : 'en'].map((horizon, idx) => (
                    <Card key={idx} className="border-t-4 border-t-primary">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{horizon.label}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {horizon.actions.map((action, aIdx) => (
                            <li key={aIdx} className="flex gap-2 text-sm">
                              <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground leading-relaxed" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Strategic Watchpoints */}
              <section id="watchpoints" className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Eye className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{content.watchpoints.title[isJapanese ? 'ja' : 'en']}</h2>
                    <p className="text-sm text-muted-foreground">{isJapanese ? '評価を大きく変える可能性のあるシグナル' : 'Signals that would materially change the assessment'}</p>
                  </div>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'シグナル' : 'Signal'}</th>
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '発生源' : 'Source'}</th>
                            <th className="text-left py-2 font-semibold">{isJapanese ? '含意' : 'Implication'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.watchpoints.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 pr-4 font-medium align-top" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.signal}</td>
                              <td className="py-3 pr-4 text-muted-foreground align-top" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.source}</td>
                              <td className="py-3 text-muted-foreground align-top" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.implication}</td>
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

export default ThailandFDIFirstHalf2026;
