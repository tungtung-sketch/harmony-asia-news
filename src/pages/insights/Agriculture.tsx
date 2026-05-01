import { Link } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InsightHero from '@/components/InsightHero';
import Breadcrumb from '@/components/Breadcrumb';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const Agriculture = () => {
  const { t } = useI18n();
  const title = t("insights.title");
  const description = t("insights.agriculture.description");

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
          title={t("insights.agriculture.title")}
          description={t("insights.agriculture.description")}
          category={t("insights.agriculture.category")}
          backgroundImage={heroImage}
        />

        <main className="container mx-auto px-4 py-12">
          <Breadcrumb items={[
            { label: t('insights.breadcrumb'), href: '/insights' },
            { label: 'Agriculture' }
          ]} />

          <div className="max-w-4xl">
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
