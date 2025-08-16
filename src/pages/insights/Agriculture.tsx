import { Link } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InsightHero from '@/components/InsightHero';
import InsightArticleCard from '@/components/InsightArticleCard';
import InsightSidebar from '@/components/InsightSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import SEO from "@/components/SEO";
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const Agriculture = () => {
  const title = "Agriculture Insights | Harmony";
  const description =
    "Agriculture insights: sustainable farming, agri-tech adoption, and export market access between Thailand and Japan.";

  const articles = [
    {
      title: "Precision Agriculture Revolution: IoT Sensors Transform Thai Farms",
      description: "Japanese agri-tech companies deploy smart sensors and AI analytics to optimize crop yields and reduce resource consumption across Thailand.",
      category: "Agri-Tech",
      readTime: "7 min read",
      author: "Agricultural Technology"
    },
    {
      title: "Premium Fruit Exports Surge: Japanese Market Penetration Success",
      description: "Thai durian, mango, and tropical fruit exports to Japan reach record highs through improved cold-chain logistics and quality certification.",
      category: "Exports",
      readTime: "6 min read",
      author: "Trade Correspondent"
    },
    {
      title: "Sustainable Farming Certification Programs Drive Premium Pricing",
      description: "Japanese sustainability standards enable Thai farmers to access higher-value market segments through organic and eco-friendly certification.",
      category: "Sustainability",
      readTime: "5 min read",
      author: "Sustainability Expert"
    },
    {
      title: "Aquaculture Innovation: Shrimp Farming Technology Advances",
      description: "Japanese aquaculture technology revolutionizes Thai shrimp farming with disease-resistant strains and automated monitoring systems.",
      category: "Aquaculture",
      readTime: "6 min read",
      author: "Aquaculture Specialist"
    },
    {
      title: "Food Processing Automation: Japanese Machinery Adoption Grows",
      description: "Thai food processors invest in Japanese automation technology to meet international quality standards and improve export competitiveness.",
      category: "Food Processing",
      readTime: "8 min read",
      author: "Food Industry Analyst"
    },
    {
      title: "Climate-Resilient Crop Varieties: R&D Collaboration Expands",
      description: "Joint research initiatives develop drought-resistant and heat-tolerant crop varieties for Southeast Asian agricultural conditions.",
      category: "Research & Development",
      readTime: "7 min read",
      author: "Agricultural Research"
    }
  ];

  const highlights = [
    { title: "New Agri-Tech Innovation Center Opens in Chiang Mai", category: "Innovation", time: "2h ago" },
    { title: "Japan Increases Thai Rice Import Quotas", category: "Trade", time: "4h ago" },
    { title: "Organic Certification Process Streamlined", category: "Regulation", time: "6h ago" },
    { title: "Smart Greenhouse Project Launched in Eastern Region", category: "Technology", time: "10h ago" },
  ];

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonicalPath="/insights/agriculture"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <InsightHero 
          title="Agriculture & Food Intelligence"
          description="Strategies for high-value crops, cold-chain logistics, and traceability to reach discerning Japanese consumers."
          category="Agriculture Sector"
          backgroundImage={heroImage}
        />

        <main className="container mx-auto px-4 py-12">
          <Breadcrumb items={[
            { label: 'Insights', href: '/insights' },
            { label: 'Agriculture' }
          ]} />

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <section>
                <h2 className="text-2xl font-bold mb-6">Latest Agriculture Intelligence</h2>
                <div className="grid gap-6 sm:grid-cols-2 mb-12">
                  {articles.map((article, index) => (
                    <InsightArticleCard key={index} {...article} />
                  ))}
                </div>

                {/* Key Focus Areas */}
                <div className="grid gap-6 sm:grid-cols-2 mb-8">
                  <div className="p-6 rounded-lg border bg-card">
                    <h3 className="text-xl font-semibold mb-4">Innovation Areas</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Post-harvest quality and certifications</li>
                      <li>• Agri-tech and precision agriculture</li>
                      <li>• Export financing and risk management</li>
                      <li>• Cold-chain logistics optimization</li>
                      <li>• Sustainable farming practices</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-lg border bg-card">
                    <h3 className="text-xl font-semibold mb-4">Market Drivers</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Climate resilience programs</li>
                      <li>• Biosecurity and import regulations</li>
                      <li>• Digital marketplaces for farmers</li>
                      <li>• Food safety and traceability systems</li>
                      <li>• Premium market access strategies</li>
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
              <Link to="/insights/real-estate" className="px-3 py-1 text-sm bg-background hover:bg-primary/10 rounded-full transition-colors">Real Estate</Link>
            </div>
          </nav>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Agriculture;
