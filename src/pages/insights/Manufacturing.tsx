import { Link } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InsightHero from '@/components/InsightHero';
import InsightArticleCard from '@/components/InsightArticleCard';
import InsightSidebar from '@/components/InsightSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import SEO from "@/components/SEO";
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const Manufacturing = () => {
  const title = "Manufacturing Insights | Harmony";
  const description =
    "Manufacturing insights for Thailand–Japan supply chains: incentives, localization, and Tier-2 suppliers.";

  const articles = [
    {
      title: "EV Battery Gigafactory Investments Surge in Eastern Economic Corridor",
      description: "Major Japanese and Korean battery manufacturers commit $15B+ to new production facilities, transforming Thailand's automotive landscape.",
      category: "Electric Vehicles",
      readTime: "8 min read",
      author: "Automotive Analyst"
    },
    {
      title: "Thailand+1 Strategy: Supply Chain Diversification Accelerates",
      description: "Japanese manufacturers expand operations beyond China, leveraging Thailand as a regional hub for ASEAN market access.",
      category: "Supply Chain",
      readTime: "6 min read",
      author: "Supply Chain Desk"
    },
    {
      title: "Industry 4.0 Adoption Reaches 40% Among Thai Manufacturers",
      description: "Smart factory technologies and IoT implementation drive productivity gains across automotive and electronics sectors.",
      category: "Industry 4.0",
      readTime: "7 min read",
      author: "Technology Reporter"
    },
    {
      title: "BOI Super S-Curve Industries Attract Record Investment",
      description: "Thailand's Board of Investment reports $8.2B in approved projects for next-generation automotive and robotics.",
      category: "Investment Incentives",
      readTime: "5 min read",
      author: "Investment Team"
    },
    {
      title: "Tier-2 Supplier Development Programs Show Strong Results",
      description: "Japanese OEMs' local supplier capability building initiatives improve quality standards and reduce supply chain risks.",
      category: "Supplier Development",
      readTime: "6 min read",
      author: "Manufacturing Correspondent"
    },
    {
      title: "Green Manufacturing Initiatives Drive Sustainability Compliance",
      description: "New environmental regulations and carbon neutrality goals reshape manufacturing processes and supplier selection.",
      category: "Sustainability",
      readTime: "5 min read",
      author: "ESG Analyst"
    }
  ];

  const highlights = [
    { title: "Toyota Announces $1.3B Battery Plant Expansion", category: "Automotive", time: "2h ago" },
    { title: "Eastern Economic Corridor Phase 2 Approved", category: "Infrastructure", time: "4h ago" },
    { title: "Japan-ASEAN Smart Manufacturing Initiative Launched", category: "Technology", time: "6h ago" },
    { title: "New Industrial Estate Opens in Rayong", category: "Real Estate", time: "12h ago" },
  ];

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonicalPath="/insights/manufacturing"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <InsightHero 
          title="Manufacturing Industry Intelligence"
          description="From EV ecosystems to precision parts: incentives, BOI pathways, and localization strategies for resilient supply chains."
          category="Manufacturing Sector"
          backgroundImage={heroImage}
        />

        <main className="container mx-auto px-4 py-12">
          <Breadcrumb items={[
            { label: 'Insights', href: '/insights' },
            { label: 'Manufacturing' }
          ]} />

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <section>
                <h2 className="text-2xl font-bold mb-6">Latest Manufacturing Intelligence</h2>
                <div className="grid gap-6 sm:grid-cols-2 mb-12">
                  {articles.map((article, index) => (
                    <InsightArticleCard key={index} {...article} />
                  ))}
                </div>

                {/* Key Focus Areas */}
                <div className="grid gap-6 sm:grid-cols-2 mb-8">
                  <div className="p-6 rounded-lg border bg-card">
                    <h3 className="text-xl font-semibold mb-4">Strategic Priorities</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Thailand+1 diversification across ASEAN</li>
                      <li>• Tier-2/3 supplier upgrade programs</li>
                      <li>• Industrial estates and special economic zones</li>
                      <li>• Smart manufacturing and automation</li>
                      <li>• Green manufacturing and sustainability</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-lg border bg-card">
                    <h3 className="text-xl font-semibold mb-4">Market Drivers</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• EV and battery supply chain incentives</li>
                      <li>• Customs modernization and trade facilitation</li>
                      <li>• Regional standards harmonization</li>
                      <li>• Workforce development and reskilling</li>
                      <li>• Digital twin and predictive maintenance</li>
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

export default Manufacturing;
