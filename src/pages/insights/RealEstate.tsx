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

const RealEstate = () => {
  const { t } = useI18n();
  const title = t("insights.title");
  const description = t("insights.realestate.description");

  const articles = [
    {
      title: "Japanese REITs Eye Thai Commercial Property Market Expansion",
      description: "Major Japanese real estate investment trusts explore opportunities in Bangkok's office towers and retail complexes amid recovery signals.",
      category: "REITs",
      readTime: "6 min read",
      author: "Real Estate Analyst"
    },
    {
      title: "Logistics Real Estate Boom: E-commerce Drives Warehouse Demand",
      description: "Japanese logistics companies invest heavily in Thai distribution centers to support growing cross-border e-commerce operations.",
      category: "Industrial",
      readTime: "7 min read",
      author: "Industrial Property"
    },
    {
      title: "Transit-Oriented Development: Bangkok's Infrastructure-Led Growth",
      description: "New BTS and MRT extensions create property investment opportunities along mass transit corridors, attracting Japanese developers.",
      category: "Transit Development",
      readTime: "8 min read",
      author: "Urban Planning"
    },
    {
      title: "Green Building Certification Drives Premium Property Values",
      description: "LEED and TREES certified buildings command 15-20% rent premiums as Japanese firms prioritize sustainable office spaces.",
      category: "Sustainability",
      readTime: "5 min read",
      author: "Green Building Expert"
    },
    {
      title: "Hospitality Recovery: Japanese Hotel Chains Resume Thai Expansion",
      description: "Tourism rebound encourages Japanese hospitality brands to accelerate hotel development plans across major Thai destinations.",
      category: "Hospitality",
      readTime: "6 min read",
      author: "Hospitality Correspondent"
    },
    {
      title: "Cross-Border Property Investment: Regulatory Updates and Opportunities",
      description: "Recent policy changes facilitate foreign investment in Thai real estate while maintaining ownership structure requirements.",
      category: "Investment Policy",
      readTime: "7 min read",
      author: "Legal & Regulatory"
    }
  ];

  const highlights = [
    { title: "New Foreign Ownership Regulations Clarified", category: "Regulation", time: "1h ago" },
    { title: "Bangkok Office Occupancy Rates Reach 87%", category: "Commercial", time: "3h ago" },
    { title: "Industrial Land Prices Rise 12% in Eastern Region", category: "Industrial", time: "5h ago" },
    { title: "Luxury Condo Pre-Sales Show Strong Recovery", category: "Residential", time: "7h ago" },
  ];

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonicalPath="/insights/real-estate"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <InsightHero 
          title={t("insights.realestate.title")}
          description={t("insights.realestate.description")}
          category={t("insights.realestate.category")}
          backgroundImage={heroImage}
        />

        <main className="container mx-auto px-4 py-12">
          <Breadcrumb items={[
            { label: t('insights.breadcrumb'), href: '/insights' },
            { label: 'Real Estate' }
          ]} />

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <section>
                <h2 className="text-2xl font-bold mb-6">Latest Real Estate Intelligence</h2>
                <div className="grid gap-6 sm:grid-cols-2 mb-12">
                  {articles.map((article, index) => (
                    <InsightArticleCard key={index} {...article} />
                  ))}
                </div>

                {/* Key Focus Areas */}
                <div className="grid gap-6 sm:grid-cols-2 mb-8">
                  <div className="p-6 rounded-lg border bg-card">
                    <h3 className="text-xl font-semibold mb-4">Investment Themes</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• REITs and cross-listing potentials</li>
                      <li>• Industrial and logistics assets</li>
                      <li>• Transit-oriented development (TOD)</li>
                      <li>• Mixed-use commercial complexes</li>
                      <li>• Sustainable and smart building technology</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-lg border bg-card">
                    <h3 className="text-xl font-semibold mb-4">Market Dynamics</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Foreign ownership regulations</li>
                      <li>• Green building certifications</li>
                      <li>• Hospitality recovery and new formats</li>
                      <li>• Cross-border capital flows</li>
                      <li>• Urban planning and zoning changes</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <InsightSidebar highlights={highlights} />
            </div>
          </div>

          {/* Related Industries Navigation */}
          <nav className="mt-12 p-6 rounded-lg bg-muted/30">
            <h3 className="font-semibold mb-3">Explore Other Industries</h3>
            <div className="flex flex-wrap gap-2">
              <Link to="/insights/services" className="px-3 py-1 text-sm bg-background hover:bg-primary/10 rounded-full transition-colors">Services</Link>
              <Link to="/insights/manufacturing" className="px-3 py-1 text-sm bg-background hover:bg-primary/10 rounded-full transition-colors">Manufacturing</Link>
              <Link to="/insights/wellness-healthcare" className="px-3 py-1 text-sm bg-background hover:bg-primary/10 rounded-full transition-colors">Wellness/Healthcare</Link>
              <Link to="/insights/agriculture" className="px-3 py-1 text-sm bg-background hover:bg-primary/10 rounded-full transition-colors">Agriculture</Link>
            </div>
          </nav>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RealEstate;
