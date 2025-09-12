import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import BusinessTips from "./pages/BusinessTips";
import BusinessTipDetail from "./pages/BusinessTipDetail";
import SearchResults from "./pages/SearchResults";
import Subscribe from "./pages/Subscribe";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import MyPage from "./pages/MyPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import { I18nProvider } from "@/i18n/I18nProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import ProtectedRoute from "@/components/ProtectedRoute";
import InsightsLanding from "./pages/insights/InsightsLanding";
import InsightServices from "./pages/insights/Services";
import InsightManufacturing from "./pages/insights/Manufacturing";
import InsightWellnessHealthcare from "./pages/insights/WellnessHealthcare";
import InsightAgriculture from "./pages/insights/Agriculture";
import InsightRealEstate from "./pages/insights/RealEstate";
import BusinessIntelligence from "./pages/BusinessIntelligence";
import EconomyInvestment from "./pages/bi/EconomyInvestment";
import TradeIndustry from "./pages/bi/TradeIndustry";
import RegulationTax from "./pages/bi/RegulationTax";
import WorkforceSociety from "./pages/bi/WorkforceSociety";
import InfrastructureInnovation from "./pages/bi/InfrastructureInnovation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <I18nProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/business-tips" element={<BusinessTips />} />
            <Route path="/business-tips/:id" element={<BusinessTipDetail />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-page" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/business-intelligence" element={<BusinessIntelligence />} />
            <Route path="/business-intelligence/economy" element={<EconomyInvestment />} />
            <Route path="/business-intelligence/trade" element={<TradeIndustry />} />
            <Route path="/business-intelligence/regulation" element={<RegulationTax />} />
            <Route path="/business-intelligence/workforce" element={<WorkforceSociety />} />
            <Route path="/business-intelligence/infrastructure" element={<InfrastructureInnovation />} />
            <Route path="/insights" element={<InsightsLanding />} />
            <Route path="/insights/services" element={<InsightServices />} />
            <Route path="/insights/manufacturing" element={<InsightManufacturing />} />
            <Route path="/insights/wellness-healthcare" element={<InsightWellnessHealthcare />} />
            <Route path="/insights/agriculture" element={<InsightAgriculture />} />
            <Route path="/insights/real-estate" element={<InsightRealEstate />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </I18nProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
