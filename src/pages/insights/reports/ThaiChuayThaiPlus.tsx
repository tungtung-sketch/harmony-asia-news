import React, { useState, useEffect } from 'react';
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
  ChevronRight, Crown, Database, Sparkles, Globe
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-thai-gov-policy.jpg';
import executiveImage from '@/assets/thai-chuay-thai-anutin.jpg';

const ThaiChuayThaiPlus = () => {
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

  const slug = 'thai-chuay-thai-plus-2026';
  const titleEn = "Thailand's 'Thais Help Thais Plus' Stimulus: Strategic Implications for Japanese Executives";
  const titleJa = 'タイ「タイ・チュワイ・タイ・プラス（Thai Chuay Thai Plus）」政策の全解剖 ── 中国企業の次の一手と、日系エグゼクティブが今知るべき戦略的含意';

  useEffect(() => {
    if (hasFullAccess && !hasLoggedView) {
      logView(slug, isJapanese ? titleJa : titleEn, 'services', lang);
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker(slug, titleEn, titleJa, 'Services', hasFullAccess);

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(slug, isJapanese ? titleJa : titleEn, 'services', lang);
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
    { id: 'executive-summary', label: isJapanese ? 'エグゼクティブサマリー' : 'Executive Summary' },
    { id: 'facts', label: isJapanese ? '施策の仕組みと対象チャネル' : 'Policy Mechanism & Eligible Channels' },
    { id: 'signals', label: isJapanese ? '主要インテリジェンスシグナル' : 'Key Intelligence Signals' },
    { id: 'macro-analysis', label: isJapanese ? 'マクロ・財政分析' : 'Macro & Fiscal Analysis' },
    { id: 'china-playbook', label: isJapanese ? '中国競合プレイブック' : 'China Competitive Playbook' },
    { id: 'sector-guide', label: isJapanese ? 'セクター別戦略判断' : 'Sector Decision Guide' },
    { id: 'next-actions', label: isJapanese ? '次のアクション' : 'Next Action Insights' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: { en: titleEn, ja: titleJa },
    subheadline: {
      en: "The government's 60/40 co-payment program opened June 1, 2026. With ฿175.7 billion targeting 43 million consumers over four months, this is the most consequential demand signal of the year — and Chinese competitors are already reading it.",
      ja: '政府の60/40コペイメントプログラムが2026年6月1日に開始。1,757億バーツが4ヵ月間で4,300万人の消費者に流れる——これは今年最も重要な需要シグナルであり、中国系競合はすでにこれを読み込んでいる。'
    },
    category: { en: 'Economic Policy / Consumer Markets / China Competition', ja: '経済政策 / 消費者市場 / 中国競合' },
    lastUpdated: '2026-06-01',

    executiveSummary: {
      en: [
        "Thailand's largest-ever co-payment stimulus: **฿175.7 billion** targeting **43.18 million** people over June–September 2026 at a **60/40** government-to-consumer subsidy ratio. Monthly government top-up of **฿1,000 per participant** (฿4,000 total). Effective stimulated consumption: **฿6,667 per person** if fully utilized.",
        "Modern trade is deliberately excluded: 7-Eleven, Big C, Lotus's, Makro, and major e-commerce platforms (Shopee, Lazada, TikTok Shop) are **ineligible for direct participation**. The demand wave flows exclusively to **small-format retail, local eateries, and Thong Fah stores**. If your key accounts are large-format, you are **outside the direct uplift** — but not unaffected.",
        "Chinese firms are the **key strategic variable**: independent economists estimate **15–20%** of co-payment spending leaks to Chinese-manufactured goods via legitimate Thai small shops. In automotive, Chinese brands command **46.8%** of the Thai market as of January 2026 — up from **20.2%** a year earlier — with **BYD outselling Toyota** in Bangkok Motor Show bookings. The consumption window accelerates a competition already underway."
      ],
      ja: [
        'タイ史上最大規模のコペイメント刺激策：2026年6月〜9月の4ヵ月間、**60/40**の政府・消費者補助比率で**4,318万人**を対象に**1,757億バーツ**を投下。参加者1人あたり月**1,000バーツ**の政府補助（計4,000バーツ）。全額活用時の実質消費誘発額は1人あたり**6,667バーツ**。',
        '大手流通は意図的に除外：7-Eleven・BigC・Lotus\'s・Makro、および主要ECプラットフォーム（Shopee・Lazada・TikTok Shop）は**直接参加対象外**。需要の波は**零細小売・地場飲食店・Thong Fah系列店のみ**に流れる——大型フォーマットが主要取引先の場合、直接的な恩恵は受けられないが、間接的影響は避けられない。',
        '中国系企業が**最大の戦略変数**：独立系エコノミストは刺激資金の**15〜20%**が合法的なタイの小売店経由で中国製品に流れると推計。自動車では中国ブランドが2026年1月時点でタイ市場の**46.8%**を占有（1年前は**20.2%**）、**BYDがバンコク・モーターショー受注でトヨタを上回る**。購買ウィンドウはすでに進行中の競争をさらに加速させる。'
      ]
    },

    policyTable: {
      title: { en: 'Program Parameters at a Glance', ja: 'プログラム主要パラメーター一覧' },
      data: {
        en: [
          { indicator: 'Subsidy Ratio', value: '60/40', detail: 'Government pays 60%, consumer pays 40%' },
          { indicator: 'Monthly Cap (Govt)', value: '฿1,000/month', detail: 'Max ฿200/day government contribution' },
          { indicator: 'Total Per Person', value: '฿4,000 (4 months)', detail: 'Max govt subsidy over the program' },
          { indicator: 'Effective Spend/Person', value: '฿6,667', detail: 'Total stimulated consumption if fully utilized' },
          { indicator: 'Total Budget', value: '฿175.7 billion', detail: 'Emergency energy-crisis borrowing decree' },
          { indicator: 'Total Participants', value: '43.18 million', detail: 'Largest co-payment program in Thai history' },
          { indicator: 'Program Duration', value: 'June 1 – Sept 30, 2026', detail: '4-month window, face-to-face QR only' },
          { indicator: 'Registered (General)', value: '26.5 million', detail: 'Via Pao Tang app, May 25–29' },
          { indicator: 'Auto-Enrolled', value: '13.18 million', detail: 'State Welfare Card holders, ฿700/month top-up' },
          { indicator: 'Payment System', value: 'Thung Ngern QR (ถุงเงิน)', detail: 'No online or intermediary payments allowed' },
        ],
        ja: [
          { indicator: '補助比率', value: '60/40', detail: '政府60%・消費者40%負担' },
          { indicator: '月次上限（政府）', value: '1,000バーツ/月', detail: '1日最大200バーツの政府補助' },
          { indicator: '1人あたり総額', value: '4,000バーツ（4ヵ月）', detail: 'プログラム期間中の最大政府補助' },
          { indicator: '実質消費誘発額', value: '6,667バーツ/人', detail: '補助を全額活用した場合の総消費額' },
          { indicator: '総予算', value: '1,757億バーツ', detail: '緊急エネルギー危機借入令で調達' },
          { indicator: '対象者総数', value: '4,318万人', detail: 'タイ史上最大規模のコペイメントプログラム' },
          { indicator: 'プログラム期間', value: '2026年6月1日〜9月30日', detail: '4ヵ月間、対面QR決済のみ' },
          { indicator: '一般登録者数', value: '2,650万人', detail: 'Pao Tangアプリ、5月25〜29日' },
          { indicator: '自動登録', value: '1,318万人', detail: '低所得者カード保有者、月700バーツ補助' },
          { indicator: '決済システム', value: 'Thung Ngern QR（ถุงเงิน）', detail: 'オンライン・仲介決済は一切不可' },
        ]
      }
    },

    channels: {
      eligible: {
        en: [
          'Small local eateries and general goods stores (annual revenue under ฿1.8 million)',
          'Community cooperative shops',
          'Government-branded Thong Fah (ธงฟ้า) outlets',
          'Food-delivery apps: Grab, LINE MAN, ShopeeFood, Robinhood — food & beverage cost only, not delivery fees (effective mid-June)',
        ],
        ja: [
          '零細小売店・地場飲食店（年間売上1.8百万バーツ未満）',
          'コミュニティ協同組合店舗',
          '政府系ブランド Thong Fah（ธงฟ้า）系列店',
          'フードデリバリーアプリ：Grab・LINE MAN・ShopeeFood・Robinhood——食品・飲料代のみ対象、配送料除外（6月中旬適用開始）',
        ]
      },
      excluded: {
        en: [
          'Modern trade chains: Big C, Lotus\'s, Makro',
          'Franchise convenience stores: 7-Eleven, FamilyMart',
          'E-commerce platforms: Shopee, Lazada, TikTok Shop',
          'Excluded products: alcohol, tobacco, lottery tickets, fuel, prepaid vouchers',
        ],
        ja: [
          '大手モダントレード：BigC・Lotus\'s・Makro',
          'フランチャイズコンビニ：7-Eleven・FamilyMart',
          'ECプラットフォーム：Shopee・Lazada・TikTok Shop',
          '対象外商品：酒類・タバコ・宝くじ・燃料・プリペイドバウチャー',
        ]
      }
    },

    macroAnalysis: {
      title: { en: 'The Fiscal Signal Behind the Stimulus', ja: '刺激策の背後にある財政シグナル' },
      intro: {
        en: "The following represents WaLens' independent analysis of the macro and political context of this program.",
        ja: '以下は本プログラムのマクロ・政治的背景に関するWaLensの独自分析です。'
      },
      points: {
        en: [
          { title: 'GDP Trajectory at Multi-Year Low — This Is Defensive Policy', content: "Thailand's 2026 GDP consensus clusters at **1.6–2.1%**, the lowest trajectory in years. Household debt stands at **86.8% of GDP** — the highest in ASEAN — and private consumption growth is forecast at just **2.3–2.5%** without intervention. The stimulus is not being launched from a position of strength; it is **a defensive measure**." },
          { title: '฿400 Billion Emergency Borrowing Ceiling — Fiscal Space Is Thin', content: "The **฿175.7 billion** program is funded via an emergency borrowing decree of up to **฿400 billion**, at a moment when public debt is approaching the **70% statutory ceiling**. This limits the government's ability to launch a larger successor program without significant political risk." },
          { title: 'Bhumjaithai Coalition Signal — Q4 Continuation Pressure Is Real', content: "PM Anutin's framing of the scheme as a personal political promise — with a **194-seat coalition** to maintain — creates predictable pressure for a **Q4 successor program** or extension. Probability: **moderate to high**, conditional on August–September consumption data." },
          { title: 'FY2027 Planning: Model Both Continuation and Demand Cliff', content: "Budget constraints and coalition fragility are structural limiters. Executive planning should model a **continuation scenario** (programme extension or successor) and a **demand-cliff scenario** (October spending normalisation) in equal measure." },
        ],
        ja: [
          { title: 'GDP軌道が数年来の低水準——これは防衛的政策', content: 'タイの2026年GDP予測は**1.6〜2.1%**で収束——数年来の最低水準。家計債務は**GDP比86.8%**（ASEAN最高水準）、介入なしの民間消費成長率は**2.3〜2.5%**にとどまる。本刺激策は財政的強さからの出動ではなく、**防衛的措置**である。' },
          { title: '4,000億バーツの緊急借入上限——財政余地は薄い', content: '**1,757億バーツ**のプログラムは最大**4,000億バーツ**の緊急借入令で調達——公的債務が法定上限**70%**に接近する局面での措置。財政的制約が大型後継プログラムを困難にしている。' },
          { title: 'プムジャイタイ連立のシグナル——Q4継続圧力は現実的', content: 'アヌティン首相が本施策を個人的政治的約束として位置付け、**194議席**連立の維持圧力から後継プログラムへの需要が生まれる。蓋然性：8〜9月の消費データ次第で**中〜高**。' },
          { title: 'FY2027計画：継続と需要崖の両シナリオを織り込め', content: '予算制約と連立の脆弱性が構造的制約要因。**継続シナリオ**（プログラム延長または後継）と**需要崖シナリオ**（10月の支出正常化）を等しくモデル化すること。' },
        ]
      }
    },

    chinaPlaybook: {
      title: { en: "China's Competitive Playbook", ja: '中国企業の競合プレイブック' },
      data: {
        en: [
          { factor: 'Automotive Market Share', value: '46.8% (Jan 2026)', change: 'Up from 20.2% (Jan 2025)', implication: 'BYD outsold Toyota in Bangkok Motor Show bookings; stimulus-period consumer wallets become key battleground' },
          { factor: 'BYD Rayong Plant', value: 'Operational (local production)', change: 'EV3.0 subsidy has expired', implication: 'Price-positioned ICE and EV portfolio actively targeting stimulus-supported consumers' },
          { factor: 'Goods Leakage Estimate', value: '15–20% of co-payment spend', change: 'Via legitimate Thai small shops', implication: 'Chinese-manufactured goods capture stimulus indirectly through eligible merchant channels' },
          { factor: 'E-Commerce Exclusion', value: 'Shopee, Lazada, TikTok Shop excluded', change: 'Direct scheme ineligible', implication: 'Alibaba/Chinese platforms likely supply wholesale to eligible small merchants as an indirect play' },
          { factor: 'Nominee Crackdown', value: 'Ongoing enforcement (Anutin 2 policy)', change: 'Chinese-operated stores face registration barriers', implication: 'Chinese goods flow via Thai-operated distribution; enforcement does not stop product penetration' },
        ],
        ja: [
          { factor: '自動車市場シェア', value: '46.8%（2026年1月）', change: '1年前の20.2%から急上昇', implication: 'BYDがバンコク・モーターショー受注でトヨタを上回る；刺激策期間の消費者財布が主戦場に' },
          { factor: 'BYDラヨーン工場', value: '稼働中（国内生産）', change: 'EV3.0補助期限切れ', implication: '刺激策支援の消費者を狙ったICE・EVポートフォリオの積極的な価格戦略' },
          { factor: '商品漏出推計', value: 'コペイメント支出の15〜20%', change: '合法的なタイ小売店経由', implication: '対象小規模商人チャネル経由で中国製品が刺激資金を間接的に獲得' },
          { factor: 'Eコマース除外', value: 'Shopee・Lazada・TikTok Shop対象外', change: '直接スキームから除外', implication: '中国系プラットフォームは対象店舗への卸売供給を通じた間接チャネル戦略に転換' },
          { factor: 'ノミニー取締', value: '継続的執行（アヌティン2政権の政策）', change: '中国人経営店舗は登録障壁に直面', implication: 'タイ系流通経由での商品流通が主流；執行が商品浸透を止めるわけではない' },
        ]
      }
    },

    sectorGuide: {
      title: { en: 'Sector-by-Sector Relevance & Priority Assessment', ja: 'セクター別関連性・優先度評価' },
      data: [
        {
          sector: { en: 'Consumer Goods / FMCG', ja: '消費財・FMCG' },
          relevance: { en: 'High — traditional trade uplift', ja: '高：伝統的小売の需要急増' },
          china: { en: 'High (shelf competition)', ja: '高（店頭競合）' },
          urgency: { en: 'Act Now', ja: '即対応' }, urgencyLevel: 'high',
          action: { en: 'Rebalance promotional budgets toward traditional trade; accelerate coverage of small-format stores; deploy consumer promotions timed to co-payment peak (June–Sept)', ja: 'プロモーション予算を伝統的小売に再配分；小規模店舗カバレッジ強化；コペイメントピークに合わせた消費者プロモーション展開（6〜9月）' }
        },
        {
          sector: { en: 'Food & Beverage', ja: '食品・飲料' },
          relevance: { en: 'High — small restaurants benefit directly', ja: '高：小規模飲食店が直接受益' },
          china: { en: 'Low', ja: '低' },
          urgency: { en: 'Act Now', ja: '即対応' }, urgencyLevel: 'high',
          action: { en: 'Activate food-delivery channel co-payment readiness (Grab/LINE MAN from mid-June); position home meal replacement portfolio for stay-at-home spending', ja: 'フードデリバリーのコペイメント対応起動（Grab/LINE MAN、6月中旬〜）；自宅内食需要向けポートフォリオを整備' }
        },
        {
          sector: { en: 'Automotive', ja: '自動車' },
          relevance: { en: 'Indirect — no direct subsidy access', ja: '間接：直接補助対象外' },
          china: { en: 'Critical (46.8% share)', ja: '深刻（46.8%シェア）' },
          urgency: { en: 'Strategic Priority', ja: '戦略的最優先' }, urgencyLevel: 'high',
          action: { en: 'Monitor if stimulus-supported income converts to discretionary auto purchases; track Chinese model pricing for Q3 launches; strengthen certified used-car and after-sales positioning', ja: '刺激支援所得が自動車購買の裁量支出に転換するか監視；Q3ローンチの中国モデル価格動向追跡；認定中古車・アフターサービスのポジショニングを強化' }
        },
        {
          sector: { en: 'Logistics & Distribution', ja: '物流・流通' },
          relevance: { en: 'Indirect — volume uplift through FMCG', ja: '間接：FMCG経由の出荷量増加' },
          china: { en: 'Medium', ja: '中' },
          urgency: { en: 'Monitor', ja: '継続監視' }, urgencyLevel: 'medium',
          action: { en: 'Prepare for FMCG replenishment spikes to traditional trade; optimize last-mile to small-format stores', ja: 'FMCG補充急増への対応準備；小規模店舗へのラストマイルを最適化' }
        },
        {
          sector: { en: 'Machinery / Industrial B2B', ja: '機械・産業B2B' },
          relevance: { en: 'Indirect — lagged transmission', ja: '間接：時間差での波及' },
          china: { en: 'Low', ja: '低' },
          urgency: { en: 'Watch', ja: '経過観察' }, urgencyLevel: 'low',
          action: { en: 'No immediate action; monitor downstream signals from food processing and light manufacturing in Q3', ja: '即時対応不要；Q3の食品加工・軽工業の下流需要シグナルを監視' }
        },
      ]
    },

    nextActions: {
      title: { en: 'Next Action Insights for Japanese Executives', ja: '日系エグゼクティブへの次のアクション' },
      horizons: {
        en: [
          {
            label: 'Right Now (June)',
            actions: [
              'Audit traditional trade distribution coverage — confirm which small-format partners are registered on Thung Ngern (ถุงเงิน)',
              'Reallocate Q2/Q3 trade-marketing budgets toward traditional trade and food-delivery platforms',
              'Brief Thai country teams on the 46.8% Chinese automotive share figure and set sector-specific monitoring triggers',
            ]
          },
          {
            label: 'By End of June',
            actions: [
              'Activate food-delivery channel co-payment readiness (Grab / LINE MAN launch from mid-June)',
              'Set up partner distributor support packages for eligible small merchants in your supply chain',
              'Establish a weekly China competitor monitoring cadence — price and promotional tracking by sector',
            ]
          },
          {
            label: 'Q3 & Q4 2026',
            actions: [
              'Run a demand-cliff assessment for October: what % of Q3 uplift is sustainable vs. stimulus-induced?',
              'Watch FY2027 budget signals for a possible successor program (Anutin coalition political incentives remain elevated)',
              'Produce a Chinese competitor post-mortem for the program period — input into long-horizon strategy',
            ]
          }
        ],
        ja: [
          {
            label: '今すぐ（6月）',
            actions: [
              '伝統的小売流通カバレッジを監査——どの小規模パートナーがThung Ngern（ถุงเงิน）に登録済みかを確認',
              'Q2/Q3の取引・マーケティング予算を伝統的小売・フードデリバリーへ再配分',
              'タイ現地チームに中国自動車シェア46.8%をブリーフィング、セクター別モニタリングトリガーを設定',
            ]
          },
          {
            label: '6月末まで',
            actions: [
              'フードデリバリーのコペイメント対応を起動（Grab/LINE MAN、6月中旬〜）',
              'サプライチェーン内の対象小規模商人向けパートナー支援パッケージを設定',
              '中国競合の週次モニタリング体制を確立——セクター別の価格・プロモーション追跡',
            ]
          },
          {
            label: 'Q3〜Q4 2026',
            actions: [
              '10月以降の需要崖評価：Q3上昇のうち何%が持続的で、何%が刺激策誘発か？',
              'FY2027予算のシグナルを注視（アヌティン連立の政治的インセンティブが引き続き高い）',
              'プログラム期間中の中国競合動向を振り返り、長期戦略へのインプットとする',
            ]
          }
        ]
      }
    },

    sources: [
      'Thai Cabinet Resolution — Thai Chuay Thai Plus Program Approval (May 19, 2026)',
      'Bank of Thailand — Household Debt to GDP Statistics Q1 2026',
      'National Economic and Social Development Council (NESDC) — GDP Outlook 2026',
      'Fiscal Policy Office (Ministry of Finance) — Public Debt Management Report 2026',
      'Bangkok Post — Thai Chuay Thai Plus Registration & Implementation Coverage',
      'Pao Tang App / Digital Economy Promotion Agency — Program Registration Data (May 2026)',
      'Krungthai COMPASS — Consumer Market Impact Assessment, June 2026',
      'CIMB Thai Research — Stimulus Program Multiplier Estimates',
      'The Nation Thailand — Chinese Brand Automotive Market Share Data (January 2026)',
      'Bangkok International Motor Show — BYD vs. Toyota Booking Data (March 2026)',
      'Nikkei Asia — Chinese Manufacturers Thailand Production Strategy',
      'Kasikorn Research Center — GDP Growth Forecast Thailand 2026',
      'JCCB Business Sentiment Survey — Q1 2026 Thailand',
      'Photo: The Standard (thestandard.co) — "นายกฯ ปลื้มคนแห่ลงทะเบียน ไทยช่วยไทย พลัส", May 2026',
    ]
  };

  const urgencyVariant = (level: string) => {
    if (level === 'high') return 'destructive';
    if (level === 'medium') return 'secondary';
    return 'outline';
  };

  return (
    <>
      <SEO
        title={isJapanese ? titleJa + ' | WaLens' : "Thailand's Thai Chuay Thai Plus Stimulus: Strategic Implications for Japanese Executives | WaLens"}
        description={isJapanese
          ? 'タイ政府の消費刺激策「คนละครึ่งพลัส」の全解剖。中国企業の動向、セクター別戦略判断、そして日系エグゼクティブの次の一手。WaLensプレミアムレポート。'
          : "Thailand's ฿175.7 billion 60/40 co-payment stimulus: channel dynamics, Chinese competitive moves, sector decision guide, and next actions for Japanese executives."
        }
        canonicalPath="/insights/economic-policy/thai-chuay-thai-plus-2026"
      />
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero */}
        <section className="relative w-full h-[340px] md:h-[420px] flex items-end overflow-hidden">
          <img src={heroImage} alt="Thailand Thai Chuay Thai Plus Stimulus Strategic Analysis" className="absolute inset-0 w-full h-full object-cover z-0" />
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
                  url: `/insights/economic-policy/${slug}`,
                  category: 'Services'
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
            { label: isJapanese ? '経済政策' : 'Economic Policy', href: '/insights?filter=services' },
            { label: isJapanese ? 'タイ・チュワイ・タイ・プラス' : 'Thai Chuay Thai Plus' }
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
                      <span className="text-sm leading-relaxed" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{renderBold(point)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Executive Photo */}
          <figure className="mb-12 rounded-lg overflow-hidden border">
            <img
              src={executiveImage}
              alt="PM Anutin Charnvirakul discusses the Thai Chuay Thai Plus stimulus program at a press conference"
              className="w-full h-auto"
            />
            <figcaption className="px-4 py-3 text-xs text-muted-foreground bg-muted/50 leading-relaxed">
              {isJapanese
                ? 'アヌティン・チャーンウィーラクン首相、「タイ・チュワイ・タイ・プラス」刺激策に関する記者会見にて。'
                : 'PM Anutin Charnvirakul at a press conference on the Thai Chuay Thai Plus stimulus program.'
              }
              {' '}
              <span>Photo: The Standard (thestandard.co), May 2026.</span>
            </figcaption>
          </figure>

          {/* Policy Mechanism & Channels */}
          <section id="facts" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Database className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{isJapanese ? '施策の仕組みと対象チャネル' : 'Policy Mechanism & Eligible Channels'}</h2>
                <p className="text-sm text-muted-foreground">{isJapanese ? 'プログラム詳細データ' : 'Program data'}</p>
              </div>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  {content.policyTable.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '指標' : 'Parameter'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '数値' : 'Value'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '詳細' : 'Detail'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.policyTable.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.indicator}</td>
                          <td className="py-3 pr-4 font-semibold text-primary" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.value}</td>
                          <td className="py-3 text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.detail}</td>
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
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    {isJapanese ? '対象チャネル' : 'Eligible Channels'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {content.channels.eligible[isJapanese ? 'ja' : 'en'].map((item, idx) => (
                      <li key={idx} className="flex gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    {isJapanese ? '除外チャネル' : 'Excluded Channels'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {content.channels.excluded[isJapanese ? 'ja' : 'en'].map((item, idx) => (
                      <li key={idx} className="flex gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
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
                <p className="text-sm text-muted-foreground">{isJapanese ? '外資系企業が今読むべき3つのシグナル' : 'Three signals every executive should track now'}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    {isJapanese ? '機会' : 'Opportunity'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
                    {isJapanese
                      ? <>草の根消費が加速し、チャネルは<strong className="font-semibold text-foreground">伝統的小売</strong>となる。ウェットマーケット・独立系小規模店舗・地場レストランが最も直接的な恩恵を受ける。これらのチャネルに流通網を持つ企業は<strong className="font-semibold text-foreground">Q4前の4ヵ月間の需要急増</strong>を取り込める。</>
                      : <>Grassroots consumer spending is accelerating — and the channel is <strong className="font-semibold text-foreground">traditional trade</strong>. Wet markets, small stores, and local restaurants see the most direct uplift. Companies with distribution reach into these channels can capture a <strong className="font-semibold text-foreground">4-month demand surge</strong> before Q4.</>
                    }
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    {isJapanese ? '注意' : 'Caution'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
                    {isJapanese
                      ? <>制度設計が<strong className="font-semibold text-foreground">意図的なチャネル歪曲</strong>を生み出している。コンビニ・大型店の除外は政策的選択であり、補助付き需要を<strong className="font-semibold text-foreground">小規模商店へ誘導</strong>する。大型フォーマットを主要取引先とする企業はプログラム期間中に相対的逆風を受ける。</>
                      : <>The scheme creates <strong className="font-semibold text-foreground">deliberate channel distortion</strong>. The exclusion of convenience chains and hypermarkets is a policy choice routing subsidized demand toward <strong className="font-semibold text-foreground">small merchants</strong>. Companies whose core Thai accounts are large-format retail face a relative drag during the program.</>
                    }
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="h-4 w-4 text-red-500" />
                    {isJapanese ? '戦略的注視' : 'Strategic Watch'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
                    {isJapanese
                      ? <>中国系企業はすでにこの需要を取り込む態勢を整えている。刺激資金の<strong className="font-semibold text-foreground">15〜20%</strong>が中国製品に流れると推計。自動車では中国ブランドが<strong className="font-semibold text-foreground">46.8%</strong>を占有——購買ウィンドウはすでに進行中の競争を加速させる。</>
                      : <>Chinese firms are positioned to intercept this demand. Economists estimate <strong className="font-semibold text-foreground">15–20%</strong> of co-payment spending flows to Chinese-manufactured goods. In automotive, Chinese brands hold <strong className="font-semibold text-foreground">46.8%</strong> of the Thai market — the consumption window accelerates an ongoing competition.</>
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
                      ? 'マクロ・財政分析、中国競合プレイブック、セクター別戦略判断、次のアクションを含む完全版レポートにアクセスするにはプレミアムプランが必要です。'
                      : 'The full macro & fiscal analysis, China competitive playbook, sector decision guide, and next action insights require a premium subscription.'
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
              {/* Macro & Fiscal Analysis */}
              <section id="macro-analysis" className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Lightbulb className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{content.macroAnalysis.title[isJapanese ? 'ja' : 'en']}</h2>
                    <p className="text-sm text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{content.macroAnalysis.intro[isJapanese ? 'ja' : 'en']}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {content.macroAnalysis.points[isJapanese ? 'ja' : 'en'].map((point, idx) => (
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

              {/* China Competitive Playbook */}
              <section id="china-playbook" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <Shield className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{content.chinaPlaybook.title[isJapanese ? 'ja' : 'en']}</h2>
                  </div>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {content.chinaPlaybook.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <div key={idx} className="border-l-2 border-red-500/30 pl-4">
                          <h4 className="font-semibold text-sm mb-1" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{row.factor}</h4>
                          <p className="text-sm text-muted-foreground mb-1" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
                            <span className="font-medium text-foreground">{isJapanese ? '数値：' : 'Value: '}</span>{row.value}
                            {row.change && <span className="ml-2 text-xs">({row.change})</span>}
                          </p>
                          <p className="text-sm text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
                            <span className="font-medium text-foreground">{isJapanese ? '含意：' : 'Implication: '}</span>{row.implication}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Sector Decision Guide */}
              <section id="sector-guide" className="mb-12">
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
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant={urgencyVariant(row.urgencyLevel) as 'destructive' | 'secondary' | 'outline'}>
                              {row.urgency[isJapanese ? 'ja' : 'en']}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {isJapanese ? '中国露出：' : 'China: '}{row.china[isJapanese ? 'ja' : 'en']}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground mb-2" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
                          <span className="font-medium text-foreground">{isJapanese ? '直接関連度：' : 'Relevance: '}</span>{row.relevance[isJapanese ? 'ja' : 'en']}
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
                          <span className="font-medium text-foreground">{isJapanese ? '推奨アクション：' : 'Action: '}</span>{row.action[isJapanese ? 'ja' : 'en']}
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

export default ThaiChuayThaiPlus;
