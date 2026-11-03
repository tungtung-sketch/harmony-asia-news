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
import heroImage from '@/assets/hero-72-hour-preparedness.jpg';

// JP translation drafted by Claude — Mon to review before marketing push

const Thailand72HourPreparedness2026 = () => {
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

  const slug = 'thailand-72-hour-preparedness-2026';
  const titleEn = 'Thailand\'s "72-Hour Panic": A Preparedness Scare, Not a Cyberattack — What It Means for Japanese Business in Thailand';
  const titleJa = 'タイの「72時間パニック」：サイバー攻撃ではなく「備え」の騒動 ― 在タイ日系企業への示唆';
  const shortTitleEn = 'Thailand\'s 72-Hour Preparedness Scare: Implications for Japanese Business';
  const shortTitleJa = 'タイ「72時間備蓄」騒動：在タイ日系企業への示唆';
  const publishedDate = '2026-11-03';
  const canonicalPath = '/insights/economic-policy/thailand-72-hour-preparedness-2026';
  const canonicalUrl = `https://walensnews.com${canonicalPath}`;

  const metaDescEn = "No cyberattack hit Thailand's grid, banks or PromptPay. The 72-hour stockpiling wave is a misinformation-amplified preparedness scare — and a new retail category. What Japanese FMCG, retail and every Thai site's BCP should do now.";
  const metaDescJa = 'タイの電力網・銀行・PromptPayへのサイバー攻撃は起きていない。「72時間備蓄」騒動は誤情報が増幅した備えの波であり、新たな売り場カテゴリーを生んだ。日系の食品・小売企業と全拠点のBCPが今すべきことを解説。';

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
    { id: 'overview', label: isJapanese ? '何が起きたのか：主要な事実' : 'What Happened: Key Findings' },
    { id: 'timeline', label: isJapanese ? 'タイムライン' : 'Timeline' },
    { id: 'signals', label: isJapanese ? '主要インテリジェンス・シグナル' : 'Key Intelligence Signals' },
    { id: 'analysis', label: isJapanese ? '消費行動：パニックか、備えか' : 'Consumer Behaviour: Panic vs. Preparedness' },
    { id: 'sector-guide', label: isJapanese ? 'セクター別の示唆' : 'Implications by Sector' },
    { id: 'bcp', label: isJapanese ? '工場・事務所の業務・BCPリスク' : 'Operational & BCP Risks' },
    { id: 'next-actions', label: isJapanese ? '次のアクション' : 'Next Action Insights' },
    { id: 'sources', label: isJapanese ? '注意事項と出典' : 'Caveats & Sources' },
  ];

  const content = {
    headline: { en: titleEn, ja: titleJa },
    subheadline: {
      en: 'Thailand has not suffered a major cyberattack on its power grid, banks, PromptPay or telecom networks. The emergency baskets in Thai stores come from a misinformation-amplified preparedness wave — and they have produced a real, durable retail category rather than genuine panic buying.',
      ja: 'タイの電力網・銀行・PromptPay・通信網への大規模なサイバー攻撃は起きていない。タイの店頭に並ぶ非常用バスケットは、誤情報が増幅した「備え」の波から生まれたものであり、本物のパニック買いではなく、持続的な新しい売り場カテゴリーを生み出している。'
    },
    lead: {
      en: "Thailand has not suffered a major cyberattack on its power grid, banks, PromptPay or telecom networks in late October–early November 2026. The \"crisis panic\" behind the emergency baskets in Thai stores is a misinformation-amplified preparedness wave triggered by foreign 72-hour stockpiling advisories (including Japan's new Disaster Management Agency, 防災庁, on 2 November), Middle East war anxiety and a run of European cyber-sabotage headlines — and it has produced a real, durable retail category rather than genuine panic buying.",
      ja: '2026年10月下旬から11月初旬にかけて、タイの電力網・銀行・PromptPay・通信網が大規模なサイバー攻撃を受けた事実はない。タイの店頭に並ぶ非常用バスケットの背後にある「危機パニック」は、海外の72時間備蓄の呼びかけ（11月2日に発足した日本の防災庁を含む）、中東の戦争への不安、欧州で相次いだサイバー破壊工作の報道をきっかけに、誤情報によって増幅された「備え」の波である。そして、それは本物のパニック買いではなく、現実的で持続的な小売カテゴリーを生み出した。'
    },
    category: { en: 'Economic Policy / Consumer Markets / Cyber & BCP', ja: '経済政策 / 消費市場 / サイバー・BCP' },
    lastUpdated: publishedDate,

    executiveSummary: {
      en: [
        "**No Thai cyber crisis occurred.** The trigger was a viral claim (denied by the National Security Council on **29 October 2026**) that Thailand had ordered 72-hour stockpiling, layered on top of the UK \"Be Ready\" relaunch (22 October), Japan's 防災庁 \"最低3日分、できれば1週間分\" urgent request (2 November), a critical **PHP2Shell** vulnerability alert from Thailand's National Cyber Security Agency (22 October) and hacker attacks that heated supermarket freezers to **50°C** across seven European countries (2 November). The Department of Disaster Prevention and Mitigation (DDPM) then formally recommended a **72-hour emergency bag** on 2 November under the slogan \"aware, not panicked.\"",
        "**Consumer behaviour is \"preparedness merchandising,\" not a run on shelves.** Verified evidence shows pre-packed baskets at **655–961 baht** (and **736–1,086 baht** in WaLens's own store photo, roughly 1.8–2.7 days of Bangkok's 400-baht minimum wage), but a major-retailer check by Dailynews on 31 October found sales **\"normal\"** and no sign of national stockpiling; the only genuine 2026 Thai stock-outs came during the late-September Bangkok floods.",
        "**Treat it as a structural opening with a cyber/BCP sting.** Thailand now has an official 72-hour standard, an annual flood cycle that validates it, and a Prime Minister who on **3 November** ordered ministries to study cyber threats to cold-chain equipment and their impact on food exporters' payments. Japanese FMCG, retail and electronics firms should build **year-round \"72-hour\" ranges**; every Japanese plant and office should **stress-test a 72-hour loss of payments, power and connectivity this month**.",
      ],
      ja: [
        '**タイでサイバー危機は起きていない。** 発端は、タイが72時間分の備蓄を指示したという拡散情報（国家安全保障会議〈NSC〉が**2026年10月29日**に否定）である。これに、英国「Be Ready」キャンペーンの再開（10月22日）、日本の防災庁による「最低3日分、できれば1週間分」の緊急要請（11月2日）、タイ国家サイバーセキュリティ庁（NCSA）による重大脆弱性**PHP2Shell**の警報（10月22日）、欧州7か国でスーパーマーケットの冷凍設備がハッキングされ庫内温度が**50℃**まで上昇した事案（11月2日）が重なった。その後、内務省防災局（DDPM）が11月2日、「意識はするが、慌てない」を標語に**72時間用非常持出袋**の準備を正式に推奨した。',
        '**消費行動は「備え需要の売り場化」であり、棚が空になる事態ではない。** 確認できた詰め合わせバスケットの価格は**655〜961バーツ**（WaLensが撮影した店頭写真では**736〜1,086バーツ**、バンコクの最低賃金日額400バーツの約1.8〜2.7日分）である。一方、Dailynewsが10月31日に大手小売を取材したところ販売は**「平常」**で、全国的な買いだめの兆候はなかった。2026年にタイで実際に品切れが起きたのは、9月下旬のバンコク洪水の時だけである。',
        '**サイバー・BCPのリスクを伴う構造的な商機と捉えよ。** タイには今や公式の72時間基準があり、毎年の洪水がその妥当性を裏付け、首相は**11月3日**、冷蔵・冷凍設備へのサイバー脅威と食品輸出業者の代金回収への影響を検討するよう関係省庁に指示した。日系の食品・日用品、小売、電機企業は**通年型の「72時間」商品群**を構築すべきであり、全ての日系工場・事務所は**決済・電力・通信が72時間停止する事態を今月中に想定演習**すべきである。',
      ]
    },
    executiveBrief: {
      title: { en: 'Executive Brief', ja: 'エグゼクティブブリーフ' },
      en: [
        "Thailand's late-October 72-hour stockpiling anxiety did not come from a cyberattack on Thai infrastructure. It came from foreign 72-hour advisories (the UK's \"Be Ready\" relaunch on 22 October and Japan's 防災庁 request on 2 November), Middle East tensions, the European supermarket freezer hacks of 2 November, and a false claim that Thailand had ordered stockpiling.",
        'The NSC denied any order on 29 October and PM Anutin urged people to be "aware, not panicked," while DDPM on 2 November recommended a six-category 72-hour emergency bag, including 3 litres of water per person per day, as routine preparedness. On the cyber side, ThaiCERT alerted agencies nationwide to the PHP2Shell vulnerabilities on 22 October, and on 3 November the PM briefed Cabinet on the European freezer hacks, ordered monitoring, and tasked the Commerce Ministry with protecting food exporters\' payments and insurance.',
        'Consumer behaviour is preparedness merchandising, not panic buying: verified baskets cost 655–961 baht (736–1,086 baht in our store photo), about 1.6–2.7 days of the 400-baht Bangkok minimum wage, and major retailers report normal sales. With an official 72-hour standard, annual floods and rising cyber threats, we judge this a structural shift at low amplitude.',
        "Two implications for Japanese companies: FMCG, retail and battery-related firms should roll out year-round, non-alarmist \"72-hour\" ranges based on Japan's rolling-stock approach; and every Japanese plant and office should run a 72-hour payments/power/telecom outage tabletop this month, patch PHP2Shell, isolate internet-connected controllers (including refrigeration), hold a small-denomination cash buffer well below BOT's 5-million-baht threshold, and confirm the PDPA 72-hour breach-notification process.",
      ],
      ja: [
        '2026年10月下旬から11月初旬にかけてタイで広がった「72時間備蓄」をめぐる不安は、タイ国内の電力網・銀行・即時決済サービス（PromptPay）・通信網へのサイバー攻撃によって生じたものではない。英国の「Be Ready」キャンペーン再開（10月22日）、日本の防災庁発足に伴う「最低3日分、できれば1週間分」の備蓄要請（11月2日）、中東情勢の緊迫化、欧州7か国のスーパーマーケットで冷凍・冷蔵設備がハッキングされ庫内温度が約50℃まで上昇した事案（11月2日）が重なり、「タイ政府も備蓄を指示した」との誤情報が拡散したことが発端である。',
        'タイ国家安全保障会議（NSC）は10月29日に備蓄指示を公式に否定し、アヌティン首相は「意識はするが、慌てない」と呼びかけた。一方、タイ内務省防災局（DDPM）は11月2日、平時の防災啓発として6分類・1人1日3リットルの飲料水を含む「72時間用非常持出袋」の準備を推奨した。サイバー面では、タイ国家サイバーセキュリティ庁（NCSA）傘下のタイ・コンピュータ緊急対応チーム（ThaiCERT）が10月22日に重大脆弱性「PHP2Shell」への警戒を全国の機関に発出し、首相は11月3日の閣議で欧州の冷凍設備ハッキングを報告、関係省庁に監視を、商務省に食品輸出業者の代金回収・保険対策の検討を指示した。',
        '消費行動は「パニック買い」ではなく「備え需要の売り場化」である。確認できた非常用バスケットの価格は655～961バーツ（写真では736～1,086バーツ）で、バンコクの最低賃金日額400バーツの約1.6～2.7日分に相当する。大手小売への取材では販売は平常であり、全国的な買いだめの兆候はない。ただし、公式な72時間基準の成立、毎年の洪水、サイバー脅威の高まりにより、本件は振幅は小さいものの構造的な変化であると判断する。',
        '日系企業への示唆は二つである。第一に、食品・日用品・小売・電池関連企業は、日本のローリングストックの考え方を応用した通年型「72時間」商品群を、煽らない訴求で展開すべきである。第二に、全ての日系工場・事務所は、決済・電力・通信が72時間停止する事態を想定した事業継続計画（BCP）の机上演習を今月中に実施し、PHP2Shellへの修正適用、インターネットに接続された制御機器（冷凍設備を含む）の隔離、タイ中央銀行（BOT）の500万バーツ以上の現金取引に関する厳格審査基準に配慮した少額現金の確保、個人情報保護法（PDPA）の72時間以内の漏えい通知手順の確認を進めるべきである。',
      ]
    },

    overview: {
      keyFindings: {
        title: { en: 'Key Findings', ja: '主要な調査結果' },
        en: [
          { title: 'The "cyber" link is real but indirect.', content: "The cyber element entered the Thai conversation through three channels: (a) Thai PBS's 28 October explainer, which argued that for cashless Thai households the most relevant threat is a cyberattack that temporarily takes down mobile banking or QR-scan payments, and advised keeping enough cash at home for three days; (b) the NCSA/ThaiCERT emergency response to the PHP2Shell critical vulnerabilities (CVE-2026-109618 and CVE-2026-109619) announced on 22 October; and (c) the European supermarket refrigeration attacks, which the Prime Minister raised at the Cabinet meeting on 3 November. None of these involved a successful attack on Thai critical infrastructure." },
          { title: "The Thai state's message has been deliberately de-escalatory but slightly inconsistent.", content: 'The NSC denied issuing any 72-hour warning (29 October); PM Anutin Charnvirakul said "we should remain aware at all times, but not panic" and declined to discuss cyber and infrastructure monitoring (29–30 October); four days later DDPM effectively endorsed the 72-hour standard anyway (2 November). That sequence — denial, then endorsement — is what fuelled the "the government says it\'s under control, but the shops are packing kits" meme.' },
          { title: 'Retailers moved before government did.', content: 'A viral Facebook post on 31 October showed baskets of instant noodles, water, toothpaste, soap and daily items sold as sets for 961 and 655 baht in an unnamed store. No major chain (Lotus\'s, Big C, Tops, 7-Eleven, Makro) has issued a press release or sales figures on 72-hour kits that we could verify.' },
          { title: 'Demand evidence is anecdotal; the comparable foreign data is not.', content: 'In the UK, after the "Be Ready" relaunch, BBC Newsnight and The Guardian reported canned food sales up 40% at Iceland and torch sales up 284% at Maplin. No equivalent Thai sales data exist yet.' },
          { title: 'Japan is part of the story.', content: 'Japanese-language media in Thailand (Newsclip, 3 November) note that Japan\'s 防災庁 launch and Minister Goshi Hosono\'s urgent stockpiling request may have been a catalyst; a rumour that Japan predicted a "2 November earthquake" also circulated on Thai social media. Thai acquaintances have been asking Japanese residents what Japan "knows."' },
        ],
        ja: [
          { title: '「サイバー」との関連は現実的だが間接的である。', content: 'サイバーの要素は3つの経路でタイの議論に入り込んだ。(a) Thai PBSの10月28日の解説記事は、キャッシュレス化したタイの家庭にとって最も現実的な脅威は、モバイルバンキングやQR決済を一時的に停止させるサイバー攻撃であると論じ、3日分の現金を自宅に置くよう助言した。(b) 10月22日に発表された、重大脆弱性PHP2Shell（CVE-2026-109618およびCVE-2026-109619）に対するNCSA／ThaiCERTの緊急対応。(c) 首相が11月3日の閣議で取り上げた欧州のスーパーマーケット冷蔵設備への攻撃。いずれも、タイの重要インフラへの攻撃が成功したものではない。' },
          { title: 'タイ政府のメッセージは意図的に沈静化を図るものだったが、やや一貫性を欠いた。', content: 'NSCは72時間の警告を出したことを否定し（10月29日）、アヌティン・チャーンウィーラクン首相は「常に意識はすべきだが、慌てる必要はない」と述べ、サイバー・インフラの監視については言及を避けた（10月29〜30日）。ところが4日後、DDPMは事実上72時間基準を推奨した（11月2日）。この「否定、その後の推奨」という流れが、「政府は大丈夫と言うが、店は非常セットを詰めている」というミームを生んだ。' },
          { title: '小売は政府より先に動いた。', content: '10月31日に拡散したFacebook投稿は、店名不明の店舗でインスタント麺、水、歯磨き粉、石けん、日用品のバスケットが961バーツと655バーツのセットで販売されている様子を示した。大手チェーン（Lotus\'s、Big C、Tops、セブン-イレブン、Makro）が72時間セットについてプレスリリースや販売データを出したことは、確認できなかった。' },
          { title: '需要の証拠は逸話にとどまるが、比較可能な海外データは存在する。', content: '英国では「Be Ready」再開後、BBC NewsnightとThe Guardianが、Icelandで缶詰の売上が40%増、Maplinで懐中電灯の売上が284%増と報じた。タイには同等の販売データはまだない。' },
          { title: '日本もこの物語の一部である。', content: 'タイの日本語メディア（Newsclip、11月3日）は、日本の防災庁発足と細野豪志大臣による緊急の備蓄要請がきっかけになった可能性を指摘している。「日本が11月2日の地震を予言した」という噂もタイのSNSで拡散した。タイ人の知人が在留日本人に、日本は何を「知っている」のかと尋ねる場面も見られる。' },
        ]
      },
      advice: {
        title: { en: 'What the government actually advised (DDPM, 2 November)', ja: '政府が実際に推奨した内容（DDPM、11月2日）' },
        intro: {
          en: "DDPM's 2 November guidance (the document behind the store sign in our photo) is the only official Thai household advisory. Its six categories are:",
          ja: 'DDPMの11月2日の指針（店頭写真の掲示の元になった文書）は、タイで唯一の公式な家庭向け勧告である。6つの分類は次のとおり：'
        },
        categories: {
          en: [
            '**Medicine and health:** first-aid kit, household medicines, prescription drugs, medical records.',
            '**Food and water:** 3 litres of drinking water per person per day; ready-to-eat food and high-energy snacks; special food for infants, the elderly and patients.',
            '**Communications and tools:** mobile phone, power bank, flashlight, spare batteries, radio, whistle, candles, lighter, notebook, knife, rope, tape.',
            "**Documents and money:** copies of key documents; Khaosod English's rendering of the list includes cash in case electronic payment systems become unavailable.",
            '**Personal hygiene:** tissues, toothbrush, toothpaste, bathing items, rubbish bags.',
            '**Clothing:** spare clothes, raincoat, hat, blanket or sleeping bag.',
          ],
          ja: [
            '**医薬品・健康：** 救急箱、家庭用医薬品、処方薬、医療記録。',
            '**食料・水：** 1人1日3リットルの飲料水、調理不要の食品と高エネルギーの軽食、乳幼児・高齢者・患者向けの特別食。',
            '**通信・道具：** 携帯電話、モバイルバッテリー、懐中電灯、予備の電池、ラジオ、笛、ろうそく、ライター、ノート、ナイフ、ロープ、テープ。',
            '**書類・お金：** 重要書類の写し。Khaosod Englishが訳したリストには、電子決済システムが使えなくなった場合に備えた現金が含まれている。',
            '**衛生用品：** ティッシュ、歯ブラシ、歯磨き粉、入浴用品、ゴミ袋。',
            '**衣類：** 着替え、雨具、帽子、毛布または寝袋。',
          ]
        },
        notes: {
          en: [
            'Khaosod English reports Nirat saying households should keep a bag ready "whether the threat comes from a natural disaster, cyberwarfare or international conflict," and that DDPM has readied response equipment and Cell Broadcast alerts. Newsclip quotes DDPM as saying the advice is "part of ongoing awareness activities" and "not aimed at a specific international situation."',
            "**What was not advised:** no agency told the public to withdraw cash in bulk, hoard fuel, or expect payment or power outages. The Bank of Thailand has issued no payment-resilience or cash-availability guidance linked to this episode; its only cash-related move is the anti-grey-money tightening (BOT Notification No. 57/2569), which runs in the opposite direction to \"keep more cash.\"",
          ],
          ja: [
            'Khaosod Englishによれば、ニラット局長は「脅威が自然災害、サイバー戦争、国際紛争のいずれから来るにせよ」家庭は非常持出袋を準備しておくべきだと述べ、DDPMは対応機材とセル・ブロードキャスト（緊急速報）の態勢を整えたという。Newsclipは、この助言は「継続的な啓発活動の一環」であり「特定の国際情勢を対象としたものではない」とのDDPMの説明を伝えている。',
            '**推奨されなかったこと：** 現金の大量引き出し、燃料の買いだめ、決済や電力の停止への備えを呼びかけた機関はない。タイ中央銀行（BOT）は今回の件に関連した決済の強靭性や現金の確保に関する指針を出していない。BOTの現金関連の動きはグレーマネー対策の強化（BOT告示第57/2569号）のみであり、「現金を多く持つ」とは逆方向である。',
          ]
        }
      },
      factCheck: {
        title: { en: 'Verified facts vs. rumour', ja: '検証済みの事実と噂' },
        headers: { en: ['Claim circulating', 'Status'], ja: ['流布している主張', '判定'] },
        rows: {
          en: [
            ['"Thailand\'s NSC ordered 72-hour stockpiling"', '**False** — denied by NSC on 29 Oct; flagged by the Anti-Fake News Center'],
            ['"33 countries told citizens to stockpile"', '**Partly true** — based on a Newsweek compilation; many advisories pre-date 2026 (EU Preparedness Union Strategy, 26 Mar 2025) and were not issued simultaneously'],
            ['"Japan predicted an earthquake on 2 November"', '**False** — 2 Nov was the 防災庁 launch date; reported by Japanese outlets as a mistranslation-driven rumour'],
            ['"Thai banks/PromptPay/power grid are under cyberattack"', '**No evidence** — no Thai CII incident reported by NCSA, BOT or MDES in this period'],
            ['"European supermarkets were hacked"', '**True** — 12 Oct (France) and 2 Nov (7 countries); perpetrators and motive unknown'],
            ['"Thai stores are emptied"', '**Not supported** for Oct–Nov; true locally during the 26 Sep Bangkok floods'],
          ],
          ja: [
            ['「タイのNSCが72時間の備蓄を指示した」', '**誤り** — NSCが10月29日に否定。フェイクニュース対策センターも虚偽と判定'],
            ['「33か国が国民に備蓄を指示した」', '**一部正しい** — Newsweekのまとめに基づく。多くの勧告は2026年以前のもの（EU「準備連合戦略」、2025年3月26日）で、同時に出されたものではない'],
            ['「日本が11月2日の地震を予言した」', '**誤り** — 11月2日は防災庁の発足日。日本のメディアは誤訳に起因する噂と報じた'],
            ['「タイの銀行・PromptPay・電力網がサイバー攻撃を受けている」', '**証拠なし** — この期間、NCSA、BOT、デジタル経済社会省（MDES）はタイの重要情報インフラ（CII）での事案を報告していない'],
            ['「欧州のスーパーマーケットがハッキングされた」', '**事実** — 10月12日（フランス）と11月2日（7か国）。実行者と動機は不明'],
            ['「タイの店の棚が空になっている」', '10〜11月については**裏付けなし**。9月26日のバンコク洪水の際には局地的に事実'],
          ]
        }
      }
    },

    timeline: {
      headers: { en: ['Date (2026)', 'Event', 'Institution / Source'], ja: ['日付（2026年）', '出来事', '機関／出典'] },
      rows: {
        en: [
          ['Late Sep (26–28 Sep)', 'Heavy rain floods dozens of Bangkok roads; consumers stockpile at nearby convenience stores, some 7-Eleven branches run out of items; Tops Daily temporarily closes 9 branches; big-box retailers report adequate stock', 'MGR Online, 26 Sep; Prachachat, 28 Sep'],
          ['1 Oct / 9 Oct', 'Belgium and Luxembourg publish new crisis guides recommending 72-hour self-sufficiency', 'The Nation, 30 Oct'],
          ['12 Oct', 'Cyberattack on supermarket refrigeration in France (Danfoss-controlled equipment), affecting hundreds of stores', 'Spacebar, The Standard'],
          ['22 Oct', 'UK relaunches "Be Ready" (3 days of supplies, ~9 litres of water per person, cash, power bank, wind-up radio)', 'The Nation; WION; Thai PBS'],
          ['22 Oct', 'Minister Paradorn Prissananantakul announces NCSA/ThaiCERT response to critical PHP2Shell vulnerabilities; ThaiCERT alerts agencies nationwide with 4 measures (alerting, risk assessment, monitoring/detection, patch follow-up)', 'thaigov.go.th; Matichon; Thansettakij'],
          ['26 Oct', 'BOT Governor Vitai Ratanakorn announces BOT Notification No. 57/2569: enhanced due diligence on cash transactions of ≥5 million baht per day, effective 1 Nov', 'BOT press release No. 40/2569'],
          ['28 Oct', 'Thai PBS explainer: 72 hours is a long-standing international norm, not a war signal; for Thais the key risk is cyber disruption of mobile banking/QR payments; keep some cash at home for 3 days', 'Thai PBS'],
          ['29 Oct', 'NSC (via Ministry of Defence spokesperson) denies issuing any 72-hour stockpiling advice; MDES Anti-Fake News Center labels the claim false', 'Bangkok Post; Nation; The Standard; Anti-Fake News Center'],
          ['29–30 Oct', 'PM Anutin: Thailand is food-secure; "aware but not panic"; avoids cyber/infrastructure questions; energy backup plans in preparation', 'The Nation; Thairath English'],
          ['30 Oct', 'NSC Secretary-General Gen. Chaipruk Duangprapat says the NSC will convene agencies and experts on 4 Nov to analyse scenarios and prepare public information', 'Thairath English'],
          ['30 Oct', 'ThaiCERT meets government agencies, regulators and critical information infrastructure (CII) operators on PHP2Shell response', 'Thansettakij'],
          ['31 Oct', 'Viral Facebook post of 961/655-baht emergency baskets; Dailynews reports major retailers see normal sales and no national stockpiling signal', 'Siamnews; Dailynews'],
          ['2 Nov', 'Japan launches 防災庁 (~350 staff); urgent request: water, food, portable toilets for at least 3 days, ideally 1 week; 3 litres per person per day', 'tenki.jp; Yahoo!/Business+IT'],
          ['2 Nov', 'DDPM Director-General Nirat Pongsitthaworn launches 72-hour "emergency bag" campaign: "aware, but not panicked"; 6 categories; says Thailand is not on any list of countries needing to prepare for the Middle East conflict', 'Thairath; Dailynews; Khaosod English'],
          ['2 Nov', 'Hackers raise freezer temperatures to ~50°C in supermarkets in 7 European countries; Carrefour Belgium confirms 15 of ~700 stores affected, Colruyt 5, IKEA 1; no claim of responsibility or ransom demand', 'The Standard; Bangkokbiznews; Dailynews'],
          ['3 Nov', 'At the mobile Cabinet meeting in Udon Thani, PM Anutin briefs Cabinet on the European freezer hacks, orders the Higher Education/Science ministry, MDES and police to guard against similar hacking, and tasks the Commerce Ministry with studying payment terms and insurance so Thai food exporters are not refused payment over claimed spoilage', 'Kaohoon; Matichon; Thai Post; The Standard'],
          ['3 Nov', 'DDPM warns 61 provinces of thunderstorms; southern flood risk 5–9 Nov', 'Thai PBS'],
          ['4 Nov (scheduled)', 'NSC inter-agency scenario meeting', 'Thairath English'],
        ],
        ja: [
          ['9月下旬（26〜28日）', '豪雨でバンコクの道路数十か所が冠水。消費者が近所のコンビニで買いだめし、一部のセブン-イレブンで品切れ。Tops Dailyが9店舗を一時閉鎖。大型店は在庫十分と報告', 'MGR Online（9月26日）、Prachachat（9月28日）'],
          ['10月1日／9日', 'ベルギーとルクセンブルクが72時間の自給を推奨する新たな危機対応ガイドを公表', 'The Nation（10月30日）'],
          ['10月12日', 'フランスでスーパーマーケットの冷蔵設備（Danfoss制御機器）がサイバー攻撃を受け、数百店舗に影響', 'Spacebar、The Standard'],
          ['10月22日', '英国が「Be Ready」を再開（3日分の物資、1人約9リットルの水、現金、モバイルバッテリー、手回しラジオ）', 'The Nation、WION、Thai PBS'],
          ['10月22日', 'パラドーン・プリッサナーナンタクン大臣が、重大脆弱性PHP2Shellに対するNCSA／ThaiCERTの対応を発表。ThaiCERTは4つの措置（警報、リスク評価、監視・検知、修正適用の追跡）で全国の機関に警戒を発出', 'タイ政府（thaigov.go.th）、Matichon、Thansettakij'],
          ['10月26日', 'ウィタイ・ラッタナコーンBOT総裁がBOT告示第57/2569号を発表：1日500万バーツ以上の現金取引に厳格な顧客確認（EDD）を適用、11月1日施行', 'BOTプレスリリース第40/2569号'],
          ['10月28日', 'Thai PBS解説：72時間は長年の国際標準であり戦争の兆候ではない。タイ人にとっての主なリスクはモバイルバンキング／QR決済のサイバー障害。3日分の現金を自宅に置くべき', 'Thai PBS'],
          ['10月29日', 'NSC（国防省報道官経由）が72時間備蓄の勧告を出したことを否定。MDESのフェイクニュース対策センターも虚偽と判定', 'Bangkok Post、Nation、The Standard、フェイクニュース対策センター'],
          ['10月29〜30日', 'アヌティン首相：タイの食料安全保障は確保されている。「意識はするが慌てない」。サイバー・インフラに関する質問は回避。エネルギーの予備計画を準備中', 'The Nation、Thairath English'],
          ['10月30日', 'NSCのチャイプルック・ドゥアンプラパット事務局長（陸軍大将）が、11月4日に関係機関・専門家を招集してシナリオを分析し、国民向け情報を準備すると表明', 'Thairath English'],
          ['10月30日', 'ThaiCERTが政府機関、規制当局、重要情報インフラ（CII）事業者とPHP2Shell対応を協議', 'Thansettakij'],
          ['10月31日', '961／655バーツの非常用バスケットのFacebook投稿が拡散。Dailynewsは大手小売の販売は平常で、全国的な買いだめの兆候はないと報道', 'Siamnews、Dailynews'],
          ['11月2日', '日本が防災庁を発足（職員約350人）。緊急要請：水・食料・携帯トイレを最低3日分、できれば1週間分。水は1人1日3リットル', 'tenki.jp、Yahoo!／ビジネス＋IT'],
          ['11月2日', 'ニラット・ポンシッティウォーンDDPM局長が72時間「非常持出袋」キャンペーンを開始：「意識はするが、慌てない」。6分類。タイは中東紛争に備えるべき国のリストに入っていないと説明', 'Thairath、Dailynews、Khaosod English'],
          ['11月2日', 'ハッカーが欧州7か国のスーパーマーケットで冷凍庫の温度を約50℃に上昇させる。カルフール・ベルギーは約700店中15店、Colruytは5店、IKEAは1店の被害を確認。犯行声明や身代金要求はなし', 'The Standard、Bangkokbiznews、Dailynews'],
          ['11月3日', 'ウドンタニでの地方閣議で、アヌティン首相が欧州の冷凍設備ハッキングを報告。高等教育・科学省、MDES、警察に同様のハッキングへの警戒を指示し、商務省に対し、品質劣化を理由にタイの食品輸出業者が代金の支払いを拒まれないよう、支払条件と保険の検討を指示', 'Kaohoon、Matichon、Thai Post、The Standard'],
          ['11月3日', 'DDPMが61県に雷雨を警告。南部で11月5〜9日に洪水リスク', 'Thai PBS'],
          ['11月4日（予定）', 'NSCの省庁横断シナリオ会合', 'Thairath English'],
        ]
      }
    },

    signals: {
      headers: { en: ['Indicator to watch', 'Why it matters'], ja: ['注視すべき指標', '重要性'] },
      rows: {
        en: [
          ['NSC meeting outcome (4 Nov)', 'Any new public guidance, alert levels or formal preparedness framework would convert the trend into policy.'],
          ['Middle East escalation', 'Thai PBS reported US strikes on Iran\'s Qeshm Island near the Strait of Hormuz on 3 November; energy-price spikes or Thai evacuation operations would raise anxiety again.'],
          ['A Thai cyber incident', 'Any confirmed attack on a Thai bank, payment rail, power utility or cold-chain operator would instantly turn awareness into genuine panic buying and cash demand — **the scenario Japanese BCPs must cover**.'],
          ['Retailer disclosures', 'Watch CP All, CP Axtra (Lotus\'s/Makro), Central Retail and BJC (Big C) Q3/Q4 results commentary for any quantified "preparedness" category sales; none have been published yet.'],
          ['Commerce Ministry follow-up', 'Guidance on payment terms or insurance for perishable exports.'],
          ['Southern floods (5–9 Nov) and the 2026–27 monsoon tail', 'Each flood season is a natural test of whether 72-hour purchasing becomes habitual.'],
        ],
        ja: [
          ['NSC会合の結果（11月4日）', '新たな国民向け指針、警戒レベル、正式な備えの枠組みが示されれば、この流れは政策に転化する。'],
          ['中東情勢の激化', 'Thai PBSは11月3日、ホルムズ海峡に近いイランのケシュム島への米軍の攻撃を報じた。エネルギー価格の急騰やタイ人の退避作戦があれば、不安は再燃する。'],
          ['タイ国内のサイバー事案', 'タイの銀行、決済基盤、電力会社、コールドチェーン事業者への攻撃が確認されれば、意識は即座に本物のパニック買いと現金需要に変わる——**日系企業のBCPが想定すべきシナリオである**。'],
          ['小売企業の開示', 'CP All、CP Axtra（Lotus\'s／Makro）、Central Retail、BJC（Big C）の第3・第4四半期決算コメントで、「備え」カテゴリーの売上が定量的に示されるかを注視する。現時点で公表はない。'],
          ['商務省のフォローアップ', '生鮮品輸出の支払条件や保険に関する指針。'],
          ['南部の洪水（11月5〜9日）と2026〜27年のモンスーン終盤', '洪水の季節のたびに、72時間分の購入が習慣化するかが自然に試される。'],
        ]
      }
    },

    analysis: {
      evidence: {
        title: { en: 'What the evidence shows', ja: '証拠が示すこと' },
        items: {
          en: [
            "**Kits and price points.** The verified public datapoint is the 31 October viral post: two baskets at **961 and 655 baht**, containing instant noodles, drinking water, toothpaste, soap, talcum powder and daily items; Dailynews's description of the same post adds canned food, household medicines, flashlights, batteries and power banks. WaLens's own store photo (a Lotus's-type store) shows four price points — **1,086, 1,075, 755 and 736 baht** — with MAMA noodles, canned pork luncheon meat, water, snacks, wet wipes, flashlight/batteries and diapers, next to a DDPM \"72-hour\" sign. These four prices are first-hand observations, not yet corroborated by retailer announcements.",
            "**Affordability.** Against Bangkok's daily minimum wage of **400 baht** (in force since 1 July 2025 and unchanged for 2569), a 1,086-baht basket costs about **2.7 days' wages** and a 655-baht basket about **1.6 days**. That is affordable for middle-class urban households but a discretionary purchase for minimum-wage workers — which is why we expect demand to concentrate in Bangkok, the Eastern Seaboard and among condominium dwellers.",
            '**No run on shelves.** Dailynews (31 October) asked major retailers and found sales "still normal," with no large campaign built around the 72-hour trend and "no sign of accelerated stockpiling at the national level." We found no reports of cash runs, ATM queues or fuel queues tied to the episode.',
            '**Cash behaviour runs the other way.** Thailand\'s cash use is shrinking under regulation: the BOT says the value of cash withdrawals fell more than **57%** versus January 2569 after its large-cash-transaction rules, and from 1 November any cash transaction of **≥5 million baht** in a day triggers enhanced due diligence. Household advice to keep "some cash" (Thai PBS; DDPM\'s list) is therefore about small denominations for 3 days, not bulk withdrawals.',
            '**Latent anxiety is high.** A LY Corporation survey from September 2026, cited secondhand in Thai media, found **75%** of Thais aware of emergency preparedness but either not started or under-prepared. The DDPM campaign landed on that gap.',
          ],
          ja: [
            '**セット内容と価格帯。** 公に検証できるデータは10月31日に拡散した投稿である。**961バーツと655バーツ**の2種類のバスケットで、インスタント麺、飲料水、歯磨き粉、石けん、ベビーパウダー、日用品が入っていた。同じ投稿についてのDailynewsの説明では、缶詰、家庭用医薬品、懐中電灯、電池、モバイルバッテリーも含まれる。WaLensが撮影した店頭写真（Lotus\'s型の店舗）には、**1,086、1,075、755、736バーツ**の4つの価格帯があり、MAMAの麺、ポークランチョンミートの缶詰、水、菓子、ウェットティッシュ、懐中電灯・電池、紙おむつが、DDPMの「72時間」の掲示の横に並んでいた。この4つの価格は直接の観察であり、小売企業の発表による裏付けはまだない。',
            '**購入のしやすさ。** バンコクの最低賃金日額**400バーツ**（2025年7月1日から施行、2569年も据え置き）に対し、1,086バーツのバスケットは約**2.7日分の賃金**、655バーツのバスケットは約**1.6日分**に相当する。都市部の中間層には手の届く価格だが、最低賃金労働者にとっては任意の出費である。そのため、需要はバンコク、東部臨海地域、コンドミニアム居住者に集中すると予想する。',
            '**棚が空になる事態は起きていない。** Dailynews（10月31日）が大手小売に取材したところ、販売は「依然として平常」で、72時間の流行に合わせた大規模キャンペーンもなく、「全国的な買いだめ加速の兆候はない」とのことだった。今回の件に関連した現金の取り付け、ATMの行列、燃料の行列の報告は見当たらない。',
            '**現金の動きは逆方向である。** 規制によりタイの現金利用は縮小している。BOTによれば、大口現金取引規制の導入後、現金引き出し額は2569年1月比で**57%超**減少した。さらに11月1日からは、1日**500万バーツ以上**の現金取引に厳格な顧客確認が適用される。したがって、家庭に「ある程度の現金」を置くという助言（Thai PBS、DDPMのリスト）は、3日分の少額紙幣を意味し、大量引き出しではない。',
            '**潜在的な不安は高い。** 2026年9月のLINEヤフー（LY Corporation）の調査（タイのメディアによる孫引き）では、タイ人の**75%**が防災の必要性を認識しながら、準備を始めていないか不十分であった。DDPMのキャンペーンはこの空白に届いた。',
          ]
        }
      },
      products: {
        title: { en: 'Product categories in play', ja: '対象となる商品カテゴリー' },
        headers: { en: ['Category', 'Thai relevance', 'Signal'], ja: ['カテゴリー', 'タイでの意味', 'シグナル'] },
        rows: {
          en: [
            ['Instant noodles', 'Market expected to grow 3% to 25 billion baht in 2569 (MGR Online, 18 Aug); 2024 market 22,778 million baht, up 7.9%; 54 packs per person per year', 'Core basket item; MAMA dominant'],
            ['Canned fish/meat, retort pouches', 'Traditional Thai "end-of-month" and disaster staple', 'Core basket item'],
            ['Bottled water', "DDPM's 3 L/person/day = 9 L per person for 72 hours", 'Bulky; favours home delivery'],
            ['Batteries, flashlights, power banks, radios', 'Explicitly listed by DDPM', 'Highest uplift abroad (UK torches +284%)'],
            ['Diapers, wet wipes, hygiene', 'In DDPM list and our store photo', 'Basket filler with margin'],
            ['Cash', 'Advised in small amounts', 'Counter-trend to BOT policy'],
          ],
          ja: [
            ['インスタント麺', '2569年の市場は3%増の250億バーツの見込み（MGR Online、8月18日）。2024年の市場は227億7,800万バーツで7.9%増。1人あたり年54食', 'バスケットの中核品目。MAMAが圧倒的'],
            ['魚・肉の缶詰、レトルトパウチ', 'タイの伝統的な「月末」・災害時の定番', 'バスケットの中核品目'],
            ['ボトル入りの水', 'DDPMの1人1日3L＝72時間で1人9L', 'かさばるため宅配が有利'],
            ['電池、懐中電灯、モバイルバッテリー、ラジオ', 'DDPMが明示的に掲載', '海外で最も伸びた品目（英国で懐中電灯+284%）'],
            ['紙おむつ、ウェットティッシュ、衛生用品', 'DDPMのリストと店頭写真に含まれる', '利幅のあるバスケットの補完品'],
            ['現金', '少額を推奨', 'BOTの政策とは逆の流れ'],
          ]
        }
      },
      past: {
        title: { en: 'Comparison with past Thai episodes', ja: '過去のタイの事例との比較' },
        items: {
          en: [
            '**COVID-19 (March 2020):** genuine panic buying; Tops, Tesco Lotus, The Mall Group and Big C all acknowledged instant noodles, rice, tissue, tinned fish and water being "snapped up," with The Mall Group saying "we have never seen these kinds of purchases" (Bangkok Post).',
            "**2011 floods:** the benchmark for supply-chain disruption — according to METI's 2012 White Paper, seven industrial estates housing 804 companies, 449 of them Japanese, were submerged from 4 October 2011, and Bloomberg reported on 12 October 2011 that Bangkok residents were hoarding rice, instant noodles and bottled water and had emptied shelves at Tesco Lotus and Big C stores; AP reported on 26 October that bottled water and toilet paper were in especially short supply.",
            '**September 2026 Bangkok floods:** localised stock-outs at convenience stores (7-Eleven) rather than hypermarkets; the government warned that hoarding carries penalties of up to 7 years\' jail or a 140,000-baht fine.',
            '**October–November 2026:** the mildest of the four — information-driven, no physical disruption, retail response ahead of demand.',
          ],
          ja: [
            '**新型コロナ（2020年3月）：** 本物のパニック買い。Tops、Tesco Lotus、The Mall Group、Big Cはいずれも、インスタント麺、米、ティッシュ、魚の缶詰、水が「買い占められた」ことを認め、The Mall Groupは「このような購買は見たことがない」と述べた（Bangkok Post）。',
            '**2011年の洪水：** サプライチェーン寸断の基準となる事例。経済産業省の2012年版通商白書によれば、2011年10月4日以降、804社（うち日系449社）が入居する7つの工業団地が浸水した。Bloombergは2011年10月12日、バンコク市民が米、インスタント麺、ボトル入りの水を買いだめし、Tesco LotusとBig Cの棚を空にしたと報じ、APは10月26日、特にボトル入りの水とトイレットペーパーが不足していると報じた。',
            '**2026年9月のバンコク洪水：** 大型スーパーではなく、コンビニ（セブン-イレブン）での局地的な品切れ。政府は、買いだめには最高7年の懲役または14万バーツの罰金が科されると警告した。',
            '**2026年10〜11月：** 4つの中で最も穏やか。情報主導で物理的な混乱はなく、小売の対応が需要に先行した。',
          ]
        },
        pattern: {
          en: 'The pattern is clear: Thai panic buying is triggered by **visible physical disruption** (water in the streets, lockdowns), not by abstract threats. The 72-hour episode is an **awareness shock**, which tends to convert into gradual, habitual purchasing rather than spikes.',
          ja: 'パターンは明確である。タイのパニック買いは、抽象的な脅威ではなく、**目に見える物理的な混乱**（路上の浸水、ロックダウン）によって引き起こされる。72時間の件は**意識面のショック**であり、急増ではなく、緩やかで習慣的な購買に転化しやすい。'
        }
      },
      japanModel: {
        title: { en: "Japan's 食品備蓄 culture as a reference model", ja: '参考モデルとしての日本の食品備蓄文化' },
        items: {
          en: [
            "**Standard:** Japan's 防災庁 (launched 2 November 2026, about 350 staff under Minister Goshi Hosono) asks households to stockpile water, food and portable toilets for at least 3 days, ideally 1 week, at 3 litres of water per person per day — the same water ratio DDPM now uses.",
            '**Rolling stock (ローリングストック):** Japanese households are encouraged to keep extra everyday foods and rotate them, rather than buying dedicated survival rations. This model fits Thailand far better than sealed "survival kits," because Thai households already buy noodles and canned fish weekly.',
            '**The Nankai Trough lesson (August 2024):** Japan\'s first "megaquake advisory" sent people rushing to stock up on rice, dried noodles, canned food, bottled water and portable toilets, leaving shelves empty at many supermarkets in western Japan and Tokyo (AP), with the Summit chain limiting microwavable rice to one pack per customer. The lesson for Thailand: an official advisory, even a calm one, can create localised shortages of a single staple if supply chains run lean.',
            '**Thailand is roughly where Japan was before 1995:** an official standard now exists, but there is no household habit, no dedicated retail shelf, and no 防災の日-style annual ritual. **That gap is the business opportunity.**',
          ],
          ja: [
            '**基準：** 日本の防災庁（2026年11月2日発足、細野豪志大臣の下で職員約350人）は、家庭に水・食料・携帯トイレを最低3日分、できれば1週間分備蓄するよう求めており、水は1人1日3リットルである——DDPMが現在用いているのと同じ水の基準である。',
            '**ローリングストック：** 日本の家庭は、専用の非常食を買うのではなく、普段の食品を多めに持って回転させることを推奨されている。タイの家庭はすでに毎週麺や魚の缶詰を買っているため、このモデルは密封された「サバイバルキット」よりもはるかにタイに適している。',
            '**南海トラフの教訓（2024年8月）：** 日本初の「巨大地震注意」により、人々は米、乾麺、缶詰、ボトル入りの水、携帯トイレの買いだめに走り、西日本と東京の多くのスーパーで棚が空になった（AP）。サミットはパックご飯を1人1パックに制限した。タイへの教訓：冷静な公式勧告であっても、サプライチェーンに余裕がなければ、特定の主食の局地的な品不足を生みうる。',
            '**タイはおおむね1995年以前の日本の段階にある：** 公式な基準は存在するようになったが、家庭の習慣も、専用の売り場も、防災の日のような年中行事もない。**その空白こそが商機である。**',
          ]
        }
      },
      structural: {
        title: { en: 'Temporary spike or structural shift?', ja: '一時的な急増か、構造的な変化か' },
        verdict: {
          en: '**Our assessment: a structural shift at low amplitude.** The social-media frenzy will fade within 2–3 weeks, but four forces make "72-hour preparedness" a permanent Thai retail and policy theme:',
          ja: '**WaLensの評価：振幅は小さいが構造的な変化である。** SNS上の熱狂は2〜3週間で収まるが、4つの力によって「72時間の備え」はタイの小売と政策の恒常的なテーマとなる：'
        },
        items: {
          en: [
            "**An official standard now exists.** DDPM's 2 November guidance gives retailers and brands a government-endorsed checklist to merchandise against, indefinitely.",
            '**Climate validates it every year.** The September 2026 floods hit Bangkok; DDPM warned 61 provinces on 3 November, with southern flood risk on 5–9 November. Each flood season re-activates demand.',
            "**Policy momentum.** The NSC's 4 November scenario meeting, the PM's 3 November cyber-cold-chain instruction and Thailand's OECD accession process (which Dr. Panitan Wattanayagorn argues requires aligning with Europe's preparedness standards) point towards more formal guidance, possibly including clearer alert levels.",
            "**The cyber threat is rising, not falling.** The NCSA's 2569 cyber risk assessment (235 respondents across 134 agencies; 1,156 risk items, of which 576, or 49.8%, were rated high) puts AI-enabled attacks first and ransomware close behind; NCSA's Secretary-General has put scam losses at 70 million baht per day. The UK's NCSC warned on 3 November that AI-enabled attacks on critical infrastructure could occur within two years.",
          ],
          ja: [
            '**公式な基準が存在するようになった。** DDPMの11月2日の指針は、小売とブランドに、政府が認めたチェックリストを無期限に売り場づくりの基準として提供する。',
            '**気候が毎年その妥当性を裏付ける。** 2026年9月の洪水はバンコクを襲い、DDPMは11月3日に61県に警告を出し、南部では11月5〜9日に洪水リスクがある。洪水の季節のたびに需要が再燃する。',
            '**政策の勢い。** NSCの11月4日のシナリオ会合、首相の11月3日のサイバー・コールドチェーンに関する指示、タイのOECD加盟プロセス（パニタン・ワッタナヤーゴーン博士は欧州の備えの基準との整合が必要だと主張）は、より明確な警戒レベルを含む、より正式な指針に向かうことを示している。',
            '**サイバー脅威は低下ではなく上昇している。** NCSAの2569年サイバーリスク評価（134機関の回答者235人、リスク項目1,156件のうち576件〈49.8%〉が高リスク）は、AIを利用した攻撃を最上位に、ランサムウェアをそれに次ぐ脅威に位置づけた。NCSA事務局長は詐欺による損失を1日7,000万バーツとしている。英国の国家サイバーセキュリティセンター（NCSC）は11月3日、AIを利用した重要インフラへの攻撃が2年以内に起こりうると警告した。',
          ]
        },
        temporary: {
          en: 'What would make it a **temporary** spike: no Thai flood or cyber incident through Q1 2027, and no follow-up from the NSC after 4 November.',
          ja: 'これが**一時的な**急増に終わる条件：2027年第1四半期までタイで洪水やサイバー事案が起きず、11月4日以降にNSCのフォローアップがないこと。'
        }
      }
    },

    sectorGuide: {
      en: [
        {
          sector: 'Food & beverage / FMCG',
          examples: 'Nissin, Ajinomoto, House Foods, Kewpie, Suntory and others',
          items: [
            '**Opportunity:** Ajinomoto (Yum Yum) and Nissin Foods (Thailand) are already among the four makers that, with Saha Pathana (MAMA) and Thai Preserved Food Factory (Wai Wai), hold over 90% of Thai instant-noodle sales (Krungsri Research). A "72-hour" pack format — multi-serve noodles, retort curry or rice, canned or pouch protein, water — can be sold year-round and re-promoted every flood season. Japanese retort-pouch know-how is a genuine differentiator: no-heat, no-water preparation matters when power is out.',
            '**Positioning:** sell "rolling stock," not fear. Thai regulators and media are policing panic messaging ("aware, not panicked"); brands that use alarmist copy risk backlash.',
            "**Risk:** the PM's 3 November instruction signals scrutiny of cold-chain cyber-security. Japanese food exporters and cold-storage operators using internet-connected refrigeration controllers (including Danfoss-type systems) face both an operational risk and a new contractual risk: buyers claiming spoilage to refuse payment — exactly the scenario the Commerce Ministry has been told to study.",
          ]
        },
        {
          sector: 'Retail',
          examples: 'Aeon, FamilyMart, Don Don Donki, and Japanese partners of Thai chains',
          items: [
            "Build a permanent \"72-hour corner\" aligned item-by-item with DDPM's six categories, at three price tiers that mirror the market (roughly 650 / 750 / 1,000+ baht, i.e. 1.5–2.7 days of minimum wage).",
            'Japanese retailers can credibly import the 防災 merchandising playbook — 防災の日 promotions, rotation reminders, "what\'s in my bag" content on LINE — which Thai chains have not yet systematised.',
            'Make sure you are ready for a demand surge: the September floods showed convenience stores, not hypermarkets, are where stock runs out first.',
          ]
        },
        {
          sector: 'Consumer electronics, batteries & power banks',
          examples: 'Panasonic and others',
          items: [
            'Batteries, flashlights, power banks and radios are the categories with the steepest uplift abroad. Hand-crank and solar radios/lights are the natural premium tier for a Thai market where the 2011 and 2026 floods cut power for days.',
            '**Risk:** low-cost, uncertified power banks dominate Thai e-commerce; position quality and safety certification.',
          ]
        },
        {
          sector: 'Logistics & supply chain',
          examples: '',
          items: [
            'Episodes like this compress demand into convenience-store formats and home delivery (water is heavy). Japanese 3PLs serving CP All, Central Retail and Aeon should have surge protocols for water, noodles and batteries pre-agreed.',
            'Cold-chain operators should segment refrigeration controls from the internet now; the European attacks reportedly could not be fixed with software updates alone and required on-site work.',
          ]
        },
        {
          sector: 'Cyber-security services',
          examples: 'Japanese SIers and security vendors',
          items: [
            'Demand drivers are converging: the PHP2Shell response, the NCSA\'s push to move cyber standards (cloud standard, Website Security Standard WSS 1.0, amendments to the Cybersecurity Act) "into real enforcement" (MGR Online, 24 June 2026), and the PM\'s focus on cold-chain/OT security. **OT and IoT security for Japanese-owned factories and cold storage is the most under-served niche.**',
          ]
        },
      ],
      ja: [
        {
          sector: '食品・飲料／日用消費財（FMCG）',
          examples: '日清、味の素、ハウス食品、キユーピー、サントリーなど',
          items: [
            '**機会：** 味の素（Yum Yum）と日清食品（タイ）は、サハパタナ（MAMA）、タイ・プリザーブド・フード・ファクトリー（Wai Wai）とともに、タイのインスタント麺販売の90%超を占める4社に入っている（クルンシィ・リサーチ）。複数食分の麺、レトルトのカレーやご飯、缶詰・パウチのたんぱく質、水を組み合わせた「72時間」パックは、通年で販売でき、洪水の季節ごとに再プロモーションできる。日本のレトルトパウチのノウハウは真の差別化要因である。停電時には、加熱も水も不要な調理が重要になる。',
            '**ポジショニング：** 恐怖ではなく「ローリングストック」を売る。タイの規制当局とメディアはパニックを煽る表現に目を光らせており（「意識はするが、慌てない」）、不安を煽るコピーを使うブランドは反発を招くおそれがある。',
            '**リスク：** 首相の11月3日の指示は、コールドチェーンのサイバーセキュリティが精査されることを示している。インターネットに接続された冷蔵制御機器（Danfoss型のシステムを含む）を使う日系の食品輸出業者や冷蔵倉庫事業者は、業務上のリスクに加え、新たな契約上のリスクに直面する：品質劣化を理由に買い手が支払いを拒むことであり、まさに商務省が検討を指示されたシナリオである。',
          ]
        },
        {
          sector: '小売',
          examples: 'イオン、ファミリーマート、ドン・ドン・ドンキ、タイのチェーンの日系パートナー',
          items: [
            'DDPMの6分類に品目ごとに対応した常設の「72時間コーナー」を、市場に合わせた3つの価格帯（約650／750／1,000バーツ以上、最低賃金の1.5〜2.7日分）で設ける。',
            '日系小売は、タイのチェーンがまだ体系化していない防災の売り場づくりの手法——防災の日のプロモーション、入れ替えのリマインダー、LINEでの「私の持出袋の中身」コンテンツ——を説得力をもって持ち込むことができる。',
            '需要急増への備えを確実にする。9月の洪水は、在庫が最初に尽きるのは大型スーパーではなくコンビニであることを示した。',
          ]
        },
        {
          sector: '家電・電池・モバイルバッテリー',
          examples: 'パナソニックなど',
          items: [
            '電池、懐中電灯、モバイルバッテリー、ラジオは、海外で最も伸びが大きかったカテゴリーである。2011年と2026年の洪水で数日間停電したタイ市場では、手回し式や太陽光式のラジオ・ライトが自然な高価格帯となる。',
            '**リスク：** タイのEコマースでは低価格で未認証のモバイルバッテリーが主流である。品質と安全認証で差別化する。',
          ]
        },
        {
          sector: '物流・サプライチェーン',
          examples: '',
          items: [
            'このような事態は、需要をコンビニ型店舗と宅配に集中させる（水は重い）。CP All、Central Retail、イオンを担当する日系3PLは、水・麺・電池の急増時の対応手順を事前に取り決めておくべきである。',
            'コールドチェーン事業者は、今すぐ冷蔵制御をインターネットから切り離すべきである。報道によれば、欧州の攻撃はソフトウェアの更新だけでは修復できず、現場での作業を要した。',
          ]
        },
        {
          sector: 'サイバーセキュリティ・サービス',
          examples: '日系SIerとセキュリティベンダー',
          items: [
            '需要の要因が重なっている：PHP2Shellへの対応、サイバー基準（クラウド基準、ウェブサイト・セキュリティ基準WSS 1.0、サイバーセキュリティ法の改正）を「実際の執行」に移すNCSAの取り組み（MGR Online、2026年6月24日）、そして首相によるコールドチェーン／OT（制御技術）セキュリティの重視である。**日系の工場と冷蔵倉庫向けのOT・IoTセキュリティは、最も手薄な分野である。**',
          ]
        },
      ]
    },

    bcp: {
      intro: {
        en: 'The real lesson of this episode for Japanese management is not consumer stockpiling — it is that the Thai public, media and government now openly discuss a **72-hour loss of payments, power and connectivity**. Japanese operations should plan for exactly that.',
        ja: '日系企業の経営にとって、今回の本当の教訓は消費者の備蓄ではない。タイの国民、メディア、政府が、**決済・電力・通信が72時間失われる事態**を公然と議論するようになったことである。日系の事業拠点は、まさにその事態に備えた計画を立てるべきである。'
      },
      headers: { en: ['Exposure', 'Scenario', 'Key question for the plant/office'], ja: ['エクスポージャー', 'シナリオ', '工場・事務所への重要な問い'] },
      rows: {
        en: [
          ['Payments and payroll', 'Mobile banking/QR outage on payday; staff unable to pay for food or transport', "Can we pay wages if online banking is down for 72 hours? What small-denomination cash buffer is appropriate, given BOT's ≥5-million-baht EDD threshold?"],
          ['Power', 'Grid disruption from floods or cyber incident', 'Generator fuel for 72 hours? Controlled shutdown procedures for lines and cold storage?'],
          ['Telecom', 'Mobile data outage', 'Out-of-band communications (radio, satellite, pre-printed call trees)?'],
          ['ERP / web systems', 'Exploitation of PHP-based web portals (PHP2Shell) or ransomware', 'Have all PHP-based supplier/customer portals been patched since 22 Oct? Offline backups tested?'],
          ['OT / IoT', 'Tampering with connected refrigeration, HVAC or production controllers (European pattern)', 'Inventory of internet-exposed OT; vendor remote-access controls'],
          ['Workforce', 'Staff absent to protect families during floods/outages', 'Do employees have 72-hour kits? Is there an on-site stock for shift workers?'],
        ],
        ja: [
          ['決済・給与', '給料日にモバイルバンキング／QR決済が停止し、従業員が食事や交通費を払えない', 'オンラインバンキングが72時間停止しても賃金を支払えるか。BOTの500万バーツ以上のEDD基準を踏まえ、どの程度の少額現金を確保すべきか'],
          ['電力', '洪水やサイバー事案による送電の途絶', '72時間分の発電機燃料はあるか。生産ラインと冷蔵倉庫の計画停止手順はあるか'],
          ['通信', 'モバイルデータ通信の途絶', '通常回線以外の連絡手段（無線、衛星、印刷済みの連絡網）はあるか'],
          ['ERP／ウェブシステム', 'PHPベースのウェブポータルの悪用（PHP2Shell）またはランサムウェア', '10月22日以降、PHPベースのサプライヤー／顧客ポータルはすべて修正済みか。オフラインのバックアップは検証済みか'],
          ['OT／IoT', '接続された冷蔵、空調、生産制御機器の改ざん（欧州型）', 'インターネットに露出したOTの棚卸し、ベンダーのリモートアクセス管理'],
          ['人員', '洪水・停止時に従業員が家族を守るために欠勤', '従業員は72時間キットを持っているか。シフト勤務者向けの構内備蓄はあるか'],
        ]
      },
      legal: {
        title: { en: 'Legal obligations to check', ja: '確認すべき法的義務' },
        items: {
          en: [
            "**Cybersecurity Act B.E. 2562 (2019):** if your Thai entity is designated as, or supplies, a CII operator in one of the Act's seven CII sectors (national security, material public services, banking and finance, IT and telecommunications, transportation and logistics, energy and public utilities, and public health; the official list of CII organisations was revised in September 2025), it must follow the sector code of practice, carry out risk assessments and audits, and report cyber threats to the NCSA and its regulator. NCSA's June 2026 push to amend the Act and enforce cloud and website standards means obligations are tightening.",
            '**Personal Data Protection Act B.E. 2562 (PDPA):** a personal-data breach must generally be notified to the PDPC within **72 hours** of becoming aware of it — the same 72-hour clock, in a different context. Ransomware on HR or payroll systems triggers this.',
          ],
          ja: [
            '**サイバーセキュリティ法（仏暦2562年／2019年）：** タイ法人が、同法の7つのCII分野（国家安全保障、重要な公共サービス、銀行・金融、IT・通信、運輸・物流、エネルギー・公益事業、公衆衛生。CII組織の公式リストは2025年9月に改訂）のいずれかでCII事業者に指定されている、またはCII事業者に供給している場合、分野別の実施規範に従い、リスク評価と監査を実施し、サイバー脅威をNCSAと所管規制当局に報告しなければならない。NCSAは2026年6月に同法の改正とクラウド・ウェブサイト基準の執行を推進しており、義務は厳しくなりつつある。',
            '**個人情報保護法（PDPA、仏暦2562年）：** 個人データの漏えいは、原則として把握から**72時間以内**に個人情報保護委員会（PDPC）に通知しなければならない——文脈は異なるが、同じ72時間の時計である。人事・給与システムへのランサムウェアはこれに該当する。',
          ]
        }
      }
    },

    nextActions: {
      title: { en: 'Next Action Insights', ja: '次のアクション' },
      horizons: {
        en: [
          {
            label: 'Today (3 Nov)',
            actions: [
              '**Issue a calm internal advisory to Thai and Japanese staff.** State the facts: the NSC denied any stockpiling order; DDPM recommends a 72-hour bag as routine preparedness; there is no cyberattack on Thai infrastructure. Attach DDPM\'s six-category checklist in Thai and Japanese. This heads off rumours (including the "Japan predicted an earthquake" story) among employees and Japanese families.',
              '**Confirm PHP2Shell patching across every Thai web-facing system (today–this week).** Ask IT and vendors to confirm in writing that all PHP-based portals, intranets and e-commerce sites were patched against CVE-2026-109618/109619 and checked for compromise since 22 October.',
            ]
          },
          {
            label: 'This week',
            actions: [
              '**Run a 72-hour "no payments, no power, no data" tabletop exercise at each Thai site.** Cover payroll (if online banking fails on payday), generator fuel, cold storage, controlled line shutdown and out-of-band communications. Set a modest site-level cash buffer in small denominations, well below BOT\'s 5-million-baht enhanced-due-diligence threshold.',
              '**FMCG and retail: brief category teams before the 5–9 November southern flood window.** Pre-position water, noodles, canned and retort products and batteries for convenience-store channels in the South; agree surge allocations with distributors.',
            ]
          },
          {
            label: 'This month',
            actions: [
              '**Inventory and isolate internet-connected OT and refrigeration controllers.** Prioritise cold storage, food plants and logistics hubs; remove direct internet exposure, enforce vendor remote-access controls, and ask equipment suppliers (including Danfoss-type controller vendors) for their response to the European attacks. Food exporters should review contract clauses on temperature-excursion claims and cargo insurance, in line with the Commerce Ministry study the PM ordered.',
              '**FMCG, retail, electronics: launch a year-round "72-hour / rolling stock" range.** Use three price tiers (about 650 / 750 / 1,000+ baht), align contents with DDPM\'s six categories, adopt "aware, not panicked" tone, and plan the next activation for the flood season and any NSC follow-up.',
            ]
          },
          {
            label: 'This quarter',
            actions: [
              '**Confirm whether your Thai entities fall under CII designation or supply CII operators, and rehearse the PDPA 72-hour breach-notification process with HR and IT.**',
            ]
          }
        ],
        ja: [
          {
            label: '本日（11月3日）',
            actions: [
              '**タイ人・日本人従業員に冷静な社内通知を出す。** 事実を伝える：NSCは備蓄指示を否定した。DDPMは平時の備えとして72時間の持出袋を推奨している。タイのインフラへのサイバー攻撃は起きていない。DDPMの6分類チェックリストをタイ語と日本語で添付する。これにより、従業員と日本人家族の間で噂（「日本が地震を予言した」という話を含む）が広がるのを防ぐ。',
              '**タイの全ての外部公開システムでPHP2Shellの修正適用を確認する（本日〜今週）。** IT部門とベンダーに対し、PHPベースの全てのポータル、イントラネット、ECサイトにCVE-2026-109618／109619への修正が適用され、10月22日以降の侵害の有無が確認されたことを書面で確認させる。',
            ]
          },
          {
            label: '今週',
            actions: [
              '**タイの各拠点で「決済・電力・データなし」の72時間机上演習を実施する。** 給与（給料日にオンラインバンキングが停止した場合）、発電機燃料、冷蔵倉庫、生産ラインの計画停止、通常回線以外の連絡手段を対象とする。BOTの500万バーツの厳格な顧客確認基準を大きく下回る範囲で、拠点ごとに少額紙幣の現金を確保する。',
              '**食品・日用品と小売：11月5〜9日の南部の洪水期間に先立ち、カテゴリー担当に説明する。** 南部のコンビニ向けに水、麺、缶詰・レトルト製品、電池を事前配置し、販売代理店と需要急増時の割当を取り決める。',
            ]
          },
          {
            label: '今月',
            actions: [
              '**インターネットに接続されたOTと冷蔵制御機器を棚卸しし、隔離する。** 冷蔵倉庫、食品工場、物流拠点を優先し、インターネットへの直接の露出をなくし、ベンダーのリモートアクセス管理を徹底し、機器サプライヤー（Danfoss型の制御機器ベンダーを含む）に欧州の攻撃への対応を問い合わせる。食品輸出業者は、首相が指示した商務省の検討に沿って、温度逸脱のクレームと貨物保険に関する契約条項を見直すべきである。',
              '**食品・日用品、小売、家電：通年型の「72時間／ローリングストック」商品群を投入する。** 3つの価格帯（約650／750／1,000バーツ以上）を設け、内容をDDPMの6分類に合わせ、「意識はするが、慌てない」のトーンを採用し、次の展開を洪水の季節とNSCのフォローアップに合わせて計画する。',
            ]
          },
          {
            label: '今四半期',
            actions: [
              '**タイ法人がCII指定の対象か、CII事業者に供給しているかを確認し、人事・IT部門とPDPAの72時間以内の漏えい通知手順を演習する。**',
            ]
          }
        ]
      }
    },

    caveats: {
      title: { en: 'Caveats', ja: '注意事項' },
      items: {
        en: [
          "No Thai retailer sales data, Google Trends series or social-listening study on this episode was available at the time of writing; consumer-behaviour conclusions rest on media reports, one retailer check (Dailynews) and foreign analogues.",
          'The four basket prices in WaLens\'s store photo (736–1,086 baht) and the identity of the retailer are first-hand observations not yet corroborated by public sources; the 961/655-baht baskets are verified only via a viral post from an unnamed store.',
          'The LY Corporation survey figure (75%), UK sales uplift figures and Central Retail stock statements are cited from secondary reporting.',
          'The European freezer attacks remain unattributed; there is no evidence linking them to Thailand.',
        ],
        ja: [
          '執筆時点で、今回の件に関するタイの小売販売データ、Googleトレンドの時系列、ソーシャルリスニング調査は入手できなかった。消費行動に関する結論は、報道、小売への1件の取材（Dailynews）、海外の類似事例に基づいている。',
          'WaLensの店頭写真にある4つのバスケット価格（736〜1,086バーツ）と小売店の特定は直接の観察であり、公開情報による裏付けはまだない。961／655バーツのバスケットは、店名不明の店舗の拡散投稿でのみ確認されている。',
          'LINEヤフーの調査数値（75%）、英国の販売増加率、Central Retailの在庫に関する発言は、二次報道からの引用である。',
          '欧州の冷凍設備への攻撃の実行者は特定されておらず、タイとの関連を示す証拠はない。',
        ]
      }
    },

    sources: [
      { label: 'Thai PBS — World alert to "new-era threats": prepare 72-hour supplies', url: 'https://www.thaipbs.or.th/news/content/571808' },
      { label: 'Matichon — Paradorn orders all units to respond to PHP2Shell crisis', url: 'https://www.matichon.co.th/politics/news_5943579' },
      { label: 'Thai TV5 — Critical cyber alert: PHP2Shell', url: 'https://thaitv5hd.com/content/202763/%E0%B9%80%E0%B8%95%E0%B8%B7%E0%B8%AD%E0%B8%99%E0%B8%A0%E0%B8%B1%E0%B8%A2%E0%B9%84%E0%B8%8B%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B1%E0%B8%9A%E0%B8%A7%E0%B8%B4%E0%B8%81%E0%B8%A4%E0%B8%95-PHP2Shell-%E0%B9%80%E0%B8%AA%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%87%E0%B9%80%E0%B8%A7%E0%B9%87%E0%B8%9A%E0%B9%84%E0%B8%8B%E0%B8%95%E0%B9%8C%E0%B8%96%E0%B8%B9%E0%B8%81%E0%B9%81%E0%B8%AE%E0%B8%81' },
      { label: 'Kaohoon — Anutin tasks Commerce with cold-chain cyber threat study', url: 'https://www.kaohoon.com/news/local/877313' },
      { label: 'The Standard — Defence spokesperson: NSC issued no 72-hour stockpiling notice', url: 'https://thestandard.co/the-ministry-of-defence-spokesperson-clarified-that-the/' },
      { label: 'Kaohoon — Countries advise 3–7 days of supplies; Thailand: "aware, not panicked"', url: 'https://www.kaohoon.com/news/876451' },
      { label: 'The Nation — PM Anutin stresses Thai food security as nations advise stockpiling', url: 'https://www.nationthailand.com/news/40072932' },
      { label: 'Thairath English — Why 33 countries advise 72-hour supplies', url: 'https://en.thairath.co.th/scoop/interview/2969456' },
      { label: 'Thai PBS — DDPM: 6 categories for a 72-hour emergency bag', url: 'https://www.thaipbs.or.th/news/content/572080' },
      { label: 'InfoQuest — Emergency bag checklist: 6 categories', url: 'https://www.infoquest.co.th/2026/673000' },
      { label: 'Siamnews — Government says under control, but stores pack survival sets', url: 'https://www.siamnews.com/news/social/56410' },
      { label: 'Sondhitalk — UK stockpiling and the retail/FMCG shift', url: 'https://sondhitalk.com/detail/9690000104049' },
      { label: 'Newsclip (JP) — Japan\'s call a trigger? Thai "72-hour stockpile" reports', url: 'https://newsclip.be/thai-news/thai-local/43803' },
      { label: 'Infoseek News (JP) — Mistranslated "2 November earthquake" rumour', url: 'https://news.infoseek.co.jp/article/globalnewsasia_12154/' },
      { label: 'Thaich.net (JP) — Japan\'s 3-day stockpile call makes Thai news', url: 'https://www.thaich.net/news/20261029ip.htm' },
      { label: 'MGR Online — Bangkok residents stockpile during floods', url: 'https://mgronline.com/onlinesection/detail/9690000093889' },
      { label: 'MGR Online — 7-Eleven sold out in places; big retailers normal', url: 'https://mgronline.com/business/detail/9690000093952' },
      { label: 'Sansarn News — 7-Eleven sold out in places during floods', url: 'https://sansarnnews.aiforthai.in.th/articles/2026I-A225142' },
      { label: 'The Standard — Inside the European supermarket freezer hacks', url: 'https://thestandard.co/europe-supermarket-freezers-cyber-attack/' },
      { label: 'Spacebar — Cyberattack on supermarket fridges in 5 European countries', url: 'https://spacebar.th/business/cyberattack-supermarket-fridge-europe-five-countries' },
      { label: 'The Nation — Why countries urge emergency food supplies', url: 'https://www.nationthailand.com/news/general/40072865' },
      { label: 'WION — Why governments urge 72-hour stockpiles', url: 'https://www.wionews.com/trending/doomsday-warning-why-governments-are-warning-people-to-stockpile-emergency-supplies-for-72-hours-1793237491954' },
      { label: 'Dailynews — Paradorn: 4 proactive measures on PHP2Shell', url: 'https://www.dailynews.co.th/news/6296358/' },
      { label: 'Bank of Thailand — Cash transaction rules from 5 million baht', url: 'https://www.bot.or.th/th/news-and-media/news/news-20261026.html' },
      { label: 'Dailynews — Stores pack emergency sets ahead of the trend', url: 'https://www.dailynews.co.th/news/6320899/' },
      { label: 'Anti-Fake News Center — NSC 72-hour stockpiling claim', url: 'https://antifakenewscenter.com/%E0%B8%99%E0%B9%82%E0%B8%A2%E0%B8%9A%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B8%B1%E0%B8%90%E0%B8%9A%E0%B8%B2%E0%B8%A5-%E0%B8%82%E0%B9%88%E0%B8%B2%E0%B8%A7%E0%B8%AA%E0%B8%B2%E0%B8%A3/middle-east-war' },
      { label: 'Bangkok Post — No need for stockpiling, Ministry of Defence clarifies', url: 'https://www.bangkokpost.com/thailand/general/3345769/no-need-for-stockpiling-ministry-of-defence-clarifies' },
      { label: 'Thansettakij — ThaiCERT convenes on PHP2Shell', url: 'https://www.thansettakij.com/technology/672624' },
      { label: 'tenki.jp (JP) — Disaster Management Agency launches 2 Nov', url: 'https://tenki.jp/forecaster/s_ono/2026/11/02/41180.html' },
      { label: 'X trending (JP) — 防災庁 3-day stockpile request', url: 'https://x.com/i/trending/2116720336335245390' },
      { label: 'Thairath — DDPM emergency bag for 72 hours', url: 'https://www.thairath.co.th/news/local/2970063' },
      { label: 'Spacebar — European freezer hack spreads to 7 countries', url: 'https://spacebar.th/world/new-cyberattack-on-supermarket-fridges-sweeps-across-europe' },
      { label: 'Thai Tabloid — Anutin orders cross-border cyber vigilance', url: 'https://thaitabloid.com/archives/328630' },
      { label: 'Thai Post — PM worries over freezer hacks and export payments', url: 'https://www.thaipost.net/hi-light/1100537/' },
      { label: 'Khaosod English — Are you ready for 72 hours?', url: 'https://www.khaosodenglish.com/featured/2026/11/03/are-you-ready-for-72-hours-thailand-urges-emergency-bag-preparations/' },
      { label: 'Tnews — What to put in a 72-hour emergency bag', url: 'https://www.tnews.co.th/social/social-news/662847' },
      { label: 'Thaich.net (JP) — Thai government urges 72-hour emergency bags', url: 'https://www.thaich.net/news/20261103me.htm' },
      { label: 'ASEAN NOW — Thailand urges 72-hour emergency bags', url: 'https://aseannow.com/thailand-news/thailand-urges-72-hour-emergency-bags-for-homes-r4647' },
      { label: 'Hua Hin Localplus — Disaster agency urges 72-hour bag preparation', url: 'https://huahin.localplus.city/2026/11/03/disaster-agency-urges-72-hour-emergency-bag-preparation/' },
      { label: 'Thaiger (TH) — NSC did not announce 72-hour stockpiling', url: 'https://thethaiger.com/th/news/1625005/' },
      { label: 'Spring News — 7 reasons 33 countries advise stockpiling', url: 'https://www.springnews.co.th/news/hot-issue/865615' },
      { label: 'Passport — Minimum wage 2569 by province', url: 'https://www.passport.co.th/employer/minimum-wage-thailand-2568/' },
      { label: 'Thai Law Online — Minimum wage in Thailand', url: 'https://www.thailawonline.com/minimum-wage-in-thailand/' },
      { label: 'The Standard — BOT anti-grey-money plan', url: 'https://thestandard.co/bot-anti-money-laundering-plan/' },
      { label: 'MGR Online — Instant noodle market 25 billion baht', url: 'https://mgronline.com/business/detail/9690000081229' },
      { label: 'Krungthep Turakij on X — Instant noodle market 2024', url: 'https://x.com/ktnewsonline/status/1901893080527130828' },
      { label: 'Urban Creature — Canned fish comparison', url: 'https://urbancreature.co/7-cannedfish/' },
      { label: 'e26blc — 72-hour survival bag checklist', url: 'https://e26blc.com/evacuation-checklist/' },
      { label: 'MGR Online — COVID-19 panic buying', url: 'https://mgronline.com/columnist/detail/9630000026169' },
      { label: 'inkl (Bangkok Post) — Panic buying hits Bangkok stores', url: 'https://www.inkl.com/news/panic-buying-hits-bangkok-stores' },
      { label: 'MGR Online — Government: supplies sufficient, hoarding penalties', url: 'https://mgronline.com/politics/detail/9690000094153' },
      { label: 'Yahoo! News (JP) — 防災庁 launches, requests 3-day to 1-week stockpile', url: 'https://news.yahoo.co.jp/articles/fef37ea8f61759c4cefd64eaf0399acf28e91c2d' },
      { label: 'Healthserv — September 2569 floods affect 25 provinces', url: 'https://healthserv.net/healthupdate/225583' },
      { label: 'Posttoday — Panitan on Europe\'s self-reliance lessons', url: 'https://www.posttoday.com/politics/domestic/751263' },
      { label: 'Brick Info TV — NCSA 2569 cyber risk report', url: 'https://brickinfotv.com/news/331172' },
      { label: 'Brick Info TV — NCSA: scam losses 70 million baht per day', url: 'https://brickinfotv.com/news/298704' },
      { label: 'MGR Online — UK NCSC warns of AI attacks on infrastructure', url: 'https://mgronline.com/around/detail/9690000105286' },
      { label: 'Krungsri Research — Ready-to-eat food industry outlook 2024–2026', url: 'https://www.krungsri.com/th/research/industry/industry-outlook/food-beverage/ready-to-eat-food/io/io-ready-to-eat-food-2024-2026' },
      { label: 'The Standard — PM orders vigilance after European freezer hacks', url: 'https://thestandard.co/the-prime-minister-has-ordered-heightened-vigilance-against/' },
      { label: 'Naewna — 7 European countries hit by freezer hacks', url: 'https://www.naewna.com/n/top-stories/145117/' },
      { label: 'MGR Online — NCSA moves cyber law into enforcement mode', url: 'https://mgronline.com/cyberbiz/detail/9690000060298' },
      { label: 'Asia News Network — Thailand denies advising a 72-hour supply', url: 'https://asianews.network/thailand-denies-advising-the-public-to-keep-a-72-hour-supply/' },
      { label: 'The Nation — News', url: 'https://www.nationthailand.com/category/news' },
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

  const bulletIcon = <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />;

  // Recommendations keep the report's 1–7 numbering across the time buckets
  let actionCounter = 0;

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
          <img src={heroImage} alt="Store aisle stocked with canned food and packaged goods — Thailand 72-hour preparedness analysis for Japanese executives" className="absolute inset-0 w-full h-full object-cover z-0" />
          {/* Bright photo — extra left-side shading keeps the headline readable */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/20 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
          <p className="absolute top-1.5 right-3 z-20 text-[10px] text-gray-400">Photo: Valeriano Escobar / Unsplash</p>
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
            { label: isJapanese ? 'タイ72時間備蓄2026' : 'Thailand 72-Hour Preparedness 2026' }
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
              <CardContent className="space-y-3">
                {content.executiveBrief[L].map((para, idx) => (
                  <p key={idx} className="text-sm leading-relaxed text-muted-foreground" style={cellStyle}>{para}</p>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* 02 What Happened */}
          <section id="overview" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Database className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{isJapanese ? '何が起きたのか：主要な事実' : 'What Happened: Key Findings'}</h2>
                <p className="text-sm text-muted-foreground">{isJapanese ? '主要な調査結果・政府の勧告・事実と噂' : 'Findings, official advice, facts vs. rumour'}</p>
              </div>
            </div>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <ol className="space-y-4">
                  {content.overview.keyFindings[L].map((point, idx) => (
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

            <Card className="mb-6 border-l-4 border-l-blue-500/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span style={cellStyle}>{content.overview.advice.title[L]}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground" style={cellStyle}>{content.overview.advice.intro[L]}</p>
                {renderNumbered(content.overview.advice.categories[L])}
                <div className="space-y-3 pt-2">
                  {content.overview.advice.notes[L].map((note, idx) => (
                    <p key={idx} className="text-sm leading-relaxed text-muted-foreground" style={cellStyle}>{renderBold(note)}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-500" />
                  {content.overview.factCheck.title[L]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderTable(content.overview.factCheck.headers[L], content.overview.factCheck.rows[L])}
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
                <p className="text-sm text-muted-foreground">{isJapanese ? 'バンコク時間' : 'Bangkok time'}</p>
              </div>
            </div>
            <Card>
              <CardContent className="pt-6">
                {renderTable(content.timeline.headers[L], content.timeline.rows[L], 'font-semibold text-primary whitespace-nowrap')}
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
                <p className="text-sm text-muted-foreground">{isJapanese ? '主な不確実性と注視すべき指標' : 'Key uncertainties and indicators to watch'}</p>
              </div>
            </div>
            <Card className="border-l-4 border-l-emerald-500">
              <CardContent className="pt-6">
                {renderTable(content.signals.headers[L], content.signals.rows[L], 'font-semibold')}
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
                      ? '消費行動の分析、日本の備蓄文化との比較、セクター別の示唆、工場・事務所のBCPリスク、次のアクションを含む完全版レポートにアクセスするにはプレミアムプランが必要です。'
                      : 'The full consumer-behaviour analysis, Japan comparison, sector implications, operational & BCP risks and next action insights require a premium subscription.'
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
              {/* 05 Consumer Behaviour */}
              <section id="analysis" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Lightbulb className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{isJapanese ? '消費行動：パニックか、備えか' : 'Consumer Behaviour: Panic vs. Preparedness'}</h2>
                  </div>
                </div>

                <Card className="mb-6 border-l-4 border-l-purple-500/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Eye className="h-4 w-4 text-purple-500" />
                      {content.analysis.evidence.title[L]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderList(content.analysis.evidence.items[L], bulletIcon)}
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Database className="h-5 w-5 text-purple-500" />
                      {content.analysis.products.title[L]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderTable(content.analysis.products.headers[L], content.analysis.products.rows[L], 'font-semibold')}
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card className="border-l-4 border-l-purple-500/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Clock className="h-4 w-4 text-purple-500" />
                        <span style={cellStyle}>{content.analysis.past.title[L]}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {renderList(content.analysis.past.items[L], bulletIcon)}
                      <p className="text-sm leading-relaxed text-muted-foreground" style={cellStyle}>{renderBold(content.analysis.past.pattern[L])}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-purple-500/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Globe className="h-4 w-4 text-purple-500" />
                        <span style={cellStyle}>{content.analysis.japanModel.title[L]}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderList(content.analysis.japanModel.items[L], bulletIcon)}
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-muted/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      {content.analysis.structural.title[L]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-relaxed text-muted-foreground" style={cellStyle}>{renderBold(content.analysis.structural.verdict[L])}</p>
                    {renderNumbered(content.analysis.structural.items[L])}
                    <p className="text-sm leading-relaxed text-muted-foreground" style={cellStyle}>{renderBold(content.analysis.structural.temporary[L])}</p>
                  </CardContent>
                </Card>
              </section>

              {/* 06 Implications by Sector */}
              <section id="sector-guide" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <Crown className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{isJapanese ? 'セクター別の示唆' : 'Implications for Japanese Companies by Sector'}</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.sectorGuide[L].map((s, idx) => (
                    <Card key={idx} className="border-l-4 border-l-amber-500/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base" style={cellStyle}>{s.sector}</CardTitle>
                        {s.examples && (
                          <p className="text-xs text-muted-foreground mt-1" style={cellStyle}>{s.examples}</p>
                        )}
                      </CardHeader>
                      <CardContent>
                        {renderList(s.items, bulletIcon)}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* 07 Operational & BCP Risks */}
              <section id="bcp" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <Factory className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{isJapanese ? '工場・事務所の業務・BCPリスク' : 'Operational & BCP Risks for Japanese Factories and Offices'}</h2>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground mb-6" style={cellStyle}>{renderBold(content.bcp.intro[L])}</p>
                <Card className="mb-6 border-l-4 border-l-red-500/50">
                  <CardContent className="pt-6">
                    {renderTable(content.bcp.headers[L], content.bcp.rows[L], 'font-semibold')}
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-red-500/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      {content.bcp.legal.title[L]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderList(content.bcp.legal.items[L], bulletIcon)}
                  </CardContent>
                </Card>
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
                          {horizon.actions.map((action, aIdx) => {
                            actionCounter += 1;
                            return (
                              <li key={aIdx} className="flex gap-2 text-sm">
                                <span className="text-primary font-mono text-xs mt-0.5 w-4 flex-shrink-0">{actionCounter}.</span>
                                <span className="text-muted-foreground leading-relaxed" style={cellStyle}>{renderBold(action)}</span>
                              </li>
                            );
                          })}
                        </ol>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* 09 Caveats & Sources */}
              <section id="sources" className="mb-12" onClick={handleDataAppendixAccess}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gray-500/10">
                    <BookOpen className="h-6 w-6 text-gray-500" />
                  </div>
                  <h2 className="text-2xl font-bold">{isJapanese ? '注意事項と出典' : 'Caveats & Sources'}</h2>
                </div>
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{content.caveats.title[L]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderList(content.caveats.items[L], bulletIcon)}
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

export default Thailand72HourPreparedness2026;
