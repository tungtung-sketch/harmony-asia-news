import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "en" | "ja";

type Translations = Record<string, string>;

type I18nContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Lang, Translations> = {
  en: {
    // Common
    "brand.name": "HARMONY",
    "cta.membership": "Membership",
    "search.placeholder": "Search news...",

    // Header nav
    "nav.news": "News",
    "nav.news.latest": "Latest",
    "nav.news.thaiPolicyWatch": "Thai Policy Watch",
    "nav.news.globalExecsInTH": "Global Execs in TH",
    "nav.news.industryTrends": "Industry Trends",

    "nav.reports": "Reports",
    "nav.reports.strategicAnalysis": "Strategic Analysis",
    "nav.reports.industryReport": "Thai industry report",
    "nav.reports.archives": "Archives",

    "nav.subscribe": "Subscribe",
    "nav.subscribe.pricing": "Pricing",

    "nav.about": "About Us",
    "nav.about.ourTeam": "Our Team",
    "nav.about.contactUs": "Contact us",

    "nav.languages": "Languages",
    "nav.languages.ja": "日本語",
    "nav.languages.en": "English",

    // Banner
    "banner.text": "Welcome to HARMONY — Insightful news, reports, and Thailand 101.",
    "banner.subscribeLink": "Subscribe for full access",

    // Hero
    "hero.badge": "Breaking News",
    "hero.title": "Asia-Pacific Economic Summit Addresses Regional Trade Cooperation",
    "hero.description":
      "Leaders from 12 Asian nations convene in Singapore to discuss strengthening economic ties and sustainable development initiatives across the region.",
    "hero.time": "2 hours ago",
    "hero.by": "By Sarah Chen",
    "hero.location": "Singapore",
    "hero.featuredImageLabel": "Featured Image",

    // News Section
    "newsSection.featuredStories": "Featured Stories",
    "newsSection.latestNews": "Latest News",

    // NewsCard
    "newsCard.featured": "Featured",
    "newsCard.newsImageLabel": "News Image",

    // Footer
    "footer.tagline":
      "Your trusted source for Asia-Pacific news and insights, connecting communities across the region.",
    "footer.categories": "Categories",
    "footer.categories.politics": "Politics",
    "footer.categories.business": "Business",
    "footer.categories.technology": "Technology",
    "footer.categories.culture": "Culture",
    "footer.categories.sports": "Sports",

    "footer.regions": "Regions",
    "footer.regions.eastAsia": "East Asia",
    "footer.regions.southeastAsia": "Southeast Asia",
    "footer.regions.southAsia": "South Asia",
    "footer.regions.pacific": "Pacific",
    "footer.regions.centralAsia": "Central Asia",

    "footer.about": "About",
    "footer.about.aboutUs": "About Us",
    "footer.about.contact": "Contact",
    "footer.about.privacy": "Privacy Policy",
    "footer.about.terms": "Terms of Service",
    "footer.about.careers": "Careers",

    "footer.copyright": "All rights reserved. | Connecting Asia through trusted journalism.",

    // Advertisement
    "ad.label": "Advertisement",
    "ad.placeholder": "Your Ad Here (Responsive 728x90 / 970x90)",

    // Contact
    "contact.title": "Contact Us - HARMONY",
    "contact.metaDescription": "Get in touch with HARMONY. Send us your email and message.",
    "contact.h1": "Contact Us",
    "contact.emailLabel": "Email",
    "contact.emailPlaceholder": "you@example.com",
    "contact.messageLabel": "Message (optional)",
    "contact.messagePlaceholder": "How can we help?",
    "contact.submit": "Send",
    "contact.success": "Thanks! We'll be in touch soon.",
  },
  ja: {
    // Common
    "brand.name": "HARMONY",
    "cta.membership": "メンバーシップ",
    "search.placeholder": "ニュースを検索...",

    // Header nav
    "nav.news": "ニュース",
    "nav.news.latest": "最新",
    "nav.news.thaiPolicyWatch": "タイ政策ウォッチ",
    "nav.news.globalExecsInTH": "グローバル幹部 in TH",
    "nav.news.industryTrends": "業界動向",

    "nav.reports": "レポート",
    "nav.reports.strategicAnalysis": "戦略分析",
    "nav.reports.industryReport": "タイ産業レポート",
    "nav.reports.archives": "アーカイブ",

    "nav.subscribe": "購読",
    "nav.subscribe.pricing": "料金",

    "nav.about": "私たちについて",
    "nav.about.ourTeam": "チーム",
    "nav.about.contactUs": "お問い合わせ",

    "nav.languages": "言語",
    "nav.languages.ja": "日本語",
    "nav.languages.en": "English",

    // Banner
    "banner.text": "HARMONY へようこそ — 洞察に満ちたニュース、レポート、Thailand 101 をお届けします。",
    "banner.subscribeLink": "全ての機能を利用するには購読",

    // Hero
    "hero.badge": "速報",
    "hero.title": "アジア太平洋経済サミット、地域の貿易協力を協議",
    "hero.description":
      "アジア12か国の首脳がシンガポールに集まり、経済連携の強化と持続可能な発展について協議しました。",
    "hero.time": "2時間前",
    "hero.by": "記者: Sarah Chen",
    "hero.location": "シンガポール",
    "hero.featuredImageLabel": "特集画像",

    // News Section
    "newsSection.featuredStories": "注目のストーリー",
    "newsSection.latestNews": "最新ニュース",

    // NewsCard
    "newsCard.featured": "注目",
    "newsCard.newsImageLabel": "ニュース画像",

    // Footer
    "footer.tagline":
      "アジア太平洋のニュースとインサイトをお届けし、地域社会をつなぎます。",
    "footer.categories": "カテゴリー",
    "footer.categories.politics": "政治",
    "footer.categories.business": "ビジネス",
    "footer.categories.technology": "テクノロジー",
    "footer.categories.culture": "文化",
    "footer.categories.sports": "スポーツ",

    "footer.regions": "地域",
    "footer.regions.eastAsia": "東アジア",
    "footer.regions.southeastAsia": "東南アジア",
    "footer.regions.southAsia": "南アジア",
    "footer.regions.pacific": "太平洋",
    "footer.regions.centralAsia": "中央アジア",

    "footer.about": "情報",
    "footer.about.aboutUs": "会社概要",
    "footer.about.contact": "お問い合わせ",
    "footer.about.privacy": "プライバシーポリシー",
    "footer.about.terms": "利用規約",
    "footer.about.careers": "採用情報",

    "footer.copyright": "All rights reserved. | 信頼できる報道でアジアをつなぐ。",

    // Advertisement
    "ad.label": "広告",
    "ad.placeholder": "広告枠 (レスポンシブ 728x90 / 970x90)",

    // Contact
    "contact.title": "お問い合わせ - HARMONY",
    "contact.metaDescription": "HARMONY へのお問い合わせ。メールとメッセージをお送りください。",
    "contact.h1": "お問い合わせ",
    "contact.emailLabel": "メールアドレス",
    "contact.emailPlaceholder": "you@example.com",
    "contact.messageLabel": "メッセージ（任意）",
    "contact.messagePlaceholder": "どのようなお手伝いが必要ですか？",
    "contact.submit": "送信",
    "contact.success": "ありがとうございます。追ってご連絡いたします。",
  },
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "en");

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);

  const t = useMemo(() => {
    return (key: string) => translations[lang]?.[key] ?? key;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
