import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import News from "./pages/News";
import BusinessTips from "./pages/BusinessTips";
import Subscribe from "./pages/Subscribe";
import { I18nProvider } from "@/i18n/I18nProvider";
import InsightsLanding from "./pages/insights/InsightsLanding";
import InsightServices from "./pages/insights/Services";
import InsightManufacturing from "./pages/insights/Manufacturing";
import InsightWellnessHealthcare from "./pages/insights/WellnessHealthcare";
import InsightAgriculture from "./pages/insights/Agriculture";
import InsightRealEstate from "./pages/insights/RealEstate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <I18nProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news" element={<News />} />
            <Route path="/business-tips" element={<BusinessTips />} />
            <Route path="/subscribe" element={<Subscribe />} />
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
