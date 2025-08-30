import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "en" | "ja" | "th";

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
    "brand.tagline": "Harmonize the global business",
    "cta.membership": "Membership",
    "search.placeholder": "Search news, tips, insights...",
    "search.submit": "Search",
    "search.results": "Search Results",
    "search.queryLabel": "Showing results for",
    "search.loading": "Searching...",
    "search.resultsCountSingle": "Found 1 result",
    "search.resultsCountPlural": "Found {count} results",
    "search.readMore": "Read More",
    "search.noResults": "No Results Found",
    "search.noResultsDescription": "Try adjusting your search terms or browse our latest content.",
    "search.backToHome": "Back to Home",

    // Header nav
    "nav.home": "Home",
    "nav.about": "About us",
    "nav.news": "News",
    "nav.insights": "Insights",
    "nav.tips": "Business Tips",
    "nav.subscribe": "Subscribe",
    "nav.contact": "Contact",

    // Legacy nav (kept for compatibility in components)
    "nav.news.latest": "Latest",
    "nav.news.thaiPolicyWatch": "Thai Policy Watch",
    "nav.news.globalExecsInTH": "Global Execs in TH",
    "nav.news.industryTrends": "Industry Trends",

    "nav.reports": "Reports",
    "nav.reports.strategicAnalysis": "Strategic Analysis",
    "nav.reports.industryReport": "Thai industry report",
    "nav.reports.archives": "Archives",

    "nav.languages": "Languages",
    "nav.languages.ja": "日本語",
    "nav.languages.en": "English",

    // Business Tips
    "tips.subtitle": "Practical insights and strategies for international business leaders operating in Thailand and the Asia-Pacific region.",
    "tips.description": "Business tips and insights for Thailand-Japan business professionals",
    "tips.backToTips": "Back to Business Tips",

    // News
    "news.title": "Latest News - Harmony Asia",
    "news.description": "Stay updated with the latest business news and insights from across Asia",
    "news.heroTitle": "Latest News & Updates",
    "news.heroSubtitle": "Stay informed with breaking news, market analysis, and expert insights from across Asia's dynamic business landscape.",
    "news.backToNews": "Back to News",

    // Pages
    "insights.title": "Insights - HARMONY",
    "tips.title": "Business Tips - HARMONY", 
    "subscribe.title": "Subscribe - Harmony Asia News",

    // Home hero
    "home.hero.title": "Future Thailand: Executive Business & Market Insights",
    "home.hero.subtext": "Connecting Japan and Thailand for business success",
    "home.hero.cta": "Start Free 1-Month Trial",

    // Tags
    "tags.breaking": "Breaking",
    "tags.analysis": "Analysis",
    "tags.opinion": "Opinion",

    // Home sections
    "home.featured": "Featured News",
    "home.latest": "Latest Articles",
    "home.insightHighlight.title": "Insight Highlight",
    "home.insightHighlight.exampleTitle": "5 Trends Japanese Businesses Should Know in Thailand (2025)",

    // Newsletter
    "home.newsletter.title": "Get weekly insights in your inbox — free for your first month",
    "home.newsletter.cta": "Subscribe",
    "home.newsletter.placeholder": "Your email",

    // About stealth
    "home.about.title": "About Us",
    "home.about.text": "Harmony Asia News is operated by Harmony Editorial Team — bridging Japanese & Thai business culture through trusted, clear, and actionable information.",

    // Hero fallback keys used elsewhere
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

    "subscribe.metaDescription": "Choose the right plan for your business insights in Thailand",
    "subscribe.hero.title": "Stay Ahead with Harmony Asia News",
    "subscribe.hero.subtitle": "Choose the right plan for your business insights in Thailand",
    "subscribe.hero.cta": "Subscribe Now",
    
    // Pricing plans
    "subscribe.plans.freeTrial.title": "Free Trial",
    "subscribe.plans.freeTrial.duration": "30 Days",
    "subscribe.plans.freeTrial.price": "Free",
    "subscribe.plans.freeTrial.description": "Access to selected daily news and some analysis",
    "subscribe.plans.freeTrial.cta": "Start Free Trial",
    
    "subscribe.plans.basic.title": "Basic Plan",
    "subscribe.plans.basic.price": "฿599/month",
    "subscribe.plans.basic.description": "Full access to all daily news and website + newsletter",
    "subscribe.plans.basic.cta": "Choose Basic",
    
    "subscribe.plans.premium.title": "Premium Plan",
    "subscribe.plans.premium.price": "฿1,299/month",
    "subscribe.plans.premium.description": "Includes all Basic features plus in-depth analysis and reports",
    "subscribe.plans.premium.cta": "Choose Premium",
    "subscribe.plans.premium.popular": "Most Popular",
    
    "subscribe.plans.corporate.title": "Corporate Plan",
    "subscribe.plans.corporate.price": "Custom Pricing",
    "subscribe.plans.corporate.description": "Multi-seat license with customized services",
    "subscribe.plans.corporate.cta": "Contact Sales",
    
    // Features
    "subscribe.features.title": "Compare Plans",
    "subscribe.features.dailyNews": "Daily News Access",
    "subscribe.features.premiumInsights": "Premium Insights",
    "subscribe.features.executiveReports": "Executive Reports",
    "subscribe.features.pdfDownloads": "PDF Downloads",
    "subscribe.features.multiSeat": "Multi-seat License",
    "subscribe.features.customServices": "Customized Services",
    "subscribe.features.included": "Included",
    "subscribe.features.notIncluded": "Not Included",
    
    // Final CTA
    "subscribe.finalCta.title": "Join hundreds of executives already staying ahead with Harmony Asia News",
    "subscribe.finalCta.button": "Subscribe Now",

    // Not Found
    "notfound.title": "Page Not Found",
    "notfound.subtitle": "The page you are looking for does not exist. Try returning to the homepage or explore our Insights.",
    "notfound.backHome": "Back to Home",

    // Insights
    "insights.breadcrumb": "Insights",
    "insights.dropdown.overview": "Overview",
    "insights.dropdown.services": "Services", 
    "insights.dropdown.manufacturing": "Manufacturing",
    "insights.dropdown.wellness": "Wellness / Healthcare",
    "insights.dropdown.agriculture": "Agriculture",
    "insights.dropdown.realestate": "Real Estate",
    "insights.landing.title": "Thailand-Japan Business Intelligence",
    "insights.landing.description": "Curated industry insights, market analysis, and strategic intelligence for executives navigating Thailand-Japan business opportunities.",
    "insights.landing.category": "Business Intelligence Hub",
    "insights.landing.industryFocus": "Industry Focus Areas",
    "insights.landing.exploreInsights": "Explore Insights →",
    "insights.landing.latestIntelligence": "Latest Market Intelligence",

    // Insights Services
    "insights.services.title": "Services Industry Intelligence",
    "insights.services.description": "Navigate digital transformation, fintech innovation, and professional services expansion across Thailand and Japan markets.",
    "insights.services.category": "Services Sector",
    "insights.services.latestIntelligence": "Latest Services Intelligence",
    "insights.services.keyGrowthAreas": "Key Growth Areas",
    "insights.services.marketOpportunities": "Market Opportunities",
    "insights.services.exploreOther": "Explore Other Industries",

    // Insights Manufacturing
    "insights.manufacturing.title": "Manufacturing Industry Intelligence",
    "insights.manufacturing.description": "Navigate Industry 4.0, supply chain innovation, and automation opportunities across Thailand and Japan markets.",
    "insights.manufacturing.category": "Manufacturing Sector",

    // Insights Wellness Healthcare
    "insights.wellness.title": "Wellness & Healthcare Intelligence",
    "insights.wellness.description": "Explore medical technology, telemedicine, and wellness tourism opportunities in the Thailand-Japan corridor.",
    "insights.wellness.category": "Healthcare Sector",

    // Insights Agriculture
    "insights.agriculture.title": "Agriculture Industry Intelligence", 
    "insights.agriculture.description": "Navigate agri-tech innovation, sustainable farming, and food processing opportunities across Thailand and Japan.",
    "insights.agriculture.category": "Agriculture Sector",

    // Insights Real Estate
    "insights.realestate.title": "Real Estate Market Intelligence",
    "insights.realestate.description": "Explore commercial property, REITs, and urban development trends in Thailand's dynamic real estate market.",
    "insights.realestate.category": "Real Estate Sector",

    // About page
    "about.title": "About Harmony",
    "about.description": "We deliver trusted business intelligence for leaders shaping Thailand's future.",
    "about.mission.title": "Our Mission",
    "about.mission.content": "Harmonize the global business.",
    "about.vision.title": "Our Vision",
    "about.vision.content": "Becoming the top trusted business news platform for international business leaders in Thailand.",
    "about.target.title": "Who We Serve",
    "about.target.content": "Harmony Asia News is designed for international business leaders in Thailand who need trusted, practical, and timely business insights.",
    "about.target.global.title": "Global Leadership",
    "about.target.global.content": "Serving international executives and business leaders operating across borders.",
    "about.target.thailand.title": "Thailand Focus",
    "about.target.thailand.content": "Deep expertise in Thailand's business landscape and market dynamics.",
    "about.target.insights.title": "Practical Insights",
    "about.target.insights.content": "Actionable intelligence that drives informed business decisions.",
    "about.cta.title": "Ready to Connect?",
    "about.cta.content": "Join the conversation with Thailand's business community. Reach out to learn more about our insights and coverage.",
    "about.cta.button": "Get in Touch",
  },
  ja: {
    // Common
    "brand.name": "HARMONY",
    "cta.membership": "メンバーシップ",
    "search.placeholder": "ニュース、チップス、インサイトを検索...",
    "search.submit": "検索",
    "search.results": "検索結果",
    "search.queryLabel": "検索結果",
    "search.loading": "検索中...",
    "search.resultsCountSingle": "1件の結果が見つかりました",
    "search.resultsCountPlural": "{count}件の結果が見つかりました",
    "search.readMore": "続きを読む",
    "search.noResults": "検索結果が見つかりません",
    "search.noResultsDescription": "検索キーワードを調整するか、最新のコンテンツをご覧ください。",
    "search.backToHome": "ホームに戻る",

    // Header nav
    "nav.home": "ホーム",
    "nav.about": "Harmonyについて",
    "nav.news": "ニュース",
    "nav.insights": "インサイト",
    "nav.tips": "ビジネスTips",
    "nav.subscribe": "購読",
    "nav.contact": "お問い合わせ",

    // Legacy nav keys (kept for compatibility)
    "nav.news.latest": "最新",
    "nav.news.thaiPolicyWatch": "タイ政策ウォッチ",
    "nav.news.globalExecsInTH": "グローバル幹部 in TH",
    "nav.news.industryTrends": "業界動向",
    "nav.reports": "レポート",
    "nav.reports.strategicAnalysis": "戦略分析",
    "nav.reports.industryReport": "タイ産業レポート",
    "nav.reports.archives": "アーカイブ",

    "nav.languages": "言語",
    "nav.languages.ja": "日本語",
    "nav.languages.en": "English",

    // Brand
    "brand.tagline": "Harmonize the global business",

    // Banner
    "banner.text": "HARMONY へようこそ — 洞察に満ちたニュース、レポート、Thailand 101 をお届けします。",
    "banner.subscribeLink": "全ての機能を利用するには購読",

    // Hero (home)
    "home.hero.title": "タイの未来：ビジネスと市場の深層分析",
    "home.hero.subtext": "日本とタイをつなぎ、ビジネス成功へ",
    "home.hero.cta": "無料トライアルを開始 (1か月)",
    "hero.featuredImageLabel": "特集画像",

    // Tags
    "tags.breaking": "速報",
    "tags.analysis": "分析",
    "tags.opinion": "オピニオン",

    // Home sections
    "home.featured": "注目ニュース",
    "home.latest": "最新記事",
    "home.insightHighlight.title": "インサイト・ハイライト",
    "home.insightHighlight.exampleTitle": "2025年、日本企業がタイで知っておくべき5つのトレンド",

    // Newsletter
    "home.newsletter.title": "毎週のインサイトをメールで — 初月無料",
    "home.newsletter.cta": "購読する",
    "home.newsletter.placeholder": "あなたのメールアドレス",

    // About stealth
    "home.about.title": "運営について",
    "home.about.text": "Harmony Asia News は Harmony 編集チームによって運営され、日本とタイのビジネス文化をつなぐ、信頼できる明快で実践的な情報を提供します。プロフィールの公開は行っていません。",

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

    // News
    "news.title": "最新ニュース - Harmony Asia",
    "news.description": "アジア全域の最新ビジネスニュースと洞察で最新情報をキャッチアップ",
    "news.heroTitle": "最新ニュース & アップデート",
    "news.heroSubtitle": "アジアのダイナミックなビジネス環境からの速報、市場分析、専門家の洞察で情報を入手しましょう。",
    "news.backToNews": "ニュース一覧に戻る",

    // Pages
    "insights.title": "インサイト - HARMONY",
    "tips.title": "ビジネスチップス - HARMONY",
    "subscribe.title": "購読 - Harmony Asia News",
    "subscribe.metaDescription": "タイでのビジネスインサイトに適したプランを選択してください",
    "subscribe.hero.title": "Harmony Asia Newsで先を行く",
    "subscribe.hero.subtitle": "タイでのビジネスインサイトに適したプランを選択してください",
    "subscribe.hero.cta": "今すぐ購読",
    
    // Pricing plans
    "subscribe.plans.freeTrial.title": "無料トライアル",
    "subscribe.plans.freeTrial.duration": "30日間",
    "subscribe.plans.freeTrial.price": "無料",
    "subscribe.plans.freeTrial.description": "厳選された日次ニュースと一部の分析へのアクセス",
    "subscribe.plans.freeTrial.cta": "無料トライアルを開始",
    
    "subscribe.plans.basic.title": "ベーシックプラン",
    "subscribe.plans.basic.price": "฿599/月",
    "subscribe.plans.basic.description": "すべての日次ニュースとウェブサイト+ニュースレターへのフルアクセス",
    "subscribe.plans.basic.cta": "ベーシックを選択",
    
    "subscribe.plans.premium.title": "プレミアムプラン",
    "subscribe.plans.premium.price": "฿1,299/月",
    "subscribe.plans.premium.description": "ベーシック機能に加え、詳細分析とレポート",
    "subscribe.plans.premium.cta": "プレミアムを選択",
    "subscribe.plans.premium.popular": "最も人気",
    
    "subscribe.plans.corporate.title": "法人プラン",
    "subscribe.plans.corporate.price": "カスタム価格",
    "subscribe.plans.corporate.description": "カスタマイズサービス付きマルチシートライセンス",
    "subscribe.plans.corporate.cta": "営業に連絡",
    
    // Features
    "subscribe.features.title": "プラン比較",
    "subscribe.features.dailyNews": "日次ニュースアクセス",
    "subscribe.features.premiumInsights": "プレミアムインサイト",
    "subscribe.features.executiveReports": "エグゼクティブレポート",
    "subscribe.features.pdfDownloads": "PDFダウンロード",
    "subscribe.features.multiSeat": "マルチシートライセンス",
    "subscribe.features.customServices": "カスタマイズサービス",
    "subscribe.features.included": "含む",
    "subscribe.features.notIncluded": "含まない",
    
    // Final CTA
    "subscribe.finalCta.title": "Harmony Asia Newsで既に先を行く数百人のエグゼクティブに参加しましょう",
    "subscribe.finalCta.button": "今すぐ購読",

    // Not Found
    "notfound.title": "ページが見つかりません",
    "notfound.subtitle": "お探しのページは存在しません。ホームページに戻るか、インサイトをご覧ください。",
    "notfound.backHome": "ホームに戻る",

    // Insights
    "insights.breadcrumb": "インサイト",
    "insights.dropdown.overview": "概要",
    "insights.dropdown.services": "サービス",
    "insights.dropdown.manufacturing": "製造業",
    "insights.dropdown.wellness": "ウェルネス・ヘルスケア",
    "insights.dropdown.agriculture": "農業",
    "insights.dropdown.realestate": "不動産",
    "insights.landing.title": "タイ・日本ビジネスインテリジェンス",
    "insights.landing.description": "タイ・日本のビジネス機会をナビゲートする経営者向けの業界洞察、市場分析、戦略情報をお届けします。",
    "insights.landing.category": "ビジネスインテリジェンスハブ",
    "insights.landing.industryFocus": "業界重点領域",
    "insights.landing.exploreInsights": "インサイトを探索 →",
    "insights.landing.latestIntelligence": "最新マーケットインテリジェンス",

    // Insights Services
    "insights.services.title": "サービス業界インテリジェンス",
    "insights.services.description": "タイと日本市場におけるデジタル変革、フィンテックイノベーション、プロフェッショナルサービス展開をナビゲートします。",
    "insights.services.category": "サービス部門",
    "insights.services.latestIntelligence": "最新サービスインテリジェンス",
    "insights.services.keyGrowthAreas": "主要成長分野",
    "insights.services.marketOpportunities": "市場機会",
    "insights.services.exploreOther": "他の業界を探索",

    // Insights Manufacturing
    "insights.manufacturing.title": "製造業界インテリジェンス",
    "insights.manufacturing.description": "タイと日本市場におけるインダストリー4.0、サプライチェーン革新、自動化機会をナビゲートします。",
    "insights.manufacturing.category": "製造業部門",

    // Insights Wellness Healthcare
    "insights.wellness.title": "ウェルネス・ヘルスケアインテリジェンス",
    "insights.wellness.description": "タイ・日本回廊における医療技術、遠隔医療、ウェルネス観光の機会を探索します。",
    "insights.wellness.category": "ヘルスケア部門",

    // Insights Agriculture
    "insights.agriculture.title": "農業界インテリジェンス",
    "insights.agriculture.description": "タイと日本におけるアグリテックイノベーション、持続可能農業、食品加工機会をナビゲートします。",
    "insights.agriculture.category": "農業部門",

    // Insights Real Estate
    "insights.realestate.title": "不動産市場インテリジェンス",
    "insights.realestate.description": "タイのダイナミックな不動産市場における商業用不動産、REIT、都市開発トレンドを探索します。",
    "insights.realestate.category": "不動産部門",

    // About page
    "about.title": "Harmonyについて",
    "about.description": "タイの未来を形作るリーダーのために、信頼できるビジネスインテリジェンスをお届けします。",
    "about.mission.title": "私たちの使命",
    "about.mission.content": "グローバルビジネスを調和させる。",
    "about.vision.title": "私たちのビジョン",
    "about.vision.content": "タイの国際的ビジネスリーダーにとって最も信頼されるビジネスニュースプラットフォームになること。",
    "about.target.title": "私たちが支援する対象",
    "about.target.content": "Harmony Asia Newsは、信頼できる実践的でタイムリーなビジネスインサイトを必要とするタイの国際的ビジネスリーダーのために設計されています。",
    "about.target.global.title": "グローバルリーダーシップ",
    "about.target.global.content": "国境を越えて活動する国際的な幹部やビジネスリーダーにサービスを提供。",
    "about.target.thailand.title": "タイに特化",
    "about.target.thailand.content": "タイのビジネス環境と市場力学に関する深い専門知識。",
    "about.target.insights.title": "実践的インサイト",
    "about.target.insights.content": "情報に基づいたビジネス決定を推進する実用的な情報。",
    "about.cta.title": "つながりませんか？",
    "about.cta.content": "タイのビジネスコミュニティとの対話に参加しましょう。私たちのインサイトと報道について詳しく知るために、お気軽にお問い合わせください。",
    "about.cta.button": "お問い合わせ",

    // Business Tips
    "tips.subtitle": "タイおよびアジア太平洋地域で事業を展開する国際的なビジネスリーダーのための実践的な洞察と戦略。",
    "tips.description": "タイ・日本のビジネス専門家のためのビジネスチップスとインサイト",
    "tips.backToTips": "ビジネスチップスに戻る",
  },
  th: {
    // Common
    "brand.name": "HARMONY",
    "brand.tagline": "ผสานธุรกิจระดับโลก",
    "cta.membership": "สมาชิก",
    "search.placeholder": "ค้นหาข่าว...",

    // Header nav
    "nav.home": "หน้าแรก",
    "nav.news": "ข่าว",
    "nav.insights": "อินไซต์",
    "nav.tips": "เคล็ดลับธุรกิจ",
    "nav.subscribe": "สมัครสมาชิก",
    "nav.contact": "ติดต่อเรา",

    // Tags
    "tags.breaking": "ด่วน",
    "tags.analysis": "วิเคราะห์",
    "tags.opinion": "ความเห็น",

    // Hero (home)
    "home.hero.title": "อินไซต์และข่าวธุรกิจสำหรับผู้บริหารญี่ปุ่นในประเทศไทย",
    "home.hero.subtext": "เชื่อมญี่ปุ่นและไทยเพื่อความสำเร็จทางธุรกิจ",
    "home.hero.cta": "เริ่มทดลองใช้ฟรี 1 เดือน",

    // Home sections
    "home.featured": "ข่าวเด่น",
    "home.latest": "บทความล่าสุด",
    "home.insightHighlight.title": "สรุปอินไซต์แบบอินโฟกราฟิก",
    "home.insightHighlight.exampleTitle": "5 เทรนด์ที่ธุรกิจญี่ปุ่นควรรู้ในไทย (2025)",

    // Newsletter
    "home.newsletter.title": "รับอินไซต์รายสัปดาห์ในอีเมล — เดือนแรกฟรี",
    "home.newsletter.cta": "สมัครรับข่าว",
    "home.newsletter.placeholder": "อีเมลของคุณ",

    // About stealth
    "home.about.title": "เกี่ยวกับเรา (Stealth Mode)",
    "home.about.text": "Harmony Asia News ดำเนินการโดยทีมบรรณาธิการ Harmony — เชื่อมวัฒนธรรมธุรกิจญี่ปุ่นและไทยด้วยข้อมูลที่เชื่อถือได้ ชัดเจน และนำไปใช้ได้จริง ไม่มีการแสดงโปรไฟล์ส่วนบุคคล",

    // News Section
    "newsSection.featuredStories": "เรื่องเด่น",
    "newsSection.latestNews": "ข่าวล่าสุด",

    // NewsCard
    "newsCard.featured": "เด่น",
    "newsCard.newsImageLabel": "ภาพข่าว",

    // Footer
    "footer.tagline": "แหล่งข่าวและอินไซต์เอเชียแปซิฟิกที่เชื่อถือได้ เชื่อมต่อชุมชนทั่วภูมิภาค",
    "footer.categories": "หมวดหมู่",
    "footer.categories.politics": "การเมือง",
    "footer.categories.business": "ธุรกิจ",
    "footer.categories.technology": "เทคโนโลยี",
    "footer.categories.culture": "วัฒนธรรม",
    "footer.categories.sports": "กีฬา",

    "footer.regions": "ภูมิภาค",
    "footer.regions.eastAsia": "เอเชียตะวันออก",
    "footer.regions.southeastAsia": "เอเชียตะวันออกเฉียงใต้",
    "footer.regions.southAsia": "เอเชียใต้",
    "footer.regions.pacific": "แปซิฟิก",
    "footer.regions.centralAsia": "เอเชียกลาง",

    "footer.about": "เกี่ยวกับ",
    "footer.about.aboutUs": "เกี่ยวกับเรา",
    "footer.about.contact": "ติดต่อ",
    "footer.about.privacy": "นโยบายความเป็นส่วนตัว",
    "footer.about.terms": "ข้อกำหนดการใช้บริการ",
    "footer.about.careers": "ร่วมงานกับเรา",

    "footer.copyright": "สงวนลิขสิทธิ์ทั้งหมด | เชื่อมเอเชียด้วยสื่อที่เชื่อถือได้",

    // Advertisement
    "ad.label": "โฆษณา",
    "ad.placeholder": "พื้นที่โฆษณา (Responsive 728x90 / 970x90)",

    // Contact
    "contact.title": "ติดต่อเรา - HARMONY",
    "contact.metaDescription": "ติดต่อ HARMONY ส่งอีเมลและข้อความถึงเรา",
    "contact.h1": "ติดต่อเรา",
    "contact.emailLabel": "อีเมล",
    "contact.emailPlaceholder": "you@example.com",
    "contact.messageLabel": "ข้อความ (ไม่บังคับ)",
    "contact.messagePlaceholder": "เราช่วยอะไรคุณได้บ้าง?",
    "contact.submit": "ส่ง",
    "contact.success": "ขอบคุณ! เราจะติดต่อกลับโดยเร็ว",

    // Pages
    "news.title": "ข่าว - HARMONY",
    "insights.title": "อินไซต์ - HARMONY",
    "tips.title": "เคล็ดลับธุรกิจ - HARMONY",
    "subscribe.title": "สมัครสมาชิก - HARMONY",
    "subscribe.metaDescription": "ทดลองใช้ฟรี 1 เดือน จากนั้นรายเดือน/รายปี",
  },
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "th") return "en";
    return (stored as Lang) || "en";
  });

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
