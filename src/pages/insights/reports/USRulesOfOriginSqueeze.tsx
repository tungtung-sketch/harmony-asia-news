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
import heroImage from '@/assets/intelligence-global-trade.jpg';

const USRulesOfOriginSqueeze = () => {
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

  const slug = 'us-rules-of-origin-2026';
  const titleEn = "Washington's Rules-of-Origin Squeeze: Why the Tariff Rate Is the Smaller Threat for Japanese Manufacturers in Thailand";
  const titleJa = '米国「原産地ルール」包囲網 ── 関税率より怖い、タイ生産日系企業への構造的脅威';
  const publishedDate = '2026-06-14';
  const canonicalPath = '/insights/trade/us-rules-of-origin-2026';
  const canonicalUrl = `https://walensnews.com${canonicalPath}`;

  const metaDescEn = 'How the US shift from "substantial transformation" to local-content (RVC) origin rules — plus a June–July tariff deadline ladder — threatens Japanese manufacturers exporting from Thailand, and what to do before July 24.';
  const metaDescJa = '米国の原産地判定が「実質的変更」から地域原産割合（RVC）へ移行——6〜7月の関税決定カレンダーと併せ、タイから対米輸出する日系メーカーへの構造的脅威と、7月24日までに取るべき具体策を解説。';

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

  const tocSections = [
    { id: 'executive-summary', label: isJapanese ? 'エグゼクティブブリーフ' : 'Executive Brief' },
    { id: 'countdown', label: isJapanese ? 'カウントダウン' : 'The Countdown' },
    { id: 'mechanics', label: isJapanese ? '制度の構造' : 'Policy Mechanics' },
    { id: 'signals', label: isJapanese ? '主要インテリジェンスシグナル' : 'Key Intelligence Signals' },
    { id: 'peer-compliance', label: isJapanese ? 'ピア比較・コンプライアンス' : 'Peer & Compliance Intelligence' },
    { id: 'sector-guide', label: isJapanese ? 'セクター別戦略判断' : 'Sector Decision Guide' },
    { id: 'next-actions', label: isJapanese ? '次のアクション' : 'Next Action Insights' },
    { id: 'watchpoints', label: isJapanese ? '戦略的ウォッチポイント' : 'Strategic Watchpoints' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: { en: titleEn, ja: titleJa },
    subheadline: {
      en: "Thailand's US tariff could jump from 10% to ~22.5% within weeks — but the rate is the smaller threat. Washington is rewriting the origin rule from \"substantial transformation\" to local-content (RVC), and goods that fail can face penalties of up to 40%.",
      ja: 'タイの対米関税は数週間以内に10%から約22.5%へ跳ね上がる可能性がある——しかし「率」は小さい方の脅威にすぎない。米国は原産地判定基準を「実質的変更」から地域原産割合（RVC）へ書き換えつつあり、基準未達品には最大40%の関税が課されうる。'
    },
    category: { en: 'Trade / Regulatory / US Tariffs', ja: '通商 / 規制 / 米国関税' },
    lastUpdated: publishedDate,

    executiveSummary: {
      en: [
        "Thailand's US tariff could jump from **10%** to roughly **22.5%** within weeks. The US Supreme Court struck down the IEEPA-based reciprocal tariffs on **February 20, 2026**, so Washington pivoted to a flat **10%** under Section 122 (all countries, Feb 24 – Jul 24). A separate forced-labour review puts Thailand in a **46-economy high-risk group** facing an additional **+12.5%**. Deadlines are imminent: **hearing-participation request by June 22**, **written comments by July 6**, **public hearing July 7**, **final decision by July 24**.",
        "But the **rate** is the smaller threat — the real threat is the origin **rule** change. The US is shifting its origin test from \"**Substantial Transformation**\" to **Regional Value Content (RVC)**. A Japanese plant in Thailand assembling from imported components may fail the local-value threshold, and goods declared as Thai-origin are then treated as origin fraud (สวมสิทธิ์) / transshipment — carrying tariffs of up to **40%**. \"Made in Thailand\" assembly no longer guarantees Thai origin.",
        "Thailand is behind. **Malaysia, Taiwan, Bangladesh, Argentina, and Guatemala** — none with forced-labour laws — are already locked in at 10% via Agreements on Reciprocal Trade (ART). Thailand has **25 unresolved issues** in its own ART negotiation, targeting end-June. On top of that, a separate **\"excess-capacity\"** probe targeting **electronics, rubber, and machinery** — the core of Japanese manufacturing in Thailand — resolves in mid-June."
      ],
      ja: [
        'タイの対米関税は、数週間以内に**10%**から約**22.5%**へ跳ね上がる可能性がある。米連邦最高裁が**2026年2月20日**にIEEPAに基づく相互関税を違憲としたため、米国は通商法122条による一律**10%**関税（全世界対象、2月24日〜7月24日の150日間）に切り替えた。さらに「強制労働」審査でタイは高リスク**46カ国群**に分類され、追加**+12.5%**の上乗せ対象となっている。締切は目前：公聴会参加申請が**6月22日**、意見書提出が**7月6日**、公聴会が**7月7日**、最終決定が**7月24日**である。',
        'だが、関税「**率**」は小さい方の脅威にすぎない。本当の脅威は原産地「**ルール**」の変更である。米国は原産地判定基準を、従来の「**実質的変更（Substantial Transformation）**」から「**地域原産割合（RVC＝国内付加価値比率）**」へ移行させつつある。輸入部材を用いてタイで組み立てる日系工場の製品は、この国内付加価値基準を満たせず「**原産地偽装（สวมสิทธิ์）／transshipment**」と見なされれば、最大**40%**の関税を課されるリスクがある。タイ国内での「組み立て」が、もはや原産地を保証しない。',
        'タイは出遅れている。**マレーシア、台湾、バングラデシュ、アルゼンチン、グアテマラ**は、強制労働関連法を持たないにもかかわらず、相互貿易協定（ART）を米国と締結済みで10%に据え置かれている。タイは**25項目**の未解決論点を抱え、6月末の妥結を目指して交渉中である。加えて、**電子機器・ゴム・機械**という日系製造業の中核3分野を狙った別個の「**過剰生産能力（excess capacity）**」調査の結果が6月中旬に出る。'
      ]
    },

    countdownTable: {
      title: { en: 'Six-Week Decision Window — Mid-June to July 24', ja: '6週間の決定ウィンドウ ── 6月中旬〜7月24日' },
      data: {
        en: [
          { date: 'Mid-June', event: 'US ruling on Thailand\'s "excess capacity" inquiry (electronics, rubber, machinery)', why: 'Could trigger separate Section 301 duties on core Japanese-manufacturing sectors' },
          { date: 'June 22', event: 'Deadline to request participation in the US public hearing', why: 'Miss it and Thailand forfeits its formal voice on product lists and exemptions' },
          { date: 'July 6', event: 'Deadline for written comments on tariff rates, product lists, removals, and Annex A exemptions', why: 'Last chance to shape which goods are exempt' },
          { date: 'July 7', event: 'US public hearing', why: 'Where the additional 12.5% case is argued' },
          { date: 'July 24', event: 'Section 122 10% measure expires; final decision expected', why: 'The rate either holds at 10% or stacks toward ~22.5%' },
          { date: 'End-June (target)', event: 'Thailand aims to conclude the Agreement on Reciprocal Trade (ART)', why: 'A signed ART is the most reliable path back into the 10% group' },
        ],
        ja: [
          { date: '6月中旬', event: 'タイの「過剰生産能力」調査（電子・ゴム・機械）の米国判定', why: '日系製造業の中核セクターへの個別301条関税発動のリスク' },
          { date: '6月22日', event: '米国公聴会への参加申請期限', why: '逃せばタイは品目リスト・除外議論で正式な発言権を失う' },
          { date: '7月6日', event: '関税率・品目リスト・除外・Annex A 適用に関する意見書提出期限', why: 'どの品目が除外対象となるかを左右する最後の機会' },
          { date: '7月7日', event: '米国公聴会', why: '追加12.5%の妥当性が議論される場' },
          { date: '7月24日', event: '通商法122条10%措置の失効、最終判断が予定される日', why: '10%で据え置かれるか、約22.5%へ積み上がるかが決まる' },
          { date: '6月末（目標）', event: 'タイがART（相互貿易協定）の妥結を目指す節目', why: 'ART署名が10%群へ復帰する最も確実な経路' },
        ]
      }
    },

    keyNumbers: {
      title: { en: 'Key Numbers', ja: '主要数値' },
      data: {
        en: [
          { metric: 'Current base tariff (Section 122, all countries)', value: '10%' },
          { metric: 'Potential additional "forced-labour" tariff', value: '+12.5% (≈22.5% combined)' },
          { metric: 'Penalty if caught as origin fraud / transshipment', value: 'Up to 40%' },
          { metric: 'Tariff lines exempt under Annex A', value: '1,655 of ~10,000' },
          { metric: 'Economies in the high-risk forced-labour group', value: '46 of 60 (Thailand included)' },
          { metric: 'Unresolved issues in the ART negotiation', value: '25' },
          { metric: 'Thai capacity utilisation (sectors under review)', value: '70–95% (vs US 60% threshold)' },
          { metric: 'C/O certificates issued to the US in 2025 (11 mo)', value: '86,988 (+43% YoY)' },
          { metric: 'Total C/O certificates issued in 2025 / value', value: '1.2 million / >US$100 billion' },
        ],
        ja: [
          { metric: '現行ベース関税（通商法122条、全世界対象）', value: '10%' },
          { metric: '追加「強制労働」関税の見込み', value: '+12.5%（合算で約22.5%）' },
          { metric: '原産地偽装・迂回と認定された場合の罰則関税', value: '最大40%' },
          { metric: 'Annex A 除外対象タリフライン', value: '約10,000のうち1,655' },
          { metric: '強制労働で高リスクと分類された経済圏', value: '60カ国中46カ国（タイを含む）' },
          { metric: 'ART交渉の未解決論点', value: '25項目' },
          { metric: '審査対象セクターのタイ稼働率', value: '70〜95%（米国の60%閾値に対し）' },
          { metric: '2025年（11カ月）対米C/O発行件数', value: '86,988件（前年比+43%）' },
          { metric: '2025年C/O総発行件数 / 価値', value: '120万件 / 1,000億米ドル超' },
        ]
      }
    },

    mechanics: {
      title: { en: 'Policy Mechanics — How We Got Here', ja: '制度の構造 ── ここに至る経緯' },
      points: {
        en: [
          { title: 'From IEEPA to Section 122 to Section 301', content: 'The legal ground shifted underneath exporters in early 2026. On **February 20, 2026**, the US Supreme Court ruled against the reciprocal tariffs imposed under the International Emergency Economic Powers Act (IEEPA) — the framework under which Thailand had faced a 19% rate. Washington then invoked **Section 122 of the Trade Act of 1974**, imposing a flat **10% tariff on goods from all countries for 150 days (February 24 – July 24, 2026)**, while simultaneously preparing measures under **Section 301**. The 10% is therefore a temporary floor, not a settled outcome — and what replaces it on July 24 is the open question.' },
          { title: 'The Forced-Labour Trigger', content: 'The US preliminary review divided 60 economies into two groups: 14 judged to have adequate measures, and **46 — including Thailand — deemed to lack sufficient regulation against imports made with forced labour**. Crucially, the US did **not** object to how Thailand handles forced labour domestically. The objection is narrower and more fixable: Thailand has **no specific law or control measure barring the import of goods made with forced labour from third countries**. That single legislative gap is what places Thailand in the high-risk group exposed to an additional 12.5%.' },
          { title: 'The Rules-of-Origin Shift (the structural threat)', content: 'Beneath the headline rate sits a more consequential change. The US is moving its origin test away from "**Substantial Transformation**" (was the product meaningfully transformed in Thailand?) toward "**Regional Value Content (RVC)**" — a local-content percentage threshold. Under an RVC regime, a product assembled in Thailand from imported components may **fail to qualify as Thai-origin** if domestic value-add falls below the threshold. Goods that fail and are still declared as Thai are treated as **origin fraud (สวมสิทธิ์) / transshipment**, carrying tariffs of **up to 40%**. Thailand\'s Ministry of Commerce has responded with an "RVC-Up" defence program (launched Q4 2025), screening roughly **8,000 Certificate-of-Origin (C/O) applications per month** and targeting some 6,000 exporters to protect a **US$55 billion** export market. The Customs Department is moving to **raise penalties for export origin-fraud** — shifting from light fines toward seizure of goods. For a Japanese manufacturer, the implication is direct: the protection you assume from "Made in Thailand" assembly is now conditional on a value-content calculation you may never have had to model before.' },
        ],
        ja: [
          { title: 'IEEPAから通商法122条、そして301条へ', content: '2026年初頭、輸出企業の法的基盤は揺らいだ。**2026年2月20日**、米連邦最高裁は国際緊急経済権限法（IEEPA）に基づく相互関税を違憲と判断——タイが19%の関税に直面していた根拠枠組みが崩壊した。米国はその後、**1974年通商法122条**を発動し、**全世界の物品に150日間（2026年2月24日〜7月24日）の一律10%関税**を課す一方で、**301条**に基づく措置を並行準備している。したがって10%は暫定的なフロアにすぎず、7月24日に何が取って代わるかは未決事項である。' },
          { title: '強制労働トリガー', content: '米国の予備審査は60の経済圏を2グループに分けた：適切な措置を有すると判断された14カ国・地域と、**強制労働由来の輸入に対する規制が不十分とされた46カ国・地域——タイもこれに含まれる**。重要な点は、米国がタイ国内における強制労働への取り組みを問題視したわけでは**ない**ことだ。論点はより限定的かつ可解だ：タイには**第三国で強制労働により製造された物品の輸入を規制する個別の法律・統制措置が存在しない**。この立法上の単一のギャップだけがタイを追加12.5%の高リスク群に置いている。' },
          { title: '原産地ルールの変更（構造的脅威）', content: '見出しを飾る関税率の下に、より重大な変更が潜んでいる。米国は原産地判定基準を、「**実質的変更（Substantial Transformation）**」（タイで意味のある変容が加わったか？）から「**地域原産割合（RVC）**」——国内付加価値率の閾値——へ移行させつつある。RVC体制下では、輸入部材を用いてタイで組み立てた製品は、国内付加価値が閾値を下回ると**タイ原産として認められない可能性がある**。基準未達ながらタイ原産と申告した製品は**原産地偽装（สวมสิทธิ์）／迂回輸出**と見なされ、**最大40%**の関税を課される。タイ商務省は2025年Q4に「**RVC-Up**」防衛プログラムを立ち上げ、月約**8,000件**のC/O申請を審査、約6,000社の輸出企業を対象として**550億米ドル**の輸出市場を守ろうとしている。関税局も**原産地偽装への罰則強化**を進めており、軽微な罰金から物品差押えへとシフトする方針だ。日系メーカーへの含意は明確である：「Made in Thailand」での組み立てが与えていた保護は、これまでモデル化したことのない付加価値計算次第のものへと変質した。' },
        ]
      }
    },

    sectorGuide: {
      title: { en: 'Sector Decision Guide', ja: 'セクター別戦略判断' },
      data: [
        {
          sector: { en: 'Electronics / IT', ja: '電子機器・IT' },
          rate: { en: 'HIGH — named in excess-capacity probe', ja: '高：過剰生産能力調査の対象' },
          rvc: { en: 'HIGH — high imported-component share', ja: '高：輸入部材比率が高い' },
          urgency: { en: 'Strategic Priority', ja: '戦略的最優先' }, urgencyLevel: 'high',
          note: { en: 'Double exposure — both probe-named and structurally vulnerable to RVC. Document Thai value-add per product line on short notice.', ja: '二重露出：調査対象かつRVC構造的脆弱性を併存。製品ライン別のタイ国内付加価値を短期で文書化すること。' }
        },
        {
          sector: { en: 'Machinery / Industrial', ja: '機械・産業' },
          rate: { en: 'HIGH — named in excess-capacity probe', ja: '高：過剰生産能力調査の対象' },
          rvc: { en: 'HIGH — assembly-heavy, imported parts', ja: '高：組立中心・輸入部材多用' },
          urgency: { en: 'Strategic Priority', ja: '戦略的最優先' }, urgencyLevel: 'high',
          note: { en: 'Treat both the mid-June ruling and the July 24 decision as live cost events.', ja: '6月中旬の判定と7月24日の決定の両方をコストイベントとして織り込むこと。' }
        },
        {
          sector: { en: 'Rubber / Rubber products', ja: 'ゴム・ゴム製品' },
          rate: { en: 'HIGH — named in probe; Annex A group', ja: '高：調査対象ながらAnnex A群でもある' },
          rvc: { en: 'MEDIUM — more domestic raw material', ja: '中：国内原料（ラテックス）比率が高い' },
          urgency: { en: 'Act Now', ja: '即対応' }, urgencyLevel: 'high',
          note: { en: 'Domestic latex helps the RVC test, but probe still creates rate risk. Confirm current Annex A coverage of your specific HS lines.', ja: '国内ラテックスはRVC試験に有利だが、調査による関税リスクは残る。自社HS品目のAnnex A適用状況を確認すること。' }
        },
        {
          sector: { en: 'Automotive parts', ja: '自動車部品' },
          rate: { en: 'MEDIUM — pushing for Annex A inclusion', ja: '中：Annex A 追加採用を申請中' },
          rvc: { en: 'HIGH — deep imported-content supply chains', ja: '高：輸入部材依存度の高いサプライチェーン' },
          urgency: { en: 'Act Now', ja: '即対応' }, urgencyLevel: 'high',
          note: { en: 'Supply chains are component-import-heavy; RVC is the sharper risk than the headline rate. Engage through the July 6 comment window.', ja: '輸入部材依存度が高く、関税率より RVC が鋭いリスク。7月6日の意見書提出ウィンドウを通じた働きかけが鍵。' }
        },
        {
          sector: { en: 'Processed food / Agriculture', ja: '食品加工・農業' },
          rate: { en: 'LOWER — Annex A group; Thailand seeking expansion', ja: '低：Annex A 群、タイは拡大を要請中' },
          rvc: { en: 'LOW — largely domestic content', ja: '低：国内原料比率が高い' },
          urgency: { en: 'Monitor', ja: '継続監視' }, urgencyLevel: 'medium',
          note: { en: 'Annex A coverage is itself under negotiation — confirm line-level status rather than assuming exemption holds.', ja: 'Annex A 適用範囲自体が交渉対象。除外維持を前提とせず、品目別の最新状況を確認すること。' }
        },
        {
          sector: { en: 'Precious metals', ja: '貴金属' },
          rate: { en: 'LOWER — Annex A exempt group', ja: '低：Annex A 除外群' },
          rvc: { en: 'LOW', ja: '低' },
          urgency: { en: 'Monitor', ja: '継続監視' }, urgencyLevel: 'low',
          note: { en: 'Lower urgency, but confirm specific HS line coverage.', ja: '緊急性は低いものの、自社の具体的HS品目の適用状況を確認すること。' }
        },
      ]
    },

    peerCompliance: {
      title: { en: 'Peer Gap & Compliance Reality', ja: 'ピアギャップとコンプライアンスの実態' },
      points: {
        en: [
          { title: 'The Peer Gap', content: 'The decisive variable is not whether a country has forced-labour law — it is whether it has **signed an agreement** with Washington. Several economies **without** such laws sit comfortably at 10% because they concluded reciprocal agreements: **Malaysia, Guatemala, Bangladesh, Argentina, and Taiwan**. Separately, six jurisdictions already have relevant laws in place: **Canada, Ecuador, the European Union, Indonesia, Mexico, and Pakistan**. The strategic reading: your group\'s plants in Malaysia or Taiwan are **already de-risked at 10%**, while your Thailand operation remains exposed pending an ART that still carries 25 unresolved issues. Intra-group sourcing and order-allocation decisions for H2 should account for this asymmetry now, not after July 24.' },
          { title: 'The Compliance Reality', content: 'Thailand\'s exports grew nearly 20% in Q1 2026 and over 20% in April — but Thai exporters\' own councils have warned that part of this surge reflects **circumvention (routing third-country goods through Thailand)**, not genuine domestic production. That is exactly the pattern US origin-enforcement is designed to catch. The Federation of Thai Industries (FTI), chaired by **Pimjai Leeissaranukul**, has flagged the return to Section 301 scrutiny as a major external challenge for 2026. The National Economic and Social Development Council (NESDC) separately warned that Washington could deploy other statutes to impose further duties. The compliance environment is tightening from both the US and the Thai side simultaneously.' },
        ],
        ja: [
          { title: 'ピアギャップ', content: '決定的な変数は強制労働関連法の有無ではなく、米国との**協定締結の有無**である。同種の法律を**持たない**にもかかわらず、相互貿易協定を締結したことで10%に据え置かれている経済圏は：**マレーシア、グアテマラ、バングラデシュ、アルゼンチン、台湾**。別途、関連法を既に有する6法域：**カナダ、エクアドル、EU、インドネシア、メキシコ、パキスタン**。戦略的含意：グループのマレーシア・台湾拠点は**すでに10%で脱リスク化**されている一方、タイ拠点は25項目の未解決論点を抱えるART妥結まで露出を残す。グループ内調達と H2 の受注配分は、7月24日以降ではなく今、この非対称性を織り込むべきだ。' },
          { title: 'コンプライアンスの実態', content: 'タイの輸出は2026年Q1に約20%、4月には20%超で伸びた——だがタイ輸出企業の業界団体自身が、この急増の一部は真正な国内生産ではなく**迂回（第三国産品をタイ経由で輸出）**を反映していると警告している。これこそ米国の原産地執行が狙う典型パターンである。タイ工業連盟（FTI、**ピムジャイ・リーイーサラヌクン**会長）は、301条審査への回帰を2026年の主要対外リスクとして警告している。国家経済社会開発審議会（NESDC）も、米国が他法令を用いて追加課税を行う可能性を別途警告している。米国側・タイ側の双方からコンプライアンス環境が同時に締め付けられている。' },
        ]
      }
    },

    nextActions: {
      title: { en: 'Next Action Insights for Japanese Executives', ja: '日系エグゼクティブへの次のアクション' },
      horizons: {
        en: [
          {
            label: 'Right Now — by June 22',
            actions: [
              'Decide on hearing participation before the June 22 gate — coordinate with your industry association or counsel to file a request to join the July 7 hearing.',
              'Run an RVC self-assessment on your top US-export SKUs — calculate Thai domestic value-add and identify any line near a plausible local-content threshold.',
              'Pull and review your C/O documentation trail — with Customs moving toward seizure-level penalties for misdeclaration, tighten any line where the paper trail is thin.',
            ]
          },
          {
            label: 'By End of June — through July 6',
            actions: [
              'File substantive written comments by July 6 — argue for inclusion of your product lines in Annex A exemptions and present evidence of Thai-worker production.',
              'Build the two-track H2 cost model — scenarios for 10% (deal secured), ~22.5% (high-risk outcome), and a 40% tail for origin-fraud findings on exposed lines.',
              'Map the intra-group peer arbitrage — identify US-bound orders that could, if necessary, be re-sourced from Malaysia or Taiwan group plants already secured at 10%.',
            ]
          },
          {
            label: 'Q3 2026 and Beyond',
            actions: [
              'Treat RVC as a permanent design constraint — build domestic value-content targets into sourcing and localisation decisions going forward.',
              'Monitor the ART text, not just the rate — the annexes (origin rules, exemption lists, enforcement provisions) matter more than the headline percentage.',
              'Watch the forced-labour legislative track in Thailand — a specific import-control law would structurally weaken the 12.5% trigger.',
            ]
          }
        ],
        ja: [
          {
            label: '今すぐ ── 6月22日まで',
            actions: [
              '6月22日までに公聴会参加を判断——業界団体・法務カウンセルと連携し、7月7日公聴会への参加申請を行う。',
              '主要対米輸出SKUのRVC自己評価を実施——タイ国内付加価値を算出し、閾値付近に位置する品目を特定する。',
              '原産地証明書（C/O）の記録を点検——関税局が差押え水準の罰則へ移行する中、証憑の薄い品目を補強する。',
            ]
          },
          {
            label: '6月末まで ── 7月6日締切活用',
            actions: [
              '7月6日までに実質的な意見書を提出——自社品目のAnnex A 除外採用を働きかけ、タイ人労働者による生産の証拠を提示する。',
              'H2のコストモデルを二系統で構築——10%（合意確保）、約22.5%（高リスク帰結）、露出品目向けに40%のテールシナリオも準備する。',
              'グループ内ピアアービトラージを整理——必要時にマレーシア・台湾拠点（既に10%確定）へ再配分しうる対米受注を特定する。',
            ]
          },
          {
            label: 'Q3以降',
            actions: [
              'RVCを恒久的な設計制約として扱う——調達・現地化の意思決定に国内付加価値目標を組み込む。',
              'ART本文だけでなく附属書を精査——原産地規則・除外リスト・執行条項が見出しの関税率より重要となる。',
              'タイの強制労働関連立法を注視——個別の輸入規制法の制定は12.5%トリガーを構造的に弱める。',
            ]
          }
        ]
      }
    },

    watchpoints: {
      title: { en: 'Strategic Watchpoints', ja: '戦略的ウォッチポイント' },
      data: {
        en: [
          { signal: 'Thailand signs the ART before July 24', source: 'Commerce Ministry / White House announcement', implication: 'Most likely path back to the 10% group; rate risk recedes, origin risk remains' },
          { signal: 'Excess-capacity ruling goes against Thailand', source: 'US announcement, mid-June', implication: 'Separate Section 301 duties possible on electronics, rubber, machinery' },
          { signal: 'US finalises the RVC local-content threshold', source: 'USTR rulemaking', implication: 'Defines exactly which Thai-assembled goods lose origin status — model immediately' },
          { signal: 'Thailand enacts a forced-labour import-control law', source: 'Royal Gazette', implication: 'Weakens the 12.5% trigger; moves Thailand toward the low-risk group' },
          { signal: 'Customs issues the higher origin-fraud penalty rule', source: 'Customs Department announcement', implication: 'Seizure-level enforcement begins; C/O accuracy becomes a compliance imperative' },
          { signal: 'Your product line added to / removed from Annex A', source: 'Federal Register / USTR list', implication: 'Direct, line-level change to your US landed cost' },
        ],
        ja: [
          { signal: 'タイが7月24日までにARTに署名', source: '商務省 / ホワイトハウス発表', implication: '10%群への復帰経路として最有力。関税率リスクは後退するが原産地リスクは残存' },
          { signal: '過剰生産能力調査の判定がタイに不利', source: '米国発表（6月中旬）', implication: '電子・ゴム・機械への個別301条関税発動の可能性' },
          { signal: '米国がRVCの国内付加価値閾値を確定', source: 'USTR規則制定', implication: 'どのタイ組立品が原産地資格を失うかが確定——即時にモデル化を' },
          { signal: 'タイが強制労働関連の輸入規制法を制定', source: '官報', implication: '12.5%トリガーを弱体化、低リスク群への移行を促す' },
          { signal: '関税局が原産地偽装の罰則強化を公表', source: '関税局発表', implication: '差押え水準の執行開始。C/Oの正確性がコンプライアンス義務に' },
          { signal: '自社品目のAnnex A 採用 / 除外', source: '連邦官報 / USTRリスト', implication: '対米陸揚げコストへの品目別・直接的影響' },
        ]
      }
    },

    sources: [
      'Nation Thailand — "Thailand races to secure US reciprocal trade deal" (June 5, 2026)',
      'Nation Thailand — "Thailand among 60 economies facing proposed extra US tariffs over forced labour" (June 3, 2026)',
      'Nation Thailand — "FTI pushes MiT procurement as Thai industry faces risks" (June 4, 2026)',
      'Nation Thailand — "Suphajee updates Thai-US trade talks as Thailand addresses Section 301 concerns" (May 12, 2026)',
      'Bangkok Biz News — "เปิดแผนสกัดสวมสิทธิส่งออกสหรัฐ \'พาณิชย์\' ลุยตรวจ RVC 8 พันฉบับต่อเดือน" (Nov 11, 2025)',
      'Bangkok Biz News — "พาณิชย์ เผย 11 เดือนปี 68 ไทยออกใบ C/O สหรัฐ 86,988 เพิ่ม 43% แผงโซล่าเซลล์นำโด่ง" (Jan 2, 2026)',
      'Bangkok Biz News — "\'ศุลกากร\' เล็งเพิ่มโทษยึดสินค้าสวมสิทธิ์ถิ่นกำเนิด สกัดผลกระทบส่งออกไทย" (Mar 5, 2026)',
      'Thansettakij — "ศุลกากรเล็งรื้อเกณฑ์ลงโทษ \'สินค้าสวมสิทธิ์\' สกัดแปลงถิ่นกำเนิด" (Dec 21, 2025)',
      'US Trade Act of 1974 — Section 122 and Section 301 (legal framework)',
      'US Supreme Court ruling on IEEPA reciprocal tariffs (February 20, 2026)',
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
        <meta property="article:section" content="Trade" />
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
          <img src={heroImage} alt="US Rules of Origin Squeeze — Strategic Analysis for Japanese Manufacturers in Thailand" className="absolute inset-0 w-full h-full object-cover z-0" />
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
            { label: isJapanese ? '通商' : 'Trade', href: '/insights?filter=trade' },
            { label: isJapanese ? '原産地ルール包囲網' : 'Rules-of-Origin Squeeze' }
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

          {/* The Countdown */}
          <section id="countdown" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{isJapanese ? 'カウントダウン' : 'The Countdown'}</h2>
                <p className="text-sm text-muted-foreground">{isJapanese ? 'タイのコストベースを書き換える6週間' : 'A six-week window that resets Thailand\'s cost base'}</p>
              </div>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  {content.countdownTable.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '時期' : 'Date (2026)'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'イベント' : 'Event'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '重要性' : 'Why it matters'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.countdownTable.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-semibold text-primary whitespace-nowrap" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.date}</td>
                          <td className="py-3 pr-4 font-medium" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.event}</td>
                          <td className="py-3 text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.why}</td>
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

          {/* Policy Mechanics */}
          <section id="mechanics" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Lightbulb className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{content.mechanics.title[isJapanese ? 'ja' : 'en']}</h2>
              </div>
            </div>
            <div className="space-y-6">
              {content.mechanics.points[isJapanese ? 'ja' : 'en'].map((point, idx) => (
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
                      ? <>関税率の決定は<strong className="font-semibold text-foreground">数日先</strong>、デフォルトは不利。ARTに署名せず再分類も得られなければ、最も蓋然性の高い経路は上方の<strong className="font-semibold text-foreground">約22.5%</strong>。10%前提のH2陸揚げコストは「期待値」ではなく楽観シナリオである。</>
                      : <>The rate decision is <strong className="font-semibold text-foreground">days away</strong>, and the default is bad. Without an ART or reclassification before July 24, the most likely path is upward — toward a combined <strong className="font-semibold text-foreground">~22.5%</strong>. The base case is not "stay at 10%"; the base case is exposure.</>
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
                      ? <>「Made in Thailand」は<strong className="font-semibold text-foreground">バンコクではなくワシントンで</strong>再定義されつつある。10%が確保されても、タイ国内付加価値が薄い工場——日本・中国部材依存度が高く最終組立のみタイで行う——は原産地で否認されうる。これはサプライチェーン<strong className="font-semibold text-foreground">設計</strong>の問題であり、7月24日に終わらない。</>
                      : <>"Made in Thailand" is being redefined <strong className="font-semibold text-foreground">in Washington, not Bangkok</strong>. Even if Thailand secures 10%, a Japanese plant with thin Thai value-content — heavy reliance on imported Japanese or Chinese parts, with final assembly in Thailand — can still be challenged. This is a supply-chain-<strong className="font-semibold text-foreground">architecture</strong> question, and it does not expire on July 24.</>
                    }
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    {isJapanese ? 'セクター個別' : 'Sector-specific'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
                    {isJapanese
                      ? <>過剰生産能力調査は<strong className="font-semibold text-foreground">電子・ゴム・機械</strong>——日系製造業の集中分野——を狙い撃ちする。タイは稼働率<strong className="font-semibold text-foreground">70〜95%</strong>（米国60%閾値超）と反論。6月中旬の判定は強制労働とは別軸のリスクとして個別に追跡すべき。</>
                      : <>The excess-capacity probe names <strong className="font-semibold text-foreground">electronics, rubber, and machinery</strong> — precisely where Japanese manufacturing in Thailand concentrates. Thailand argues capacity utilisation is <strong className="font-semibold text-foreground">70–95%</strong>, above the US 60% threshold. The mid-June ruling is a distinct risk vector from the forced-labour track.</>
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
                      ? 'ピア比較・コンプライアンス、セクター別戦略判断、次のアクション、戦略的ウォッチポイントを含む完全版レポートにアクセスするにはプレミアムプランが必要です。'
                      : 'The full peer & compliance analysis, sector decision guide, next action insights, and strategic watchpoints require a premium subscription.'
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
              {/* Peer & Compliance */}
              <section id="peer-compliance" className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <Shield className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{content.peerCompliance.title[isJapanese ? 'ja' : 'en']}</h2>
                  </div>
                </div>
                <div className="space-y-6">
                  {content.peerCompliance.points[isJapanese ? 'ja' : 'en'].map((point, idx) => (
                    <Card key={idx} className="border-l-4 border-l-red-500/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Eye className="h-4 w-4 text-red-500" />
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
                          <span className="font-medium text-foreground">{isJapanese ? '関税率露出：' : 'Rate exposure: '}</span>{row.rate[isJapanese ? 'ja' : 'en']}
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
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '発生源' : 'If It Happens'}</th>
                            <th className="text-left py-2 font-semibold">{isJapanese ? '含意' : 'Implication'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.watchpoints.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 pr-4 font-medium" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.signal}</td>
                              <td className="py-3 pr-4 text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.source}</td>
                              <td className="py-3 text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.implication}</td>
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

export default USRulesOfOriginSqueeze;
