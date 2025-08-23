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

const Services = () => {
  const { t } = useI18n();
  const title = t("insights.title");
  const description = t("insights.services.description");

  const articles = [
    {
      title: "Digital Banking Revolution: Japanese Institutions Enter Thai Market",
      description: "Major Japanese banks leverage digital-first strategies to capture Thailand's growing middle class and SME banking needs.",
      category: "Financial Services",
      readTime: "6 min read",
      author: "Banking Analyst"
    },
    {
      title: "Cloud Infrastructure Boom: AWS, Google Cloud Expand Thai Operations",
      description: "Hyperscale cloud providers increase capacity to serve growing enterprise digital transformation demands.",
      category: "Technology",
      readTime: "5 min read",
      author: "Tech Correspondent"
    },
    {
      title: "Professional Services Localization: Legal, Consulting, Accounting",
      description: "Japanese professional service firms adapt offerings for Thai regulatory environment and business culture.",
      category: "Professional Services",
      readTime: "7 min read",
      author: "Business Services"
    },
    {
      title: "Fintech Regulatory Sandbox Success Stories",
      description: "Joint Japan-Thailand regulatory initiatives enable faster fintech innovation and market entry.",
      category: "Fintech",
      readTime: "4 min read",
      author: "Regulatory Affairs"
    },
    {
      title: "Cybersecurity Services Surge Amid Digital Transformation",
      description: "Rising cyber threats drive demand for Japanese cybersecurity expertise in Thai enterprises.",
      category: "Cybersecurity",
      readTime: "6 min read",
      author: "Security Analyst"
    },
    {
      title: "Remote Work Infrastructure: Japan-Thailand Business Collaboration",
      description: "New digital collaboration tools and platforms enable seamless cross-border business operations.",
      category: "Digital Workplace",
      readTime: "5 min read",
      author: "Workplace Innovation"
    }
  ];

  const highlights = [
    { title: "Bank of Thailand Digital Currency Pilot Launches", category: "Fintech", time: "3h ago" },
    { title: "Japanese IT Services Firm Opens Bangkok Hub", category: "Technology", time: "5h ago" },
    { title: "Cross-Border Payment Volumes Up 45%", category: "Payments", time: "8h ago" },
    { title: "New Data Protection Guidelines Released", category: "Regulation", time: "1d ago" },
  ];

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonicalPath="/insights/services"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <InsightHero 
          title={t("insights.services.title")}
          description={t("insights.services.description")}
          category={t("insights.services.category")}
          backgroundImage={heroImage}
        />

        <main className="container mx-auto px-4 py-12">
          <Breadcrumb items={[
            { label: t('insights.breadcrumb'), href: '/insights' },
            { label: 'Services' }
          ]} />

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <section>
                <h2 className="text-2xl font-bold mb-6">{t("insights.services.latestIntelligence")}</h2>
                <div className="grid gap-6 sm:grid-cols-2 mb-12">
                  {articles.map((article, index) => (
                    <InsightArticleCard key={index} {...article} />
                  ))}
                </div>

                {/* Key Focus Areas */}
                <div className="grid gap-6 sm:grid-cols-2 mb-8">
                  <div className="p-6 rounded-lg border bg-card">
                    <h3 className="text-xl font-semibold mb-4">{t("insights.services.keyGrowthAreas")}</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Cross-border fintech and digital payments</li>
                      <li>• Professional services localization</li>
                      <li>• Cloud infrastructure and cybersecurity</li>
                      <li>• Digital banking and neobank services</li>
                      <li>• Business process outsourcing (BPO)</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-lg border bg-card">
                    <h3 className="text-xl font-semibold mb-4">{t("insights.services.marketOpportunities")}</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Regulatory sandboxes for fintech innovation</li>
                      <li>• Data protection and cross-border transfers</li>
                      <li>• Talent mobility and remote work frameworks</li>
                      <li>• AI and automation service integration</li>
                      <li>• ESG consulting and sustainability services</li>
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
            <h3 className="font-semibold mb-3">{t("insights.services.exploreOther")}</h3>
            <div className="flex flex-wrap gap-2">
              <Link to="/insights/manufacturing" className="px-3 py-1 text-sm bg-background hover:bg-primary/10 rounded-full transition-colors">Manufacturing</Link>
              <Link to="/insights/wellness-healthcare" className="px-3 py-1 text-sm bg-background hover:bg-primary/10 rounded-full transition-colors">Wellness/Healthcare</Link>
              <Link to="/insights/agriculture" className="px-3 py-1 text-sm bg-background hover:bg-primary/10 rounded-full transition-colors">Agriculture</Link>
              <Link to="/insights/real-estate" className="px-3 py-1 text-sm bg-background hover:bg-primary/10 rounded-full transition-colors">Real Estate</Link>
            </div>
          </nav>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Services;
