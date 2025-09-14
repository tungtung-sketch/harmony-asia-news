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
    "nav.signup": "Sign Up",
    "nav.contact": "Contact",

    // Header
    "header.login": "Login",
    "header.signUp": "Sign Up",
    "header.myPage": "My Page",

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

    // Business Intelligence translations
    "nav.businessIntelligence": "Business Intelligence",
    "bi.title": "Business Intelligence - HARMONY",
    "bi.metaDescription": "Access real-time Thai business data, economic indicators, and market insights from official government sources.",
    "bi.hero.title": "Business Intelligence",
    "bi.hero.subtitle": "Real-time insights from official Thai government data sources, presented in professional business intelligence format.",
    "bi.stats.dataPoints": "Data Points",
    "bi.stats.categories": "Categories",
    "bi.stats.realTime": "Updates",
    
    // BI Navigation
    "bi.nav.overview": "Overview",
    "bi.nav.economy": "Economy & Investment",
    "bi.nav.trade": "Trade & Industry",
    "bi.nav.regulation": "Regulation & Tax",
    "bi.nav.workforce": "Workforce & Society",
    "bi.nav.infrastructure": "Infrastructure & Innovation",
    
    // BI Filter
    "bi.filter.searchPlaceholder": "Search data insights...",
    "bi.filter.selectCategory": "Select Category",
    "bi.filter.selectYear": "Select Year",
    "bi.filter.allCategories": "All Categories",
    "bi.filter.allYears": "All Years",
    "bi.filter.activeFilters": "Active Filters",
    "bi.filter.clearAll": "Clear All",
    "bi.filter.showing": "Showing",
    "bi.filter.of": "of",
    "bi.filter.results": "results",
    "bi.filter.noResults": "No Data Found",
    "bi.filter.noResultsDesc": "Try adjusting your filters to see more results.",
    "bi.filter.clearFilters": "Clear Filters",
    
    // BI Categories
    "bi.economy.title": "Economy & Investment",
    "bi.economy.metaDescription": "Thailand economic indicators, GDP growth, exchange rates, and investment data from BOT, NESDC, and BOI.",
    "bi.economy.description": "Track Thailand's economic performance with real-time data from the Bank of Thailand, NESDC, and Board of Investment.",
    
    "bi.trade.title": "Trade & Industry",
    "bi.trade.metaDescription": "Thailand trade statistics, export/import data, and industrial indicators from Customs and Ministry of Commerce.",
    "bi.trade.description": "Monitor Thailand's trade performance and industrial indicators from official government sources.",
    
    "bi.regulation.title": "Regulation & Tax",
    "bi.regulation.metaDescription": "Thailand tax collection, regulatory changes, and compliance data from Revenue Department and government agencies.",
    "bi.regulation.description": "Stay updated on Thailand's regulatory environment and tax policy changes affecting businesses.",
    
    "bi.workforce.title": "Workforce & Society",
    "bi.workforce.metaDescription": "Thailand employment statistics, labor market data, and social indicators from NSO and Ministry of Labour.",
    "bi.workforce.description": "Analyze Thailand's workforce trends and social development indicators for strategic planning.",
    
    "bi.infrastructure.title": "Infrastructure & Innovation",
    "bi.infrastructure.metaDescription": "Thailand digital economy, infrastructure development, and innovation metrics from DEPA, IEAT, and AOT.",
    "bi.infrastructure.description": "Explore Thailand's infrastructure development and digital transformation progress.",
    
    // BI Data Sources
    "bi.dataSources.title": "Official Data Sources",
    "bi.dataSources.bot": "Central bank monetary policy and exchange rate data",
    "bi.dataSources.nesdc": "National economic development and GDP statistics",
    "bi.dataSources.boi": "Investment promotion and foreign investment data",
    "bi.dataSources.customs": "Import/export statistics and trade data",
    "bi.dataSources.fti": "Industrial production and manufacturing indicators",
    "bi.dataSources.moc": "Commercial trade and business registration data",
    "bi.dataSources.revenue": "Tax collection and fiscal revenue statistics",
    "bi.dataSources.gazette": "Legal and regulatory announcements",
    "bi.dataSources.labour": "Employment regulations and labor statistics",
    "bi.dataSources.nso": "Population, employment, and social statistics",
    "bi.dataSources.ieat": "Industrial estate and special economic zone data",
    "bi.dataSources.depa": "Digital economy and technology development metrics",
    "bi.dataSources.aot": "Airport operations and transportation infrastructure",

    // News Section
    "newsSection.featuredStories": "Featured Stories",
    "newsSection.latestNews": "Latest News",
    
    // News Filter
    "newsFilter.category": "Category",
    "newsFilter.year": "Year",
    "newsFilter.selectCategory": "Select Category",
    "newsFilter.selectYear": "Select Year",
    "newsFilter.allCategories": "All Categories",
    "newsFilter.allYears": "All Years",
    "newsFilter.activeFilters": "Active Filters",
    "newsFilter.clearAll": "Clear All",
    "newsFilter.showingResults": "Showing {{count}} of {{total}} articles",
    "newsFilter.noResults": "No Articles Found",
    "newsFilter.noResultsDesc": "Try adjusting your filters to see more results.",
    "newsFilter.clearFilters": "Clear Filters",

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
    

    "footer.copyright": "All rights reserved. | Connecting Asia through trusted journalism.",

    // Privacy Policy
    "privacy.locale": "en-US",
    "privacy.title": "Privacy Policy - Harmony Asia News",
    "privacy.description": "Learn how Harmony Asia News protects your privacy and personal information.",
    "privacy.effectiveDate": "Effective Date",
    "privacy.lastUpdated": "Last Updated",
    "privacy.introduction.title": "Introduction",
    "privacy.introduction.content": "At Harmony Asia News, we are committed to protecting the privacy and personal information of our subscribers and visitors. This Privacy Policy explains how we collect, use, store, and protect your information.",
    "privacy.informationCollected.title": "Information We Collect",
    "privacy.informationCollected.personal.title": "Personal Details:",
    "privacy.informationCollected.personal.content": "Name, email, position, industry, subscription plan, and stated purpose.",
    "privacy.informationCollected.payment.title": "Payment Information:",
    "privacy.informationCollected.payment.content": "Processed securely by Stripe (we do not store card details).",
    "privacy.informationCollected.usage.title": "Usage Data:",
    "privacy.informationCollected.usage.content": "Articles read, preferences, and interaction history on our website.",
    "privacy.howWeUse.title": "How We Use Your Information",
    "privacy.howWeUse.provide": "To provide news, insights, and reports according to your subscription.",
    "privacy.howWeUse.personalize": "To personalize content and newsletters for your business needs.",
    "privacy.howWeUse.payments": "To process payments securely via our payment partners.",
    "privacy.howWeUse.improve": "To improve our services and enhance user experience.",
    "privacy.dataSharing.title": "Data Sharing & Third Parties",
    "privacy.dataSharing.noSell": "We do not sell personal data.",
    "privacy.dataSharing.thirdParty": "We may share information only with trusted service providers (e.g., Stripe, analytics tools) for payment, security, and service improvement.",
    "privacy.dataSharing.compliance": "All third-party partners are required to comply with data protection standards.",
    "privacy.dataSecurity.title": "Data Security",
    "privacy.dataSecurity.content": "We use encryption and industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.",
    "privacy.userRights.title": "User Rights",
    "privacy.userRights.access": "Access, update, or delete your personal information via your My Page or by contacting us.",
    "privacy.userRights.cancel": "Cancel subscriptions anytime through the Stripe Customer Portal.",
    "privacy.changes.title": "Changes to this Policy",
    "privacy.changes.content": "We may update this Privacy Policy when necessary. Updates will be published on this page with the latest effective date.",
    "privacy.contact.title": "Contact Us",
    "privacy.contact.content": "If you have questions about this Privacy Policy, please visit our Contact Us page.",
    "privacy.contact.button": "Contact Us",

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
    
    "subscribe.plans.basic.title": "Basic Plan (First 30 days free)",
    "subscribe.plans.basic.price": "฿599/month",
    "subscribe.plans.basic.billingInfo": "฿599/month (First 30 days free trial)",
    "subscribe.plans.basic.description": "Full access to all daily news and website + newsletter",
    "subscribe.plans.basic.cta": "Subscribe to Basic Plan",
    "subscribe.plans.basic.detailedDescription": "Includes daily news delivery, basic market analysis, and newsletter subscription.",
    
    "subscribe.plans.premium.title": "Premium Plan",
    "subscribe.plans.premium.price": "฿1,299/month",
    "subscribe.plans.premium.billingInfo": "฿1,299/month",
    "subscribe.plans.premium.description": "Includes all Basic features plus in-depth analysis and reports",
    "subscribe.plans.premium.cta": "Subscribe to Premium Plan",
    "subscribe.plans.premium.popular": "Most Popular",
    "subscribe.plans.premium.detailedDescription": "Includes premium analysis, detailed reports, PDF downloads, and executive insights.",
    
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

    // Expanded subscription plan descriptions - see above in plans section

    // Sign-up page
    "signup.title": "Sign Up - Harmony Asia News",
    "signup.metaDescription": "Create your account and start your subscription to Harmony Asia News",
    "signup.hero.title": "Join Harmony Asia News",
    "signup.hero.subtitle": "Create your account and choose your subscription plan",
    "signup.form.name": "Name",
    "signup.form.namePlaceholder": "Your full name",
    "signup.form.email": "Email",
    "signup.form.emailPlaceholder": "your@email.com",
    "signup.form.password": "Password",
    "signup.form.passwordPlaceholder": "Create a secure password",
    "signup.form.position": "Position",
    "signup.form.positionPlaceholder": "Select your position",
    "signup.form.industry": "Industry",
    "signup.form.industryPlaceholder": "Select your industry",
    "signup.form.purpose": "Purpose of Subscription / 購読目的",
    "signup.form.purposePlaceholder": "Select your purpose",
    "signup.form.otherPurposePlaceholder": "Please specify your purpose",
    "signup.form.plan": "Subscription Plan",
    "signup.form.submitButton": "Proceed to Payment",
    "signup.form.loginLink": "Already have an account? Sign in",

    // Position options
    "signup.positions.ceo": "CEO / Managing Director",
    "signup.positions.executive": "Executive / VP",
    "signup.positions.manager": "Manager",
    "signup.positions.analyst": "Analyst",
    "signup.positions.consultant": "Consultant",
    "signup.positions.entrepreneur": "Entrepreneur",
    "signup.positions.investor": "Investor",
    "signup.positions.other": "Other",

    // Industry options
    "signup.industries.manufacturing": "Manufacturing",
    "signup.industries.technology": "Technology",
    "signup.industries.finance": "Finance / Banking",
    "signup.industries.healthcare": "Healthcare",
    "signup.industries.retail": "Retail",
    "signup.industries.automotive": "Automotive",
    "signup.industries.realestate": "Real Estate",
    "signup.industries.agriculture": "Agriculture",
    "signup.industries.logistics": "Logistics",
    "signup.industries.energy": "Energy",
    "signup.industries.consulting": "Consulting",
    "signup.industries.other": "Other",

    // Purpose options
    "signup.purposes.business_news": "To stay updated with Thailand's business news",
    "signup.purposes.market_research": "For market/industry research",
    "signup.purposes.strategic_decisions": "For strategic decision-making",
    "signup.purposes.team_insights": "To share insights with my team",
    "signup.purposes.other": "Other",

    // Sign-up form fields
    "signup.purpose": "Purpose",
    "signup.purposePlaceholder": "Select your purpose",
    "signup.acceptTermsPrefix": "I agree to the",
    "signup.privacyPolicy": "Privacy Policy",
    "signup.and": "and",
    "signup.termsOfService": "Terms of Service",
    "signup.errors.acceptTerms": "Please accept the Privacy Policy and Terms of Service",
    "signup.errors.notAuthenticated": "Please sign up first",
    "signup.errors.general": "An error occurred. Please try again.",

    // Authentication
    "auth.signUp": "Sign Up",
    "auth.login": "Login",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.fullName": "Full Name",
    "auth.position": "Position",
    "auth.industry": "Industry",
    "auth.subscriptionPlan": "Subscription Plan",
    "auth.selectPosition": "Select your position",
    "auth.selectIndustry": "Select your industry",
    "auth.createAccount": "Create Account",
    "auth.alreadyHaveAccount": "Already have an account? Login",
    "auth.needAccount": "Need an account? Sign up",
    "auth.error": "Error",
    "auth.checkEmail": "Check your email",
    "auth.verificationSent": "Please check your email for verification",
    "auth.unexpectedError": "An unexpected error occurred",
    "auth.welcome": "Welcome!",
    "auth.loginSuccess": "Successfully logged in",
    "auth.creating": "Creating account...",
    "auth.loggingIn": "Logging in...",
    "auth.rememberMe": "Remember me",
    "auth.forgotPassword": "Forgot my password?",
    "auth.resetPassword": "Reset Password",
    "auth.resetPasswordDescription": "Enter your email to receive password reset instructions",
    "auth.sendResetEmail": "Send Reset Email",
    "auth.resetEmailSent": "Reset email sent",
    "auth.resetEmailSentDescription": "Check your email for password reset instructions",
    "auth.backToLogin": "Back to Login",
    "auth.newPassword": "New Password",
    "auth.confirmPassword": "Confirm Password", 
    "auth.enterNewPassword": "Enter your new password below",
    "auth.updatePassword": "Update Password",
    "auth.updating": "Updating...",
    "auth.passwordResetSuccess": "Password updated successfully",
    "auth.passwordsDoNotMatch": "Passwords do not match",
    "auth.passwordTooShort": "Password must be at least 6 characters",
    "auth.success": "Success",

    // My Page / Dashboard
    "dashboard.title": "My Dashboard - Harmony Asia News",
    "dashboard.metaDescription": "Manage your subscription, profile, and access to Harmony Asia News",
    "dashboard.welcomeBack": "Welcome back",
    "dashboard.profile.title": "Profile Information",
    "dashboard.profile.edit": "Edit Profile",
    "dashboard.subscription.title": "Subscription Details",
    "dashboard.subscription.plan": "Current Plan",
    "dashboard.subscription.status": "Status",
    "dashboard.subscription.renewalDate": "Next Renewal",
    "dashboard.subscription.billingDate": "Next Billing",
    "dashboard.subscription.active": "Active",

    // My Page
    "mypage.title": "My Page - Harmony Asia News",
    "mypage.description": "Manage your account and subscription",
    "mypage.welcome": "My Page",
    "mypage.signOut": "Sign Out",
    "mypage.profileInfo": "Profile Information",
    "mypage.subscriptionInfo": "Subscription Information",
    "mypage.currentPlan": "Current Plan",
    "mypage.freeTrial": "Free Trial",
    "mypage.trialEnds": "Trial Ends",
    "mypage.nextBilling": "Next Billing",
    "mypage.upgradePlan": "Upgrade Plan",
    "mypage.cancelSubscription": "Cancel Subscription",
    "mypage.readingHistory": "Reading History",
    "mypage.viewAll": "View All",
    
    // Cancellation
    "cancellation.selectReason": "Why are you cancelling?",
    "cancellation.selectReasonDescription": "Please help us understand why you're cancelling your subscription:",
    "cancellation.reasons.expensive": "Too expensive",
    "cancellation.reasons.content": "Not enough relevant content",
    "cancellation.reasons.otherServices": "Prefer other services",
    "cancellation.reasons.temporary": "Temporary (plan to re-subscribe later)",
    "cancellation.reasons.other": "Other (please specify)",
    "cancellation.otherReasonPlaceholder": "Please tell us more...",
    "cancellation.confirmTitle": "Confirm Cancellation",
    "cancellation.confirmQuestion": "Are you sure you want to cancel your subscription?",
    "cancellation.warningMessage": "If you cancel now, your subscription will remain active until the current billing cycle ends. No further payments will be processed for the next month.",
    "cancellation.confirmCancel": "Yes, Cancel Subscription",
    "cancellation.processing": "Cancelling Subscription...",
    "cancellation.processingMessage": "Please wait while we process your cancellation.",
    "cancellation.success.title": "Subscription Cancelled",
    "cancellation.success.description": "Your subscription has been successfully cancelled. Thank you for using Harmony Asia News.",
    "mypage.notProvided": "Not provided",
    "mypage.noSubscription": "No subscription",
    "mypage.activeSubscription": "Active",
    "mypage.inactiveSubscription": "Inactive",
    "mypage.trialExpired": "Trial Expired",
    "mypage.basicPlan": "Basic Plan",

    // Common
    "common.loading": "Loading...",
    "common.cancel": "Cancel",
    "common.continue": "Continue",
    "common.back": "Back",

    // Paywall
    "paywall.login.title": "Continue Reading",
    "paywall.login.description": "To continue reading, please subscribe or log in to your account.",
    "paywall.login.freeTrialButton": "Try Free for 30 Days",
    "paywall.login.loginButton": "Log In",
    "paywall.premium.title": "Premium Content",
    "paywall.premium.description": "This content is available only to Premium members. Upgrade to access.",
    "paywall.premium.upgradeButton": "Upgrade to Premium",
    "dashboard.subscription.inactive": "Inactive",
    "dashboard.subscription.manage": "Manage Subscription",
    "dashboard.subscription.upgrade": "Upgrade Plan",
    "dashboard.subscription.cancel": "Cancel Subscription",
    "dashboard.history.title": "Reading History",
    "dashboard.history.noHistory": "No reading history yet",
    "dashboard.history.viewAll": "View All Articles",

    // Translations for Payment Success
    "paymentSuccess.title": "Payment Successful - Harmony Asia News",
    "paymentSuccess.loading": "Loading...",
    "paymentSuccess.details.customerInfo": "Customer Information",
    "paymentSuccess.metaDescription": "Your payment has been processed successfully",
    "paymentSuccess.hero.title": "Payment Successful – Welcome to Harmony Asia News!",
    "paymentSuccess.details.title": "Subscription Summary",
    "paymentSuccess.details.plan": "Plan",
    "paymentSuccess.details.startDate": "Start Date",
    "paymentSuccess.details.renewalDate": "Renewal Date",
    "paymentSuccess.actions.dashboard": "Go to My Page",
    "paymentSuccess.actions.news": "Back to News",

    // Not Found
    "notfound.title": "Page Not Found",
    "notfound.subtitle": "The page you are looking for does not exist. Try returning to the homepage or explore our Insights.",
    "notfound.backHome": "Back to Home",

    // Terms of Service
    "terms.title": "Terms of Service - Harmony Asia News",
    "terms.metaDescription": "Terms of Service for Harmony Asia News subscription and website usage",
    "terms.hero.title": "Terms of Service",
    "terms.hero.subtitle": "Please read these terms carefully before using our services",
    
    "terms.section1.title": "1. Introduction",
    "terms.section1.content": "Welcome to Harmony Asia News. By accessing or using our website and subscription services, you agree to these Terms of Service. Please read them carefully before subscribing.",
    
    "terms.section2.title": "2. Services",
    "terms.section2.content": "Harmony Asia News provides business news, market insights, analysis reports, and resources to support international executives and companies operating in Thailand and Southeast Asia. Service offerings vary by subscription plan (Basic, Premium, Corporate).",
    
    "terms.section3.title": "3. Subscription & Payment",
    "terms.section3.trial": "Users may start with a 30-day free trial under the Basic Plan. No charges will apply during the trial period.",
    "terms.section3.autorenewal": "After the trial ends, your subscription will automatically convert to the selected paid plan unless canceled before the renewal date.",
    "terms.section3.payment": "All payments are processed securely via Stripe. By subscribing, you authorize recurring billing until you cancel.",
    
    "terms.section4.title": "4. Account & Usage",
    "terms.section4.information": "Users must provide accurate information (name, email, position, industry, purpose of subscription).",
    "terms.section4.sharing": "Accounts are personal and may not be shared unless a Corporate Plan is purchased.",
    
    "terms.section5.title": "5. Cancellation & Refunds",
    "terms.section5.cancellation": "Subscriptions can be canceled at any time via the My Page dashboard (Stripe Customer Portal).",
    "terms.section5.refunds": "Refunds are not generally provided for partial periods unless required by law.",
    
    "terms.section6.title": "6. Content & Intellectual Property",
    "terms.section6.ownership": "All articles, insights, reports, and visuals are the property of Harmony Asia News.",
    "terms.section6.purpose": "Content is provided for informational purposes only and should not be considered legal, financial, or investment advice.",
    
    "terms.section7.title": "7. Privacy & Data",
    "terms.section7.policy": "We collect and process personal data in accordance with our Privacy Policy.",
    "terms.section7.metadata": "Metadata such as Position, Industry, and Purpose of Subscription may be stored securely for personalization and analytics.",
    
    "terms.section8.title": "8. Limitation of Liability",
    "terms.section8.content": "We strive to provide accurate, up-to-date information, but do not guarantee completeness or accuracy. Decisions made based on our content are the responsibility of the subscriber.",
    
    "terms.section9.title": "9. Changes to Terms",
    "terms.section9.content": "We may update these Terms from time to time. Continued use of our services after changes indicates your acceptance.",
    
    "terms.section10.title": "10. Contact Us",
    "terms.section10.content": "If you have any questions, please contact us via the",
    "terms.section10.link": "Contact Us page",
    "terms.section10.suffix": ".",

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
    "about.title": "About Harmony Asia News",
    "about.description": "Empowering Japanese businesses in Thailand for a sustainable future through trusted insights and strategic intelligence.",
    "about.hero.title": "Empowering Japanese Businesses in Thailand for a Sustainable Future",
    "about.hero.subtitle": "We are committed to helping Japanese companies regain strong, sustainable presence in Thailand and Southeast Asia.",
    "about.hero.cta": "Subscribe for Insights",
    "about.overview.title": "Our Company",
    "about.overview.content": "Harmony Asia News is a Thailand-based business news agency founded to empower Japanese companies and international leaders in navigating Thailand's complex market. With deep Japanese competency and trusted local expertise, our mission is to ensure Japanese businesses regain strong, sustainable presence in Thailand and Southeast Asia.",
    "about.mission.title": "Our Mission", 
    "about.mission.content": "We deliver not only speed and depth of business intelligence but also a long-term vision: enabling Japanese enterprises to thrive sustainably, expand confidently, and reclaim their leadership presence in Southeast Asia.",
    "about.vision.title": "Our Vision",
    "about.vision.content": "To become the most trusted bridge for Japanese companies to achieve long-term sustainability in Thailand, empowering executives with insights that ensure resilient growth, innovation, and enduring success.",
    "about.sustainability.title": "Sustainability & Impact",
    "about.sustainability.growth.title": "Sustainable Growth",
    "about.sustainability.growth.content": "Supporting eco-conscious strategies and resilient operations.",
    "about.sustainability.presence.title": "Regional Presence",
    "about.sustainability.presence.content": "Helping Japanese firms reclaim leadership in Southeast Asia.",
    "about.sustainability.partnership.title": "Trusted Partnership",
    "about.sustainability.partnership.content": "Bridging cultures with integrity and long-term vision.",
    "about.target.title": "Who We Serve",
    "about.target.content": "We serve forward-looking executives, particularly Japanese leaders, who seek not just reliable business intelligence, but the strategic foresight to drive sustainable success in Thailand and Southeast Asia.",
    "about.cta.title": "Be Part of the Future of Japanese Business in Thailand",
    "about.cta.content": "Subscribe today and access actionable insights, strategic intelligence, and visionary perspectives.",
    "about.cta.button": "Subscribe Now",
  },
  ja: {
    // Common
    "brand.name": "HARMONY",
    "cta.membership": "メンバーシップ",
    "search.placeholder": "ニュース、インサイトを検索...",
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
    "nav.signup": "サインアップ",
    "nav.contact": "お問い合わせ",

    // Header
    "header.login": "ログイン",
    "header.signUp": "新規登録",
    "header.myPage": "マイページ",

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

    // News Section (Japanese)
    'newsSection.featuredStories': '注目のストーリー',
    'newsSection.latestNews': '最新ニュース',
    
    // News Filter (Japanese)
    'newsFilter.category': 'カテゴリー',
    'newsFilter.year': '年',
    'newsFilter.selectCategory': 'カテゴリーを選択',
    'newsFilter.selectYear': '年を選択',
    'newsFilter.allCategories': 'すべてのカテゴリー',
    'newsFilter.allYears': 'すべての年',
    'newsFilter.activeFilters': 'アクティブフィルター',
    'newsFilter.clearAll': 'すべてクリア',
    'newsFilter.showingResults': '{{total}}件中{{count}}件を表示',
    'newsFilter.noResults': '記事が見つかりません',
    'newsFilter.noResultsDesc': 'フィルターを調整してより多くの結果を表示してください。',
    'newsFilter.clearFilters': 'フィルターをクリア',

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

    // Privacy Policy
    "privacy.locale": "ja-JP",
    "privacy.title": "プライバシーポリシー - Harmony Asia News",
    "privacy.description": "Harmony Asia Newsがお客様のプライバシーと個人情報をどのように保護しているかをご説明します。",
    "privacy.effectiveDate": "施行日",
    "privacy.lastUpdated": "最終更新日",
    "privacy.introduction.title": "概要",
    "privacy.introduction.content": "Harmony Asia News は、利用者および購読者の個人情報を保護することを最優先に考えています。本プライバシーポリシーは、当社が収集・利用・保管する情報およびその保護方法について説明します。",
    "privacy.informationCollected.title": "収集する情報",
    "privacy.informationCollected.personal.title": "個人情報：",
    "privacy.informationCollected.personal.content": "氏名、メールアドレス、役職、業種、購読プラン、購読目的",
    "privacy.informationCollected.payment.title": "決済情報：",
    "privacy.informationCollected.payment.content": "Stripe を通じて安全に処理（カード情報は当社で保存しません）",
    "privacy.informationCollected.usage.title": "利用データ：",
    "privacy.informationCollected.usage.content": "閲覧した記事、関心分野、サイト上での利用履歴",
    "privacy.howWeUse.title": "情報の利用目的",
    "privacy.howWeUse.provide": "ニュース、インサイト、レポートの提供",
    "privacy.howWeUse.personalize": "ビジネスニーズに合わせたコンテンツやニュースレターのパーソナライズ",
    "privacy.howWeUse.payments": "決済処理（Stripe 等の信頼できるパートナーを通じて）",
    "privacy.howWeUse.improve": "サービス品質および利用者体験の向上",
    "privacy.dataSharing.title": "情報の共有",
    "privacy.dataSharing.noSell": "個人情報を第三者に販売することはありません。",
    "privacy.dataSharing.thirdParty": "決済処理・セキュリティ・サービス改善のため、信頼できる外部サービス提供者と必要最小限の範囲で共有することがあります。",
    "privacy.dataSharing.compliance": "外部パートナーはデータ保護基準を遵守する義務があります。",
    "privacy.dataSecurity.title": "データの安全管理",
    "privacy.dataSecurity.content": "当社は、暗号化や業界標準のセキュリティ対策を用いて個人情報を保護します。ただし、インターネット上での送信が100％安全であることを保証するものではありません。",
    "privacy.userRights.title": "利用者の権利",
    "privacy.userRights.access": "マイページまたはお問い合わせを通じて、個人情報の閲覧・修正・削除が可能です。",
    "privacy.userRights.cancel": "Stripe Customer Portal を通じて、いつでも購読を解約できます。",
    "privacy.changes.title": "規約の変更",
    "privacy.changes.content": "当社は必要に応じて本ポリシーを更新する場合があります。変更は本ページに公開され、施行日が更新されます。",
    "privacy.contact.title": "お問い合わせ",
    "privacy.contact.content": "本プライバシーポリシーに関するご質問は、お問い合わせページからご連絡ください。",
    "privacy.contact.button": "お問い合わせ",

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
    
    "subscribe.plans.basic.title": "ベーシックプラン (最初の30日間無料)",
    "subscribe.plans.basic.price": "฿599/月",
    "subscribe.plans.basic.billingInfo": "月額599バーツ（最初の30日間は無料トライアル）",
    "subscribe.plans.basic.description": "すべての日次ニュースとウェブサイト+ニュースレターへのフルアクセス",
    "subscribe.plans.basic.cta": "ベーシックプランに登録",
    "subscribe.plans.basic.detailedDescription": "毎日のニュース配信、基本的な市場分析、ニュースレター購読が含まれます。",
    
    "subscribe.plans.premium.title": "プレミアムプラン",
    "subscribe.plans.premium.price": "฿1,299/月",
    "subscribe.plans.premium.billingInfo": "月額1,299バーツ",
    "subscribe.plans.premium.description": "ベーシック機能に加え、詳細分析とレポート",
    "subscribe.plans.premium.cta": "プレミアムプランに登録",
    "subscribe.plans.premium.popular": "最も人気",
    "subscribe.plans.premium.detailedDescription": "プレミアム分析、詳細レポート、PDF ダウンロード、エグゼクティブインサイトが含まれます。",
    
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

    // Expanded subscription plan descriptions - see above in plans section

    // Sign-up page (Japanese)
    "signup.title": "サインアップ - Harmony Asia News",
    "signup.metaDescription": "アカウントを作成してHarmony Asia Newsの購読を開始",
    "signup.hero.title": "Harmony Asia Newsに参加",
    "signup.hero.subtitle": "アカウントを作成して購読プランを選択してください",
    "signup.form.name": "名前",
    "signup.form.namePlaceholder": "フルネーム",
    "signup.form.email": "メールアドレス",
    "signup.form.emailPlaceholder": "your@email.com",
    "signup.form.password": "パスワード",
    "signup.form.passwordPlaceholder": "安全なパスワードを作成",
    "signup.form.position": "役職",
    "signup.form.positionPlaceholder": "役職を選択",
    "signup.form.industry": "業種",
    "signup.form.industryPlaceholder": "業種を選択",
    "signup.form.purpose": "Purpose of Subscription / 購読目的",
    "signup.form.purposePlaceholder": "目的を選択",
    "signup.form.otherPurposePlaceholder": "詳細をご記入ください",
    "signup.form.plan": "購読プラン",
    "signup.form.submitButton": "決済に進む",
    "signup.form.loginLink": "アカウントをお持ちですか？サインイン",

    // Position options (Japanese)
    "signup.positions.ceo": "CEO / 代表取締役",
    "signup.positions.executive": "エグゼクティブ / 取締役",
    "signup.positions.manager": "マネージャー",
    "signup.positions.analyst": "アナリスト",
    "signup.positions.consultant": "コンサルタント",
    "signup.positions.entrepreneur": "起業家",
    "signup.positions.investor": "投資家",
    "signup.positions.other": "その他",

    // Industry options (Japanese)
    "signup.industries.manufacturing": "製造業",
    "signup.industries.technology": "テクノロジー",
    "signup.industries.finance": "金融・銀行",
    "signup.industries.healthcare": "ヘルスケア",
    "signup.industries.retail": "小売",
    "signup.industries.automotive": "自動車",
    "signup.industries.realestate": "不動産",
    "signup.industries.agriculture": "農業",
    "signup.industries.logistics": "物流",
    "signup.industries.energy": "エネルギー",
    "signup.industries.consulting": "コンサルティング",
    "signup.industries.other": "その他",

    // Purpose options (Japanese)
    "signup.purposes.business_news": "タイのビジネスニュースを常に把握するため",
    "signup.purposes.market_research": "市場・業界調査のため",
    "signup.purposes.strategic_decisions": "戦略的な意思決定のため",
    "signup.purposes.team_insights": "チームとインサイトを共有するため",
    "signup.purposes.other": "その他",

    // Sign-up form fields
    "signup.purpose": "購読目的",
    "signup.purposePlaceholder": "目的を選択してください",
    "signup.acceptTermsPrefix": "以下に同意します：",
    "signup.privacyPolicy": "プライバシーポリシー",
    "signup.and": "および",
    "signup.termsOfService": "利用規約",
    "signup.errors.acceptTerms": "プライバシーポリシーと利用規約に同意してください",
    "signup.errors.notAuthenticated": "先にサインアップしてください",
    "signup.errors.general": "エラーが発生しました。もう一度お試しください。",

    // My Page / Dashboard (Japanese)
    "dashboard.title": "マイページ - Harmony Asia News",
    "dashboard.metaDescription": "購読、プロフィール、Harmony Asia Newsへのアクセスを管理",
    "dashboard.welcomeBack": "お帰りなさい",
    "dashboard.profile.title": "プロフィール情報",
    "dashboard.profile.edit": "プロフィール編集",
    "dashboard.subscription.title": "購読詳細",
    "dashboard.subscription.plan": "現在のプラン",
    "dashboard.subscription.status": "ステータス",
    "dashboard.subscription.renewalDate": "次回更新日",
    "dashboard.subscription.billingDate": "次回請求日",
    "dashboard.subscription.active": "アクティブ",
    "dashboard.subscription.inactive": "非アクティブ",
    "dashboard.subscription.manage": "購読管理",
    "dashboard.subscription.upgrade": "プランアップグレード",
    "dashboard.subscription.cancel": "購読キャンセル",
    "dashboard.history.title": "閲覧履歴",
    "dashboard.history.noHistory": "まだ閲覧履歴がありません",
    "dashboard.history.viewAll": "すべての記事を表示",

    // Payment Success (Japanese)
    "paymentSuccess.title": "決済完了 - Harmony Asia News",
    "paymentSuccess.loading": "読み込み中...",
    "paymentSuccess.details.customerInfo": "顧客情報",
    "paymentSuccess.metaDescription": "決済が正常に処理されました",
    "paymentSuccess.hero.title": "決済が完了しました。Harmony Asia Newsへようこそ！",
    "paymentSuccess.details.title": "購読サマリー",
    "paymentSuccess.details.plan": "プラン",
    "paymentSuccess.details.startDate": "開始日",
    "paymentSuccess.details.renewalDate": "更新日",
    "paymentSuccess.actions.dashboard": "マイページへ",
    "paymentSuccess.actions.news": "ニュース一覧へ",

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
    "about.title": "Harmony Asia Newsについて",
    "about.description": "信頼できるインサイトと戦略的インテリジェンスにより、持続可能な未来に向け日本企業のタイでの事業を支援。",
    "about.hero.title": "持続可能な未来に向け、日本企業のタイでの事業を支援",
    "about.hero.subtitle": "私たちは日本企業がタイおよび東南アジアで強固で持続可能な存在感を取り戻すことをお手伝いすることをお約束します。",
    "about.hero.cta": "インサイトを購読",
    "about.overview.title": "会社概要",
    "about.overview.content": "Harmony Asia Newsは、日本企業と国際的なリーダーがタイの複雑な市場をナビゲートすることを支援するために設立されたタイ拠点のビジネスニュース通信社です。深い日本語能力と信頼できる現地の専門知識を持つ私たちの使命は、日本企業がタイおよび東南アジアで強固で持続可能な存在感を取り戻すことを確実にすることです。",
    "about.mission.title": "私たちの使命", 
    "about.mission.content": "私たちはビジネスインテリジェンスのスピードと深さだけでなく、長期的なビジョンも提供します：日本企業が持続可能に繁栄し、自信を持って拡大し、東南アジアでのリーダーシップの存在感を取り戻すことを可能にします。",
    "about.vision.title": "私たちのビジョン",
    "about.vision.content": "日本企業がタイで長期的な持続可能性を実現するための最も信頼される架け橋となり、回復力のある成長、イノベーション、永続的な成功を確実にするインサイトで経営者を支援します。",
    "about.sustainability.title": "持続可能性とインパクト",
    "about.sustainability.growth.title": "持続可能な成長",
    "about.sustainability.growth.content": "環境に配慮した戦略と回復力のある事業運営を支援。",
    "about.sustainability.presence.title": "地域での存在感",
    "about.sustainability.presence.content": "日本企業が東南アジアでリーダーシップを取り戻すことを支援。",
    "about.sustainability.partnership.title": "信頼できるパートナーシップ",
    "about.sustainability.partnership.content": "誠実さと長期的なビジョンで文化を架橋。",
    "about.target.title": "私たちが支援する対象",
    "about.target.content": "私たちは、信頼できるビジネスインテリジェンスだけでなく、タイおよび東南アジアで持続可能な成功を推進するための戦略的先見性を求める先進的な経営者、特に日本のリーダーにサービスを提供しています。",
    "about.cta.title": "タイでの日本ビジネスの未来の一部になりませんか",
    "about.cta.content": "今日から購読して、実用的なインサイト、戦略的インテリジェンス、先見性のある視点にアクセスしてください。",
    "about.cta.button": "今すぐ購読",

    // Terms of Service (Japanese)
    "terms.title": "利用規約 - Harmony Asia News",
    "terms.metaDescription": "Harmony Asia News購読およびウェブサイト利用の利用規約",
    "terms.hero.title": "利用規約",
    "terms.hero.subtitle": "サービスご利用前に利用規約をよくお読みください",
    
    "terms.section1.title": "1. はじめに",
    "terms.section1.content": "本ウェブサイト Harmony Asia News をご利用いただくにあたり、本利用規約に同意いただく必要があります。ご利用前に必ずご確認ください。",
    
    "terms.section2.title": "2. サービス内容",
    "terms.section2.content": "Harmony Asia News は、タイおよび東南アジアで事業を展開する国際的なビジネスリーダーに向けて、ビジネスニュース、マーケットインサイト、分析レポート、ローカル知見を提供します。内容は契約プランにより異なります。",
    
    "terms.section3.title": "3. サブスクリプションと料金",
    "terms.section3.trial": "ベーシックプランでは最初の30日間を無料でご利用いただけます（無料トライアル）。",
    "terms.section3.autorenewal": "無料期間終了後は、選択された有料プランに自動的に更新されます。更新日前に解約しない限り、定期的な課金が行われます。",
    "terms.section3.payment": "決済は Stripe を通じて安全に処理されます。",
    
    "terms.section4.title": "4. アカウントと利用",
    "terms.section4.information": "登録時には正確な情報（氏名、メールアドレス、役職、業種、購読目的）をご提供ください。",
    "terms.section4.sharing": "アカウントは個人専用であり、法人プランを除き、第三者と共有することはできません。",
    
    "terms.section5.title": "5. 解約・返金",
    "terms.section5.cancellation": "サブスクリプションはいつでもマイページ（Stripe Customer Portal）から解約可能です。",
    "terms.section5.refunds": "返金は原則として行われません（法律で義務付けられている場合を除きます）。",
    
    "terms.section6.title": "6. コンテンツと知的財産権",
    "terms.section6.ownership": "記事、インサイト、レポート、ビジュアル等のコンテンツはすべて Harmony Asia News に帰属します。",
    "terms.section6.purpose": "提供する情報は一般的な情報提供を目的としたものであり、法的・財務的・投資上の助言を構成するものではありません。",
    
    "terms.section7.title": "7. プライバシーとデータ",
    "terms.section7.policy": "個人情報の収集・利用は当社のプライバシーポリシーに基づきます。",
    "terms.section7.metadata": "役職、業種、購読目的などのメタデータは、パーソナライズや分析のために安全に保存されます。",
    
    "terms.section8.title": "8. 責任の制限",
    "terms.section8.content": "当社は正確かつ最新の情報を提供するよう努めますが、その完全性や正確性を保証するものではありません。コンテンツに基づく意思決定の責任は利用者ご自身にあります。",
    
    "terms.section9.title": "9. 規約の変更",
    "terms.section9.content": "当社は必要に応じて本規約を変更することがあります。変更後もサービスを利用することで、改訂後の規約に同意したものとみなされます。",
    
    "terms.section10.title": "10. お問い合わせ",
    "terms.section10.content": "ご質問がある場合は、当サイトの",
    "terms.section10.link": "Contact Us / お問い合わせページ",
    "terms.section10.suffix": "よりご連絡ください。",

    // Business Tips
    "tips.subtitle": "タイおよびアジア太平洋地域で事業を展開する国際的なビジネスリーダーのための実践的な洞察と戦略。",
    "tips.description": "タイ・日本のビジネス専門家のためのビジネスチップスとインサイト",
    "tips.backToTips": "ビジネスチップスに戻る",
    
    // Business Intelligence (Japanese)
    "nav.businessIntelligence": "ビジネスインテリジェンス",
    "bi.title": "ビジネスインテリジェンス - HARMONY",
    "bi.metaDescription": "タイ政府公式データソースからのリアルタイムビジネスデータ、経済指標、市場洞察にアクセス。",
    "bi.hero.title": "ビジネスインテリジェンス",
    "bi.hero.subtitle": "タイ政府公式データソースからのリアルタイム洞察をプロフェッショナルなビジネスインテリジェンス形式で提供。",
    "bi.stats.dataPoints": "データポイント",
    "bi.stats.categories": "カテゴリー", 
    "bi.stats.realTime": "更新",
    
    // BI Navigation (Japanese)
    "bi.nav.overview": "概要",
    "bi.nav.economy": "経済・投資",
    "bi.nav.trade": "貿易・産業",
    "bi.nav.regulation": "規制・税制",
    "bi.nav.workforce": "労働力・社会",
    "bi.nav.infrastructure": "インフラ・イノベーション",
    
    // BI Filter (Japanese)
    "bi.filter.searchPlaceholder": "データ洞察を検索...",
    "bi.filter.selectCategory": "カテゴリーを選択",
    "bi.filter.selectYear": "年を選択",
    "bi.filter.allCategories": "すべてのカテゴリー",
    "bi.filter.allYears": "すべての年",
    "bi.filter.activeFilters": "アクティブフィルター",
    "bi.filter.clearAll": "すべてクリア",
    "bi.filter.showing": "表示中",
    "bi.filter.of": "/",
    "bi.filter.results": "件",
    "bi.filter.noResults": "データが見つかりません",
    "bi.filter.noResultsDesc": "フィルターを調整してより多くの結果を表示してください。",
    "bi.filter.clearFilters": "フィルターをクリア",
    
    // BI Categories (Japanese)
    "bi.economy.title": "経済・投資",
    "bi.economy.metaDescription": "タイの経済指標、GDP成長率、為替レート、BOT、NESDC、BOIからの投資データ。",
    "bi.economy.description": "タイ中央銀行、NESDC、投資委員会からのリアルタイムデータでタイの経済パフォーマンスを追跡。",
    
    "bi.trade.title": "貿易・産業",
    "bi.trade.metaDescription": "タイの貿易統計、輸出入データ、税関・商務省からの産業指標。",
    "bi.trade.description": "政府公式ソースからタイの貿易パフォーマンスと産業指標を監視。",
    
    "bi.regulation.title": "規制・税制",
    "bi.regulation.metaDescription": "歳入庁と政府機関からのタイの税収、規制変更、コンプライアンスデータ。", 
    "bi.regulation.description": "ビジネスに影響するタイの規制環境と税制政策の変化について最新情報を入手。",

    // Authentication (Japanese)
    "auth.signUp": "新規登録",
    "auth.login": "ログイン",
    "auth.email": "メールアドレス",
    "auth.password": "パスワード",
    "auth.fullName": "氏名",
    "auth.position": "役職",
    "auth.industry": "業種",
    "auth.subscriptionPlan": "サブスクリプションプラン",
    "auth.selectPosition": "役職を選択してください",
    "auth.selectIndustry": "業種を選択してください",
    "auth.createAccount": "アカウント作成",
    "auth.alreadyHaveAccount": "既にアカウントをお持ちですか？ログイン",
    "auth.needAccount": "アカウントが必要ですか？新規登録",
    "auth.error": "エラー",
    "auth.checkEmail": "メールをご確認ください",
    "auth.verificationSent": "確認メールをお送りしました",
    "auth.unexpectedError": "予期しないエラーが発生しました",
    "auth.welcome": "ようこそ！",
    "auth.loginSuccess": "ログインしました",
    "auth.creating": "アカウント作成中...",
    "auth.loggingIn": "ログイン中...",
    "auth.rememberMe": "ログイン情報を記憶する",
    "auth.forgotPassword": "パスワードを忘れましたか？",
    "auth.resetPassword": "パスワードリセット",
    "auth.resetPasswordDescription": "パスワードリセット手順をメールで受け取るためにメールアドレスを入力してください",
    "auth.sendResetEmail": "リセットメールを送信",
    "auth.resetEmailSent": "リセットメールを送信しました",
    "auth.resetEmailSentDescription": "パスワードリセット手順のメールをご確認ください",
    "auth.backToLogin": "ログインに戻る",
    "auth.newPassword": "新しいパスワード",
    "auth.confirmPassword": "パスワード確認",
    "auth.enterNewPassword": "下記に新しいパスワードを入力してください",
    "auth.updatePassword": "パスワードを更新",
    "auth.updating": "更新中...",
    "auth.passwordResetSuccess": "パスワードが正常に更新されました",
    "auth.passwordsDoNotMatch": "パスワードが一致しません",
    "auth.passwordTooShort": "パスワードは6文字以上である必要があります",
    "auth.success": "成功",

    // My Page (Japanese)
    "mypage.title": "マイページ - Harmony Asia News",
    "mypage.description": "アカウントとサブスクリプションの管理",
    "mypage.welcome": "マイページ",
    "mypage.signOut": "ログアウト",
    "mypage.profileInfo": "プロフィール情報",
    "mypage.subscriptionInfo": "サブスクリプション情報",
    "mypage.currentPlan": "現在のプラン",
    "mypage.freeTrial": "無料トライアル",
    "mypage.trialEnds": "トライアル終了日",
    "mypage.nextBilling": "次回請求日",
    "mypage.upgradePlan": "プランをアップグレード",
    "mypage.cancelSubscription": "サブスクリプション解約",
    "mypage.readingHistory": "閲覧履歴",
    "mypage.viewAll": "すべて表示",
    
    // Cancellation (Japanese)
    "cancellation.selectReason": "解約理由を教えてください",
    "cancellation.selectReasonDescription": "サブスクリプションを解約する理由を教えてください:",
    "cancellation.reasons.expensive": "高すぎる",
    "cancellation.reasons.content": "コンテンツが十分でない",
    "cancellation.reasons.otherServices": "他のサービスを利用",
    "cancellation.reasons.temporary": "一時的（再度購読予定あり）",
    "cancellation.reasons.other": "その他（ご記入ください）",
    "cancellation.otherReasonPlaceholder": "詳しく教えてください...",
    "cancellation.confirmTitle": "解約の確認",
    "cancellation.confirmQuestion": "本当にサブスクリプションを解約しますか？",
    "cancellation.warningMessage": "今解約すると、現在の請求期間が終了するまで購読は有効です。次回以降の支払いは行われません。",
    "cancellation.confirmCancel": "はい、サブスクリプションを解約します",
    "cancellation.processing": "サブスクリプションを解約中...",
    "cancellation.processingMessage": "解約処理中です。少々お待ちください。",
    "cancellation.success.title": "サブスクリプション解約完了",
    "cancellation.success.description": "サブスクリプションは正常に解約されました。Harmony Asia Newsをご利用いただきありがとうございました。",
    "mypage.notProvided": "未設定",
    "mypage.noSubscription": "サブスクリプションなし",
    "mypage.activeSubscription": "有効",
    "mypage.inactiveSubscription": "無効",
    "mypage.trialExpired": "トライアル期間終了",
    "mypage.basicPlan": "ベーシックプラン",

    // Common (Japanese)
    "common.loading": "読み込み中...",
    "common.cancel": "キャンセル",
    "common.continue": "続行",
    "common.back": "戻る",

    // Paywall (Japanese)
    "paywall.login.title": "続きを読む",
    "paywall.login.description": "続きを読むには、サブスクリプションにご登録いただくか、アカウントにログインしてください。",
    "paywall.login.freeTrialButton": "30日間無料トライアル",
    "paywall.login.loginButton": "ログイン",
    "paywall.premium.title": "プレミアムコンテンツ",
    "paywall.premium.description": "このコンテンツはプレミアム会員専用です。アクセスするにはアップグレードしてください。",
    "paywall.premium.upgradeButton": "プレミアムにアップグレード",
    
    "bi.workforce.title": "労働力・社会",
    "bi.workforce.metaDescription": "国家統計局と労働省からのタイの雇用統計、労働市場データ、社会指標。",
    "bi.workforce.description": "戦略計画のためのタイの労働力トレンドと社会発展指標を分析。",
    
    "bi.infrastructure.title": "インフラ・イノベーション", 
    "bi.infrastructure.metaDescription": "DEPA、IEAT、AOTからのタイのデジタル経済、インフラ開発、イノベーション指標。",
    "bi.infrastructure.description": "タイのインフラ開発とデジタル変革の進歩を探索。",
    
    // BI Data Sources (Japanese)
    "bi.dataSources.title": "公式データソース",
    "bi.dataSources.bot": "中央銀行の金融政策と為替レートデータ",
    "bi.dataSources.nesdc": "国家経済開発とGDP統計",
    "bi.dataSources.boi": "投資促進と外国投資データ",
    "bi.dataSources.customs": "輸出入統計と貿易データ",
    "bi.dataSources.fti": "工業生産と製造業指標",
    "bi.dataSources.moc": "商業貿易と事業登録データ",
    "bi.dataSources.revenue": "税収と財政収入統計",
    "bi.dataSources.gazette": "法律と規制の発表",
    "bi.dataSources.labour": "雇用規制と労働統計",
    "bi.dataSources.nso": "人口、雇用、社会統計",
    "bi.dataSources.ieat": "工業団地と特別経済区域データ",
    "bi.dataSources.depa": "デジタル経済と技術開発指標",
    "bi.dataSources.aot": "空港運営と交通インフラ",
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
    try {
      const stored = localStorage.getItem("lang") as Lang | null;
      if (stored === "th") return "en";
      return (stored as Lang) || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      document.documentElement.lang = lang;
      localStorage.setItem("lang", lang);
    } catch {
      // Ignore localStorage errors
    }
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
