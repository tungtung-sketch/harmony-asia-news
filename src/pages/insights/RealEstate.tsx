import { Link } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InsightHero from '@/components/InsightHero';
import Breadcrumb from '@/components/Breadcrumb';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const RealEstate = () => {
  const { t } = useI18n();
  const title = t("insights.title");
  const description = t("insights.realestate.description");

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

          <div className="max-w-4xl">
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
