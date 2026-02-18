import React, { useState, useMemo, useRef, useEffect } from 'react';
import CompanyProfileDownload from '@/components/CompanyProfileDownload';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useI18n } from '@/i18n/I18nProvider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Search, HelpCircle, ArrowRight } from 'lucide-react';

interface FAQItem {
  id: string;
  question: { en: string; ja: string };
  answer: { en: string; ja: string };
  tags: string[];
  category: string;
}

const faqData: FAQItem[] = [
  // General
  {
    id: 'general-1',
    question: {
      en: 'What is WaLens?',
      ja: 'WaLensとは何ですか？',
    },
    answer: {
      en: 'WaLens is an information platform that provides curated business news and intelligence for executives and decision-makers operating in Thailand and ASEAN.',
      ja: 'WaLensは、タイおよびASEANで事業を展開する経営者・意思決定者向けに、厳選されたビジネスニュースおよびインテリジェンスを提供する情報プラットフォームです。',
    },
    tags: ['walens', 'about', 'platform', 'service', 'what is', 'プラットフォーム', 'サービス', 'について'],
    category: 'general',
  },
  // Subscription & Billing
  {
    id: 'subscription-1',
    question: {
      en: 'What can I access during the free trial?',
      ja: '無料トライアルでは何が利用できますか？',
    },
    answer: {
      en: 'During the free trial period, you can access selected premium articles and features. Please refer to the on-screen display for specific details.',
      ja: '無料トライアル期間中は、一部のプレミアム記事および機能をお試しいただけます。詳細は実際の画面表示をご確認ください。',
    },
    tags: ['free trial', 'trial', 'access', 'premium', '無料', 'トライアル', 'アクセス', '期間'],
    category: 'subscription',
  },
  {
    id: 'subscription-2',
    question: {
      en: 'How do I cancel my subscription?',
      ja: '購読の解約方法を教えてください。',
    },
    answer: {
      en: 'You can cancel your subscription at any time from the "Subscription" section on your My Page. After cancellation, you will continue to have access until the end of your current billing period.',
      ja: 'マイページの「Subscription」画面より、いつでも解約手続きを行っていただけます。解約後も、契約期間終了までは引き続きご利用可能です。',
    },
    tags: ['cancel', 'subscription', 'unsubscribe', 'billing', '解約', '購読', 'キャンセル', '停止'],
    category: 'subscription',
  },
  // Content & Data
  {
    id: 'content-1',
    question: {
      en: 'Where does your information and data come from?',
      ja: '情報やデータの出典はどこですか？',
    },
    answer: {
      en: 'WaLens provides information that has been independently curated and analyzed by our editorial team, based on public institutions, reputable news organizations, and official announcements.',
      ja: 'WaLensでは、公的機関、信頼性の高い報道機関、公式発表などを基に、編集部が独自に精査・分析した情報を提供しています。',
    },
    tags: ['source', 'data', 'information', 'origin', 'reliability', '出典', 'データ', '情報', '信頼性'],
    category: 'content',
  },
  {
    id: 'content-2',
    question: {
      en: 'Is WaLens a breaking news service?',
      ja: 'WaLensは速報ニュースですか？',
    },
    answer: {
      en: 'WaLens prioritizes quality and insight over speed. We deliver curated information at the appropriate time to support executive decision-making rather than focusing on breaking news.',
      ja: 'WaLensは速報性よりも、経営判断に資する「質」と「洞察」を重視しています。そのため、厳選された情報を適切なタイミングでお届けしています。',
    },
    tags: ['breaking news', 'speed', 'real-time', 'updates', '速報', 'ニュース', 'リアルタイム'],
    category: 'content',
  },
  // Account & Technical
  {
    id: 'account-1',
    question: {
      en: 'How do I reset my password?',
      ja: 'パスワードをリセットするにはどうすればよいですか？',
    },
    answer: {
      en: 'Click the "Forgot Password" link on the login page. Enter your registered email address, and you will receive instructions to reset your password.',
      ja: 'ログインページの「パスワードを忘れた方」リンクをクリックしてください。登録済みのメールアドレスを入力すると、パスワードリセットの手順が送信されます。',
    },
    tags: ['password', 'reset', 'forgot', 'login', 'パスワード', 'リセット', 'ログイン', '忘れた'],
    category: 'account',
  },
  {
    id: 'account-2',
    question: {
      en: 'How do I update my profile information?',
      ja: 'プロフィール情報を更新するにはどうすればよいですか？',
    },
    answer: {
      en: 'You can update your profile information by visiting the My Page section and clicking "Edit Profile". Changes will be saved automatically when you submit the form.',
      ja: 'マイページにアクセスし、「プロフィール編集」をクリックすることでプロフィール情報を更新できます。フォームを送信すると変更が自動的に保存されます。',
    },
    tags: ['profile', 'update', 'edit', 'information', 'プロフィール', '更新', '編集', '情報'],
    category: 'account',
  },
  // Business & Partnership
  {
    id: 'business-1',
    question: {
      en: 'Do you offer corporate subscriptions?',
      ja: '法人向けの契約は可能ですか？',
    },
    answer: {
      en: 'Yes. We offer customized plans for corporations, organizations, and institutions. Please contact us for more details.',
      ja: 'はい。法人・団体・機関向けに、カスタマイズしたプランをご提供しております。詳細はお問い合わせください。',
    },
    tags: ['corporate', 'enterprise', 'business', 'organization', 'team', '法人', '企業', '団体', 'チーム'],
    category: 'business',
  },
  {
    id: 'business-2',
    question: {
      en: 'How can I partner with WaLens?',
      ja: 'WaLensとのパートナーシップについて教えてください。',
    },
    answer: {
      en: 'We welcome partnership inquiries from businesses and organizations. Please reach out through our Contact page with your proposal.',
      ja: '企業・団体様からのパートナーシップのお問い合わせを歓迎しております。お問い合わせページより詳細をお知らせください。',
    },
    tags: ['partner', 'partnership', 'collaboration', 'business', 'パートナー', '提携', '協力', 'コラボ'],
    category: 'business',
  },
];

