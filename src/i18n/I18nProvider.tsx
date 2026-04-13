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
    "brand.name": "WaLens",
    "brand.tagline": "Your Japanese lens into global business",
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
    "nav.faq": "FAQ",

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
    "tips.subtitle": "Practical insights and strategies for international business leaders navigating global markets.",
    "tips.description": "Business tips and insights for global business professionals",
    "tips.backToTips": "Back to Business Tips",

    // News
    "news.title": "Latest News - WaLens Asia",
    "news.description": "Stay updated with the latest business news and insights from across Asia",
    "news.heroTitle": "Latest News & Updates",
    "news.heroSubtitle": "Stay informed with breaking news, market analysis, and expert insights from across Asia's dynamic business landscape.",
    "news.backToNews": "Back to News",
    "news.dropdown.all": "All News",
    "news.dropdown.politics": "Politics",
    "news.dropdown.economic": "Economic",
    "news.dropdown.business": "Business",
    "news.dropdown.technology": "Technology",
    "news.dropdown.society": "Society",

    // Pages
    "insights.title": "Insights - WaLens",
    "tips.title": "Business Tips - WaLens", 
    "subscribe.title": "Subscribe - WaLens Asia News",

    // Home hero
    "home.hero.title": "Global Executive Business & Market Insights",
    "home.hero.subtext": "Your Japanese lens into global business — intelligence for decision-makers",
    "home.hero.cta": "Start Free 1-Month Trial",

    // Tags
    "tags.breaking": "Breaking",
    "tags.analysis": "Analysis",
    "tags.opinion": "Opinion",

    // Home sections
    "home.featured": "Featured News",
    "home.latest": "Latest Articles",
    "home.insightHighlight.title": "Insight Highlight",
    "home.insightHighlight.exampleTitle": "5 Global Trends Japanese Businesses Should Know (2025)",

    // Newsletter
    "home.newsletter.title": "Get weekly insights in your inbox — free for your first month",
    "home.newsletter.cta": "Subscribe",
    "home.newsletter.placeholder": "Your email",

    // About stealth
    "home.about.title": "About Us",
    "home.about.text": "WaLens Asia News is operated by WaLens Editorial Team — bridging Japanese & Thai business culture through trusted, clear, and actionable information.",

    // Hero fallback keys used elsewhere
    "hero.featuredImageLabel": "Featured Image",

    // Business Intelligence translations
    "nav.businessIntelligence": "Business Intelligence",
    "bi.title": "Business Intelligence - WaLens",
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
    "privacy.title": "Privacy Policy - WaLens Asia News",
    "privacy.description": "Learn how WaLens Asia News protects your privacy and personal information.",
    "privacy.effectiveDate": "Effective Date",
    "privacy.lastUpdated": "Last Updated",
    "privacy.introduction.title": "Introduction",
    "privacy.introduction.content": "At WaLens Asia News, we are committed to protecting the privacy and personal information of our subscribers and visitors. This Privacy Policy explains how we collect, use, store, and protect your information.",
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
    "contact.title": "Contact Us - WaLens",
    "contact.metaDescription": "Get in touch with WaLens. Send us your email and message.",
    "contact.h1": "Contact Us",
    "contact.emailLabel": "Email",
    "contact.emailPlaceholder": "you@example.com",
    "contact.messageLabel": "Message (optional)",
    "contact.messagePlaceholder": "How can we help?",
    "contact.submit": "Send",
    "contact.success": "Thanks! We'll be in touch soon.",

    "subscribe.metaDescription": "Choose the right plan for your global business intelligence needs",
    "subscribe.hero.title": "Stay Ahead with WaLens",
    "subscribe.hero.subtitle": "Choose the right plan for your global business intelligence needs",
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
    "subscribe.features.featureLabel": "Features",
    "subscribe.features.dailyNews": "Daily News Access",
    "subscribe.features.dailyNews.basicDesc": "Access to curated daily global business news and market updates.",
    "subscribe.features.dailyNews.premiumDesc": "Full access to daily news with deeper context and executive summary.",
    "subscribe.features.premiumInsights": "Premium Insights",
    "subscribe.features.premiumInsights.basicDesc": "Not included.",
    "subscribe.features.premiumInsights.premiumDesc": "In-depth analysis with implications for Japanese companies operating globally. Includes strategic interpretation and industry impact.",
    "subscribe.features.executiveReports": "Executive Reports",
    "subscribe.features.executiveReports.basicDesc": "Not included.",
    "subscribe.features.executiveReports.premiumDesc": "Structured, decision-ready reports designed for management discussions, internal circulation, and board-level understanding.",
    "subscribe.features.pdfDownloads": "PDF Downloads",
    "subscribe.features.multiSeat": "Multi-seat License",
    "subscribe.features.customServices": "Customized Services",
    "subscribe.features.included": "Included",
    "subscribe.features.notIncluded": "Not Included",
    "subscribe.features.positioning.line1": "Choose the plan that matches your level of strategic engagement. Basic is designed for daily awareness. Premium is built for executive decision-making.",
    "subscribe.features.positioning.line2": "Both plans include a 30-day free trial.",
    
    // Final CTA
    "subscribe.finalCta.title": "Join hundreds of executives already staying ahead with WaLens Asia News",
    "subscribe.finalCta.button": "Subscribe Now",

    // Expanded subscription plan descriptions - see above in plans section

    // Sign-up page
    "signup.title": "Sign Up - WaLens Asia News",
    "signup.metaDescription": "Create your account and start your subscription to WaLens Asia News",
    "signup.hero.title": "Join WaLens Asia News",
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
    "signup.purposes.business_news": "To stay updated with global business news",
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
    "auth.resetEmailSentDescription": "We've sent you an email with instructions to reset your password. Please check your email and follow the link provided.",
    "auth.backToLogin": "Back to Login",
    "auth.newPassword": "New Password",
    "auth.confirmPassword": "Confirm Password", 
    "auth.enterNewPassword": "Enter your new password below",
    "auth.updatePassword": "Update Password",
    "auth.updating": "Updating...",
    "auth.passwordResetSuccess": "Your password has been successfully reset. Please log in again.",
    "auth.passwordsDoNotMatch": "Passwords do not match",
    "auth.passwordTooShort": "Password must be at least 8 characters long",
    "auth.passwordRequirements.uppercase": "Contains uppercase letter (A-Z)",
    "auth.passwordRequirements.lowercase": "Contains lowercase letter (a-z)",
    "auth.passwordRequirements.number": "Contains number (0-9)",
    "auth.passwordRequirements.minLength": "At least 8 characters long",
    "auth.passwordValidationError": "Please make sure your password includes uppercase, lowercase, and number.",
    "auth.success": "Success",

    // My Page / Dashboard
    "dashboard.title": "My Dashboard - WaLens Asia News",
    "dashboard.metaDescription": "Manage your subscription, profile, and access to WaLens Asia News",
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
    "mypage.title": "My Page - WaLens Asia News",
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
    "cancellation.success.description": "Your subscription has been successfully cancelled. Thank you for using WaLens Asia News.",
    "mypage.notProvided": "Not provided",
    "mypage.noSubscription": "No subscription",
    "mypage.activeSubscription": "Active",
    "mypage.inactiveSubscription": "Inactive",
    "mypage.trialExpired": "Trial Expired",
    "mypage.basicPlan": "Basic Plan",
    "mypage.editProfile": "Edit",
    "mypage.saveProfile": "Save",
    "mypage.profileRemark": "The more information you provide, the more accurate news we can provide to you.",
    "mypage.freeTrialUntil": "Free trial until",
    "mypage.noReadingHistory": "No reading history yet",
    "mypage.readAt": "Read at",

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
    "paymentSuccess.title": "Payment Successful - WaLens Asia News",
    "paymentSuccess.loading": "Loading...",
    "paymentSuccess.details.customerInfo": "Customer Information",
    "paymentSuccess.metaDescription": "Your payment has been processed successfully",
    "paymentSuccess.hero.title": "Payment Successful – Welcome to WaLens Asia News!",
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
    "terms.title": "Terms of Service - WaLens Asia News",
    "terms.metaDescription": "Terms of Service for WaLens Asia News subscription and website usage",
    "terms.hero.title": "Terms of Service",
    "terms.hero.subtitle": "Please read these terms carefully before using our services",
    
    "terms.section1.title": "1. Introduction",
    "terms.section1.content": "Welcome to WaLens Asia News. By accessing or using our website and subscription services, you agree to these Terms of Service. Please read them carefully before subscribing.",
    
    "terms.section2.title": "2. Services",
    "terms.section2.content": "WaLens provides business news, market insights, analysis reports, and resources to support international executives and companies operating globally. Service offerings vary by subscription plan (Basic, Premium, Corporate).",
    
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
    "terms.section6.ownership": "All articles, insights, reports, and visuals are the property of WaLens Asia News.",
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
    "insights.reports.evBattery": "EV & Battery Industry Report",
    "insights.landing.title": "Global Business Intelligence",
    "insights.landing.description": "Curated industry insights, market analysis, and strategic intelligence for executives navigating global business opportunities.",
    "insights.landing.category": "Business Intelligence Hub",
    "insights.landing.industryFocus": "Industry Focus Areas",
    "insights.landing.exploreInsights": "Explore Insights →",
    "insights.landing.latestIntelligence": "Latest Market Intelligence",

    // Insights Services
    "insights.services.title": "Services Industry Intelligence",
    "insights.services.description": "Navigate digital transformation, fintech innovation, and professional services expansion across global markets.",
    "insights.services.category": "Services Sector",
    "insights.services.latestIntelligence": "Latest Services Intelligence",
    "insights.services.keyGrowthAreas": "Key Growth Areas",
    "insights.services.marketOpportunities": "Market Opportunities",
    "insights.services.exploreOther": "Explore Other Industries",

    // Insights Manufacturing
    "insights.manufacturing.title": "Manufacturing Industry Intelligence",
    "insights.manufacturing.description": "Navigate Industry 4.0, supply chain innovation, and automation opportunities across global markets.",
    "insights.manufacturing.category": "Manufacturing Sector",

    // Insights Wellness Healthcare
    "insights.wellness.title": "Wellness & Healthcare Intelligence",
    "insights.wellness.description": "Explore medical technology, telemedicine, and wellness tourism opportunities across global markets.",
    "insights.wellness.category": "Healthcare Sector",

    // Insights Agriculture
    "insights.agriculture.title": "Agriculture Industry Intelligence", 
    "insights.agriculture.description": "Navigate agri-tech innovation, sustainable farming, and food processing opportunities across global markets.",
    "insights.agriculture.category": "Agriculture Sector",

    // Insights Real Estate
    "insights.realestate.title": "Real Estate Market Intelligence",
    "insights.realestate.description": "Explore commercial property, REITs, and urban development trends across dynamic global real estate markets.",
    "insights.realestate.category": "Real Estate Sector",

    // Why WaLens Section (Landing Page)
    "whyWaLens.title": "Why WaLens?",
    "whyWaLens.chatgpt": "Information is everywhere. But relevance is rare.",
    "whyWaLens.walens": "WaLens delivers what actually matters for Japanese executives navigating global markets.",
    "whyWaLens.point1.title": "Decision Filter",
    "whyWaLens.point1.description": "We filter information through the lens of Japanese executive decision-making across global markets.",
    "whyWaLens.point2.title": "Context-Aware",
    "whyWaLens.point2.description": "Every insight is tailored to the unique challenges facing Japanese businesses operating globally.",
    "whyWaLens.point3.title": "Actionable Interpretation",
    "whyWaLens.point3.description": "We don't just report facts—we interpret what they mean for your business decisions.",
    "whyWaLens.point4.title": "Trusted Judgment",
    "whyWaLens.point4.description": "Built by consultants with 10+ years advising Japanese executives across emerging markets.",

    // About page
    "about.title": "About WaLens - Global Executive Intelligence",
    "about.description": "WaLens is a premium decision-support platform for Japanese executives operating globally. We filter, interpret, and prioritize information for executive-level judgment.",
    "about.hero.title": "Intelligence That Serves Decision-Makers",
    "about.hero.subtitle": "WaLens is a premium decision-support platform designed for Japanese executives investing in or operating businesses across global markets.",
    
    // Mission
    "about.mission.paragraph1": "In today's information environment, the challenge is not access—it is relevance. Japanese executives operating globally need more than news feeds and generic summaries. They need intelligence that reflects local regulatory landscapes, the nuances of cross-border business relations, and the priorities of executive-level decision-making. WaLens exists to provide that layer of judgment.",
    
    // Definition Section
    "about.definition.title": "What WaLens Is — and Is Not",
    "about.definition.is.title": "WaLens provides:",
    "about.definition.is.point1": "A judgment layer that filters and prioritizes information for Japanese executives",
    "about.definition.is.point2": "Context-aware intelligence rooted in local regulatory, economic, and industry landscapes across key markets",
    "about.definition.is.point3": "Executive-level interpretation — not just summaries, but what information means for your decisions",
    "about.definition.is.point4": "Insights shaped by Japanese business governance perspectives and deep local market expertise",
    "about.definition.isNot.title": "WaLens is not:",
    "about.definition.isNot.point1": "A general news media or information aggregation platform",
    "about.definition.isNot.point2": "A substitute for professional advisory — we complement, not replace, your existing counsel",
    "about.definition.isNot.point3": "Raw data or unfiltered information without executive context",
    
    // Value Section
    "about.value.title": "How WaLens Adds Value",
    "about.value.filter.title": "Noise Reduction",
    "about.value.filter.description": "We surface only what is decision-relevant, saving executives from information overload across multiple sources.",
    "about.value.interpretation.title": "Contextual Interpretation",
    "about.value.interpretation.description": "Every insight is interpreted through the lens of Japanese business operations and governance across global markets.",
    "about.value.prioritization.title": "Strategic Prioritization",
    "about.value.prioritization.description": "We prioritize based on impact to investment decisions, regulatory exposure, and operational risk.",
    "about.value.judgment.title": "Trusted Judgment",
    "about.value.judgment.description": "Our editorial team combines deep market expertise with over a decade of experience advising Japanese executives globally.",
    
    // Company Profile Table
    "about.profile.title": "Company Profile",
    "about.profile.company": "Company Name",
    "about.profile.founded": "Founded",
    "about.profile.headquarters": "Headquarters", 
    "about.profile.business": "Business Description",
    "about.profile.team": "Editorial Team",
    "about.profile.company.value": "WaLens",
    "about.profile.founded.value": "2025",
    "about.profile.headquarters.value": "Bangkok, Thailand",
    "about.profile.business.value": "A decision-support platform providing strategic intelligence and executive-level judgment for Japanese businesses operating globally.",
    "about.profile.team.value": "Experienced business consultants with over 10 years advising Japanese executives across diverse industries and global markets.",
    
    // CTA Section
    "about.cta.title": "Your Trusted Global Decision Partner",
    "about.cta.content": "WaLens helps you spend less time gathering information and more time making confident, well-informed decisions.",
    "about.cta.button": "Start Your Trial",

    // Thailand Key Indicators
    "bi.keyIndicators.title": "Thailand Key Indicators - WaLens",
    "bi.keyIndicators.metaDescription": "Executive dashboard showing Thailand's key economic indicators from official government sources including NESDC, BOT, MOC, and BOI.",
    "bi.keyIndicators.nav": "Key Indicators",
    "bi.keyIndicators.hero.title": "Thailand Business Intelligence – Key Indicators",
    "bi.keyIndicators.hero.subtitle": "Latest official data from trusted Thai authorities",
    "bi.keyIndicators.updateNotice": "Data updated as of December 2025 from official sources",
    "bi.keyIndicators.dataSourcesNote": "All data sourced from official Thai government agencies: NESDC, Bank of Thailand, Ministry of Commerce, Office of Industrial Economics, Board of Investment, and National Statistical Office.",
    
    "bi.keyIndicators.gdp.label": "GDP Growth Rate (YoY)",
    "bi.keyIndicators.gdp.description": "Year-over-year GDP growth rate",
    "bi.keyIndicators.inflation.label": "Inflation Rate (CPI)",
    "bi.keyIndicators.inflation.description": "Headline consumer price inflation",
    "bi.keyIndicators.interestRate.label": "Policy Interest Rate",
    "bi.keyIndicators.interestRate.description": "Current BOT policy rate",
    "bi.keyIndicators.exchangeRate.label": "THB / JPY Rate",
    "bi.keyIndicators.exchangeRate.description": "Thai Baht per 1 Japanese Yen",
    "bi.keyIndicators.exportGrowth.label": "Export Growth (YoY)",
    "bi.keyIndicators.exportGrowth.description": "Year-over-year export value growth",
    "bi.keyIndicators.ipi.label": "Industrial Production Index",
    "bi.keyIndicators.ipi.description": "Manufacturing sector activity index",
    "bi.keyIndicators.boiInvestment.label": "BOI Investment Value",
    "bi.keyIndicators.boiInvestment.description": "Total promoted investment (THB)",
    "bi.keyIndicators.unemployment.label": "Unemployment Rate",
    "bi.keyIndicators.unemployment.description": "National unemployment rate"
  },
  ja: {
    // Common
    "brand.name": "WaLens",
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
    "nav.about": "WaLensについて",
    "nav.news": "ニュース",
    "nav.insights": "インサイト",
    "nav.tips": "ビジネスTips",
    "nav.subscribe": "購読",
    "nav.signup": "サインアップ",
    "nav.contact": "お問い合わせ",
    "nav.faq": "FAQ",

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
    "brand.tagline": "グローバルビジネスを解き明かす日本の視座",

    // Banner
    "banner.text": "WaLens へようこそ — 洞察に満ちたニュース、レポート、Thailand 101 をお届けします。",
    "banner.subscribeLink": "全ての機能を利用するには購読",

    // Hero (home)
    "home.hero.title": "グローバル・エグゼクティブ向けビジネス＆マーケットインサイト",
    "home.hero.subtext": "グローバルビジネスを解き明かす日本の視座 — 意思決定者のためのインテリジェンス",
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
    "home.about.text": "WaLens Asia News は WaLens 編集チームによって運営され、日本とタイのビジネス文化をつなぐ、信頼できる明快で実践的な情報を提供します。プロフィールの公開は行っていません。",

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
    "privacy.title": "プライバシーポリシー - WaLens Asia News",
    "privacy.description": "WaLens Asia Newsがお客様のプライバシーと個人情報をどのように保護しているかをご説明します。",
    "privacy.effectiveDate": "施行日",
    "privacy.lastUpdated": "最終更新日",
    "privacy.introduction.title": "概要",
    "privacy.introduction.content": "WaLens Asia News は、利用者および購読者の個人情報を保護することを最優先に考えています。本プライバシーポリシーは、当社が収集・利用・保管する情報およびその保護方法について説明します。",
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
    "contact.title": "お問い合わせ - WaLens",
    "contact.metaDescription": "WaLens へのお問い合わせ。メールとメッセージをお送りください。",
    "contact.h1": "お問い合わせ",
    "contact.emailLabel": "メールアドレス",
    "contact.emailPlaceholder": "you@example.com",
    "contact.messageLabel": "メッセージ（任意）",
    "contact.messagePlaceholder": "どのようなお手伝いが必要ですか？",
    "contact.submit": "送信",
    "contact.success": "ありがとうございます。追ってご連絡いたします。",

    // News
    "news.title": "最新ニュース - WaLens Asia",
    "news.description": "アジア全域の最新ビジネスニュースと洞察で最新情報をキャッチアップ",
    "news.heroTitle": "最新ニュース & アップデート",
    "news.heroSubtitle": "アジアのダイナミックなビジネス環境からの速報、市場分析、専門家の洞察で情報を入手しましょう。",
    "news.backToNews": "ニュース一覧に戻る",
    "news.dropdown.all": "すべてのニュース",
    "news.dropdown.politics": "政治",
    "news.dropdown.economic": "経済",
    "news.dropdown.business": "ビジネス",
    "news.dropdown.technology": "テクノロジー",
    "news.dropdown.society": "社会",

    // Pages
    "insights.title": "インサイト - WaLens",
    "tips.title": "ビジネスチップス - WaLens",
    "subscribe.title": "購読 - WaLens Asia News",
    "subscribe.metaDescription": "グローバルビジネスインテリジェンスに適したプランを選択してください",
    "subscribe.hero.title": "WaLensで先を行く",
    "subscribe.hero.subtitle": "グローバルビジネスインテリジェンスに適したプランを選択してください",
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
    "subscribe.features.featureLabel": "機能",
    "subscribe.features.dailyNews": "日次ニュースアクセス",
    "subscribe.features.dailyNews.basicDesc": "厳選されたグローバルビジネスニュースを毎日配信。",
    "subscribe.features.dailyNews.premiumDesc": "日次ニュースに加え、背景分析とエグゼクティブサマリーを提供。",
    "subscribe.features.premiumInsights": "プレミアムインサイト",
    "subscribe.features.premiumInsights.basicDesc": "含まれません。",
    "subscribe.features.premiumInsights.premiumDesc": "グローバルに事業展開する日系企業への影響分析。戦略的解釈と業界インパクトを含む。",
    "subscribe.features.executiveReports": "エグゼクティブレポート",
    "subscribe.features.executiveReports.basicDesc": "含まれません。",
    "subscribe.features.executiveReports.premiumDesc": "経営会議・社内回覧・取締役レベルの意思決定に対応した、構造化されたレポート。",
    "subscribe.features.pdfDownloads": "PDFダウンロード",
    "subscribe.features.multiSeat": "マルチシートライセンス",
    "subscribe.features.customServices": "カスタマイズサービス",
    "subscribe.features.included": "含む",
    "subscribe.features.notIncluded": "含まない",
    "subscribe.features.positioning.line1": "戦略的な関与のレベルに合ったプランをお選びください。ベーシックは日常の情報収集に。プレミアムはエグゼクティブの意思決定のために。",
    "subscribe.features.positioning.line2": "両プランとも30日間の無料トライアル付き。",
    
    // Final CTA
    "subscribe.finalCta.title": "WaLens Asia Newsで既に先を行く数百人のエグゼクティブに参加しましょう",
    "subscribe.finalCta.button": "今すぐ購読",

    // Expanded subscription plan descriptions - see above in plans section

    // Sign-up page (Japanese)
    "signup.title": "サインアップ - WaLens Asia News",
    "signup.metaDescription": "アカウントを作成してWaLens Asia Newsの購読を開始",
    "signup.hero.title": "WaLens Asia Newsに参加",
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
    "dashboard.title": "マイページ - WaLens Asia News",
    "dashboard.metaDescription": "購読、プロフィール、WaLens Asia Newsへのアクセスを管理",
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
    "paymentSuccess.title": "決済完了 - WaLens Asia News",
    "paymentSuccess.loading": "読み込み中...",
    "paymentSuccess.details.customerInfo": "顧客情報",
    "paymentSuccess.metaDescription": "決済が正常に処理されました",
    "paymentSuccess.hero.title": "決済が完了しました。WaLens Asia Newsへようこそ！",
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
    "insights.reports.evBattery": "EV・バッテリー産業レポート",
    "insights.landing.title": "タイ・日本ビジネスインテリジェンス",
    "insights.landing.description": "タイ・日本のビジネス機会をナビゲートする経営者向けの業界洞察、市場分析、戦略情報をお届けします。",
    "insights.landing.category": "ビジネスインテリジェンスハブ",
    "insights.landing.industryFocus": "業界重点領域",
    "insights.landing.exploreInsights": "インサイトを探索 →",
    "insights.landing.latestIntelligence": "最新マーケットインテリジェンス",

    // Insights Services
    "insights.services.title": "サービス業界インテリジェンス",
    "insights.services.description": "グローバル市場におけるデジタル変革、フィンテックイノベーション、プロフェッショナルサービス展開をナビゲートします。",
    "insights.services.category": "サービス部門",
    "insights.services.latestIntelligence": "最新サービスインテリジェンス",
    "insights.services.keyGrowthAreas": "主要成長分野",
    "insights.services.marketOpportunities": "市場機会",
    "insights.services.exploreOther": "他の業界を探索",

    // Insights Manufacturing
    "insights.manufacturing.title": "製造業界インテリジェンス",
    "insights.manufacturing.description": "グローバル市場におけるインダストリー4.0、サプライチェーン革新、自動化機会をナビゲートします。",
    "insights.manufacturing.category": "製造業部門",

    // Insights Wellness Healthcare
    "insights.wellness.title": "ウェルネス・ヘルスケアインテリジェンス",
    "insights.wellness.description": "グローバル市場における医療技術、遠隔医療、ウェルネス観光の機会を探索します。",
    "insights.wellness.category": "ヘルスケア部門",

    // Insights Agriculture
    "insights.agriculture.title": "農業界インテリジェンス",
    "insights.agriculture.description": "グローバル市場におけるアグリテックイノベーション、持続可能農業、食品加工機会をナビゲートします。",
    "insights.agriculture.category": "農業部門",

    // Insights Real Estate
    "insights.realestate.title": "不動産市場インテリジェンス",
    "insights.realestate.description": "グローバル市場におけるダイナミックな不動産市場の商業用不動産、REIT、都市開発トレンドを探索します。",
    "insights.realestate.category": "不動産部門",

    // Why WaLens Section (Landing Page) - Japanese
    "whyWaLens.title": "なぜWaLensか？",
    "whyWaLens.chatgpt": "情報はどこにでもあります。しかし、本当に必要な情報は限られています。",
    "whyWaLens.walens": "WaLensは、グローバル市場をナビゲートする日本人経営者にとって本当に重要なことだけをお届けします。",
    "whyWaLens.point1.title": "意思決定フィルター",
    "whyWaLens.point1.description": "グローバル市場における日本人経営者の意思決定の視点から情報をフィルタリング。",
    "whyWaLens.point2.title": "コンテキスト対応",
    "whyWaLens.point2.description": "グローバルに事業展開する日本企業が直面する固有の課題に合わせたインサイトを提供。",
    "whyWaLens.point3.title": "実行可能な解釈",
    "whyWaLens.point3.description": "事実を報告するだけでなく、ビジネス上の意思決定にとって何を意味するかを解釈。",
    "whyWaLens.point4.title": "信頼できる判断",
    "whyWaLens.point4.description": "新興市場で日本人経営者を10年以上アドバイスしてきたコンサルタントが構築。",

    // About page (Japanese)
    "about.title": "WaLensについて - グローバル・エグゼクティブインテリジェンス",
    "about.description": "WaLensは、グローバルに事業を展開する日本人経営者のためのプレミアム意思決定支援プラットフォームです。情報のフィルタリング、解釈、優先順位付けを通じて、経営レベルの判断を支援します。",
    "about.hero.title": "意思決定者のためのインテリジェンス",
    "about.hero.subtitle": "WaLensは、グローバル市場への投資または事業運営を行う日本人経営者のために設計されたプレミアム意思決定支援プラットフォームです。",
    
    // Mission (Japanese)
    "about.mission.paragraph1": "今日の情報環境における課題は、情報へのアクセスではなく、その「関連性」にあります。グローバルに活動する日本人経営者には、ニュースフィードや汎用的な要約以上のものが必要です。現地の規制環境、国際ビジネス関係の機微、そして経営レベルの意思決定の優先順位を反映したインテリジェンスが求められます。WaLensは、その判断のレイヤーを提供するために存在しています。",
    
    // Definition Section (Japanese)
    "about.definition.title": "WaLensとは — そうでないもの",
    "about.definition.is.title": "WaLensが提供するもの：",
    "about.definition.is.point1": "日本人経営者のために情報をフィルタリングし、優先順位をつける判断レイヤー",
    "about.definition.is.point2": "主要市場における規制・経済・産業環境に根ざしたコンテキスト対応型インテリジェンス",
    "about.definition.is.point3": "単なる要約ではなく、情報が意思決定に何を意味するかを示す経営レベルの解釈",
    "about.definition.is.point4": "日本のビジネスガバナンスの視点と深い現地市場の専門知識に基づくインサイト",
    "about.definition.isNot.title": "WaLensが提供しないもの：",
    "about.definition.isNot.point1": "一般的なニュースメディアや情報集約プラットフォーム",
    "about.definition.isNot.point2": "専門的なアドバイザリーの代替 — 既存の助言機能を補完するものです",
    "about.definition.isNot.point3": "経営者のコンテキストを欠いた生データや未加工の情報",
    
    // Value Section (Japanese)
    "about.value.title": "WaLensが提供する価値",
    "about.value.filter.title": "ノイズの削減",
    "about.value.filter.description": "意思決定に関連する情報のみを抽出し、複数の情報源からの情報過多を解消します。",
    "about.value.interpretation.title": "コンテキストに基づく解釈",
    "about.value.interpretation.description": "グローバル市場における日本企業の事業運営とガバナンスの視点から、すべてのインサイトを解釈します。",
    "about.value.prioritization.title": "戦略的優先順位付け",
    "about.value.prioritization.description": "投資判断、規制リスク、事業運営への影響に基づいてインサイトを優先順位付けします。",
    "about.value.judgment.title": "信頼できる判断",
    "about.value.judgment.description": "編集チームは、深い市場専門知識と10年以上にわたる日本人経営者へのグローバルなアドバイス経験を兼ね備えています。",
    
    // Company Profile Table (Japanese)
    "about.profile.title": "会社概要",
    "about.profile.company": "会社名",
    "about.profile.founded": "設立",
    "about.profile.headquarters": "本社所在地", 
    "about.profile.business": "事業内容",
    "about.profile.team": "編集チーム",
    "about.profile.company.value": "WaLens",
    "about.profile.founded.value": "2025年",
    "about.profile.headquarters.value": "タイ・バンコク",
    "about.profile.business.value": "グローバルに事業を展開する日本人経営者向けに、戦略的インテリジェンスと経営レベルの判断を提供する意思決定支援プラットフォーム。",
    "about.profile.team.value": "多様な業界とグローバル市場で日本人経営者に10年以上アドバイスしてきた経験豊富な経営コンサルタントで構成。",
    
    // CTA Section (Japanese)
    "about.cta.title": "信頼のグローバル意思決定パートナー",
    "about.cta.content": "WaLensは、情報収集に費やす時間を減らし、確信を持った的確な意思決定に集中するための支援を提供します。",
    "about.cta.button": "無料トライアルを開始",

    // Terms of Service (Japanese)
    "terms.title": "利用規約 - WaLens Asia News",
    "terms.metaDescription": "WaLens Asia News購読およびウェブサイト利用の利用規約",
    "terms.hero.title": "利用規約",
    "terms.hero.subtitle": "サービスご利用前に利用規約をよくお読みください",
    
    "terms.section1.title": "1. はじめに",
    "terms.section1.content": "本ウェブサイト WaLens Asia News をご利用いただくにあたり、本利用規約に同意いただく必要があります。ご利用前に必ずご確認ください。",
    
    "terms.section2.title": "2. サービス内容",
    "terms.section2.content": "WaLens Asia News は、タイおよび東南アジアで事業を展開する国際的なビジネスリーダーに向けて、ビジネスニュース、マーケットインサイト、分析レポート、ローカル知見を提供します。内容は契約プランにより異なります。",
    
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
    "terms.section6.ownership": "記事、インサイト、レポート、ビジュアル等のコンテンツはすべて WaLens Asia News に帰属します。",
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
    "tips.subtitle": "グローバル市場で事業を展開する国際的なビジネスリーダーのための実践的な洞察と戦略。",
    "tips.description": "グローバルビジネス専門家のためのビジネスチップスとインサイト",
    "tips.backToTips": "ビジネスチップスに戻る",
    
    // Business Intelligence (Japanese)
    "nav.businessIntelligence": "ビジネスインテリジェンス",
    "bi.title": "ビジネスインテリジェンス - WaLens",
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
    "auth.resetEmailSentDescription": "パスワードリセット手順のメールをお送りしました。メールをご確認いただき、記載されているリンクをクリックしてください。",
    "auth.backToLogin": "ログインに戻る",
    "auth.newPassword": "新しいパスワード",
    "auth.confirmPassword": "パスワード確認",
    "auth.enterNewPassword": "下記に新しいパスワードを入力してください",
    "auth.updatePassword": "パスワードを更新",
    "auth.updating": "更新中...",
    "auth.passwordResetSuccess": "パスワードのリセットが完了しました。再度ログインしてください。",
    "auth.passwordsDoNotMatch": "パスワードが一致しません",
    "auth.passwordTooShort": "パスワードは8文字以上である必要があります",
    "auth.passwordRequirements.uppercase": "大文字を含む (A-Z)",
    "auth.passwordRequirements.lowercase": "小文字を含む (a-z)",
    "auth.passwordRequirements.number": "数字を含む (0-9)",
    "auth.passwordRequirements.minLength": "8文字以上",
    "auth.passwordValidationError": "パスワードには大文字・小文字・数字を含める必要があります。",
    "auth.success": "成功",

    // My Page (Japanese)
    "mypage.title": "マイページ - WaLens Asia News",
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
    "cancellation.success.description": "サブスクリプションは正常に解約されました。WaLens Asia Newsをご利用いただきありがとうございました。",
    "mypage.notProvided": "未設定",
    "mypage.noSubscription": "サブスクリプションなし",
    "mypage.activeSubscription": "有効",
    "mypage.inactiveSubscription": "無効",
    "mypage.trialExpired": "トライアル期間終了",
    "mypage.basicPlan": "ベーシックプラン",
    "mypage.editProfile": "編集",
    "mypage.saveProfile": "保存",
    "mypage.profileRemark": "より多くの情報を入力いただくと、より正確なニュースをお届けできます。",
    "mypage.freeTrialUntil": "無料トライアル期限",
    "mypage.noReadingHistory": "閲覧履歴はまだありません",
    "mypage.readAt": "閲覧日時",

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

    // Thailand Key Indicators (Japanese)
    "bi.keyIndicators.title": "タイ主要指標 - WaLens",
    "bi.keyIndicators.metaDescription": "NESDC、BOT、商務省、BOIなど公式政府機関からのタイ主要経済指標を表示するエグゼクティブダッシュボード。",
    "bi.keyIndicators.nav": "主要指標",
    "bi.keyIndicators.hero.title": "タイ ビジネスインテリジェンス – 主要指標",
    "bi.keyIndicators.hero.subtitle": "信頼できるタイ当局からの最新公式データ",
    "bi.keyIndicators.updateNotice": "2025年12月時点の公式データ",
    "bi.keyIndicators.dataSourcesNote": "すべてのデータはタイ政府機関（NESDC、タイ中央銀行、商務省、工業経済局、投資委員会、国家統計局）の公式データに基づいています。",
    
    "bi.keyIndicators.gdp.label": "GDP成長率（前年比）",
    "bi.keyIndicators.gdp.description": "前年同期比GDP成長率",
    "bi.keyIndicators.inflation.label": "インフレ率（CPI）",
    "bi.keyIndicators.inflation.description": "総合消費者物価上昇率",
    "bi.keyIndicators.interestRate.label": "政策金利",
    "bi.keyIndicators.interestRate.description": "現在のBOT政策金利",
    "bi.keyIndicators.exchangeRate.label": "THB / JPY レート",
    "bi.keyIndicators.exchangeRate.description": "1円あたりタイバーツ",
    "bi.keyIndicators.exportGrowth.label": "輸出成長率（前年比）",
    "bi.keyIndicators.exportGrowth.description": "前年同期比輸出額成長率",
    "bi.keyIndicators.ipi.label": "工業生産指数",
    "bi.keyIndicators.ipi.description": "製造業活動指数",
    "bi.keyIndicators.boiInvestment.label": "BOI投資額",
    "bi.keyIndicators.boiInvestment.description": "認可投資総額（タイバーツ）",
    "bi.keyIndicators.unemployment.label": "失業率",
    "bi.keyIndicators.unemployment.description": "全国失業率"
  },
  th: {
    // Common
    "brand.name": "WaLens",
    "brand.tagline": "มุมมองญี่ปุ่นสู่ธุรกิจอาเซียน",
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
    "home.about.text": "WaLens Asia News ดำเนินการโดยทีมบรรณาธิการ WaLens — เชื่อมวัฒนธรรมธุรกิจญี่ปุ่นและไทยด้วยข้อมูลที่เชื่อถือได้ ชัดเจน และนำไปใช้ได้จริง ไม่มีการแสดงโปรไฟล์ส่วนบุคคล",

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
    "contact.title": "ติดต่อเรา - WaLens",
    "contact.metaDescription": "ติดต่อ WaLens ส่งอีเมลและข้อความถึงเรา",
    "contact.h1": "ติดต่อเรา",
    "contact.emailLabel": "อีเมล",
    "contact.emailPlaceholder": "you@example.com",
    "contact.messageLabel": "ข้อความ (ไม่บังคับ)",
    "contact.messagePlaceholder": "เราช่วยอะไรคุณได้บ้าง?",
    "contact.submit": "ส่ง",
    "contact.success": "ขอบคุณ! เราจะติดต่อกลับโดยเร็ว",

    // Pages
    "news.title": "ข่าว - WaLens",
    "insights.title": "อินไซต์ - WaLens",
    "tips.title": "เคล็ดลับธุรกิจ - WaLens",
    "subscribe.title": "สมัครสมาชิก - WaLens",
    "subscribe.metaDescription": "ทดลองใช้ฟรี 1 เดือน จากนั้นรายเดือน/รายปี",

    // About page - Company Profile (Thai)
    "about.title": "เกี่ยวกับ WaLens - ข้อมูลบริษัท",
    "about.description": "เรียนรู้เกี่ยวกับ WaLens - มุมมองญี่ปุ่นสู่ธุรกิจอาเซียน",
    "about.hero.title": "เกี่ยวกับ WaLens",
    "about.hero.subtitle": "มุมมองญี่ปุ่นสู่ธุรกิจอาเซียน",
    "about.hero.cta": "เข้าร่วมชุมชนของเรา",
    "about.narrative.title": "เรื่องราวของเรา",
    "about.narrative.content": "ที่ WaLens เรามาพร้อมกับภารกิจที่ชัดเจนเพียงหนึ่งเดียว: **เปลี่ยนแปลงโลกธุรกิจและทำให้ชีวิตของคุณดีขึ้น**\n\nเรารู้ว่าโดยธรรมชาติแล้ว คุณอาจไม่เชื่อในสตาร์ทอัพ แต่หากคุณไม่ก้าวไปข้างหน้าตอนนี้ แล้วจะมีเวลาไหนที่ชีวิตจะดีขึ้นได้จริง?\n\nมานานเกินไปแล้วที่ญี่ปุ่นและไทยติดอยู่ในรูปแบบเดิม ๆ พึ่งพาบริษัทเก่า ๆ และวิธีการที่ล้าสมัย แต่ในโลกที่เปลี่ยนแปลงไวอย่างปัจจุบัน การเชื่อในสิ่งเก่า ๆ เพียงอย่างเดียวอาจทำให้ญี่ปุ่นสูญเสียการปรากฏตัวบนเวทีโลก\n\nนั่นคือเหตุผลที่ WaLens มีอยู่ เราเปิดกว้าง จริงใจ และกล้าหาญ เราไม่ได้ส่งมอบเพียงข่าวสาร แต่เป็น **ข้อมูลเชิงลึกที่รวดเร็วและลึกซึ้งที่ช่วยให้คุณตัดสินใจได้อย่างถูกต้องและแม่นยำ** ด้วยข้อมูลที่ดีกว่า คุณสามารถสร้างกลยุทธ์ที่ดีกว่า — และอนาคตที่แข็งแกร่งกว่า\n\nและค่าใช้จ่าย? มันเป็นเพียงเศษเสี้ยวเมื่อเทียบกับคุณค่าที่จะได้รับ การตัดสินใจเพียงครั้งเดียวที่มีข้อมูลเชิงลึกที่ถูกต้องสามารถเปลี่ยนแปลงธุรกิจ องค์กร และแม้กระทั่งการปรากฏตัวของญี่ปุ่นในประเทศไทย\n\nWaLens ไม่ใช่แค่บริษัทอีกแห่งหนึ่ง เราคือการเคลื่อนไหวเพื่อนำญี่ปุ่นและไทยกลับสู่ความยิ่งใหญ่ — ร่วมกัน",
    "about.profile.title": "ข้อมูลบริษัท",
    
    // Origin of the Name (Thai)
    "about.origin.title": "ที่มาของชื่อ",
    "about.origin.content": "ชื่อ \"WaLens\" เป็นการรวมของสององค์ประกอบ:\n- \"Wa (和)\" แสดงถึงญี่ปุ่น ความสามัคคี และการร่วมมือ\n- \"Lens\" แสดงถึงมุมมอง ความชัดเจน และความสามารถในการมองเห็นข้อมูลเชิงลึก\n\nเมื่อรวมกัน WaLens หมายความว่า \"เลนส์ญี่ปุ่น\" — ให้มุมมองที่ชัดเจนและลึกซึ้งแก่ผู้บริหารญี่ปุ่นเพื่อทำความเข้าใจสภาพแวดล้อมทางธุรกิจในไทยและอาเซียน นี่คือภารกิจของเราในการเป็นสะพานเชื่อมระหว่างญี่ปุ่นและไทย ช่วยให้ธุรกิจค้นพบโอกาสใหม่และสร้างการเติบโตอย่างยั่งยืน",
    "about.profile.company": "ชื่อบริษัท",
    "about.profile.company.value": "WaLens",
    "about.profile.founded": "ก่อตั้ง",
    "about.profile.founded.value": "2025",
    "about.profile.headquarters": "สำนักงานใหญ่",
    "about.profile.headquarters.value": "กรุงเทพมหานคร ประเทศไทย",
    "about.profile.business": "เนื้อหาธุรกิจ",
    "about.profile.business.value": "ข่าวสารและรายงานอุตสาหกรรมเฉพาะที่ให้ข้อมูลทางธุรกิจเชิงกลยุทธ์สำหรับผู้บริหารญี่ปุ่นในประเทศไทย",
    "about.profile.team": "ทีมบรรณาธิการ",
    "about.profile.team.value": "ประกอบด้วยที่ปรึกษาธุรกิจที่มีประสบการณ์มากกว่า 10 ปีในการทำงานร่วมกับผู้บริหารญี่ปุ่นในอุตสาหกรรมที่หลากหลาย",
    "about.profile.identity": "อัตลักษณ์ / ข้อความหลัก",
    "about.profile.identity.value": "WaLens เป็นสตาร์ทอัพที่เปิดกว้างและจริงใจ โดยมีแรงบันดาลใจที่จะเปลี่ยนแปลงโลกธุรกิจและฟื้นฟูการปรากฏตัวของญี่ปุ่นและไทยร่วมกัน",
    "about.vision.title": "วิสัยทัศน์",
    "about.vision.content": "สร้างแพลตฟอร์มข้อมูลทางธุรกิจที่เชื่อมโยงไทยและญี่ปุ่น อำนวยความสะดวกในการนำเสนอโซลูชันนวัตกรรมที่แก้ไขความท้าทายทางสังคมและเศรษฐกิจ และมีส่วนร่วมต่อการพัฒนาที่ยั่งยืนของประเทศไทย",
    "about.mission.title": "พันธกิจ",
    "about.mission.point1": "นำเสนอข้อมูลทางธุรกิจที่ถูกต้อง ครอบคลุม และทันเวลาสำหรับผู้บริหารญี่ปุ่นที่ดำเนินงานในประเทศไทย",
    "about.mission.point2": "ให้รายงานและการวิเคราะห์เชิงลึกที่สามารถใช้สนับสนุนการวางแผนและการดำเนินงานเชิงกลยุทธ์",
    "about.mission.point3": "ส่งเสริมความเข้าใจเกี่ยวกับสภาพแวดล้อมทางธุรกิจและวัฒนธรรมของไทย เพื่อเปิดใช้แนวทางการจัดการที่ยั่งยืน",
    "about.mission.point4": "สนับสนุนการรักษาและขยายธุรกิจญี่ปุ่นในประเทศไทย ซึ่งจะมีส่วนช่วยให้เศรษฐกิจของทั้งไทยและญี่ปุ่นเติบโตร่วมกัน",
    "about.value.title": "ข้อเสนอคุณค่า",
    "about.value.point1": "แหล่งข้อมูลท้องถิ่นที่เชื่อถือได้จากประเทศไทย",
    "about.value.point2": "รายงานการวิเคราะห์ที่มีรายละเอียดเพียงพอสำหรับการใช้งานเชิงกลยุทธ์",
    "about.value.point3": "การอัพเดตแบบเรียลไทม์โดยไม่มีความล่าช้า",
    "about.value.point4": "ทีมบรรณาธิการและเนื้อหาที่มีประสบการณ์การให้คำปรึกษามากกว่า 10 ปี โดยทำงานอย่างใกล้ชิดกับผู้บริหารญี่ปุ่นในอุตสาหกรรมที่หลากหลาย",
    "about.value.point5": "จิตวิญญาณสตาร์ทอัพที่จริงใจที่มุ่งหวังเปลี่ยนแปลงธุรกิจและเสริมสร้างการปรากฏตัวของญี่ปุ่น-ไทย",
    "about.cta.title": "พร้อมที่จะเปลี่ยนแปลงธุรกิจของคุณหรือยัง?",
    "about.cta.content": "เข้าร่วม WaLens (和視) วันนี้และเข้าถึงข้อมูลเชิงลึกเชิงกลยุทธ์ที่จะขับเคลื่อนความสำเร็จของคุณในตลาดอาเซียน",
     },
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem("lang") as Lang | null;
      if (stored === "th") return "ja";
      return (stored as Lang) || "ja";
    } catch {
      return "ja";
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
