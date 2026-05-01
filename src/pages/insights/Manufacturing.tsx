import { Link } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InsightHero from '@/components/InsightHero';
import Breadcrumb from '@/components/Breadcrumb';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import { Badge } from "@/components/ui/badge";
import { FileText, Crown } from "lucide-react";
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const Manufacturing = () => {
  const { t, lang } = useI18n();
  const isJapanese = lang === 'ja';
  const title = isJapanese ? "製造業インサイト | WaLens" : "Manufacturing Insights | WaLens";
  const description = isJapanese 
    ? "タイ・日本サプライチェーンの製造業インサイト：インセンティブ、ローカライズ、Tier-2サプライヤー戦略。"
    : "Manufacturing insights for Thailand–Japan supply chains: incentives, localization, and Tier-2 suppliers.";

  const premiumReports = [
    {
      title: isJapanese ? "タイEV・バッテリー産業 プレミアムレポート" : "Thailand EV & Battery Industry Premium Report",
      description: isJapanese 
        ? "日系企業向けのEVバッテリー産業の包括的分析。市場構造、政策インセンティブ、リスク機会、戦略的示唆を含む。"
        : "Comprehensive analysis of EV battery industry for Japanese enterprises. Includes market structure, policy incentives, risk-opportunity assessment, and strategic implications.",
      category: isJapanese ? "プレミアムレポート" : "Premium Report",
      lastUpdated: "2025-01",
      link: "/insights/manufacturing/ev-battery"
    }
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

          <div className="max-w-4xl">
            {/* Premium Reports Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Crown className="h-6 w-6 text-amber-500" />
                {isJapanese ? 'プレミアムレポート' : 'Premium Reports'}
              </h2>
              <div className="grid gap-6">
                {premiumReports.map((report, index) => (
                  <Link 
                    key={index} 
                    to={report.link}
                    className="block p-6 rounded-lg border-2 border-amber-500/30 bg-gradient-to-r from-amber-500/5 to-transparent hover:border-amber-500/50 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-amber-500/10">
                        <FileText className="h-8 w-8 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-amber-500 text-white hover:bg-amber-600">
                            <Crown className="h-3 w-3 mr-1" />
                            {report.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {isJapanese ? '最終更新: ' : 'Updated: '}{report.lastUpdated}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{report.title}</h3>
                        <p className="text-muted-foreground">{report.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

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
