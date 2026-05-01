import { Link } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InsightHero from '@/components/InsightHero';
import Breadcrumb from '@/components/Breadcrumb';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const WellnessHealthcare = () => {
  const { t } = useI18n();
  const title = "Wellness & Healthcare Insights | WaLens";
  const description =
    "Healthcare insights: medical technology, telemedicine, and wellness tourism opportunities between Thailand and Japan.";

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

          <div className="max-w-4xl">
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
