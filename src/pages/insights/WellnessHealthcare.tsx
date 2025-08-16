import { Link } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InsightHero from '@/components/InsightHero';
import InsightArticleCard from '@/components/InsightArticleCard';
import InsightSidebar from '@/components/InsightSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import SEO from "@/components/SEO";
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const WellnessHealthcare = () => {
  const title = "Wellness & Healthcare Insights | Harmony";
  const description =
    "Healthcare insights: medical technology, telemedicine, and wellness tourism opportunities between Thailand and Japan.";

  const articles = [
    {
      title: "Telemedicine Surge: Japan's Health-Tech Firms Enter Thai Market",
      description: "Japanese telemedicine platforms partner with Thai hospitals to expand digital healthcare access across rural and urban areas.",
      category: "Digital Health",
      readTime: "6 min read",
      author: "Health Tech Reporter"
    },
    {
      title: "Medical Tourism Recovery Exceeds Pre-Pandemic Levels",
      description: "Thailand's medical tourism industry rebounds strongly, attracting 2.1M international patients in 2024, led by Japanese visitors.",
      category: "Medical Tourism",
      readTime: "7 min read",
      author: "Tourism Analyst"
    },
    {
      title: "Aging Society Solutions: Care Technology Innovations",
      description: "Japan's expertise in elderly care technology finds growing market in Thailand as population demographics shift rapidly.",
      category: "Elderly Care",
      readTime: "8 min read",
      author: "Demographics Specialist"
    },
    {
      title: "Pharmaceutical Manufacturing Hub: Thailand's Strategic Advantage",
      description: "Japanese pharma companies establish regional production bases in Thailand to serve ASEAN markets with cost advantages.",
      category: "Pharmaceuticals",
      readTime: "5 min read",
      author: "Pharma Correspondent"
    },
    {
      title: "Mental Health Tech: Apps and Digital Therapy Platforms Expand",
      description: "Japanese mental health applications adapt for Thai users, addressing rising stress and anxiety in urban populations.",
      category: "Mental Health",
      readTime: "6 min read",
      author: "Mental Health Analyst"
    },
    {
      title: "Wellness Tourism 2.0: Integrative Health and Longevity Programs",
      description: "Premium wellness resorts combine traditional Thai healing with Japanese longevity science for affluent health tourists.",
      category: "Wellness Tourism",
      readTime: "7 min read",
      author: "Wellness Industry Expert"
    }
  ];

  const highlights = [
    { title: "New Medical Device Import Regulations Streamlined", category: "Regulation", time: "1h ago" },
    { title: "Japanese Hospital Chain Opens Bangkok Facility", category: "Healthcare", time: "3h ago" },
    { title: "Thailand Approves Regenerative Medicine Trials", category: "Medical Research", time: "5h ago" },
    { title: "Health Insurance Coverage Expands for Foreigners", category: "Policy", time: "8h ago" },
  ];

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonicalPath="/insights/wellness-healthcare"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <InsightHero 
          title="Wellness & Healthcare Intelligence"
          description="Navigate the convergence of Japanese health technology innovation and Thailand's medical excellence for next-generation healthcare solutions."
          category="Healthcare Sector"
          backgroundImage={heroImage}
        />

        <main className="container mx-auto px-4 py-12">
          <Breadcrumb items={[
            { label: 'Insights', href: '/insights' },
            { label: 'Wellness / Healthcare' }
          ]} />

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <section>
                <h2 className="text-2xl font-bold mb-6">Latest Healthcare Intelligence</h2>
                <div className="grid gap-6 sm:grid-cols-2 mb-12">
                  {articles.map((article, index) => (
                    <InsightArticleCard key={index} {...article} />
                  ))}
                </div>

                {/* Key Focus Areas */}
                <div className="grid gap-6 sm:grid-cols-2 mb-8">
                  <div className="p-6 rounded-lg border bg-card">
                    <h3 className="text-xl font-semibold mb-4">Growth Opportunities</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Telemedicine and digital health platforms</li>
                      <li>• Medical tourism and wellness travel</li>
                      <li>• Aging society care technologies</li>
                      <li>• Cross-border pharmaceutical manufacturing</li>
                      <li>• Medical device import and distribution</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-lg border bg-card">
                    <h3 className="text-xl font-semibold mb-4">Market Trends</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Regulatory harmonization for medical devices</li>
                      <li>• Health insurance coverage expansion</li>
                      <li>• Mental health awareness and treatment</li>
                      <li>• Preventive healthcare and wellness programs</li>
                      <li>• AI-powered diagnostic tools adoption</li>
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

export default WellnessHealthcare;