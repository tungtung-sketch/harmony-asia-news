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
import heroImage from '@/assets/hero-thai-gov-policy.jpg';

// JP translation drafted by Claude — Mon to review before marketing push

const ThailandFlood2026 = () => {
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

  const slug = 'thailand-flood-2026';
  const titleEn = "Thailand's 2026 Floods Cost Under 0.2% of GDP but Stopped Toyota for Two Weeks: Strategic Implications for Japanese Executives";
  const titleJa = 'タイ2026年洪水：GDP損失は0.2%未満、しかしトヨタは2週間停止 ― 在タイ日系企業への戦略的示唆';
  const shortTitleEn = "Thailand's 2026 Floods: Strategic Implications for Japanese Executives";
  const shortTitleJa = 'タイ2026年洪水：在タイ日系企業への戦略的示唆';
  const publishedDate = '2026-10-15';
  const canonicalPath = '/insights/economic-policy/thailand-flood-2026';
  const canonicalUrl = `https://walensnews.com${canonicalPath}`;

  const metaDescEn = "Losses of THB 12–34 billion (≈0.03–0.25% of GDP), but one breached embankment at Amata City Chonburi stopped Toyota's three Thai plants.";
  const metaDescJa = '損失は120億〜340億バーツ（GDP比約0.03〜0.25%）。だがアマタシティ・チョンブリの堤防1カ所の決壊がトヨタのタイ3工場を停止させた。2027年雨季までに日系企業が手を打つべきことを解説。';

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
  const cellStyle = { wordBreak: 'keep-all' as const, overflowWrap: 'anywhere' as const };

  const tocSections = [
    { id: 'executive-summary', label: isJapanese ? 'エグゼクティブサマリー' : 'Executive Summary' },
    { id: 'situation', label: isJapanese ? '洪水の状況とメカニズム' : 'Flood Situation & Mechanism' },
    { id: 'signals', label: isJapanese ? '注視すべき主要シグナル' : 'Key Intelligence Signals' },
    { id: 'macro-analysis', label: isJapanese ? 'マクロ経済・財政分析' : 'Macro & Fiscal Analysis' },
    { id: 'industrial', label: isJapanese ? '工業団地・サプライチェーンへの影響' : 'Industrial & Supply Chain Exposure' },
    { id: 'competitive', label: isJapanese ? '競争・戦略面の変化' : 'Competitive & Strategic Dynamics' },
    { id: 'sector-guide', label: isJapanese ? 'セクター別判断ガイド' : 'Sector Decision Guide' },
    { id: 'next-actions', label: isJapanese ? '次のアクション' : 'Next Action Insights' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: { en: titleEn, ja: titleJa },
    subheadline: {
      en: "Credible estimates put losses at THB 12–34 billion (≈0.03–0.25% of GDP), about 1–2% of 2011. The real damage came from one breached embankment at Amata City Chonburi, which halted 34 factories and stopped Toyota's three Thai plants — a free stress test of just-in-time supply chains.",
      ja: '信頼できる推計では損失は120億〜340億バーツ（GDP比約0.03〜0.25%）、2011年の約1〜2%にとどまる。真の打撃はアマタシティ・チョンブリ工業団地で決壊した堤防1カ所から生じた。34工場が停止し、トヨタのタイ3工場が止まった——ジャスト・イン・タイム型サプライチェーンに対する「無償のストレステスト」である。'
    },
    lead: {
      en: "The September–October 2026 floods are a macro footnote but a supply-chain warning. Credible estimates put economic losses at THB 12–34 billion, roughly 0.03–0.25% of GDP, far below the THB 1.43 trillion of 2011 (Ministry of Finance–World Bank assessment). The real damage to Japanese business came from one breached embankment at Amata City Chonburi, which halted 34 factories and stopped Toyota Motor Thailand's three assembly plants. Executives should treat 2026 as a free stress test of their just-in-time supply chains and fix single-source exposure in the East before the 2027 monsoon.",
      ja: '2026年9〜10月の洪水は、マクロ経済上は脚注程度だが、サプライチェーンにとっては警告である。信頼できる推計では経済損失は120億〜340億バーツ、GDP比約0.03〜0.25%で、2011年の1.43兆バーツ（財務省・世界銀行の評価）を大きく下回る。日系企業への真の打撃は、アマタシティ・チョンブリで決壊した堤防1カ所から生じた。これにより34工場が停止し、トヨタ・モーター・タイランドの組立3工場が止まった。経営層は2026年をジャスト・イン・タイム型サプライチェーンの「無償のストレステスト」と捉え、2027年の雨季までに東部の単一調達先リスクを是正すべきである。'
    },
    category: { en: 'Economic Policy / Supply Chain / Disaster Risk', ja: '経済政策 / サプライチェーン / 災害リスク' },
    lastUpdated: publishedDate,

    executiveSummary: {
      en: [
        "**Scale: national in reach, short in duration.** DDPM counted **3.26 million** people in about **1.2 million** households across **27 provinces and Bangkok** at the peak (October 4); **31 deaths** since mid-September. As of October 14, **2.44 million** people in 20 provinces and Bangkok were still affected. Chao Phraya Dam discharge peaked at **2,500 m³/s** (vs 3,721 m³/s in 2011) and has fallen to **1,900 m³/s**. Bangkok's inner flood defences were never breached.",
        "**Damage: a fraction of a point of GDP.** Estimates range from **THB 7–17 billion** (Kasikorn Research, Sep 28) and **THB 12.3 billion** for Sep 25–29 (UTCC) to **THB 22–30 billion** (UTCC revised, Oct 8) and **THB 16.9–33.8 billion** (Rangsit University). BOT: **−0.03–0.1%** of GDP; Ministry of Finance: **below 0.1%**; SCB EIC: **−0.05–0.1 pt** base case, **−0.15–0.25 pt** only if inner Bangkok floods. Full-year 2026 growth forecasts of **2.0–2.5%** are largely intact.",
        "**Exposure: concentrated in the East and the auto supply chain, not the 2011 estates.** At Amata City Chonburi water stood **30–70 cm** after an earth embankment collapsed: **~150 factories** affected, **34 halted**, including **10+ auto-parts suppliers**. Toyota stopped Samrong, Gateway and Ban Pho (**~30,000 units** affected), with phased restarts planned **Oct 14–19**. FTI puts industrial damage at **THB 6–7 billion** across 2,000+ member firms; agriculture lost **1.66–1.77 million rai**, mostly rice."
      ],
      ja: [
        '**規模：影響は全国規模、期間は短期。** 防災局（DDPM）によれば、ピーク時（10月4日）には**27県とバンコク**で約**120万世帯・326万人**が被災し、9月中旬以降の死者は**31人**。10月14日時点でも20県とバンコクで**244万人**が影響を受けている。チャオプラヤー・ダムの放流量は**2,500 m³/s**でピークを付け（2011年は3,721 m³/s）、現在は**1,900 m³/s**まで低下した。バンコク中心部の洪水防御線は一度も破られていない。',
        '**損害：GDPの1ポイントにも満たない。** 推計は**70億〜170億バーツ**（カシコン・リサーチ、9月28日）、9月25〜29日分で**123億バーツ**（タイ商工会議所大学〈UTCC〉）から、**220億〜300億バーツ**（UTCC改定、10月8日）、**169億〜338億バーツ**（ランシット大学）まで幅がある。タイ中央銀行（BOT）：GDP比**−0.03〜0.1%**、財務省：**0.1%未満**、SCB EIC：基本ケース**−0.05〜0.1ポイント**、バンコク中心部が浸水した場合に限り**−0.15〜0.25ポイント**。2026年通年の成長率予測**2.0〜2.5%**はおおむね維持されている。',
        '**エクスポージャー：2011年の工業団地ではなく、東部と自動車サプライチェーンに集中。** アマタシティ・チョンブリでは土堤の崩壊後に水位が**30〜70cm**に達し、**約150工場**が影響を受け、**10社超の自動車部品サプライヤー**を含む**34工場が停止**した。トヨタはサムロン、ゲートウェイ、バンポーの3工場を停止（影響**約3万台**）し、**10月14〜19日**の段階的再開を計画している。タイ工業連盟（FTI）は会員2,000社超の工業被害を**60億〜70億バーツ**と見積もり、農業被害は**166万〜177万ライ**（大半がコメ）に及ぶ。'
      ]
    },

    situation: {
      bottomLine: {
        en: "**Bottom line: this was a rain-driven urban and eastern flood, not a 2011-style northern runoff.** In 2011 northern water moved slowly through the central plains for months. In 2026 a stalled low-pressure system dumped intense rain over Bangkok and the eastern seaboard, compounded by a moderate northern surge down the Chao Phraya. This explains both the fast recovery and why the East, not Ayutthaya, took the industrial hit.",
        ja: '**結論：今回は2011年型の北部流出水ではなく、降雨主導の都市型・東部型洪水である。** 2011年は北部の水が数カ月かけて中部平野をゆっくり下った。2026年は停滞した低気圧がバンコクと東部臨海地域に集中豪雨をもたらし、そこにチャオプラヤー川を下る中程度の北部増水が重なった。これが早期回復の理由であり、工業被害がアユタヤではなく東部に集中した理由でもある。'
      },
      timeline: {
        title: { en: 'Timeline', ja: 'タイムライン' },
        headers: { en: ['Date (2026)', 'Event', 'Source'], ja: ['日付（2026年）', '出来事', '出典'] },
        rows: {
          en: [
            ['Aug 18–21', 'Flash floods in 9 northern/northeastern provinces (Phayao, Nan, Mae Hong Son, Sukhothai, Phitsanulok, Phetchabun, Sakon Nakhon, Nakhon Phanom, Ubon Ratchathani)', 'ADRC / IFRC'],
            ['Aug 25', 'Cabinet approves THB 558.7 million: THB 9,000 per household for 60,971 households in 41 provinces; THB 2 million per death', 'PRD / Thai PBS'],
            ['Sep 1–25', 'Bangkok rainfall 487 mm, 181% of normal (~269 mm). Pattaya 171.4 mm on Sep 23 alone', 'BMA data via vasteelab'],
            ['Sep 24–27', '~300 mm over parts of Bangkok in 48 hours; Rangsit University counts 48 provinces affected', 'Weathernews; Rangsit University'],
            ['Sep 26', 'BMA declares all 50 Bangkok districts disaster zones', 'Thai media'],
            ['Sep 27', 'GISTDA satellite imagery: 1.63 million rai (~2,610 km²) under water in 29 provinces', 'GISTDA via Weathernews'],
            ['Sep 29', 'DDPM: 29 provinces + Bangkok, 2.6 million people, 23 dead', 'DDPM via Thansettakij'],
            ['Sep 30', 'Toyota halts production (staff cannot commute, then suppliers cannot deliver)', 'Bangkokbiznews'],
            ['Oct 1', 'RID raises Chao Phraya Dam discharge to 2,500 m³/s (2026 peak)', 'Thai PBS; Topnews / HII'],
            ['Oct 4', 'DDPM peak: 3.26 million people, ~1.2 million households, 27 provinces + Bangkok (Bangkok 329,000 households; Pathum Thani 169,724; Ayutthaya 53,457)', 'DDPM'],
            ['Oct 5', 'Death toll reaches 31', 'AP'],
            ['Oct 7–12', 'Chao Phraya Dam stepped down 2,400 → 2,200 → 1,900 m³/s', 'Thai PBS'],
            ['Oct 11', 'DDPM: 3.14 million people, 1,126,853 households, 21 provinces + Bangkok', 'Nation Thailand'],
            ['Oct 13–14', 'DDPM: 20 provinces + Bangkok, 99 districts, 804 subdistricts; 2.44 million still affected', 'Thansettakij; Khaosod English'],
          ],
          ja: [
            ['8月18〜21日', '北部・東北部9県で鉄砲水（パヤオ、ナーン、メーホンソン、スコータイ、ピサヌローク、ペッチャブーン、サコンナコン、ナコンパノム、ウボンラーチャターニー）', 'ADRC / IFRC'],
            ['8月25日', '閣議で5億5,870万バーツを承認：41県・60,971世帯に1世帯あたり9,000バーツ、死者1人あたり200万バーツ', 'PRD / Thai PBS'],
            ['9月1〜25日', 'バンコクの降水量487mm、平年（約269mm）の181%。パタヤでは9月23日の1日だけで171.4mm', 'BMAデータ（vasteelab経由）'],
            ['9月24〜27日', 'バンコクの一部で48時間に約300mm。ランシット大学は被災48県と集計', 'Weathernews；ランシット大学'],
            ['9月26日', 'バンコク都（BMA）が全50区を災害区域に指定', 'タイ各紙'],
            ['9月27日', 'GISTDA衛星画像：29県で163万ライ（約2,610 km²）が浸水', 'GISTDA（Weathernews経由）'],
            ['9月29日', 'DDPM：29県＋バンコク、260万人、死者23人', 'DDPM（Thansettakij経由）'],
            ['9月30日', 'トヨタが生産停止（従業員が通勤できず、その後サプライヤーが納入できず）', 'Bangkokbiznews'],
            ['10月1日', '王室灌漑局（RID）がチャオプラヤー・ダムの放流量を2,500 m³/sに引き上げ（2026年のピーク）', 'Thai PBS；Topnews / HII'],
            ['10月4日', 'DDPMピーク：326万人、約120万世帯、27県＋バンコク（バンコク329,000世帯、パトゥムターニー169,724、アユタヤ53,457）', 'DDPM'],
            ['10月5日', '死者が31人に', 'AP'],
            ['10月7〜12日', 'チャオプラヤー・ダムの放流量を2,400 → 2,200 → 1,900 m³/sへ段階的に削減', 'Thai PBS'],
            ['10月11日', 'DDPM：314万人、1,126,853世帯、21県＋バンコク', 'Nation Thailand'],
            ['10月13〜14日', 'DDPM：20県＋バンコク、99郡、804行政区。なお244万人が被災', 'Thansettakij；Khaosod English'],
          ]
        }
      },
      hydrology: {
        title: { en: 'Hydrology and reservoir status (ONWR, October 14)', ja: '水文・貯水池の状況（国家水資源局〈ONWR〉、10月14日）' },
        items: {
          en: [
            '**Chao Phraya Dam (C.13, Chai Nat):** 1,900 m³/s; +15.96 m MSL upstream, +14.36 m downstream. Rama VI Dam (Pa Sak) releasing 492 m³/s.',
            '**Station C.2 (Nakhon Sawan):** 1,766 m³/s, down from 2,610 m³/s on Oct 1; water 3.62 m below bank.',
            '**Bangkok:** average 2,382 m³/s at Rama VIII Bridge in early October, well below the 3,600 m³/s defence threshold (Bangkok Post).',
            '**National storage:** 82% of capacity (66,270 million m³), 74% usable. West 96%, East 87%, North 76%.',
            '**EEC reservoirs:** Nong Pla Lai **106%** (174 million m³, above design capacity since early October); Prasae 90%; Bang Phra 85%.',
            "Data gap: dam-specific storage for Bhumibol, Sirikit and Pasak Jolasid not obtained — check RID's daily bulletin.",
          ],
          ja: [
            '**チャオプラヤー・ダム（C.13、チャイナート）：** 1,900 m³/s。上流側 +15.96 m MSL、下流側 +14.36 m。ラーマ6世ダム（パーサック川）は492 m³/sを放流。',
            '**C.2観測所（ナコンサワン）：** 1,766 m³/s（10月1日の2,610 m³/sから低下）。水位は堤防天端より3.62m下。',
            '**バンコク：** 10月上旬のラーマ8世橋地点の平均流量は2,382 m³/sで、防御限界の3,600 m³/sを大きく下回る（Bangkok Post）。',
            '**全国の貯水量：** 容量の82%（662億7,000万m³）、有効貯水率74%。西部96%、東部87%、北部76%。',
            '**東部経済回廊（EEC）の貯水池：** ノンプラライ **106%**（1億7,400万m³、10月上旬から設計容量超過）、プラセー90%、バンプラ85%。',
            'データの欠落：プミポン、シリキット、パーサック・チョンラシットの各ダムの個別貯水量は未取得——RIDの日次速報で確認されたい。',
          ]
        }
      },
      outlook: {
        title: { en: 'Outlook', ja: '見通し' },
        items: {
          en: [
            'ONWR warns of heavy rain on October 15–16 over the western North, Central region and East.',
            'A cold air mass (Oct 13–17) should reduce rain over upper Thailand.',
            'The southern monsoon now takes over: TMD expects heavy rain in the eastern South on Oct 12–13 and 17–18 (Surat Thani, Nakhon Si Thammarat, Songkhla, Yala, Narathiwat).',
            'Chachoengsao residents along the Bang Pakong expect another month under water (Khaosod English, Oct 14).',
          ],
          ja: [
            'ONWRは10月15〜16日に北部西側、中部、東部での大雨を警告している。',
            '寒気（10月13〜17日）によりタイ上部の降雨は減少する見込み。',
            '今後は南部モンスーンが主役となる。タイ気象局（TMD）は10月12〜13日と17〜18日に南部東側（スラートターニー、ナコンシータマラート、ソンクラー、ヤラー、ナラーティワート）での大雨を予想している。',
            'バーンパコン川沿いのチャチューンサオ住民は、さらに1カ月の浸水を見込んでいる（Khaosod English、10月14日）。',
          ]
        }
      }
    },

    signals: {
      headers: {
        en: ['Signal', 'Current reading', 'Escalation trigger', 'Why it matters'],
        ja: ['シグナル', '現在値', 'エスカレーションの引き金', '重要性']
      },
      rows: {
        en: [
          ['Chao Phraya Dam (C.13) discharge', '1,900 m³/s (Oct 14), down from 2,500 peak', "Back above 2,500 m³/s; 3,600 is Bangkok's defence limit", 'Risk to Ayutthaya/Pathum Thani estates and Bangkok riverside sites'],
          ['C.2 Nakhon Sawan flow', '1,766 m³/s, falling', 'Sustained rise above 2,500 m³/s', "3–5 days' warning of central-plains inflow"],
          ['Nong Pla Lai reservoir (Rayong)', '106% of capacity', 'Emergency spillway release notices', 'EEC industrial water and downstream flooding in Rayong/Chonburi'],
          ['Amata City Chonburi zones 7–10', 'Water receding; zone 8 at 27 cm on Oct 5; IEAT repairing embankment', 'New breach during Oct 15–16 rains', 'Concentration of Toyota single-source suppliers'],
          ['Toyota restart schedule', 'Samrong Oct 14, Gateway Oct 16, Ban Pho Oct 19 (planned)', 'Further postponement', 'Best real-time indicator of auto supply-chain health'],
          ['Ministry of Industry CMC count', '4,523 establishments, 55 provinces, THB 2.137 billion (Oct 13)', 'Damage above THB 5 billion', 'Official industrial damage count'],
          ['Insured losses (OIC)', 'THB 10–11 billion YTD (US$297–327 million)', 'Above THB 15 billion', 'Pricing pressure at renewal'],
          ['Highway closures (DOH)', 'Flooded highways in 12 provinces, 7 points impassable (Oct 14)', 'Closures on Routes 304, 331 or 7', 'Chachoengsao/Prachin Buri supplier links to Laem Chabang'],
          ['BOT Monetary Policy Committee', 'Policy rate 1.00%; meeting Oct 28', 'Easing citing floods', 'Financing costs and baht (THB 33.22/USD early October)'],
        ],
        ja: [
          ['チャオプラヤー・ダム（C.13）放流量', '1,900 m³/s（10月14日）、ピーク2,500から低下', '再び2,500 m³/s超。3,600はバンコクの防御限界', 'アユタヤ／パトゥムターニーの工業団地およびバンコク河岸拠点へのリスク'],
          ['C.2ナコンサワン流量', '1,766 m³/s、低下中', '2,500 m³/s超への持続的上昇', '中部平野への流入を3〜5日前に察知できる'],
          ['ノンプラライ貯水池（ラヨーン）', '容量の106%', '緊急放流の告知', 'EECの工業用水、ラヨーン／チョンブリ下流域の浸水'],
          ['アマタシティ・チョンブリ ゾーン7〜10', '水位低下中。ゾーン8は10月5日に27cm。タイ工業団地公社（IEAT）が堤防を修復中', '10月15〜16日の降雨での新たな決壊', 'トヨタの単一調達先サプライヤーの集積地'],
          ['トヨタの再開スケジュール', 'サムロン10月14日、ゲートウェイ10月16日、バンポー10月19日（予定）', 'さらなる延期', '自動車サプライチェーンの健全性を示す最良のリアルタイム指標'],
          ['工業省CMC集計', '4,523事業所、55県、21.37億バーツ（10月13日）', '被害額50億バーツ超', '工業被害の公式集計'],
          ['保険損害額（保険委員会事務局〈OIC〉）', '年初来100億〜110億バーツ（2億9,700万〜3億2,700万米ドル）', '150億バーツ超', '更改時の料率上昇圧力'],
          ['幹線道路の通行止め（道路局〈DOH〉）', '12県で冠水、7地点が通行不能（10月14日）', '国道304号、331号、7号の通行止め', 'チャチューンサオ／プラーチーンブリーのサプライヤーとレムチャバン港の連結'],
          ['BOT金融政策委員会', '政策金利1.00%、会合は10月28日', '洪水を理由とした利下げ', '資金調達コストとバーツ（10月上旬 33.22バーツ／米ドル）'],
        ]
      }
    },

    macro: {
      bottomLine: {
        en: '**Bottom line: the floods subtract roughly 0.1 percentage point from 2026 growth, and fiscal and stimulus offsets largely cancel it out.** The real macro risk is household and SME balance sheets, not GDP.',
        ja: '**結論：洪水は2026年の成長率を約0.1ポイント押し下げるが、財政・景気刺激策の効果でおおむね相殺される。** 真のマクロリスクはGDPではなく、家計と中小企業のバランスシートである。'
      },
      estimates: {
        title: { en: 'Damage and GDP estimates (forecasts, not audited)', ja: '損害額とGDPへの影響の推計（予測値、監査済みではない）' },
        headers: { en: ['Institution', 'Date', 'Estimated loss', 'GDP impact', 'Notes'], ja: ['機関', '日付', '推計損失額', 'GDPへの影響', '備考'] },
        rows: {
          en: [
            ['Bank of Thailand', 'Sep 30', '—', '0.03–0.1%', 'Partly offset by reconstruction; later signalled longer, wider flooding'],
            ['Ministry of Finance', 'Oct 3–4', '—', 'Below 0.1%', '2026 forecast kept at 2–2.5%'],
            ['UTCC (first)', 'Sep 28', 'THB 12.283 bn (range 5.9–20.6 bn), Sep 25–29', '0.066% of year; 0.26% of Q3', 'Bangkok THB 7.014 bn (57%); East THB 2.976 bn'],
            ['UTCC (revised)', 'Oct 8', 'THB 22–30 bn', '0.1–0.2%', 'Mostly agriculture (central rice); GDP 2.2–2.5% kept'],
            ['Kasikorn Research Center', 'Sep 28', 'THB 7–17 bn net disruption', '0.03–0.11%', 'Separately rice losses THB 12 bn'],
            ['SCB EIC', 'Oct 8', '—', 'Base −0.05 to −0.1 pt; worse −0.1 to −0.2; −0.15 to −0.25 if inner Bangkok floods', '1.48 m households (~6%), 1.69 m workers affected'],
            ['InnovestX Securities', 'Oct 1', 'THB 21 bn (Q3 19.1, Q4 1.8)', 'Q3 2.1%→1.7%; Q4 1.1%→1.4%', 'Full-year 2.0% kept'],
            ['Rangsit University', 'Sep 28', 'THB 16.9–33.8 bn (central 25.3 bn)', '0.36–0.73% of Q3 GDP', 'Most pessimistic'],
            ['Weathernews (Japan)', 'Oct 1', 'THB 16.72 bn (~¥69.7 bn)', '—', 'Buildings 8.06; transport 1.49; agriculture 1.14; manufacturing 1.04 (THB bn)'],
          ],
          ja: [
            ['タイ中央銀行', '9月30日', '—', '0.03〜0.1%', '復興需要で一部相殺。その後、浸水の長期化・広域化を示唆'],
            ['財務省', '10月3〜4日', '—', '0.1%未満', '2026年予測は2〜2.5%で据え置き'],
            ['UTCC（初回）', '9月28日', '122.83億バーツ（レンジ59億〜206億）、9月25〜29日分', '年間の0.066%、Q3の0.26%', 'バンコク70.14億バーツ（57%）、東部29.76億バーツ'],
            ['UTCC（改定）', '10月8日', '220億〜300億バーツ', '0.1〜0.2%', '大半は農業（中部のコメ）。GDP 2.2〜2.5%は据え置き'],
            ['カシコン・リサーチ・センター', '9月28日', '純経済活動阻害70億〜170億バーツ', '0.03〜0.11%', '別途、コメの損失120億バーツ'],
            ['SCB EIC', '10月8日', '—', '基本 −0.05〜−0.1ポイント、悪化 −0.1〜−0.2、バンコク中心部浸水時 −0.15〜−0.25', '148万世帯（約6%）、169万人の労働者が影響'],
            ['InnovestX証券', '10月1日', '210億バーツ（Q3 191億、Q4 18億）', 'Q3 2.1%→1.7%、Q4 1.1%→1.4%', '通年2.0%は据え置き'],
            ['ランシット大学', '9月28日', '169億〜338億バーツ（中央値253億）', 'Q3 GDPの0.36〜0.73%', '最も悲観的'],
            ['ウェザーニューズ（日本）', '10月1日', '167.2億バーツ（約697億円）', '—', '建物80.6億、運輸14.9億、農業11.4億、製造業10.4億（バーツ）'],
          ]
        }
      },
      howToRead: {
        en: "**How to read the spread.** Low-end estimates (BOT, MOF, Kasikorn) count only short business interruption; the high end (Rangsit, UTCC revised) adds crops and longer duration. WaLens working assumption: **THB 20–30 billion, ≈0.1–0.15% of GDP.** Growth was already fragile (Q1 2.8% → Q2 1.9%); floods push Q3 lower but stimulus lifts Q4. InnovestX's netting: THB 21 bn flood loss vs ~THB 15.6 bn activity from \"Thais Help Thais Plus\" phase 2 (budget THB 42.69 bn) → net drag only THB 5.3 bn.",
        ja: '**推計の幅の読み方。** 低めの推計（BOT、財務省、カシコン）は短期の事業中断のみを計上し、高めの推計（ランシット、UTCC改定）は農作物被害と長期化を加えている。WaLensの作業仮説：**200億〜300億バーツ、GDP比約0.1〜0.15%。** 成長はすでに脆弱であり（Q1 2.8% → Q2 1.9%）、洪水はQ3を押し下げるが、景気刺激策がQ4を押し上げる。InnovestXの差し引き試算：洪水損失210億バーツに対し、「タイ・チュワイ・タイ・プラス」第2弾（予算426.9億バーツ）による経済活動が約156億バーツ → 純押し下げはわずか53億バーツ。'
      },
      subsections: [
        {
          title: { en: 'Fiscal and relief measures', ja: '財政・救済措置' },
          items: {
            en: [
              '**Household payments:** THB 558.7 million for early-season floods (Aug 25, THB 9,000/household); THB 4.7 billion transferred to Government Savings Bank for Sep–Oct payouts (1.05 million+ households registered by Oct 5); THB 644.995 million to 86,303 households on Oct 14.',
              '**National Disaster Insurance scheme (from Oct 1, 2026):** ~30 million households; up to THB 100,000 per household per event, initial THB 10,000 for flood; government pays ~THB 15.5 bn premium/year for ~THB 75 bn cover.',
              '**Stimulus:** "Thais Help Thais Plus" extended two months (THB 500/month); VAT held at 7% for another year.',
              '**Fiscal constraint:** public debt nearing the 70%-of-GDP ceiling — do not expect a 2012-style THB 350 bn water-infrastructure package.',
            ],
            ja: [
              '**世帯向け給付：** 雨季初期の洪水に5億5,870万バーツ（8月25日、1世帯9,000バーツ）。9〜10月分の給付として政府貯蓄銀行（GSB）に47億バーツを移管（10月5日までに105万世帯超が登録）。10月14日に86,303世帯へ6億4,499万5,000バーツ。',
              '**国家災害保険制度（2026年10月1日開始）：** 約3,000万世帯が対象。1回の災害につき1世帯最大10万バーツ、洪水の初期給付は1万バーツ。政府は年間約155億バーツの保険料を負担し、約750億バーツの補償枠を確保。',
              '**景気刺激策：** 「タイ・チュワイ・タイ・プラス」を2カ月延長（月500バーツ）。付加価値税（VAT）7%をさらに1年据え置き。',
              '**財政制約：** 公的債務はGDP比70%の上限に接近——2012年型の3,500億バーツ規模の治水インフラ・パッケージは期待できない。',
            ]
          }
        },
        {
          title: { en: 'Monetary policy and inflation', ja: '金融政策とインフレ' },
          items: {
            en: [
              'September headline CPI 2.82% y/y, core 1.50% (secondary source — verify with TPSO). Ministry of Commerce raised 2026 inflation range to 1.8–2.2%.',
              'BOT holds at 1.00% and will look through temporary food spikes; next MPC Oct 28. Banks told to speed relief (payment holidays, SME liquidity).',
              'Diesel above THB 40/litre adds transport cost.',
            ],
            ja: [
              '9月の総合CPIは前年比2.82%、コア1.50%（二次情報——商務省貿易政策戦略局〈TPSO〉で要確認）。商務省は2026年のインフレ予想レンジを1.8〜2.2%に引き上げた。',
              'BOTは政策金利1.00%を維持し、一時的な食品価格の上昇は見過ごす方針。次回の金融政策委員会は10月28日。銀行には救済の迅速化（返済猶予、中小企業の資金繰り支援）を指示。',
              'ディーゼル価格が1リットル40バーツを超え、輸送コストを押し上げている。',
            ]
          }
        },
        {
          title: { en: 'Agriculture', ja: '農業' },
          items: {
            en: [
              'MOAC (Oct 4–5): 1.66 million rai in 43 provinces (rice 1.33 m rai; field crops 246,435; fruit 96,442); 24 provinces declared assistance zones.',
              'DOAE (Oct 8): 1.765 million rai, 50 provinces, 159,000 farmers; eastern durian orchards hit.',
              'Kasikorn Research: main-crop rice loss THB 12 bn (0.06% of GDP); rice prices may rise up to 18%.',
            ],
            ja: [
              '農業協同組合省（MOAC、10月4〜5日）：43県で166万ライ（コメ133万ライ、畑作物246,435ライ、果樹96,442ライ）。24県を支援区域に指定。',
              '農業振興局（DOAE、10月8日）：50県で176.5万ライ、農家15.9万人。東部のドリアン農園も被害。',
              'カシコン・リサーチ：主作期のコメの損失120億バーツ（GDP比0.06%）。コメ価格は最大18%上昇の可能性。',
            ]
          }
        },
        {
          title: { en: 'Tourism and consumers', ja: '観光・消費' },
          items: {
            en: [
              'Thai Airways cancelled 13 flights on 7 routes (Sep 29–30); ~5,600 bags backlogged at Suvarnabhumi.',
              'InnovestX: ~160,000 fewer October arrivals; full-year 33 million kept.',
              'UTCC consumer confidence fell to 52.1 in September (first fall in four months); normalisation expected from mid-November.',
              'IMF–World Bank Annual Meetings in Bangkok (Oct 12–18) went ahead.',
            ],
            ja: [
              'タイ国際航空は7路線13便を欠航（9月29〜30日）。スワンナプーム空港で約5,600個の手荷物が滞留。',
              'InnovestX：10月の訪タイ客は約16万人減少。通年3,300万人の見通しは据え置き。',
              'UTCCの消費者信頼感指数は9月に52.1へ低下（4カ月ぶりの低下）。11月中旬からの正常化を見込む。',
              'バンコクでのIMF・世界銀行年次総会（10月12〜18日）は予定通り開催された。',
            ]
          }
        },
        {
          title: { en: 'Benchmarks', ja: 'ベンチマーク' },
          items: {
            en: [
              '**2011:** THB 1.43 trillion (~USD 46.5 bn); manufacturing ~70% of losses; 13 million people in 66 provinces; 7 industrial estates flooded, 804 companies incl. 449 Japanese (JETRO, cited secondhand); growth −3.5–4 pts; Chao Phraya Dam peak 3,721 m³/s.',
              "**2026 so far:** about 1–2% of 2011's losses.",
              '**Closer analogue:** November 2025 Hat Yai/South floods, THB 25 bn (0.13% of GDP, Kasikorn) — similar scale, but 2026 hit the industrial heartland.',
            ],
            ja: [
              '**2011年：** 1.43兆バーツ（約465億米ドル）。損失の約70%が製造業。66県で1,300万人が被災。7つの工業団地が浸水し、日系449社を含む804社が被害（日本貿易振興機構〈JETRO〉、孫引き）。成長率は−3.5〜4ポイント。チャオプラヤー・ダムのピーク放流量は3,721 m³/s。',
              '**2026年（現時点）：** 2011年の損失の約1〜2%。',
              '**より近い比較対象：** 2025年11月のハジャイ／南部洪水、250億バーツ（GDP比0.13%、カシコン）——規模は同程度だが、2026年は工業の中枢を直撃した。',
            ]
          }
        },
      ]
    },

    industrial: {
      bottomLine: {
        en: '**Bottom line: the 2011 central-plains estates held. The weak point moved to the eastern seaboard and to logistics.** Post-2011 perimeter dikes worked: Rojana, Hi-Tech, Bang Pa-in, Saha Rattana Nakorn, Nava Nakorn and Factoryland reported no plant flooding. Failures came from overwhelmed local drainage and one embankment breach in Chonburi.',
        ja: '**結論：2011年に被災した中部平野の工業団地は持ちこたえた。弱点は東部臨海地域と物流へ移った。** 2011年以降に整備された外周堤防は機能し、ロジャナ、ハイテク、バンパイン、サハラタナナコン、ナワナコン、ファクトリーランドでは工場の浸水は報告されていない。被害は、処理能力を超えた地域の排水と、チョンブリでの堤防決壊1カ所から生じた。'
      },
      estates: {
        title: { en: 'Estate status', ja: '工業団地の状況' },
        headers: { en: ['Estate', 'Status', 'Detail'], ja: ['工業団地', '状況', '詳細'] },
        rows: {
          en: [
            ['Amata City Chonburi', '**Worst hit**', 'Earth embankment collapsed in zones 7–9; 30–70 cm water; ~150 factories affected, 34 halted incl. 10+ auto-parts makers. Receding by Oct 5. FTI Auto Parts Club: machinery recovery ≤1 week after water recedes'],
            ['Bang Phli (Samut Prakan)', 'High alert, late Sep', '30–80 cm in some phases; 6 districts declared disaster zones'],
            ['Lat Krabang / Bang Chan (Bangkok)', 'Common areas flooded, now cleared', '20–50 cm on estate roads Sep 28; cleared by Oct 2; no direct factory damage per industry minister'],
            ['Ayutthaya estates', 'Watch', 'IEAT warned of 20–60 cm rise in surrounding water; no breach'],
            ['Pathum Thani (Nava Nakorn, Bangkadi)', 'Watch', '169,724 affected households in province; no breach'],
            ['WHA / Eastern Seaboard (Rayong), Laem Chabang', 'Operational', '30 Rayong operators, THB 13.8 m damage; no port closure, truck delays'],
            ['Chachoengsao / Prachin Buri (Toyota Gateway & Ban Pho, Honda Prachin Buri)', 'Plants dry; staff and logistics disrupted', 'Workers could not commute; suppliers could not deliver'],
          ],
          ja: [
            ['アマタシティ・チョンブリ', '**最大の被害**', 'ゾーン7〜9で土堤が崩壊。水位30〜70cm。約150工場が影響を受け、10社超の自動車部品メーカーを含む34工場が停止。10月5日までに水位低下。FTI自動車部品部会：水が引いてから1週間以内に機械設備は復旧'],
            ['バンプリー（サムットプラーカーン）', '厳戒（9月下旬）', '一部の区画で30〜80cm。6郡が災害区域に指定'],
            ['ラートクラバン／バンチャン（バンコク）', '共用部が浸水、現在は解消', '9月28日に団地内道路で20〜50cm、10月2日までに解消。工業大臣によれば工場への直接被害なし'],
            ['アユタヤの工業団地', '要監視', 'IEATは周辺水位の20〜60cm上昇を警告。決壊なし'],
            ['パトゥムターニー（ナワナコン、バンカディ）', '要監視', '県内の被災世帯169,724。決壊なし'],
            ['WHA／イースタンシーボード（ラヨーン）、レムチャバン', '稼働中', 'ラヨーンの30事業者で1,380万バーツの被害。港湾閉鎖なし、トラック輸送に遅延'],
            ['チャチューンサオ／プラーチーンブリー（トヨタ ゲートウェイ・バンポー、ホンダ プラーチーンブリー）', '工場は浸水せず、人員・物流が混乱', '従業員が通勤できず、サプライヤーが納入できなかった'],
          ]
        }
      },
      cmc: {
        title: { en: 'Official damage count (Ministry of Industry CMC)', ja: '公式被害集計（工業省CMC）' },
        items: {
          en: [
            'Sep 28: 1,267 establishments, 40 provinces.',
            'Sep 30: 1,315 establishments (77 factories, 1,179 SMEs), THB 22.79 million.',
            'Oct 13: **4,523 establishments, 55 provinces, THB 2.137 billion.**',
          ],
          ja: [
            '9月28日：40県で1,267事業所。',
            '9月30日：1,315事業所（工場77、中小企業1,179）、2,279万バーツ。',
            '10月13日：**55県で4,523事業所、21.37億バーツ。**',
          ]
        },
        note: {
          en: "FTI's member survey: THB 6–7 billion across 2,000+ firms in 14 provinces; food and agro-processing hardest hit. Thansettakij reports 4,635 businesses / THB 18 bn (methodology unverified). Scopes differ — do not add.",
          ja: 'FTIの会員調査：14県・2,000社超で60億〜70億バーツ。食品・農産加工が最も深刻。Thansettakijは4,635事業者／180億バーツと報じている（算出方法は未検証）。集計範囲が異なるため、合算しないこと。'
        }
      },
      autoShock: {
        title: { en: 'The Japanese auto shock: a just-in-time failure, not a flood-defence failure', ja: '日系自動車ショック：洪水防御の失敗ではなく、ジャスト・イン・タイムの失敗' },
        items: {
          en: [
            '**Toyota Motor Thailand:** all three plants (Samrong; Gateway and Ban Pho) halted from Sep 30, formally Oct 5–10, then extended. Combined capacity ~760,000–770,000 units/year. SEVP Somkid Praditkamjornchai attributed the stop to ~14 suppliers at Amata under 50–70 cm of water. ~30,000 units of planned production/deliveries affected (Bangkokbiznews, Matichon, Dailynews). Planned restarts: Samrong Oct 14, Gateway Oct 16, Ban Pho Oct 19 — subject to parts readiness, not yet confirmed. Stopgaps: carpets airfreighted from Japan, airbags from Vietnam.',
            "**Honda:** Prachin Buri and Ayutthaya halted Oct 2–6 because Chonburi/Rayong suppliers could not deliver. Honda's post-2011 move to higher ground kept its own plant dry.",
            '**Others:** Mitsubishi Motors and AutoAlliance Thailand (Mazda–Ford) paused; Reuters reported parts delays at Toyota, Isuzu, Ford, Nissan and Honda. Ministry of Industry: 5 automakers halted.',
            '**Chinese and European brands** operated normally on different supplier networks (FTI Automotive Club chair Suwat Suppakarndechakul).',
            '**Why suppliers cannot be swapped:** supplier approval can take almost a year, especially for pickups (FTI Auto Parts Club), forcing costly imports to avoid contract penalties.',
          ],
          ja: [
            '**トヨタ・モーター・タイランド：** 全3工場（サムロン、ゲートウェイ、バンポー）が9月30日から停止し、正式には10月5〜10日、その後延長。合計生産能力は年約76万〜77万台。ソムキット・プラディットカムジョンチャイ上級執行副社長は、アマタで50〜70cmの浸水に見舞われた約14社のサプライヤーを停止の原因に挙げた。生産・納車計画のうち約3万台が影響を受けた（Bangkokbiznews、Matichon、Dailynews）。再開予定：サムロン10月14日、ゲートウェイ10月16日、バンポー10月19日——部品の準備状況次第で、まだ確定していない。応急措置として、カーペットを日本から空輸、エアバッグをベトナムから調達。',
            '**ホンダ：** チョンブリ／ラヨーンのサプライヤーが納入できず、プラーチーンブリーとアユタヤの工場が10月2〜6日に停止。2011年以降に高台へ移転したことで、自社工場は浸水を免れた。',
            '**その他：** 三菱自動車とオートアライアンス・タイランド（マツダ・フォード）が操業を一時停止。ロイターはトヨタ、いすゞ、フォード、日産、ホンダでの部品遅延を報じた。工業省：自動車メーカー5社が停止。',
            '**中国・欧州ブランド**は異なるサプライヤー網に依存しており、通常通り操業した（FTI自動車部会のスワット・スッパカーンデーチャクン会長）。',
            '**サプライヤーを切り替えられない理由：** 特にピックアップトラックでは、サプライヤー承認に1年近くかかることがある（FTI自動車部品部会）。そのため、契約上の違約金を避けるために高コストの輸入を余儀なくされる。',
          ]
        }
      },
      japaneseIntel: {
        title: { en: 'Japanese-specific intelligence', ja: '日系企業に固有のインテリジェンス' },
        items: {
          en: [
            '**NNA emergency survey (Oct 1–6, 380 respondents, published Oct 9):** 38.4% still affected, 30.8% affected but recovered (~70% total). Only ~10% physical damage; main issues staff commuting and logistics. Worst in the East and manufacturing.',
            '**BOI relief (Sep 29, via JETRO Oct 2):** for BOI-promoted firms — import-duty exemption on replacement machinery; tax-free write-off of damaged machinery/materials; approval of capacity increases.',
            "**Toyota's requests to government (Oct 7):** after DPM/Commerce Minister Suphajee Suthumpun's Samrong visit — duty exemptions on new machinery/parts and a 200% tax deduction for plant/machinery repairs. *Under consideration, not enacted.*",
            '**JCC Bangkok:** member notice Sep 28; no flood survey found. H1 2026 business-sentiment DI already negative (−6; H2 forecast −7). "Flood countermeasures" was among top requests to government in the 2025 survey (68 firms, 15%).',
            '**Japanese insurers** (Tokio Marine, Sompo, MS&AD): no Thailand loss estimates as of Oct 15; likely at H1 FY2026 results in mid-to-late November.',
          ],
          ja: [
            '**NNA緊急アンケート（10月1〜6日、回答380社、10月9日公表）：** 38.4%が現在も影響あり、30.8%が影響を受けたが回復済み（合計約70%）。物理的被害はわずか約10%で、主な問題は従業員の通勤と物流。東部と製造業で最も深刻。',
            '**タイ投資委員会（BOI）の救済措置（9月29日、JETRO経由で10月2日）：** BOI奨励企業向け——代替機械の輸入関税免除、被災した機械・原材料の非課税での損金処理、生産能力増強の承認。',
            '**トヨタの政府への要望（10月7日）：** スパチー・スートゥムパン副首相兼商務相のサムロン工場視察後——新規機械・部品の関税免除と、工場・機械修繕費の200%損金算入。*検討中であり、施行されていない。*',
            '**盤谷日本人商工会議所（JCC）：** 9月28日に会員向け通知。洪水に関する調査は確認されていない。2026年上期の景況感DIはすでにマイナス（−6、下期見通し−7）。2025年調査では「洪水対策」が政府への要望の上位項目の一つだった（68社、15%）。',
            '**日系損害保険会社**（東京海上、SOMPO、MS&AD）：10月15日時点でタイの損害見積もりは未公表。11月中〜下旬の2026年度上期決算で公表される可能性が高い。',
          ]
        }
      },
      logistics: {
        title: { en: 'Logistics', ja: '物流' },
        items: {
          en: [
            'DOH: flooded highways in 12 provinces, 7 points impassable (Oct 14).',
            'Suvarnabhumi access disrupted; Thai Airways briefly suspended cargo handling.',
            'No closure of Laem Chabang or Bangkok Port; no confirmed rail suspensions.',
          ],
          ja: [
            'DOH：12県で幹線道路が冠水、7地点が通行不能（10月14日）。',
            'スワンナプーム空港へのアクセスが混乱。タイ国際航空は貨物取り扱いを一時停止。',
            'レムチャバン港・バンコク港の閉鎖なし。鉄道の運休は確認されていない。',
          ]
        }
      }
    },

    competitive: {
      en: [
        { title: 'Japanese supply-chain design was the vulnerability, not the factories.', content: 'JIT/TPS holds almost no buffer stock, so one estate breach stopped the largest carmaker for two to three weeks. Chinese EV makers in the EEC kept running on a separate supplier base and can sell into a market short of Toyota pickups — expect modest Q4 share gains for Chinese brands.' },
        { title: 'Reconstruction creates winners:', content: 'construction materials, home repair, electrical appliances, flood barriers and pumps, car repair and replacement vehicles. Flood-damaged car claims ~THB 2 bn (vs THB 6 bn in 2011, Thai Rath).' },
        { title: 'Insurance is hardening.', content: 'OIC SG Chuchart Lertchuchuen: insured flood damage THB 10–11 bn YTD, held down by sub-limits and parametric covers; uninsured losses could double the total. Expect tighter flood sub-limits and higher deductibles at January 2027 renewals for East and Bangkok-perimeter risks. Submerged EVs now treated as total losses under OIC criteria. Japanese insurers will likely re-underwrite Amata and Bang Phli.' },
        { title: 'Relocation: expect "East plus elevation," not "Thailand plus one."', content: 'No shift to Vietnam visible; UTCC still expects 2024–2026 BOI applications above THB 1 trillion. Likely response is site hardening and second sources in another Thai province (Honda model). Investors will press IEAT on private-estate embankment standards.' },
        { title: 'The policy window is open.', content: 'With the IMF–World Bank meetings in Bangkok, lobbying via JCC, BOI and FTI for tax deductions, duty waivers and stricter embankment standards has an unusually high chance of success over the next 60 days.' },
      ],
      ja: [
        { title: '脆弱だったのは工場ではなく、日系企業のサプライチェーン設計である。', content: 'JIT／トヨタ生産方式（TPS）はバッファー在庫をほとんど持たないため、工業団地1カ所の決壊で最大の自動車メーカーが2〜3週間停止した。EEC内の中国EVメーカーは別のサプライヤー基盤で操業を続け、トヨタのピックアップが不足する市場で販売を伸ばせる——Q4には中国ブランドの小幅なシェア拡大を想定すべきである。' },
        { title: '復興が勝者を生む：', content: '建設資材、住宅修繕、家電、防水板・ポンプ、自動車修理・代替車両。浸水車両の保険金請求は約20億バーツ（2011年は60億バーツ、Thai Rath）。' },
        { title: '保険市場はハード化している。', content: 'OICのチューチャート・ルートチューチューン事務局長：洪水の保険損害は年初来100億〜110億バーツで、支払限度額（サブリミット）とパラメトリック補償により抑えられている。無保険損失を含めると総額は倍増しうる。2027年1月の更改では、東部とバンコク周縁部のリスクについて洪水サブリミットの厳格化と免責額の引き上げを想定すべきである。水没したEVはOICの基準で全損扱いとなった。日系保険会社はアマタとバンプリーの引受条件を見直す可能性が高い。' },
        { title: '移転：「タイ・プラス・ワン」ではなく「東部プラス高台」を想定すべき。', content: 'ベトナムへの移転の動きは見られない。UTCCは2024〜2026年のBOI申請額が1兆バーツを超えるとの見通しを維持している。想定される対応は、拠点の強靭化と国内別県での第二調達先確保（ホンダ型）である。投資家はIEATに対し、民間工業団地の堤防基準の強化を求めるだろう。' },
        { title: '政策の窓は開いている。', content: 'バンコクでのIMF・世界銀行総会を背景に、JCC・BOI・FTIを通じた税控除、関税免除、堤防基準の厳格化に向けた働きかけは、今後60日間、異例に高い成功確率を持つ。' },
      ]
    },

    sectorGuide: {
      headers: { en: ['Sector', 'Impact', 'Recommended stance'], ja: ['セクター', '影響', '推奨スタンス'] },
      rows: {
        en: [
          ['Automotive & parts', '**High, short-lived** — Toyota ~30,000 units; Honda, Mitsubishi, AAT paused; 10+ Amata suppliers halted', '**Recover and redesign.** Map tier-2/3 suppliers in Amata and Bang Phli; 2–4 weeks safety stock for single-source parts; start alternate ASEAN approvals now (≈1 year lead time)'],
          ['Electronics / HDD', '**Low–moderate** — Ayutthaya/Pathum Thani estates held; disruption via commuting and logistics', '**Hold, monitor C.2 and C.13.** Re-test estate dike plans before 2027 monsoon'],
          ['Food & agro-processing', '**Moderate–high** — FTI ranks food/drink worst hit; 1.33 m rai rice and eastern durian damaged; rice up to +18%', '**Hedge inputs.** Lock rice and fruit contracts; budget higher raw-material costs Q4 2026–Q1 2027'],
          ['Retail / consumer', "**Moderate** — confidence 52.1; Bangkok 57% of UTCC's first estimate", '**Lean in from mid-November** to restocking and replacement demand, supported by stimulus extension'],
          ['Logistics', '**Moderate** — highways in 12 provinces flooded; Suvarnabhumi disrupted; Laem Chabang operational', '**Add redundancy.** Pre-agree alternate routes and staff transport for the East'],
          ['Construction materials', '**Positive** — repair and flood-protection spending', '**Opportunity.** Prepare supply for Q4 2026–H1 2027 repair demand'],
          ['Insurance / finance', '**Moderate** — insured losses THB 10–11 bn YTD; BOT-directed debt relief', '**Reprice.** Tighten East flood sub-limits; watch SME credit quality'],
          ['Tourism', '**Low–moderate** — ~160,000 fewer October arrivals', '**Hold.** High season intact; southern monsoon is the risk'],
        ],
        ja: [
          ['自動車・部品', '**大きいが短期的** — トヨタ約3万台。ホンダ、三菱、AATが一時停止。アマタのサプライヤー10社超が停止', '**復旧と再設計。** アマタとバンプリーのTier2/3サプライヤーを可視化。単一調達部品に2〜4週間の安全在庫。ASEANでの代替先承認を今すぐ開始（リードタイム約1年）'],
          ['電子・HDD', '**小〜中** — アユタヤ／パトゥムターニーの工業団地は持ちこたえた。通勤・物流経由で混乱', '**維持、C.2とC.13を監視。** 2027年雨季までに工業団地の堤防計画を再検証'],
          ['食品・農産加工', '**中〜大** — FTIは飲食料品を最大の被害と位置づけ。コメ133万ライと東部ドリアンが被害。コメは最大+18%', '**原材料をヘッジ。** コメ・果物の契約を固定。2026年Q4〜2027年Q1の原材料コスト上昇を予算化'],
          ['小売・消費', '**中** — 消費者信頼感52.1。UTCC初回推計の57%がバンコク', '**11月中旬から攻勢へ。** 景気刺激策の延長に支えられた在庫補充・買い替え需要を取り込む'],
          ['物流', '**中** — 12県で幹線道路が冠水。スワンナプームが混乱。レムチャバンは稼働', '**冗長性を確保。** 東部の代替ルートと従業員輸送を事前に取り決める'],
          ['建設資材', '**プラス** — 修繕・洪水対策への支出', '**好機。** 2026年Q4〜2027年上期の修繕需要に向けて供給を準備'],
          ['保険・金融', '**中** — 保険損害は年初来100億〜110億バーツ。BOT主導の債務救済', '**料率見直し。** 東部の洪水サブリミットを厳格化。中小企業の信用状況を注視'],
          ['観光', '**小〜中** — 10月の訪タイ客は約16万人減少', '**維持。** ハイシーズンは無傷。南部モンスーンがリスク'],
        ]
      }
    },

    nextActions: {
      title: { en: 'Next Action Insights', ja: '次のアクション' },
      horizons: {
        en: [
          {
            label: 'Today (October 15–16)',
            actions: [
              'Activate BCP monitoring for ONWR-warned heavy rain (Central and East). Assign one owner to check RID C.13 and C.2 readings and Nong Pla Lai release notices twice daily.',
              "Confirm restart readiness with every Amata City and Bang Phli supplier against Toyota's Oct 14/16/19 dates. Escalate any part with under 5 days of stock.",
              'Confirm staff safety and commuting routes in Chachoengsao, Prachin Buri, Samut Prakan, Pathum Thani and Ayutthaya; charter staff buses if needed — commuting failure stopped Toyota on Sep 30.',
            ]
          },
          {
            label: 'This week',
            actions: [
              '**File BOI relief claims** (if BOI-promoted): duty-free replacement machinery; write-off of damaged machinery and materials (BOI, Sep 29).',
              '**Notify insurers formally and document everything** — photo/video of every asset before cleaning (OIC guidance). OIC has asked insurers to settle within 7 days; hotline 1186.',
              "**Test contingent business interruption cover.** Ask your broker in writing whether you are covered for losses caused by a supplier's flood (CBI) and for denial of access when your plant is dry. For Toyota suppliers, this is where most 2026 losses sit.",
              '**Support employees.** Help Thai staff register for DDPM/GSB household relief and the National Disaster Insurance initial THB 10,000 payment. Consider company hardship grants or salary advances; affected workers concentrate in Samut Prakan (~445,000) and Bangkok (~420,000).',
            ]
          },
          {
            label: 'This month (by mid-November)',
            actions: [
              '**Map single-source parts** made at only one site in Amata, Bang Phli, Lat Krabang or Bang Chan. For each, approve an ASEAN or second-province alternative, or set 2–4 weeks of safety stock.',
              '**Collect on tax measures.** Make corporate flood donations only via the Revenue Department e-Donation system (mandatory since Jan 1, 2026). Track MOF decisions on the 200% repair deduction and machinery duty exemption; prepare documentation now.',
              '**Lobby jointly** through JCC and FTI for IEAT embankment inspection standards at private estates — Amata is the case study.',
              '**Plan for the southern monsoon:** run the same checklist for Songkhla, Surat Thani and Nakhon Si Thammarat operations (Oct–Dec).',
            ]
          },
          {
            label: 'This quarter (by January 2027 renewals)',
            actions: [
              '**Renegotiate insurance:** price limit buy-backs, parametric flood cover and CBI extensions; request site engineering surveys from Tokio Marine, Sompo or MS&AD.',
              '**Re-score site risk:** elevation, dike ownership, access routes. Require a 1-in-50-year rainfall scenario (not only river flood) before new capex in low-lying Chonburi, Samut Prakan or eastern Bangkok.',
              '**Recalibrate inventory policy:** move from pure JIT to seasonal "just-in-case" buffers for September–November.',
              '**Report to the board:** present 2026 as a stress test costing two to three weeks of output, and show what a 2011 scenario would cost under current mitigation.',
            ]
          }
        ],
        ja: [
          {
            label: '今日（10月15〜16日）',
            actions: [
              'ONWRが警告する大雨（中部・東部）に備え、BCPモニタリングを発動する。RIDのC.13・C.2の観測値とノンプラライの放流告知を1日2回確認する担当者を1人指名する。',
              'アマタシティとバンプリーの全サプライヤーについて、トヨタの10月14／16／19日の再開日程に対する再開準備状況を確認する。在庫が5日分未満の部品はすべてエスカレーションする。',
              'チャチューンサオ、プラーチーンブリー、サムットプラーカーン、パトゥムターニー、アユタヤの従業員の安全と通勤経路を確認し、必要に応じて送迎バスを手配する——9月30日にトヨタを止めたのは通勤の途絶だった。',
            ]
          },
          {
            label: '今週',
            actions: [
              '**BOIの救済措置を申請する**（BOI奨励企業の場合）：代替機械の関税免除、被災した機械・原材料の損金処理（BOI、9月29日）。',
              '**保険会社へ正式に通知し、すべてを記録する**——清掃前にすべての資産を写真・動画で記録する（OICのガイダンス）。OICは保険会社に7日以内の支払いを要請している。ホットライン1186。',
              '**取引先休業損失（CBI）補償を検証する。** サプライヤーの洪水による損失（CBI）や、自社工場が浸水していなくてもアクセスが遮断された場合の損失が補償されるか、ブローカーに書面で確認する。トヨタのサプライヤーにとって、2026年の損失の大半はここにある。',
              '**従業員を支援する。** タイ人従業員がDDPM／GSBの世帯救済と国家災害保険の初期給付1万バーツに登録できるよう支援する。会社としての見舞金や給与の前払いを検討する。被災した労働者はサムットプラーカーン（約44.5万人）とバンコク（約42万人）に集中している。',
            ]
          },
          {
            label: '今月（11月中旬まで）',
            actions: [
              '**単一調達部品を洗い出す**——アマタ、バンプリー、ラートクラバン、バンチャンの1拠点でしか生産されていない部品。それぞれについてASEANまたは国内別県の代替先を承認するか、2〜4週間の安全在庫を設定する。',
              '**税制措置を確実に活用する。** 企業の洪水寄付は歳入局のe-Donationシステム経由に限る（2026年1月1日から義務化）。修繕費200%損金算入と機械の関税免除に関する財務省の決定を追跡し、今から書類を準備する。',
              '**共同で働きかける**——JCCとFTIを通じ、民間工業団地に対するIEATの堤防点検基準を求める。アマタがその事例となる。',
              '**南部モンスーンに備える：** ソンクラー、スラートターニー、ナコンシータマラートの拠点についても同じチェックリストを実施する（10〜12月）。',
            ]
          },
          {
            label: '今四半期（2027年1月の更改まで）',
            actions: [
              '**保険を再交渉する：** 限度額の買い戻し、パラメトリック洪水補償、CBI特約の価格を確認する。東京海上、SOMPO、MS&ADに拠点のエンジニアリング・サーベイを依頼する。',
              '**拠点リスクを再評価する：** 標高、堤防の所有者、アクセス経路。チョンブリ、サムットプラーカーン、バンコク東部の低地で新規設備投資を行う前に、（河川洪水だけでなく）50年に1度の降雨シナリオを必須とする。',
              '**在庫方針を見直す：** 純粋なJITから、9〜11月の季節的な「ジャスト・イン・ケース」バッファーへ移行する。',
              '**取締役会に報告する：** 2026年を生産2〜3週間分のコストで済んだストレステストとして提示し、現在の対策の下で2011年型シナリオがどれだけのコストになるかを示す。',
            ]
          }
        ]
      }
    },

    methodology: {
      en: 'Primary data: DDPM figures (via Nation Thailand, Khaosod English, Thansettakij); RID and ONWR bulletins (via Thai PBS, Bangkokbiznews); Ministry of Industry CMC counts; BOI measures (via JETRO); OIC guidance; BOT statements. Secondary-only items are flagged in text (September CPI, THB 18 bn business tally). Not obtained: Royal Gazette declarations, Bhumibol/Sirikit storage data, NESDC/FPO estimates (NESDC Q3 GDP release mid-November will be the first official read), Krungsri Research and Krungthai COMPASS estimates, Japanese TSE timely disclosures. All loss figures are estimates as of October 15, 2026 and will be revised.',
      ja: '一次データ：DDPMの数値（Nation Thailand、Khaosod English、Thansettakij経由）、RIDおよびONWRの速報（Thai PBS、Bangkokbiznews経由）、工業省CMCの集計、BOIの措置（JETRO経由）、OICのガイダンス、BOTの声明。二次情報のみの項目は本文中に明記している（9月のCPI、180億バーツの事業者集計）。未取得：官報の宣言、プミポン／シリキットの貯水データ、国家経済社会開発評議会（NESDC）／財政政策局（FPO）の推計（11月中旬のNESDCによるQ3 GDP公表が最初の公式値となる）、クルンシィ・リサーチおよびクルンタイCOMPASSの推計、東証の適時開示。すべての損失額は2026年10月15日時点の推計であり、今後改定される。'
    },

    sources: [
      {
        group: { en: 'Government & official', ja: '政府・公式' },
        links: [
          { label: 'Bangkok Post — Govt plays down cost of floods', url: 'https://www.bangkokpost.com/thailand/general/3330820/govt-plays-down-cost-of-floods' },
          { label: 'Bangkok Post — Flood damage worse than expected', url: 'https://www.bangkokpost.com/business/general/3333873/flood-damage-worse-than-expected' },
          { label: 'Nation Thailand (DDPM update)', url: 'https://www.nationthailand.com/news/general/40072128' },
          { label: 'Nation Thailand (economy)', url: 'https://www.nationthailand.com/business/economy/40071733' },
          { label: 'Nation Thailand (relief)', url: 'https://www.nationthailand.com/news/general/40071901' },
          { label: 'PRD — Cabinet flood relief', url: 'https://secretary.prd.go.th/th/content/category/detail/id/9/iid/535580' },
          { label: 'JETRO — BOI flood relief measures', url: 'https://www.jetro.go.jp/biznews/2026/10/12173df0c3860e7a.html' },
          { label: 'JCC Bangkok notice', url: 'https://www.jcc.or.th/news/detail/155' },
          { label: 'ADRC disaster record', url: 'https://www.adrc.asia/view_disaster_jp.php?Lang=jp&Key=2849' },
        ]
      },
      {
        group: { en: 'Hydrology & situation', ja: '水文・被災状況' },
        links: [
          { label: 'Thai PBS', url: 'https://www.thaipbs.or.th/news/content/570853' },
          { label: 'Thai PBS', url: 'https://www.thaipbs.or.th/news/content/567721' },
          { label: 'Thai PBS', url: 'https://www.thaipbs.or.th/news/content/563013' },
          { label: 'Topnews (HII data)', url: 'https://www.topnews.co.th/news/1708340' },
          { label: 'Khaosod English — 2.45 million affected, THB 645m aid', url: 'https://www.khaosodenglish.com/news/2026/10/14/floods-affect-2-45-million-people-as-thailand-prepares-645-million-baht-in-aid/' },
          { label: 'ABC News / AP — death toll', url: 'https://abcnews.com/International/wireStory/thailand-braces-rain-death-toll-recent-flooding-hits-136997352' },
          { label: 'Weathernews (JP)', url: 'https://weathernews.jp/news/202610/010151/' },
          { label: 'vasteelab — Bangkok/Pattaya rainfall', url: 'https://vasteelab.com/2026/09/28/2026-09-28-thailand-flood-bangkok-pattaya/' },
        ]
      },
      {
        group: { en: 'Macro & research', ja: 'マクロ・調査' },
        links: [
          { label: 'Thansettakij', url: 'https://www.thansettakij.com/economy/670520' },
          { label: 'Thansettakij', url: 'https://www.thansettakij.com/economy/671401' },
          { label: 'Prachachat (finance)', url: 'https://www.prachachat.net/finance/news-2074646' },
          { label: 'Prachachat (finance)', url: 'https://www.prachachat.net/finance/news-2077900' },
          { label: 'Money & Banking (BOT)', url: 'https://moneyandbanking.co.th/2026/274692/' },
          { label: 'Thai Examiner (BOT resilience warning)', url: 'https://www.thaiexaminer.com/thai-news-foreigners/2026/10/02/bank-of-thailand-top-executive-warns-repeated-economic-shocks-are-weakening-the-countrys-resilience/' },
          { label: 'Thai PBS World (economy)', url: 'https://www.thaipbsworld.com/economy/558780' },
          { label: 'Asia News Network — Bangkok bears brunt of losses', url: 'https://asianews.network/bangkok-bears-brunt-of-us754-32mil-in-thai-flood-losses-as-businesses-struggle-to-cope/' },
          { label: 'Spacebar — agriculture losses', url: 'https://spacebar.th/business/economic-business-thai-floods-rice-field-horticultural' },
          { label: 'Thai Newsroom — 2025 southern floods benchmark', url: 'https://thainewsroom.com/2025/11/26/severe-floods-have-cost-southern-economy-25-billion-baht-so-far-research/' },
        ]
      },
      {
        group: { en: 'Industry & automotive', ja: '産業・自動車' },
        links: [
          { label: 'Bangkokbiznews', url: 'https://www.bangkokbiznews.com/economics/1255444' },
          { label: 'Bangkokbiznews', url: 'https://www.bangkokbiznews.com/economics/1255399' },
          { label: 'Bangkok Post — Toyota extends suspensions', url: 'https://www.bangkokpost.com/business/general/3334375/toyota-thailand-extends-production-suspensions-due-to-flooding' },
          { label: 'Matichon', url: 'https://www.matichon.co.th/economy/news_5926797' },
          { label: 'Dailynews', url: 'https://www.dailynews.co.th/news/6256482/' },
          { label: 'M Report — Amata City flood', url: 'https://www.mreport.co.th/news/industry-movement/105-amata-city-flood' },
          { label: 'Reuters via WTVB — automakers and suppliers disrupted', url: 'https://wtvbam.com/2026/10/08/thai-floods-disrupt-operations-of-automakers-and-parts-suppliers-industry-federation-says/' },
          { label: 'AFMA — automakers pause production', url: 'https://afma.org.au/severe-flooding-forces-automakers-to-pause-production-in-thailand/' },
          { label: 'Thansettakij (industry)', url: 'https://www.thansettakij.com/economy/670880' },
          { label: 'Prachachat (industry)', url: 'https://www.prachachat.net/economic/news-2074984' },
        ]
      },
      {
        group: { en: 'Insurance', ja: '保険' },
        links: [
          { label: 'Actuarial Post — losses manageable for non-life insurers', url: 'https://www.actuarialpost.co.uk/article/thailand-flood-losses-manageable-for-non-life-insurers-1332.htm' },
          { label: 'Thansettakij (insurance)', url: 'https://www.thansettakij.com/finance/insurance/670504' },
          { label: 'Thai PBS (OIC guidance)', url: 'https://www.thaipbs.or.th/news/content/558700' },
        ]
      },
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
        <meta property="article:section" content="Economic Policy" />
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
          <img src={heroImage} alt="Bangkok skyline — Thailand 2026 floods strategic analysis for Japanese executives" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
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
            { label: isJapanese ? 'タイ洪水2026' : 'Thailand Flood 2026' }
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
            <Card className="border-l-4 border-l-primary">
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
          </section>

          {/* 02 Flood Situation & Mechanism */}
          <section id="situation" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Database className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{isJapanese ? '洪水の状況とメカニズム' : 'Flood Situation & Mechanism'}</h2>
                <p className="text-sm text-muted-foreground">{isJapanese ? '時系列・水文データ・見通し' : 'Timeline, hydrology and outlook'}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground mb-6" style={cellStyle}>{renderBold(content.situation.bottomLine[L])}</p>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  {content.situation.timeline.title[L]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderTable(content.situation.timeline.headers[L], content.situation.timeline.rows[L], 'font-semibold text-primary whitespace-nowrap')}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <span style={cellStyle}>{content.situation.hydrology.title[L]}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderList(content.situation.hydrology.items[L], bulletIcon)}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    {content.situation.outlook.title[L]}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderList(content.situation.outlook.items[L], <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />)}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 03 Key Intelligence Signals */}
          <section id="signals" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{isJapanese ? '注視すべき主要シグナル' : 'Key Intelligence Signals'}</h2>
                <p className="text-sm text-muted-foreground">{isJapanese ? '現在値とエスカレーションの引き金' : 'Current readings and escalation triggers'}</p>
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
                      ? 'マクロ経済・財政分析、工業団地・サプライチェーンへの影響、競争・戦略面の変化、セクター別判断ガイド、次のアクションを含む完全版レポートにアクセスするにはプレミアムプランが必要です。'
                      : 'The full macro & fiscal analysis, industrial & supply-chain exposure, competitive dynamics, sector decision guide, and next action insights require a premium subscription.'
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
              {/* 04 Macro & Fiscal Analysis */}
              <section id="macro-analysis" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Lightbulb className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{isJapanese ? 'マクロ経済・財政分析' : 'Macro & Fiscal Analysis'}</h2>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground mb-6" style={cellStyle}>{renderBold(content.macro.bottomLine[L])}</p>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Database className="h-5 w-5 text-purple-500" />
                      <span style={cellStyle}>{content.macro.estimates.title[L]}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderTable(content.macro.estimates.headers[L], content.macro.estimates.rows[L])}
                  </CardContent>
                </Card>

                <Card className="mb-6 border-l-4 border-l-purple-500/50">
                  <CardContent className="pt-6">
                    <p className="text-sm leading-relaxed text-muted-foreground" style={cellStyle}>{renderBold(content.macro.howToRead[L])}</p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.macro.subsections.map((sub, idx) => (
                    <Card key={idx} className="border-l-4 border-l-purple-500/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Eye className="h-4 w-4 text-purple-500" />
                          <span style={cellStyle}>{sub.title[L]}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {renderList(sub.items[L], bulletIcon)}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* 05 Industrial & Supply Chain Exposure */}
              <section id="industrial" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <Factory className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{isJapanese ? '工業団地・サプライチェーンへの影響' : 'Industrial & Supply Chain Exposure'}</h2>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground mb-6" style={cellStyle}>{renderBold(content.industrial.bottomLine[L])}</p>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Factory className="h-5 w-5 text-red-500" />
                      {content.industrial.estates.title[L]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderTable(content.industrial.estates.headers[L], content.industrial.estates.rows[L])}
                  </CardContent>
                </Card>

                <Card className="mb-6 border-l-4 border-l-red-500/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Eye className="h-4 w-4 text-red-500" />
                      <span style={cellStyle}>{content.industrial.cmc.title[L]}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderList(content.industrial.cmc.items[L], bulletIcon)}
                    <p className="text-xs text-muted-foreground mt-4" style={cellStyle}>{content.industrial.cmc.note[L]}</p>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  {[content.industrial.autoShock, content.industrial.japaneseIntel, content.industrial.logistics].map((block, idx) => (
                    <Card key={idx} className="border-l-4 border-l-red-500/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Shield className="h-4 w-4 text-red-500" />
                          <span style={cellStyle}>{block.title[L]}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {renderList(block.items[L], bulletIcon)}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* 06 Competitive & Strategic Dynamics */}
              <section id="competitive" className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Shield className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{isJapanese ? '競争・戦略面の変化' : 'Competitive & Strategic Dynamics'}</h2>
                  </div>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <ol className="space-y-4">
                      {content.competitive[L].map((point, idx) => (
                        <li key={idx} className="border-l-2 border-blue-500/30 pl-4">
                          <p className="text-sm leading-relaxed text-muted-foreground" style={cellStyle}>
                            <span className="font-mono text-xs text-primary mr-2">{idx + 1}.</span>
                            <strong className="font-semibold text-foreground">{point.title}</strong>{' '}{point.content}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
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
                <Card className="border-l-4 border-l-amber-500/50">
                  <CardContent className="pt-6">
                    {renderTable(content.sectorGuide.headers[L], content.sectorGuide.rows[L], 'font-semibold')}
                  </CardContent>
                </Card>
              </section>

              {/* 08 Next Action Insights */}
              <section id="next-actions" className="mb-12">
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

              {/* 09 Sources */}
              <section id="sources" className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gray-500/10">
                    <BookOpen className="h-6 w-6 text-gray-500" />
                  </div>
                  <h2 className="text-2xl font-bold">{isJapanese ? '出典・参考文献' : 'Sources & References'}</h2>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6" style={cellStyle}>
                      <span className="font-semibold">{isJapanese ? '調査方法について：' : 'Methodology note: '}</span>
                      {content.methodology[L]}
                    </p>
                    <div className="space-y-6">
                      {content.sources.map((group, gIdx) => (
                        <div key={gIdx}>
                          <h3 className="text-sm font-semibold mb-2">{group.group[L]}</h3>
                          <ul className="space-y-1.5 text-sm list-disc list-inside text-muted-foreground">
                            {group.links.map((link, lIdx) => (
                              <li key={lIdx} style={cellStyle}>
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
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

export default ThailandFlood2026;
