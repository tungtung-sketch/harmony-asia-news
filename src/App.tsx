import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/i18n/I18nProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import News from "./pages/News";

import NewsDetailFromSheet from "./pages/NewsDetailFromSheet";
import BusinessTips from "./pages/BusinessTips";
import BusinessTipDetail from "./pages/BusinessTipDetail";
import SearchResults from "./pages/SearchResults";
import Subscribe from "./pages/Subscribe";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import BillingHistory from "./pages/BillingHistory";
import Dashboard from "./pages/Dashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
import InsightsLanding from "./pages/insights/InsightsLanding";
import InsightServices from "./pages/insights/Services";
import InsightManufacturing from "./pages/insights/Manufacturing";
import EVBatteryIndustry from "./pages/insights/reports/EVBatteryIndustry";
import ThailandMarketStrategy from "./pages/insights/reports/ThailandMarketStrategy";
import WellnessHealthcareReport from "./pages/insights/reports/WellnessHealthcare";
import AgricultureIndustry from "./pages/insights/reports/AgricultureIndustry";
import RealEstateMarket from "./pages/insights/reports/RealEstateMarket";
import ElectronicsSemiconductor from "./pages/insights/reports/ElectronicsSemiconductor";
import BigDataAI from "./pages/insights/reports/BigDataAI";
import Decarbonization from "./pages/insights/reports/Decarbonization";
import ChemicalIndustry from "./pages/insights/reports/ChemicalIndustry";
import FoodIndustry from "./pages/insights/reports/FoodIndustry";
import EnergyIndustry from "./pages/insights/reports/EnergyIndustry";
import AutomotiveIndustry from "./pages/insights/reports/AutomotiveIndustry";
import HormuzCrisisImpact from "./pages/insights/reports/HormuzCrisisImpact";
import OilCrisisThaiIndustry from "./pages/insights/reports/OilCrisisThaiIndustry";
import ThaiGovPolicyJapanese from "./pages/insights/reports/ThaiGovPolicyJapanese";
import SongkranJapaneseBusiness from "./pages/insights/reports/SongkranJapaneseBusiness";
import EnergyCrisisBahtStrategy from "./pages/insights/reports/EnergyCrisisBahtStrategy";
import SEAAutomotiveAftermarket from "./pages/insights/reports/SEAAutomotiveAftermarket";
import ThaiChuayThaiPlus from "./pages/insights/reports/ThaiChuayThaiPlus";
import USRulesOfOriginSqueeze from "./pages/insights/reports/USRulesOfOriginSqueeze";
import InsightWellnessHealthcare from "./pages/insights/WellnessHealthcare";
import InsightAgriculture from "./pages/insights/Agriculture";
import InsightRealEstate from "./pages/insights/RealEstate";
import BusinessIntelligence from "./pages/BusinessIntelligence";
import EconomyInvestment from "./pages/bi/EconomyInvestment";
import TradeIndustry from "./pages/bi/TradeIndustry";
import RegulationTax from "./pages/bi/RegulationTax";
import WorkforceSociety from "./pages/bi/WorkforceSociety";
import InfrastructureInnovation from "./pages/bi/InfrastructureInnovation";
import ThailandKeyIndicators from "./pages/bi/ThailandKeyIndicators";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ResetPassword from "./pages/ResetPassword";
import FAQ from "./pages/FAQ";
import Corporate from "./pages/Corporate";
import PremiumAnalyticsPage from "./pages/admin/PremiumAnalyticsPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import VisitorAnalyticsPage from "./pages/admin/VisitorAnalyticsPage";
import { PageTracker } from "./components/PageTracker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <I18nProvider>
        <AuthProvider>
          <ThemeProvider>
          <BrowserRouter>
            <PageTracker>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/news" element={<News />} />
              
              <Route path="/news/sheet/:slug" element={<NewsDetailFromSheet />} />
              {/* Business Tips - Hidden for now, will be added later
              <Route path="/business-tips" element={<BusinessTips />} />
              <Route path="/business-tips/:id" element={<BusinessTipDetail />} />
              */}
              <Route path="/search" element={<SearchResults />} />
              <Route path="/subscribe" element={<Subscribe />} />
              <Route path="/corporate" element={<Corporate />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/billing-history" element={<BillingHistory />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/business-intelligence" element={<BusinessIntelligence />} />
              <Route path="/business-intelligence/economy" element={<EconomyInvestment />} />
              <Route path="/business-intelligence/trade" element={<TradeIndustry />} />
              <Route path="/business-intelligence/regulation" element={<RegulationTax />} />
              <Route path="/business-intelligence/workforce" element={<WorkforceSociety />} />
              <Route path="/business-intelligence/infrastructure" element={<InfrastructureInnovation />} />
              <Route path="/business-intelligence/key-indicators" element={<ThailandKeyIndicators />} />
              <Route path="/insights" element={<InsightsLanding />} />
              <Route path="/insights/services" element={<InsightServices />} />
              <Route path="/insights/manufacturing" element={<InsightManufacturing />} />
              <Route path="/insights/manufacturing/ev-battery" element={<EVBatteryIndustry />} />
              <Route path="/insights/reports/thailand-market-strategy" element={<ThailandMarketStrategy />} />
              <Route path="/insights/wellness-healthcare" element={<InsightWellnessHealthcare />} />
              <Route path="/insights/wellness-healthcare/wellness-report" element={<WellnessHealthcareReport />} />
              <Route path="/insights/agriculture" element={<InsightAgriculture />} />
              <Route path="/insights/agriculture/industry-trends" element={<AgricultureIndustry />} />
              <Route path="/insights/real-estate" element={<InsightRealEstate />} />
              <Route path="/insights/real-estate/market-2026" element={<RealEstateMarket />} />
              <Route path="/insights/manufacturing/electronics-semiconductor" element={<ElectronicsSemiconductor />} />
              <Route path="/insights/services/big-data-ai" element={<BigDataAI />} />
              <Route path="/insights/services/decarbonization" element={<Decarbonization />} />
              <Route path="/insights/manufacturing/decarbonization" element={<Decarbonization />} />
              <Route path="/insights/manufacturing/chemical-industry" element={<ChemicalIndustry />} />
              <Route path="/insights/agriculture/food-industry" element={<FoodIndustry />} />
              <Route path="/insights/services/energy-industry" element={<EnergyIndustry />} />
              <Route path="/insights/manufacturing/energy-industry" element={<EnergyIndustry />} />
              <Route path="/insights/manufacturing/automotive-industry" element={<AutomotiveIndustry />} />
              <Route path="/insights/services/hormuz-crisis-impact" element={<HormuzCrisisImpact />} />
              <Route path="/insights/manufacturing/hormuz-crisis-impact" element={<HormuzCrisisImpact />} />
              <Route path="/insights/services/oil-crisis-thai-industry" element={<OilCrisisThaiIndustry />} />
              <Route path="/insights/manufacturing/oil-crisis-thai-industry" element={<OilCrisisThaiIndustry />} />
              <Route path="/insights/services/thai-gov-policy-japanese" element={<ThaiGovPolicyJapanese />} />
              <Route path="/insights/services/songkran-japanese-business" element={<SongkranJapaneseBusiness />} />
              <Route path="/insights/services/energy-crisis-baht-strategy-2026" element={<EnergyCrisisBahtStrategy />} />
              <Route path="/insights/manufacturing/sea-automotive-aftermarket-2026" element={<SEAAutomotiveAftermarket />} />
              <Route path="/insights/economic-policy/thai-chuay-thai-plus-2026" element={<ThaiChuayThaiPlus />} />
              <Route path="/insights/trade/us-rules-of-origin-2026" element={<USRulesOfOriginSqueeze />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/faq" element={<FAQ />} />
              {/* Admin Routes */}
              <Route path="/admin/premium-analytics" element={<PremiumAnalyticsPage />} />
              <Route path="/admin/event-analytics" element={<AdminAnalyticsPage />} />
              <Route path="/admin/analytics" element={<VisitorAnalyticsPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </PageTracker>
          </BrowserRouter>
          </ThemeProvider>
        </AuthProvider>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;