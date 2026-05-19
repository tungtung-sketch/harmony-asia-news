import { Link } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InsightHero from '@/components/InsightHero';
import Breadcrumb from '@/components/Breadcrumb';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const Services = () => {
  const { t, lang } = useI18n();
  const isJapanese = lang === 'ja';
  const title = isJapanese
    ? 'サービス | WaLens エグゼクティブインテリジェンスプラットフォーム'
    : 'Services | WaLens Executive Intelligence Platform';
  const description = t("insights.services.description");

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

          <div className="max-w-4xl">
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
