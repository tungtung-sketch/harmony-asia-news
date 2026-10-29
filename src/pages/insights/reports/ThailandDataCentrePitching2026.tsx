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
  ChevronRight, Crown, Database, Sparkles, Globe, Factory, Clock
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-data-centre-cooling.jpg';

// JP translation drafted by Claude — Mon to review before marketing push

const ThailandDataCentrePitching2026 = () => {
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

  const slug = 'thailand-data-centre-pitching-2026';
  const titleEn = 'Thailand Moves New Data Centres to Competitive Pitching: The End of First-Come-First-Served and Strategic Implications for Japanese Executives';
  const titleJa = 'タイ、新規データセンターを「競争選抜（ピッチング）」へ：先着順の終わりと日系企業への戦略的含意';
  const shortTitleEn = 'Thailand Moves New Data Centres to Competitive Pitching';
  const shortTitleJa = 'タイ、新規データセンターを「競争選抜（ピッチング）」へ';
  const publishedDate = '2026-10-29';
  const canonicalPath = '/insights/investment/thailand-data-centre-pitching-2026';
  const canonicalUrl = `https://walensnews.com${canonicalPath}`;

  const metaDescEn = "Thailand's Data Center Policy Committee approved competitive pitching for 100+ new proposals (~3,000 MW). 83 existing facilities are grandfathered. Cabinet review 3 Nov 2026. What Japanese operators, suppliers and manufacturers must do now.";
  const metaDescJa = 'タイのデータセンター政策委員会が100件超の新規案件（約3,000MW）を競争選抜（ピッチング）制に移行することを承認。既存83施設は保護。11月3日閣議予定。日系企業が今すぐ動くべき理由と具体策。';

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
  const cellStyle = { wordBreak: 'keep-all' as const, overflowWrap: 'anywhere' as const };

  const urgencyVariant = (level: string) => {
    if (level === 'high') return 'destructive';
    if (level === 'medium') return 'secondary';
    return 'outline';
  };

  const tocSections = [
    { id: 'executive-summary', label: isJapanese ? 'エグゼクティブサマリー' : 'Executive Summary' },
    { id: 'overview', label: isJapanese ? '政策概要：「競争選抜」の実像' : 'Policy Overview: What Competitive Selection Is' },
    { id: 'timeline', label: isJapanese ? 'タイムライン' : 'Timeline' },
    { id: 'signals', label: isJapanese ? '主要インテリジェンス・シグナル' : 'Key Intelligence Signals' },
    { id: 'analysis', label: isJapanese ? '電力・水・送電網・財政分析' : 'Power, Water, Grid & Fiscal Analysis' },
    { id: 'competitive', label: isJapanese ? '競争・戦略的ダイナミクス' : 'Competitive & Strategic Dynamics' },
    { id: 'sector-guide', label: isJapanese ? 'セクター別判断ガイド' : 'Sector Decision Guide' },
    { id: 'next-actions', label: isJapanese ? '次のアクション' : 'Next Action Insights' },
    { id: 'watchpoints', label: isJapanese ? '戦略的注視点' : 'Strategic Watchpoints' },
    { id: 'sources', label: isJapanese ? 'ソースノートと出典' : 'Source Notes & Sources' },
  ];

  const content = {
    headline: { en: titleEn, ja: titleJa },
    subheadline: {
      en: 'On 27 October 2026 Thailand approved, in draft, a shift from first-come-first-served approvals to periodic competitive pitching for every new data centre. More than 100 proposals (~3,000 MW) now compete on Thai jobs, skills, local supply chains and green power. The 83 existing facilities are grandfathered. Binding rules are still 8–12 months away.',
      ja: 'タイは2026年10月27日、新規データセンターの承認を「先着順」から定期的な「競争選抜（ピッチング）」へ転換する方針を草案として承認した。100件超・約3,000MWの新規案件は、タイ人雇用、技能移転、国内サプライチェーン、グリーン電力で競うことになる。既存の83施設は保護される。法的拘束力のある規則は、なお8〜12カ月先である。'
    },
    lead: {
      en: "The Nation Thailand headline is accurate. Thailand's Data Center Business Policy Committee (meeting 4/2569) approved a draft policy that sends every data-centre project without a building permit into periodic, competitive \"pitching\" rounds judged on economic benefit to Thailand. The 83 facilities already operating or under construction are grandfathered but must comply with a Code of Practice within one year. What has not happened yet is the legal part: the \"mid-October\" rules were missed, Cabinet sees the policy on 3 November, and no selection criteria, quotas or MW caps have been published. For Japanese companies the risk is not exclusion. The risks are a 6–15-month approval gap for any new capacity, a sharper fight for EEC grid connections and water, and an opening for those who can show Thai supply-chain, skills and green-power credentials.",
      ja: 'The Nation Thailandの見出しは正確である。タイのデータセンター事業政策委員会（第4/2569回会合）は、建築許可を持たないすべてのデータセンター案件を、タイ経済への便益で評価する定期的な「競争選抜（ピッチング）」ラウンドに回す政策草案を承認した。すでに稼働中または建設中の83施設は既得権として保護されるが、1年以内に行動規範（CoP）への適合が求められる。一方で、法的な部分はまだ実現していない。「10月中旬施行」の目標は達成されず、政策は11月3日に閣議にかけられる予定で、選抜基準、割当枠、MW上限はいずれも公表されていない。日系企業にとってのリスクは「締め出し」ではない。リスクは、新規容量に対する6〜15カ月の承認空白、東部経済回廊（EEC）における送電網接続と水をめぐる競争の激化、そしてタイのサプライチェーン・人材育成・グリーン電力の実績を示せる企業にとっての「機会」である。'
    },
    category: { en: 'Policy & Regulation / Digital Infrastructure / Energy', ja: '政策・規制 / デジタルインフラ / エネルギー' },
    lastUpdated: publishedDate,

    executiveSummary: {
      en: [
        "**What has been decided: a selection regime approved in principle, not yet law.** The 27 Oct committee meeting approved a Data Centre Governance Policy: a legal definition (serving non-affiliates, demand ≥0.5 MW), **seven size tiers**, four-dimension Minimum Requirements, a **one-year Code of Practice (CoP)** transition for the **83** existing or under-construction facilities, and **periodic pitching rounds** for new proposals — **more than 100, about 3,000 MW** (Thansettakij). Cabinet is due to see it on **3 Nov 2026**; applications may open from December 2026 (Kaohoon, Thansettakij) or early 2027 (Reuters). Binding rules will take **8–12 months**.",
        '**Exposure: highest for anyone needing new MW, water or connections in the EEC before end-2027.** Projects whose construction permit post-dates **11 Aug 2026**, and expansions that lift a site above **20 MW**, are treated as "new". The Provincial Electricity Authority (PEA) says its EEC upgrade programme (>15bn baht, >80% complete) can support only about **16 initial-phase data-centre projects**. Industrial Estate Authority of Thailand (IEAT) estates already hold notified data-centre demand of about **2,100 MW and 78,000 m³/day** of water. Japanese factories needing load increases in the same corridor compete for the same substations and reservoirs.',
        '**Strategic stance: engage, don\'t wait.** Japanese operators (NTT GDC, KDDI/Telehouse) should **lock in grandfathered status and CoP compliance** now. Suppliers (power, cooling, UPS/generators, water reuse, substations) should position for the **80% blowdown-reuse rule**, fuel-storage limits and **local-content scoring**. Manufacturers should **file grid and water reservations** for 2027–2029 expansions before pitching rounds open and absorb the remaining headroom.',
      ],
      ja: [
        '**決定事項：選抜制度は原則承認されたが、まだ法律ではない。** 10月27日の委員会は「データセンター・ガバナンス政策」を承認した。内容は、法的定義（関連会社以外にサービスを提供し、電力需要0.5MW以上）、**7段階の規模区分**、4分野の最低要件、既存・建設中の**83施設**に対する**1年間の行動規範（CoP）移行期間**、そして新規案件向けの**定期的なピッチング・ラウンド**である。新規案件は**100件超、約3,000MW**に上る（Thansettakij）。閣議は**2026年11月3日**の予定で、申請受付は2026年12月（Kaohoon、Thansettakij）または2027年初頭（ロイター）とされる。拘束力のある規則の整備には**8〜12カ月**を要する。',
        '**エクスポージャー：2027年末までにEECで新たな電力・水・接続を必要とする企業が最も大きい。** 建築許可が**2026年8月11日**より後に発行された案件、および拠点の合計を**20MW超**に引き上げる増設は「新規」として扱われる。地方配電公社（PEA）は、EECの設備増強計画（150億バーツ超、進捗80%超）で支えられる初期段階のデータセンター案件は約**16件**にとどまると述べている。タイ工業団地公社（IEAT）の工業団地では、届出済みのデータセンター需要がすでに約**2,100MW、日量78,000m³**の水に達している。同じ回廊で電力負荷の増加を必要とする日系工場は、同じ変電所と貯水池をめぐって競合することになる。',
        '**戦略的スタンス：待つのではなく、関与せよ。** 日系オペレーター（NTT GDC、KDDI／テレハウス）は、**既得権としての地位とCoP適合を今すぐ確定**すべきである。サプライヤー（電源、冷却、UPS／発電機、水再利用、変電設備）は、**ブローダウン水80%再利用規則**、燃料貯蔵量の制限、**ローカルコンテンツ評価**に向けて態勢を整えるべきである。製造業は、ピッチング・ラウンドが始まり残りの余力が吸収される前に、2027〜2029年の増設に向けた**電力・水の容量予約を申請**すべきである。',
      ]
    },
    executiveBrief: {
      title: { en: 'Executive Brief', ja: 'エグゼクティブブリーフ' },
      en: 'On 27 October Thailand approved a shift from first-come-first-served approvals to competitive pitching for new data centres. The 83 existing and under-construction facilities are protected but must meet a Code of Practice within one year. More than 100 new proposals, about 3,000 MW in total, will compete on jobs, skills transfer, Thai supply-chain participation and green power. Binding standards are 8–12 months away, and the promised "mid-October" rules did not materialise. Japanese firms should confirm grandfathered rights, secure power and water early, and feed into the selection criteria now.',
      ja: 'タイ政府は10月27日、新規データセンターを「先着順」から「競争選抜（ピッチング）」へ転換する方針を承認した。既存・建設中の83施設は保護されるが、1年以内に行動規範（CoP）への適合が求められる。約3,000MW・100件超の新規案件は、雇用、技能移転、タイ企業のサプライチェーン参加、グリーン電力で競う。法的拘束力のある基準は8〜12カ月後であり、「10月中旬施行」は実現しなかった。日系企業は、既得権の確認、電力・水の早期確保、選抜基準への提案参加を今すぐ進めるべきである。'
    },

    overview: {
      verified: {
        title: { en: 'The headline article, verified', ja: '見出し記事の検証' },
        items: {
          en: [
            'The Nation Thailand published "Thailand plans competitive selection for new data centres" on **27 October 2026 at 17:58** (Bangkok time). It reports remarks by **Danucha Pichayanan**, Secretary-General of the National Economic and Social Development Council (NESDC), at Government House that day. The article matches its headline.',
            'Danucha called the change "an overhaul of the incentive system": instead of applying directly for electricity, water or BOI incentives, projects will be **assessed and selected on their proposals and the returns they deliver to the national economy**.',
            'The article was written *before* the evening committee meeting. ThaiPublica, Bangkokbiznews, Thansettakij, Posttoday and Reuters then confirmed its details: **pitching for new projects; no retroactivity; a one-year upgrade window; fuel storage kept below 180,000 litres** to avoid a 200-metre separation requirement from premises such as hospitals.',
          ],
          ja: [
            'The Nation Thailandは**2026年10月27日17時58分**（バンコク時間）、「タイ、新規データセンターに競争選抜を計画」と題する記事を掲載した。同日、首相府で国家経済社会開発評議会（NESDC）の**ダヌチャー・ピチャヤナン事務局長**が行った発言を報じたもので、記事内容は見出しと一致している。',
            'ダヌチャー氏はこの変更を「インセンティブ制度の抜本的見直し」と呼んだ。事業者が電力、水、タイ投資委員会（BOI）の恩典を直接申請するのではなく、**提案内容と国民経済にもたらすリターンに基づいて案件を評価・選抜する**という。',
            '記事は夜の委員会会合の*前*に書かれた。その後、ThaiPublica、Bangkokbiznews、Thansettakij、Posttoday、ロイターが詳細を確認した：**新規案件はピッチング制、遡及適用なし、1年間の改善猶予、燃料貯蔵量は18万リットル未満に抑える**（病院などの施設から200mの離隔距離を求められるのを避けるため）。',
          ]
        }
      },
      mechanism: {
        title: { en: 'Mechanism (as approved in draft on 27 Oct 2026)', ja: '制度の仕組み（2026年10月27日に草案承認）' },
        headers: { en: ['Element', 'What was approved', 'Status'], ja: ['項目', '承認内容', 'ステータス'] },
        rows: {
          en: [
            ['Decision body', 'Data Center Business Policy Committee, meeting 4/2569, chaired by Deputy PM and Finance Minister Ekniti Nitithanprapas; NESDC Secretary-General is secretary', 'Draft policy approved; to Cabinet (expected 3 Nov 2026)'],
            ['Legal definition', 'Building, place or structure using electronic equipment to collect, store, process, host or transmit data for non-affiliates, with power demand ≥0.5 MW', 'Draft policy'],
            ['Size tiers', '1: 0–0.5 MW; 2: >0.5–5; 3: >5–10; 4: >10–20; 5: >20–50; 6: >50–200; 7: ≥200 MW', 'Replaces the 5-tier proposal of 1 Oct and the 3-tier proposal before it'],
            ['CoP intensity', 'Tiers 1–4: "lite"/basic CoP; tier 5: CoP v2; tiers 6–7: CoP v3 (strictest)', 'CoP content not yet published'],
            ['Minimum Requirements (4 dimensions)', '(1) location, land use and backup-fuel storage; (2) grid and water connection; (3) environmental CoP; (4) economic and social contribution', 'Need 8–12 months of agency rule-making to be enforceable'],
            ['Who counts as "new"', 'Construction permit (Or.1 / Sec. 39 bis) issued after **11 Aug 2026**, or no permit yet; also any expansion lifting an operating site above **20 MW** in total', 'Sub-committee 1 to set transition approval path within 1 month'],
            ['Selection process', 'Proposals accepted in rounds; DC One-Stop Service (DC-OSS, Ministry of Digital Economy and Society) pre-screens; a screening committee selects by pitching', 'DES must draft enabling law; criteria still to be issued'],
            ['Initial selection principles', 'Green DCs aligned with net zero by 2050; resource self-supply; SLA continuity; higher Thai labour share and local components; promotion of domestic digital industries; SME access to cloud/AI capacity', 'Principles only; no scoring weights'],
            ['Data system', 'TH-DC Dashboard (DES) consolidating locations, status, resource use and approvals', 'Under development'],
          ],
          ja: [
            ['決定機関', 'データセンター事業政策委員会、第4/2569回会合。議長はエークニティ・ニティタンプラパート副首相兼財務相、NESDC事務局長が事務局', '政策草案を承認。閣議へ（2026年11月3日予定）'],
            ['法的定義', '電子機器を用いて関連会社以外のためにデータを収集・保存・処理・ホスティング・送信する建物、場所または構造物で、電力需要0.5MW以上のもの', '政策草案'],
            ['規模区分', '1：0〜0.5MW、2：0.5超〜5、3：5超〜10、4：10超〜20、5：20超〜50、6：50超〜200、7：200MW以上', '10月1日の5区分案、その前の3区分案を置き換え'],
            ['CoPの厳格度', '区分1〜4：簡易版／基本CoP、区分5：CoP第2版、区分6〜7：CoP第3版（最も厳格）', 'CoPの内容は未公表'],
            ['最低要件（4分野）', '(1) 立地・土地利用・非常用燃料の貯蔵、(2) 送電網・水道への接続、(3) 環境CoP、(4) 経済・社会への貢献', '執行可能とするには各機関による8〜12カ月の規則整備が必要'],
            ['「新規」の定義', '建築許可（Or.1／第39条の2）が**2026年8月11日**より後に発行された案件、または未取得の案件。稼働中の拠点を合計**20MW超**に引き上げる増設も含む', '第1小委員会が1カ月以内に移行期の承認手続きを策定'],
            ['選抜プロセス', '提案はラウンドごとに受付。デジタル経済社会省（DES）傘下のDCワンストップサービス（DC-OSS）が事前審査し、選考委員会がピッチングで選抜', 'DESが根拠法を起草する必要あり。基準は未発出'],
            ['初期の選抜原則', '2050年ネットゼロに沿ったグリーンDC、資源の自給、SLAの継続性、タイ人労働者比率と国産部品の拡大、国内デジタル産業の振興、中小企業のクラウド／AI容量へのアクセス', '原則のみ。配点ウェイトなし'],
            ['データシステム', 'DESのTH-DCダッシュボード（立地、状況、資源使用量、承認状況を一元化）', '開発中'],
          ]
        }
      },
      criteria: {
        title: { en: 'What the criteria are, and what they are not (yet)', ja: '基準として確認されたもの、まだ存在しないもの' },
        groups: {
          en: [
            { label: 'Confirmed as selection or minimum-requirement dimensions', items: ['Location and land use, setbacks and backup-fuel storage', 'Grid and water connection', 'Environmental CoP', 'Economic contribution (jobs, skills, Thai suppliers, SME use)', 'Clean energy, net-zero alignment and resource self-supply', 'Danucha\'s pitching examples: "Do they develop people? Do they build a supply chain? How much can SMEs use it?"'] },
            { label: 'Confirmed in adjacent instruments', items: ['BOI already requires **≥50% Thai nationals** among specialist and management staff in promoted DC projects, plus cooperation with educational institutions', 'BOI screening also covers PUE/energy efficiency, water management and an ERC electricity-supply confirmation', 'The Interior Ministry\'s draft building regulation sets **80% reuse of cooling-tower blowdown**'] },
            { label: 'Not found in any source', items: ['Numerical PUE or WUE thresholds for selection', 'MW quotas or caps per round, or scoring weights', 'Foreign-ownership ceilings within the selection process', 'Security / data-sovereignty tests (listed as a policy objective, but no test specified)', '**There is no published quota.** The only quantitative frame is the ~3,000 MW of pending proposals'] },
          ],
          ja: [
            { label: '選抜または最低要件の分野として確認済み', items: ['立地・土地利用、離隔距離、非常用燃料の貯蔵', '送電網・水道への接続', '環境CoP', '経済への貢献（雇用、技能、タイ企業サプライヤー、中小企業の利用）', 'クリーンエネルギー、ネットゼロとの整合、資源の自給', 'ダヌチャー氏が挙げたピッチングの例：「人材を育てるか。サプライチェーンを築くか。中小企業がどれだけ利用できるか」'] },
            { label: '関連する他の制度で確認済み', items: ['BOIはすでに、奨励対象のDC案件で専門職・管理職の**50%以上をタイ人**とすること、および教育機関との連携を求めている', 'BOIの審査は、PUE／エネルギー効率、水管理、エネルギー規制委員会（ERC）による電力供給確認も対象とする', '内務省の建築規則草案は、**冷却塔ブローダウン水の80%再利用**を定めている'] },
            { label: 'いずれの情報源でも確認できなかったもの', items: ['選抜のためのPUEまたはWUEの数値基準', 'ラウンドごとのMW割当・上限、配点ウェイト', '選抜プロセスにおける外資出資比率の上限', 'セキュリティ／データ主権の審査（政策目標には掲げられているが、審査内容は未定）', '**公表された割当枠は存在しない。** 唯一の定量的な枠組みは、審査待ちの約3,000MWである'] },
          ]
        }
      },
      boi: {
        title: { en: 'Relationship to BOI and FastPass', ja: 'BOIおよびFastPassとの関係' },
        en: 'The pitching system sits **above** BOI promotion: under the founding Prime Minister\'s Office (PMO) Regulation, the committee proposes the standards agencies must follow when they approve, permit or issue BOI promotion certificates. **Thailand FastPass is not a data-centre screening tool.** It is a general permit-acceleration mechanism (25 projects worth 223bn baht as of BOI\'s 6 May 2026 release). Nothing published indicates FastPass will bypass the pitching rounds, and we expect it will not.',
        ja: 'ピッチング制度はBOIの投資奨励の**上位**に位置する。設置根拠となる首相府（PMO）規則の下で、委員会は、各機関が承認・許可・BOI奨励証書の発行を行う際に従うべき基準を提案する。**タイFastPassはデータセンターの審査制度ではない。** 一般的な許認可迅速化の仕組みである（BOIの2026年5月6日発表時点で25件・2,230億バーツ）。FastPassがピッチング・ラウンドを迂回できることを示す公表情報はなく、WaLensはそうならないと見ている。'
      },
      keyNumbers: {
        title: { en: 'Key Numbers', ja: '主要数値' },
        headers: { en: ['Metric', 'Figure', 'Source / status'], ja: ['指標', '数値', '出典／ステータス'] },
        rows: {
          en: [
            ['Operating data centres (committee count, 27 Oct)', '**63** (mostly small financial-institution facilities)', 'NESDC via Thansettakij, Bangkokbiznews'],
            ['Under construction / awaiting final permit', '~**20**', 'Same'],
            ['Grandfathered total', '**83**', 'Bangkokbiznews'],
            ['New proposals entering pitching', '**>100, ~3,000 MW**', 'Thansettakij; Reuters'],
            ['Projects paused on 4 Sep 2026', '**166** (49 under construction + 117 awaiting approval)', 'The Nation, JETRO'],
            ['BOI-approved DC projects 2024–2026', '42 projects, **3,400 MW** IT load, ~**750bn baht**', 'BOI statement (Aug 2026); Reuters'],
            ['BOI 6 May 2026 round', '958bn baht, of which DC/hosting 913bn; TikTok 842bn', 'BOI PR 67/2569'],
            ['IEAT estates: notified DC demand', '22 operators, ~**2,100 MW**, ~**78,000 m³/day**', 'IEAT Deputy Governor, 12 Oct'],
            ['IEAT estates: operating DCs', '8 facilities, ~420 MW, ~10,800 m³/day', 'Same'],
            ['PEA EEC network headroom', 'Only **16** early-phase DC projects', 'PEA Deputy Governor, 12 Oct'],
            ['MEA/PEA connection requests', '22,000–30,000 MW (much speculative)', 'Bangkokbiznews via MCG'],
            ['PDP 2026 DC demand scenarios', '~6,000 / ~8,800 (mid) / ~20,000 MW', 'Draft PDP 2026'],
            ['DC tariff (category 9) indication', '**5–6 baht/kWh** vs 3.95 general rate (Sep–Dec 2026)', 'NEPC 15 Jul 2026 (indicative)'],
            ['Grid-reservation guarantee', '**4.5m baht per MW**; partial refund at 50% utilisation, full at 70%', 'NEPC 15 Jul 2026'],
            ['Cooling-tower blowdown reuse (draft)', '**≥80%** monthly', 'Interior draft regulation; board review 27 Nov'],
            ['Backup-fuel threshold in practice', '<180,000 litres to avoid 200 m separation', 'Danucha, 27 Oct'],
          ],
          ja: [
            ['稼働中のデータセンター（委員会集計、10月27日）', '**63施設**（大半は金融機関の小規模施設）', 'NESDC（Thansettakij、Bangkokbiznews経由）'],
            ['建設中／最終許可待ち', '約**20施設**', '同上'],
            ['既得権保護の対象合計', '**83施設**', 'Bangkokbiznews'],
            ['ピッチングに回る新規案件', '**100件超、約3,000MW**', 'Thansettakij、ロイター'],
            ['2026年9月4日に一時停止された案件', '**166件**（建設中49件＋承認待ち117件）', 'The Nation、日本貿易振興機構（JETRO）'],
            ['BOI承認済みDC案件（2024〜2026年）', '42件、ITロード**3,400MW**、約**7,500億バーツ**', 'BOI声明（2026年8月）、ロイター'],
            ['BOI 2026年5月6日承認分', '9,580億バーツ、うちDC／ホスティング9,130億、TikTok 8,420億', 'BOI PR 67/2569'],
            ['IEAT工業団地：届出済みDC需要', '22事業者、約**2,100MW**、日量約**78,000m³**', 'IEAT副総裁、10月12日'],
            ['IEAT工業団地：稼働中のDC', '8施設、約420MW、日量約10,800m³', '同上'],
            ['PEAのEEC配電網の余力', '初期段階のDC案件で**16件**のみ', 'PEA副総裁、10月12日'],
            ['首都圏配電公社（MEA）／PEAへの接続申請', '22,000〜30,000MW（多くは投機的）', 'Bangkokbiznews（MCG経由）'],
            ['電力開発計画（PDP）2026のDC需要シナリオ', '約6,000／約8,800（中位）／約20,000MW', 'PDP 2026草案'],
            ['DC向け電気料金（区分9）の目安', '**1kWhあたり5〜6バーツ**（一般料金3.95バーツ、2026年9〜12月）', '国家エネルギー政策委員会（NEPC）2026年7月15日（目安）'],
            ['送電網容量予約の保証金', '**1MWあたり450万バーツ**。利用率50%で一部、70%で全額返還', 'NEPC 2026年7月15日'],
            ['冷却塔ブローダウン水の再利用（草案）', '月次で**80%以上**', '内務省規則草案、11月27日に委員会審議'],
            ['実務上の非常用燃料の閾値', '200mの離隔距離を避けるため18万リットル未満', 'ダヌチャー氏、10月27日'],
          ]
        }
      }
    },

    timeline: {
      title: { en: 'From the August–September shock to the October selection regime', ja: '8〜9月の衝撃から10月の選抜制度へ' },
      headers: { en: ['Date (2026)', 'Event', 'Source'], ja: ['日付（2026年）', '出来事', '出典'] },
      rows: {
        en: [
          ['15 Jul', 'NEPC 2/2569 approves a separate DC tariff class (category 9), a 4.5m baht/MW bank guarantee to stop capacity hoarding, and a Direct PPA pathway', 'Isranews, Bangkokbiznews, Thai PBS'],
          ['27 Jul', 'BOI\'s Narit Therdsteerasukdi: future DC promotion must "tick all four boxes" (power, water, environment, national benefit); 70% of projects are in the EEC', 'Bangkokbiznews'],
          ['5 Aug', 'Cabinet approves draft PMO Regulation creating the Data Center Business Policy Committee', 'Prachachat; BOI'],
          ['11 Aug', 'PM Anutin signs the Regulation; 11 Aug becomes the cut-off date for "existing" construction permits', 'Regulation text; ThaiPublica'],
          ['11 Aug', 'Raid on a Chinese-run DC construction site in Ban Chang, Rayong: 24 arrested (20 Myanmar, 4 Chinese); >400 workers on site', 'Bangkok Post, DCD, ASEAN NOW'],
          ['13–14 Aug', 'Regulation published in the Royal Gazette (13 Aug per Bangkokbiznews/Thansettakij; some outlets say 14 Aug)', 'See caveats'],
          ['19 Aug', 'Second Ban Chang raid: 18 Chinese workers arrested', 'Thaiger'],
          ['1 Sep', 'DES Minister Chaichanok Chidchob: DCs have appeared at several Bangkok locations without permission', 'NationTV'],
          ['2 Sep', 'BMA suspends new DC permits; Energy Ministry inspects Rama 9 site after oil-smell complaints; MWA told to delay piped water to new DCs in Bangkok, Nonthaburi, Samut Prakan', 'Jiji, The Nation, Thai Post'],
          ['3 Sep', 'JustPow inventory: 34 Bangkok DCs, ≥247.2 MW and ~4.43m m³/yr water', 'The Nation'],
          ['4 Sep', 'Committee meeting 1/2569: **166 projects paused**; 35 operating DCs identified across 16 agencies; four subcommittees given one month', 'The Nation, Post Today, JETRO'],
          ['7 Sep', 'PCD-supervised clean-up at DAMAC Digital Thailand BKK 01 (Rama 9): >32 m³ oil-contaminated water and sludge removed', 'Thai PBS World, The Nation, DCD'],
          ['20 Sep', 'NESDC targets rules in force "by mid-October"; proposes a 100 MW hyperscale threshold', 'The Nation, Bangkokbiznews'],
          ['23 Sep', 'Committee meeting 2/2569; PM Anutin meets Google on standards and its US$1bn plan; DCs ≥0.5 MW to register with DES', 'Thaigov, The Nation'],
          ['1 Oct', 'Committee: separate legal "data centre" building category; 5 size tiers; two electricity rates (cheaper for Direct PPA/green power)', 'Bangkokbiznews, The Nation'],
          ['1 Oct', 'Amata City Chonburi earthen dike fails: 30–70 cm of water in Phases 7–9; 150 factories affected, 34 stopped', 'MGR Online; The Nation'],
          ['7 Oct', 'BOI Thailand–Japan Investment Forum (700+ executives); NTT cited as DC investor', 'BOI PR 178/2569'],
          ['12 Oct', 'IEAT: 2,100 MW of notified DC demand in estates; PEA: EEC network can take only 16 early-phase DC projects', 'Thansettakij, Bangkokbiznews via MCG'],
          ['~15 Oct', '"Mid-October" in-force target **missed**', '—'],
          ['25 Oct', 'Interior Ministry draft building regulation (7 categories, 80% blowdown reuse, insurance, fire rules) scheduled for the committee on 27 Nov', 'The Nation, Thansettakij'],
          ['27 Oct', 'Committee meeting 4/2569 approves draft governance policy: **7 tiers, 83 grandfathered, >100 projects to pitching**', 'ThaiPublica, Bangkokbiznews, Reuters, The Nation'],
          ['3 Nov (expected)', 'Cabinet consideration', 'Thai Post, Mitihoon'],
          ['27 Nov (scheduled)', 'Committee reviews the Interior building regulation', 'The Nation'],
          ['Dec 2026 – early 2027', 'First pitching window expected to open', 'Thansettakij (Dec); Reuters/Posttoday (early 2027)'],
        ],
        ja: [
          ['7月15日', 'NEPC第2/2569回会合が、DC専用の料金区分（区分9）、容量の囲い込みを防ぐ1MWあたり450万バーツの銀行保証、Direct PPA（直接電力購入契約）の道筋を承認', 'Isranews、Bangkokbiznews、Thai PBS'],
          ['7月27日', 'BOIのナリット・タードサティーラサック長官：今後のDC奨励は「4項目すべて（電力、水、環境、国益）を満たす」必要がある。案件の70%がEECに集中', 'Bangkokbiznews'],
          ['8月5日', '閣議がデータセンター事業政策委員会を設置する首相府規則草案を承認', 'Prachachat、BOI'],
          ['8月11日', 'アヌティン首相が規則に署名。8月11日が「既存」の建築許可の基準日となる', '規則本文、ThaiPublica'],
          ['8月11日', 'ラヨーン県バーンチャーンの中国系DC建設現場への強制捜査：24人逮捕（ミャンマー人20人、中国人4人）。現場の作業員は400人超', 'Bangkok Post、DCD、ASEAN NOW'],
          ['8月13〜14日', '規則が官報に掲載（Bangkokbiznews／Thansettakijによれば13日、一部報道は14日）', '注意事項を参照'],
          ['8月19日', 'バーンチャーンで2回目の強制捜査：中国人作業員18人を逮捕', 'Thaiger'],
          ['9月1日', 'チャイチャノック・チッチョーブDES大臣：バンコクの複数の場所で無許可のDCが見つかったと発言', 'NationTV'],
          ['9月2日', 'バンコク都（BMA）が新規DCの許可を一時停止。エネルギー省が油臭の苦情を受けラーマ9世通りの現場を視察。首都圏水道公社（MWA）にバンコク、ノンタブリー、サムットプラーカーンの新規DCへの給水延期を指示', '時事通信、The Nation、Thai Post'],
          ['9月3日', 'JustPowの調査：バンコクのDCは34カ所、247.2MW以上、年間約443万m³の水を使用', 'The Nation'],
          ['9月4日', '委員会第1/2569回会合：**166件を一時停止**。16機関のデータから稼働中DC 35施設を特定。4つの小委員会に1カ月の期限', 'The Nation、Post Today、JETRO'],
          ['9月7日', '公害管理局（PCD）監督の下、DAMAC Digital Thailand BKK 01（ラーマ9世通り）で清掃：油に汚染された水と汚泥32m³超を除去', 'Thai PBS World、The Nation、DCD'],
          ['9月20日', 'NESDCが「10月中旬まで」の規則施行を目標に設定。ハイパースケールの閾値を100MWとする案を提示', 'The Nation、Bangkokbiznews'],
          ['9月23日', '委員会第2/2569回会合。アヌティン首相が基準と10億米ドルの投資計画についてGoogleと会談。0.5MW以上のDCにDESへの登録を義務付け', 'タイ政府、The Nation'],
          ['10月1日', '委員会：「データセンター」を独立した建物区分として法的に定義、5段階の規模区分、2種類の電気料金（Direct PPA／グリーン電力は割安）', 'Bangkokbiznews、The Nation'],
          ['10月1日', 'アマタシティ・チョンブリの土堤が決壊：フェーズ7〜9で30〜70cmの浸水。150工場が影響を受け、34工場が停止', 'MGR Online、The Nation'],
          ['10月7日', 'BOIタイ・日本投資フォーラム（経営者700人超）。NTTがDC投資家として言及される', 'BOI PR 178/2569'],
          ['10月12日', 'IEAT：工業団地内の届出済みDC需要は2,100MW。PEA：EECの配電網が受け入れられるのは初期段階のDC案件16件のみ', 'Thansettakij、Bangkokbiznews（MCG経由）'],
          ['10月15日頃', '「10月中旬」の施行目標は**未達**', '—'],
          ['10月25日', '内務省の建築規則草案（7区分、ブローダウン水80%再利用、保険、防火規定）を11月27日の委員会で審議予定', 'The Nation、Thansettakij'],
          ['10月27日', '委員会第4/2569回会合がガバナンス政策草案を承認：**7区分、83施設を保護、100件超をピッチングへ**', 'ThaiPublica、Bangkokbiznews、ロイター、The Nation'],
          ['11月3日（予定）', '閣議で審議', 'Thai Post、Mitihoon'],
          ['11月27日（予定）', '委員会が内務省の建築規則を審議', 'The Nation'],
          ['2026年12月〜2027年初頭', '最初のピッチング受付期間が開始される見込み', 'Thansettakij（12月）、ロイター／Posttoday（2027年初頭）'],
        ]
      },
      howItHappened: {
        title: { en: 'How August–September produced October', ja: '8〜9月がいかに10月の決定を生んだか' },
        items: {
          en: [
            '**A pricing agenda already existed.** Before the scandals, NEPC (July) and BOI\'s four criteria were already moving toward pricing resources.',
            '**A governance vacuum then surfaced.** Data centres had no legal definition and were often permitted as "warehouses" or "large buildings"; data on 166 projects was scattered across 16 agencies.',
            '**Scandals made it urgent.** The labour raids, the Rama 9 oil leak and the Bangkok inventory turned the issue into a political priority.',
            '**Pitching is the answer to all three:** it rations scarce grid and water, extracts local benefit, and centralises information through DC-OSS.',
          ],
          ja: [
            '**資源の価格付けという課題はすでに存在していた。** 一連の不祥事の前から、NEPC（7月）とBOIの4基準は資源に価格を付ける方向に動いていた。',
            '**次にガバナンスの空白が表面化した。** データセンターには法的定義がなく、「倉庫」や「大規模建築物」として許可されることが多かった。166件の案件データは16機関に分散していた。',
            '**不祥事が問題を緊急課題に変えた。** 労働者の強制捜査、ラーマ9世通りの油漏れ、バンコクの実態調査により、この問題は政治的な優先課題となった。',
            '**ピッチングは3つの問題すべてへの回答である：** 希少な送電網と水を配分し、国内への便益を引き出し、DC-OSSを通じて情報を一元化する。',
          ]
        }
      }
    },

    signals: {
      headers: {
        en: ['Signal', 'Current reading (28 Oct 2026)', 'Trigger for escalation', 'Why it matters'],
        ja: ['シグナル', '現状（2026年10月28日）', 'エスカレーションの引き金', '重要性']
      },
      rows: {
        en: [
          ['Cabinet adoption', 'Scheduled 3 Nov', 'Deferral or amendment of the 11 Aug cut-off', 'Determines which projects are "existing"'],
          ['Pitching criteria and scoring', 'Principles only', 'Publication of weights, MW caps per round, local-content %', 'Defines winners; Japanese suppliers\' local content becomes a bid asset'],
          ['Transition rules for post-cut-off projects', 'Sub-committee 1 has 1 month', 'A hard rule that all post-11 Aug permits must re-pitch', 'Could strand projects already under construction'],
          ['DC tariff (category 9) final rate', 'Indicative 5–6 baht/kWh; two-rate structure agreed', 'ERC sets the rate, or rates applied to "large users" broadly', 'Cross-subsidy risk to manufacturers'],
          ['PEA/EGAT EEC capacity', '16-project limit; EGAT\'s 31,050m baht transmission plan under ERC review', 'Connection moratorium for any new large load', 'Directly hits factory expansions'],
          ['Water allocation in the EEC', 'ONWR: balance "tight"; DC demand 20–70m m³', 'Dry-season restrictions or priority rules', 'Process-water risk for Japanese plants'],
          ['Interior building regulation', 'Board review 27 Nov; effective 180 days after Gazette', 'Retroactive setback rules', 'Siting and fuel-storage redesign costs'],
          ['Foreign ownership / licensing', 'NBTC moving DCs from Type 1 to Type 3 licence (reported); DES draft bill may require Thai-registered operators', 'Foreign equity caps or local-partner requirement', 'Structuring for Japanese operators'],
          ['Flood standard for DC estates', 'IEAT preparing 200-year rainfall reference', 'Mandatory for new estate permits', 'Capex uplift; siting advantage for elevated sites'],
        ],
        ja: [
          ['閣議決定', '11月3日に予定', '8月11日基準日の延期または修正', 'どの案件が「既存」となるかを決定する'],
          ['ピッチング基準と配点', '原則のみ', '配点ウェイト、ラウンドごとのMW上限、ローカルコンテンツ比率の公表', '勝者を決める。日系サプライヤーのローカルコンテンツが入札上の資産となる'],
          ['基準日以降の案件の移行規則', '第1小委員会に1カ月の期限', '8月11日以降の許可はすべて再ピッチングとする厳格な規則', '建設中の案件が宙に浮く可能性'],
          ['DC向け電気料金（区分9）の最終料金', '目安は1kWhあたり5〜6バーツ。2段階料金体系で合意', 'ERCが料金を確定、または「大口需要家」全般に適用', '製造業への内部補助リスク'],
          ['PEA／タイ発電公社（EGAT）のEEC容量', '16件の上限。EGATの310億5,000万バーツの送電計画をERCが審査中', '新規の大口負荷すべてに対する接続モラトリアム', '工場の増設を直撃する'],
          ['EECの水配分', '国家水資源局（ONWR）：需給は「逼迫」、DC需要は2,000万〜7,000万m³', '乾季の取水制限または優先順位の規則', '日系工場のプロセス用水リスク'],
          ['内務省の建築規則', '11月27日に委員会審議。官報掲載から180日後に施行', '離隔距離規則の遡及適用', '立地と燃料貯蔵の再設計コスト'],
          ['外資規制／免許', '国家放送通信委員会（NBTC）がDCを第1種から第3種免許へ移行（報道）。DESの法案草案がタイ登記の事業者を求める可能性', '外資出資比率の上限または現地パートナーの義務化', '日系オペレーターの出資構造'],
          ['DC工業団地の洪水基準', 'IEATが200年確率降雨の基準を準備中', '新規工業団地の許可で義務化', '設備投資の増加。高台の立地が有利に'],
        ]
      }
    },

    analysis: {
      power: {
        title: { en: 'Power: a connection problem, not a generation problem', ja: '電力：発電ではなく接続の問題' },
        intro: {
          en: 'The gap between requested and real load is the key figure. The 27 Oct pipeline of about 3,000 MW is the realistic near-term "contested" volume. As a WaLens estimate, at an 80% load factor 3,000 MW consumes about **21 TWh a year** (3,000 MW × 0.8 × 8,760 h), comparable to a large industrial province.',
          ja: '要求される負荷と実際の負荷の差が最も重要な数字である。10月27日時点の約3,000MWの案件群が、短期的に現実的な「争奪対象」の規模となる。WaLensの試算では、負荷率80%で3,000MWは年間約**21TWh**（3,000MW×0.8×8,760時間）を消費し、大規模な工業県1つに匹敵する。'
        },
        headers: { en: ['Measure', 'Figure'], ja: ['指標', '数値'] },
        rows: {
          en: [
            ['DC connection requests held by MEA and PEA', '22,000–30,000 MW'],
            ['Draft PDP 2026 planning midpoint', '~8,800 MW'],
            ['Notified demand in IEAT estates', '~2,100 MW'],
            ['Actually operating in IEAT estates', '~420 MW'],
          ],
          ja: [
            ['MEAとPEAが保有するDCの接続申請', '22,000〜30,000MW'],
            ['PDP 2026草案の計画中位値', '約8,800MW'],
            ['IEAT工業団地の届出済み需要', '約2,100MW'],
            ['IEAT工業団地で実際に稼働中', '約420MW'],
          ]
        },
        items: {
          en: [
            '**Generation is being planned:** EGAT plans 4,200 MW of new EEC capacity (1,400 MW at Bang Pakong, 2,800 MW in Rayong).',
            '**Transmission:** EGAT\'s 31,050m baht plan, put to an ERC public hearing, is for "the first 16 Data Center users, totalling 3,817.6 MW". Thansettakij reports it would add 1.39 satang/unit to wholesale tariffs and could begin in 2027.',
            '**The binding constraint is substations and distribution.** PEA says its EEC programme (>15bn baht, >80% complete) can support about 16 initial-phase DC projects. PEA wants operators to commit to using **80–100%** of requested capacity (vs 50–70% today) and has a 5bn baht expansion envelope waiting on allocation rules.',
            '**Independent view:** TDRI\'s Dr Areeporn Asawinpongphan, a PDP sub-committee member, said on 6 Oct that the EEC grid is insufficient even for current demand.',
          ],
          ja: [
            '**発電は計画されている：** EGATはEECで4,200MWの新規容量を計画している（バーンパコン1,400MW、ラヨーン2,800MW）。',
            '**送電：** ERCの公聴会にかけられたEGATの310億5,000万バーツの計画は、「最初のDC需要家16件、合計3,817.6MW」向けである。Thansettakijによれば、卸電力料金を1単位あたり1.39サタン押し上げ、2027年に着工する可能性がある。',
            '**制約となっているのは変電所と配電である。** PEAは、EECの増強計画（150億バーツ超、進捗80%超）で支えられるのは初期段階のDC案件約16件だとしている。PEAは事業者に申請容量の**80〜100%**の利用を約束させたい考えで（現在は50〜70%）、配分規則の決定を待つ50億バーツの拡張予算を抱えている。',
            '**独立した見方：** PDP小委員会委員でもあるタイ開発研究所（TDRI）のアリーポーン・アサウィンポンパン博士は10月6日、EECの送電網は現在の需要にすら不十分だと述べた。',
          ]
        }
      },
      tariff: {
        title: { en: 'Tariff and fiscal design', ja: '料金・財政設計' },
        items: {
          en: [
            '**Category 9 tariff:** indicative 5–6 baht/kWh vs the 3.95 baht general rate (Sep–Dec 2026). Large industrial users pay roughly 2.6–4.3 baht/kWh including TOU. Gulf Energy founder Sarath Ratanavadi warned 5–6 baht risks driving investment to competitors.',
            '**Two-rate structure (1 Oct):** a cheaper "special rate" for Direct PPA/renewable buyers and a higher general rate for grid-supplied DCs. The Direct PPA programme is sized at **2,000 MW**; grid-wheeling charges are still unset.',
            '**Grid guarantee:** 4.5m baht per MW, partially refunded at 50% utilisation and fully at 70%. A 100 MW campus implies **450m baht** (WaLens arithmetic; Bangkokbiznews printed "45m baht per 100 MW", an apparent error).',
            '**Principle:** electricity and water prices must reflect full direct and indirect costs, so households and other businesses do not subsidise large operators. **For manufacturers this is the most important protection — watch whether the ERC actually codifies it.**',
          ],
          ja: [
            '**区分9料金：** 目安は1kWhあたり5〜6バーツで、一般料金3.95バーツ（2026年9〜12月）を上回る。大口産業需要家はTOU（時間帯別料金）込みで概ね2.6〜4.3バーツを支払っている。ガルフ・エナジー創業者のサラット・ラタナワディ氏は、5〜6バーツでは投資が競合国に流れるおそれがあると警告した。',
            '**2段階料金体系（10月1日）：** Direct PPA／再生可能エネルギー購入者向けの割安な「特別料金」と、送電網から供給を受けるDC向けの高い一般料金。Direct PPA制度の規模は**2,000MW**で、託送料金はまだ決まっていない。',
            '**送電網保証金：** 1MWあたり450万バーツ。利用率50%で一部、70%で全額返還される。100MWのキャンパスでは**4億5,000万バーツ**となる（WaLensの計算。Bangkokbiznewsは「100MWあたり4,500万バーツ」と報じたが、誤りとみられる）。',
            '**原則：** 電気・水の料金は直接・間接の全コストを反映し、家計や他の事業者が大規模事業者を補助しないようにする。**製造業にとってこれが最も重要な保護策である——ERCが実際にこれを明文化するかを注視すべきである。**',
          ]
        }
      },
      water: {
        title: { en: 'Water: EEC stress is documented; data centres add to it', ja: '水：EECの逼迫は実証済みであり、データセンターがそれを加速させる' },
        headers: { en: ['Indicator', 'Figure'], ja: ['指標', '数値'] },
        rows: {
          en: [
            ['EEC water development plan (2020–2037)', '39 projects, ~900m m³ additional supply; 300–400m m³ delivered, ~500m m³ outstanding (ONWR)'],
            ['Projected DC water demand, EEC', '20–70m m³ depending on site and cooling (ONWR)'],
            ['IEAT notified DC water demand', '~78,000 m³/day ≈ 28.5m m³/yr (WaLens calc.) — inside ONWR\'s range'],
            ['Relative intensity', 'DCs need 12–16× the water of conventional business customers (WHA Utilities and Power)'],
            ['World Bank EEC outlook', 'Demand 3.6bn m³ by 2037; ~40% shortfall in average years, 72% in dry years, even with planned infrastructure'],
            ['New supply', 'Proposed Khlong Wang Tanot reservoir, 99.5m m³; up to 70m m³/yr transferable to Rayong (RID)'],
            ['Rules', 'Estates already require ≥25% reuse of total intake; draft DC rule requires ≥80% blowdown reuse'],
            ['Bangkok', '34 DCs ≈ 4.43m m³/yr, equal to 19,776 households (JustPow)'],
          ],
          ja: [
            ['EEC水資源開発計画（2020〜2037年）', '39事業、追加供給約9億m³。供給済み3億〜4億m³、残り約5億m³（ONWR）'],
            ['EECのDC水需要見通し', '立地と冷却方式により2,000万〜7,000万m³（ONWR）'],
            ['IEATの届出済みDC水需要', '日量約78,000m³≒年間約2,850万m³（WaLens計算）——ONWRの推計範囲内'],
            ['相対的な使用強度', 'DCは一般の事業用需要家の12〜16倍の水を必要とする（WHAユーティリティーズ・アンド・パワー）'],
            ['世界銀行のEEC見通し', '2037年の需要は36億m³。計画中のインフラを含めても、平年で約40%、渇水年で72%が不足'],
            ['新規供給', 'クローン・ワンタノット貯水池（9,950万m³）を計画。最大年7,000万m³をラヨーンへ導水可能（王室灌漑局〈RID〉）'],
            ['規則', '工業団地はすでに総取水量の25%以上の再利用を義務付け。DC規則草案はブローダウン水の80%以上の再利用を義務付け'],
            ['バンコク', 'DC 34カ所で年間約443万m³、19,776世帯分に相当（JustPow）'],
          ]
        }
      },
      costImplications: {
        title: { en: 'Cost implications for Japanese manufacturers (WaLens assessment)', ja: '日系製造業へのコスト面の影響（WaLens評価）' },
        items: {
          en: [
            '**Tariff spillover risk is moderate and falls if category 9 holds.** If the ERC sets DC rates at cost-reflective levels, manufacturers are shielded. If the rate is diluted (the industry is lobbying), grid-expansion costs flow into the Ft component paid by all users.',
            '**Connection-queue risk is high in the EEC through 2027.** PEA is capped at 16 early-phase DC projects, and new generation/transmission only arrives from about 2027. Any factory needing more than about **5–10 MW of new load** in Chonburi or Rayong should assume longer lead times, and possibly DC-style guarantee or commitment requirements.',
            '**Water risk is dry-season and site-specific.** Estates such as Amata and WHA are the gatekeepers. Expect reuse mandates and tariff reform (ONWR is studying raw-water pricing) to spread to all large users.',
          ],
          ja: [
            '**料金の波及リスクは中程度で、区分9が維持されれば低下する。** ERCがDC料金をコスト反映的な水準に設定すれば、製造業は保護される。料金が引き下げられれば（業界はロビー活動中）、送電網拡張のコストは全需要家が負担する燃料費調整（Ft）に転嫁される。',
            '**EECの接続待ちリスクは2027年まで高い。** PEAは初期段階のDC案件16件で上限に達し、新たな発電・送電能力が加わるのは2027年頃からである。チョンブリやラヨーンで約**5〜10MWを超える新規負荷**を必要とする工場は、リードタイムの長期化と、DC同様の保証金や利用率コミットメントの要求を想定すべきである。',
            '**水のリスクは乾季に集中し、立地に依存する。** アマタやWHAなどの工業団地が門番となる。再利用の義務化と料金改革（ONWRは原水の価格設定を検討中）が、すべての大口需要家に広がると見込むべきである。',
          ]
        }
      }
    },

    competitive: {
      pipeline: {
        title: { en: 'Who is in the pipeline', ja: '案件パイプラインの顔ぶれ' },
        items: {
          en: [
            "**Chinese capital:** TikTok's 842bn baht BOI approval (May 2026) is the single largest. Vistas Technology (ZDATA) has an 80 MW facility in Amata City Chonburi; Galaxy DC/Hoyinn announced US$2bn including a Rayong cluster. MGR Online reports Chinese capital dominates 26 companies licensed in 2026. Of the 42 BOI-approved DC projects, 10 are Chinese, 15 Thai, 5 US, 4 UAE and **only 2 Japanese**.",
            '**US hyperscalers:** Google (US$1bn announced in 2024; met PM Anutin on 23 Sep 2026 on standards). AWS and Microsoft are present as owner-operators or colocation tenants.',
            '**Gulf / Singapore / Thai:** DAMAC (Skyline, 200 MW, 46bn baht; the Rama 9 BKK 01 leak site), Bridge Data Centres (134 MW), True IDC (223 MW), GSA (120 MW), Zenith (200 MW).',
            '**Japanese:** NTT Global Data Centers — BKK2 (5 MW) and BKK3 (14 MW) in Amata City Chonburi; BKK4 broke ground in July 2026 with a 100 MW PPA with B.Grimm Power, energisation targeted for Q2 2027 and a Fuji Electric substation; land for BKK5 bought from Amata. KDDI/Telehouse — Bangkok Rama 9 site (9.5 MVA, US$74m) plus a BOI-approved 12 MW extension worth 7.55bn baht.',
          ],
          ja: [
            '**中国資本：** TikTokの8,420億バーツのBOI承認（2026年5月）が単独で最大。Vistas Technology（ZDATA）はアマタシティ・チョンブリに80MWの施設を持ち、Galaxy DC／Hoyinnはラヨーンのクラスターを含む20億米ドルの投資を発表した。MGR Onlineは、2026年に免許を取得した26社で中国資本が優勢だと報じている。BOI承認済みのDC案件42件のうち、中国10件、タイ15件、米国5件、UAE 4件で、**日本はわずか2件**である。',
            '**米国ハイパースケーラー：** Google（2024年に10億米ドルを発表、2026年9月23日に基準についてアヌティン首相と会談）。AWSとMicrosoftは自社運営またはコロケーションのテナントとして進出している。',
            '**湾岸／シンガポール／タイ：** DAMAC（Skyline、200MW、460億バーツ。ラーマ9世通りBKK 01の油漏れ現場）、Bridge Data Centres（134MW）、True IDC（223MW）、GSA（120MW）、Zenith（200MW）。',
            '**日系：** NTTグローバル・データセンターズ——アマタシティ・チョンブリのBKK2（5MW）とBKK3（14MW）。BKK4は2026年7月に着工し、B.Grimm Powerとの100MWのPPA、2027年第2四半期の受電目標、富士電機の変電設備を備える。BKK5用地はアマタから取得済み。KDDI／テレハウス——バンコク・ラーマ9世通りの拠点（9.5MVA、7,400万米ドル）に加え、BOI承認済みの12MW増設（75億5,000万バーツ）。',
          ]
        }
      },
      whoBenefits: {
        title: { en: 'Who benefits from pitching', ja: 'ピッチング制で誰が得をするか' },
        en: 'Pitching rewards demonstrable Thai value-add: Thai engineers in management, Thai SME suppliers, training partnerships and green self-supply. Japanese players are structurally well placed on all four — long Thai payroll histories, deep local supplier networks (cooling, electrical, construction) and B.Grimm-type PPAs. Large import-heavy hyperscale projects are relatively disadvantaged: The Standard (via JETRO) reported that more than half of DC investment value goes to imported equipment, limiting local spillover. **Our reading: the regime tilts the field modestly toward operators with Thai supply chains, and Japanese firms should make that case explicitly.**',
        ja: 'ピッチング制は、タイへの付加価値を実証できる事業者を評価する。具体的には、管理職へのタイ人技術者の登用、タイの中小サプライヤー、人材育成の連携、グリーン電力の自給である。日系企業はこの4点すべてで構造的に有利な立場にある——長年のタイ人雇用の実績、冷却・電気・建設における厚い現地サプライヤー網、B.Grimm型のPPAである。輸入依存度の高い大規模ハイパースケール案件は相対的に不利となる。The Standard（JETRO経由）は、DC投資額の半分以上が輸入設備に充てられ、国内への波及効果は限られると報じた。**WaLensの見立て：この制度はタイのサプライチェーンを持つ事業者にやや有利に働く。日系企業はその点を明確に主張すべきである。**'
      },
      regional: {
        title: { en: 'Regional comparison', ja: '地域比較' },
        headers: { en: ['Market', 'Regime (2026)', 'Implication for Thailand'], ja: ['市場', '制度（2026年）', 'タイへの含意'] },
        rows: {
          en: [
            ['Singapore', 'DC-CFA2: 200 MW allocated, 50 MW each to Digital Realty, Equinix, Keppel and STT GDC (outcome 21 Aug 2026); ≥50% low-carbon power', 'Thailand\'s pitching is modelled on "competitive allocation", but with no MW cap yet'],
            ['Malaysia', 'PM Anwar (Feb 2026): no approvals for non-AI DCs; Johor halted Tier 1–2 approvals (Nov 2025), RM5.33/m³ DC water tariff, water-cooled expansions told to wait until ~mid-2027', 'Thailand absorbs spill-over demand — which is why the queue is ~3,000 MW'],
            ['Indonesia, Vietnam', 'Not researched for this report', '—'],
          ],
          ja: [
            ['シンガポール', 'DC-CFA2：200MWを配分し、Digital Realty、Equinix、Keppel、STT GDCに各50MW（2026年8月21日に結果発表）。低炭素電力50%以上', 'タイのピッチングは「競争的配分」を手本としているが、MW上限はまだない'],
            ['マレーシア', 'アンワル首相（2026年2月）：AI以外のDCは承認しない。ジョホール州はTier 1〜2の承認を停止（2025年11月）、DC向け水道料金1m³あたり5.33リンギ、水冷式の増設は2027年半ば頃まで待機', 'タイが溢れた需要を吸収している——だからこそ審査待ちが約3,000MWに達している'],
            ['インドネシア、ベトナム', '本レポートでは調査対象外', '—'],
          ]
        },
        note: {
          en: 'The direction is clear: all three leading ASEAN markets now ration power and water. Thailand is the last major market to switch from promotion to allocation.',
          ja: '方向性は明確である。ASEANの主要3市場はいずれも電力と水を配給制にした。タイは「振興」から「配分」へ転換した最後の主要市場である。'
        }
      },
      suppliers: {
        title: { en: 'Opportunities for Japanese suppliers', ja: '日系サプライヤーにとっての機会' },
        items: {
          en: [
            '**Water:** systems to reach ≥80% blowdown reuse (RO, softening, ZLD), metering and monthly water-balance reporting.',
            '**Fuel and backup:** right-sized generator and fuel systems below 180,000 litres; battery/UPS substitution; leak containment, ventilation and emergency shut-off are all mandated in the Interior draft.',
            '**Grid:** substations (Fuji Electric already at NTT BKK4), switchgear, transformers; PEA co-investment structures.',
            '**Fire / structure:** automatic suppression, 2-hour fire separation, non-combustible structural elements.',
            '**Flood resilience:** IEAT is preparing a 200-year rainfall reference (300–400 mm prolonged rainfall); Amata\'s "AMATA 800" roadmap targets 800 mm of cumulative rainfall.',
          ],
          ja: [
            '**水：** ブローダウン水80%以上の再利用を実現するシステム（RO、軟水化、ゼロ液体排出〈ZLD〉）、計量、月次の水収支報告。',
            '**燃料・バックアップ：** 18万リットル未満に適正化した発電機・燃料システム、蓄電池／UPSによる代替。漏洩防止、換気、緊急遮断はいずれも内務省草案で義務付けられている。',
            '**送配電：** 変電設備（富士電機がすでにNTT BKK4に納入）、開閉装置、変圧器。PEAとの共同投資スキーム。',
            '**防火・構造：** 自動消火設備、2時間耐火区画、不燃性の構造部材。',
            '**洪水対策：** IEATは200年確率降雨の基準（長時間降雨300〜400mm）を準備中。アマタの「AMATA 800」ロードマップは累積降雨800mmへの対応を目標とする。',
          ]
        }
      },
      floods: {
        title: { en: 'Floods: what the evidence does and does not show', ja: '洪水：証拠が示すこと、示さないこと' },
        items: {
          en: [
            '**There is no evidence that any data centre was flooded or disrupted in the September–October 2026 floods.** The Amata City Chonburi dike failure on 1 Oct affected Phases 7–9 (150 factories affected, 34 stopped). NTT\'s BKK2–BKK5 sites are in the same estate, but we found no report of impact.',
            '**The policy link is real but indirect.** IEAT is preparing a higher flood-resilience standard for DC estates, and Amata committed to the AMATA 800 upgrade. The 27 Oct policy and the Interior draft do **not** contain an explicit flood-siting criterion.',
            'The World Bank found 41% of sampled Thai corporate lending sits in districts with high riverine flood risk. We expect flood resilience to enter the "location" dimension of the Minimum Requirements — **this is a projection.**',
          ],
          ja: [
            '**2026年9〜10月の洪水で、データセンターが浸水または機能停止したという証拠はない。** 10月1日のアマタシティ・チョンブリの堤防決壊はフェーズ7〜9に影響した（150工場が影響、34工場が停止）。NTTのBKK2〜BKK5は同じ工業団地内にあるが、影響の報告は確認できなかった。',
            '**政策との関連は現実的だが間接的である。** IEATはDC工業団地向けに、より高い洪水耐性基準を準備しており、アマタはAMATA 800への改修を約束した。10月27日の政策と内務省草案には、洪水に関する立地基準は明記されて**いない**。',
            '世界銀行は、抽出したタイの企業向け融資の41%が河川洪水リスクの高い地区に集中していることを明らかにした。WaLensは、洪水耐性が最低要件の「立地」分野に組み込まれると予想する——**これは予測である。**',
          ]
        }
      }
    },

    sectorGuide: {
      en: [
        { sector: 'Data-centre operators / investors', examples: 'NTT GDC, KDDI/Telehouse, trading houses', relevance: 'Pitching, CoP, 20 MW expansion trigger', exposure: 'High', urgency: 'high', urgencyLabel: 'Immediate', stance: 'Document permit dates against the 11 Aug cut-off; prepare a pitching dossier (Thai jobs, suppliers, green PPA, SME access).' },
        { sector: 'Electrical & cooling equipment suppliers', examples: 'UPS, generators, chillers, switchgear', relevance: 'Fuel <180,000 L, 80% reuse, fire, substations', exposure: 'High (opportunity)', urgency: 'high', urgencyLabel: 'This quarter', stance: 'Package compliance solutions; quantify Thai local content.' },
        { sector: 'Construction / EPC', examples: '', relevance: 'Slowdown for new projects; retrofit demand from 83 sites', exposure: 'Medium', urgency: 'medium', urgencyLabel: 'Medium', stance: 'Redirect pipeline to CoP retrofits; ensure documented, legal labour (Rayong raids).' },
        { sector: 'Manufacturing in the EEC', examples: '', relevance: 'Grid and water competition', exposure: 'Medium–High', urgency: 'high', urgencyLabel: 'Medium–High', stance: 'File 2027–29 load and water requests now; join FTI/JCC positions on tariff fairness.' },
        { sector: 'Auto / electronics', examples: '', relevance: 'Same as above; flood-exposed estates', exposure: 'Medium', urgency: 'medium', urgencyLabel: 'Medium', stance: 'Review substation redundancy and Amata flood-upgrade timelines.' },
        { sector: 'Utilities / renewables', examples: 'Japanese IPPs, solar EPC', relevance: 'Direct PPA 2,000 MW; cheaper DC rate for green power', exposure: 'High (opportunity)', urgency: 'high', urgencyLabel: 'High', stance: 'Partner with DC bidders on self-supply; track wheeling charges.' },
        { sector: 'Real estate / industrial estates', examples: '', relevance: 'DC land demand; flood and water standards', exposure: 'Medium', urgency: 'medium', urgencyLabel: 'Medium', stance: 'Estates able to certify power, water and 200-year flood design will command premiums.' },
        { sector: 'Finance (Japanese banks / lenders)', examples: '', relevance: 'Project-finance risk on "new" projects; bank guarantees at 4.5m baht/MW', exposure: 'Medium–High', urgency: 'high', urgencyLabel: 'Medium–High', stance: 'Add regulatory conditions precedent (pitching award, CoP); price delay risk of 8–12+ months.' },
      ],
      ja: [
        { sector: 'データセンター事業者・投資家', examples: 'NTT GDC、KDDI／テレハウス、商社', relevance: 'ピッチング、CoP、20MWの増設基準', exposure: '大', urgency: 'high', urgencyLabel: '即時', stance: '8月11日の基準日に対する許可日を文書化し、ピッチング用の提案書（タイ人雇用、サプライヤー、グリーンPPA、中小企業のアクセス）を準備する。' },
        { sector: '電気・冷却設備サプライヤー', examples: 'UPS、発電機、チラー、開閉装置', relevance: '燃料18万L未満、80%再利用、防火、変電設備', exposure: '大（機会）', urgency: 'high', urgencyLabel: '今四半期', stance: '規制適合ソリューションをパッケージ化し、タイでのローカルコンテンツを定量化する。' },
        { sector: '建設・EPC', examples: '', relevance: '新規案件の減速、83施設からの改修需要', exposure: '中', urgency: 'medium', urgencyLabel: '中', stance: '受注パイプラインをCoP対応の改修へ振り向ける。適法で記録の整った労働力を確保する（ラヨーンの強制捜査）。' },
        { sector: 'EECの製造業', examples: '', relevance: '送電網と水をめぐる競合', exposure: '中〜大', urgency: 'high', urgencyLabel: '中〜高', stance: '2027〜29年の電力負荷・水の申請を今すぐ行う。料金の公平性についてタイ工業連盟（FTI）／盤谷日本人商工会議所（JCC）の立場に加わる。' },
        { sector: '自動車・電子', examples: '', relevance: '同上。洪水リスクのある工業団地', exposure: '中', urgency: 'medium', urgencyLabel: '中', stance: '変電設備の冗長性と、アマタの洪水対策改修のスケジュールを確認する。' },
        { sector: '電力・再生可能エネルギー', examples: '日系IPP、太陽光EPC', relevance: 'Direct PPA 2,000MW、グリーン電力向けの割安なDC料金', exposure: '大（機会）', urgency: 'high', urgencyLabel: '高', stance: '電力自給でDC入札者と提携する。託送料金を追跡する。' },
        { sector: '不動産・工業団地', examples: '', relevance: 'DC用地需要、洪水・水の基準', exposure: '中', urgency: 'medium', urgencyLabel: '中', stance: '電力・水・200年確率の洪水設計を証明できる工業団地はプレミアムを得る。' },
        { sector: '金融（日系銀行・貸し手）', examples: '', relevance: '「新規」案件のプロジェクトファイナンスリスク、1MWあたり450万バーツの銀行保証', exposure: '中〜大', urgency: 'high', urgencyLabel: '中〜高', stance: '規制上の前提条件（ピッチングでの選定、CoP）を追加し、8〜12カ月以上の遅延リスクを価格に織り込む。' },
      ]
    },

    nextActions: {
      title: { en: 'Next Action Insights', ja: '次のアクション' },
      horizons: {
        en: [
          {
            label: 'Today',
            actions: [
              'Circulate the Nation article and the ThaiPublica summary of the 27 Oct resolution to your Thailand board. Flag that the policy is approved **in draft** and Cabinet is expected on 3 Nov.',
              'Data-centre owners: confirm the issue date of each Or.1 / Sec. 39 bis construction permit relative to **11 Aug 2026**, and current and planned MW of each site relative to the **20 MW expansion trigger**.',
              'Manufacturers in Chonburi/Rayong: ask your estate operator (Amata, WHA, IEAT) **in writing** for contracted versus available power and water headroom for 2027–2029.',
            ]
          },
          {
            label: 'This week',
            actions: [
              'Monitor the 3 Nov Cabinet resolution and any amendment to transition rules (sub-committee 1 has one month).',
              'Brief JCC/JETRO Bangkok on your position, especially on cost-reflective DC tariffs and fair queue rules for manufacturers.',
              'Suppliers: map your products against the Interior draft (fuel-room containment, 2-hour fire separation, 80% blowdown reuse, metering) and prepare Thai-language technical notes.',
            ]
          },
          {
            label: 'This month',
            actions: [
              'Submit comments before the committee\'s **27 Nov** review of the Interior building regulation, through DPT, FTI or JCC channels.',
              'Operators: build a **pitching dossier** — quantified Thai employment (BOI requires ≥50% Thai specialists and managers), a Thai supplier list with baht values, a university training MoU, SME/cloud access offers and green-power sourcing (Direct PPA).',
              'Lenders: add regulatory conditions precedent (DC-OSS registration, pitching award, CoP compliance) to term sheets for any Thai DC exposure.',
            ]
          },
          {
            label: 'This quarter',
            actions: [
              'Prepare for the first pitching window (December 2026–early 2027). Line up a **Japanese–Thai consortium** where Thai partners strengthen the "economic contribution" score.',
              'Commission site-level flood-resilience assessments against a 200-year rainfall reference, ahead of IEAT\'s standard.',
              'Model tariff scenarios — DC category 9 at 5–6 baht/kWh versus dilution — and the impact on your own Ft-exposed power bill; build them into FY2027 budgets.',
            ]
          }
        ],
        ja: [
          {
            label: '本日',
            actions: [
              'Nationの記事と、10月27日の決議に関するThaiPublicaの要約をタイ現地の取締役会に回覧する。政策は**草案段階**での承認であり、閣議は11月3日の予定であることを明記する。',
              'データセンター保有者：各拠点の建築許可（Or.1／第39条の2）の発行日を**2026年8月11日**と照合し、各拠点の現在および計画中のMWを**20MWの増設基準**と照合する。',
              'チョンブリ／ラヨーンの製造業：工業団地の運営者（アマタ、WHA、IEAT）に対し、2027〜2029年の契約済み容量と利用可能な電力・水の余力を**書面で**照会する。',
            ]
          },
          {
            label: '今週',
            actions: [
              '11月3日の閣議決定と、移行規則の修正の有無を注視する（第1小委員会の期限は1カ月）。',
              'JCC／JETROバンコク事務所に自社の立場を説明する。特に、コスト反映的なDC料金と、製造業にとって公平な接続待ち規則について。',
              'サプライヤー：自社製品を内務省草案（燃料室の漏洩防止、2時間耐火区画、ブローダウン水80%再利用、計量）と照合し、タイ語の技術資料を準備する。',
            ]
          },
          {
            label: '今月',
            actions: [
              '内務省建築規則に関する委員会の**11月27日**の審議前に、公共事業・都市農村計画局（DPT）、FTI、JCCのルートを通じて意見を提出する。',
              'オペレーター：**ピッチング用の提案書**を作成する——定量化したタイ人雇用（BOIは専門職・管理職の50%以上をタイ人とすることを要求）、バーツ建て金額付きのタイ企業サプライヤー一覧、大学との人材育成MoU、中小企業向けクラウドアクセスの提供、グリーン電力の調達（Direct PPA）。',
              '貸し手：タイのDC案件向けのタームシートに、規制上の前提条件（DC-OSS登録、ピッチングでの選定、CoP適合）を追加する。',
            ]
          },
          {
            label: '今四半期',
            actions: [
              '最初のピッチング受付期間（2026年12月〜2027年初頭）に備える。タイ側パートナーが「経済への貢献」の評価を高める**日タイ・コンソーシアム**を組成する。',
              'IEATの基準に先立ち、200年確率降雨を基準とした拠点ごとの洪水耐性評価を委託する。',
              '料金シナリオ——DC区分9が1kWhあたり5〜6バーツの場合と引き下げられた場合——と、Ftの影響を受ける自社の電気料金への影響をモデル化し、2027年度予算に織り込む。',
            ]
          }
        ]
      }
    },

    watchpoints: {
      headers: { en: ['Signal', 'If it happens', 'Implication'], ja: ['シグナル', '実現した場合', '含意'] },
      rows: {
        en: [
          ['Cabinet approves on 3 Nov without changes', '11 Aug cut-off becomes policy', 'Clear grandfathering; pitching path confirmed'],
          ['Pitching criteria publish a MW cap per round', 'Scarcity premium for awarded capacity', 'Secondary market in awarded projects; consortium value rises'],
          ['ERC finalises category 9 at ≥5 baht/kWh', 'Cost-reflective pricing', 'Manufacturers protected; DC investment shifts to Direct PPA'],
          ['PEA imposes 80–100% commitment on all large loads', 'Factory expansions face DC-style guarantees', 'Capex and timing risk for Japanese plants'],
          ['NBTC Type 3 licence or a DES bill sets foreign-ownership limits', 'Structural change', 'Japanese operators may need Thai partners or restructuring'],
          ['Another Rama 9-type incident or labour raid', 'Political pressure intensifies', 'Risk of a broader pause, including for grandfathered sites'],
          ['IEAT 200-year flood standard becomes mandatory', 'Higher estate capex', 'Advantage to elevated, newer estates; possible rent increases'],
          ['Malaysia lifts its non-AI freeze or Singapore runs DC-CFA3', 'Competing allocation', 'Less queue pressure in Thailand; Thai pitching becomes less selective'],
        ],
        ja: [
          ['11月3日に閣議が修正なしで承認', '8月11日の基準日が政策として確定', '既得権保護が明確になり、ピッチングの道筋が確定'],
          ['ピッチング基準でラウンドごとのMW上限が公表', '選定された容量に希少性プレミアム', '選定案件の流通市場が生まれ、コンソーシアムの価値が上昇'],
          ['ERCが区分9を1kWhあたり5バーツ以上で確定', 'コスト反映的な料金設定', '製造業は保護され、DC投資はDirect PPAへ移行'],
          ['PEAがすべての大口負荷に80〜100%の利用コミットメントを課す', '工場の増設がDC同様の保証金要求に直面', '日系工場の設備投資とスケジュールのリスク'],
          ['NBTCの第3種免許またはDESの法案が外資出資比率の上限を設定', '構造的な変化', '日系オペレーターはタイ側パートナーの確保や再編が必要になる可能性'],
          ['ラーマ9世通り型の事故や労働者の強制捜査が再発', '政治的圧力が強まる', '既得権保護の対象拠点を含む、より広範な停止のリスク'],
          ['IEATの200年確率の洪水基準が義務化', '工業団地の設備投資が増加', '高台にある新しい工業団地が有利に。賃料上昇の可能性'],
          ['マレーシアがAI以外の凍結を解除、またはシンガポールがDC-CFA3を実施', '配分をめぐる競争', 'タイの審査待ち圧力が低下し、タイのピッチングの選別性が下がる'],
        ]
      }
    },

    caveats: {
      title: { en: 'Source Notes & Caveats', ja: 'ソースノートと注意事項' },
      groups: {
        en: [
          { label: 'Verified from primary or near-primary documents', items: ['The Nation article (27 Oct 2026) exists and matches its headline.', 'The 27 Oct committee resolution (ThaiPublica reproduces the text): definition, 7 tiers, 4 dimensions, transition rules, pitching mechanism, 8–12-month timeline and the 11 Aug cut-off.', 'The PMO Regulation on the Data Center Business Policy Committee B.E. 2569: signed 11 Aug 2026; Gazette 13 Aug per Bangkokbiznews/Thansettakij (14 Aug per Matichon). The Royal Gazette was not checked directly.', 'BOI PR 67/2569 (6 May), BOI PR 178/2569 (7 Oct Japan forum), JETRO Business Short News (11 Sep).'] },
          { label: 'Secondary or press-reported only', items: ['IEAT and PEA figures (12 Oct, via Maverick Consulting Group citing Thansettakij/Bangkokbiznews).', 'NEPC tariff indications (5–6 baht is indicative, not a gazetted rate).', 'EGAT plans and ONWR water figures; JustPow Bangkok inventory.', 'The DES draft bill and NBTC licence change; JCC survey figures.'] },
          { label: 'Conflicting numbers, not reconciled', items: ['**Operating DCs:** 35 (4 Sep, 16 agencies) vs 63 (27 Oct, incl. small financial-institution sites) vs "about 50 in Bangkok" (Chadchart, 27 Oct). Reuters\' "42 data centres, 3,400 MW" is BOI-approved projects, not operating sites.', '**Size tiers:** 3 → 5 (1 Oct) → 7 (27 Oct). The Interior draft uses different 7-category bands.', '**Application opening:** "December 2026" (Thansettakij) vs "early 2027" (Reuters, Posttoday).', '**BOI totals:** 750bn baht for 42 projects (2024–26) is less than the 913bn baht approved for DCs on 6 May alone — do not add them up.', '**Grid guarantee:** "4.5m baht/MW" vs "45m baht per 100 MW" in the same article.'] },
          { label: 'Could not verify or not found', items: ['A separate "new dedicated agency" announced around 15 Aug — evidence points to the Committee itself and the planned DC-OSS.', 'BOI "88 AI/DC projects worth ~886bn baht in H1 2026".', 'Indonesia and Vietnam regimes.', 'Any numerical PUE/WUE, MW quota or foreign-ownership criterion in the pitching process.', 'Any Royal Gazette publication of the 27 Oct policy — none exists yet; it is a draft pending Cabinet.'] },
        ],
        ja: [
          { label: '一次資料またはそれに準ずる資料で確認済み', items: ['The Nationの記事（2026年10月27日）は実在し、見出しと内容が一致する。', '10月27日の委員会決議（ThaiPublicaが本文を転載）：定義、7区分、4分野、移行規則、ピッチングの仕組み、8〜12カ月のスケジュール、8月11日の基準日。', 'データセンター事業政策委員会に関する首相府規則（仏暦2569年）：2026年8月11日署名。官報掲載はBangkokbiznews／Thansettakijによれば8月13日（Matichonによれば14日）。官報そのものは直接確認していない。', 'BOI PR 67/2569（5月6日）、BOI PR 178/2569（10月7日の日本フォーラム）、JETROビジネス短信（9月11日）。'] },
          { label: '二次情報・報道のみ', items: ['IEATとPEAの数値（10月12日、Thansettakij／Bangkokbiznewsを引用したMaverick Consulting Group経由）。', 'NEPCの料金の目安（5〜6バーツは目安であり、官報で告示された料金ではない）。', 'EGATの計画とONWRの水に関する数値、JustPowのバンコク調査。', 'DESの法案草案とNBTCの免許変更、JCCの調査数値。'] },
          { label: '整合していない数値', items: ['**稼働中のDC：** 35施設（9月4日、16機関）、63施設（10月27日、金融機関の小規模施設を含む）、「バンコクに約50施設」（チャッチャート都知事、10月27日）。ロイターの「42データセンター、3,400MW」はBOI承認案件であり、稼働中の拠点ではない。', '**規模区分：** 3 → 5（10月1日）→ 7（10月27日）。内務省草案は別の7区分を用いている。', '**申請受付開始：** 「2026年12月」（Thansettakij）と「2027年初頭」（ロイター、Posttoday）。', '**BOIの合計額：** 42件で7,500億バーツ（2024〜26年）は、5月6日だけでDC向けに承認された9,130億バーツより少ない——合算しないこと。', '**送電網保証金：** 同じ記事内で「1MWあたり450万バーツ」と「100MWあたり4,500万バーツ」が混在。'] },
          { label: '確認できなかった、または見つからなかった事項', items: ['8月15日頃に発表されたとされる「新たな専門機関」——証拠は委員会そのものと計画中のDC-OSSを指している。', 'BOIの「2026年上期にAI／DC案件88件、約8,860億バーツ」。', 'インドネシアとベトナムの制度。', 'ピッチングにおけるPUE／WUEの数値基準、MW割当、外資出資比率の基準。', '10月27日の政策の官報掲載——まだ存在しない。閣議待ちの草案である。'] },
        ]
      },
      forwardLooking: {
        en: 'Forward-looking statements: application windows, Cabinet dates, tariff levels, EGAT/PEA investment timing and the IEAT flood standard are announced intentions, not enacted measures. WaLens estimates (21 TWh/yr, 28.5m m³/yr, 450m baht guarantee) are our own arithmetic on reported inputs.',
        ja: '将来に関する記述：申請受付期間、閣議日程、料金水準、EGAT／PEAの投資時期、IEATの洪水基準は、発表された意向であり、施行済みの措置ではない。WaLensの推計（年間21TWh、年間2,850万m³、保証金4億5,000万バーツ）は、報道された数値に基づく独自の計算である。'
      }
    },

    sources: [
      { label: 'ThaiPublica — Data centre committee approves minimum standards (4 dimensions, 7 tiers)', url: 'https://thaipublica.org/2026/10/ata-center-committee-approves-minimum-standards/' },
      { label: 'The Nation — Thailand plans competitive selection for new data centres', url: 'https://www.nationthailand.com/news/policy/40072802' },
      { label: 'Bangkokbiznews — Data centres defined as special buildings, 5 size tiers', url: 'https://www.bangkokbiznews.com/economics/1254556' },
      { label: 'Posttoday — Finance Ministry sends DC criteria to Cabinet; ~100 new applicants early 2027', url: 'https://www.posttoday.com/smart-city/751030' },
      { label: 'Bangkokbiznews — PMO Regulation establishing the DC policy board', url: 'https://www.bangkokbiznews.com/economics/1247360' },
      { label: 'BOI PR 67/2569 (6 May 2026)', url: 'https://www.boi.go.th/upload/content/PR67_2569EN.pdf' },
      { label: 'Thansettakij — DC board to Cabinet next week, 7 tiers by power use', url: 'https://www.thansettakij.com/economy/672380' },
      { label: 'Bangkokbiznews — 100 new projects sent to pitching', url: 'https://www.bangkokbiznews.com/economics/1258173' },
      { label: 'Gadget Review — One spill, 166 frozen projects', url: 'https://www.gadgetreview.com/one-spill-166-frozen-projects-inside-thailands-emergency-data-center-reset' },
      { label: 'JETRO — BMA suspends DC construction permits (JP)', url: 'https://www.jetro.go.jp/biznews/2026/09/30dae75b0a81de0e.html' },
      { label: 'The Nation — Thailand pauses 166 data centre projects', url: 'https://www.nationthailand.com/business/tech/40070670' },
      { label: 'Balance Mag — BOI responds to new DC regulation', url: 'https://www.balancemag.net/97058' },
      { label: 'Reuters (via 93.3 The Drive) — Thailand sets new rules for data centres', url: 'https://www.933thedrive.com/2026/10/27/thailand-sets-new-rules-for-data-centres-as-applications-surge/' },
      { label: 'Maverick Consulting Group — Can power, water and the grid keep up?', url: 'https://www.mcg-asia.com/featured-insights/thailand-data-centre-power-water-grid-2026' },
      { label: 'Kaohoon — NEPC opens Direct PPA', url: 'https://www.kaohoon.com/news/847139' },
      { label: 'Thansettakij — Tariff reform: separating data centres', url: 'https://www.thansettakij.com/economy/energy/663958' },
      { label: 'Bangkokbiznews — 4 criteria and bank guarantee for DCs', url: 'https://www.bangkokbiznews.com/economics/1244847' },
      { label: 'The Nation — 80% cooling-tower wastewater reuse rule review on 27 Nov', url: 'https://www.nationthailand.com/news/policy/40072717' },
      { label: 'Isranews — NEPC unlocks Direct PPA for data centres', url: 'https://www.isranews.org/article/isranews-news/147942-NEPC-Approves-THB-3-Electricity-Rate-for-First-200-Units-news.html' },
      { label: 'Thai PBS — NEPC tariff decisions', url: 'https://www.thaipbs.or.th/news/content/508312' },
      { label: 'Prachachat — Powers of the 19-member DC board', url: 'https://www.prachachat.net/politics/news-2047859' },
      { label: 'DCD — Raid at Rayong data centre site', url: 'https://www.datacenterdynamics.com/en/news/raid-by-authorities-sees-illegal-migrant-workers-arrested-at-under-construction-data-center-site-in-rayong-thailand/' },
      { label: 'Baxtel — Project Kestrel data center news', url: 'https://baxtel.com/news/data-centers/google-project-kestrel-cf5e7abb-de81-4e0d-b96a-54032435382d?page=11' },
      { label: 'Bangkok Post — 24 illegal workers arrested at Chinese DC project', url: 'https://www.bangkokpost.com/thailand/general/3300500/24-illegal-workers-arrested-at-chinese-data-centre-project-in-rayong' },
      { label: 'ASEAN NOW — Rayong raid nets 24 illegal workers', url: 'https://aseannow.com/thailand-news/rayong-raid-nets-24-illegal-workers-at-chinese-data-centre-r3250' },
      { label: 'Matichon — Royal Gazette publishes DC board', url: 'https://www.matichon.co.th/politics/news_5846030' },
      { label: 'Thansettakij — Royal Gazette publishes DC board', url: 'https://www.thansettakij.com/general-news/666399' },
      { label: 'Thaiger — Rayong raid nets 18 Chinese workers', url: 'https://thethaiger.com/hot-news/crime/rayong-data-centre-raid-chinese-workers' },
      { label: 'ASEAN NOW — Rayong police arrest 18 Chinese workers', url: 'https://aseannow.com/thailand-news/rayong-police-arrest-18-chinese-workers-at-data-centre-r3379' },
      { label: 'NationTV — Unauthorised DCs in Bangkok', url: 'https://www.nationtv.tv/business/economy/378982615' },
      { label: 'The Nation — Oil-contaminated waste at Rama 9 data centre', url: 'https://www.nationthailand.com/news/general/40070721' },
      { label: 'Jiji — BMA suspends new DC permits (JP)', url: 'https://www.jiji.com/jc/article?k=2026090400491&g=jnb' },
      { label: 'Asia News Network — Bangkok\'s 34 data centres', url: 'https://asianews.network/bangkoks-34-data-centres-raise-concerns-over-resource-use-and-safety/' },
      { label: 'The Nation — Bangkok\'s 34 data centres', url: 'https://www.nationthailand.com/business/economy/40070626' },
      { label: 'Pectec — Draft DC licence asks for PPA matched to IT load', url: 'https://pectecth.com/news/thailand-nbtc-licence-ppa-matched-it-load-backup-power-2026' },
      { label: 'Green Design Consulting — DC boom hits regulatory reality check', url: 'https://www.greendesignconsulting.com/single-post/thailand-s-data-centre-boom-hits-a-regulatory-reality-check' },
      { label: 'Thai PBS World — PCD clears oily wastewater at Rama 9', url: 'https://www.thaipbsworld.com/news/pcd-clears-oily-wastewater-at-rama-9-data-centre' },
      { label: 'The Nation — Zero VOC readings after spill clean-up', url: 'https://www.nationthailand.com/news/general/40070801' },
      { label: 'Thansettakij — DC rules targeted for mid-October', url: 'https://www.thansettakij.com/economy/669350' },
      { label: 'The Nation — Mid-October rules with 100 MW hyperscale threshold', url: 'https://www.nationthailand.com/business/economy/40071260' },
      { label: 'Thai Government — PM meeting', url: 'https://www.thaigov.go.th/th/news/169205' },
      { label: 'Asia News Network — Separate legal definition of DC buildings', url: 'https://asianews.network/thailand-approves-separate-legal-definition-of-data-centre-buildings/' },
      { label: 'The Nation — Separate legal definition of DC buildings', url: 'https://www.nationthailand.com/news/policy/40071762' },
      { label: 'The Nation — Floods inundate Thai factories', url: 'https://www.nationthailand.com/business/economy/40071775' },
      { label: 'Asia News Network — Thailand–Japan $11.7bn industrial alliance', url: 'https://asianews.network/thailand-and-japan-cement-11-7-billion-industrial-alliance-in-high-tech-shift/' },
      { label: 'The Nation — Ekniti pitches BOI-to-IPO listing to Japan', url: 'https://www.nationthailand.com/business/investment/40071987' },
      { label: 'Thai Post — DC board sets 4-dimension criteria', url: 'https://www.thaipost.net/economy-news/1096446/' },
      { label: 'Mitihoon — DCs divided into 7 tiers', url: 'https://www.mitihoon.com/2026/10/27/689527/' },
      { label: 'Thansettakij — Tariff restructuring for the AI/DC era', url: 'https://www.thansettakij.com/economy/energy/663995' },
      { label: 'Thansettakij — ERC to set DC tariff rules', url: 'https://www.thansettakij.com/economy/energy/668922' },
      { label: 'Thansettakij — Direct PPA 2,000 MW', url: 'https://www.thansettakij.com/sustainable/net-zero/661155' },
      { label: 'Bangkokbiznews — Experts on DC influx and energy', url: 'https://www.bangkokbiznews.com/economics/1257110' },
      { label: 'ASEAN NOW — DC boom could flood villages and forests', url: 'https://aseannow.com/thailand-news/thailands-data-centre-boom-could-flood-villages-and-forests-r4481' },
      { label: 'Telecom Review Asia — USD 3.1B new investments', url: 'https://www.telecomreviewasia.com/news/industry-news/26926-thailand-approves-usd-3-1b-in-new-investments-with-major-data-center-push/' },
      { label: 'MGR Online — 26 DC licensees in 2026', url: 'https://mgronline.com/cyberbiz/detail/9690000087462' },
      { label: 'Light Reading — Thailand approves $3.1B DC investments', url: 'https://www.lightreading.com/data-centers/thailand-strengthens-digital-hub-status-with-3-1b-data-center-investments' },
      { label: 'BOI — Event detail', url: 'https://www.boi.go.th/un/boi_event_detail?module=news&topic_id=138444&language=en' },
      { label: 'DCD — Oil leak from Bangkok data center', url: 'https://www.datacenterdynamics.com/en/news/oil-leak-from-data-center-contaminates-water-in-bangkok-thailand/' },
      { label: 'W.Media — Thailand approves 7 new data centers', url: 'https://w.media/thailand-approves-7-new-data-centers-valued-at-us-3-1-billion/' },
      { label: 'Money & Banking — BOI first 2026 meeting', url: 'https://en.moneyandbanking.co.th/2026/219949/' },
      { label: 'Tech Trends Asia — Southeast Asia started saying no to data centers', url: 'https://techtrendsasia.substack.com/p/southeast-asia-started-saying-no' },
      { label: 'Johor data-centre water and power, 2026', url: 'https://abhishekkushwaha.com.np/blog/johor-data-center-water-power-2026' },
      { label: 'ArusGrid — Malaysia data center rules', url: 'https://arusgrid.com/policy/malaysia' },
      { label: 'DC Market Insights — Malaysia data center policy', url: 'https://www.dcmarketinsights.com/data/power-policy/malaysia' },
      { label: 'Asia Daily — Johor tightens DC approvals', url: 'https://asiadaily.org/news/10940/' },
      { label: 'ThaiPR — AMATA 800 roadmap', url: 'https://www.thaipr.net/en/manufacturing_en/3768881' },
      { label: 'BOI PR 178/2569 (7 Oct 2026)', url: 'https://www.boi.go.th/upload/content/PR178_2569EN.pdf' },
    ]
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: isJapanese ? shortTitleJa : shortTitleEn,
    alternativeHeadline: isJapanese ? titleJa : titleEn,
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

  const renderTable = (headers: string[], rows: string[][], firstColClass = 'font-medium') => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
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

  const bulletIcon = <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />;

  return (
    <>
      <SEO
        title={isJapanese ? shortTitleJa + ' | WaLens' : shortTitleEn + ' | WaLens'}
        description={isJapanese ? metaDescJa : metaDescEn}
        canonicalPath={canonicalPath}
      />
      <Helmet>
        <html lang={isJapanese ? 'ja' : 'en'} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={isJapanese ? shortTitleJa : shortTitleEn} />
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
        <meta name="twitter:title" content={isJapanese ? shortTitleJa : shortTitleEn} />
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
        <section className="relative w-full h-[340px] md:h-[420px] flex items-end overflow-hidden">
          <img src={heroImage} alt="Data centre cooling fans and pipework — Thailand data centre competitive pitching analysis for Japanese executives" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
          <p className="absolute bottom-1.5 right-3 z-20 text-[10px] text-gray-400">Photo: Winston Chen / Unsplash</p>
          <div className="relative z-20 container mx-auto px-4 pb-10">
            <Badge variant="outline" className="mb-3 bg-blue-500/20 text-blue-200 border-blue-500/30">
              <Sparkles className="h-3 w-3 mr-1" />
              {content.category[L]}
            </Badge>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight max-w-4xl" style={cellStyle}>
              {content.headline[L]}
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-3xl" style={cellStyle}>
              {content.subheadline[L]}
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
            { label: isJapanese ? 'データセンター競争選抜2026' : 'Data Centre Pitching 2026' }
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
                    <ChevronRight className="h-3 w-3 ml-auto text-muted-foreground" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lead */}
          <p className="text-base leading-relaxed text-muted-foreground mb-10 max-w-4xl" style={cellStyle}>
            {content.lead[L]}
          </p>

          {/* 01 Executive Summary */}
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
                <p className="text-sm leading-relaxed text-muted-foreground" style={cellStyle}>{content.executiveBrief[L]}</p>
              </CardContent>
            </Card>
          </section>

          {/* 02 Policy Overview */}
          <section id="overview" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Database className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{isJapanese ? '政策概要：「競争選抜」の実像' : 'Policy Overview: What Competitive Selection Actually Is'}</h2>
                <p className="text-sm text-muted-foreground">{isJapanese ? '仕組み・基準・主要数値' : 'Mechanism, criteria and key numbers'}</p>
              </div>
            </div>

            <Card className="mb-6 border-l-4 border-l-blue-500/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-500" />
                  {content.overview.verified.title[L]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderList(content.overview.verified.items[L], bulletIcon)}
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span style={cellStyle}>{content.overview.mechanism.title[L]}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderTable(content.overview.mechanism.headers[L], content.overview.mechanism.rows[L])}
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                  <span style={cellStyle}>{content.overview.criteria.title[L]}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {content.overview.criteria.groups[L].map((group, idx) => (
                    <div key={idx}>
                      <h3 className="text-sm font-semibold mb-3" style={cellStyle}>{group.label}</h3>
                      {renderList(group.items, bulletIcon)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6 border-l-4 border-l-blue-500/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  {content.overview.boi.title[L]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground" style={cellStyle}>{renderBold(content.overview.boi[L])}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  {content.overview.keyNumbers.title[L]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderTable(content.overview.keyNumbers.headers[L], content.overview.keyNumbers.rows[L])}
              </CardContent>
            </Card>
          </section>

          {/* 03 Timeline */}
          <section id="timeline" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Clock className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{isJapanese ? 'タイムライン' : 'Timeline'}</h2>
                <p className="text-sm text-muted-foreground" style={cellStyle}>{content.timeline.title[L]}</p>
              </div>
            </div>
            <Card className="mb-6">
              <CardContent className="pt-6">
                {renderTable(content.timeline.headers[L], content.timeline.rows[L], 'font-semibold text-primary whitespace-nowrap')}
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-purple-500/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-purple-500" />
                  {content.timeline.howItHappened.title[L]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderList(content.timeline.howItHappened.items[L], bulletIcon)}
              </CardContent>
            </Card>
          </section>

          {/* 04 Key Intelligence Signals */}
          <section id="signals" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{isJapanese ? '主要インテリジェンス・シグナル' : 'Key Intelligence Signals'}</h2>
                <p className="text-sm text-muted-foreground">{isJapanese ? '現状とエスカレーションの引き金' : 'Current readings and escalation triggers'}</p>
              </div>
            </div>
            <Card className="border-l-4 border-l-emerald-500">
              <CardContent className="pt-6">
                {renderTable(content.signals.headers[L], content.signals.rows[L])}
              </CardContent>
            </Card>
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
                      ? '電力・水・送電網の定量分析、競争・戦略的ダイナミクス、セクター別判断ガイド、次のアクション、戦略的注視点を含む完全版レポートにアクセスするにはプレミアムプランが必要です。'
                      : 'The full power, water and grid analysis, competitive dynamics, sector decision guide, next action insights and strategic watchpoints require a premium subscription.'
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
            <div className="premium-content">
              {/* 05 Power, Water, Grid & Fiscal Analysis */}
              <section id="analysis" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Lightbulb className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{isJapanese ? '電力・水・送電網・財政分析' : 'Power, Water, Grid & Fiscal Analysis'}</h2>
                  </div>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Factory className="h-5 w-5 text-purple-500" />
                      <span style={cellStyle}>{content.analysis.power.title[L]}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm leading-relaxed text-muted-foreground" style={cellStyle}>{renderBold(content.analysis.power.intro[L])}</p>
                    {renderTable(content.analysis.power.headers[L], content.analysis.power.rows[L])}
                    {renderList(content.analysis.power.items[L], bulletIcon)}
                  </CardContent>
                </Card>

                <Card className="mb-6 border-l-4 border-l-purple-500/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Eye className="h-4 w-4 text-purple-500" />
                      {content.analysis.tariff.title[L]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderList(content.analysis.tariff.items[L], bulletIcon)}
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Database className="h-5 w-5 text-purple-500" />
                      <span style={cellStyle}>{content.analysis.water.title[L]}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderTable(content.analysis.water.headers[L], content.analysis.water.rows[L])}
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span style={cellStyle}>{content.analysis.costImplications.title[L]}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3">
                      {content.analysis.costImplications.items[L].map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-sm">
                          <span className="text-primary font-mono text-xs mt-0.5 w-4 flex-shrink-0">{idx + 1}.</span>
                          <span className="text-muted-foreground leading-relaxed" style={cellStyle}>{renderBold(item)}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </section>

              {/* 06 Competitive & Strategic Dynamics */}
              <section id="competitive" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Shield className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{isJapanese ? '競争・戦略的ダイナミクス' : 'Competitive & Strategic Dynamics'}</h2>
                  </div>
                </div>

                <Card className="mb-6 border-l-4 border-l-blue-500/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-500" />
                      {content.competitive.pipeline.title[L]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderList(content.competitive.pipeline.items[L], bulletIcon)}
                  </CardContent>
                </Card>

                <Card className="mb-6 bg-muted/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      {content.competitive.whoBenefits.title[L]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground" style={cellStyle}>{renderBold(content.competitive.whoBenefits[L])}</p>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      {content.competitive.regional.title[L]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderTable(content.competitive.regional.headers[L], content.competitive.regional.rows[L], 'font-semibold')}
                    <p className="text-sm text-muted-foreground mt-4" style={cellStyle}>{content.competitive.regional.note[L]}</p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-l-4 border-l-emerald-500/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-emerald-500" />
                        <span style={cellStyle}>{content.competitive.suppliers.title[L]}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderList(content.competitive.suppliers.items[L], bulletIcon)}
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-amber-500/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <span style={cellStyle}>{content.competitive.floods.title[L]}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderList(content.competitive.floods.items[L], <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />)}
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* 07 Sector Decision Guide */}
              <section id="sector-guide" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <Crown className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{isJapanese ? 'セクター別判断ガイド' : 'Sector Decision Guide'}</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.sectorGuide[L].map((s, idx) => (
                    <Card key={idx} className="border-l-4 border-l-amber-500/50">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <CardTitle className="text-base" style={cellStyle}>{s.sector}</CardTitle>
                            {s.examples && (
                              <p className="text-xs text-muted-foreground mt-1" style={cellStyle}>{s.examples}</p>
                            )}
                          </div>
                          <Badge variant={urgencyVariant(s.urgency)} className="flex-shrink-0 whitespace-nowrap">
                            {s.urgencyLabel}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p style={cellStyle}>
                          <span className="font-semibold">{isJapanese ? '関連性：' : 'Relevance: '}</span>
                          <span className="text-muted-foreground">{s.relevance}</span>
                        </p>
                        <p style={cellStyle}>
                          <span className="font-semibold">{isJapanese ? 'エクスポージャー：' : 'Exposure: '}</span>
                          <span className="text-muted-foreground">{s.exposure}</span>
                        </p>
                        <p style={cellStyle}>
                          <span className="font-semibold">{isJapanese ? '推奨スタンス：' : 'Recommended stance: '}</span>
                          <span className="text-muted-foreground">{s.stance}</span>
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* 08 Next Action Insights */}
              <section id="next-actions" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <TrendingUp className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{content.nextActions.title[L]}</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.nextActions.horizons[L].map((horizon, idx) => (
                    <Card key={idx} className="border-t-4 border-t-primary">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base" style={cellStyle}>{horizon.label}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-3">
                          {horizon.actions.map((action, aIdx) => (
                            <li key={aIdx} className="flex gap-2 text-sm">
                              <span className="text-primary font-mono text-xs mt-0.5 w-4 flex-shrink-0">{aIdx + 1}.</span>
                              <span className="text-muted-foreground leading-relaxed" style={cellStyle}>{renderBold(action)}</span>
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* 09 Strategic Watchpoints */}
              <section id="watchpoints" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <Eye className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{isJapanese ? '戦略的注視点' : 'Strategic Watchpoints'}</h2>
                  </div>
                </div>
                <Card className="border-l-4 border-l-red-500/50">
                  <CardContent className="pt-6">
                    {renderTable(content.watchpoints.headers[L], content.watchpoints.rows[L])}
                  </CardContent>
                </Card>
              </section>

              {/* 10 Sources */}
              <section id="sources" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gray-500/10">
                    <BookOpen className="h-6 w-6 text-gray-500" />
                  </div>
                  <h2 className="text-2xl font-bold">{isJapanese ? 'ソースノートと出典' : 'Source Notes & Sources'}</h2>
                </div>
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{content.caveats.title[L]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {content.caveats.groups[L].map((group, idx) => (
                        <div key={idx}>
                          <h3 className="text-sm font-semibold mb-3" style={cellStyle}>{group.label}</h3>
                          {renderList(group.items, bulletIcon)}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-6" style={cellStyle}>{content.caveats.forwardLooking[L]}</p>
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

export default ThailandDataCentrePitching2026;
