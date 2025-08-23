import { Link } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InsightHero from '@/components/InsightHero';
import InsightArticleCard from '@/components/InsightArticleCard';
import InsightSidebar from '@/components/InsightSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const InsightsLanding = () => {
  const { t } = useI18n();
  const title = t("insights.title");
  const description = t("insights.landing.description");

  const articles = [
    {
      title: "Thailand 4.0 Policy Drives Digital Transformation Across Industries",
      description: "Government initiatives accelerate digital adoption in manufacturing and services, creating new opportunities for Japanese tech companies.",
      category: "Policy Update",
      readTime: "5 min read",
      author: "Harmony Research"
    },
    {
      title: "Cross-Border E-commerce Surge: New Market Entry Strategies",
      description: "Japanese SMEs find success in Thai digital marketplaces through localized approaches and strategic partnerships.",
      category: "Market Analysis",
      readTime: "7 min read",
      author: "Market Intelligence"
    },
    {
      title: "BOI Investment Incentives Expanded for Clean Energy Projects",
      description: "Updated Board of Investment packages offer enhanced benefits for renewable energy and sustainability initiatives.",
      category: "Investment",
      readTime: "4 min read",
      author: "Policy Team"
    },
    {
      title: "Supply Chain Resilience: The Thailand+1 Strategy",
      description: "Diversification beyond China accelerates as companies seek stable manufacturing bases in Southeast Asia.",
      category: "Supply Chain",
      readTime: "6 min read",
      author: "Strategic Analysis"
    },
    {
      title: "Fintech Innovation Corridor: Japan-Thailand Collaboration",
      description: "Joint regulatory sandboxes enable faster deployment of financial technology solutions across both markets.",
      category: "Fintech",
      readTime: "5 min read",
      author: "Financial Services"
    },
    {
      title: "Healthcare Reform Creates Opportunities for Medical Device Exports",
      description: "Thailand's universal healthcare expansion drives demand for advanced Japanese medical technologies.",
      category: "Healthcare",
      readTime: "8 min read",
      author: "Healthcare Desk"
    }
  ];

  const highlights = [
    { title: "Japan-Thailand EPA Updates Drive Trade Growth", category: "Trade", time: "2h ago" },
    { title: "EV Battery Manufacturing Incentives Announced", category: "Automotive", time: "4h ago" },
    { title: "Digital Payments Interoperability Expands", category: "Fintech", time: "6h ago" },
    { title: "Tourism Recovery Reaches 85% of Pre-Pandemic Levels", category: "Tourism", time: "1d ago" },
  ];

  const industryCards = [
    { to: "/insights/services", label: "Services", description: "Digital transformation, financial services, and professional business solutions" },
    { to: "/insights/manufacturing", label: "Manufacturing", description: "Supply chain innovation, automation, and Industry 4.0 implementation" },
    { to: "/insights/wellness-healthcare", label: "Wellness / Healthcare", description: "Medical technology, telemedicine, and wellness tourism opportunities" },
    { to: "/insights/agriculture", label: "Agriculture", description: "Agri-tech, sustainable farming, and food processing advancements" },
    { to: "/insights/real-estate", label: "Real Estate", description: "Commercial property, REITs, and urban development trends" },
  ];

  return (
    <>
      <SEO title={title} description={description} canonicalPath="/insights" />
      <div className="min-h-screen bg-background">
        <Header />
        
        <InsightHero 
          title={t("insights.landing.title")}
          description={t("insights.landing.description")}
          category={t("insights.landing.category")}
          backgroundImage={heroImage}
        />

        <main className="container mx-auto px-4 py-12">
          <Breadcrumb items={[{ label: t('insights.breadcrumb') }]} />

          {/* Industry Overview Cards */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t("insights.landing.industryFocus")}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {industryCards.map((item) => (
                <Link key={item.to} to={item.to} className="group">
                  <div className="h-full p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300 group-hover:border-primary/20">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{item.label}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <span className="text-primary font-medium text-sm">
                      {t("insights.landing.exploreInsights")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <section>
                <h2 className="text-2xl font-bold mb-6">{t("insights.landing.latestIntelligence")}</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {articles.map((article, index) => (
                    <InsightArticleCard key={index} {...article} />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <InsightSidebar highlights={highlights} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InsightsLanding;