const categoryLabels = {
  general: { en: 'General', ja: '全般' },
  subscription: { en: 'Subscription & Billing', ja: '購読・お支払い' },
  content: { en: 'Content & Data', ja: 'コンテンツ・データ' },
  account: { en: 'Account & Technical', ja: 'アカウント・技術' },
  business: { en: 'Business & Partnership', ja: '法人・パートナーシップ' },
};

const FAQ = () => {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('general');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [noResults, setNoResults] = useState(false);
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([]);
  const faqRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const isJapanese = lang === 'ja';

  // Check for pre-filled question from URL
  useEffect(() => {
    const prefillQuestion = searchParams.get('q');
    if (prefillQuestion) {
      setSearchQuery(prefillQuestion);
    }
  }, [searchParams]);

  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) {
      return faqData.filter((faq) => faq.category === activeTab);
    }

    const query = searchQuery.toLowerCase();
    return faqData.filter((faq) => {
      const questionMatch =
        faq.question.en.toLowerCase().includes(query) ||
        faq.question.ja.toLowerCase().includes(query);
      const answerMatch =
        faq.answer.en.toLowerCase().includes(query) ||
        faq.answer.ja.toLowerCase().includes(query);
      const tagMatch = faq.tags.some((tag) => tag.toLowerCase().includes(query));
      return questionMatch || answerMatch || tagMatch;
    });
  }, [searchQuery, activeTab]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const results = faqData.filter((faq) => {
      const query = searchQuery.toLowerCase();
      const questionMatch =
        faq.question.en.toLowerCase().includes(query) ||
        faq.question.ja.toLowerCase().includes(query);
      const answerMatch =
        faq.answer.en.toLowerCase().includes(query) ||
        faq.answer.ja.toLowerCase().includes(query);
      const tagMatch = faq.tags.some((tag) => tag.toLowerCase().includes(query));
      return questionMatch || answerMatch || tagMatch;
    });

    if (results.length === 0) {
      setNoResults(true);
      setHighlightedId(null);
    } else {
      setNoResults(false);
      const firstResult = results[0];
      setActiveTab(firstResult.category);
      setOpenAccordionItems([firstResult.id]);
      setHighlightedId(firstResult.id);

      // Scroll to the result after tab change
      setTimeout(() => {
        const element = faqRefs.current[firstResult.id];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);

      // Remove highlight after 3 seconds
      setTimeout(() => {
        setHighlightedId(null);
      }, 3000);
    }
  };

  const handleContactRedirect = () => {
    navigate(`/contact?message=${encodeURIComponent(`My question: ${searchQuery}`)}`);
  };

  const renderFAQItems = (items: FAQItem[]) => (
    <Accordion
      type="multiple"
      value={openAccordionItems}
      onValueChange={setOpenAccordionItems}
      className="space-y-3"
    >
      {items.map((faq) => (
        <div
          key={faq.id}
          ref={(el) => (faqRefs.current[faq.id] = el)}
          className={`transition-all duration-500 ${
            highlightedId === faq.id
              ? 'ring-2 ring-primary ring-offset-2 rounded-lg bg-primary/5'
              : ''
          }`}
        >
          <AccordionItem value={faq.id} className="border rounded-lg px-4">
            <AccordionTrigger className="text-left hover:no-underline py-4">
              <span className="font-medium text-foreground">
                {isJapanese ? faq.question.ja : faq.question.en}
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
              {isJapanese ? faq.answer.ja : faq.answer.en}
            </AccordionContent>
          </AccordionItem>
        </div>
      ))}
    </Accordion>
  );

  return (
    <>
      <SEO
        title={isJapanese ? 'よくあるご質問 - WaLens' : 'FAQ - WaLens'}
        description={
          isJapanese
            ? 'WaLensに関するよくあるご質問をまとめています。'
            : 'Find answers to frequently asked questions about WaLens.'
        }
      />
      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-muted/30 border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <HelpCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {isJapanese ? 'よくあるご質問' : 'Frequently Asked Questions'}
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                {isJapanese
                  ? 'WaLensに関するよくあるご質問をまとめています。お探しの回答が見つからない場合は、お気軽にお問い合わせください。'
                  : 'Find answers to common questions about WaLens. If you cannot find what you are looking for, please contact us.'}
              </p>

              {/* Search Box */}
              <form onSubmit={handleSearch} className="max-w-xl mx-auto">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={
                      isJapanese
                        ? 'ご質問を入力してください（例：購読、無料トライアル、データ元）'
                        : 'Type your question (e.g. subscription, trial, data source)'
                    }
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setNoResults(false);
                    }}
                    className="h-12 pr-12 text-base"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1 h-10 w-10"
                  >
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
              </form>

              {/* No Results Message */}
              {noResults && (
                <div className="mt-8 p-6 bg-muted/50 rounded-lg border">
                  <p className="text-foreground mb-4">
                    {isJapanese
                      ? '該当する回答が見つかりませんでした。お手数ですが、以下よりお問い合わせください。'
                      : 'We could not find a relevant answer. Please contact WaLens Support for further assistance.'}
                  </p>
                  <Button onClick={handleContactRedirect} className="gap-2">
                    {isJapanese ? 'WaLensサポートに問い合わせる' : 'Contact WaLens Support'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            {searchQuery.trim() && !noResults ? (
              // Search Results View
              <div>
                <h2 className="text-xl font-semibold mb-6 text-foreground">
                  {isJapanese
                    ? `「${searchQuery}」の検索結果（${filteredFAQs.length}件）`
                    : `Search results for "${searchQuery}" (${filteredFAQs.length})`}
                </h2>
                {filteredFAQs.length > 0 ? (
                  renderFAQItems(filteredFAQs)
                ) : (
                  <p className="text-muted-foreground">
                    {isJapanese ? '該当する結果がありません。' : 'No matching results.'}
                  </p>
                )}
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setSearchQuery('');
                    setNoResults(false);
                  }}
                >
                  {isJapanese ? 'すべてのFAQを表示' : 'Show all FAQs'}
                </Button>
              </div>
            ) : (
              // Tabbed Category View
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full flex-wrap h-auto gap-2 bg-transparent mb-8">
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-full border"
                    >
                      {isJapanese ? label.ja : label.en}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {Object.keys(categoryLabels).map((category) => (
                  <TabsContent key={category} value={category}>
                    {renderFAQItems(faqData.filter((faq) => faq.category === category))}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>
        </section>

        {/* Company Profile Download */}
        <section className="container mx-auto px-4 pb-10">
          <div className="max-w-4xl mx-auto">
            <CompanyProfileDownload variant="card" />
          </div>
        </section>

        {/* Contact Fallback Footer */}
        <section className="bg-muted/30 border-t">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                {isJapanese ? 'ご不明な点がございましたら' : 'Still need help?'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {isJapanese
                  ? 'WaLensサポートまでお問い合わせください。'
                  : 'Contact WaLens Support for further assistance.'}
              </p>
              <Button asChild variant="outline" className="gap-2">
                <a href="/contact">
                  {isJapanese ? 'お問い合わせ' : 'Contact Support'}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FAQ;
