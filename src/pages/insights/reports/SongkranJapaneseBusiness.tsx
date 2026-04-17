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
import {
  FileText, TrendingUp, TrendingDown, Shield, AlertTriangle,
  CheckCircle, BookOpen, Lock, Lightbulb, Eye,
  ChevronRight, Crown, Database, Truck, Users, ShoppingBag, Heart, Sparkles
} from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { BookmarkButton } from '@/components/BookmarkButton';
import { useInsightReadingHistoryTracker } from '@/hooks/useInsightReadingHistoryTracker';
import { FloatingNavButton } from '@/components/insights/FloatingNavButton';
import { FurtherInquiryNotice } from '@/components/insights/FurtherInquiryNotice';
import heroImage from '@/assets/hero-songkran-japanese-business.jpg';

const SongkranJapaneseBusiness = () => {
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
        'songkran-japanese-business',
        isJapanese ? 'ソンクラン祭：タイにおける日系企業の戦略的必須事項' : 'Songkran Festival: Strategic Imperatives for Japanese Enterprises in Thailand',
        'services',
        lang
      );
      setHasLoggedView(true);
    }
  }, [hasFullAccess, hasLoggedView, logView, isJapanese, lang]);

  useInsightReadingHistoryTracker(
    'songkran-japanese-business',
    'Songkran Festival: Strategic Imperatives for Japanese Enterprises',
    'ソンクラン祭：日系企業の戦略的必須事項',
    'Services',
    hasFullAccess
  );

  const handleDataAppendixAccess = () => {
    if (hasFullAccess) {
      logDataAccess(
        'songkran-japanese-business',
        isJapanese ? 'ソンクラン祭：日系企業の戦略的必須事項' : 'Songkran Festival: Strategic Imperatives for Japanese Enterprises',
        'services',
        lang
      );
    }
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTOC = () => {
    document.getElementById('table-of-contents')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tocSections = [
    { id: 'executive-summary', label: isJapanese ? 'エグゼクティブサマリー' : 'Executive Summary' },
    { id: 'facts', label: isJapanese ? '市場・政策・動向に関する情報' : 'Market, Policy & Trends Information' },
    { id: 'opinion', label: isJapanese ? 'WaLensの見解と示唆' : 'Opinion & Implication from WaLens' },
    { id: 'recommendation', label: isJapanese ? '日本企業経営者への提言' : 'Recommendation for Japanese Executives' },
    { id: 'data-appendix', label: isJapanese ? 'データ付録' : 'Data Appendix' },
    { id: 'sources', label: isJapanese ? '出典' : 'Sources' },
  ];

  const content = {
    headline: {
      en: "Songkran Festival: Strategic Imperatives for Japanese Enterprises in Thailand",
      ja: "ソンクラン祭：タイにおける日系企業の経済・運営・文化パラダイム戦略"
    },
    subheadline: {
      en: "Navigating the macroeconomic, operational, marketing, and cross-cultural workforce realities of Thailand's most pivotal annual inflection point",
      ja: "タイ最大の年次変曲点における、マクロ経済・サプライチェーン・マーケティング・人的資本の現実をどう乗り越えるか"
    },
    category: {
      en: "Cross-Cultural Strategy / Operations / Workforce / Marketing",
      ja: "異文化戦略 / オペレーション / 労務 / マーケティング"
    },
    lastUpdated: "2026-04-17",

    executiveSummary: {
      en: [
        "Songkran 2026 is projected to generate THB 30.35–30.4 billion in tourism revenue (+6% YoY), with 5.96 million domestic trips and 500,000 international arrivals — yet macro-cautious spending may cap actual circulation at THB 130 billion versus a potential THB 134 billion.",
        "Japanese business sentiment (JCCB) rebounded to a Diffusion Index of +1 in H1 2026 (up from -12 in H2 2025); 23% of firms plan to expand investment, but ~50% report negative or uncertain impact from US tariff measures.",
        "Consumer behavior bifurcates: 84% plan to maintain or reduce general spending, yet 69% are willing to premiumize ingredients for at-home Shabu/Moo Kata gatherings — directly favoring Don Don Donki, Aeon, Daiso and Nitori formats.",
        "Operational paralysis during the 'Seven Dangerous Days': 10.65 million vehicles enter/exit Bangkok, 18.58 million public transport trips (+10–14%), localized truck bans (e.g. Samut Prakan Wan Lai April 19 & 26), forcing suspension of Just-In-Time inventory.",
        "Thailand–Cambodia border closures jeopardize the 'Thailand Plus One' model: 29% of Japanese firms face longer lead times, 24% higher logistics costs, prompting 23% to shift to sea freight and 14% to reroute via Laos/Vietnam.",
        "Post-Songkran resignation wave intersects with the Daikin Amata lockout precedent (1,300 workers): bonus expectations are de facto contractual under Thai Supreme Court precedent, despite no statutory 13th-month requirement."
      ],
      ja: [
        "2026年ソンクランは観光収入300.35〜304億バーツ（前年比+6%）を見込む。国内旅行596万件、外国人訪問者50万人。ただしマクロ的な支出抑制により、実際の流通額はポテンシャル1,340億バーツに対し1,300億バーツに留まる可能性。",
        "日系企業景況感（JCCB）は2026年上半期の景況感指数（DI）が+1へ回復（2025年下半期は-12）。23%が投資拡大を計画する一方、約50%が米国相互関税措置によるマイナスまたは不透明な影響を報告。",
        "消費行動の二極化：84%が一般支出の維持または削減を計画する一方、69%が自宅シャブ・ムーガタ用の高級食材へのプレミアム支出を許容——Don Don Donki、Aeon、Daiso、ニトリのフォーマットに直接的に有利。",
        "「セブン・デンジャラス・デイズ」期間中の運営麻痺：バンコク出入車両1,065万台、公共交通利用1,858万件（前年比+10〜14%）、サムットプラカンWan Lai（4月19日・26日）等の局所的トラック規制——JIT在庫の一時停止を強制。",
        "タイ・カンボジア国境閉鎖が「Thailand Plus One」モデルを脅かす：日系企業の29%がリードタイム長期化、24%が物流コスト増加に直面、23%が海上輸送へシフト、14%がラオス・ベトナム経由へ再ルーティング。",
        "ソンクラン後の離職ラッシュとDaikin Amataロックアウト先例（1,300名）の交差：法定13ヶ月給与は存在しないにもかかわらず、ボーナス期待値はタイ最高裁判例により事実上の契約上の義務。"
      ]
    },

    macroeconomic: {
      title: { en: "Macroeconomic & Tourism Indicators (Songkran 2026)", ja: "マクロ経済・観光指標（ソンクラン2026）" },
      data: {
        en: [
          { indicator: "Total Festival Revenue", value: "THB 30.35–30.4 Bn", growth: "+6.0% YoY", driver: "Combined domestic mobility & foreign arrivals" },
          { indicator: "Domestic Travel Trips", value: "5.96 million", growth: "+7.0%", driver: "Extended holiday declarations, government stimulus" },
          { indicator: "Domestic Revenue", value: "THB 22.25 Bn", growth: "+8.0%", driver: "At-home celebrations, regional travel" },
          { indicator: "International Tourists", value: "500,000", growth: "+4.0% volume / +2.0% value", driver: "Short-haul Asia (China, India, Malaysia)" },
          { indicator: "Airport Passenger Traffic", value: "3.7 million", growth: "+2.3%", driver: "AOT enhanced processing, multi-lingual support" },
          { indicator: "Bangkok Vehicle Entry/Exit", value: "10.65 million", growth: "—", driver: "Mass exodus to home provinces" },
          { indicator: "Actual Circulating Money", value: "THB 130 Bn (vs. potential 134 Bn)", growth: "Cautious", driver: "Middle East energy crisis, inflation 2.0–2.5%" }
        ],
        ja: [
          { indicator: "祭典総収入", value: "303.5〜304億バーツ", growth: "前年比+6.0%", driver: "国内移動と外国人到着の合算" },
          { indicator: "国内旅行件数", value: "596万件", growth: "+7.0%", driver: "祝日延長宣言、政府刺激策" },
          { indicator: "国内収入", value: "222.5億バーツ", growth: "+8.0%", driver: "自宅祝祭、地方旅行" },
          { indicator: "外国人観光客", value: "50万人", growth: "数量+4.0% / 金額+2.0%", driver: "短距離アジア（中国、インド、マレーシア）" },
          { indicator: "空港旅客数", value: "370万人", growth: "+2.3%", driver: "AOT処理能力強化、多言語対応" },
          { indicator: "バンコク出入車両数", value: "1,065万台", growth: "—", driver: "故郷への大規模帰省" },
          { indicator: "実際の流通額", value: "1,300億バーツ（潜在1,340億）", growth: "慎重", driver: "中東エネルギー危機、インフレ2.0〜2.5%" }
        ]
      }
    },

    jccbSurvey: {
      title: { en: "JCCB Japanese Business Sentiment Survey (H1 2026)", ja: "JCCB日系企業景況感調査（2026年上半期）" },
      data: {
        en: [
          { metric: "Diffusion Index (DI)", value: "+1 (rebound from -12 in H2 2025)", implication: "Cautious optimism after automotive-led contraction" },
          { metric: "Plan to Increase Capital Investment", value: "23%", implication: "Focus on electric/electronic, transport, chemicals" },
          { metric: "Expect No Change in Investment", value: "43%", implication: "Maintenance of current footprint amid uncertainty" },
          { metric: "Plan to Decrease Investment", value: "19%", implication: "Consolidation or shift to 'Plus One' nations" },
          { metric: "Expect Increase in Exports", value: "35%", implication: "Targeting India, Indonesia, Vietnam" },
          { metric: "Unaffected by US Tariffs", value: "44%", implication: "Supply chains insulated from US-China friction" },
          { metric: "Negative/Uncertain Tariff Impact", value: "~50%", implication: "Supply chain audit and diversification required" }
        ],
        ja: [
          { metric: "景況感指数（DI）", value: "+1（2025年下半期-12からの回復）", implication: "自動車主導の縮小後の慎重な楽観" },
          { metric: "資本投資拡大計画", value: "23%", implication: "電気・電子、輸送機械、化学に注力" },
          { metric: "投資変化なし見込み", value: "43%", implication: "不確実性下での現状維持" },
          { metric: "投資削減計画", value: "19%", implication: "整理統合または「Plus One」諸国への移行" },
          { metric: "輸出増加見込み", value: "35%", implication: "インド、インドネシア、ベトナムを標的" },
          { metric: "米国関税の影響なし", value: "44%", implication: "サプライチェーンが米中摩擦から隔離" },
          { metric: "関税のマイナス・不透明影響", value: "約50%", implication: "サプライチェーン監査・多角化が必要" }
        ]
      }
    },

    consumerBehavior: {
      title: { en: "Consumer Spending Polarization (At-Home Premiumization)", ja: "消費支出の二極化（自宅プレミアム化）" },
      data: {
        en: [
          { category: "Total Festival Budget", trend: "33% spend THB 1,000–2,999; 13% under THB 500", strategy: "Value bundles & 0% installment promotions" },
          { category: "At-Home Party Ingredients", trend: "69% willing to spend more on premium items", strategy: "Expand high-grade meats, seafood, imported Japanese goods" },
          { category: "Culinary Preferences", trend: "55% choose Shabu / BBQ / Moo Kata", strategy: "Cross-merchandise hot-pot kit + premium fresh ingredients" },
          { category: "Private Label Confidence", trend: "35% see private labels as equal/superior to name brands", strategy: "Emphasize in-house brand quality story" },
          { category: "Dining Out", trend: "59% increase casual dining; 39% fine dining", strategy: "Mall partnerships for dining tax rebates and vouchers" }
        ],
        ja: [
          { category: "祭典総予算", trend: "33%が1,000〜2,999バーツ、13%が500バーツ未満", strategy: "バリューバンドル＆0%分割プロモーション" },
          { category: "自宅パーティ食材", trend: "69%が高級品への追加支出許容", strategy: "高級肉、海鮮、日本産輸入食材の在庫拡張" },
          { category: "料理嗜好", trend: "55%がシャブ／BBQ／ムーガタを選択", strategy: "鍋セット＋プレミアム食材のクロスマーチャンダイジング" },
          { category: "プライベートブランド信頼", trend: "35%がプライベートブランドを名門ブランド同等以上と評価", strategy: "自社ブランドの品質ストーリーを強調" },
          { category: "外食", trend: "59%がカジュアルダイニング増加、39%がファインダイニング", strategy: "モール提携による飲食税控除・バウチャーキャンペーン" }
        ]
      }
    },

    supplyChain: {
      title: { en: "Supply Chain Disruption & BCP Strategic Mitigation", ja: "サプライチェーン混乱とBCP戦略的緩和策" },
      data: {
        en: [
          { factor: "Domestic 'Seven Dangerous Days'", impact: "Gridlocked highways, accident surge (>150 fatalities in first 4 days), delayed local deliveries", mitigation: "Suspend JIT manufacturing; build pre-festival inventory buffers (start late February)" },
          { factor: "Localized Truck Bans (Samut Prakan)", impact: "Complete loss of access to industrial estates on April 19 & 26 (Wan Lai)", mitigation: "Audit municipal announcements; adjust shipping schedules around late-Songkran dates" },
          { factor: "Thai-Cambodian Border Closures", impact: "29% face longer lead times; 24% face higher costs; threatens Thailand Plus One model", mitigation: "Shift to maritime freight (23% of firms); reroute via Laos/Vietnam (14%)" },
          { factor: "Global Fuel Price Volatility", impact: "Increased overland transport costs; squeezed operational margins", mitigation: "Leverage government-mandated free tolls; optimize route planning via GPS monitoring" }
        ],
        ja: [
          { factor: "国内「セブン・デンジャラス・デイズ」", impact: "高速道路渋滞、事故急増（最初の4日で150名以上死亡）、地方配送遅延", mitigation: "JIT製造を一時停止；祭典前在庫バッファを構築（2月下旬から開始）" },
          { factor: "局所的トラック規制（サムットプラカン）", impact: "4月19日・26日（Wan Lai）の工業団地への完全アクセス喪失", mitigation: "市町村告示を監査；ソンクラン後半日程を回避するよう出荷スケジュール調整" },
          { factor: "タイ・カンボジア国境閉鎖", impact: "29%がリードタイム長期化、24%がコスト増、Thailand Plus Oneモデルを脅かす", mitigation: "海上輸送へシフト（23%）；ラオス・ベトナム経由へ再ルーティング（14%）" },
          { factor: "世界的燃料価格変動", impact: "陸上輸送コスト増、運営利益率圧迫", mitigation: "政府指定の無料通行料を活用；GPS監視でルート計画を最適化" }
        ]
      }
    },

    laborDispute: {
      title: { en: "Daikin Amata Labor Dispute Case Study (Bonus Conflict Pattern)", ja: "Daikin Amata労使紛争事例（ボーナス対立パターン）" },
      data: {
        en: [
          { parameter: "Salary Multiplier", offer: "5 months", demand: "8 months", driver: "Union cited THB 5.9 Bn corporate profit" },
          { parameter: "Additional Cash Payout", offer: "THB 12,000", demand: "THB 24,000", driver: "Inflationary pressures and rising cost of living" },
          { parameter: "Long-Service Reward", offer: "Cancelled gold tradition", demand: "3-baht weight gold", driver: "Preservation of historical benefits and seniority respect" },
          { parameter: "Outcome", offer: "Deadlock", demand: "Deadlock", driver: "Employer executed legal lockout of 1,300 employees" }
        ],
        ja: [
          { parameter: "給与倍率", offer: "5ヶ月", demand: "8ヶ月", driver: "労組が59億バーツの企業利益を指摘" },
          { parameter: "追加現金支給", offer: "12,000バーツ", demand: "24,000バーツ", driver: "インフレ圧力と生活費上昇" },
          { parameter: "長期勤続報酬", offer: "金支給伝統廃止", demand: "金3バーツ重", driver: "歴史的便益と年功尊重の保持" },
          { parameter: "交渉結果", offer: "膠着", demand: "膠着", driver: "雇用者が1,300名の合法ロックアウトを執行" }
        ]
      }
    },

    opportunities: {
      en: [
        "At-home premiumization windfall: Don Don Donki, Aeon, Daiso and Nitori capture the 69% who upgrade ingredients for Shabu/Moo Kata — pair fresh meat/seafood SKUs with hot-pot equipment cross-merchandising.",
        "Functional apparel positioning: Replicate the Uniqlo 'Made for All' playbook — UV Protection, AIRism, Heattech climate-appropriate lines outperform single-use Songkran novelty.",
        "Cultural luxury integration: Loewe's Dok Khoon charm proves that authentic Thai cultural symbols (national flowers, yadom inhalers) drive recall across all price tiers.",
        "Pre-Songkran retention investment: Stay-interviews + transparent bonus communication in late Q1 dramatically reduce post-holiday Gen Z attrition (currently 56% expect 1–2 year tenure).",
        "CSR-as-brand: Toyota Mobility 'KUB-DEE-DAI-DEE' campaign and Sumitomo Mitsui's anti-drink-driving partnerships convert national tragedy into authentic goodwill, neutralizing the 'foreign extractor' stereotype."
      ],
      ja: [
        "自宅プレミアム化の追い風：Don Don Donki、Aeon、Daiso、ニトリがシャブ／ムーガタ用に食材を高級化する69%層を獲得——鮮魚・精肉SKUと鍋具のクロスマーチャンダイジングで相乗効果。",
        "機能性アパレルのポジショニング：ユニクロ「Made for All」戦略を再現——UVプロテクション、AIRism、ヒートテックの気候適応ラインが使い捨てのソンクラン特化商品を凌駕。",
        "文化的ラグジュアリー統合：Loewe「Dok Khoon」チャームが、本物のタイ文化象徴（国花、ヤードム吸入器）が全価格帯で記憶定着を生むことを実証。",
        "ソンクラン前のリテンション投資：第1四半期末のステイインタビュー＋透明なボーナス開示で、休暇後Z世代の離職を劇的に削減（現状56%が1〜2年勤続を想定）。",
        "ブランドとしてのCSR：トヨタモビリティ「KUB-DEE-DAI-DEE」キャンペーンと住友三井オートリースの飲酒運転防止提携が、国家的悲劇を真正なグッドウィルへ転換し「外国搾取者」ステレオタイプを中和。"
      ]
    },

    risks: {
      en: [
        "JIT supply chain rupture: Domestic gridlock + Thai-Cambodian border closures + global fuel volatility create a triple-vulnerability period if BCP buffers are not pre-built by late February.",
        "Daikin-style lockout precedent: Unilateral last-minute bonus reductions risk wildcat strikes — Thai Supreme Court treats consistent multi-year bonus payments as implied contractual obligations.",
        "Post-Songkran 'Quitfluencer' wave: 70% reassess employment when colleagues quit, with 50% leaving within a year — Gen Z (56% planning 1–2 year tenure) amplifies the cascade.",
        "Holiday labor cost explosion: Statutory holiday work pays 200% of standard wage; overtime on a holiday pays 300% — denying leave triggers resentment, granting it requires expensive coverage.",
        "Cultural Kreng-jai misread: Thai workers nodding to preserve harmony during QC circles or job rotation pushes lead Japanese managers to misinterpret silent disagreement as consent."
      ],
      ja: [
        "JITサプライチェーン破綻：国内渋滞＋タイ・カンボジア国境閉鎖＋世界燃料変動が、2月下旬までにBCPバッファを構築しない企業に三重脆弱性期間を生む。",
        "Daikin型ロックアウト前例：直前の一方的ボーナス削減はWildcatストライキを誘発——タイ最高裁は複数年継続したボーナス支給を黙示的契約上の義務と判断。",
        "ソンクラン後の「Quitfluencer」波：同僚が退職すると70%が雇用を再評価、50%が1年以内に退職——Z世代（56%が1〜2年勤続想定）がカスケードを増幅。",
        "祝日労務コスト爆発：祝日労働は標準賃金の200%、祝日残業は300%——休暇拒否は怨恨を、付与は高額カバレッジを要求。",
        "Kreng-jai文化の誤読：QCサークルや配置転換時にタイ人労働者が和を保つために頷く行動を、日本人管理職が無言の同意と誤解。"
      ]
    },

    opinion: {
      title: { en: "WaLens Analysis: Strategic Interpretation", ja: "WaLensの分析：戦略的解釈" },
      intro: {
        en: "The following represents WaLens' independent analysis based on the facts presented above. These are interpretive observations, not objective data points.",
        ja: "以下は上記のファクトに基づくWaLensの独自分析です。これらは解釈的な見解であり、客観的なデータポイントではありません。"
      },
      points: {
        en: [
          {
            title: "Songkran Is the Annual Stress Test of Japanese Management Orthodoxy",
            content: "JIT, Nemawashi, Kaizen, and lifetime employment — the four pillars of Toyota-style management — all fracture under Songkran conditions. Firms that recognize April as a designed-in failure mode of the Japanese operating system (rather than an unfortunate annual surprise) build resilience into their Q2 planning. Those that don't will repeat the same buffer-stock scramble, the same labor dispute escalation, and the same talent attrition cycle every twelve months."
          },
          {
            title: "At-Home Premiumization Is the New Battleground — Not Foot Traffic",
            content: "The paradox of Songkran 2026 is that 84% reduce general spending while 69% upgrade home-cooking ingredients. This destroys the conventional retail playbook of mall-based discount blitzes and rewards the Donki / Aeon / Daiso model: high-frequency neighborhood penetration, integrated delivery (Grab), and curated premium SKUs. Japanese FMCG firms still optimizing for hypermarket traffic are fighting yesterday's war."
          },
          {
            title: "The 'Bonus Discretionary' Clause Is a Trap, Not a Shield",
            content: "Tokyo HR teams reading Thai employment contracts see 'discretionary bonus' and assume Japanese-style flexibility. Thai Supreme Court precedent has converted multi-year consistent payments into implied contractual obligations — Daikin learned this with a 1,300-person lockout. Treat Thai bonus pools as fixed compensation lines, not variable incentive expense, and budget accordingly."
          },
          {
            title: "Gen Z Loyalty Cannot Be Bought With Salaryman Promises",
            content: "When 56% of Thai Gen Z plan only 1–2 years of tenure and 54% prioritize remote-work flexibility, the Japanese promotional ladder of seniority + lifetime employment is no longer the retention currency it was for Generation X. Companies that combine flexible work models, swift career progression, and visible CSR (especially around Songkran road safety) outperform peers by significant margins on retention."
          }
        ],
        ja: [
          {
            title: "ソンクランは日本式経営正統性の年次ストレステスト",
            content: "JIT、根回し、改善、終身雇用——トヨタ式経営の四本柱——のすべてがソンクラン条件下で割れる。4月を「不運な年次サプライズ」ではなく「日本式オペレーティングシステムの設計上の障害モード」と認識する企業が、第2四半期計画に強靭性を組み込む。そうしない企業は12ヶ月ごとに同じバッファストック争奪、同じ労使紛争激化、同じ人材離職サイクルを繰り返す。"
          },
          {
            title: "新たな主戦場は「来店客数」ではなく「自宅プレミアム化」",
            content: "ソンクラン2026のパラドックスは、84%が一般支出を削減する一方で69%が自宅料理用食材を高級化することにある。これはモール中心の割引ブリッツという従来の小売戦略を破壊し、Donki／Aeon／Daisoモデル（高頻度の近隣浸透、統合配送Grab、厳選プレミアムSKU）を報う。ハイパーマーケット集客に最適化し続ける日系FMCG企業は昨日の戦争を戦っている。"
          },
          {
            title: "「ボーナス裁量条項」は盾ではなく罠",
            content: "東京の人事チームはタイの雇用契約書で「裁量ボーナス」を見て日本式の柔軟性を想定する。タイ最高裁判例は、複数年継続した支給を黙示的契約上の義務に転換している——Daikinは1,300名のロックアウトでこれを学んだ。タイのボーナスプールを変動インセンティブ費用ではなく固定報酬ラインとして扱い、それに応じて予算化せよ。"
          },
          {
            title: "Z世代の忠誠心はサラリーマン的約束では買えない",
            content: "タイZ世代の56%が1〜2年の勤続のみを計画し、54%がリモートワークの柔軟性を優先する状況下では、年功序列＋終身雇用という日本式昇進階段は、X世代に対するようなリテンション通貨ではなくなった。柔軟な勤務モデル、迅速なキャリア進展、目に見えるCSR（特にソンクラン道路安全関連）を組み合わせる企業が、リテンションで同業他社を大きく上回る。"
          }
        ]
      }
    },

    recommendations: {
      en: [
        {
          title: "Suspend JIT and Build February Buffer Inventory",
          content: "Authorize supply chain managers to abandon strict Just-In-Time parameters from late February through April. Accumulate buffer inventories sufficient to absorb 2–3 weeks of domestic gridlock plus localized truck bans (Samut Prakan Wan Lai April 19 & 26). Tie up working capital deliberately — the cost is far lower than a production halt.",
          priority: "Immediate"
        },
        {
          title: "Activate Maritime/Laos-Vietnam Redundancy for Cross-Border Components",
          content: "For 'Thailand Plus One' Cambodia operations, follow the Yazaki playbook: shift component transport from land corridors to sea freight (or reroute via Laos/Vietnam) before the next border closure cycle. Match MinebeaMitsumi-style strategic inventory at both Thai and Cambodian plants to absorb 4+ weeks of disruption.",
          priority: "Immediate"
        },
        {
          title: "Conduct Late-Q1 Stay-Interviews and Lock Bonus Communication Before Songkran",
          content: "Run transparent performance reviews and 'stay interviews' in late March, before employees travel home and openly compare compensation with rural family. Confirm bonus amounts in writing and disburse before April travel — preempting the Songkran-triggered resignation reflection cycle. Particular focus on Gen Z professionals with flexible-work and upskilling commitments.",
          priority: "Immediate"
        },
        {
          title: "Localize the Marketing Mix to At-Home Premiumization",
          content: "Shift promotional budgets pre-Songkran toward THB 500–2,000 value bundles for the cautious majority, while expanding premium meat/seafood/Japanese imported SKUs for the 69% upgrading at-home Shabu/Moo Kata. Replicate Uniqlo's functional climate-appropriate positioning (UV/AIRism/Heattech) and Loewe's authentic cultural integration (Dok Khoon-equivalent symbolism).",
          priority: "Mid-term"
        },
        {
          title: "Institutionalize Songkran CSR as a Brand Equity Pillar",
          content: "Replicate Toyota Mobility Foundation × Honda 'KUB-DEE-DAI-DEE' merit-making framing and Sumitomo Mitsui's Don't Drive Drunk partnerships. Position Japanese expat executives and local Thai staff as visible volunteers at terminals like Krungthep Aphiwat — converting the 'Seven Dangerous Days' tragedy into authentic regulatory goodwill and internal employee pride.",
          priority: "Strategic"
        },
        {
          title: "Re-engineer Cross-Cultural Management Around Hygiene Factors (Herzberg)",
          content: "Mandate cultural training for Japanese expatriate managers to recognize Kreng-jai, decentralize Nemawashi expectations, and shift focus from 'Motivator Factors' (Kaizen, QC circles, job rotation) toward 'Hygiene Factors' (clear top-down communication, fair compensation, distinct work-life boundaries). Acknowledge that Thai workers value decisive leadership over consensual ambiguity.",
          priority: "Strategic"
        }
      ],
      ja: [
        {
          title: "JITを一時停止し、2月時点でバッファ在庫を構築せよ",
          content: "サプライチェーン管理者に2月下旬から4月にかけて厳格なJIT基準の放棄を承認せよ。国内渋滞2〜3週間と局所的トラック規制（サムットプラカンWan Lai 4月19日・26日）を吸収できるバッファ在庫を蓄積。意図的に運転資本を拘束せよ——コストは生産停止より遥かに低い。",
          priority: "即座"
        },
        {
          title: "クロスボーダー部品の海上・ラオス・ベトナム冗長化を起動せよ",
          content: "「Thailand Plus One」カンボジア事業については、矢崎総業の戦略を踏襲：次回国境閉鎖サイクル前に部品輸送を陸路から海運へシフト（またはラオス・ベトナム経由へ再ルーティング）。MinebeaMitsumi式の戦略在庫をタイ・カンボジア両工場に配備し4週間超の混乱を吸収。",
          priority: "即座"
        },
        {
          title: "第1四半期末のステイインタビュー実施とソンクラン前のボーナス確定通達",
          content: "3月下旬、従業員が帰省して地方の家族と報酬を公然と比較する前に、透明な業績評価と「ステイインタビュー」を実施。ボーナス額を書面で確定し4月旅行前に支給——ソンクランが誘発する離職反省サイクルを先取り。柔軟勤務とリスキリング誓約でZ世代プロフェッショナルに特に注力。",
          priority: "即座"
        },
        {
          title: "マーケティングミックスを自宅プレミアム化へローカライズせよ",
          content: "ソンクラン前のプロモーション予算を、慎重多数派向け500〜2,000バーツのバリューバンドルへ振り分けつつ、自宅シャブ／ムーガタを高級化する69%向けにプレミアム精肉・鮮魚・日本産輸入SKUを拡張。ユニクロの気候適応機能ポジショニング（UV／AIRism／ヒートテック）とLoeweの本物の文化統合（Dok Khoon相当の象徴）を再現。",
          priority: "中期"
        },
        {
          title: "ソンクランCSRをブランドエクイティの柱として制度化せよ",
          content: "トヨタモビリティ財団×ホンダ「KUB-DEE-DAI-DEE」徳積みフレーミングと、住友三井オートリースのDon't Drive Drunk提携を再現。日本人駐在経営層と現地タイ人スタッフをKrungthep Aphiwatターミナル等で可視的ボランティアとして配置——「セブン・デンジャラス・デイズ」の悲劇を、本物の規制当局グッドウィルと社内従業員プライドへ転換。",
          priority: "戦略的"
        },
        {
          title: "ヘルツベルグの衛生要因を軸に異文化マネジメントを再設計せよ",
          content: "日本人駐在管理職向けに、Kreng-jaiの認識、根回し期待値の分散、「動機付け要因」（改善、QCサークル、配置転換）から「衛生要因」（明確なトップダウン伝達、公正な報酬、明確な仕事と生活の境界）への焦点シフトを義務付ける文化研修を実施。タイ人労働者が合意的曖昧さより決断的リーダーシップを評価することを認めよ。",
          priority: "戦略的"
        }
      ]
    },

    industryImpact: {
      title: { en: "Industry-Specific Impact Assessment", ja: "産業別影響評価" },
      data: [
        { sector: { en: "Automotive & Tier 1/2 Suppliers", ja: "自動車・Tier 1/2サプライヤー" }, impact: { en: "Highest exposure: Cambodia component dependency + JIT vulnerability + post-Songkran turnover (4.9% baseline)", ja: "最大の脆弱性：カンボジア部品依存＋JIT脆弱性＋ソンクラン後離職率（基準4.9%）" }, action: { en: "Yazaki-style sea freight redundancy + MinebeaMitsumi-style buffer inventory + early bonus confirmation", ja: "矢崎式海運冗長化＋MinebeaMitsumi式バッファ在庫＋ボーナス早期確定" } },
        { sector: { en: "Retail & FMCG (Donki, Aeon, Daiso)", ja: "小売・FMCG（Donki、Aeon、ダイソー）" }, impact: { en: "Massive upside: 69% upgrade home ingredients + 55% Shabu/Moo Kata preference", ja: "巨大なアップサイド：69%が自宅食材高級化＋55%がシャブ／ムーガタを選好" }, action: { en: "Cross-merchandise hot-pot kits with premium fresh meat/seafood; integrate Grab delivery", ja: "鍋セットとプレミアム精肉・鮮魚をクロスマーチャンダイジング；Grab配送を統合" } },
        { sector: { en: "Apparel (Uniqlo blueprint)", ja: "アパレル（ユニクロの青写真）" }, impact: { en: "Functional climate apparel outperforms novelty; CRM service-quality drives repurchase", ja: "機能性気候適応アパレルが新奇商品を凌駕；CRMサービス品質がリピート購入を駆動" }, action: { en: "Promote UV Protection / AIRism / Heattech via digital flyers + diverse local ambassadors", ja: "デジタルフライヤー＋多様な現地アンバサダーでUVプロテクション／AIRism／ヒートテックを推進" } },
        { sector: { en: "Luxury (Loewe model)", ja: "ラグジュアリー（Loeweモデル）" }, impact: { en: "Authentic cultural symbol integration drives recall across price tiers", ja: "本物の文化象徴統合が全価格帯で記憶定着を駆動" }, action: { en: "Develop Songkran-specific accessories anchored on Thai national symbols (Dok Khoon equivalent)", ja: "タイ国家象徴を軸としたソンクラン特化アクセサリーを開発（Dok Khoon相当）" } },
        { sector: { en: "Auto Leasing & Logistics", ja: "オートリース・物流" }, impact: { en: "CSR opportunity around 'Seven Dangerous Days' road safety", ja: "「セブン・デンジャラス・デイズ」道路安全に関するCSR機会" }, action: { en: "Replicate Sumitomo Mitsui Don't Drive Drunk partnership + Toyota merit-making framing", ja: "住友三井Don't Drive Drunk提携＋トヨタ徳積みフレーミングを再現" } }
      ]
    },

    workforceMetrics: {
      title: { en: "Workforce Attrition & Bonus Reality Check", ja: "労働力離職とボーナス現実チェック" },
      data: [
        { indicator: { en: "National Voluntary Turnover (avg)", ja: "全国自発的離職率（平均）" }, value: { en: "12.9%", ja: "12.9%" } },
        { indicator: { en: "Retail Sector Turnover", ja: "小売セクター離職率" }, value: { en: "32.9% (peak)", ja: "32.9%（最高）" } },
        { indicator: { en: "Automotive / Energy / Industrial", ja: "自動車／エネルギー／工業" }, value: { en: "4.9% / 3.9% / 5.3%", ja: "4.9% ／ 3.9% ／ 5.3%" } },
        { indicator: { en: "Gen Z planning 1–2 year tenure", ja: "Z世代で1〜2年勤続想定" }, value: { en: "56%", ja: "56%" } },
        { indicator: { en: "Statutory Holiday Work Pay", ja: "祝日労働法定支給" }, value: { en: "200% of standard wage", ja: "標準賃金の200%" } },
        { indicator: { en: "Holiday Overtime Pay", ja: "祝日残業支給" }, value: { en: "300% of standard wage", ja: "標準賃金の300%" } },
        { indicator: { en: "Statutory Severance (≥12 months)", ja: "法定退職金（12ヶ月以上）" }, value: { en: "90 days wages, up to 300 days for long service", ja: "90日分賃金、長期勤続で最大300日分" } }
      ]
    },

    sources: [
      "Thailand's tourism sector enjoys windfall during Songkran Festival 2026 — Vietnam Plus (April 2026)",
      "Thailand forecasts 30.4 billion baht revenue as tourists flock to Songkran — Business Times (2026)",
      "Songkran 2026 generates more than US$909 million as Thailand sees strong tourism growth — Pattaya Mail (2026)",
      "Songkran Festival in Thailand: Consumer Trends, Tourism Growth & Food Experiences — dataSpring (2026)",
      "Thai gov't ensures public transport readiness, fuel supply for Songkran holiday — Xinhua (April 2026)",
      "Songkran 2026 travel surge: AOT expects 3.7 million passengers — Nation Thailand (2026)",
      "Thailand freezes fares and secures fuel for Songkran travel rush — Pattaya Mail (2026)",
      "Global Energy Tensions: Rising prices reshape Thai New Year festival — CGTN (April 2026)",
      "Thailand's Songkran festival brings joy as energy crisis casts shadow — Xinhua (April 2026)",
      "Local Japanese companies upbeat for the first half — Bangkok Post (April 2026)",
      "JCC Survey on Business Sentiment H1 2026 — JETRO (2026)",
      "Songkran 2024: Thai Consumer Spending & Marketing Trends — NIQ",
      "Songkran 2026: Inside Thailand's Biggest Holiday and What It Means for Brands — MILI (2026)",
      "Don Don Donki kicks hard as 3 Japanese retail brands eye Thai expansion — Nation Thailand",
      "Successful Japan Companies In Southeast Asia With Brilliant Marketing Strategies — PRAP POINTS",
      "Is the Uniqlo Marketing Strategy Anti-Marketing? — Digital Agency Network",
      "Communication Characteristics of a Global Brand's Store Staff: UNIQLO Thailand — ThaiJO",
      "Loewe's Songkran Campaign Signals a New Era for Luxury in Southeast Asia — L'Officiel Singapore",
      "Songkran's 'seven dangerous days' begin under stricter enforcement — The Star (April 2026)",
      "Songkran peak under tight watch as authorities enforce strict laws amid 515 accidents — Pattaya Mail (2026)",
      "Loyalty a challenge among Gen Z employees — Bangkok Post (2026)",
      "Samut Prakan's late Songkran splash: water-truck bans for April 19 and 26 — Nation Thailand",
      "Japanese management practices in Thailand: the need for adaptation — ANZAM",
      "Japan urges Cambodia and Thailand to reopen the border as closure weighs on Japanese firms — Khmer Times",
      "Border woes hit Japanese firms — Bangkok Post (2026)",
      "Japan calls again for Thai–Cambodian border reopening — Thai PBS World",
      "Crisis Management 2026 — Thailand | Chambers and Partners",
      "Thailand Salary Policies Survey 2025 Report — Deloitte Southeast Asia",
      "Talent Retention Strategies in the Post-Pandemic Workforce — Radja Publika",
      "Trends in Work-Behaviors: Addressing Work-Related Stress in the Thai Workforce — ThaiJO",
      "Thailand Public Holidays 2026: Employer Guide to Holiday Pay & Compliance — Slasify",
      "Local Employment Laws and Regulations in Thailand — Atlas HXM",
      "Confused About Payroll Tax and Bonuses in Thailand? — Reliance Consulting",
      "Daikin locks out 1300 Thai workers after bonus talks fail — Bangkok Post",
      "Toyota Mobility Foundation and Honda KUB-DEE-DAI-DEE Campaign — Toyota Asia",
      "Sumitomo Mitsui Auto Leasing & Service (Thailand) Safe Songkran Road Safety Campaign"
    ]
  };

  return (
    <>
      <SEO
        title={isJapanese
          ? "ソンクラン祭：タイにおける日系企業の戦略的必須事項 | WaLens"
          : "Songkran Festival: Strategic Imperatives for Japanese Enterprises in Thailand | WaLens"
        }
        description={isJapanese
          ? "2026年ソンクラン祭の経済・運営・マーケティング・労務・文化への影響を分析。日系企業のためのBCP、自宅プレミアム化、Daikin Amataロックアウト先例。"
          : "Analysis of Songkran 2026 macroeconomic, operational, marketing, and workforce impacts. BCP, at-home premiumization, and the Daikin Amata lockout precedent for Japanese executives."
        }
        canonicalPath="/insights/services/songkran-japanese-business"
      />
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero */}
        <section className="relative w-full h-[340px] md:h-[420px] flex items-end overflow-hidden">
          <img src={heroImage} alt="Songkran Festival Impact on Japanese Business in Thailand" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
          <div className="relative z-20 container mx-auto px-4 pb-10">
            <Badge variant="outline" className="mb-3 bg-blue-500/20 text-blue-200 border-blue-500/30">
              <Sparkles className="h-3 w-3 mr-1" />
              {content.category[isJapanese ? 'ja' : 'en']}
            </Badge>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight max-w-4xl">
              {content.headline[isJapanese ? 'ja' : 'en']}
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-3xl">
              {content.subheadline[isJapanese ? 'ja' : 'en']}
            </p>
            <div className="flex items-center gap-3 mt-3 text-sm text-gray-300">
              <Badge variant="secondary" className="bg-white/10 text-white border-0">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
              <span>{isJapanese ? '最終更新' : 'Updated'}: {content.lastUpdated}</span>
              <BookmarkButton
                article={{
                  slug: 'songkran-japanese-business',
                  title: isJapanese ? 'ソンクラン祭：日系企業の戦略的必須事項' : 'Songkran Festival: Strategic Imperatives for Japanese Enterprises',
                  language: lang === 'ja' ? 'JP' : 'EN',
                  url: '/insights/services/songkran-japanese-business',
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
            { label: isJapanese ? 'サービス' : 'Services', href: '/insights?filter=services' },
            { label: isJapanese ? 'ソンクラン祭：日系企業への影響' : 'Songkran & Japanese Business' }
          ]} />

          {/* TOC */}
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
                    <span>{section.label}</span>
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
                      <span className="text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Facts */}
          <section id="facts" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Database className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{isJapanese ? '市場・政策・動向に関する情報' : 'Market, Policy & Trends Information'}</h2>
                <p className="text-sm text-muted-foreground">{isJapanese ? 'データベース' : 'Database'}</p>
              </div>
            </div>

            {/* Macroeconomic */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  {content.macroeconomic.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '指標' : 'Indicator'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '数値' : 'Value'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '成長率' : 'Growth'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '主因' : 'Driver'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.macroeconomic.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium">{row.indicator}</td>
                          <td className="py-3 pr-4">{row.value}</td>
                          <td className="py-3 pr-4 text-muted-foreground">{row.growth}</td>
                          <td className="py-3 text-muted-foreground">{row.driver}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* JCCB */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  {content.jccbSurvey.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '指標' : 'Metric'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '数値' : 'Value'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '戦略的含意' : 'Strategic Implication'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.jccbSurvey.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium">{row.metric}</td>
                          <td className="py-3 pr-4">{row.value}</td>
                          <td className="py-3 text-muted-foreground">{row.implication}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Consumer Behavior */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-purple-500" />
                  {content.consumerBehavior.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'カテゴリ' : 'Category'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '行動傾向' : 'Behavioral Trend'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '小売業者への戦略' : 'Strategy for Retailers'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.consumerBehavior.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium">{row.category}</td>
                          <td className="py-3 pr-4 text-muted-foreground">{row.trend}</td>
                          <td className="py-3 text-muted-foreground">{row.strategy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Supply Chain */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Truck className="h-5 w-5 text-amber-600" />
                  {content.supplyChain.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.supplyChain.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                    <div key={idx} className="border-l-2 border-amber-500/30 pl-4">
                      <h4 className="font-semibold text-sm mb-1">{row.factor}</h4>
                      <p className="text-sm text-muted-foreground mb-1"><span className="font-medium text-foreground">{isJapanese ? '影響：' : 'Impact: '}</span>{row.impact}</p>
                      <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">{isJapanese ? '緩和策：' : 'Mitigation: '}</span>{row.mitigation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Labor Dispute */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-red-500" />
                  {content.laborDispute.title[isJapanese ? 'ja' : 'en']}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '交渉項目' : 'Parameter'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '会社提案' : 'Company Offer'}</th>
                        <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '組合要求' : 'Union Demand'}</th>
                        <th className="text-left py-2 font-semibold">{isJapanese ? '対立要因' : 'Conflict Driver'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.laborDispute.data[isJapanese ? 'ja' : 'en'].map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium">{row.parameter}</td>
                          <td className="py-3 pr-4">{row.offer}</td>
                          <td className="py-3 pr-4">{row.demand}</td>
                          <td className="py-3 text-muted-foreground">{row.driver}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Opp & Risks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    {isJapanese ? '機会' : 'Opportunities'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {content.opportunities[isJapanese ? 'ja' : 'en'].map((opp, idx) => (
                      <li key={idx} className="flex gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{opp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-red-500" />
                    {isJapanese ? 'リスク' : 'Risks'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {content.risks[isJapanese ? 'ja' : 'en'].map((risk, idx) => (
                      <li key={idx} className="flex gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Paywall */}
          {!hasFullAccess ? (
            <Card className="mb-12 border-amber-500/30 bg-amber-500/5">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Lock className="h-12 w-12 text-amber-500 mx-auto" />
                  <h3 className="text-xl font-bold">
                    {isJapanese ? 'プレミアムコンテンツ' : 'Premium Content'}
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {isJapanese
                      ? 'WaLensの独自分析、経営者への提言、データ付録を含む完全版レポートにアクセスするにはプレミアムプランが必要です。'
                      : 'Access to WaLens analysis, executive recommendations, and data appendix requires a premium subscription.'
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
              {/* Opinion */}
              <section id="opinion" className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Lightbulb className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{content.opinion.title[isJapanese ? 'ja' : 'en']}</h2>
                    <p className="text-sm text-muted-foreground">{content.opinion.intro[isJapanese ? 'ja' : 'en']}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {content.opinion.points[isJapanese ? 'ja' : 'en'].map((point, idx) => (
                    <Card key={idx} className="border-l-4 border-l-purple-500/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Eye className="h-4 w-4 text-purple-500" />
                          {point.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">{point.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Recommendations */}
              <section id="recommendation" className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <Crown className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{isJapanese ? '日本企業経営者への提言' : 'Recommendation for Japanese Executives'}</h2>
                  </div>
                </div>
                <div className="space-y-4">
                  {content.recommendations[isJapanese ? 'ja' : 'en'].map((rec, idx) => (
                    <Card key={idx} className="border-l-4 border-l-amber-500/50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{rec.title}</CardTitle>
                          <Badge variant={rec.priority === 'Immediate' || rec.priority === '即座' ? 'destructive' : rec.priority === 'Strategic' || rec.priority === '戦略的' ? 'default' : 'secondary'}>
                            {rec.priority}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">{rec.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Data Appendix */}
              <section id="data-appendix" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <Database className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{isJapanese ? 'データ付録' : 'Data Appendix'}</h2>
                  </div>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {content.industryImpact.title[isJapanese ? 'ja' : 'en']}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? 'セクター' : 'Sector'}</th>
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '影響分析' : 'Impact Analysis'}</th>
                            <th className="text-left py-2 font-semibold">{isJapanese ? '推奨アクション' : 'Recommended Action'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.industryImpact.data.map((row, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 pr-4 font-medium">{row.sector[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 pr-4 text-muted-foreground">{row.impact[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3 text-muted-foreground">{row.action[isJapanese ? 'ja' : 'en']}</td>
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
                      <Heart className="h-5 w-5 text-rose-500" />
                      {content.workforceMetrics.title[isJapanese ? 'ja' : 'en']}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4 font-semibold">{isJapanese ? '指標' : 'Indicator'}</th>
                            <th className="text-left py-2 font-semibold">{isJapanese ? '数値・状況' : 'Value / Status'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content.workforceMetrics.data.map((row, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 pr-4 font-medium">{row.indicator[isJapanese ? 'ja' : 'en']}</td>
                              <td className="py-3">{row.value[isJapanese ? 'ja' : 'en']}</td>
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
                        <li key={idx}>{source}</li>
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

export default SongkranJapaneseBusiness;
